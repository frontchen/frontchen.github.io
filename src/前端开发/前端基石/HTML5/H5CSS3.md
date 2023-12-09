---
title: H5CSS3
tag: HTML5
date: 2018-08-08
category: 前端基石
---

### 过渡

特点：当前元素只要有“属性”发生变化时，可以平滑的进行过渡，并不仅仅局限于 hover 状态。

transition-property 设置过渡属性

transition-duration 设置过渡时间

transition-timing-function 设置过渡动画效果

transition-delay 设置过渡延时

以上四属性重在理解

```css
/* 连写顺序要求: 执行时间 必须在 延迟时间前面  */
div {
  transition: all 1s ease 2s;
}
```

### 伸缩布局 flex

- 1.  父盒子指定 display:flex 水平排列布局
- 2.  分配子盒子空间
  - flex-basis 指定固定宽度, 剩下来的让其他人分
  - flex: 1 指定份数

```html
 <style>
    * {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    ul {
      /*width: 800px;*/
      height: 200px;
      background-color: green;
      display: flex;
    }
    li {
      /* flex 可以给子盒子设置所占份数 */
      /* flex: 1; 可以设置子盒子在父容器中所占的分数, 父容器最终通过总份数进行分配*/
      /* 每个 li 都是 1 份, 相当于平均分配 */
      /*flex: 1;*/
      border: 3px solid #000;
      box-sizing: border-box;
      background-color: orange;
    }
    li:nth-child(1) {
      /*flex: 3;*/
      /* flex-basis 用于指定固定宽度, 父盒子在先分配完固定宽度后, 再按份数分配*/
      flex-basis: 200px;
    }
    li:nth-child(2) {
      flex: 1;
    }
    li:nth-child(3) {
      flex: 2;
    }
       /* 伸缩布局:
    1. 指定 display:flex 水平排列布局
    2. 分配子盒子空间
        flex-basis  指定固定宽度, 剩下来的让其他人分
        flex: 1     指定份数*/

  </style>
</head>
<body>

<ul>
  <li>老大</li>
  <li>老二</li>
  <li>老三</li>
</ul>



</body>
```

#### 1.设置水平方向对齐方式 justify-content

- justify-content: flex-start; 居左对齐
- justify-content: flex-end; 居右对齐
- justify-content: center; 居中
- justify-content: space-around; 空白环绕分布，均匀排列每个元素， 每个元素周围分配相同的空间
- justify-content: space-between;均匀排列每个元素， 首个元素放置于起点，末尾元素放置于终点
  **最常用的是 space-around, center 因为 space-around 在单行的情况, 视觉体验很好**
  **在多行时, 一般用 flex-start**

#### 2.换行

- 压缩空间太丑了, flex 提供了换行
  **flex-wrap: nowrap; 默认不换行**
  **flex-wrap: wrap;换行**

#### 3.用于设置单行中, 盒子的垂直对齐方式 align-items

- align-items: stretch; 默认, 没设高度, 会拉伸 (拉伸, 当盒子没有高度的时候, 将盒子拉伸到最大)
- align-items: flex-start; 在单行中, 垂直方向上顶部对齐
- align-items: center; 在单行中, 垂直方向上居中对齐
- align-items: flex-end; 在单行中, 垂直方向上底部对齐

##### 子盒子不听话, 想有自己的垂直对齐方式

align-self: center;

#### 4.弹性盒子的纵向排列

- flex-direction: column; 可以改变主轴方向, 将主轴侧轴翻转了, 主轴垂直往下了

**align-content 设置侧轴多行内容对齐方式**

- align-content: flex-start;侧轴，垂直方向上顶部对齐
- align-content: center; 侧轴，垂直方向上居中对齐
- align-content: flex-end; 侧轴，垂直方向上底部对齐
- align-content: space-around;
- align-content: space-between;

#### 5.align-items、align-content、justify-content 的区别

- align-items 属性适用于所有的 flex 容器，它是用来设置每个 flex 元素在侧轴上的默认对齐方式。
- align-items 和 align-content 有相同的功能，不过不同点是它是用来让每一个单行的容器居中而不是让整个容器居中。

### 渐变

#### 线性渐变

linear-gradient 线性渐变指沿着某条直线朝一个方向产生渐变效果。

必要的元素：方向, 颜色, 渐变范围

1. 渐变的方向, 0deg 是向上渐变, 旋转方向顺时针, 记忆: 时钟方向. (当然也可以 to right, to top...)
2. 渐变的颜色和范围(常用百分比,px 也可以), 如果不设置范围, 颜色平均分布

```css
/**由于本身渐变的存在, 就是为了替换掉渐变的背景图片的, 所以是 background-image: linear-gradient(方向, 颜色 范围, 颜色 范围, ....) **/
```

#### 径向渐变

最常见用法 :

```css
/**径向渐变: 半径(渐变范围) at 圆心位置, 颜色, 颜色, 颜色...
radial-gradient( 100px at 100px 100px, red, blue, green )
超出半径区域的用最外面的颜色来填充88?
```

### 2D 转换

转换是 CSS3 中具有颠覆性的特征之一，可以实现元素的位移、旋转、缩放，配合过渡和动画知识，可以取代大量之前只能靠 Flash 才可以实现的效果。

#### 平移 translate

移动 translate(x, y) 可以改变元素的位置，x、y 可为负值；

- (1) 移动位置相当于自身原来位置

- (2) y 轴正方向朝下

- (3) 除了可以像素值，也可以是百分比，相对于自身的宽度或高度

  ​

#### 缩放 scale

缩放 scale(x, y) 可以对元素进行水平和垂直方向的缩放，x、y 的取值可为小数；

#### 旋转 rotate

旋转 rotate(deg) 可以对元素进行旋转，正值为顺时针，负值为逆时针；

- (1) 当元素旋转以后，坐标轴也跟着发生的转变
- (2) 调整顺序可以解决，把旋转放到最后

#### 斜切 skew

斜切 skew(x, y) 传角度, 可以让盒子变倾斜, skewX 是纵向拍扁的效果, skewY 是横向拍扁的效果

### 3D 转换

> transform:不仅可以 2D 转换，还可以进行 3D 转换。

思考 2d 和 3d 的区别 ? 2d 游戏

#### 坐标轴

> 用 X、Y、Z 分别表示空间的 3 个维度，三条轴互相垂直。**_注意+Y 是向下的。_**

#### rotate 旋转

```css
div {
  /* 让元素在平面2D中旋转 */
  transform: rotate(45deg);
  /* 让元素沿着X轴转45度 */
  transform: rotateX(45deg);
  /* 让元素沿着Y轴转45度 */
  transform: rotateY(45deg);
  /* 让元素沿着Z轴转45度 */
  transform: rotateZ(45deg);
}
```

问题：看不出来怎么转的，为什么现实生活中能够看出来？

#### translate 平移

```css
div {
  /*沿着X轴的正方向移动45px*/
  transform: translateX(45px);
  /*沿着Y轴的正方向移动45px*/
  transform: translateY(45px);
  /*沿着Y轴的正方向移动45px*/
  transform: translateZ(45px);
}
```

#### perspective 透视

> 电脑显示屏是一个 2D 的平面，因为我们看不出来旋转的方向，通过 perspective 属性，**指定观察者与「z=0」平面的距离，使具有三维位置变换的元素产生透视效果**，单位是 px。
>
> 说白了，设置了 perspective 属性后，就有了近大远小的效果了，在视觉上，有 3d 透视的效果。

注意：当为元素定义 perspective 属性时，其子元素会获得透视效果。(给父元素加)

```css
div{
  perspective：500px;
}
```

关于近大远小

对于我们眼睛来说，离我们越近的房子，我们会感觉到这个房子越大，离我们越远的房子，就会感觉越小，其实房子的大小都是一样的，只是在视觉上的一种不同。

#### transform-style

> transform-style 属性规定如何在 3D 空间中呈现被嵌套的元素。注意这个属性也是给父元素添加。

```js
// flat:默认值，2d显示
// preserve-3d: 3d显示
```

transform-style 与 perspective 的区别

```js
/*透视：透视只是相当于设置了一个距离，实现了近大远小的效果, 辅助我们查看3D效果的工具，*/
/*preserve-3d:给父盒子添加，让子元素3D的空间布局，说白了，只有设置了preserve-3d，这个元素才能被称之为3d元素。 */

//一个3d元素可以没有perspective，但是不能没有transform-style
```

### 动画

> 动画也是 CSS3 中具有颠覆性的特征之一，可以通过设置多个节点来精确控制一个或者一组动画，常用来实现复杂的动画效果。

动画与过渡的区别：

    1. 过渡必须触发，需要两个状态的改变。
    2. 动画可以一直运行下去，不需要触发。实现效果与过渡差不多

使用一个动画的基本步骤：

```js
//1.通过@keyframes指定动画序列
//2.通过百分比或者from/to将动画分割成多个节点
//3.在各个节点中分别定义动画属性
//4.通过animation将动画应用于相应的元素
```

#### animation 详解

> animation 是一个复合属性，一共有 8 个参数

```js
// animation-name:动画名称，由@keyframes定义的
// animation-duration：动画的持续时间
// animation-timing-function：动画的过渡类型
// animation-delay：动画的延迟时间
// animation-iteration-count：动画的循环次数
// animation-direction：设置动画在循环中是否反向运动
// animation-fill-mode：设置动画时间之外的状态
// animattion-play-state:设置动画的状态。
```

#### 动画库的使用

[https://isux.tencent.com/css3/index.html](https://isux.tencent.com/css3/index.html)

[https://daneden.github.io/animate.css/](https://daneden.github.io/animate.css/)

### html5 语义化兼容性问题

```html
<!-- 现象: IE8 以下版本不支持 html5 语义化标签 -->
<header>我是header标签， 我应该独占一整行</header>
```

解决方式:

1. 在浏览器解析标签之前, 动态创建一下 header 标签, 浏览器就认识了

```js
document.createElement('header')
```

2. 默认行内, 需要转成块级

```css
header {
  /* header 标签应该独占一整行 */
  display: block;
}
```

但是 html5 新增了很多语义化标签, 一个个创建太麻烦了, html5shiv 插件很好的解决这个问题

#### html5shiv 解决兼容性问题

在 head 中 引入 html5shiv 插件包即可解决 IE 8 不识别 html5 语义化标签的问题

```js
<script src="html5shiv.js"></script>
```

但是在支持 html5 语义化标签的浏览器中, 这个 js 的执行就没有必要, 消耗了性能

所以我们可以通过 CSS IE 条件注释 做兼容性处理

#### CSS 条件注释(了解)

CSS IE 条件注释 专门用于兼容 IE 低版本

所以只有 IE9 及 IE9 以下版本 才认识，其他版本的浏览器或者 IE10 以上 的版本会当成注释, 不会解析

它里面有判断 IE 版本的方式

```css
lte：就是Less than or equal to的简写，也就是小于或等于的意思。
lt ：就是Less than的简写，也就是小于的意思。
gte：就是Greater than or equal to的简写，也就是大于或等于的意思。
gt ：就是Greater than的简写，也就是大于的意思。
```

用法实例:

在小于等于 IE 8 的浏览器中才会执行, 在 IE9 中, 就是普通的注释, 不会解析执行

```html
<!--[if lte IE 8]>
  <script>
    alert('呵呵, 小于等于IE8都会执行这段话')
  </script>
  <script src="html5shiv.js"></script>
<![endif]-->
```

大于 IE 8 的浏览器才执行, 只有 IE 9 认识, 其他浏览器, IE 10 及以上, 都将条件注释当成注释

```html
<!--[if gt IE 8]>
  <script>
    alert('只有IE9才执行这句话')
  </script>
<![endif]-->
```

### html5 新增类名操作(熟记)

四个操作样式类的方法, 很简单, 需要熟记

- 1. 添加类: dom.classList.add
- 2. 移除类: dom.classList.remove
- 3. 判断类: dom.classList.contains
- 4. 切换类: dom.classList.toggle

### html5 自定义属性操作

将来在工作中, 有一种很常见的做法, 就是将数据绑定在标签自定义属性中, 我们之前都需要通过 getAttribute 或者 setAttribute 一个一个获取, 当数据很多时, 就很麻烦

html5 提供了一种更简单存取数据的方式 dataset

用法:

- 1.存的时候, 在属性名前面加上 data-,
   <div class="pp" data-uage="18" data-uname="鹏鹏" data-sex="男"></div>

- 2.取的时候, 通过 dataset.属性名取,
  例如: box.dataset.uage 或者 box.dataset["uage"]
- 3.修改添加, 直接通过对象属性操作方式操作即可
  例如: box.dataset.uage=12

### 网络状态

> 在移动端，我们经常需要检测设置是在线还是离线，HTML5 为此定义了一个 navigator.onLine 属性，这个属性用于检测设备是否联网。

#### 网络状态

```js
// navigator.onLine返回用户当前的网络状况，是一个布尔值
// 1. 如果浏览器连不上网(包括局域网)，就是离线状态，也就是脱机状态，会返回false
// 2. 否则就是在线状态，返回true
```

**注意：返回 true 不一定就是说一定能访问互联网，因为有可能连接的是局域网。但是返回 false 则表示一定没连上网。**

#### 监听网络变化

> 为了更好的确定网络是否连接，HTML5 还定义了两个事件，用于监听网络状态的变化。

```js
//网络连接时会被调用
window.addEventListener('online', function () {
  alert('online')
})
//网络断开时会被调用
window.addEventListener('offline', function () {
  alert('offline')
})
```

### 地理位置

> 在 HTML 规范中，增加了获取用户地理信息的 API，这样使得我们可以基于用户位置开发互联网应用，即基于位置服务 LBS(Location Base Service)

#### 隐私

HTML5 规范提供了一套保护用户隐私的机制。必须先得到用户明确许可，才能获取用户的位置信息。

**在获取地理位置之前，会询问用户，只有在获得许可之后，才能获取到用户的位置信息。**

#### 相关的方法

```js
//successCallback:获取成功后会调用,并返回一个position对象，里面包含了地理位置信息
//获取失败了会调用，并返回error对象，里面包含了错误信息。
//获取当前的地理位置信息
navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
//重复的获取当前的地理位置信息
navigator.geolocation.watchPosition(successCallback, errorCallback)
```

实例：

```js
navigator.geolocation.getCurrentPosition(
  function (position) {
    // 定位成功会调用该方法
    // position.coords.latitude 纬度
    // position.coords.longitude 经度
    // position.coords.accuracy 精度
    // position.coords.altitude 海拔高度
  },
  function (error) {
    // 定位失败会调用该方法
    // error 是错误信息
  }
)
```

PC 端: **chrome,火狐定位请求的页面要求要是 https 协议的, 所以 PC 端测试在 IE 下测试**

移动端: **在 iOS 10 中，苹果对 webkit 定位权限进行了修改，定位请求的页面必须是 https 协议的。**

#### 百度地图

> 仅仅获取到经纬度对于用户来说意义并不大，因为用户也不知道经度和纬度表示的是地球上的哪一个地方，因为我们可以结合百度地图，准确的将用户的位置显示出来。

百度地图官网：[http://lbsyun.baidu.com/](http://lbsyun.baidu.com/)

1. 在开发中，找到 javascript API
2. 直接查看示例 demo
3. 复制相应的代码，替换掉秘钥就行，秘钥只需创建一个新的应用就可以了。

### web 存储

> 在代码执行的时候，数据都是存储在内存中的，当页面关闭或者浏览器关闭的时候，内存就被释放掉了。数据只有存储在硬盘上，才不会被释放。

web 存储初体验

```js
//存储在内存中，会被释放
var str = 'hello world'
console.log(str)

//存储在硬盘上，不会被释放
localStorage.setItem('name', '张三')
console.log(localStorage.getItem('name'))
```

#### cookie(了解)

> 传统方式，我们以 document.cookie 进行存储，但是存储起来特别麻烦，并且，存储大小只有 4k，常用来做自动登录，即存储用户的账号和密码信息。每次请求都会带上 cookie

cookie 是以字符串形式存在的，这个字符串有固定的格式：key=value;key1=value1;

在获取 cookie 内容时，一般需要通过正则或者字符串的方法进行处理，转换成对象，最终得到数据。

```js
document.cookie = 'name=zhangsan'
document.cookie = 'age=18'
document.cookie = 'sex=23'

//读取cookie
var result = document.cookie
console.log(result)
```

使用原生 js 操作 cookie 太过麻烦，尤其是 cookie 的获取和删除操作，使用 jquery.cookie 插件，能够简化我们的操作。

```js
//设置cookie
$.cookie('name', 'zs')
//获取cookie
console.log($.cookie('name'))
//删除cookie
$.removeCookie('name')
```

使用 cookie：操作太麻烦，最多只能存储 4k ,每次请求都会带上 cookie

#### sessionStorage 与 localStorage

> HTML5 规范提出了解决方案，使用 sessionStorage 和 localStorage 存储数据。设置、读取、删除操作很方便

window.sessionStorage 的特点

- 1.声明周期为关闭浏览器窗口
- 2.不能在多个窗口下共享数据。
- 3.大小为 5M

window.localStorage 的特点

- 1.永久生效，除非手动删除
- 2.可以多个窗口共享
- 3.大小为 5M

window.sessionStorage 与 window.localStorage 的方法

```js
setItem(key, value) //设置存储内容
getItem(key) //读取存储内容
removeItem(key) //删除键值为key的存储内容
clear() //清空所有存储内容
```

**面试题：请描述一下 cookies，sessionStorage 和 localStorage 的区别？**

### 自定义播放器

全屏切换 API：

```js
video.requestFullScreen()
```

方法：load()、play()、pause()
属性：

currentTime:当前时间
duration：总长时间
timeupdate:播放进度更改时触发
volume：控制音量

参考文档
http://www.w3school.com.cn/tags/html_ref_audio_video_dom.asp

推荐网站：[https://www.awesomes.cn/](https://www.awesomes.cn/)

video.js

### 文件读取

> 通过 FileReader 对象我们可以读取本地存储的文件，可以使用 File 对象来指定所要读取的文件或数据。其中 File 对象可以是来自用户在一个 input 元素上选择文件后返回的 FileList 对象，也可以来自由拖放操作生成的 DataTransfer

#### files

对于 file 类型的 input 框，在这个 DOM 对象中，存在一个 files 属性，这个属性是 FileList 对象，是一个伪数组，里面存储着上传的所有文件，当 input 框指定了 multiple 属性之后，就可以上传多个文件了。

也就是说，通过 files 这个属性，我们就可以获取到所有上传的文件。

#### file 对象

File 对象中包含了文件的最后修改时间、文件名、文件类型等信息。

#### FileReader 对象

FileReader 是一个 HTML5 新增的对象，用于读取文件。

```js
//创建一个fileReader对象
var fr = new FileReader;
//读取文件的两个方法
readAsText() 以文本的方式读取文件
readAsDataURL() 以DataURL形式读取文件
//文件读取完成事件：
fr.onload = function(){}
//当文件读取完成，可以通过result属性获取结果
fr.result
```

参考资料：[https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader#toc](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader#toc)

案例：

```js
var file = document.getElementById('file')
var box = document.getElementById('box')

file.addEventListener('change', function () {
  console.dir(file)

  //files:里面存储了所有上传的文件
  //这个data就是我们上传的那个文件
  var data = file.files[0]

  //1. 创建一个文件读取器
  var fr = new FileReader()

  //2. 让文件读取器读取整个文件
  fr.readAsDataURL(data)

  //3. 等待文件读取完
  //onload：文件读取完成后，就会触发
  fr.onload = function () {
    var img = document.createElement('img')
    img.src = fr.result
    box.innerHTML = ''
    box.appendChild(img)
  }
})
```

### 拖拽

在 HTML5 的规范中，我们可以通过为元素增加 draggable="true"来设置此元素是否可以进行拖拽操作，其中图片、链接默认是开启的。

#### 拖拽元素

页面中设置了 draggable="true"属性的元素，其中`<img>`、`<a>`标签默认是可以被拖拽的

#### 目标元素, 事件监听

页面中任何一个元素都可以成为目标元素

```
ondragover	应用于目标元素，当停留在目标元素上时调用
ondrop		应用于目标元素，当在目标元素上松开鼠标时调用(浏览器默认不让拖拽，需要组织dragover的默认行为。)
```

### 使用 Flexible 实现手淘 H5 页面的终端适配

#### 大概说明

做移动端网页和 pc 端很大不同的便是现在移动端窗口分辨率繁多。

很多时候 UI 给的设计图只有一份，还是按照 iphone6 设计的，这就让前端适配其他例如 6plus 或安卓等其他移动端头疼。

还好，阿里巴巴 2015 年底公开了其成熟的适配方案，lib-flexible，至于其可靠性可参考每年天猫活动的移动端页面。

这个方案的用法大概是这样的，HTML 头部引入 lib-flexible 的样式和 js 库，容器或组件宽高主要使用单位 rem ，字体大小则不变仍然使用单位 px。

##### 还有一个约束是，因为只面向移动端，因此我们限制最外层包裹的 div 最大宽度为 640px

##### 设备像素比(device pixel ratio)

设备像素比简称为 dpr，其定义了物理像素和设备独立像素的对应关系。它的值可以按下面的公式计算得到：

- 物理像素又被称为设备像素，他是显示设备中一个最微小的物理部件。每个像素可以根据操作系统设置自己的颜色和亮度。
- 设备独立像素也称为密度无关像素，可以认为是计算机坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素(比如说 px)，然后由相关系统转换为物理像素。
- 在 IOS 设备上叫 PT，Android 设备上叫 DP，在 css 中，叫 PX。
- 设备像素比 ＝ 物理像素 / 设备独立像素

#### lib-flexible 使用步骤

[需要深入解释的知识：](https://github.com/amfe/article/issues/17)

##### 1.引入 lib-flexible

```html
<head>
  <title>lib-flexible demo</title>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"
  />

  <link href="css/flexible.css" rel="stylesheet" />
  <script src="js/flexible.js"></script>
</head>
```

##### 2 计算 rem 值

[详细了解 rem 值计算可参考](http://www.cnblogs.com/azhai-biubiubiu/p/6003597.html)

rem 来做宽高定型有个最大的问题是，font-size 如何计算的问题，如何算得的 font-size 可以在不同分辨率下显示效果一致呢？

不用担心，lib-flexible 已经帮你算好了，在你调整窗口大小的时候自动计算调整 rem 的基准，你只要做的是，按照设计图算出能适配不同分辨率的移动端的 rem 值。

###### 计算 rem 值，计算公式很简单：

需转换的 px 值 / 设计稿宽度 px 值 \* 10

##### 3 按照 UI 给的设计稿敲出代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title></title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link href="css/flexible.css" rel="stylesheet" />
    <script src="js/flexible.js"></script>

    <style>
      html,
      body {
        width: 100%;
        height: 100%;
        position: relative;
        padding: 0;
        margin: 0;
        overflow: hidden;
      }

      body {
        background: #333;
      }

      .container {
        overflow-x: hidden;
        overflow-y: auto;
        position: relative;
        height: 100%;
        max-width: 640px;
        background-color: white;
        margin: 0 auto;
      }

      .block {
        margin: 0 auto;
        margin-top: 1.5625rem;

        width: 3.75rem;
        height: 1.875rem;

        background-color: #0075a9;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="block"></div>
    </div>
  </body>
</html>
```

##### 4 不同分辨率移动端下浏览效果

### 浏览器的重绘与重排

#### 1、重绘(Repaint)

- 重绘是一个元素外观的改变所触发的浏览器行为，例如改变 outline、背景色等属性。浏览器会根据元素的新属性重新绘制，使元素呈现新的外观。重绘不会带来重新布局，所以并不一定伴随重排。

#### 2、重排(Reflow)

- 渲染对象在创建完成并添加到渲染树时，并不包含位置和大小信息。计算这些值的过程称为布局或重排
- "重绘"不一定需要"重排"，比如改变某个网页元素的颜色，就只会触发"重绘"，不会触发"重排"，因为布局没有改变。但是，"重排"必然导致"重绘"，比如改变一个网页元素的位置，就会同时触发"重排"和"重绘"，因为布局改变了。

#### 3、常见的触发重排的操作

- 重排(Reflow) 的成本比 重绘(Repaint)的成本高得多的多。DOM Tree 里的每个结点都会有重排(Reflow) 方法，一个结点的 重排(Reflow) 很有可能导致子结点，甚至父点以及同级结点的重排(Reflow) 。在一些高性能的电脑上也许还没什么，但是如果 重排(Reflow) 发生在手机上，那么这个过程是非常痛苦和耗电的。

##### 触发重排的操作

- 当你增加、删除、修改 DOM 结点时，会导致重排(Reflow), 重绘(Repaint)。
- 当你移动 DOM 的位置
- 当你修改 CSS 样式的时候。
- 当你 Resize 窗口的时候（移动端没有这个问题）
- 当你修改网页的默认字体时。
- 获取某些属性时
  注：display:none 重排(Reflow)，而 visibility:hidden 只会触发重绘(Repaint)，因为没有发现位置变化。

#### 4.注意:

向浏览器请求一些 style 信息的时候，就会让浏览器 flush 队列，比如：

- （1）offsetTop, offsetLeft, offsetWidth, offsetHeight
- （2）scrollTop/Left/Width/Height
- （3）clientTop/Left/Width/Height
- （4）width,height

当你请求上面的一些属性的时候，浏览器为了给你最精确的值，需要 flush 队列，
因为队列中可能会有影响到这些值的操作。即使你获取元素的布局和样式信息跟最近的布局信息差不多，
浏览器都会强行刷新渲染队列。

#### 5.优化

（1）将多次改变样式属性的操作合并成一次操作
（2）将需要多次重排的元素，position 属性设为 absolute 或 fixed，
这样此元素就脱离了文档流，它的变化不会影响到其他元素。例如有动画效果的元素就最好设置为绝对定位。
（3）由于 display 属性为 none 的元素不在渲染树中，对隐藏的元素操作不会引发其他元素的重排。
如果要对一个元素进行复杂的操作时，可以先隐藏它，操作完成后再显示。这样只在隐藏和显示时触发 2 次重排。

### 解决浏览器兼容性问题，还是从三个方面入手：html 部分、css 部分、js 部分。

#### 1、html 部分

- a、最突出也是最容易想到的就是高版本的浏览器用了低版本的浏览器无法识别的元素，从而导致不能解析。这点主要体现在 html5 的新标签上
-      解决办法是：htmlshim框架可以让低于IE9的浏览器支持html5
- b、img 的 alt 属性，在图片不存在的情况下，各浏览器的解析不一致
  在 chrome 下显示的是一张破损的图片，在 ff 下显示的是 alt 的文字，而在 IE 中显示的是破损的图片加文字
- c、ul 标签内外边距问题
  ul 标签在 IE6\IE7 中，有个默认的外边距，但是在 IE8 以上及其他浏览器中有个默认的内边距

#### 2、css 部分：

- a、css 的 hack 问题：主要针对 IE 的不同版本，不同的浏览器的写法不同

  IE 的条件注释 hack：

     <!--[if IE 6]>此处内容只有IE6.0可见<![endif]-->

     <!--[if IE 7]>此处内容只有IE7.0可见<![endif]-->

- b、IE6 双边距问题：IE6 在浮动后，又有横向的 margin，此时，该元素的外边距是其值的 2 倍

  解决办法：display:block;

- c、IE6 下图片的下方有空隙

  解决方法：给 img 设置 display:block;

- d、IE6 下两个 float 之间会有个 3px 的 bug

  解决办法：给右边的元素也设置 float:left;

- e、IE6 下没有 min-width 的概念，其默认的 width 就是 min-width

- f、IE6 下在使用 margin:0 auto;无法使其居中

  解决办法：为其父容器设置 text-align:center;

- g、 被点击过后的超链接不再具有 hover 和 active 属性

  解决办法:按 lvha 的顺序书写 css 样式

- h、在使用绝对定位或者相对定位后，IE 中设置 z-index 失效，原因是因为其元素依赖于父元素的 z-index，但是父元素默认为 0， 子高父低，所以不会改变显示的顺序

- i、IE6 下无法设置 1px 的行高，原因是由其默认行高引起的

- 解决办法：为期设置 overflow:hidden;或者 line-height:1px;

#### 3、js 部分

##### 1.window.event

- ie：有 window.event 对象
- ff：没有 window.event 对象，可以通过函数的参数传递 event 对象。如 onclick=clickHandler(event)

- 解决办法：
- var event = event || window.event;

##### 2.鼠标当前坐标

- ie：event.x 和 event.y

- ff：event.pageX 和 event.pageY

-解决办法：采用通用属性：event.clientX 和 event.clientY 属性;

##### 3. 鼠标坐标加上滚动条滚过的距离

- ie：event.offsetX 和 event.offsetY
- ff：event.layerX 和 event.layerY
- 解决办法：

```html
<script type="text/javascript">
  function mouseDownHandler(event) {
    var e = event ? event : window.event
    var x = e.offsetX || e.layerX
    var y = e.offsetX || e.layerY
  }
</script>
```

##### 4. event.srcElement

- ie：event 对象有 srcElement 属性，但是没有 target 属性；

- ff：event 对象有 target 属性，但没有 srcElement 属性
- 解决办法：

使用 obj = event.srcElement ? event.srcElement : event.target;

来代替 ie 下的 event.srcElement 或者 ff 下的 event.target（注意 event 的兼容性）;

##### 5.event.toElement

- ie：event 对象有 toElement 属性，但没有 relatedTarget 属性
- ff：event 对象没有有 toElement 属性，但有 relatedTarget 属性
- 解决办法：

```js
var target = e.relatedTarget || e.toElement
```

##### 6. 标签的 x 和 y 的坐标位置，

style.posLeft 和 style.posTop

- ie：有
- ff：没有
- 解决办法：
  用通用属性 obj.offsetLeft 和 obj.offsetTop

##### 7. 窗体的高度和宽度

- ie：document.body.offsetWidth 和 document.body.offsetHeight。注意，此时页面一定要有 body 标签。
- ff：
  window.innerWidth 和 window.innerHeight，以及 document.documentElement.clientWidth 和 document.documentElement.clientHeight。

- 解决办法：

通用属性

document.body.clientWidth 和 document.body.clientHeight；

##### 8. 添加事件

- ie：element.attachEvent('onclick',function)

- ff：element.addEventListener('click',function,true)
- 解决办法：
  element.onclick = function.

虽然都可以使用 click 事件。但 onclick 和上面两种方法效果是不一样的。onclick 只有执行一个过程，而 attachEvent 和 addEventListener 执行的是一个过程列表，也就是多个过程。 如：element.attachEvent('onclick',func1); element.attachEvent("onclick", func2)这样 func1 和 func2 都会被执行。

##### 9. 标签的自定义属性

- ie：如果给标签 div1 定义了一个属性 value，可以 div1.value 和 div1["value"]取得该值
- ff：不能用 div1.value 和 div1["value"]
- 解决办法：

```js
div1.getAttribute('value')
```

##### 10. document.form.item

- ie：现有问题，document.formName.item("itemName") 这样的语句，不能在 ff 下运行
- ff：不支持
- 解决办法： document.formName.elements["elementName"]

##### 10. 集合/数组类对象问题

- ie：有许多集合类对象取用时用()
- ff：不能这样取用
- 解决办法：
  改用[]作为下标运算。

如：

document.forms("formName")

改为 document.forms["formName"]。

document.getElementsByName("inputName")(1)

改为 document.getElementsByName("inputName")[1]

##### 11. html 对象的 id 作为对象名的问题

- ie：html 对象的 id 可以作为 document 的下属变量名直接使用
- ff：需要用 getElementById()方法
- 解决办法：
- 用 getElementById('idName')代替 idName 作为对象变量使用

##### 12. 用 idName 字符串取得对象的问题

- ie：利用 eval(idName)可以取得 id 为 idName 的 html 对象。
- ff：不支持
- 解决办法：getElementById(idName) 代替 eval(idName)

##### 13. 变量名与某 html 对象 id 相同的问题

- ie：因为 html 对象 id 在 ie 中直接调用，所以变量名不能和 id 相同
- ff：可以使用变量名和 id 相同
- 解决办法，
- 声明变量时一律加上 var ，以避免歧义(最好 id 和变量名不要相同)。

##### 14. document.getElementsByName() 和 document.all[name]

- ie：getElementsByName()、document.all[name] 均不能用来取得 div 元素
- ff：可以兼容 document.all， 但会生成一条警告。
- 解决办法：
  - 可以用 getElementById() 或者 getElementByTagName()来代替

##### 15. input.type 属性问题

- ie：input.type 属性为只读
- ff：input.type 属性为读写

##### 16. window.location.href

- ie：（ff2.0 以下），可以使用 window.location 或 window.location.href ; ff 1.5 下只能使用 window.location
- 解决办法：
  - 使用 window.location 来代替 window.location.href

##### 17. 模态和非模态窗口问题

- ie：可以通过 showModalDialog 和 showModelessDialog 打开模态和非模态窗口
- FF：不支持
- 解决办法：
  - 直接使用 window.open(pageURL, name, parameters)
  - 方式打开新窗口，如果需要将子窗口中的参数传递回父窗口，可以在子窗口中使用 window.opener 来访问父窗口。
  - 如：var parWin = window.opener; parWin.document.getElementById('title').value = 'My Title';

##### 18. body 对象

- IE：body 必须在 body 标签被浏览器完全读入后才存在
- FF：body 在 body 标签没有被浏览器完全读入之前就存在
- 解决方法:一切在 body 上插入节点的动作，全部在 onload 后进行

##### 19. 事件委托方法

- IE：document.body.onload = init;
- FF：document.body.onload = init();
- 解决办法：

```js
//统一使用
document.body.onload = new Function('init()')

//或者
docuement.body.onload = function () {
  //这里是代码
}
```

##### 20. 父元素的区别

- IE：obj.parentElement;
- FF ：obj.parentNode
- 解决办法：因为 FF 与 IE 都支持 dom，所以可以都使用 obj.parentNode

##### 21.innerText

- 在 IE 中能正常工作，
- 但是 innerText 在 FF 中却不行.
- 解决方法:需用 textContent

##### 22. F

F 中设置 HTML 标签的 style 时，所有位置性和字体尺寸的值必须后跟 px。这个 IE 也是支持的

##### 23. 父节点、子节点和删除节点

- IE：parentElement、parement.children，element.romoveNode(true)。
- FF：parentNode、parentNode.childNodes，node.parentNode.removeChild(node)。

##### 24.关于 frame

- IE 中可以用 window.testFrame 取得该 frame，
- FF 中不行
- 解决方法

```js
window.top.document.getElementById('testFrame').src = 'xx.html'
window.top.frameName.location = 'xx.html'
```

注意:HTML5 不支持 `<frame>` 标签。

##### 25.取得元素的属性

在 FF 中，自己定义的属性必须 getAttribute() 取得

##### 26.FF 中没有 parentElement，parement.children 而用 parentNode，parentNode.childNodes

- 问题：childNodes 的下标的含义在 IE 和 FF 中不同，FF 的 childNodes 中会插入空白文本节点

- 解决方法：可以通过 node.getElementsByTagName() 来回避这个问题
  问题：当 html 中节点缺失时，IE 和 FF 对 parentNode 的解释不同，例如：

```html
<form>
  <table>
    <input type="text" />
  </table>
</form>
```

- FF 中 input.parentNode 的值为 form，
- 而 IE 中 input.parentNode 的值为空节点
- 问题：FF 中节点自己没有 removeNode 方法
- 解决方法：必须使用如下方法 node.parentNode.removeChild(node)

##### 27.const 问题

- 问题:
  在 IE 中不能使用 const 关键字
- 解决方法:以 var 代替

##### 28.nodeName 与 tagName 问题

- 问题:在 FF 中，所有节点均有 nodeName 值，但 textNode 没有 tagName 值，
- 在 IE 中，nodeName 的使用有问题
- 解决方法:使用 tagName，但应检测其是否为空

##### 28.获取元素计算后的样式

- 参数 1:元素，获取谁的样式
- 参数 2:伪元素，固定为 null
  - window.getComputedStyle(box,null);IE11 以下不支持
  - box.currentStyle;IE8 以上支持
  - 解决方法

```js
//第一种
function getStyle(element, attr) {
  var result = ull //定义一个空对象
  if ('getComputedStyle' in window) {
    result = window.getComputedStyle(element, null)
  } else {
    result = element.currentStyle
    return result[attr]
  }
}
getStyle(box, 'width') //调用
//第二种
function getStyle(element) {
  if ('getComputedStyle' in window) {
    return window.getComputedStyle(element, null)
  } else {
    return element.currentStyle
  }
}
getStyle(box).width //调用
```

##### 29.元素属性

- IE 下 input.type 属性为只读，
- 但是 FF 下可以修改
- 解决办法：不能修改 input.type 的属性，如果必须要修改，可以先隐藏原来的 input，然后再同样的位置再插入一个新的 input 元素。

##### 30、标准的事件绑定方法

- 函数为 addEventListener，但 IE 下是 attachEvent；

##### 31、事件的捕获方式不一致，

- 标准浏览器是由外至内，而 IE 是由内到外，但是最后的结果是将 IE 的标准定为标准

##### 32、我们常说的事件处理时的 event 属性，

- 在标准浏览器其是传入的，IE 下由 window.event 获取的。并且获取目标元素的方法也不同，标准浏览器是 event.target，而 IE 下是 event.srcElement

##### 33、日期处理

- 在低版本的 IE 中获取的日期处理函数的值不是与 1900 的差值，但是在高版本的 IE 中和标准浏览器保持了一致，获取的值也是与 1900 的差值。
  比如：var year= new Date().getYear();

##### 34、ajax 的实现方式不同，

- 这个我所理解的是获取 XMLHttpRequest 的不同，IE 下是 activeXObject

##### 35、IE 中不能操作 tr 的 innerHtml

##### 36、获得 DOM 节点的父节点、子节点的方式不同

- 其他浏览器：parentNode parentNode.childNodes
- IE：parentElement parentElement.children
