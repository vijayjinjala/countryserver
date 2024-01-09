const express = require('express');
const state_route = express();
const bodyParser = require('body-parser');
const cors = require("cors");

state_route.use(bodyParser.json());
state_route.use(bodyParser.urlencoded({extended:true}));

const statecontroller = require('../controller/statecontroller');
const Authorization = require('../Middleware/Authorization');

state_route.post('/post-states',Authorization,statecontroller.postState)
state_route.get('/get-states',Authorization,statecontroller.getState)
state_route.put('/put-states',Authorization,statecontroller.putState)


module.exports=state_route;