import React, { useContext, useEffect } from "react";
import Task from "./Task";
import { userContext } from "../context";

export default function Tasks({taskDetails, setTaskDetails}) {
    
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
 
    return(
      <>
        {taskDetails.map(({task, detail, done}) => <Task key={task} task={task} detail={detail} done={done} username={username} password={password}></Task>)}
      </>
      )
}