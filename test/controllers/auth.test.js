// import * as chai from "chai";
// import { default as chaiHttp, request } from "chai-http";
// import app from "../../index.js";

// chai.use(chaiHttp);
// const { expect } = chai;

// describe("auth", function () {

//     describe("signup", function () {

//         it("should return 'Missing required fields' when some fields are not passed", function (done) {
//             const res = request.execute(app)
//                 .post('/api/auth/signup')
//                 .send({
//                     "email": "sameer@gmail.com",
//                     "password": "pass",
//                     "username": "sameer",
//                     //"first_name": "sameer"
//                 })
//                 .end((err, res) => {
//                     expect(res).to.have.status(400);
//                     expect(res.body.message).to.equal("Missing required fields");
//                     done();
//                 })
//         });

//         it("should return token and message when all required fields are passed", function (done) {
//             const res = request.execute(app)
//                 .post('/api/auth/signup')
//                 .send({
//                     "email": "sameer@gmail.com",
//                     "password": "pass",
//                     "username": "sameer",
//                     "first_name": "sameer"
//                 })
//                 .end((err, res) => {
//                     expect(res).to.have.status(201);
//                     expect(res.body).to.have.property("message").that.equals("User created successfully");
//                     expect(res.body).to.have.property("token")
//                     done();
//                 })
//         })

//     });

//     describe("login", function () {

//         it("should return 'Email and password required' when some fields are not passed", function (done) {
//             const res = request.execute(app)
//                 .post('/api/auth/login')
//                 .send({
//                     // email is missing
//                     password: "pass"
//                 })
//                 .end((err, res) => {
//                     expect(res).to.have.status(400);
//                     expect(res.body.message).to.equal("Email and password required");
//                     done();
//                 });
//         });

//         it("should return 'Invalid credentials' when wrong password is passed", function (done) {
//             const res = request.execute(app)
//                 .post('/api/auth/login')
//                 .send({
//                     email: "sameer@gmail.com",
//                     password: "wrongpassword"
//                 })
//                 .end((err, res) => {
//                     expect(res).to.have.status(401);
//                     expect(res.body.message).to.equal("Invalid credentials");
//                     done();
//                 });
//         });

//         it("should return token and message when login is successful", function (done) {
//             const res = request.execute(app)
//                 .post('/api/auth/login')
//                 .send({
//                     email: "sameer@gmail.com",
//                     password: "pass"
//                 })
//                 .end((err, res) => {
//                     expect(res).to.have.status(200);
//                     expect(res.body).to.have.property("message", "Login Successful");
//                     expect(res.body).to.have.property("token").that.is.a("string");
//                     done();
//                 });
//         });

//     });

// });


import * as chai from "chai";
import { default as chaiHttp, request } from "chai-http";
import sinon from "sinon";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import app from "../../index.js";
import { User } from "../../models/associations.js";

chai.use(chaiHttp);
const { expect } = chai;

describe("auth", function () {
    let findOneStub, createStub, hashStub, compareStub, jwtStub;

    afterEach(() => {
        sinon.restore(); 
    });

    describe("signup", function () {
        it("should return 'Missing required fields' when some fields are not passed", function (done) {
            request.execute(app)
                .post('/api/auth/signup')
                .send({
                    email: "sameer@gmail.com",
                    password: "pass",
                    username: "sameer"
                    // first_name missing
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.message).to.equal("Missing required fields");
                    done();
                });
        });

        it("should return token and message when all required fields are passed", function (done) {
            findOneStub = sinon.stub(User, 'findOne').resolves(null); 
            hashStub = sinon.stub(bcrypt, 'hash').resolves("hashedpass");
            createStub = sinon.stub(User, 'create').resolves({
                id: 1,
                username: "sameer",
                email: "sameer@gmail.com"
            });
            jwtStub = sinon.stub(jwt, 'sign').returns("fake-jwt-token");

            request.execute(app)
                .post('/api/auth/signup')
                .send({
                    email: "sameer@gmail.com",
                    password: "pass",
                    username: "sameer",
                    first_name: "sameer"
                })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property("message", "User created successfully");
                    expect(res.body).to.have.property("token", "fake-jwt-token");
                    done();
                });
        });
    });

    describe("login", function () {
        it("should return 'Email and password required' when some fields are not passed", function (done) {
            request.execute(app)
                .post('/api/auth/login')
                .send({
                    // email missing
                    password: "pass" 
                })
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body.message).to.equal("Email and password required");
                    done();
                });
        });

        it("should return 'Invalid credentials' when wrong password is passed", function (done) {
            findOneStub = sinon.stub(User, 'findOne').resolves({
                password: "hashedpass"
            });
            compareStub = sinon.stub(bcrypt, 'compare').resolves(false); 

            request.execute(app)
                .post('/api/auth/login')
                .send({
                    email: "sameer@gmail.com",
                    password: "wrongpassword"
                })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body.message).to.equal("Invalid credentials");
                    done();
                });
        });

        it("should return token and message when login is successful", function (done) {
            findOneStub = sinon.stub(User, 'findOne').resolves({
                id: 1,
                username: "sameer",
                password: "hashedpass"
            });
            compareStub = sinon.stub(bcrypt, 'compare').resolves(true);
            jwtStub = sinon.stub(jwt, 'sign').returns("fake-login-token");

            request.execute(app)
                .post('/api/auth/login')
                .send({
                    email: "sameer@gmail.com",
                    password: "pass"
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property("message", "Login Successful");
                    expect(res.body).to.have.property("token", "fake-login-token");
                    done();
                });
        });
    });
});
