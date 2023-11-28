const { Client, Connection } = require('@opensearch-project/opensearch')
const { defaultProvider } = require('@aws-sdk/credential-provider-node')
const aws4 = require('aws4')
const logger = require('../utils/logger')

const { REGION, ELASTICSEARCH_AUDITS_ENDPOINT } = process.env

const host = 'https://' + ELASTICSEARCH_AUDITS_ENDPOINT

const createAwsConnector = (credentials, region) => {
  class AmazonConnection extends Connection {
    buildRequestObject (params) {
      const request = super.buildRequestObject(params)
      request.service = 'es'
      request.region = region
      request.headers = request.headers || {}
      request.headers.host = request.hostname
      return aws4.sign(request, credentials)
    }
  }
  return {
    Connection: AmazonConnection
  }
}

const getClient = async () => {
  const credentials = await defaultProvider()()
  const cred = createAwsConnector(credentials, REGION)
  return new Client({
    ...cred,
    node: host
  })
}

exports.sendAuditsReqToES = async (method, index, type, id, data) => {
  try {
    const client = await getClient()
    if (method === 'DELETE') {
      const response = await client.delete({
        index,
        type,
        id
      })
      return response.body
    } else {
      const response = await client.index({
        id,
        index,
        type,
        body: data,
        refresh: false

      })
      return response.body
    }
  } catch (error) {
    logger.error('ES Error', { error })
    return error
  }
}
