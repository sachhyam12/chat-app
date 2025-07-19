import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
const app=express();

app.use(express.json(
    {limit:"16kb"}
))
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"))
app.use(cookieParser())


//Route Configuration
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/user",userRouter);

export default app;