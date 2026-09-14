// Experiment 35 — useActionState and useFormStatus
// Used by LESSON 81 and 82.
//
// Watch three things:
//
//   1. the action's FIRST argument is the previous state; the FormData is its SECOND
//   2. `isPending` from useActionState is true while the action runs
//   3. useFormStatus only works from a component rendered INSIDE the form — the same
//      component that renders the <form> always sees pending: false
//
// window.__actionCalls records what each call received.

import { useActionState } from "react";
import { useFormStatus } from "react-dom";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// This component is rendered inside the form, so useFormStatus sees the submission.
function SubmitButton() {
  const status = useFormStatus();
  window.__childStatus = { pending: status.pending, method: status.method };
  return (
    <button id="submit" type="submit" disabled={status.pending}>
      {status.pending ? "saving…" : "save"}
    </button>
  );
}

async function saveName(previousState, formData) {
  const name = (formData.get("name") ?? "").trim();

  window.__actionCalls = [
    ...(window.__actionCalls ?? []),
    { previousState, name, attempt: (previousState?.attempt ?? 0) + 1 },
  ];
  console.log("   action called — previous state:", previousState, "· name:", JSON.stringify(name));

  await wait(500);

  if (name === "") {
    return { ok: false, message: "Name is required.", attempt: (previousState?.attempt ?? 0) + 1 };
  }

  return { ok: true, message: `Saved ${name}.`, attempt: (previousState?.attempt ?? 0) + 1 };
}

export default function Experiment35() {
  const [state, formAction, isPending] = useActionState(saveName, {
    ok: null,
    message: "not submitted yet",
    attempt: 0,
  });

  // The SAME component that renders the form: this is the caveat, not a bug.
  const sameComponentStatus = useFormStatus();
  window.__sameComponentStatus = { pending: sameComponentStatus.pending };

  return (
    <div>
      <h1>useActionState and useFormStatus</h1>

      <form action={formAction}>
        <p>
          <label>
            name: <input id="name" name="name" defaultValue="" />
          </label>
        </p>
        <p>
          <SubmitButton />
        </p>
      </form>

      <p>
        state.message: <b id="message">{state.message}</b>
      </p>
      <p>
        state.ok: <b id="ok">{String(state.ok)}</b> · state.attempt:{" "}
        <b id="attempt">{state.attempt}</b>
      </p>
      <p>
        isPending (useActionState): <b id="pending">{String(isPending)}</b> ·
        useFormStatus in THIS component:{" "}
        <b id="same-pending">{String(sameComponentStatus.pending)}</b>
      </p>
    </div>
  );
}
