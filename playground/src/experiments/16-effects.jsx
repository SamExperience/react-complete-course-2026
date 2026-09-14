// Experiment 16 — when an Effect runs
// Used by LESSON 39.
//
// Each render and each Effect logs what the DOM says AT THAT MOMENT. That is the
// whole point: during render the screen still shows the old value, and by the time
// the Effect runs the new value is already there.
//
// NOTE: reading the DOM during render (the console.log below) is deliberately
// impure and is done here ONLY to prove when each step happens. Never do this in
// real code — LESSON 38 explains why rendering should touch nothing.
//
// Reminder: <StrictMode> renders twice in development, and also remounts the
// component once on mount, so the first Effect lines appear twice too.

import { useEffect, useState } from "react";

function readDom() {
  const el = document.querySelector("#count");
  return el ? el.textContent : "(nothing on screen yet)";
}

export default function Experiment16() {
  const [count, setCount] = useState(0);

  console.log(`   render — count is ${count}, screen shows "${readDom()}"`);

  // No dependency array: this Effect runs after EVERY commit.
  useEffect(() => {
    console.log(`   effect — count is ${count}, screen shows "${readDom()}"  <- already updated`);
  });

  return (
    <div>
      <h1>When an Effect runs</h1>

      <p>
        count: <b id="count">{count}</b>
      </p>

      <button id="increment" onClick={() => setCount(count + 1)}>
        +1
      </button>{" "}
      <button id="other" onClick={() => setCount(count)}>
        set the same value (no change)
      </button>
    </div>
  );
}
