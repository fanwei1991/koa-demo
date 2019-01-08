const staticFiles = require('koa-static')
const bodyParser = require('koa-bodyparser')
const nunjucks = require('koa-nunjucks-2')
const miSend = require('./mi-send')
const miLog = require('./mi-log')
const miHttpError = require('./mi-http-error')
const path = require('path')
const ip = require('ip')

module.exports = (app) => {
  
  app.use(miHttpError({
    errorPageFolder: path.resolve(__dirname, '../views/error')
  }))
  
  app.use(miLog({
    env: app.env,
    projectName: 'koa2-tutorial',
    appLogLevel: 'debug',
    dir: 'logs',
    serverIp: ip.address()
  }))
  app.use(bodyParser())
  app.use(miSend())
  app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, '../views'),
    nunjucksConfig: {
      trimBlocks: true
    }
  }))
  
  app.use(staticFiles(path.join(__dirname, '../public'), {
    maxage: 60 * 60 * 1000
  }))
  
  // 增加错误的监听处理
  app.on("error", (err, ctx) => {
    if (ctx && !ctx.headerSent && ctx.status < 500) {
      ctx.status = 500
    }
    if (ctx && ctx.log && ctx.log.error) {
      if (!ctx.state.logged) {
        ctx.log.error(err.stack)
      }
    }
  })
}