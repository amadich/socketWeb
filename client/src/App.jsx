import { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io.connect("http://localhost:3001");
function App() {
  const [msg,setMsg] = useState("");
  const [recieved , setRecieved] = useState("");
  const [room, setRoom] = useState("");
  const send_msg = () => {
    socket.emit("msg_send" , {message : msg , room});
  }

  const join_room = () => {
    socket.emit("join_room" , room);
  }

  useEffect(() => {
      socket.on("resive_msg", (response) => {
        setRecieved(response);
      })
  }, [socket])

  return ( 
    <>
      <div>
        <input type="text" placeholder='Room name' onChange={(e) => {setRoom(e.target.value)}} /> <button onClick={join_room}>Join Room</button> <br />
          <input type="text" placeholder="Type Message ..." onChange={(e) => {setMsg(e.target.value)}} />
          <button onClick={send_msg}>Send Message</button>

        <h1>Message : {recieved}</h1>


      </div>
    </>
   );
}

export default App;