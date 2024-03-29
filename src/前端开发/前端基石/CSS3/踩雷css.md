---
title: 踩雷css
tag: CSS3
date: 2020-06-15
category:
  - 前端基石
---

### 1.🤨 标准的 CSS 盒子模型及其和低版本的 IE 盒子模型的区别？

标准（W3C）盒子模型：`width` = 内容宽度`（content） + border + padding + margin`

低版本 IE 盒子模型： `width` = 内容宽度`（content + border + padding）+ margin`

图片展示:

![](https://user-gold-cdn.xitu.io/2020/5/30/172633c783abc1eb?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

![](https://user-gold-cdn.xitu.io/2020/5/30/17263443113eb879?imageslim)

区别： 标准盒子模型盒子的`height`和`width`是`content`（内容）的宽高，而 IE 盒子模型盒子的宽高则包括`content+padding+border`部分。

### 2.几种解决 IE6 存在的 bug 的方法

- 由`float`引起的双边距的问题，使用`display`解决；
- 由`float`引起的 3 像素问题，使用`display: inline -3px`;
- 使用正确的书写顺序`link visited hover active`，解决超链接`hover`点击失效问题；
- 对于`IE` 的`z-index`问题，通过给父元素增加`position: relative`解决；
- 使用`!important`解决`Min-height`最小高度问题；
- 使用`iframe`解决`select`在`IE6`下的覆盖问题；
- 使用`over: hidden`, `zoom: 0.08`, `line-height: 1px`解决定义 1px 左右的容器宽度问题；

🍀**注意**：有关`IE6`支不支持`!important`的问题，对于单个类是支持的。例如：

    .content { color: pink !importent };
    .content { color: orange };
    // 这里IE6及以上，FF，google等都将显示粉红色
    复制代码

但是，当一个样式内部有多个相同属性的时候。例如：

    .content { color: pink !importent; color: orange };
    // IE7及以上，FF, google显示粉红色，而IE6将显示橙色（原因是一个样式内重复设置了属性，后面的就会覆盖掉之前的）
    复制代码

### 3.CSS 选择符有哪些？哪些属性可以继承？

常见的选择符有一下：

`id`选择器（`#content`），类选择器（`.content`）, 标签选择器（`div`, `p`, `span`等）, 相邻选择器（`h1+p`）, 子选择器（`ul>li`）, 后代选择器（`li a`）， 通配符选择器（`*`）, 属性选择器（`a[rel = "external"]`）， 伪类选择器（`a:hover`, `li:nth-child`）

可继承的样式属性： `font-size`, `font-family`, `color`, `ul`, `li`, `dl`, `dd`, `dt`;

不可继承的样式属性： `border`, `padding`, `margin`, `width`, `height`；

### 4.CSS 优先级算法如何计算？

- 考虑到就近原则，同权重情况下样式定义以最近者为准
- 载入的样式按照最后的定位为准

优先级排序：

同权重情况下： 内联样式表（标签内部）> 嵌入样式表（当前文件中）\> 外部样式表（外部文件中）

`!important > # > . > tag`

🍀**注意**： `!important` 比 内联优先级高

### 5.CSS3 新增伪类有那些？

- `:root` 选择文档的根元素，等同于`html`元素

- `:empty` 选择没有子元素的元素

- `:target` 选取当前活动的目标元素

- `:not(selector)` 选择除 `selector` 元素意外的元素

- `:enabled` 选择可用的表单元素

- `:disabled` 选择禁用的表单元素

- `:checked` 选择被选中的表单元素

- `:nth-child(n)` 匹配父元素下指定子元素，在所有子元素中排序第`n`

- `nth-last-child(n)` 匹配父元素下指定子元素，在所有子元素中排序第`n`，从后向前数

- `:nth-child(odd)`

- `:nth-child(even)`

- `:nth-child(3n+1)`

- `:first-child`

- `:last-child`

- `:only-child`

- `:nth-of-type(n)` 匹配父元素下指定子元素，在同类子元素中排序第`n`

- `:nth-last-of-type(n)` 匹配父元素下指定子元素，在同类子元素中排序第`n`，从后向前数

- `:nth-of-type(odd)`

- `:nth-of-type(even)`

- `:nth-of-type(3n+1)`

- `:first-of-type`

- `:last-of-type`

- `:only-of-type`

- `::selection` 选择被用户选取的元素部分（伪元素）

- `:first-line` 选择元素中的第一行（伪元素）

- `:first-letter` 选择元素中的第一个字符（伪元素）

- `:after` 在元素在该元素之后添加内容（伪元素）

- `:before` 在元素在该元素之前添加内容（伪元素）

### 6.如何居中 div？如何居中一个浮动元素？如何让绝对定位的 div 居中？

#### 水平居中

```html
<style>
  /*  方式1： 使用margin： 0 auto居中 */
  /* css: */
  * {margin: 0; padding: 0;}
  .content {
      margin: 0 auto;
  	width: 100px;
  	height: 100px;
      background: pink;
  }

  /* 方式2： 使用 定位 + left 居中 */

  /* css: */
  * {margin: 0; padding: 0;}
  .content {
  	width: 100px;
  	height: 100px;
      background: pink;
      position： relative；
      left： 50%；
      margin-left: -50px;
  }
</style>

<!-- html: -->
<div class="content"></div>
```

#### 垂直居中

```html
<style>
  /* css: */
  * {
    margin: 0;
    padding: 0;
  }
  .content {
    width: 100px;
    height: 100px;
    background: pink;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<!-- html: -->
<div class="content"></div>
```

#### 居中浮动元素

```html
<style>
  /* css: */
  * {
    margin: 0;
    padding: 0;
  }
  .content {
    width: 600px;
    height: 600px;
    border: 1px solid green;
  }
  .left: {
    height: 100px;
    width: 100px;
    background-color: pink;
    /* 水平居中 */
    margin-left: 50%;
    position: relative;
    left: -50px;
  }
</style>

<!-- html: -->
<div class="content">
  <div class="left"></div>
</div>
```

#### 如何让绝对定位的 div 居中

```html
<style>
  /* css: */
  * {
    margin: 0;
    padding: 0;
  }
  .content {
    margin: 0 auto;
    position: absolute;
    width: 1500px;
    background: pink;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
</style>

<!-- html: -->
<div class="content"></div>
```

### 7.display 有哪些值？他们的作用是什么？

值

作用

none

使用后元素将不会显示

grid

定义一个容器属性为网格布局

flex

定义一个弹性布局

block

使用后元素将变为块级元素显示，元素前后带有换行符

inline

display 默认值。使用后原色变为行内元素显示，前后无换行符

list-item

使用后元素作为列表显示

run-in

使用后元素会根据上下文作为块级元素或行内元素显示

table

使用后将作为块级表格来显示（类似`<table>`），前后带有换行符

inline-table

使用后元素将作为内联表格显示（类似`<table>`），前后没有换行符

table-row-group

元素将作为一个或多个行的分组来显示（类似`<tbody>`）

table-hewder-group

元素将作为一个或多个行的分组来表示（类似`<thead>`）

table-footer-group

元素将作为一个或多个行分组显示（类似`<tfoot>`）

table-row

元素将作为一个表格行显示（类似`<tr>`）

table-column-group

元素将作为一个或多个列的分组显示（类似`<colgroup>`）

table-column

元素将作为一个单元格列显示（类似`<col>`）

table-cell

元素将作为一个表格单元格显示（类似`<td>和<th>`）

table-caption

元素将作为一个表格标题显示（类似`<caption>`）

inherit

规定应该从父元素集成 display 属性的值

其中，常用的有：`block`， `inline-block`， `none`， `table`， `line`。

### 8.position 的值 relative 和 absolute 定位原点？

首先，使用`position`的时候，应该记住一个规律是‘**子绝父相**’。

`relative`（相对定位）： 生成相对定位的元素，定位原点是元素本身所在的位置；

`absolute`（绝对定位）：生成绝对定位的元素，定位原点是离自己这一级元素最近的一级`position`设置为`absolute`或者`relative`的父元素的左上角为原点的。

`fixed` （老 IE 不支持）：生成绝对定位的元素，相对于浏览器窗口进行定位。

`static`：默认值。没有定位，元素出现在正常的流中（忽略 `top`, `bottom`, `left`, `right`、`z-index` 声明）。

`inherit`：规定从父元素继承 `position` 属性的值。

**更新一个属性**

`sticky`: (新增元素，目前兼容性可能不是那么的好)，可以设置 position:sticky 同时给一个 (top,bottom,right,left) 之一即可。

**注意**：

- 使用`sticky`时，必须指定 top、bottom、left、right4 个值之一，不然只会处于相对定位；
- `sticky`只在其父元素内其效果，且保证父元素的高度要高于`sticky`的高度；
- 父元素不能`overflow:hidden`或者`overflow:auto`等属性。

### 9.CSS3 有哪些新特性？

关于`CSS`新增的特性，有以下：

- 选择器;
- 圆角`（border-raduis）`;
- 多列布局`（multi-column layout）`;
- 阴影`（shadow）`和反射`（reflect）`;
- 文字特效`（text-shadow）`;
- 文字渲染`（text-decoration`）;
- 线性渐变`（gradient）`;
- 旋转`（rotate`）/缩放`（scale）`/倾斜`（skew）`/移动`（translate）`;
- 媒体查询`（@media）`;
- `RGBA`和透明度 ;
- `@font-face`属性;
- 多背景图 ;
- 盒子大小;
- 语音;

大致想到这么多，有遗漏的可以留言指出，小编看到会加上。

### 10.用纯 CSS 创建一个三角形的原理是什么？

#### 方法一：隐藏上，左，右三条边，颜色设定为（transparent）

```html
<style>
  /* css: */
  * {
    margin: 0;
    padding: 0;
  }
  .content {
    width: 0;
    height: 0;
    margin: 0 auto;
    border-width: 20px;
    border-style: solid;
    /*  对应上右下左，此处为 下 粉色 */
    border-color: transparent transparent pink transparent;
  }
</style>

<!-- html: -->
<div class="content"></div>
```

#### 方法二： 采用的是均分原理

实现步骤： 1.首先保证元素是块级元素；2.设置元素的边框；3.不需要显示的边框使用透明色。

```html
<style>
  /* css: */
  * {
    margin: 0;
    padding: 0;
  }
  .content {
    width: 0;
    height: 0;
    margin: 0 auto;
    border: 50px solid transparent;
    border-top: 50px solid pink;
  }
</style>

<!-- html: -->
<div class="content"></div>
```

### 11.🤨 什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的 IE？

响应式网站设计`（Responsive Web design`）是一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本。

关于原理： 基本原理是通过媒体查询`（@media）`查询检测不同的设备屏幕尺寸做处理。

关于兼容： 页面头部必须有 mate 声明的`viewport`。

    <meta name="’viewport’" content="”width=device-width," initial-scale="1." maximum-scale="1,user-scalable=no”"/>
    复制代码

### 12.为什么要初始化 CSS 样式？

因为浏览器的兼容问题，不同浏览器对标签的默认值是不同的，如果没有对浏览器的`CSS`初始化，会造成相同页面在不同浏览器的显示存在差异。

### 13.浮动原理以及为什么会出现浮动和什么时候需要清除浮动？清除浮动的方式？

非 IE 浏览器下，容器不设定高度且子元素浮动时，容器高度不能被内容撑开。此时，内容会溢出到容器外面而影响布局。此类现象被称为浮动（溢出）。

原理：

- 浮动元素脱离文档流，不占据空间（引起“高度塌陷”现象）；
- 浮动元素碰到包含它的边框或其他浮动元素的边框停留。

浮动元素碰到包含他的边框或者浮动元素的边框停留。由于浮动元素不在文档流之中，文档流的块级框会表现的就像浮动框不存在一样。浮动元素会漂浮在文档流的块级框之上。

浮动会带来的问题：

- 父级元素的高度将会无法被撑开，会影响与父级元素同级的元素
- 与浮动元素同级的非浮动元素（内联元素）会跟随其后
- 若浮动的元素不是第一个元素，则该元素之前的元素也要浮动，否则会影响页面的显示结构

清除方式：

- 父级盒子定义高度`（height）`;
- 最后一个浮动元素后面加一个`div`空标签，并且添加样式`clear: both`;
- 包含浮动元素的父级标签添加样式`overflow`为`hidden/both`;
- 父级`div`定义`zoom`;

### 14.CSS 优化、提高性能的方法有哪些？

- 多个`css`可合并，并尽量减少`http`请求
- 属性值为 0 时，不加单位
- 将`css`文件放在页面最上面
- 避免后代选择符，过度约束和链式选择符
- 使用紧凑的语法
- 避免不必要的重复
- 使用语义化命名，便于维护
- 尽量少的使用`!impotrant`，可以选择其他选择器
- 精简规则，尽可能合并不同类的重复规则
- 遵守盒子模型规则

### 15.CSS 预处理器/后处理器是什么？为什么要使用它们？

预处理器，如：`less`，`sass`，`stylus`,用来预编译`sass`或者`less`，增加了`css`代码的复用性，还有层级，`mixin`， 变量，循环， 函数等，对编写以及开发 UI 组件都极为方便。

后处理器， 如： `postCss`,通常被视为在完成的样式表中根据`css`规范处理`css`，让其更加有效。目前最常做的是给`css`属性添加浏览器私有前缀，实现跨浏览器兼容性的问题。

`css`预处理器为`css`增加一些编程特性，无需考虑浏览器的兼容问题，我们可以在`CSS`中使用变量，简单的逻辑程序，函数等在编程语言中的一些基本的性能，可以让我们的`css`更加的简洁，增加适应性以及可读性，可维护性等。

其它`css`预处理器语言：`Sass（Scss`）, `Less`, `Stylus`, `Turbine`, `Swithch css`, `CSS Cacheer`, `DT Css`。

使用原因：

- 结构清晰， 便于扩展
- 可以很方便的屏蔽浏览器私有语法的差异
- 可以轻松实现多重继承
- 完美的兼容了`CSS`代码，可以应用到老项目中

### 16.::before 和 :after 中双冒号和单冒号有什么区别？解释一下这 2 个伪元素的作用

（1）、冒号(`:`)用于`CSS3`伪类，双冒号(`::`)用于`CSS3`伪元素。

（2）、`::before`就是以一个子元素的存在，定义在元素主体内容之前的一个伪元素。并不存在于`dom`之中，只存在在页面之中。

🍀**注意：** `:before`和 `:after` 这两个伪元素，是在`CSS2.1`里新出现的。起初，伪元素的前缀使用的是单冒号语法，但随着`Web`的进化，在`CSS3`的规范里，伪元素的语法被修改成使用双冒号，成为`::before ::after`。

### 17.让页面里的字体变清晰，变细用 CSS 怎么做？

`-webkit-font-smoothing`在 `window`系统下没有起作用，但是在 `IOS`设备上起作用 `-webkit-font-smoothing：antialiased`是最佳的，灰度平滑。

### 18\. 如果需要手动写动画，你认为最小时间间隔是多久，为什么？

多数显示器默认频率是`60Hz`，即 1 秒刷新 60 次，所以理论上最小间隔为`1/60＊1000ms ＝ 16.7ms`。

### 19\. rgba() 和 opacity 的透明效果有什么不同？

`opacity` 作用于元素以及元素内的所有内容（包括文字）的透明度；

`rgba()`只作用于元素自身的颜色或其背景色，子元素不会继承透明效果；

### 20.css 属性 content 有什么作用？

`content` 属性专门应用在 `before/after` 伪元素上，用于插入额外内容或样式。

### 21.🧐 请解释一下 CSS3 的 Flexbox（弹性盒布局模型）以及适用场景？

> 概念： `Flex`是`Flexible Box`的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。采用`Flex`布局的元素，称为`Flex`容器`（flex container）`，简称”容器”。它的所有子元素自动成为容器成员，称为`Flex`项目`（flex item）`，简称”项目”。

适用场景： 任何一个容器都可以指定为`Flex`布局。`Flexbox` 用于不同尺寸屏幕中创建可自动扩展和收缩布局。

### 22.display:inline-block 什么时候会显示间隙？

- 有空格时候会有间隙， 可以删除空格解决；
- `margin`正值的时候， 可以让`margin`使用负值解决；
- 使用`font-size`时候，可通过设置`font-size:0`、`letter-spacing`、`word-spacing`解决；

### 23\. png、jpg、 jpeg、 bmp、gif 这些图片格式解释一下，分别什么时候用。有没有了解过 webp？

（1）、`png`-便携式网络图片`（Portable Network Graphics）`,是一种无损数据压缩位图文件格式。优点是：压缩比高，色彩好。 大多数地方都可以用。

（2）、`jpg`是一种针对相片使用的一种失真压缩方法，是一种破坏性的压缩，在色调及颜色平滑变化做的不错。在`www`上，被用来储存和传输照片的格式。

（3）、`gif`是一种位图文件格式，以 8 位色重现真色彩的图像。可以实现动画效果。

（4）、`bmp`的优点： 高质量图片；缺点： 体积太大； 适用场景： `windows`桌面壁纸；

（4）、`webp`格式是谷歌在 2010 年推出的图片格式，压缩率只有`jpg`的 2/3，大小比`png`小了 45%。缺点是压缩的时间更久了，兼容性不好，目前谷歌和`opera`支持。

### 24\. 在 CSS 样式中常使用 px、em 在表现上有什么区别？

`px`相对于显示器屏幕分辨率，无法用浏览器字体放大功能。

`em`值不是固定的，会继承父级的字体大小： `em = 像素值 / 父级font-size`。

### 25.一个高度自适应的 div，里面有两个 div，一个高度 100px，希望另一个填满剩下的高度问题怎么解决？

方案一： `.content { height: calc(100%-100px); }`

方案二：`.container { position:relative; } .content { position: absolute; top: 100px; bottom: 0; }`

方案三：`.container { display:flex; flex-direction:column; } .content { flex:1; }`

### 26.overflow: scroll 时不能平滑滚动的问题怎么处理？

监听滚轮事件，然后滚动到一定距离时用 `jquery` 的 `animate` 实现平滑效果。

### 27.transform、animation 和 animation-duration 的区别？

- `Transform`: 它和`width`、`left`一样，定义了元素很多静态样式实现变形、旋转、缩放、移位及透视等功能，通过一系列功能的组合我们可以实现很炫酷的静态效果（非动画)。
- `Animation`: 作用于元素本身而不是样式属性,属于关键帧动画的范畴，它本身被用来替代一些纯粹表现的`javascript`代码而实现动画,可以通过`keyframe`显式控制当前帧的属性值。
- `animation-duration`：规定完成动画所花费的时间，以秒或毫秒计。

### 28.对 line-height 是如何理解的？

`line-height`指的是一行字的高度，包含了字间距，实际上是下一行基线到上一行基线的距离。如果一个标签没有定义`height`属性，那么其最终表现的高度是由`line-height`决定的。一个容器没有设置高度，那么撑开容器的高度的是`line-height`,而不是容器内部的文字内容。把`line-height`值设置为`height`一样大小的值可以实现单行文字的垂直居中。`line-height`和`height`都能撑开一个高度，`height`会触发`haslayout`，而`line-height`不会。

### 29.抽离样式模块怎么写？述其思路。

可将`css`拆分成两部分： 公共`CSS`和业务`CSS`。

网站的配色，字体，交互提取出为公共的`CSS`。这部分的`CSS`命名不应涉及具体的业务。对于业务`CSS`，需要有统一的命名，使用公共的前缀。

### 30.在网页中的应该使用奇数还是偶数的字体？

在网页中的应该使用“偶数”字体：

偶数字号相对更容易和 `web` 设计的其他部分构成比例关系，使用奇数号字体时文本段落无法对齐，宋体的中文网页排布中使用最多的就是 `12` 和 `14`。

### 31\. 🤥 什么是外边距重叠？ 重叠的结果是什么？

首先，外边距重叠就是 `margin-collapse`。相邻的两个盒子（可能是兄弟关系也可能是祖先关系）的外边距可以结合成一个单独的外边距。 这种合并外边距的方式被称为折叠，结合而成的外边距称为折叠外边距。

折叠结果遵循下列计算原则：

- 两个相邻的外面边距是正数时，折叠结果就是他们之中的较大值；
- 两个相邻的外边距都是负数时，折叠结果是两者绝对值的较大值；
- 两个外边距一正一负时，折叠结果是两者的相加的和；

### 32.display: none; 与 visibility: hidden; 有什么区别？

联系： 这两个属性的值都可以让元素变得不可见；

区别：

- **从占据空间角度看**：`display: none;`会让元素完全从渲染树中消失，渲染的时候不占据任何空间；`visibility: hidden;`不会让元素从渲染树消失，渲染师元素继续占据空间，只是内容不可见；
- **从继承方面角度看**：`display: none;`是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示；`visibility:hidden;`是继承属性，子孙节点消失由于继承了`hidden`，通过设置`visibility: visible;`可以让子孙节点显式；
- **从重绘和重排角度看**：修改常规流中元素的`display`通常会造成文档重排。修改`visibility`属性只会造成本元素的重绘 读屏器不会读取`display: none;`元素内容；会读取`visibility: hidden`元素内容；

### 33.css hack 原理及常用 hack 有哪些？

原理： 利用不同浏览器对`CSS`的支持和解析结果不一样编写针对特定浏览器的样式。

常见的`hack`有： **属性 hack**、**选择器 hack**、**IE 条件注释**。

### 34.link 与 @import 的区别？

- `link` 是`HTML`方式， `@import` 是`CSS`方式；
- `link`最大限度支持并行下载，`@import` 过多嵌套导致串行下载，出现`FOUC`；
- `link` 可以通过 `rel="alternate stylesheet"`指定候选样式；
- 浏览器对 `link` 支持早于`@import`，可以使用 `@import`对老浏览器隐藏样式；
- `@import`必须在样式规则之前，可以在 css 文件中引用其他文件；

总的来说： `link`优于`@import`。

### 35.什么是 FOUC(Flash of Unstyled Content)？ 如何来避免 FOUC？

当使用`@import`导入`CSS`时，会导致某些页面在`IE`出现奇怪的现象： 没有样式的页面内容显示瞬间闪烁，这种现象被称为“文档样式暂时失效”，简称`FOUC`。

产生原因： 当样式表晚于结构性 html 加载时，加载到此样式表时，页面将会停止之前的渲染。等待此样式表被下载和解析后，再重新渲染页面，期间导致短暂的花屏现象。

解决办法： 只要在`<head>`之间加入一个`<link>`或者` <script>``</script> `元素即可。

### 36.display,float,position 有什么关系？

- 如果 `display` 为`none`，那么`position`和`float`都不起作用，元素不显示；
- 如果`position`值为`absolute`或者`fixed`，元素绝对定位，`float`的计算值为`none`，`display`根据下面的表格进行调整；
- 如果`float`不是`none`，框是浮动的，`display`根据下表进行调整；
- 其他情况下`display`的值为指定值 总结起来：绝对定位、浮动、根元素都需要调整 `display`；

### 37.外边距折叠(collapsing margins)

毗邻的两个或多个`margin`会合并成一个`margin`，叫做外边距折叠。规则如下：

- 两个或多个毗邻的普通流中的块元素垂直方向上的`margin`会折叠；
- 浮动元素或`linline-block`元素或绝对定位元素的`margin`不会和垂直方向上的其他元素的`margin`折叠；
- 创建了会计格式化上下文的元素，不会和它的子元素发生`margin`折叠；
- 元素自身的`margin-bottom`和`margin-top`相邻时也会折叠；

### 38.有哪几种隐藏元素的方法？

- `visibility: hidden;` 这个属性只是简单的隐藏某个元素，但是元素占用的空间任然存在；
- ` opacity: 0;``CSS3 `属性，设置 0 可以使一个元素完全透明；
- `position: absolute;` 设置一个很大的 left 负值定位，使元素定位在可见区域之外；
- `display: none;` 元素会变得不可见，并且不会再占用文档的空间；
- `transform: scale(0);` 将一个元素设置为缩放无限小，元素将不可见，元素原来所在的位置将被保留；
- `<div hidden="hidden">` `HTML5`属性,效果和`display:none;`相同，但这个属性用于记录一个元素的状态；
- `height: 0;` 将元素高度设为 0 ，并消除边框；
- `filter: blur(0);` `CSS3`属性，括号内的数值越大，图像高斯模糊的程度越大，到达一定程度可使图像消失`（此处感谢小伙伴支持）`；

### 39.li 与 li 之间有看不见的空白间隔是什么原因引起的？有什么解决办法？

`li`排列受到中间空白(回车/空格)等的影响，因为空白也属于字符，会被应用样式占据空间，产生间隔。解决办法：

- 在`ul`中用`font-size：0`（谷歌不支持）；可以使用`letter-space：-3px;`
- 设置`float：left；`

### 40.浏览器是怎样解析 CSS 选择器的？

浏览器解析`CSS`是从上到下，从右到左解析的，这样会提高查找选择器所对应的元素的效率（至于原因，有兴趣的童鞋可以自行去了解）。

### 41.🤭 全屏滚动的原理是什么？用到了 CSS 的哪些属性？

全屏滚动有点类似于轮播，整体的元素一直排列下去，假设有`5`个需要展示的全屏页面，那么高度是`500%`，只是展示`100%`。也可以理解为超出隐藏部分，滚动时显示。

可能用到的`CSS`属： `overflow:hidden; transform:translate(100%, 100%); display:none;`

❤️**拓展** ： 也可以利用全屏视觉滚动差，使用`background-attachment: fixed;`来实现全屏效果。（这里是细心的小伙伴提出的另一个 idea🤨）

### 42.对浏览器内核的理解？

浏览器内核主要分为两个部分： 渲染引擎和 js 引擎；

- 渲染引擎： 负责取得页面的内容（`html`，`xml`， 图像等）、整理讯息（加入`css`等）、以及计算网页的显示方式，然后对输出至显示器或者打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不同。所有网页浏览器、电子邮件客户以及其他所需要编辑、显示网络的应用程序都需要内核。
- `JS`引擎： 解析和执行`Javascript`来实现网页的动态效果。

最开始渲染引擎和`js`引擎没有明确的区分，后来`js`引擎越来越独立，内核就倾向于只渲染引擎。

### 43.对 WEB 标准以及 W3C 的理解与认识

对于结构的要求：（规范的标签可以提高搜索引擎对页面的抓取效率，对`SEO`很有帮助）

- 标签要闭合
- 标签字母小写
- 标签不允许随意嵌套

对于`CSS`和`JS`来说：

- 尽量使用外链`CSS`样式表和`JS`脚本。同时结构，表现和行为分为三块，符合规范。此外，还得提高页面渲染速度，提高用户体验。
- 尽量少用行内样式，保证结构和表现分离。标签的`id`和`class`等的属性命名要做到见文知意，标签越少，加载越快，用户体验就会越高。同时代码方面也会更易于维护，便于改版。
- 不需要变动内容，便可一同打印版本而不需要复制内容，提高网站易用性。

### 44.制作一个访问量很大的网站，如何管理所有的 css 文件，js 和图片？

从人手，分工和同步方面回答：

- 前期团队必须确认好全局样式，编码模式；
- 代码风格，编写习惯保持一致；
- 标注样式编写人，各模块都要及时标注（标注关键样式调用的地方）；
- 对自己负责的页面进行标注；
- `CSS`和`JS`分文件夹存并行存放，命名都要统一；
- `JS`分文件夹存放，明明以该`JS`功能为准的英文翻译；
- 图片采用整合的`.png`格式存放，金狼整合在一起，方便将来管理；

### 45.视差滚动效果以及如何实现？

视差滚动`（Parallax Scrolling）`指网页滚动过程中，多层次的元素进行不同程度的移动，视觉上形成立体运动效果的网页展示技术（3D 效果）。

实现方式：

- `CSS3`实现： 优点是开发时间相对较短，性能和开发效率比较好。缺点是不能兼容到低版本的浏览器；
- `JQuery`实现：（通过控制不同层滚动速度，计算每一层的时间）优点是能兼容到各个版本，效果可控性好，缺点是开发起来对制作者的要求较高；
- 插件实现方式： 例如使用`parallax-scrolling`,兼容性十分好；

### 46.对 BFC 规范(块级格式化上下文：block formatting context)的理解

`BFC`规定了内部的`Block Box`如何布局。一个页面是由很多个`Box`组成的，元素的类型和`display`属性，决定了这个`Box`的类型。不同类型的`box`，会参与不同的`Formatting Context`（决定如何渲染文档的容器），因此`Box`内的元素会以不用的方式渲染，也是就是说`BFC`内部的元素和外部的元素不会相互影响。

定位方案：

- 内部的`box`会在垂直方向上一个接一个的放置；
- `box`垂直方向的距离由`margin`决定，属于同一个`BFC`的两个相邻`Box`的`margin`会发生重叠；
- 每个元素`margin box`的左边，与包含块`border box`的左边相接触；
- `BFC`的区域不会与 float box 重叠；
- `BFC`是页面上的一个隔离的独立容器，容器里面的元素不会影响到外面的元素；
- 计算`BFC`的高度时，浮动元素也会参与计算。

满足下列条件之一就可以出发 BFC：

- 根元素变化，即`html`；
- `float`的值不为`none`（默认）；
- `overflow`的值不为`visible`（默认）；
- `display`的值为`inline-block`, `tabke-cell`，`table-caption`；
- `position`的值为`absolute`或`fixed`;

### 47.元素竖向的百分比设定是相对于容器的高度吗？

一般来说，子元素的百分比单位都是以父元素为依据。但是`margin`和`padding`例外。元素的`height`是相对于容器的高度，但是元素的`margin`和`padding`是相对于容器的宽度。

### 48.一个满屏'品字'布局如何设计?

方法有挺多种，但是比较简单的方式就是： 上面的`div`宽度设置为 100%，底下两个`div`设置成`50%`，并使用`float`或者`inline`使其保持在同一行即可（具体的样式可以自己微调）。如下：

```html
<style>
  /* css: */
  .content {
    width: 50%;
    height: 150px;
    margin: 0 auto;
  }
  .top {
    width: 40%;
    height: 50px;
    background-color: pink;
    margin-bottom: 50px;
    margin-left: 30%;
  }
  .left {
    width: 45%;
    height: 50px;
    background-color: pink;
    float: left;
  }
  .right {
    width: 45%;
    height: 50px;
    background-color: pink;
    float: right;
  }
</style>
<!-- html: -->
<div class="content">
  <div class="top"></div>
  <div class="left"></div>
  <div class="right"></div>
</div>
```

### 49.经常遇到的浏览器的兼容性有哪些？原因，解决方法是什么，常用 hack 的技巧 ？

（1）、问题：`png24`位的图片在`ie`浏览器上出现背景。解决： 做成`png8`；

（2）、问题：浏览器默认的`margin`和`padding`不同。 解决： 添加一个全局的`*{ margin： 0; padding： 0;}`；

（3）、问题：`IE`下,可以使用获取常规属性的方法来获取自定义属性,也可以使用`getAttribute()`获取自定义属性，而`Firefox`下,只能使用`getAttribute()`获取自定义属性。 解决： 统一通过`getAttribute()`获取自定义属性；

（4）、问题： `IE`下,`event`对象有`x`,`y`属性,但是没有`pageX`,`pageY`属性，而`Firefox`下,`event`对象有`pageX`,`pageY`属性,但是没有`x`,`y`属性。 解决： 使用`mX(mX = event.x ? event.x : event.pageX;)`来代替`IE`下的`event.x`或者`Firefox`下的`event.pageX`。

### 50.box-sizing 常用的属性有哪些？分别有什么作用？

- `box-sizing: content-box;` // 默认的标准`(W3C)`盒模型元素效果；
- `box-sizing: border-box;` // 触发怪异`(IE)`盒模型元素的效果；
- `box-sizing: inherit;` // 继承父元素 `box-sizing` 属性的值；

### 51\. 🤤 在网页中的应该使用奇数还是偶数的字体？

一般情况下，在网页中，应该使用 **偶数** 字体。原因：

- 偶数字号相对更容易和`web`设计的其他部分构成比例关系；
- 使用基数字号时文本段落无法对齐；
- 宋体的中文网页排布中使用最多的是 12 号和 14 号。

### 52\. margin 和 padding 分别适合什么场景使用？

（1）、需要在`border`外侧添加空白且空白处不需要背景（色），或上下相连的两个盒子之间的空白需要相互抵消时，可以使用`margin`；

（2）、需要在`border`内侧添加空白且空白处需要背景（色），或上下相连的两个盒子之间的空白，希望等于两者之和时，可以使用`padding`。

### 53\. 伪元素和伪类的区别和作用？

首先，伪类的效果可以通过添加实际的类来实现，而伪元素的效果可以通过添加实际的元素来实现。所以它们的**本质区别就是是否抽象创造了新元素**。

伪元素/伪对象： 不存在在 DOM 文档中，是虚拟的元素，是创建新元素。代表某个元素的子元素，这个子元素虽然在逻辑上存在，但却并不实际存在于文档树中。

```css
p::first-child {
  color: red;
}
```

伪类：存在`DOM`文档中，逻辑上存在但在文档树中却无须标识的“幽灵”分类。

```css
a:hover {
  color: #ff00ff;
}
p:first-child {
  color: red;
}
```

🍀**注意**：

- 伪类只能使用“：”；
- 而伪元素既可以使用“:”，也可以使用“::”；
- 因为伪类是类似于添加类所以可以是多个，而伪元素在一个选择器中只能出现一次，并且只能出现在末尾。

### 54\. ::before 和 :after 中双冒号和单冒号有什么区别？

- 在 `CSS` 中伪类一直用 : 表示，如 `:hover`, `:active` 等；
- 伪元素在`CSS1`中已存在，当时语法是用 : 表示，如`:before` 和`:after`；
- 后来在`CSS3`中修订，伪元素用 `::`表示，如 `::before` 和 `::after`，以此区分伪元素和伪类；
- 由于低版本`IE`对双冒号不兼容，开发者为了兼容性各浏览器，继续使使用 `:after` 这种老语法表示伪元素；

综上所述：`::before` 是`CSS3`中写伪元素的新语法； `:after`是 `CSS1` 中存在的、兼容`IE`的老语法。

### 55\. 怎么让 Chrome 支持小于 12px 的文字？

```css
.shrink {
  -webkit-transform: scale(0.8);
  -o-transform: scale(1);
  display: inilne-block;
}
```

### 56\. 将多个元素设置为同一行?清除浮动有几种方式?

将多个元素设置为同一行的方法： 使用`float`或`inline-block`；

清除浮动的方式：

- 添加新的元素，应用`clear： both`；
- 父级`div`定义`overflow：hidden`;
- 利用`：after`和`：before`来在元素内部插入两个元素块，从而达到清除浮动的效果。

```css
.clear {
  zoom: 1;
}
.clear:after {
  content: ' ';
  clear: both;
  display: block;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}
```

### 57\. css hack 概念以及简述几个 css hack?

> **概念**： `CSS hack`是通过在`CSS`样式中加入一些特殊的符号，让不同的浏览器识别不同的符号（什么样的浏览器识别什么样的符号是有标准的，`CSS hack`就是让你记住这个标准），以达到应用不同的`CSS`样式的目的。

（1）、图片间隙

在`div`中插入图片，图片会将`div`下方撑大`3px`：

- `hack1`： 将`<div>`与`<img>`写在同一行；
- `hack2`： 给`<img>`添加`display：block`；

`dt` `li` 中的图片间隙：

- `hack1:` 给`<img>`添加`display：block`；

（2）、默认高度，`IE6`以下版本中，部分块元素，拥有默认高度（低于 18px）：

- `hack1`： 给元素添加： `font-size： 0`；
- `hack2`： 声明： `overflow： hidden`；

表单行高不一致：

- `hack1`： 给表单添加声明： `float： left; height: ; border: 0`;

鼠标指针：

- `hack`： 若统一某一元素鼠标指针为手型：`cursor： pointer;`,当 li 内的 a 转化为块元素时，给`a`设置`float`，`IE`里面会出现阶梯状；
- `hack1`： 给`a`添加`display： inline-block`;
- `hack2`： 给`li`添加`float: left`;

### 58\. css2.0 和 css3.0 对比有什么不同？

`CSS3`加强了`CSS2`的功能，增加了新的属性和新的标签，并且删除了一些冗余的标签，在布局方面减少了代码量。以前比较复杂的布局，现在使用一个属性就能解决（例如`columns`等）。在展示型效果方面还加入了更多的效果（如动画，阴影，圆角等），在盒子模型和列表模块都有了改进。但是`CSS3`就兼容性而言，还是有些不足之处是，只能支持一些高版本的浏览器。

### 59\. 块级元素、行内元素和空元素定义？

- **行内元素**：和有他元素都在一行上，高度、行高及外边距和内边距都不可改变，文字图片的宽度不可改变，只能容纳文本或者其他行内元素；
- **块级元素**：总是在新行上开始，高度、行高及外边距和内边距都可控制，可以容纳内敛元素和其他元素；
- **空元素**：在`HTML`元素中，没有内容的 `HTML` 元素被称为空元素。空元素是在开始标签中关闭的。`<br>` 就是没有关闭标签的空元素。

### 60\. 如何解决特定浏览器的样式问题？

建议方案： 主张向前兼容，不考虑向后兼容。根据产品的用户群中各大浏览器，来考虑需要兼容的浏览器。

可以把浏览器分为两类： 一类是历史遗留浏览器，一类是现代浏览器。根据这个分类开发两个版本的网站，然后自己来定义哪些浏览器是历史遗留版本。

在用户使用历史遗留版本的时候，通过通告栏告知用户使用现代浏览器，获取更多的功能，拥有更好的用户体验等（升级）。当用户的浏览器不能兼容时，提示用户只是使用什么版本的浏览器才能使用网站（下载可以兼容的浏览器）。

🍀**注意**：项目开始前就需要确认兼容支持的最低版本是多少，以此设计一个对应的兼容方案。

---

### 61\. 🥴 浏览器如何判断元素是否匹配某个 CSS 选择器？

浏览器先产生一个集合，这个集合往往由最后一个部分的索引产生（如果没有索引就是所有元素的集合）。然后向上匹配，如果不符合上一个部分，就把元素从集合中删除，直到这个选择器都匹配完，还在集合中的元素就匹配这个选择器了。

### 62\. 描述 css reset 的作用和用途？

`Reset`重置浏览器的`CSS`默认属性，浏览器的品种不同，样式不同时，将他们重置，让他们统一。

### 63\. css sprites 是什么？如何使用？

`css`精灵图，把一堆小的图片整合到一张大的图片（png）上，利用`CSS`的`“background-image”`，` “background- repeat”``，“background-position” `的组合进行背景定位`background-position`可以用数字能精确的定位出背景图片的位置，减轻服务器对图片的请求数量。

### 64\. css sprites 的优缺点？

**优点：**

- 利用`CSS Sprites`能很好地减少网页的 http 请求，从而大大提高了页面的性能，这也是`CSS Sprites`最大的优点；
- `CSS Sprites`能减少图片的字节，曾经多次比较过，把 3 张图片合并成 1 张图片的字节总是小于这 3 张图片的字节总和。

**缺点：**

- 在图片合并时，要把多张图片有序的、合理的合并成一张图片，还要留好足够的空间，防止板块内出现不必要的背景。在宽屏及高分辨率下的自适应页面，如果背景不够宽，很容易出现背景断裂；
- `CSSSprites`在开发的时候相对来说有点麻烦，需要借助`photoshop`或其他工具来对每个背景单元测量其准确的位置。
- 维护方面：`CSS Sprites`在维护的时候比较麻烦，页面背景有少许改动时，就要改这张合并的图片，无需改的地方尽量不要动，这样避免改动更多的`CSS`，如果在原来的地方放不下，又只能（最好）往下加图片，这样图片的字节就增加了，还要改动`CSS`。

**拓展：** 目前网站开发所用的精灵图（如字体库）一般都是直接用云端，而不是采用这种本地的了，如阿里图标库等。

### 65\. 绝对定位和浮动的区别和应用？

**绝对定位**： 绝对定位脱离标准文档流，它的参考点是文档的左上角或者是右上角。如果有任何父元素有定位属性，此时就可以参考“**子绝父相**”定律来设置自己的定位参考元素。在网页制作过程中很灵活。制作覆盖效果的时候，会大量使用绝对定位。

**浮动**： 浮动脱离标准文档流，通常用于制作并排显示的元素，通常用于大的布局，或者无序列表比如图片的并排。可以使用`clear:both`属性让标准流中的其他元素在此之后依次排列。

### 66\. 当 float 和 margin 同时使用时，如何解决 IE6 的双倍边距？

当浮动的方向和`margin`是同方向的时候，此时 IE6 会在这个方向的第一个元素身上产生双倍`margin`。

解决办法：

（1）、改变`margin`的方向，`float:left; margin-right:20px;` 浮动向左，`margin`向右； （2）、给第一个元素单独写一个类叫做`.content`, 此时`.content{_margin-left:一半的margin;}`； （3）、用`display:inline;`不用浮动了（哈哈哈哈）。

### 67\. 简述什么是内容与表现分离？

首先对于`html`，`css`以及`javascript`，可以这样理解：

把网站理解成一个人，`html`就是构成人体的‘骨架’，`css`就是人体的‘装饰’，比如衣服，饰品等；而`javascript`就相当于人做出的‘动作’，这样就通俗易懂了。

对于内容和表现分离，小编的理解是：尽量不要再`html`中插入行内样式，尽量将 css 抽成一个独立的模块，实现`html`‘骨架’和样式的分离，利于搜索引擎的同时，也便于后期维护。

### 68\. CSS 怎样判断不同分辨率显示不同宽度布局，从而实现自适应宽度？

- 使用百分比布局，用百分比来写宽度、`marign`、`padding`；
- 使用`rem`做单位，适当的写` js``让html `根元素的字号随着浏览器宽度的变化而等比例变化；
- 使用媒体查询让不同宽度的浏览器使用不同的样式表。

### 69.rem 为什么可以缩放，以什么为基准？其优缺点有哪些？

` rem``以html `的字号为基准，比如`2rem`，而`html`的字号时`16px`，此时`rem`就是`32px`。可以写一段`js`让`html`根元素的字号随着浏览器宽度的变化而等比例变化，此时造成页面等比例缩放的现象。

**优点**：

相对于`em`的好处来说，不会发生逐渐增大或者减小字体尺寸的情况，因为始终集成根元素的字体大小；`rem`单位不仅仅是可应用于字体大小，还可以用于设定高度等其它大小，使页面可以适配不同屏幕尺寸。

🍀**注意**： `rem` 一般只用于移动端。

### 70\. 5 条常见的 Firefox 和 IE 的脚本兼容的问题。

- **绑定监听**： `IE`是`attatchEvent()` 、 `firefox`是`addEventListener()`;
- **计算样式**：`IE`是`currentStyle`、 `firefox`是`getComputedSyle`;
- **滚动事件**：`IE`是`MouseWheel`、 `firefox`是`onmousewheel`；
- **表单元素**：`IE`是 `document.forms(”formname”)` ， `firefox`是`document.forms["formname"]`；
- **事件对象**： `IE`是`window.event`属性， `firefox`必须给事件处理函数注入实参`event`；

---

### 71\. 🥳css 的优先级如何计算？

巩固一下：

分类

优先级

元素选择符

1

class 选择器

10

id 选择器

100

元素标签

1000

（1）、`!important`声明的样式优先级最高，若有冲突会再进行计算；

（2）、优先级相同时，以最后出现的样式为准；

（3）、继承得到的样式的优先级是最低的。

### 72\. 回顾 position 的值及其作用？

- `static`（默认）：按照正常文档流进行排列；
- `relative`（相对定位）： 不脱离文档流，参考自身静态位置通过`top`, `bottom`, `left`, `right`定位；
- `absolute`（绝对定位）： 参考距离最近一个不为`static`的父级元素通过`top`, `bottom`, `left`, `right`定位；
- `fixed`（固定定位）： 所固定的参照对象是可视窗口。

### 73.有哪几种高等布局？

- 假等高列：使用背景图片，在列的父元素上使用这个背景图进行 Y 轴的铺放，从而实现一种等高列的假象；
- 给容器的`div`使用单独的背景色（固定布局）（流体布局）：用元素中的最大高度撑起其他容器的高度；
- 创建带边框的两列等高布局： 用`border-left`来做，之鞥呢使用两列；
- 使用正`padding`和负`margin`对冲实现多列布局方法： 在所有列中使用的上，下`padding`和负的上，下`margin`，并在所有列外面加上一个容器，设置`overflow： hidden`，把溢出的背景切掉。
- 使用边框和定位模拟列等高： 但不能使用在多列；
- 模仿表格布局等高列效果： 兼容性不好，在`ie6-7`中无法正常运行；

### 74\. :link、:visited、:hover、:active 的执行顺序是怎么样的？

`L-V-H-A`，`l(link)ov(visited)e h(hover)a(active)te`，即用喜欢和讨厌两个词来概括。

### 75\. 经常遇到的浏览器兼容性有哪些？如何解决？

- 浏览器默认的`margin`和`padding`不同；
- `IE6`双边距`bug`；
- 在`IE6-7`中元素高度超出自己设置的高度。原因是 IE8 以前的浏览器中会给元素设置偶人的行高的高度所导致的；
- `min-height`在`IE6`下不起作用；
- 透明性`IE`用`filter：Alpha（Opacity=60）`,而其它主流浏览器用`opacity： 0.6`；
- `input`边框问题，去掉`input`边框一般用`border：none；`就可以但是由于`IE6`在解析`input`样式时`bug`（优先级问题），在`IE6`下无效；

### 76\. 为什么要语义化以及对于标签语义化的理解？

原因： **为了在没有 css 的情况下，页面也能呈现出很好的内筒结构和代码架构（可以理解为为了裸奔时好看哈哈哈）**。

理解：

- 去掉或者丢失样式的时候能够让页面呈现清晰的结构；
- 有利于`SEO`，可以和搜索引擎建立良好的沟通，有助于爬虫抓取更多的有效信息（爬虫依赖于标签来确定上下文和各个关键字的权重）；
- 方便其他设备解析（如屏幕阅读器，盲人阅读器，移动设备等），以意义的方式来渲染网页；
- 便于团队的开发和维护，语义化更具有可读性，遵循`W3C`标准的团队都遵循这个标准，可以减少代码差异化；

### 77\. 常见的 CSS 布局有几种？

常见的`CSS`布局有： **固定布局**、**流式布局**、**弹性布局**、**浮动布局**、**定位布局**、**margin 和 padding**。

### 78\. position 的 absolute 与 fixed 共同点与不同点？

相同点：

- 改变行内元素的呈现方式，`display`被设置为`block`；
- 让元素脱离普通流，不占据空间；
- 默认会覆盖到非定位元素上；

不同点：

- `absolute`的“根元素”是可以设置的，而`fixed`的“根元素”固定为浏览器窗口；
- 当滚动网页时，`fixed`元素与浏览器窗口之间的距离是不变的。

### 79\. CSS 哪些属性可以继承？哪些属性不可以继承？

- 可以继承的样式属性： `font-size`、`font-family`、`color`、`list-style`、`cursor`、`ul`, `li`, `dl`, `dd`, `dt`;
- 不可继承的样式属性： `width`、`height`、 `border`、 `padding`、 `margin`、 `background`；

🍀**注意**： 为了便于理解，小编觉得可以大致理解为**字体相关的样式可以继承，与尺寸相关的样式不可继承**。

### 80.使用过的 CSS 预处理器？

`CSS`预处理器的基本思想： 为`CSS`增加了一些变量的特性（变量，判断逻辑和函数等）。

开发者使用这种语言进行 web 页面上样式设计，再编译成正常的`css`文件使用。使用 CSS 预处理器，可以使`CSS`更加简洁，适应性更强，可读性更佳，无需考虑兼容性。最常用的`CSS`预处理器语言包括： `Sass(Scss)`和`Less`。

### 81\. 🤧 设置元素浮动后，该元素的 display 值会如何变化？

设置元素浮动后，该元素的`display`值自动变成`block`。

### 82\. 行内元素有哪些?块级元素有哪些? 空(void)元素有那些?

- 行内元素： `a`、`b`、 `span`、`img`、 `input`、 `strong`、 `select`、 `label`、 `em`、 `button`、 `textarea`；
- 块级元素： `div`、 `ul`、 `li`、 `dl`、 `dt`、 `dd`、 `p`、 `h1-h6`、 `blockquote`；
- 空元素： 即没有实际内容内容的`html`元素，如：`br`、`meta`、`hr`、 `link`、 `input`、 `img`；

### 83\. box-sizing 属性？

用来控制元素的盒子模型的解析模式，默认为`content-box`。

- `content-box: W3C`的标准盒子模型，设置元素的`height/width`属性指的是`content`部分的宽/高；
- `border-box`：IE 传统盒子模型。设置元素的`height/width`属性指的是`border + padding + content`部分的高/宽；

### 84\. CSS3 动画比基于脚本的动画有哪些优势？

跟脚本动画相比，使用`CSS3`动画具有以下优势：

- 易于使用，任何人都可以在不了解`javascript`的情况下创建它们；
- 即使在合理的系统负载下也能很好的执行。
- 由于简单的动画在`javascript`中的效果比较差，因此渲染引擎使用跳帧技术来使动画流畅进行；
- 允许浏览器控制动画序列，通过建撒谎哦在当前不可见的选项卡中执行的动画的更新频率来优化性能和效率；

### 85\. 如何优化网页的打印样式？

`<link rel="stylesheet" type="text/css" media="screen(或者print、tv等) href="aaa.css">`

🍀**注意**，在打印样式表也应该注意以下几点：

- 打印样式表中最好不要用背景图片，因为打印机不能打印 CSS 中的背景图。如果坚持要显示图片，可以使用`html`插入到页面中；
- 最好不要使用像素作为单位，因为打印样式表要打印出来的是实物，建议使用`pt/cm`;
- 隐藏掉不必要的内容。（如`@print content{display: none}`）;
- 打印样式表中不建议使用浮动属性（建议少用），因为它们会消失。

### 86\. React Native 中的样式与 css 的区别？

- `React Native` 的样式基本上是实现了 `CSS` 的一个子集，并且属性名不完全一致，所以当你开始在考虑兼容`React Native` 端之前，可以先简要了解一下 `React Native` 的样式。
- 这些样式名基本上是遵循了 `web` 上的 `CSS`的命名，只是按照 `JS` 的语法要求使用了驼峰命名法。
- `RN`使用 `JavaScript` 来写样式，所有核心组件都接受名为`style`的属性，相当于`css`的行内样式。
- 在 `React Native`中使用 Flexbox 规则来指定某个组件的子元素的布局。`Flexbox` 可以在不同屏幕尺寸上提供一致的布局结构。因此，如果你要考虑 `React Native` 端，那你的样式布局就得采用 `Flex` 布局。

### 87\. style 标签写在 body 后与 body 前有什么区别？

一般情况下，页面加载时自上而下的。将`style`标签至于`body`之前，为的是先加载样式。

若是写在`body`标签之后，由于浏览器以逐行方式对 html 文档进行解析，当解析到写在写在文档尾部的样式表时，会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后会重新渲染，在`windows`的`IE`下可能会出现`FOUC`现象（页面闪烁）。

### 88\. CSS 属性 overflow 属性定义溢出元素内容区的内容会如何处理?

- 参数是`scroll`的时候，一定会出滚动条；
- 参数是`auto`的时候，子元素内容大于父元素时出现滚动条；
- 参数是`visible`的时候，溢出的内容出现在父元素之外；
- 参数是`hidden`的时候，溢出隐藏；

### 89\. BFC、IFC、GFC、FFC 是什么？

- `Block formatting context(BFC)`--块级格式化上下文；
- `Inline formatting context(IFC)`--内联格式化上下文；
- `Crid formatting context(GFC)`--网格布局格式化上下文；
- `Flex formatting context(FFC)`--自适应格式化上下文；

### 90\. 对于使用图片，需要注意什么？

- 优化图片；
- 尽量避免在`html`中使用压缩图片；
- 使用恰当的图片格式；
- 使用`css sprites`技巧对图片优化；

### 91.😯 如何优化图像以及图像格式有什么区别？

**优化图像**：

- 不用图片，尽量使用`CSS3`代替。对于一些要实现的修饰效果，例如阴影，圆角，半透明等，可以用`CSS3`完成；
- 尽可能使用矢量图`SVG`代替位图。对于绝大多数图案和图标等，矢量图更小，而且可以缩放而无需生成多套图。现代的主流浏览器大多数都能稳定的支持`SVG`。

**图像格式区别**：

- 矢量图： 图标字体，如`font-awesome`、`svg`；
- 位图： `GIF`、`jpg（JPEG）`、`png`；

矢量图和位图的区别：

- `PNG`：它可以细分为三种格式： `PNG8`，`PNG24`，`PNG32`。后面的数字代表这种`PNG`格式最多可以索引和存储的颜色值；
- `JPG`: 一种大小与质量相对平衡的压缩图片格式。适用于允许轻微失真的色彩丰富的照片，不适用于色彩简单（色调少）的图片，比如图标啊，`logo`等；
- `GIF`： 一种无损的，8 位图片格式。具有支持动画，索引透明，压缩等特性。使用色彩简单的图片。

**优点**： 能保证在最不失真的情况下尽可能压缩图像文件的大小；

**缺点**： 对于需要高保真的较为复杂的图像，`PNG`虽然能无损压缩，但是图片较大，不适合应用在 web 页面上；

### 92\. position:fixed;在手机端下无效怎么处理？

`fixed`的元素实现相对于整个页面是固定位置的，当在屏幕上滑动时是在滑动整个`viewport`。原来的网页还在，fixed 也没有变过位置，所以说并不是手机端不支持`fixed`，只是`fixed`元素不是相对于手机屏幕固定的，因此我们按照以下方式来设计：

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
/>
```

### 93\. css 样式引入方式的优缺点对比

- 内嵌样式： 优点： 方便书写，权重高；缺点： 没有做到结构和样式分离；
- 内联样式： 优点：结构样式相分离； 缺点：没有彻底分离；
- 外联样式： 优点： 完全实现了结构和样式相分离； 缺点： 需要引入才能使用；

### 94\. border:none;与 border:0;有什么区别？

**首先是性能差异**：

- `{border：0;}`: 把`border`设置为 0 像素，虽然在页面上看不到，但是按`border`默认值理解，浏览器依然对`border-width/border-color`进行了渲染，即已经占用内存值；
- `{border：none；}`被理解为`border-style:none`。`boder:0`;比`border:none`多渲染了一个`border-width:0`,也就是为什么`border:none`的性能要比`border:0`高；

**兼容性差异**：

- `{border:none;}`当`border`为`“none”`时似乎对`IE6/7`无效边框依然存在当`border`为“0”时，感觉比`“none”`更有效，所有浏览器都一致把边框隐藏。

### 95\. position 跟 display、overflow、float 这些特性相互叠加后会怎么样？

- `display`属性规定元素应该生成的框的类型；
- `position`属性规定元素的定位类型；
- `float`属性是一种布局方式，定义元素往哪个方向浮动；

**叠加结果**：有点类似于优先机制。`position`的值\-\- `absolute/fixed`优先级最高，有他们在时，`float`不起作用，`display`值需要调整。`float`或者`absolute`定位的元素，只鞥是块元素或者表格。

### 96\. 什么是 critical CSS？

`Critical CSS`是一种提取首屏中 `CSS` 的技术，以便尽快将内容呈现给用户。这是快速加载网页首屏的好方法。

核心思路：

（1）、抽取出首页的`CSS`；

（2）、用行内 css 样式，加载这部分的`css(critical CSS)`;

（3）、等到页面加载完之后，再加载整个`css`，会有一部分`css`与`critical css`重叠；

### 97\. 什么是回流（重排）和重绘以及其区别？

- 回流（重排），`reflow`:当`render tree`中的一部分（或全部）因为元素的规模尺寸，布局，隐藏等改变时而需要重新构建；
- 重绘`（repaint`）:当`render tree`中的一些元素需要更新属性，而这些属性只影响元素的外观，风格，而不会影响布局时，称其为**重绘**，例如颜色改变等。

🍀**注意**：**每个页面至少需要引发一次重排+重绘，而且重排（回流）一定会引发重绘**。

触发重排（回流）的条件：

- 增加或者删除可见的`dom`元素；
- 元素的位置发生了改变；
- 元素的尺寸发生了改变，例如边距，宽高等几何属性改变；
- 内容改变，例如图片大小，字体大小改变等；
- 页面渲染初始化；
- 浏览器窗口尺寸改变，例如`resize`事件发生时等；

### 98\. css 中可以让文字在垂直和水平方向上重叠的两个属性是什么？

- 垂直方向： `line-height`；
- 水平方向： `letter-spacing`；

🍀**注意**： `letter-spacing`还可以用来消除`inline-block`元素间的换行符空格间隙等问题。

### 99\. 对 WEB 标准以及 W3C 有什么理解与认识？

- 标签闭合，标签小写，不乱嵌套；
- 提高搜索机器人的搜索几率；
- 使用外链`CSS`和`JS`脚本；
- 结构行为标签分离；
- 文件下载和页面速度更快；
- 内容能被更多的用户以及更广泛的设备访问；
- 更少的代码和组件，易于维护，改版方便；
- 不需要动页面内容，同时提供打印版本也不需要复制内容，提高网站的易用性；
