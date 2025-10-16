// index.js
const express = require("express");
const app = express();
const taskRoutes = require("./routes/taskRoutes");

// Middleware to parse JSON request body
app.use(express.json());

// Use routes
app.use("/", taskRoutes);

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
