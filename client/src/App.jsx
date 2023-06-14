import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001");

function App() {
  const [msg, setMsg] = useState("");
  const [received, setReceived] = useState([]);
  const [room, setRoom] = useState("");

  const send_msg = () => {
    socket.emit("msg_send", { message: msg, room });
  };

  const join_room = () => {
    socket.emit("join_room", room);
  };

  useEffect(() => {
    socket.on("resive_msg", (response) => {
      setReceived((prevReceived) => [...prevReceived, response]);
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("resive_msg");
    };
  }, []);

  return (
    <>
      <div>
        <input type="text" placeholder='Room name' onChange={(e) => { setRoom(e.target.value) }} /> 
        <button onClick={join_room}>Join Room</button> <br />

        <input type="text" placeholder="Type Message ..." onChange={(e) => { setMsg(e.target.value) }} />
        <button onClick={send_msg}>Send Message</button>

        <h1>Messages:</h1>
        <ul>
          {received.map((message, key) => (
            <li key={key}>{message.message}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
