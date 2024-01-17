const cors = require("cors");
const express = require("express");
const bodyParser = require('body-parser');
const jws = require("jsonwebtoken");
const key = "123456";
const authenticateUser = require("./checkUser");
const Users = require("./db");;

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/signup", async (req, res) => {
    const {username, password} = req.body;
    await Users.create({username, password});
    res.json("User registered successfully.")
})

app.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const user = await Users.findOne({username, password});
    if(user){
        const token = jws.sign({username, password}, key);
        res.json({token: token})
    }else{
        res.status(404).json({error: "No such user found."})
    }
})

app.get("/gettasks", authenticateUser, async (req, res) => {
    const {username, password} = req.headers;
    const user = await Users.findOne({username, password});
    if (user) {
        const taskDetails = user.taskDetails;
        res.json({ "tasks": taskDetails });
    } else {
        res.status(404).json({ error: "User not found" });
    }
})

app.put("/addtask", authenticateUser, async (req, res) => {
    const {username, password} = req.headers;
    const {task, detail} = req.body;
    await Users.updateOne(
        {username, password},{
            $push: {
                taskDetails: {
                    task: task,
                    detail: detail,
                    done: false
                }
            }
        }
    )
    res.json({msg: "task added successfuly"})
})

app.put("/edittask", authenticateUser, async (req, res) => {
    const {username, password} = req.headers;
    const {task, updatedTask, updatedDetail} = req.body;
    
    const user = await Users.findOne({username, password});
    const taskDetails = user.taskDetails;
    const idx = taskDetails.findIndex(val => val.task == task);
    taskDetails[idx] = {
        task: updatedTask,
        detail: updatedDetail,
        done: false
    }
    
    Users.updateOne({username, password}, {
        $set: {
            taskDetails: taskDetails
        }
    })

    res.json({msg: "Task updated successfully."});
})

app.delete("/deletetask", authenticateUser, async (req, res) => {
    // try {
        const { username, password } = req.headers;
        const { task } = req.body;
        const user = await Users.findOne({ username, password });
        const taskDetails = user.taskDetails;
        const idx = taskDetails.findIndex(val => val.task === task);

        if (idx !== -1) {
            taskDetails.splice(idx, 1);

            await Users.updateOne({ username, password }, {
                $set: {
                    taskDetails: taskDetails
                }
            });
            res.json({ msg: "Task deleted successfully" });
        } else {
            res.json({ msg: "Task not found" });
        }
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ msg: "Internal Server Error" });
    // }
})

app.listen(PORT, () => {
    console.log("Server connected to port 3000");
});