import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// HTTP Server
const httpServer = createServer(app);

// Socket.IO Server
const io = new Server(httpServer, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log("Player connected:", socket.id);

    // Store connected players
    let players = [];

    // Handle player joining
    socket.on("joinGame", ({ playerName }) => {
        players.push({ id: socket.id, name: playerName });
        const opponent = players.find((p) => p.id !== socket.id);

        if (opponent) {
            // Notify both players of the opponent
            io.to(socket.id).emit("opponentJoined", opponent.name);
            io.to(opponent.id).emit("opponentJoined", playerName);
        }
    });

    // Handle game updates
    socket.on("gameUpdate", ({ gameState, currentPlayer }) => {
        socket.broadcast.emit("gameUpdate", { gameState, currentPlayer });
    });

    // Handle game end
    socket.on("gameEnd", ({ winner }) => {
        io.emit("gameEnd", { winner });
    });

    // Handle player disconnection
    socket.on("disconnect", () => {
        players = players.filter((p) => p.id !== socket.id);
        console.log("Player disconnected:", socket.id);
    });
});

// Routes
app.get('/', (req, res) => res.send("API working"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Start the server
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
