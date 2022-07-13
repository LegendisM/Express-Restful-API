const app = require('../app');
const request = require('supertest')(app);

const exampleData = {
    username: 'test',
    email: 'test@example.com',
    password: 'test1234'
}

describe("User Service", () => {

    describe("Login / Register", async () => {

        await it("Register Successfully", async () => {

            let response = await request.post('/api/user/register')
                .set('token', process.env.TOKEN_SECRET)
                .send({ username: exampleData.username, email: exampleData.email, password: exampleData.password });

            expect(response.statusCode).toBe(201);

        });

        await it("Login Successfully", async () => {

            let response = await request.post('/api/user/login')
                .set("token", process.env.TOKEN_SECRET)
                .send({ username: exampleData.username, password: exampleData.password });

            expect(response.statusCode).toBe(200);

        });

    });

});