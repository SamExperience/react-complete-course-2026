// Experiment 31 — spinners, skeletons and layout shift
// Used by LESSON 74.
//
// The same fake 800ms load, shown two ways. Watch what happens to the content BELOW the
// loading area when the data arrives:
//
//   - a small spinner occupies almost no space, so everything below jumps when the real
//     content appears
//   - a skeleton the size of the real content occupies the right space, so nothing moves
//
// window.__shift records how far the footer moved, in pixels.

import { useEffect, useState } from "react";

const ROWS = [
  { id: 1, name: "Ada Lovelace", role: "Analyst" },
  { id: 2, name: "Grace Hopper", role: "Engineer" },
  { id: 3, name: "Alan Turing", role: "Researcher" },
  { id: 4, name: "Katherine Johnson", role: "Mathematician" },
];

function useFakeLoad(reloadKey) {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    setRows(null);
    const id = setTimeout(() => setRows(ROWS), 800);
    return () => clearTimeout(id);
  }, [reloadKey]);

  return rows;
}

function Spinner() {
  return <p id="spinner">Loading…</p>;
}

// A skeleton is not a spinner in grey: it is the SHAPE of the content that is coming.
function Skeleton() {
  return (
    <ul id="skeleton" style={{ listStyle: "none", padding: 0 }}>
      {ROWS.map((row) => (
        <li
          key={row.id}
          style={{ height: "1.5em", margin: "0.25em 0", background: "#e6e6e6", borderRadius: 3 }}
        />
      ))}
    </ul>
  );
}

function Rows({ rows }) {
  return (
    <ul id="rows" style={{ listStyle: "none", padding: 0 }}>
      {rows.map((row) => (
        <li key={row.id} style={{ height: "1.5em", margin: "0.25em 0" }}>
          {row.name} — {row.role}
        </li>
      ))}
    </ul>
  );
}

export default function Experiment31() {
  const [useSkeleton, setUseSkeleton] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const rows = useFakeLoad(reloadKey);

  // measure how far the footer moves between the loading state and the loaded state
  useEffect(() => {
    const footer = document.getElementById("below");
    if (!footer) return;
    const top = footer.getBoundingClientRect().top;
    if (rows === null) {
      window.__footerWhileLoading = top;
    } else {
      window.__footerWhenLoaded = top;
      window.__shift = Math.round(top - (window.__footerWhileLoading ?? top));
      console.log(
        `   ${useSkeleton ? "skeleton" : "spinner"} — footer moved ${window.__shift}px`,
      );
    }
  }, [rows, useSkeleton]);

  return (
    <div>
      <h1>Loading UI</h1>

      <p>
        <label>
          <input
            id="mode"
            type="checkbox"
            checked={useSkeleton}
            onChange={(e) => setUseSkeleton(e.target.checked)}
          />{" "}
          use a skeleton instead of a spinner
        </label>{" "}
        <button id="reload" onClick={() => setReloadKey((k) => k + 1)}>
          reload
        </button>
      </p>

      <div id="slot">
        {rows === null ? (useSkeleton ? <Skeleton /> : <Spinner />) : <Rows rows={rows} />}
      </div>

      <p id="below">
        <b>This paragraph is below the content.</b> Watch whether it moves when the rows arrive.
      </p>
    </div>
  );
}
