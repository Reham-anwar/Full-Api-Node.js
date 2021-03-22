///////////users////
const express = require('express');
const UserRouter = new express.Router();
const User = require('../models/User');
const Todo = require('../models/Todo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticationMiddleWares = require('../middlewares/Authentication');
const user = require('../models/User');


UserRouter.post('/register',async(req,res,next)=>{
    try{
        const {username,password,firstname,age}= req.body;
          console.log({username,password});
        const hash =await bcrypt.hash(password, 7);
        const user = await User.create({username:username,password:hash,firstName:firstname,age:age});
        res.statusCode = 201;
        res.send({username,age});
    }catch(err){
        console.error(err);
        res.statusCode=422;
        res.send(err);
    }
});
//
UserRouter.post('/login', async(req,res,next)=>{
    try{
    const {username,password} = req.body;
    const user = await User.findOne({ username }).exec();
    if(!user) throw new Error("wrong username or password");

    //console.log(user);
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error("wrong username or password");
    
    //generate jasonwebtoken & send to user//
    const token = jwt.sign({id: user.id}, 'my-signing-secret');
    const latestTodo = await Todo.find({userId:user.id}).exec();
    res.json ({token,latestTodo});
   
    }
    catch(err){
        console.error(err);
        res.statusCode=422;
        res.json(err);
    }
});

UserRouter.use(authenticationMiddleWares);

// get user firstName
UserRouter.get('/', async(req,res,next)=>{
    const myUser =await User.find({},{firstName:1});
    res.send(myUser);
});
// delete user by id
UserRouter.delete('/',async (req,res,next)=>{
    const {authorization} = req.headers;
    const signedData = jwt.verify(authorization,'my-signing-secret');
    const myUser =await User.findByIdAndRemove(req.signedData.id);
     res.send(myUser);   
});

//update user by id
UserRouter.patch('/',async(req,res,next)=>{
    const myUser = await User.findByIdAndUpdate(req.signedData.id, req.body , {useFindAndModify:false});
    res.send(myUser);
});

module.exports = UserRouter;