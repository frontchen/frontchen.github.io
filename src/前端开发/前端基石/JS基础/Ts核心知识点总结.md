---
title: Ts核心知识点总结
tag: JS基础
date: 2020-12-21
category:
  - 前端基石
---

## 核心知识点

### 1. 基础类型

TypeScript 支持与 JavaScript 几乎相同的数据类型，此外还提供了实用的枚举类型方便我们使用。接下来我们简单介绍一下这几种类型的用法.

```ts
// 布尔类型
let isCookie: boolean = true

// 数值类型
let myMoney: number = 12

// 字符串类型
let name: string = '徐小夕'

// 数组类型, 有两种表示方式,第一种可以在元素类型后面接上[]，表示由此类型元素组成的一个数组
let arr: number[] = [1, 2, 2]

// 数组类型, 使用数组泛型
let arr: Array<number> = [1, 2, 2]

// 元组类型, 允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
let xi: [string, number]
// 初始化xi
xi = ['xu', 10] // 正确
xi = [11, 'xu'] // 错误

// 枚举类型, 可以为一组数值赋予友好的名字
enum ActionType {
  doing,
  done,
  fail
}
let action: ActionType = ActionType.done // 1

// any, 表示任意类型, 可以绕过类型检查器对这些值进行检查
let color: any = 1
color = 'red'

// void类型, 当一个函数没有返回值时，通常会设置其返回值类型是 void
function getName(): void {
  console.log('This is my name')
}

// object类型, 表示非原始类型，也就是除number，string，boolean，symbol，null或undefined之外的类型
let a: object
a = { props: 1 }
```

以上是 typescript 中常用的几种类型, 也是我们必须掌握的基本知识. 这里值得补充的是 typescript 的类型断言, 也是解决 ts 警告的利器,比如我们确切的知道某种数据的数据类型,我们可以这么做:

```ts
let arrLen: number = (someValue as Array<string>).length
// 解决window下设置属性的ts报错, 但不可滥用
;(window as any).name = 'xuxi'
```

### 2. 接口

TypeScript 的核心原则之一是对值所具有的结构进行类型检查。  在 TypeScript 里，接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约。接下来我们看看如何定义和使用接口(Interface):

```ts
interface Product {
  name: string
  size: number
  weight: number
}

let product1: Product = {
  name: 'machine1',
  size: 20,
  weight: 10.5
}
```

类型检查器不会去检查属性的顺序，只要相应的属性存在并且类型也是对的就可以。其次我们还可以定义可选属性和只读属性.  可选属性表示了接口里的某些属性不是必需的,所以可以定义也可以不定义.可读属性使得接口中的某些属性只能读取而不能赋值. 具体案例如下:

```ts
interface Product {
  name: string
  size?: number
  readonly weight: number
}
```

在实际场景中, 我们往往还会遇到不确定属性名和属性值类型的情况, 这种情况往往发生在第三发 SDK 接入或者后端响应中, 这个时候我们可以利用索引签名来设置额外的属性和类型, 案例如下:

```ts
interface App {
  name: string
  color?: number
  [propName: string]: any
}
```

接口除了描述带有属性的普通对象外，也可以描述函数类型。我们需要给接口定义一个调用签名, 参数列表里的每个参数都需要名字和类型。案例如下:

```ts
interface MyFunc {
  (value: string, type: number): boolean
}
// 使用
let myLoveFront: MyFunc
myLoveFront = function (value: string, type: number) {
  return type > 1
}
```

我们在 vue 和 react 开发中,也会经常使用 class 这种类来编写可复用组件和库, 既然 ts 可以描述函数类型, 那么是不是也可以用来描述类类型呢? 答案是可以的.但是类接口的定义稍微有点复杂, 我们都知道类是具有两个类型的：静态部分的类型和实例的类型. 当一个类实现了一个接口时，只对其实例部分进行类型检查。constructor 存在于类的静态部分，所以不在检查的范围内。. 这句话相当关键, 我们在定义类接口的时候也要主要这一特点, 案例如下:

```ts
interface TickConstructor {
  new (hour: number, minute: number): TickInterface
}
interface TickInterface {
  tick()
}

function createClock(
  ctor: ClockConstructor,
  hour: number,
  minute: number
): TickInterface {
  return new ctor(hour, minute)
}

class DigitalClock implements TickInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log('xu xu')
  }
}
class MyTick implements TickInterface {
  constructor(h: number, m: number) {}
  tick() {
    console.log('tick tock')
  }
}

let digital = createClock(DigitalTick, 12, 17)
let analog = createClock(MyTick, 7, 32)
```

掌握了这些关键的接口类型和使用方法, 对于 ts 的学习基本上可以入门了.

### 3. 类

关于类接口的话题我们在上文已经介绍了, 这里我们来具体了解一下类. 和 js 的 class 一致, typescript 的类有公共，私有与受保护的修饰符. 具体含义如下:

- public  在 TypeScript 里，成员都默认为 public,我们可以自由的访问程序里定义的成员
- private  当成员被标记成 private 时，它就不能在声明它的类的外部访问
- protected  和 private 类似, 但是 protected 成员在派生类中仍然可以访问

具体案例如下:

```ts
class Person {
  protected name: string
  constructor(name: string) {
    this.name = name
  }
}

class Employee extends Person {
  private department: string

  constructor(name: string, department: string) {
    super(name)
    this.department = department
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`
  }
}
```

同样我们也可以为类中的某个属性定义 readonly 修饰符和定义 static 静态属性, 唯一值得说的是抽象类.

> 抽象类做为其它派生类的基类使用。它们一般不会直接被实例化。不同于接口，抽象类可以包含成员的实现细节。abstract 关键字是用于定义抽象类和在抽象类内部定义抽象方法。

有关抽象类的案例简单介绍如下:

```ts
abstract class MyAbstract {
  constructor(public name: string) {}
  say(): void {
    console.log('say name: ' + this.name)
  }
  abstract sayBye(): void // 必须在派生类中实现
}

class AccountingMyAbstract extends MyAbstract {
  constructor() {
    super('小徐') // 在派生类的构造函数中必须调用 super()
  }
  sayBye(): void {
    console.log('趣谈小夕.')
  }
  getOther(): void {
    console.log('loading...')
  }
}

let department: MyAbstract // 允许创建一个对抽象类型的引用
department = new MyAbstract() // 错误: 不能创建一个抽象类的实例
department = new AccountingMyAbstract() // 允许对一个抽象子类进行实例化和赋值
department.say()
department.sayBye()
department.getOther() // 错误: 方法在声明的抽象类中不存在
```

### 4. 函数

函数类型在上文已经介绍过了, 这里主要在讲一下可选参数这个概念. JavaScript 里每个参数都是可选的，可传可不传。没传参的时候其值就是 undefined。在 TypeScript 里我们可以在参数名旁使用 ?实现可选参数的功能。具体案例如下:

```ts
function createName(firstName: string, lastName?: string) {
  if (lastName) return firstName + ' ' + lastName
  else return firstName
}
```

注意, 我们的可选参数必须跟在必选参数后面.

### 5. 泛型

我们可以使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据。这样用户就可以以自己的数据类型来使用组件。泛型是 typescript 中比较难懂的知识点, 但是非常重要, 几乎任何第三方组件库里都会用到. 我们先来看个最简单的例子:

```ts
function iSay<T>(arg: T): T {
  return arg
}
// 调用泛型函数
let come = iSay<number>(123)
```

我们给 iSay 添加了类型变量 T。T 帮助我们捕获用户传入的类型（比如：string），这样我们就可以使用这个类型。之后我们再次使用 T 当做返回值类型。现在我们可以知道参数类型与返回值类型是相同的了。这允许我们跟踪函数里使用的类型的信息。

我们还可以把泛型变量 T 当做类型的一部分使用，而不是整个类型, 这样可以增加我们的使用灵活性, 案例如下:

```ts
function iSay<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}
```

类似于函数类型的定义, 我们也可以定义泛型接口, 并且可以把泛型参数当作整个接口的一个参数, 这样我们就能清楚的知道使用的具体是哪个泛型类型. 案例代码如下:

```ts
interface SayLove {
    <T>(arg: T): T
}

// 把泛型参数当作整个接口的一个参数
interface SayLoveArg<T> {
    (arg: T): T
}

// 泛型函数
function iSay<T>(arg: T): T {
    return arg;

let mySay1:SayLove = iSay
let mySay2:SayLoveArg<number> = iSay

```

同样的我们还可以定义泛型类.我们只需要使用（<>）括起泛型类型，跟在类名后面即可. 具体案例如下:

```ts
class MyNumber<T> {
  year: T
  compute: (x: T, y: T) => T
}

let myGenericNumber = new MyNumber<number>()
```

我们还可以定义泛型约束来更准确的控制类的类型. 案例如下:

```ts
interface NumberControl {
    length: number
}

class MyObject<T extends NumberControl>(arg: T):T {
    console.log(arg.length)
    return arg
}
```

### 6. 高级类型

typescript 的高级类型里我们主要讲解如下核心知识点:

- 交叉类型
- 联合类型
- 多态的 this 类型
- 索引类型查询操作符
- 索引访问操作符

交叉类型是将多个类型合并为一个类型。我们可以把现有的多种类型叠加到一起成为一种类型，下面有个经典的例子供大家参考:

```ts
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{}
  for (let id in first) {
    ;(<any>result)[id] = (<any>first)[id]
  }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      ;(<any>result)[id] = (<any>second)[id]
    }
  }
  return result
}
```

我们通过字符  &  来表示联合, 此时以上代码中的返回值会具有 T 和 U 的类型.

联合类型表示一个值可以是几种类型之一。我们用竖线（|）分隔每个类型，所以 number | string | boolean 表示一个值可以是 number， string，或 boolean。具体例子如下:

```ts
let name: string | number = 'xuxiaoxi'

function sayName(name: string): string | number {
  return name
}
```

值得注意的是:  如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。

还有一种常见的需求是, 我们在实现自己的类后,需要支持类方法的链式调用, 这个时候我们应该返回 this, 在 typescript 中我们就需要了解多态的 this 类型. 它表示的是某个包含类或接口的子类型。这被称做 F-bounded 多态性。要想在 typescript 中支持链式, 我们可以这么写:

```ts
class MyCalculator {
  public constructor(number = 0) {}
  public add(n: number): this {
    this.value += n
    return this
  }
  public multiply(n: number): this {
    this.value *= n
    return this
  }
  // ... 其他操作 ...
}

let v = new MyCalculator(2).multiply(5).add(1)
```

下面一个我们需要知道的知识点是索引类型查询操作符. 一般用 keyof 表示。对于任何类型 T， keyof T 的结果为 T 上已知的公共属性名的联合。比如我们定义一个接口 Animal:

```ts
interface Animal {
  cat: string
  dog: string
}

let AnimalProps: keyof Animal // 'cat' | 'dog'
```

keyof Animal 是完全可以与 'cat' | 'dog'互相替换的。不同的是如果我们添加了其它的属性到 Animal，例如 pig: string，那么 keyof Animal 会自动变为 'cat' | 'dog' | 'pig'。

### 7. 命名空间

命名空间主要作用是用来组织代码，以便于在记录它们类型的同时还不用担心与其它对象产生命名冲突。由于命名空间的用法很简单,这里我们以网上比较流行的 D3 作为例子, 代码如下:

```ts
// declare 关键字来定义它的类型，帮助 TypeScript 判断我们传入的参数类型对不对
//declare 定义的类型只会用于编译时的检查，编译结果中会被删除。
declare namespace D3 {
  export interface Selectors {
    select: {
      (selector: string): Selection
      (element: EventTarget): Selection
    }
  }

  export interface Event {
    x: number
    y: number
  }

  export interface Base extends Selectors {
    event: Event
  }
}

declare var d3: D3.Base
```

### 8. 使用第三方类库  

在熟悉以上基础知识之后, 我们看一下如何使用支持 typescript 的第三方类库. 比如说我们常用的 lodash, 那么正确的使用步骤如下:

```ts
// 安装lodash和对应的类型文件
npm install --save lodash @types/lodash

// 在代码中使用
import * as _ from "lodash";
_.padStart("Hello xuxiaoxi!", 12, " ");
```

### 9. 声明文件  

声明文件也是一个非常重要的知识点.对于使用未经声明的全局函数或者全局变量, typescript 往往会报错, 所以我们可以在对应位置添加 xxx.d.ts 文件, 并在里面声明我们所需要的变量, ts 会自动检索到该文件并进行解析. 以下是几个案例, 供大家参考学习:

```ts
// global.d.ts

// 声明全局变量
declare var name: string

// 全局函数
declare function say(name: string): void

// 带属性的对象
declare namespace myObj {
  function say(s: string): string
  let money: number
}

// 可重用的接口
interface Animal {
  kind: string
  age: number
  weight?: number
}
declare function findAnmiate(animal: Animal): void
```

当然我们还可以定义更多有用的声明, 这里就不一一举例了.
