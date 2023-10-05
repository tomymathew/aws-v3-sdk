const { STSClient, AssumeRoleCommand } = require('@aws-sdk/client-sts')

class STS {
  constructor ({ region }) {
    this.client = new STSClient({ region })
  }

  assumeRole (params, callback) {
    const command = new AssumeRoleCommand(params)
    this.client.send(command).then(role => {
      return callback(null, role)
    }).catch(err => {
      return callback(err)
    })
  }
}

module.exports = STS
