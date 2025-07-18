import app from "./app.js";
import dotenv from "dotenv"
import connectDB from "./db/index.js";
dotenv.config({
    path:"./.env"
})


connectDB()
.then(()=>{
   const port=process.env.PORT || 4000 
    app.listen(port,()=>{
        console.log(`App is listening on port ${port}`)
    })
})
.catch((err)=>{
    console.log("DB connection error",err?.message)
})