import * as trivia from '.'

it('retrieves a token', async () => {
  expect(await trivia.getToken()).toBeTruthy()
})

it('resets a token', async () => {
  var token = 'CE19086AB112552FBCA'
  expect(await trivia.resetToken(token)).toNotEqual(token)
})

describe('questions', () => {
  it('retrieves question page', async () => {
    var questions = await trivia.getPage()
    expect(questions.length).toEqual(10);
  })
})
