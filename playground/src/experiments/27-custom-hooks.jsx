// Experiment 27 — custom Hooks
// Used by LESSON 62, 63 and 64.
//
// Three things to watch:
//
//   1. useToggle and useDebounced are ordinary functions that call other Hooks
//   2. TWO calls to the same custom Hook keep TWO separate pieces of state —
//      the panels toggle independently, which is the whole "logic, not state" rule
//   3. useSearchBox COMPOSES the other two, and is still just a function
//
// The console logs each Hook call so you can see how many independent copies exist.

import { useEffect, useState } from "react";

// --- a tiny one ------------------------------------------------------------
function useToggle(initial = false) {
  const [on, setOn] = useState(initial);
  const toggle = () => setOn((current) => !current);
  return [on, toggle];
}

// --- LESSON 42's debounce, extracted ---------------------------------------
function useDebounced(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      console.log(`   useDebounced — settled on "${value}"`);
      setDebounced(value);
    }, delay);

    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}

// --- composing the two -----------------------------------------------------
function useSearchBox(initial = "") {
  const [text, setText] = useState(initial);
  const query = useDebounced(text);
  const [showTips, toggleTips] = useToggle(false);

  return { text, setText, query, showTips, toggleTips };
}

function Panel({ title }) {
  const [open, toggle] = useToggle(false);
  console.log(`   Panel "${title}" — open: ${open}`);
  return (
    <p>
      <button className="panel-toggle" data-title={title} onClick={toggle}>
        {open ? "hide" : "show"} {title}
      </button>{" "}
      {open && <span className="panel-body">contents of {title}</span>}
    </p>
  );
}

export default function Experiment27() {
  const search = useSearchBox("");

  return (
    <div>
      <h1>Custom Hooks</h1>

      <h2>1 &amp; 2. Two panels, one Hook, two states</h2>
      <Panel title="first" />
      <Panel title="second" />

      <h2>3. A composed Hook</h2>
      <p>
        <label>
          search:{" "}
          <input id="search" value={search.text} onChange={(e) => search.setText(e.target.value)} />
        </label>
      </p>
      <p>
        typed: <b id="typed">{search.text || "(nothing)"}</b> · debounced:{" "}
        <b id="debounced">{search.query || "(nothing)"}</b>
      </p>
      <p>
        <button id="tips" onClick={search.toggleTips}>
          {search.showTips ? "hide" : "show"} tips
        </button>{" "}
        {search.showTips && <span id="tips-body">Try a surname.</span>}
      </p>
    </div>
  );
}
