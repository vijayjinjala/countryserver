const express = require('express');
const Rmodel = require('../model/Rmodel');
const UserRout = express.Router();
var jwt = require('jsonwebtoken');
const Authorization = require('../Middleware/Authorization');
UserRout.post('/loginuser',async (req, res) => {
    try {
                
        const { username, password } = req.body;
        let userdata = await Rmodel.findOne({  
            username:username,
            password:password
        });


        if(userdata !=null){
            const token = jwt.sign({ id: userdata._id }, process.env.PRIVATE_KEY,);
            res.status(200).json({ 
                "token":token,
                "message":"Login Succesful",
                "status":1
            });
        }else{
            res.status(403).json({ 
                "message":"Invalid Username or Password",
            });
        }
    }catch (e) {
            res.status(500).json({ error: e.message });
        }
    });


    UserRout.post('/data',Authorization,async (req, res) => {
        console.log("getdata");

        res.send(
            "get data"
        )

    });

    module.exports = UserRout