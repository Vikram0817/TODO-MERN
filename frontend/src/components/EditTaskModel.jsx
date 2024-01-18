import { Error } from "mongoose";
import React, {useState, useContext} from "react";
import { userContext } from "../context";

export default function EditTaskModel({setModalVisible, task, setTaskDetails}){

    const {username, password} = useContext(userContext);

    const [updatedTask, setUpdatedTask] = useState(task);
    const [updatedDetail, setUpdatedDetail] = useState("");

    const token = localStorage.getItem("myToken");

    function updateTask(){
        fetch("http://localhost:3000/edittask", {
            method: "PUT",
            body: JSON.stringify({
                "task": task,
                "updatedTask": updatedTask,
                "updatedDetail": updatedDetail
            }),
            headers: {
                "Content-Type": "application/json",
                "username": username,
                "password": password,
                "Authorization":  `Bearer ${token}`
            }
        }).then(res => {
            if(!res.ok){
                throw new Error(`HTTP error! status ${res.ok}`)
            }

            setTaskDetails(prevVal => { // for re-rendering
                const idx = prevVal.findIndex(taskDetail => taskDetail.task == task);
                prevVal[idx] = {
                    task: updatedTask,
                    detail: updatedDetail,
                    done: false
                }
                console.log(prevVal);
                return prevVal;
            });


            return res.json();

        }).then(data => {
            setModalVisible(prevVal => !prevVal);
            alert(data.msg);
        })
    }
    
    return(
        <>
            <input type="text" placeholder="task" value={updatedTask} onChange={e => setUpdatedTask(e.target.value)}/>
            <input type="text" placeholder="detial" value={updatedDetail} onChange={e => setUpdatedDetail(e.target.value)}/>
            <button onClick={updateTask}>Done</button>
        </>
    )
}