# React — intensive mini course

A hands-on React course built from short lessons (~5 minutes each), continuing where
[`js-vanilla-course`](../js-vanilla-course) stopped.

The aim is not to skim React. By the end you should understand the React mental model,
write React confidently, read modern React code, and have four projects on GitHub that you
built yourself.

> **Status: the course is complete** — all 92 lessons across topics 01-28, and all four
> mini-project briefs. Everything described below exists on disk.

## Prerequisites

**The JavaScript course, finished.** This course assumes all of it: functions, objects,
array methods, destructuring, spread, modules, classes, promises and `async`/`await`,
timers, the DOM, events, forms, `fetch`, and splitting URLs into a services file.

React is taught on top of that. It is not taught from zero JavaScript, and lessons will
use `map`, `reduce`, template literals and destructuring without stopping to explain them.

You also need **Node.js 20.19+ or 22.12+** — that is Vite's requirement. Check with
`node --version`.

## Setup (one time only)

The notebooks run on the **Deno** kernel, the only actively maintained JavaScript kernel
for Jupyter.

```powershell
winget install DenoLand.Deno
deno jupyter --install
jupyter kernelspec list      # should list "deno"
```

To open the notebooks:

- **JupyterLab**: run `jupyter lab` from this folder.
- **VS Code**: install two extensions:
  ```powershell
  code --install-extension ms-toolsai.jupyter
  code --install-extension denoland.vscode-deno
  ```
  `ms-toolsai.jupyter` is **required** — it is what lets VS Code open `.ipynb` files at
  all. `denoland.vscode-deno` is optional.

  Then reload VS Code, open a notebook, click **Select Kernel** at the top right, choose
  **Jupyter Kernel…** (not "Python Environments"), then **Deno**.

> The kernel calls itself `typescript`. That is expected — valid JavaScript is also valid
> TypeScript, and nothing in these notebooks is type-checked.

Then install the playground once:

```bash
cd playground
npm install
```

## Three places, three jobs

This is the part worth understanding before you start.

| Where | What it is for |
|---|---|
| **The notebooks** | The default. Every runnable cell is **plain JavaScript** — no React, no npm imports. You use them to practise the logic underneath React: immutable updates, validation, reducers, class strings, `fetch`. |
| **`playground/`** | One small React + Vite app, in this folder. Some lessons send you there to watch real React behave — a component rendering, state re-rendering, a cleanup function firing. |
| **Mini-projects** | Four separate public repositories where you build complete React applications. |

**React cannot run in a notebook.** The Deno kernel has no browser and no JSX compiler, and
pretending otherwise would mean teaching you a fake React. So every block of code in a
lesson says what it is:

- **Runnable — plain JS** → a cell you run and edit right there.
- **The React API** → real React code, shown but not runnable in the notebook.
- **In the playground** → run it in `playground/`.
- **In your project** → code that belongs in a mini-project.

Some topics are mostly notebook work, some are mostly playground work. Topic 02 has no
runnable cells at all, because a component has to be rendered to be understood.

## Part 1 — Fundamentals

`LESSON N` numbering runs continuously across the whole course; it does not restart per
topic.

| # | Topic | Lessons |
|---|---|---|
| 01 | `01_react_setup` | **LESSON 1-3** — declarative UI as a function of state · creating a project with Vite · how the app starts (`index.html` → `main.jsx` → `createRoot` → `App`) |
| 02 | `02_components` | **LESSON 4-6** — a component is a function · composition with `children` · deciding where components begin and end |
| 03 | `03_jsx` | **LESSON 7-10** — what JSX actually is · braces hold expressions, not statements · attributes · fragments, closing tags, comments, and what each value renders |
| 04 | `04_styling_tailwind` | **LESSON 11-13** — CSS file vs CSS Modules vs inline style · Tailwind v4 with Vite · building class strings in JavaScript |
| 05 | `05_mini_project_1_dashboard` | **Mini-project 1 — Business Dashboard** |

Topics 01 and 04 also ask you to work in `react-scratch`, a throwaway Vite project you
create in LESSON 2. Setup and styling have to be seen in a browser.

## Part 2 — Props, events and state

| # | Topic | Lessons |
|---|---|---|
| 06 | `06_props` | **LESSON 14-17** — passing and destructuring props · prop values and defaults · functions as props: talking back to the parent · children and composition |
| 07 | `07_conditional_lists` | **LESSON 18-21** — early return, ternary, `&&` and the `0` trap · lists with `.map()` · keys and stable identity · filtering, sorting, derived counts and empty states |
| 08 | `08_events` | **LESSON 22-24** — passing a handler vs calling it · the event object · one handler for many controls |
| 09 | `09_usestate` | **LESSON 25-29** — why a plain variable cannot work · the updater function and batching · objects in state · arrays in state · derived values and lifting state up |
| 10 | `10_forms` | **LESSON 30-33** — controlled inputs · one state object for many fields · `onSubmit`, `preventDefault` and reset · validation as a pure function |
| 11 | `11_react_devtools` | **LESSON 34-35** — the Components tab · the Profiler, and measuring before optimising |
| 12 | `12_mini_project_2_expenses` | **Mini-project 2 — Expense Tracker** |

Topic 11 asks you to install the **React Developer Tools** browser extension. Everything
before it works without any extension.

## Part 3 — Hooks, API and shared state

| # | Topic | Lessons |
|---|---|---|
| 13 | `13_hooks_fundamentals` | **LESSON 36-38** — what a Hook is · the Rules of Hooks and the reason for them · render and commit |
| 14 | `14_useeffect` | **LESSON 39-44** — what an Effect is · the dependency array · cleanup · debouncing · async work and race conditions · when you do not need an Effect |
| 15 | `15_http_api` | **LESSON 45-48** — getting data into a component · loading, error, empty, success · fetching in an Effect with cancellation · a small services layer |
| 16 | `16_useref` | **LESSON 49-51** — refs to DOM nodes · refs that hold values · ref or state, and the one rule |
| 17 | `17_usereducer` | **LESSON 52-54** — a reducer is a pure function · `useReducer` in a component · lazy init, grouped updates, naming |
| 18 | `18_context` | **LESSON 55-57** — prop drilling · `createContext`, providing and reading · one provider per concern, and when not to use it |
| 19 | `19_mini_project_3_directory` | **Mini-project 3 — Employee Directory** |

## Part 4 — Real-world React

| # | Topic | Lessons |
|---|---|---|
| 20 | `20_router` | **LESSON 58-61** — why client-side routing · URL params and nested routes · navigating in code and a 404 route · `useSearchParams` |
| 21 | `21_custom_hooks` | **LESSON 62-64** — extracting a Hook and naming it · `useToggle`, `useDebounce`, `useLocalStorage` · composing Hooks, and why two calls never share state |
| 22 | `22_architecture` | **LESSON 65-67** — organising by feature · where state should live · designing a component's prop API |
| 23 | `23_performance` | **LESSON 68-73** — why re-renders happen · `memo` and reference equality · `useMemo`/`useCallback` and measuring · React Compiler · `useTransition` · long lists, `lazy` and Suspense |
| 24 | `24_error_loading` | **LESSON 74-77** — spinners vs skeletons and layout shift · error boundaries · retry, fallback data and what you tell the user · `use` |
| 25 | `25_advanced_forms` | **LESSON 78-83** — field arrays and dependent fields · validation as data · Actions · `useActionState` · `useFormStatus` · `useOptimistic` |
| 26 | `26_testing` | **LESSON 84-86** — what is worth testing and Vitest with Vite · testing pure logic · React Testing Library |
| 27 | `27_redux_toolkit` | **LESSON 87-90** — when a store beats Context · `createSlice` · the store, Provider and selectors · `createAsyncThunk` |
| 28 | `28_deployment` | **LESSON 91-92** — the production build, `import.meta.env` and why `VITE_*` is not secret · deploying an SPA, the fallback rule and the base path |

**All 92 lessons are written**, across topics 01-28, and all four mini-projects have their
briefs.

## The capstone

| # | Topic | What it is |
|---|---|---|
| 29 | `29_mini_project_4_management` | **Mini-project 4** — routed projects and tasks, a Redux Toolkit store, one async thunk, a custom hook, a form built on Actions, a few Vitest tests, and a deployment with a working SPA fallback |

## How to work through a topic

1. **Open the topic notebook** — `01_react_setup/react_setup.ipynb` and so on. Read the
   lesson, run the `### Example` cell, then write your own code in the `// Your code here`
   cell below `### Exercise`.
2. **Do the mini challenge.** It is shorter than the exercise and usually makes you reason
   rather than type. Do not skip it — it is where the concept sticks.
3. **Check `solutions.ipynb`** — same folder, same order, one solution per exercise and per
   mini challenge, with a note on the common mistake where there is one. Open it *after*
   you have actually tried.

Some exercises happen in `playground/` or in your own project instead of in a cell. The
lesson says so explicitly and tells you which file.

## The playground

```bash
cd playground
npm install     # first time only
npm run dev
```

Open `src/App.jsx` and point the single import line at the experiment your lesson names.
Experiments live in `src/experiments/`.

It is a scratch space, not a project: never publish it, never polish it. See
[playground/README.md](playground/README.md).

## Mini-projects

Four times in this course you stop and build something in **your own public repository**.
They are not exercises with the scaffolding already in place — they start from an empty
folder, and there is no solution to look at.

Every brief splits its requirements in two:

- **Core** is the project. Implement all of it and you are finished.
- **Bonus** is optional. Skipping all of it costs you nothing.

Read [PUBLISHING_GUIDE.md](PUBLISHING_GUIDE.md) once before the first one. It covers where
the folder goes (beside this course, never inside it), how to scaffold it, the commit loop,
and what the README needs.

Two briefs are written so far:

- [Mini-project 1 — Business Dashboard](05_mini_project_1_dashboard/mini-project.md), after topic 04
- [Mini-project 2 — Expense Tracker](12_mini_project_2_expenses/mini-project.md), after topic 11
- [Mini-project 3 — Employee Directory](19_mini_project_3_directory/mini-project.md), after topic 18

## Working with an AI assistant

Two prompts, for two different moments. Both tell the assistant to teach with questions
rather than answers, and — importantly — what you have **not** been taught yet, so it does
not "help" by showing you something from a later topic.

- **`ai-prompt.txt`** — in every topic folder that has lessons. Use it *while* you are stuck
  on an exercise.
- **`review-prompt.txt`** — beside each mini-project brief. Use it *after* you think the
  project is finished, to have your own code reviewed against the brief. It checks Core
  first and treats Bonus as optional.

Paste the whole file into a new session, and for a review paste the brief and your code
with it.

## A note on the first mini-project

Mini-project 1 asks you to write four nearly identical cards by hand. That is deliberate:
props are not taught until topic 06, and the duplication is the problem topic 06 exists to
solve. Feel it first. The brief says the same thing, at more length.

## License

MIT — see [LICENSE](LICENSE). Use it, fork it, teach from it.
