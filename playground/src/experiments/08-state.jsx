// Experiment 08 — state
// Used by LESSON 25, and again by LESSON 29.
//
// LESSON 29 asks you to change this file: lift `count` out of Counter and into
// Experiment08, so the two copies share one number instead of owning one each.
//
// Keep the console open. Each render logs one line, so you can see exactly
// when React runs this component again — and what each value is at that moment.
//
// Note: in development <StrictMode> renders components an extra time, so every
// render logs TWICE. That is expected (LESSON 3) and changes nothing here.

import { useState } from "react";

function Counter({ title }) {
  // A normal variable. Recreated from scratch on every single render.
  let plainCount = 0;

  // A state variable. React remembers it between renders.
  const [count, setCount] = useState(0);

  console.log(`[${title}] render — plainCount: ${plainCount}, count: ${count}`);

  function handlePlainClick() {
    plainCount = plainCount + 1;
    console.log(`[${title}] plainCount is now ${plainCount} — but nothing re-rendered`);
  }

  function handleStateClick() {
    setCount(count + 1);
  }

  return (
    <section>
      <h2>{title}</h2>

      <p>
        local variable: <b className="plain">{plainCount}</b>
      </p>
      <button className="plain-btn" onClick={handlePlainClick}>
        +1 (local variable)
      </button>

      <p>
        state: <b className="state">{count}</b>
      </p>
      <button className="state-btn" onClick={handleStateClick}>
        +1 (state)
      </button>
    </section>
  );
}

export default function Experiment08() {
  return (
    <div>
      <h1>State</h1>
      <p>
        Two copies of the same component. Their state is independent — that is the point of
        the second one.
      </p>
      <Counter title="A" />
      <Counter title="B" />
    </div>
  );
}
