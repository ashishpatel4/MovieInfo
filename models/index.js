var express = require("express");
var router = express.Router();
const request = require("request");
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended:true}));
router.use('/public', express.static('public'));

router.get("/",(req,res) => {
    var url="https://api.themoviedb.org/3/trending/movie/week?api_key=04f6aaf9ace5b69932a2b9a1edff1881";
    request(url,(error1,response1,body1) => {
        if(!error1 && response1.statusCode == 200)
        {
            var movie_week=JSON.parse(body1);
            url="https://api.themoviedb.org/3/trending/movie/day?api_key=04f6aaf9ace5b69932a2b9a1edff1881";
            request(url,(error2,response2,body2) => {
                if(!error2 && response2.statusCode == 200)
                {
                    var movie_day=JSON.parse(body2);
                    url="https://api.themoviedb.org/3/trending/tv/week?api_key=04f6aaf9ace5b69932a2b9a1edff1881";
                    request(url,(error3,response3,body3) => {
                        if(!error3 && response3.statusCode == 200)
                        {
                            var tv_week=JSON.parse(body3);
                            url="https://api.themoviedb.org/3/trending/tv/day?api_key=04f6aaf9ace5b69932a2b9a1edff1881";
                            request(url,(error4,response4,body4) => {
                                if(!error4 && response4.statusCode == 200)
                                {
                                    var tv_day=JSON.parse(body4);
                                    url="https://api.themoviedb.org/3/trending/all/week?api_key=04f6aaf9ace5b69932a2b9a1edff1881";
                                    request(url,(error5,response5,body5) => {
                                        if(!error5 && response5.statusCode ==200)
                                        {
                                            var all=JSON.parse(body5);
                                            res.render("index",{movie_week:movie_week,movie_day:movie_day,tv_week:tv_week,tv_day:tv_day,all:all});
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});
function loggedin(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports=router;