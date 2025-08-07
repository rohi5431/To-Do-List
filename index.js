const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require('method-override');

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const newSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ["low", "mid", "high"],
        default: "low"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Todo = mongoose.model("Todo", newSchema);

app.get("/about",function(req,res){
    res.render("about");
});
app.get("/contact",function(req,res){
    res.render("contact");
});

app.get("/", async function(req, res){
    try{
        const filter = {};
        if(req.query.priority){
            filter.priority = req.query.priority;
        }
        const todos = await Todo.find(filter).sort({ date: -1 });
        res.render("list", { todos });
    } 
    catch(error){
        res.status(500).send("Error loading tasks");
    }
});

app.post("/add", async function(req, res){
    const task = req.body.task;
    const priority = req.body.priority;

    if(!task){
        return res.status(400).send("Task cannot be empty");
    }

    const newTask = new Todo({ task, priority });

    try{
        await newTask.save();
        res.redirect("/");
    } 
    catch(error){
        res.status(500).send("Server error");
    }
});

app.put("/edit/:id", async function(req, res){
    const id = req.params.id;
    const task = req.body.task;
    const priority = req.body.priority;

    if(!task){
        return res.status(400).send("Task cannot be empty");
    }

    try{
        await Todo.findByIdAndUpdate(id, { task, priority });
        res.redirect("/");
    } 
    catch(error){
        res.status(500).send("Server error");
    }
});

app.delete("/delete/:id", async function(req, res){
    const id = req.params.id;

    try{
        await Todo.findByIdAndDelete(id);
        res.redirect("/");
    }
    catch(error){
        res.status(500).send("Server error");
    }
});

app.listen(7000, function (){
    console.log("Server is running on port 7000");
});
