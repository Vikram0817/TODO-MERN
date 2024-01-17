// 1. Implement user authentication to allow users to have personalized task lists.
const jws = require("jsonwebtoken");
const key = "123456";

function authenticateUser(req, res, next){
    const {username, password} = req.headers;
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];
    const decoded = jws.verify(token, key);
    // console.log(decoded);
    if(decoded.username == username && decoded.password == password){
        next();
    }else{
        res.json({msg: "Authentication failed!"})
    }
}

module.exports = authenticateUser;