// Experiment 02 — props
// Used by LESSON 14, LESSON 15, LESSON 16 and LESSON 17.

// LESSON 14 — one component, used many times. React hands it ONE object;
// `{ label, value, ... }` destructures that object in the signature.
// LESSON 15 — `unit` and `featured` have defaults.
function KpiCard({ label, value, unit = "EUR", featured = false }) {
  // Statements go above the return (LESSON 8); the value goes in the braces.
  const prefix = featured ? "* " : "";

  return (
    <section>
      <h3>
        {prefix}
        {label}
      </h3>
      <p>
        {value} {unit} — JavaScript says value is a {typeof value}
      </p>
    </section>
  );
}

// LESSON 15 — an object and an array arriving as props. Reading a field is what
// renders; rendering {meta} itself would throw "Objects are not valid as a React child".
function Meta({ meta, regions }) {
  return (
    <p>
      {meta.currency} · {regions.join(", ")}
    </p>
  );
}

// LESSON 16 — the parent passes a function down; the child calls it.
function ActivityRow({ label, id, onSelect }) {
  return <button onClick={() => onSelect(id)}>{label}</button>;
}

// LESSON 17 — two holes: `children` is filled by nesting, `header` by name.
// Leave `header` off and it is undefined, which renders nothing. No condition needed.
function Panel({ header, children }) {
  return (
    <section>
      <div>{header}</div>
      <div>{children}</div>
    </section>
  );
}

// LESSON 17 — a prop holding a COMPONENT, so the child decides when to render it.
// The prop must be capitalised where it is used, or JSX reads it as an HTML tag.
function StarIcon() {
  return <span>*</span>;
}

function Media({ Icon, children }) {
  return (
    <p>
      <Icon /> {children} <Icon />
    </p>
  );
}

export default function Experiment02() {
  function handleSelect(id) {
    console.log("parent was told about", id);
  }

  return (
    <div>
      <h1>Props</h1>

      {/* LESSON 14 — written once, used four times with different data. */}
      <KpiCard label="Revenue" value="128,400" />
      <KpiCard label="Orders" value={1284} unit="items" />
      <KpiCard label="Active customers" value={612} featured />

      {/* LESSON 15 — `unit={null}` does NOT fall back to the default.
          Look at the line below: the unit is simply missing. */}
      <KpiCard label="Refunds" value={37} unit={null} />

      {/* LESSON 15 — quotes give a string, braces give the value.
          Compare the two `typeof` results on screen. */}
      <KpiCard label={'value="1284"'} value="1284" />
      <KpiCard label="value={1284}" value={1284} />

      {/* LESSON 15 — an object and an array, both inside braces. */}
      <Meta meta={{ currency: "EUR" }} regions={["EU", "US"]} />

      {/* LESSON 16 — click it and watch the console. */}
      <ActivityRow label="Order #4821 shipped" id={4821} onSelect={handleSelect} />

      {/* LESSON 17 — the same Panel, one with a header slot filled and one without. */}
      <Panel header={<h2>Revenue</h2>}>
        <p>12,400 EUR</p>
      </Panel>

      <Panel>
        <p>This panel has no header, and nothing had to check for one.</p>
      </Panel>

      {/* LESSON 17 — a component passed as a prop, rendered twice by the child. */}
      <Media Icon={StarIcon}>Featured</Media>
    </div>
  );
}
