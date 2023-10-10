const { LambdaClient, InvokeCommand, InvokeAsyncCommand } = require('@aws-sdk/client-lambda')
const { toUtf8, fromUtf8 } = require('@aws-sdk/util-utf8-node')

class Lambda {
  constructor (region, session) {
    if (region && session) {
      this.client = new LambdaClient({ region, credentials: session })
    } else {
      this.client = new LambdaClient()
    }
  }

  async invoke (params, callback) {
    const command = new InvokeCommand(params)
    this.client.send(command).then(response => {
      response.Payload = toUtf8(response.Payload)
      callback(null, response)
    }).catch(err => {
      callback(err)
    })
  }

  invokeAsync (params, callback) {
    return new Promise((resolve, reject) => {
      const command = new InvokeCommand(params)
      this.client.send(command).then(response => {
        response.Payload = toUtf8(response.Payload)
        resolve(response)
      }).catch(err => {
        resolve(err)
      })
    }).then(result => {
      if (callback && typeof callback === 'function') {
        callback(null, result)
      }
      return result
    }).catch(error => {
      if (callback && typeof callback === 'function') {
        callback(error, null)
      }
      return Promise.reject(error)
    })
  }
}

module.exports = Lambda
