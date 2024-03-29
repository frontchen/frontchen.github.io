---
title: python
tag:
  - python
date: 2018-08-27
category:
  - 后端开发
---

# python 基础

## 1.认识 python 和基础知识

### 1.1 注释

#### <1> 单行注释

以#开头，#右边的所有东西当做说明，而不是真正要执行的程序，起辅助说明作用

```python

    # 我是注释，可以在里写一些功能说明之类的哦
    print('hello world')
```

#### <2> 多行注释

```python
    '''我是多行注释，可以写很多很多行的功能说明
    这就是我牛X指出

    哈哈哈。。。
    '''
```

#### 3. python 程序中，中文支持

如果直接在程序中用到了中文，比如

    print('你好')

如果直接运行输出，程序会出错：

中文出错

解决的办法为：在程序的开头写入如下代码，这就是中文注释

    #coding=utf-8

修改之后的程序:

    #coding=utf-8
    print('你好')

运行结果:

    你好

注意：
在 python 的语法规范中推荐使用的方式：

```
# -*- coding:utf-8 -*-
```

### 1.2 变量及类型

- Number 数字
  - int 有符号整型
  - long 长整形
  - float 浮点型
  - complex 复数
- 布尔类型 true false
- String 字符串
- List 列表
- Tuple 元组
- Dictionary 字典

#### 查看变量的类型

- type 变量名

### 1.3 标示符和关键字

#### <1> 驼峰命名法

#### <2>关键字

```python
and     as      assert break class      continue   def     del
elif    else    except    exec  finally   for     from   global     if      in      import    is    lambda    not     or      pass
print   raise   return    try   while     with    yield
```

可以通过以下命令进行查看当前系统中 python 的关键字

```python
import keyword
keyword.kwlist
```

### 1.4 输出

#### 1. 格式化输出

##### <1>格式化操作的目的

比如有以下代码:

    pirnt("我今年10岁")
    pirnt("我今年11岁")
    pirnt("我今年12岁")
    ...

想一想:

在输出年龄的时候，用了多次"我今年 xx 岁"，能否简化一下程序呢？？？

答:

字符串格式化

##### <2>什么是格式化

看如下代码:

```python

    age = 10
    print("我今年%d岁"%age)

    age += 1
    print("我今年%d岁"%age)

    age += 1
    print("我今年%d岁"%age)

```

在程序中，看到了%这样的操作符，这就是 Python 中格式化输出。

```python
    age = 18
    name = "xiaohua"
    print("我的姓名是%s,年龄是%d"%(name,age))
```

##### <3>常用的格式符号

下面是完整的，它可以与％符号使用列表:

| 格式符号 | 转换                          |
| -------- | ----------------------------- |
| %c       | 字符                          |
| %s       | 通过 str() 字符串转换来格式化 |
| %i       | 有符号十进制整数              |
| %d       | 有符号十进制整数              |
| %u       | 无符号十进制整数              |
| %o       | 八进制整数                    |
| %x       | 十六进制整数（小写字母）      |
| %X       | 十六进制整数（大写字母）      |
| %e       | 索引符号（小写'e'）           |
| %E       | 索引符号（大写“E”）           |
| %f       | 浮点实数                      |
| %g       | ％f 和％e 的简写              |
| %G       | ％f 和％E 的简写              |

#### 2. 换行输出

在输出的时候，如果有\n 那么，此时\n 后的内容会在另外一行显示

    print("1234567890-------") # 会在一行显示

    print("1234567890\n-------") # 一行显示1234567890，另外一行显示-------

#### 3. 练一练

# 编写代码完成以下名片的显示

姓名: dongGe  
 QQ:xxxxxxx
手机号:131xxxxxx
公司地址:北京市 xxxx
==================================

### 1.5 输入

#### 1.python2 版本

##### 1.1 raw_input()

在 Python 中，获取键盘输入的数据的方法是采用 raw_input 函数

```python
 password = raw_input("请输入密码:")
    print '您刚刚输入的密码是:', password
```

注意:

- raw_input()的小括号中放入的是，提示信息，用来在获取数据之前给用户的一个简单提示
- raw_input()在从键盘获取了数据以后，会存放到等号右边的变量中
- raw_input()会把用户输入的任何值都作为字符串来对待
- ==raw_input 是 python2 中的方法，python3 中用 input 取代 raw_input==

##### 1.2 input()

input()函数与 raw_input()类似，但其接受的输入必须是表达式。

```python
>>> a = input()
123
>>> a
123
>>> type(a)
<type 'int'>
>>> a = input()
abc
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<string>", line 1, in <module>
NameError: name 'abc' is not defined
>>> a = input()
"abc"
>>> a
'abc'
>>> type(a)
<type 'str'>
>>> a = input()
1+3
>>> a
4
>>> a = input()
"abc"+"def"
>>> a
'abcdef'
>>> value = 100
>>> a = input()
value
>>> a
100
```

input()接受表达式输入，并把表达式的结果赋值给等号左边的变量

#### 2. python3 版本中

没有 raw_input()函数，只有 input()

并且 python3 中的 input 与 python2 中的 raw_input()功能一样

### 1.6 运算符

- #### 算术运算符

下面以 a=10 ,b=20 为例进行计算

| 运算符 | 描述   | 实例                                                                      |
| ------ | ------ | ------------------------------------------------------------------------- |
| +      | 加     | 两个对象相加 a + b 输出结果 30                                            |
| -      | 减     | 得到负数或是一个数减去另一个数 a - b 输出结果 -10                         |
| \*     | 乘     | 两个数相乘或是返回一个被重复若干次的字符串 a \* b 输出结果 200            |
| /      | 除     | x 除以 y b / a 输出结果 2                                                 |
| //     | 取整除 | 返回商的整数部分 9//2 输出结果 4 , 9.0//2.0 输出结果 4.0                  |
| %      | 取余   | 返回除法的余数 b % a 输出结果 0                                           |
| \*\*   | 幂     | 返回 x 的 y 次幂 a\*\*b 为 10 的 20 次方， 输出结果 100000000000000000000 |

```python
>>> 9/2.0
4.5
>>> 9//2.0
4.0
```

赋值运算符
运算符 描述 实例
= 赋值运算符 把=号右边的结果给左边的变量 num=1+2\*3 结果 num 的值为 7

- #### 赋值运算符

| 运算符 | 描述       | 实例                                                     |
| ------ | ---------- | -------------------------------------------------------- |
| =      | 赋值运算符 | 把=号右边的结果给左边的变量 num=1+2\*3 结果 num 的值为 7 |

```python
>>> a, b = 1, 2
>>> a
1
>>> b
2
```

- #### 复合赋值运算符

| 运算符 | 描述             | 实例                      |
| ------ | ---------------- | ------------------------- |
| +=     | 加法赋值运算符   | c += a 等效于 c = c + a   |
| -=     | 减法赋值运算符   | c -= a 等效于 c = c - a   |
| \*=    | 乘法赋值运算符   | c _= a 等效于 c = c _ a   |
| /=     | 除法赋值运算符   | c /= a 等效于 c = c / a   |
| %=     | 取模赋值运算符   | c %= a 等效于 c = c % a   |
| \*\*=  | 幂赋值运算符     | c **= a 等效于 c = c ** a |
| //=    | 取整除赋值运算符 | c //= a 等效于 c = c // a |

### 1.7 数据类型转换

#### 常用的数据类型转换

| 函数                   | 说明                                                  |
| ---------------------- | ----------------------------------------------------- |
| int(x [,base ])        | 将 x 转换为一个整数                                   |
| long(x [,base ])       | 将 x 转换为一个长整数                                 |
| float(x )              | 将 x 转换到一个浮点数                                 |
| complex(real [,imag ]) | 创建一个复数                                          |
| str(x )                | 将对象 x 转换为字符串                                 |
| repr(x )               | 将对象 x 转换为表达式字符串                           |
| eval(str )             | 用来计算在字符串中的有效 Python 表达式,并返回一个对象 |
| tuple(s )              | 将序列 s 转换为一个元组                               |
| list(s )               | 将序列 s 转换为一个列表                               |
| chr(x )                | 将一个整数转换为一个字符                              |
| unichr(x )             | 将一个整数转换为 Unicode 字符                         |
| ord(x )                | 将一个字符转换为它的整数值                            |
| hex(x )                | 将一个整数转换为一个十六进制字符串                    |
| oct(x )                | 将一个整数转换为一个八进制字符串                      |

#### 举例

```
    a = '100' # 此时a的类型是一个字符串，里面存放了100这3个字符
    b = int(a) # 此时b的类型是整型，里面存放的是数字100

    print("a=%d"%b)
```

### 1.8 if 语句

if 判断语句介绍
if 语句是用来进行判断的，其使用格式如下：
if 要判断的条件:
条件成立时，要做的事情
demo1:

```python
    age = 30

    print "------if判断开始------"

    if age>=18:
    print "我已经成年了"

    print "------if判断结束------"
运行结果:
------if判断开始------
    我已经成年了
------if判断结束------
```

demo2:

```python
    age = 16

    print "------if判断开始------"

    if age>=18:
    print "我已经成年了"

    print "------if判断结束------"
运行结果:
------if判断开始------
------if判断结束------
```

### 1.9 比较、关系运算符

#### <1> 比较(即关系)运算符

python 中的比较运算符如下表

| 运算符 | 描述                                                                                     | 示例                            |
| ------ | ---------------------------------------------------------------------------------------- | ------------------------------- |
| ==     | 检查两个操作数的值是否相等，如果是则条件变为真。                                         | 如 a=3,b=3 则（a == b) 为 true. |
| !=     | 检查两个操作数的值是否相等，如果值不相等，则条件变为真。                                 | 如 a=1,b=3 则(a != b) 为 true.  |
| <>     | 检查两个操作数的值是否相等，如果值不相等，则条件变为真。 如 a=1,b=3 则(a <> b) 为 true。 | 这个类似于 != 运算符            |
| >      | 检查左操作数的值是否大于右操作数的值，如果是，则条件成立。                               | 如 a=7,b=3 则(a > b) 为 true.   |
| <      | 检查左操作数的值是否小于右操作数的值，如果是，则条件成立。                               | 如 a=7,b=3 则(a < b) 为 false.  |
| >=     | 检查左操作数的值是否大于或等于右操作数的值，如果是，则条件成立。                         | 如 a=3,b=3 则(a >= b) 为 true.  |
| <=     | 检查左操作数的值是否小于或等于右操作数的值，如果是，则条件成立。                         | 如 a=3,b=3 则(a <= b) 为 true.  |

#### <2> 逻辑运算符

| 运算符 | 逻辑表达式 | 描述                                                                    | 实例                    |
| ------ | ---------- | ----------------------------------------------------------------------- | ----------------------- |
| and    | x and y    | 布尔"与" - 如果 x 为 False，x and y 返回 False，否则它返回 y 的计算值。 | (a and b) 返回 20。     |
| or     | x or y     | 布尔"或" - 如果 x 是 True，它返回 True，否则它返回 y 的计算值。         | (a or b) 返回 10。      |
| not    | not x      | 布尔"非" - 如果 x 为 True，返回 False 。如果 x 为 False，它返回 True。  | not(a and b) 返回 False |

## 2.判断语句和循环语句

### 2.1 if-else

#### if-else 的使用格式

demo1

```python
    chePiao = 1 # 用1代表有车票，0代表没有车票
    if chePiao == 1:
    print("有车票，可以上火车")
    print("终于可以见到Ta了，美滋滋~~~")
    else:
    print("没有车票，不能上车")
    print("亲爱的，那就下次见了，一票难求啊~~~~(>_<)~~~~")
```

结果 1：有车票的情况

    有车票，可以上火车
    终于可以见到Ta了，美滋滋~~~

结果 2：没有车票的情况

    没有车票，不能上课
    亲爱的，那就下次见了，一票难求啊~~~~(>_<)~~~~

### 2.2 elif

demo:

```python
    score = 77

    if score>=90 and score<=100:
    print('本次考试，等级为A')
    elif score>=80 and score<90:
    print('本次考试，等级为B')
    elif score>=70 and score<80:
    print('本次考试，等级为C')
    elif score>=60 and score<70:
    print('本次考试，等级为D')
    elif score>=0 and score<60:
    print('本次考试，等级为E')
```

### 2.3while 循环

#### demo

```python
    i = 0
    while i<5:
    print("当前是第%d次执行循环"%(i+1))
    print("i=%d"%i)
    i+=1
```

结果:

```python
    当前是第1次执行循环
    i=0
    当前是第2次执行循环
    i=1
    当前是第3次执行循环
    i=2
    当前是第4次执行循环
    i=3
    当前是第5次执行循环
    i=4
```

### 2.4 for 循环

像 while 循环一样，for 可以完成循环的功能。

在 Python 中 for 循环可以遍历任何序列的项目，如一个列表或者一个字符串等。

#### for 循环的格式

    for 临时变量 in 列表或者字符串等:
    循环满足条件时执行的代码
    else:
    循环不满足条件时执行的代码

demo1

```python
    name = 'dongGe'

    for x in name:
    print(x)
```

运行结果如下:

```
d
o
n
g
G
e
```

demo2

```python


    name = ''

    for x in name:
    print(x)
    else:
    print("没有数据")
```

运行结果如下:

```
没有数据
```

### 2.5 break 和 continue

#### 1. break

##### <1> for 循环

普通的循环示例如下：

```python
name = 'dongGe'

  for x in name:
      print('----')
      print(x)
```

运行结果:

```
----
d
----
o
----
n
----
g
----
G
----
e
```

带有 break 的循环示例如下:

```python

  name = 'dongGe'

  for x in name:
      print('----')
      if x == 'g':
      break
      print(x)

```

运行结果:

```phtyon
----
d
----
o
----
n
```

<2> while 循环
普通的循环示例如下：

```python
  i = 0

  while i<10:
      i = i+1
      print('----')
      print(i)
```

运行结果:

```
----
1
----
2
----
3
----
4
----
5
----
6
----
7
----
8
----
9
----
10
```

带有 break 的循环示例如下:

```python
  i = 0

  while i<10:
      i = i+1
      print('----')
      if i==5:
      break
      print(i)
```

运行结果:

```
----
1
----
2
----
3
----
4
```

小总结:

##### break 的作用：用来结束整个循环

#### 2. continue

##### <1> for 循环

带有 continue 的循环示例如下:

```python

  name = 'dongGe'

  for x in name:
      print('----')
      if x == 'g':
      continue
      print(x)
```

运行结果:

```
----
d
----
o
----
n
----

----
G
----
e
```

<2> while 循环
带有 continue 的循环示例如下:

```python
  i = 0

  while i<10:
      i = i+1
      print('----')
      if i==5:
      continue
      print(i)
```

运行结果:

```
----
1
----
2
----
3
----
4
----

----
6
----
7
----
8
----
9
----
10
```

小总结:

- continue 的作用：用来结束本次循环，紧接着执行下一次的循环

#### 3. 注意点

##### break/continue 只能用在循环中，除此以外不能单独使用

##### break/continue 在嵌套循环中，只对最近的一层循环起作用

## 3.字符串、列表、元祖、字典、集合

### 3.1 字符串下标和切片(截取)

#### 1.下标

```python
   name = 'abcdef'

   print(name[0])
   print(name[1])
   print(name[2])
```

运行结果:

```
a
b
c
```

#### 2.切片

切片的语法：[起始:结束:步长]

##### 注意：选取的区间属于左闭右开型，即从"起始"位开始，到"结束"位的前一位结束（不包含结束位本身)。

- 步长 意思是从索引起始开始 每隔步长个元素取一次元素

```python
 name = 'abcdef'

     print(name[0:3]) # 取 下标0~2 的字符

```

运行结果:

```
abc
```

```python
  name = 'abcdef'

     print(name[2:]) # 取 下标为2开始到最后的字符

 >>> a = "abcdef"
 >>> a[:3]
 'abc'
 >>> a[::2]
 'ace'
 >>> a[5:1:2]
 ''
 >>> a[1:5:2]
 'bd'
 >>> a[::-2]
 'fdb'
 >>> a[5:1:-2]
 'fd'
```

### 3.2.字符串常见操作

```python
mystr = 'hello world itcast and itcastcpp'
```

#### <1>find

检测 str 是否包含在 mystr 中，如果是返回开始的索引值，否则返回-1

- 同 js 中的 indexOf

mystr.find(str, start=0, end=len(mystr))

```python
mystr.find("itcast") #12
mystr.find("itcast",0,10) #-1
```

#### <2>index

跟 find()方法一样，只不过如果 str 不在 mystr 中会报一个异常.

mystr.index(str, start=0, end=len(mystr))

```python
mystr.index("itcast",0,10)//报错
```

#### <3>count

返回 str 在 start 和 end 之间 在 mystr 里面出现的次数

mystr.count(str, start=0, end=len(mystr))

```python
mystr.count("itcast") # 2
```

#### <4>replace

把 mystr 中的 str1 替换成 str2,如果 count 指定，则替换不超过 count 次.

mystr.replace(str1, str2, mystr.count(str1))

```python
print(mystr.split(" ")) #['hello', 'world', 'itcast', 'and', 'itcastcpp']
print(mystr.split(" ",3))
#['hello', 'world', 'itcast', 'and itcastcpp']
```

#### <6>capitalize

把字符串的第一个字符大写

mystr.capitalize()

```python
print(mystr.capitalize()) # Hello world itcast and itcastcpp
```

#### <7>title

把字符串的每个单词首字母大写

```python
print(mystr.title()) # Hello World Itcast And Itcastcpp
```

#### <8>startswith

检查字符串是否是以 obj 开头, 是则返回 True，否则返回 False

mystr.startswith(obj)

```python
print(mystr.startswith("hello")) #True
print(mystr.startswith("world")) #False
```

#### <9>endswith

检查字符串是否以 obj 结束，如果是返回 True,否则返回 False.

mystr.endswith(obj)

```python
print(mystr.endswith("itcastcpp")) #True
print(mystr.endswith("itcast")) #False
```

#### <10>lower

转换 mystr 中所有大写字符为小写

mystr.lower()

```python
print(mystr.title().lower())
```

#### <11>upper

转换 mystr 中的小写字母为大写

mystr.upper()

```python
print(mystr.upper())#HELLO WORLD ITCAST AND ITCASTCPP
```

#### <12>ljust

返回一个原字符串左对齐,并使用空格填充至长度 width 的新字符串

mystr.ljust(width)

```python
strtest="abc"
print(strtest.ljust(10))#'abc       '
```

#### <13>rjust

返回一个原字符串右对齐,并使用空格填充至长度 width 的新字符串

mystr.rjust(width)

```python
print(strtest.rjust(10))#'       abc'
```

#### <14>center

返回一个原字符串居中,并使用空格填充至长度 width 的新字符串

mystr.center(width)

```python
print(strtest.center(10))#'   abc    '
```

#### <15>lstrip

删除 mystr 左边的空白字符

mystr.lstrip()

```python
print(strtest.lstrip())
```

#### <16>rstrip

删除 mystr 字符串末尾的空白字符

mystr.rstrip()

```python
print(strtest.rstrip())
```

#### <17>strip

删除 mystr 字符串两端的空白字符

```python
>>> a = "\n\t itcast \t\n"
#\t表示空四个字符，也称缩进，就是按四下Tab键
#\n表示换行，相当于按一下回车
#\n\t表示换行加每行空四格
>>> a.strip()
'itcast'
```

#### <18>rfind

类似于 find()函数，不过是从右边开始查找.

mystr.rfind(str, start=0,end=len(mystr) )

```python
print(mystr.rfind("itcast")) #23
```

#### <19>rindex

类似于 index()，不过是从右边开始.

mystr.rindex( str, start=0,end=len(mystr))

```python
print(mystr.rindex("world")) #6
```

#### <20>partition

把 mystr 以 str 分割成三部分,str 前，str 和 str 后

mystr.partition(str)

```python
print(mystr.partition('itcast')) #('hello world ', 'itcast', ' and itcastcpp')
```

#### <21>rpartition

类似于 partition()函数,不过是从右边开始.

mystr.rpartition(str)

```python
print(mystr.rpartition('itcast')) #('hello world itcast and ', 'itcast', 'cpp')
```

#### <22>splitlines

按照行分隔，返回一个包含各行作为元素的列表

mystr.splitlines()

```python
print(mystr.splitlines()) #['hello world itcast and itcastcpp']
```

#### <23>isalpha

如果 mystr 所有字符都是字母 则返回 True,否则返回 False

mystr.isalpha()

```python
print(mystr.isalpha()) #False
```

#### <24>isdigit

如果 mystr 只包含数字则返回 True 否则返回 False.

mystr.isdigit()

```python
num='123456'
print(num.isdigit())#True

```

#### <25>isalnum

如果 mystr 所有字符都是字母或数字则返回 True,否则返回 False

mystr.isalnum()

```python
print(num.isalnum())#True
```

#### <26>isspace

如果 mystr 中只包含空格，则返回 True，否则返回 False.

mystr.isspace()

```python
print(num.isspace()) #False
```

#### <27>join

mystr 中每个字符后面插入 str,构造出一个新的字符串

mystr.join(str)

```python
test='今天星期五'
space="-"
print(space.join(test)) #今-天-星-期-五
```

### 3.3 列表的循环遍历

#### 1. 使用 for 循环

为了更有效率的输出列表的每个数据，可以使用循环来完成

demo:

```python
    namesList = ['xiaoWang','xiaoZhang','xiaoHua']
    for name in namesList:
    print(name)
```

结果:

```python
    xiaoWang
    xiaoZhang
    xiaoHua
```

#### 2. 使用 while 循环

为了更有效率的输出列表的每个数据，可以使用循环来完成

demo:

```python
    namesList = ['xiaoWang','xiaoZhang','xiaoHua']

    length = len(namesList)

    i = 0

    while i<length:
    print(namesList[i])
    i+=1
```

结果:

```
    xiaoWang
    xiaoZhang
    xiaoHua
```

### 3.4 列表的常见操作

列表中存放的数据是可以进行修改的，比如"增"、"删"、"改""

#### <1>添加元素("增"append, extend, insert)

##### append

通过 append 可以向列表添加元素
demo:

```python
arr=[1,2,3]
test=[2,3,4]
test.append(arr)
print(test)#[2, 3, 4, [1, 2, 3]]
```

##### extend

通过 extend 可以将另一个集合中的元素逐一添加到列表中

```python
arr=[1,2,3]
test=[2,3,4]
test.extend(arr)
print(test)# [2, 3, 4, 1, 2, 3]
```

##### insert

insert(index, object) 在指定位置 index 前插入元素 object

```python
>>> a = [0, 1, 2]
>>> a.insert(1, 3)
>>> a
[0, 3, 1, 2]
```

#### <2>修改元素("改")

修改元素的时候，要通过下标来确定要修改的是哪个元素，然后才能进行修改

demo:

```python
    #定义变量A，默认有3个元素
    A = ['xiaoWang','xiaoZhang','xiaoHua']

    print("-----修改之前，列表A的数据-----")
    for tempName in A:
    print(tempName)

    #修改元素
    A[1] = 'xiaoLu'

    print("-----修改之后，列表A的数据-----")
    for tempName in A:
    print(tempName)
```

结果:

```python
-----修改之前，列表A的数据-----
    xiaoWang
    xiaoZhang
    xiaoHua
-----修改之后，列表A的数据-----
    xiaoWang
    xiaoLu
    xiaoHua
```

#### <3>查找元素("查"in, not in, index, count)

所谓的查找，就是看看指定的元素是否存在

##### in, not in

python 中查找的常用方法为：

- in（存在）,如果存在那么结果为 true，否则为 false
- not in（不存在），如果不存在那么结果为 true，否则 false
  demo

```python
    #待查找的列表
    nameList = ['xiaoWang','xiaoZhang','xiaoHua']

    #获取用户要查找的名字
    findName = input('请输入要查找的姓名:')

    #查找是否存在
    if findName in nameList:
    print('在字典中找到了相同的名字')
    else:
    print('没有找到')
```

说明：**in 的方法只要会用了，那么 not in 也是同样的用法，只不过 not in 判断的是不存在**

##### index, count

- index 和 count 与字符串中的用法相同

```python
>>> a = ['a', 'b', 'c', 'a', 'b']
>>> a.index('a', 1, 3) # 注意是左闭右开区间
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: 'a' is not in list
>>> a.index('a', 1, 4)
3
>>> a.count('b')
2
>>> a.count('d')
0
```

#### <4>删除元素("删"del, pop, remove)

类比现实生活中，如果某位同学调班了，那么就应该把这个条走后的学生的姓名删除掉；在开发中经常会用到删除这种功能。

##### 列表元素的常用删除方法有：

- del：根据下标进行删除
- pop：删除最后一个元素
- remove：根据元素的值进行删除
  demo:(del)

```python
    movieName = ['加勒比海盗','骇客帝国','第一滴血','指环王','霍比特人','速度与激情']

    print('------删除之前------')
    for tempName in movieName:
    print(tempName)

    del movieName[2]

    print('------删除之后------')
    for tempName in movieName:
    print(tempName)
```

结果:

------删除之前------
加勒比海盗
骇客帝国
第一滴血
指环王
霍比特人
速度与激情
------删除之后------
加勒比海盗
骇客帝国
指环王
霍比特人
速度与激情

demo:(pop)

```python
    movieName = ['加勒比海盗','骇客帝国','第一滴血','指环王','霍比特人','速度与激情']

    print('------删除之前------')
    for tempName in movieName:
    print(tempName)

    movieName.pop()

    print('------删除之后------')
    for tempName in movieName:
    print(tempName)
```

结果:

```
------删除之前------
    加勒比海盗
    骇客帝国
    第一滴血
    指环王
    霍比特人
    速度与激情
------删除之后------
    加勒比海盗
    骇客帝国
    第一滴血
    指环王
    霍比特人
```

注意:js 中 pop 和 python 中 pop 用法一致，都是删除自身最后一个元素，修改自身并返回

demo:(remove)

```python
    movieName = ['加勒比海盗','骇客帝国','第一滴血','指环王','霍比特人','速度与激情']

    print('------删除之前------')
    for tempName in movieName:
    print(tempName)

    movieName.remove('指环王')

    print('------删除之后------')
    for tempName in movieName:
    print(tempName)
```

结果:

```
------删除之前------
    加勒比海盗
    骇客帝国
    第一滴血
    指环王
    霍比特人
    速度与激情
------删除之后------
    加勒比海盗
    骇客帝国
    第一滴血
    霍比特人
    速度与激情
```

##### <5>排序(sort, reverse)

sort 方法是将 list 按特定顺序重新排列，默认为由小到大，参数 reverse=True 可改为倒序，由大到小。

reverse 方法是将 list 逆置。

```python
>>> a = [1, 4, 2, 3]
>>> a
[1, 4, 2, 3]
>>> a.reverse()
>>> a
[3, 2, 4, 1]
>>> a.sort()
>>> a
[1, 2, 3, 4]
>>> a.sort(reverse=True)
>>> a
[4, 3, 2, 1]

```

| 方法        | 含义                         |
| ----------- | ---------------------------- |
| insert()    | 在指定位置插入一个元素       |
| sort()      | 按特定的顺序排列（从小到大） |
| copy()      | 拷贝 一个副本                |
| reverse（） | 原地翻转所有的数据           |
| clear()     | 清空所有元素                 |
| pop()       | 删除并返回最后一个元素       |
| remove()    | 删除一个元素                 |
| exttend     | 拓展列表（用另一个列表）     |
| append()    | 在最后增加一个元素           |
| count()     | 计算并返回指定元素的数量     |
| index()     | 寻找并返回参数的索引值       |

###### 注意

列表：可增删改

元组：不能添加、删除或修改

- 1、类型不可改变
- 2、可以对元组进行操作的操作符：
  - 拼接操作符：+
  - 重复操作符：\*
  - 成员操作符：in/ not in
  - 关系操作符：> <
  - 逻辑操作符：and or

### 3.5.列表的嵌套

#### random 模块

##### 1.random.random()

```python
 #用于生成一个0到1的随机浮点数：0<= n < 1.0

import random
a = random.random()
print (a)
```

##### 2.random.uniform(a,b)

```python
#用于生成一个指定范围内的随机符点数，两个参数其中一个是上限，一个是下限。
#如果a > b，则生成的随机数n: a <= n <= b。
#如果 a <b， 则 b <= n <= a。
import random
print(random.uniform(1,10))#9.474815842579147
print(random.uniform(10,1)) #9.906754530688756

```

##### 3.random.randint(a, b)

- 用于生成一个指定范围内的整数。其中参数 a 是下限，参数 b 是上限，生成的随机数 n: a <= n <= b

```python
import random
print(random.randint(1,10))
```

##### 4.random.randrange([start], stop[, step])

- 从指定范围内，按指定基数递增的集合中 获取一个随机数。

- random.randrange(10, 30, 2)，结果相当于从[10, 12, 14, 16, ... 26, 28]序列中获取一个随机数。

- random.randrange(10, 30, 2)在结果上与 random.choice(range(10, 30, 2) 等效。

```python
import random
print(random.randrange(10,30,2))
```

##### 5.random.choice(sequence)

- random.choice 从序列中获取一个随机元素。其函数原型为：random.choice(sequence)。

- 参数 sequence 表示一个有序类型。
- 这里要说明 一下：sequence 在 python 不是一种特定的类型，而是泛指一系列的类型。list, tuple, 字符串都属于 sequence。

```python
import random
lst = ['python','C','C++','javascript']
str1 = ('I love python')
print(random.choice(lst))
print(random.choice(str1))
```

##### 6.random.shuffle(x[, random])

- 用于将一个列表中的元素打乱,即将列表内的元素随机排列。

```python
import random
p = ['A' , 'B', 'C', 'D', 'E' ]
random.shuffle(p)
print (p)
```

##### 7.random.sample(sequence, k)

- 从指定序列中随机获取指定长度的片断并随机排列。注意：sample 函数不会修改原有序列。

```python
import random
lst = [1,2,3,4,5]
print(random.sample(lst,4))
print(lst)
```

#### 应用

```python
'''
一个学校，有3个办公室，现在有8位老师等待工位的分配，请编写程序，完成随机的分配
'''

#encoding=utf-8

import random
```

#### 定义一个列表用来保存 3 个办公室

offices = [[],[],[]]

#### 定义一个列表用来存储 8 位老师的名字

```phthon
names = ['A','B','C','D','E','F','G','H']

i = 0
for name in names:
    index = random.randint(0,2)
    offices[index].append(name)

i = 1
for tempNames in offices:
    print('办公室%d的人数为:%d'%(i,len(tempNames)))
    i+=1
    for name in tempNames:
    print("%s"%name,end='')
    print("\n")
    print("-"*20)

```

### 3.6 元祖

Python 的元组与列表类似，不同之处在于==元组的元素不能修改==。元组使用小括号，列表使用方括号。

```PYTHON
aTuple = ('et',77,99.9)
print(aTuple)
#('et',77,99.9)

```

#### <1>访问元组

```python
aTuple = ('et',77,99.9)
aTuple[0]
#'et'
```

#### <2>修改元组

- python 中不允许修改元组的数据，包括不能删除其中的元素。
- 元组的修改 元组中的元组不允许修改 但可以合并两个元组成为一个新的元组。

```python
aa=("aa","bb","cc")
bb=("aaa","bbb","ccc")
cc=aa+bb
print(cc)
("aa","bb","cc","aaa","bbb","ccc")
```

- 元组的删除 元组中的元组不允许删除 我们可以删除整个元组 删除之后就无法访问这个元组了。

```python
del cc
print(cc)
#报错
```

#### <3>元祖的内置函数 count,index

index 和 count 与字符串和列表中的用法相同

```python
>>> a = ('a', 'b', 'c', 'a', 'b')
>>> a.index('a', 1, 3) # 注意是左闭右开区间
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: tuple.index(x): x not in tuple
>>> a.index('a', 1, 4)
3
>>> a.count('b')
2
>>> a.count('d')
0
```

### 3.7 字典的常见操作

#### <1>修改元素

字典的每个元素中的数据是可以修改的，只要通过 key 找到，即可修改

demo:

```python
    info = {'name':'班长', 'id':100, 'sex':'f', 'address':'地球亚洲中国北京'}

    newId = input('请输入新的学号')

    info['id'] = int(newId)

    print('修改之后的id为%d:'%info['id'])
```

#### <2>添加元素

demo:访问不存在的元素

```PYTHON
    info = {'name':'班长', 'sex':'f', 'address':'地球亚洲中国北京'}

    print('id为:%d'%info['id'])
    #报错
```

如果在使用 变量名['键'] = 数据 时，这个“键”在字典中，不存在，那么就会新增这个元素

demo:添加新的元素

```PYTHON
    info = {'name':'班长', 'sex':'f', 'address':'地球亚洲中国北京'}

    # print('id为:%d'%info['id'])#程序会终端运行，因为访问了不存在的键

    newId = input('请输入新的学号')

    info['id'] = newId

    print('添加之后的id为:%d'%info['id'])
    #请输入新的学号188
    #添加之后的id为:188
```

#### <3>删除元素

对字典进行删除操作，有一下几种：

del
clear()
demo:del 删除指定的元素

```PYTHON
    info = {'name':'班长', 'sex':'f', 'address':'地球亚洲中国北京'}

    print('删除前,%s'%info['name'])

    del info['name']

    print('删除后,%s'%info['name'])#删除后不能访问，报错
```

demo:del 删除整个字典

```PYTHON

    info = {'name':'monitor', 'sex':'f', 'address':'China'}

    print('删除前,%s'%info)

    del info

    print('删除后,%s'%info)#报错，变量名被回收
```

demo:clear 清空整个字典

```PYTHON
    info = {'name':'monitor', 'sex':'f', 'address':'China'}

    print('清空前,%s'%info)

    info.clear()

    print('清空后,%s'%info)
    #只是清空字典中的内容，变量名未被回收
```

#### <4>len()

测量字典中，键值对的个数,字典内容的长度

#### <5>keys

返回一个包含字典所有 KEY 的列表

#### <6>values

返回一个包含字典所有 value 的列表

#### <7>items

返回一个包含所有（键，值）元祖的列表

#### <8>has_key

dict.has_key(key)如果 key 在字典中，返回 True，否则返回 False

#### <9>遍历

通过 for ... in ...:的语法结构，我们可以遍历字符串、列表、元组、字典等数据结构。

注意 python 语法的缩进

##### 字符串遍历

```python
>>> a_str = "hello itcast"
>>> for char in a_str:
...     print(char,end=' ')
...

h e l l o i t c a s t

```

##### 列表遍历

```python
>>> a_list = [1, 2, 3, 4, 5]
>>> for num in a_list:
...     print(num,end=' ')
...
1 2 3 4 5
```

##### 元组遍历

```python
>>> a_turple = (1, 2, 3, 4, 5)
>>> for num in a_turple:
...     print(num,end=" ")
1 2 3 4 5
```

##### 字典遍历

- <1>遍历字典的 key

```PYTHON
dict={"name":"zhangsan","sex":"m"}
for key in dict.keys():
    print(key)
#name
#sex
```

- <2>遍历字典中的 value

```PYTHON
dict={"name":"zhangsan","sex":"m"}
for value in dict.value():
    print(value)
# zhangsan
# m
```

- <3>遍历字典中的项

```PYTHON
dict={"name":"zhangsan","sex":"m"}
for item in dict.items():
    print(item)
# ("name":"zhangsan")
# ("sex":"m")
```

- <4>遍历字典中的 key-value

```python
dict={"name":"zhangsan","sex":"m"}
for key,value in dict.items():
    print(key,value)
# name zhangsan
# sex m

```

##### 想一想，如何实现带下标索引的遍历

```python
>>> chars = ['a', 'b', 'c', 'd']
>>> i = 0
>>> for chr in chars:
...     print("%d %s"%(i, chr))
...     i += 1
...
0 a
1 b
2 c
3 d
```

###### enumerate()

enumerate() 函数用于将一个可遍历的数据对象(如列表、元组或字符串)组合为一个索引序列，同时列出数据和数据下标，一般用在 for 循环当中。

```python
>>> chars = ['a', 'b', 'c', 'd']
>>> for i, chr in enumerate(chars):
...     print i, chr
...
0 a
1 b
2 c
3 d
```

### 3.8 公共方法

#### 运算符

| 运算符 | Python 表达式      | 结果                         | 描述           | 支持的数据类型           |
| ------ | ------------------ | ---------------------------- | -------------- | ------------------------ |
| +      | [1, 2] + [3, 4]    | [1, 2, 3, 4]                 | 合并           | 字符串、列表、元组       |
| \*     | 'Hi!' \* 4         | ['Hi!', 'Hi!', 'Hi!', 'Hi!'] | 复制           | 字符串、列表、元组       |
| in     | 3 in (1, 2, 3)     | True                         | 元素是否存在   | 字符串、列表、元组、字典 |
| not in | 4 not in (1, 2, 3) | True                         | 元素是否不存在 | 字符串、列表、元组、字典 |

```PYTHON
+
>>> "hello " + "itcast"
'hello itcast'
>>> [1, 2] + [3, 4]
[1, 2, 3, 4]
>>> ('a', 'b') + ('c', 'd')
('a', 'b', 'c', 'd')
*
>>> 'ab'*4
'ababab'
>>> [1, 2]*4
[1, 2, 1, 2, 1, 2, 1, 2]
>>> ('a', 'b')*4
('a', 'b', 'a', 'b', 'a', 'b', 'a', 'b')
in
>>> 'itc' in 'hello itcast'
True
>>> 3 in [1, 2]
False
>>> 4 in (1, 2, 3, 4)
True
>>> "name" in {"name":"Delron", "age":24}
True
#注意，in在对字典操作时，判断的是字典的键
```

#### python 内置函数

Python 包含了以下内置函数

| 序号 | 方法              | 描述                 |
| ---- | ----------------- | -------------------- |
| 1    | cmp(item1, item2) | 比较两个值           |
| 2    | len(item)         | 计算容器中元素个数   |
| 3    | max(item)         | 返回容器中元素最大值 |
| 4    | min(item)         | 返回容器中元素最小值 |
| 5    | del(item)         | 删除变量             |

##### cmp

```python
>>> cmp("hello", "itcast")
-1
>>> cmp("itcast", "hello")
1
>>> cmp("itcast", "itcast")
0
>>> cmp([1, 2], [3, 4])
-1
>>> cmp([1, 2], [1, 1])
1
>>> cmp([1, 2], [1, 2, 3])
-1
>>> cmp({"a":1}, {"b":1})
-1
>>> cmp({"a":2}, {"a":1})
1
>>> cmp({"a":2}, {"a":2, "b":1})
-1
```

注意：

- cmp 在比较字典数据时，先比较键，再比较值。
- Python 3.X 的版本中已经没有 cmp 函数，如果你需要实现比较功能，需要引入 operator 模块，适合任何对象，包含的方法有：

###### operator 常用对照速查表

| 实际操作           | 表达式            | 对应函数                          |
| ------------------ | ----------------- | --------------------------------- |
| 加                 | a + b             | add(a, b)                         |
| 串联列表           | seq1 + seq2       | concat(seq1, seq2)                |
| 查询包含           | obj in seq        | contains(seq, obj)                |
| 除                 | a / b             | truediv(a, b)                     |
| 除                 | a // b            | floordiv(a, b)                    |
| 位与               | a & b             | and\_(a, b)                       |
| 位异或             | a ^ b             | xor(a, b)                         |
| 位反               | ~ a               | invert(a)                         |
| 位或               | a &#124; b        | or\_(a, b)                        |
| 指数               | a \*\* b          | pow(a, b)                         |
| 判断               | a is b            | is\_(a, b)                        |
| 判断               | a is not b        | is_not(a, b)                      |
| 索引赋值           | obj[k] = v        | setitem(obj, k, v)                |
| 索引删除           | del obj[k]        | delitem(obj, k)                   |
| 索引查询           | obj[k]            | getitem(obj, k)                   |
| 位左移             | a << b            | lshift(a, b)                      |
| 模                 | a % b             | mod(a, b)                         |
| 乘                 | a \* b            | mul(a, b)                         |
| 矩阵乘（存在 bug） | a @ b             | matmul(a, b)                      |
| 算数取反           | -a                | neg(a)                            |
| 逻辑取反           | not a             | not\_(a)                          |
| 取正               | +a                | pos(a)                            |
| 位右移             | a >> b            | rshift(a, b)                      |
| 切片赋值           | seq[i:j] = values | setitem(seq, slice(i, j), values) |
| 切片删除           | del seq[i:j]      | delitem(seq, slice(i, j))         |
| 切片               | seq[i:j]          | getitem(seq, slice(i, j))         |
| 格式化字符串       | s % obj           | mod(s, obj)                       |
| 减                 | a - b             | sub(a, b)                         |
| 为真检验           | obj               | truth(obj)                        |
| 大小判断           | a < b             | lt(a, b)                          |
| 大小判断           | a <= b            | le(a, b)                          |
| 相等判断           | a == b            | eq(a, b)                          |
| 不等判断           | a != b            | ne(a, b)                          |
| 大小判断           | a >= b            | ge(a, b)                          |
| 大小判断           | a > b             | gt(a, b)                          |

###### 特殊操作

- operator.attrgetter(attr)
- operator.attrgetter(\*attrs)

**调用操作（）**

```python
>>> from operator import *
>>> import math
>>> a=attrgetter('pi')
>>> a(math)
3.141592653589793
>>> b=attrgetter('pi','e')
>>> b(math)
(3.141592653589793, 2.718281828459045)

```

- operator.itemgetter(item)
- operator.itemgetter(\*items)

**索引查询（[item]）**

```python
>>> data=[1,69,76,42,777,233]
>>> c=itemgetter(4)
>>> c(data)
777
>>> d(data)
>>> d=itemgetter(0,1,1,2)
(1, 69, 69, 76)
```

- operator.methodcaller(name[, args…])

**可带参数的 attrgetter**

```python
After f = methodcaller(‘name’), the call f(b) returns b.name().
After f = methodcaller(‘name’, ‘foo’, bar=1), the call f(b) returns b.name(‘foo’, bar=1).
```

> 1. operator.index(a) **返回整数 a**
> 1. operator.concat(a, b) **串联列表**
> 1. operator.delitem(a, b) **列表删除元素**
> 1. operator.getitem(a, b) **索引查询**
> 1. operator.indexOf(a, b) **查询索引**
> 1. operator.setitem(a, b, c) **索引赋值**
> 1. operator.length_hint(obj, default=0) **长度查询数值运算**
> 1. operator.abs(obj) **取绝对值**
> 1. operator.add(a, b) **a + b**
> 1. operator.and\_(a, b)**按位与**
> 1. operator.floordiv(a, b)**a // b**
> 1. operator.inv(obj) operator.invert(obj) **按位取反**
> 1. operator.lshift(a, b)**位左移**
> 1. operator.mod(a, b) **a % b**
> 1. operator.mul(a, b) **a \* b**
> 1. operator.matmul(a, b) **a @ b**
> 1. operator.neg(obj) **取负**
> 1. operator.or\_(a, b) **按位或**
> 1. operator.pos(obj) **取正**
> 1. operator.pow(a, b) **a ** b\*\*
> 1. operator.rshift(a, b) **位右移**
> 1. operator.sub(a, b) **a - b**
> 1. operator.truediv(a, b) **浮点除**
> 1. operator.xor(a, b) **按位异或**

##### len

```python
>>> len("hello itcast")
12
>>> len([1, 2, 3, 4])
4
>>> len((3,4))
2
>>> len({"a":1, "b":2})
2
```

###### 注意：len 在操作字典数据时，返回的是键值对个数。

##### max 返回容器中元素最大值

```python
>>> max("hello itcast")
't'
>>> max([1,4,522,3,4])
522
>>> max({"a":1, "b":2})
'b'
>>> max({"a":10, "b":2})
'b'
>>> max({"c":10, "b":2})
'c'
```

##### del

- del 有两种用法，一种是 del 加空格，另一种是 del()

```python
>>> a = 1
>>> a
1
>>> del a
>>> a
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'a' is not defined
>>> a = ['a', 'b']
>>> del a[0]
>>> a
['b']
>>> del(a)
>>> a
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'a' is not defined
```

#### 多维列表/元祖访问的示例

```python
>>> tuple1 = [(2,3),(4,5)]
>>> tuple1[0]
(2, 3)
>>> tuple1[0][0]
2
>>> tuple1[0][2]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: tuple index out of range
>>> tuple1[0][1]
3
>>> tuple1[2][2]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: list index out of range
>>> tuple2 = tuple1+[(3)]
>>> tuple2
[(2, 3), (4, 5), 3]
>>> tuple2[2]
3
>>> tuple2[2][0]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'int' object is not subscriptable
```

### 3.9 引用

在 python 中，值是靠引用来传递来的。

我们可以用 id()来判断两个变量是否为同一个值的引用。 我们可以将 id 值理解为那块内存的地址标示。

```python
>>> a = 1
>>> b = a
>>> id(a)
13033816
>>> id(b)   # 注意两个变量的id值相同
13033816
>>> a = 2
>>> id(a)   # 注意a的id值已经变了
13033792
>>> id(b)   # b的id值依旧
13033816
>>> a = [1, 2]
>>> b = a
>>> id(a)
139935018544808
>>> id(b)
139935018544808
>>> a.append(3)
>>> a
[1, 2, 3]
>>> id(a)
139935018544808
>>> id(b)       # 注意a与b始终指向同一个地址
139935018544808

```

#### 可变类型与不可变类型

可变类型，值可以改变：

- 列表 list
- 字典 dict

不可变类型，值不可以改变：

- 数值类型 int, long, bool, float
- 字符串 str
- 元组 tuple

### 3.10 集合(Set)

dict 是建立了一系列的映射关系，而 set 是建立一系列无序的，不重复的元素。

#### （1）创建

创建 set 的方式是调用 set()并传入一个 list，list 的元素将作为 set 的元素。

```python
>>> S = set([1,2,3])
>>> S

{1, 2, 3}
```

重复元素在 Set 中自动过滤，如：

```python
>>> S = set([1,1,2,3,4,5,4])
>>> S

{1, 2, 3, 4, 5}
```

#### （2）添加

add()添加，有重复元素可以添加，但不会有效果：

```python
>>> S.add(4)
>>> S

{1, 2, 3, 4, 5}

>>> S.add(9)
>>> S

{1, 2, 3, 4, 5, 9}
```

#### （3）删除

```python
>>> S.remove(9)
>>> S

{1, 2, 3, 4, 5}
```

#### （4）交集，并集

set 可以看成数学意义上的无序和无重复元素的集合，因此，两个 set 可以做数学意义上的交集、并集：

```python
>>> S1 = set([1,2])
>>> S2 = set([2,3])
>>> S1&S2

{2}
>>> S1|S2

{1, 2, 3}
```

### 3.11 list，tuple，dict 和 set 的主要区别

#### 1 .list

- list 是一个使用方括号括起来的有序元素集合;

- List 可以作为以 0 下标开始的数组,任何一个非空 list 的第一个元素总是 L[0],负数索引从 list 的尾部开始向前计数来存取元素。任何一个非空的 list 最后一个元素总是 L[-1];

- 有分片功能，两个 list 可以相加；

- append 向 list 的末尾追加单个元素；

- insert 将单个元素插入到 list 中；

- extend 用来连接 list，使用一个 list 参数进行调用；

- append 接受一个参数, 这个参数可以是任何数据类型, 并且简单地追加到 list 的尾部；

- index 在 list 中查找一个值的首次出现并返回索引值；

- 要测试一个值是否在 list 内, 使用 in, 如果值存在, 它返回 True, 否则返为 False ；

- remove 从 list 中删除一个值的首次出现；

- pop 可以删除 list 的最后一个元素, 然后返回删除元素的值，用索引删除制定位置的值；

#### 2.tuple

- tuple 是不可变的 list，创建了一个 tuple 就不能以任何方式改变它；

- 定义 tuple 是将整个元素集是用小括号括起来，是有序集合；

- tuple 的索引与 list 一样从 0 开始,所以一个非空的 tuple 的第一个元素总是 t[0]；

- 负数索引与 list 一样从 tuple 的尾部开始计数；

- 与 list 一样分片 (slice) 也可以使用。分割一个 tuple 时, 会得到一个新的 tuple；

- 没有 append、extend、remove 或 pop 方法以及 index 方法；

- 可以使用 in 来查看一个元素是否存在于 tuple 中。

#### 3.dict

- dict 定义了键和值之间的一一对应关系，每个元素都是一个 key-value 对；

- 整个元素集合用大括号括起来，有序集合；

- 可以通过 key 得到 value, 但不能通过 vaule 获取 key；

- 在一个 dict 中不能有重复的 key, 并且 key 是大小写敏感的；

- 键可以是数字、字符串或者是元组等不可变类型；

- 用 del 使用 key 可以删除 dict 中的独立元素；

- 用 clear 可以清除 dict 中的所有元素。

#### 4.set

- set 是建立一系列无序的，不重复的元素；

- 创建 set 的方式是调用 set()并传入一个 list，list 的元素将作为 set 的元素；

- set 和 dict 的唯一区别仅在于没有存储对应的 value。

## 4.函数

### 4.1 函数定义和调用

#### <1>定义函数

定义函数的格式如下：
def 函数名():
代码
demo:

```python
# 定义一个函数，能够完成打印信息的功能
    def printInfo():
    print '------------------------------------'
    print '     人生苦短，我用Python'
    print '------------------------------------'
```

#### <2>调用函数

```python
printInfo()
```

### 4.2.局部变量和全局变量

#### 局部变量

- 局部变量，就是在函数内部定义的变量
- 不同的函数，可以定义相同的名字的局部变量，但是各用个的不会产生影响
- 局部变量的作用，为了临时保存数据需要在函数中定义变量来进行存储，这就是它的作用

#### 全局变量

- 在函数中不使用 global 声明全局变量时不能修改全局变量的本质是不能修改全局变量的指向，即不能将全局变量指向新的数据。
- 对于不可变类型的全局变量来说，因其指向的数据不能修改，所以不使用 global 时无法修改全局变量。
- 对于可变类型的全局变量来说，因其指向的数据可以修改，所以不使用 global 时也可修改全局变量。

### 4.3 函数参数

#### 1. 缺省参数

调用函数时，缺省参数的值如果没有传入，则被认为是默认值。下例会打印默认的 age，如果 age 没有被传入：

```python
def printinfo( name, age = 35 ):
   # 打印任何传入的字符串
   print "Name: ", name
   print "Age ", age
```

##### 调用 printinfo 函数

```python
printinfo(name="miki" )
printinfo( age=9,name="miki" )
```

##### 以上实例输出结果：

```python
Name:  miki
Age  35
Name:  miki
Age  9
```

注意：带有默认值的参数一定要位于参数列表的最后面。

```python
>>> def printinfo(name, age=35, sex):
...     print name
...
  File "<stdin>", line 1
SyntaxError: non-default argument follows default argument
```

#### 2.不定长参数

有时可能需要一个函数能处理比当初声明时更多的参数。这些参数叫做不定长参数，声明时不会命名。

基本语法如下：

```python
    def functionname([formal_args,] *args, **kwargs):
       "函数_文档字符串"
       function_suite
       return [expression]
```

加了星号\*的变量 args 会存放所有未命名的变量参数，args 为元组；

而加\*\*的变量 kwargs 会存放命名参数，即形如 key=value 的参数， kwargs 为字典。

```python
def demo(a,b,*args,**dist):
    print(a)
    print(b)
    print(args)
    print(dist)

demo(1,2,1,2,3,name="zs",age=18)
# 1
# 2
# (1, 2, 3)
# {'name': 'zs', 'age': 18}
```

#### 3. 引用传参

可变类型与不可变类型的变量分别作为函数参数时，会有什么不同吗？
Python 有没有类似 C 语言中的指针传参呢？

```python
>>> def selfAdd(a):
...     """自增"""
...     a += a
...
>>> a_int = 1
>>> a_int
1
>>> selfAdd(a_int)
>>> a_int
1
>>> a_list = [1, 2]
>>> a_list
[1, 2]
>>> selfAdd(a_list)
>>> a_list
[1, 2, 1, 2]
```

Python 中函数参数是引用传递（注意不是值传递）。

- 对于不可变类型，因变量不能修改，所以运算不会影响到变量自身；
- 而对于可变类型来说，函数体中的运算有可能会更改传入的参数变量。

### 4.4 局部变量、全局变量

#### 1.局部变量

- 局部变量，就是在函数内部定义的变量
- 不同的函数，可以定义相同的名字的局部变量，但是各用个的不会产生影响
- 局部变量的作用，为了临时保存数据需要在函数中定义变量来进行存储，这就是它的作用

```python
    def test():
    a=100
    print(a)
    def test2():
    a=300
    print(a)
     test() #100
     test2() #300
```

#### 2.全局变量

<1>什么是全局变量

- 如果一个变量，既能在一个函数中使用，也能在其他的函数中使用，这样的变量就是全局变量

```python
# 定义全局变量
    a = 100

    def test1():
    print(a)

    def test2():
    print(a)

    # 调用函数
    test1() #100
    test2() #100
```

<2>全局变量和局部变量名字相同问题
看如下代码:

```python
# 定义全局变量
    a = 100

    def test1():
    a=300
    print("=test1=修改前==%d"%a)
    a=100
    print("=test1=修改后==%d"%a)

    def test2():
    print("=test3=========%d"%a)

    # 调用函数
    test1() #100
    test2() #100
```

<3>修改全局变量

```python
    a = 1
     def f():
...     a += 1
...     print a
...
    f() #报错
    a=100
    def test():
    global a
    print('----修改前-----%d'%a) #100
    a=300
    print('----修改后-----%d'%a) #300
    def test1():
    print('----test1-----%d'%a) #300
    test()
    test1()
#在函数中不使用global声明全局变量时不能修改全局变量的本质是不能修改全局变量的指向，即不能将全局变量指向新的数据。
# 对于不可变类型的全局变量来说，因其指向的数据不能修改，所以不使用global时无法修改全局变量。
    >>> li = [1,]
>>> def f2():
...     li.append(1)
...     print li
...
>>> f2()
[1, 1]
>>> li
[1, 1]
```

对于可变类型的全局变量来说，因其指向的数据可以修改，所以不使用 global 时也可修改全局变量。

```python
>>> li = [1,]
>>> def f2():
...     li.append(1)
...     print li
...
>>> f2()
[1, 1]
>>> li
[1, 1]
```

## 5.文件操作

### 5.1 文件的打开与关闭

#### <1>打开文件

在 python，使用 open 函数，可以打开一个已经存在的文件，或者创建一个新文件

open(文件名，访问模式)

示例如下：

```python

    f = open('test.txt', 'w')
```

| 访问模式 | 说明                                                                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| r        | 以只读方式打开文件。文件的指针将会放在文件的开头。这是默认模式。                                                                                                   |
| w        | 打开一个文件只用于写入。如果该文件已存在则将其覆盖。如果该文件不存在，创建新文件。                                                                                 |
| a        | 打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。             |
| rb       | 以二进制格式打开一个文件用于只读。文件指针将会放在文件的开头。这是默认模式。                                                                                       |
| wb       | 以二进制格式打开一个文件只用于写入。如果该文件已存在则将其覆盖。如果该文件不存在，创建新文件。                                                                     |
| ab       | 以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。 |
| r+       | 打开一个文件用于读写。文件指针将会放在文件的开头。                                                                                                                 |
| w+       | 打开一个文件用于读写。如果该文件已存在则将其覆盖。如果该文件不存在，创建新文件。                                                                                   |
| a+       | 打开一个文件用于读写。如果该文件已存在，文件指针将会放在文件的结尾。文件打开时会是追加模式。如果该文件不存在，创建新文件用于读写。                                 |
| rb+      | 以二进制格式打开一个文件用于读写。文件指针将会放在文件的开头。                                                                                                     |
| wb+      | 以二进制格式打开一个文件用于读写。如果该文件已存在则将其覆盖。如果该文件不存在，创建新文件。                                                                       |
| ab+      | 以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。如果该文件不存在，创建新文件用于读写。                                             |

#### <2>关闭文件

close( )

示例如下：

```python
    # 新建一个文件，文件名为:test.txt
    f = open('test.txt', 'w')

    # 关闭这个文件
    f.close()
```

### 5.2 文件的读写

#### <1>写数据(write)

使用 write()可以完成向文件写入数据

demo:

```python

f = open('test.txt', 'w')
f.write('hello world, i am here!')
f.close()
```

运行现象:
hello world, i am here!

- 注意：如果文件不存在那么创建，如果存在那么就先清空，然后写入数据

#### <2>读数据(read)

使用 read(num)可以从文件中读取数据，num 表示要从文件中读取的数据的长度（单位是字节），如果没有传入 num，那么就表示读取文件中所有的数据

demo:

```python

f = open('test.txt', 'r')

content = f.read(5)

print(content)

print("-"*30)

content = f.read()

print(content)

f.close()
```

运行现象：

```python
hello
------------------------
world, i am here!
```

注意：

- 如果 open 是打开一个文件，那么可以不用谢打开的模式，即只写 open('test.txt')
- 如果使用读了多次，那么后面读取的数据是从上次读完后的位置开始的

#### <3>读数据（readlines）

就像 read 没有参数时一样，readlines 可以按照行的方式把整个文件中的内容进行一次性读取，并且返回的是一个列表，其中每一行的数据为一个元素

```python
#coding=utf-8

f = open('test.txt', 'r')

content = f.readlines()

print(type(content))

i=1
for temp in content:
    print("%d:%s"%(i, temp))
    i+=1

f.close()
```

运行现象：

```python
type 'list'
1:'hello world, i am here!',
2:'hello world, i am here!',
3:'hello world, i am here!',
4:'hello world, i am here!',
5:'hello world, i am here!',
```

#### <4>读数据（readline）

```python
#coding=utf-8

f = open('test.txt', 'r')

content = f.readline()
print("1:%s"%content)

content = f.readline()
print("2:%s"%content)


f.close()
```

### 5.3 制作文件的备份

- 任务描述:输入文件的名字，然后程序自动完成对文件进行备份

```python
#coding=utf-8

oldFileName = input("请输入要拷贝的文件名字:")

oldFile = open(oldFileName,'r')

# 如果打开文件
if oldFile:

    # 提取文件的后缀
    fileFlagNum = oldFileName.rfind('.')
    if fileFlagNum > 0:
    fileFlag = oldFileName[fileFlagNum:]

    # 组织新的文件名字
    newFileName = oldFileName[:fileFlagNum] + '[复件]' + fileFlag

    # 创建新文件
    newFile = open(newFileName, 'w')

    # 把旧文件中的数据，一行一行的进行复制到新文件中
    for lineContent in oldFile.readlines():
    newFile.write(lineContent)

    # 关闭文件
    oldFile.close()
    newFile.close()
```

### 5.4 文件的随机读写

#### <1>获取当前读写的位置

在读写文件的过程中，如果想知道当前的位置，可以使用 tell()来获取

```python
    # 打开一个已经存在的文件
    f = open("test.txt", "r")
    str = f.read(3)
    print "读取的数据是 : ", str

    # 查找当前位置
    position = f.tell()
    print "当前文件位置 : ", position

    str = f.read(3)
    print "读取的数据是 : ", str

    # 查找当前位置
    position = f.tell()
    print "当前文件位置 : ", position

    f.close()
```

#### <2>定位到某个位置

如果在读写文件的过程中，需要从另外一个位置进行操作的话，可以使用 seek()

- seek(offset, from)有 2 个参数 - offset:偏移量 - from:方向 - 0:表示文件开头 - 1:表示当前位置 - 2:表示文件末尾
  demo:把位置设置为：从文件开头，偏移 5 个字节

```python
    # 打开一个已经存在的文件
    f = open("test.txt", "r")
    str = f.read(30)
    print "读取的数据是 : ", str
```

### 5.5 文件的重命名、删除

有些时候，需要对文件进行重命名、删除等一些操作，python 的 os 模块中都有这么功能

#### <1>文件重命名

- os 模块中的 rename()可以完成对文件的重命名操作
- rename(需要修改的文件名, 新的文件名)

```python
    import os

    os.rename("毕业论文.txt", "毕业论文-最终版.txt")
```

#### <2>删除文件

- os 模块中的 remove()可以完成对文件的删除操作

- remove(待删除的文件名)

```python
    import os

    os.remove("毕业论文.txt")

    # 查找当前位置
    position = f.tell()
    print "当前文件位置 : ", position

    # 重新设置位置
    f.seek(5,0)

    # 查找当前位置
    position = f.tell()
    print "当前文件位置 : ", position

    f.close()
```

demo:把位置设置为：离文件末尾，3 字节处

```python
    # 打开一个已经存在的文件
    f = open("test.txt", "r")

    # 查找当前位置
    position = f.tell()
    print "当前文件位置 : ", position

    # 重新设置位置
    f.seek(-3,2)

    # 读取到的数据为：文件最后3个字节数据
    str = f.read()
    print "读取的数据是 : ", str

    f.close()
```

### 5.6 文件夹的相关操作

- 实际开发中，有时需要用程序的方式对文件夹进行一定的操作，比如创建、删除等

- 就像对文件操作需要 os 模块一样，如果要操作文件夹，同样需要 os 模块

#### <1>创建文件夹

```python
    import os

    os.mkdir("张三")
```

#### <2>获取当前目录

```python
    import os

    os.getcwd()
```

#### <3>改变默认目录

```python
    import os

    os.chdir("../")
```

#### <4>获取目录列表

```python
    import os

    os.listdir("./")
```

#### <5>删除文件夹

```python
    import os

    os.rmdir("张三")
```

### 5.7 批量修改文件名

```python
 #coding=utf-8

    # 批量在文件名前加前缀

    import os

    funFlag = 1 # 1表示添加标志  2表示删除标志

    folderName = './renameDir/'

    # 获取指定路径的所有文件名字
    dirList = os.listdir(folderName)

    # 遍历输出所有文件名字
    for name in dirList:
    print name

    if funFlag == 1:
        newName = '[东哥出品]-' + name
    elif funFlag == 2:
        num = len('[东哥出品]-')
        newName = name[num:]
    print newName

    os.rename(folderName+name, folderName+newName)
```

## 6.面向对象

### 6.1 定义类

定义一个类，格式如下：

```
class 类名:
    方法列表
```

demo：定义一个 Car 类

```python
# 定义类
class Car:
    # 方法
    def getCarInfo(self):
    print('车轮子个数:%d, 颜色%s'%(self.wheelNum, self.color))

    def move(self):
    print("车正在移动...")
```

**说明**：

- 定义类时有 2 种：新式类和经典类，上面的 Car 为经典类，如果是 Car(object)则为新式类
- 类名 的命名规则按照"大驼峰"

### 6.2 创建对象(类实例化)

```
创建对象的格式为:

对象名 = 类名()
```

创建对象 demo:

```python
# 定义类
class Car:
    # 移动
    def move(self):
    print('车在奔跑...')

    # 鸣笛
    def toot(self):
    print("车在鸣笛...嘟嘟..")


# 创建一个对象，并用变量BMW来保存它的引用
BMW = Car()
BMW.color = '黑色'
BMW.wheelNum = 4 #轮子数量
BMW.move()
BMW.toot()
print(BMW.color)
print(BMW.wheelNum)
```

### 6.3**init**()方法

<1>**init**()方法的调用

```python
# 定义汽车类
class Car:

    def __init__(self):
    self.wheelNum = 4
    self.color = '蓝色'

    def move(self):
    print('车在跑，目标:夏威夷')

# 创建对象
BMW = Car()

print('车的颜色为:%s'%BMW.color) #车的颜色为:
print('车轮胎数量为:%d'%BMW.wheelNum)
```

### 6.4**str**()方法

```python
class Car:

    def __init__(self, newWheelNum, newColor):
    self.wheelNum = newWheelNum
    self.color = newColor

    def __str__(self):
    msg = "嘿。。。我的颜色是" + self.color + "我有" + int(self.wheelNum) + "个轮胎..."
    return msg

    def move(self):
    print('车在跑，目标:夏威夷')


BMW = Car(4, "白色")
print(BMW)
```

### 6.5 self

- 所谓的 self，可以理解为自己
- 可以把 self 当做 C++中类里面的 this 指针一样理解，就是对象自身的意思
- 某个对象调用其方法时，python 解释器会把这个对象作为第一个参数传递给 self，所以开发者只需要传递后面的参数即可

### 6.6**del**()方法

```python

#创建对象后，python解释器默认调用__init__()方法；

#当删除一个对象时，python解释器也会默认调用一个方法，这个方法为__del__()方法
import time
class Animal(object):

    # 初始化方法
    # 创建完对象后会自动被调用
    def __init__(self, name):
    print('__init__方法被调用')
    self.__name = name


    # 析构方法
    # 当对象被删除时，会自动被调用
    def __del__(self):
    print("__del__方法被调用")
    print("%s对象马上被干掉了..."%self.__name)

# 创建对象
dog = Animal("哈皮狗")

# 删除对象
del dog


cat = Animal("波斯猫")
cat2 = cat
cat3 = cat

print("---马上 删除cat对象")
del cat
print("---马上 删除cat2对象")
del cat2
print("---马上 删除cat3对象")
del cat3

print("程序2秒钟后结束")
time.sleep(2)

__init__方法被调用
__del__方法被调用
#哈皮狗对象马上被干掉了...
#__init__方法被调用
#---马上 删除cat对象
#---马上 删除cat2对象
#---马上 删除cat3对象
#__del__方法被调用
#波斯猫对象马上被干掉了...


```

### 6.7 单继承

```python
class Animal(object):

    def __init__(self, name='动物', color='白色'):
    self.__name = name
    self.color = color

    def __test(self):
    print(self.__name)
    print(self.color)

    def test(self):
    print(self.__name)
    print(self.color)



class Dog(Animal):
    def dogTest1(self):
    #print(self.__name) #不能访问到父类的私有属性
    print(self.color)


    def dogTest2(self):
    #self.__test() #不能访问父类中的私有方法
    self.test()


A = Animal()
#print(A.__name) #程序出现异常，不能访问私有属性
print(A.color)
#A.__test() #程序出现异常，不能访问私有方法
A.test()

print("------分割线-----")

D = Dog(name = "小花狗", color = "黄色")
D.dogTest1()
D.dogTest2()

```

- 私有的属性，不能通过对象直接访问，但是可以通过方法访问
- 私有的方法，不能通过对象直接访问
- 私有的属性、方法，不会被子类继承，也不能被访问
- 一般情况下，私有的属性、方法都是不对外公布的，往往用来做内部的事情，起到安全的作用

### 6.8 多继承

```python
# 定义一个父类
class A:
    def printA(self):
    print('----A----')

# 定义一个父类
class B:
    def printB(self):
    print('----B----')

# 定义一个子类，继承自A、B
class C(A,B):
    def printC(self):
    print('----C----')

obj_C = C()
obj_C.printA()
obj_C.printB()
运行结果:

----A----
----B----
```

### 6.9 重写父类方法与调用父类方法

<1> 重写父类方法
所谓重写，就是子类中，有一个和父类相同名字的方法，在子类中的方法会覆盖掉父类中同名的方法

```python
#coding=utf-8
class Cat(object):
    def sayHello(self):
    print("halou-----1")


class Bosi(Cat):

    def sayHello(self):
    print("halou-----2")

bosi = Bosi()

bosi.sayHello() #halou-----2
```

<2>调用父类的方法

```python
#coding=utf-8
class Cat(object):
    def __init__(self,name):
    self.name = name
    self.color = 'yellow'


class Bosi(Cat):

    def __init__(self,name):
    # 调用父类的__init__方法1(python2)
    #Cat.__init__(self,name)
    # 调用父类的__init__方法2
    #super(Bosi,self).__init__(name)
    # 调用父类的__init__方法3
    super().__init__(name)

    def getName(self):
    return self.name

bosi = Bosi('xiaohua')

print(bosi.name) #xiaohua
print(bosi.color) #yellow
```

### 6.10 多态

多态的概念是应用于 Java 和 C#这一类强类型语言中，而 Python 崇尚“鸭子类型”。

所谓多态：定义时的类型和运行时的类型不一样，此时就成为多态

Python 伪代码实现 Java 或 C#的多态

```python
class F1(object):
    def show(self):
    print 'F1.show'

class S1(F1):
    def show(self):
    print 'S1.show'

class S2(F1):
    def show(self):
    print 'S2.show'

# 由于在Java或C#中定义函数参数时，必须指定参数的类型
# 为了让Func函数既可以执行S1对象的show方法，又可以执行S2对象的show方法，所以，定义了一个S1和S2类的父类
# 而实际传入的参数是：S1对象和S2对象

def Func(F1 obj):
    """Func函数需要接收一个F1类型或者F1子类的类型"""

    print obj.show()

s1_obj = S1()
Func(s1_obj) # 在Func函数中传入S1类的对象 s1_obj，执行 S1 的show方法，结果：S1.show

s2_obj = S2()
Func(s2_obj) # 在Func函数中传入Ss类的对象 ss_obj，执行 Ss 的show方法，结果：S2.show
```
