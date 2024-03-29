---
title: 打包app
tag: 移动开发
date: 2018-08-08
category:
  - 前端进阶
---

#### 1.hbuilder

如果使用苹果证书，这里推荐一个申请 iOS 证书的工具 Appuploader。免苹果付费开发者账号，直接使用普通苹果 id，就能使用 Appuploader 申请 ios 测试证书，打包 ipa 安装到非越狱设备。
工具的安装网址：[Appuploader 安装](http://www.applicationloader.net/blog/zh/72.html)

免开发者账号申请 iOS 证书教程：[申请 IOS 证书](http://www.applicationloader.net/blog/zh/1073.html)

##### 授权登录插件配置 manifes

[http://ask.dcloud.net.cn/article/192](http://ask.dcloud.net.cn/article/192)

#### 2.Cordova 打包 Vue 项目

##### 第一步：安装 cordova

npm install -g cordova

##### 第二步：新建 cordova 项目

执行命令

```js
cordova create cordovaApp com.cordova.testapp
cd cordovaApp
cordova platform add android
```

##### 第三步：修改 vue 项目

首先修改 vue 项目的 index.html 在 head 之间加入

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;"
/>
<meta name="format-detection" content="telephone=no" />
<meta name="msapplication-tap-highlight" content="no" />
<meta
  name="viewport"
  content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width"
/>
```

这个的时候可能导致页面样式改变，如果改变则不加，否则还是建议加上。
然后引入 cordova.js

```HTML
<body>
    <div id="app"></div>
    <script type="text/javascript" src="cordova.js"></script>
    <!-- built files will be auto injected -->
</body>

```

然后修改 src 中的 main.js 为以下代码

```js
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

/* eslint-disable no-new */

document.addEventListener(
  'deviceready',
  function () {
    new Vue({
      el: '#app',
      router,
      store,
      template: '<App/>',
      components: { App }
    })
    window.navigator.splashscreen.hide()
  },
  false
)
```

最后修改 config 文件夹中的 index.js 文件
修改 build 中的

```js
 assetsSubDirectory: 'static',
    assetsPublicPath: '/',
```

为

```
   assetsSubDirectory: '',
    assetsPublicPath: '',
```

然后运行 npm run dev

看看是否能够运行起来，如果正常说明到这里是没有问题的。

##### 第四步：将 vue 文件放到 cordova 项目中并打包

先在 vue 项目中运行 npm run build

执行完成后会生成一个 dist 文件夹，找到这个文件夹将里面的所有文件复制到你的 cordova 项目的 www 文件夹下替换它原有的文件。
然后就可以执行 cordova build android

会生成一个可执行的 apk 文件，安装即可。
到这里就完成了我们 vue 项目的打包。

##### 注意:

如果 vue 项目在运行 npm run dev 或者 npm run build 的时候遇到问题一般不是代码出错的话可以将 node_modules 文件夹删除使用 npm install 安装。
如果是因为 eslint 导致代码检查不通过的话，可以将 Vue 项目的 build 文件夹下的 webpack.base.config 文件中的 rules

```js
{
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [resolve('src'), resolve('test')],
          options: {
        formatter: require('eslint-friendly-formatter')
          }
        },

```

这段代码注释即可。
