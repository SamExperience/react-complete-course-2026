# Mini-project 2 — Expense Tracker

**Prerequisites:** topics 01 → 11 (LESSON 1-35).
**Repo to create:** `react-expense-tracker` (public).
**Setup and git:** [PUBLISHING_GUIDE.md](../PUBLISHING_GUIDE.md).

Mini-project 1 was a page. This one is an **application**: it holds data, it changes when
you use it, and every change goes through state you own.

## Scenario

You share a flat with two other people and the arguments are always about money. Who paid
for what, how much went on groceries this month, why the electricity bill is that size.

You are building the small tool that settles it: a list of expenses you can add to, delete
from, and filter by category, with the totals worked out for you.

It runs in one browser tab and forgets everything when you reload. That is not a limitation
you need to apologise for — it is exactly the right size for what you know, and the brief
tells you to say so in the README.

## Objective

Build a single-screen React application where **all** the data lives in state, the form is
fully controlled, and every number on the screen is calculated from the expense list rather
than stored beside it.

## Core requirements

Core is the project. Finish all of it and you are done.

**Setting up**

- [ ] A Vite React project with Tailwind working, and the scaffold's demo content removed
- [ ] Sensible component decomposition — **at least four components**, each in its own file,
      each named for what it is

**The expense list**

- [ ] Expenses are held in **one array in state**, in the component that needs to own it
- [ ] The list renders with `.map()`
- [ ] Each row has a **stable `key`** taken from the expense's own `id` — not the array index
- [ ] Every expense gets its `id` when it is created, from a module-level counter or
      `crypto.randomUUID()`
- [ ] Each row shows at least a description, a category and an amount

**Adding an expense**

- [ ] A form with **three fields**: description, amount, category
- [ ] All three are **controlled** — their values come from state
- [ ] The three fields live in **one state object**, updated by **one** `handleChange` using
      the input's `name`
- [ ] The form submits through `onSubmit` on the `<form>`, and calls `event.preventDefault()`
- [ ] A new expense is added to the array **immutably** — the old array is never changed
- [ ] After a **successful** submit the form resets to empty

**Validation**

- [ ] A **pure** `validate(values)` function, declared **outside** the component, returning an
      errors object — one entry per invalid field, `{}` when everything is fine
- [ ] It is called on submit, and an invalid form **does not** add an expense and **does not**
      reset
- [ ] Each message appears next to the field it belongs to
- [ ] At minimum: description is required; amount is required, must be a number, and must be
      greater than zero

**Deleting**

- [ ] Every row has a delete control
- [ ] The row does not own the list — it **calls a function it received as a prop**, and the
      component holding the state does the removing
- [ ] The removal is immutable

**Filtering and totals**

- [ ] A category filter built from **buttons**, including an **All** option, with the current
      choice held in state
- [ ] The visible list is **derived** by filtering the expenses — the filtered list is never
      stored in a second piece of state
- [ ] A **total** of the visible expenses, and a **count**, both calculated during render
- [ ] Both update correctly when an expense is added, deleted, or the filter changes

**Empty states**

- [ ] When there are no expenses at all, the list area says so
- [ ] When there are expenses but **none match the current filter**, it says something
      different — these are two different situations and the user should be able to tell them
      apart

**Finishing**

- [ ] `npm run build` completes with no errors and the browser console is clean
- [ ] A README following the publishing guide, including a screenshot

## Bonus — optional

Only after all of Core works. **Skipping every one of these leaves a complete project**, and
nothing in Core depends on any of them.

- [ ] **Sort the visible expenses** — by amount or by description, newest first, your choice.
      Use a copying sort (`toSorted`, or `[...list].sort(...)`) so the expenses in state are
      never reordered behind your back
- [ ] **A per-category summary** — each category with its own total, derived from the same
      array. A second derived view, not a second piece of state
- [ ] **Edit a row in place** — one row at a time becomes editable, the edited values are
      controlled inputs, and saving replaces that one expense in the array immutably. This is
      the biggest of the three and touches everything you have learned about arrays in state
- [ ] **Highlight the largest visible expense**, worked out from the list rather than stored

## Technical constraints

- React, Vite, Tailwind, plain JavaScript. Nothing else — no extra packages of any kind.
- **No `useEffect`, no `useReducer`, no Context, no custom hooks, no React Router, no Redux.**
- **No `fetch`, no API, no `localStorage`, no persistence of any kind.** Reloading the page
  is supposed to lose everything.
- **No form library and no validation library** — no Zod, yup or joi. Your `validate` is a
  function you wrote.
- No async submission, no `useOptimistic`, no `useTransition`, no `memo` / `useMemo` /
  `useCallback`, no React Compiler, no tests.
- Validation happens **on submit**. Not on every keystroke, not on blur.
- The filter is made of **buttons**. A `<select>` element is not part of this course yet.
- Derived values are calculated during render. If you find yourself calling a setter to keep
  a total up to date, stop — that is the mistake LESSON 29 exists to prevent.

## Scope boundaries — what is NOT required

No accounts, no login, no multiple users, no dates or date pickers, no currency conversion,
no charts, no export, no undo, no pagination, no search box, no routing between pages, no
dark mode, no animations, no accessibility audit beyond sensible semantic tags and labelled
inputs. The app has one screen.

## Suggested initial data

Start with a few expenses already in state so the list, the filter and the totals have
something to show before you type anything. Invent your own or use these:

| description | category | amount |
|---|---|---|
| Weekly shop | Groceries | 82.40 |
| Electricity bill | Utilities | 61.00 |
| Bus pass | Transport | 45.00 |
| Coffee beans | Groceries | 12.90 |
| Cinema tickets | Leisure | 24.00 |

Categories: **Groceries · Utilities · Transport · Leisure** — four is plenty, and having one
category with two expenses and one with a single expense makes the filter easy to test.

## Expected result

Opening the app shows a list of expenses with a total above or beside it, a row of category
buttons, and a form to add another. Adding a valid expense puts it in the list, updates the
total, and clears the form. Submitting an empty form shows messages next to the fields and
adds nothing. Clicking a category narrows the list and the total follows. Deleting the last
expense in a category, with that category selected, shows the "nothing matches" message —
and clearing the filter brings the others back.

Reloading loses everything, as intended.

## Skills demonstrated

A finished repository is evidence of all of this. Everything below is required by **Core**:

- **State as the single source of truth** — one array of expenses, one filter choice, and a
  UI that is a function of both (LESSON 25, 29).
- **Immutable updates** — adding with a spread, deleting with `filter`, and never changing
  an array or object that is already in state (LESSON 27-28).
- **Controlled inputs** — three fields whose values come from state and go back through
  `onChange` (LESSON 30).
- **One state object for many fields** — a single `handleChange` driven by each input's
  `name` (LESSON 31).
- **Form submission** — `onSubmit` on the form, `preventDefault`, reading the values from
  state, and resetting after success (LESSON 32).
- **Validation as pure logic** — a `validate(values)` function outside the component,
  returning errors, with the component deciding only when to call it and what to show
  (LESSON 33).
- **Rendering lists properly** — `.map()` with a stable key taken from the data's own
  identity (LESSON 19-20).
- **Derived state** — a filtered list, a total and a count computed during render rather than
  stored and kept in sync (LESSON 21, 29).
- **Empty states** — two of them, distinguished (LESSON 18, 21).
- **Child-to-parent communication** — a row that cannot delete itself and asks its parent
  instead, through a function prop (LESSON 16).
- **Event handling** — handlers passed rather than called, one handler serving several
  filter buttons (LESSON 22-24).
- **Component boundaries** — a file list that describes the app (LESSON 6).

*Bonus only, if you did them:* copying sorts (`toSorted`), a per-category derived summary,
and replacing one item in an array immutably for edit-in-place (LESSON 28).

## Done when

- [ ] Every Core requirement above is ticked
- [ ] Adding an expense, deleting one, and switching filters all leave the total correct
- [ ] Submitting an invalid form shows messages, adds nothing, and does **not** clear what
      was typed
- [ ] Deleting every expense shows the empty message; filtering to a category with none
      shows the *other* message
- [ ] Searching your code for `useEffect`, `localStorage`, `fetch` and `useReducer` finds
      nothing
- [ ] No piece of state holds anything you could have calculated
- [ ] Your file list reads like a description of the app
- [ ] `npm run build` passes and the console is clean
- [ ] The README explains what it is and says plainly that nothing is saved
- [ ] The repo is pushed, with a Description and 4-6 Topics set on GitHub

## Commits to aim for

Your history should show the app being built, not appearing in one lump:

```text
chore: scaffold vite react project with tailwind
feat: render a hardcoded expense list
feat: move expenses into state and render with keys
feat: add controlled expense form
feat: add expense on submit and reset the form
feat: validate the form before adding
feat: delete an expense from a row
feat: filter by category
feat: derive total and count from the visible expenses
feat: add empty states
docs: add README with screenshot
```

## If you get stuck

Three lessons cause most of the trouble here. LESSON 31 if one handler for three fields is
not behaving — check the `name` on every input matches the property exactly. LESSON 28 if
the list does not update — you have almost certainly changed an array instead of replacing
it. LESSON 29 if a total goes stale — it should not be in state at all.

When something on screen is not what you expect, the **Components tab** (LESSON 34) is
faster than adding `console.log`: select the component, read its props and state, and find
out whether the data is wrong or the rendering is.

## Check your work

When you think you are finished — not before, and not instead of the checklist — open a new
session with an AI assistant and paste three things: `review-prompt.txt` from this folder,
the whole of this file, and your code.

It will check Core first and treat Bonus as optional, tell you what is wrong without fixing
it, and judge you only against this brief.
