// Experiment 09 — updater functions, batching, stale reads
// Used by LESSON 26.
//
// Keep the console open. Each render logs a line; each handler logs before and after.
// Watch the ORDER of those lines as much as the numbers.
//
// Reminder: <StrictMode> renders twice in development, so every render line appears
// twice. Count pairs, not lines.

import { useState } from "react";

export default function Experiment09() {
  const [count, setCount] = useState(0);

  console.log(`   render — count is ${count}`);

  function handleThreeDirect() {
    console.log("handler start — count is", count);
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    console.log("handler end   — count is still", count);
  }

  function handleThreeUpdater() {
    console.log("handler start — count is", count);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    console.log("handler end   — count is still", count);
  }

  function handleReset() {
    setCount(0);
  }

  return (
    <div>
      <h1>Updates</h1>

      <p>
        count: <b id="count">{count}</b>
      </p>

      <button id="direct" onClick={handleThreeDirect}>
        three × setCount(count + 1)
      </button>{" "}
      <button id="updater" onClick={handleThreeUpdater}>
        three × setCount(c =&gt; c + 1)
      </button>{" "}
      <button id="reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}
