var express = require("express");
var router = express.Router();
var connection = require('../connection')


router.post("/", function(req, res, next) {
    const blog_title = req.body.blog_title;
    const blog_image_url =req.body.blog_image_url;
    const blog_desc =req.body.blog_desc;
    const blog_link =req.body.blog_link;
    console.log(req.body);
    // const CurrentTimeStamp = new Date();
    console.log("reached here.");
    connection.query(
        "INSERT INTO blogs (heading, image_link, description, blog_link) VALUES (?,?,?,?)",
        [blog_title, blog_image_url, blog_desc, blog_link],
        (err, result)=> {
          if(err){
            console.log(err)
          }
          else{
            console.log(result);
            res.send({"success":"New Blog Added."})
          }
          
        }
      );
});

module.exports = router;