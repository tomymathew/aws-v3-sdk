const { sendGetRequest, sendGetRequestCallback, getCount, multiSearch } = require('./sendGetRequest')
const { sendAuditsReqToES } = require('./es-audits-wrapper')
const { sendReqToES } = require('./es-wrapper')

module.exports = {
  sendGetRequest,
  sendGetRequestCallback,
  getCount,
  multiSearch,
  sendReqToES,
  sendAuditsReqToES
}
