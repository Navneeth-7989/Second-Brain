import mongoose, { Schema } from "mongoose";
import { hash, string } from "zod";



export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database connection failed: ", error);
    process.exit(1);
  }
};



const UserSchema = new Schema({
    email: {type: String, unique: true },
    username: String,
    password: String
})

const ContentSchema = new Schema({
  title: String,
  link: String,
  tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
  type: String,
  userId: {type: mongoose.Types.ObjectId, ref: "User", required: true}
})

const LinkSchema = new Schema({
  hash: string,
   userId: {type: mongoose.Types.ObjectId, ref: "User", required: true, unique: true}

}) 



export const userModel = mongoose.model("User", UserSchema);
export const contentModel = mongoose.model("Content", ContentSchema);
export const LinkModel = mongoose.model("Links", LinkSchema);

