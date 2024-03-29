---
title: 阿里云linux服务器安装桌面
tag: 前端工程化
date: 2018-08-08
category: 前端开发
---

#### CentOS 7 系统下，本文以 MATE 桌面环境安装进行安装配置说明：

- **1.登录服务器，执行如下指令安装桌面环境：**

先安装 MATE Desktop

yum groups install “MATE Desktop”

命令输入之后，会列出一大堆文字的，然后显示这个 y/d/n，输入 y，按回车下载安装；
安装完成，显示下面图片 complete

安装好 MATE Desktop 后，再安装 X Window System。

yum groups install “X Window System”
命令输入之后，会列出一大堆文字的，然后显示这个 y/d/n，输入 y，按回车下载安装；

安装完成

- **2.设置默认通过桌面环境启动服务器：**
  systemctl set-default graphical.target

systemctl set-default multi-user.target //设置成命令模式

systemctl set-default graphical.target //设置成图形模式

安装完成后，通过 reboot 等指令重启服务器，或者在 ECS 服务器控制台重启服务器。
选择第一个，按回车

- **3.通过 管理终端 连接服务器，验证测试安装情况。在 ECS 控制台，用管理终端登录服务器，查看安装好的桌面**

默认的 KDE 为英文界面，可以使用这条命令 安装中文环境。

```

sudo apt-get install language-pack-kde-zh language-pack-kde-zh-base language-pack-zh language-pack-zh-base language-support-zh
```

#### yummain.py install yum 不能运行的原因 yummain.py not found

- 1. wget http://yum.baseurl.org/download/3.2/yum-3.2.28.tar.gz
- 2. tar xvf yum-3.2.28.tar.gz
- 3. touch /etc/yum.conf
- 4. cd yum-3.2.28
- 5. ./yummain.py install yum

#### 配置服务器环境

- **1.在阿里云管理控制台把云服务器实例启动**
- **2.登入服务器：用 Putty 或 Xshell（我使用的是 xshell）：**
- **3.把 yum 更新到最新版本：**

```js
yum -y update
```

- **4.我们将使用最新源代码构建 Node.js，要进行软件的安装，需要一组用来编译源代码的开发工具：**

```js
yum -y groupinstall "Development Tools"
```

#### 安装 node.js

- **1.开始安装 Node.js，先进入/usr/src 文件夹，这个文件夹通常用来存放软件源代码:**

cd /usr/src

- **2.从 Node.js 的站点 中获取压缩档源代码, 我选择的版本为 v0.10.18：**

```js
wget http://nodejs.org/dist/v0.10.18/node-v0.10.18.tar.gz
```

- **3.解压缩源文件，并且进入到压缩后的文件夹中:**

```js
tar zxf node-v0.10.18.tar.gz
cd node-v0.10.18
```

- **4.执行配置脚本来进行编译预处理:**

```
./configure
```

- **5.开始编译源代码 make**
- **6.当编译完成后，我们需要使之在系统范围内可用, 编译后的二进制文件将被放置到系统路径，默认情况下，Node 二进制文件应该放在/user/local/bin/node 文件夹下:**

```js
make install
```

- **7.现在已经安装了 Node.js, 可以开始部署应用程序, 首先要使用 Node.js 的模块管理器 npm 安装 Express middleware 和 forever（一个用来确保应用程序启动并且在需要时重启的非常有用的模块）：**

```js
npm -g install express forever
```

- **8.建立超级链接, 不然 sudo node 时会报 "command not found"**

```js
sudo ln -s /usr/local/bin/node /usr/bin/node
sudo ln -s /usr/local/lib/node /usr/lib/node
sudo ln -s /usr/local/bin/npm /usr/bin/npm
sudo ln -s /usr/local/bin/node-waf /usr/bin/node-waf
sudo ln -s /usr/local/bin/forever /usr/bin/forever

```
