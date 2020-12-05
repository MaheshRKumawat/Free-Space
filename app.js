let express = require('express');
let app = express();
let bodyParser = require("body-parser");
let mongoose = require('mongoose');
let flash = require("connect-flash");
let passport = require("passport");
let LocalStrategy = require("passport-local");
let methodOverride = require("method-override");
let User = require("./models/user");
let Containers = require("./models/containers");
let Todo = require("./models/todo");
let userRoutes = require("./routes/user");
let containerRoutes = require("./routes/container");
let todoRoutes = require("./routes/todo");

mongoose.connect('mongodb://localhost:27017/freespace', 
    {useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true})
    .then(() => console.log('Connected to DB!'))
    .catch(error => console.log(error.message));

app.use(bodyParser.urlencoded({extended:true}));
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret: "Hey There Mahesh",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/",userRoutes);
app.use("/home",todoRoutes);
app.use("/home/container",containerRoutes);


app.listen(3000,()=>{
    console.log("Server listening from 3000");
});