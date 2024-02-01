import express from "express";
//import mongoose from "mongoose";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import busRoutes from './routes/busRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js'
connectDB();

const port = process.env.PORT || 8000;

const app=express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))

//Middleware
// app.use((req,res,next)=>{
//     console.log("path "+req.path + " method"+req.method);
//     next();
// });


//api creation
// app.get("/",(req,res)=>{
//     res.send("API is running...");
// })

//api creation
app.use('/api/users',userRoutes);
app.use('/api/buses',busRoutes);
app.use('/api/trips',tripRoutes)
app.use('/api/tickets',ticketRoutes)


app.listen(port,()=>{
    console.log('Server running on the port '+port)
});

