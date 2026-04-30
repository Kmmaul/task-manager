const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
let tasks = [
    {id: 1, title: "Learn JavaScript", completed: false},
    {id: 2, title: "Build an API", completed: false}
];

app.get("/", (req, res) => {
    res.send("Task Manager API is running");
});

app.get("/tasks", (req, res) => {res.json(tasks)});


app.put("/tasks/:id", (req, res) => {
    const taskId = Number(req.params.id);
    const task = tasks.find(task => task.id === taskId);

        if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    task.title = req.body.title ?? task.title;
    task.completed = req.body.completed ?? task.completed;
    res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
    const taskId = Number(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);

    res.json({message: "Task deleted"});
});

app.get("/tasks/completed", (req, res) => {
    const completedTasks = tasks.filter(task => task.completed === true);
    res.json(completedTasks);
});

app.get("/tasks/:id", (req, res) => {
    const taskId = Number(req.params.id);
    const task = tasks.find(task => task.id === taskId);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
});

app.post("/tasks", (req, res) => {
    if(!req.body.title || typeof req.body.title !== "string"){
        return res.status(400).json({message: "Title is required"});
    }

    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

app.patch("/tasks/:id/toggle", (req,res) => {
    const taskId = Number(req.params.id);
    const task = tasks.find(task => task.id === taskId);

    if(!task)
    {
        return res.status(404).json({message: "Task not found"});
    }

    task.completed = !task.completed;

    res.json(task);
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})