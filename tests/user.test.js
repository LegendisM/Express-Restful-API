const app = require('../app');
const request = require('supertest')(app);

describe("User Service", () => {

    describe("Login / Register", () => {

        it("Login Successfully", async () => {

            let response = await request.post('/api/user/login')
                .set("token", process.env.TOKEN_SECRET)
                .send({ username: "Test", password: "abcd1234" });

            expect(response.statusCode).toBe(200);
            expect(response.body).toBe({ state: true });

        });

        it("Register Successfully", async () => {

            let response = await request.post('/api/user/register')
                .set('token', process.env.TOKEN_SECRET)
                .send({ username: 'LegendisM', email: 'makenkap@gmail.com', password: 'abcd1234' });

            expect(response.statusCode).toBe(201);
            expect(response.body).toBe({ state: true });
        });

    });

});