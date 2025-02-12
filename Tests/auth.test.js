// //auth.test.js
//
// const request = require("supertest");
// const app = require("../server");
// const pool = require("../database/connection");
//
// let server;
// let testEmail = "test@example.com";
// let testPassword = "password123";
//
// beforeAll(async () => {
//     server = app.listen(4001);
//
//     await new Promise((resolve) => setTimeout(resolve, 500));
//
//     try {
//         await pool.query("DELETE FROM users WHERE email=$1", [testEmail]);
//     } catch (error) {
//         console.error("Database cleanup error:", error);
//     }
// });
//
// afterAll(async () => {
//     await pool.end();
//     server.close();
// });
//
//
//      // Signup Testing
//
// describe("Authentication API", () => {
//     it("should sign up a new user", async () => {
//         const res = await request(app).post("/api/signup").send({
//             name: "Test User",
//             email: testEmail,
//             password: testPassword
//         });
//         expect(res.statusCode).toBe(201);
//         expect(res.body).toHaveProperty("message");
//     });
//
//     // Login Testing
//
//     it("should login a user and return a token", async () => {
//         const res = await request(app).post("/api/login").send({
//             email: testEmail,
//             password: testPassword
//         });
//
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty("token");
//     });
// });