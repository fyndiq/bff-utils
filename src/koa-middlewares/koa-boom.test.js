const Boom = require('boom')
const KoaBoom = require('./koa-boom')

describe('KoaBoom Middleware', () => {
  const middleware = KoaBoom()

  it('should throw a ctx error if the error is a Boom Error', async () => {
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
    const next = () =>
      new Promise(() => {
        throw new Error('Hey')
      })
    expect(middleware({}, next)).rejects.toMatchSnapshot()
  })
})
