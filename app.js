const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const _ = require('lodash');
const mongoose = require('mongoose');
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const homeContent = "The homepage of your site is the first introduction each visitor will have to your business. Before they make up their mind to become a customer, they’ll review your homepage to get an idea of what you sell, why that matters to them, and how they can benefit from what you have to offer."
    + "Make a brilliant first impression with a homepage that incorporates the elements outlined above. And for more inspiration, check out stunning examples of homepages by downloading the free look book below."
const aboutContent = "What’s your writing process like? When a writer hears this question, their first thought it, “None of your business.” Or, “It’s mine and I don’t want to tell you.” Even without the defense, the answer is, “Well, it changes. It depends on the project, the subject, my mood…" +
    + "The writing process is personal to the writer. They may have one tried-and-true process they swear by or several they choose from. Even the weather can play a role in how you write – where you plant yourself to type and how long you work for, for example. Planners approach writing strategically. “Pansters” – people who fly by the seat of their pants – don’t like constraints."
const contactContent = "This Contact Us page is for a marketing agency that works directly with businesses. Since it knows its audience, Brandaffair encourages visitors to 'have a talk' one-on-one rather than providing a one-way communication channel via support resources."
main().catch(err => console.log(err));

async function main() {
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://127.0.0.1:27017/blogApp');
}

const postSchema = mongoose.Schema({
    title: String,
    content: String
});


const Post = new mongoose.model("Post", postSchema);
let post = new Post({
    title: "",
    content: ""
});


app.get("/", function (req, res) {
    Post.find(function (err, posts) {
        if (!err) {
            console.log("No error");
            res.render("home.ejs", { content: homeContent, post: posts })
        }
    })
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

app.get("/posts/:postId", function (req, res) {
    let postId = req.params.postId;
    postId = postId.trim();
    Post.findOne({ _id: postId }, function (err, foundPost) {
        if (!err) {
            console.log(foundPost);
            res.render("post.ejs", { title: foundPost.title, postContent: foundPost.content });
        };
    });
});

app.get("/posts", function (req, res) {
    Post.find(function (err, foundPosts) {
        res.render("posts.ejs", { posts: foundPosts })
    })
})

app.post("/compose", function (req, res) {
    let post = new Post({
        title: req.body.postTitle,
        content: req.body.postArea
    });
    post.save(function (err) {
        if (!err) {
            res.redirect("/");
        } else {
            console.log(err);
        }
    });
})

app.listen(3000, function () {
    console.log("This server is running on 3000 port");
})