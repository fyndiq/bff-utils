const chalk = require('chalk')

module.exports = async (fetchRequest, url, options) => {
  const start = Date.now()
  const prefix = chalk.cyan('  ⋅  http client ⋅')
  const method = chalk.bold(options.method)

  try {
    const response = await fetchRequest

    const delta = Math.round(Date.now() - start)
    const time = chalk.gray(`${delta}ms`)

    let status

    if (response.status >= 200 && response.status < 300) {
      status = chalk.green(response.status)
    } else if (response.status >= 300 && response.status < 400) {
      status = chalk.yellow(response.status)
    } else if (response.status >= 400 && response.status < 500) {
      status = chalk.red.bold(`${response.status} - ${response.statusText}`)
    } else if (response.status >= 500) {
      status = chalk.magentaBright.bold(
        `${response.status} - ${response.statusText}`,
      )
    }

    // Log everything
    console.log(`${prefix} ${method} ${chalk.gray(url)} ${status} ${time}`)
  } catch (err) {
    const name = chalk.bold.red(err.name)
    const code = chalk.red(err.code)

    console.log(`${prefix} ${method} ${chalk.gray(url)} ${name} ${code}`)
  }

  return fetchRequest
}
