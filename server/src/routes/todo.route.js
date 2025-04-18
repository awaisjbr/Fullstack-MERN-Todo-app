import express from "express";
import { todoModel } from "../models/todo.model.js";

export const router = express.Router();

router.get('/todos', async (req, res) => {
    const todos = await todoModel.find({}).sort({createdAt : -1})
    res.status(200).json({success:true, todos})
});

router.post('/addTodo', async (req, res) => {
    const {title, desc, isCompleted} = req.body;
    if(!title || !desc){
        return res.status(500).json({success: false, message: "Please fill all the feilds"});
    }
    const todo = await todoModel.create({
        title, desc, isCompleted
    });
   return res.status(201).json({success: true, message:"Todo Added Successfully..",todo})
});

router.put('/update/:id', async (req, res) => {
    const {id} = req.params;
    const todo = await todoModel.findById(id)
    if(!todo){
        res.status(500).send("Todo not found");
    };
    todo.isCompleted = true;
    await todo.save();
    // const updatedTodo = await todoModel.findById(id);
    res.status(200).json({success: true, message: "Todo Updated Successfully.."})
});

router.delete('/delete/:id', async (req, res) => {
    const {id} = req.params;
    const todo = await todoModel.findByIdAndDelete(id);
    if(!todo){
        res.status(500).json({success: false, message: "Todo not found"});
    }
    res.status(200).json({success: true, message: "Todo deleted Successfully.."})
});



