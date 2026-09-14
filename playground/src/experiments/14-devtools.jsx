// Experiment 14 — a tree worth inspecting
// Used by LESSON 34.
//
// This one is not meant to be read. Open the React DevTools *Components* tab and
// look at it there instead: four component types, three levels deep, props coming
// down and state at the top.
//
// There is also something wrong with it on purpose. The page shows the "Lead"
// badge next to the wrong person, and nothing in the markup explains why.
// LESSON 34's mini challenge is finding out which value is to blame.

import { useState } from "react";

const team = [
  { id: "m1", name: "Ada Lovelace", role: "Engineering" },
  { id: "m2", name: "Grace Hopper", role: "Engineering" },
  { id: "m3", name: "Katherine Johnson", role: "Research" },
];

function MemberCard({ member, isLead }) {
  return (
    <li>
      <b>{member.name}</b> — {member.role}
      {isLead && <span style={{ color: "seagreen" }}> ★ Lead</span>}
    </li>
  );
}

function MemberList({ members, leadId }) {
  if (members.length === 0) {
    return <p>No one matches that search.</p>;
  }

  return (
    <ul>
      {members.map((member) => (
        <MemberCard key={member.id} member={member} isLead={member.id === leadId} />
      ))}
    </ul>
  );
}

function SearchBox({ value, onChange }) {
  return (
    <label>
      search:{" "}
      <input id="search" name="query" value={value} onChange={onChange} />
    </label>
  );
}

function Panel({ title, children }) {
  return (
    <section style={{ border: "1px solid #ccc", padding: "0.5rem 1rem" }}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function Experiment14() {
  const [query, setQuery] = useState("");
  const [leadId, setLeadId] = useState("m2");

  const visible = team.filter((member) =>
    member.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div>
      <h1>Inspect me</h1>

      <Panel title="Team">
        <SearchBox value={query} onChange={(event) => setQuery(event.target.value)} />
        <MemberList members={visible} leadId={leadId} />
      </Panel>

      <p>
        <button id="promote" onClick={() => setLeadId("m1")}>
          Make Ada the lead
        </button>
      </p>
    </div>
  );
}
