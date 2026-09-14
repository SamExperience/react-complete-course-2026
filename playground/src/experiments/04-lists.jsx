// Experiment 04 — rendering a list with .map()
// Used by LESSON 19.
//
// This file deliberately renders lists WITHOUT a `key`, so React logs
// "Each child in a list should have a unique "key" prop." in the console.
// That warning is LESSON 20's subject. Ignore it for now — it is expected here.

const products = [
  { name: "Bread", price: "2.40" },
  { name: "Milk", price: "1.15" },
  { name: "Eggs", price: "3.80" },
];

function ProductRow({ name, price }) {
  return (
    <li>
      {name} — {price} EUR
    </li>
  );
}

export default function Experiment04() {
  return (
    <div>
      <h1>Rendering a list</h1>

      <p>
        One array of {products.length} products becomes {products.length} elements.
      </p>

      {/* data -> .map() -> an array of elements -> React renders each one */}
      <ul id="rows">
        {products.map((product) => (
          <ProductRow name={product.name} price={product.price} />
        ))}
      </ul>

      <h2>Mapped straight to markup</h2>
      <ul id="plain">{products.map((product) => <li>{product.name}</li>)}</ul>

      <h2>The broken callback</h2>
      <ul id="broken">
        {products.map((product) => {
          <li>{product.name}</li>;
        })}
      </ul>
      <p>
        The list above is empty. The callback has a block body and no `return`, so it gave
        back `undefined` three times — and `undefined` renders nothing.
      </p>
    </div>
  );
}
