// Experiment 23 — refs that hold values
// Used by LESSON 50 and 51.
//
// Three things to watch:
//
//   1. the stopwatch works because the interval's id survives every render
//      WITHOUT causing one — a plain variable would be lost, state would loop
//   2. "previous count" is a ref updated in an Effect, so it lags one render behind
//   3. the broken counter proves the other half: changing a ref renders nothing
//
// Reminder: <StrictMode> renders twice in development, so render lines are doubled.

import { useEffect, useRef, useState } from "react";

export default function Experiment23() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  // 2 — remembering the previous value of something
  const [count, setCount] = useState(0);
  const previousCount = useRef(null);
  useEffect(() => {
    previousCount.current = count;
  }, [count]);

  // 3 — the same counter, kept in a ref instead of state
  const brokenRef = useRef(0);

  console.log(`   render — elapsed:${elapsed} count:${count} previous:${previousCount.current} brokenRef:${brokenRef.current}`);

  useEffect(() => {
    if (!running) return;

    intervalRef.current = setInterval(() => {
      setElapsed((e) => e + 1);
    }, 100);
    console.log(`   started — interval id stored in a ref`);

    return () => {
      clearInterval(intervalRef.current);
      console.log(`   stopped — cleared that same id`);
    };
  }, [running]);

  return (
    <div>
      <h1>Refs that hold values</h1>

      <h2>1. A stopwatch</h2>
      <p>
        elapsed: <b id="elapsed">{elapsed}</b> tenths
      </p>
      <p>
        <button id="toggle" onClick={() => setRunning(!running)}>{running ? "stop" : "start"}</button>{" "}
        <button id="reset" onClick={() => setElapsed(0)}>reset</button>
      </p>

      <h2>2. The previous value</h2>
      <p>
        count: <b id="count">{count}</b> · previously: <b id="previous">{String(previousCount.current)}</b>
      </p>
      <p>
        <button id="inc" onClick={() => setCount(count + 1)}>+1</button>
      </p>

      <h2>3. A counter in a ref (broken on purpose)</h2>
      <p>
        ref counter: <b id="broken">{brokenRef.current}</b>
      </p>
      <p>
        <button
          id="broken-inc"
          onClick={() => {
            brokenRef.current = brokenRef.current + 1;
            console.log(`   brokenRef is now ${brokenRef.current} — but nothing re-rendered`);
          }}
        >
          +1 (changes the ref)
        </button>
      </p>
    </div>
  );
}
