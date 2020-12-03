let express = require("express");
let router = express.Router();
let mongoose = require('mongoose');
let User = require("../models/user");
let Containers = require("../models/containers");

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

router.get('/newcontainer',isLoggedIn,(req,res)=>{
    res.render("newcontainer.ejs");
});

router.post('/newcontainer',isLoggedIn,(req,res)=>{
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