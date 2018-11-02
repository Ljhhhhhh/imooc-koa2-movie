const Koa = require('koa');

const app = new Koa()

app.use(async (ctx, next) => {
	ctx.body = 'hi ljh'
})

app.listen(2333)