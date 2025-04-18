import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Todo from './components/Todo';
import toast, {Toaster} from "react-hot-toast"
import { useTodoContext } from './zustand/useTodoContext';

const App = () => {
  const {fetch, todos, addTodo, updateTodo, deleteTodo} = useTodoContext();
  const [title, setText] = useState("");
  const [desc, setDesc] = useState("")

  const submitandler = (e) => {
    e.preventDefault();
    try {
      addTodo({title, desc});
      setDesc("");
      setText("");
 
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect (() => {
    fetch();
  },[addTodo])


  return (
    <div className='h-screen bg-red-50'>
      <Toaster position='top-center' duration={6000}/>
      <Navbar />
      {/* Form for Data Input */}
      <form onSubmit={submitandler} className="flex flex-col items-start gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto">
        <input type="text" name="title" placeholder="Enter Title" className="px-3 py-2 border-2 w-full" onChange={(e) => setText(e.target.value)} value={title}/>
        <textarea name="desc" placeholder="Enter Description" className="px-3 py-2 border-2 w-full" onChange={(e) => setDesc(e.target.value)} value={desc}></textarea>
        <button type="submit" className="bg-orange-600 py-3 px-11 text-white">Add Todo</button>
      </form>

      {/* Table for Data */}

      <div className='overflow-y-auto mt-10 w-[60%] h-72 mx-auto border shadow-md'>
        <table className='relative w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
          <thead className="w-full text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className=''>
                  <th scope="col" className="px-6 py-3">ID</th>
                  <th scope="col" className="px-6 py-3">Title</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Action</th>
              </tr>
          </thead>
          <tbody className='transition-all  duration-300 ease-linear'>
          {todos.map((item,i) => {
            return <Todo key={i} item={item} updateTodo={updateTodo} deleteTodo={deleteTodo}/>
           })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
