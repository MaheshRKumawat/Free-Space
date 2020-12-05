let express = require("express");
let router = express.Router();
let mongoose = require('mongoose');
let User = require("../models/user");
let Containers = require("../models/containers");
let Todo = require("../models/todo");
let middleware = require("../middleware");

router.get('/:id/newtodo',middleware.isLoggedIn,(req,res)=>{
    Containers.findById(req.params.id,(err,foundContainer)=>{
        if(err){
            console.log(err);
        }
        else{
            let containerName=foundContainer.containerName;
            res.render("new.ejs",{id:req.params.id,containerName:containerName});
        }
    })
});

router.post("/:id/newtodo",middleware.isLoggedIn,(req,res)=>{
    Containers.findById(req.params.id,function(err,foundContainer){
        if(err){
            console.log(err);
        }
        else{
            let newTodo={
                todoTask: req.body.todo,
                containerRelated: foundContainer._id
            }
            Todo.create(newTodo,function(err,todoTask){
                if(err){
                    console.log(err);
                }
                else{
                    console.log(todoTask);
                    res.redirect("/home");
                }
            });
        }
    });
});

router.delete("/:id/deletetodo",middleware.isLoggedIn,(req,res)=>{
    Todo.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
            res.redirect("/home");
        }
        else{
            console.log('Deleted');
            res.redirect("/home");            
        }
    })
});

module.exports = router;