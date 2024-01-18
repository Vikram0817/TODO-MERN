import React, { useContext, useEffect, useState} from "react";
import Task from "./Task";
import { userContext } from "../context";
import EditTaskModel from "./EditTaskModel";

export default function Tasks({taskDetails, setTaskDetails}) {
    
  const [isModalVisisble, setModalVisible] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  const {username, password} = useContext(userContext);

  const token = localStorage.getItem("myToken");

  useEffect(() => {
    fetch("http://localhost:3000/gettasks", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        username: username, 
        password: password,
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => {
      if(!res.ok){
        throw new Error("HTTP error status " + res.ok)
      }
      return res.json();
    })
    .then(data => setTaskDetails(data.tasks));
    }, [])

    function handleEdit(t) {
      setModalVisible(prevVal => !prevVal);
      setTaskToUpdate(t);
    }

    return(
      <>
        {taskDetails.map(({task, detail, done}) => {
          return (
            <>
              <Task 
                key={task} 
                task={task} 
                detail={detail} 
                done={done}
                handleEdit={handleEdit}
                setTaskDetails={setTaskDetails}
              ></Task>
            </>
          )})}
            {isModalVisisble && 
              <EditTaskModel 
                setModalVisible={setModalVisible}
                task={taskToUpdate}
                setTaskDetails={setTaskDetails}
              ></EditTaskModel>}
      </>
      )
}