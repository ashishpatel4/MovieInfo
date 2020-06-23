const express = require ("express");
const app=express();
const request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var localstrategy = require("passport-local");
var passportlocalmongoose = require("passport-local-mongoose");
var user=require("./models/user");
var index=require("./models/index");
var search=require("./models/search");
var explore=require("./models/explore");

mongoose.connect("mongodb://localhost/movie_info",{useNewUrlParser:true,useUnifiedTopology: true,useCreateIndex: true});


app.use(require("express-session")({
    secret:"this is the movie database",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser()); 

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use('/public', express.static('public')); 

app.use(index);
app.use(search);
app.use(explore);

app.get("/register",function(req,res){
    res.render("register");
});

app.post("/register",function(req,res){
    user.register(new user({username:req.body.username}),req.body.password,function(error,user){
        if(error)
        {
            res.render("register");
        } else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/");
            });
        }
    })
});

app.get("/login",function(req,res){
    res.render("login");
});

app.post("/login",passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/login"}),
    function(req,res){}
);

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});

function loggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3001,'localhost',() =>{
    console.log("server started");
});