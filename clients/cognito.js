const { CognitoIdentityProviderClient, ListUsersCommand } = require('@aws-sdk/client-cognito-identity-provider')

class CognitoIdentityServiceProvider {
  constructor (region) {
    this.client = new CognitoIdentityProviderClient({ region }) // Replace with your desired region
  }

  async listUsers (params, callback) {
    const command = new ListUsersCommand(params)
    this.client.send(command).then(data => {
      callback(null, data)
    }).catch(err => {
      callback(err)
    })
  }
}

module.exports = CognitoIdentityServiceProvider
