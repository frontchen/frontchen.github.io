---
title: 面经系列-html
date: 2021-01-08
category: 面经指南
---

### 图片中 title 和 alt 区别？

- 通常当⿏标滑动到元素上的时候显示
- `alt` 是 的特有属性，是图⽚内容的等价描述，⽤于图⽚⽆法加载时显示、读屏器阅读图⽚。可提图⽚⾼可访问性，除了纯装饰图⽚外都必须设置有意义的值，搜索引擎会重点分析。

### Html5 有哪些新特性、移除了哪些元素

- 新增元素：
  - 绘画`canvas`
  - 用于媒介回放的`video 和 audio` 元素
  - 本地离线存储 `localStorage` 长期存储数据，浏览器关闭后数据不丢失
  - `sessionStorage` 的数据在浏览器关闭后自动删除
  - 语义化更好的内容元素，比如 `article 、footer、header、nav、section`
  - 表单控件 ，`calendar 、 date 、 time 、 email 、 url 、 search`
  - 新的技术 `webworker 、 websocket 、 Geolocation`
- 移除的元素：
  - 纯表现的元素： `basefont 、 big 、 center 、 font 、 s 、 strike 、 tt 、 u`
  - 对可⽤性产⽣负⾯影响的元素： `frame 、 frameset 、 noframes`
- ⽀持 HTML5 新标签：
  - `IE8/IE7/IE6` ⽀持通过 `document.createElement` ⽅法产⽣的标签
  - 可以利⽤这⼀特性让这些浏览器⽀持 `HTML5` 新标签
  - 浏览器⽀持新标签后，还需要添加标签默认的样式

### 浏览器是怎么对 Html5 的离线储存资源进⾏管理和加载的呢

如何使⽤：

- ⻚⾯头部像下⾯⼀样加⼊⼀个 `manifest` 的属性；
- 在 `cache.manifest` ⽂件的编写离线存储的资源
- 在离线状态时，操作 `window.applicationCache` 进⾏需求实现

在线的情况下，浏览器发现 `html` 头部有 `manifest` 属性，它会请求 `manifest` ⽂件，如 果是第⼀次访问 `app` ，那么浏览器就会根据`manifest`⽂件的内容下载相应的资源并且进⾏ 离线存储。如果已经访问过 `app` 并且资源已经离线存储了，那么浏览器就会使⽤离线的资 源加载⻚⾯，然后浏览器会对⽐新的 `manifest` ⽂件与旧的 `manifest` ⽂件，如果⽂件没 有发⽣改变，就不做任何操作，如果⽂件改变了，那么就会重新下载⽂件中的资源并进⾏ 离线存储。

### iframe 有那些缺点？

- `iframe` 会阻塞主⻚⾯的 `Onload` 事件
- 搜索引擎的检索程序⽆法解读这种⻚⾯，`不利于 SEO`
- `iframe` 和主⻚⾯共享连接池，⽽浏览器对相同域的连接有限制，所以会影响⻚⾯的并⾏加载
- 使⽤ `iframe` 之前需要考虑这两个缺点。如果需要使⽤ `iframe` ，最好是通过`javascript` 动态给 `iframe` 添加 `src` 属性值，这样可以绕开以上两个问题

### HTML W3C 的标准

标签闭合、标签⼩写、不乱嵌套、使⽤外链 css 和 js 、结构⾏为表现的分离

### Doctype 作⽤? 严格模式与混杂模式如何区分？它们有何意义?

- `<!DOCTYPE>` 声明位于⽂档中的最前⾯，处于 `html` 标签之前。告知浏览器的解析器， ⽤什么⽂档类型 规范来解析这个⽂档
- 严格模式的排版和 `JS` 运作模式是 以该浏览器⽀持的最⾼标准运⾏
- 在混杂模式中，⻚⾯以宽松的向后兼容的⽅式显示。模拟⽼式浏览器的⾏为以防⽌站点⽆法⼯作。`DOCTYPE` 不存在或格式不正确会导致⽂档以混杂模式呈现

### HTML 全局属性(global attribute)有哪些

- `class` :为元素设置类标识
- `data-*` : 为元素增加⾃定义属性
- `draggable` : 设置元素是否可拖拽
- `id` : 元素 id ，⽂档内唯⼀
- `lang` : 元素内容的的语⾔
- `style` : ⾏内 css 样式
- `title` : 元素相关的建议信息

### viewport 的 content 属性作用

```html
<meta name="viewport" content="" />
<!-- width viewport的宽度[device-width | pixel_value]width如果直接设置pixel_value数值，大部分的安卓手机不支持，但是ios支持；
    height – viewport 的高度 （范围从 223 到 10,000 ）
    user-scalable [yes | no]是否允许缩放
    initial-scale [数值] 初始化比例（范围从 > 0 到 10）
    minimum-scale [数值] 允许缩放的最小比例
    maximum-scale [数值] 允许缩放的最大比例
    target-densitydpi 值有以下（一般推荐设置中等响度密度或者低像素密度，后者设置具体的值dpi_value，另外webkit内核已不准备再支持此属性）
         -- dpi_value 一般是70-400//没英寸像素点的个数
         -- device-dpi设备默认像素密度
         -- high-dpi 高像素密度
         -- medium-dpi 中等像素密度
         -- low-dpi 低像素密度 -->
```

附带问题：怎样处理 移动端 1px 被 渲染成 2px 问题?

局部处理

- `mate` 标签中的 `viewport` 属性 ， `initial-scale` 设置为 1
- `rem` 按照设计稿标准⾛，外加利⽤ `transfrome 的 scale(0.5)` 缩⼩⼀倍即可；

全局处理

- `mate` 标签中的 `viewport` 属性 ， `initial-scale` 设置为 0.5
- `rem` 按照设计稿标准⾛即可

### meta 相关

```html
<!DOCTYPE html>
<!--H5标准声明，使⽤ HTML5 doctype，不区分⼤⼩写-->
<head lang="”en”">
  <!--标准的 lang 属性写法-->
  <meta charset="’utf-8′" />
  <!--声明⽂档使⽤的字符编码-->
  <meta http-equiv="”X-UA-Compatible”" content="”IE" ="edge,chrome" ="1″" />
  <!--优先使用指定浏览器使用特定的文档模式-->
  <meta name="”description”" content="”不超过150个字符”" />
  <!--⻚⾯描述-->
  <meta name="”keywords”" content="””" />
  <!-- ⻚⾯关键词-->
  <meta name="”author”" content="”name," email@gmail.com” />
  <!--⽹⻚作者-->
  <meta name="”robots”" content="”index,follow”" />
  <!--搜索引擎抓取-->
  <meta
    name="”viewport”"
    content="”initial-scale"
    ="1,"
    maximum-scale="3,"
    minimum-sc
    <meta
    name="”apple-mobile-web-app-title”"
    content="”标题”"
  />
  <!--iOS 设备 begin-->
  <meta name="”apple-mobile-web-app-capable”" content="”yes”" />
  <!--添加到主屏后的标
    是否启⽤ WebApp 全屏模式，删除苹果默认的⼯具栏和菜单栏-->
  <meta name="”apple-mobile-web-app-status-bar-style”" content="”black”" />
  <meta name="”renderer”" content="”webkit”" />
  <!-- 启⽤360浏览器的极速模式(webkit)-->
  <meta http-equiv="”X-UA-Compatible”" content="”IE" ="edge”" />
  <!--避免IE使⽤兼容模式-->
  <meta http-equiv="”Cache-Control”" content="”no-siteapp”" />
  <!--不让百度转码-->
  <meta name="”HandheldFriendly”" content="”true”" />
  <!--针对⼿持设备优化，主要是针对一些老的不识别viewport的浏览器-->
  <meta name="”MobileOptimized”" content="”320″" />
  <!--微软的⽼式浏览器-->
  <meta name="”screen-orientation”" content="”portrait”" />
  <!--uc强制竖屏-->
  <meta name="”x5-orientation”" content="”portrait”" />
  <!--QQ强制竖屏-->
  <meta name="”full-screen”" content="”yes”" />
  <!--UC强制全屏-->
  <meta name="”x5-fullscreen”" content="”true”" />
  <!--QQ强制全屏-->
  <meta name="”browsermode”" content="”application”" />
  <!--UC应⽤模式-->
  <meta name="”x5-page-mode”" content="”app”" />
  <!-- QQ应⽤模式-->
  <meta name="”msapplication-tap-highlight”" content="”no”" />
  <!--windows phone
    设置⻚⾯不缓存-->
  <meta http-equiv="”pragma”" content="”no-cache”" />
  <meta http-equiv="”cache-control”" content="”no-cache”" />
  <meta http-equiv="”expires”" content="”0″" />
</head>
```

[了解更多参考：https://blog.csdn.net/kongjiea/article/details/17092413](https://blog.csdn.net/kongjiea/article/details/17092413)

### div+css 的布局较 table 布局有什么优点

- 改版的时候更⽅便 只要改 `css` ⽂件。
- ⻚⾯加载速度更快、结构化清晰、⻚⾯显示简洁。
- 表现与结构相分离。
- 易于优化`（ seo ）`搜索引擎更友好，排名更容易靠前。

### src 与 href 的区别

- `src` ⽤于替换当前元素，`href`⽤于在当前⽂档和引⽤资源之间确⽴联系。
- `src` 是 `source` 的缩写，指向外部资源的位置，指向的内容将会嵌⼊到⽂档中当前标签所在位置；在请求`src` 资源时会将其指向的资源下载并应⽤到⽂档内，例如 `js` 脚本，`img` 图⽚和 `frame` 等元素

> 当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执⾏完毕，图⽚和框架等元素也如此，类似于将所指向资源嵌⼊当前标签内。这也是为什么将 js 脚本放在底部⽽不是头部

- `href 是 Hypertext Reference` 的缩写，指向⽹络资源所在位置，建⽴和当前元素（锚点）或当前⽂档（链接）之间的链接，如果我们在⽂档中添加
- `link href="common.css" rel="stylesheet"` 那么浏览器会识别该⽂档为 `css` ⽂件，就会并⾏下载资源并且不会停⽌对当前⽂档的处理。这也是为什么建议使⽤ `link` ⽅式来加载 `css` ，⽽不是使⽤ `@import` ⽅式
