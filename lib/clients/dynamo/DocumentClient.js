const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocumentClient, GetCommand } = require('@aws-sdk/lib-dynamodb')
const ddb = new DynamoDBClient()
const documentClient = DynamoDBDocumentClient.from(ddb)

class DocumentClient {
  get (params, callback) {
    const getCommand = new GetCommand(params)
    documentClient.send(getCommand, (err, response) => {
      console.log(response)
      if (err || !response) {
        return callback(err)
      }
      if (response.Item) {
        return callback(null, response)
      } else if (!response.Item) {
        return callback(response)
      }
    })
  }
}

module.exports = DocumentClient
