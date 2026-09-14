// Experiment 10 — controlled inputs
// Used by LESSON 30.
//
// Keep the console open. Each render logs one line, and each keystroke logs what
// the event carried — so you can watch the whole loop:
//
//   you type -> onChange reads event.target.value -> setName stores it
//            -> React renders again -> value={name} puts it back on screen
//
// The second input is the LESSON 23 one: it has no `value` prop, so React never
// tells it what to show. Type in both, then press "Set both to Ada" and see which
// one React can actually reach.
//
// Reminder: <StrictMode> renders twice in development, so every render line
// appears twice. Count pairs, not lines.

import { useState } from "react";

export default function Experiment10() {
  const [name, setName] = useState("");

  console.log(`   render — name is "${name}"`);

  function handleChange(event) {
    console.log("   onChange — event.target.value is", JSON.stringify(event.target.value));
    setName(event.target.value);
  }

  return (
    <div>
      <h1>Controlled inputs</h1>

      <p>
        state: <b id="state">{JSON.stringify(name)}</b>
      </p>

      <p>
        <label>
          controlled:{" "}
          <input id="controlled" value={name} onChange={handleChange} />
        </label>
      </p>

      <p>
        <label>
          uncontrolled:{" "}
          <input id="uncontrolled" onChange={(e) => console.log("   uncontrolled typed:", e.target.value)} />
        </label>
      </p>

      <button id="set-ada" onClick={() => setName("Ada")}>
        Set both to Ada
      </button>{" "}
      <button id="clear" onClick={() => setName("")}>
        Clear
      </button>

      {/*
        LESSON 30 asks you to uncomment this one line, read the console error,
        then comment it back so the console stays clean:

        <input id="broken" value="Sam" />
      */}
    </div>
  );
}
