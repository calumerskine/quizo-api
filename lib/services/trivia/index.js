import _ from 'lodash'
import request from 'request-promise'

export const getToken() {
  request({
    uri,
    json: true,
    qs: { command: 'request' }
  })
    .then(res => res.token)
}

export const resetToken(token) {
  request({
    uri,
    json: true,
    qs: { command: 'reset', token }
  })
    .then(res => res.token)
}

export const getPage(params) {
  request({
    uri,
    json: true,
    qs: { ...params }
  }).then(res => res.questions)
}