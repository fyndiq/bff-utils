const HttpClient = require('./src/http/http-client')
const HttpLogger = require('./src/http/http-logger')

const HttpClientWithLogger = new HttpClient(HttpLogger)

module.exports = {
  HttpClient: HttpClientWithLogger,
  HttpLogger,
}
