const DocumentClient = require('./dynamo/DocumentClient')

class DynamoDB {
  constructor () {
    this.DocumentClient = DocumentClient
  }
}

module.exports = new DynamoDB()
