const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://ashok9818236898:sCYTAhSkShUhmZeM@cluster0.riwbhae.mongodb.net/Todo").then(() => {
    console.log("mdb connected cuccessfully");
}).catch((e) => console.log("unable to connect to mdb"));

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    taskDetails: [
        {
            task: String,
            detail: String,
            done: Boolean
        }
    ]
});

const Users = mongoose.model("Users", UserSchema);

module.exports = Users;