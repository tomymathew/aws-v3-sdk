const { LambdaClient, InvokeCommand, InvokeAsyncCommand } = require('@aws-sdk/client-lambda')
const { toUtf8, fromUtf8 } = require('@aws-sdk/util-utf8-node')

class Lambda {
  async invoke (params, callback) {
    const client = new LambdaClient()
    const command = new InvokeCommand(params)
    client.send(command).then(response => {
      response.Payload = toUtf8(response.Payload)
      callback(null, response)
    }).catch(err => {
      callback(err)
    })
  }
}

module.exports = Lambda
