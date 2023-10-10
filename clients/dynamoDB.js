const DocumentClient = require('./dynamo/DocumentClient')
const DocumentClientAsync = require('./dynamo/DocumentClientAsync')

class DynamoDB {
  constructor () {
    this.DocumentClient = DocumentClient
    this.DocumentClientAsync = DocumentClientAsync
  }
}

module.exports = new DynamoDB()
