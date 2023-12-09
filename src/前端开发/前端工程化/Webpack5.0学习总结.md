---
title: Webpack5.0学习总结
tag: 前端工程化
date: 2022-03-20
category: 前端开发
---

# Webpack5.0 学习总结-基础篇

# 认识 Webpack

## Webpack 是什么?

Webpack 是一种前端资源构建工具，一个静态模块打包器。

- 前端资源构建工具：主要理解一下这个前端资源是哪些资源。这些前端资源就是浏览器不认识的 web 资源， 比如 sass、less、ts，包括 js 里的高级语法。这些资源要能够在浏览器中正常工作，必须一一经过编译处理。而 webpack 就是可以集成这些编译工具的一个总的构建工具。
- 静态模块打包器：静态模块就是 web 开发过程中的各种资源文件，webpack 根据引用关系，构建一个依赖关系图，然后利用这个关系图将所有静态模块打包成一个或多个 bundle 输出。

## 为什么我们需要 Webpack

回答这个问题，可以和还没有 Webpack、没有构建工具时对比一下，就能明显地感觉出来了。这里就来列举一下不使用构建工具时的痛点。

- web 开发时调用后端接口跨域，需要其他工具代理或者其他方式规避。
- 改动代码后要手动刷新浏览器，如果做了缓存还需要清缓存刷新。
- 因为 js 和 css 的兼容性问题，很多新语法学习了却不能使用，无论是开发效率和个人成长都受影响。
- 打包问题。需要使用额外的平台如 jekins 打包，自己编写打包脚本，对各个环节如压缩图片，打包 js、打包 css 都要一一处理。 ......

而这些问题，Webpack 都提供了解决方案，你只需要做一些简单的配置就可以上手使用了。当然，Webpack 做的还不止这些，下面就来一一介绍。

# 使用 Webpack

## Webpack 核心配置

这部分介绍 Webpack 常用配置，主要以代码和注释的形式说明。  
提醒一下，文章中写到的配置较少，详细配置可查看 Webpack 官方文档。特别是对于 loader 和 plugins，它们大部分是由第三方集成，内容经常会更新，所以在你需要使用到他们时，直接去对应官网里查找它们的集成和使用方法。

### entry

入口（entry）：指示 Webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图。

```js
module.exports = {
  // string方式： 单入口，打包形成一个chunk，输出一个buldle文件。chunk的名称默认是main.js
  entry: './src/index.js',
  // array方式：多入口，所有入口文件最终只会形成一个chunk，输出出去只有一个bundle文件
  entry: ['./src/index.js', './src/test.js'],
  // object：多入口，有几个入口文件就形成几个chunk，输出几个bundle文件。此时chunk的名称就是对象key值
  entry: {
    index: './src/index.js',
    test: './src/test.js'
  }
}
```

### output

输出（output）：指示 Webpack 打包后的资源 bundles 输出到哪里，以及如何命名。

```js
module.exports = {
  output: {
    // 输出文件目录（将来所有资源输出的公共目录，包括css和静态文件等等）
    path: path.resolve(__dirname, 'dist'), //默认
    // 入口文件名称（指定名称+目录）
    filename: '[name].js', // 默认
    // 所有资源引入公共路径前缀，一般用于生产环境，小心使用
    publicPath: '',
    /*
      非入口文件chunk的名称。所谓非入口即import动态导入形成的chunk或者optimization中的splitChunks提取的公共chunk
      它支持和 filename 一致的内置变量
    */
    chunkFilename: '[contenthash:10].chunk.js',
    clean: true, // 打包前清空输出目录，相当于clean-webpack-plugin插件的作用,webpack5新增。
    /* 当用 Webpack 去构建一个可以被其他模块导入使用的库时需要用到library */
    library: {
      name: '[name]', //整个库向外暴露的变量名
      type: 'window' //库暴露的方式
    }
  }
}
```

### loader

Loader：Webpack 自身只能理解 JavaScript 和 json 文件，loader 让 Webpack 能够处理其他文件。  
这里列举几类常见文件的 loader 配置。

```js
module.exports = {
  rules: [
    {
      // 匹配哪些文件
      test: /\.css$/,
      // 使用哪些loader进行处理。执行顺序，从右至左，从下至上
      use: [
        // 创建style标签，将js中的样式资源（就是css-loader转化成的字符串）拿过来，添加到页面head标签生效
        'style-loader',
        // 将css文件变成commonjs一个模块加载到js中，里面的内容是样式字符串
        'css-loader',
        {
          // css 兼容处理 postcss，注意需要在package.json配置browserslist
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              ident: 'postcss',
              // postcss-preset-env插件：帮postcss找到package.json中的browserslist配置，根据配置加载指定的兼容性样式
              plugins: [require('postcss-preset-env')()]
            }
          }
        }
      ]
    },
    {
      test: /\.js$/,
      // 注意需要在package.json配置browserslist，否则babel-loader不生效
      // js兼容处理 babel
      loader: 'babel-loader', // 规则只使用一个loader时推荐写法
      options: {
        presets: [
          [
            '@babel/preset-env', // 预设：指示babel做怎么样的兼容处理
            {
              useBuiltIns: 'usage', //按需加载
              corejs: {
                version: '3'
              },
              targets: 'defaults'
            }
          ]
        ]
      }
    },
    /*
    Webpack5.0新增资源模块(asset module)，它是一种模块类型，允许使用资源文件（字体，图标等）而无需     配置额外 loader。支持以下四个配置
    asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
    asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
    asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
    asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资     源体积限制实现。
    */
    // Webpack4使用file-loader实现
    {
      test: /\.(eot|svg|ttf|woff|)$/,
      type: 'asset/resource',
      generator: {
        // 输出文件位置以及文件名
        filename: 'fonts/[name][ext]'
      }
    },
    // Webpack4使用url-loader实现
    {
      //处理图片资源
      test: /\.(jpg|png|gif|)$/,
      type: 'asset',
      generator: {
        // 输出文件位置以及文件名
        filename: 'images/[name][ext]'
      },
      parser: {
        dataUrlCondition: {
          maxSize: 10 * 1024 //超过10kb不转base64
        }
      }
    }
  ]
}
```

### plugin

插件（plugins）：可以用于执行范围更广的任务。从打包优化和压缩，一直到重新定义环境中的变量等。

```js
module.exports = {
    // CleanWebpackPlugin帮助你在打包时自动清除dist文件，学习时使用比较方便
    // const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //从webpack5开始，webpack内置了该功能，只要在ouput中配置clear为true即可

    // HtmlWebpackPlugin帮助你创建html文件，并自动引入打包输出的bundles文件。支持html压缩。
    const HtmlWebpackPlugin = require("html-webpack-plugin");

    // 该插件将CSS提取到单独的文件中。它会为每个chunk创造一个css文件。需配合loader一起使用
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");

    // 该插件将在Webpack构建过程中搜索CSS资源，并优化\最小化CSS
    const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

    // vue-loader V15版本以上，需要引入VueLoaderPlugin插件，它的作用是将你定义过的js、css等规则应用到vue文件中去。
    const { VueLoaderPlugin } = require('vue-loader')

    module.exports = {
    module: {
        rules: [
        {
            test: /\.vue$/,
            loader: "vue-loader"
        },
        {
            test: /\.css$/,
            use: [
            // MiniCssExtractPlugin.loader的作用就是把css-loader处理好的样式资源（js文件内），单独提取出来 成为css样式文件
            MiniCssExtractPlugin.loader,//生产环境下使用，开发环境还是推荐使用style-loader
            "css-loader",
            ],
        },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
        template:"index.html"
        }),
        new MiniCssExtractPlugin({
        filename: "css/built.css",
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new VueLoaderPlugin(),
    ]
    }
}
```

### mode

模式（mode）:指示 Webpack 使用相应模式的配置。默认为 production。
搬一下官网的表格，还是有必要知道一下我们平常使用最多的两种模式，Webpack 都做了什么。

选项

描述

development

会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development. 为模块和 chunk 启用有效的名。

production

会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。为模块和 chunk 启用确定性的混淆名称，FlagDependencyUsagePlugin，FlagIncludedChunksPlugin，ModuleConcatenationPlugin，NoEmitOnErrorsPlugin 和 TerserPlugin 。

none

不使用任何默认优化选项

- DefinePlugin：定义全局变量 process.env.NODE_ENV，区分程序运行状态。
- FlagDependencyUsagePlugin：标记没有用到的依赖。
- FlagIncludedChunksPlugin：标记 chunks，防止 chunks 多次加载。
- ModuleConcatenationPlugin：作用域提升(scope hosting)，预编译功能，提升或者预编译所有模块到一个闭包中，提升代码在浏览器中的执行速度。
- NoEmitOnErrorsPlugin：防止程序报错，就算有错误也继续编译。
- TerserPlugin：压缩 js 代码。

### 其他常用配置

```js
module.exports = {
  // 解析模块的规则：
  resolve: {
    // 配置 解析模块路径别名：可简写路径。
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    // 配置 省略文件路径的后缀名。默认省略js和json。也是webpack默认认识的两种文件类型
    extensions: ['.js', '.json', '.css'], // 新加css文件
    // 告诉webpack解析模块是去找哪个目录
    // 该配置明确告诉webpack，直接去上一层找node_modules。
    modules: [path.resolve(__dirname, '../node_modules')]
  },
  // devServer（开发环境下配置）：
  devServer: {
    // 运行代码的目录
    contentBase: path.resolve(__dirname, 'build'),
    // 为每个静态文件开启gzip压缩
    compress: true,
    host: 'localhost',
    port: 5000,
    open: true, // 自动打开浏览器
    hot: true, //开启HMR功能
    // 设置代理
    proxy: {
      // 一旦devServer(5000端口)接收到/api/xxx的请求，就会用devServer起的服务把请求转发到另外一个服务器（3000）
      // 以此来解决开发中的跨域问题
      api: {
        target: 'htttp://localhost:3000',
        // 发送请求时，请求路径重写：将/api/xxx  --> /xxx （去掉/api）
        pathRewrite: {
          '^api': ''
        }
      }
    }
  },

  // optimization（生产环境下配置）
  optimization: {
    // 提取公共代码
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      // 配置生产环境的压缩方案：js和css
      new TerserWebpackPlugin({
        // 多进程打包
        parallel: true,
        terserOptions: {
          // 启动source-map
          sourceMap: true
        }
      })
    ]
  }
}
```

## webpack 打包优化

### 开发环境优化

##### 一、 使用 source-map

source-map：一种提供源代码到构建后代码映射的技术，如果构建后代码出错了，通过映射可以追踪源代码错误。优化代码调试。
开启 source-map 配置很简单：devtool:"source-map"。source-map 的值有多种类型，简单解释下。
source-map 各选项常用组成：inline|eval|cheap|cheap-module

- inline：内联，一个 chunk 生成一个总的 source-map
- eval：内联，每一个文件生成一个 source-map
- cheap：外部，报错位置只能精确到行。
- cheap-module：显示第三方库的 source-map

内联和外部的区别： 内联不生成 map.js 文件，而是通过 data-url 的形式直接注入到 chunk 里；内联构建速度更快。

##### 二、 HMR（模块热替换）

devServer 启动一个代理服务器。启动过后修改代码就会自动刷新浏览器了，但这个并不是 HMR。
HMR：模块热替换，也可以理解为局部替换。替换、添加或删除 模块，而无需重新加载整个页面。如下配置开启 HMR

```js
module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true //开启HMR功能
  },
  // 注意：Webpack升级到5.0后，target默认值值会根据package.json中的browserslist改变，导致devServer的自动更新失效。所以development环境下直接配置成web。
  target: 'web'
}
```

开启 HMR 后，还需要进行一些配置才能生效。

- 样式文件：style-loader 内部实现，所以只要 loader 中配置了 style-loade 就可直接使用 HMR 功能
- vue 文件：vue-loader 内部实现，同理配置 vue-loader 直接使用 HMR。
- js 文件：需要修改源代码，接收更新通知，代码如下

```js
module.exports = {
  import test from "./test.js"
  if(module.hot){
    module.hot.accept()
  // module.hot.accept("./test.js",()=>{
  // console.log('Accepting the updated test module!');
  // })
  }
```

当 test 文件被改动时，更新事件会一层层往上传递，直到传递到入口文件中。而在传递的过程中，任何地方接收了这个更新事件，即上面的 module.hot.accept 方法，就会停止传递，执行回调。如果一直未接收，最后就会通知 Webpack 刷新整个页面。

### 生产环境优化

##### 一、 oneOf

默认情况下，文件会去匹配 rules 下面的每一个规则，即使已经匹配到某个规则了也会继续向下匹配。而如果将规则放在 oneOf 属性中，则一旦匹配到某个规则后，就停止匹配了。

```js
module.exports = {
    rules:[
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
    },
    {
        //  以下loader一种文件只会匹配一个
        oneOf: [
        // 不能有两个配置处理同一种类型文件，如果有，另外一个规则要放到外面。
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
            {
                loader: "babel-loader",
            },
            ],
        },
        {
            test: /\.css$/,
            use: [
            "style-loader",
            "css-loader",
            ],
        },
        ],
    },
    ]

```

放在 oneOf 属性中的规则只会匹配成功一次，所以如果有一种类型的文件需要使用多个 loader，要么使用 use 数组，要么放到 oneOf 之外。

##### 二、 缓存

在编译打包时可对文件做缓存，有两种方式，一种是解析文件的 loader 自身带有缓存功能（如 babel-loader,vue-loader），第二种就是使用专门的 loader（cache-loader）。
开启缓存后，对于未改动的文件，webpack 直接从缓存中读取而不用再次编译，大大加快构建速度。

```js
module.exports = {
  rules: [
    {
      test: /\.js$/,
      use: [
        //使用cache-loader，放在babel-loader前可对babel编译后的js文件做缓存。
        'cache-loader',
        {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env' // 预设：指示babel做怎么样的兼容处理
              ]
            ],
            // 开启babel缓存，第二次构建时，会读取之前的缓存。
            cacheDirectory: true
          }
        }
      ]
    }
  ]
}
```

上方配置是对文件的编译做了缓存，webpack5 提供了 cache 配置项，可对最终输出的 trunk 和模块进行缓存。具体配置如下

```js
module.exports = {
  cache: {
    type: 'filesystem', //保存位置，开发环境下默认为memory类型，生产环境cache配置默认是关闭的。
    buildDependencies: {
      config: [__filename]
    }
  }
}
```

##### 三、 多进程打包（thread-loader）

一般只有在编译花费时间较长时才需要使用 thread-loader，因为这个 loader 启动和通信都是有开销的，如果时间较短，使用这个 loader 就得不偿失了。

```js
module.exports = {
  // "thread-loader"放在babel-loader前，就会在babel-loader工作时进行多进程工作。
  rules: [
    {
      loader: 'thread-loader',
      options: {
        workers: 2 // 启动进程个数，默认是电脑cpu核数-1
      }
    },
    {
      loader: 'babel-loader',
      options: {
        presets: [['@babel/preset-env']]
      }
    }
  ]
}
```

##### 四、 外部扩展(externals)

externals 用来告诉 Webpack 要构建的代码中使用了哪些不用被打包的模块，这些模块可能是通过外部环境（如 CDN）引入的。

```js
module.export = {
  externals: {
    // 把导入语句里的 jquery 替换成运行环境里的全局变量 jQuery
    jquery: 'jQuery'
  }
}

// 源代码
import $ from 'jquery'
```

配置了 externals 后，即使你代码中引入了这个库，Webpack 也不会将库打包进 bundle，而是直接使用全局变量。

##### 五、 DLL

dll（动态链接库）：使用 dll 技术对公共库进行提前打包，可大大提升构建速度。公共库一般情况下是不会有改动的，所以这些模块只需要编译一次就可以了，并且可以提前打包好。在主程序后续构建时如果检测到该公共库已经通过 dll 打包了，就不再对其编译而是直接从动态链接库中获取。 实现 dll 打包需要以下三步：

1.  抽取公共库，打包到一个或多个动态链接库中。
2.  将打包好的动态链接库在页面中引入。
3.  主程序使用了动态链接库中的公共库时，不能被打包入 bundle，应该直接去动态链接库中获取。

针对这个步骤的代码

1 新建一个 webpack.dll.js 用来提前打包动态链接库

```js
// webpack.dll.js
module.exports = {
  // JS 执行入口文件
  entry: {
    // 把 vue 相关模块的放到一个单独的动态链接库
    vendor: ['vue', 'axios'],
    // 其他模块放到另一个动态链接库
    other: ['jquery', 'lodash']
  },
  output: {
    // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称（"vendor"和"other"）
    filename: '[name].dll.js',
    // 输出的文件都放到 dist 目录下的dll文件夹中
    path: path.resolve(__dirname, 'dist', 'dll'),
    // 存放动态链接库的向外暴露的变量名，例如对应 vendor 来说就是 _dll_vendor
    library: '_dll_[name]'
  },
  plugins: [
    //  打包生成一个mainfest.json文件。告诉webpack哪些库不参与后续的打包，已经通过dll事先打包好了。
    new webpack.DllPlugin({
      // 动态链接库的库名，需要和 output.library 中保持一致
      // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
      // 例如 vendor.manifest.json 中就有 "name": "_dll_vendor"
      name: '_dll_[name]',
      // 描述动态链接库的 manifest.json 文件输出时的文件名称
      path: path.join(__dirname, 'dist', 'dll', '[name].manifest.json')
    })
  ]
}
```

2.  在模板页 index.html 中引入打包好的动态链接库

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Webpack</title>
    <script src="./dll/vendor.dll.js"></script>
    <script src="./dll/other.dll.js"></script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

3.  在主程序的 Webpack 配置中使用 webpack.DllReferencePlugin 插件，读取 webpack.DllPlugin 生成的 manifest.json 文件，从中获取依赖关系。

```js
// webpack.config.js
module.exports = {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    // 告诉 Webpack 使用了哪些动态链接库
    new webpack.DllReferencePlugin({
      // manifest 文件告诉 webpack 哪些库已经通过 dll 事先打包好了，后续构建直接去动态链接库里获取。
      manifest: path.resolve(__dirname, 'dist', './dll/vendor.manifest.json')
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dist', './dll/other.manifest.json')
    })
  ]
}
```

##### 六、 Tree Shaking(树摇)

Tree Shaking(树摇)：移除 JavaScript 上下文中的未引用代码(dead-code)。将整个应用程序想象成一棵树，绿色的树叶表示实际用到的 source code（源码）和 library（库），灰色的树叶则表示未被使用的代码，是枯萎的树叶。为了除去这些死去的无用的树叶，你需要摇动这棵树使其落下。这就是 Tree Shaking 的名称由来。

```js
// 入口文件index.js
import test from './test.js'
console.log(test.add(2, 3))

// 测试文件test.js
const add = (x, y) => x + y
const print = msg => {
  console.log(msg)
}
export default { add, print }

// 最终打包输出的bundle：main.js文件
!(function () {
  'use strict'
  console.log(2 + 3)
})()
```

从上面示例可以看出，index.js 中虽然引入了 test 文件，但是因为 test 文件暴露的 print 方法没有被使用，所以在最终打包中被去除。
这一点在 Webpack4 中还做不到，Webpack4 中只会去除从未被使用的模块。带入上面的例子，如果 test 在 index.js 文件中没有被用到，才会被 Tree Shaking。之所以这样，是因为 Webpack4 默认认为所有文件的代码都是有副作用的。如何告知 Webpack 你的代码是否有副作用，可通过 package.json 中的 sideEffects 字段。

```js
module.exports = {
    // 所有文件都有副作用
    {
     "sideEffects": true
    }
    // 所有文件都没有副作用，
    {
     "sideEffects": false
    }
    // 只有这些文件有副作用，所有其他文件都可以 Tree Shaking，但会保留这些文件
    {
     "sideEffects": [
      "./src/file1.js",
      "./src/file2.js"
     ]
    }
}
```

比如说 Webpack5.0 默认设置中认为样式文件是有副作用的，所以引入样式文件虽然没有被使用（样式文件肯定是不使用的）也不会被去除，但是如果设置了 sideEffects：false，就会进行 Tree Shaking 将代码去除。
说了这么多，到底怎么设置 Tree Shaking？其实不用特别配置，只要将 mode 设置为"production"，Webpack 就自动启用 Tree Shaking 了。有两点说明下：

- 源代码必须使用 静态的 ES6 模块化语法。原因是 Webpack 在构建时通过静态分析，分析出代码之间的依赖关系。而动态导入如 require 语法只有在执行时才知道导入了哪个模块，所以无法做 Tree Shaking。
- 三方库无法做 Tree Shaking。原因猜测是 Webpack 无法保证三方库导入是否会直接对程序产生影响。

##### 七、 Code Split（代码分割）

Webpack 默认会将所有依赖的文件打包输出到一个 bundle.js 中（单入口时），当应用程序逐渐复杂，这个 bundle.js 文件也会越来越大，浏览器加载的速度也会越来越慢，所以就需要使用代码分割来将不同代码单独打包成不同 chunk 输出。主要有两种方法

一、 通过 optimization 将公共代码单独打包成 chunk

```js
module.exports = {
  optimization: {
    splitChunks: {
      // 选择哪些 chunk 进行优化，默认async，即只对动态导入形成的chunk进行优化。
      chunks: 'all',
      // 提取chunk最小体积
      minSize: 20000,
      // 要提取的chunk最少被引用次数
      minChunks: 1,
      // 对要提取的chunk进行分组
      cacheGroups: {
        // 匹配node_modules中的三方库，将其打包成一个chunk
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          // chunk名称
          name: 'vendors',
          priority: -10
        },
        default: {
          // 将至少被两个chunk引入的模块提取出来打包成单独chunk
          minChunks: 2,
          name: 'default',
          priority: -20
        }
      }
    }
  }
}
```

二、 import 动态导入
当想要根据业务拆分 bundle 时推荐用这种方式。import 动态导入的模块 Webpack 会将其作为单独的 chunk 打包。

```js
import(/* webpackChunkName: 'test' */ './test.js')
  .then(result => {
    console.log(result)
  })
  .catch(() => {
    console.log('加载失败！')
  })
```

# Webpack5.0 学习总结-进阶篇

# 窥探 webpack 原理

## 如何开发一个 loader

loader 本质上是一个函数，它的作用就是将匹配到的源文件内容做一些处理然后输出。当某个规则使用了多个 loader 处理时，就会按照从下往上的顺序依次执行，后一步拿到的都是前一步处理完成的内容。可以理解为链式调用。所以开发 loader 时，最要关心的就是它的输入与输出。  
下面就用实例分步介绍开发一个 loader 的过程

1.  在 webpack 配置文件中引入自己编写的 loader，并在某个规则中使用。
2.  编写自定义 loader。
3.  对比 loader 使用前后，bundle 文件（main.js）的差异，验证 loader 效果。

首先明确下编写的这个 loader 想要实现什么功能。本示例中，简单实现删除 js 注释的功能，以此来介绍 loader 编写流程。

### 一、 配置文件中引入 loader

在 webpack.config.js 中引入 loader，这里说明一下 resolveLoader，它的作用是配置 loader 的查找路径，若未配置 resolveLoader，rules 中的 loader 参数，需要填写完整的 loader 文件路径。

```js
// webpack.config.js

const path = require('path')
module.exports = {
  mode: 'none', //mode设置为none，不启用任何默认配置，防止Webpack自动处理干扰loader效果。
  /* 解析loader的规则 */
  resolveLoader: {
    // loader查找路径，默认是node_modules,所以我们平常写loader（如babel-loader）时实际都会去node_modules里找
    modules: ['node_modules', path.resolve(__dirname, 'loaders')] // 增加查找路径。顺序是从前往后
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // 因为配置了resolveLoader，在loaders文件夹下找到了myLoader
        loader: 'myLoader',
        options: {
          oneLine: true, // 是否删除单行注释
          multiline: true // 是否删除多行注释
        }
      }
    ]
  }
}
```

### 二、 编写自定义 loader

```js
// myLoader.js

module.exports = function (source) {
  // Webpack5.0开始，不在需要使用工具获取option了
  // 获取到webpack.config.js中配置的options
  let options = this.getOptions()
  let result = source
  // 默认单行和多行注释都删除
  const defaultOption = {
    oneLine: true,
    multiline: true
  }
  options = Object.assign({}, defaultOption, options)
  if (options.oneLine) {
    // 去除单行注释
    result = result.replace(/\/\/.*/g, '')
  }
  if (options.multiline) {
    // 去除多行注释
    result = result.replace(/\/\*.*?\*\//g, '')
  }
  // loader必须要有输出，否则Webpack构建报错
  return result
}
```

### 三、 对比打包输出的 bundle，验证 loader 效果。

为了让对比更清晰简洁，源代码 index.js 中的内容非常简单。

- 源代码

```js
// index.js

;/_ 增加多行注释，用于测试 _/
const x = 100
let y = x // 行内单行测试
// 单行注释测试
console.log(y)
```

- 未使用 loader 时的输出文件，可以看到源代码中的注释都保留着。

```js
  // main.js

  /**\*\***/ (function() { // webpackBootstrap
  var **webpack_exports** = {};
  /_ 增加多行注释，用于测试 _/
  const x = 100;
  let y = x; // 行内单行测试
  // 单行注释测试
  console.log(y);

  /**\*\***/ })()
  ;

```

- 使用 loader 时的输出文件，很明显源代码中的注释都被删除了，loader 生效。

```js
  // main.js

  /**\*\***/ (function() { // webpackBootstrap
  var **webpack_exports** = {};

  const x = 100;
  let y = x;

  console.log(y);

  /**\*\***/ })()
  ;

```

以上就是编写一个 loader 的基本过程，还有几点补充说明下：

- options 参数校验：可以使用三方库 schema-utils 对 options 设置的参数进行校验。
- 同步和异步：loader 分为同步 loader 和异步 loader，上文写的是同步 loader。而有些场景下可能需要使用异步 loader。如下所示：

```js
module.exports = function (source) {
  // 生成一个异步回调函数。
  const callback = this.async()
  setTimeout(() => {
    // 回调函数的第一个参数是错误信息，第二个参数为输出结果，第三个参数是 source-map
    callback(null, source)
  }, 1000)
}
```

- 在开发一个 loader 时，要尽量使它的职责单一。即一个 loader 只做一个任务。这样可以使 loader 更容易维护并且可以在更多的场景下复用。

## 如何开发一个插件

Webpack 的打包过程就像一个产品的流水线，按部就班地执行一个又一个环节。而插件就是在这条流水线各个阶段插入的额外功能，Webpack 以此来扩展自身的功能。
在实例介绍之前，需要先简单了解下插件是如何在 Webpack 打包的不同阶段准确插入其中的。它使用的是 [Tapable](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fwebpack%2Ftapable 'https://github.com/webpack/tapable') 工具类，compiler 和 compilation 类都扩展自 Tapable 类。

### Tapable 简介

Tapable 用法个人理解类似发布订阅模式，不同插件可以订阅同一个事件，当 Webpack 执行到该事件时，分发给各个注册的插件。Tapable 提供的钩子类型很多，总体可以分为同步和异步，它们的注册方式不同。同步钩子通过 tap 注册，异步钩子通过 tapAsync 或 tapPromise，两者的区别在于前者使用回调函数，后者使用 Promise。
Tapable 本身还细分很多类型，比如 Bail 类型的钩子，可以终止此类注册事件的调用（某个 Bail 钩子注册的事件中有 return，就不再执行其他注册事件），具体的这里不再展开。下面通过读取文件的例子具体看一下 Tapable 钩子的用法

```js
const { SyncHook, AsyncSeriesHook } = require('tapable')
const fs = require('fs')

// 钩子存放容器
const hooks = {
  beforeRead: new SyncHook(['param']), // 同步钩子，数组代表注册时，回调函数的参数。
  afterRead: new AsyncSeriesHook(['param']) // 异步顺序执行钩子
}
// 订阅beforeRead
hooks.beforeRead.tap('name', param => {
  console.log(param, 'beforeRead执行触发回调')
})
// 订阅afterRead
hooks.afterRead.tapAsync('name', (param, callback) => {
  console.log(param, 'afterRead执行触发回调')
  setTimeout(() => {
    // 回调执行完毕
    callback()
  }, 1000)
})

// 读取文件前调用beforeRead，注册事件按照注册顺序同步执行
hooks.beforeRead.call('开始读取')
fs.readFile('package.json', (err, data) => {
  if (err) {
    throw new Error(err)
  }
  // 读取文件后执行afterRead钩子
  hooks.afterRead.callAsync(data, () => {
    // 所有注册事件执行完后调用，类似Promise.all
    console.log('afterRead end~')
  })
})
```

在读取文件的两个阶段，执行相应钩子，执行时广播通知到所有注册事件。执行完后再继续下面的步骤。

### 自定义插件编写

插件本质上是一个构造函数，它的原型上必须有一个 apply 方法。在 Webpack 初始化 compiler 对象之后会调用插件实例的 apply 方法，传入 compiler 对象。然后插件就可以在 compiler 上注册想要注册的钩子，Webpack 会在执行到对应阶段时触发注册事件。下面用两个简单的插件实例演示这个过程。

#### 插件一：删除输出文件夹内的文件

模仿 CleanWebpackPlugin 插件，但是不删除文件夹，因为 Node 只能删除空文件夹，需要使用递归才能完整实现 CleanWebpackPlugin 的功能，这里重点演示插件编写流程，所以就简化为只删除文件。

```js
// RmFilePlugin.js

const path = require('path')
const fs = require('fs')

class RmFilePlugin {
  constructor(options = {}) {
    // 插件的options
    this.options = options
  }
  // Webpack会自动调用插件的apply方法，并给这个方法传入compiler参数
  apply(compiler) {
    // 拿到webpack的所有配置
    const webpackOptions = compiler.options
    // context为Webpack的执行环境（执行文件夹路径）
    const { context } = webpackOptions
    // 在compiler对象的beforeRun钩子上注册事件
    compiler.hooks.beforeRun.tap('RmFilePlugin', compiler => {
      // 获取打包输出路径
      const outputPath =
        webpackOptions.output.path || path.resolve(context, 'dist')
      const fileList = fs.readdirSync(outputPath, { withFileTypes: true })
      fileList.forEach(item => {
        // 只删除文件，不对文件夹做递归删除，简化逻辑
        if (item.isFile()) {
          const delPath = path.resolve(outputPath, item.name)
          fs.unlinkSync(delPath)
        }
      })
    })
  }
}

// 导出 Plugin
module.exports = RmFilePlugin
```

这个例子很简单，只用到了 compiler 对象，在实际开发插件的过程中，大多数情况下还需要使用 compilation 对象，那么它和 compiler 有什么不同？

- 个人理解，compiler 代表了 Webpack 从启动到关闭的整个完整生命周期，它上面的钩子是基于 Webpack 运行自身的，比如打包环境是否准备好，是否开始编译了等。而 compilation 专注于编译阶段，它的钩子存在于编译的各个细节中，如模块被加载(load)、优化(optimize)、 分块(chunk)等。

下面这个例子就用到了 compilation 对象

#### 插件二：删除 js 注释

这个插件的功能在上文 loader 中实现过，在 plugin 里又实现一遍，是想说明 loader 能做到的事 plugin 都能做到，并且 plugin 可以做的更彻底。

```js
// DelCommentPlugin.js

const { sources } = require('webpack')

class DelCommentPlugin {
  constructor(options) {
    this.options = options
  }

  apply(compiler) {
    // compilation 创建之后执行注册事件
    compiler.hooks.compilation.tap('DelCommentPlugin', compilation => {
      // 处理asset
      compilation.hooks.processAssets.tap(
        {
          name: 'DelCommentPlugin', //插件名称
          //要对asset做哪种类型的处理，这里的填值代表的是对asset 进行了基础预处理
          stage: compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_PRE_PROCESS
        },
        assets => {
          for (const name in assets) {
            // 只对js资产做处理
            if (name.endsWith('.js')) {
              if (Object.hasOwnProperty.call(assets, name)) {
                const asset = compilation.getAsset(name) // 通过asset名称获取到asset
                const contents = asset.source.source() // 获取到asset的内容
                const result = contents
                  .replace(/\/\/.*/g, '')
                  .replace(/\/\*.*?\*\//g, '') //删除注释
                // 更新asset的内容
                compilation.updateAsset(name, new sources.RawSource(result))
              }
            }
          }
        }
      )
    })
  }
}
module.exports = DelCommentPlugin
```

跟 loader 一样，对比一下使用了这个插件后的输出。

```js
// main.js

;(function () {
  var __webpack_exports__ = {}

  const x = 100
  let y = x

  console.log(y)
})()
```

很明显，删除注释没有问题，并且可以看到，它把 main.js 文件内的注释都删除了，而 loader 只能删除源代码中的注释。plugin 却可以直接改变最终输出的 bundle 内容。

## 手写一个简易 Webpack

Webpack 是一个 Node 应用，所以本质上它就是在 Node 环境上跑了一段（一大大大段）js 代码，看上去就像这样。

```js
// built.js

const myWebpack = require('../lib/myWebpack')
// 引入自定义配置
const config = require('../config/webpack.config.js')

const compiler = myWebpack(config)
// 开始webpack打包
compiler.run()
```

向 myWebpack 函数里传入配置 config，然后构造一个 compiler 对象，执行它的 run 方法。run 方法重点做两个事情，一是根据入口文件找出并记录所有依赖，二是用字符串组装最后输出的 boundle 函数，这个函数的主要功能就是根据依赖关系实现 require 和 export 功能。下面就按照这两步分析下代码：

### 根据入口文件分析出依赖关系表

```js
// myWebpack.js

const fs = require('fs')
const path = require('path')
const babelParser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAstSync } = require('@babel/core')

// Compiler构造函数
class Compiler {
  constructor(options = {}) {
    this.options = options // 获得webpack配置
    this.entry = this.options.entry || './src/index.js' // 获取入口文件，不存在则使用默认值
    this.entryDir = path.dirname(this.entry)
    this.depsGraph = {} //依赖关系表，第一步的产出
  }
  // 启动webpack打包
  async run() {
    const { entry, entryDir } = this
    // 从入口文件开始获取模块信息
    this.getModuleInfo(entry, entryDir)
    console.log(this.depsGraph)
    // 获取到模块信息后生成构建内容，第二步的内容，先注释。
    // this.outputBuild()
  }
  // 根据文件路径获取模块信息
  getModuleInfo(modulePath, dirname) {
    const { depsGraph } = this
    /*
        利用fs模块和文件路径可以读取到文件内容，然后根据文件内容（import和export）又可以分析出模块之间的依赖关系。
        自己去做这步是没有任何问题的。只是这里为了方便，就利用babelParser库生成一个抽象的模型ast(抽象语法树)。
        ast将我们的代码抽象出来，方便我们操作。
        */
    const ast = getAst(modulePath)
    // 利用ast和traverse库获得该模块的依赖。原理就是分析了代码中的"import"语句。
    const deps = getDeps(ast, dirname)
    // 利用ast和babel/core将源代通过babel编码输出。如果不用ast也可以直接使用babel/core的transform方法将源代码转码
    const code = getParseCode(ast)
    // depsGraph保存的模块信息就是code源代码和它的依赖关系
    depsGraph[modulePath] = {
      deps,
      code
    }
    // 如果该模块存在依赖deps，就通过递归继续找出它下面的依赖，这样循环就找出了入口文件开始的所有依赖。
    if (Object.keys(deps).length) {
      for (const key in deps) {
        if (Object.hasOwnProperty.call(deps, key)) {
          // 递归获取模块信息
          this.getModuleInfo(deps[key], dirname)
        }
      }
    }
  }
}

// getModuleInfo中用到的三个工具函数
// 根据文件路径获取抽象语法树
const getAst = modulePath => {
  const file = fs.readFileSync(modulePath, 'utf-8')
  // 2. 将其解析成ast抽象语法树
  const ast = babelParser.parse(file, {
    sourceType: 'module' // 要解析的是 es6 module（默认为commonJs）
  })
  return ast
}
// 根据抽象语法树ast获取依赖关系
const getDeps = (ast, dirname) => {
  // 该模块依赖合集
  const dependSet = {}
  // 利用traverse这个库收集依赖，自己收集也可以，不管是抽象语法树还是源代码中都是可以拿到依赖关系的。现成的库比较方便
  traverse(ast, {
    // 内部遍历ast中的program.body,判断里面语句类型
    // 如果type为ImportDeclaration 就会触发当前函数
    ImportDeclaration({ node }) {
      const relativePath = node.source.value //import文件的相对路径
      const absolutePath = path.resolve(dirname, relativePath)
      dependSet[relativePath] = absolutePath // 依赖中记录文件的绝对路径
    }
  })
  return dependSet
}
// 根据抽象语法树，获取最终输出代码
const getParseCode = ast => {
  // 编译代码，将现代浏览器不能识别的语法进行编译处理
  // @babel/core可以直接将ast抽象语法树编译成兼容代码
  /* 编译完成，可输出 */
  const { code } = transformFromAstSync(ast, null, {
    presets: ['@babel/preset-env']
  })
  return code
}

// 该模块要输出的myWebpack函数
const myWebpack = config => {
  return new Compiler(config)
}
module.exports = myWebpack
```

如果现在运行一下上面的 built.js，就会打印出依赖关系表，它大概长这样。

```js
depsGraph = {
  './src/index.js': {
    deps: {
      './add.js':
        'E:\\study\\JavaScript\\webpack\\bWebpack\\principle\\myWebpack2\\src\\add.js',
      './sub.js':
        'E:\\study\\JavaScript\\webpack\\bWebpack\\principle\\myWebpack2\\src\\sub.js'
    },
    code:
      '"use strict";\n' +
      '\n' +
      'var _add = _interopRequireDefault(require("./add.js"));\n' +
      '\n' +
      'var _sub = _interopRequireDefault(require("./sub.js"));\n' +
      '\n' +
      'function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n' +
      '\n' +
      'console.log((0, _add.default)(1, 2));\n' +
      'console.log((0, _sub.default)(3, 1));'
  },
  'E:\\study\\JavaScript\\webpack\\bWebpack\\principle\\myWebpack2\\src\\add.js':
    {
      deps: {},
      code:
        '"use strict";\n' +
        '\n' +
        'Object.defineProperty(exports, "__esModule", {\n' +
        '  value: true\n' +
        '});\n' +
        'exports.default = _default;\n' +
        '\n' +
        'function _default(x, y) {\n' +
        '  return x + y;\n' +
        '}'
    },
  'E:\\study\\JavaScript\\webpack\\bWebpack\\principle\\myWebpack2\\src\\sub.js':
    {
      deps: {},
      code:
        '"use strict";\n' +
        '\n' +
        'Object.defineProperty(exports, "__esModule", {\n' +
        '  value: true\n' +
        '});\n' +
        'exports.default = _default;\n' +
        '\n' +
        'function _default(x, y) {\n' +
        '  return x - y;\n' +
        '}'
    }
}
```

第二步要做的事，就是根据依赖关闭表，输出最后的 bundle 文件。

### 组装输出函数

如果直接用字符串组装输出函数，可能会有点不好理解。所以先在一个 js 中实现想要输出的函数。这个函数以依赖关系表为参数，内部实现 require 和 export 函数，因为 babel 转码输出后的代码中使用的就是 CommonJs 规则。

```js
;(function (depsGraph) {
  // 为了加载入口文件
  function require(module) {
    // 定义模块内部的require函数
    function localRequire(relativePath) {
      // 为了找到要引入模块的绝对路径，通过require加载
      return require(depsGraph[module].deps[relativePath])
    }
    // 定义暴露对象
    var exports = {}
    /*
        模块内部要自定义localRequire，而不是直接用require函数，原因是使用babell转化后的code，require传参时使用的是
        相对路径，而我们内部依赖表中，是根据绝对路径找到code，所以要实现一层转化
        */
    ;(function (require, exports, code) {
      // code是字符串，用eval执行
      eval(code)
    })(localRequire, exports, depsGraph[module].code)

    // 作为require函数的返回值返回出去
    // 后面的require函数能得到暴露的内容
    return exports
  }
  // 加载入口文件
  require('./src/index.js')
})(depsGraph)
```

这个就是最后要输出的 bundle，如果把第一步中获取到的依赖关系表拿过来，直接执行这个函数，就可以和执行源代码取得同样的效果。最后要做的就是在 myWebpack.js 中用字符串拼装出这个函数。下面是 myWebpack.js 中的完整代码。

### myWebpack 完整源代码

```js
const fs = require('fs')
const path = require('path')

const babelParser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const { transformFromAstSync } = require('@babel/core')

const myWebpack = config => {
  return new Compiler(config)
}

// Compiler构造函数
class Compiler {
  constructor(options = {}) {
    this.options = options // 获得webpack配置
    this.entry = this.options.entry || './src/index.js' // 获取入口文件，不存在则使用默认值
    this.entryDir = path.dirname(this.entry)
    this.depsGraph = {} //依赖关系表，第一步的产出
  }
  // 启动webpack打包
  async run() {
    const { entry, entryDir } = this
    // 从入口文件开始获取模块信息
    this.getModuleInfo(entry, entryDir)
    // 获取到模块信息后生成构建内容
    this.outputBuild()
  }
  // 根据文件路径获取模块信息
  getModuleInfo(modulePath, dirname) {
    const { depsGraph } = this
    const ast = getAst(modulePath)
    const deps = getDeps(ast, dirname)
    const code = getParseCode(ast)
    // depsGraph保存的模块信息就是code源代码和它的依赖关系
    depsGraph[modulePath] = {
      deps,
      code
    }
    // 如果该模块存在依赖deps，就通过递归继续找出它下面的依赖，这样循环就找出了入口文件开始的所有依赖。
    if (Object.keys(deps).length) {
      for (const key in deps) {
        if (Object.hasOwnProperty.call(deps, key)) {
          // 递归获取模块信息
          this.getModuleInfo(deps[key], dirname)
        }
      }
    }
  }
  // 最后一步，利用fs输出js文件
  outputBuild() {
    const build = `(function (depsGraph) {
        function require(module) {
            function localRequire(relativePath) {
            // 为了找到要引入模块的绝对路径，通过require加载
            return require(depsGraph[module].deps[relativePath])
            };
            // 定义暴露对象
            var exports = {};
            (function (require, exports, code) {
            // code是字符串，要eval执行
            eval(code)
            })(localRequire, exports, depsGraph[module].code);

            return exports;
        }
        require("${this.options.entry}")
        })((${JSON.stringify(this.depsGraph)}))`
    let outputPath = path.resolve(
      this.options.output.path,
      this.options.output.filename
    )
    fs.writeFileSync(outputPath, build, 'utf-8')
  }
}
// 根据文件路径获取抽象语法树
const getAst = modulePath => {
  // 1.读取入口文件内容
  /* 第二个参数如果不写，默认返回Buffer数据，如果写了utf-8解码，则返回字符串数据 */
  //  注意：从这个入口文件读取可以看出来，node针对的所有相对路径，都是根据运行环境来的，在这里就是package.json目录，
  // 即myWebpack目录
  const module = fs.readFileSync(modulePath, 'utf-8')
  // 2. 将其解析成ast抽象语法树
  const ast = babelParser.parse(module, {
    sourceType: 'module' // 要解析的是 es6 module（默认为commonJs）
  })
  return ast
}
// 根据抽象语法树ast获取依赖关系
const getDeps = (ast, dirname) => {
  // 依赖合集
  const dependSet = {}
  // 利用traverse这个库收集依赖，自己收集其实也可以，不管是抽象语法树还是import源代码中都是可以拿到依赖关系的。现成的库比较方便
  traverse(ast, {
    // 内部遍历ast中的program.body,判断里面语句类型
    // 如果type：ImportDeclaration 就会触发当前函数
    ImportDeclaration({ node }) {
      // 模块相对路径"./add.js"
      const relativePath = node.source.value
      const absolutePath = path.resolve(dirname, relativePath)
      dependSet[relativePath] = absolutePath
    }
  })
  return dependSet
}
// 根据抽象语法树，获取最终输出代码
const getParseCode = ast => {
  // 编译代码，将现代浏览器不能识别的语法进行编译处理
  // @babel/core可以直接将ast抽象语法树编译成兼容代码
  /* 编译完成，可输出 */
  const { code } = transformFromAstSync(ast, null, {
    presets: ['@babel/preset-env']
  })
  return code
}

module.exports = myWebpack
```
