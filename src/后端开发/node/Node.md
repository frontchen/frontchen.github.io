---
title: Node
tag: node
date: 2018-08-08
category: 后端开发
---

### 1、浏览器的工作原理

#### 浏览器组成：

- 用户界面：地址栏 前进后退、书签菜单

- 渲染引擎:负责显示请求的内容

- 浏览器引擎:在用户界面和渲染引擎之间传达指令（点击刷新）

- 网络模块：用户网络调用
- UI 后端:用户绘制基本的窗口小部件
- JS 解释器:解析和执行 js 代码
- 数据存储:持久层（cookie、LocalStorage 和 SessionStorage）

#### 流程图

```
graph TD

    A(用户界面)-->B{浏览器引擎}
    A-->F(UI后端)
    B-->C{渲染引擎}
    B-->G(数据存储)
    C-->D[网络模块]
    C-->E[JS解释器]
    C-->F[UI后端]


```

### 2、Node.js 的简单介绍

    node 是一个开发平台 基于 Chrom V8 javascript 引擎构建,可以开发控制台程序（命令行程序）、桌面应用程序（GUI）（借助 node-webkit、electron 等框架实现）、Web 应用程序（网站）

#### win10 安装:

- 1.管理员运行 cmd 进入安装包所在目录
- 2.msiexec /package node-v8.9.3-x64.msi

#### 运行指令

- npm install -g npm 这样 npm 就更新到最新版本了。
- 如果想更新到指定版本， 运行指令
  npm -g install npm@2.9.1（@后跟版本号）， 这样我们就可以更新 npm 版本了。
- 怎么查看自己全局安装过的包，用命令 npm list -g --depth 0

#### 淘宝镜像

```js
//淘宝镜像
npm config set registry https://registry.npm.taobao.org

npm config set registry http://registry.cnpmjs.org

//检测是否设置成功
npm config get registry

//查看全局包位置：
npm root -g
//可以看到实际的位置

//修改全局包位置
npm config set prefix '目标目录'

//npm清理缓存
npm cache verify


//查看修改结果
npm config get prefix
//或者用npm root -g命令也可
npm uninstall -g xxx

npm update moduleName：更新node模块
npm rebuild moduleName
npm view moudleName dependencies：查看包的依赖关系
npm view moduleName repository.url：查看包的源文件地址
npm view moduleName engines：查看包所依赖的Node的版本
npm outdated：检查包是否已经过时，此命令会列出所有已经过时的包，可以及时进行包的更新


```

#### 升级 node 版本

- 1)首先:查看当前 node 版本:node –v
- 2)安装 n 模块:npm install -g n
- 3)升级到指定版本/最新版本(该步骤可能需要花费一些时间)升级之前,可以执行 n ls (查看可升级的版本)
  如:n 6.9.1
  或者你也可以告诉管理器,安装最新的稳定版本
  n stable
- 4)安装完成后,查看 Node 的版本,检查升级是否成功
  node -v
- 注:如果得到的版本信息不正确,你可能需要重启机器

#### cnpm

##### 1. npm 安装 cnpm

```js
   npm i cnpm -g
```

##### 2. 检查 cnpm

```
    cnpm -v
```

##### 3. 安装其他包:

```
   cnpm  i bootstrap -S
```

#### yarn

##### 1. npm 安装 yarn

```
   npm i yarn -g
```

##### 2. 检查 yarn

```
    yarn -v
```

##### 3. 安装其他包:

```
   yarn add underscore
   yarn add 包名    本地
   yarn add 包名  -g    全局
```

##### 4.更新一个依赖

```JS
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

##### 5.移除一个依赖

```JS
yarn remove [package]
```

##### 6.安装 package.json 中所有的依赖项

```
yarn或者 yarn install
```

##### 7.运行脚本

```
yarn run dev
```

- yarn 执行 dev 对应的脚本 node app.js

##### 8. 显示某个包信息

```JS
    yarn info webpack # yarn
    npm info webpack # npm
    yarn info webpack --json # 输出 json 格式
    npm info webpack  --json # npm
    yarn info webpack readme # 输出 README 部分
    npm info webpack readme
```

##### 9. 列出项目的所有依赖

```JS
     yarn list # 列出当前项目的依赖
    npm list # npm
    yarn list --depth=0 # 限制依赖的深度
    sudo yarn global list # 列出全局安装的模块
```

##### 10.管理 yarn 配置文件

```JS
 yarn coinfig
  yarn config set key value # 设置
    npm config set key value

    yarn config get key # 读取值
    npm config get key

    yarn config delete key # 删除
    npm config delete key

    yarn config list # 显示当前配置
    npm config list

    yarn config set registry https://      registry.npm.taobao.org
    yarn config set registry http://registry.cnpmjs.org
```

###### 设置淘宝镜像

```
    npm config set registry https://registry.npm.taobao.org # npm
     yarn config set registry http://registry.cnpmjs.org
```

##### 11.缓存

```JS
yarn cache
    sudo yarn cache list # 列出已缓存的每个包
    sudo yarn cache dir # 返回 全局缓存位置
    sudo yarn cache clean # 清除缓存
```

### 3、常见错误号

- EACCES (Permission denied)

  - An attempt was made to access a file in a way forbidden by its file access permissions.
  - 访问被拒绝

- EADDRINUSE (Address already in use)

  - An attempt to bind a server (net, http, or https) to a local address failed due to another server on the local system already occupying that address.
  - 地址正在被使用（比如：端口号备占用）

- EEXIST (File exists)

  - An existing file was the target of an operation that required that the target not exist.
  - 文件已经存在

- EISDIR (Is a directory)

  - An operation expected a file, but the given pathname was a directory.
  - 给定的路径是目录

- ENOENT (No such file or directory)

  - Commonly raised by fs operations to indicate that a component of the specified pathname does not exist -- no entity (file or directory) could be found by the given path.
  - 文件 或 目录不存在

* ENOTDIR (Not a directory)
  - A component of the given pathname existed, but was not a directory as expected. Commonly raised by fs.readdir.
  - 给定的路径不是目录

### 4、读取写入文件

##### 加载模块

    var fs=require('fs');

##### 写入文件

```js
    fs.writeFile(file, data[, options], callback);
    //参数1:file 要把文件写入到哪里(路径)
    //参数2:data 写入的数据
    //参数3:options 编码 默认:utf8（可选）
    //参数4:callback 回调函数:err
    var msg = '你好，世界';
    fs.writeFile('./data.txt', msg, function(err) {
    if (err) {
        throw err;
        console.log("写入成
        功");
    }
    });
```

##### 读取文件 readFire

```JS
     fs.readFile(path[, options], callback)
    //参数1:path 要把文件写入到哪里(路径)
    //参数2:options 编码 默认:utf8（可选）
    //参数3:callback 回调函数:err
```

##### path 模块

```js
__dirname //读取当前js所在的文件夹目录
//1. 加载 fs 模块
var fs = require('fs')
var path = require('path') //  path 模块 负责处理路径
path.join(a, b) //把a+b 安装路径的规则拼接起来
```

##### try...catch(捕获异常，抛出错误)

###### 代码: 同步 try .. catch

```js
// 一旦出错,后面的代码不执行了..

console.log(111)

try {
  var data = fs.readFileSync('./abcd.txt', 'utf8')

  console.log(data)
} catch (err) {
  // throw err
  console.log('读取时:' + err)
}

console.log(222)

//代码: 异步 try .. catch

console.log(111)

try {
  fs.readFile(file, 'utf8', function (err, data) {
    // 异步 try...catch
    // 如果正确: err 没有值  data 有值
    // 如果错误: err 有值 ,data 没有值
    // 不管怎么样,都会走这个回调方法,,, try catch 没有用
    console.log(333)
    console.log(data) // 不要拼字符串,会转化为字符串的
  })
} catch (err) {
  console.log(err)
}

console.log(222)
```

### 5、使用 Node.js 创建一个极简服务器

#### 1.加载 http 模块

```JS
    var http=require("http");
```

#### 2.创建服务器

```
    var server=http.createSever();
```

#### 3.监听 request

```js
    server.on("request",function(req,res){
      //参数1:req 请求过来的对象信息
      //参数2:res 服务器响应给浏览器的信息

      console.log("有人访问了");
      //告诉浏览器以什么格式解析内容  content-type 文本类型  text/plain 普通文本

       //mime.getType('.../XXX.css') -----> text/css

     //mime.getType('文件名/文件路径')  看中是 后缀名

    res.url.startsWith（）//选择以...开始的路径

      //设置响应头
      res.setHeader("content-type",mime.getType(reg.url));


      //设置不同url返回不同的响应文本
      if(req.url=='/'||req.url=='/index'){
      res.end("首页");
      }else if(req.url=='/login'){
      res.end("登录页");
      }else if(req.url=='/register'){
      res.end("注册页");
      }else{
      res.end("404 no found page")
      }

    });
```

#### 4.开启服务器

```
    server.listen(9000,function(){
    console.log("服务器开启了,请访问:http:/localhost:9000")
    });
```

### 6、request 对象

#### 1.request.headers 请求头对象

```js
      // 打印 request.headers
{ host: 'localhost:8080',
  connection: 'keep-alive',
    // 人家默认的,不要动它,,知道也没用,,也改变不了
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
    //User-Agent 告诉HTTP服务器， 客户端使用的操作系统和浏览器的名称和版本.

  'upgrade-insecure-requests': '1',//是否可使用更高的版本进行通信
  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    //浏览器端可以接受的媒体类型,
  'accept-encoding': 'gzip, deflate, br',
    // 浏览器申明自己接收的编码方法 通常指定压缩方法，是否支持压缩，支持什么压缩方法（gzip，deflate）
  'accept-language': 'zh-CN,zh;q=0.8,en;q=0.6'
 //浏览器申明自己接收的语言。
}
```

#### 2.request.rawHeaders-请求头(数组)

```JS
// 打印 request.rawHeaders
[ 'Host',
  'localhost:8080',
  'Connection',
  'keep-alive',
  'Cache-Control',
  'max-age=0',
  'Upgrade-Insecure-Requests',
  '1',
  'User-Agent',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36',
  'Accept',
  'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  'Accept-Encoding',
  'gzip, deflate, br',
  'Accept-Language',
  'zh-CN,zh;q=0.8,en;q=0.6' ]
```

#### 3.request.httpVersion-http 版本

#### 4.request.method-请求方式（get/post）

#### 5.request.url-请求 url 路径

### 7.response 对象

#### 1.response.write(data[,encoding][,callback])

- 参数 1:要写入的数据，可以是字符串或二进制数据(必填) string|Buffer
- 参数 2:编码，默认是 utf8；选填
- 参数 3:回调函数;选填

#### 2.response.end(data[,encoding][,callback])

- 参数 1:结束响应前要发送的数据, 选填 string |Buffer
- 参数 2: 编码, 选填
- 参数 3: 回调函数, 选填

#### 3.response.setHeader(name, value) — 设置响应报文头 (★★)

    //告诉浏览器解析文本是以什么格式解析,又以什么编码格式解析

#### 4.response.statusCode — 设置或者读取 http 状态码

#### 5.response.statusMessage — 设置或读取 http 响应状态消息

#### 6.response.writeHead(statusCode [, statusMessage]\_[, headers]) — 设置响应头信息 (★)

- 参数 1: 状态码
- 参数 2: 状态信息
- 参数 3: 响应头

```JS
        // 示例代码：
    res.writeHead(200, 'OK', {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': Buffer.byteLength(msg)
    });
```

- 1.res.end() 放在最后;
- 2.setHeader/statusCode/statusMessage 和 writeHead(statusCode [, statusMessage]\_[, headers]) 最好只使用一个
- 3.setHeader() 最好放在最前

### 8、url 模块

#### 内置模块 url ,转化 包含查询字符串的 req.url

```js
      var URL = require('url')

      URL.parse(req.url)  -> query 依然是查询字符串

      URL.parse(req.url,true)  -> query 才是一个 url 对象

     //如果为 `true`，则 `query 属性`总会通过 querystring 模块的 parse() 方法生成一个`对象`。
    //如果为 `false`，则返回的 URL 对象上的 query 属性会是一个`未解析、未解码的字符串`。
    //默认为` false。
```

#### 内置模块 queryString, 查询字符串 转化为对象

```JS
       var queryString =  require('queryString');

       querystring.parse(bodypost)
```

### 9、第三方模板:MIME

```JS
    //需要先安装
    npm i mime -s
      // 设置样式 (mime)
       mime.getType(req.url)
       得到的是文件类型如:text/html,text/plian,image/jpeg等
```

### 10、第三方模块:underscore

```JS
    var _=require('underscore');
    //_跟jquery中的$类似
```

- 使用 underscore 的步骤

#### 1.获取模板字符串

```js
var oldHtml = '<h1><%=name %></h1>'
```

#### 2.生成模板函数

```js
//参数:模板文件

//返回值:模板函数

var tplFn = _.template(oldHtml)
```

#### 3.传值

```js
//参数:对象

var newStr = tplFn({
  name: '乐福'
})
```

### 11、其他

#### 1. 读取文件如果发生错误,不需要 throw err ,因为这是做项目了

```js
if (err) {
  res.writeHead(404, 'Not Found')

  res.end('404 no found page')
}
```

#### 2. 处理大小写 因为 method = GET 和 POST

```js
//把url转换成小写
req.url = req.url.toLowerCase()

req.method = req.method.toLowerCase()
```

#### 3.数组转化为字符串

```js
JSON.stringify(list)
```

#### 4. 重定向

```js
res.statusCode = 301

res.statusMessage = 'Moved Permanently'

res.setHeader('Location', '/')

res.end() // 一定要加上这个
```

#### 5. 错误,又不是文件不存在的错误处理

```js
if (err && err.code !== 'ENOENT') {
  throw err
}
```

#### 6. 拼接 buffer 的传递

```js
    var bufferArr = [];

    req.on('data',function (chunk) {

      console.log('111')

      bufferArr.push(chunk);

    })

    req.on('end',function () {

      console.log('22')

     //把 buffer数组拼组成一个完整的 buffer

      var postBody =  Buffer.concat(bufferArr);

      postBody = postBody.toString();

      console.log(postBody);//title=44&url=444&text=444

      //4. 把字符串转化为对象

      postBody =  queryString.parse(postBody);

      postBody.id = list.length;

      list.push(postBody);

    }
```

#### 7.注意,,不要在最后写 res.end(), 因是异步的因为结束响应,,就不会传了

```js
  ml_readData(function(data){

<!--

  })

  var  data = null;

 ...

 data = 13 -->

 console.log(data)



  })
```

### 12、node.js 模块

#### 1.模块分类

##### 核心模块(内置模块，原生模块):

- fs 读写文件
- http 创建服务并监听服务
- path 拼接路径
- url 解析 reg.url，设置参数 true，把 query 的查询字符串转化为对象啊 (/add?id=12&name='yaya')
- querystring 解析查询字符串 ( ? 后面的: id=2&name='xingge' )

#### 2.文件模块

    - 说明 : 根据文件路径引入的模块

```JS
    var a = require('./a');
```

    - 如果加载时,没有指定后缀名, 那么就按照如下顺序加载响应模块  ( 例如 :  require ( ' ./demo  ' ))
      - 1. .js
      - 2. .json
      - 3. .node (C/C++编写的模块)

#### 3.自定义模块(第三方模块)\*\*

- 说明 : 需要额外通过 npm 安装的模块 var mime = require('mime');
- mime 根据路径/文件 后缀名 转化为对应的样式( Content-Type) , (mime.getType() )
- underscore 模板引擎 : 给 html 文件赋值

### 13.require 加载模块顺序

#### 1.require('./test.js') ==> 如果是具体的文件名

- 直接根据给定的路径去加载模块,找到了,加载成功,找不到加载失败

#### 2.require('./test') ==> 不是具体的文件名

- 第一步: 根据指定的路径,依次添加文件后缀 .js、.json、.node 进行匹配,如果找不到匹配,执行第二步
- 第二步: 找不到会认为是 test 文件夹, 查找是否有 test 目录,, (尝试找 test 包)
- 找不到: 加载失败
- 找到了,依次在 test 目录下查找 package.json 文件（找到该文件后尝试找 main 字段中的入口文件）、index.js、index.json、index.node，找不到则加载失败

#### 3.不是, 那么就认为传入的是 模块名称,（比如：require('http')、require('mime')）

- 先从内置模块里找,找到说明是内置模块: 直接加载内置模块
- 不是内置模块
- 依次递归查找 node_modules 目录中是否有相应的包
- 从当前目录开始,依次递归查找所有父目录下的 node_modules 目录中是否包含相应的包

### 14、模块化步骤

- 1.创建模块
- 2.导出模块
  -     2-1 当前写什么内容?(对象里赋值)
  -     2.2 是否需要参数?
  -     2.3是否需要第三方模块和函数
- 3.加载模块
- 4.使用模块
-

### 15、如何编写模块:

- 1.当前模块要写什么内容? :内容

- 2.这些代码是否用到外部的数据?：参数

- 3.是否依赖模块 ( 第三方模块、内置模块、文件模块)和一起自定义方法 ——>简: 模块(函数)

  配置模块: config.js :

  - port
  - filename

  拓展模块: context.js

  - req.method
  - res.ml_render

  路由模块: router.js

  - 记得 urlObj
  - 一定要注意 内置模块, 别忘记加载
    - 把业务数据模块都引进来,后面提出去

  业务模块: handler.js

  - module.exports.index = function(req,res) {...}

  数据操作模块:

  服务模块: app.js

### 16、Express 模块

#### 1. 基本步骤

    - 安装:   npm i express -S    // 安装之前: 先npm init -y 初始化 package.json 文件
    - 加载:   var express = require('express')
    - 实例:   var app = express()      // 实例化 express 对象
    - 使用:   app.get()/app.use()/app.all() …. App.listen()

#### 2. 演示案例

##### 1. 加载 express

```JS
    var express = require('express');
```

##### 2. 实例

```JS
    var app = express();   //  (类似于创建一个 server 对象)
```

##### 3. 使用

- 参数 1: 路径
- 参数 2: 回调函数

```js
app.get('/', function (req, res) {
  res.end('Hello world')
})

// 开启服务器
app.listen(8080, function () {
  console.log('服务器开启了 http://localhost:8080')
})
```

#### 3. res.send() 和 res.end() 的异同 ?

- 相同点: 都能够结束响应,把内容响应给浏览器
- 不同点:

##### 1.send () 不乱码:

- res.send() 参数可以是 a Buffer object、a String , 还有 an object、an Array

##### 2.参数类型不同:

- res.send() 参数可以是 a Buffer object、a String , 还有 an object、an Array
- res.end() 参数类型只能是: Buffer 或者 String

  总结: 以后在 express 推荐使用: send() 发送 HTTP 响应;

#### 4. res 的其他几个常用的方法

##### res.redirect([status,] path) : 重定向

```js
res.redirect('https://www.baidu.com')
res.redirect(301, 'https://www.baidu.com')
//之前的
res.writeHead(301, 'Moved Permanently', {
  Location: '/'
})
```

##### res.sendFile(path [, options]\_[, fn]) 读取文件

```JS

    // 以前 : 读取文件并响应
      fs.readFile(path.join(__dirname,'./index.html'),function (err,data) {
    if (err) {
      throw err
    }
    res.end(data);
      })

    // 现在 :
    // 2.1 不需要回调函数 直接展示页面
    res.sendFile(path.join(__dirname,'./demo.html'))
    // 2.2 需要回调函数
    res.sendFile(path.join(__dirname,'./demo.html'),function (err) {
    if (err) {
      throw err
    }
    console.log('ok')
      })
```

##### res.status() : 设置状态

```JS
    res.status(404).send('文件不存在！');
```

#### 5. Express 中注册路由的方法

##### 方法一 : app.METHOD()类型固定,路径完全匹配

1. 基本用法

- Method 是一个 http 请求方法: 例如: get / post / put / delete 等等 - 1. 请求方式固定 - 2. 路径完全匹配

```js
// 参数1: 路径
// 参数2: callback 回调
app.get('/index', function (req, res) {
  res.send('index')
})
```

##### 方法二 : app.use() — (中间件一般与这个配合使用)

- 开头是: /index 就匹配
- 任意类型,路径开始相同就匹配

  - 1. 在进行路由匹配的时候,不限定方法,什么请求方法都可以
  - 2. 请求路径的第一部分只要与 /index 相等即可,,,并不要求请求路径 ( pathname ) 完全匹配

```js
app.use('/index', function (req, res) {
  res.send('hello 你好世界')
})
```

##### 方法三 : app.all()

- 任意类型, 路径完全匹配

  - 1.  不限定请求方法;
  - 2.  请求路径的 pathname 必须完全匹配;

```js
app.all('/index', function () {
  res.send('index')
})
```

#### 6. Express 处理静态资源

##### 1.使用 express 按照以前的逻辑写:

```js
//3. 注册路由
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './demo.html'))
})

// if(req.url.startWith('/public)) { 拼接路径 返回绝对路径的文件 }

// 处理静态资源
//app.use(path,callback)  //use 请求路径的第一部分只要与 path 路径匹配即可
app.use('/public', function (req, res) {
  res.sendFile(path.join(__dirname, './public/demo.css')) // 是异步的
})
```

##### 2.使用 express 的内置模块 express.static

- 通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。
- 将`静态资源文件所在的目录`作为参数传递给 `express.static 中间件`,就可以提供静态资源文件的访问了。

```js
    href="./public/demo.css"     src="./public/dog.jpg"


    // 因为1 express.static 是中间件 中间件也就是函数 所以,,可以替换后面的函数
     官网的话:

     app.use('/public',express.static());

    //因为2.上面说到`静态资源文件所在的目录`作为参数传,所以传目录
    // 目录:

    path.join(__dirname,'./public')
    app.use('/public',express.static(path.join(__dirname,'./public')));
```

##### 额外补充:

    1. 例如:静态文件叫: demo.css
       - ./demo.css  —> 请求路径的第一个部分是: /
       - ./public/demo.css  —> 请求路径的第一个部分是: /public
    2. express 中的 req.url 已经不是之前的那个了
       - /public/demo.css  —> http的 req.url = /public/demo.css
       - /public/demo.css  —> express的 req.url = /demo.css

#### 7.Express 的路由模块

- 配置

```js
//创建 router.js
module.exports = function (app) {
  app.get('/', function (req, res) {
    res.send('index')
  })
  app.get('/submit', function (req, res) {
    res.send('submit')
  })
}
// app.js 呢
var router = require('./router')
router(app)
```

    效果是能完成

    但是这样暴露了 app, , app 是个对象,,,,可以随时改里面的东西, 很不安全，所以: 使用 express 自带的路由类: express.Router()

```js
//创建 router.js
//1. 加载 express 和 router
var express = require('express')
var router = express.Router()

//2. 配置 router
router.get('/', function (req, res) {
  res.send('index')
})
router.get('/submit', function (req, res) {
  res.send('submit')
})

//3. 导出 router
module.exports = router

// app.js
var router = require('./router') //加载

// 路由 挂载到 app 上
// app.use([path,] fn)
// app.use('/' fn)
app.use(router)
```

##### Express 的读取页面和传值问题??

```js
module.exports.index = function (req, res) {
  //1. 读取页面  正常读取网页没有问题
  //2. 但是  无法传值
  res.sendFile(path.join(__dirname, './views/index.html'), function (err) {
    if (err) {
      throw err
    }
  })

  //2. res.render() 配合 ejs 这个模板引擎使用
  res.render('index', { name: ' 哈' })
}
```

#### 8.Express 中的 res.render() 配合 ejs 模板引擎

##### 一、使用后缀.ejs 模板的步骤:

```js
    //1. app.js 模块
    //配置使用 ejs 模板引擎
    // 配置 express 使用 ejs 引擎
    // 配置模板引擎要放到正式处理请求之前,否则可能不能用
    // 当使用 esj 模板引擎的时候,模板文件的后缀必须是 .ejs
    //1. 安装 esj:
       `npm i ejs -SD`
    //2. 配置
    //   - 告诉 express 模板文件的目录
    //    + views 是固定的
    //   - 告诉 express 要使用的模板引擎
    app.set('views', path.join(__dirname,'./views'))
    app.set('view engine','ejs');

    //2. handler.js 模块  ---前提: 在 views 下创建一个 test.ejs 文件
     // 测试 views/test.ejs 已经 ok
      res.render('test',{name:' 星哥'})

    //3. test.ejs
     <h1><%= name %></h1>
```

##### 二、 使用后缀 .html 的模板

```js
    //1. app.js 模块
    // 配置使用 ejs 模板引擎 , 修改默认查找的模板文件后缀为.html
    //1. 设置模板文件的目录
    app.set('views',path.join(__dirname,'./views'));
    //2. 创建一个自己的模板引擎, 用来识别后缀是 html 的
    // 把渲染 esj 的功能都交给渲染 html 后缀的模板引擎上
    app.engine('html',require('ejs').renderFile);

    //3. 使用模板引擎
    app.set('view engine','html')

    //2. handler.js 模板
     //要把 .ejs 全部变为 .html 才可以啊
      res.render('test01',{age:90})

    //3. test01.html  是 views 目录下创建的模板
    <h1><%= age %></h1>
```

### 17.模板引擎 - ejs :

- esj [官网](https://www.npmjs.com/package/ejs)
- 说明: express 里可以渲染文件 res.sendFile(),,但是不能传值,所以放弃使用;

#### ejs 基本使用

- 1. 安装: npm i ejs -S
- 2. 加载: var ejs = require('ejs')
- 3. 使用: 官网提供:

```js
    // Example
    <% if (user) { %>
      <h2><%= user.name %></h2>
    <% } %>

    // Usage
    // 方法一:(适用于 html 代码片段)
    var template = ejs.compile(str, options);
    template(data);    // 返回一个新的 html
    // => Rendered HTML string
```

##### 方法一:

```js
//html 片段
var oldHtml = '<h1><%= name %></h1>'

//模板函数
var template = ejs.compile(oldHtml)

//传值
var newHtml = template({ name: '哈哈' })

console.log(newHtml)
```

##### 方法二:

```js
ejs.render(str, data, options) // 返回一个新的 html
// => Rendered HTML string

//html 片段
var oldHtml = '<h1><%= name %></h1>'

// 渲染并赋值
var newHtml = ejs.render(oldHtml, { name: '哈' })

console.log(newHtml)
```

##### 方法三:

```js
ejs.renderFile(filename, data, options, function (err, str) {
  //str 就是新的 html
  // str => Rendered HTML string
})

/// 方法四:
ejs.renderFile(
  path.join(__dirname, './index.html'),
  { title: '这是标题', name: ' 星哥' },
  function (err, str) {
    console.log(str) // 新的 html
  }
)
```

- index.html 代码

```html
<body>
  <% for ( var i = 0;i < 5; i++ ) { %>

  <li><%= name %></li>

  <% } %>
</body>
```

##### 案例

```js
     xxxxxxxxxx /** * 使用 ejs 后缀 */
     var express = require('express')var app = express();
     //1. 告诉程序 模板文件放在什么地方

     app.set('views',path.join(__dirname,'./Views'))

     //2.自定义自己的模板引擎

     app.engine('html',require('ejs').renderFile)

    //2. 使用引擎

    app.set('view engine','html')

    //注册路由
    app.get('/',function (req,res) {
    // 直接写 views 下的文件名就可以

    res.render('demo',{name:' 牛逼'})})

    //开启服务器

    app.listen(9090,function () {  console.log('开启了 http://localhost:9090')})
```

#### 17. webpack (拓展) 不要紧张

- 4.1 隔行变色 --> import (不能: 浏览器不识别) --> webpack

- 4.2 全局 webpack : npm i webpack -g

- 4.3 webpack 要处理的文件 处理之后的文件

- 4.4 webpack + webpack.config.js

```JS
    // entry :  要处理的文件

    entry: path.join(__dirname,'./src/js/main.js');

    //output: 处理之后的文件

    output:{

      path:path.join(__dirname,'./dist'),

      filename:'bundle.js'

    }
```

    4.5 实时构建

    安装:  npm  i webpack-dev-server webpack -S

    配置:  package.json --> "dev":"webpack-dev-server"

    用: npm  run dev

    --contentBase src : 进入到 src 文件目录下

    --open   自动打开浏览器

    bundle.js 放到 根目录下,, src='bundle.js'

    4.6 html 放到内内存中

    //1. 快

    //2. bundle.js 不需要我们引入

    安装:  npm  i html-webpack-plugin -S

    加载: var htmlwebpackplugin =  require('html-webpack-plugin');

    配置:

```JS
    webpack.config.js

    plugins:[

      new  htmlwebpackplugin({

    template:path.join(__dirnam,'./src/index.html'), // 来源
    filename:'index.html'   //内存中的名字

      })

    ]
```
