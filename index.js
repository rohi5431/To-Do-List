const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const app = express();
require("dotenv").config(); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method")); 


app.set("view engine", "ejs");
mongoose.connect(process.env.MONGODB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));


const taskSchema = new mongoose.Schema({
  title: String,
  priority: { type: String, enum: ["high", "medium", "low"], default: "low" }
});

const Task = mongoose.model("Task", taskSchema);
app.get("/", async (req, res) => {
  const tasks = await Task.find({});
  res.render("index", { tasks, error: "", message: "" });
});

app.post("/tasks", async (req, res) => {
  const { title, priority } = req.body;
  try{
    await Task.create({ title, priority });
    res.redirect("/");
  } 
  catch(err){
    res.render("index", { tasks: await Task.find({}), error: "Error adding task", message: "" });
  }
});

app.post("/tasks/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { title, priority } = req.body;
  try{
    await Task.findByIdAndUpdate(id, { title, priority });
    res.redirect("/");
  } 
  catch(err){
    res.render("index", { tasks: await Task.find({}), error: "Error updating task", message: "" });
  }
});

app.post("/tasks/delete/:id", async (req, res) => {
  const { id } = req.params;
  try{
    await Task.findByIdAndDelete(id);
    res.redirect("/");
  } 
  catch(err){
    res.render("index", { tasks: await Task.find({}), error: "Error deleting task", message: "" });
  }
});


app.listen(3000, () => console.log("Server running on http://localhost:3000"));
