let express = require("express");
let router = express.Router();
let mongoose = require('mongoose');
let User = require("../models/user");
let Containers = require("../models/containers");
let Todo = require("../models/todo");
let middleware = require("../middleware");
// const todo = require("../models/todo");

router.get('/new',middleware.isLoggedIn,(req,res)=>{
    res.render("newcontainer.ejs");
});

router.post('/new',middleware.isLoggedIn,(req,res)=>{
    let newContainer = {
        containerName: req.body.container,
        User:{
            id: req.user._id,
            username: req.user.username
        }
    };
    Containers.create(newContainer,function(err,container){
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/home");
        }
    });
});

router.delete("/:id",middleware.isLoggedIn,(req,res)=>{
    Todo.deleteMany({containerRelated:req.params.id},function(err){
        if(err){
            console.log(err);
            res.redirect("/home");
        }
        else{
            Containers.findByIdAndRemove(req.params.id,function(err){
                if(err){
                    console.log(err);
                    res.redirect("/home");
                }
                else{
                    res.redirect("/home");
                }
            })
        }
    })
});

module.exports = router;