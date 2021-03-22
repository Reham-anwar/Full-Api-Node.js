//////todo////
const express = require('express');
const Todo = require('../models/Todo');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const TodoRouter = new express.Router();

const authenticationMiddleWares = require('../middlewares/Authentication')
TodoRouter.use(authenticationMiddleWares);

//Create new todo 
TodoRouter.post('/', async(req,res,next)=>{
    const {body,title,tags} = req.body;
    req.body['createdAt'] = Date.now();
    const Todo=await todo.create({ userId: req.signedData.id, body: body, title: title, tags: tags })
       res.send(Todo);
});
// Return the todos of specific user 
TodoRouter.get('/', async(req,res,next)=>{
    const Todo= await Todo.find({userId: req.signedData.id});
    res.send(Todo);

});
// //get todos by skip and limit
TodoRouter.get('/:limit/:skip', async (req,res,next)=>{
    const todos = Todo.find({}).skip(parseInt(req.params.skip)).limit(parseInt(req.params.limit)).exec();
    res.send(todos);
});
// //Edit todo ////patch todo By Id
TodoRouter.patch('/:id',async (req,res,next)=>{
    const id = req.params.id;
    req.body['updatedAt'] = Date.now();
    const Todo =await Todo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        res.send(Todo);
});
//
TodoRouter.delete('/:id',async(req,res,next)=>{
    const Todo=await Todo.findByIdAndRemove(req.params.id);
    res.send(Todo);
});


module.exports = TodoRouter;
