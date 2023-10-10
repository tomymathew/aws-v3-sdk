const { DynamoDB, DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocument, DynamoDBDocumentClient, GetCommand, BatchWriteCommand, PutCommand, QueryCommand, ScanCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb')
const ddb = new DynamoDBClient()
const documentClient = DynamoDBDocumentClient.from(ddb)

class DocumentClientAsync {
  get (params, callback) {
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

  query (params, callback) {
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

  put (params, callback) {
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

  delete (params, callback) {
    return new Promise((resolve, reject) => {
      const docClient = DynamoDBDocument.from(new DynamoDB())
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

  update (params, callback) {
    return new Promise((resolve, reject) => {
      const docClient = DynamoDBDocument.from(new DynamoDB())
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
}

module.exports = DocumentClientAsync
