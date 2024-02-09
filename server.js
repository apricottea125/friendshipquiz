// Import Express and socket.io modules
const express = require('express');
const socketio = require('socket.io');

// Create a new Express app
const app = express();

// Serve static files from the public folder
app.use(express.static('public'));

// Create a new HTTP server and attach socket.io to it
const server = require('http').createServer(app);
const io = socketio(server);

// Listen for connection events from the clients
io.on('connection', (socket) => {
  console.log('A new client connected');
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
