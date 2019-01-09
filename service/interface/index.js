const Router = require('koa-router')

const Person = require('./person')

const api = new Router({prefix: '/api/admin'})

api.use(Person.routes()).use(Person.allowedMethods())

module.exports = api