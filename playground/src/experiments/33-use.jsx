// Experiment 33 — `use`
// Used by LESSON 77.
//
// Two things `use` reads, and one rule you cannot break:
//
//   1. a Promise — the component suspends, and the nearest <Suspense> fallback shows
//   2. a context — like useContext, except this call is allowed inside an `if`
//   3. the Promise MUST come from a cache. Creating one during render restarts the fallback
//      forever, and the "broken" button lets you see exactly that.
//
// A rejected Promise is not caught by `use` — it reaches the nearest error boundary.

import { Component, Suspense, createContext, use, useState } from "react";

const ThemeContext = createContext("light");

// --- the cache: one Promise per key, created OUTSIDE render --------------------
const cache = new Map();

function fetchGreeting(name, { fail = false, delay = 700 } = {}) {
  const key = `${name}:${fail}`;
  if (!cache.has(key)) {
    console.log(`   creating the promise for "${key}" (this should happen ONCE per key)`);
    cache.set(
      key,
      new Promise((resolve, reject) =>
        setTimeout(() => (fail ? reject(new Error("the server said no")) : resolve(`Hello, ${name}!`)), delay),
      ),
    );
  }
  return cache.get(key);
}

class ErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return <p id="use-error">Error boundary caught: {this.state.error.message}</p>;
    }
    return this.props.children;
  }
}

// --- 1 and 2: reading a Promise and a context ---------------------------------
function Greeting({ name, fail, showTheme }) {
  const message = use(fetchGreeting(name, { fail }));

  // `use` is not a Hook: this call is inside an `if`, which useContext could not be.
  let theme = null;
  if (showTheme) {
    theme = use(ThemeContext);
  }

  console.log(`   Greeting rendered — "${message}"${theme ? `, theme: ${theme}` : ""}`);

  return (
    <p id="greeting">
      {message}
      {theme ? ` (theme: ${theme})` : ""}
    </p>
  );
}

// --- 3: the mistake, on purpose ------------------------------------------------
function BrokenGreeting() {
  // 🔴 a NEW Promise on every render: the fallback never goes away
  const message = use(new Promise((resolve) => setTimeout(() => resolve("never settles for long"), 400)));
  return <p>{message}</p>;
}

export default function Experiment33() {
  const [name, setName] = useState(null);
  const [fail, setFail] = useState(false);
  const [showTheme, setShowTheme] = useState(false);
  const [broken, setBroken] = useState(false);

  return (
    <ThemeContext value="dark">
      <div>
        <h1>use</h1>

        <p>
          <button id="load-ada" onClick={() => { setFail(false); setName("Ada"); }}>
            load Ada
          </button>{" "}
          <button id="load-grace" onClick={() => { setFail(false); setName("Grace"); }}>
            load Grace
          </button>{" "}
          <button id="load-fail" onClick={() => { setFail(true); setName("Nobody"); }}>
            load one that fails
          </button>{" "}
          <label>
            <input
              id="theme-toggle"
              type="checkbox"
              checked={showTheme}
              onChange={(e) => setShowTheme(e.target.checked)}
            />{" "}
            also read the theme context
          </label>
        </p>

        <ErrorBoundary key={`${name}:${fail}`}>
          <Suspense fallback={<p id="use-fallback">Suspended — waiting for the promise…</p>}>
            {name && <Greeting name={name} fail={fail} showTheme={showTheme} />}
          </Suspense>
        </ErrorBoundary>

        <hr />

        <p>
          <button id="show-broken" onClick={() => setBroken((v) => !v)}>
            {broken ? "hide" : "show"} the uncached-promise mistake
          </button>
        </p>

        {broken && (
          <Suspense fallback={<p id="broken-fallback">Suspended — and it will stay here…</p>}>
            <BrokenGreeting />
          </Suspense>
        )}
      </div>
    </ThemeContext>
  );
}
