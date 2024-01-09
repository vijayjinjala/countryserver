require('dotenv').config()
const express = require('express');
const cors = require('cors');

const dbconnect=require("./db");
dbconnect();

const app = express();
app.use(cors());

const dependencyRoute = require('./routes/dependencyRoute');
const stateRoute = require('./routes/stateRoute');
const cityRoute = require('./routes/cityRoute');
const RegisterRout = require('./routes/RegisterRout');
const UserRout = require('./routes/UserRout');


app.use("/",dependencyRoute);
app.use("/",stateRoute);
app.use("/",cityRoute);
app.use("/",RegisterRout);
app.use("/",UserRout);

app.listen(4040, () => {
    console.log("Server started at port no: 4040");
})