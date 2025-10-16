// 1️⃣ Import dependencies
const express = require("express");
const cors = require("cors");
const app = express();

// 2️⃣ Middleware
app.use(cors());
app.use(express.json());

// 3️⃣ In-memory array for storing tasks
let tasks = [];

function generateId() {
  return Math.floor(Math.random() * 1000000);
}

// 4️⃣ Routes
app.get("/", (req, res) => {
  res.send("✅ Task Manager API is running!");
});

// ➤ Create a new task
app.post("/tasks", (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!["in-progress", "completed"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  const newTask = { id: generateId(), title, description, status };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// ➤ Get all tasks
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// ➤ Get a task by ID
app.get("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) return res.status(404).json({ error: "Task not found" });
  res.status(200).json(task);
});

// ➤ Update a task
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, status } = req.body;

  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  if (status && !["in-progress", "completed"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" });
  }

  if (title) task.title = title;
  if (description) task.description = description;
  if (status) task.status = status;

  res.status(200).json({ message: "Task updated successfully", task });
});

// ➤ Delete a task
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) return res.status(404).json({ error: "Task not found" });

  tasks.splice(index, 1);
  res.status(200).json({ message: "Task deleted successfully" });
});

// 5️⃣ Error handler (optional)
app.use((err, req, res, next) => {
  console.error("Internal Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// 6️⃣ Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
