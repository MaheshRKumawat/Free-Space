let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let User = require("../models/user");
let passport = require("passport");
let LocalStrategy = require("passport-local");
let nodemailer = require("nodemailer");
let async = require("async");
let crypto = require("crypto");

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

router.get("/",(req,res)=>{
    res.render("landing.ejs");
})

router.get("/signup",(req,res)=>{
    res.render("signup.ejs");
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
            console.log(err);
            res.redirect("/signup");
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/home");
            });
        }
    });
});

router.get("/login",(req,res)=>{
    res.render("login.ejs");
});

router.post("/login",passport.authenticate("local",{
    successRedirect: "/home",
    failureRedirect: "/login"
}),(req,res)=>{
});

router.get("/logout",(req,res)=>{
    req.logOut();
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
                    // req.flash('error', 'No account with that email address exists.');
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
                    pass: process.env.GMAILPW
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
                // req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/home');
    });
});

router.get('/reset/:token', function(req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
      if (!user) {
        //req.flash('error', 'Password reset token is invalid or has expired.');
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
                    //req.flash('error', 'Password reset token is invalid or has expired.');
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
                    //req.flash("error", "Passwords do not match.");
                    return res.redirect('back');
                }
            });
        },
        function(user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'Gmail', 
                auth: {
                    user: 'maheshrkumawat@gmail.com',
                    pass: process.env.GMAILPW
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
                //req.flash('success', 'Success! Your password has been changed.');
                done(err);
            });    
        }
    ], function(err) {
    res.redirect('/home');
    });
});

const homeDisplay = async(userid,User,Containers,Todo)=>{
    var displayContainersfunc=[]
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
                    for(let foundContainer of foundContainers){
                        var container={
                            containerName:String,
                            containerid:Number,
                            Todos: []
                        };
                        container.containerName=foundContainer.containerName;
                        container.containerid=foundContainer._id;
                        Todo.find({containerRelated:foundContainer._id},(err,todos)=>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                console.log("\n\ntodos: ",todos);
                                for(let singleTodo of todos){
                                    container.Todos.push(singleTodo.todoTask);
                                }
                                console.log("container: ",container);
                                displayContainersfunc.push(container);
                                console.log("Display Container: ",displayContainersfunc);
                            }
                        });
                    }
                }
            });
        }
    });
    return displayContainersfunc;
}
    
router.get('/home',isLoggedIn,(req,res)=>{
    var userid=req.user._id;
    homeDisplay(userid,User,Containers,Todo)
    .then((displayContainersfunc)=>{
        res.render("home.jsx",{containers:displayContainersfunc});
    })
    .catch(err=>{
        console.log("Oh oh error: ",err);
    })
});

module.exports = router;