const Boom = require('boom')
const KoaBoom = require('./koa-boom')

describe('KoaBoom Middleware', () => {
  const middleware = KoaBoom()

  it('should throw a ctx error if the error is a Boom Error', async () => {
    expect.assertions(2)
    const ctx = { throw: jest.fn() }
    const next = () =>
      new Promise(() => {
        throw new Boom()
      })
    await middleware(ctx, next)
    expect(ctx.throw).toHaveBeenCalled()
    expect(ctx.throw.mock.calls[0]).toMatchSnapshot()
  })

  it('should re-throw other errors', async () => {
    expect.assertions(1)
    const next = () =>
      new Promise(() => {
        throw new Error('Hey')
      })
    await expect(middleware({}, next)).rejects.toMatchSnapshot()
  })
})
