const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes.js");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);

const connectedUsers = {};

app.use(cors());

io.on("connection", (socket) => {
  console.log("O pai tá on:", socket.id);
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;
});

mongoose.connect(
  "mongodb+srv://davi:davi@cluster0-wtj9f.gcp.mongodb.net/tindev?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use((request, response, next) => {
  request.io = io;
  request.connectedUsers = connectedUsers;
  return next();
});

app.use(express.json());
app.use(routes);

server.listen(3333);
