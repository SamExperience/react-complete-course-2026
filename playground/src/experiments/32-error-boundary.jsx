// Experiment 32 — what an error boundary catches, and what it does not
// Used by LESSON 75.
//
// Three buttons, three different failures:
//
//   1. throw during RENDER      -> caught: the boundary's fallback replaces the subtree
//   2. throw in an EVENT HANDLER -> NOT caught: the boundary never hears about it
//   3. throw in a setTimeout     -> NOT caught: the same, one tick later
//
// In development React also logs every caught error to the console. That is React telling you
// what happened, not the boundary failing.

import { Component, useState } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    // called during render: return the new state, and nothing else
    return { error };
  }

  componentDidCatch(error, info) {
    // called after the commit: this is where logging belongs
    window.__boundaryCaught = (window.__boundaryCaught ?? 0) + 1;
    console.log(`   boundary caught: ${error.message}`);
    console.log(`   component stack starts with:${info.componentStack.split("\n")[1] ?? ""}`);
  }

  render() {
    if (this.state.error) {
      return (
        <div id="fallback">
          <p>Something went wrong in this section.</p>
          <button id="retry" onClick={() => this.setState({ error: null })}>
            try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function Risky({ mode, onDone }) {
  if (mode === "render") {
    throw new Error("thrown during render");
  }

  return (
    <div id="risky">
      <p>This section is fine.</p>
      <button
        id="throw-handler"
        onClick={() => {
          window.__handlerThrew = (window.__handlerThrew ?? 0) + 1;
          throw new Error("thrown in an event handler");
        }}
      >
        throw in a handler
      </button>{" "}
      <button
        id="throw-async"
        onClick={() => {
          setTimeout(() => {
            window.__asyncThrew = (window.__asyncThrew ?? 0) + 1;
            throw new Error("thrown in a setTimeout");
          }, 0);
        }}
      >
        throw in a timeout
      </button>{" "}
      <button id="throw-render" onClick={() => onDone("render")}>
        throw during render
      </button>
    </div>
  );
}

export default function Experiment32() {
  const [mode, setMode] = useState("ok");

  return (
    <div>
      <h1>Error boundaries</h1>

      <p id="outside">
        This paragraph is <b>outside</b> the boundary and stays on screen whatever happens inside.
      </p>

      <ErrorBoundary>
        <Risky mode={mode} onDone={setMode} />
      </ErrorBoundary>

      <p>
        <button id="reset" onClick={() => setMode("ok")}>
          reset the section
        </button>
      </p>
    </div>
  );
}
