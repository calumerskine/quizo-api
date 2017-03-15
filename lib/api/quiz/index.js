import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Quiz, { schema } from './model'

const router = new Router()
const { title, questions } = schema.tree

/**
 * @api {post} /quizzes Create quiz
 * @apiName CreateQuiz
 * @apiGroup Quiz
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Quiz's title.
 * @apiParam questions Quiz's questions.
 * @apiSuccess {Object} quiz Quiz's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Quiz not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ title, questions }),
  create)

/**
 * @api {get} /quizzes Retrieve quizzes
 * @apiName RetrieveQuizzes
 * @apiGroup Quiz
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} quizzes List of quizzes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /quizzes/:id Retrieve quiz
 * @apiName RetrieveQuiz
 * @apiGroup Quiz
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} quiz Quiz's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Quiz not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /quizzes/:id Update quiz
 * @apiName UpdateQuiz
 * @apiGroup Quiz
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam title Quiz's title.
 * @apiParam questions Quiz's questions.
 * @apiSuccess {Object} quiz Quiz's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Quiz not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ title, questions }),
  update)

/**
 * @api {delete} /quizzes/:id Delete quiz
 * @apiName DeleteQuiz
 * @apiGroup Quiz
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Quiz not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
