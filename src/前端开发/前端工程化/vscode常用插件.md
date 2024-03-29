---
title: vscode常用插件
tag: 前端工程化
date: 2018-08-23
category: 前端开发
---

### 必备插件

- 要用 Vue 高亮，搜 vue syntax HighLight
- eslint,beautify,以及针对具体框架 vue,react,angular 的插件
- wepy-beautify
- rc-beautify
- vetur
  语法高亮、智能感知、Emmet 等
- VueHelper
  snippet 代码片段
- Auto Close Tag : 匹配标签，关闭对应的标签。很实用【HTML/XML】
- Auto Rename Tag:sublime 和 webstorm 也有这个内置功能，改变标签的时候同时改动开闭合标签；【HTML/XML】
- Bootstrap 3 Sinnpet
  常用 bootstrap 的可以下
- beautify :良好的拓展性，可以格式化 JSON|JS|HTML|CSS|SCSS,比内置格式化好用
- Code Runner : 代码编译运行看结果，支持众多语言
- colorize : 会给颜色代码增加一个当前匹配代码颜色的背景，非常好
- Document This : JSDOC 注解调用，值得易用
- Git History : 不得不赞的插件，谁用谁知道，功能很赞
- HTML CSS Support : 这个也是必备插件之一
- Path Autocomplete : 路径智能补全
- Path Intellisense ： 路径智能提示.
- SCSS IntelliSense Preview : SCSS 智能提醒，配置强大
- Syncing: 这个同步插件要比官方市场那个最高下载量的要好，支持删除同步！！！
- Version Lens : 可以及时看到 package.json 内部版本的变动，很实用
- Output Colorizer : 可以终端日志输出着色，实用
- JavaScript (ES6) code snippets : ES6 的代码片段，实用
- JavaScript Snippet Pack : ES5 及以下的代码片段，实用
- Panda:用了相当久的一套颜色高亮，个人感觉很耐看
- Enki Theme (Material Design Inspired) : 当前用的代码高亮，个人感觉很赞
- Material Icon Theme : 一套扁平化的文件图标，内置的 seti 也很优秀，还有 simple icon 和 vscode-icons
- jQuery Code Snippets
  jquery 重度患者必须品
- vscode-icon
  让 vscode 资源树目录加上图标，必备良品！
- Bracket Pair Colorizer 让括号拥有独立的颜色，易于区分。可以配合任意主题使用。
- Turbo Console Log

### VScode 全局搜索功能

在配置文件添加：

```js
“search.exclude”: {
“system/”: true,
“!/system/*/.ps*”: true
}，
```

现在测试一下吧，
ctrl + shift +F，开始你的表演吧。

### 如何用 VSCode 愉快的写 Python

#### 搭建环境

- 在 VSCode 中搜索扩展 Python

### 基本操作

- 首先是 F1/Ctrl+Shit+P 万能键，谁用谁知道
- Ctrl+P：文件切换
- Ctrl+空格：自动提示
- F12/Ctrl+左键：跳转到定义
- Shift+F12：预览定义
- Ctrl+G：跳转行号
- Ctrl+/：注释切换
- Alt+↑↓：整行上下移动
- Ctrl+↑↓：编辑器垂直滚动条上下移动，光标不动
- Ctrl+Backspace/Delete：整词/连续空白删除
- Ctrl+→←：光标整词移动
- Ctrl+F 查找/Ctrl+Shift+F 在文件中查找，这都属于通用的，类似的就不说了啊。

### 调试操作

随时随地，F5 调试运行。注意，VSCode 默认在调试后，会停在第一句，

- F5：调试/继续，
- F10：单步跳过，
- F11：单步进入，
- Shift+F11：跳出。
- F9：切换断点

### 前端开发插件

<table class="d-block">
  <tbody class="d-block">
    <tr class="d-block">
      <td class="d-block comment-body markdown-body  js-comment-body">

<ul>
<li>相似功能的插件，不推荐全都装上，请挑选一个使用</li>
<li>本列表所有插件均已测试使用过，但不代表不存在问题</li>
<li>任何插件本身的问题，请到对于代码仓库提交issue</li>
</ul>
<h2>二、拓展</h2>
<table>
<thead>
<tr>
<th>名称</th>
<th>简述</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag" rel="nofollow">Auto Close Tag</a></td>
<td>自动闭合HTML标签</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=steoates.autoimport" rel="nofollow">Auto Import</a></td>
<td>import提示</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag" rel="nofollow">Auto Rename Tag</a></td>
<td>修改HTML标签时，自动修改匹配的标签</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel" rel="nofollow">Babel JavaScript</a></td>
<td>babel插件，语法高亮</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=waderyan.babelrc" rel="nofollow">Babelrc</a></td>
<td>.babelrc文件高亮提示</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=michelemelluso.code-beautifier" rel="nofollow">Beautify css/sass/scss/less</a></td>
<td>css/sass/less格式化</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=wwm.better-align" rel="nofollow">Better Align</a></td>
<td>对齐赋值符号和注释</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments" rel="nofollow">Better Comments</a></td>
<td>编写更加人性化的注释</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=alefragnani.Bookmarks" rel="nofollow">Bookmarks</a></td>
<td>添加行书签</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer" rel="nofollow">Bracket Pair Colorizer</a></td>
<td>用不同颜色高亮显示匹配的括号</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=akamud.vscode-caniuse" rel="nofollow">Can I Use</a></td>
<td>HTML5、CSS3、SVG的浏览器兼容性检查</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=patrys.vscode-code-outline" rel="nofollow">Code Outline</a></td>
<td>展示代码结构树</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=formulahendry.code-runner" rel="nofollow">Code Runner</a></td>
<td>运行选中代码段（支持多数语言）</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker" rel="nofollow">Code Spellchecker</a></td>
<td>单词拼写检查</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=SirTobi.code-bing" rel="nofollow">CodeBing</a></td>
<td>快速打开Bing并搜索，可配置搜索引擎</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=naumovs.color-highlight" rel="nofollow">Color Highlight</a></td>
<td>颜色值在代码中高亮显示</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=bierner.color-info" rel="nofollow">Color Info</a></td>
<td>小窗口显示颜色值，rgb,hsl,cmyk,hex等等</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=anseki.vscode-color" rel="nofollow">Color Picker</a></td>
<td>拾色器</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=paulmolluzzo.convert-css-in-js" rel="nofollow">CSS-in-JS</a></td>
<td>CSS-in-JS高亮提示和转换</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=deerawan.vscode-dash" rel="nofollow">Dash</a></td>
<td>集成Dash</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome" rel="nofollow">Debugger for Chrome</a></td>
<td>调试Chrome</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=joelday.docthis" rel="nofollow">Document This</a></td>
<td>注释文档生成</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv" rel="nofollow">DotENV</a></td>
<td>.env文件高亮</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig" rel="nofollow">EditorConfig for VS Code</a></td>
<td>EditorConfig插件</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=Perkovec.emoji" rel="nofollow">Emoji</a></td>
<td>在代码中输入emoji</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=c75.endy" rel="nofollow">endy</a></td>
<td>将输入光标跳转到当前行最后面</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint" rel="nofollow">ESLint</a></td>
<td>ESLint插件，高亮提示</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=abierbaum.vscode-file-peek" rel="nofollow">File Peek</a></td>
<td>根据路径字符串，快速定位到文件</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=mkxml.vscode-filesize" rel="nofollow">filesize</a></td>
<td>状态栏显示当前文件大小</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=mksafi.find-jump" rel="nofollow">Find-Jump</a></td>
<td>快速跳转到指定单词位置</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=medzhidov.font-awesome-codes-html" rel="nofollow">Font-awesome codes for html</a></td>
<td>FontAwesome提示代码段</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=lukasz-wronski.ftp-sync" rel="nofollow">ftp-sync</a></td>
<td>同步文件到ftp</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=waderyan.gitblame" rel="nofollow">Git Blame</a></td>
<td>在状态栏显示当前行的Git信息</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory" rel="nofollow">Git History(git log)</a></td>
<td>查看git log</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=codezombiech.gitignore" rel="nofollow">gitignore</a></td>
<td>.gitignore文件语法</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens" rel="nofollow">GitLens</a></td>
<td>显示文件最近的commit和作者，显示当前行commit信息</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=kumar-harsh.graphql-for-vscode" rel="nofollow">GraphQL for VSCode</a></td>
<td>graphql高亮和提示</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=spywhere.guides" rel="nofollow">Guides</a></td>
<td>高亮缩进基准线</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=tanato.vscode-gulp" rel="nofollow">Gulp Snippets</a></td>
<td>Gulp代码段</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion" rel="nofollow">HTML CSS Class Completion</a></td>
<td>CSS class提示</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=ecmel.vscode-html-css" rel="nofollow">HTML CSS Support</a></td>
<td>css提示（支持vue）</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=mkaufman.HTMLHint" rel="nofollow">HTMLHint</a></td>
<td>HTML格式提示</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=bradgashler.htmltagwrap" rel="nofollow">htmltagwrap</a></td>
<td>快捷包裹html标签</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=bradgashler.htmltagwrap" rel="nofollow">htmltagwrap</a></td>
<td>包裹HTML</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=varharrie.import-beautify" rel="nofollow">Import Beautify</a></td>
<td>import分组、排序、格式化</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost" rel="nofollow">Import Cost</a></td>
<td>行内显示导入（import/require）的包的大小</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=SirTori.indenticator" rel="nofollow">Indenticator</a></td>
<td>缩进高亮</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion" rel="nofollow">IntelliSense for css class names</a></td>
<td>css class输入提示</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets" rel="nofollow">JavaScript (ES6) code snippets</a></td>
<td>ES6语法代码段</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs" rel="nofollow">JavaScript Standard Style</a></td>
<td>Standard风格</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=cmstead.jsrefactor" rel="nofollow">JS Refactor</a></td>
<td>代码重构工具，提取函数、变量重命名等等</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=MariusAlchimavicius.json-to-ts" rel="nofollow">JSON to TS</a></td>
<td>JSON结构转化为typescript的interface</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=eriklynd.json-tools" rel="nofollow">JSON Tools</a></td>
<td>格式化和压缩JSON</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=wmaurer.vscode-jumpy" rel="nofollow">jumpy</a></td>
<td>快速跳转到指定单词位置</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=sysoev.language-stylus" rel="nofollow">language-stylus</a></td>
<td>Stylus语法高亮和提示</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-less" rel="nofollow">Less IntelliSense</a></td>
<td>less变量与混合提示</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=oysun.Lodash" rel="nofollow">Lodash</a></td>
<td>Lodash代码段</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=chrisvltn.log-wrapper-for-vscode" rel="nofollow">Log Wrapper</a></td>
<td>生产打印选中变量的代码</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint" rel="nofollow">markdownlint</a></td>
<td>Markdown格式提示</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=Alan.MochaSnippets" rel="nofollow">MochaSnippets</a></td>
<td>Mocha代码段</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=naumovs.node-modules-resolve" rel="nofollow">Node modules resolve</a></td>
<td>快速导航到Node模块</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=fknop.vscode-npm" rel="nofollow">npm</a></td>
<td>运行npm命令</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=christian-kohler.npm-intellisense" rel="nofollow">npm Intellisense</a></td>
<td>导入模块时，提示已安装模块名称</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=IBM.output-colorizer" rel="nofollow">Output Colorizer</a></td>
<td>彩色输出信息</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=ryu1kn.partial-diff" rel="nofollow">Partial Diff</a></td>
<td>对比两段代码或文件</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=ionutvmi.path-autocomplete" rel="nofollow">Path Autocomplete</a></td>
<td>路径完成提示</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense" rel="nofollow">Path Intellisense</a></td>
<td>另一个路径完成提示</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=pnp.polacode" rel="nofollow">Polacode</a></td>
<td>将代码生成图片</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=mrmlnc.vscode-postcss-sorting" rel="nofollow">PostCss Sorting</a></td>
<td>css排序</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode" rel="nofollow">Prettier - Code formatter</a></td>
<td>prettier官方插件</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=mohsen1.prettify-json" rel="nofollow">Prettify JSON</a></td>
<td>格式化JSON</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=alefragnani.project-manager" rel="nofollow">Project Manager</a></td>
<td>快速切换项目</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode" rel="nofollow">Quokka.js</a></td>
<td>不需要手动运行，行内显示变量结果</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=Orta.vscode-react-native-storybooks" rel="nofollow">React Native Storybooks</a></td>
<td>storybook预览插件，支持react</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=wmira.react-playground-vscode" rel="nofollow">React Playground</a></td>
<td>为编辑器提供一个react组件运行环境，方便调试</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=TimonVS.ReactSnippetsStandard" rel="nofollow">React Standard Style code snippets</a></td>
<td>react standar风格代码块</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=humao.rest-client" rel="nofollow">REST Client</a></td>
<td>发送REST风格的HTTP请求</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=robinbentley.sass-indented" rel="nofollow">Sass</a></td>
<td>sass插件</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync" rel="nofollow">Settings Sync</a></td>
<td>VSCode设置同步到Gist</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=Tyriar.sort-lines" rel="nofollow">Sort lines</a></td>
<td>排序选中行</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=miclo.sort-typescript-imports" rel="nofollow">Sort Typescript Imports</a></td>
<td>typescript的import排序</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=marclipovsky.string-manipulation" rel="nofollow">String Manipulation</a></td>
<td>字符串转换处理（驼峰、大写开头、下划线等等）</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=shinnn.stylelint" rel="nofollow">stylelint</a></td>
<td>css/sass/less代码风格</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=cssho.vscode-svgviewer" rel="nofollow">SVG Viewer</a></td>
<td>SVG查看器</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=nonoroazoro.syncing" rel="nofollow">Syncing</a></td>
<td>vscode设置同步到gist</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=rintoj.chai-spec-generator" rel="nofollow">Test Spec Generator</a></td>
<td>测试用例生成（支持chai、should、jasmine）</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=minhthai.vscode-todo-parser" rel="nofollow">TODO Parser</a></td>
<td>Todo管理</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=ipatalas.vscode-postfix-ts" rel="nofollow">TS/JS postfix completion</a></td>
<td>ts/js后缀提示</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=eg2.tslint" rel="nofollow">TSLint</a></td>
<td>TypeScript语法检查</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=jvitor83.types-autoinstaller" rel="nofollow">Types auto installer</a></td>
<td>自动安装<a class="user-mention" href="https://github.com/types">@types</a>声明依赖</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=rbbit.typescript-hero" rel="nofollow">TypeScript Hero</a></td>
<td>TypeScript辅助插件，管理import、outline等等</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=kevinmcgowan.TypeScriptImport" rel="nofollow">TypeScript Import</a></td>
<td>TS自动import</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=mike-co.import-sorter" rel="nofollow">TypeScript Import Sorter</a></td>
<td>import整理排序</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=infeng.vscode-react-typescript" rel="nofollow">Typescript React code snippets</a></td>
<td>React Typescript代码段</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=lucasschejtman.vscode-typesearch" rel="nofollow">TypeSearch</a></td>
<td>TS声明文件搜索</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=pflannery.vscode-versionlens" rel="nofollow">Version Lens</a></td>
<td>package.json文件显示模块当前版本和最新版本</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=octref.vetur" rel="nofollow">vetur</a></td>
<td>目前比较好的Vue语法高亮</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=dkundel.vscode-npm-source" rel="nofollow">View Node Package</a></td>
<td>快速打开选中模块的主页和代码仓库</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=ms-vsliveshare.vsliveshare" rel="nofollow">VS Live Share</a></td>
<td>实时多人协助</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=emmanuelbeziat.vscode-great-icons" rel="nofollow">VSCode Great Icons</a></td>
<td>文件图标拓展</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=bajdzis.vscode-database" rel="nofollow">vscode-database</a></td>
<td>操作数据库，支持mysql和postgres</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-icons" rel="nofollow">vscode-icons</a></td>
<td>文件图标，方便定位文件</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=jrebocho.vscode-random" rel="nofollow">vscode-random</a></td>
<td>随机字符串生成器</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=shyykoserhiy.vscode-spotify" rel="nofollow">vscode-spotify</a></td>
<td>集成spotify，播放音乐</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=jpoissonnier.vscode-styled-components" rel="nofollow">vscode-styled-components</a></td>
<td>styled-components高亮支持</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=blanu.vscode-styled-jsx" rel="nofollow">vscode-styled-jsx</a></td>
<td>styled-jsx高亮支持</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=ducksoupdev.Vue2" rel="nofollow">Vue TypeScript Snippets</a></td>
<td>Vue Typescript代码段</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=oysun.vuehelper" rel="nofollow">VueHelper</a></td>
<td>Vue2代码段（包括Vue2 api、vue-router2、vuex2）</td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=WallabyJs.wallaby-vscode" rel="nofollow">Wallaby.js</a></td>
<td>实时测试插件</td>
</tr></tbody></table>
<h2>三、主题</h2>
<table>
<thead>
<tr>
<th>名称</th>
<th>预览</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=akamud.vscode-theme-onelight" rel="nofollow">Atom One Light Theme</a></td>
<td><a target="_blank" rel="noopener noreferrer" href="https://raw.githubusercontent.com/akamud/vscode-theme-onelight/master/screenshots/preview.png"><img src="https://raw.githubusercontent.com/akamud/vscode-theme-onelight/master/screenshots/preview.png" alt="Atom One Light Theme" style="max-width:100%;"></a></td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=uloco.theme-bluloco-dark" rel="nofollow">bluloco-dark</a></td>
<td><a target="_blank" rel="noopener noreferrer" href="https://raw.githubusercontent.com/uloco/theme-bluloco-dark/master/screenshots/ts.png"><img src="https://raw.githubusercontent.com/uloco/theme-bluloco-dark/master/screenshots/ts.png" alt="bluloco-dark" style="max-width:100%;"></a></td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=uloco.theme-bluloco-light" rel="nofollow">bluloco-light</a></td>
<td><a target="_blank" rel="noopener noreferrer" href="https://raw.githubusercontent.com/uloco/theme-bluloco-light/master/screenshots/js.png"><img src="https://raw.githubusercontent.com/uloco/theme-bluloco-light/master/screenshots/js.png" alt="bluloco-light" style="max-width:100%;"></a></td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=dorelljames.enki-theme-vscode" rel="nofollow">Enki Theme</a></td>
<td><a target="_blank" rel="noopener noreferrer" href="https://raw.githubusercontent.com/dorelljames/enki-theme-vscode/master/static/images/react.png"><img src="https://raw.githubusercontent.com/dorelljames/enki-theme-vscode/master/static/images/react.png" alt="Enki Theme" style="max-width:100%;"></a></td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=eppz.eppz-code" rel="nofollow">eppz! (C# theme for Unity)</a></td>
<td><a target="_blank" rel="noopener noreferrer" href="https://github.com/eppz/VSCode.Extension.eppz_Code/raw/master/images/eppz-Code_3_727px.png"><img src="https://github.com/eppz/VSCode.Extension.eppz_Code/raw/master/images/eppz-Code_3_727px.png" alt="eppz! (C# theme for Unity)" style="max-width:100%;"></a></td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=fisheva.eva-theme" rel="nofollow">Eva Theme</a></td>
<td><a target="_blank" rel="noopener noreferrer" href="https://github.com/fisheva/Static/blob/master/Eva-Theme/Screenshot/Eva-Dark5.png?raw=true"><img src="https://github.com/fisheva/Static/blob/master/Eva-Theme/Screenshot/Eva-Dark5.png?raw=true" alt="Eva Theme" style="max-width:100%;"></a></td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=lkytal.FlatUI" rel="nofollow">Flat UI</a></td>
<td><a target="_blank" rel="noopener noreferrer" href="https://github.com/lkytal/vscode-theme-flatui/raw/master/images/preview.png"><img src="https://github.com/lkytal/vscode-theme-flatui/raw/master/images/preview.png" alt="Flat UI" style="max-width:100%;"></a></td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=monokai.theme-monokai-pro-vscode" rel="nofollow">Monokai Pro</a></td>
<td><a target="_blank" rel="noopener noreferrer" href="https://raw.githubusercontent.com/Monokai/monokai-pro-vscode/master/img/monokai-pro.png"><img src="https://raw.githubusercontent.com/Monokai/monokai-pro-vscode/master/img/monokai-pro.png" alt="Monokai Pro" style="max-width:100%;"></a></td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=taniarascia.new-moon-vscode" rel="nofollow">New Moon VSCode</a></td>
<td><a target="_blank" rel="noopener noreferrer" href="https://raw.githubusercontent.com/taniarascia/new-moon/master/images/screenshot.png"><img src="https://raw.githubusercontent.com/taniarascia/new-moon/master/images/screenshot.png" alt="New Moon VSCode" style="max-width:100%;"></a></td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme" rel="nofollow">One Dark Pro</a></td>
<td><a target="_blank" rel="noopener noreferrer" href="https://raw.githubusercontent.com/Binaryify/OneDark-Pro/master/static/screenshot1.png"><img src="https://raw.githubusercontent.com/Binaryify/OneDark-Pro/master/static/screenshot1.png" alt="One Dark Pro" style="max-width:100%;"></a></td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=will-stone.plastic" rel="nofollow">Plastic</a></td>
<td><a target="_blank" rel="noopener noreferrer" href="https://raw.githubusercontent.com/will-stone/plastic/master/docs/screenshot-min.png"><img src="https://raw.githubusercontent.com/will-stone/plastic/master/docs/screenshot-min.png" alt="Plastic" style="max-width:100%;"></a></td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=ionutvmi.spacegray-vscode" rel="nofollow">spacegray-vscode</a></td>
<td><a target="_blank" rel="noopener noreferrer" href="https://raw.githubusercontent.com/ionutvmi/spacegray-vscode/master/screenshots/eighties.png"><img src="https://raw.githubusercontent.com/ionutvmi/spacegray-vscode/master/screenshots/eighties.png" alt="spacegray-vscode" style="max-width:100%;"></a></td>
</tr>
<tr>
<td><a href="https://marketplace.visualstudio.com/items?itemName=zrachod.splus-theme" rel="nofollow">Splus</a></td>
<td><a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/ddce1554886df3577f5f090638335e71da1d9f60/68747470733a2f2f692e696d6775722e636f6d2f444861777671782e706e67"><img src="https://camo.githubusercontent.com/ddce1554886df3577f5f090638335e71da1d9f60/68747470733a2f2f692e696d6775722e636f6d2f444861777671782e706e67" alt="Splus" data-canonical-src="https://i.imgur.com/DHawvqx.png" style="max-width:100%;"></a></td>
</tr></tbody></table>
<h2>四、个人首选项配置（仅供参考）</h2>
<div class="highlight highlight-source-json"><pre>{
  <span class="pl-s"><span class="pl-pds">"</span>breadcrumbs.enabled<span class="pl-pds">"</span></span>: <span class="pl-c1">true</span>,
  <span class="pl-s"><span class="pl-pds">"</span>editor.tabSize<span class="pl-pds">"</span></span>: <span class="pl-c1">2</span>,
  <span class="pl-s"><span class="pl-pds">"</span>editor.renderWhitespace<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>boundary<span class="pl-pds">"</span></span>,
  <span class="pl-s"><span class="pl-pds">"</span>editor.cursorBlinking<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>smooth<span class="pl-pds">"</span></span>,
  <span class="pl-s"><span class="pl-pds">"</span>editor.minimap.renderCharacters<span class="pl-pds">"</span></span>: <span class="pl-c1">false</span>,
  <span class="pl-s"><span class="pl-pds">"</span>editor.fontFamily<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>'Fira Code', 'Droid Sans Mono', 'Courier New', monospace, 'Droid Sans Fallback'<span class="pl-pds">"</span></span>,
  <span class="pl-s"><span class="pl-pds">"</span>editor.fontLigatures<span class="pl-pds">"</span></span>: <span class="pl-c1">true</span>,
  <span class="pl-s"><span class="pl-pds">"</span>explorer.confirmDragAndDrop<span class="pl-pds">"</span></span>: <span class="pl-c1">false</span>,
  <span class="pl-s"><span class="pl-pds">"</span>extensions.autoUpdate<span class="pl-pds">"</span></span>: <span class="pl-c1">false</span>,
  <span class="pl-s"><span class="pl-pds">"</span>files.insertFinalNewline<span class="pl-pds">"</span></span>: <span class="pl-c1">true</span>,
  <span class="pl-s"><span class="pl-pds">"</span>git.autofetch<span class="pl-pds">"</span></span>: <span class="pl-c1">true</span>,
  <span class="pl-s"><span class="pl-pds">"</span>git.path<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>F:<span class="pl-cce">\\</span>Program Files<span class="pl-cce">\\</span>Git<span class="pl-cce">\\</span>cmd<span class="pl-cce">\\</span>git.exe<span class="pl-pds">"</span></span>,
  <span class="pl-s"><span class="pl-pds">"</span>search.exclude<span class="pl-pds">"</span></span>: {
    <span class="pl-s"><span class="pl-pds">"</span>**/node_modules<span class="pl-pds">"</span></span>: <span class="pl-c1">true</span>,
    <span class="pl-s"><span class="pl-pds">"</span>**/dist<span class="pl-pds">"</span></span>: <span class="pl-c1">true</span>
  },
  <span class="pl-s"><span class="pl-pds">"</span>typescript.locale<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>en<span class="pl-pds">"</span></span>,
  <span class="pl-s"><span class="pl-pds">"</span>window.titleBarStyle<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>custom<span class="pl-pds">"</span></span>,
  <span class="pl-s"><span class="pl-pds">"</span>window.title<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>${dirty}${activeEditorMedium}${separator}${rootName}<span class="pl-pds">"</span></span>,
  <span class="pl-s"><span class="pl-pds">"</span>window.zoomLevel<span class="pl-pds">"</span></span>: <span class="pl-c1">1</span>,
  <span class="pl-s"><span class="pl-pds">"</span>workbench.activityBar.visible<span class="pl-pds">"</span></span>: <span class="pl-c1">true</span>,
  <span class="pl-s"><span class="pl-pds">"</span>workbench.colorTheme<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>Plastic - deprioritised punctuation<span class="pl-pds">"</span></span>,
  <span class="pl-s"><span class="pl-pds">"</span>workbench.iconTheme<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>vscode-great-icons<span class="pl-pds">"</span></span>,
  <span class="pl-s"><span class="pl-pds">"</span>workbench.startupEditor<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>newUntitledFile<span class="pl-pds">"</span></span>,
  <span class="pl-s"><span class="pl-pds">"</span>eslint.autoFixOnSave<span class="pl-pds">"</span></span>: <span class="pl-c1">true</span>,
  <span class="pl-s"><span class="pl-pds">"</span>eslint.validate<span class="pl-pds">"</span></span>: [<span class="pl-s"><span class="pl-pds">"</span>javascript<span class="pl-pds">"</span></span>, <span class="pl-s"><span class="pl-pds">"</span>javascriptreact<span class="pl-pds">"</span></span>, <span class="pl-s"><span class="pl-pds">"</span>vue<span class="pl-pds">"</span></span>],
  <span class="pl-s"><span class="pl-pds">"</span>vsicons.projectDetection.autoReload<span class="pl-pds">"</span></span>: <span class="pl-c1">true</span>,
  <span class="pl-s"><span class="pl-pds">"</span>vsicons.dontShowNewVersionMessage<span class="pl-pds">"</span></span>: <span class="pl-c1">true</span>,
  <span class="pl-s"><span class="pl-pds">"</span>tslint.autoFixOnSave<span class="pl-pds">"</span></span>: <span class="pl-c1">true</span>,
  <span class="pl-s"><span class="pl-pds">"</span>debugwrapper.wrappers<span class="pl-pds">"</span></span>: {
    <span class="pl-s"><span class="pl-pds">"</span>default<span class="pl-pds">"</span></span>: <span class="pl-s"><span class="pl-pds">"</span>console.log('$eSEL', $SEL)<span class="pl-pds">"</span></span>
  },
  <span class="pl-s"><span class="pl-pds">"</span>prettier.tslintIntegration<span class="pl-pds">"</span></span>: <span class="pl-c1">true</span>,
  <span class="pl-s"><span class="pl-pds">"</span>cSpell.userWords<span class="pl-pds">"</span></span>: [
    <span class="pl-s"><span class="pl-pds">"</span>Unmount<span class="pl-pds">"</span></span>
  ],
  <span class="pl-s"><span class="pl-pds">"</span>jest.autoEnable<span class="pl-pds">"</span></span>: <span class="pl-c1">false</span>,
}</pre></div>
      </td>
    </tr>
  </tbody>
</table>

### vscode 保存自动 格式化 eslint 代码

- npm install -g eslint
- 增加设置

```json
{
  "editor.wordWrap": "on",
  "editor.fontSize": 16,
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "prettier.semi": false,
  "eslint.autoFixOnSave": true,
  "prettier.singleQuote": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "html",
    {
      "language": "html",
      "autoFix": true
    },
    {
      "language": "vue",
      "autoFix": true
    }
  ],
  "vetur.format.options.tabSize": 2,
  "vetur.format.options.useTabs": true,
  "vetur.validation.template": false,
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.format.defaultFormatterOptions": {
    "prettier": {
      "semi": false,
      "singleQuote": true
    },
    "js-beautify-html": {
      "wrap_attributes": "auto"
    }
  },
  "files.autoSave": "onFocusChange",
  "git.ignoreMissingGitWarning": true,
  "window.zoomLevel": 1,
  "terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "javascript.updateImportsOnFileMove.enabled": "always"
  // "window.zoomLevel": 0,
  // "git.ignoreMissingGitWarning": true
}
```
