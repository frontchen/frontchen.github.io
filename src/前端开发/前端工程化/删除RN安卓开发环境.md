---
title: 删除RN安卓开发环境
tag: 前端工程化
date: 2021-07-23
category: 前端开发
---

# 删除 React Native Android 开发环境总结

============================

### 1、卸载 Android Studio，在终端(terminal)执行以下命令：

1.  rm -rf /Applications/Android\ Studio.app
2.  rm -rf ~/Library/Preferences/AndroidStudio\*
3.  rm -rf ~/Library/Preferences/com.google.android.studio.plist
4.  rm -rf ~/Library/Application\ Support/AndroidStudio\*
5.  rm -rf ~/Library/Logs/AndroidStudio\*
6.  rm -rf ~/Library/Caches/AndroidStudio\*

### 2、删除 Projects

1.  rm -Rf ~/AndroidStudioProjects

### 3、删除 gradle

1.  rm -Rf ~/.gradle

### 4、卸载 Android Virtual Devices(AVDs) and \*.keystore.

注意：如果有其他 IDE 需要用到，请不要删除

1.  rm -Rf ~/.android

### 5、删除 Android SDK Tools

注意：如果有其他 IDE 需要用到，请不要删除

rm -Rf ~/Library/Android\*

# 卸载 Java JDK

### 卸载步骤

#### 删除 java 文件

    sudo rm -fr /Library/Internet\ Plug-Ins/JavaAppletPlugin.plugin
    sudo rm -fr /Library/PreferencesPanes/JavaControlPanel.prefpane
    sudo rm -fr ~/Library/Application\ Support/Java

> 手动删除可能不成功,建议进目录查看,文件是否存在.

#### 删除 jdk

    #查找当前版本
    #输入：
    ls /Library/Java/JavaVirtualMachines/
    #输出：jdk-9.0.1.jdk
    sudo rm -rf /Library/Java/JavaVirtualMachines/jdk-9.0.1.jdk

### 安装

    brew tap caskroom/versions
    brew cask install java8   # 安装java8
    #brew cask install java  #默认安装最新版本

#### 配置 Java 环境变量

    # 1.定位JAVA_HOME位置
    /usr/libexec/java_home

    # 2.编辑profile文件
    vim ~/.bash_profile

    # 3.格式参考

    JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_152.jdk/Contents/Home
    PATH=$JAVA_HOME/bin:$PATH
    CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar

    # 4.执行生效
    source ~/.bash_profile

    # 5.检查是否成功
    echo $JAVA_HOME

### 警告(2019.4.17)

`brew`方法现在已经不能安装了.`oracle`的官网现在也下载不了(`java8`),提示你登录, 注册了账号, 搞半天登录不了. 老老实实的用百度云下载吧. 以下是下载地址,`java8 for mac` ,拿去不谢.  
[jdk-8u201-macosx-x64 .dmg](https://pan.baidu.com/s/15NmfrJrf8hErVmyBTVj7bg)

> 新环境 java12 ,项目折腾半天, 怀疑是 jdk 版本问题, 退回 java8
