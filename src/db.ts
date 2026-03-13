import mongoose, { Schema } from "mongoose";
import { required } from "zod/mini";


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
  userId: {type: mongoose.Types.ObjectId, ref: "User", required: true}
})



export const userModel = mongoose.model("User", UserSchema);
export const contentModel = mongoose.model("Content", ContentSchema);

