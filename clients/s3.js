const { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsCommand, DeleteObjectsCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const client = new S3Client({})

class S3 {
  getObject (params, callback) {
    return new Promise((resolve, reject) => {
      const getObject = new GetObjectCommand(params)
      client.send(getObject).then(response => {
        const chunks = []
        const stream = response.Body
        stream.on('data', chunk => chunks.push(chunk))
        stream.on('end', () => {
          const imageBuffer = Buffer.concat(chunks)
          response.Body = imageBuffer
          resolve(response)
        })
      }).catch(err => {
        resolve(err)
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

module.exports = S3
