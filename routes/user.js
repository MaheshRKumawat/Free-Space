let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let User = require("../models/user");
let Containers = require("../models/containers");
let Todo = require("../models/todo");
let passport = require("passport");
let LocalStrategy = require("passport-local");
let nodemailer = require("nodemailer");
let async = require("async");
let crypto = require("crypto");
let middleware = require("../middleware");

router.get("/",(req,res)=>{
    res.render("landing.ejs");
})

router.get("/signup",(req,res)=>{
    res.render("signup.ejs",{page: 'signup'});
});

router.post("/signup",(req,res)=>{
    let newUser= new User({
        username: req.body.username,
        image: req.body.image,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    });
    User.register(newUser,req.body.password,(err,user)=>{
        if(err){
            return res.render("signup.ejs", {"error": err.message});
        }
        else{
            passport.authenticate("local")(req,res,function(){
                req.flash("success","Welcome to FreeSpace "+ user.username);
                res.redirect("/home");
            });
        }
    });
});

router.get("/login",(req,res)=>{
    res.render("login.ejs",{page: 'login'});
});

router.post("/login",passport.authenticate("local",{
    successRedirect: "/home",
    failureRedirect: "/login"
}),(req,res)=>{
});

router.get("/logout",(req,res)=>{
    req.logOut();
    req.flash("success","Logged you out");
    res.redirect("/");
});

router.get('/forgot', function(req, res) {
    res.render('forgot.ejs');
});

router.post('/forgot', function(req, res, next) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token);
            });
        },
        function(token, done) {
            User.findOne({ email: req.body.email }, function(err, user) {
                if (!user) {
                    req.flash('error', 'No account with that email address exists.');
                    console.log("Oh oh error: user=> ",user);
                    return res.redirect('/forgot');
                }
                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    
                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        function(token, user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail', 
                auth: {
                    user: 'maheshrkumawat@gmail.com',
                    pass: 'chotu09*'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'maheshrkumawat@gmail.com',
                subject: 'FreeSpace Password Reset',
                text: "Hi\nYou are receiving this email becuse you or someone else have requested the reset of the password for the free space account\n\n"+
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                console.log('mail sent');
                req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/forgot');
    });
});

router.get('/reset/:token', function(req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('/forgot');
      }
      res.render('reset.ejs', {token: req.params.token});
    });
});
  
router.post('/reset/:token', function(req, res) {
    async.waterfall([
        function(done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }
                if(req.body.password === req.body.confirm) {
                    user.setPassword(req.body.password, function(err) {
                        user.resetPasswordToken = undefined;
                        user.resetPasswordExpires = undefined;
            
                        user.save(function(err) {
                            req.logIn(user, function(err) {
                            done(err, user);
                            });
                        });
                    });
                } 
                else {
                    req.flash("error", "Passwords do not match.");
                    return res.redirect('back');
                }
            });
        },
        function(user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail', 
                auth: {
                    user: 'maheshrkumawat@gmail.com',
                    pass: 'chotu09*'
                }
            });
            var mailOptions = {
                to: user.email,
                from: 'maheshrkumawat@gmail.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' +
                    'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                req.flash('success', 'Success! Your password has been changed.');
                done(err);
            });    
        }
    ], function(err) {
    res.redirect('/home');
    });
});

const homeDisplay = async (userid,User,Containers,Todo)=>{
    var displayContainers=[];
    User.findById(userid,function(err,foundUser){
        if(err){
            console.log(err);
        }
        else{
            let checkUser={
                id: foundUser._id, 
                username: foundUser.username
            }
            Containers.find({User:checkUser},(err,foundContainers)=>{
                if(err){
                    console.log(err);
                }
                else{
                    let container={
                        containerName:"",
                        containerid:"",
                        Todos: [],
                        Todosid: []
                    };
                    foundContainers.forEach((foundContainer)=>{
                        container.containerName=foundContainer.containerName;
                        container.containerid=foundContainer._id;
                        container.Todos=[];
                        container.Todosid=[];
                        Todo.find({containerRelated:foundContainer._id},(err,todos)=>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("\n\ntodos: ",todos);
                                todos.forEach((singleTodo)=>{
                                    container.Todos.push(singleTodo.todoTask);
                                    container.Todosid.push(singleTodo._id);
                                })
                                console.log("container: ",container);
                                console.log("Display Container: ",displayContainers);
                            }
                        });
                        displayContainers.push(container);
                    });
                    return displayContainers;
                }
            });
        }
    });
}
    
router.get('/home',middleware.isLoggedIn,(req,res)=>{
    var userid=req.user._id;
  homeDisplay(userid,User,Containers,Todo)
   .then((displaycontainerstemp)=>{
       console.log("Before render: ",displaycontainerstemp);
        res.render("home.jsx",{containers:displaycontainerstemp});
    })
    .catch(err=>{
        console.log("Oh oh error: ",err);
    })
    // res.render("home.jsx",{containers:displayContainers});
});

module.exports = router;

// let displayContainers=[
//     // {
//     //     containerName: "Work",
//     //     containerid: "5fca5d723b6f485fa41eb3f4",
//     //     Todos: ["Do this stuff","presentation"],
//     //     Todosid: []
//     // },
//     {
//         containerName: "Study",
//         containerid: "5fca9188f7755c332812e717",
//         Todos: ["SDS","DDCO"],
//         Todosid: ["5fca91d7f7755c332812e718", "5fca91f2f7755c332812e719"]
//     },
//     // {
//     //     containerName: "Shopping",
//     //     containerid: "5fca5dbe3b6f485fa41eb3f7",
//     //     Todos: ["buy this thing","shopping at time"],
//     //     Todosid: [1,2]
//     // },
//     // {
//     //     containerName: "Gym",
//     //     containerid: "5fca5dce3b6f485fa41eb3f8",
//     //     Todos: ["No junk food","go to gym"],
//     //     Todosid: [3,4 ]
//     // }
// ];