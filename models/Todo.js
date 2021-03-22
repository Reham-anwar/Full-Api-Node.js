const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    userId:{
        type: mongoose.ObjectId
    },
    title:{
        type: String,
        minlength: 10,
        maxlength: 20,
        reuired: true
    },
    body:{
        type:String,
        required:true,
        minlength:10,
        maxLength:500
        }, 
    tags:{
        type: [String]
    },
    createdAt: {type:Date},
    updatedAt: {type:Date,default:Date.now}
});

const Todo = mongoose.model('Todo',TodoSchema);
module.exports = Todo;