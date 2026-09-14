// Experiment 36 — useOptimistic
// Used by LESSON 83.
//
// Add a message and watch the three phases:
//
//   1. the optimistic message appears IMMEDIATELY, marked as sending
//   2. the Action finishes and the real state takes over — same render, no flicker
//   3. if the Action fails, the optimistic message simply disappears: there is nothing to
//      roll back, because it was never in the real state
//
// window.__phases records what the list looked like at each step.

import { useOptimistic, useState } from "react";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let nextId = 3;

export default function Experiment36() {
  const [messages, setMessages] = useState([
    { id: 1, text: "first message" },
    { id: 2, text: "second message" },
  ]);
  const [shouldFail, setShouldFail] = useState(false);
  const [error, setError] = useState(null);

  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,
    (current, newText) => [...current, { id: "optimistic", text: newText, sending: true }],
  );

  async function sendMessage(formData) {
    const text = (formData.get("text") ?? "").trim();
    if (!text) return;

    setError(null);
    addOptimistic(text);                  // inside the Action: allowed

    window.__phases = [
      ...(window.__phases ?? []),
      { at: "just after addOptimistic", count: optimisticMessages.length + 1 },
    ];

    await wait(700);                      // the mock server

    if (shouldFail) {
      setError("Could not send that message.");
      return;                             // the optimistic entry vanishes with the Action
    }

    setMessages((current) => [...current, { id: (nextId += 1), text }]);
  }

  return (
    <div>
      <h1>useOptimistic</h1>

      <ul id="messages">
        {optimisticMessages.map((message) => (
          <li key={message.id} className={message.sending ? "sending" : "confirmed"}>
            {message.text} {message.sending ? <small>(sending…)</small> : null}
          </li>
        ))}
      </ul>

      <p>
        real messages: <b id="real-count">{messages.length}</b> · shown:{" "}
        <b id="shown-count">{optimisticMessages.length}</b>
      </p>

      <form action={sendMessage}>
        <p>
          <label>
            message: <input id="text" name="text" defaultValue="" />
          </label>{" "}
          <button id="send" type="submit">
            send
          </button>
        </p>
      </form>

      <p>
        <label>
          <input
            id="fail"
            type="checkbox"
            checked={shouldFail}
            onChange={(e) => setShouldFail(e.target.checked)}
          />{" "}
          make sending fail
        </label>
      </p>

      {error && <p id="error">{error}</p>}
    </div>
  );
}
