// Experiment 18 — debouncing with an Effect
// Used by LESSON 42.
//
// Type into the box and watch the console. Every keystroke SCHEDULES a search and
// CANCELS the one scheduled by the previous keystroke. Only the last one survives
// long enough to run.
//
// The cancelling is the cleanup function from LESSON 41 doing ordinary work.
//
// Reminder: <StrictMode> runs one extra setup+cleanup cycle in development, so the
// very first schedule is immediately cancelled and scheduled again.

import { useEffect, useState } from "react";

const DELAY = 500;

export default function Experiment18() {
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState([]);

  useEffect(() => {
    if (query === "") return;

    console.log(`   scheduled — "${query}" in ${DELAY}ms`);

    const id = setTimeout(() => {
      console.log(`   SEARCHING — "${query}"`);
      setSearched((previous) => [...previous, query]);
    }, DELAY);

    return () => {
      console.log(`   cancelled — "${query}"`);
      clearTimeout(id);
    };
  }, [query]);

  return (
    <div>
      <h1>Debounce</h1>

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
        typed: <b id="query">{query === "" ? "(nothing)" : query}</b>
      </p>

      <h2>Searches actually made ({searched.length})</h2>
      <ul id="searches">
        {searched.map((term, index) => (
          <li key={`${term}-${index}`}>{term}</li>
        ))}
      </ul>
    </div>
  );
}
