const fetch = require('node-fetch')
const Boom = require('boom')

class HttpClient {
  static checkStatus(response) {
    const { status, statusText } = response

    // Client or server error
    if (status >= 400 && status < 600) {
      throw new Boom(statusText, { statusCode: status, data: { response } })
    }
  }

  constructor(logger) {
    this.setLogger(logger)
  }

  setLogger(logger) {
    this.logger = logger
  }

  get(url, options) {
    return this.performRequest(
      url,
      Object.assign({}, { method: 'GET' }, options),
    )
  }

  post(url, options) {
    return this.performRequest(
      url,
      Object.assign({}, { method: 'POST' }, options),
    )
  }

  put(url, options) {
    return this.performRequest(
      url,
      Object.assign({}, { method: 'PUT' }, options),
    )
  }

  delete(url, options) {
    return this.performRequest(
      url,
      Object.assign({}, { method: 'DELETE' }, options),
    )
  }

  async performRequest(url, options) {
    const fetchRequest = fetch(url, options)

    if (this.logger) {
      this.logger(fetchRequest, url, options)
    }

    const response = await fetchRequest
    HttpClient.checkStatus(response)

    return response
  }
}

module.exports = HttpClient
