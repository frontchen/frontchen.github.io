---
title: Canvas
tag: JS基础
date: 2018-08-08
category:
  - 前端基石
---

### Canvas 简介

- canvas 是一个标签，作用：展示内容，本身不具备绘图功能
  通过 js 绘图 API(canvas 对象.getContext('2d'或‘webgl’))来绘画图形（canvas 2D 或 webgl（3d））

### canvas 的基本使用步骤

#### 1，创建一个 canvas 标签 默认宽高 300\*150

给 canvas 设置宽高

- 1，直接通过标签属性，行内设置
- 2，通过 js 动漫属性来设置宽高，element.width=

上面两种方式，本质上就是在设置 canvas 画布的像素点个数；

- 注意：不推荐使用 css style 样式来进行设宽高，通过 css style
  样式，没有改变像素点个数，只是单纯的将画布当成图片来拉升

#### 2，获取 dom 元素

#### 3，获取绘图上下文对象 element.getContext('2d');

类型：CanvasRenderingContent2D
上下文对象：是一个对象，提供了很多用于绘图的属性和方法

#### 4，使用绘图上下文提供的属性和方法，来进行绘图

     element. moveTo 将画笔落到那里去

- 参数 1：x 坐标
- 参数 2：y 坐标

##### element.lineTo 画一根线段

- 参数 1：x 坐标
- 参数 2：y 坐标

##### moveTo lineTo 只是在绘制路径；

- 真正绘制，需要 element.skroke（）；

##### skroke（）描边

- 就是将页面中描绘的路径，以描边的方式绘制到画布中

##### canvas 中的坐标系

- 1. 坐标原点, 画布左上角 (0,0)
- 2. 水平向右正方向为 x 轴, 向右 x 逐渐增大
- 3. 垂直向下正方向为 y 轴, 向下 y 逐渐增大

###### 是可以绘制到 负轴的, 只是我们看不见

###### 学习 平移, 旋转, 放大 以后就可以看到 负轴了

##### fill() 填充

- 将所有描绘的路径, 以填充的方式, 绘制到画布中

##### strokeStyle 设置描边的颜色

参数设置和 css 设置颜色一样

- 1.  red, blue
- 2.  #666
- 3.  rgb(255,0,0), rgba(255,0,0,0.1)

```js
element.strokeStyle = 'yellowgreen'
element.strokeStyle = '#666'
element.strokeStyle = 'rgb(255,0,0)'
element.strokeStyle = 'rgba(255,0,0,0.1)'
element.strokeStyle = 'red'
```

##### fillStyle : 设置或返回用于填充绘画的颜色

##### 路径开始和闭合

###### element.beginPath 开启新路径

- 作用：擦除原来的路径，开启新路径
- beginPath 后面 fill 和 stroke 只对 beginPath 以后的路径起作用，
  之前的就不管了

###### element.closePath()闭合路径

- 如果复杂路径绘制，必须使用路径开始和结束。闭合路径会自动把最后的线头和开始的线头连在一起。

###### 非零环绕原则

- 注意：交叉路径的填充问题，“非零环绕原则”，顺逆时针穿插次数决定是否填充。

“非零环绕规则”是这么来判断有自我交叉情况的路径的：对于路径中的任意给定区域，
从该区域内部画一条足够长的线段，使此线段的终点完全落在路径范围之外。

接下来，将计数器初始化为 0，
然后，每当这条线段与路径上的直线或曲线相交时，
就改变计数器的值。如果是与路径的顺时针部分相交，则加 1，
如果是与路径的逆时针部分相交，则减 1。若计数器的最终值不是 0，那么此区域就在路径里面，
在调用 fill()方法时，浏览器就会对其进行填充。
如果最终值是 0，那么此区域就不在路径内部，浏览器也就不会对其进行填充了

##### 绘制线的其他属性

###### lineCap 设置线条端点(线头、线冒)样式

- butt ： 默认。向线条的每个末端添加平直的边缘。
- round ： 向线条的每个末端添加圆形线帽。
- square： 向线条的每个末端添加正方形线帽。

###### lineJoin 设置拐角类型

- bevel: 创建斜角。
- round: 创建圆角。
- miter: 默认。创建尖角

###### miterLimit 设置或返回最大斜接长度

- 斜接长度指的是在两条线交汇处内角和外角之间的距离。
- 一般用默认值：10 就可以了。除非需要特别长的尖角时，使用此属性

#### 绘制虚线

- 设置： setLineDash(数组)
- 读取： getLineDash()

```js
ctx.setLineDash([10, 5]) // 10 表示实心部分, 5 表示空白部分
```

##### getLineDash() 与 setLineDash() 方法使用数组描述实线与虚线的长度.

#### 绘制矩形

##### 快速创建矩形 rect()方法

- 语法：element.rect(x, y, width, height);
- 解释：x, y 是矩形左上角坐标， width 和 height 都是以像素计
- rect 方法只是规划了矩形的路径，并没有填充和描边, 所以最后还是要调用 fill 或者 stroke 方法绘制

##### 快速创建描边矩形和填充矩形

- 语法：ctx.strokeRect(x, y, width, height);
  - 注意此方法直接进行 stroke 绘制, 不会产生路径
- 语法：ctx.fillRect(x, y, width, height);
  - 此方法直接进行 fill 填充绘制, 不会产生路径

##### 清除矩形(clearRect)

- 语法：ctx.clearRect(x, y, width, hegiht);
- 解释：清除某个矩形内的绘制的内容，相当于橡皮擦。
  清除整个画布 clearRect(0,0,cas.width,cas.height);

#### 绘制圆弧

##### arc 方法

- 概述：arc() 方法创建弧/曲线（用于创建圆或部分圆）。
- 语法：ctx.arc(x, y, r, sAngle, eAngle, counterclockwise);
- 解释：
  - x,y：圆心坐标。
  - r：半径大小。
  - sAngle:绘制开始的角度。
  - eAngel:结束的角度，注意是弧度。π
  - 弧度与角度的转换 弧度单位是 π 1π = 180 度, 2π = 360 度

##### 在 js 中, Math.PI 获取 π,

- counterclockwise：是否是逆时针。true 是逆时针，false：顺时针

##### 弧度和角度

- 弧度和角度的转换公式： rad = deg /180 \* Math.PI;
- 在 Math 提供的方法中 Math.sin、Math.cos 等都使用的单位也是弧度

##### 封装角度和弧度的转换函数

```js
function toRadian(angle) {
  return (angle / 180) * Math.PI
}
function toAngle(radian) {
  return (radian / Math.PI) * 180
}
```

##### 计算圆弧上点的坐标

- 计算圆弧上点的坐标的公式:

```js
x = x0 + r * Math.cos(a)
y = y0 + r * Math.sin(a)
```

- sin 在 1 2 象限是正 3 4 象限是负
  - sin 在角度为：0-180 度之间为正，-90-0 度和 180-270 度之间为负
- cos 在 1 4 象限是正 2 3 象限是负
  - cos 在角度为：0-90 度和-90-0 度之间为正，90-270 度之间为负

#### 绘制文字

##### 常用绘制文字方法

- ctx.fillText() 在画布上绘制“被填充的”文本

  - 参数：文字, x 坐标, y 坐标

- ctx.strokeText() 在画布上绘制文本（无填充）

##### 常用绘制文字属性

- font 设置或返回文本内容的当前字体属性（与 CSS font 属性相同）
  ctx.font = '18px 微软雅黑';

###### 对齐方式 水平对齐方式, 垂直对齐方式

- (1) 水平对齐方式 textAlign left 以点为基准, 左对齐 right 以点为基准, 右对齐 center 以点为基准, 中间对齐
- (2) 垂直对齐方式 textBaseline 默认基线对齐 top 以点为基准,顶端对齐 middle 以点为基准,中间对齐 bottom 以点为基准,底端对齐

#### 绘制图片的三种用法 drawImage

##### (1) 将整张图片绘制到画布中

- 参数 1: 图片对象
- 参数 2,3: 绘制到画布中 x,y 坐标

```js
drawImage(imgObj, x, y)
```

如何创建图片对象?

1. var img = document.createElement('img');
2. var img = new Image(); 更加简洁,优雅

##### (2) 将整张图片绘制到画布中, 并且可以设置宽高

- 参数 1: 图片对象
- 参数 2,3: 绘制到画布中 x,y 坐标,
- 参数 4,5: 绘制到画布中图像的宽高

```js
drawImage(imgObj, x, y, w, h)
```

设置宽高最好等比例设置, 设置了宽度, 通过计算得到高度进行设置

##### (3) 从图片中裁剪一部分, 绘制到画布中

- 参数 1: 图片对象
- 参数 2,3: 裁剪的左顶点坐标
- 参数 4,5: 裁剪的宽度和高度
- 参数 6,7: 绘制到画布中的 x,y 坐标
- 参数 8,9: 绘制到画布中图片的宽高

```js
drawImage(imgObj, imgX, imgY, sWidth, sHeight, x, y, w, h)
```

### canvas 的变换

#### canvas 中的变换都是对于坐标系的变换

- (1) translate(x,y)
- (2) rotate(弧度)
- (3) scale(x,y)

#### 状态的保持和恢复

save(); restore();

##### 记住最常用的用法

- (1) 先保存默认状态 save()
- (2) 修改状态进行绘制
- (3) restore() 恢复状态

### 画布保存 base64 编码内容(了解)

- 把 canvas 绘制的内容 输出成 base64 内容。
- 语法：canvas.toDataURL(type, encoderOptions);
- 例如：canvas.toDataURL("image/png",1);
- 参数：
  - type，设置输出的类型，比如 image/png image/jpeg 等
  - encoderOptions： 0-1 之间的数字，用于标识输出图片的质量，1 表示无损压缩(可选)

```js
var canvas = document.getElementById('canvas')
var dataURL = canvas.toDataURL()
console.log(dataURL)
//   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNby
// blAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC"

var img = document.querySelector('#img-demo') //拿到图片的dom对象
img.src = canvas.toDataURL('image/png') //将画布的内容给图片标签显示
```
