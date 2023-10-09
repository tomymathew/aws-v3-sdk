const { Client, Connection } = require('@opensearch-project/opensearch')
const { defaultProvider } = require('@aws-sdk/credential-provider-node')
const aws4 = require('aws4')

const { REGION, ELASTICSEARCH_ENDPOINT } = process.env
const host = 'https://' + ELASTICSEARCH_ENDPOINT

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

exports.sendGetRequest = async (index, query, from, size, sort, _source) => {
  const client = await getClient()
  return new Promise((resolve, reject) => {
    let body = { query }
    if (sort) {
      body = { query, sort }
    }
    client.search({
      index,
      from,
      size,
      _source,
      body
    }).then(response => {
      const data = response.body.hits.hits
      const totalCount = response.body.hits.total
      const mappedData = data.map(item => {
        return item._source
      })
      resolve({ items: mappedData, data: mappedData, totalCount })
    }).catch(e => {
      resolve({ items: [], data: [], totalCount: 0 })
    })
  })
}
