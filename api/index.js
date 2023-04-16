import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRouter from "./routes/users.js";
import roomsRouter from "./routes/rooms.js";
import hotelsRouter from "./routes/hotels.js";
import cors from "cors"
import cookieParser from "cookie-parser";
const app=express();

dotenv.config();
const connect = async()=>{
    try{ 
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to monggoDB.");
    }catch(error){
        throw error;
    }
};



//midd
app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/users", usersRouter);
app.use("/api/hotels", hotelsRouter);
app.use("/api/rooms", roomsRouter);


app.use((err,req,res,next)=>{
    const errorStatus=err.status || 500
    const errorMessage=err.message || "Xảy ra sự cố!!!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
})

app.listen(8000,()=>{
    connect();
    console.log("Connected to backend");
})