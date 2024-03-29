---
title: less
tag: CSS3
date: 2018-08-08
category:
  - 前端基石
---

#### 1.定义变量

```css
    @color：red；
    @container：1280px
    //定义变量  不会被解析到css文件的注释
    /*头部区域*/  会被解析的css文件的注释
    body{
    background-color：@color；
    color：@color；
    width：@container；
    }
```

#### 2.嵌套语法

```css
    .father{
    widht:100px;
    height;100px;
    .son1{
    widht:100px;
    height;100px;
    }
    >.son2{
    widht:100px;
    height;100px;
    }
    //&在less里面代表元素本身
    &:hover{
    background-color：blue;
    }
    &:before{
    content:"";
    widht:100px;
    height;100px;
    }
    }
```

#### 3.mixin 混入

```css
.fl {
  float: left;
}
.fr {
  float: right;
}
//混入函数（无参数）
//不会被编译
.btn_base() {
  width: 200px;
  height: 50px;
  background-color: pink;
}
//加了括号，css里面不会将这个类编译进去，但是可以调用
//不加括号，可以调用同时会进行编译
//可以支持传递参数
//并且可以设置默认值

<!--混入函数，带参数-- > .btn_border(@width) {
  border: @width solid #000;
}
.btn {
  .btn_border(); //报错
  .btn_border(10px); //不报错
}

.one-txt-cut() {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.box {
  .fl();
  .one-txt-cut();
  .border-dadius();
}
```

#### 4.导入

    ```css
    @import "base.less";//引入base模块
    @import "header.less";//引入header模块
    @import "nav.less";//引入nav模块
    @import "footer.less";//引入footer模块
    ```

#### 5.less 运算

运算：

```css
div {
  width: 100%/6;
  height: 500px * 2;
}
.col(@num) {
  widht: 100%/12 * @num;
}
.col-1 {
  .col(1);
}
```

#### 6.rem

**em 是一个相对单位，相对的是当前这个盒子本身的 font-size 大小**

**rem 是一个相对单位，相对的是 html 的字体大小**

Rem 的宽高自适应原理：
所有的 rem 单位都是基于 html 的字体大小，在不同的屏
幕下面，修改 html 的字体大小就可以实现自适应效果。

Rem 计算公式：设计图的大小/自己自定义的 html 的 font-size=改变后的屏幕大小/这个屏幕对应的 font-size 值；

https://github.com/Maroon1/px2rem

#### 7、函数

```css
    escape(@string); // 通过 URL-encoding 编码字符串

    e(@string); // 对字符串转义

    %(@string, values...); // 格式化字符串

    unit(@dimension, [@unit: ""]); // 移除或替换属性值的单位

    color(@string); // 将字符串解析为颜色值

    color(string); // 将字符串或者转义后的值转换成颜色

    data-uri([mimetype,] url); // * 将资源内嵌到css中，可能回退到url()

    ceil(@number); // 向上取整

    floor(@number); // 向下取整

    percentage(@number); // 将数字转换为百分比，例如 0.5 -> 50%

    round(number, [places: 0]); // 四舍五入取整

    sqrt(number); // * 计算数字的平方根

    abs(number); // * 数字的绝对值

    sin(number); // * sin函数

    asin(number); // *

    arcsin函数

    cos(number); // * cos函数

    acos(number); // *

    arccos函数

    tan(number); // * tan函数

    atan(number); // *

    arctan函数

    pi(); // * 返回PI

    pow(@base, @exponent); // * 返回@base的@exponent次方

    mod(number, number); // * 第一个参数对第二个参数取余

    convert(number, units); // * 在数字之间转换

    unit(number, units); // * 不转换的情况下替换数字的单
    位

    rgb(@r, @g, @b); // 转换为颜色值

    rgba(@r, @g, @b, @a); // 转换为颜色值

    argb(@color); // 创建 #AARRGGBB 格式的颜色值

    hsl(@hue, @saturation, @lightness); // 创建颜色值

    hsla(@hue, @saturation, @lightness, @alpha); // 创建颜色值

    hsv(@hue, @saturation, @value); // 创建颜色值

    hsva(@hue, @saturation, @value, @alpha); // 创建颜色值

    hue(@color); // 从颜色值中提取 hue 值（色相）

    saturation(@color); // 从颜色值中提取 saturation 值（饱和度）

    lightness(@color); // 从颜色值中提取 'lightness' 值（亮度）
    hsvhue(@color); // * 从颜色中提取 hue 值，以HSV色彩空间表示（色相）

    hsvsaturation(@color); // * 从颜色中提取 saturation 值，以HSV色彩空间表示（饱和度）

    hsvvalue(@color); // * 从颜色中提取 value 值，以HSV色彩空间表示（色调）

    red(@color); // 从颜色值中提取 'red' 值（红色）

    green(@color); // 从颜色值中提取 'green' 值（绿色）

    blue(@color); // 从颜色值中提取 'blue' 值（蓝色）

    alpha(@color); // 从颜色值中提取 'alpha' 值（透明度）

    luma(@color); // 从颜色值中提取 'luma' 值（亮度的百分比表示法）

    saturate(@color, 10%); // 饱和度增加 10%

    desaturate(@color, 10%); // 饱和度降低 10%

    lighten(@color, 10%); // 亮度增加 10%

    darken(@color, 10%); // 亮度降低 10%

    fadein(@color, 10%); // 透明度增加 10%

    fadeout(@color, 10%); // 透明度降低 10%

    fade(@color, 50%); // 设定透明度为 50%

    spin(@color, 10); // 色相值增加 10

    mix(@color1, @color2, [@weight: 50%]); // 混合两种颜色

    greyscale(@color); // 完全移除饱和度，输出灰色

    contrast(@color1,
    [@darkcolor: black],
    [@lightcolor: white],
    [@threshold: 43%]);
    // 如果 @color1 的 luma 值 > 43% 输出 @darkcolor，
    否则输出 @lightcolor

    multiply(@color1, @color2);
    screen(@color1, @color2);
    overlay(@color1, @color2);
    softlight(@color1, @color2);
    hardlight(@color1, @color2);
    difference(@color1, @color2);
    exclusion(@color1, @color2);
    average(@color1, @color2);
    negation(@color1, @color2);
    iscolor(@colorOrAnything); // 判断一个值是否是颜色

    isnumber(@numberOrAnything); // 判断一个值是否是数字（可含单位）

    isstring(@stringOrAnything); // 判断一个值是否是字符串

    iskeyword(@keywordOrAnything); // 判断一个值是否是关键字

    isurl(@urlOrAnything); // 判断一个值是否是url

    ispixel(@pixelOrAnything); // 判断一个值是否是以px为单位的数值

    ispercentage(@percentageOrAnything); //
    判断一个值是否是百分数

    isem(@emOrAnything); // 判断一个值是否是以em为单位的数值

    isunit(@numberOrAnything, "rem"); // * 判断一个值是否是指定单位的
    数值
```

#### 8、使用 less.js 编译

```html
<!--第一步，引入less文件-->
<link rel="stylesheet/less" href="01.less" />
<!--第二部：引入less.js文件-->
<script src="less.js"></script>
```

    注意：这种方式必须在http协议下运行，因为本质上less.js是通过ajax请求了less文件，进行编译。

    缺点：

    1. 需要多引入一个less.js文件
    2. 需要多一次http请求，file协议打开无效
    3. 如果浏览器禁用了js，那么无法生效
    4. 线上编译，可能出现短暂的css混乱
