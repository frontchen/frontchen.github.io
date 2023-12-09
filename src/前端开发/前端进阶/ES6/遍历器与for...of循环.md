---
title: 遍历器与for...of循环
tag:
  - 遍历器
  - forof
category:
  - 前端进阶
  - ES6
---

## Iterator 是什么

1. Iterator(遍历器)的作用:它是用来`遍历`的
2. 使用 Iterator

```js
const it = [1, 2][Symbol.iterator]()
console.log(it.next())
console.log(it.next())
console.log(it.next())
```

- it:可遍历对象
- Symbol.iterator：可遍历对象的生成方法

3. 什么是 Iterator
   Symbol.iterator（可遍历对象的生成方法）->it（可遍历对象）-> it.next() ->it. next()->…(直到 done 为 true)
   这个过程被称为`Iterator`

## Symbol 详解

[Symbol](https://es6.ruanyifeng.com/#docs/symbol) 是 ES6 中引入的一种新的基本数据类型，用于表示一个独一无二的值。它是 JavaScript 中的第七种数据类型，与 undefined、null、Number（数值）、String（字符串）、Boolean（布尔值）、Object（对象）并列。

### 基础语法

创建一个 Symbol 值的方式如下：

```js
const a = Symbol()
const b = Symbol()
console.log(a) //Symbol()
console.log(b) //Symbol()
console.log(typeof a) // 类型是：Symbol
console.log(a === b) // false 可以知道Symbol的值是唯一的
```

如果同时定义两个 Symbol 值，它们打印的结果都是：Symbol(),为此，我们可以在调用 Symbol 的时候传入一个字符串作为对当前 Symbol 变量的描述：

```js
let a = Symbol('symbol1')
let b = Symbol('symbol2')
console.log(a) //Symbol("symbol1")
console.log(b) //Symbol("symbol2")
```

注意： **调用 Symbol 时不可以使用 new 关键字**

```js
//报错，Symbol is not a constructor
const a = new Symbol()
```

### Symbol 属性的遍历

以 Symbol 类型的变量作为对象属性时，该属性不会出现在 for … in、for … of 循环中
举个例子：

```js
let s1 = Symbol('a')
let s2 = Symbol('b')
// 由于 s1 和 s2 是一个变量，而不是字符串，因此需要使用中括号括起来（否则它会被当做字符串使用）
let a = {
  name: '夕山雨',
  [s1]: 24,
  [s2]: function () {},
}
```

for…in 方式遍历 obj 对象时，Symbol 类型的属性没有输出，只输出了 name 属性

### Symbol.for()，Symbol.keyFor()

(1)Symbol.for()：Symbol 提供的一种可以创建相同 Symbol 的机制，就是使用 Symbol.for()方法进行注册。示例：

```js
let a = Symbol.for('imooc') //全局注册了以"imooc"为描述符的 Symbol
//由于描述符"imooc"已被注册到全局，因此这里创建的 Symbol 与上面是同一个
let b = Symbol.for('imooc')
console.log(a === b) // true
```

(2)Symbol.keyFor()：返回一个全局注册的 Symbol 的描述符

```js
let a = Symbol.for('imooc')
// 返回结果是已经注册过的变量 a 的描述符 imooc
let res = Symbol.keyFor(a)
console.log(res) // imooc
```

### Symbol 的作用

由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。

```js
let s1 = Symbol()
let s2 = Symbol()
const obj = {
  age: 16,
  age: 19,
  [s1]: 'Hello!',
  [s2]: 'world',
}
console.log(obj)
```

由于 age 是字符串类型的，同名属性会被覆盖，所以 obj 对象中只会有一个 age 属性，而 Symbol 值是唯一的，即使控制台中输出结果看起来是一样的，但他们并不表示同一个值，所以 obj 中 s1 和 s2 都被添加到 obj 对象中

注： 为了方便区分，可以给 Symbol 值添加描述

### 常用内置的 Symbol 值：Symbol.iterator

对象的 [Symbol.iterator] 属性，指向该对象的默认遍历器方法 ，凡是具有`[Symbol(Symbol.iterator)]`属性的对象都是可遍历的，可以使用 for … of 循环依次输出对象的每个属性

数组和类数组，以及 ES6 新增的 Map、Set 等都原生部署了该方法，因此它们都可遍历

### Symbol 与基本数据类型转换

（1）Symbol 不能转成数字。示例：

```js
let s1 = Symbol('1')
// 报错
console.log(Number(s1))
```

(2) 可以转成布尔值和字符串

```js
// Symbol 值可以通过 String 转成字符串形式，通过 Boolean 转成布尔值
let s1 = Symbol('1')
console.log(typeof s1) // symbol
let str = String(s1)
console.log(typeof str) // string
let bool = Boolean(s1)
console.log(typeof bool) // boolean
```

## Iterator 解惑

Iterator 是一个统一的`遍历方式`, 我们一般**不会直接**使用 Iterator 去遍历

## for...of 的用法

[mdn 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)

1.认识 for...of：**Iterator 的封装**

```js
const arr = [1, 2, 3, 4]
for (const item of arr) {
  console.log(item)
}
```

2. 与 break,continue 一起使用

```js
const arr = [1, 2, 3, 4]
for (const item of arr) {
  if (item === 2) {
    break
    // continue
  }
  console.log(item)
}
```

3. 在 for...of 中取得数组的索引

- keys()得到的是索引的可遍历对象，可以遍历出索引值

```js
const arr = [1, 2, 3, 4]
for (const key of arr.keys()) {
  console.log(key)
}
```

- values()得到的是值的可遍历对象，可以遍历出值，`多此一举`，和直接使用 for...of 方法效果一样

- entries()得到的是索引+值组成的`数组`的可遍历对象

```js
const arr = [11, 21, 31, 4]
// 解构赋值
for (const [key, value] of arr.entries()) {
  console.log(key, value)
}
```

## 原生可遍历与非原生可遍历

1. 什么是可遍历

只要有 **[Symbol.iterator]** 方法，就是可遍历的，只要可遍历，就可以使用 for...of 循环来统一遍历

2. 原生可遍历的有哪些？

- 数组
- 字符串
- Set
- Map
- arguments
- NodeList

3. 非原生可遍历的有哪些？ 对象

## 使用了 Iterator 的场合

1. 数组的展开运算符

2. 数组的解构赋值

```js
const [a, b] = 'hi'
const [a, b] = new Set([3, 4])
```

**只要是原生可遍历的就可以按照数组的方式展开，解构**

## 遍历总结

### for

- 用于遍历`数组`,`字符串`,`类数组对象`(NodeList,arguments)

- 可以使用 break,continue 语句

### forEach

**forEach 方法对数组的每个元素执行一次给定的函数**

- 用于遍历`数组`, `Set`和`Map`数据结构
- 可以通过回调函数参数传入**value,key 和自身**,同时可以改变 this 指向(**回调函数为非箭头函数时**)

- **不能使用 break 和 continue 语句**

[map 和 forEach:数组中 forEach() 和 map() 的区别](https://blog.csdn.net/weixin_46837985/article/details/112211133)

### for in

[JavaScript for...in 循环出来的对象属性顺序到底是什么规律？](https://blog.csdn.net/weixin_34051201/article/details/91377138)

- 用于遍历`数组`(**不推荐，for...in 不应该用于迭代一个关注索引顺序的 `Array`**),`对象`,`字符串`
- 只能获得 key,**没有 value**
- 可以使用 break 和 continue 语句

### for of

- 用于遍历`数组`,`字符串`,`Set`,`Map`,`NodeList`,`arguments`(**原生可遍历**),**不能直接遍历对象**
- 默认获得 value,但可以通过 keys(),values(),entries()获得对应可遍历对象
- 可以使用 break 和 continue 语句
