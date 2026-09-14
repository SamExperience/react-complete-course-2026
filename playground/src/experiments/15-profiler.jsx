// Experiment 15 — measuring renders
// Used by LESSON 35.
//
// This file uses the React Profiler API — <Profiler>, a real React component you
// import — NOT the React DevTools Profiler panel. They are two different things
// that share a name. See LESSON 35.
//
// Two subtrees are measured separately. Press "+1" and read the console: both
// subtrees commit, but only one of them looks any different afterwards.
//
// Reminder: <StrictMode> renders twice in development, so every render line
// appears twice. Count pairs, not lines.

import { Profiler, useState } from "react";

const items = ["Bread", "Milk", "Coffee"];

function onRender(id, phase, actualDuration, baseDuration, startTime, commitTime) {
  // Durations are in milliseconds and differ on every machine and every run.
  // The useful, stable parts are `id` and `phase`.
  console.log(`   [profiler] id=${id} phase=${phase}`);
}

function CountDisplay({ count }) {
  console.log("   render — CountDisplay, count =", count);
  return (
    <p>
      count: <b id="count">{count}</b>
    </p>
  );
}

function ShoppingList({ items }) {
  console.log("   render — ShoppingList");
  return (
    <ul id="list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export default function Experiment15() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Measuring renders</h1>

      <Profiler id="counter" onRender={onRender}>
        <CountDisplay count={count} />
      </Profiler>

      <Profiler id="sidebar" onRender={onRender}>
        <ShoppingList items={items} />
      </Profiler>

      <button id="increment" onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  );
}
