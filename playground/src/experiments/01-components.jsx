// Experiment 01 — components and composition
// Used by LESSON 4, LESSON 5 and LESSON 6.

// A component is a function that returns JSX. The name must start with a capital letter.
function Greeting() {
  return <p>Hello from a component.</p>;
}

// A component that wraps whatever you nest inside it.
// React passes one object to every component; `children` is what was nested.
function Card({ children }) {
  return (
    <section>
      <hr />
      {children}
      <hr />
    </section>
  );
}

export default function Experiment01() {
  return (
    <div>
      <h1>Components and composition</h1>

      {/* Written once, used as many times as you like. */}
      <Greeting />
      <Greeting />

      {/* Everything nested here arrives inside Card as `children`. */}
      <Card>
        <h2>Inside a card</h2>
        <p>Card did not know about this heading. It just renders what it is given.</p>
      </Card>

      <Card>
        <p>A second card, with different contents.</p>
      </Card>

      {/* LESSON 4, the naming rule: lowercase means "HTML tag", not "my component".
          Uncomment the line below to see it. React creates an empty <greeting></greeting>
          and never calls the function — and logs an error every reload, so comment it
          back once you have seen it. */}
      <p>Below this line, a lowercase &lt;greeting /&gt; would go:</p>
      {/* <greeting /> */}
    </div>
  );
}
