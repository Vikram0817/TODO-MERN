import React from "react";
import { useNavigate } from "react-router-dom";

export function Home(){
    
    const navigate = useNavigate();

    return(
    <div className="button-conatiner">
        <h1 id="welcome">Welcome to Todo App</h1>
        <button className="credentails-btn" onClick={() => navigate("/signup")}>Signup</button>
        <button className="credentails-btn" onClick={() =>navigate("/login")}>Login</button>
    </div>
    )
}