import React from 'react'
import '../Comp CSS/ToDo.css'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react'
import { FaTrashAlt } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";

const ToDo = () => {


     const [ToDo, setToDo] = useState("")
     const HandleText = (e) => {
          setToDo(e.target.value)
     }
     const [Tasks, setTasks] = useState([])
     const HandleButton = () => {
          setTasks([...Tasks, { id: uuidv4(), ToDo, isCompleted: false }])
          // console.log([...Tasks, { id: uuidv4(), ToDo, isCompleted: false }])
          setToDo("")
     }
     const HandleDelete = (e, id) => {
          let updatedTodo = Tasks.filter((i) => {
               return i.id !== id

          })
          setTasks(updatedTodo)
     }
     const HandleEdit = (e, id) => {
          let editable = Tasks.filter((i) => {
               return i.id === id
          })
          setToDo(editable[0].ToDo)
          let update = Tasks.filter((i)=>{
               return i.id !== id
          })
          setTasks(update)

     }
     return (
          <>
               <div className="container">
                    <div className="child">
                         <h1 className="heading">Write your Todo's</h1>
                         <div className="input-field">
                              <input type="text" name="" id="" value={ToDo} onChange={HandleText} className='input-text' />
                              <button onClick={HandleButton}>Add</button>
                         </div>
                         <div className="task-list">
                              {Tasks.length === 0 && <h3>List is Empty</h3>}
                              {Tasks.map((item) => {
                                   return <div className="list" key={item.id}>
                                        <div className="only-task">

                                             <input value={item.id} type="checkbox" />
                                             <p>{item.ToDo}</p>
                                        </div>
                                        <div className="only-button">
                                             <button className='trash' onClick={(e) => { HandleDelete(e, item.id) }}><FaTrashAlt /></button>
                                             <button className='edit' onClick={(e) => { HandleEdit(e, item.id) }}><MdModeEditOutline /></button>
                                        </div>

                                   </div>
                              })}
                         </div>

                    </div>
               </div>

          </>
     )
}

export default ToDo