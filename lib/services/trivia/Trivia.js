import _ from 'lodash'
import request from 'request-promise'

export class Trivia {
  constructor(props) {
    this.token = null
    this.req = {
      uri: props.uri || 'http://opentdb.org/api.php',
      json: true
    }
  }

  getToken() {
    request(_.assign({ qs: { command: 'request', token: this.token } }, this.req))
      .then(res => { this.token = res.token })
  }

  resetToken(token) {
    request(_.assign({ qs: { command: 'reset', token } }, this.req))
      .then(res => { this.token = res.token })
  }

  getPage(params) {
    if (!this.token) {
      this.getToken()
    }

    do { this.getToken() } while (!this.token)

    var qs = _.defaultsDeep({
      amount: 10,
      type: 'multiChoice',
      token: this.token
    }, params)

    request(_.assign({ qs }, this.req))
      .then(res => res.questions)
  }
}