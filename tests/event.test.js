const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
require("dotenv").config();

beforeAll(async () => {
    jest.setTimeout(20000); 
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

test("Basic test", () => {
    expect(1 + 1).toBe(2);
});

test("Create an event", async () => {
    const response = await request(app).post("/events").send({
        name: "Test Meeting",
        description: "This is a test",
        date: new Date(),
        category: "Meeting"
    });
    expect(response.status).toBe(201);
});
