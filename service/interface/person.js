const Router = require('koa-router')
const Person = require('../dbs/models/person')
let router = new Router({prefix: '/person'})

router.all('/getPerson', async ctx => {
  let list = await Person.find()
  ctx.body = {
    code: 0,
    list: list,
    total: list.length
  }
})

router.all('/addPerson', async ctx => {
  await Person.create({
    name: '张三' + Math.ceil((Math.random()+1) * 10),
    age: Math.ceil((Math.random()+1) * 10)
  }).then((res) => {
    console.log('res:', res)
    ctx.body = {
      code: 0,
      msg: "添加成功"
    }
  }).catch((err) => {
    ctx.body = {
      code: -1,
      msg: err.message
    }
    console.log('err:', err)
  })
  
//  ctx.body = {
//    code: 0,
//    msg: "添加成功"
//  }
})

module.exports = router