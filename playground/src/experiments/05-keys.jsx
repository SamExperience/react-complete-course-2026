// Experiment 05 — keys
// Used by LESSON 20.
//
// Both lists below render the SAME data. Only the key differs.
// Type a note into the first input of each list, then delete the first product
// from the array and save. Watch what happens to the notes.

const products = [
  { id: "p1", name: "Bread" },
  { id: "p2", name: "Milk" },
  { id: "p3", name: "Eggs" },
];

function Row({ product }) {
  return (
    <li>
      {product.name} <input placeholder="your note" />
    </li>
  );
}

export default function Experiment05() {
  return (
    <div>
      <h1>Keys</h1>

      <h2>Keyed by index — key={"{index}"}</h2>
      <ul id="by-index">
        {products.map((product, index) => (
          <Row key={index} product={product} />
        ))}
      </ul>

      <h2>Keyed by id — key={"{product.id}"}</h2>
      <ul id="by-id">
        {products.map((product) => (
          <Row key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
