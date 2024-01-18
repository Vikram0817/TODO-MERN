import { useEffect, useState } from 'react'
import TaskInputs from './components/TaskInputs';
import Signin from './components/Signup';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from './components/Tasks';
import { userContext } from "./context";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [taskDetails, setTaskDetails] = useState([{
    task: "",
    detail: ""
  }])

  const [task, setTask] = useState("");
  const [detail, setDetail] = useState("");

  const token = localStorage.getItem("myToken");

  function addTask(){
    fetch("http://localhost:3000/addtask", {  // adding task to DB which are fetched only when site loads for the first time
      method: "PUT",
      body: JSON.stringify({
        task: task,
        detail: detail,
        done: false
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
        throw new Error("HTTP error status " + res.ok)
      }
      setTaskDetails(prevVal => [ // adding new tasks to state locally, which is used to render data on UI
      ...prevVal, {
        task: task,
        detail: detail,
        done: false
      }])
      
      return res.json();
    })
    .then(data => console.log(data))
  }

  function handleUsername(name){
    setUsername(name);
  }

  function handlePassword(pass){
    setPassword(pass);
  }

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route 
          path="signup" 
          element={<Signin 
            username={username}
            password={password}
            handleUsername={handleUsername}
            handlePassword={handlePassword}
          />} 
        />
        <Route 
          path="login" 
          element={<Login 
            username={username}
            password={password}
            handleUsername={handleUsername}
            handlePassword={handlePassword}
          />} 
        />
        <Route path="/tasks" element={
          <>
            <TaskInputs 
              task={task} 
              detail={detail} 
              setTask={setTask} 
              setDetail={setDetail} 
              addTask={addTask}
            ></TaskInputs>
            
            <userContext.Provider value={{username, password}}>  
              <Tasks
                taskDetails={taskDetails}
                setTaskDetails={setTaskDetails}
              ></Tasks>
            </userContext.Provider>
          </>
        }>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
