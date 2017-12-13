const fetch = require('node-fetch')
const HttpClient = require('./http-client')

// Mock node-fetch
jest.mock('node-fetch', () => jest.fn(() => Promise.resolve('OK')))

describe('HTTP Client', () => {
  describe('without logger', () => {
    const client = new HttpClient()

    beforeEach(() => {
      // Clear calls to fetch
      fetch.mockClear()
    })

    it('should perform a GET request', async () => {
      expect.assertions(3)
      const response = await client.get('/test/', { options: 'options' })
      expect(response).toBe('OK')
      expect(fetch).toHaveBeenCalled()
      expect(fetch.mock.calls[0]).toMatchSnapshot()
    })

    it('should perform a POST request', async () => {
      expect.assertions(3)
      const response = await client.post('/test/', {
        body: JSON.stringify({ hello: 'world' }),
      })
      expect(response).toBe('OK')
      expect(fetch).toHaveBeenCalled()
      expect(fetch.mock.calls[0]).toMatchSnapshot()
    })

    it('should perform a PUT request', async () => {
      expect.assertions(3)
      const response = await client.put('/test/', { options: 'options' })
      expect(response).toBe('OK')
      expect(fetch).toHaveBeenCalled()
      expect(fetch.mock.calls[0]).toMatchSnapshot()
    })

    it('should perform a DELETE request', async () => {
      expect.assertions(3)
      const response = await client.delete('/test/', { options: 'options' })
      expect(response).toBe('OK')
      expect(fetch).toHaveBeenCalled()
      expect(fetch.mock.calls[0]).toMatchSnapshot()
    })
  })

  describe('with logger', () => {
    const logger = jest.fn(a => a)
    const client = new HttpClient(logger)

    beforeEach(() => {
      jest.clearAllMocks()
    })

    it('should log a GET request', async () => {
      expect.assertions(3)
      const response = await client.get('URL', { options: 'options' })
      expect(response).toBe('OK')
      expect(logger).toHaveBeenCalled()
      expect(logger.mock.calls[0]).toMatchSnapshot()
    })

    it('should log a POST request', async () => {
      expect.assertions(3)
      const response = await client.post('URL', {
        body: JSON.stringify({ hello: 'world' }),
      })
      expect(response).toBe('OK')
      expect(logger).toHaveBeenCalled()
      expect(logger.mock.calls[0]).toMatchSnapshot()
    })

    it('should log a PUT request', async () => {
      expect.assertions(3)
      const response = await client.put('URL', { options: 'options' })
      expect(response).toBe('OK')
      expect(logger).toHaveBeenCalled()
      expect(logger.mock.calls[0]).toMatchSnapshot()
    })

    it('should log a DELETE request', async () => {
      expect.assertions(3)
      const response = await client.delete('URL', { options: 'options' })
      expect(response).toBe('OK')
      expect(logger).toHaveBeenCalled()
      expect(logger.mock.calls[0]).toMatchSnapshot()
    })
  })
})
