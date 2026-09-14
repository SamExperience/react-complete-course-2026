# Publishing guide

Four times in this course you stop and build something in **your own public repository**:
after topics 04, 11, 18 and 28. Each one has a brief — `mini-project.md` in its folder —
telling you *what* to build. This guide covers everything those four briefs have in
common: where the folder goes, how to scaffold it, how to commit, and what "finished"
means.

Read it once before mini-project 1. After that, come back only for the checklists.

## Why bother

The notebooks give you a concept, a small example and an exercise with a solution beside
it. That is right for learning, and it is also why nobody can tell from the outside
whether you understood anything.

A mini-project starts from an empty folder. Nothing is set up. That is the point: it is
where you find out what you actually know, and it leaves a public record — a short,
honest commit history showing you built it step by step.

The `playground/` folder inside this course is **not** one of these. It is a scratch
space for seeing React behave. Never publish it.

## Core and Bonus

Every brief splits its requirements in two.

- **Core** is the project. Every Core requirement uses only concepts the course has
  already taught, and together they make something complete. Implement all of Core and
  the project is finished — genuinely finished, not "finished for a beginner".
- **Bonus** is optional. It never adds anything the project needs, and skipping all of it
  costs you nothing. It is there if you want to push further.

Do Core first, completely. A half-built Core with two bonus features bolted on is a worse
repository than Core alone.

## 1. Where the folder goes

**Beside the course, never inside it.** The course is a git repository. A repository
inside another repository breaks in confusing ways: your files silently fail to commit,
or they end up in the wrong project.

```
your-projects-folder/
├── react-complete-course/        this course — you read here, you never write here
├── react-business-dashboard/     mini-project 1
├── react-expense-tracker/        mini-project 2
├── react-employee-directory/     mini-project 3
└── react-project-management/     mini-project 4
```

```bash
cd your-projects-folder          # the folder CONTAINING the course, not the course
mkdir react-business-dashboard
cd react-business-dashboard
```

Now check you are in the right place **before writing any code**:

```bash
git rev-parse --show-toplevel
```

- `fatal: not a git repository` — correct. You have not run `git init` yet.
- A path ending in `react-business-dashboard` — correct, after `git init`.
- A path ending in `react-complete-course` — **wrong**. You are inside the course. Move
  the folder out and start again.

## 2. Create the repository

On github.com: **New repository**. Use the name the brief gives you, set it to **Public**,
and add nothing — no README, no `.gitignore`, no license. Vite generates a correct
`.gitignore` for you, and starting empty avoids a conflict on your first push.

Then, in your project folder:

```bash
npm create vite@latest . -- --template react
npm install
git init
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
```

`git branch -M main` is not optional. On a machine that has never set
`init.defaultBranch`, `git init` names the first branch `master`, and the first push in
§3 — `git push -u origin main` — then fails with
`error: src refspec main does not match any`. Renaming the branch here means the push
works the first time, on any machine.

The `--template react` part matters: it scaffolds the project **without asking you
anything**, and `react` is the JavaScript template. Run `npm create vite@latest` on its own
and it turns interactive instead, asking for a project name, a framework and a variant —
where you would have to remember to pick **JavaScript**, not TypeScript. The flag answers
all of that for you, which is why every brief uses it.

The template also ships a linter (`oxlint`, with a `npm run lint` script and an
`.oxlintrc.json`). Nothing in this course depends on it. Run it if you like it, delete both
if you don't — neither choice affects any brief.

The scaffold is a working demo page, not an empty project. Before you write anything,
delete what you will not use: everything inside `src/App.jsx`, the images in `src/assets/`
(`hero.png`, `react.svg`, `vite.svg`), `public/icons.svg`, the generated `README.md`, and
the boilerplate rules in `src/App.css` and `src/index.css`. Leave `index.html` and
`src/main.jsx` alone — the `<div id="root">` and the `createRoot` call are what your app is
mounted on. Shipping a repo that still shows Vite's "Get started" page tells a reader you
stopped before the first step.

Now start the dev server and leave it running while you work:

```bash
npm run dev
```

It occupies the terminal until you stop it with **Ctrl-C** — which is why it is a step of
its own rather than another line in the block above. Open a second terminal for git, or
stop the server whenever you need to commit.

## 3. The commit loop

Run this sequence for every commit. Learn it once here and it stops being a decision.

```bash
git status          # what changed? Anything unexpected in the list?
git diff            # read every changed line before staging it
git add .           # or: git add <file>, to be selective
git diff --staged   # last look at what is actually about to be committed
git commit -m "feat: ..."
git push            # first push on a new repo: git push -u origin main
```

`git status` and `git diff` are not ceremony. They are where you catch a forgotten
`console.log`, a file you did not mean to touch, or `node_modules` showing up because
`.gitignore` is wrong. If you ever see `node_modules/`, `dist/` or `.env` in `git status`,
stop and fix `.gitignore` before committing.

**`.env` in particular.** Vite's generated `.gitignore` already covers it — check that it
does, and never remove the line. Commit a `.env.example` listing the variable **names** with
empty values instead, so the next person knows what to set. And note what LESSON 91 proves by
measurement: a `VITE_*` variable is compiled into the built JavaScript in plain text, so it is
public whether or not the repository is. Nothing secret goes in one, in any project, ever.

**When to commit:** when one coherent change is finished and you have checked it works.
Not once per component, not "because an hour has passed". Each commit on its own should
leave the project in a working state.

A natural history for a React mini-project looks like this:

```text
chore: scaffold vite react project
feat: add layout shell with header and nav
feat: add expense list component
feat: add expense form with validation
feat: filter expenses by category
fix: reject a negative amount on submit
docs: add README with setup and screenshot
```

## 4. Commit messages

```text
feat:      new behaviour the user can see
fix:       corrects something that behaved wrongly
refactor:  code reorganised, behaviour unchanged
style:     appearance only (CSS, classes), no logic
docs:      documentation only (README, comments)
test:      tests added or changed
chore:     setup, dependencies, configuration
```

Imperative mood, lowercase after the colon, no full stop:

```text
GOOD                                          BAD
feat: render kpi cards in the dashboard       update
fix: reject an empty category on submit       fix
refactor: move fetch into a service file      changes
docs: add README with setup steps             final-final
```

"update" tells you nothing in six months, and tells a reader of your profile even less.

## 5. Your project's README

Write it for someone who has never seen the project. Required sections:

~~~markdown
# Project Name

One line: what this does.

## Overview

2–4 lines: what it does and what it was for. Say plainly that it is a learning project —
that is a strength, not something to hide.

## Features

- what a user can actually do
- one line each

## Technologies

- React, Vite
- anything else the project actually uses (Tailwind, React Router, Redux Toolkit…)
- any external API, with a link

## Getting started

```bash
npm install
npm run dev
```

## What I learned

2–4 lines, in your own words. The most-read section for anyone judging your work.

## Screenshots

(at least one)
~~~

One rule: **the README describes the code that exists**, not what you plan to add. If
something is unfinished, put it under a short "Future improvements" heading or leave it
out. If you implemented bonus features, say so — and if you did not, say nothing. A Core
project needs no apology.

## 6. Before you call it finished

```text
[ ] every Core requirement in the brief is implemented
[ ] every item in the brief's "Done when" list passes
[ ] npm run build completes with no errors
[ ] browser console is clean — no errors, no warnings
[ ] the React DevTools Components tab shows a tree you can explain (from topic 11 on)
[ ] .gitignore covers node_modules, dist and .env
[ ] no secret in any VITE_* variable — it would be published in the bundle (LESSON 91)
[ ] README written, with a screenshot
[ ] Description and 4–6 Topics set on GitHub (⚙️ next to "About")
[ ] git status is clean, everything pushed
```

Deployment is taught in topic 28 and is a Core requirement for mini-project 4 only. For
the first three projects, readable code, an honest history and a clear README are what
matter.

## 7. Have your project reviewed

Every brief ships with a `review-prompt.txt`, in the same folder. When you believe the
project is finished — not before, and not instead of the checklist above — open a new
session with an AI assistant and paste three things: that prompt, the whole of
`mini-project.md`, and your code.

The brief goes in so the assistant judges you against *this* project's requirements rather
than its own idea of what a React app should be. It will check Core first, treat Bonus as
optional, name what is wrong without fixing it for you, and stay inside what the course has
taught. If it finds nothing, you are done: write the README and push.
