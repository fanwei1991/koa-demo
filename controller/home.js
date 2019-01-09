const homeService = require('../service/home')
module.exports = {
  index: async (ctx, next) => {
//    await ctx.render('home/index', {title: 'home标题'})
    await ctx.render('index')
  },
  home: async (ctx, next) => {
    console.log(ctx.request.query)
    console.log(ctx.request.querystring)
    await ctx.render('home/index')
  },
  homeParams: async (ctx, next) => {
    console.log(ctx.params)
    ctx.response.body = '<h1>HOME page /:id/:name</h1>'
  },
  login: async (ctx, next) => {
    await ctx.render('home/login', {
      btnName: 'GoGoGo'
    })
  },
  register: async (ctx, next) => {
    console.log(ctx.request)
    let {
      name,
      password
    } = ctx.request.body
    let res = await homeService.register(name, password)
    if (res.status == '-1') {
      await ctx.render('home/login', res.data)
    } else {
      ctx.state.title = '个人中心'
      await ctx.render('home/success', res.data)
    }
  }
}