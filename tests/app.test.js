const request = require("supertest");
const { createApp } = require("../src/app");

describe("Task Manager functional tests", () => {
    let app;

    beforeEach(() => {
        app = createApp();
    });

    test("POST /tasks should create a task", async () => {
        const response = await request(app)
            .post("/tasks")
            .send({
                title: "Write functional tests",
                priority: 2
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toMatchObject({
            id: 1,
            title: "Write functional tests",
            completed: false,
            priority: 2
        });
    });

    test("create task -> complete task -> get task list", async () => {
        const createResponse = await request(app)
            .post("/tasks")
            .send({
                title: "Deploy application",
                priority: 4
            });

        const id = createResponse.body.id;

        const completeResponse = await request(app)
            .patch(`/tasks/${id}/complete`);

        expect(completeResponse.statusCode).toBe(200);
        expect(completeResponse.body.completed).toBe(true);

        const listResponse = await request(app)
            .get("/tasks");

        expect(listResponse.statusCode).toBe(200);
        expect(listResponse.body).toHaveLength(1);
        expect(listResponse.body[0]).toMatchObject({
            id,
            title: "Deploy application",
            completed: true,
            priority: 4
        });
    });
});


