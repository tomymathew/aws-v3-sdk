module.exports = {
  Lambda: require('./lambda'),
  DynamoDB: require('./dynamoDB'),
  EnvironmentCredentials: require('./credential'),
  S3: require('./s3'),
  S3R: require('./s3R'),
  STS: require('./sts'),
  SQS: require('./sqs'),
  SNS: require('./sns'),
  CognitoIdentityServiceProvider: require('./cognito')
}
