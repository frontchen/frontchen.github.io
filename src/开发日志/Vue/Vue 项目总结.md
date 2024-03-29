---
title: Vue 项目总结
tag:
  - 项目总结
  - Vue
date: 2021-10-16
category:
  - 开发日志
---

### 1.搜索历史纪录

- **使用 localStorage 解决 vuex 在页面刷新后数据被清除的问题**

#### 使用逻辑

- 1.在 vuex 获取到用户信息时（例：state.user_id =user_info.user_id），同时把这个信息存入 localStorage
- 2.定义一个 mutation 方法，再次把数据从 localStorage 传给 state；
- 3.我们的问题发生在页面刷新时，可能很多同学就会去想在监听页面刷新事件时触发上面第 2 步的那个方法。其实不用这么麻烦，在 computed 属性时，只要我们判断一下用户信息是否为空，为空时调用第 2 步的那个方法就好了，然后我们把这个 state return 给那个响应属性就好了；
- 4.至于为什么这么麻烦在 state 和 localStorage 中传来传去，是因为 state 的值刷新后会没了，而 localStorage 的值不能响应式地变化（Vue 仅可以对其管理的数据做响应式处理，可以理解为 data 中的数据，localStorage 并不在 Vue 的管理下，自然不会有响应特性）；

### 2.v-model 指令的三个参数

#### 1.number

### 3.vee-validate 表单验证

#### 安装

```js
npm install vee-validate --save
```

#### 配置和使用

配置使用主要是 3 个文件。

- validate.js ：自己创建一个文件，单独将关于表单验证的代码抽离出来，从 node_modules 中引入 VeeValidate，配置相关项
- main.js ：vue 主文件入口，引入 validate.js
- form.vue ：表单组件

##### validate.js

```js
import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN' //引入中文文件

// 配置中文
Validator.addLocale(zh)

const config = {
  locale: 'zh_CN'
}

Vue.use(VeeValidate, config)

// 自定义validate
const dictionary = {
  zh_CN: {
    messages: {
      email: () => '请输入正确的邮箱格式',
      required: field => '请输入' + field
    },
    attributes: {
      email: '邮箱',
      password: '密码',
      name: '账号',
      phone: '手机'
    }
  }
}

Validator.updateDictionary(dictionary)

Validator.extend('phone', {
  messages: {
    zh_CN: field => field + '必须是11位手机号码'
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
})
```

##### 3-1 引入表单验证依赖文件，并且引入的是支持中文错误提示的文件。

```js
import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN' //引入中文文件
```

##### 3-2 进行中文错误提示的配置。

```js
// 配置中文
Validator.addLocale(zh)

const config = {
  locale: 'zh_CN'
}

Vue.use(VeeValidate, config)
```

##### 3-3 如果你想自定义表单验证的提示语，不配置有默认。

```js
// 自定义validate
const dictionary = {
  zh_CN: {
    messages: {
      email: () => '请输入正确的邮箱格式',
      required: field => '请输入' + field
    },
    attributes: {
      email: '邮箱',
      password: '密码',
      name: '账号',
      phone: '手机'
    }
  }
}

Validator.updateDictionary(dictionary)
//message ： 提示语。
//attributes： 就是 filed。
```

##### 3-4 扩展自定义的验证，比如这边自定义了电话的表单验证。

```js
Validator.extend('phone', {
  messages: {
    zh_CN: field => field + '必须是11位手机号码'
  },
  validate: value => {
    return value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
})
```

main.js 中代码

```js
import './static/js/validate.js'
```

只需要将 validate.js 引入主文件入口就完成了铺路工作，现在就可以开始写表单界面了。

form.vue 组件中的代码：

```HTML
<div class="layui-form-item">
    <label class="layui-form-label">账户</label>
    <div class="layui-block">
    <input v-model="name" v-validate="'required|min:3|alpha'" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" name="name" class="layui-input" placeholder="账户">
    <span v-show="errors.has('name')" class="text-style" v-cloak> {{ errors.first('name') }} </span>
    </div>
</div>

```

这是其中的一个 input 拿出来讲：

1、首先在 input 中你得有 name 属性。

2、v-validate 属性：管道形式进行过滤，验证条件。

3、span 就是错误提示 。

```JS

errors.first('field') // 获取关于当前field的第一个错误信息
collect('field')  // 获取关于当前field的所有错误信息(list)
has('field') // 当前filed是否有错误(true/false)
all()  // 当前表单所有错误(list)
any()  // 当前表单是否有任何错误(true/false)12345

```

到这边你可以完成基础的表单验证了，不同的项目都会有不同的需求，表单验证也不一样，但是 VeeValidate 支持你去扩展，完成各种不同的需求。你可以参照着官网文档，造一个自己的表单验证，这样不同项目时只需要进行简单的修改就能用上了。

官网:https://baianat.github.io/vee-validate/configuration.html

### 4.vue-amap

- 基于 Vue 2.x 与高德的地图组件

#### 4.1 到高德地图注册一个帐号，创建应用，创建一个 key

#### 4.2 安装

```js
npm install vue-amap --save

```

##### 配置

```js
// 引入vue-amap
import AMap from 'vue-amap'
Vue.use(AMap)

// 初始化vue-amap
AMap.initAMapApiLoader({
  // 申请的高德key
  key: 'YOUR_KEY',
  // 插件集合
  plugin: ['AMap.PlaceSearch', 'AMap.Geolocation']
})
```

#### 4.3 开始使用

```jsx
<input type="text" ref="searchText" id="searchText" @keyup="keyUpSearch" placeholder="请输入地址"/>


<div class="address_items" id="address_result" v-if="searchData.length > 0">
  <div class="address_item" v-for="item in searchData">
    <div class="title">{{ item.name }}</div>
    <div class="description">{{ item.pname }}{{ item.cityname }}{{ item.address }}</div>
  </div>
</div>

```

##### methods 里面添加对应的 keyUpSearch 方法

```JS
<script>
export default {
  methods: {
    keyUpSearch() {
      var _this = this;
      var txt = this.$refs.searchText.value;
      AMap.service(["AMap.PlaceSearch"], function() {
    var placeSearch = new AMap.PlaceSearch({
      //构造地点查询类 pageSize: 12, pageIndex: 1, city: "成都", //城市 cityLimit: 'true', panel: 'temp'//搜索结果的展示面板对元素id，不知道为什么一定要有该参数，最终获取的结果才更完整，参数更多跟完整，//所以我在页面随便写了一个<div id="temp" style="display:none"></div>
    });
    //关键字查询
    placeSearch.search(txt, function(status, result) {
      if (status == "complete" && result.info == "OK") {
        //这里可以console.log(result)，查看所有返回的参数，遍历展示这些基本的，我就不赘述
        //_this.searchData = result.poiList.pois
      }
    });
      });
    }
  }
};
</script>

```

### 5.骨架屏

我们希望在构建时渲染 skeleton 组件，将渲染 DOM 插入 html 的挂载点中，同时将使用的样式通过 style 标签内联。这样在前端 JS 渲染完成之前，用户将看到页面的大致骨架，感知到页面是正在加载的。

我们当然可以选择在开发时直接将页面骨架内容写入 html 模版中，但是这会带来两个问题：

开发 skeleton 与其他组件体验不一致。
多页应用中多个页面可能共用同一个 html 模版，而又有独立的 skeleton。
下面我们将看看插件在具体实现中是如何解决这两个问题的：

vue-skeleton-webpack-plugin

github 地址：https://github.com/lavas-project/vue-skeleton-webpack-plugin

具体实现步骤：

1、我们用 vue-cli 直接构建一下项目跑起来（具体怎么构建就不说了）

2、进去当前项目，执行命令 ： npm install vue-skeleton-webpack-plugin

3、我们在 src 目录下创建 Skeleton.vue

```vue
<template>
  <div class="skeleton-wrapper">
    <header class="skeleton-header"></header>
    <section class="skeleton-block">
      <img
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTA4MCAyNjEiPjxkZWZzPjxwYXRoIGlkPSJiIiBkPSJNMCAwaDEwODB2MjYwSDB6Ii8+PGZpbHRlciBpZD0iYSIgd2lkdGg9IjIwMCUiIGhlaWdodD0iMjAwJSIgeD0iLTUwJSIgeT0iLTUwJSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij48ZmVPZmZzZXQgZHk9Ii0xIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+PGZlQ29sb3JNYXRyaXggaW49InNoYWRvd09mZnNldE91dGVyMSIgdmFsdWVzPSIwIDAgMCAwIDAuOTMzMzMzMzMzIDAgMCAwIDAgMC45MzMzMzMzMzMgMCAwIDAgMCAwLjkzMzMzMzMzMyAwIDAgMCAxIDAiLz48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEpIj48dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNhKSIgeGxpbms6aHJlZj0iI2IiLz48dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNiIi8+PHBhdGggZmlsbD0iI0Y2RjZGNiIgZD0iTTIzMCA0NGg1MzN2NDZIMjMweiIvPjxyZWN0IHdpZHRoPSIxNzIiIGhlaWdodD0iMTcyIiB4PSIzMCIgeT0iNDQiIGZpbGw9IiNGNkY2RjYiIHJ4PSI0Ii8+PHBhdGggZmlsbD0iI0Y2RjZGNiIgZD0iTTIzMCAxMThoMzY5djMwSDIzMHpNMjMwIDE4MmgzMjN2MzBIMjMwek04MTIgMTE1aDIzOHYzOUg4MTJ6TTgwOCAxODRoMjQydjMwSDgwOHpNOTE3IDQ4aDEzM3YzN0g5MTd6Ii8+PC9nPjwvc3ZnPg=="
      />
      <img
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTA4MCAyNjEiPjxkZWZzPjxwYXRoIGlkPSJiIiBkPSJNMCAwaDEwODB2MjYwSDB6Ii8+PGZpbHRlciBpZD0iYSIgd2lkdGg9IjIwMCUiIGhlaWdodD0iMjAwJSIgeD0iLTUwJSIgeT0iLTUwJSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94Ij48ZmVPZmZzZXQgZHk9Ii0xIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0T3V0ZXIxIi8+PGZlQ29sb3JNYXRyaXggaW49InNoYWRvd09mZnNldE91dGVyMSIgdmFsdWVzPSIwIDAgMCAwIDAuOTMzMzMzMzMzIDAgMCAwIDAgMC45MzMzMzMzMzMgMCAwIDAgMCAwLjkzMzMzMzMzMyAwIDAgMCAxIDAiLz48L2ZpbHRlcj48L2RlZnM+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwIDEpIj48dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNhKSIgeGxpbms6aHJlZj0iI2IiLz48dXNlIGZpbGw9IiNGRkYiIHhsaW5rOmhyZWY9IiNiIi8+PHBhdGggZmlsbD0iI0Y2RjZGNiIgZD0iTTIzMCA0NGg1MzN2NDZIMjMweiIvPjxyZWN0IHdpZHRoPSIxNzIiIGhlaWdodD0iMTcyIiB4PSIzMCIgeT0iNDQiIGZpbGw9IiNGNkY2RjYiIHJ4PSI0Ii8+PHBhdGggZmlsbD0iI0Y2RjZGNiIgZD0iTTIzMCAxMThoMzY5djMwSDIzMHpNMjMwIDE4MmgzMjN2MzBIMjMwek04MTIgMTE1aDIzOHYzOUg4MTJ6TTgwOCAxODRoMjQydjMwSDgwOHpNOTE3IDQ4aDEzM3YzN0g5MTd6Ii8+PC9nPjwvc3ZnPg=="
      />
    </section>
  </div>
</template>

<script>
export default {
  name: 'skeleton'
}
</script>

<style scoped>
.skeleton-header {
  height: 40px;
  background: #1976d2;
  padding: 0;
  margin: 0;
  width: 100%;
}
.skeleton-block {
  display: flex;
  flex-direction: column;
  padding-top: 8px;
}
</style>
```

4、创建入口文件：entry-skeleton.js

```js
import Vue from 'vue'
import Skeleton from './Skeleton'
export default new Vue({
  components: {
    Skeleton
  },
  template: '<Skeleton />'
})
```

<img alt="" class="has" src="https://img-blog.csdn.net/20180726110646904?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTI4Nzg4MTg=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70">

5、我们在 build 目录下创建 webpack.skeleton.conf.js

```js
'use strict'

const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const nodeExternals = require('webpack      - node-externals')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = merge(baseWebpackConfig, {
  target: 'node',
  devtool: false,
  entry: {
    app: resolve('../src/entry-skeleton.js')
  },
  output: Object.assign({}, baseWebpackConfig.output, {
    libraryTarget: 'commonjs2'
  }),
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: []
})
```

6.然后在 webpack.dev.conf.js 和 webpack.prod.conf.js 分别加入

```js
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')
// inject skeleton content(DOM & CSS) into HTML
new SkeletonWebpackPlugin({
  webpackConfig: require('./webpack.skeleton.conf'),
  quiet: true
})
```

### 6.为什么要有 vue，从历史角度谈谈

因为 vue 大大提高了前端开发的效率，vue 带来了前端开发模式的转变，传统的前端开发是使用 html+css 搭建前端页面，使用 js 或 jquery 等技术进行页面的交互逻辑，然后使用 ajax 技术进行与后台的通信，后台返回数据浏览器进行页面的渲染。

使用 vue 之后我们可以进行数据的双向绑定，使用 vue-router 处理页面路由，使用 vue 处理各组件直接的通信，使用 vue-resource 或者 axios 处理 http 请求，使用 element-ui 或者 mint-ui 来搭建前端页面

- 优点:目前路西的单页面流行框架，减轻服务器压力，前后端完全分离，比 augular 更省资源
- 缺点:不利于 seo，(对国内搜索引擎来说，比如百度)，第一次加载速度较慢
- 解决:页面静态化，可以使爬虫抓取页面

### 7.vue 的核心内容:数据双向绑定 MVVM 思想 组件化开发 虚拟 DOM 树 自定义指令 生命周期

- 为什么要有指令?操作 DOM，放到页面上
- 1.为了把我们得到的数据放到页面上
- 2.大牛把操作 DOM 方法封装，让程序员专注于操作数据

### 8.vue 的基本用法

#### 8.1 常见指令

- v-if 根据表达式的值在 dom 中生成或移除一个元素
- v-show 根据表达式的值显示或隐藏 html 元素
- v-if 和 v-show 都可以用来控制页面的隐藏和显示，他们的区别在于，v-if 是直接在页面中删除某个元素，v-show 是改变元素的 display 属性来控制隐藏或者显示
- v-else 是 js 中 else 的意思，必须跟着 v-if 或者 v-show 使用
- v-model 用来在表单控件元素上创建双向数据绑定
- v-bind 用来响应更新 html 新特性，将一个或多个属性绑定到表达式上
- v-on 用于绑定事件监视器
- v-text 和 v-html 以及{{}}都是用来实现数据绑定的，v-text 和 v-html 的区别在于会不会输出 thml 标签
  使用{{}}的话，在网速较慢的情况下{{}}会显示出来，可以使用 v-cloak 来解决这个问题

#### 8.2 组件怎么做的？

在 vue 中定义全局组件有三种方式 1.使用 vue.extend({})定义全局组件，然后再通过 vue.component 把 vue.extend 定义的组件注册到 vue 全局上 2.直接用 vue.component("引用组件的名称”,{组件实际的定义模板})
3.vue.component(“组件名称”,{template:模板 id}

#### 8.3 用户怎么请求数据?

使用 vue-resource 或者使用 axios

```jsx
getData(){this.$http
  .get("http://vue.studyit.io/api/ getnewslist").then(res =>{
						console.log(res.body);
						this.list = res.body.message
					})
					.catch(err =>{console.log(err);})
			},
postData(){this.$http
  .post("http://vue.studyit.io/api/postcomment/17",
  {content:"完美！"},
  {emulateJSON:true})
   .then(resp =>{
						console.log(resp.body)})}
```

#### 8.4 用什么做路由

官方提供了 vue-router 插件，路由是浏览器中的哈希值(#hash)与展示视图内容(template)之间的对应规则
vue 中的路由是:hash 与 component 的对应关系

#### 8.5 父组件给子组件传值

父--->子:用 props；（单项数据流）组件想要使用父组件的数据，我们需要通过子组件的 prop 选项来获得父组件传过来的数据，当父组件的 name 发生改变，子组件也会自动地更新视图，如果是改动了子组件中的 prop 的值得时候，父组件中的值是不会响应的变化的，如果要修改 prop，就把 prop 赋值给一个局部变量，然后需要修改的话就修改这个局部变量，而不影响 prop

#### 8.6 子组件给父组件传值

子-->父:用$.emit(event ,[..args]) 父组件用$.on 接收,通过在父组件 $on(eventName) 监听自 定义事件，当子组件里 $emit(eventName) 触发该自定义事件的时候，父组件执行相应的操作方法。

#### 8.7 兄弟组件间传值

兄弟-->兄弟 :用 vuex(状态管理模式)和 event.bus( 空实例对象)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>

  <body>
    <div id="app">
      <aaa></aaa>
      <bbb></bbb>
    </div>

    <script src="./vue.js"></script>
    <script>
      // 非父子组件通讯：

      var bus = new Vue()

      var vm = new Vue({
        el: '#app',
        data: {},

        // 通过 components 来创建属于该实例的局部组件
        components: {
          aaa: {
            template: `
        <div>
          <h1>组件A</h1>
          <button @click="fn">传递数据给组件B</button>
        </div>
      `,

            created() {
              bus.$emit('bfn', '组件A说：你好组件B')
            },

            methods: {
              fn() {
                // 触发事件，传递数据
                bus.$emit('bfn', '组件A说：你好组件B')
              }
            }
          },

          bbb: {
            template: `
        <div>
          <hr>
          <h1>组件B: {{ msg }}</h1>
        </div>
      `,

            data() {
              return {
                msg: ''
              }
            },

            // 在钩子函数中，绑定事件，这样以进入页面，事件就绑定好了，等待组件A触发
            created() {
              // 绑定事件，接受数据
              bus.$on('bfn', data => {
                this.msg = data
              })
            }
          }
        }
      })
    </script>
  </body>
</html>
```

### 9. vuex 里面有一个仓库是 state(数据仓库)改变数据仓库数据的一些方法 motation.异步的

和 motation(里面放同步的方法)

#### 9.1 双向数据绑定的原理

答：vue 中数据的双向绑定采用的时候，数据劫持的模式。其实主要是用了 Es5 中的 Object.defineProperty;来劫持每个属性的 getter,和 setter

##### vue 执行的过程（双向数据绑定的原理解析）：

- 1 根据传入的 el 配置项，找到页面中需要被 Vue 管理的内容区域
- 2 遍历所有的后代元素，收集出现的所有指令（v-model）和表达式（{{}}）
- 3 遍历传入 data 中的数据，分别通过 Object.defineProperty() 实现每个数据的 get/set
- 4 每个数据的 get/和 set 中，分别与页面中使用该数据的指令和表达式对应起来
- 5 将来当数据改变的时候，通过 设定好的 set，将数据的变化同步到页面中

#### 9.2 路由的原理。

答：main.js 入口配置好路由,

在 app.vue 根组件中引入 router-view 标签,在 router 组件中配置各种路由
location.hash hashchange 事件

在访问 google plus 和网易 m 站时，细心的用户也许会发现页面之间的点击是通过 ajax 异步请求的，同时页面的 URL 发生了了改变。并且能够很好的支持浏览器的前进和后退。不禁让人想问，是什么有这么强大的功能呢？

HTML5 里引用了新的 API，就是 history.pushState 和 history.replaceState，就是通过这个接口做到无刷新改变页面 URL 的。

对应 history.pushState 和 history.replaceState 的具体用法可以参考下面这几篇文章：

HTML5 history 新特性 pushState、replaceState
传统的 ajax 的问题

虽然 ajax 可以无刷新改变页面内容，但无法改变页面 URL
为了更好的可访问性，内容发生改变后，改变 URL 的 hash。

但是 hash 的方式不能很好的处理浏览器的前进、后退等问题 有的浏览器引入了 onhashchange 的接口，不支持的浏览器只能定时去判断 hash 是否改变

ajax 的使用对搜索引擎很不友好，往往蜘蛛爬到的区域是空的
为了解决传统 ajax 带来的问题，HTML5 里引入了新的 API，即：history.pushState, history.replaceState 可以通过 pushState 和 replaceState 接口操作浏览器历史，并且改变当前页面的 URL。

#### 9.3 数据请求的原理。

答：axios 原理也是 ajax。
3.3 vue2.0 源码的实现过程

### 10.工作中遇到的 bug?

浏览器兼容，移动端兼容问题

### 11.模块化与组件化

模块化开发以 js 文件功能分类，
组件化开发把 js,html,css 放到一个文件里，功能独立
vue~resource 支持 jsonp,vue2.0 以上不支持

### 12.axio 跨域问题怎么解决？

需要封装 jsonp,或者用 cros
服务器设置，
跨域：jsonp 支持低版本浏览器,
cros 高版本浏览器,反向代理
服务器允许跨域的代码：

```js
//允许所有的域名访问这个接口
header('Access-Control-Allow-Origin:*')
//允许www.study.com这个域名访问这个接口
header('Access-Control-Allow-Origin:http://www.jepson.com')
//vue获取更新后的数据
```

ajax
返回出现 error,datatype 没设置
模板引擎的原理是利用正则表达式定义标签替换{}语句中的内容
，模板引擎的缺点不利于 seo,无法准确定位错误

h5css3
browersync 调试工具
httpcache 离线缓存

fiddler 拦截后端请求，模拟数据请求返回

测试前后端数据
get 请求直接在 url 地址栏，也可以用 fiddler,postmessage

### 13.协作测试 api 接口 ip 统一设置

```js
const os = require('os')
var IPv4, net
const platform = os.platform()
switch (platform) {
  case 'darwin':
    // mac
    net = os.networkInterfaces().en0
    break
  case 'win32':
    // windows
    net = os.networkInterfaces()['以太网']
    break
  default:
    net = []
    break
}
for (var i = 0; i < net.length; i++) {
  if (net[i].family == 'IPv4') {
    IPv4 = net[i].address
  }
}
if (!IPv4) {
  IPv4 = 'localhost'
}
```

### 14.多行溢出样式打包问题

```css
/*! autoprefixer: off */
-webkit-box-orient: vertical;
/* autoprefixer: on */
```

### 15.生命周期的具体使用

- created 初始化静态数据
  - created 在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，\$el 属性目前不可见。
- mounted 初始化列表数据和搜索下拉数据 - mounted el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
  注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.\$nextTick 替换掉 mounted

### 16.页面刷新 vuex 数据丢失

```js

      // 在页面加载时读取sessionStorage里的状态信息
			const sessionStore = window.sessionStorage.getItem(storeKey.vuexStore)
			if (sessionStore) {
				let store = {}
				Object.assign(store, this.$store.state, JSON.parse(sessionStore))
				this.$store.replaceState(store)
				window.sessionStorage.removeItem(storeKey.vuexStore)
			}

			// 在页面刷新时将vuex里的信息保存到sessionStorage里
			// ie、谷歌、360 页面刷新执行顺序 onbeforeunload -> onunload -> onload，关闭执行顺序 onbeforeunload -> onunload
			// firefox 页面刷新只执行 onunload，页面关闭只执行 onbeforeunload
			let eventName = 'beforeunload'
			const fireFox = navigator.userAgent.indexOf('Firefox') !== -1
			if (fireFox) {
				eventName = 'unload'
			}
			window.addEventListener(eventName, () => {
				// 根据用户名是否存在判断是退出还是刷新
				const uname = this.$store.state.account.userInfo.uname
				if (uname) {
					window.sessionStorage.setItem(
						storeKey.vuexStore,
						JSON.stringify(this.$store.state)
					)
				}
```
