const request = require('supertest')
const app = require('./app')

test('should create new user', async () => {
  await request(app).post('/api/auth/register')
    .send({
      email: 'some@mail.com',
      password: 'qwerty12#',
      fullName: 'Some Doe'
    }).expect(500)
}, 30000)