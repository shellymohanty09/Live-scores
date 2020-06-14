const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-shelly:shelly987@cluster0-wbewe.mongodb.net/scoreDB", {useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

const scoreSchema = {
  team: String,
  points: Number
};

const Score = mongoose.model("Score", scoreSchema);

const score1 = new Score({
  team: "Team 1",
  points: 0
});

const score2 = new Score({
  team: "Team 2",
  points: 0
});

const score3 = new Score({
  team: "Team 3",
  points: 0
});

const defaultScores = [score1, score2, score3];

app.get("/", function(req, res) {

  Score.find({}, function(err, foundItems){

    if(foundItems.length === 0){
      Score.insertMany(defaultScores, function(err){
        if(err){
          console.log(err);
        }else{
          console.log("Successfully logged default items to DB");
        }
      });
      res.redirect("/");
    }  else{
        res.render("home", {newListItems: foundItems});
    }

  });
});

app.post("/increase",function(req,res){
  const itemIdIncrease = req.body.increase;

  Score.findById(itemIdIncrease, function(err, foundItems){
    Score.findByIdAndUpdate(itemIdIncrease, {points: foundItems.points+1}, function(err){
      if(err){
        console.log(err);
      }
    });

});
  res.redirect("/");
});

app.post("/decrease",function(req,res){

  const itemIdDecrease = req.body.decrease;

  Score.findById(itemIdDecrease, function(err, foundItems){
    Score.findByIdAndUpdate(itemIdDecrease, {points: foundItems.points-1}, function(err){
      if(err){
        console.log(err);
        }
  });

});
  res.redirect("/");
});

let port = process.env.PORT;
if(port == null || port == ""){
  port = 3001;
}

app.listen(port, function() {
  console.log("Server started successfully");
});
