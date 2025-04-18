import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos: [{id: 1, text: "Awais", desc: "Learning RTK", isCompleted: false}]
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {id: nanoid(), text: action.payload.text, desc: action.payload.desc, isCompleted: false };
            state.todos.push(todo)
        },
        removeTodo: (state, action) => {
            state.todos =  state.todos.filter((todo) => {
                todo.id !== action.payload.id 
            })
        },
    }
});

export const {addTodo, removeTodo} = todoSlice.actions;
export default todoSlice.reducer;