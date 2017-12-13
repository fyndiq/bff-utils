const fetch = require('node-fetch')

class HttpClient {
  constructor(logger) {
    this.setLogger(logger)
  }

  setLogger(logger) {
    this.logger = logger
  }

  get(url, options) {
    return this.internalLogFetch(
      url,
      Object.assign({}, { method: 'GET' }, options),
    )
  }

  post(url, options) {
    return this.internalLogFetch(
      url,
      Object.assign({}, { method: 'POST' }, options),
    )
  }

  put(url, options) {
    return this.internalLogFetch(
      url,
      Object.assign({}, { method: 'PUT' }, options),
    )
  }

  delete(url, options) {
    return this.internalLogFetch(
      url,
      Object.assign({}, { method: 'DELETE' }, options),
    )
  }

  // Internal function : does a log + a fetch
  internalLogFetch(url, options) {
    // Do not log the request if the logger has not been defined
    if (!this.logger) {
      return fetch(url, options)
    }

    return this.logger(fetch(url, options), url, options)
  }
}

module.exports = HttpClient
