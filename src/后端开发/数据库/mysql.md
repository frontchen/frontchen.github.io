---
title: mysql
tag:
  - mysql
category: 数据库
---

#### 一、mysql 服务的启动和停止

```sql
net stop mysql

net start mysql
```

#### 二、登陆 mysql

```sql
mysql -h 服务器地址 -P 端口号 -u 用户名 - p 密码

-h 是服务器地址，可以是 localhost 也可以是 ip，如果默认的就是本机，那么-h 也可以省略
-P 端口号，MySQL 默认的端口号是 3306，如果你的 MySQL 使用的是默认的端口号，那么-P 可以省略
-u 用户名
-p 密码
```

#### 三、增加新用户

> mysql> 格式：grant 权限 on 数据库.\* to 用户名@登录主机 identified by "密码"

```sql
--如，增加一个用户 user1 密码为 password1，让其可以在本机上登录， 并对所有数? 据库有查询、插入、修改、删除的权限。首先用以 root 用户连入 mysql，然后键入以下命令：
grant select,insert,update,delete on _._ to user1@localhost Identified by "password1";
--如果希望该用户能够在任何机器上登陆 mysql，则将 localhost 改为"%"。

--如果你不想 user1 有密码，可以再打一个命令将密码去掉。
grant select,insert,update,delete on mydb.\* to user1@localhost identified by "";
```

#### 四： 操作数据库及常见错误

> mysql> 登录到 mysql 中，然后在 mysql 的提示符下运行下列命令，每个命令以分号结束。

1、 显示数据库列表。

```sql
show databases;

--缺省有两个数据库：mysql 和 test。 mysql 库存放着 mysql 的系统和用户权限信息，我们改密码和新增用户，实际上就是对这个库进行操作。
```

2、 插入数据错误提示：

```sql
You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ':05:23)' at line

--数据不合法

Unknown column 'time' in 'field list'

--看看是不是字段名输入错误
```

3、 显示数据表的结构：

```sql
describe 表名;

desc 表名;
```

4、 建库与删库：

```sql
--建库
create database 库名;
-- 我们可以在创建的时候判断是否已经存在，如果不存在就创建，如果存在就不操作，
create database if not exists day04
--删库
drop database 库名;
```

4.1 创建数据库的时候需要注意的点

- 第一：数据库名字不能是纯数字
- 第二：数据库名字不能超过 64 个字符
- 第三：数据库的名字不能是系统关键字，如果是系统关键字需要有反引号括起来``，用反引号包起来

  4.2 数据库的修改 （MySQL 不支持修改数据库的名字）

```sql
-- 对数据库字符集的修改
Alter database 数据库名 charset 新字符集
Alter database 数据库名 charset=新字符集
Alter database 数据库名 default character set 新字符集
```

5、 建表：

```sql
use 库名;


-- 创建数据表
Create table 表名
(
字段名 类型  [字段属性],
字段名 类型  [字段属性],
字段名 类型  [字段属性]   --  最后一个字段后边不加逗号,
)[表属性]charset=utf8；
数据类型
-- 显示所有数据表
show tables；
-- 查看数据表的创建语句
show create table 表名；
-- 删除数据表
drop table 表名；
-- 删除多张数据表：
drop table 表名1，表名2，表名3；

-- 如果你不知道当前要删除的数据表是否存在，可以在删除的时候判断当前的数据表是否存在，
-- 如果存在就删除，如果不存在也不报错
drop table if not exists 表名；

```

6、 清空表中记录：

```sql
delete from 表名;
```

7、 显示表中的记录：

```sql
select \* from 表名
```

6.数据的操作

6.1 添加数据--insert 语句基本使用

```sql
insert [into] 表名  [(字段列表)] values (值列表), (值列表), (值列表)
……;  多行插入
insert 表名 set  字段1=值1，字段2=值2…；  set方式插入
insert [into] 表名 values (值列表)//单行插入
insert into tb_news(id,title,author)value(null,'标题','admin');
-- 也可以：
insert into tb_news values(null,'','adimin');
```

> 注意，字段值得顺序一定要和字段名保持一致

- 单行插入方式 Set 方式插入

- 多行插入方式（使用的比较多）

  6.2 数据查找

查找使用的频率是最高的 也是最复杂的，

```sql
desc tb_news; //查看数据表的结构；
```

> 基本语句:Select 查找的字段(\* 代表所有的字段) from 表名 这一行是查询语句必须要有的

![Where 查询条件]
![Group by 分组]
![Having 分组过滤条件]
![Order by asc|desc 排序，正序|逆序]
![Limit 限定查询的条数]

别名，我们查询查来的字段，还可以重新名一个名字 使用关键字 as 其中 as 可以省略

```sql

--把 hero 表中的所有信息查询出来
--把 hero 表中的英雄名字和类型查询出来
--找出英雄名字中有'德'字的英雄， 用到了一个 where 条件中的模糊查询，
select * from hero where name like '%德%';
-- 其中%能匹配到任意的字符
```

6.3 数据删除

> delete 语句基本使用:delete from 表名 [where 条件][order by 排序] [limit 限定条数]

```SQL
delete from 表名; 注意如果没有指定删除的条件，那么就会把数据表中
的所有数据都删除了

删除技能伤害是前两位的英雄信息
删除前先排序，由高到底，逆序排列
限定删除前两条就可以了
使用到了 order by 和 limit 子句
```

6.4 数据修改--update 语句基本使用

> update 表名 set 字段 1=值 1 ,字段 2=值 2… [where 条件][order by 子句] [limit 子句]

- 说明：如果 update 修改表数据没有指定条件，会把表中所有的数据都修改了

#### 五、导出和导入数据

1、 导出数据：

> mysql> mysqldump --opt test > mysql.test

即将数据库 test 数据库导出到 mysql.test 文件，后者是一个文本文件

```sql

mysqldump -u root -p123456 --databases dbname > mysql.dbname

--就是把数据库 dbname 导出到文件 mysql.dbname 中。
```

2、 导入数据:

```sql
mysql> mysqlimport -u root -p123456 < mysql.dbname。

```

3、 将文本数据导入数据库:

```sql
--文本数据的字段数据之间用 tab 键隔开。

mysql> use test;

mysql> load data local infile "文件名" into table 表名;

--1:使用 SHOW 语句找出在服务器上当前存在什么数据库：

mysql> mysql> SHOW DATABASES;

--2:创建一个数据库 MYSQLDATA

mysql> CREATE DATABASE MYSQLDATA;
```

#### 六、navicat 连接 mysql8.0

> 更改加密方式

1.先通过命令行进入 mysql 的 root 账户：

```sql
mysql -uroot -p


```

2.再输入 root 的密码：

```sql
Enter password: ******
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 18
Server version: 8.0.11 MySQL Community Server - GPL
Copyright (c) 2000, 2018, Oracle and/or its affiliates. All rights reserved.
Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.
Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.
mysql>
```

3.更改加密方式：

```sql
mysql> ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER;
Query OK, 0 rows affected (0.10 sec)
```

4.更改密码

```sql
mysql> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
Query OK, 0 rows affected (0.35 sec)
```

5.刷新

```sql
mysql> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.28 sec)
```
