"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
// Define the application using the Express type for better type checking.
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
// Specify the CORS options directly within the Socket.IO Server initialization.
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});
// Handling a new socket connection
io.on('connection', (socket) => {
    console.log('a user connected');
    // Handling user disconnection
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    // Broadcasting chat messages to all connected sockets
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});
// Using an environment variable for the port, with a fallback to 3001
// Ensure that process.env.PORT is properly typed, or cast it to a number.
const PORT = parseInt(process.env.PORT, 10) || 3001;
// Starting the server
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
