const http = require('http')
const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')
const json = require('koa-json')
const newRouter = router()
const koaCors = require('koa-cors')

//API KEY FOR TMDB:f1a9053523aef8cf0734bcc18bd6c874
//ejemplo:https://api.themoviedb.org/3/movie/808?api_key=f1a9053523aef8cf0734bcc18bd6c874
//el ejemplo devuelve un objeto con los datos de shrek

// koa cors
app.use(koaCors())

// body parser
app.use(json())

// logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// response
// rutas
newRouter.get('/api', (ctx) => {
    ctx.body = 'hello from api'
    console.log(ctx)
})

app.use(newRouter.routes())

app.use(async ctx => {
  ctx.body = 'Hello Server';
});

const port = 3001
http.createServer(app.callback(`server listening on port ${port}`)).listen(port);