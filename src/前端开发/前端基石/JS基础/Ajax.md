---
title: Ajax
tag: JS基础
date: 2018-05-29
category:
  - 前端基石
---

## 一、AJAX

### 1.概念：

- （1）ajax 不是一个新的语言，本质上还是 js，综合运用了很多的奇数
- （2）本质上 ajax 进行数据传输，基于 http 协议（get/post）

  - ###### js 是一个单线程的语言，代码从上往下顺序执行，有一个时间队列 event loop；js 遇到异步事件，将异步事件扔到事件队列中，不会阻塞主线程的执行；等主线程执行完成后浏览器会不断轮巡事件队列，如果发现异步事件满足事件，将异步事件去除，到主线程执行

- ajax 和执行定时器一样，都是异步事件；ajax 用于和后台进行数据交互，所以可能会消耗大量时间

### 2、XMLHttpRequest 对象

- 发送请求前，需要先创建 XMLHttpRequset 对象，它是浏览器内建对象，
- ajax 发送请求（get，post）一定是基于 http 协议

```
var xhr=new XMLHttpRequset（）;
```

- 请求基于 http 协议，就一定有一定规范：1，请求行，2.请求头 3，请求主体
  设置了这三个之后, 就可以发送 get/post 请求

#### 2-1、发送 get 请求

xhr.open(type,url,async)

- 1. 设置请求行 ( 请求类型, 请求地址 ) open 设置请求打开方式 - 参数 1: type 请求类型 - 参数 2: url 请求地址 - 参数 3: async 是否异步 默认 true 就是异步, false
     xhr.open('post','url')
- 2.设置请求头，
- get 请求没有请求体，所以不要设置请求体的编码方式 content-type
  所以，不用请求头，按浏览器默认的就可以了
- 3.设置请求体 并发送请求
  - get 请求没有请求体
  - send（请求体） get 传 null
  - xhr.send(null);

#### 2-2、发送 post 请求

- 1. 设置请求行 ( 请求类型, 请求地址 ) open 设置请求打开方式
  - 参数 1: 请求类型
    - 参数 2: 请求地址
    - 参数 3: 是否异步 默认 true 就是异步, false

```js
    open(type,url,async)
    post 请求 type: post, url 不拼接参数
    xhr.open("post", "05-post.php", true);
```

- 2.设置请求头
  - get 请求没有请求体，所以不要设置请求体的编码方式 content-type,所以，不用请求头，按浏览器默认的就可以了，
  - post 请求有请求体，所以需要设置 content-type，设置请求头，告诉后台浏览器请求的编码方式

```js
xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
```

- 3. 设置请求体 并发送请求

```js
//    get请求没有请求体
//    send( 请求体 )  get 传 null
xhr.send('username=Jepson&password=123456')
```

#### 2-3、获取响应

- readyState

###### readyState 有五种可能的值：用来标记当前 xhr 的状态

- xhr.readyState = 0 时，UNSENT open 尚未调用
- xhr.readyState = 1 时，OPENED open 已调用
- xhr.readyState = 2 时，HEADERS_RECEIVED 接收到头信息
- xhr.readyState = 3 时，LOADING 接收到响应主体
- xhr.readyState = 4 时，DONE 响应完成

- 因为 ajax 是异步的, 发送请求的过程, 不会阻塞主线程的执行，我们需要监听 readyState 的变化
- onreadystatechange 方法可以监听 readyState 的变化
  每变换一次都会触发
- HTTP 响应分为 3 个部分，状态行、响应头、响应体。

```js
//给xhr注册一个onreadystatechange事件，当xhr的状态发生状态发生改变时，会触发这个事件。
xhr.onreadystatechange=function(){
if(xhr.readystate===4){
//1.获取状态行
console.log('状态行:'+xhr.status）;
//2.获取响应头
console.log（'所有的响应头:'+xhr.getAllResponseHeaders());
console.log('指定响应头:'+xhr.getResponseHeader(content-type));
//3. 获取响应体
    console.log(xhr.responseText);
}

}


// status 表示状态码 200 说明响应成功
```

### 3. 数据交互

- 浏览器端只是负责用户的交互和数据的收集以及展示，真正的数据都是存储在服务器端的。

- 我们现在通过 ajax 的确可以返回一些简单的数据（一个字符串）,但是在实际开发过程中，肯定会会设计到大量的复杂类型的数据传输，比如数组、对象等，但是每个编程语言的语法都不一样。

- 因此我们会采用通过的数据交换格式（XML、JSON）来进行数据的交互。

#### 3-1 XML(了解)

- 什么是 XML
  - XML 指可扩展标记语言（EXtensible Markup Language）
  - XML 是一种标记语言，很类似 HTML
  - XML 的设计宗旨是传输数据，而非显示数据
  - XML 标签没有被预定义。您需要自行定义标签。
- 语法规范
  - 第一行必须是版本信息
  - 必须有一个根元素（有且仅有一个）
  - 标签不可有空格、不可以数字或.开头、大小写敏感
  - 不可交叉嵌套，都是双标签，如果是单标签，必须闭合
  - 属性双引号（浏览器自动修正成双引号了）
  - 特殊符号要使用实体
  - 注释和 HTML 一样

#### 3-2php 获取 xml 文件的内容

```php
// 注意: 如果需要返回 xml 数据, 需要将 content-type 改成 text/xml, 不然浏览器以 text/html 解析
header( 'content-type:text/xml;charset=utf-8' );
// file_get_content 用于获取文件的内容
// 参数: 文件的路径
$result = file_get_content( "data.xml" );
echo $result;

php关联数组 ==>  json   ( json_encode )

// php的关联数组
$obj = array(
  "a" => "hello",
  "b" => "world",
  "name" => "鹏鹏"
);
//json字符串
$json = json_encode( $obj );
echo $json;

json ==> php对象/关联数组	( json_decode )
$json = '{"a": "Hello", "b": "World"}';//json字符串
//第一个参数：json字符串
//第二个参数：
//false，将json转换成对象(默认)
//true：将json转换成数组(推荐)
$obj = json_decode($json,true);
echo $obj['a'];

//通过json文件获取到的内容就是一个json字符串。
$data = file_get_contents("data.json");

//将json转换成数组
$result = json_decode($data, true);
print_r($result);
```

#### 3-3 兼容性 (了解)

###### 现在一般最多兼容到 IE8, 这里见到了知道是在处理兼容性就行了

```JS
var xhr = null;
if(XMLHttpRequest){
  //现代浏览器 IE7+
  xhr = new  XMLHttpRequest();
}else{
  //老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX 对象：
  xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
}

```

$(表单）.serialize（）方法 序列化文档

jQuery 中的 ajax 方法
$.ajax

| 参数名称   | 描述                                 | 取值示例                                       |
| ---------- | ------------------------------------ | ---------------------------------------------- |
| url        | 接口地址                             | url:"02.php"                                   |
| type       | 请求方式                             | get/post type:"get"                            |
| timeout    | 超时时间 单位毫秒                    | timeout:5000                                   |
| dataType   | 服务器返回的格式 json/xml/text(默认) | dataType:"json"                                |
| data       | 发送的请求数据 对象                  | data:{name:"zs", age:18}                       |
| beforeSend | 调用前的回调函数                     | function(){} beforeSend:function(){ alert(1) } |
| success    | 成功的回调函数                       | function (data) {} success:function (data) {}  |
| error      | 失败的回调函数                       | function (error) {} error:function(data) {}    |
| complete   | 完成后的回调函数                     | function () {} complete:function () {}         |

其他 api

```JS
// 发送get请求
$.get(url, data, callback, dataType);
$.get(option);

// 发送post请求
$.post(url, data, callback, dataType);
$.post(option)

// 发送get请求, 并设置 dataType为 json
$.getJSON(url, data, callback);
$.getJSON(obj);

```

## 二、模板引擎 artTemplate 的使用

### 1.引入模板引擎的 js 文件

```JS
<script src="template-web.js"></script>
```

### 2.准备模板

```HTML
<!--
  指定了type为text/html后，这一段script标签并不会解析，也不会显示。
-->
<script type="text/html" id="myTmp">
  <p>姓名：隔壁老王</p>
  <p>年龄：18</p>
  <p>技能：查水表</p>
  <p>描述：年轻力气壮</p>
</script>
```

### 3.准备数据

```JS
// 3. 准备数据, 数据是后台获取的，可以随时变化
var obj = {
  userName:"隔壁老王",
  age: 18,
  skill:"查水表",
  desc:"年轻气壮"
}
```

### 4.将模板与数据进行绑定

```JS
//第一个参数：模板的id
//第二个参数：数据对象, 模版中可以直接使用对象中的属性
//返回值：根据模板生成的字符串。
var html = template("myTmp", obj);
console.log(html);
```

### 5.修改模板

```HTML
<script type="text/html" id="myTmp">
  <p>姓名：{{userName}}</p>
  <p>年龄：{{age}}</p>
  <p>技能：{{skill}}</p>
  <p>描述：{{desc}}</p>
</script>
```

### 6.将数据显示到页面

#### artTemplate 标准语法

##### if 语法

```JS
var div = document.querySelector("div");
div.innerHTML = html;


{{if gender='男'}}
  <div class="man">
{{else}}
  <div class="woman">
{{/if}}
```

##### each 语法

```HTML
<!--
  1. {{each data}}  可以通过$value 和 $index获取值和下标
  2. {{each data v i}}  自己指定值为v，下标为i
-->
{{each data v i}}
  <li>
    <a href="{{v.url}}">
      <img src="{{v.src}}" alt="">
      <p>{{v.content}}</p>
     </a>
   </li>
{{/each}}

//如果返回的数据是个数组，必须使用对象进行包裹，因为在{{}}中只写书写对象的属性。
var html = template("navTmp", {data:info});
```

## 三、同源与跨域

### 同源

#### 同源策略的基本概念

- 1995 年，同源政策由 Netscape 公司引入浏览器。目前，所有浏览器都实行这个政策。同源策略：最初，它的含义是指，A 网页设置的 Cookie，B 网页不能打开，除非这两个网页"同源"。所谓"同源"指的是"三个相同"。协议相同、域名相同、端口相同

```
举例来说，这个网址http://www.example.com/dir/page.html
协议是http://，域名是www.example.com，端口是80（默认端口可以省略）。它的同源情况如下。
http://www.example.com/dir2/other.html：同源

file:///F:/phpStudy/WWW/day01/04-demo/04.html 不同源(协议不同)
http://v2.www.example.com/dir/other.html：不同源（域名不同）
http://www.example.com:81/dir/other.html：不同源（端口不同）
```

#### 同源策略的目的

- 同源政策的目的，是为了保证用户信息的安全，防止恶意的网站窃取数据。
- 虽然这个限制出于安全来说, 是很有必要，但是也给我们日常开发带来不好的影响。比如实际开发过程中，往往都会把服务器端架设到一台甚至是一个集群的服务器中，把客户端页面放到另外一个单独的服务器。那么这时候就会出现不同源的情况，如果我们知道两个网站都是安全的话，我们是希望两个不同源的网站之间可以相互请求数据的。这就需要使用到跨域 。

##### 跨域

- 演示跨域问题

##### jsonp( 无兼容性问题 )

    - JSONP(JSON with Padding)、可用于解决主流浏览器的跨域数据访问的问题。
    原理：服务端返回一个定义好的js函数的调用，并且将服务器的数据以该函数参数的形式传递过来，这个方法需要前后端配合
    script 标签 src属性请求数据 是不受同源策略的限制的，它可以载入任意地方的 js文件。类似的还有img和link标签

```HTML
<!--不受同源策略的标签-->
<img src="http://www.api.com/1.jpg" alt="">
<link rel="stylesheet" href="http://www.api.com/1.css">
<script src="http://www.api.com/1.js"></script>
```

jsonp 演化过程 1
php 文件

```PHP
header("content-type:text/html;charset=utf-8");
echo "alert(1111)";
//html文件

<script src="http://www.api.com/testjs.php"></script>
```

原理：其实 src 的路径是什么文件不重要，无论引入 js 文件还是 php 文件，最后返回给浏览器的都是字符串，因此我们 script 标签是可以引入一个 php 文件的。
jsonp 演化过程 2
php 文件

```PHP
header("content-type:text/html;charset=utf-8");
echo "var a = 118;";
//html文件

<script src="http://www.api.com/testjs.php"></script>
<script>
  //a打印出来了118
  console.log(a);
</script>
```

我们现在做到了一件事情，从不同源的 php 文件中获取到了数据
缺点：获取数据的 script 标签必须写在使用的 script 标签的前面，必须保证先有数据才能对数据进行渲染。
jsonp 演化过程 3
php 代码

```PHP
header("content-type:text/html;charset=utf-8");
$arr = array(
    "name"=>"zs",
    "age"=>18
);
$result = json_encode($arr);
//这是一段js函数的调用的代码，$result就是我们想要的数据
echo "func($result)";
//js代码

<script>
  function func(data) {
    console.log(data);
  }
</script>
<script src="http://www.api.com/testjs.php"></script>
```

缺点：后端必须知道前端声明的方法的名字，后端才能调用。
jsonp 演化过程 4
php 代码

```PHP
header("content-type:text/html;charset=utf-8");
$arr = array(
    "name"=>"zs",
    "age"=>18
);
$result = json_encode($arr);
//这是一段js函数的调用的代码，$result就是我们想要的数据
echo $_GET['callback']."($result)";
//javascript代码

function fun(data) {
  console.log(data);
}
var button = document.querySelector("button");
button.onclick = function () {
  var script = document.createElement("script");
  script.src = "http://www.api.com/testjs.php?callback=fun";
  document.body.appendChild(script);
}
```

- 1. 说白了，jsonp 的原理就是 借助了 script 标签 src 请求资源时, 不受同源策略的限制.
- 2.  在服务端返回一个函数的调用，将数据当前调用函数的实参。
- 3.  在浏览器端，需要程序要声明一个全局函数，通过形参就可以获取到服务端返回的对应的值
      ​
      jsonp 原理大家知道即可，不用太过于去纠结这个原理，因此 jquery 已经帮我们封装好了，我们使用起来非常的方便。
      jquery 对于 jsonp 的封装

```JS
//使用起来相当的简单，跟普通的get请求没有任何的区别，只需要把dataType固定成jsonp即可。
$.ajax({
  type:"get",
  url:"http://www.Jepson.com/testjs.php",
  dataType:"jsonp",
  data:{
    uname:"Jepson",
    upass:"123456"
  },
  success:function (info) {
    console.log(info);
  }
});
```

##### 【案例：查询天气.html】

- 天气查询 api 地址
- 【案例：省市区三级联动.html】
- api 地址
- 跨域资源共享(CORS) ( 兼容性 IE10+ )
- cors 的使用
- 新版本的 XMLHttpRequest 对象，可以向不同域名的服务器发出 HTTP 请求。这叫做"跨域资源共享"（Cross-origin resource sharing，简称 CORS）。
  跨域资源共享（CORS）的前提 - 浏览器支持这个功能( 兼容性 IE10+ ) - 服务器必须允许这种跨域。
  服务器允许跨域的代码：

```JS
//允许所有的域名访问这个接口
header("Access-Control-Allow-Origin:*");
//允许www.study.com这个域名访问这个接口
header("Access-Control-Allow-Origin:http://www.jepson.com");
//CORS的具体流程（了解）
//服务器端收到一个简单跨域请求后，根据资源权限配置，在响应头中添加Access-Control-Allow-Origin Header。浏览器收到响应后，查看是否设置了header('Access-Control-Allow-Origin:请求源域名或者*');如果当前域已经得到授权，则将结果返回给JavaScript。否则浏览器忽略此次响应。
```

###### 总结: 解决跨域两种最常用方式 jsonp 与 cors

- jsonp 与 cors 的对比 - jsonp 兼容性好，老版本浏览器也支持，但是 jsonp 仅支持 get 请求，发送的数据量有限。使用麻烦 - cors 需要浏览器支持 cors 功能才行。但是使用简单，只要服务端设置允许跨域，对于客户端来说，跟普通的 get、post 请求并没有什么区别。 - 跨域的安全性问题：因为跨域是需要服务端配合控制的 ，也就是说不论 jsonp 还是 cors，如果没有服务端的允许，浏览器是没法做到跨域的。
  当然还有一种很常用的解决跨域的方式, 就是服务器端配置反向代理 ( 纯服务器端实施, 了解即可 )

##### Ajax 全局事件

```JS
$(window).ajaxStart(); //ajax开始时触发
beforeSend:function(）{}  //ajax开始前触发
success：function（）{}
error：function(){}
$(window).complete（）{}//每一个ajax执行结束都会触发ajaxComeplete事件，

$(window).ajaxStop(); //ajax结束时触发 会检查是否存在其他ajax事件，如果有就会执行complete事件，没有才去执行ajaxStop事件
```
