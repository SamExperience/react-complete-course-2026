// Experiment 21 — cancelling a request
// Used by LESSON 47.
//
// `ignore` (LESSON 43) stops a stale response changing your state. It does not stop
// the request. AbortController does — and it makes the fetch promise REJECT, which
// your catch block will see.
//
// The "abort immediately" button aborts in the SAME TICK as the request, so the
// rejection is guaranteed — no network round trip finishes in zero time. In real
// code the abort lives in the Effect cleanup, as it does for the normal load below.
//
// Reminder: <StrictMode> runs one extra setup+cleanup cycle in development, so the
// first request is aborted by the cleanup and immediately re-sent. That is expected.

import { useEffect, useState } from "react";

const URL_USERS = "https://jsonplaceholder.typicode.com/users";

export default function Experiment21() {
  const [reloadKey, setReloadKey] = useState(0);
  const [status, setStatus] = useState("idle");
  const [lastError, setLastError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let ignore = false;

    async function load() {
      setStatus("loading");
      setLastError(null);
      console.log("   request — started");

      try {
        const response = await fetch(URL_USERS, { signal: controller.signal });
        const data = await response.json();
        if (ignore) return;
        console.log(`   ok — ${data.length} users`);
        setStatus(`${data.length} users`);
      } catch (problem) {
        // An aborted request lands HERE. It is not a failure the user should see.
        console.log(`   caught — ${problem.name}: ${problem.message}`);
        if (problem.name === "AbortError") {
          console.log("   ^ that was us cancelling, not a real error");
          return;
        }
        if (ignore) return;
        setLastError(`${problem.name}: ${problem.message}`);
        setStatus("error");
      }
    }

    load();

    return () => {
      ignore = true;
      controller.abort();          // stop the request itself
      console.log("   cleanup — aborted any request still in flight");
    };
  }, [reloadKey]);

  function abortImmediately() {
    const controller = new AbortController();
    console.log("   forced — starting a request and aborting it in the same tick");

    fetch(URL_USERS, { signal: controller.signal })
      .then(() => console.log("   forced — completed (this should not happen)"))
      .catch((problem) => {
        console.log(`   forced — caught ${problem.name}: ${problem.message}`);
        setLastError(`${problem.name}: ${problem.message}`);
      });

    // Synchronously, before the network can possibly answer. No round trip takes 0ms,
    // so this rejection is guaranteed rather than a matter of timing.
    controller.abort();
  }

  return (
    <div>
      <h1>Cancelling</h1>

      <p>
        status: <b id="status">{status}</b>
      </p>
      <p>
        last error seen: <b id="last-error">{lastError ?? "(none)"}</b>
      </p>

      <p>
        <button id="reload" onClick={() => setReloadKey(reloadKey + 1)}>reload (aborts the previous)</button>{" "}
        <button id="force" onClick={abortImmediately}>abort immediately</button>
      </p>
    </div>
  );
}
