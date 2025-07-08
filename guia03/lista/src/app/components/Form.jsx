"use client"
import React, { useState } from 'react'
import Todo from './Todo'
import styles from "../page.module.css";

const Form = () => {
    const [todo, setTodo] = useState({})//para agregar mas items
    const [todos, setTodos] = useState([
        { todo: 'todo 1' },
        { todo: 'todo 2' },
        { todo: 'todo 3' }
    ])
    const handChange=e=>setTodo({[e.target.name]:e.target.value})
    const handClick=e=>{
        if(Object.keys(todo).length===0|| todo.todo.trim()===''){
            alert('el campo no puede ser vacío')
            return
        }
        setTodos([...todos,todo])
    }

    //para eliminar de lista
    const deleteTodo=indice=>{
        const newTodos=[...todos]
        newTodos.splice(indice,1)
        setTodos(newTodos)
    }
          
    return (
        <>
         <form onSubmit={e=>e.preventDefault()}>
            <label>Agregar Tarea</label><br/>
            <input className={styles.form_input} type="text" name='todo' onChange={handChange} />
            <button className={styles.form_button} onClick={handClick}>Agregar</button>

         </form>
         {
            todos.map((value,index)=>(
                <Todo todo={value.todo} key={index} index={index} deleteTodo={deleteTodo}/>
            ))
         }
        </>

    )
}
export default Form