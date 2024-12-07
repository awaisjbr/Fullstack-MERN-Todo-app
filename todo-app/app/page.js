"use client"
import Todo from "@/components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";


export default function Home() {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
  });
  const [todoData, setTodoData] = useState([]);

  const onChangeHandler = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]:value}));
  };

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:4000/api/v1/todo');
    setTodoData(response.data);
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:4000/api/v1/todo/${id}`);
    fetchTodos();
  };

  const updateTodo = async (id) => {
    try {
      const res = await axios.put(`http://localhost:4000/api/v1/todo/${id}`, {
        isCompleted: true
      });
      fetchTodos();
    } catch (error) {
        console.log(error.message)
    }
  }

  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/api/v1/todo',formData);
      setFormData({
        title: "",
        desc: "",
      });
      await fetchTodos();
    } catch (error) {
        console.log(error.message)
    }
  };

  useEffect(() => {
    fetchTodos();
  },[])

  return (
    <>
      <form onSubmit={submitHandler} className="flex flex-col items-start gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto">
        <input type="text" name="title" placeholder="Enter Title" className="px-3 py-2 border-2 w-full" onChange={onChangeHandler} value={formData.title}/>
        <textarea name="desc" placeholder="Enter Description" className="px-3 py-2 border-2 w-full" onChange={onChangeHandler} value={formData.desc}></textarea>
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">Add Todo</button>
      </form>
      

<div className="relative overflow-y-scroll mt-10 w-[60%] h-72 mx-auto border shadow-md">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    ID
                </th>
                <th scope="col" className="px-6 py-3">
                    Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Description
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody className="bg-red-200">
           {todoData.map((item,i) => {
            return <Todo key={i} updateTodo={updateTodo} deleteTodo={deleteTodo} title={item.title} id={i} desc={item.desc} isCompleted={item.isCompleted} mongoId={item._id}/>
           })}
        </tbody>
    </table>
</div>

    </>
  );
}
