---
title: React总结
tag: React
date: 2018-08-22
category:
  - 前端框架
---

### 1.关于事件中的 this

如果没有用 bind 把实例方法绑定到当前实例，方法中调用 this，会显示 null 或 undefined，因为此时 this 指向的是实例方法

```jsx
class Title extends Component {
  handleClickOnTitle(e) {
    console.log(this)
  }

  render() {
    return <h1 onClick={this.handleClickOnTitle.bind(this)}>React 小书</h1>
  }
}
```

### 2.create-react-app 打包 css 路径报错

在 package.json 里加 "homepage":"."

### 3.组件两种写法

没有 state 的组件叫无状态组件（stateless component），设置了 state 的叫做有状态组件（stateful component）。

因为状态会带来管理的复杂性，我们尽量多地写无状态组件，尽量少地写有状态的组件。这样会降低代码维护的难度，也会在一定程度上增强组件的可复用性。
传统写法:

```jsx
class HelloWorld extends Component {
  constructor() {
    super()
  }

  sayHi() {
    alert('Hello World')
  }

  render() {
    return <div onClick={this.sayHi.bind(this)}>Hello World</div>
  }
}
```

函数式组件(无状态组件)

```jsx
const HelloWorld = props => {
  const sayHi = event => alert('Hello World')
  return <div onClick={sayHi}>Hello World</div>
}
```

### 4.受控组件和非受控组件

类似于 input 、select 、textarea 这些元素的 value 值被 React.js 所控制、渲染的组件，在 React.js 当中被称为受控组件（Controlled Component）。对于用户可输入的控件，一般都可以让它们成为受控组件，这是 React.js 所推崇的做法。

```jsx
class CommentInput extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      content: ''
    }
  }

    handleUsernameChange (event) {
    this.setState({
      username: event.target.value
    })
  }

   handleContentChange (event) {
    this.setState({
      content: event.target.value
    })
  }

  render(){
      return(

    <div className='comment-field'>
      <span className='comment-field-name'>用户名：</span>
      <div className='comment-field-input'>
        <input value={this.state.username}
        onChange={this.handleUsernameChange.bind(this)} />
      </div>
    </div>
    <div className='comment-field'>
      <span className='comment-field-name'>评论内容：</span>
      <div className='comment-field-input'>
        <textarea value={this.state.content}
        onChange={this.handleContentChange.bind(this)}
        />
      </div>
    </div>


      )
  }
}


```

另外还有非受控组件，这里暂时不提及。
delivery_management_commodity_library_library
