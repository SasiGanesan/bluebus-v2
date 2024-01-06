import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
connectDB();
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.listen(process.env.PORT,()=>{
    console.log(`server running on the port ${process.env.PORT}`)
});

app.get("/",(req,res)=>{
    res.send("helo");
})