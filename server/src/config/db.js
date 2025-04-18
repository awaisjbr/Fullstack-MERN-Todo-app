import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(`${process.env.MONGO_URI}/todo-app`);
    console.log("DB Connected")
}


