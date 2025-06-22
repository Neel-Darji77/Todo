import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([ ])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todosr = JSON.parse(localStorage.getItem("todos"))
      setTodos(todosr)
    }
  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  

  const handleEdit = (e, id) => {
    let t = todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter((item)=> {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item=> {
      return item.id !== id;
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, {id:uuidv4() ,todo, isCompleted: false}])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item)=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted =  !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLS()
  }
  
  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }

  return (
    <>
      <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh] md:w-[42%]">
      <h1 className='font-bold text-center text-3xl'>iTask - Manage your todo at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add Todo</h2>
          <div className="flex gap-3" >
          <input onChange={handleChange} value={todo} type="text" className='w-full bg-white rounded-full px-5 py-1'/>
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 hover:bg-violet-900 disabled:cursor-not-allowed p-5 py-2 text-sm font-bold text-white rounded-full cursor-pointer'>Save</button>
          </div>
        </div>
        <input className='mb-5' onChange={toggleFinished} type="checkbox" name="showFinish" checked={showFinished}/>
        <label className='mx-2' htmlFor="showFinish">Show Finished</label>
        <div className="h-[1px] bg-black opacity-35 w-[90%] mx-auto "></div>
        <h2 className='mt-3 text-2xl font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div> }
          {todos.map((item)=>{
            return ( (showFinished || !item.isCompleted ) &&
              <div key={item.id} className="todo flex my-3 justify-between">
                <div className="flex gap-5">
                  <input type="checkbox" name={item.id} onChange={handleCheckbox} checked={item.isCompleted} />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons flex h-full">
                    <button onClick={(e)=>{handleEdit(e, item.id)}} className='cursor-pointer bg-violet-800 hover:bg-violet-900 p-3 py-2 text-sm font-bold text-white rounded-md mx-1'><MdEdit /></button>
                    <button onClick={(e)=>{handleDelete(e, item.id)}} className='cursor-pointer bg-violet-800 hover:bg-violet-900 p-3 py-2 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>
                </div>
              </div>)
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
