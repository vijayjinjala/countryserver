const express = require('express');
const city_route = express();
const bodyParser = require('body-parser');
const cors = require("cors");

city_route.use(bodyParser.json());
city_route.use(bodyParser.urlencoded({extended:true}));

const citycontroller = require('../controller/citycontroller');
const Authorization = require('../Middleware/Authorization');

city_route.get('/state/:id',Authorization,citycontroller.getStates)
city_route.post('/post-cities',Authorization,citycontroller.postcity)
city_route.get('/get-cities',Authorization,citycontroller.getCity)
city_route.put('/put-cities',Authorization,citycontroller.putCity)


module.exports=city_route;