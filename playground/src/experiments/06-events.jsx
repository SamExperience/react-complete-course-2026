// Experiment 06 — event handlers
// Used by LESSON 22.
//
// Open the console before you click anything. One of these buttons has already
// logged something before you touched it.

function Experiment06() {
  function handleClick() {
    console.log("handleClick ran");
  }

  function handleGreet(name) {
    console.log("hello,", name);
  }

  return (
    <div>
      <h1>Event handlers</h1>

      {/* Passed, not called. React calls it when the click happens. */}
      <p>
        <button id="ok" onClick={handleClick}>
          Passed correctly
        </button>
      </p>

      {/* An arrow lets you pass an argument. The arrow is what gets passed;
          handleGreet runs only when the arrow is called. */}
      <p>
        <button id="arrow" onClick={() => handleGreet("Ada")}>
          Arrow passes an argument
        </button>
      </p>

      {/* THE MISTAKE: the () runs it during render, and onClick receives
          whatever it returned - here, undefined. */}
      <p>
        <button id="broken" onClick={handleClick()}>
          Called by mistake
        </button>
      </p>
    </div>
  );
}

export default Experiment06;
