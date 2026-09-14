# Mini-project 3 — Employee Directory

**Prerequisites:** topics 01 → 18 (LESSON 1-57).
**Repo to create:** `react-employee-directory` (public).
**Setup and git:** [PUBLISHING_GUIDE.md](../PUBLISHING_GUIDE.md).

Mini-project 2 held all its data in memory. This one gets its data from a real server, which
changes everything about how the screen behaves — and almost nothing about how you write it.

## Scenario

A company of a few hundred people has a staff directory that nobody can use. It is a
spreadsheet, it is out of date, and finding somebody's email takes four questions in a group
chat.

You are building the replacement: one screen, a search box, a filter, and a panel showing the
person you picked.

It is **read-only**. Nobody edits anybody's details here — that is a different, much larger
problem involving permissions and an API that accepts writes, and you would be guessing at
both. A directory that shows the right person quickly is a finished, useful thing.

## Objective

Build a single-screen React application that loads people from an API through a services layer,
lets the user narrow the list by typing and by department, and shows one person's details —
handling every state the network can put you in.

## Core requirements

Core is the project. Finish all of it and you are done.

**Setting up**

- [ ] A Vite React project with Tailwind working, and the scaffold's demo content removed
- [ ] Sensible component decomposition — **at least five components**, each in its own file

**The data**

- [ ] A `src/services/` file that owns the URL and the response shape, exporting at least
      `getEmployees({ signal })`
- [ ] It returns a **plain result object** and never touches state — no `setX` anywhere in it
- [ ] The component checks `response.ok` before trusting the body (the service does this for it)
- [ ] The fetch happens in an **Effect**, with a dependency array, a cleanup, and either an
      `ignore` flag or an `AbortController` — or both
- [ ] **GET only.** Nothing in this project writes to the API

**The four states**

- [ ] **loading** — the user can tell something is happening
- [ ] **error** — a readable message, not a stack trace, and the app stays usable
- [ ] **empty** — the request succeeded and matched nobody. This must read differently from
      "still loading" and differently from "something went wrong"
- [ ] **success** — the list

**Searching**

- [ ] A controlled search input
- [ ] The search is **debounced** — typing quickly must not produce one request or one
      expensive filter pass per keystroke
- [ ] The input itself stays instant; only the consequence is delayed

**Filtering**

- [ ] A department filter built from **buttons**, including an "All" option
- [ ] The filter choice is held in a **`useReducer`**, not `useState` — this is a deliberate
      exercise in the topic-17 pattern
- [ ] The actions describe what happened (`department_selected`, `search_changed`), not what to
      assign

**The detail panel**

- [ ] Clicking a person in the list shows their details beside or below it
- [ ] The selection is held as state, and the panel is derived from it
- [ ] Something sensible is shown when nobody is selected

**Sharing**

- [ ] **Exactly one Context**, used for something that genuinely has several readers at depth —
      the selected employee, or the dispatch function, or a theme. One.
- [ ] Nothing is put in Context that only one component reads

**Finishing**

- [ ] `npm run build` completes with no errors and the browser console is clean
- [ ] A README following the publishing guide, including a screenshot

## Bonus — optional

Only after all of Core works. **Skipping every one of these leaves a complete project.**

- [ ] **A result count** — "showing 7 of 43" — derived, never stored
- [ ] **A sort control** — by name or by department, using a copying sort
- [ ] **Keyboard focus** — when the detail panel opens, move focus to it with a ref (LESSON 49)
- [ ] **A second derived summary** — how many people are in each department, computed from the
      same array

## Technical constraints

- React, Vite, Tailwind, plain JavaScript. Nothing else — no extra packages of any kind.
- **No React Router.** One screen. Routing is topic 20 and is not required here.
- **No custom hooks.** Extracting your fetch into `useEmployees` is the obvious next thought and
  it is topic 21 — write it inline for now, so that lesson has something real to extract.
- **No Redux**, no state library, no data-fetching library (TanStack Query, SWR and friends are
  outside this course).
- **No writes**: no POST, PUT, PATCH or DELETE, and no `localStorage`.
- No `useMemo`, `useCallback`, `memo` or React Compiler. Topic 23 covers performance, and it
  comes after measuring.
- No testing. Topic 26.
- The filter is made of **buttons**. A `<select>` element has still not been taught.
- Derived values are calculated during render. A count, a filtered list and "is it empty" are
  all derived.

## Scope boundaries — what is NOT required

No authentication, no editing, no adding or deleting people, no pagination, no infinite scroll,
no avatars you have to upload, no org chart, no multiple pages, no URL that reflects the
search, no dark mode, no animations, no offline support, no caching between visits.

One screen. Four states. One selected person.

## Suggested initial data

Use a free, public, GET-only API so you are not inventing a backend.
**`https://jsonplaceholder.typicode.com/users`** returns ten people with a name, username,
email, phone, website and a `company.name` — enough for a directory, and the `company.name`
field makes a natural stand-in for "department".

Ten people is a small directory. That is fine: it exercises every state, and an empty search
result is easy to produce by typing nonsense. If you want more rows, invent a second source or
repeat the list with different ids — but do not spend the afternoon on data.

## Expected result

Opening the app shows a loading indicator, then a list of people and a row of department
buttons. Typing in the search box narrows the list a moment after you stop typing, not on every
keystroke. Choosing a department narrows it further, and the two filters combine. Typing
something that matches nobody gives a clear "no matches" message that could not be mistaken for
an error or for loading. Clicking a person fills the detail panel. Breaking the URL in the
services file produces a readable error message instead of a blank screen or a crash.

## Skills demonstrated

A finished repository is evidence of all of this. Everything below is required by **Core**:

- **Fetching in React** — the request in an Effect, the response in state, and a first render
  that survives having no data (LESSON 45).
- **All four states** — loading, error, empty and success, distinguishable from what you store
  (LESSON 46).
- **A correct Effect** — dependencies, cleanup, and protection against a stale response
  arriving last (LESSON 40, 41, 43, 47).
- **A services layer** — one file owning the URL and the response shape, returning a plain
  result, testable without React (LESSON 48).
- **Debouncing** — a timer started in an Effect and cancelled by its cleanup, to reduce work
  outside React (LESSON 42).
- **A reducer** — a pure `(state, action)` holding the filter, with actions that name events
  (LESSON 52-54).
- **Context, used once and deliberately** — for a value with several readers at depth, after
  props and `children` were considered (LESSON 55-57).
- **Lists, keys and derived views** — `.map()` with stable keys, filtering computed during
  render (LESSON 19-21, 29).
- **Controlled inputs** — a search box whose value comes from state (LESSON 30).
- **Component boundaries** — a file list that describes the screen (LESSON 6).

*Bonus only, if you did them:* copying sorts, a ref used to move focus (LESSON 49), and further
derived summaries.

## Done when

- [ ] Every Core requirement above is ticked
- [ ] Typing quickly produces **one** search, not one per keystroke — check the console or the
      Network tab, do not assume
- [ ] Searching for nonsense shows the empty message, and it is clearly not the error message
- [ ] Breaking the URL in the service shows the error state and the app does not crash
- [ ] Switching departments quickly never leaves the wrong list on screen
- [ ] Searching your code for `useMemo`, `localStorage`, `POST`, `Router` and `useCustomHook`
      finds nothing
- [ ] No piece of state holds anything you could have calculated
- [ ] There is exactly one `createContext` in the project
- [ ] `npm run build` passes and the console is clean
- [ ] The README explains what it is, names the API, and says plainly that it is read-only
- [ ] The repo is pushed, with a Description and 4-6 Topics set on GitHub

## Commits to aim for

```text
chore: scaffold vite react project with tailwind
feat: add employees service with a result shape
feat: fetch employees in an effect and render the list
feat: add loading and error states
feat: add a controlled search input
feat: debounce the search
feat: filter by department with a reducer
feat: add the empty state
feat: select a person and show the detail panel
feat: share the selection through context
docs: add README with screenshot
```

## If you get stuck

Four lessons cause most of the trouble here. LESSON 46 if the screen says the wrong thing —
you are probably unable to tell two of the four states apart from what you store. LESSON 42 if
the debounce does nothing: check that the cleanup is cancelling the timer. LESSON 47 if the
wrong list appears when you switch quickly — that is a stale response, and it is what `ignore`
and `abort` are for. LESSON 57 if everything re-renders: look at what the provider's value is.

The **Components tab** (LESSON 34) is faster than `console.log` for "which state is this
component actually in", and the **Profiler** (LESSON 35) is the right answer to "why does this
feel slow" — before you change anything.

## Check your work

When you think you are finished — not before, and not instead of the checklist — open a new
session with an AI assistant and paste three things: `review-prompt.txt` from this folder, the
whole of this file, and your code.

It will check Core first and treat Bonus as optional, tell you what is wrong without fixing it,
and judge you only against this brief.
