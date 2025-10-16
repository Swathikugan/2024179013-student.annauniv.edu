// controllers/taskController.js
const tasks = require("../data/tasks");

// To generate unique IDs
const { v4: uuidv4 } = require("uuid");

// POST /tasks - Create a new task
exports.createTask = (req, res) => {
  const { title, description, status } = req.body;

  // Validation
  if (!title || !description || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!["in-progress", "completed"].includes(status)) {
    return res.status(400).json({ message: "Status must be 'in-progress' or 'completed'" });
  }

  const newTask = {
    id: uuidv4(),
    title,
    description,
    status,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
};

// GET /tasks - Get all tasks
exports.getAllTasks = (req, res) => {
  res.json(tasks);
};

// GET /tasks/:id - Get task by ID
exports.getTaskById = (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
};

// PUT /tasks/:id - Update a task
exports.updateTask = (req, res) => {
  const task = tasks.find((t) => t.id === req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { title, description, status } = req.body;

  if (status && !["in-progress", "completed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  if (title) task.title = title;
  if (description) task.description = description;
  if (status) task.status = status;

  res.json({ message: "Task updated successfully", task });
};

// DELETE /tasks/:id - Delete a task
exports.deleteTask = (req, res) => {
  const index = tasks.findIndex((t) => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  tasks.splice(index, 1);
  res.json({ message: "Task deleted successfully" });
};
