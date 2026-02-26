const express = require("express");
const { TaskManager } = require("./taskManager");

function createApp() {
    const app = express();
    const manager = new TaskManager();

    app.use(express.json());

    app.get("/", (req, res) => {
    res.send("Task Manager API is running");
});

    app.post("/tasks", (req, res) => {
        try {
            const { title, priority } = req.body;
            const task = manager.addTask(title, priority);
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    app.get("/tasks", (req, res) => {
        res.json(manager.getAllTasks());
    });

    app.patch("/tasks/:id/complete", (req, res) => {
        try {
            const id = Number(req.params.id);
            const task = manager.completeTask(id);
            res.json(task);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    });

    return app;
}

if (require.main === module) {
    const app = createApp();
    const port = 3000;

    app.listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
    });
}

module.exports = { createApp };
