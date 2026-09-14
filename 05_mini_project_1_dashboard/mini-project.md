# Mini-project 1 — Business Dashboard

**Prerequisites:** topics 01 → 04 (LESSON 1-13).
**Repo to create:** `react-business-dashboard` (public).
**Setup and git:** [PUBLISHING_GUIDE.md](../PUBLISHING_GUIDE.md).

Your first React repository. It is a static screen — no clicking, no data loading, nothing
that changes — and that is the right size for what you know today.

## Scenario

Northwind Supplies is a small wholesaler. Their team opens the same internal page every
morning to see how the business is doing: a few headline numbers and what happened
recently. You are building that screen.

The numbers are fixed for now. A later version of this app would load them from a server —
but not this one, and pretending otherwise would mean writing code you have not been taught.

## Objective

Build a static, responsive dashboard with React, Vite and Tailwind, split into components
that a stranger could name by reading your file list.

## Read this before you start: the duplication is on purpose

You know components, `children`, JSX and Tailwind. You do **not** yet know props, lists, or
state. So there is no way to write one `KpiCard` and use it four times with different
numbers — each card will contain its own text, and the four will look almost identical.

**That is intended. Do not work around it.** Do not copy a solution from elsewhere, do not
reach into topic 6, do not build a clever workaround with arrays. Write the repetition,
notice how it feels, and remember it — topic 6 opens by removing exactly this pain, and the
lesson lands far harder when you have felt it.

The one thing you *can* and *should* factor out is the **shape** shared by several sections:
that is what `children` is for (LESSON 5).

## Core requirements

Core is the project. Finish all of it and you are done.

- [ ] A Vite React project with Tailwind working, and the scaffold's demo content removed
- [ ] A **header**: the company name, a one-line subtitle under it, and a button pushed to
      the right edge (the button does nothing — it has no click handler, by design)
- [ ] A **KPI row of four cards**, each showing a label, a large value, and a change
      indicator such as `+12.4%` or `-3.1%`
- [ ] The change indicator is **green when positive and red when negative**, and the colour
      is **derived from the value** rather than hardcoded: each card holds its number as a
      local `const` — `const change = -3.1;` — and a ternary or a lookup turns the sign into
      a complete class name (LESSON 13), never one built by interpolation. The test: flip
      the sign of that number and the colour must change on its own, with no class name
      edited anywhere
- [ ] A **Recent activity** section with at least five rows, each with a description and a
      timestamp
- [ ] A **footer** with the company name and the year
- [ ] **At least five components**, each in its own file, each named for what it is
- [ ] **At least one wrapper component that takes `children`**, used more than once — the
      section shells are the obvious candidate
- [ ] **Responsive:** one column on a narrow screen, at least three across on a wide one.
      Resize the window and watch it change
- [ ] At least one `hover:` effect on something that looks interactive
- [ ] Semantic HTML: `header`, `main`, `section`, `footer`, and headings in sensible order
- [ ] `npm run build` completes with no errors and the browser console is clean
- [ ] A README following the publishing guide, including a screenshot

## Bonus — optional

Only after all of Core works. Skipping every one of these leaves a complete project.

- [ ] A fifth section — a small team or inventory panel — reusing the same wrapper component
- [ ] A `badgeClasses(tone)` **helper function** — a function, not a component — returning a
      complete class string from a tone lookup covering at least three tones
      (`ok` / `warn` / `bad`), built the LESSON 13 way and used by the activity rows, each
      row passing its own literal tone (one reusable `Badge` component that takes a tone is
      exactly what topic 6 unlocks)
- [ ] Define the brand colour once as a CSS custom property (LESSON 11) and use it alongside
      the Tailwind utilities
- [ ] Tighten the spacing and type scale so the page uses a consistent rhythm rather than
      arbitrary values

## Technical constraints

- React, Vite, Tailwind, plain JavaScript. Nothing else.
- **No props except `children`.** This is the deliberate limit described above.
- **No `useState`, no event handlers, no `.map()` over an array to build markup.** All three
  are later topics; using them here means copying code you cannot yet explain.
- No routing, no API calls, no `localStorage`, no charting library, no icon package, no
  animation library, no component library, no tests, no deployment.
- Class names must appear complete in your source. If Tailwind cannot see it, it does not
  exist.

## Scope boundaries — what is NOT required

Nothing on this page has to *do* anything. No clicking, no filtering, no sorting, no theme
switch, no loading state, no accessibility audit beyond sensible semantic tags, no mobile
menu. A reviewer who asks "why can't I click the button?" has misread the brief.

## Suggested content

Use these, or invent your own. The numbers are not the exercise.

**KPIs:** Revenue 128,400 EUR (+12.4%) · Orders 1,284 (+4.2%) · Refunds 37 (-3.1%) ·
Active customers 612 (+1.8%)

**Recent activity:** Order #4821 shipped — 2 hours ago · Invoice #1190 paid — 4 hours ago ·
Refund issued for order #4790 — yesterday · New customer: Baltic Foods — yesterday ·
Stock alert: Blue mugs below 20 units — 2 days ago

## Expected result

Opening the page shows a finished-looking internal dashboard: a header with a subtitle and a
button, four KPI cards with coloured change indicators, a list of recent activity, and a
footer. Narrowing the browser stacks the cards into one column without anything overflowing
or overlapping. Nothing responds to clicks, and nothing needs to.

## Skills demonstrated

A finished repository is evidence of all of this:

- **Scaffolding and shipping a React project** — Vite setup, a clean `npm run build`, a
  console with nothing in it (LESSON 2).
- **Components as the unit of work** — functions returning JSX, capitalised, one per file,
  exported and imported (LESSON 4).
- **Composition with `children`** — one wrapper component serving several sections rather
  than the same shell written three times (LESSON 5).
- **Judgement about boundaries** — components whose names describe the page, with nothing
  split so finely that the name adds no information (LESSON 6).
- **JSX in practice** — expressions in braces, `className`, the `style` object where a
  value is computed, fragments where a wrapper would be noise, and correct behaviour for
  values that render nothing (LESSON 7-10).
- **Tailwind for layout** — utility classes, a responsive grid that stacks on a narrow
  screen, and a `hover:` state (LESSON 12).
- **Class strings built in JavaScript** — a change indicator coloured by a value, chosen
  from complete class names rather than assembled by interpolation (LESSON 13).
- **Working like a developer** — small honest commits, and a README that describes what
  actually exists.

## Done when

- [ ] Every Core requirement above is ticked
- [ ] The page looks deliberate at both 380px and 1400px wide
- [ ] The two negative and positive indicators really are different colours, and searching
      the built CSS in `dist/assets/` finds both colour classes
- [ ] Flipping the sign of a card's number changes that indicator's colour by itself, with
      no class name edited anywhere
- [ ] Your file list reads like a description of the page
- [ ] `npm run build` passes and the console is clean
- [ ] The README explains what it is and says plainly that the data is static
- [ ] The repo is pushed, with a Description and 4-6 Topics set on GitHub

## Commits to aim for

Your history should show the page being built, not appearing in one lump:

```text
chore: scaffold vite react project with tailwind
feat: add page shell with header and footer
feat: add reusable section wrapper
feat: add kpi cards
feat: colour change indicators by direction
feat: add recent activity section
style: responsive grid and hover states
docs: add README with screenshot
```

## If you get stuck

Reread LESSON 12 for the Tailwind setup and LESSON 13 for the class-string rule — between
them they cause most of the problems at this stage. If a Tailwind class seems to do nothing,
check it appears complete in your source before you check anything else.

## Check your work

When you think you are finished — not before, and not instead of the checklist — open a new
session with an AI assistant and paste three things: `review-prompt.txt` from this folder,
the whole of this file, and your code.

It will check Core first and treat Bonus as optional, tell you what is wrong without fixing
it, and judge you only against this brief.
