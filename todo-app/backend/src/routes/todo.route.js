import express from "express";
import { todoModel } from "../models/todo.model.js";

export const router = express.Router();

router.get('/', async (req, res) => {
    const todos = await todoModel.find({})
    res.status(200).json(todos)
});

router.post('/', async (req, res) => {
    const {title, desc, isCompleted} = req.body;
    const todo = await todoModel.create({
        title, desc, isCompleted
    });
    res.status(200).json(todo)
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const todo = await todoModel.findByIdAndUpdate(id, {
        isCompleted: true
    });
    if(!todo){
        res.status(500).send("Todo not found");
    }
    const updatedTodo = await todoModel.findById(id);
    res.status(200).json(updatedTodo)
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const todo = await todoModel.findByIdAndDelete(id);
    if(!todo){
        res.status(500).send("Todo not found");
    }
    const DeletedTodo = await todoModel.findById(id);
    res.status(200).json(DeletedTodo)
});

