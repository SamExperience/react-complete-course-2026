// Experiment 26 — Context
// Used by LESSON 56 and 57.
//
// The same tree as experiment 25, with one difference: the components in the middle
// no longer mention `user` at all. Compare the two files side by side — that is the
// whole lesson.
//
// Note the provider: <UserContext value={...}>, used directly. In React 19 the
// context itself is the provider; <UserContext.Provider> is the older spelling and
// still works.
//
// The second half shows TWO separate contexts, because one provider per concern is
// better than one provider carrying everything.

import { createContext, useContext, useState } from "react";

const UserContext = createContext(null);
const ThemeContext = createContext("light");

function Avatar() {
  const user = useContext(UserContext);          // reads it directly
  const theme = useContext(ThemeContext);
  console.log(`   Avatar — reads user "${user.name}" and theme "${theme}"`);
  return (
    <span id="avatar" style={{ background: theme === "dark" ? "#333" : "#eee", padding: "2px 6px" }}>
      {user.name} ({user.initials})
    </span>
  );
}

function Toolbar() {
  console.log("   Toolbar — knows nothing about the user");
  return (
    <div>
      <button>Save</button> <Avatar />
    </div>
  );
}

function Header() {
  console.log("   Header — knows nothing about the user");
  return (
    <header>
      <h2>Dashboard</h2>
      <Toolbar />
    </header>
  );
}

function Page() {
  console.log("   Page — knows nothing about the user");
  return (
    <section>
      <Header />
      <p>Some page content that does not care who you are.</p>
    </section>
  );
}

function Layout() {
  console.log("   Layout — knows nothing about the user");
  return (
    <main>
      <Page />
    </main>
  );
}

export default function Experiment26() {
  const [user, setUser] = useState({ name: "Ada Lovelace", initials: "AL" });
  const [theme, setTheme] = useState("light");

  console.log("   App — provides user and theme");

  return (
    <div>
      <h1>Context</h1>

      <p>
        <button id="switch-user" onClick={() => setUser({ name: "Grace Hopper", initials: "GH" })}>
          switch user
        </button>{" "}
        <button id="switch-theme" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          toggle theme
        </button>
      </p>

      <UserContext value={user}>
        <ThemeContext value={theme}>
          <Layout />
        </ThemeContext>
      </UserContext>

      <hr />
      <p>
        A nested provider overrides the value for its own subtree only:
      </p>
      <UserContext value={{ name: "Katherine Johnson", initials: "KJ" }}>
        <ThemeContext value={theme}>
          <p id="nested">
            nested: <Avatar />
          </p>
        </ThemeContext>
      </UserContext>
    </div>
  );
}
