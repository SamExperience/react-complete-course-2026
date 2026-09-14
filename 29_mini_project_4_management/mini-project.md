# Mini-project 4 — Project Management

**Repository name:** `react-project-management`
**After:** LESSON 92 — the whole course
**Before:** nothing. This is the last thing in the course.

---

## Scenario

A small team keeps its work in a spreadsheet and has outgrown it. They want a web app: a list of
projects, the tasks inside each one, and a way to add a task without a page reload. Nothing more —
no accounts, no permissions, no notifications, no comments.

You are building the front end. There is no backend, and you are not going to write one: the data
is seeded from a mock service that returns Promises, exactly like the services layer in topic 15,
and everything the user changes lives in the store for the session.

This is a capstone, not a product. It exists to make you use routing, a store, an async thunk, a
custom hook, Actions and a deployment together — because using them together is the part that no
individual lesson could teach you.

## Objective

Build and deploy a routed, store-backed React application, with tests over its pure logic and a
working SPA fallback, using only what the course has taught.

When it is finished you should be able to send someone a link to a specific task and have it open
for them.

## Core requirements

Core is the project. Finish all of it and you are done. Nothing in Core needs a concept the
course has not taught.

**Setting up**

- [ ] A Vite React project with Tailwind working and the scaffold's demo content removed
- [ ] Dependencies: `react-router`, `@reduxjs/toolkit`, `react-redux`, and `vitest` with `jsdom`
      as dev dependencies. Nothing else
- [ ] Organised **by feature** (LESSON 65): `src/features/projects/`, `src/features/tasks/`, plus
      `src/app/` for the store and `src/shared/` for anything two features import

**Routing** (topic 20 — declarative routing only)

- [ ] `/` redirects to or renders the projects list
- [ ] `/projects` — every project
- [ ] `/projects/:projectId` — one project, with its tasks
- [ ] `/projects/:projectId/tasks/:taskId` — one task's detail
- [ ] A layout route with a nav and an `<Outlet />`, so the shell does not re-mount between pages
- [ ] An index route so a parent's own URL is never a blank hole
- [ ] A catch-all `*` route with a "not found" page and a link back
- [ ] **A URL that matches but names nothing that exists** — `/projects/999` — shows an empty
      state, not a crash and not the 404 route. Those are different things (LESSON 60)

**The store** (topic 27)

- [ ] `configureStore` in `src/app/store.js`, `<Provider>` at the root
- [ ] At least **two slices** written with `createSlice` — projects and tasks
- [ ] State is **normalised**: entities keyed by id, references by id (LESSON 87)
- [ ] Action names are **events in the past tense** (`taskAdded`, `taskToggled`), never
      `setTasks`
- [ ] Components read through **named selectors** in their feature folder, not inline
      `state.tasks.items.filter(...)` inside `useSelector`
- [ ] **One `createAsyncThunk`** that loads the seed data from a mock service, with
      `pending` / `fulfilled` / `rejected` handled in `extraReducers`

**Loading and errors** (topic 24)

- [ ] All four states from the load are visible to the user: **loading, error, empty, success**
- [ ] The loading UI is a **skeleton** shaped like the content wherever the shape is known, so the
      page does not jump when data arrives (LESSON 74)
- [ ] **One error boundary** around the routed content, with a fallback that offers a way back.
      The nav stays usable
- [ ] The error state offers a **retry** that actually re-dispatches the thunk

**Adding a task — with Actions** (topic 25)

- [ ] A form on the project page that adds a task, using **`<form action={…}>`** and
      **`useActionState`** — not `onSubmit`
- [ ] Validation is a **pure function** the action calls; an invalid submission **returns** an
      error state and never throws
- [ ] The submit button is its own component using **`useFormStatus`**, so it disables itself
      while the action runs and takes no `pending` prop
- [ ] The error message appears next to the field, and the user's other input is not lost

**One custom hook** (topic 21)

- [ ] Exactly one, extracted because it earns it — not one per component. Reasonable choices: a
      `useProjectTasks(projectId)` that pairs the selector with the route param, a
      `useDebouncedValue` for a filter, or a `useLocalStorage` for a UI preference
- [ ] It is named for its job, not for a lifecycle (`useMount` is the anti-pattern from LESSON 62)

**Tests** (topic 26)

- [ ] Vitest configured in the existing `vite.config.js`, with a `test` script
- [ ] **At least four tests over pure logic**: two on a slice's reducer — including one that
      proves it **does not mutate the state it was given** — and two on the validator
- [ ] `npx vitest run` passes
- [ ] Component tests with React Testing Library are **not required** here. If you write some,
      they are bonus

**Deployment** (topic 28)

- [ ] Deployed and publicly reachable on Vercel, Netlify or GitHub Pages
- [ ] The **SPA fallback works**: open a deep link like `/projects/2/tasks/5` in a new tab, and
      reload it. Both must work
- [ ] If the host serves from a sub-path, the `--base` and the router's `basename` are set
- [ ] No secrets in any `VITE_` variable, and `.env` is gitignored (LESSON 91)

**Finishing**

- [ ] `npm run build` completes with no errors, and the browser console is clean in `preview`
- [ ] A README following the publishing guide: what it is, a screenshot, the live URL, how to run
      it, and what you would do next
- [ ] The live URL is in the repository's **About** field as well as the README

## Bonus — optional

Only after all of Core works. **Skipping every one of these leaves a complete project.** None of
them introduces a concept the course has not taught.

- [ ] **`useOptimistic` on adding a task** (LESSON 83). If you do this, it must run against a
      **small asynchronous mock mutation** — a function that waits and can fail — so there is a
      real confirmed → optimistic → confirmed-or-gone flow. An optimistic update against a
      synchronous local reducer demonstrates nothing
- [ ] **`useTransition`** on a filter over a long task list (LESSON 72), *if* you first measure a
      delay worth removing
- [ ] **A performance change the Profiler justified** (topic 23). Record before, change one thing,
      record after, and write both numbers in the README. A `memo` added without a measurement is
      not this bonus
- [ ] **`useSearchParams`** for the task filter, so a filtered view is linkable (LESSON 61)
- [ ] **A few React Testing Library tests** over one component's behaviour (LESSON 86)

## Technical constraints

- React, Vite, Tailwind, React Router, Redux Toolkit, react-redux, Vitest. **Nothing else** — no
  UI library, no form library, no data-fetching library, no date library
- Plain JavaScript. No TypeScript
- **Declarative routing only** — `<Routes>` and `<Route>`. No `createBrowserRouter`, no loaders,
  no actions from React Router (those are a different mode, and this course did not teach it)
- **No RTK Query.** It was named once in LESSON 90 and is out of scope
- No real backend, no database, no authentication. The mock service is the only data source
- One error boundary is the only class component in the project

## Scope boundaries — what is NOT required

Leaving all of these out is correct, not incomplete:

- Editing or deleting projects (adding and completing tasks is enough)
- Drag and drop, due dates, assignees, comments, attachments, search across projects
- Pagination or virtualisation
- Dark mode, animations, responsive breakpoints beyond "it is usable on a phone"
- Persisting anything between sessions
- Server Functions, SSR, or anything requiring a framework beyond Vite
- Component test coverage of the whole app

## Suggested initial data

Keep it small and hard-coded in the mock service. Three projects and eight or so tasks is plenty:

```js
// src/features/projects/mockApi.js
const seed = {
  projects: [
    { id: "p1", name: "Website redesign", description: "New marketing site" },
    { id: "p2", name: "Mobile app", description: "Internal tool for the field team" },
    { id: "p3", name: "Data migration", description: "Move off the spreadsheet" },
  ],
  tasks: [
    { id: "t1", projectId: "p1", title: "Wireframes", done: true },
    { id: "t2", projectId: "p1", title: "Copy for the home page", done: false },
    { id: "t3", projectId: "p1", title: "Accessibility pass", done: false },
    { id: "t4", projectId: "p2", title: "Choose a navigation pattern", done: true },
    { id: "t5", projectId: "p2", title: "Offline support spike", done: false },
    { id: "t6", projectId: "p3", title: "Export the spreadsheet", done: true },
    { id: "t7", projectId: "p3", title: "Write the importer", done: false },
    { id: "t8", projectId: "p3", title: "Verify row counts", done: false },
  ],
};

export function fetchSeed({ fail = false, delay = 600 } = {}) {
  return new Promise((resolve, reject) =>
    setTimeout(() => (fail ? reject(new Error("Could not reach the server")) : resolve(seed)), delay),
  );
}
```

The `fail` and `delay` options are there so you can *see* your loading and error states instead of
hoping they work. Give yourself a way to trigger both while developing.

Give project 2 zero tasks at some point during development, so you build the empty state
deliberately rather than discovering it later.

## Expected result

A person opens the live URL and sees three projects. They click one, see its tasks with a
skeleton while it loads, add a task through a form that disables its own button while saving and
tells them plainly when the title is empty, click a task to open its detail page, copy that URL,
send it to a colleague, and the colleague opens it directly to that task.

Along the way: no console errors, no page jump when data lands, and a reload on any page works.

## Skills demonstrated

A reviewer reading the finished repository can see evidence of:

- **Routing** — nested routes, an `Outlet` layout, URL params, an index route, a catch-all, and
  the difference between "no route matched" and "the route matched but the data does not exist"
- **A store** — `createSlice`, `configureStore`, a `Provider`, normalised state, event-named
  actions, and selectors that keep the store's shape out of the components
- **Async in a store** — one `createAsyncThunk` and the four states in `extraReducers`
- **Actions** — `<form action>`, `useActionState` for the result and pending flag, `useFormStatus`
  in a submit button that takes no props, and validation that returns rather than throws
- **Custom hooks** — one, extracted for a reason, named for its job
- **Error handling** — an error boundary around the routed content, plus retry and empty states
  that read differently from each other
- **Testing** — pure logic tested first, including the no-mutation test that catches the bug that
  actually happens
- **Deployment** — a real build, a working SPA fallback, and no secrets in the bundle
- **Architecture** — organised by feature, state that lives where its readers are, and prop APIs
  that do not contradict themselves

## Done when

- [ ] Every Core checkbox above is ticked
- [ ] `npm run build` succeeds and `npm run preview` shows a clean console
- [ ] `npx vitest run` passes
- [ ] The deployed URL works, including a **reloaded deep link** and a **pasted deep link in a new
      tab**
- [ ] The README has a screenshot and the live URL, and the About field has the URL
- [ ] You can explain, without looking: why the state is normalised, why the action is called
      `taskAdded` and not `setTasks`, and what the SPA fallback is for

## Commits to aim for

Not a rule, but a shape that keeps the work reviewable:

1. `chore: scaffold vite + tailwind`
2. `feat: routing shell with layout, index and catch-all routes`
3. `feat: projects slice and store`
4. `feat: load seed data with an async thunk and the four states`
5. `feat: project detail with tasks`
6. `feat: add a task with a form action`
7. `feat: task detail route`
8. `refactor: extract useProjectTasks`
9. `test: reducer and validator`
10. `chore: deploy with an spa fallback`
11. `docs: readme with a screenshot and the live url`

## If you get stuck

- **A component re-renders constantly** — look at the selector before anything else. It is
  probably building a new array (LESSON 89)
- **`state.items.push()` throws** — you are mutating outside a reducer. Immer's draft only exists
  inside one (LESSON 88)
- **The form's action does nothing useful** — check every input has a `name`, and that the action's
  parameters are `(previousState, formData)` in that order (LESSON 81)
- **The submit button never disables** — `useFormStatus` must be called in a component *inside*
  the form, not the one that renders it (LESSON 82)
- **A deep link 404s after deploying** — the SPA fallback (LESSON 92)
- **A blank deployed page with 404s for the assets** — the base path (LESSON 92)
- **The detail panel is empty for a valid-looking URL** — params are strings, always (LESSON 59)

## Check your work

Before you call it finished, use `review-prompt.txt` in this folder: paste it into an AI
assistant along with your `mini-project.md` and your code, and read the review honestly. It
checks Core first and knows what you have and have not been taught.
