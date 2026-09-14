// Experiment 19 — out-of-order responses
// Used by LESSON 43.
//
// The fake API here answers SHORT queries slowly and LONG queries quickly, so the
// responses are guaranteed to come back in the wrong order. That is artificial;
// on a real network it happens for real, just unpredictably.
//
// The checkbox turns the `ignore` flag on and off so you can watch the same code
// get the right answer and the wrong one.
//
// Reminder: <StrictMode> runs one extra setup+cleanup cycle in development, so in
// dev you will see two requests per query. Only the last response is ever used.

import { useEffect, useState } from "react";

// Pretend network. A one-letter query is deliberately SLOW and anything longer is
// fast, so the first request is guaranteed to come back last. That is artificial;
// on a real network the same thing happens for real, just unpredictably.
function fakeSearch(query) {
  const delay = query.length === 1 ? 1500 : 300;
  return new Promise((resolve) => {
    setTimeout(() => resolve(`results for "${query}"`), delay);
  });
}

export default function Experiment19() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("(nothing yet)");
  const [useIgnore, setUseIgnore] = useState(true);

  useEffect(() => {
    if (query === "") return;

    let ignore = false;
    console.log(`   request  — "${query}"`);

    async function run() {
      const data = await fakeSearch(query);
      if (ignore) {
        console.log(`   ignored  — "${query}" (a newer request is in flight)`);
        return;
      }
      console.log(`   applied  — ${data}`);
      setResult(data);
    }

    run();

    return () => {
      if (useIgnore) ignore = true;
    };
  }, [query, useIgnore]);

  return (
    <div>
      <h1>Races</h1>

      <p>
        <label>
          search:{" "}
          <input
            id="search"
            name="query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </p>

      <p>
        <label>
          <input
            id="use-ignore"
            type="checkbox"
            checked={useIgnore}
            onChange={(event) => setUseIgnore(event.target.checked)}
          />{" "}
          use the <code>ignore</code> flag
        </label>
      </p>

      <p>
        showing: <b id="result">{result}</b>
      </p>
    </div>
  );
}
