import { Quiz } from '.'
import { User } from '../user'

let user, quiz

beforeEach(async () => {
  user = await User.create({ email: 'a@a.com', password: '123456' })
  quiz = await Quiz.create({ author: user, title: 'test', questions: ['test'] })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = quiz.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(quiz.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.title).toBe(quiz.title)
    expect(view.questions).toBe(quiz.questions)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = quiz.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(quiz.id)
    expect(typeof view.author).toBe('object')
    expect(view.author.id).toBe(user.id)
    expect(view.title).toBe(quiz.title)
    expect(view.questions).toBe(quiz.questions)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
