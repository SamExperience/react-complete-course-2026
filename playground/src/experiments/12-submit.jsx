// Experiment 12 — submitting a form
// Used by LESSON 32.
//
// A real <form> with controlled inputs. Watch the address bar as much as the console:
// the browser wants to submit this form itself, and preventDefault is what stops it.
//
// LESSON 32 asks you to comment out the event.preventDefault() line, submit again,
// and look at the URL. Put it back afterwards.
//
// Reminder: <StrictMode> renders twice in development, so every render line
// appears twice. Count pairs, not lines.

import { useState } from "react";

const emptyForm = { firstName: "", email: "" };

export default function Experiment12() {
  const [values, setValues] = useState(emptyForm);
  const [submitted, setSubmitted] = useState([]);

  console.log("   render — values:", JSON.stringify(values));

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log("   submit — values at this moment:", JSON.stringify(values));

    setSubmitted([...submitted, { id: crypto.randomUUID(), ...values }]);
    setValues(emptyForm);
  }

  return (
    <div>
      <h1>Submitting</h1>

      <form id="the-form" onSubmit={handleSubmit}>
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
        <button id="submit" type="submit">
          Add
        </button>
      </form>

      <p>
        state: <b id="state">{JSON.stringify(values)}</b>
      </p>

      <h2>Submitted ({submitted.length})</h2>
      <ul id="list">
        {submitted.map((entry) => (
          <li key={entry.id}>
            {entry.firstName} — {entry.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
