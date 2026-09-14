# 19 — Mini-project 3: Employee Directory

The third checkpoint. Everything from topics 01-18 (LESSON 1-57), in your own public
repository.

There are no lessons in this folder and nothing to run here. The work happens in a new
project beside this course.

## Path

**1. Read [PUBLISHING_GUIDE.md](../PUBLISHING_GUIDE.md)** — again if it has been a while.

**2. Read [mini-project.md](mini-project.md)** — the brief. Core is the project; Bonus is
optional and skipping all of it still leaves you finished.

**3. Build it.** Small commits, each leaving the app working.

**4. Have it reviewed** — paste `review-prompt.txt`, the brief, and your code into a new AI
session. If you get stuck while building instead, `ai-prompt.txt` is the one that guides
without giving answers.

## What makes this one different from Mini-project 2

The expense tracker owned all its data. Nothing could be slow, nothing could fail, and there
was never a moment when the app did not know the answer.

This one asks a server. That single change introduces time: a gap before the data arrives, a
chance it never does, a chance two answers arrive in the wrong order, and a chance the answer
is "nobody matches". Most of the work in this project is being honest about those moments
rather than pretending they do not exist.

It is **read-only**, and that is deliberate. Writing data well needs permissions, validation
against a real schema, and an API that accepts writes — none of which you can learn from a
public demo endpoint. Reading data well is a complete skill on its own.

## The thing people get wrong here

They cannot tell their four states apart.

An empty list means "loading" on the first render, "nobody matches your search" after a search,
and "the request failed and I never set an error" when something broke. All three look
identical on screen, and all three are the same bug: **the component cannot distinguish states
it does not store.**

If `employees` starts as `[]` and there is no `loading` flag, no arrangement of JSX can save
you. Decide what you store first, and the rendering becomes obvious.

The second most common mistake is debouncing the input itself, so typing feels laggy. Keep the
controlled input instant; debounce only the expensive consequence.

## Files here

```
mini-project.md     the brief — what to build
review-prompt.txt   paste into an AI session when you think you are done
ai-prompt.txt       paste into an AI session while you are stuck
```
