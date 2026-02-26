const { TaskManager } = require("../src/taskManager");

describe("TaskManager unit tests", () => {
    let manager;

    beforeEach(() => {
        manager = new TaskManager();
    });

    test("should add a task with default priority", () => {
        const task = manager.addTask("Learn Jest");

        expect(task).toEqual({
            id: 1,
            title: "Learn Jest",
            completed: false,
            priority: 3
        });
    });

    test("should trim task title", () => {
        const task = manager.addTask("  Read documentation  ");

        expect(task.title).toBe("Read documentation");
    });

    test("should throw error for empty title", () => {
        expect(() => manager.addTask("   ")).toThrow("Title is required");
    });

    test("should allow minimum priority value", () => {
        const task = manager.addTask("Low priority task", 1);

        expect(task.priority).toBe(1);
    });

    test("should allow maximum priority value", () => {
        const task = manager.addTask("High priority task", 5);

        expect(task.priority).toBe(5);
    });

    test("should throw error for priority below allowed range", () => {
        expect(() => manager.addTask("Invalid task", 0))
            .toThrow("Priority must be an integer from 1 to 5");
    });

    test("should return task by id", () => {
        const task = manager.addTask("Find me");

        expect(manager.getTaskById(task.id)).toEqual(task);
    });

    test("should update task priority", () => {
        const task = manager.addTask("Update me", 2);
        const updated = manager.updatePriority(task.id, 4);

        expect(updated.priority).toBe(4);
    });

    test("should mark task as completed", () => {
        const task = manager.addTask("Finish project");
        const updated = manager.completeTask(task.id);

        expect(updated.completed).toBe(true);
    });

    test("should delete task", () => {
        const task = manager.addTask("Remove me");
        const deleted = manager.deleteTask(task.id);

        expect(deleted).toBe(true);
        expect(manager.getAllTasks()).toHaveLength(0);
    });
});
