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
    if (params.Payload) {
      params.InvokeArgs = fromUtf8(params.Payload)
      delete params.Payload
    }

    const command = new InvokeCommand(params)
    this.client.send(command).then(response => {
      response.Payload = toUtf8(response.Payload)
      callback(null, response)
    }).catch(err => {
      callback(err)
    })
  }
}

module.exports = Lambda
