import React from "react";

export default function TaskInputs({task, detail, setTask, setDetail, addTask}){
    return(
        <>
            <input type="text" placeholder='Task' value={task} onChange={(e) => setTask(e.target.value)}></input>
            <input type="text" placeholder='Detail' value={detail} onChange={(e) => setDetail(e.target.value)}></input>
            <button onClick={addTask}>Add task</button>
        </>
    )
}