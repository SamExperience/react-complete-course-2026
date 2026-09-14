// Experiment 11 — many fields, one state object
// Used by LESSON 31.
//
// Two inputs, ONE piece of state, ONE handler. The console shows what the handler
// received and what it built, so you can check three things on every keystroke:
//
//   1. the right property changed
//   2. the other field survived untouched
//   3. the object handed to the setter is a NEW object, never the old one edited
//
// Reminder: <StrictMode> renders twice in development, so every render line
// appears twice. Count pairs, not lines.

import { useState } from "react";

export default function Experiment11() {
  const [values, setValues] = useState({ firstName: "", email: "" });

  console.log("   render — values:", JSON.stringify(values));

  function handleChange(event) {
    const { name, value } = event.target;
    const next = { ...values, [name]: value };

    console.log(`   onChange — name: "${name}", value: "${value}"`);
    console.log("   target === currentTarget?", event.target === event.currentTarget);
    console.log("   new object?", !Object.is(values, next), "| next:", JSON.stringify(next));

    setValues(next);
  }

  return (
    <div>
      <h1>Many fields, one object</h1>

      <p>
        state: <b id="state">{JSON.stringify(values)}</b>
      </p>

      <p>
        <label>
          first name:{" "}
          <input id="firstName" name="firstName" value={values.firstName} onChange={handleChange} />
        </label>
      </p>

      <p>
        <label>
          email:{" "}
          <input id="email" name="email" value={values.email} onChange={handleChange} />
        </label>
      </p>

      <button id="fill" onClick={() => setValues({ firstName: "Ada", email: "ada@example.com" })}>
        Fill both
      </button>{" "}
      <button id="clear" onClick={() => setValues({ firstName: "", email: "" })}>
        Clear
      </button>
    </div>
  );
}
