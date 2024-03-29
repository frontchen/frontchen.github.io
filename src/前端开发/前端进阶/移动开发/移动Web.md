---
title: 移动Web
tag: 移动开发
date: 2018-08-08
category:
  - 前端进阶
---

一个标准流的盒子，如果不写 width，添加 padding margin border 不会撑大盒子

#### 1.视口属性说明

| 属性          | 参数                        | 说明                       |
| ------------- | --------------------------- | -------------------------- |
| width         | device-width 设备的宽度     | 设置视口的大小             |
| initial-scale | 1.0                         | 控制视口的缩放比           |
| user-scalable | no 禁止用户用手指去缩放视口 | 设置用户是否可以用手指缩放 |
| maximum-scale | 1.0                         | 最大缩放比                 |
| minimum-scale | 1.0                         | 最小缩放比                 |

```html
<meta
  name="viewport"
  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
/>
```

#### 2.touch 事件

| touch 事件     | 说明                         |
| -------------- | ---------------------------- |
| touchstar      | 手指触到屏幕的时候触发       |
| touchend       | 手指在屏幕连续移动的时候触发 |
| touchmove      | 手指离开屏幕的时候触发       |
| touchcancel    | 系统停止跟踪时触发           |
| changedTouches | 屏幕上最新的手指列表         |
| targetTouches  | 当前元素上的手指列表,        |
| touches        | 当前屏幕上所有的手指列表     |

注意在实际工作，最大的不同就是 changedTouches 在 touchend 事件里面可以获取到手指列表，但是 targetTouches、touches 是获取不到的 因为那个时候屏幕上没有手指了

```css
/* 解决IOS默认滑动很卡的情况 */
-webkit-overflow-scrolling : touch;
    /*行内快元素默认水平居中*/
    display: inline-block;
 /*去掉行内块元素的间隙*/
 font-size：0;

 /*缩进*/
 text-indent: 30px;
```

使用 display:table-cell 来居中
对于那些不是表格的元素，我们可以通过 display:table-cell 来把它模拟成一个表格单元格，这样就可以利用表格那很方便的居中特性了。

```css
    /*删除线*/
   text-decoration: line-through;


 /*单行溢出*/

    .one-txt-cut{
    	overflow: hidden;
    	white-space: nowrap;
    	text-overflow: ellipsis;
    }



/*多行溢出 手机端使用*/

    .txt-cut{
    	overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* 这个是具体到到少行 */
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    }



**/*字符间隔*/**
<p>letter-spacing: 3px;</p>


/*取消输入框高亮*/
outline:none
/*label 会带来双重点击的问题*/
```

#### 3.重绘与回流

```js
    <script type="text/javascript">
    	var box = document.querySelector('.box');
    	box.onclick = function(){
    		// 发生一次重绘
    		box.style.backgroundColor = 'green';

    		// 发生两次回流
    		// 一旦有回流 必然会有重绘
    		box.style.width = '200px';
    		box.style.height = '200px';

    		// 聪明的浏览器
    		// 浏览器会在内部维护一个队列，当队列达到一定的数值或者一定的时间，浏览器会刷新队列，进行一次批处理 这样就能让多次的回流或重绘只需要一次即可

    		// 当我们去获取盒子的宽，高。或者位置等属性的时候，会破坏掉浏览器内部的优化，浏览器会强制刷新队列，进行批处理 （为了数据的准确性）

    	}
    	</script>

```

    根据Opera浏览器，重绘的代价是高昂的，因为浏览器必须验证DOM树上其他节点元素的可见性。而回流更是性能的关键因为其变化涉及到部分页面（或是整个页面）的布局。一个元素的回流导致了其所有子元素以及DOM中紧随其后的祖先元素的随后的回流。

##### 什么会导致回流呢？

- 1.调整窗口大小
- 2.改变字体
- 3.增加或者移除样式表
- 4.内容变化，比如用户在 input 框中输入文字
- 5.激活 CSS 伪类，比如 :hover (IE 中为兄弟结点伪类的激活)
- 6.操作 class 属性
- 7.脚本操作 DOM
- 8.计算 offsetWidth 和 offsetHeight 属性
- 9.设置 style 属性的值

##### 如何避免回流或将它们对性能的影响降到最低？

- 1.如果想设定元素的样式，通过改变元素的 class 名 (尽可能在 DOM 树的最末端)
- 2.避免设置多项内联样式
- 3.应用元素的动画，使用 position 属性的 fixed 值或 absolute 值
- 4.权衡平滑和速度
- 5.避免使用 table 布局
- 6.避免使用 CSS 的 JavaScript 表达式 (仅 IE 浏览器)

##### 尽可能在 DOM 树的最末端改变 class

    回流是不可避免的，但可以减少其影响。尽可能在DOM树的里面改变class，可以限制了回流的范围，使其影响尽可能少的节点。

##### 避免设置多层内联样式

<h4>字体如何适应各种分辨率</h4>

```css
/*clientwidth 可视区盒子的宽度（ie678）
现代浏览器window.innerwidth*/
```

#### 4.rem 实例(网易/淘宝)

拿网易来说，它的设计稿应该是基于 iphone4 或者 iphone5 来的，所以它的设计稿竖直放时的横向分辨率为 640px，为了计算方便，取一个 100px 的 font-size 为参照，那么 body 元素的宽度就可以设置为 width: 6.4rem，于是 html 的 font-size=deviceWidth / 6.4。

```js
    deviceWidth = 320，font-size = 320 / 6.4 = 50px
    deviceWidth = 375，font-size = 375 / 6.4 = 58.59375px
    deviceWidth = 414，font-size = 414 / 6.4 = 64.6875px
    deviceWidth = 500，font-size = 500 / 6.4 = 78.125px
```

deviceWidth 通过 document.documentElement.clientWidth 就能取到了，所以当页面的 dom ready 后，做的第一件事情就是：

```js
document.documentElement.style.fontSize =
  document.documentElement.clientWidth / 6.4 + 'px'
```

**总结下网易的这种做法：**

####

- （1）先拿设计稿竖着的横向分辨率除以 100 得到 body 元素的宽度：
  如果设计稿基于 iphone6，横向分辨率为 750，body 的 width 为 750 / 100 = 7.5rem
  如果设计稿基于 iphone4/5，横向分辨率为 640，body 的 width 为 640 / 100 = 6.4rem
- （2）布局时，设计图标注的尺寸除以 100 得到 css 中的尺寸，比如下图：
  ![image](http://images2015.cnblogs.com/blog/459873/201510/459873-20151014135842163-32906835.png)

  - ①. 播放器高度为 210px，写样式的时候 css 应该这么写：height: 2.1rem。之所以取一个 100 作为参照，就是为了这里计算 rem 的方便！

- （3）在 dom ready 以后，通过以下代码设置 html 的 font-size:
  `document.documentElement.style.fontSize =document.documentElement.clientWidth / 6.4 + 'px'; 
`
- （4）font-size 可能需要额外的媒介查询，并且 font-size 不能使用 rem，如网易的设置：

```css
@media screen and (max-width: 321px) {
  .m-navlist {
    font-size: 15px;
  }
}

@media screen and (min-width: 321px) and (max-width: 400px) {
  .m-navlist {
    font-size: 16px;
  }
}

@media screen and (min-width: 400px) {
  .m-navlist {
    font-size: 18px;
  }
}
```

- ① 如果采用网易这种做法，视口要如下设置：

```html
<meta
  name="viewport"
  content="initial-scale=1,maximum-scale=1, minimum-scale=1"
/>
```

- ② 第二，当 deviceWidth 大于设计稿的横向分辨率时，html 的 font-size 始终等于横向分辨率/body 元素宽：
  ![image](http://images2015.cnblogs.com/blog/459873/201510/459873-20151014135843538-1878368787.png)
- 之所以这么干，是因为当 deviceWidth 大于 640 时，则物理分辨率大于 1280（这就看设备的 devicePixelRatio 这个值了），应该去访问 pc 网站了。事实就是这样，你从手机访问网易，看到的是触屏版的页面，如果从 pad 访问，看到的就是电脑版的页面。如果你也想这么干，只要把总结中第三步的代码稍微改一下就行了：

```js
var deviceWidth = document.documentElement.clientWidth
if (deviceWidth > 640) deviceWidth = 640
document.documentElement.style.fontSize = deviceWidth / 6.4 + 'px'
```

<h3>淘宝的做法</h3>

- device-width 的计算公式为：
  设备的物理分辨率/(devicePixelRatio \* scale)

- 在 scale 为 1 的情况下，device-width = 设备的物理分辨率/devicePixelRatio 。

- 1、viewport 的 initial 的 scale 根据 devicePixelRatio 动态设置，通过 js 设置 viewport 的方法如下：
  - （1）动态设置 viewport 的 scale

```js
var scale = 1 / devicePixelRatio
document
  .querySelector('meta[name="viewport"]')
  .setAttribute(
    'content',
    'initial-scale=' +
      scale +
      ', maximum-scale=' +
      scale +
      ', minimum-scale=' +
      scale +
      ', user-scalable=no'
  )
```

- （2）动态计算 html 的 font-size

```js
document.documentElement.style.fontSize =
  document.documentElement.clientWidth / 10 + 'px'
```

- （3）布局的时候，各元素的 css 尺寸=设计稿标注尺寸/设计稿横向分辨率/
- （4）font-size 可能需要额外的媒介查询，并且 font-size 不使用 rem，这一点跟网易是一样的。
  最后还有一个情况要说明，跟网易一样，淘宝也设置了一个临界点，当设备竖着时横向物理分辨率大于 1080 时，html 的 font-size 就不会变化了，原因也是一样的，分辨率已经可以去访问电脑版页面了。

<h4>比较网易与淘宝的做法</h4>
<h5> 共同点：</h5>
    
都能适配所有的手机设备，对于pad，网易与淘宝都会跳转到pc页面，不再使用触屏版的页面都需要动态设置html的font-size布局时各元素的尺寸值都是根据设计稿标注的尺寸计算出来，由于html的font-size是动态调整的，所以能够做到不同分辨率下页面布局呈现等比变化容器元素的font-size都不用rem，需要额外地对font-size做媒介查询都能应用于尺寸不同的设计稿，只要按以上总结的方法去用就可以了
 <h5> 不同点:</h5>
    
     淘宝的设计稿是基于750的横向分辨率，网易的设计稿是基于640的横向分辨率，还要强调的是，虽然设计稿不同，但是最终的结果是一致的，设计稿的尺寸一个公司设计人员的工作标准，每个公司不一样而已，淘宝还需要动态设置viewport的scale，网易不用
    
   最重要的区别就是：网易的做法，rem值很好计算，淘宝的做法肯定得用计算器才能用好了 。不过要是你使用了less和sass这样的css处理器，就好办多了，以淘宝跟less举例，我们可以这样编写less：

```CSS

    /*定义一个变量和一个mixin*/

    @baseFontSize: 75;//基于视觉稿横屏尺寸/100得出的基准font-size
    .px2rem(@name, @px){
        @{name}: @px / @baseFontSize * 1rem;
    }
    //使用示例：
    .container {
        .px2rem(height, 240);
    }
    //less翻译结果：
    .container {
        height: 3.2rem;
    }

```

外链式媒体查询

```HTML
    <link rel="stylesheet" href="red.css" media="(min-width:980px)">

    <link rel="stylesheet" href="green.css" media="(max-width:979px) and (min-width:540px)">

    <link rel="stylesheet"
    href="blue.css"
    media="（max-width:539px）">

```

内嵌式媒体查询

```CSS
    @media (min-width:1280px){
    /*这里写一个屏幕对应的css样式*/
    body{
      background-color:red;
    }
    }

    @media (min-width:780px) and (max-width:1279px){
    /*这里写一个屏幕对应的css样式*/
    body{
        background-color:blue;
    }
    }
     @media (max-width:779px){
     /*这里写一个屏幕对应的css样式*/
     body{
         background-color:green;
     }
     }
    /*迭代式写法

	规律：先写大范围 在用小范围的去覆盖大范围

	移动优先*/
    	@media (min-width: 0) {
    	body {
    		background-color: blue;
    	}
    }

    @media (min-width: 780px) {

    	body {
    		background-color: green;
    	}
    }

    @media (min-width: 1280px) {
    	body {
    	background-color: red;
    	}
    }
```

<h4>BFC特性应用</h4>
<h5>两栏或多栏自适应布局的通用类语句是（block标签需配合浮动）：</h5>

```CSS
    .cell {
    display: table-cell; width: 9999px;
    *display: inline-block; *width: auto;
    }
```

移动端页面制作字号大小设定问题,设计稿文字字号规范,解决移动端大小屏适配问题

逻辑分辨率：320*480 《==》 物理分辨率：640*690 最小字号：12px

逻辑分辨率：320*658 《==》 物理分辨率：640*1136 最小字号：12px

逻辑分辨率：375*667 《==》 物理分辨率：750*1334 最小字号：14px(13.5px)

逻辑分辨率：414*736 《==》 物理分辨率：1242*2208（1080\*1920） 最小字号：15px

一个标准流的盒子，如果不写 width，添加 padding margin border 不会撑大盒子

---

##### 视口属性说明

| 属性          | 参数                        | 说明                       |
| ------------- | --------------------------- | -------------------------- |
| width         | device-width 设备的宽度     | 设置视口的大小             |
| initial-scale | 1.0                         | 控制视口的缩放比           |
| user-scalable | no 禁止用户用手指去缩放视口 | 设置用户是否可以用手指缩放 |
| maximum-scale | 1.0                         | 最大缩放比                 |
| minimum-scale | 1.0                         | 最小缩放比                 |

```HTML
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
```

##### touch 事件

| touch 事件     | 说明                         |
| -------------- | ---------------------------- |
| touchstar      | 手指触到屏幕的时候触发       |
| touchend       | 手指在屏幕连续移动的时候触发 |
| touchmove      | 手指离开屏幕的时候触发       |
| touchcancel    | 系统停止跟踪时触发           |
| changedTouches | 屏幕上最新的手指列表         |
| targetTouches  | 当前元素上的手指列表,        |
| touches        | 当前屏幕上所有的手指列表     |

注意在实际工作，最大的不同就是 changedTouches 在 touchend 事件里面可以获取到手指列表，但是 targetTouches、touches 是获取不到的 因为那个时候屏幕上没有手指了

---

```CSS
/* 解决IOS默认滑动很卡的情况 */
-webkit-overflow-scrolling : touch;
    /*行内快元素默认水平居中*/
    display: inline-block;
/*去掉行内块元素的间隙*/
font-size：0;

/*缩进*/
text-indent: 30px;
```

使用 display:table-cell 来居中
对于那些不是表格的元素，我们可以通过 display:table-cell 来把它模拟成一个表格单元格，这样就可以利用表格那很方便的居中特性了。

---

```CSS
    /*删除线*/
   text-decoration: line-through;


/*单行溢出*/

    .one-txt-cut{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    }



/*多行溢出 手机端使用*/

    .txt-cut{
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* 这个是具体到到少行 */
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    }



**/*字符间隔*/**
<p>letter-spacing: 3px;</p>


/*取消输入框高亮*/
outline:none

```

---

/_label 会带来双重点击的问题_/

<h4>重绘与回流</h4>
 
```JS
    <script type="text/javascript">
    var box = document.querySelector('.box');
    box.onclick = function(){
        // 发生一次重绘
        box.style.backgroundColor = 'green';
 
        // 发生两次回流
        // 一旦有回流 必然会有重绘
        box.style.width = '200px';
        box.style.height = '200px';
 
        // 聪明的浏览器
        // 浏览器会在内部维护一个队列，当队列达到一定的数值或者一定的时间，浏览器会刷新队列，进行一次批处理 这样就能让多次的回流或重绘只需要一次即可
 
        // 当我们去获取盒子的宽，高。或者位置等属性的时候，会破坏掉浏览器内部的优化，浏览器会强制刷新队列，进行批处理 （为了数据的准确性）
 
    }
    </script>
 
```
    根据Opera浏览器，重绘的代价是高昂的，因为浏览器必须验证DOM树上其他节点元素的可见性。而回流更是性能的关键因为其变化涉及到部分页面（或是整个页面）的布局。一个元素的回流导致了其所有子元素以及DOM中紧随其后的祖先元素的随后的回流。
###### 什么会导致回流呢？

- 1.调整窗口大小
- 2.改变字体
- 3.增加或者移除样式表
- 4.内容变化，比如用户在 input 框中输入文字
- 5.激活 CSS 伪类，比如 :hover (IE 中为兄弟结点伪类的激活)
- 6.操作 class 属性
- 7.脚本操作 DOM
- 8.计算 offsetWidth 和 offsetHeight 属性
- 9.设置 style 属性的值

###### 如何避免回流或将它们对性能的影响降到最低？

- 1.如果想设定元素的样式，通过改变元素的 class 名 (尽可能在 DOM 树的最末端)
- 2.避免设置多项内联样式
- 3.应用元素的动画，使用 position 属性的 fixed 值或 absolute 值
- 4.权衡平滑和速度
- 5.避免使用 table 布局
- 6.避免使用 CSS 的 JavaScript 表达式 (仅 IE 浏览器)

###### 尽可能在 DOM 树的最末端改变 class

    回流是不可避免的，但可以减少其影响。尽可能在DOM树的里面改变class，可以限制了回流的范围，使其影响尽可能少的节点。

###### 避免设置多层内联样式

---

#### 样式使用的时候，也要结合 JS 代码，判断是否 Retina 屏

```js
if (window.devicePixelRatio && devicePixelRatio >= 2) {
  document.querySelector('ul').className = 'hairlines'
}
```

#### 1、安卓浏览器看背景图片，有些设备会模糊。

##### 用同等比例的图片在 PC 机上很清楚，但是手机上很模糊，原因是什么呢？

- 经过研究，是 devicePixelRatio 作怪，因为手机分辨率太小，如果按照分辨率来显示网页，这样字会非常小，所以苹果当初就把 iPhone4 的 960640 分辨率，在网页里只显示了 480320，这样 devicePixelRatio ＝ 2。
- 现在 android 比较乱，有 1.5 的，有 2 的也有 3 的。想让图片在手机里显示更为清晰，必须使用 2x 的背景图来代替 img 标签（一般情况都是用 2 倍）。例如一个 div 的宽高是 100100，背景图必须得 200200，然后 background-size:contain;，这样显示出来的图片就比较清晰了。
  代码可以如下：

```css
   background:url(../images/icon/all.png) no-repeat center center;
-webkit-background-size:50px 50px;
background-size: 50px 50px;display:inline-block; width:100%; height:50px;
或者指定 background-size:contain;都可以，大家试试！
```

#### 2、图片加载

若您遇到图片加载很慢的问题，对这种情况，手机开发一般用 canvas 方法加载：
具体的 canvas API 参见：http://javascript.ruanyifeng.com/htmlapi/canvas.html
下面举例说明一个 canvas 的例子：

```js
 <li><canvas></canvas></li>
js动态加载图片和li 总共举例17张图片！
    var total=17;
var zWin=$(window);
var render=function(){
  var padding=2;
  var winWidth=zWin.width();
  var picWidth=Math.floor((winWidth-padding*3)/4);
  var tmpl ='';
  for (var i=1;i<=totla;i++){
  var p=padding;
  var imgSrc='img/'+i+'.jpg';
  if(i%4==1){
  p=0;
  }
  tmpl +='<li style="width:'+picWidth+'px;height:'+picWidth+'px;padding-left:'+p+'px;padding-top:'+padding+'px;"><canvas id="cvs_'+i+'"></canvas></li>';
  var imageObj = new Image();
  imageObj.index = i;
  imageObj.onload = function(){
    var cvs =$('#cvs_'+this.index)[0].getContext('2d');
    cvs.width = this.width;
    cvs.height=this.height;
    cvs.drawImage(this,0,0);
  }
  imageObj.src=imgSrc;
  }

}
render();
```

#### 3、假如手机网站不用兼容 IE 浏览器，一般我们会使用 zeptojs。zeptojs 内置 Touch events 方法，具体可以看http://zeptojs.com/#Touch events

看了一下 zeptio 新版的 API，已经支持 IE10 以上浏览器，对 zeptojs 可以选择使用！

#### 4、防止手机中网页放大和缩小，这点是最基本的，最为手机网站开发者来说应该都知道的，就是设置 meta 中的 viewport

还有就是，有些手机网站我们看到如下声明：
复制代码代码如下:

```html
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">

//设置了DTD的方式是XHTML的写法，假如我们页面运用的是html5，可以不用设置DTD,直接声明<!DOCTYPE html>
。 使用viewport使页面禁止缩放。
通常把user-scalable设置为0来关闭用户对页面视图缩放的行为。

<meta name="viewport" content="user-scalable=0" />
//但是为了更好的兼容，我们会使用完整的viewport设置。 复制代码代码如下:
<meta
  name="viewport"
  content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0"
/>
//当然，user-scalable=0,有的人也写成user-scalable=no，都可以的。
```

#### 5、apple-mobile-web-app-capable

apple-mobile-web-app-capable 是设置 Web 应用是否以全屏模式运行。
语法：

```html
<meta name="apple-mobile-web-app-capable" content="yes" />
//说明：如果content设置为yes，Web应用会以全屏模式运行，反之，则不会。content的默认值是no，表示正常显示。你可以通过只读属性window.navigator.standalone来确定网页是否以全屏模式显示。
```

#### 6、format-detection

format-detection 启动或禁用自动识别页面中的电话号码。
语法：

```html
<meta name="format-detection" content="telephone=no" />
//说明：默认情况下，设备会自动识别任何可能是电话号码的字符串。设置telephone=no可以禁用这项功能。
```

#### 7、html5 调用安卓或者 ios 的拨号功能

html5 提供了自动调用拨号的标签，只要在 a 标签的 href 中添加 tel:就可以了。
如下：

```html
<a href="tel:4008106999,1034">400-810-6999 转 1034</a>
拨打手机直接如下
<a href="tel:15677776767">点击拨打15677776767</a>
```

#### 8、html5GPS 定位功能

具体请看：http://www.jb51.net/post/html5_GPS_getCurrentPosition

#### 9、上下拉动滚动条时卡顿、慢

```css
body {
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}
/*Android3+和iOS5+支持CSS3的新属性为overflow-scrolling*/
```

#### 10、禁止复制、选中文本

```css
Element {
  -webkit-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
//解决移动设备可选中页面文本(视产品需要而定)
```

#### 11、长时间按住页面出现闪退

```css
element {
  -webkit-touch-callout: none;
}
```

#### 12、iphone 及 ipad 下输入框默认内阴影

```css
Element {
  -webkit-appearance: none;
}
```

#### 13、ios 和 android 下触摸元素时出现半透明灰色遮罩

```css
Element {
  -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
}
//设置alpha值为0就可以去除半透明灰色遮罩，备注：transparent的属性值在android下无效。
后面一篇文章有详细介绍，地址：http: //www.jb51.net/post/phone_web_ysk;;
```

#### 14、active 兼容处理 即 伪类 :active 失效

方法一：body 添加 ontouchstart

```html
<body ontouchstart=""></body>
```

方法二：js 给 document 绑定 touchstart 或 touchend 事件

```css
 <style>
a {
color: #000;
}
a:active {
color: #fff;
}
</style>
<a herf=foo >bar</a>
<script>
document.addEventListener('touchstart',function(){},false);
</script>
```

#### 15、动画定义 3D 启用硬件加速

```css
Element {
  -webkit-transform:translate3d(0, 0, 0)
  transform: translate3d(0, 0, 0);
}
/*注意：3D变形会消耗更多的内存与功耗*/
```

#### 16、Retina 屏的 1px 边框

```css
Element {
  border-width: thin;
}
```

#### 17、webkit mask 兼容处理

某些低端手机不支持 css3 mask，可以选择性的降级处理。
比如可以使用 js 判断来引用不同 class：

```js
if ('WebkitMask' in document.documentElement.style) {
  alert('支持mask')
} else {
  alert('不支持mask')
}
```

#### 18、旋转屏幕时，字体大小调整的问题

```css
html,
body,
form,
fieldset,
p,
div,
h1,
h2,
h3,
h4,
h5,
h6 {
  -webkit-text-size-adjust: 100%;
}
```

#### 19、transition 闪屏

```css
/设置内嵌的元素在 3D 空间如何呈现：保留3D /

-webkit-transform-style: preserve-3d;
/ 设置进行转换的元素的背面在面对用户时是否可见：隐藏 /

-webkit-backface-visibility:hidden;
```

#### 20、圆角 bug

某些 Android 手机圆角失效

```css
background-clip: padding-box;
```

#### 21、顶部状态栏背景色

```html
<meta name="apple-mobile-web-app-status-bar-style" content="black" /> / 说明：
除非你先使用apple-mobile-web-app-capable指定全屏模式，否则这个meta标签不会起任何作用。
如果content设置为default，则状态栏正常显示。如果设置为blank，则状态栏会有一个黑色的背景。如果设置为blank-translucent，则状态栏显示为黑色半透明。
如果设置为default或blank，则页面显示在状态栏的下方，即状态栏占据上方部分，页面占据下方部分，二者没有遮挡对方或被遮挡。
如果设置为blank-translucent，则页面会充满屏幕，其中页面顶部会被状态栏遮盖住（会覆盖页面20px高度，而iphone4和itouch4的Retina屏幕为40px）。默认值是default。
/
```

#### 22、设置缓存

```html
/
手机页面通常在第一次加载后会进行缓存，然后每次刷新会使用缓存而不是去重新向服务器发送请求。如果不希望使用缓存可以设置no-cache。/
<meta http-equiv="Cache-Control" content="no-cache" />
```

#### 23、桌面图标

```html
<link rel="apple-touch-icon" href="touch-icon-iphone.png" />
<link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png" />
<link
  rel="apple-touch-icon"
  sizes="120x120"
  href="touch-icon-iphone-retina.png"
/>
<link
  rel="apple-touch-icon"
  sizes="152x152"
  href="touch-icon-ipad-retina.png"
/>

<--iOS下针对不同设备定义不同的桌面图标。如果不定义则以当前屏幕截图作为图标。上面的写法可能大家会觉得会有默认光泽，下面这种设置方法可以去掉光泽效果，还原设计图的效果！-->

<link rel="apple-touch-icon-precomposed" href="touch-icon-iphone.png" />
//图片尺寸可以设定为5757（px）或者Retina可以定为114114（px），ipad尺寸为72*72（px)
```

#### 24、启动画面

```html
<link rel="apple-touch-startup-image" href="start.png" />
iOS下页面启动加载时显示的画面图片，避免加载时的白屏。
可以通过madia来指定不同的大小：

<!--iPhone-->
<link
  href="apple-touch-startup-image-320x460.png"
  media="(device-width: 320px)"
  rel="apple-touch-startup-image"
/>

<!-- iPhone Retina -->
<link
  href="apple-touch-startup-image-640x920.png"
  media="(device-width: 320px) and (-webkit-device-pixel-ratio: 2)"
  rel="apple-touch-startup-image"
/>

<!-- iPhone 5 -->
<link
  rel="apple-touch-startup-image"
  media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
  href="apple-touch-startup-image-640x1096.png"
/>

<!-- iPad portrait -->
<link
  href="apple-touch-startup-image-768x1004.png"
  media="(device-width: 768px) and (orientation: portrait)"
  rel="apple-touch-startup-image"
/>

<!-- iPad landscape -->
<link
  href="apple-touch-startup-image-748x1024.png"
  media="(device-width: 768px) and (orientation: landscape)"
  rel="apple-touch-startup-image"
/>

<!-- iPad Retina portrait -->
<link
  href="apple-touch-startup-image-1536x2008.png"
  media="(device-width: 1536px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)"
  rel="apple-touch-startup-image"
/>

<!-- iPad Retina landscape -->
<link
  href="apple-touch-startup-image-1496x2048.png"
  media="(device-width: 1536px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)"
  rel="apple-touch-startup-image"
/>
```

#### 25、浏览器私有及其它 meta

以下属性在项目中没有应用过，可以写一个 demo 测试以下！
QQ 浏览器私有
全屏模式

```html
<meta name="x5-fullscreen" content="true" />
强制竖屏

<meta name="x5-orientation" content="portrait" />
强制横屏

<meta name="x5-orientation" content="landscape" />
应用模式

<meta name="x5-page-mode" content="app" />
UC浏览器私有 全屏模式

<meta name="full-screen" content="yes" />
强制竖屏

<meta name="screen-orientation" content="portrait" />
强制横屏

<meta name="screen-orientation" content="landscape" />
应用模式

<meta name="browsermode" content="application" />
//其它针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓

<meta name="HandheldFriendly" content="true" />
//微软的老式浏览器

<meta name="MobileOptimized" content="320" />
//windows phone 点击无高光

<meta name="msapplication-tap-highlight" content="no" />
```

#### 26、 IOS 中 input 键盘事件 keyup、keydown、keypress 支持不是很好

    问题是这样的，用input search做模糊搜索的时候，在键盘里面输入关键词，会通过ajax后台查询，然后返回数据，然后再对返回的数据进行关键词标红。用input监听键盘keyup事件，在安卓手机浏览器中是可以的，但是在ios手机浏览器中变红很慢，用输入法输入之后，并未立刻相
    应keyup事件，只有在通过删除之后才能相应！
    解决办法：
    可以用html5的oninput事件去代替keyup

```html
<input type="text" id="testInput" />
<script type="text/javascript">
  document.getElementById('testInput').addEventListener('input', function (e) {
    var value = e.target.value
  })
</script>
<--然后就达到类似keyup的效果！-->
```

#### 27、h5 网站 input 设置为 type=number 的问题

h5 网页 input 的 type 设置为 number 一般会产生三个问题，一个问题是 maxlength 属性不好用了。另外一个是 form 提交的时候，默认给取整了。三是部分安卓手机出现样式问题。

问题一解决，我目前用的是 js。如下

```js
<input type="number" oninput="checkTextLength(this ,10)">

function checkTextLength(obj, length) {
      if(obj.value.length > length)  {
    obj.value = obj.value.substr(0, length);
      }
}
```

问题二，是因为 form 提交默认做了表单验证，step 默认是 1,要设置 step 属性，假如保留 2 位小数，写法如下：

```js
<input type="number" step="0.01" />
//关于step，我在这里做简单的介绍，input 中type=number，一般会自动生成一个上下箭头，点击上箭头默认增加一个step，点击下箭头默认会减少一个step。number中默认step是1。也就是step=0.01,可以允许输入2位小数，并且点击上下箭头分别增加0.01和减少0.01。假如step和min一起使用，那么数值必须在min和max之间。
看下面的例子：

<input type="number" step="3.1" min="1" />
//输入框可以输入哪些数字？首先，最小值是1，那么可以输入1.0，第二个是可以输入（1+3.1）那就是4.1,以此类推，每次点击上下箭头都会增加或者减少3.1，输入其他数字无效。这就是step的简单介绍。

问题三，去除input默认样式
 input[type=number] {
  -moz-appearance:textfield;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
```

#### 28、ios 设置 input 按钮样式会被默认样式覆盖

解决方式如下：

```css
input,
textarea {
  border: 0;
  -webkit-appearance: none;
}
//设置默认样式为none
```

#### 29、IOS 键盘字母输入，默认首字母大写

解决方案，设置如下属性

```css
<input type="text" autocapitalize="off" />
```

#### 30、select 下拉选择设置右对齐

设置如下：

```css
select option {
  direction: rtl;
}
```

#### 31、通过 transform 进行 skew 变形，rotate 旋转会造成出现锯齿现象

可以设置如下：

```CSS
-webkit-transform: rotate(-4deg) skew(10deg) translateZ(0);
transform: rotate(-4deg) skew(10deg) translateZ(0);
outline: 1px solid rgba(255,255,255,0)
```

#### 32、移动端点击 300ms 延迟

300ms 尚可接受，不过因为 300ms 产生的问题，我们必须要解决。300ms 导致用户体验并不是很好，解决这个问题，我们一般在移动端用 tap 事件来取代 click 事件。
推荐两个 js，一个是 fastclick，一个是 tap.js
关于 300ms 延迟，具体请看：http://thx.github.io/mobile/300ms-click-delay/

#### 33、移动端点透问题

案例如下：

```js
<div id="haorooms">点头事件测试</div>

<a href="www.jb51.net">www.jb51.net</a>
//div是绝对定位的蒙层,并且z-index高于a。而a标签是页面中的一个链接，我们给div绑定tap事件：

 $('#haorooms').on('tap',function(){
$('#haorooms').hide();
});
```

我们点击蒙层时,div 正常消失，但是当我们在 a 标签上点击蒙层时，发现 a 链接被触发，这就是所谓的点透事件。
原因：

touchstart 早于 touchend 早于 click。 亦即 click 的触发是有延迟的，这个时间大概在 300ms 左右，也就是说我们 tap 触发之后蒙层隐藏， 此时 click 还没有触发，300ms 之后由于蒙层隐藏，我们的 click 触发到了下面的 a 链接上。
解决：

- （1）尽量都使用 touch 事件来替换 click 事件。例如用 touchend 事件(推荐)。
- （2）用 fastclick，https://github.com/ftlabs/fastclick
- （3）用 preventDefault 阻止 a 标签的 click
- （4）延迟一定的时间(300ms+)来处理事件 （不推荐）
- （5）以上一般都能解决，实在不行就换成 click 事件。
  下面介绍一下 touchend 事件，如下：

```js
$('#haorooms').on('touchend', function (event) {
  event.preventDefault()
})
```

#### 34、消除 IE10 里面的那个叉号

```css
input:-ms-clear {
  display: none;
}
```

#### 35、关于 iOS 与 OS X 端字体的优化(横竖屏会出现字体加粗不一致等)

- iOS 浏览器横屏时会重置字体大小，设置 text-size-adjust 为 none 可以解决 iOS 上的问题，但桌面版 Safari 的字体缩放功能会失效，因此最佳方案是将 text-size-adjust 为 100% 。

```css
-webkit-text-size-adjust: 100%;
-ms-text-size-adjust: 100%;
text-size-adjust: 100%;
```

#### 36、关于 iOS 系统中，中文输入法输入英文时，字母之间可能会出现一个六分之一空格

- 可以通过正则去掉

```js
this.value = this.value.replace(/\u2006/g, '')
```

#### 37、移动端 HTML5 audio autoplay 失效问题

- 这个不是 BUG，由于自动播放网页中的音频或视频，会给用户带来一些困扰或者不必要的流量消耗，所以苹果系统和安卓系统通常都会禁止自动播放和使用 JS 的触发播放，必须由用户来触发才可以播放。
- 解决方法思路：先通过用户 touchstart 触碰，触发播放并暂停（音频开始加载，后面用 JS 再操作就没问题了）。
  解决代码：

```js
document.addEventListener('touchstart', function () {
  document.getElementsByTagName('audio')[0].play()
  document.getElementsByTagName('audio')[0].pause()
})
```

#### 38、移动端 HTML5 input date 不支持 placeholder 问题

这个我感觉没有什么好的解决方案，用如下方法
复制代码代码如下:

```html
<input
  placeholder="Date"
  class="textbox-n"
  type="text"
  onfocus="(this.type='date')"
  id="date"
/>
//有的浏览器可能要点击两遍！
```

#### 39、部分机型存在 type 为 search 的 input，自带 close 按钮样式修改方法

有些机型的搜索 input 控件会自带 close 按钮（一个伪元素），而通常为了兼容所有浏览器，我们会自己实现一个，此时去掉原生 close 按钮的方法为

```css
#Search::-webkit-search-cancel-button {
  display: none;
}
//如果想使用原生close按钮，又想使其符合设计风格，可以对这个伪元素的样式进行修改。
```

#### 40、唤起 select 的 option 展开

zepto 方式:

```js
$(sltElement).trigger('mousedown')
```

原生 js 方式:

```js
function showDropdown(sltElement) {
  var event
  event = document.createEvent('MouseEvents')
  event.initMouseEvent('mousedown', true, true, window)
  sltElement.dispatchEvent(event)
}
```

#### 41、ios 端键盘挡住输入框 解决方案

```js
//解决ios键盘挡住输入框
var u = navigator.userAgent
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) //ios终端
//显示系统版本信息的字符串
var str = navigator.userAgent.toLowerCase()

// ios11bug处理
var version = ''

// ios11bug处理

window.onload = function () {
  if (isiOS) {
    //消息框获取焦点
    let timer = null
    let ver = str.match(/cpu iphone os (.*?) like mac os/)
    //ios系统版本，比如9.1.1
    ver = ver[1].replace(/_/g, '.')
    ver = ver.replace(/\"/g, '')
    //字符串切割成数组 [9,1,1]
    var temp = ver.split('.')
    version = temp[0]
    console.log(temp[0])

    //ios11以下的版本
    if (version < 11) {
      $('.write-box .form-control').on('focus', function () {
        clearInterval(timer)
        let index = 0
        timer = setInterval(function () {
          if (index > 5) {
            document.body.scrollTop = document.body.scrollHeight
            clearInterval(timer)
          }
          index++
        }, 50)
      })
    } //ios11以上的系统
    else if (version >= 11) {
      $('.write-box .form-control').on('focus', function () {
        var h = $(document).height() - $(window).height()
        $(document).scrollTop(h)
        // $("html,body").animate({
        //     scrollTop: $("html").prop("scrollHeight")
        // }, 300);
        // document.body.scroll.scrollTo(0, $("html").prop("scrollHeight"));
      })
    }
  }
}
```

#### 42.解决不同设备边框宽度不一致

```css
.border {
  border: 1px solid #999;
}
@media screen and (-webkit-min-device-pixel-ratio: 2) {
  .border {
    border: 0.5px solid #999;
  }
}
@media screen and (-webkit-min-device-pixel-ratio: 3) {
  .border {
    border: 0.333333px solid #999;
  }
}
```

#### 43.outline-style 属性

- outline-style:none 默认。定义无轮廓。
- outline-style:dotted 定义点状的轮廓。
- outline-style:dashed 定义虚线轮廓。 - outline-style:solid 定义实线轮廓。
- outline-style:double 定义双线轮廓。双线的宽度等同于
- outline-style:outline-width 的值。
- outline-style:groove 定义 3D 凹槽轮廓。此效果取决于 outline-color 值。
- outline-style:ridge 定义 3D 凸槽轮廓。此效果取决于 outline-color 值。
- outline-style:inset 定义 3D 凹边轮廓。此效果取决于 outline-color 值。
- outline-style:outset 定义 3D 凸边轮廓。此效果取决于 outline-color 值。
- outline-style:inherit 规定应该从父元素继承轮廓样式的设置。

#### 44.rem 高清方案

```js
'use strict'

/**
 * @param {Boolean} [normal = false] - 默认开启页面压缩以使页面高清;
 * @param {Number} [baseFontSize = 100] - 基础fontSize, 默认100px;
 * @param {Number} [fontscale = 1] - 有的业务希望能放大一定比例的字体;
 */
const win = window
export default win.flex = (normal, baseFontSize, fontscale) => {
  const _baseFontSize = baseFontSize || 100
  const _fontscale = fontscale || 1

  const doc = win.document
  const ua = navigator.userAgent
  const matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i)
  const UCversion = ua.match(/U3\/((\d+|\.){5,})/i)
  const isUCHd =
    UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80
  const isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi)
  let dpr = win.devicePixelRatio || 1
  if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
    // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
    dpr = 1
  }
  const scale = normal ? 1 : 1 / dpr

  let metaEl = doc.querySelector('meta[name="viewport"]')
  if (!metaEl) {
    metaEl = doc.createElement('meta')
    metaEl.setAttribute('name', 'viewport')
    doc.head.appendChild(metaEl)
  }
  metaEl.setAttribute(
    'content',
    `width=device-width,user-scalable=no,initial-scale=${scale},maximum-scale=${scale},minimum-scale=${scale}`
  )
  doc.documentElement.style.fontSize = normal
    ? '50px'
    : `${(_baseFontSize / 2) * dpr * _fontscale}px`
}
```

#### 45.rem 高清配置

##### 前提条件：

- 拿到的是一个针对 iphone6 的高清视觉稿 750×1334
- 采用下面的高清方案(js 代码)。

##### 这个方案同时解决了三个问题：

- border: 1px 问题
- 图片高清问题
- 屏幕适配布局问题

```js
var dpr, rem, scale
var docEl = document.documentElement
var fontEl = document.createElement('style')
var metaEl = document.querySelector('meta[name="viewport"]')

dpr = window.devicePixelRatio || 1
rem = (docEl.clientWidth * dpr) / 10
scale = 1 / dpr

// 设置viewport，进行缩放，达到高清效果
metaEl.setAttribute(
  'content',
  'width=' +
    dpr * docEl.clientWidth +
    ',initial-scale=' +
    scale +
    ',maximum-scale=' +
    scale +
    ', minimum-scale=' +
    scale +
    ',user-scalable=no'
)

// 设置data-dpr属性，留作的css hack之用
docEl.setAttribute('data-dpr', dpr)

// 动态写入样式
docEl.firstElementChild.appendChild(fontEl)
fontEl.innerHTML = 'html{font-size:' + rem + 'px!important;}'

// 给js调用的，某一dpr下rem和px之间的转换函数
window.rem2px = function (v) {
  v = parseFloat(v)
  return v * rem
}
window.px2rem = function (v) {
  v = parseFloat(v)
  return v / rem
}

window.dpr = dpr
window.rem = rem
```

#### 46.手机键盘调用

```js
$(document).on('focusin', function () {
  console.log(123) //软键盘弹出的事件处理

  $('.consultation-btn').stop(true).fadeOut(1000)
})

$(document).on('focusout', function () {
  //软键盘收起的事件处理
  $('.consultation-btn').stop(true).fadeIn(1000)
})
```

#### 47.H5 中 JS 禁用安卓手机物理返回键 , 微信浏览器中也支持

```js
XBack = {}
;(function (XBack) {
  XBack.STATE = 'x - back'
  XBack.element

  XBack.onPopState = function (event) {
    event.state === XBack.STATE && XBack.fire()
    XBack.record(XBack.STATE) //初始化事件时，push一下
  }

  XBack.record = function (state) {
    history.pushState(state, null, location.href)
  }

  XBack.fire = function () {
    var event = document.createEvent('Events')
    event.initEvent(XBack.STATE, false, false)
    XBack.element.dispatchEvent(event)
  }

  XBack.listen = function (listener) {
    XBack.element.addEventListener(XBack.STATE, listener, false)
  }

  XBack.init = function () {
    XBack.element = document.createElement('span')
    window.addEventListener('popstate', XBack.onPopState)
    XBack.record(XBack.STATE)
  }
})(XBack) // 引入这段js文件

XBack.init()
XBack.listen(function () {})
```

#### 48.解决 ios 下不兼容 keyup,keydown 等事件

```js
document
  .getElementById('testautofocus')
  .addEventListener('input', function (e) {})
```

#### 49 锁屏时间

```js
//默认时间
    var betweenTime = 0;
    //开始锁屏的时间
    var b = 0;
    //锁屏用的时间
    var num = 0;
    document.addEventListener('webkitvisibilitychange', function () {
    //页面隐藏即手机开始锁屏
    if (document.webkitVisibilityState == 'hidden') {
        //开始记录时间
        b = Date.now();
    } else {
        //手机解锁 回到页面
        var betweenMs = Date.now() - b; //统计的毫秒数
        var betweens = Math.floor(betweenMs / 1000); //转换成秒
        betweenTime = Math.floor(betweens / 60); //转换分钟
        console.log('间隔:' + betweenTime + '分钟');
        num = betweenTime;
    }

```
