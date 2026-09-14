// Experiment 29 — urgent updates versus Transitions
// Used by LESSON 72.
//
// The input's own state is URGENT: it must update on every keystroke or typing feels broken.
// The expensive derived list is NOT urgent: it may lag a little.
//
// Toggle the checkbox to run the same keystroke both ways and watch the difference:
//   - "urgent" mode: one setState, and the whole thing waits for the slow list
//   - "transition" mode: the input updates immediately, the list catches up, isPending is true
//     in between
//
// StrictMode double-invokes components in development, so render logs appear twice.

import { memo, useState, useTransition } from "react";

// 20,000 rows: enough that filtering + sorting them is real work.
const ROWS = Array.from({ length: 20000 }, (_, i) => ({
  id: i,
  name: `person-${i}`,
  score: (i * 7919) % 1000,
}));

function slowFilter(query) {
  const start = performance.now();
  const result = ROWS
    .filter((row) => row.name.includes(query))
    .sort((a, b) => a.score - b.score || a.name.localeCompare(b.name))
    .slice(0, 1500);
  window.__lastFilterMs = performance.now() - start;
  return result;
}

// One row, with a little work of its own — 1500 of these is what makes the list expensive.
function Row({ row }) {
  const label = row.name.split("-").reverse().join(" ").toUpperCase();
  return (
    <li>
      {label} — {row.score.toFixed(2)}
    </li>
  );
}

const Results = memo(function Results({ query }) {
  const rows = slowFilter(query);
  // count how many times this expensive list actually rendered
  window.__resultsRenders = (window.__resultsRenders ?? 0) + 1;
  console.log(`   Results rendered for "${query}" — ${rows.length} rows (render #${window.__resultsRenders})`);
  return (
    <ul id="results">
      {rows.map((row) => (
        <Row key={row.id} row={row} />
      ))}
    </ul>
  );
});

export default function Experiment29() {
  const [text, setText] = useState("");        // urgent: what the input shows
  const [query, setQuery] = useState("");      // non-urgent: what the list shows
  const [useTransitionMode, setUseTransitionMode] = useState(true);
  const [isPending, startTransition] = useTransition();

  function handleChange(event) {
    const next = event.target.value;
    setText(next);                             // ALWAYS urgent — never in a Transition

    if (useTransitionMode) {
      startTransition(() => setQuery(next));   // the expensive part is the non-urgent one
    } else {
      setQuery(next);
    }
  }

  return (
    <div>
      <h1>Transitions</h1>

      <p>
        <label>
          <input
            id="mode"
            type="checkbox"
            checked={useTransitionMode}
            onChange={(e) => setUseTransitionMode(e.target.checked)}
          />{" "}
          wrap the list update in a Transition
        </label>
      </p>

      <p>
        <label>
          filter: <input id="search" value={text} onChange={handleChange} />
        </label>
      </p>

      <p>
        input shows: <b id="typed">{text || "(empty)"}</b> · list shows:{" "}
        <b id="list-query">{query || "(empty)"}</b> · <span id="pending">{isPending ? "pending" : "idle"}</span>
      </p>

      <Results query={query} />
    </div>
  );
}
