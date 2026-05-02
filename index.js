const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(require("cors")());


// let tasks = [
//     {id: 1, title: "Learn JavaScript", completed: false},
//     {id: 2, title: "Build an API", completed: false}
// ];

app.get("/", (req, res) => {
    res.send("Task Manager API is running");
});


app.get("/tasks", (req, res) => {
    const tasks = db.prepare("SELECT * FROM tasks").all();

    const formattedTasks = tasks.map(task => ({
        ...task,
        completed: Boolean(task.completed)
    }));

    res.json(formattedTasks);
});

app.put("/tasks/:id", (req, res) => {
  const taskId = Number(req.params.id);

  const existing = db.prepare(
    "SELECT * FROM tasks WHERE id = ?"
  ).get(taskId);

  if (!existing) {
    return res.status(404).json({ message: "Task not found" });
  }

  const title = req.body.title ?? existing.title;
  const completed = req.body.completed ?? existing.completed;

  db.prepare(
    "UPDATE tasks SET title = ?, completed = ? WHERE id = ?"
  ).run(title, completed ? 1 : 0, taskId);

  const updated = db.prepare(
    "SELECT * FROM tasks WHERE id = ?"
  ).get(taskId);

  res.json({
    ...updated,
    completed: Boolean(updated.completed)
  });
});

app.delete("/tasks/:id", (req, res) => {
    const taskId = Number(req.params.id);

    const existing = db.prepare(
        "SELECT * FROM tasks WHERE id = ?"
    ).get(taskId);

    if (!existing) {
        return res.status(404).json({ message: "Task not found" });
    }

    db.prepare(
        "DELETE FROM tasks WHERE id = ?"
    ).run(taskId);

    res.json({ message: "Task deleted" });
});

app.get("/tasks/completed", (req, res) => {
    const completedTasks = tasks.filter(task => task.completed === true);
    res.json(completedTasks);
});

app.get("/tasks/:id", (req, res) => {
    const taskId = Number(req.params.id);
    const task = db.prepare(
        "SELECT * FROM tasks WHERE id = ?"
    ).get(taskId);

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.json({
        ...task,
        completed: Boolean(task.completed)
    });
});

app.post("/tasks", (req, res) => {
    if(!req.body.title || typeof req.body.title !== "string"){
        return res.status(400).json({message: "Title is required"});
    }

    const result = db.prepare(
        "INSERT INTO tasks (title, completed) VALUES (?, ?)"
    ).run(req.body.title, 0);


    const newTask = db.prepare(
        "SELECT * FROM tasks WHERE id = ?"
    ).get(result.lastInsertRowid);

    res.status(201).json({
        ...newTask,
        completed: Boolean(newTask.completed)
    });
});

app.patch("/tasks/:id/toggle", (req,res) => {
    const taskId = Number(req.params.id);

    const existing = db.prepare(
        "SELECT * FROM tasks WHERE id = ?"
    ).get(taskId);

    if (!existing) {
        return res.status(404).json({ message: "Task not found" });
    }

    const newCompleted = existing.completed ? 0 : 1;

    db.prepare(
        "UPDATE tasks SET completed = ? WHERE id = ?"
    ).run(newCompleted, taskId);

    const updated = db.prepare(
        "SELECT * FROM tasks WHERE id = ?"
    ).get(taskId);

    res.json({
        ...updated,
        completed: Boolean(updated.completed)
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
})