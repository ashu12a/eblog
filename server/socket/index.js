export default function socketConnection(io) {
  io.on("connection", (socket) => {
    // console.log("🟢 New client connected:", socket.id);

    socket.on("message", (data) => {
      // console.log("📨 Message from client:", data);
      socket.broadcast.emit("message", data); // send to others
    });

    socket.on("maintenance", (data) => {
      // console.log("📨 Message from client:", data);
      socket.broadcast.emit("maintenance", data); // send to others
    });

    socket.on("disconnect", () => {
      // console.log("🔴 Client disconnected:", socket.id);
    });
  });
}
