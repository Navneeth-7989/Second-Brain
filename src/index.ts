import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import {z} from "zod";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import { connectDB, contentModel } from "./db.js";
import { userModel } from "./db.js";
import { authMiddleware } from "./middleware.js";

const app = express();
connectDB();
app.use(express.json());
app.use(cookieParser());

app.post("/api/v1/signup", async (req, res)=>{
     const requiredBody = z.object({
    email: z.string().email(),
    username: z.string().min(3),

    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
            "Password must contain uppercase, lowercase, number and special character"
        ),



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

app.post("/api/v1/signin", async (req, res)=>{
    const email = req.body.email;
    const password = req.body.password;

   try {
    const user = await userModel.findOne({email});
    if(!user || !user.password){ //!user.password i wrote this because of typescript typesafety
        return res.status(403).json({
            message: "User does not exists in Database"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(403).json({
            message: "Invalid Credentials"
        });
    }

   const token = jwt.sign({
        userId: user._id
   },process.env.JWT_USER_SECRET as string)

        res.cookie("token", token,{
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 3 * 24 * 60 * 60 * 1000

        });
        res.json({
            message: "Logged in Successfully"
        })
   } catch (error) {
        res.status(403).json({
            message: "Error while logging in"
        })
   }



    


})

app.post("/api/v1/logout",(req, res)=>{
    try {
        res.clearCookie("token");
        res.json({
            message: "Logged Out"
        })
    } catch (error) {
        res.status(403).json({
            message: "Error while logging out"
        })
    }
})

app.use(authMiddleware);

app.post("/api/v1/add-content", async (req, res)=>{
    const link = req.body.link;
    const type = req.body.type;
    
   try {
     await contentModel.create({
        link,
        //@ts-ignore
        type,
        //@ts-ignore
        userId: req.userId,
        tage: []
    })
    res.json({
        message: "Content added Successfully"
    })
   } catch (error) {
    res.status(403).json({
        message: "Error while adding content"
    })
   }
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