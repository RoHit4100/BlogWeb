const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(3000, function () {
    console.log("This server is running on 3000 port");
})