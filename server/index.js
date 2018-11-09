const Koa = require('koa')
const views = require('koa-views')
const mongoose = require('mongoose')
const {
  resolve
} = require('path')
const {
  connect,
  initSchemas
} = require('./database/init')
const R = require('ramda')
const MIDDLEWARES = ['router', 'parcel'];
const useMiddlewares = (app) => {
  R.map(
    R.compose(
      R.forEachObjIndexed(
        initWith => initWith(app)
      ),
      require,
      name => resolve(__dirname, `./middlewears/${name}`)
    )
  )(MIDDLEWARES)
};
(async () => {
  await connect()
  initSchemas()
  // require('./tasks/movie')
  require('./tasks/api')
  const app = new Koa()
  await useMiddlewares(app)
  app.listen(4455)
})()


// app.use(views(resolve(__dirname, './views'), {
//   extension: 'pug'
// }))
// app.use(async (ctx, next) => {
//   await ctx.render('index', {
//     you: 'jld',
//     me: 'ljh'
//   })
// })
// async function start() {
//   const app = new Koa()
//   await useMiddlewares(app)
//   app.listen(4455)
// }

// start()