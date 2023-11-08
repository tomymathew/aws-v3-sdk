const { DynamoDB, DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocument, DynamoDBDocumentClient, GetCommand, BatchWriteCommand, PutCommand, QueryCommand, ScanCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb')

const { Agent } = require('https')
const { NodeHttpHandler } = require('@aws-sdk/node-http-handler')

const ddb = new DynamoDBClient({
  requestHandler: new NodeHttpHandler({
    httpsAgent: new Agent({ keepAlive: false })
  })
})

const documentClient = DynamoDBDocumentClient.from(ddb)
class DocumentClient {
  get (params, callback) {
    const getCommand = new GetCommand(params)
    documentClient.send(getCommand, (err, response) => {
      if (err || !response) {
        return callback(err)
      }
      if (response.Item) {
        return callback(null, response)
      } else if (!response.Item) {
        return callback(null, {})
      }
    })
  }

  query (params, callback) {
    const getCommand = new QueryCommand(params)
    documentClient.send(getCommand, (err, response) => {
      if (err || !response) {
        return callback(err)
      }
      return callback(null, response)
    })
  }

  scan (params, callback) {
    const getCommand = new ScanCommand(params)
    documentClient.send(getCommand, (err, response) => {
      if (err || !response) {
        return callback(err)
      }
      if (response.Items) {
        return callback(null, response)
      } else if (!response.Items) {
        return callback(null)
      }
    })
  }

  put (params, callback) {
    let item = params.Item
    try {
      item = Object.fromEntries(Object.entries(item).filter(([key, value]) => value !== undefined))
    } catch (error) {

    }
    params.Item = item
    const putCommand = new PutCommand(params)
    documentClient.send(putCommand, (err, response) => {
      if (err || !response) {
        return callback(err)
      }
      return callback(null, response)
    })
  }

  delete (params, callback) {
    const docClient = DynamoDBDocument.from(ddb)
    docClient.delete(params, (err, response) => {
      if (err) {
        return callback(err)
      } else {
        return callback(null, response)
      }
    })
  }

  deletev3 (params, callback) {
    const putCommand = new DeleteCommand(params)
    documentClient.send(putCommand, (err, response) => {
      if (err) {
        return callback(err)
      }
      return callback(null, response)
    })
  }

  update (params, callback) {
    const options = {
      marshallOptions: {
        removeUndefinedValues: true
      }
    }
    const docClient = DynamoDBDocument.from(ddb, options)
    docClient.update(params, (err, response) => {
      if (err) {
        return callback(err)
      } else {
        return callback(null, response)
      }
    })
  }

  batchWrite (params, callback) {
    const command = new BatchWriteCommand(params)
    documentClient.send(command, (err, response) => {
      if (err || !response) {
        return callback(err)
      }
      if (response) {
        return callback(null, response)
      }
    })
  }

  batchGet (params, callback) {
    const docClient = DynamoDBDocument.from(ddb)

    docClient.batchGet(params, function (err, data) {
      if (err) callback(err)
      else {
        callback(null, data)
      }
    })
  }

  getAsync (params, callback) {
    return new Promise((resolve, reject) => {
      const getCommand = new GetCommand(params)
      documentClient.send(getCommand, (err, response) => {
        if (err || !response) {
          return reject(err)
        }
        if (response.Item) {
          return resolve(response)
        } else if (!response.Item) {
          return resolve({})
        }
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

  queryAsync (params, callback) {
    return new Promise((resolve, reject) => {
      const getCommand = new QueryCommand(params)
      documentClient.send(getCommand, (err, response) => {
        if (err || !response) {
          return resolve(err)
        }
        return resolve(response)
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

  scanAsync (params, callback) {
    return new Promise((resolve, reject) => {
      const getCommand = new ScanCommand(params)
      documentClient.send(getCommand, (err, response) => {
        if (err || !response) {
          return ScanCommand(err)
        }
        if (response.Items) {
          return resolve(response)
        } else if (!response.Items) {
          return resolve(null)
        }
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

  putAsync (params, callback) {
    return new Promise((resolve, reject) => {
      let item = params.Item
      try {
        item = Object.fromEntries(Object.entries(item).filter(([key, value]) => value !== undefined))
      } catch (error) {

      }
      params.Item = item
      const putCommand = new PutCommand(params)
      documentClient.send(putCommand, (err, response) => {
        if (err || !response) {
          return resolve(err)
        }
        return resolve(response)
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

  deleteAsync (params, callback) {
    return new Promise((resolve, reject) => {
      const docClient = DynamoDBDocument.from(ddb)
      docClient.delete(params, (err, response) => {
        if (err) {
          return resolve(err)
        } else {
          return resolve(response)
        }
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

  updateAsync (params, callback) {
    return new Promise((resolve, reject) => {
      const docClient = DynamoDBDocument.from(ddb)
      docClient.update(params, (err, response) => {
        if (err) {
          return resolve(err)
        } else {
          return resolve(response)
        }
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

  batchGetAsync (params, callback) {
    return new Promise((resolve, reject) => {
      const docClient = DynamoDBDocument.from(ddb)
      docClient.batchGet(params, function (err, response) {
        if (err) reject(err)
        else {
          return resolve(response)
        }
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

  batchWriteAsync (params, callback) {
    return new Promise((resolve, reject) => {
      const command = new BatchWriteCommand(params)
      documentClient.send(command, (err, response) => {
        if (err || !response) {
          return reject(err)
        }
        if (response) {
          return resolve(response)
        }
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

module.exports = DocumentClient
