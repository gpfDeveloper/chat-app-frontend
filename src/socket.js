import { io } from 'socket.io-client';

let socket;

const URL = 'http://localhost:3001';
if (!socket) {
  socket = io(URL, { autoConnect: false });
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });
}

export default socket;
