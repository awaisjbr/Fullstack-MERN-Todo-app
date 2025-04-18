import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title: {type: String, require: true},
    desc: {type: String, require: true},
    isCompleted: {type:Boolean, default:false}
},{timestamps:true});

export const todoModel = mongoose.models.todo || mongoose.model("todo", Schema)