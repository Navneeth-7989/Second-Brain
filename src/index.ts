import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import {z} from "zod";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { connectDB } from "./db.js";
import { userModel } from "./db.js";
dotenv.config();
const app = express();
connectDB();
app.use(express.json());

app.post("/api/v1/signup", async (req, res)=>{
     const requiredBody = z.object({
    email: z.string().email(),

    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
            "Password must contain uppercase, lowercase, number and special character"
        ),

    firstName: z.string().min(1),
    lastName: z.string().min(1)


});
const parsedData = requiredBody.safeParse(req.body);
if(!parsedData.success){
   return  res.status(403).json({
        message: "Invalid Input",
        errors: parsedData.error.issues
    });
}


    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    try {
        const existingUser = await userModel.findOne({
            email: email
        });
        if(existingUser){
            return res.status(411).json({
                message: "User Already exists in Database"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.create({
            email: email,
            username: username,
            password: hashedPassword
        });
        res.json({
            message: "Signed Up Successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: "Error while creating User"
        })
    }
    


})

app.post("/api/v1/signin", (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;


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