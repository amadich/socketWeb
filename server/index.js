const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const http = require("http");
const { Server } = require("socket.io");

//
app.use(cors());
//
const server = http.createServer(app);
const io = new Server(server,{
   cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
   }
})

io.on("connection", (socket) => {
   userId = socket.id;
   console.log("User Connected " + socket.id);

   socket.on("join_room" , (data) => {
      socket.join(data);
   })

   socket.on("msg_send" , (data) => {
      socket.to(data.room).emit("resive_msg" , data)
   })

   socket.on("disconnect", (socket) => {
      console.log(`User ${userId} Leave The Socket Room!!`);
   })

})

server.listen(PORT, () => {
   console.log(`We are Connecting in -> ${PORT}`);
})