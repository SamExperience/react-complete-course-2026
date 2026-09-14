# Playground

A scratch space for seeing real React behaviour. Some things React does cannot be shown
honestly in a Jupyter cell — a component actually rendering, a re-render happening, a
cleanup function firing. Those lessons send you here.

**This is not a project.** Do not publish it, do not polish it, do not add features to it.
The four mini-projects are where you build things.

## Run it

```bash
cd playground
npm install     # first time only
npm run dev
```

Open the address Vite prints. Press **F12** for the console — some experiments log there,
and the lesson tells you when to look.

## Use it

Each lesson that needs the playground names an experiment file in `src/experiments/`.
Open `src/App.jsx`, import that file, and render it:

```jsx
import Experiment from "./experiments/01-components.jsx";

export default function App() {
  return (
    <main>
      <Experiment />
    </main>
  );
}
```

Save, and the page reloads. That one import line is the only thing you change.

## What is here so far

| Experiment | Lessons | What it shows |
|---|---|---|
| `01-components.jsx` | LESSON 4-6 | a component rendering, `children`, and splitting a blob into components |
| `02-props.jsx` | LESSON 14-17 | props arriving and rendering: value types, defaults, objects and arrays, a callback prop, and slots |
| `03-conditional.jsx` | LESSON 18 | early return, ternary and `&&` — including the stray `0` on screen |
| `04-lists.jsx` | LESSON 19 | one array becoming many elements (and one callback that returns nothing) |
| `05-keys.jsx` | LESSON 20 | the same list keyed by index and by id — and what a removal does to each |
| `06-events.jsx` | LESSON 22 | passing a handler vs calling it, and arrows that pass arguments |
| `07-event-object.jsx` | LESSON 23-24 | preventDefault, reading a value, bubbling, stopPropagation, and one handler for many buttons |
| `08-state.jsx` | LESSON 25, LESSON 29 | a local variable that cannot remember, `useState` that can, and two independent copies — then LESSON 29 has you lift that state into the parent |
| `09-updates.jsx` | LESSON 26 | three direct setter calls vs three updater functions, batching, and the stale read |
| `10-controlled.jsx` | LESSON 30 | a controlled input next to an uncontrolled one, the event-then-render order, and a button that sets the text without typing |
| `11-fields.jsx` | LESSON 31 | two inputs, one state object, one handler — the field names itself and the others survive |
| `12-submit.jsx` | LESSON 32 | a real `<form>`: what the browser does to the URL without `preventDefault`, and resetting after submit |
| `13-validation.jsx` | LESSON 33 | a pure `validate(values)` outside the component, its errors stored in state and shown per field |
| `14-devtools.jsx` | LESSON 34 | a four-deep component tree with props, state and a planted bug — meant to be read in the Components tab, not in the file |
| `15-profiler.jsx` | LESSON 35 | two subtrees measured with the `<Profiler>` API — both re-render, only one changes the DOM |
| `16-effects.jsx` | LESSON 39 | when an Effect runs: the render still sees the old screen, the Effect sees the updated one |
| `17-cleanup.jsx` | LESSON 40-41 | dependencies deciding when an Effect re-runs, and cleanup running before each re-run and on unmount |
| `18-debounce.jsx` | LESSON 42 | five keystrokes, four cancelled timers, one search — cleanup doing the cancelling |
| `19-races.jsx` | LESSON 43 | a stale response arriving last and overwriting a fresh one, with and without the `ignore` flag |
| `20-fetch.jsx` | LESSON 45-46 | a real GET: render before data, a 404 the ok-check catches, and a result that is legitimately empty |
| `21-abort.jsx` | LESSON 47 | `AbortController` in the cleanup, and the `AbortError` your catch must not treat as a failure |
| `22-refs.jsx` | LESSON 49 | focusing, measuring, and reaching a child's node through a plain `ref` prop |
| `23-ref-values.jsx` | LESSON 50-51 | a stopwatch's timer id, a previous value, and a counter in a ref that refuses to appear |
| `24-reducer.jsx` | LESSON 53-54 | the LESSON 52 reducer copied unchanged into a component, with dispatch and a derived filter |
| `25-drilling.jsx` | LESSON 55 | five components mention `user`, one uses it — prop drilling, felt |
| `26-context.jsx` | LESSON 56-57 | the same tree with Context: middle components know nothing, plus a nested provider that overrides |
| `27-custom-hooks.jsx` | LESSON 62-64 | `useToggle`, a debounce extracted into `useDebounced`, and one Hook composing the others — two panels prove that two calls share logic, not state |
| `28-rerenders.jsx` | LESSON 68-70 | a render counter on every component: what one state change costs, what `memo` skips, and why an object prop makes `memo` do nothing |
| `29-transitions.jsx` | LESSON 72 | the same keystroke with and without `startTransition`, behind a checkbox — plus `isPending` and a deliberately expensive list |
| `30-lazy-suspense.jsx` (+ `30-lazy-child.jsx`) | LESSON 73 | 50 rows against 5000, and a component whose code is not downloaded until you press the button |
| `31-loading-ui.jsx` | LESSON 74 | the same load behind a spinner and behind a skeleton — `window.__shift` reports how far the content below jumped |
| `32-error-boundary.jsx` | LESSON 75 | one boundary and three ways to throw: only the render error is caught |
| `33-use.jsx` | LESSON 77 | `use` reading a cached Promise and a context inside an `if`, a rejection reaching the boundary, and the uncached-Promise mistake |
| `34-form-actions.jsx` | LESSON 80 | `<form action={fn}>`, the FormData it receives, which fields React resets, and a throw reaching the boundary |
| `35-action-state.jsx` | LESSON 81-82 | `useActionState`'s state and pending flag, and `useFormStatus` called both inside and outside the form |
| `36-optimistic.jsx` | LESSON 83 | an optimistic message appearing before the server confirms — and vanishing when it fails |

More are added as the course reaches the lessons that need them.

### React Developer Tools

From LESSON 34 you will want the **React Developer Tools** browser extension, which adds
*Components* and *Profiler* panels to your browser's devtools. Install it from the official
links on <https://react.dev/learn/react-developer-tools> (Chrome, Firefox and Edge).

It is only needed from topic 11 onwards — everything before that works without it.

Note that `<Profiler>` (a React component you import, used in `15-profiler.jsx`) and the
DevTools **Profiler panel** are two different things that share a name. LESSON 35 covers both
and keeps them apart.

## Two things that will surprise you

**Effects and renders run twice in development.** `main.jsx` wraps the app in
`<StrictMode>`, which deliberately double-invokes components and re-runs effects in
development to surface bugs. This is the React default and your own projects will have it
too. It does not happen in a production build. Lessons where it matters say so.

**Experiments are minimal on purpose.** No styling to speak of, no error handling, no
structure. Every line that is not about the concept would be a distraction.
