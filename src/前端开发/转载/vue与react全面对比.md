---
    icon: pen-to-square
    date: 2019-06-15
    category: 
      - 转载
    tag:
      - 随笔
---

## vue 与 react 全面对比

## 生命周期

### 第一阶段：组件挂载阶段

| vue          | 说明                                                                                                                                       | react                | 说明                                                                                                                                                      |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| props        | 接收父组件参数                                                                                                                             | static defalultProps | 接收父组件参数                                                                                                                                            |
| data         | 组件内部状态初始化                                                                                                                         | constructor          | 组件内部状态初始化 this.state={}                                                                                                                          |
| computed     | data 中的属性扩展，同 data 中的数据一样，属于组件内部状态属性，不同的是：计算属性，当依赖值不发生改变时，属性值被缓存不变动                |                      |
| methods      | 组件内部事件写在这里                                                                                                                       |                      |
| watch        | 观察模式，同计算属性类似，可以监听 data 中属性的变化                                                                                       |                      |
| beforeCreate | 组件实例化后，数据观察 data 和 event/watcher 事件配置之前被调用                                                                            |                      |                                                                                                                                                           |
| created      | （实例创建完成后立即被调用，实例已完成如下配置：数据观察 data observe，属性和方法的运算，event/watcher 回调。\$el 属性不可见）             |                      |
| beforeCreate | 组件实例化后，数据观察 data 和 event/watcher 事件配置之前被调用                                                                            | componentWillMount   | 组件渲染前被调用                                                                                                                                          |
| beforeMount  | 组件挂载之前调用                                                                                                                           | componentWillMount   | 组件渲染前被调用                                                                                                                                          |
| render       | react 最重要的步骤，创建虚拟 dom，进行 diff 算法，更新 dom 树都在此进行。此时就不能更改 state 了                                           |
| mounted      | 不会承诺所有的子组件都一起被挂载，如果希望等到整个试图都渲染完毕，可以用 vm.\$nextTick 替换掉 mounted，mounted(){ this.\$nextTick(()=>{})} | componentDidMount    | 组件挂载成功，第一次渲染后调用，组件已经生成在对应的 dom 结构，通过 this.getDOMNode()获取节点，可以在这个周期时获取服务端数据，redux 模式，在这里绑定数据 |
|              |

### 第二阶段：组件更新阶段

| vue          | 说明                                                                                                                                                                                                                                               | react                     | 说明                                                                          |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------- |
|              |                                                                                                                                                                                                                                                    | componentWillReceiveProps | 组件接收到一个新的 props 时被调用                                             |
|              | 组件的依赖是在渲染过程中自动追踪的，所以系统能精确知晓哪个组件确实需要被重渲染。可以理解为每一个组件都已经自动获得了 shouldComponentUpdate,使得开发者不再需要考虑此类优化，从而能够更好地专注于应用本身                                            | shouldComponentUpdate     | 返回一个布尔值，组件收到新的或者 state 时被调用，常用于优化组件，减少渲染次数 |
| beforeUpdate | 数据更新时调用，发生在虚拟 dom 更新之前，适合更新之前访问现有的 dom，如手动移除事件监听                                                                                                                                                            | componentWillUpdate       | 接收到新的 props 或者 sate 但还没 render 时调用                               |
|              |                                                                                                                                                                                                                                                    | render                    | 渲染模板                                                                      |
| updated      | 数据更新完后，组件 DOM 更新完毕，可以依赖与 DOM 的操作，应避免在此期间更改状态，如需要，最好使用计算属性或 watch 取而代之，不会承诺所有子组件一起被重绘。待整个视图重绘完毕，可以用 vm.\$nextTick 换掉 updated。updated(){this.\$nextTick(()=>{})} | componentDidUpdate        | 组件更新完成后调用                                                            |

### 第三阶段：组件卸载阶段

| vue           | 说明                                       | react                | 说明                                                         |
| ------------- | ------------------------------------------ | -------------------- | ------------------------------------------------------------ |
| beforeDestroy | 实例销毁前调用                             | componentWillUnmount | 从 dom 中移除时立即被调用 一些事件监听和定时器需要在此时清除 |
| destoryed     | 实例销毁后调用，与实例相关的所有都会被移动 |                      |                                                              |

Vue 独有的：
| vue | 说明
|---|---
|activated|keep-alive 组件激活时调用（服务端渲染期不被调用）
|deactivated|keep-alive 组件停用时调用（服务端渲染期不被调用）

```js
new Vue({
  name: 'demo',
  el: '#demo',
  beforeCreate() {
    //在实例初始化之后，数据观测 (data observer)
    //和 event/watcher 事件配置之前被调用。
  },
  created() {
    //在实例创建完成后被立即调用。在这一步，
    //实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，
    //watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
  },

  beforeMount() {
    //在挂载开始之前被调用：相关的 render 函数首次被调用。
  },
  mounted() {
    //el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
    //如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。
    /*
     *mounted 不会承诺所有的子组件也都一起被挂载。
     *如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick
     */
    this.$nextTick(function () {
      // Code that will run only after the
      // entire view has been rendered
    })
  },
  beforeUpdate() {
    //数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
  },
  updated() {
    //数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
    /*
     *同样updated不会承诺所有的子组件也都一起被挂载。
     *如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick
     */
  },
  beforeDestroy() {
    //实例销毁之前调用。在这一步，实例仍然完全可用。
  },
  destroyed() {
    //Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
    //所有的事件监听器会被移除，
    //所有的子实例也会被销毁。
  }
})
```

## 组件传值

### react

- ##### 父到子,父组件向子组件传值（通过 props 传值），子通过 props 来获取父的属性值
  子组件

```js
class Children extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>这是：{this.props.name}</div> // 这是 父向子
    )
  }
}
```

父组件

```js
class App extends React.Component {
  render() {
    return (
      <div>
        <Children name="父向子" />
      </div>
    )
  }
}
```

- ##### 子到父,通过父组件向子组件传递函数，然后子组件中调用这些函数，利用回调函数实现数据传递

子组件

```js
class Children extends Component {
  constructor(props) {
    super(props)
  }
  handerClick() {
    this.props.changeColor('skyblue') // 执行父组件的changeColor 并传参 必须和父组件中的函数一模一样
  }
  render() {
    return (
      <div>
        <div>父组件的背景色{this.props.bgcolor}</div> //
        子组件接收父组件传过来的值 bgcolor
        <button
          onClick={e => {
            this.handerClick(e)
          }}
        >
          改变父组件背景
        </button> // 子组件执行函数
      </div>
    )
  }
}
```

父组件

```jsx
class Father extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bgcolor: 'pink'
    }
  }
  bgChange(color) {
    this.setState({
      bgcolor: color
    })
  }
  render(props) {
    return (
      <div style={{ background: this.state.bgcolor }}>
        // 给子组件传递的值 color
        <Children
          bgcolor={this.state.bgcolor}
          changeColor={color => {
            this.bgChange(color)
          }}
        />
        // changeColor 子组件的参数=color 当做形参
      </div>
    )
  }
}
```

- ##### 兄弟之间

  在 React 中，需要现将数据传递给父组件，然后父组件再传递给兄弟组件。

- ##### 多层级组件
  在 React 中，提供了一个和 Vue 类似的处理多层级组件通信的方式——context，这里会提供一个生产者和一个消费者，会在父组件中生产数据，在子组件中消费数据。从使用上来说，只需要将子组件包裹在生产者的 Provider 中，在需要用到数据的子组件中，通过 Consumer 包裹，就可以拿到生产者的数据。

```jsx
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light')

class App extends React.Component {
  render() {
    // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
    // 无论多深，任何组件都能读取这个值。
    // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    )
  }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  )
}

class ThemedButton extends React.Component {
  // 指定 contextType 读取当前的 theme context。
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  // 在这个例子中，当前的 theme 值为 “dark”。
  static contextType = ThemeContext
  render() {
    return <Button theme={this.context} />
  }
}
```

- ##### 任意组件之间

  简单的使用 EventBus，复杂的使用 Redux

### vue

- ##### 父组件传递数据给子组件 通过 props 属性来实现

父组件

```jsx
<template>
  <parent>
    <child :child-msg="msg"></child>  //这里必须要用 - 代替驼峰
</parent>
</template>
<script>
  export defalut {
    data(){
      return {
    msg: [1,2,3]
    }
    }
      }
</script>
```

子组件通过 props 来接收数据:

```
props: ['childMsg']
```

- ##### 子组件与父组件通信
  子组件:

```jsx
<template>
  <div @click="testClick"></div>
</template>
<script>
export defalut {
  methods: {   
    testClick() {       
      this.$emit('test','123');
      //主动触发test方法，'123'为向父组件传递的数据   
      }
      }
}
</script>
```

父组件:

```jsx
<template>
<div>
<child @test="change" :msg="msg"/>
</div>
</template>
<script>
  export default {
    methods: { 
  //监听子组件触发的test事件,然后调用change方法 
  change(msg) {       
    this.msg = msg;  // msg: 123   
    }
  }
  }
</script>
```

- ##### 兄弟之间
  在 Vue 中，可以通过查找父组件下的子组件实例，然后进行组件进行通信。如 this.$parent.$children，在\$children 中，可以通过组件的 name 找到要通信的组件，进而进行通信。
- ##### 多层级组件
  在多层级的组件中，当然可以通过不断的获取\$parent 找到需要传递的祖先级组件，然后进行通信，但是这样繁琐易错，并不推荐。Vue 在 2.2.0 新增提供了 provide/inject 的方式进行传递数据。即在祖先组件提供数据，在需要使用的组件中，注入数据，这样就可以在子组件中使用数据了。

父组件

```jsx
<template>
  <div class="test">
    <son prop="data" />
  </div>
</template>

<script>
export default {
  name: 'Test',
  provide: {
    name: 'Garrett'
  }
}
</script>
```

子孙组件

```jsx
<template>
	<div>
		{{name}}
	</div>
</template>

<script>
export default {
	name: 'Grandson',
	inject: [name]
}
</script>
```

这里可以通过 inject 直接访问其两个层级上的数据，其用法与 props 完全相同，同样可以参数校验等

##### 缺点

这么做也是有明显的缺点的，在任意层级都能访问导致数据追踪比较困难，不知道是哪一个层级声明了这个或者不知道哪一层级或若干个层级使用了，因此这个属性通常并不建议使用能用 vuex 的使用 vuex，不能用的多传参几层，但是在做组件库开发时，不对 vuex 进行依赖，且不知道用户使用环境的情况下可以很好的使用

- ##### 任意组件之间

  简单的使用 EventBus，复杂的使用 vuex

## 路由

### react

#### 跳转

> 标签式导航 `<Link>`

```jsx

```

#### 跳转参数传递和接收参数
