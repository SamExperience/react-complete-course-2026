// The lazily-loaded half of experiment 30.
// This file becomes its own JavaScript chunk: it is not downloaded until React.lazy asks for it.

console.log("   30-lazy-child module evaluated");

export default function LazyChart() {
  return (
    <div id="lazy-child">
      <h2>The lazy chart</h2>
      <p>
        This component lives in its own file, and its code was not in the first download. Open the
        Network tab, reload, and press the button again: the chunk arrives only then.
      </p>
    </div>
  );
}
