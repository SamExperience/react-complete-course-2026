// Experiment 20 — fetching in a component
// Used by LESSON 45 and 46.
//
// A real GET over the network. Watch the order in the console:
//
//   the component renders FIRST, with no data at all, and only later does the
//   response arrive and a second render show it.
//
// The "break the URL" button points the request at a path that returns 404, so
// you can watch the ok-check do its job.
//
// Reminder: <StrictMode> runs one extra setup+cleanup cycle in development, so you
// will see two requests in the Network tab. Only the last response is used.

import { useEffect, useState } from "react";

const GOOD = "https://jsonplaceholder.typicode.com/users";
const BAD = "https://jsonplaceholder.typicode.com/no-such-collection";
// A request that succeeds and returns an EMPTY list — no user has this id.
const EMPTY = "https://jsonplaceholder.typicode.com/users?id=99999";

export default function Experiment20() {
  const [url, setUrl] = useState(GOOD);
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log(`   render — loading:${loading} users:${users ? users.length : "null"} error:${error ? "yes" : "no"}`);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    setError(null);
    console.log(`   request — ${url}`);

    async function load() {
      try {
        const response = await fetch(url);

        // fetch does NOT throw on 404 or 500 — you have to ask.
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        if (ignore) return;
        console.log(`   ok — ${data.length} users`);
        setUsers(data);
      } catch (problem) {
        if (ignore) return;
        console.log(`   error — ${problem.message}`);
        setError(problem.message);
        setUsers(null);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => { ignore = true; };
  }, [url]);

  return (
    <div>
      <h1>Fetching</h1>

      <p>
        <button id="good" onClick={() => setUrl(GOOD)}>load users</button>{" "}
        <button id="bad" onClick={() => setUrl(BAD)}>break the URL (404)</button>{" "}
        <button id="empty" onClick={() => setUrl(EMPTY)}>a result with nothing in it</button>
      </p>

      <p>
        state: <b id="state">{loading ? "loading" : error ? "error" : users ? `${users.length} users` : "nothing yet"}</b>
      </p>

      {error && <p id="error" style={{ color: "crimson" }}>{error}</p>}

      <ul id="list">
        {users && users.slice(0, 3).map((user) => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  );
}
