import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { Server } from "socket.io";
dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    const port = process.env.PORT || 4000;
    const server = app.listen(port, () => {
      console.log(`App is listening on port ${port}`);
    });
    const io = new Server(server, {
      pingTimeout: 60000,
      cors: {
        origin: `${process.env.FRONTEND_URL}`,
      },
    });
    io.on("connection", (socket) => {
      console.log("connected to socket.io");
      socket.on("setup", (userData) => {
        socket.join(userData?._id);
        socket.emit("connected");
      });

      socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
      });

      socket.on("typing", (room) => socket.in(room).emit("typing"));
      socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

      socket.on("new message", (newMessageReceived) => {
        var chat = newMessageReceived.chat;
        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
          if (user._id == newMessageReceived.sender._id) return;

          socket.in(user._id).emit("message received", newMessageReceived);
        });
      });
      socket.off("setup", () => {
        console.log("user disconnected");
        socket.leave(userData._id);
      });
    });
  })
  .catch((err) => {
    console.log("DB connection error", err?.message);
  });
