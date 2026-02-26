class TaskManager {
    constructor() {
        this.tasks = [];
        this.nextId = 1;
    }

    validateTitle(title) {
        if (typeof title !== "string" || title.trim().length === 0) {
            throw new Error("Title is required");
        }
    }

    validatePriority(priority) {
        if (!Number.isInteger(priority) || priority < 1 || priority > 5) {
            throw new Error("Priority must be an integer from 1 to 5");
        }
    }

    addTask(title, priority = 3) {
        this.validateTitle(title);
        this.validatePriority(priority);

        const task = {
            id: this.nextId++,
            title: title.trim(),
            completed: false,
            priority
        };

        this.tasks.push(task);
        return task;
    }

    getAllTasks() {
        return this.tasks;
    }

    getTaskById(id) {
        return this.tasks.find(task => task.id === id) || null;
    }

    updatePriority(id, priority) {
        this.validatePriority(priority);

        const task = this.getTaskById(id);
        if (!task) {
            throw new Error("Task not found");
        }

        task.priority = priority;
        return task;
    }

    completeTask(id) {
        const task = this.getTaskById(id);
        if (!task) {
            throw new Error("Task not found");
        }

        task.completed = true;
        return task;
    }

    deleteTask(id) {
        const index = this.tasks.findIndex(task => task.id === id);
        if (index === -1) {
            return false;
        }

        this.tasks.splice(index, 1);
        return true;
    }

    getCompletedTasks() {
        return this.tasks.filter(task => task.completed);
    }

    getPendingTasks() {
        return this.tasks.filter(task => !task.completed);
    }

    getCompletionStats() {
        const total = this.tasks.length;
        const completed = this.getCompletedTasks().length;
        const pending = total - completed;
        const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

        return {
            total,
            completed,
            pending,
            completionRate
        };
    }
}

module.exports = { TaskManager };

