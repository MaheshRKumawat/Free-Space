let express = require("express");
let router = express.Router();
let mongoose = require('mongoose');
let User = require("../models/user");
let Containers = require("../models/containers");
let Todo = require("../models/todo");

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

router.get('/new',isLoggedIn,(req,res)=>{
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

router.post("/new",isLoggedIn,(req,res)=>{
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