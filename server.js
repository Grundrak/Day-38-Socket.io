var express = require('express');
var http = require('http');
var app = express();
const path = require('path');

const messages = [];

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080"
  }
});

io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    socket.join('default');

    socket.on('chat message', (data) => {
      messages.push({ username: data.username, message: data.message });
      io.emit('chat message', { username: data.username, message: data.message });
    });
    
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
})



server.listen(3000, () => {
    console.log('Server listening on :3000');
  });