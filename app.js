const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');
const app = express();
const posts = [];
const homeContent = "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
const aboutContent = "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."
const contactContent = "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged."

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.render("home.ejs", { content: homeContent, post: posts })

})

app.get("/about", function (req, res) {
    res.render("about.ejs", { content: aboutContent })
})

app.get("/contact", function (req, res) {
    res.render("contact.ejs", { content: contactContent })
})

app.get("/compose", function (req, res) {
    res.render("compose.ejs", { content: contactContent })
})

app.get("/posts/:postName", function (req, res) {
    let pN = _.lowerCase(req.params.postName);
    for (let i = 0; i < posts.length; i++) {
        if (pN === _.lowerCase(posts[i].title)) {
            res.render("post.ejs", {
                title: posts[i].title,
                postContent: posts[i].postContent
            });
        }
    }
})

app.post("/compose", function (req, res) {

    let post = {
        title: req.body.postTitle,
        postContent: req.body.postArea
    };

    posts.push(post);
    res.redirect("/");
})

app.listen(3000, function () {
    console.log("This server is running on 3000 port");
})