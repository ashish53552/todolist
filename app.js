const express = require("express");

const bodyParser = require("body-parser");

const date=require(__dirname+"/date");

const app = express();

console.log(date);

app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
  extended: true
}));

let items = ["Buy Food ", "Cook Food", "Eat Food"];
let workItems = [];
app.get("/", function(req, res) {
  day=date.getDay();
  res.render("list", {
    listTitle: day,
    listItem: items,
  });
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work",
    listItem: workItems
  });
});

app.post("/", function(req, res) {

  let item = req.body.newItem;
  let buttonValue = req.body.list;
  console.log(buttonValue);
  if (buttonValue == "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

});

app.get("/about", function(req, res) {

  res.render("about");
});


app.listen(3000, function() {
  console.log("The server started with port 3000");
});
