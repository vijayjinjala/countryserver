const express = require("express");
const Rmodel = require("../model/Rmodel");
const RegisterRout = express.Router()

var message = "Invalid request";
var status = 0;

RegisterRout.post("/post-data",async = (req,res) =>{
    // console.log("Hello");
    const userdata = new Rmodel({
        'name': req.body.name,
        'email': req.body.email,
        'username': req.body.username,
        'password': req.body.password,
      });
      userdata
        .save()
        .then(() => {
          message = "data save";
          status = 1;
          res.json({
            message: message,
            status: status,
          });
        })
        .catch((err) => {
          console.log(err.message);
          message = err._message;
          res.json({
            message: message,
            status: status,
          });
        });
});

module.exports = RegisterRout;