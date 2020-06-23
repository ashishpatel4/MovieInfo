var mongoose = require("mongoose");
var passportlocalmongoose = require("passport-local-mongoose");
const { param } = require(".");
const { initParams } = require("request");
const { authorize } = require("passport");

var UserSchema = new mongoose.Schema({
    username:String,
    password:String,
    watchlist:[{
        uid:String,
    }],
    favourite:[{
        uid:String,
    }],
    watched:[{
        uid:String,
    }]
});
UserSchema.plugin(passportlocalmongoose);
module.exports=mongoose.model("user",UserSchema);