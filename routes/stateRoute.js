const express = require('express');
const state_route = express();
const bodyParser = require('body-parser');
const cors = require("cors");

state_route.use(bodyParser.json());
state_route.use(bodyParser.urlencoded({extended:true}));

const statecontroller = require('../controller/statecontroller');

state_route.post('/post-states',statecontroller.postState)
state_route.get('/get-states',statecontroller.getState)
state_route.put('/put-states',statecontroller.putState)


module.exports=state_route;