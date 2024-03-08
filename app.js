const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to cats blog";
const breedsContent = "Top 5 breeds";
const photoContent = "Take a photo";
const healthContent = "Cats and health";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/health", function(req, res){
  res.render("health", {healthContent: healthContent});
});

app.get("/breeds", function(req, res){
  res.render("breeds", {breedsContent: breedsContent});
});

app.get("/photo", function(req, res){
  res.render("photo", {photoContent: photoContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.get("/test", function(req, res){ 
  res.render("test", {testContent: testContent});
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
