const { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsCommand, DeleteObjectsCommand, CreateMultipartUploadCommand, CompleteMultipartUploadCommand } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const client = new S3Client({})

class S3 {
  getSignedUrl (type, params, callback) {
    return new Promise((resolve, reject) => {
      if (type === 'getObject') {
        const Expires = params.Expires
        delete params.Expires
        const command = new GetObjectCommand(params)
        getSignedUrl(client, command, { expiresIn: Expires }).then(url => {
          resolve(url)
        }).catch(err => {
          resolve(err)
        })
      } else if (type === 'putObject') {
        const Expires = params.Expires
        delete params.Expires
        const command = new PutObjectCommand(params)
        getSignedUrl(client, command, { expiresIn: Expires }).then(url => {
          resolve(url)
        }).catch(err => {
          resolve(err)
        })
      }
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

  createMultipartUpload (type, params, callback) {
    return new Promise((resolve, reject) => {
      const command = new CreateMultipartUploadCommand(params)
      client.send(command).then(response => {
        resolve(response)
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

  completeMultipartUpload (type, params, callback) {
    return new Promise((resolve, reject) => {
      const command = new CompleteMultipartUploadCommand(params)
      client.send(command).then(response => {
        resolve(response)
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

  putObject (params, callback) {
    return new Promise((resolve, reject) => {
      const putObject = new PutObjectCommand(params)
      client.send(putObject, (err, data) => {
        if (err || !data) {
          resolve(err)
        }
        if (data) {
          resolve(data)
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

module.exports = S3
