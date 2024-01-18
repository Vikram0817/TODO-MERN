import React from "react";

export default function TaskInputs({task, detail, setTask, setDetail, addTask}){
    return(
        <div className="task-input-container">
            <input className="task-input" type="text" placeholder='Task' value={task} onChange={(e) => setTask(e.target.value)}></input>
            <input className="task-input" type="text" placeholder='Detail' value={detail} onChange={(e) => setDetail(e.target.value)}></input>
            <button className="add-task-btn" onClick={addTask}>Add task</button>
        </div>
    )
}