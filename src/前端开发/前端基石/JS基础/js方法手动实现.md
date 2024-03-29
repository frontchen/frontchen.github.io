---
title: js方法手动实现
tag: JS基础
date: 2019-06-12
category:
  - 前端基石
---

## js 方法手动实现

### 1.实现 Object.assign(target,obj,obj1)

- Object.assign 是浅拷贝,对于值是引用类型的属性,拷贝仍旧的是它的引用
- 可以拷贝 Symbol 属性
- 不能拷贝不可枚举的属性
- Object.assign 保证 target 始终是一个对象,如果传入一个基本类型,会转为基本包装类型,null/undefined 没有基本包装类型,所以传入会报错
- source 参数如果是不可枚举的数据类型会忽略合并(字符串类型被认为是可枚举的,因为内部有 iterator 接口)
- 因为是用等号进行赋值,如果被赋值的对象的属性有 setter 函数会触发 setter 函数,同理如果有 getter 函数,也会调用赋值对象的属性的 getter 函数(这就是为什么 Object.assign 无法合并对象属性的访问器,因为它会直接执行对应的 getter/setter 函数而不是合并它们,如果需要合并对象属性的 getter/setter 函数,可以使用 ES7 提供的 Object.getOwnPropertyDescriptors 和 Object.defineProperties 这 2 个 API 实现)

```js
let obj = {
  // 这里是ES6新增的getter/setter简写形式
  get a() {
    console.log('get')
    return 1
  },
  set a(val) {
    console.log('set')
  }
}
let obj2 = {}
Object.defineProperties(obj2, Object.getOwnPropertyDescriptors(obj))
console.log('obj', obj)
console.log('obj2', obj2)
// {}
// a: 1
// get a: ƒ a()
// set a: ƒ a(val)
```

模拟 Object.assign 的实现

```js
'use strict' //启用严格模式在尝试给基本包装类型已定义的下标赋值的时候报错

const isComplexDataType = obj =>
  (typeof obj === 'object' || typeof obj === 'function') && obj !== null

//简单实现ES6的Object.assign
const selfAssign = function (target, ...source) {
  if (target == null)
    throw new TypeError('Cannot convert undefined or null to object')
  return source.reduce((acc, cur) => {
    isComplexDataType(acc) || (acc = new Object(acc)) //变成一个基本包装类型
    if (cur == null)
      return acc //source为null,undefined时忽略
      // 遍历出Symbol属性和可枚举属性
    ;[...Object.keys(cur), ...Object.getOwnPropertySymbols(cur)].forEach(
      key => {
        acc[key] = cur[key]
      }
    )
    return acc
  }, target)
}

Object.selfAssign ||
  Object.defineProperty(Object, 'selfAssign', {
    value: selfAssign,
    configurable: true,
    enumerable: false,
    writable: false
  })

let target = {
  a: 1,
  b: 1
}

let obj1 = {
  a: 2,
  b: 2,
  c: undefined
}

let obj2 = {
  a: 3,
  b: 3,
  [Symbol('a')]: 3,
  d: null
}

console.log(Object.selfAssign(target, obj1, obj2))
console.log(Object.selfAssign('abd', null, undefined))
```

### 2.实现函数 bind 方法

函数的 bind 方法核心是利用 call，同时考虑了一些其他情况，例如

- bind 返回的函数被 new 调用作为构造函数时，绑定的值会失效并且改为 new 指定的对象
- 定义了绑定后函数的 length 属性和 name 属性（不可枚举属性）
- 绑定后函数的原型需指向原来的函数

```js
const isComplexDataType = obj =>
  (typeof obj === 'object' || typeof obj === 'function') && obj !== null

// 实现一个简易的bind
const selfBind = function (bindTarget, ...args1) {
  if (typeof this !== 'function')
    throw new TypeError('Bind must be called on a function')
  let func = this
  let boundFunc = function (...args2) {
    let args = [...args1, ...args2]

    // 使用new关键字调用返回新对象
    if (new.target) {
      let res = func.apply(this, args)
      //如果构造函数返回一个对象则返回这个对象
      if (isComplexDataType(res)) return res
      //否则返回新建的对象
      return this
    } else {
      func.apply(bindTarget, args)
    }
  }
  // 绑定后的函数继承绑定前的函数(非箭头函数)
  /**真正的bind创建的函数是没有prototype的,但是使用new会将创建的对象连接到bind前函数的prototype(非箭头函数)**/
  this.prototype && (boundFunc.prototype = Object.create(this.prototype))

  // 定义绑定后函数的长度和名字
  let desc = Object.getOwnPropertyDescriptors(func)
  Object.defineProperties(boundFunc, {
    length: desc.length,
    name: Object.assign(desc.name, {
      value: `bound ${desc.name.value}`
    })
  })
  return boundFunc
}

Function.prototype.selfBind ||
  Object.defineProperty(Function.prototype, 'selfBind', {
    value: selfBind,
    enumerable: false,
    configurable: true,
    writable: true
  })

function func() {
  this.name = 'yeyan1996'
  return {}
}

let example = {
  age: 22
}

let boundFunc = func.selfBind(example)

console.dir(func)
console.dir(boundFunc)

boundFunc()
console.log(example)

let x = new boundFunc()
console.log(x)
```

### 3.实现函数 call 方法

```js
//selfCall(ES6版本)
const selfCall = function (context, ...args) {
  let func = this
  context || (context = window)
  if (typeof func !== 'function') throw new TypeError('this is not function')
  let caller = Symbol('caller')
  context[caller] = func
  let res = context[caller](...args)
  delete context[caller]
  return res
}

Function.prototype.selfCall ||
  Object.defineProperty(Function.prototype, 'selfCall', {
    value: selfCall,
    enumerable: false,
    configurable: true,
    writable: true
  })

let example2 = { a: 1 }
func.selfCall(example2)
console.log(example2)
```

原理就是将函数作为传入的上下文参数（context）的属性执行，这里为了防止属性冲突使用了 ES6 的 Symbol 类型

### 9. 实现 es6 的 class 语法

```js
//简单模拟ES6的class实现
// class Animal {
//     constructor(name) {
//     this.name = name
//     }
//
//     sleep() {
//     console.log('animal is sleeping')
//     }
//
//     static staticFunc() {
//     console.log('staticFunc')
//     }
// }
//
// class Dog extends Animal {
//     constructor(name, color) {
//     super(name)
//     this.color = color
//     }
//
//     barking() {
//     console.log('wang!')
//     }
// }
//
// let brownTeddy = new Dog('teddy', 'brown')
// Dog.staticFunc()
// console.log(brownTeddy)
// brownTeddy.sleep()
// brownTeddy.barking()

function Animal(name) {
  this.name = name
}

Animal.staticFunc = function () {
  console.log('staticFunc')
}
Animal.prototype.sleep = function () {
  console.log('animal is sleeping')
}

function Dog(name, color) {
  Animal.call(this, name)
  this.color = color
}

//寄生组合式继承 + 构造函数之间的继承
function inherit(subType, superType) {
  //由于JavaScript引用类型和函数按值传递的特性，不能改变subType的引用地址
  subType.prototype = Object.create(superType.prototype, {
    constructor: {
      enumerable: false,
      configurable: true,
      writable: true,
      // 指向子类，和默认的继承行为保持一致
      value: subType
    }
  })
  //子构造函数继承父构造函数(子类继承父类的静态方法和静态属性)
  Object.setPrototypeOf(subType, superType)
}

inherit(Dog, Animal)

//需要在继承之后再往Dog中添加原型方法，否则会被覆盖掉
Dog.prototype.barking = function () {
  console.log('wang!')
}

let brownTeddy = new Dog('teddy', 'brown')
Dog.staticFunc()
console.log(brownTeddy)
brownTeddy.sleep()
brownTeddy.barking()
```

### 10.函数柯里化

柯里化是函数式编程的一个重要技巧，将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术

```js
/**
 * @description 函数柯里化（根据柯里化前的函数的参数数量决定柯里化后的函数需要执行多少次）
 * @param {function} fn -柯里化的函数
 */

function curry(fn) {
  if (fn.length <= 1) return fn
  const generator = (...args) => {
    if (fn.length === args.length) {
      //执行fn并且返回执行结果
      return fn(...args)
    } else {
      return (...args2) => {
        //返回generator函数
        return generator(...args, ...args2)
      }
    }
  }
  return generator
}

const display = (a, b, c, d, e, f, g, h) => [a, b, c, d, e, f, g, h]
const curriedDisplay = curry(display)
console.log('curriedDisplay', curriedDisplay(1)(2)(3)(4)(5)(6)(7)(8))

//ES6简写
const curry2 = fn => {
  if (fn.length <= 1) return fn
  const generator = (...args) =>
    args.length === fn.length
      ? fn(...args)
      : (...args2) => generator(...args, ...args2)
  return generator
}
const curriedDisplay2 = curry2(display)
console.log('curriedDisplay2', curriedDisplay2(1)(2)(3)(4)(5)(6)(7)(8))

/**
 * @description 函数柯里化（支持占位符版本）
 * @param {function} fn -柯里化的函数
 * @param {String} [placeholder = "_"] -占位符
 */
const curry3 = (fn, placeholder = '_') => {
  curry3.placeholder = placeholder
  if (fn.length <= 1) return fn
  let argsList = []
  const generator = (...args) => {
    let currentPlaceholderIndex = -1 // 记录了非当前轮最近的一个占位符下标，防止当前轮元素覆盖了当前轮的占位符
    args.forEach(arg => {
      let placeholderIndex = argsList.findIndex(
        item => item === curry3.placeholder
      )
      if (placeholderIndex < 0) {
        // 如果数组中没有占位符直接往数组末尾放入一个元素
        currentPlaceholderIndex = argsList.push(arg) - 1
        // 防止将元素填充到当前轮参数的占位符
        // (1,'_')('_',2) 数字2应该填充1后面的占位符，不能是2前面的占位符
      } else if (placeholderIndex !== currentPlaceholderIndex) {
        argsList[placeholderIndex] = arg
      } else {
        // 当前元素是占位符的情况
        argsList.push(arg)
      }
    })
    let realArgsList = argsList.filter(arg => arg !== curry3.placeholder) //过滤出不含占位符的数组
    if (realArgsList.length === fn.length) {
      return fn(...argsList)
    } else if (realArgsList.length > fn.length) {
      throw new Error('超出初始函数参数最大值')
    } else {
      return generator
    }
  }

  return generator
}
const curriedDisplay3 = curry3(display)
console.log(
  'curriedDisplay3',
  curriedDisplay3('_', 2)(1, '_', 4)(3, '_')('_', 5)(6)(7, 8)
)

//函数组合+函数柯里化
const compose = function (...fns) {
  return function (initValue) {
    return fns.reduceRight((acc, cur) => {
      return cur(acc)
    }, initValue)
  }
}

const curriedJoin = curry3((separator, arr) => arr.join(separator))
const curriedMap = curry3((fn, arr) => arr.map(fn))
const curriedSplit = curry3((separator, str) => str.split(separator))

const composeFunc = compose(
  curriedJoin('1'),
  curriedMap(item => `${item}1`),
  curriedSplit('')
)

console.log('compose + curry', composeFunc('helloworld'))

/**
 * @description 偏函数（创建已经设置好一个或多个参数的函数,并且添加了占位符功能）
 * @param {Function} func -部分求值的函数
 * @param {...*} [args] -部分求值的参数
 * @return {Function} -部分求值后的函数
 **/

const partialFunc = (func, ...args) => {
  let placeholderNum = 0
  return (...args2) => {
    args2.forEach(arg => {
      let index = args.findIndex(item => item === '_')
      if (index < 0) return
      args[index] = arg
      placeholderNum++
    })
    if (placeholderNum < args2.length) {
      args2 = args2.slice(placeholderNum, args2.length)
    }
    return func.apply(this, [...args, ...args2])
  }
}

let partialDisplay = partialFunc(display, 1, 2)
console.log('partialFunc', partialDisplay(3, 4, 5, 6, 7, 8))

let partialDisplay2 = partialFunc(display, '_', 2, '_')
console.log('partialFunc2', partialDisplay2(1, 3, 4, 5, 6, 7, 8))
```

### 11.函数防抖

```js
/**
 * @description 函数防抖
 * @param {Function} func -需要函数防抖的函数
 * @param {Number} time -延迟时间
 * @param {Options} options -配置项
 * @return {Function} -经过防抖处理的函数
 **/

/**
 * @typedef {Object} Options -配置项
 * @property {Boolean} leading -开始是否需要额外触发一次
 * @property {Boolean} trailing -结束后是否需要额外触发一次
 * @property {this} context -上下文
 **/

const debounce = (
  func,
  time = 17,
  options = {
    // leading 和 trailing 无法同时为 false
    leading: true,
    trailing: true,
    context: null
  }
) => {
  let timer
  const _debounce = function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    if (options.leading && !timer) {
      timer = setTimeout(null, time)
      func.apply(options.context, args)
    } else if (options.trailing) {
      timer = setTimeout(() => {
        func.apply(options.context, args)
        timer = null
      }, time)
    }
  }
  /**
   * @description 取消函数
   * @see https://juejin.im/post/5931561fa22b9d0058c5b87d
   **/
  _debounce.cancel = function () {
    clearTimeout(timer)
    timer = null
  }
  return _debounce
}
```

### 12.优雅的处理 async/await

```js
// async/await 优雅处理方式
async function errorCaptured(asyncFunc) {
  try {
    let res = await asyncFunc()
    return [null, res]
  } catch (e) {
    return [e, null]
  }
}

let asyncFunc = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve('success') : reject('error')
    }, 1000)
  })
}

async function func() {
  let [err, res] = await errorCaptured(asyncFunc)
  console.log('res', res)
  console.log('err', err)
}

func()
```

### 13.手写 前端状态管理器

```js
class PubSub {
  constructor() {
    //收集事件
    this.events = {}
  }
  //发布
  publish(event, data = {}) {
    const self = this
    /*
     * 校验是否存在事件
     * 默认返回一个空数组
     */
    if (!self.events.hasOwnProperty(event)) {
      return []
    }
    // 遍历执行事件队列里的回调函数
    return self.events[event].map(callback => callback(data))
  }
  // 订阅
  subscribe(event, callback) {
    const self = this

    /*
     * 校验是否存在事件
     * 默认给一个空数组
     */
    if (!self.events.hasOwnProperty(event)) {
      self.events[event] = []
    }

    // 将事件推入回调队列
    return self.events[event].push(callback)
  }
}

class Store {
  // 传入params对象
  constructor(params) {
    const self = this
    // 实例化发布订阅
    self.events = new PubSub()
    self.actions = {} // 异步任务对象
    self.mutations = {} // 同步任务对象
    self.state = {} // 全局状态对象
    self.plugins = [] // 插件
    self.status = 'resting' // 初始状态

    /*
     * 初始化设置actions对象
     * 该对象主要处理异步事件
     */
    if (params.hasOwnProperty('actions')) {
      self.actions = params.actions
    }

    /*
     * 初始化设置mutations对象
     * 该对象主要处理同步事件
     */
    if (params.hasOwnProperty('mutations')) {
      self.mutations = params.mutations
    }

    // 插件
    if (params.hasOwnProperty('plugins')) {
      self.plugins = params.plugins
    }

    /*
     * 代理监听state
     */
    self.state = new Proxy(params.state || {}, {
      set(state, key, value) {
        // 代理设置state对象并赋值
        state[key] = value

        // 添加发布事件
        self.events.publish('stateChange', self.state)
        // 更改状态
        self.status = 'resting'

        return true
      }
    })
  }

  commit = (mutationKey, payload) => {
    const self = this
    // 校验是否存在函数
    if (typeof self.mutations[mutationKey] !== 'function') {
      console.warn(`Mutation ${mutationKey} dose not exist`)
      return false
    }

    // 变更状态
    self.status = 'mutation'
    let newState = self.mutations[mutationKey](self.state, payload)
    self.state = Object.assign(self.state, newState)

    return true
  }
  dispatch = (actionKey, payload) => {
    const self = this

    // 校验是否存在函数
    if (typeof self.actions[actionKey] !== 'function') {
      console.warn(`Action ${actionKey} dose not exist`)
      return false
    }

    // 变更状态
    self.status = 'action'

    // 执行对应函数，并传入commit
    self.actions[actionKey]({ commit: self.commit }, payload)

    return true
  }
}
// 实例场景
const MyStore = new Store({
  state: {
    text: ''
  },
  mutations: {
    init: (state, payload) => {
      state.text = payload
    }
  },
  actions: {
    init: ({ commit }, payload) => {
      setTimeout(() => {
        commit('init', payload)
      }, 200)
    }
  },
  plugins: [
    function () {
      console.log('plugins')
    }
  ]
})

// 执行同步事件
MyStore.commit('init', 'hello init')

// 执行异步事件
MyStore.dispatch('init', 'hello async init')
```
