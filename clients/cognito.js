const { CognitoIdentityProviderClient, ListUsersCommand, AdminCreateUserCommand, AdminEnableUserCommand, AdminDisableUserCommand, AdminSetUserMFAPreferenceCommand, AdminUserGlobalSignOutCommand, AdminDeleteUserCommand } = require('@aws-sdk/client-cognito-identity-provider')

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

  async adminCreateUser (params, callback) {
    const command = new AdminCreateUserCommand(params);
    this.client.send(command).then(data => {
      callback(null, data)
    }).catch(err => {
      callback(err)
    })
  }

  async adminSetUserMFAPreference (params, callback) {
    const command = new AdminSetUserMFAPreferenceCommand(params);
    this.client.send(command).then(data => {
      callback(null, data)
    }).catch(err => {
      callback(err)
    })
  }

  async adminDeleteUser (params, callback) {
    const command = new AdminDeleteUserCommand(params);
    this.client.send(command).then(data => {
      callback(null, data)
    }).catch(err => {
      callback(err)
    })
  }

  async adminEnableUser (params, callback) {
    const command = new AdminEnableUserCommand(params);
    this.client.send(command).then(data => {
      callback(null, data)
    }).catch(err => {
      callback(err)
    })
  }


  async adminDisableUser (params, callback) {
    const command = new AdminDisableUserCommand(params);
    this.client.send(command).then(data => {
      callback(null, data)
    }).catch(err => {
      callback(err)
    })
  }

  async adminUserGlobalSignOut (params, callback) {
    const command = new AdminUserGlobalSignOutCommand(params);
    this.client.send(command).then(data => {
      callback(null, data)
    }).catch(err => {
      callback(err)
    })
  }

}

module.exports = CognitoIdentityServiceProvider
