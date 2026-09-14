// Experiment 30 — long lists, key stability, and React.lazy + Suspense
// Used by LESSON 73.
//
// Two things to watch:
//
//   1. rendering 5000 rows versus the 50 that fit on screen — the same data, measured
//   2. a component that is not downloaded until you ask for it, with a Suspense fallback
//      while it arrives

import { Suspense, lazy, useState } from "react";

const LazyChart = lazy(() => import("./30-lazy-child.jsx"));

const ROWS = Array.from({ length: 5000 }, (_, i) => ({ id: i, name: `row-${i}` }));

function List({ rows }) {
  const start = performance.now();
  const items = rows.map((row) => <li key={row.id}>{row.name}</li>);
  window.__lastListMs = performance.now() - start;
  return <ul id="rows">{items}</ul>;
}

export default function Experiment30() {
  const [all, setAll] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const rows = all ? ROWS : ROWS.slice(0, 50);

  console.log(`   Experiment30 render — ${rows.length} rows, chart: ${showChart}`);

  return (
    <div>
      <h1>Long lists and lazy loading</h1>

      <p>
        <button id="toggle-rows" onClick={() => setAll((v) => !v)}>
          {all ? "show 50 rows" : "show all 5000 rows"}
        </button>{" "}
        currently rendering <b id="row-count">{rows.length}</b> rows
      </p>

      <p>
        <button id="load-chart" onClick={() => setShowChart(true)}>
          load the chart
        </button>
      </p>

      {showChart && (
        <Suspense fallback={<p id="fallback">Loading the chart…</p>}>
          <LazyChart />
        </Suspense>
      )}

      <List rows={rows} />
    </div>
  );
}
