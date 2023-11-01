const { Client, Connection } = require('@opensearch-project/opensearch')
const { defaultProvider } = require('@aws-sdk/credential-provider-node')
const aws4 = require('aws4')
const logger = require('../utils/logger')

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
      logger.debug(response, { response })
      const data = response.body.hits.hits
      const totalCount = response.body.hits.total
      const mappedData = data.map(item => {
        return item._source
      })
      resolve({ items: mappedData, data: mappedData, totalCount })
    }).catch(err => {
      logger.error('ES sendGetRequest Error', { err })
      reject(err)
    })
  })
}

exports.sendGetRequestCallback = async (index, query, from, size, sort, callback) => {
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
      body
    }).then(response => {
      const data = response.body.hits.hits
      const totalCount = response.body.hits.total
      const mappedData = data.map(item => {
        return item._source
      })
      callback(null, { items: mappedData, data: mappedData, totalCount })
    }).catch(e => {
      logger.error('ES Error', { e })
      reject(e)
    })
  })
}

exports.getCount = async (index, query) => {
  const client = await getClient()
  return new Promise((resolve, reject) => {
    client.count({
      index,
      body: { query }
    }).then(response => {
      const data = response.body
      resolve({ data })
    }).catch(e => {
      logger.error('ES Error', { e })
      reject(e)
    })
  })
}

exports.multiSearch = async (query) => {
  const client = await getClient()
  return new Promise((resolve, reject) => {
    const body = query
    client.msearch({
      body
    }).then(response => {
      resolve(response)
    }).catch(e => {
      logger.error('ES sendGetRequest Error', { e })
      reject(e)
    })
  })
}
