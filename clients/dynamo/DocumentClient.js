const { DynamoDB, DynamoDBClient, BatchGetItemCommand } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocument, DynamoDBDocumentClient, GetCommand, BatchWriteCommand, PutCommand, QueryCommand, ScanCommand, DeleteCommand } = require('@aws-sdk/lib-dynamodb')
const ddb = new DynamoDBClient()
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
    const putCommand = new PutCommand(params)
    documentClient.send(putCommand, (err, response) => {
      if (err || !response) {
        return callback(err)
      }
      return callback(null, response)
    })
  }

  delete (params, callback) {
    const putCommand = new DeleteCommand(params)
    documentClient.send(putCommand, (err, response) => {
      if (err) {
        return callback(err)
      }
      return callback(null, response)
    })
  }

  update (params, callback) {
    const docClient = DynamoDBDocument.from(new DynamoDB())
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
    const docClient = DynamoDBDocument.from(new DynamoDB())

    docClient.batchGet(params, function (err, data) {
      if (err) callback(err)
      else {
        callback(null, data)
      }
    })
  }
}

module.exports = DocumentClient
