---
title: tff字体图标文件恢复iconfont项目
tag:
  - 项目总结
date: 2023-11-14
category:
  - 开发日志
---

最近工作中遇到一个问题，图标 SVG 文件丢失，只有字体目录下面存在.ttf 文件，如果用新的.tff 文件覆盖旧的，肯定会导致图标丢失，经过一段时间的折腾，记录一下处理方式，顺便也能帮助一下，和我遇到同样问题的人。

## 第一步，将.ttf 文件转成.svg

https://www.aconvert.com/cn/image/ttf-to-svg/

## 第二步，将.svg 文件汇入

https://icomoon.io/app/#/select/

![在线转换步骤](https://upload-images.jianshu.io/upload_images/23720891-4061529567a928cb.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

## 第三步 选中你需要下载的 ICON，点击第一个按钮下载

![](https://upload-images.jianshu.io/upload_images/21347257-aecb4d05043f7cd8.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

## 第四步 加压缩下载文件，目录下面 SVG 文件夹

![在线转换步骤](https://upload-images.jianshu.io/upload_images/23720891-22209af48cd148b3.png?imageMogr2/auto-orient/strip|imageView2/2/w/251/format/webp)

## 第五步 全选汇入 SVG 文件到 iconfont.cn

![](https://upload-images.jianshu.io/upload_images/21347257-c131a61af413c0a8.png?imageMogr2/auto-orient/strip|imageView2/2/w/1047/format/webp)

## 到此完成
