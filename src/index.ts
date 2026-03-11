import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { connectDB } from "./db.js";
dotenv.config();
const app = express();
connectDB();

app.post("/api/v1/signup", (req, res)=>{

})

app.post("/api/v1/signin", (req, res)=>{
    
})

app.post("/api/v1/content", (req, res)=>{
    
})

app.get("/api/v1/content", (req, res)=>{
    
})

app.delete("/api/v1/content", (req, res)=>{
    
})

app.post("/api/v1/brain/share", (req, res)=>{

})

app.get("/api/v1/brain/:share", (req, res)=>{

})


app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})