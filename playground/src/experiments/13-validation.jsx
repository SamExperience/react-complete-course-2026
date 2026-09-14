// Experiment 13 — validation as a separate pure function
// Used by LESSON 33.
//
// Notice where validate() lives: OUTSIDE the component. It knows nothing about
// React, state, or inputs. It takes values and returns errors, and that is all.
//
// The component's job is the other half: decide when to call it, and what to show.
//
// Reminder: <StrictMode> renders twice in development, so every render line
// appears twice. Count pairs, not lines.

import { useState } from "react";

const emptyForm = { firstName: "", email: "" };

// --- the pure part ---------------------------------------------------------
// validate(values) -> errors
//   errors has one entry per invalid field: { firstName: "message" }
//   valid input returns {} — an empty object
export function validate(values) {
  const errors = {};

  const firstName = values.firstName.trim();
  if (firstName === "") {
    errors.firstName = "First name is required.";
  } else if (firstName.length < 2) {
    errors.firstName = "First name must be at least 2 characters.";
  }

  const email = values.email.trim();
  if (email === "") {
    errors.email = "Email is required.";
  } else if (!email.includes("@") || email.startsWith("@") || email.endsWith("@")) {
    errors.email = "Email must look like name@example.com.";
  }

  return errors;
}

// --- the React part --------------------------------------------------------
export default function Experiment13() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [entries, setEntries] = useState([]);

  console.log("   render — errors:", JSON.stringify(errors));

  function handleChange(event) {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const found = validate(values);
    console.log("   submit — values:", JSON.stringify(values));
    console.log("   submit — errors:", JSON.stringify(found));

    setErrors(found);

    if (Object.keys(found).length > 0) {
      return; // stop here: nothing is added
    }

    setEntries([...entries, { id: crypto.randomUUID(), ...values }]);
    setValues(emptyForm);
  }

  return (
    <div>
      <h1>Validation</h1>

      <form id="the-form" onSubmit={handleSubmit}>
        <p>
          <label>
            first name:{" "}
            <input id="firstName" name="firstName" value={values.firstName} onChange={handleChange} />
          </label>
          {errors.firstName && <span id="err-firstName" style={{ color: "crimson" }}> {errors.firstName}</span>}
        </p>
        <p>
          <label>
            email:{" "}
            <input id="email" name="email" value={values.email} onChange={handleChange} />
          </label>
          {errors.email && <span id="err-email" style={{ color: "crimson" }}> {errors.email}</span>}
        </p>
        <button id="submit" type="submit">
          Add
        </button>
      </form>

      <p>
        errors: <b id="errors">{JSON.stringify(errors)}</b>
      </p>

      <h2>Added ({entries.length})</h2>
      <ul id="list">
        {entries.map((entry) => (
          <li key={entry.id}>
            {entry.firstName} — {entry.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
