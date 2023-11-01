const winston = require('winston')

const level = process.env.LOG_LEVEL || 'debug'
const logger = winston.createLogger({
  level,
  transports: [
    new winston.transports.Console({
      level,
      timestamp: function () {
        return (new Date()).toISOString()
      }
    })
  ]
})

module.exports = logger
