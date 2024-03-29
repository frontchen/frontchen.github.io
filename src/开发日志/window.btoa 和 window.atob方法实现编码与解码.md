---
title: window.btoa 和 window.atob方法实现编码与解码
tag:
  - 项目总结
date: 2019-04-08
category:
  - 开发日志
---

文章目录

- window.atob() 与 window.btoa()
- Unicode 字符串
- decodeURIComponent() 与 encodeURIComponent()
- escape() 与 unescape() 方法

### window.atob() 与 window.btoa()

**`WindowBase64.atob()`**` 函数用来解码一个已经被base-64编码过的数据。你可以使用 ``window.btoa() `  方法来编码一个可能在传输过程中出现问题的数据，并且在接受数据之后，使用  window.atob() 方法来将数据解码。例如：你可以把 ASCII 里面数值 0 到 31 的控制字符进行编码，传输和解码。

window.btoa()：将 ascii 字符串或二进制数据转换成一个 base64 编码过的字符串,该方法不能直接作用于 Unicode 字符串.

**语法：**

var decodedData = window.atob(encodedData);

**例子：**

var encodedData = window.btoa("Hello, world"); // 编码
var decodedData = window.atob(encodedData); // 解码

其兼容性是主流浏览器，IE10 及以上。

### **Unicode 字符串**

在各浏览器中,使用  `window.btoa`  对 Unicode 字符串进行编码都会触发一个字符越界的异常.

先把 Unicode 字符串转换为 UTF-8 编码,可以解决这个问题, 代码来自[Johan Sundstr?m](http://ecmanaut.blogspot.com/2006/07/encoding-decoding-utf8-in-javascript.html):

```js
function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}
function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
} // Usage:
utf8_to_b64('? à la mode'); // "4pyTIMOgIGxhIG1vZGU="
b64_to_utf8('4pyTIMOgIGxhIG1vZGU='); // "? à la mode" //译者注:在 js 引擎内部,encodeURIComponent(str)相当于 escape(unicodeToUTF8(str)) //所以可以推导出 unicodeToUTF8(str)等同于 unescape(encodeURIComponent(str))
```

### decodeURIComponent() 与 encodeURIComponent()

这里用到了`encodeURIComponent()与`decodeURIComponent()方法，下面简单介绍下：

decodeURIComponent() 函数可对 encodeURIComponent() 函数编码的 URI 进行解码。

下面给个例子：

```html
<script type="text/javascript">
    var test1="http://www.w3school.com.cn/My first/" document.write(encodeURIComponent(test1)\+ "<br />")
  document.write(decodeURIComponent(test1))
</script>
```

输出的结果：

http%3A%2F%2Fwww.w3school.com.cn%2FMy%20first%2F
http://www.w3school.com.cn/My first/

下个例子， encodeURIComponent() 对 URI 进行编码：

```html
<script type="text/javascript">
  document.write(encodeURIComponent('http://www.w3school.com.cn'));
  document.write('<br />');
  document.write(encodeURIComponent('http://www.w3school.com.cn/p 1/'));
  document.write('<br />');
  document.write(encodeURIComponent(',/?:@&=+$#'));
</script>
```

输出结果：

http%3A%2F%2Fwww.w3school.com.cn
http%3A%2F%2Fwww.w3school.com.cn%2Fp%201%2F %2C%2F%3F%3A%40%26%3D%2B%24%23

关于`encodeURIComponent()与`decodeURIComponent()的参考地址：

[JavaScript decodeURIComponent() 函数](http://www.w3school.com.cn/jsref/jsref_decodeURIComponent.asp)与[JavaScript encodeURIComponent() 函数](http://www.w3school.com.cn/jsref/jsref_encodeURIComponent.asp)

### ** escape() 与 unescape() 方法**

escape() 函数可对字符串进行编码，这样就可以在所有的计算机上读取该字符串。

语法：escape(string)

返回值：已编码的  *string*  的副本。其中某些字符被替换成了十六进制的转义序列。

**说明：该方法不会对 ASCII 字母和数字进行编码，也不会对下面这些 ASCII 标点符号进行编码： \* @ - \_ + . / 。其他所有的字符都会被转义序列替换。**

参考地址：[https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/btoa](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/btoa)

[https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/atob](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/atob)

[http://www.w3school.com.cn/jsref/jsref_escape.asp](http://www.w3school.com.cn/jsref/jsref_escape.asp)
