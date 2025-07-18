import express from "express";
import cookieParser from "cookie-parser";
import { notFound,errorHandler } from "./middlewares/errorHandle.middleware.js";

const app=express();
app.use(express.json(
    {limit:"16kb"}
))
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"))
app.use(cookieParser())

//Error handling for invalid endpoints
app.use(notFound)
app.use(errorHandler)

//Route Configuration
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/user",userRouter)
export default app;