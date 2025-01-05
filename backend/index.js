import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import Connection from "./database/connection/db.js";
import authRoute from "./routes/auth.js";
import projectRoute from "./routes/project.js";

const PORT = 8000;

const app = express();

// Connect to database
Connection();

// CORS configuration
const corsOptions = {
  origin: "http://localhost:8081", // Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow cookies to be sent with requests
  preflightContinue: false, // Don't manually handle preflight requests
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Body parser middleware
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/auth", authRoute);
app.use("/project", projectRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
