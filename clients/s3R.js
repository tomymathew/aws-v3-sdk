const { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsCommand, DeleteObjectsCommand, CreateMultipartUploadCommand, CompleteMultipartUploadCommand, UploadPartCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
class S3R {
  constructor (params) {
    this.client = new S3Client(params)
  }

  getSignedUrl (type, params, callback) {
    return new Promise((resolve, reject) => {
      if (type === 'getObject') {
        const Expires = params.Expires
        delete params.Expires
        const command = new GetObjectCommand(params)
        getSignedUrl(this.client, command, { expiresIn: Expires }).then(url => {
          resolve(url)
        }).catch(err => {
          resolve(err)
        })
      } else if (type === 'putObject') {
        const Expires = params.Expires
        delete params.Expires
        const command = new PutObjectCommand(params)
        getSignedUrl(this.client, command, { expiresIn: Expires }).then(url => {
          resolve(url)
        }).catch(err => {
          resolve(err)
        })
      } else if (type === 'uploadPart') {
        const Expires = params.Expires
        delete params.Expires
        const command = new UploadPartCommand(params)
        getSignedUrl(this.client, command, { expiresIn: Expires }).then(url => {
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

  createMultipartUpload (params, callback) {
    return new Promise((resolve, reject) => {
      const command = new CreateMultipartUploadCommand(params)
      this.client.send(command).then(response => {
        resolve(response)
      }).catch(err => {
        reject(err)
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

  completeMultipartUpload (params, callback) {
    return new Promise((resolve, reject) => {
      const command = new CompleteMultipartUploadCommand(params)
      this.client.send(command).then(response => {
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
      this.client.send(getObject).then(response => {
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
      this.client.send(putObject, (err, data) => {
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

  listObjectsV2 (params, callback) {
    return new Promise((resolve, reject) => {
      const command = new ListObjectsV2Command(params)
      this.client.send(command, (err, data) => {
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

module.exports = S3R
