import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes';

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URI || '';

const app = express();
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

const connectedUsers = {};


type SocketType = {
  id: string;
  handshake: {
    query: {
      user: string;
    }
  }
}

io.on('connection', (socket: SocketType) => {
  console.log('O pai tá on:', socket.id);
  const {user} = socket.handshake.query;
  Object.defineProperty(connectedUsers, user, socket.id);
});

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((request, response, next) => {
  request.io = io;
  request.connectedUsers = connectedUsers;
  return next();
});

app.use(express.json());
app.use(routes);

console.log('----- Console clear -----');
app.listen(PORT, () => console.log('Server is running on PORT: ' + PORT));
