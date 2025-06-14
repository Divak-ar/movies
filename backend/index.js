import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

// files
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

// configuration
dotenv.config();
// dotenv loads mongoUri and sensitive env data from .env and makes it available for connectDB to use it as process varaible in this environment
connectDB();

// creates an instance of the Express.js framework, enabling you to build web applications and APIs in Node.js. I
const app = express();

// midllewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/genre", genreRoutes);
app.use("/api/v1/movies", moviesRoutes);
app.use("/api/v1/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(PORT, () => console.log(`Server started at the port ${PORT}`));
