const { getDefaultRoleAssumerWithWebIdentity } = require('@aws-sdk/client-sts')
const { defaultProvider } = require('@aws-sdk/credential-provider-node')

class EnvironmentCredentials {
  constructor (region) {
    this.region = region
    return this.getCredential.bind(this)()
  }

  async getCredential () {
    const cred = defaultProvider({
      roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity({
        region: this.region
      })
    })

    return (await cred())
  }
}

module.exports = EnvironmentCredentials
