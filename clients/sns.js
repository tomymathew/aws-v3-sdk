const { SNSClient, PublishCommand } = require('@aws-sdk/client-sns')

const { Agent } = require('https')
const { NodeHttpHandler } = require('@aws-sdk/node-http-handler')

const snsClient = new SNSClient({
  requestHandler: new NodeHttpHandler({
    httpsAgent: new Agent({ keepAlive: false })
  })
})

class SNS {
  publish (params, callback) {
    return new Promise((resolve, reject) => {
      const publishCommand = new PublishCommand(params)
      snsClient.send(publishCommand).then(response => {
        resolve(response)
      }).catch(err => {
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

module.exports = SNS
