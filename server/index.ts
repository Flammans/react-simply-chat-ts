import express, { Express } from 'express';
import { createServer, Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

// Define the application using the Express type for better type checking.
const app: Express = express();
const httpServer: HTTPServer = createServer(app);

// Specify the CORS options directly within the Socket.IO Server initialization.
const io: SocketIOServer = new SocketIOServer(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Handling a new socket connection
io.on('connection', (socket: Socket) => {
  console.log('a user connected');

  // Handling user disconnection
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  // Broadcasting chat messages to all connected sockets
  socket.on('chat message', (msg: string) => {
    io.emit('chat message', msg);
  });
});

// Using an environment variable for the port, with a fallback to 3001
// Ensure that process.env.PORT is properly typed, or cast it to a number.
const PORT: number = parseInt(process.env.PORT as string, 10) || 3001;

// Starting the server
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
