const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
require("dotenv").config(); 

app.use(bodyParser.urlencoded({
   extended: true
}));
app.use(express.static("public"));
app.use(methodOverride("_method")); 
app.set("view engine", "ejs");
mongoose.set("strictQuery", false);

mongoose.connect("mongodb+srv://Sachin5431:Sachin%4012345@cluster0.n2ptgfm.mongodb.net/todoDB?retryWrites=true&w=majority&appName=Cluster0");
  const taskSchema = new mongoose.Schema({
  title: String,
  priority:{
    type: String,
    enum: ["high", "medium", "low"],
    default: "low"
  }
});

const Task = mongoose.model("Task", taskSchema);
app.get("/", function(req, res){
    Task.find({}, function(err, tasks){
      if(err){
         console.log(err);
         res.status(500).send("error");
      }
      else{
          res.render("index",{
            tasks: tasks,
            error: "",
            message: ""
          });
      }
    });  
});

app.post("/tasks", function(req, res) {
    const { title, priority } = req.body;
    Task.create({ title, priority }, function(err,tasks){
    if(err){
      console.log(err);

      Task.find({}, function(err, tasks){
        if(err){
            console.log(err);
            res.status(500).send("error");
        }
        else{
          res.render("index",{
            tasks: tasks,
            error: "Error",
            message: ""
          });
        }
      });
    }
    else{
      res.redirect("/");
    }
  });
});

app.post("/tasks/edit/:id", function(req, res){
    const { id } = req.params;
    const { title, priority } = req.body;
    Task.findByIdAndUpdate(id,{title, priority}, function(err,tasks){
    if(err){
      console.log(err);
      Task.find({}, function (err, tasks){
      if(err){
        console.log(err);
        res.status(500).send("error");
      }
      else{
        res.render("index", {
          tasks: tasks,
          error: "",
          message: ""
        });
      }
    });
  }
  else{
     res.redirect("/");  
  priority: {
    type: String,
    enum: ["high", "medium", "low"],
    default: "low" }
});


app.post("/tasks/delete/:id", function(req, res){
   const { id } = req.params;
   Task.findByIdAndDelete(id, function(err,tasks){
   if(err){
      console.log(err);
      Task.find({}, function(err, tasks){
        if(err){
          console.log(err);
          res.status(500).send("error");
        }
        else{
          res.render("index",{
            tasks: tasks,
            error: "",
            message: ""
          }); 
        }
      });
   }
   else{
      res.redirect("/");
     }
  });
});
app.listen(3000, function(){
    console.log("Server running on http://localhost:3000");
});


