import request from 'supertest-as-promised'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Quiz } from '.'

const app = () => express(routes)

let userSession, anotherSession, quiz

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const anotherUser = await User.create({ email: 'b@b.com', password: '123456' })
  userSession = signSync(user.id)
  anotherSession = signSync(anotherUser.id)
  quiz = await Quiz.create({ author: user })
})

test('POST /quizzes 201 (user)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: userSession, title: 'test', questions: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.questions).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('POST /quizzes 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /quizzes 200 (user)', async () => {
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
  expect(typeof body[0].author).toEqual('object')
})

test('GET /quizzes 401', async () => {
  const { status } = await request(app())
    .get('/')
  expect(status).toBe(401)
})

test('GET /quizzes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`/${quiz.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(quiz.id)
  expect(typeof body.author).toEqual('object')
})

test('GET /quizzes/:id 401', async () => {
  const { status } = await request(app())
    .get(`/${quiz.id}`)
  expect(status).toBe(401)
})

test('GET /quizzes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: userSession })
  expect(status).toBe(404)
})

test('PUT /quizzes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`/${quiz.id}`)
    .send({ access_token: userSession, title: 'test', questions: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(quiz.id)
  expect(body.title).toEqual('test')
  expect(body.questions).toEqual('test')
  expect(typeof body.author).toEqual('object')
})

test('PUT /quizzes/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`/${quiz.id}`)
    .send({ access_token: anotherSession, title: 'test', questions: 'test' })
  expect(status).toBe(401)
})

test('PUT /quizzes/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${quiz.id}`)
  expect(status).toBe(401)
})

test('PUT /quizzes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: anotherSession, title: 'test', questions: 'test' })
  expect(status).toBe(404)
})

test('DELETE /quizzes/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`/${quiz.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(204)
})

test('DELETE /quizzes/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`/${quiz.id}`)
    .send({ access_token: anotherSession })
  expect(status).toBe(401)
})

test('DELETE /quizzes/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${quiz.id}`)
  expect(status).toBe(401)
})

test('DELETE /quizzes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: anotherSession })
  expect(status).toBe(404)
})
