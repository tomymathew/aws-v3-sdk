const { SQSClient, ReceiveMessageCommand, DeleteMessageCommand, SendMessageCommand } = require("@aws-sdk/client-sqs");
const snsClient = new SQSClient();

class SQS {
  sendMessage (params, callback) {
    return new Promise((resolve, reject) => {
      const command = new SendMessageCommand(params)
      const response =  snsClient.send(command).then(response=>{
        resolve(response)
      }).catch(err=>{
        reject(err)
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

  receiveMessage (params, callback) {
    return new Promise((resolve, reject) => {
      const command = new ReceiveMessageCommand(params)
      const response =  snsClient.send(command).then(response=>{
        resolve(response)
      }).catch(err=>{
        reject(err)
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

  deleteMessage (params, callback) {
    return new Promise((resolve, reject) => {
      const command = new DeleteMessageCommand(params)
      const response =  snsClient.send(command).then(response=>{
        resolve(response)
      }).catch(err=>{
        reject(err)
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

module.exports = SQS
