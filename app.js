const koa = require('koa')
const router = require('./router')
const middleware = require('./middleware')
const app = new koa()
middleware(app)
router(app)
app.listen(3000, () => {
  console.log('server in running at http://loacalhost:3000')
})