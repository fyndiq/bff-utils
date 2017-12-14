const Boom = require('boom')

module.exports = () => async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (Boom.isBoom(err)) {
      ctx.throw(err.output.statusCode, err.output.payload.error)
    } else {
      throw err
    }
  }
}
