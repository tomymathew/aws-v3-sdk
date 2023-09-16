const { LambdaClient, InvokeCommand, InvokeAsyncCommand } = require('@aws-sdk/client-lambda')
const { toUtf8, fromUtf8 } = require('@aws-sdk/util-utf8-node')

class Lambda {
  async invoke (params, callback) {
    const client = new LambdaClient()
    const command = new InvokeCommand(params)
    const response = await client.send(command)
    response.Payload = toUtf8(response.Payload)
    delete response.$metadata
    callback(null, response)
  }
}

module.exports = Lambda
