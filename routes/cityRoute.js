const express = require('express');
const city_route = express();
const bodyParser = require('body-parser');
const cors = require("cors");

city_route.use(bodyParser.json());
city_route.use(bodyParser.urlencoded({extended:true}));

const citycontroller = require('../controller/citycontroller');

city_route.get('/state/:id',citycontroller.getStates)
city_route.post('/post-cities',citycontroller.postcity)
city_route.get('/get-cities',citycontroller.getCity)
city_route.put('/put-cities',citycontroller.putCity)


module.exports=city_route;