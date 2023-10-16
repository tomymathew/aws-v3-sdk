const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");
const snsClient = new SNSClient({});

class SNS {
  publish (params, callback) {
    return new Promise((resolve, reject) => {
      let publishCommand = new PublishCommand(params)
      const response =  snsClient.send(publishCommand).then(response=>{
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

module.exports = SNS
