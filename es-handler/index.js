const { sendGetRequest } = require('./sendGetRequest')
const { sendAuditsReqToES } = require('./es-audits-wrapper')
const { sendReqToES } = require('./es-wrapper')

module.exports = {
  sendGetRequest,
  sendReqToES,
  sendAuditsReqToES
}
