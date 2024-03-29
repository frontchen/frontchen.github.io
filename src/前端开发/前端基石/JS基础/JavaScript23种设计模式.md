---
title: JavaScript23种设计模式
tag: JS基础
date: 2018-11-24
category:
  - 前端基石
---

# 23 种设计模式

## 总体来说设计模式分为三大类：

- ① 创建型模式 共五种：工厂方法模式、抽象工厂模式、单例模式、建造者模式、原型模式。
- ② 结构型模式，共七种：适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式。
- ③ 行为型模式，共十一种：策略模式、模板方法模式、观察者模式、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式。

### 1.创建型模式

#### <1>.工厂函数

简单来说就是封装后的代码，简单的工厂模式是很好理解的，关于它的作用，就是利用面向对象的方法，把一些对象封装，使一些占用空间多的，重复的代码封装起来。实现方法非常简单，也就是在函数内创建一个对象，给对象赋予属性以及方法再将对象返回即可。

```js
/**
 * 构造一个动物的函数
 */
function creatper(name, age) {
  var per = new Object() //原料

  //加工

  per.name = name

  per.age = age

  per.sayHi = function () {
    console.log(per.name + '' + per.age)
  }

  return per //出厂
}
//实例一个对象
var me = creatper('katherine', 22)

me.sayHi()

console.log(me.name)
```

可以看出，使用工厂模式，可以重复调用这个 per 函数来生成不同属性值得对象，这就像工厂一样，批量生产，里面的原料，加工，出厂都很清晰。但是你会发现工厂模式是无法识别对象的类型，因为全都是 object，不像 Date，Array 等，但是构造函数就不是了。这还只是简单的工厂模式，复杂的工厂模式（抽象模式）等以后再回来详细了解。

#### <2>单例模式

- 传统单例模式:保证一个类仅有一个实例，并提供一个访问它的全局访问点。
- 实现单例核心思想
  - 无非是用一个变量来标志当前是否已经为某个类创建过对象，如果是，则在下一次获取该类的实例时，直接返回之前创建的对象，接下来我们用 JavaScript 来强行实现这个思路，

```js
var CreateDiv = function (html) {
  this.html = html
  this.init()
}

CreateDiv.prototype.init = function () {
  var div = document.createElement('div')
  div.innerHTML = this.html
  document.body.appendChild(div)
}

var ProxySingletonCreateDiv = (function () {
  var instance
  return function (html) {
    if (!instance) {
      instance = new CreateDiv(html)
    }
    return instance
  }
})()

var a = new ProxySingletonCreateDiv('sven1')
var b = new ProxySingletonCreateDiv('sven2')

alert(a === b) //true

//单例模式抽象，分离创建对象的函数和判断对象是否已经创建
var singleton = function (fn) {
  var result
  return function () {
    return result || (result = fn.apply(this, arguments)) //fn.apply相当于直接调用函数，只是将函数内的this（上下文）改变了
  }
}

var createMask = singleton(function () {
  return document.body.appendChild(document.createElement('div'))
})
```

#### <2>.构造函数模式

ECMAScript 中构造函数可以用来创建特定对象，类似于 Array，Date 等原生的 js 对象

```js
function Student(name, age, classa) {
  this.name = name
  this.age = age
  this.classa = classa
  this.sayHello = function () {
    console.log(this.name, this.age, this.classa)
  }
}
var me = new Student('xiaoai', 22, '大三')
console.log(me.classa)
me.sayHello()
console.log(me instanceof Student) //true****
```

由代码可以看出，于工厂模式除了函数名不同以外，还要注意：构造函数名的首字母大写（不过好像没有严格规定）。构造函数也没有显示创建的对象，使用了 this，直接把属性和方法赋值给了 this 对象。没有 return 语句，实例化的时候要使用 new，而且它能够识别对象（这正是构造函数模式胜于工厂模式的地方）。

构造函数虽然好用，但也有很大的缺点，就是每次创建实例的时候都要重新创建一次方法，实际应用中，每次创建对象的时候属性值不同，而对象的方法却是相同的，所以创建两次完全相同的方法是没有必要的

## 3.原型模式

js 规定每一个创建的函数都有 prototype（原型）属性，这个属性是指针，指向一个对象，而这个对象的用途是包含由特定类型的所有实例所共享的属性和方法，使用原型对象就可以让所有实例对象均包含这些属性及方法。
