// Experiment 25 — prop drilling, felt
// Used by LESSON 55.
//
// `user` is needed in exactly ONE place: the Avatar, five levels down. Every
// component in between takes it as a prop and does nothing with it but pass it on.
//
// Count the components that mention `user`. Then count the ones that USE it.
//
// The console logs which components received the prop and which actually read it.

function Avatar({ user }) {
  console.log("   Avatar — USES user:", user.name);
  return <span id="avatar">{user.name} ({user.initials})</span>;
}

function Toolbar({ user }) {
  console.log("   Toolbar — only passes user on");
  return (
    <div>
      <button>Save</button> <Avatar user={user} />
    </div>
  );
}

function Header({ user }) {
  console.log("   Header — only passes user on");
  return (
    <header>
      <h2>Dashboard</h2>
      <Toolbar user={user} />
    </header>
  );
}

function Page({ user }) {
  console.log("   Page — only passes user on");
  return (
    <section>
      <Header user={user} />
      <p>Some page content that does not care who you are.</p>
    </section>
  );
}

function Layout({ user }) {
  console.log("   Layout — only passes user on");
  return (
    <main>
      <Page user={user} />
    </main>
  );
}

export default function Experiment25() {
  const user = { name: "Ada Lovelace", initials: "AL" };
  console.log("   App — owns the user");

  return (
    <div>
      <h1>Prop drilling</h1>
      <p>
        Five components mention <code>user</code>. One uses it.
      </p>
      <Layout user={user} />
    </div>
  );
}
