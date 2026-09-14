// Experiment 17 — cleanup
// Used by LESSON 41.
//
// A pretend connection that logs when it opens and when it closes. Watch the ORDER:
//
//   switching room  ->  cleanup of the OLD room, then setup of the NEW one
//   unmounting      ->  cleanup only
//
// Reminder: <StrictMode> runs one extra setup+cleanup cycle in development before
// the first real setup, on purpose — it is checking that your cleanup really does
// undo your setup. That is why the first lines appear doubled.

import { useEffect, useState } from "react";

function ChatRoom({ roomId }) {
  useEffect(() => {
    console.log(`   setup   — connected to "${roomId}"`);

    return () => {
      console.log(`   cleanup — disconnected from "${roomId}"`);
    };
  }, [roomId]);

  return (
    <p>
      connected to <b id="room">{roomId}</b>
    </p>
  );
}

export default function Experiment17() {
  const [roomId, setRoomId] = useState("general");
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <h1>Cleanup</h1>

      <p>
        <button id="general" onClick={() => setRoomId("general")}>general</button>{" "}
        <button id="random" onClick={() => setRoomId("random")}>random</button>{" "}
        <button id="toggle" onClick={() => setVisible(!visible)}>
          {visible ? "unmount the chat" : "mount the chat"}
        </button>
      </p>

      {visible ? <ChatRoom roomId={roomId} /> : <p id="gone">(chat is not on screen)</p>}
    </div>
  );
}
