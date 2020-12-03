// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const Todo = require("./models/todo");
// const User = require("./models/user");
// const Containers = require("./models/containers");
// const bodyParser = require("body-parser");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const async = require("async");
// const nodemailer = require("nodemailer");
// const crypto = require("crypto");


// mongoose.connect('mongodb://localhost:27017/freespace', 
//     {useNewUrlParser: true,useUnifiedTopology: true})
//     .then(() => console.log('Connected to DB!'))
//     .catch(error => console.log(error.message));

// app.use(bodyParser.urlencoded({extended:true}));

// app.use(require("express-session")({
//     secret: "Hey There Mahesh",
//     resave:false,
//     saveUninitialized:false
// }));



// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// app.set('views', __dirname + '/views');
// app.set('view engine', 'jsx');
// app.engine('jsx', require('express-react-views').createEngine());

// function isLoggedIn(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }



// app.get('/home',isLoggedIn,(req,res)=>{
//     var displayContainers=[];
//     var userid=req.user._id;

//     async function displayHomefunc(userid,displayContainers){
//         let checkUser = await checkUserfunc(userid);
//         console.log("\nCheck User: ",checkUser);
//         let foundContainers = await checkContainersfunc(checkUser);
//         console.log("\nCheck Containers: ",checkContainers);
//         let funcdisplayContainers = await giveContainers(foundContainers,displayContainers);
//         console.log("\nDisplay Containers: ",funcdisplayContainers);
//         return funcdisplayContainers;
//     }
    
//     async function checkUserfunc(userid){
//         User.findById(userid,function(err,foundUser){
//             if(err){
//                 throw err;
//             }
//             else{
//                 let checkUser={
//                     id: foundUser._id, 
//                     username: foundUser.username
//                 }
//                 return checkUser;
//             }
//         });
//     }
    
//     async function checkContainersfunc(checkUser){
//         Containers.find({User:checkUser},(err,foundContainers)=>{
//             if(err){
//                 throw err;
//             }
//             else{
//                 return foundContainers;
//             }
//         })
//     }
    
//     async function giveContainers(foundContainers,displayContainers){
//         foundContainers.forEach((foundContainer)=>{
//             var container={
//                 containerName:String,
//                 containerid:Number,
//                 Todos: []
//             };
//             container.containerName=foundContainer.containerName;
//             container.containerid=foundContainer._id;
//             Todo.find({containerRelated:foundContainer._id},(err,todos)=>{
//                 if(err){
//                     throw err;
//                 }
//                 else{
//                     todos.forEach((singletodo)=>{
//                         container.Todos.push(singletodo.todoTask);
//                     });
//                     console.log("\n\nInside func container: ",container);
//                     displayContainers.push(container);
//                     console.log("\nInside func Display Container: ",displayContainers);
//                 }
//             });
//         });
//         return displayContainers
//     }    

//     displayHomefunc(userid,displayContainers)
//     .then(displayContainers=>{
//         res.render("home.jsx",{containers:displayContainers});
//     })
//     .catch(err=>{
//         console.log("OH no Error: ",err);
//     });
// });

// // app.get('/home',isLoggedIn,(req,res)=>{
// //     var displayContainer=[];
// //     var userid=req.user._id;

// //     async function checkContainers(){
// //         return new Promise
// //         Containers.find({User:checkUser},(err,foundContainers)=>{
// //             if(err){
// //                 console.log(err);
// //             }
// //             else{
// //                 foundContainers.forEach((foundContainer)=>{
// //                     var container={
// //                         containerName:String,
// //                         containerid:Number,
// //                         Todos: []
// //                     };
// //                     container.containerName=foundContainer.containerName;
// //                     container.containerid=foundContainer._id;
// //                     Todo.find({containerRelated:foundContainer._id},(err,todos)=>{
// //                         if(err){
// //                             console.log(err);
// //                         }
// //                         else{
// //                             console.log("\n\ntodos: ",todos);
// //                             todos.forEach((singletodo)=>{
// //                                 container.Todos.push(singletodo.todoTask);
// //                             });
// //                             console.log("container: ",container);
// //                             displayContainer.push(container);
// //                             console.log("Display Container: ",displayContainer);
// //                         }
// //                     });
// //                 });
// //                 return displayContainer;
// //             }
// //         });
// //     }

// //     async function displayHome(userid,displayContainer){
// //         User.findById(userid,function(err,foundUser){
// //             if(err){
// //                 console.log(err);
// //             }
// //             else{
// //                 let checkUser={
// //                     id: foundUser._id, 
// //                     username: foundUser.username
// //                 }
// //                 displayContainer = await 
// //             }
// //         });
// //     }

// //     displayHome(userid,displayContainer)
// //     .then(displayContainer=>{
// //         res.render("home.jsx",{containers:displayContainer});
// //     })
// //     .catch(err=>{
// //         console.log("OH no Error: ",err);
// //     });
// // });



/*
    async function asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
        }
    }

    const getContainers=async (foundContainers)=>{
        var displayContainersfunc=[];
        await asyncForEach(foundContainers, async (num) => {
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
                    await asyncForEach(todos, async (singleTodo) => {
                        container.Todos.push(singleTodo.todoTask);
                    });
                    console.log("container: ",container);
                    displayContainersfunc.push(container);
                    console.log("Display Container: ",displayContainersfunc);
                }
            });
        });
        res.render("home.jsx",{containers:displayContainersfunc});   
    }

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
                    getContainers(foundContainers);
                }
            });
        }
    });
*/
// async function asyncForEach(array, callback) {
//     for (let index = 0; index < array.length; index++) {
//       await callback(array[index], index, array);
//     }
// }

// let getContainers=(foundContainers)=>{
//     return new Promise((reject,resolve)=>{
//         var displayContainersfunc=[]
//         for(let foundContainer of foundContainers){
//             var container={
//                 containerName:String,
//                 containerid:Number,
//                 Todos: []
//             };
//             container.containerName=foundContainer.containerName;
//             container.containerid=foundContainer._id;
//             Todo.find({containerRelated:foundContainer._id},(err,todos)=>{
//                 if(err){
//                     console.log(err);
//                 }
//                 else{
//                     console.log("\n\ntodos: ",todos);
//                     for(let singleTodo of todos){
//                         container.Todos.push(singleTodo.todoTask);
//                     }
//                     console.log("container: ",container);
//                     displayContainersfunc.push(container);
//                     console.log("Display Container: ",displayContainersfunc);
//                 }
//             });
//         }
//         resolve(displayContainersfunc);
//     })
// }

// User.findById(userid,function(err,foundUser){
//     if(err){
//         console.log(err);
//     }
//     else{
//         let checkUser={
//             id: foundUser._id, 
//             username: foundUser.username
//         }
//         Containers.find({User:checkUser},(err,foundContainers)=>{
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 console.log("*****start******");
//                 getContainers(foundContainers)
//                 .then((displayContainers)=>{
//                     res.render("home.jsx",{containers:displayContainers});
//                 })
//                 .catch(err=>{
//                     console.log("Oh no error: ",err);
//                 })
//                 console.log("*****end******");
//             }
//         });
//     }
// });








    // User.findById(req.params.id,function(err,foundUser){
    //     if(err){
    //         req.flash("error","Something went wrong");
    //         res.redirect("back");
    //     }
    //     Campground.find().where("author.id").equals(foundUser._id).exec(function(err,campgrounds){
    //         if(err){
    //             req.flash("error","Something went wrong");
    //             res.redirect("back");
    //         }
    //         res.render("users/show",{user: foundUser, campgrounds: campgrounds});
    //     })
    // });
    // else{
    //     var displayContainer=[];
    //     foundContainers.forEach((foundContainer)=>{
    //         var container={
    //             containerName:String,
    //             containerid:Number,
    //             Todos:[],   
    //         };
    //         container.containerName=foundContainer.containerName;
    //         container.containerid=foundContainer._id;
    //         foundContainer.todos.forEach((id)=>{
    //             Todo.findById(id,(err,foundTodo)=>{
    //                 if(err){
    //                     console.log(err);
    //                 }
    //                 else{
    //                     container.Todos.push(foundTodo.todoTask);
    //                 }
    //             });
    //         });
    //         displayContainer.push(container);
    //     });
    //     res.render("home",{containers:displayContainer});
    //     console.log(displayContainer);
    // }
// const homemiddleware = (req,res,next)=>{
//     if(req.isAuthenticated()){
//         var displayContainersfunc=[]
//         User.findById(req.user._id,function(err,foundUser){
//             if(err){
//                 console.log(err);
//             }
//             else{
//                 let checkUser={
//                     id: foundUser._id, 
//                     username: foundUser.username
//                 }
//                 Containers.find({User:checkUser},(err,foundContainers)=>{
//                     if(err){
//                         console.log(err);
//                     }
//                     else{
//                         for(let foundContainer of foundContainers){
//                             var container={
//                                 containerName:String,
//                                 containerid:Number,
//                                 Todos: []
//                             };
//                             container.containerName=foundContainer.containerName;
//                             container.containerid=foundContainer._id;
//                             Todo.find({containerRelated:foundContainer._id},(err,todos)=>{
//                                 if(err){
//                                     console.log(err);
//                                 }
//                                 else{
//                                     console.log("\n\ntodos: ",todos);
//                                     for(let singleTodo of todos){
//                                         container.Todos.push(singleTodo.todoTask);
//                                     }
//                                     console.log("container: ",container);
//                                     displayContainersfunc.push(container);
//                                     console.log("Display Container: ",displayContainersfunc);
//                                 }
//                             });
//                         }
//                     }
//                 });
//             }
//         });
//         return next(displayContainersfunc);
//     }
//     res.redirect("/login");
// }
/*

async function getContainers(foundContainers){
    let displayContainersfunc = await awaitgetContainers(foundContainers);
    return displayContainersfunc;
}


const awaitgetContainers = async(foundContainers)=>{
    var displayContainersfunc=[]
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
                //console.log("\n\ntodos: ",todos);
                for(let singleTodo of todos){
                    container.Todos.push(singleTodo.todoTask);
                }
                //console.log("container: ",container);
                displayContainersfunc.push(container);
                //console.log("Display Container: ",displayContainersfunc);
            }
        });
    }
    return displayContainersfunc;
}*/
// User.findById(req.user._id,function(err,foundUser){
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         let checkUser={
    //             id: foundUser._id, 
    //             username: foundUser.username
    //         }
    //         Containers.find({User:checkUser},(err,foundContainers)=>{
    //             if(err){
    //                 console.log(err);
    //             }
    //             else{
    //                 displayContainers = getContainers(foundContainers);
    //                 res.render("home.jsx",{containers:displayContainersfunc});
    //             }
    //         });
    //     }
    // });


return new Promise((reject,resolve)=>{
    
    resolve(displayContainersfunc);
})




var userid=req.user._id;

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
}

const getContainers=async (foundContainers)=>{
    var displayContainersfunc=[];
    await asyncForEach(foundContainers, async (num) => {
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
                await asyncForEach(todos, async (singleTodo) => {
                    container.Todos.push(singleTodo.todoTask);
                });
                console.log("container: ",container);
                displayContainersfunc.push(container);
                console.log("Display Container: ",displayContainersfunc);
            }
        });
    });
    return displayContainersfunc;   
}




const homeDisplay = async(userid)=>{
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






async function getContainers(foundContainers){
    let displayContainersfunc = await awaitgetContainers(foundContainers);
    return displayContainersfunc;
}


const awaitgetContainers = async(foundContainers){
    var displayContainersfunc=[]
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
                //console.log("\n\ntodos: ",todos);
                for(let singleTodo of todos){
                    container.Todos.push(singleTodo.todoTask);
                }
                //console.log("container: ",container);
                displayContainersfunc.push(container);
                //console.log("Display Container: ",displayContainersfunc);
            }
        });
    }
    return displayContainersfunc;
}





User.findById(req.user._id,function(err,foundUser){
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
                displayContainers = getContainers(foundContainers);
                res.render("home.jsx",{containers:displayContainersfunc});
            }
        });
    }
});










async.waterfall([
    function(done) {
        User.findById(req.user._id,function(err,foundUser){
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
                        done(err,foundContainers);
                    }
                });
            }
        });
    },
    function(foundContainers, done) {
        var displayContainersfunc=[]
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
                    //console.log("\n\ntodos: ",todos);
                    for(let singleTodo of todos){
                        container.Todos.push(singleTodo.todoTask);
                    }
                    //console.log("container: ",container);
                    displayContainersfunc.push(container);
                    //console.log("Display Container: ",displayContainersfunc);
                }
            });
        }
        done(displayContainersfunc) 
    }
], function(displayContainersfunc) {
res.render('home.jsx',{containers:displayContainersfunc});
});