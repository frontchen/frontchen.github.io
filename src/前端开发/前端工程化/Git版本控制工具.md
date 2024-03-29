---
title: Git版本控制工具
tag: 前端工程化
date: 2018-08-08
category: 前端开发
---

#### 第一次使用配置操作

git config user.name 你的目标用户名
git config user.email 你的目标邮箱名

使用--global 参数，配置全局的用户名和邮箱，只需要配置一次即可。
git config --global user.name hucc
git config --global user.email 111111@qq.com

    # 查看配置信息

    git config --list

    ls查询

###### git 用法方式主要有两种

    git gui即图形化界面的方式

    git bash 命令行的方式

    bash是许多linux系统默认的shell(命令行工具)。

    cmd和powershell是window系统默认的shell(命令行工具)。

    二者的功能都一样，通过命令行来操作计算机的功能。

##### 常见的 bash 命令 必须使用 linux 风格的 shell 来运行 git 命令

| 命令                      | 作用                                                         |
| ------------------------- | ------------------------------------------------------------ |
| pdw                       | 打印当前的路径                                               |
| ls                        | 展示当前目录的所有文件                                       |
| cd images                 | 进入 images 文件夹                                           |
| cd ..                     | #进入上一层目录                                              |
| cd ~                      | #进入用户根目录                                              |
| pwd                       | 打印当前目录的路径                                           |
| tab                       | 自动补全                                                     |
| ls -a                     | 展示全部内容，包括隐藏文件                                   |
| ls -l                     | 以列表的形式展示内容                                         |
| ls -al                    | 以列表的形式展示所有的内容，包括隐藏文件。                   |
| ls --help                 | 查看 ls 所有的参数。                                         |
| ls -l images              | 展示 images 目录下的文件，如果没有写目录，默认展示当前目录。 |
| clear                     | 清除屏幕内容，滚动条，保留了历史                             |
| reset                     | 重置 历史记录没了                                            |
| mkdir                     | 创建一个文件夹                                               |
| mkdir css                 | 创建一个 css 的文件夹                                        |
| mkdir img js css          | 创建了三个文件夹                                             |
| rmdir                     | 删除一个空的文件                                             |
| rmdir img                 | 删除 img 文件夹                                              |
| touch                     | 创建文件                                                     |
| rm                        | 删除一个文件或文件夹                                         |
| rm index.html             | 删除 index.html 文件                                         |
| rm js                     | 删除空的 js 文件夹                                           |
| rm -r css                 | 递归删除一个文件夹                                           |
| mv                        | 移动文件                                                     |
| mv index.html js          | 将 html 文件移动到 js 文件夹中                               |
| mv index.html index2.html | 将 index.html 重命名为 index2.html                           |
| cp                        | 复制文件                                                     |
| cp index.html index2.html | 复制 index.html，命名为 index2.html                          |
| cp -r css css02           | 如果复制的是文件夹，需要使用-r 参数                          |
| cat                       | 查看文件全部内容                                             |
| cat index.html            | 查看 index.html                                              |
| less                      | 查看文件部分内容                                             |
| less index.html           | 查看 index.html 部分内容                                     |
| q                         | 退出查看                                                     |

#### git 常用命令操作步骤

##### 1.初始化仓库 git init

##### 2.查看当前 git 仓库的状态 git status

    git stutus -s ：简化日志输出格式
    第一次提交显示提交的状态：已经添加，等待提交事务的文
    件(绿色字体表示)；已经改变但是没有添加(not staged)的文件(红色字体表示)；

##### 3.让 Git 追踪一个新的文件，并且将文件添加到 git 的暂存区，暂存文件 git add 文件名

    git add 文件名/目录名
    git add --all git all -A git all . 添加所有文件
    git add a.txt b.txt 同时添加两个文件
    git add *.js 添加当前目录下的所有js文件
    git add css/ 添加css目录下所有的文件

##### 4.将文件由暂存区提交到仓库区 git commit -m ‘提交说明’

##### 5.查看提交日志 git log

    git log ：只能查看当前head以及以前的日志

    git log --oneline 简洁的日志信息

    git reflog 查看所有的提交变更日志

##### 6.git reset --hard 版本号： 版本回退，将代码恢复到以及提交的某一个版本

##### 7.git checkout 文件名 ： 从暂存区恢复文件到工作区

##### 8.git 忽视文件

    在仓库中，有些文件是不想被git管理的，比如数据的配置密码、写代码的一些思路等。git可以通过配置从而达到忽视掉一些文件，这样这些文件就可以不用提交了。

    - 在仓库的根目录创建一个.gitignore的文件，文件名是固定的。
    - 将不需要被git管理的文件路径添加到.gitignore中

     idea.txt：忽视idea.txt文件

#### git 分支操作

##### 1.创建分支

    git branch分支名称 创建分支，分支中的代码，在创建时与当前分支的内容完全相同。

    git branch 可以查看所有的分支

##### 2.切换分支

    git checkout 分支名称切换分支
    切换分支，
    切换分支之前，必须保证代码已经提交了

##### 3.创建并切换分支

    git checkout -b分支名称

##### 4.合并分支

    git merge 分支名称
    将其他分支的内容合并到当前分支。

    在master分支中执行git merge dev

    将dev分支中的代码合并到master分支

##### 5.删除分支

    git branch -d分支名称
    可以删除分支

    注意：不能再当前分支删除当前分支，需要切换到其他分支才能删除

#### git 合并冲突

    对于同一个文件，如果有多个分支需要合并时，容易出现冲
    突
     合并分支时，如果出现冲突，只能手动处理，再次提交，一般的作法，把自己的代码放到冲突代码的后面即可。

### 远程仓库

#### 远程仓位相关命令

#### git push

    作用：将本地仓库中代码提交到远程仓库

    git push 仓库地址 master
    在代码提交到远程仓库，注意master必须写，不能省略

    如果第一次使用，需要填写github的用户名和密码

#### git pull

    作用：将远程的代码下载到本地

##### git pull 代码地址

将远程的代码中 master 分支下载到本地

通常在 push 前，需要先 pull 一次。

#### git clone

    作用：克隆远程仓库的代码到本地

##### git clone [远程仓库地址]

    git clone git://github.com/schacon/test
    .git会在本地新建一个test文件夹，在test中包含了一个
    .git目录，用于保存所有的版本记录，同时test文件中还有最新的代码，你可以直接进行后续的开发和使用。

    git克隆默认会使用远程仓库的项目名字，也可以自己指定。需要是使用以下命令：
    git clone [远程仓库地址] [本地项目名]

#### git remote

    给仓库地址设置一个别名

##### git remote add 仓库别名 仓库地址

    使用仓库别名替代仓库地址。仓库别名相当于一个js变量，仓库地址就是对应的值。

    git remote add hucc git@github.com:hucongcong/test
    .git 设置了一个hucc的仓库别名，
    以后push和pull都可以不用仓库地址，而用hucc

    git remote remove hucc 删除hucc这个仓库别名。

    git remote 查看所有的仓库别名

##### 如果使用了 git clone 命令从远程仓库获取下来的，那么这个本地仓库会自动添加一个 origin 的远程地址，指向的就是克隆的远程地址。

### SSH 免密码登陆

#### https 协议与 ssh 协议的区别：

    使用https协议，那么都需要输入用户名和密码进行身份的确
    认

    使用ssh协议，配置ssh免密码，可以做到免密码忘github推送代码

#### 在 bash 中依次输入以下命令：

1. 创建 SSH key：ssh-keygen -t rsa

2. 在文件路径 C:\用户\当前用户名\ 找到 .ssh 文件夹

3. 文件夹中有两个文件：

   - 私钥：id_rsa
   - 公钥：id_rsa.pub

4. 在 github -> settings -> SSH and GPG keys 页面中，新创建 SSH key，粘贴公钥 id_rsa.pub 内容到对应文本框中

5. 在 github 中新建仓库或者使用现在仓库，拿到git@github.com:用户名/仓库名.git

6. 此后，再次 SSH 方式与 github“通信”，不用输入密码确认身份了
