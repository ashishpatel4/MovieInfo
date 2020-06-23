var express = require("express");
var router = express.Router();
const request = require("request");
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:true}));
router.use('/public', express.static('public'));

router.get("/search",(req,res) =>{
    var search=req.query.search;
    if(search==="")
    {
        res.redirect("/");
    }
    else{
        var url=`https://api.themoviedb.org/3/search/multi?api_key=04f6aaf9ace5b69932a2b9a1edff1881&language=en-US&query=${search}&include_adult=false`;
        request(url,(error,response,body) => {
            if(!error && response.statusCode == 200)
            {
                var data=JSON.parse(body);
                //console.log(data);
                res.render("page",{datas:data});
                // res.send(data);
            }
        });
    }
});
function loggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports=router;