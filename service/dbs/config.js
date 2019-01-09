const mongoose = require('mongoose')

module.exports = () => {
  mongoose.connect('mongodb://129.28.84.110/koaLearn', {
    useNewUrlParser:true
  })
}

const db = mongoose.connection;

db.on('error', err => {
  console.log(err)
})

db.on('open', () => {
  console.log('连接成功！')
})
