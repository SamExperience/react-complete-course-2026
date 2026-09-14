// Experiment 03 — conditional rendering
// Used by LESSON 18.

function Badge({ children }) {
  return <b>[{children}]</b>;
}

// 1. EARLY RETURN — the whole component renders nothing.
function Notice({ text }) {
  if (!text) return null;
  return <p>Notice: {text}</p>;
}

// 2. TERNARY — one of two things, inside a tree that always renders.
function Status({ online }) {
  return <p>Status: {online ? "Online" : "Offline"}</p>;
}

// 3. && — something or nothing, inside a tree that always renders.
//    THIS ONE IS THE TRAP. `count` is a number, so when it is 0 the
//    expression evaluates to 0 — and React renders 0.
function CartBroken({ count }) {
  return (
    <p>
      Broken guard (count={String(count)}): {count && <Badge>has items</Badge>}
    </p>
  );
}

// The fix: put a real boolean on the left.
function CartFixed({ count }) {
  return (
    <p>
      Boolean guard (count={String(count)}): {count > 0 && <Badge>has items</Badge>}
    </p>
  );
}

export default function Experiment03() {
  return (
    <div>
      <h1>Conditional rendering</h1>

      <Notice text="Shipping is delayed" />
      <Notice text="" />

      <Status online={true} />
      <Status online={false} />

      <hr />

      {/* Watch these two lines. Same data, different guard. */}
      <CartBroken count={0} />
      <CartFixed count={0} />

      <CartBroken count={3} />
      <CartFixed count={3} />

      <hr />

      {/* The other falsy values, straight into a tree. */}
      <p>false: {false && <Badge>x</Badge>}|</p>
      <p>null: {null && <Badge>x</Badge>}|</p>
      <p>undefined: {undefined && <Badge>x</Badge>}|</p>
      <p>empty string: {"" && <Badge>x</Badge>}|</p>
      <p>zero: {0 && <Badge>x</Badge>}|</p>
      <p>NaN: {NaN && <Badge>x</Badge>}|</p>
    </div>
  );
}
