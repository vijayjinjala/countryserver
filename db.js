require('dotenv').config();
const mongoose = require("mongoose");

const dbconnect=()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/myProject").then(()=>{
        console.log("connection success");
    }).catch((err)=>{
        console.log(err);
    })
}
module.exports=dbconnect;