// Experiment 24 — a reducer in a component
// Used by LESSON 53 and 54.
//
// The reducer is EXACTLY the one from LESSON 52's notebook cell — copied, not adapted.
// That is the point: it knew nothing about React then and it knows nothing about React
// now. The component only dispatches and renders.
//
// Watch the console: every dispatch logs the action, and the reducer logs each call.
// In development <StrictMode> calls the reducer twice per action, on purpose, to check
// that it is pure. Both calls produce the same answer, so only one is kept.

import { useReducer, useState } from "react";

const initialState = { tasks: [], filter: "all" };

function tasksReducer(state, action) {
  console.log(`   reducer — ${action.type}`);

  switch (action.type) {
    case "task_added":
      return { ...state, tasks: [...state.tasks, { id: action.id, text: action.text, done: false }] };

    case "task_toggled":
      return {
        ...state,
        tasks: state.tasks.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t)),
      };

    case "task_removed":
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.id) };

    case "filter_changed":
      return { ...state, filter: action.filter };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export default function Experiment24() {
  const [state, dispatch] = useReducer(tasksReducer, initialState);
  const [text, setText] = useState("");

  console.log(`   render — ${state.tasks.length} tasks, filter "${state.filter}"`);

  // derived during render, never stored (LESSON 29)
  const visible = state.tasks.filter((task) =>
    state.filter === "all" ? true : state.filter === "done" ? task.done : !task.done,
  );

  function handleSubmit(event) {
    event.preventDefault();
    if (text.trim() === "") return;
    console.log(`   dispatch — task_added "${text}"`);
    dispatch({ type: "task_added", id: crypto.randomUUID(), text });
    setText("");
  }

  return (
    <div>
      <h1>A reducer in a component</h1>

      <form id="add-form" onSubmit={handleSubmit}>
        <input id="text" name="text" value={text} onChange={(e) => setText(e.target.value)} />{" "}
        <button id="add" type="submit">add</button>
      </form>

      <p>
        {["all", "todo", "done"].map((f) => (
          <button
            key={f}
            id={`filter-${f}`}
            onClick={() => dispatch({ type: "filter_changed", filter: f })}
            style={{ fontWeight: state.filter === f ? "bold" : "normal" }}
          >
            {f}
          </button>
        ))}
      </p>

      <p>
        showing <b id="count">{visible.length}</b> of {state.tasks.length}
      </p>

      <ul id="list">
        {visible.map((task) => (
          <li key={task.id}>
            <button
              className="toggle"
              data-id={task.id}
              onClick={() => dispatch({ type: "task_toggled", id: task.id })}
            >
              {task.done ? "done" : "todo"}
            </button>{" "}
            {task.text}{" "}
            <button
              className="remove"
              data-id={task.id}
              onClick={() => dispatch({ type: "task_removed", id: task.id })}
            >
              remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
