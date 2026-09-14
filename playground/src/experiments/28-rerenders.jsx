// Experiment 28 — why re-renders happen, and what memo does about it
// Used by LESSON 68, 69 and 70.
//
// Four things to watch in the console:
//
//   1. pressing +1 in App re-renders EVERY component below it, by default
//   2. memo() skips a child whose props are unchanged...
//   3. ...and does nothing at all when a prop is a new object or function each render
//   4. a subtree passed as `children` is not re-created, so it does not re-render
//
// StrictMode double-invokes components in development, so every render logs twice.
// Compare the counts between components, not their absolute values.

import { memo, useState } from "react";

const counts = {};
function countRender(name) {
  counts[name] = (counts[name] ?? 0) + 1;
  console.log(`   render — ${name} (${counts[name]})`);
  // also on window, so you can read the tally at any moment without re-rendering
  // anything: type __renderCounts in the console.
  window.__renderCounts = counts;
}

// --- 1. an ordinary child: re-renders whenever its parent does ---------------
function PlainChild({ label }) {
  countRender("PlainChild");
  return <li>plain: {label}</li>;
}

// --- 2. memo with a primitive prop: skipped when the prop is unchanged -------
const MemoPrimitive = memo(function MemoPrimitive({ label }) {
  countRender("MemoPrimitive");
  return <li>memo + string prop: {label}</li>;
});

// --- 3. memo with an object prop rebuilt every render: never skipped ---------
const MemoObject = memo(function MemoObject({ config }) {
  countRender("MemoObject");
  return <li>memo + object prop: {config.label}</li>;
});

// --- 3b. memo with a function prop rebuilt every render: never skipped -------
const MemoCallback = memo(function MemoCallback({ onPing }) {
  countRender("MemoCallback");
  return <li>memo + function prop: {typeof onPing}</li>;
});

// --- 4. a wrapper that owns its own state and renders `children` -------------
function Wrapper({ children }) {
  const [ticks, setTicks] = useState(0);
  countRender("Wrapper");
  return (
    <div>
      <button id="tick" onClick={() => setTicks(ticks + 1)}>
        wrapper state: {ticks}
      </button>
      {children}
    </div>
  );
}

function PassedAsChildren() {
  countRender("PassedAsChildren");
  return <p>I was passed to Wrapper as children.</p>;
}

export default function Experiment28() {
  const [count, setCount] = useState(0);
  countRender("App");

  const config = { label: "rebuilt every render" };     // new object, every render
  const onPing = () => {};                              // new function, every render

  return (
    <div>
      <h1>Re-renders</h1>

      <p>
        <button id="inc" onClick={() => setCount(count + 1)}>
          App state: {count}
        </button>
      </p>

      <ul>
        <PlainChild label="steady" />
        <MemoPrimitive label="steady" />
        <MemoObject config={config} />
        <MemoCallback onPing={onPing} />
      </ul>

      <Wrapper>
        <PassedAsChildren />
      </Wrapper>

      <p>
        <button id="log-counts" onClick={() => console.log("counts:", { ...counts })}>
          log the render counts
        </button>{" "}
        <small>(this button changes no state, so pressing it renders nothing)</small>
      </p>
    </div>
  );
}
