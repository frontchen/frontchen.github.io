---
title: mac安装pod流程
tag: 前端工程化
date: 2021-02-23
category: 前端开发
---

## Homebrew 的安装方法

- 完全体 几分钟安装完成

```js
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

- 精简版

```js
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)" speed
```

- 卸载 brew

```js
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/HomebrewUninstall.sh)"
```

- 常见错误

```js
https://gitee.com/cunkai/HomebrewCN/blob/master/error.md
```

## Homebrew 安装完成之后，处理安装 Ruby 版本:

```js
brew install ruby
```

#### 安装完成后查看其 Ruby 源：

```js
gem sources -l
```

- 此时可能会出现错误：dyld: Library not loaded: /usr/local/opt/gmp/lib/libgmp.10.dylib

- 这里就要更新 Ruby 版本了：

```js
brew update && brew install gmp
```

- 如果显示的 ruby 源不是 ruby-china，则需要进行源替换：

```js
gem sources --add https://gems.ruby-china.com/ --remove https://rubygems.org/
```

## ruby 源正常， 安装 CocoaPods:

```js
brew install cocoapods
```

- 安装成功后进行 pod 设置：

```js
pod setup
```

- 执行完毕后， 查看 pod 版本看安装是否成功：

```js
pod --version
```

## CocoaPods 的使用

CocoaPods 安装成功后， 就可直接进行使用， 这里不做过多的赘述，直接写几个常用的命令：

```js
//cd 项目目录地址

// 创建 Podfile 文件
pod init

// 编辑
vim Podfile

// 安装
pod install

// 更新所有依赖的开源库
pod update
pod install --no-repo-update
pod update --no-repo-update

// 搜索框架
pod search 框架名
```

## 问题

```js
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun
```

xcode-Preferences-locations-CommandLineTools 选择 Xcode 版本
