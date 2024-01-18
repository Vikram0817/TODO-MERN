import React, { useContext, useState } from "react";
import { userContext } from "../context";

export default function Task({task, detail, done, handleEdit, setTaskDetails}){

    const {username, password} = useContext(userContext);

    const token = localStorage.getItem("myToken")
    
    function handleDelete(){
        fetch("http://localhost:3000/deletetask",{
            method: "DELETE",
            body: JSON.stringify({
                task: task
            }),
            headers: {
                "Content-Type": "application/json",
                username: username,
                password: password,
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => {
            if(!res.ok){
                throw new Error("HTTP error! status " + res.ok) 
            }
            setTaskDetails(prevVal => prevVal.filter(taskDetail => taskDetail.task != task)); // for re-rendering
            return res.json();
        })
        .then((data) => alert(data.msg)) 
    }


    return(
        <div className="task">
            <h3>{task}</h3>
            <p>{detail}</p>
            <button onClick={handleDelete}>{!done ? "mark as complete" : ""}</button>
            <button onClick={() => handleEdit(task)}>Edit Task</button>
        </div>
    )
}