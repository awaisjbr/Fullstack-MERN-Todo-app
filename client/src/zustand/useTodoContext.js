import axios from "axios";
import toast from "react-hot-toast";
import {create} from "zustand";

export const useTodoContext = create((set,get) => ({
    todos: [],

    fetch: async () => {
        try {
            const {data} = await axios.get("http://localhost:4000/api/todos");
            if(data.success){
                set({todos: data.todos})
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    addTodo: async (todoData) => {
        try {
            const {todos} = get()
            const {data} = await axios.post('http://localhost:4000/api/addTodo',todoData);
            if(data.success){
                set({todos: [...todos, data.todo]})
                toast.success(data.message)                
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error?.response?.data?.message)
            console.log(error)
        }
    },

    updateTodo: async (id) => {
        try {
            const {data} = await axios.put(`http://localhost:4000/api/update/${id}`);
            if(data.success){
                toast.success(data.message);
                get().fetch();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Todo updating Failed");
            console.log(error);
        }
    },

    deleteTodo: async (id) => {
        try {
            const {data} = await axios.delete(`http://localhost:4000/api/delete/${id}`);
            if(data.success){
                toast.success(data.message);
                get().fetch();
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Todo deleting Failed");
            console.log(error);
        }
    }

}));