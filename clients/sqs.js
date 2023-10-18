const { SQSClient, ReceiveMessageCommand, DeleteMessageCommand, SendMessageCommand } = require("@aws-sdk/client-sqs");
const snsClient = new SQSClient();

class SQS {
 async sendMessage (params, callback) {
      const command = new SendMessageCommand(params)
      const response =  await snsClient.send(command)
      return response
  }

  async receiveMessage (params, callback) {
    const command = new ReceiveMessageCommand(params)
    const response = await  snsClient.send(command)
    return response
}


 async deleteMessage (params, callback) {
      const command = new DeleteMessageCommand(params)
      const response =  await snsClient.send(command)
      return response
  }
}

module.exports = SQS
