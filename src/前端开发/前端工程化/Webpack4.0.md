---
title: Webpack4.0
tag: 前端工程化
date: 2018-08-08
category: 前端开发
---

## Update

### 1.环境支持：

官方宣布不再支持 Node 4, Node 6，使用的是 v8 5.0 版本，支持 93%的 ES6 语法。因为 webpack4 使用了很多 JS 新的语法，它们在新版本的 v8 里经过了优化。

### 2.0 配置:

受 Parcel 打包工具启发，尽可能的让开发者运行项目的成本变低。webpack4 不再强制需要 webpack.config.js 作为打包的入口配置文件了，它默认的入口为'./src/'和默认出口'./dist'，这对于小项目来说确实是一件不错的事情。

### 3.Mode:

webpack 需要设置 mode 属性，可选 development 或 production。

```json
"scripts": {
  "dev": "webpack --mode development",
  "build": "webpack --mode production"
}

```

development 模式特性:

```
a.浏览器调试工具
b.注释、开发阶段的详细错误日志和提示
c.快速和优化的增量构建机制
```

production 模式特性:

```
a.开启所有的优化代码
b.更小的bundle大小
c.去除掉只在开发阶段运行的代码
d.Scope hoisting和Tree-shaking

```

### 4.插件变化:

webpack4 删除了 CommonsChunkPlugin 插件，它使用内置 API optimization.splitChunks 和 optimization.runtimeChunk，即 webpack 会默认为你生成共享的代码块。

### 5.开箱即用:WebAssembly(笔者暂时未使用)

## Use

### 1.配置项:

- Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
- Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
- Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
- Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
- Plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
- Output：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。

### 2.启动命令:

执行 webpack --mode development 会去全局找 webpack 包，如果没有安装的话会告诉你 bash: webapck: command not found。解决方案：
**使用 npx 即 npx webpack development（ npm 5.2.0 版本支持的一个工具）[详细介绍](https://www.npmjs.com/package/n)在 package.json 中配置 scripts**

```json

"scripts": {
    "build": "webpack --mode development",
    "dev": "webpack-dev-server --open --mode development"
  },

```

### 3. 实例

上述在 scripts 我们已经配好了 webpack-dev-server，它是开发时的一个服务器，把打包的文件全部放入内存中，可以热更新，热替换等方便我们开发。

```js
npm i webpack-dev-server ---save-dev

```

完整简单配置：

```js
const path = require('path')
module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    //配置此静态文件服务器，可以用来预览打包后项目
    contentBase: path.resolve(__dirname, 'dist'), //开发服务运行时的文件根目录
    host: 'localhost', //主机地址
    port: 9090, //端口号
    compress: true //开发服务器是否启动gzip等压缩
  }
}
```

### 4.css 文件处理

css-loader 用来解析处理 CSS 文件中的 url 路径,要把 CSS 文件变成一个模块,style-loader 可以把 CSS 文件变成 style 标签插入 head 中。执行顺序从右向左依次执行，先走 css-loader，再走 style-loader.

```js
npm i style-loader css-loader ---save-dev
rules: [
        {
        test:/\.css$/,
        loader:['style-loader','css-loader']
        }
    ]

```

### 5.产出 html

```js
npm i html-webpack-plugin ---save-dev
plugins:[
    new HtmlWebpackPlugin({
        template: path.resolve(__dirname,'src','index.html'),//模板
        filename:'index.html',
        hash:true,//防止缓存
        minify:{
        removeAttributeQuotes:true//压缩 去掉引号
        }
    })
],

```

### 6.提取 css 文件为单独文件

不是像上面直接打包进入 js 中,注意 extract-text-webpack-plugin 必须下载 next 版本 不然不支持 webpack4

```js
npm install --save-dev extract-text-webpack-plugin@next
 rules: [
        {
        test:/\.css$/,
        // loader:['style-loader','css-loader']
        use:ExtractTextWebapckPlugin.extract({
            use:'css-loader'
        })//不再需要style-loader

        }
    ]
new ExtractTextWebapckPlugin('css/index.css')

```

### 7.sass less 文件处理

```js
npm i less less-loader ---save-dev
npm i node-saas sass-loader ---save-dev
const lessExtract = new ExtractTextWebapckPlugin('css/less.css');
const sassExtract = new ExtractTextWebapckPlugin('css/sass.css');
 {
    test:/\.less$/,
    use:lessExtract.extract({
    use: ['css-loader','less-loader']
    })
},
{
    test:/\.scss$/,
    use: sassExtract.extract({
    use:['css-loader','sass-loader']
    })
}

```

### 8.babel 转换 js

```js
npm i babel-core babel-loader babel-preset-env babel-preset-stage-0 --save-dev
{
    test: /\.js/,
    use: {
    loader: 'babel-loader',
    query: {
        presets: ["env", "stage-0"]
    }
}

```

### 9.常用的三种加载图片的方式

- css 中引入

```css
body {
  color: red;
  background: url(./images/002.jpg) no-repeat;
}
```

- js 动态引入

```js
let imgSrc = require('./images/002.jpg')
let img = new Image()
img.src = imgSrc
document.body.appendChild(img)
```

- html img 标签

```html
<img src="./images/002.jpg" alt="" />
```

前两种 使用 file-loader（ 解决 CSS 等文件中的引入图片路径问题） url-loader（当图片较小的时候会把图片 BASE64 编码，大于配置的 limit 参数的时候还是使用 file-loader 进行拷贝）

```js
npm i file-loader url-loader --save-dev
{
test:/\.(jpg|png|gif|svg)$/,
use:'url-loader',
include:path.join(__dirname,'./src'),
exclude:/node_modules/
}
```

第三种使用 html-withimg-loader 进行处理

```js
  npm i html-withimg-loader --save-dev
{
    test:/\.(html|htm)$/,
    use:'html-withimg-loader'
}

```

### 10.多入口问题: 数组的模式并不是多入口，一下入口最终只生成一个 js

```js
entry: [path.resolve(__dirname, 'src', 'index.js'),path.resolve(__dirname, 'src', 'base.js')],

```

多入口的正确写法是对象的形式，以下入口会产出两个 js 文件

```js
entry:{
    index:'./src/index.js',
    base:'./src/base.js'
},

```

多入口对应的 html 加载模块用 chunk 区分

```js
 new HtmlWebpackPlugin({
    template: path.resolve(__dirname,'src','index.html'),
    filename:'index.html',
    chunks:['index'],
    hash:true,//防止缓存
    minify:{
    removeAttributeQuotes:true//压缩 去掉引号
    }
}),
new HtmlWebpackPlugin({
    template: path.resolve(__dirname,'src','index.html'),
    filename:'base.html',
    chunks:['base'],
    hash:true,//防止缓存
    minify:{
    removeAttributeQuotes:true//压缩 去掉引号
    }
}),

```

加入两个文件都需要引入一个第三方库，比如 lodash，这时候我们再每个模块内部都需要引入一下，因此打包的时候每个入库都会把 lodash 打包进去，文件变得很大，这时候我们可以把 lodash 变成一个入口文件，然后通过 webpack.ProvidePlugin 暴露变量，在 html 中 chunk 中引用，具体如下:

```js
entry:{
    index:'./src/index.js',
    base:'./src/base.js',
    vendor:'lodash'
}
new webpack.ProvidePlugin({
        _:'lodash'
})
new HtmlWebpackPlugin({
    template: path.resolve(__dirname,'src','index.html'),
    filename:'base.html',
    chunks:['base','vendor'],
    hash:true,//防止缓存
    minify:{
    removeAttributeQuotes:true//压缩 去掉引号
    }
}),

```

我们也可以通过 expose-loader 向全局暴露一个对象

```js
let _ = require('expose-loader?_!lodash')
```

### 11.watch 监听文件打包变化，当文件变化时自动打包

```js
watch: true,
watchOptions: {
    ignored: /node_modules/, //忽略不用监听变更的目录
    aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
    poll:1000 //每秒询问的文件变更的次数
},

```

### 12.resolve 解析

- extensions 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。 resolve.extensions 用于配置在尝试过程中用到的后缀列表，默认是：
  extensions: ['.js', '.json']
- alias resolve.alias 配置项通过别名来把原导入路径映射成一个新的导入路径,
- modules resolve.modules 配置 Webpack 去哪些目录下寻找第三方模块，默认是只会去 node_modules 目录下寻找。 有时你的项目里会有一些模块会大量被其它模块依赖和导入，由于其它模块的位置分布不定，针对不同的文件都要去计算被导入模块文件的相对路径， 这个路径有时候会很长，就像这样 import '../../../components/button' 这时你可以利用 modules 配置项优化，假如那些被大量导入的模块都在 ./src/components 目录下，把 modules 配置成

```js
resolve: {
  modules: ['./src/components', 'node_modules']
}
```

后，你可以简单通过 import 'button' 导入。

- enforceExtension resolve.enforceExtension 如果配置为 true 所有导入语句都必须要带文件后缀， 例如开启前 import './foo' 能正常工作，开启后就必须写成 import './foo.js' 。
- enforceModuleExtension enforceModuleExtension 和 enforceExtension 作用类似，但 enforceModuleExtension 只对 node_modules 下的模块生效。 enforceModuleExtension 通常搭配 enforceExtension 使用，在 enforceExtension:true 时，因为安装的第三方模块中大多数导入语句没带文件后缀， 所以这时通过配置 enforceModuleExtension:false 来兼容第三方模块。
- mainFields 有一些第三方模块会针对不同环境提供几分代码。 例如分别提供采用 ES5 和 ES6 的 2 份代码，这 2 份代码的位置写在 package.json 文件里，如下：

```json
{
  "jsnext:main": "es/index.js", // 采用 ES6 语法的代码入口文件
  "main": "lib/index.js" // 采用 ES5 语法的代码入口文件
}
```

Webpack 会根据 mainFields 的配置去决定优先采用那份代码， mainFields 默认如下：

```js
resolve: {
  mainFields: ['browser', 'main']
}
```

Webpack 会按照数组里的顺序去 package.json 文件里寻找，只会使用找到的第一个。

假如你想优先采用 ES6 的那份代码，可以这样配置：

```js
resolve: {
  mainFields: ['jsnext:main', 'browser', 'main']
}
```

```js
resolve:{
    extensions: ["",".js",".css",".json"],
    alias: {
    //alias 还支持 $ 符号来缩小范围到只命中以关键字结尾的导入语句
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
},
```

### 13.压缩 js

让输出的 JS 文件体积更小、加载更快、流量更省，还有混淆代码的加密功能

```js
npm i uglifyjs-webpack-plugin --save-dev
//直接new一下即可
new UglifyjsWebpackPlugin()

```
