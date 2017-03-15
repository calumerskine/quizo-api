import _ from 'lodash'
import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Quiz } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Quiz.create({ ...body, author: user })
    .then((quiz) => quiz.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Quiz.find(query, select, cursor)
    .populate('author')
    .then((quizzes) => quizzes.map((quiz) => quiz.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Quiz.findById(params.id)
    .populate('author')
    .then(notFound(res))
    .then((quiz) => quiz ? quiz.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Quiz.findById(params.id)
    .populate('author')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((quiz) => quiz ? _.merge(quiz, body).save() : null)
    .then((quiz) => quiz ? quiz.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Quiz.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'author'))
    .then((quiz) => quiz ? quiz.remove() : null)
    .then(success(res, 204))
    .catch(next)
