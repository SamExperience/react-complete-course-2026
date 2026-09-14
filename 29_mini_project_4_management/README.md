# 29 — Mini-project 4: Project Management

The final checkpoint, and the end of the course. Everything from topics 01-28
(LESSON 1-92), in your own public repository — and this time, deployed.

There are no lessons in this folder and nothing to run here. The work happens in a new
project beside this course.

## Path

**1. Read [PUBLISHING_GUIDE.md](../PUBLISHING_GUIDE.md)** — again if it has been a while.
Repository name: `react-project-management`.

**2. Read [mini-project.md](mini-project.md)** — the brief. Core is the project; the bonus
list is genuinely optional and nothing in it is needed for the project to be complete.

**3. Build it.** Expect this one to take longer than the first three combined. It is the only
project in the course that uses routing, a store, an async thunk, Actions, tests and a
deployment at the same time, and the difficulty is in the *combination*, not in any one piece.

**4. Deploy it.** This is part of Core, not an afterthought. A capstone nobody can open is
half a capstone.

**5. Review it** with [review-prompt.txt](review-prompt.txt) before you call it finished.

## What makes this one different

The first three mini-projects each closed a part of the course. This one closes the course, and
it is deliberately the first time you have to make several things agree with each other:

- the **URL** and the **store** both describe what the user is looking at, and they must not
  disagree — the route says which project, the store says what is in it
- an **Action** writes to the store, and the form's state, the store's state and the URL are
  three different things with three different owners
- a **thunk** loads data that a **route** may already be pointing into, so a deep link has to
  survive arriving before the data does
- and the **deployment** only works if the host knows nothing about any of it

None of that is new material. It is the same material, at the same time, which is the last
thing a course can usefully make you do.

## Scope, in one line

Routed projects and tasks, a Redux Toolkit store with one async thunk, one custom hook, an
Action-based form with `useActionState`, four tests over pure logic, and a live URL with a
working SPA fallback.

Everything else — editing projects, due dates, drag and drop, authentication, persistence — is
explicitly **not** required, and leaving it out is the correct decision rather than an
unfinished one.

## Two rules from earlier that matter most here

**Core is complete on its own.** A finished project has no `useOptimistic`, no `useTransition`
and no memoization in it unless you measured a reason. The bonus list is where those live, and
the performance bonus specifically requires a before-and-after Profiler reading.

**Measure before optimising.** Topic 23's rule survives into your own work: if you cannot say
what was slow and by how much, the change is not an optimisation, it is a guess with extra code.

## After this

There is nothing after this. You have the four repositories, and the only thing that turns a
finished course into a skill is building something nobody set as an exercise — ideally something
small, that you actually want to exist, and that will annoy you enough to finish.
