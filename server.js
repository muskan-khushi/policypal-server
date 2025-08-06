import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import chatRoutes from "./Routes/ChatRoutes.js";
import userRoutes from "./Routes/UserRoutes.js";
import documentRoutes from "./Routes/DocumentRoutes.js";

const app = express();
// Render uses its own PORT environment variable, often 10000
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// --- THIS IS THE FIX ---
// We are explicitly telling the server to accept requests from any origin.
// This is required for the live Vercel frontend to talk to the Render backend.
app.use(cors({
  origin: '*'
}));
// --------------------

// Middleware to parse JSON requests
app.use(express.json());

// Middleware to handle URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files (if you have a public folder)
app.use(express.static("public"));

// Sample route to test the server
app.get("/", (req, res) => {
  res.send("Welcome to the PolicyPal Server!");
});

// --- API Routes ---
app.use("/api/chat", chatRoutes);
app.use("/api/user", userRoutes);
app.use("/api/documents", documentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});