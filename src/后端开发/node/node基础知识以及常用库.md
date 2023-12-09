---
title: node基础知识以及常用库
tag:
  - npm
  - yarn
  - commonJs
  - nrm
  - nvm
  - node
category: node技术栈
order: 1
---

## node.js 介绍

一个基于 `Chrome v8` 引擎的 `Javascript` 运行时(代码的运行环境)环境

### chrome v8 引擎

- `chrome `是一个浏览器，它可以执行 `js` 代码
- `V8` 就是 `chrome` 的 `js `引擎，以速度著称
- `nodejs` 也是基于 `js` 语法的，因此也可以借用 `∨8` 引擎

## nvm

`nvm` 是 `node.js` 的版本管理工具

::: warning 注意
当在 `arm`架构下的 `macos` 上，通过 `nvm` 安装 `v16` 以下版本 `node` 时,必须在 `Rosetta 2`的模式下打开终端，再执行安装命令
:::

建议使用 `homebrew`，安装`nvm`:

第一步：`brew install nvm`

第二步：`touch .zshrc`,写入：

```bash
export NVM_DIR="$HOME/.nvm"
  [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && . "/opt/homebrew/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && . "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion
export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node/
```

第三步：`source .zshrc`

接下来就可以使用 `nvm `指令安装 `node`

常用命令:

```bash
nvm install xxx
nvm uninstall xxx
nvm alias default xxx //设置新终端的默认node版本
nvm ls  // 列出已安装的版本
```

### 安装低版本 node

如何[安装低版本 node](https://blog.csdn.net/longgege001/article/details/114067242)

在 `Rosetta `的模式下打开终端，再执行`nvm`安装命令

### mac 无法安装 node-sass 的解决办法

这个问题是当前 `node` 版本太高，而 `node-sass` 并不支持 `arm` 架构导致

1. 安装低版本 `node`（如 12.16.1)
2. `npm` 配置文件写入,设置淘宝镜像

```shell
sass_binary_site=https://npmmirror.com/mirrors/node-sass/
```

## npm

::: warning 注意

[package.json 中的版本和 package-lock.json 的作用](https://blog.csdn.net/u014607184/article/details/104395593)

```js
"dependencies": {
    "react": "^16.8.0"
    "react": "~16.8.0",
    "react": "16.8.0",
  },
```

三种方式的区分在于，项目通过 npm install 重新下载依赖包时，对于所下载的版本号的区别：

- ^16.8.0’ 表示安装 16.x.x 的最新版本，安装时不改变大版本号。
- ‘~16.8.0’ 表示安装 16.8.x 的最新版本，安装时不改变大版本号和次要版本号。
- ‘16.8.0’ 表示安装指定的版本号，也就是安装 16.8.0 版本。

:::

`npm` 是 `node.js` 的软件包管理器

### npm 的常用命令

- 安装所有依赖：`npm install`
- 查看全局的包：`npm list -g --depth 0`
- 查看全局包的安装位置：`npm root -g`
- 查看 bin 目录位置:`npm bin -g`
- 安装全局的包：`npm installl -g`
- 安装生产依赖：`npm intall module_name`
- 安装开发依赖： `npm install module_name -D`
- 移除依赖：`npm uninstall module_name`,全局加上`-g`
- 设置淘宝镜像源：npm config set registry=https://registry.npmmirror.com

## nrm

nrm 是 npm 的源管理工具

安装：`npm install -g @adams549659584/nrm`

Mac M1 芯片电脑可能无法正确获取当前正在使用的源使用此包可解决问题,解决方法来自抖音前端博主：[后盾人](https://www.douyin.com/user/MS4wLjABAAAAz0TXiTnI3HAmxDEfBrHItlViAwC6rsxJL6_GIHFA2Ho)，感谢！

### 常用命令

- nrm ls:显示源列表
- nrm test：测试延迟
- nrm use xxxx:使用 xxxx 源

## Yarn

**`Yarn` 也是 `node` 包管理工具**

`React` 脚手架默认使用 `yarn`

使用 `homebrew`安装：`brew install yarn`

yarn 的镜像设置默认使用`.npmrc` 中的设置，无需单独配置

### Yarn 的一些常用命令

:::warning macOS:yarn 安装全局包后找不到命令的问题
将

```bash
export PATH="$PATH:`yarn global bin`"
```

添加到.zshrc 中

:::

- 安装所有依赖：`yarn`
- 查看全局的包：`yarn global list`
- 查看全局包的安装位置：`yarn global dir`
- 查看 bin 目录位置:`yarn global bin`
- 安装全局的包:`yarn global add <packageName>`
- 安装生产依赖：`yarn add <packageName>`
- 安装开发依赖： `yarn add <packageName> -D`
- 移除依赖：`yarn <global> remove <packageName>`

## common.js 模块化

### commonjs 语法介绍

- `module.exports` 导出
- `require`(…)导入
- 主要用于 `node.js` 开发

### 实例

#### index.js

```js
const { add, message } = require('./tool')

add(1, 2)
message()

// node index.js
```

#### tool.js

```js
function add(a, b) {
  console.log(a + b)
}
function message() {
  console.log('common.js')
}

module.exports = {
  add,
  message,
}
```

### commonjs 和 ES6 Module 的区别

- `commonJs` 是执行时引入 ，动态的,**程序执行到 `require `才会引入**
- `ES6 Module `是打包时引入，静态的,**代码执行之前就要把所有东西引入进来**
