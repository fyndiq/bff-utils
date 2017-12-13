const chalk = require('chalk')
const logger = require('./http-logger')

/* eslint-disable no-console */

describe('HTTP Logger', () => {
  beforeAll(() => {
    // Remove unicode colors for snapshot matches
    chalk.level = 0
  })

  beforeEach(() => {
    // Mock console.log
    console.log = jest.fn()
  })

  it('should log a valid fetch request', async () => {
    expect.assertions(5)
    const fakeFetch = new Promise(r =>
      setTimeout(() => r({ status: 200 }), 100),
    )

    await logger(fakeFetch, 'test-URL', { method: 'GET' })

    const logged = console.log.mock.calls[0][0]
    expect(logged.includes('http client')).toBe(true)
    expect(logged.includes('GET')).toBe(true)
    expect(logged.includes('test-URL')).toBe(true)
    expect(logged.includes(200)).toBe(true)
    expect(/([0-9]{2,3})ms/.test(logged)).toBe(true)
  })

  it('should log a POST request', async () => {
    expect.assertions(1)
    const fakeFetch = new Promise(r =>
      setTimeout(() => r({ status: 200 }), 100),
    )

    await logger(fakeFetch, 'test-URL', { method: 'POST' })

    const logged = console.log.mock.calls[0][0]
    expect(logged.includes('POST')).toBe(true)
  })

  it('should log a 3xx fetch request', async () => {
    expect.assertions(1)
    const fakeFetch = new Promise(r =>
      setTimeout(() => r({ status: 304 }), 100),
    )

    await logger(fakeFetch, 'test-URL', { method: 'GET' })

    const logged = console.log.mock.calls[0][0]
    expect(logged.includes(304)).toBe(true)
  })

  it('should log a 4xx fetch request', async () => {
    expect.assertions(2)
    const fakeFetch = new Promise(r =>
      setTimeout(() => r({ status: 404, statusText: 'Not Found' }), 100),
    )

    await logger(fakeFetch, 'test-URL', { method: 'GET' })

    const logged = console.log.mock.calls[0][0]
    expect(logged.includes(404)).toBe(true)
    expect(logged.includes('Not Found')).toBe(true)
  })

  it('should log a 5xx fetch request', async () => {
    expect.assertions(2)
    const fakeFetch = new Promise(r =>
      setTimeout(
        () => r({ status: 500, statusText: 'Internal Server Error' }),
        100,
      ),
    )

    await logger(fakeFetch, 'test-URL', { method: 'GET' })

    const logged = console.log.mock.calls[0][0]
    expect(logged.includes(500)).toBe(true)
    expect(logged.includes('Internal Server Error')).toBe(true)
  })

  it('should log a fetch request with a different HTTP status code', async () => {
    expect.assertions(2)
    const fakeFetch = new Promise(r =>
      setTimeout(
        () => r({ status: 999, statusText: 'Some weird HTTP status' }),
        100,
      ),
    )

    await logger(fakeFetch, 'test-URL', { method: 'GET' })

    const logged = console.log.mock.calls[0][0]
    expect(logged.includes('999')).toBe(true)
    expect(logged.includes('Some weird HTTP status')).toBe(true)
  })

  it('should log a network error', async () => {
    // Setup custom error
    class CustomError extends Error {
      constructor({ name, code }, ...params) {
        super(...params)
        this.name = name
        this.code = code
      }
    }

    const fakeFetch = new Promise((resolve, reject) =>
      setTimeout(
        () => reject(new CustomError({ name: 'FetchError', code: 'ERRNO12' })),
        100,
      ),
    )

    try {
      await logger(fakeFetch, 'test-URL', { method: 'GET' })
    } catch (e) {
      // pass
    }

    const logged = console.log.mock.calls[0][0]
    expect(logged).toMatchSnapshot()
  })
})
