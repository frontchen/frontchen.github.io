---
title: Set和Map数据结构
tag:
  - Set
  - Map
category:
  - 前端进阶
  - ES6
---

## Set

### set 是什么

1. 什么是 Set  
   Set 是一系列**无序**、**没有重复值**的数据集合
2. 理解 Set

- set 中不能有重复的成员
- Set**没有下标**去标示每一个值，所以 Set 是无序的，也不能像数组那样通过下标去访问 Set 的成员

```js
const s = new Set()
s.add(1)
s.add(2)
console.log(s) // Set { 1, 2 }
```

### set 实例的方法和属性

1. 方法

- add

返回值：`Set`对象本身

```js
const s = new Set()
s.add(1).add(2)
```

- has

```js
const s = new Set()
s.add(1).add(2)
console.log(s.has(1)) // true
```

- delete  
  使用 delete 删除不存在的成员，什么都不会发生，也不会报错

```js
const s = new Set()
s.add(1).add(2)
s.delete(1) // true
```

- clear:清空 set

```js
const s = new Set()
s.add(1)
s.add(2)
s.clear()
console.log(s) // Set {}
```

- forEach(数组,set map 都有这个方法)

```js
const s = new Set()
s.add(1).add(2).add(3)
s.forEach(function (v, k, set) {
  // set中v=k
  console.log(v, k, set)
  console.log(this) // window
}, 这里修改this执向)
```

1. 属性

size:返回成员个数

### Set 构造函数的参数

1. 数组

```js
const s = new Set([1, 2, 1])
console.log(s) // Set(2) { 1, 2 }
```

2. 字符串、arguments、Nodelist、Set 等

```js
// 字符串组作为Set构造函数的参数
const s = new Set('hello')
console.log(s) // Set(4) { 'h', 'e', 'l', 'o' }
```

```js
// Set作为Set构造函数的参数
const s = new Set()
s.add(1).add(2)
// 相当于复制了了一个全新的Set
const b = new Set(s)
console.log(b) //Set { 1, 2 }
```

### Set 的注意事项

1. 判断重复的方式  
   set 对重复值的判断**基本**遵循严格相等,但是对于 NaN 的判断与（===）不同，**Set 中 NaN 等于 NaN**
2. 什么时候使用 Set

- `数组`或`字符串`去重时
- 不需要通过下标访问，只需要遍历时
- 为了使用 Set 提供的方法和属性时（add delete clear has forEach size 等）

### Set 的应用

1.  数组去重

```js
// Set也可以使用`展开运算符`展开
console.log([...new Set([1, 2, 1, 2, 1])])
```

2. 字符串去重

```js
console.log([...new Set('aabbccd')].join(''))
```

3. 存放 DOM 元素

```html
<body>
  <p>1</p>
  <p>2</p>
  <p>3</p>
  <script>
    // nodelist 作为Set构造函数的参数
    const s = new Set(document.querySelectorAll('p'))
    s.forEach(function (e) {
      e.style.backgroundColor = 'red'
    })
  </script>
</body>
```

## Map

### Map 是什么

1. Map 和对象都是键值对的集合

key->value

```js
const m = new Map()
m.set('name', 'alex')
```

2. Map 和对象的区别

- 对象一般用字符串当作键
- 基本数据类型：数字、字符串、布尔值、 undefined、null,引用数据类型：对象（［］、｛｝、函数、Set、Map 等），以上都可以作为 Map 的键

### Map 实例的属性和方法

1. 方法

- set  
  使用 set 添加的新成员，键如果已经存在，后添加的键值对覆盖已有的,返回值为该 map 对象

```js
const m = new Map()
m.set('age', 18).set('name', 'alex').set('age', 111)
```

- get  
  get 获取不存在的成员，返回 undefined

```js
const m=new Map()
m.set('age',18).set('name','alex').set('age',111)
console.log(m.get('name') // 'alex'
```

- has

```js
const m = new Map()
m.set('age', 18).set('name', 'alex').set('age', 111)
console.log(m.has('name')) // true
```

- delete  
  使用 delete 删除不存在的成员，什么都不会发生，也不会报错

```js
const m = new Map()
m.set('age', 18).set('name', 'alex').set('age', 111)
m.delete('name') // true
```

- clear

```js
const m = new Map()
m.set('age', 18).set('name', 'alex').set('age', 111)
m.clear()
```

- forEach

```js
const m = new Map()
m.set('age', 18).set('name', 'alex').set('age', 111)
m.forEach(function (value, key, map) {
  console.log(value, key, map)
}, 这里修改this指向)
```

2. 属性

size：对象没有类似属性

### Map 构造函数的参数

1. 数组
   **只能**传二维数组，而且必须体现出键和值

```js
const m = new Map([
  ['name', 'alex'],
  ['age', 18],
])
console.log(m)
```

2. Set Map

- Set 中也必须体现出键和值，和二维数组类似

```js
const s = new Set([
  ['age', 123],
  ['name', 'frank'],
])
const m = new Map(s)
console.log(m) // Map { 'age' => 123, 'name' => 'frank' }
```

- 传入 Map 相当于复制了一个全新的 Map

### Map 的注意事项

1. 判断重复的方式(后添加的新成员，键如果已经存在，后添加的键值对覆盖已有的)
   基本遵循严格相等，例外 Map 中 NaN 等于 NaN
2. 什么时候使用 Map  
   如果**只是需要 key->value**的结构，或者需要字符串以外的值做键，使用 Map 更合适

**只有模拟现实世界的实体时，才使用对象**

### Map 的应用

```html
<body>
  <p>1</p>
  <p>2</p>
  <p>3</p>
  <script>
    const [p1, p2, p3] = document.querySelectorAll('p')
    const creatMap = (color, backgroundColor, fontSize) => {
      const m = new Map([
        ['color', color],
        ['backgroundColor', backgroundColor],
        ['fontSize', fontSize],
      ])
      return m
    }
    const newm = new Map([
      // 调用creatMap函数返回的是一个map
      [p1, creatMap('red', 'green', '34px')],
      [p2, creatMap('black', 'blue', '30px')],
      [p3, creatMap('green', 'orange', '15px')],
    ])
    newm.forEach(function (resultmap, elem) {
      resultmap.forEach((value, k) => (elem.style[k] = value))
    })
  </script>
</body>
```
