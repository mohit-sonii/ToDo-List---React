import React from 'react'
import '../Comp CSS/ToDo.css'
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react'
import { TaskList, TaskListElse } from './DisplayTasks';

const ToDo = () => {
     const [ToDo, setToDo] = useState("")

     const HandleText = (e) => {
          setToDo(e.target.value)

     }

     const [Tasks, setTasks] = useState([])

     useEffect(() => {
          let storage = localStorage.getItem("Tasks")
          if (storage) {
               let todos = JSON.parse(localStorage.getItem("Tasks"))
               setTasks(todos)
               console.log("added")
          }
     }, [setTasks])

     const addToLocal = () => {
          localStorage.setItem("Tasks", JSON.stringify(Tasks))

     }
     const HandleAdd = () => {
          setTasks([...Tasks, { id: uuidv4(), ToDo, isCompleted: false }])
          setToDo("")
          addToLocal()
     }

     const HandleDelete = (e, id) => {

          let updatedTodo = Tasks.filter((val) => {
               return val.id !== id
          })

          setTasks(updatedTodo)
          localStorage.setItem("Tasks", JSON.stringify(updatedTodo))
     }

     const HandleEdit = (e, id) => {
          let editable = Tasks.filter((i) => {
               return i.id === id
          })
          setToDo(editable[0].ToDo)
          let update = Tasks.filter((i) => {
               return i.id !== id
          })
          setTasks(update)
          addToLocal()
     }

     const HandleCheckBox = (e) => {
          const Index = Tasks.findIndex(i => {
               return i.id === e.target.value
          })
          let allTasks = [...Tasks]
          allTasks[Index].isCompleted = !allTasks[Index].isCompleted
          setTasks(allTasks)
          addToLocal()
     }

     const [ShowFinished, setShowFinished] = useState(false)

     const HandleFinishedTasks = () => {
          setShowFinished(!ShowFinished)
     }


     return (
          <>
               <div className="container">
                    <div className="child">
                         <h1 className="heading">Write your Todo's</h1>
                         <div className="input-field">
                              <input type="text" name="" id="" value={ToDo} onChange={HandleText} className='input-text' />
                              <button disabled={ToDo.length <= 0} onClick={HandleAdd}>Add</button>
                         </div>
                         <div className="task-list">
                              <button disabled={ShowFinished.length == 0} onClick={HandleFinishedTasks}>Show Finished</button>
                              {Tasks.length === 0 && <h3>List is Empty</h3>}

                              {ShowFinished
                                   ? Tasks.filter(item => {
                                        return item.isCompleted
                                   }).map(item => {
                                        return <TaskList key={item.id} onChange={HandleCheckBox} item={item} onDelete={(e) => { HandleDelete(e, item.id) }} />
                                   })
                                   : Tasks.map(item => {
                                        return <TaskListElse key={item.id} onChange={HandleCheckBox} item={item} onDelete={(e) => { HandleDelete(e, item.id) }} onEdit={(e) => { HandleEdit(e, item.id) }} />
                                   })
                              }
                         </div>
                    </div>
               </div>

          </>
     )
}

export default ToDo