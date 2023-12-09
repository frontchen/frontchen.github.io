---
title: koa2
---

## koa2 环境搭建-创建项目

安装脚手架：`npm i koa-generator -g`

使用脚手架 `koa-generator` 创建 `koa2` 项目 ：`koa2 xxx`

## koa2 环境搭建-目录和文件介绍

`app.js` 是项目入口文件，其中 `app.use()`都是**中间件**

`bin/www` 获取 `app` 导出的 `Koa` 实例，并且监听 `3000` 端口；**其他先不要管知道这个就行了**

`views` 下的 `pug` 是服务端模板引擎，**暂时先不用去管**,因为前后端分离，不需要服务端返回页面，只关注**定义路由**，**接口返回 `JSON` 数据**就可以

## koa2 环境搭建-新建路由

::: warning 注意
在 `ctx.body` 为对象时，直接返回 `JSON` 格式，不需要设置 `Content-type`;`koa `将 `request` 和 `response` 对象封装在了一个对象中，该对象就是 `ctx`
:::

1.  在 `routers` 下定义路由文件，可能会有前缀，**不要忘了写`router.prefix('/api')`**

```js
const router = require('koa-router')()
router.prefix('/api') // 前缀
// 定义路由
router.get('/list', async (ctx) => {
  ctx.body = {
    errno: 0,
    data: [
      { content: 'text1', user: 'frank' },
      { content: 'text2', user: 'zhang' },
      { content: 'text3', user: 'sun' },
    ],
  }
})
module.exports = router // 输出
```

2.  在 `app.js` 引用路由

```js
const comments = require('./routes/comments')
```

3.  app.js 下注册路由

```js
app.use(comments.routes(), comments.allowedMethods())
```

## koa2 处理 http 请求

`querystring` `Request body` `Response body` `Content-type`

```js
const router = require('koa-router')()

router.prefix('/api') // 前缀
// 定义路由
router.get('/list', async (ctx) => {
  const query = ctx.query // querystring
  // console.log('query',query)
  ctx.body = {
    errno: 0,
    data: [
      { content: 'text1', user: 'frank' },
      { content: 'text2', user: 'zhang' },
      { content: 'text3', user: 'sun' },
    ],
  } //Response body
})

router.post('/create', async (ctx) => {
  const body = ctx.request.body //Request body
  // console.log('req-body',body)
  ctx.body = {
    errno: 0,
    message: '留言创建成功！',
  } // res-body
})

module.exports = router // 输出
```

**Koa 和 node.js 相比，封装了原生代码的 API,规范了流程和格式**

```js
// node.js
// 相同功能node实现
const http = require('http')

const server = http.createServer((req, res) => {
  const url = req.url
  const path = url.split('?')[0]
  const method = req.method

  // 定义一个get路由 获取留言板列表
  if (path === '/api/list' && method === 'GET') {
    const result = {
      errno: 0,
      data: [
        { user: 'frank', content: 'messsage-1' },
        { user: 'dell', content: 'messsage-2' },
      ],
    }
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(
      // 把对象转化为JSON字符串
      JSON.stringify(result)
    )
  }
  // 定义一个POST路由 创建留言板
  else if (path === '/api/create' && method === 'POST') {
    const result = {
      errno: 0,
      message: '留言创建成功！',
    }
    res.writeHead(200, { 'Content-type': 'application/json' })
    res.end(
      // 把对象转化为JSON字符串
      JSON.stringify(result)
    )
  } else {
    res.writeHead(404, { 'Content-type': 'text/plain' })
    res.end('404 not found')
  }
})
server.listen(3000, () => {
  console.log('http请求已经被监听，3000端口')
})
```

## koa2 中间件

中间件：一个流程上，独立的业务模块

可扩展，可插拔

类似于工厂的流水线

![koa2中间件](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/koa2%E4%B8%AD%E9%97%B4%E4%BB%B6.png)

为什么使用中间件？

- 拆分业务模块，使代码清晰

- 统一使用中间件，使得各业务代码都规范标准

- 扩展性好，易添加，易删除

koa2 业务代码都是中间件所有的 app.use(...)都是中间件

路由也是中间件（只不过限制了 url 规则），所有的请求都会经过 app.use，路由规则匹配后才会进入对应路由中间件

![koa2中间件2](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/koa2%E4%B8%AD%E9%97%B4%E4%BB%B62.png)

```js
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const comments = require('./routes/comments')
// error handler 错误处理器
onerror(app)

// middlewares 中间件（ app.use(...) ）
app.use(
  bodyparser({
    // request body 转换
    enableTypes: ['json', 'form', 'text'],
  })
)
// 处理ctx.body（responce body）
app.use(json())
app.use(logger()) // 日志格式
app.use(require('koa-static')(__dirname + '/public')) // 静态文件服务

app.use(
  views(__dirname + '/views', {
    // 服务端模板引擎
    extension: 'pug',
  })
)

// logger 打印当前请求所花费的时间
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes 注册路由
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(comments.routes(), comments.allowedMethods())
// allowedMethods() 对于 404 或者返回是空的情况的一种补充

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
})

module.exports = app
```

模拟登录功能,仅仅是**为了使用中间件**

app.js 中使用中间件，next()执行下一个中间件

```js
......
app.use(async(ctx,next)=>{
  const query=ctx.query
  if(query.user='frank'){
    await next()
  }else{
      ctx.body='登录失败！'
  }
})

......

app.use(index.routes(),......)

```

![koa2中间件3](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/koa2%E4%B8%AD%E9%97%B4%E4%BB%B63.png)

## koa2 洋葱圈模型

::: warning 注意
中间件机制，业务模块的划分;洋葱圈模型，中间件的执行机制;两者要分开，不要混为一谈
:::
中间件机制，是 koa 的精髓，每个中间件都是 **async** 函数，中间件的运行机制，就像**洋葱圈**

![洋葱圈模型图示](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E6%B4%8B%E8%91%B1%E5%9C%88%E6%A8%A1%E5%9E%8B%E5%9B%BE%E7%A4%BA.png)

代码演示：

```js
const Koa = require('koa')
const app = new Koa()

// logger

app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.get('X-Response-Time')
  console.log(`${ctx.method} ${ctx.url} - ${rt}`)
})

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
})

// response

app.use(async (ctx) => {
  ctx.body = 'Hello World'
})

app.listen(3000)
```

::: tip 个人理解
遇到了 async 异步函数中的 await，先返回，阻塞了函数中后面代码的执行。去执行下一个中间件，在下一个中间件中又遇到了 await 继续执行下一个中间件....这样到最后一个中间件，逐层向上执行每个 async 函数的后续代码。
:::

## koa2 登录实现方案与实践

### cookie-介绍

- 存储在浏览器的一段字符串，最大 5kb
- 每个域都可有一个 cookie，跨域不共享
- 格式如 k1=V1；k2=V2；k3=v3（可结构化）
- cookie 会随 http 请求传递给服务端
- 服务端可修改 cookie 再返回给前端
- 默认，跨域不可传递 cookie

### cookie-服务端操作 cookie

- nodejs

```js
const http = require('http')

const server = http.createServer((req, res) => {
  // 设置cookie
  res.setHeader('Set-Cookie', 'a=100')
  // 追加不覆盖
  res.setHeader('Set-Cookie', 'b=200')
  // 获取cookie
  console.log('cookie is', req.headers.cookie)
  const cookieStr = req.headers.cookie
  res.end('cookie test')
  // 结构化cookie 'a=100;b=200'->{a:100,b:200}
  const cookieObj = {}
  cookieStr.split(';').forEach((cookieItem) => {
    const arr = cookieItem.trim().split('=')
    const key = arr[0]
    const val = arr[1]
    cookieObj[key] = val
  })
  console.log('cookieObj is', cookieObj)
})
server.listen(3000, () => {
  console.log('server listen on 3000 port')
})
```

- koa2

```js
app.use(async (ctx) => {
  // 设置cookie
  ctx.cookies.set('a', '100')
  // 获取cookie
  ctx.cookies.get('a')
  // 结构化 koa2已经做好了
})
```

### cookie 登录校验

请求登录接口，成功则设置 cookie，如 user=zhangsan

前端再请求其他接口，就会带着上述 cookie

服务端判断 cookie 有无 user=zhangsan，即可验证

![登录校验cookie](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/%E7%99%BB%E5%BD%95%E6%A0%A1%E9%AA%8Ccookie.png)

### session-介绍

cookie 不能暴露用户名

cookie 存放用户信息明文，非常危险;解决方案：cookie 存一个用户标识，如 userId=123,**而不是 username=zhangfan**

cookie 存储用户标识,用户信息则存储到 session 中,session 即用户信息的存储，和 cookie 有对应关系

![sessioncookie关系](https://zfh-nanjing-bucket.oss-cn-nanjing.aliyuncs.com/blog-images/sessioncookie%E5%85%B3%E7%B3%BB.png)

### koa2 实现登录-session

1. 安装`koa-generic-session`(2.0.4)

```bash
npm i koa-generic-session --save
```

2. app.js 使用中间件

```js
// 自动配置了 cookie 和 session
app.keys = ['wertwe^&&*UUI123123'] // 秘钥
app.use(
  session({
    // 配置 cookie
    cookie: {
      path: '/', // cookie 在根目录下有效
      httpOnly: true, // cookie 只允许服务端来操作
      maxAge: 24 * 60 * 60 * 1000, // cookie 的过期时间
    },
  })
)
```

### koa2 实现登录-模拟登录

router/users.js

```js
// 模拟登录
router.get('/login-mock', async (ctx, next) => {
  let str = ''
  const query = ctx.query // url 参数，querystring
  if (query.username) {
    // 模拟登录成功
    ctx.session.userInfo = {
      username: query.username,
    }
    str = 'login ok'
  } else {
    // 模拟登录失败，不用处理 session
    str = 'login failed'
  }

  ctx.body = str
})

// 模拟登录验证
router.get('/login-check-mock', async (ctx, next) => {
  ctx.body = ctx.session.userInfo || {}
})
```

### 完善登录功能-对接数据库

```js
// 登录（对接数据库的）
// 为了方便同域的测试，暂用 get 请求
router.get('/login', async (ctx, next) => {
  const { username, password } = ctx.query // get 请求
  // const { username, password } = ctx.request.body // post 请求

  // 查询数据库
  const user = await User.findOne({
    username,
    password,
  })

  if (user != null) {
    // 登录成功，设置 session
    ctx.session.userInfo = user // 所有的用户信息
    // 返回
    ctx.body = {
      errno: 0,
      data: user,
    }
    return
  }
  // 登录失败，不用操作 session
  ctx.body = {
    errno: -1,
    message: '用户名或密码错误',
  }
})
```

### 完善登录功能-重写登录中间件

`middlewares/loginCheck.js`

```js
// 登录验证的中间件

async function loginCheck(ctx, next) {
  const userInfo = ctx.session.userInfo
  if (userInfo && userInfo.username) {
    // 登录验证成功
    await next()
    return
  }
  // 登录失败
  ctx.body = {
    errno: -1,
    message: '请登录',
  }
}

module.exports = loginCheck
```

将登录中间件单独用于某个路由(比如获取留言板内容)

```js
const loginCheck = require('../middlewares/loginCheck')
// 定义路由：模拟获取留言板列表

......

router.get('/list',loginCheck,async (ctx, next) => {
    const query = ctx.query // req 功能
    console.log('query', query)
    // ctx.body = 'api list' // res 功能

    // 获取数据库的列表
    const commentList = await Comment.find().sort({ _id: -1 })
    ctx.body = {
        errno: 0,
        data: commentList
    }
})
```
