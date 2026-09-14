// Experiment 07 — the event object
// Used by LESSON 23 and LESSON 24.
//
// Keep the console open. Every handler here only logs — nothing on the page changes,
// because changing the page needs state, which is topic 9.

export default function Experiment07() {
  function handleLink(event) {
    event.preventDefault(); // without this, the browser navigates away
    console.log("link clicked, navigation prevented");
  }

  function handleTyping(event) {
    // Reading a value out of the event. The input is NOT controlled by React —
    // it has no `value` prop. Controlled inputs are topic 10.
    console.log("typed:", event.target.value);
  }

  function handleOuter() {
    console.log("  outer div handler");
  }

  function handleInner() {
    console.log("inner button handler");
  }

  function handleInnerStopped(event) {
    event.stopPropagation();
    console.log("inner button handler (propagation stopped)");
  }

  // LESSON 24 — ONE handler for every button in the toolbar.
  // Each button carries its own data-action; the handler reads it off currentTarget.
  const toolbarActions = [
    { id: "refresh", label: "Refresh" },
    { id: "export", label: "Export" },
    { id: "archive", label: "Archive" },
  ];

  function handleToolbar(event) {
    console.log(
      "action:", event.currentTarget.dataset.action,
      "| target was:", event.target.tagName,
    );
  }

  return (
    <div>
      <h1>The event object</h1>

      <p>
        <a id="link" href="https://example.com" onClick={handleLink}>
          A link that does not navigate
        </a>
      </p>

      <p>
        <input id="field" placeholder="type here" onChange={handleTyping} />
      </p>

      <h2>Bubbling</h2>
      <div id="outer" onClick={handleOuter} style={{ padding: "1rem", border: "1px solid" }}>
        outer div
        <p>
          <button id="inner" onClick={handleInner}>Click me — both handlers run</button>
        </p>
        <p>
          <button id="inner-stopped" onClick={handleInnerStopped}>
            Click me — only this one runs
          </button>
        </p>
      </div>

      <h2>One handler, many buttons</h2>
      <div id="toolbar">
        {toolbarActions.map((action) => (
          <button
            key={action.id}
            id={`btn-${action.id}`}
            data-action={action.id}
            onClick={handleToolbar}
          >
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
