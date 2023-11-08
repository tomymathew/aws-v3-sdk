const { SQSClient, ReceiveMessageCommand, DeleteMessageCommand, SendMessageCommand } = require('@aws-sdk/client-sqs')

const { Agent } = require('https')
const { NodeHttpHandler } = require('@aws-sdk/node-http-handler')

const sqsClient = new SQSClient({
  requestHandler: new NodeHttpHandler({
    httpsAgent: new Agent({ keepAlive: false })
  })
})
class SQS {
  async sendMessage (params, callback) {
    const command = new SendMessageCommand(params)
    const response = await sqsClient.send(command)
    return response
  }

  async receiveMessage (params, callback) {
    const command = new ReceiveMessageCommand(params)
    const response = await sqsClient.send(command)
    return response
  }

  async deleteMessage (params, callback) {
    const command = new DeleteMessageCommand(params)
    const response = await sqsClient.send(command)
    return response
  }
}

module.exports = SQS
