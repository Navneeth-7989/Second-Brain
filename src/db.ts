import mongoose, { Schema } from "mongoose";


export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Database connection failed");
    process.exit(1);
  }
};



const UserSchema = new Schema({
    email: {type: String, unique: true },
    username: String,
    password: String
})

export const userModel = mongoose.model("User", UserSchema);

