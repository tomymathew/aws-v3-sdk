module.exports = {
  Lambda: require('./lambda'),
  DynamoDB: require('./dynamoDB'),
  EnvironmentCredentials: require('./credential'),
  S3: require('./s3'),
  STS: require('./sts'),
  SQS: require('./sqs'),
  SNS: require('./sns'),
  CognitoIdentityServiceProvider: require('./cognito')
}
