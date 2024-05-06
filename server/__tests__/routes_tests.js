const {expect, test} = require("@jest/globals");
const request = require('supertest');
const express = require('express');
const router = require('../routes');
const otpService = require('../services/otp');

const app = express();
app.use(express.json());
app.use('/', router);

jest.mock('../services/otp');

beforeEach(() => {
  otpService.getOtp.mockResolvedValue({ code: '123456' });
  otpService.generateOtp.mockResolvedValue({ userEmail: "test@bla.com"});
});

afterEach(() => {
  jest.clearAllMocks();
});

test('register returns 200 on success', async () => {
  const response = await request(app).post('/register').send({ email: 'test@bla.com', password: 'password' });
  expect(response.statusCode).toBe(200);
});

test('register returns 400 for already registered email', async () => {
  const response = await request(app).post('/register').send({ email: 'test@bla.com', password: 'password' });
  expect(response.statusCode).toBe(400);  
});

test('login returns 200 on success', async () => {
  const response = await request(app).post('/api/verify-login').send({ email: 'test@bla.com', password: 'password' });
  expect(response.statusCode).toBe(200);
});

test('login returns 401 for invalid password', async () => {
  const response = await request(app).post('/api/verify-login').send({ email: 'test@bla.com', password: 'invalid' });
  expect(response.statusCode).toBe(401);
});

test('login returns 404 for Not Found Email', async () => {
  const response = await request(app).post('/api/verify-login').send({ email: 'noemail@gmail.com', password: 'password' });
  expect(response.statusCode).toBe(404);
});

test('sendOtp returns 404 for Not Found Email', async () => {
  const response = await request(app).post('/api/send-otp').send({ email: 'noemail@gmail.com' });
  expect(response.statusCode).toBe(404);
});

test('sendOtp returns 200 on success', async () => {
  const response = await request(app).post('/api/send-otp').send({ email: 'test@bla.com' });
  expect(response.statusCode).toBe(200);

});

test('verifyOtp returns 400 for invalid otp', async () => {
  const response = await request(app).post('/api/verify-otp').send({ email:'test@bla.com',otp: 'invalid' });
  expect(response.statusCode).toBe(400);
});

test('verifyOtp returns 200 on success', async () => {
  const response = await request(app).post('/api/verify-otp').send({email:'test@bla.com', otp: '123456' });
  expect(response.statusCode).toBe(200);
});

test('updatePassword returns 200 on success', async () => {
  const response = await request(app).post('/update-password').send({ email: 'test@bla.com', password: 'newPassword' });
  expect(response.statusCode).toBe(200);
});

