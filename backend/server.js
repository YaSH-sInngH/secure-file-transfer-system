import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import DBConnection from "./db/db.js"
import authRoutes from './routes/authRoutes.js'
import fileRoutes from "./routes/fileRoutes.js";


dotenv.config();
DBConnection();

const app = express();

//Middlewares

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use('/api/auth', authRoutes);
app.use("/api/files", fileRoutes);

app.get("/", (req,res) => res.send("Secure file transfer API runing"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));