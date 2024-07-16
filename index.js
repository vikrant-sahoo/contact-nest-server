import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./config/db.js";
import { Router } from "./routes/routes.js";

const app = express();
app.use(express.json());
app.use(cors({
      origin: ["https://contact-nest-app.vercel.app/"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true
}));

dotenv.config({path: "./config/.env"});

app.use("/contact-nest", Router);

app.listen(process.env.PORT, () => {
      console.log("App is Listening at Port = 4000");
});