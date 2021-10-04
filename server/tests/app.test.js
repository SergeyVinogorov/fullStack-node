const app = require('../app')
const request = require('supertest')
const mongoose = require('mongoose')
const mongoDB = 'mongodb://mongo:27017/my_test'
const User = require('../models/User')
mongoose.connect(mongoDB)

describe('App test', () => {
  it('has a module', function () {
    expect(app).toBeDefined()
  });
  let server
  let token
  let userId

  beforeAll(() => {
    server = app.listen(3001)
  })

  afterAll(async () => {
    await User.deleteMany({})
    await mongoose.connection.close()
    server.close()
  })

  describe('user create test', () => {
    it('should create user', async () => {
      await request(server).post('/api/auth/register')
        .send({
          email: 'some@mail.com',
          password: 'qwerty12#',
          fullName: 'Some Doe'
        })
        .expect(201)
    })
  })
  describe('user login test',  () => {
    it( 'should user login',async () => {
      await request(server).post('/api/auth/login')
        .send({
          email: 'some@mail.com',
          password: 'qwerty12#',
        })
        .then((response) => {
          expect(200)
          token = response.body.token
          userId = response.body.userId
        })
    })
    it('should get user from db', async () => {
      await request(server).post('/api/user')
        .set('Authorization', 'Bearer ' + token)
        .send({
          userId: userId,
        })
        .then((response) => {
          expect(response.body.fullName).toContain('Some Doe')
        })
    })
  })
  describe('user created test', () => {
    it('should already exist user', async () => {
      await request(server).post('/api/auth/register')
        .send({
          email: 'some@mail.com',
          password: 'qwerty12#',
          fullName: 'Some Doe'
        })
        .then((response) => {
          expect(response.statusCode).toBe(500)
          expect(response.body.message).toContain('This user already exists')
        })
    })
  })
  describe('registration validation test', () => {
    it('should be failed validation', async () => {
      await request(server).post('/api/auth/register')
        .send({
          email: 'some@mail.com',
          password: 'qwerty12d',
          fullName: 'Some Doe'
        })
        .then((response) => {
          expect(response.statusCode).toBe(500)
          expect(response.body.message).toContain('Validation failed')
        })
    })
  })
})