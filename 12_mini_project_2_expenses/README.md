# 12 — Mini-project 2: Expense Tracker

The second checkpoint. Everything from topics 01-11 (LESSON 1-35), in your own public
repository.

There are no lessons in this folder and nothing to run here. The work happens in a new
project beside this course.

## Path

**1. Read [PUBLISHING_GUIDE.md](../PUBLISHING_GUIDE.md)** — again if it has been a while.
Where the folder goes, how to scaffold it, the commit loop, what the README needs.

**2. Read [mini-project.md](mini-project.md)** — the brief. Core is the project; Bonus is
optional and skipping all of it still leaves you finished.

**3. Build it.** Small commits, each leaving the app working.

**4. Have it reviewed** — paste `review-prompt.txt`, the brief, and your code into a new AI
session. If you get stuck while building instead, `ai-prompt.txt` is the one that guides
without giving answers.

## What makes this one different from Mini-project 1

Mini-project 1 was a page: it showed things and nothing ever changed. This one is an
application. Data lives in state, the screen is a function of that state, and every
interaction goes through a setter you wrote.

Nothing is saved. There is no backend, no API and no storage of any kind — reloading the
page loses every expense, deliberately, because persistence is a later topic. Your repo's
README has to say so plainly rather than leave a reader guessing.

That also means it is the first project where you can create a bug that is not visible in
the markup — a total that drifts, a list that will not update, a row that deletes the wrong
expense. Topic 11 gave you the tool for exactly that.

## The thing people get wrong here

They put derived values in state.

A total is not a fact you store — it is a sum of the expenses you can already see. The
moment you add `const [total, setTotal] = useState(0)` you have signed up to update it in
every place that touches the list, and you will miss one. Same for the filtered list, the
count, and "is the list empty".

If you can calculate it during render, calculate it during render. That is LESSON 29, and
this project is where it stops being advice and starts being the difference between an app
that works and one that lies to you.

The second most common mistake is quietly mutating the expenses array — `push`, a direct
index assignment, or editing an expense object in place. The screen then updates sometimes,
which is worse than never.

## Files here

```
mini-project.md     the brief — what to build
review-prompt.txt   paste into an AI session when you think you are done
ai-prompt.txt       paste into an AI session while you are stuck
```
