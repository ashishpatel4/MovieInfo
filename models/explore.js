var express = require("express");
var router = express.Router();
const request = require("request");
var bodyParser = require("body-parser");
var user = require("./user");
const { remove } = require("./user");
router.use(bodyParser.urlencoded({extended:true}));
router.use('/public', express.static('public'));

router.get("/explore/:base/:id",(req,res)=>{
    var url=`https://api.themoviedb.org/3/${req.params.base}/${req.params.id}?api_key=04f6aaf9ace5b69932a2b9a1edff1881`;
    request(url,(error,response,body) => {
        if(!error && response.statusCode==200)
        {
            var data=JSON.parse(body);
            //console.log(req.user.username);
            res.render("selected",{datas:data,media_type:req.params.base});
        }
    });
});

router.post("/explore/:base/:id/add",loggedin,(req,res) => {
    var request = req.body.request;
    if(req.params.base=='tv')
    {
        var uid=`t${req.params.id}`;
    }else{
        var uid=`m${req.params.id}`;
    }
    var data={uid:uid};
    if(request==="watchlist")
    {
        req.user.watchlist.push(data);
        req.user.save();
        res.redirect("/explore/"+req.params.base+"/"+req.params.id);
    }else{
        if(request==="watched")
        {
            req.user.watched.push(data);
            req.user.save();
            res.redirect("/explore/"+req.params.base+"/"+req.params.id);
        }else{
            req.user.favourite.push(data);
            req.user.save();
            res.redirect("/explore/"+req.params.base+"/"+req.params.id);
        }
    }
});

router.post("/explore/:base/:id/remove",loggedin,(req,res) => {
    var request = req.body.request;
    if(req.params.base=='tv')
    {
        var uid=`t${req.params.id}`;
    }else{
        var uid=`m${req.params.id}`;
    }
    if(request==="watchlist")
    {
        user.updateOne({_id:req.user._id},{"$pull":{"watchlist":{"uid":uid}}}).exec();
        res.redirect("/explore/"+req.params.base+"/"+req.params.id);
    }else{
        if(request==="watched")
        {
            user.updateOne({_id:req.user._id},{"$pull":{"watched":{"uid":uid}}}).exec();
            res.redirect("/explore/"+req.params.base+"/"+req.params.id);
        }else{
            user.updateOne({_id:req.user._id},{"$pull":{"favourite":{"uid":uid}}}).exec();
            res.redirect("/explore/"+req.params.base+"/"+req.params.id);
        }
    }
});

function loggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports=router;







// if(err){
//     console.log(err);
// }else{
//     // console.log(doc);
//     doc.forEach((data)=>{
//         //console.log(data);
//         data.watchlist.forEach((value,index,object)=>{
//             // console.log(value);
//             // console.log(index);
//             // console.log(object);
//             if(value.uid==uid){
//                 console.log(value.uid);
//                 object.splice(index, 1);
//             }
//         });
//     });