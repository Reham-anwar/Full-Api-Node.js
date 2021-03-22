const express = require('express');
const {strict} = require('assert');
const app = express();
const port =3000;
const TodoRouter = require('./routers/Todo');
const UserRouter = require('./routers/User');

const mongoose = require('mongoose');
require('./db-connection');

const bodyParser = require('body-parser');
const { Router } = require('express');
app.use(bodyParser.json());

app.use(express.static('public'));
/////
const handleError = function(err){
    console.log(err);
    return;
}

app.use('/api/todo', TodoRouter);
app.use('/api/user', UserRouter);


//middleware that logs the request url, method, and current time//
app.use('/',(req,res,next)=>{
    const method = req.method; 
    const url = req.originalUrl;
    console.log(url,method);
    console.log("time of Request "+Date.now());
    next();
  })


app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`);
});

//global error handler
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(500);
    res.send({error:'internal server error'})
    next();
})