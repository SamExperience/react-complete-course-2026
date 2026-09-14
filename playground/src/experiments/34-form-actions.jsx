// Experiment 34 — <form action={fn}> and FormData
// Used by LESSON 80.
//
// Three things to watch:
//
//   1. the action receives a FormData object built from the fields' `name` attributes
//   2. after the action succeeds, React resets the UNCONTROLLED fields — and only those
//   3. an error thrown inside the action goes to the nearest error boundary
//
// window.__lastSubmission holds what the action received.

import { Component, useState } from "react";

class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div id="action-error">
          <p>Boundary caught: {this.state.error.message}</p>
          <button id="action-error-reset" onClick={() => this.setState({ error: null })}>
            reset
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function NoteForm() {
  const [controlled, setControlled] = useState("I am controlled");
  const [saved, setSaved] = useState(null);
  const [shouldFail, setShouldFail] = useState(false);

  // A plain async function. React calls it with the form's FormData.
  async function saveNote(formData) {
    const entries = Object.fromEntries(formData);
    window.__lastSubmission = entries;
    console.log("   action received:", entries);

    await wait(400);                       // pretend to talk to a server

    if (shouldFail) {
      throw new Error("the save failed");  // goes to the error boundary
    }

    setSaved(entries);
  }

  return (
    <form action={saveNote}>
      <p>
        <label>
          title (uncontrolled):{" "}
          <input id="title" name="title" defaultValue="" />
        </label>
      </p>
      <p>
        <label>
          tag (uncontrolled, has a defaultValue):{" "}
          <input id="tag" name="tag" defaultValue="react" />
        </label>
      </p>
      <p>
        <label>
          body (controlled):{" "}
          <input
            id="body"
            name="body"
            value={controlled}
            onChange={(e) => setControlled(e.target.value)}
          />
        </label>
      </p>
      <p>
        <label>
          <input
            id="fail"
            type="checkbox"
            checked={shouldFail}
            onChange={(e) => setShouldFail(e.target.checked)}
          />{" "}
          make the action throw
        </label>
      </p>
      <p>
        <button id="submit" type="submit">
          save
        </button>
      </p>
      <p id="saved">{saved ? `saved: ${JSON.stringify(saved)}` : "nothing saved yet"}</p>
    </form>
  );
}

export default function Experiment34() {
  return (
    <div>
      <h1>Form Actions</h1>
      <ErrorBoundary>
        <NoteForm />
      </ErrorBoundary>
    </div>
  );
}
