import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login({username, password, handleUsername, handlePassword}) {
    
    const navigate = useNavigate();
    
    function handleLogin(){
        fetch("http://localhost:3000/login", {
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => {
            if(!res.ok){
                alert("Invalid credentials")
                throw new Error("HTTP error! stats: " + res.ok)
            }
            return res.json();
        })
        .then(data => {
            localStorage.setItem("myToken", data.token)
            navigate("/tasks");
        })
    }
    return(
        <div className="cred-container">
            <h1>Login User</h1>
            <input className="user-input" type="text" placeholder="Username" value={username} onChange={e => handleUsername(e.target.value)}/>
            <input className="user-input" type="text" placeholder="Password" value={password} onChange={e => handlePassword(e.target.value)}/>
            <button className="credentails-btn" onClick={handleLogin}>Login</button>
        </div>
    )
}