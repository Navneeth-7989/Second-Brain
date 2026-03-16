import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import {z} from "zod";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import { connectDB, contentModel, LinkModel, userModel } from "./db.js";
import { authMiddleware } from "./middleware.js";
import { random } from "./util.js";

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



app.post("/api/v1/add-content",authMiddleware,  async (req, res)=>{
    const link = req.body.link;
    const title = req.body.title;
    const type = req.body.type;
    
   try {
     await contentModel.create({
        title,
        link,
        //@ts-ignore
        type,
         //@ts-ignore
        userId: req.userId,
        tags: []
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

app.get("/api/v1/content", authMiddleware,  async (req, res)=>{
    //@ts-ignore
    const userId = req.userId;
    try {
        const content = await contentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })
    } catch (error) {
        res.status(403).json({
            message: "Error fetching the content"
        })
    }
})

app.delete("/api/v1/content", authMiddleware,  async (req, res) => {
    const contentId = req.body.contentId;

    try {
        const result = await contentModel.deleteOne({
            _id: contentId,
            //@ts-ignore
            userId: req.userId
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                message: "Content not found"
            });
        }

        res.json({
            message: "Content Deleted Successfully"
        });

    } catch (error) {
        res.status(403).json({
            message: "Error while deleting content"
        });
    }
});

app.post("/api/v1/brain/share",authMiddleware,  async (req, res)=>{
    const share = req.body.share === true;
    try {
        if(share){
            const existingLink = await LinkModel.findOne({
                //@ts-ignore
                userId: req.userId
            });
            if(existingLink){
                res.json({
                    hash: existingLink.hash
                })
                return;
            }
            const hash = random(10)
            await LinkModel.create({
                //@ts-ignore
                userId: req.userId,
                hash: hash
            })
            res.json({
                message: "/share/" + hash
            })
        } else{
           await LinkModel.deleteOne({
                //@ts-ignore
                userId: req.userId
                    
                
            });
        }
        res.json({
            message: "Removed link"
        })
    } catch (error) {
        res.status(403).json({
            message: "Error while creating the link"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req, res)=>{
    const hash = req.params.shareLink;
try {
    const link = await LinkModel.findOne({
        hash
    });
    if(!link){
        return res.status(403).json({
            message: "Sorry incorrect Url"
        })
    }
    const content = await contentModel.find({
        userId: link.userId

    })

    const user = await userModel.findOne({
        _id: link.userId
    })

    res.json({
        username: user?.username,
        content: content
    })
} catch (error) {
    res.status(403).json({
        message: "Error"
    })
}

})


app.listen(3000, ()=>{
    console.log("Server is running on port 3000")
})