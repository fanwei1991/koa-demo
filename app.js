const koa = require('koa')
const router = require('./router')
const middleware = require('./middleware')
const app = new koa()
const dbs = require('./service/dbs/config')
const api = require('./service/interface/index')


dbs()
middleware(app)
router(app)

app.use(api.routes()).use(api.allowedMethods())
app.listen(3000, () => {
  console.log('server in running at http://loacalhost:3000')
})