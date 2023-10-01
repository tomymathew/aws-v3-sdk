const { STSClient, AssumeRoleCommand } = require('@aws-sdk/client-sts')

class STS {
  constructor (AWS_REGION) {
    this.client = new STSClient({ region: AWS_REGION })
  }

  assumeRole (params, callback) {
    console.log('params', params)
    const command = new AssumeRoleCommand(params)
    this.client.send(command).then(role => {
      return callback(null, role)
    }).catch(err => {
      return callback(err)
    })
  }
}

module.exports = STS
