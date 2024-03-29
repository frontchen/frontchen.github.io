---
title: React
tag: React
date: 2018-08-08
category:
  - 前端框架
---

### React

#### 1.什么是 React

- 用来构建 UI 的 JavaScript 库
- React 不是一个 MVC 框架，仅仅是视图（V）层的库
  ![React 官网](https://facebook.github.io/react/)
  ![React 中文文档](https://doc.react-china.org/)

#### 2.特点

- 1 使用 JSX 语法 创建组件，实现组件化开发，**为函数式的 UI 编程方式打开了大门**
- 2 性能高的让人称赞：通过 `diff算法` 和 `虚拟DOM` 实现视图的高效更新
- 3 HTML 仅仅是个开始

> JSX --TO--> EveryThing - JSX --> HTML - JSX --> native ios 或 android 中的组件（XML） - JSX --> VR - JSX --> 物联网

#### 3.为什么要用 React

- 1 使用`组件化`开发方式，符合现代 Web 开发的趋势
- 2 技术成熟，社区完善，配件齐全，适用于大型 Web 项目（生态系统健全）
- 3 由 Facebook 专门的团队维护，技术支持可靠
- 4 ReactNative - Learn once, write anywhere: Build mobile apps with React
- 5 使用方式简单，性能非常高，支持服务端渲染
- 6 React 非常火，从技术角度，可以满足好奇心，提高技术水平；从职业角度，有利于求职和晋升，有利于参与潜力大的项目

#### 4.React 中的核心概念

- 1 虚拟 DOM（Virtual DOM）
- 2 Diff 算法（虚拟 DOM 的加速器，提升 React 性能的法宝）

#### 5.虚拟 DOM（Vitural DOM）

> React 将 DOM 抽象为虚拟 DOM，虚拟 DOM 其实就是用一个对象来描述 DOM，通过对比前后两个对象的差异，最终只把变化的部分重新渲染，提高渲染的效率

![如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)
![理解 Virtual DOM](https://www.zhihu.com/question/31809713)

##### VituralDOM 的处理方式

- 1 用 JavaScript 对象结构表示 DOM 树的结构，然后用这个树构建一个真正的 DOM 树，插到文档当中
- 2 当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异
- 3 把 2 所记录的差异应用到步骤 1 所构建的真正的 DOM 树上，视图就更新了

##### Diff 算法

![Reconciliation diff](https://facebook.github.io/react/docs/reconciliation.html)
![diff 算法 - 中文文档](https://doc.react-china.org/docs/reconciliation.html)
![不可思议的 react diff](https://zhuanlan.zhihu.com/p/20346379)
![React diff 算法](https://github.com/zmmbreeze/blog/issues/9)

> 当你使用 React 的时候，在某个时间点 render() 函数创建了一棵 React 元素树，
> 在下一个 state 或者 props 更新的时候，render() 函数将创建一棵新的 React 元素树，
> React 将对比这两棵树的不同之处，计算出如何高效的更新 UI（只更新变化的地方）

了解： 有一些解决将一棵树转换为另一棵树的最小操作数算法问题的通用方案。然而，树中元素个数为 n，最先进的算法
的时间复杂度为 O(n3) 。
如果直接使用这个算法，在 React 中展示 1000 个元素则需要进行 10 亿次的比较。这操作太过昂贵，相反，React 基于两点假设，实现了一个 O(n)算法，提升性能：

- React 中有两种假定：
  - 1 **两个不同类型的元素会产生不同的树**
  - 2 **开发者可以通过 key 属性指定不同树中没有发生改变的子元素**

### Diff 算法的说明 - 1

- 如果两棵树的根元素类型不同，React 会销毁旧树，创建新树

```jsx
//  旧树
<div>
  <Counter />
</div>

//  新树
<span>
  <Counter />
</span>

// 执行过程：destory Counter -> insert Counter
```

### Diff 算法的说明 - 2

- 对于类型相同的 React DOM 元素，React 会对比两者的属性是否相同，只更新不同的属性
- 当处理完这个 DOM 节点，React 就会递归处理子节点。

```jsx
//  旧
<div className="before" title="stuff" />
//  新
<div className="after" title="stuff" />
// 只更新：className 属性

//  旧
<div style={{color: 'red', fontWeight: 'bold'}} />
//  新
<div style={{color: 'green', fontWeight: 'bold'}} />
// 只更新：color属性
```

### Diff 算法的说明 - 3

- 1 当在子节点的后面添加一个节点，这时候两棵树的转化工作执行的很好

```html
<!-- 旧 -->
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<!-- 新 -->
<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>

<!-- 执行过程：
 React会匹配新旧两个<li>first</li>，匹配两个<li>second</li>，然后添加 <li>third</li> tree -->
```

- 2 但是如果你在开始位置插入一个元素，那么问题就来了：

```html
<!--  旧 -->
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<!--  新 -->
<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<!-- 执行过程：
React将改变每一个子节点，而非保持 <li>Duke</li> 和 <li>Villanova</li> 不变 -->
```

### key 属性

> 为了解决以上问题，React 提供了一个 key 属性。当子节点带有 key 属性，React 会通过 key 来匹配原始树和后来的树。

```html
<!-- 旧 -->
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<!-- 新 -->
<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
<!-- 执行过程：
现在 React 知道带有key '2014' 的元素是新的，对于 '2015' 和 '2016' 仅仅移动位置即可 -->
```

- 说明：key 属性在 React 内部使用，但不会传递给你的组件
- 推荐：在遍历数据时，推荐在组件中使用 key 属性：`<li key={item.id}>{item.name}</li>`
- 注意：**key 只需要保持与他的兄弟节点唯一即可，不需要全局唯一**
- 注意：**尽可能的减少数组 index 作为 key，数组中插入元素的等操作时，会使得效率底下**

### key demo

- 执行过程：B != A，则创建并插入 B，删除 A；以此类推，创建并插入 A、D、C，删除 B、C、D

- 执行过程：B、D 不做任何操作，A、C 进行移动操作

---

## React 的基本使用

- 安装：`npm i -S react react-dom`
- `react`：react 是 React 库的入口点
- `react-dom`：提供了针对 DOM 的方法，比如：把创建的虚拟 DOM，渲染到页面上

```jsx
// 1. 导入 react
import React from 'react';
import ReactDOM from 'react-dom';

// 2. 创建 虚拟DOM
const divVD = React.createElement(
  'div',
  {
    title: 'hello react',
  },
  'Hello React！！！',
);

// 3. 渲染
ReactDOM.render(divVD, document.getElementById('app'));
```

### API 说明

- createElement()：知道即可
- render()

```jsx
// https://facebook.github.io/react/docs/react-api.html
// 作用：根据指定的参数，创建react对象
//
// 第一个参数：指定创建虚拟DOM的类型
//  类型：string 或者 react组件
//  1 任意字符串类型的标签名称，比如：'div' / 'span'
//  2 react组件类型，比如：<Welcome></Welcome>
// 第二个参数：指定元素自身的属性
//  类型：对象或者null
// 第三个参数：当前元素的子元素
//  类型：string 或者 createElement() 的返回值
// 返回值：react对象
React.createElement(type, [props], [...children]);

// https://facebook.github.io/react/docs/react-dom.html
// 作用：渲染react元素
// 第一个参数：指定要渲染的react对象
// 第二个参数：指定渲染到页面中的容器（DOM对象）
// 第三个参数：回调函数
ReactDOM.render(element, container);
```

### createElement()的问题

- 说明：`createElement()`方式，代码编写不友好，太复杂

```jsx
var dv = React.createElement(
  'div',
  { className: 'shopping-list' },
  React.createElement('h1', null, 'Shopping List for '),
  React.createElement(
    'ul',
    null,
    React.createElement('li', null, 'Instagram'),
    React.createElement('li', null, 'WhatsApp'),
  ),
);
// 渲染
ReactDOM.render(dv, document.getElementById('app'));
```

### JSX 的基本使用

- 注意：JSX 语法，最终会被编译为 createElement() 方法
- 推荐：**使用 JSX 的方式创建组件**

- JSX - JavaScript XML
- 安装：`npm i -D babel-preset-react` （依赖与：babel-core/babel-loader）
  > 注意：JSX 的语法需要通过 babel-preset-react 编译后，才能被解析执行

```js
/* 1 在 .babelrc 开启babel对 JSX 的转换 */
{
  "presets": [
    "env", "react"
  ]
}

/* 2 webpack.config.js */
module: [
  rules: [
    { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
  ]
]

/* 3 在 js 文件中 使用 JSX */
const dv = (
  <div title="标题" className="cls container">Hello JSX!</div>
)

/* 4 渲染 JSX 到页面中 */
ReactDOM.render(dv, document.getElementById('app'))
```

## JSX 的注意点

- 注意 1: 如果在 JSX 中给元素添加类, 需要使用 `className` 代替 class
  - 类似：label 的 for 属性，使用`htmlFor`代替
- 注意 2：在 JSX 中可以直接使用 JS 代码，直接在 JSX 中通过 {} 中间写 JS 代码即可
- 注意 3：在 JSX 中**只能使用表达式**，但是不能出现 语句！！！
- 注意 4：在 JSX 中注释语法：`{/* 中间是注释的内容 */}`

## React 组件

> React 组件可以让你把 UI 分割为独立、可复用的片段，并将每一片段视为相互独立的部分。

- 组件是由一个个的 HTML 元素组成的
- 概念上来讲, 组件就像 JS 中的函数。它们接受用户输入（`props`），并且**返回**一个 React 对象，用来描述展示在页面中的内容

### React 创建组件的两种方式

- 1 通过 JS 函数 创建（无状态组件）
- 2 通过 class 创建（有状态组件）

```html
函数式组件 和 class 组件的使用场景说明： 1 如果一个组件仅仅是为了展示数据，那么此时就可以使用 函数组件 2
如果一个组件中有一定业务逻辑，需要操作数据，那么就需要使用 class 创建组件，因此，此时需要使用 state
```

#### JavaScript 函数创建

- 注意：1 函数名称必须为大写字母开头，React 通过这个特点来判断是不是一个组件
- 注意：2 函数必须有返回值，返回值可以是：JSX 对象或`null`
- 注意：3 返回的 JSX，必须有*一个*根元素
- 注意：4 组件的返回值使用`()`包裹，避免换行问题

```js
function Welcome(props) {
  return (
    <div className="shopping-list">
      {/* 注释的写法 */}
      <h1>Shopping List for {props.name}</h1>
      <ul>
        <li>Instagram</li>
        <li>WhatsApp</li>
      </ul>
    </div>
  );
}

ReactDOM.render(<Welcome name="jack" />, document.getElementById('app'));
```

#### class 创建

- 注意：基于 `ES6` 中的 class，需要配合 `babel` 将代码转化为浏览器识别的 ES5 语法
- 安装：`npm i -D babel-preset-env`

```js
class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="shopping-list">
        <h1>Shopping List for {this.props.name}</h1>
        <ul>
          <li>Instagram</li>
          <li>WhatsApp</li>
        </ul>
      </div>
    );
  }
}
```

## 给组件传递数据 - 父子组件传递数据

- 组件中有一个 `只读的对象` 叫做 `props`，无法给 props 添加属性
- 获取方式：函数参数 `props`
- 作用：将传递给组件的属性转化为 `props` 对象中的属性

```js
function Welcome(props){
  // props ---> { username: 'zs', age: 20 }
  return (
    <div>
      <div>Welcome React</div>
      <h3>姓名：{props.username}----年龄是：{props.age}</h3>
    </div>
  )
}

// 给 Hello组件 传递 props：username 和 age
ReactDOM.reander(<Hello username="zs" age={20}></Hello>, ......)
```

## 封装组件到独立的文件中

```js
// ./components/Hello2.js

// 1. 引入React模块
// 由于 JSX 编译后会调用 React.createElement 方法，所以在你的 JSX 代码中必须首先声明 React 变量。
import React from 'react';

// 2. 使用function构造函数创建组件
function Hello2(props) {
  return (
    <div>
      <div>这是Hello2组件</div>
      <h1>这是大大的H1标签，我大，我骄傲！！！</h1>
      <h6>这是小小的h6标签，我小，我傲娇！！！</h6>
    </div>
  );
}

// 3. 导出组件
export default Hello2;

// app.js
// 使用组件：
import Hello2 from './components/Hello2';
```

## props 和 state

### props

- 作用：**给组件传递数据，一般用在父子组件之间**
- 说明：React 把传递给组件的属性转化为一个对象并交给 `props`
- 特点：`props`是只读的，无法给`props`添加或修改属性
- `props.children`：获取组件的内容，比如：
  - `<Hello>组件内容</Hello>` 中的 `组件内容`

```js
// props 是一个包含数据的对象参数，不要试图修改 props 参数
// 返回值：react元素
function Welcome(props) {
  // 返回的 react元素中必须只有一个根元素
  return <div>hello, {props.name}</div>;
}

class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

### state

- 作用：用来给组件提供`组件内部`使用的数据
- 注意：只有通过`class`创建的组件才具有状态
- 注意：**状态是私有的，完全由组件来控制**
- 注意：不要在 `state` 中添加 `render()` 方法中不需要的数据，会影响渲染性能！
  - 可以将组件内部使用但是不渲染在视图中的内容，直接添加给 this
- 注意：不要在 `render()` 方法中调用 setState() 方法来修改`state`的值
  - 但是可以通过 `this.state.name = 'rose'` 方式设置 state（不推荐!!!!）

```js
class Hello extends React.Component {
  constructor() {
    this.state = {
      gender: 'male',
    };
  }

  render() {
    return <div>性别：{this.state.gender}</div>;
  }
}
```

## JSX 语法转化过程

```js
// JSX
const element = <h1 className="greeting">Hello, world!</h1>;

// JSX -> createElement
const element = React.createElement('h1', { className: 'greeting' }, 'Hello, world!');

// React elements: 使用对象的形式描述页面结构
// Note: 这是简化后的对象结构
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
  },
  children: ['Hello, world'],
};
```

## 评论列表案例

- 巩固有状态组件和无状态组件的使用
- 两个组件：`<CommentList></CommentList>` 和 `<Comment></Comment>`

```js
[
  { user: '张三', content: '哈哈，沙发' },
  { user: '张三2', content: '哈哈，板凳' },
  { user: '张三3', content: '哈哈，凉席' },
  { user: '张三4', content: '哈哈，砖头' },
  { user: '张三5', content: '哈哈，楼下山炮' }
]

// 属性扩散
<Comment {...item} key={i}></Comment>
```

## style 样式

```js
// 1. 直接写行内样式：
<li style={{border:'1px solid red', fontSize:'12px'}}></li>

// 2. 抽离为对象形式
var styleH3 = {color:'blue'}
var styleObj = {
  liStyle:{border:'1px solid red', fontSize:'12px'},
  h3Style:{color:'green'}
}

<li style={styleObj.liStyle}>
  <h3 style={styleObj.h3Style}>评论内容：{props.content}</h3>
</li>

// 3. 使用样式表定义样式：
import '../css/comment.css'
<p className="pUser">评论人：{props.user}</p>
```

## 相关文章

![React 数据流和组件间的沟通总结](http://www.cnblogs.com/tim100/p/6050514.html)
![单向数据流和双向绑定各有什么优缺点？](https://segmentfault.com/q/1010000005876655/a-1020000005876751)
![怎么更好的理解虚拟 DOM?](https://www.zhihu.com/question/29504639?sort=created)
![React 中文文档](https://discountry.github.io/react/)
![React 源码剖析系列 － 不可思议的 react diff](http://blog.csdn.net/yczz/article/details/49886061)
![深入浅出 React（四）：虚拟 DOM Diff 算法解析](http://www.infoq.com/cn/articles/react-dom-diff?from=timeline&isappinstalled=0)

## ES6 中 class 关键字的使用

- **ES6 中的所有的代码都是运行在严格模式中的**
- 1 它是用来定义类的，是 ES6 中实现面向对象编程的新方式
- 2 使用`static`关键字定义静态属性
- 3 使用`constructor`构造函数，创建实例属性
  ![class 关键字](http://es6.ruanyifeng.com/#docs/class)

```js
class Person {
  constructor(age) {
    // 实例属性
    this.age = age;
  }
}

// 静态属性
Person.staticName = '静态属性';

const p = new Person(19);
```

- 在 class 中定义方法

```js
// 实例方法
sayHello () {
  console.log('大家好，我今年' + this.age + '了');
}

// 静态方法
static wangwang () {
  console.log('我是小明，我新get了一个技能，会暖床');
}
```

- 实现继承的方式

```js
class American extends Person {
  constructor() {
    // 必须调用super(), super表示父类的构造函数
    super();

    this.skin = 'white';
    this.eyeColor = 'white';
  }
}
```

# react 生命周期

## 组件的生命周期

- 简单说：**一个组件从开始到最后消亡所经历的各种状态，就是一个组件的生命周期**

组件生命周期函数的定义：从组件被创建，到组件挂载到页面上运行，再到页面关闭组件被卸载，这三个阶段总是伴随着组件各种各样的事件，那么这些事件，统称为组件的生命周期函数！

- 通过这个函数，能够让开发人员的代码，参与到组件的生命周期中。也就是说，通过钩子函数，就可以控制组件的行为

![react component](https://doc.react-china.org/docs/react-component.html)
![React Native 中组件的生命周期](http://www.race604.com/react-native-component-lifecycle/)
![React 生命周期的管理艺术](https://zhuanlan.zhihu.com/p/20312691?refer=purerender)
![智能组件和木偶组件](http://www.jianshu.com/p/9e427e04135e)

### 组件生命周期函数总览

- 说明：通过 `Counter计数器的小案例`，理解组件的生命周期函数基本使用
- 组件的生命周期包含三个阶段：创建阶段（Mounting）、运行和交互阶段（Updating）、卸载阶段（Unmounting）

- Mounting：

  > constructor()  
  > componentWillMount()  
  > render()  
  > componentDidMount()

- Updating

  > componentWillReceiveProps()  
  > shouldComponentUpdate()  
  > componentWillUpdate()  
  > render()  
  > componentDidUpdate()

- Unmounting
  > componentWillUnmount()

### 组件生命周期 - 创建阶段(Mounting)

- 特点：该阶段的函数只执行一次

#### constructor()

- 作用：1 获取 props 2 初始化 state
- 说明：通过 `constructor()` 的参数`props`获取
  ![设置 state 和 props](https://doc.react-china.org/docs/react-without-es6.html)

```js
class Greeting extends React.Component {
  constructor(props) {
    // 获取 props
    super(props);
    // 初始化 state
    this.state = {
      count: props.initCount,
    };
  }
}

// 初始化 props
// 语法：通过静态属性 defaultProps 来初始化props
Greeting.defaultProps = {
  initCount: 0,
};
```

#### componentWillMount()

- 说明：组件被挂载到页面之前调用，其在 render()之前被调用，因此在这方法里`同步`地设置状态将不会触发重渲染
- 注意：1 可以调用 `setState()` 方法来改变状态值
- 注意：2 无法获取页面中的 DOM 对象

```js
componentWillMount() {
  console.warn(document.getElementById('btn')) // null
  this.setState({
    count: this.state.count + 1
  })
}
```

#### render()

- 作用：渲染组件到页面中，无法获取页面中的 DOM 对象
- 注意：**不要在 render 方法中调用 `setState()` 方法，否则会递归渲染**
  - 原因说明：状态改变会重新调用`render()`，`render()`又重新改变状态

```js
render() {
  console.warn(document.getElementById('btn')) // null

  return (
    <div>
      <button id="btn" onClick={this.handleAdd}>打豆豆一次</button>
      {
    this.state.count === 4
    ? null
    : <CounterChild initCount={this.state.count}></CounterChild>
      }
    </div>
  )
}
```

#### componentDidMount()

- 1 组件已经挂载到页面中
- 2 可以进行 DOM 操作，比如：获取到组件内部的 DOM 对象
- 3 可以**发送请求**获取数据
- 4 可以通过 `setState()` 修改状态的值
- 注意：在该方法里设置状态将会触发重渲

```js
componentDidMount() {
  // 此时，就可以获取到组件内部的DOM对象
  console.warn('componentDidMount', document.getElementById('btn'))
}
```

### 组件生命周期 - 运行阶段（Updating）

- 特点：该阶段的函数执行多次
- 说明：每当组件的`props`或者`state`改变的时候，都会触发运行阶段的函数

#### componentWillReceiveProps()

- 说明：组件接受到新的`props`前触发这个方法
- 参数：当前组件`props`值
- 可以通过 `this.props` 获取到上一次的值
- 使用：若你需要响应属性的改变，可以通过对比`this.props`和`nextProps`并在该方法中使用`this.setState()`处理状态改变
- 注意：修改`state`不会触发该方法

```js
componentWillReceiveProps(nextProps) {
  console.warn('componentWillReceiveProps', nextProps)
}
```

#### shouldComponentUpdate()

- 作用：根据这个方法的返回值决定是否重新渲染组件，返回`true`重新渲染，否则不渲染
- 优势：通过某个条件渲染组件，降低组件渲染频率，提升组件性能
- 说明：如果返回值为`false`，那么，后续`render()`方法不会被调用
- 注意：**这个方法必须返回布尔值！！！**
- 参数：
  - 第一个参数：最新属性对象
  - 第二个参数：最新状态对象
- 场景：根据随机数决定是否渲染组件

```js
shouldComponentUpdate(nextProps, nextState) {
  console.warn('shouldComponentUpdate', nextProps, nextState)

  return nextState.count % 2 === 0
}
```

#### componentWillUpdate()

- 作用：组件将要更新
- 参数：最新的属性和状态对象

```js
componentWillUpdate(nextProps, nextState) {
  console.warn('componentWillUpdate', nextProps, nextState)
}
```

#### render() 渲染

- 作用：重新渲染组件，与`Mounting`阶段的`render`是同一个函数
- 注意：这个函数能够执行多次，只要组件的属性或状态改变了，这个方法就会重新执行

#### componentDidUpdate()

- 作用：组件已经被更新
- 参数：旧的属性和状态对象

```js
componentDidUpdate(prevProps, prevState) {
  console.warn('componentDidUpdate', prevProps, prevState)
}
```

### 组件生命周期 - 卸载阶段（Unmounting）

- 组件销毁阶段：组件卸载期间，函数比较单一，只有一个函数，这个函数也有一个显著的特点：组件一辈子只能执行依次！
- 使用说明：只要组件不再被渲染到页面中，那么这个方法就会被调用（ 渲染到页面中 -> 不再渲染到页面中 ）

#### componentWillUnmount()

- 作用：在卸载组件的时候，执行清理工作，比如
  - 1 清除定时器
  - 2 清除`componentDidMount`创建的 DOM 对象

---

## React - createClass（知道）

- **`React.createClass({})` 方式，创建有状态组件，该方式已经被废弃！！！**
- 通过导入 `require('create-react-class')`，可以在不适用 ES6 的情况下，创建有状态组件
- getDefaultProps() 和 getInitialState() 方法：是 `createReactClass()` 方式创建组件中的两个函数
  ![React without ES6](https://reactjs.org/docs/react-without-es6.html#declaring-default-props)
  ![React 不适用 ES6](https://doc.react-china.org/docs/react-without-es6.html)

```js
var createReactClass = require('create-react-class');
var Greeting = createReactClass({
  // 初始化 props
  getDefaultProps: function () {
    console.log('getDefaultProps');
    return {
      title: 'Basic counter!!!',
    };
  },

  // 初始化 state
  getInitialState: function () {
    console.log('getInitialState');
    return {
      count: 0,
    };
  },

  render: function () {
    console.log('render');
    return (
      <div>
        <h1>{this.props.title}</h1>
        <div>{this.state.count}</div>
        <input type="button" value="+" onClick={this.handleIncrement} />
      </div>
    );
  },

  handleIncrement: function () {
    var newCount = this.state.count + 1;
    this.setState({ count: newCount });
  },

  propTypes: {
    title: React.PropTypes.string,
  },
});

ReactDOM.render(React.createElement(Greeting), document.getElementById('app'));
```

## state 和 setState

- 注意：使用 `setState()` 方法修改状态，状态改变后，React 会重新渲染组件
- 注意：不要直接修改 state 属性的值，这样不会重新渲染组件！！！
- 使用：1 初始化 state 2 setState 修改 state

```js
// 修改state（不推荐使用）
// https://facebook.github.io/react/docs/state-and-lifecycle.html#do-not-modify-state-directly
this.state.test = '这样方式，不会重新渲染组件';
```

```js
constructor(props) {
  super(props)

  // 正确姿势！！！
  // -------------- 初始化 state --------------
  this.state = {
    count: props.initCount
  }
}

componentWillMount() {
  // -------------- 修改 state 的值 --------------
  // 方式一：
  this.setState({
    count: this.state.count + 1
  })

  this.setState({
    count: this.state.count + 1
  }, function(){
    // 由于 setState() 是异步操作，所以，如果想立即获取修改后的state
    // 需要在回调函数中获取
    // https://doc.react-china.org/docs/react-component.html#setstate
  });

  // 方式二：
  this.setState(function(prevState, props) {
    return {
      counter: prevState.counter + props.increment
    }
  })

  // 或者 - 注意： => 后面需要带有小括号，因为返回的是一个对象
  this.setState((prevState, props) => ({
    counter: prevState.counter + props.increment
  }))
}
```

## 组件绑定事件

- 1 通过 React 事件机制 `onClick` 绑定
- 2 JS 原生方式绑定（通过 `ref` 获取元素）
  - 注意：`ref` 是 React 提供的一个特殊属性
  - `ref`的使用说明：[react ref](https://discountry.github.io/react/docs/refs-and-the-dom.html)

### React 中的事件机制 - 推荐

- 注意：事件名称采用驼峰命名法
- 例如：`onClick` 用来绑定单击事件

```js
<input type="button" value="触发单击事件" onClick={this.handleCountAdd} onMouseEnter={this.handleMouseEnter} />
```

### JS 原生方式 - 知道即可

- 说明：给元素添加 `ref` 属性，然后，获取元素绑定事件

```js
// JSX
// 将当前DOM的引用赋值给 this.txtInput 属性
<input ref={ input => this.txtInput = input } type="button" value="我是豆豆" />

componentDidMount() {
  // 通过 this.txtInput 属性获取元素绑定事件
  this.txtInput.addEventListener(() => {
    this.setState({
      count:this.state.count + 1
    })
  })
}
```

## 事件绑定中的 this

- 1 通过 `bind` 绑定
- 2 通过 `箭头函数` 绑定

### 通过 bind 绑定

- 原理：`bind`能够调用函数，改变函数内部 this 的指向，并返回一个新函数
- 说明：`bind`第一个参数为返回函数中 this 的指向，后面的参数为传给返回函数的参数

```js
// 自定义方法：
handleBtnClick(arg1, arg2) {
  this.setState({
    msg: '点击事件修改state的值' + arg1 + arg2
  })
}

render() {
  return (
    <div>
      <button onClick={
    // 无参数
    // this.handleBtnClick.bind(this)

    // 有参数
    this.handleBtnClick.bind(this, 'abc', [1, 2])
      }>事件中this的处理</button>
      <h1>{this.state.msg}</h1>
    </div>
  )
}
```

- 在构造函数中使用`bind`

```js
constructor() {
  super()

  this.handleBtnClick = this.handleBtnClick.bind(this)
}

// render() 方法中：
<button onClick={ this.handleBtnClick }>事件中this的处理</button>
```

### 通过箭头函数绑定

- 原理：`箭头函数`中的 this 由所处的环境决定，自身不绑定 this

```js
<input type="button" value="在构造函数中绑定this并传参" onClick={
  () => { this.handleBtnClick('参数1', '参数2') }
} />

handleBtnClick(arg1, arg2) {
  this.setState({
    msg: '在构造函数中绑定this并传参' + arg1 + arg2
  });
}
```

## 受控组件

![表单和受控组件](https://doc.react-china.org/docs/forms.html)
![非受控组件](https://doc.react-china.org/docs/uncontrolled-components.html)

> 在 HTML 当中，像`input`,`textarea`和`select`这类表单元素会维持自身状态，并根据用户输入进行更新。
> 在 React 中，可变的状态通常保存在组件的`state`中，并且只能用 `setState()` 方法进行更新.  
> React 根据初始状态渲染表单组件，接受用户后续输入，改变表单组件内部的状态。
> 因此，将那些值由 React 控制的表单元素称为：受控组件。

- 受控组件的特点：

  - 1 表单元素
  - 2 由 React 通过 JSX 渲染出来
  - 3 由 React 控制值的改变，也就是说想要改变元素的值，只能通过 React 提供的方法来修改

- 注意：**只能通过 setState 来设置受控组件的值**

```js
// 模拟实现文本框数据的双向绑定
<input type="text" value={this.state.msg} onChange={this.handleTextChange} />;

// 当文本框内容改变的时候，触发这个事件，重新给state赋值
handleTextChange = (event) => {
  console.log(event.target.value);

  this.setState({
    msg: event.target.value,
  });
};
```

## 评论列表案例

```js
[
  { name: '小明', content: '沙发！！！' },
  { name: '小红', content: '小明，居然是你' },
  { name: '小刚', content: '小明，放学你别走！！！' },
];
```

## props 校验

- 作用：通过类型检查，提高程序的稳定性
- 命令：`npm i -S prop-types`
  ![类型校验文档](https://doc.react-china.org/docs/typechecking-with-proptypes.html)
- 使用：给类提供一个静态属性 `propTypes`（对象），来约束`props`

```js
// 引入模块
import PropTypes from 'prop-types'

// ...以下代码是类的静态属性：
// propTypes 静态属性的名称是固定的！！！
static propTypes = {
  initCount: PropTypes.number, // 规定属性的类型
  initAge: PropTypes.number.isRequired // 规定属性的类型，且规定为必传字段
}
```

## React 单向数据流

- **React 中采用单项数据流**
- 数据流动方向：自上而下，也就是只能由父组件传递到子组件
- 数据都是由父组件提供的，子组件想要使用数据，都是从父组件中获取的
- 如果多个组件都要使用某个数据，最好将这部分共享的状态提升至他们最近的父组件当中进行管理
  ![单向数据流](https://discountry.github.io/react/docs/state-and-lifecycle.html)
  ![状态提升](https://discountry.github.io/react/docs/lifting-state-up.html)

```html
react中的单向数据流动： 1 数据应该是从上往下流动的，也就是由父组件将数据传递给子组件 2
数据应该是由父组件提供，子组件要使用数据的时候，直接从子组件中获取
在我们的评论列表案例中：数据是由CommentList组件（父组件）提供的 子组件 CommentItem 负责渲染评论列表，数据是由
父组件提供的 子组件 CommentForm
负责获取用户输入的评论内容，最终也是把用户名和评论内容传递给了父组件，由父组件负责处理这些数据（ 把数据交给 CommentItem
由这个组件负责渲染 ）
```

### 组件通讯

- 父 -> 子：`props`
- 子 -> 父：父组件通过 props 传递回调函数给子组件，子组件调用函数将数据作为参数传递给父组件
- 兄弟组件：因为 React 是单向数据流，因此需要借助父组件进行传递，通过父组件回调函数改变兄弟组件的 props

- React 中的状态管理： flux（提出状态管理的思想） -> Redux -> mobx
- Vue 中的状态管理： Vuex
- 简单来说，就是统一管理了项目中所有的数据，让数据变的可控

![组件通讯](https://segmentfault.com/a/1190000006831820)

### Context 特性

- 注意：**如果不熟悉 React 中的数据流，不推荐使用这个属性**
  - 这是一个实验性的 API，在未来的 React 版本中可能会被更改
- 作用：跨级传递数据（爷爷给孙子传递数据），避免向下每层手动地传递`props`
- 说明：需要配合`PropTypes`类型限制来使用

```js
class Grandfather extends React.Component {
  // 类型限制（必须），静态属性名称固定
  static childContextTypes = {
    color: PropTypes.string.isRequired,
  };

  // 传递给孙子组件的数据
  getChildContext() {
    return {
      color: 'red',
    };
  }

  render() {
    return <Father></Father>;
  }
}

class Child extends React.Component {
  // 类型限制，静态属性名字固定
  static contextTypes = {
    color: PropTypes.string,
  };

  render() {
    return (
      // 从上下文对象中获取爷爷组件传递过来的数据
      <h1 style={{ color: this.context.color }}>爷爷告诉文字是红色的</h1>
    );
  }
}

class Father extends React.Component {
  render() {
    return <Child></Child>;
  }
}
```

# react - 豆瓣电影案例

## 项目中使用的技术点

- 1 `ant-design` 组件库
- 2 `react-router-dom` 路由
- 3 `fetch` API，配合`Promise规范`
- 4 跨域获取数据

## ant-design - UI 组件库

![antd](https://ant.design/index-cn)

- 说明：借助 Ant Design 组件库快速搭建页面
- 安装：`npm i -S antd`

### 基本使用

- 注意：该步骤中只引入了一个组件，但却引入了整个 ant 包和 css 样式
- 推荐：按需加载，即用到哪个组件就只把该组件的样式导入

```js
// 基础：导入 react 和 react-dom
import React from 'react';
import ReactDOM from 'react-dom';

// 1. 导入 antd 组件
import { DatePicker } from 'antd';

// 2. 导入 样式
import 'antd/dist/antd.css';

// 3. 使用 日期选择 组件
ReactDOM.render(<DatePicker />, document.getElementById('app'));
```

### 按需加载 - 推荐使用方式

- 1 安装：`npm i -D babel-plugin-import`
- 2 配置`.babelrc`
- 说明：只需要导入我们使用的组件即可，不需要再单独的导入样式

```js
import React from 'react'
import ReactDOM from 'react-dom'

// 1. 导入 antd 组件
import { DatePicker } from 'antd'

// 2. 使用 日期选择 组件
ReactDOM.render(<DatePicker />, document.getElementById('app'))

// ---

// .babelrc 配置如下：
"plugins": [
    [ "import", { "libraryName": "antd", "style": "css" }]
]
```

## react-router

![react router 官网](https://reacttraining.com/react-router/)
![react router github](https://github.com/ReactTraining/react-router)

- 安装：`npm i -S react-router-dom`

### 基本概念说明

- `Router`组件本身只是一个容器，真正的路由要通过`Route组件`定义

### 使用步骤

- 1 导入路由组件
- 2 使用 `<Router></Router>` 作为根容器，包裹整个应用（JSX）
  - 在整个应用程序中，只需要使用一次
- 3 使用 `<Link to="/movie"></Link>` 作为链接地址，并指定`to`属性
- 4 使用 `<Route path="/" compoent={Movie}></Route>` 展示路由内容

```js
// 1 导入组件
import { HashRouter as Router, Link, Route } from 'react-router-dom';

// 2 使用 <Router>
<Router>
  // 3 设置 Link
  <Menu.Item key="1">
    <Link to="/">首页</Link>
  </Menu.Item>
  <Menu.Item key="2">
    <Link to="/movie">电影</Link>
  </Menu.Item>
  <Menu.Item key="3">
    <Link to="/about">关于</Link>
  </Menu.Item>
  // 4 设置 Route // exact 表示：绝对匹配（完全匹配，只匹配：/）
  <Route exact path="/" component={HomeContainer}></Route>
  <Route path="/movie" component={MovieContainer}></Route>
  <Route path="/about" component={AboutContainer}></Route>
</Router>;
```

### 注意点

- `<Router></Router>`：作为整个组件的根元素，是路由容器，只能有一个唯一的子元素
- `<Link></Link>`：类似于 vue 中的`<router-link></router-link>`标签，`to` 属性指定路由地址
- `<Route></Route>`：类似于 vue 中的`<router-view></router-view>`，指定路由内容（组件）展示位置

### 路由参数

- 配置：通过`Route`中的 path 属性来配置路由参数
- 获取：`this.props.match.params` 获取

```js
// 配置路由参数
<Route path="/movie/:movieType"></Route>;

// 获取路由参数
const type = this.props.match.params.movieType;
```

### 路由跳转

![react router - history](https://reacttraining.com/react-router/web/api/history)

- `history.push()` 方法用于在 JS 中实现页面跳转
- `history.go(-1)` 用来实现页面的前进（1）和后退(-1)

```js
this.props.history.push('/movie/movieDetail/' + movieId);
```

## fetch

- 作用：Fetch 是一个现代的概念, 等同于 XMLHttpRequest。它提供了许多与 XMLHttpRequest 相同的功能，但被设计成更具可扩展性和高效性。
- `fetch()` 方法返回一个`Promise`对象

### fetch 基本使用

![fetch Response](https://developer.mozilla.org/zh-CN/docs/Web/API/Response)
![fetch 介绍](http://www.jianshu.com/p/ccf99a12faf1)
![Javascript 中的神器——Promise](http://www.jianshu.com/p/063f7e490e9a)

```js
/*
  通过fetch请求回来的数据，是一个Promise对象.
  调用then()方法，通过参数response，获取到响应对象
  调用 response.json() 方法，解析服务器响应数据
  再次调用then()方法，通过参数data，就获取到数据了
*/
fetch('/api/movie/' + this.state.movieType)
  // response.json() 读取response对象，并返回一个被解析为JSON格式的promise对象
  .then((response) => response.json())
  // 通过 data 获取到数据
  .then((data) => {
    console.log(data);
    this.setState({
      movieList: data.subjects,
      loaing: false,
    });
  });
```

## 跨域获取数据的三种常用方式

- 1 JSONP
- 2 代理
- 3 CORS

### JSONP

- 安装：`npm i -S fetch-jsonp`
- 利用`JSONP`实现跨域获取数据，只能获取 GET 请求
- `fetch-jsonp`
  ![fetch-jsonp](https://github.com/camsong/fetch-jsonp)
- 限制：1 只能发送 GET 请求 2 需要服务端支持 JSONP 请求

```js
/* movielist.js */
fetchJsonp('https://api.douban.com/v2/movie/in_theaters')
  .then((rep) => rep.json())
  .then((data) => {
    console.log(data);
  });
```

### 代理

- `webpack-dev-server` 代理配置如下：
- 问题：webpack-dev-server 是开发期间使用的工具，项目上线了就不再使用 webpack-dev-server
- 解决：项目上线后的代码，也是会部署到一个服务器中，这个服务器配置了代理功能即可（要求两个服务器中配置的代理规则相同）

```js
// webpack-dev-server的配置
devServer: {
  // https://webpack.js.org/configuration/dev-server/#devserver-proxy
  // https://github.com/chimurai/http-proxy-middleware#http-proxy-options
  // http://www.jianshu.com/p/3bdff821f859
  proxy: {
    // 使用：/api/movie/in_theaters
    // 访问 ‘/api/movie/in_theaters’ ==> 'https://api.douban.com/v2/movie/in_theaters'
    '/api': {
      // 代理的目标服务器地址
      target: 'https://api.douban.com/v2',
      // https请求需要该设置
      secure: false,
      // 必须设置该项
      changeOrigin: true,
      // '/api/movie/in_theaters' 路径重写为：'/movie/in_theaters'
      pathRewrite: {"^/api" : ""}
    }
  }
}

/* movielist.js */
fetch('/api/movie/in_theaters')
  .then(function(data) {
    // 将服务器返回的数据转化为 json 格式
    return data.json()
  })
  .then(function(rep) {
    // 获取上面格式化后的数据
    console.log(rep);
  })
```

### CORS - 服务器端配合

- 示例：NodeJS 设置跨域
  ![跨域资源共享 CORS 详解 - 阮一峰](http://www.ruanyifeng.com/blog/2016/04/cors.html)

```js
// 通过Express的中间件来处理所有请求
app.use('*', function (req, res, next) {
  // 设置请求头为允许跨域
  res.header('Access-Control-Allow-Origin', '*');

  // 设置服务器支持的所有头信息字段
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization,Accept,X-Requested-With');
  // 设置服务器支持的所有跨域请求的方法
  res.header('Access-Control-Allow-Methods', 'POST,GET');
  // next()方法表示进入下一个路由
  next();
});
```

## 相关文章

### API 地址

- 豆瓣 API 接口公共前缀：https://api.douban.com/v2/
- /v2/movie/in_theaters
- /v2/movie/coming_soon
- /v2/movie/top250
- 思路：通过 props 获取到电影类型（接口），与默认的前缀拼接成完整的 API 接口地址

![豆瓣电影 API 地址](https://developers.douban.com/wiki/?title=api_v2)
![正在热映 - in_theaters](https://api.douban.com/v2/movie/in_theaters)
![即将上映 - coming_soon](https://api.douban.com/v2/movie/coming_soon)
![top250 - top250](https://api.douban.com/v2/movie/top250)
![电影详细信息 - subject](https://api.douban.com/v2/movie/subject/26309788)

![Request - Simplified HTTP client](https://github.com/request/request)
![CSS3 transform 属性](http://www.w3school.com.cn/cssref/pr_transform.asp)

```html
分页功能分析： 已知条件：1 每一页有6条数据 2 当前页是第几页 接口分页需要的数据：1 start（起始索引号） 2
count（每页有多少条数据 6） 因此，想要实现分页效果需要根据 每页大小 和 页码，计算出start即可。 第一页：0 1 2 3 4 5
第二页：6 7 8 9 10 11 第三页：12 13 14 15 16 17 start = (page - 1) * count
```
