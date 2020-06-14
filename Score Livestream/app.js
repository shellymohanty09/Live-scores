const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-shelly:shelly987@cluster0-wbewe.mongodb.net/scoreDB", {useNewUrlParser: true, useUnifiedTopology: true });

const scoreSchema = {
  team: String,
  points: Number
};

const Score = mongoose.model("Score", scoreSchema);

app.get("/", function(req, res) {

  Score.find({}, function(err, foundItems){
        res.render("home", {newListItems: foundItems});
  });
});

let port = process.env.PORT;
if(port == null || port == ""){
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started successfully");
});
