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
    const body = {}
    if (query) {
      body.query = query
    }
    if (sort) {
      body.sort = sort
    }
    const options = {
      index,
      body
    }
    if (from) {
      options.from = from
    }
    if (size) {
      options.size = size
    }
    if (_source) {
      options._source = size
    }
    client.search(options).then(response => {
      logger.debug(response, { response })
      const data = response.body.hits.hits
      const totalCount = response.body.hits.total
      const mappedData = data.map(item => {
        return item._source
      })
      resolve({ items: mappedData, data: mappedData, totalCount })
    }).catch(err => {
      if (err) {
        logger.error('ES sendGetRequest Error', { err })
        reject(err)
      } else {
        resolve({ items: [], data: [], totalCount: 0 })
      }
    })
  })
}

exports.sendGetRequestCallback = async (index, query, from, size, sort, callback) => {
  const client = await getClient()
  return new Promise((resolve, reject) => {
    const body = {}
    if (query) {
      body.query = query
    }
    if (sort) {
      body.sort = sort
    }
    const options = {
      index,
      body
    }
    if (from) {
      options.from = from
    }
    if (size) {
      options.size = size
    }
    client.search(options).then(response => {
      const data = response.body.hits.hits
      const totalCount = response.body.hits.total
      const mappedData = data.map(item => {
        return item._source
      })
      callback(null, { items: mappedData, data: mappedData, totalCount })
    }).catch(err => {
      if (err) {
        logger.error('ES Error', { err })
        reject(err)
      } else {
        resolve({ items: [], data: [], totalCount: 0 })
      }
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
    }).catch(err => {
      if (err) {
        logger.error('ES Error', { err })
        reject(err)
      } else {
        resolve({ items: [], data: [], totalCount: 0 })
      }
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
    }).catch(err => {
      if (err) {
        logger.error('ES Error', { err })
        reject(err)
      } else {
        resolve({ items: [], data: [], totalCount: 0 })
      }
    })
  })
}
