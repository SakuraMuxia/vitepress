# JavaSE概述

## 名词解释

* **JVM**（Java Virtual Machine ）: Java虚拟机  JVM相当于一个软件 在不同的平台模拟相同的环境 以实现跨平台的效果
* **JRE**(Java Runtime Environment) : Java运行环境，包含`JVM` 和运行时所需要的`核心类库`。
* **JDK**(Java Development Kit) : Java开发工具包 ，包含`JRE` 和开发人员使用的工具。

> 三者关系：JDK包含 JRE  JRE包含JVM  

## 配置环境

```ts
安装 jdk

配置环境变量
右键此电脑 ==> 高级系统设置 ==> 高级 ==> 环境变量

系统变量 ==> 新建变量

名：JAVA_HOME
值： C:\Program Files\Java\jdk1.8.0_131

找到Path变量==>编辑 ==>新建

直接写值：%JAVA_HOME%\bin

所有已打开的窗口全部确定即可

测试 cmd
javac -version 
java -version
以上两个命令都出现版本号表示安装JDK并且环境变量配置成功
```

**关于配置环境变量问题补充**

```ts
1.为什么不直接在Path变量中配置C:\Program Files\Java\jdk1.8.0_131\bin

直接在Path变量中写为C:\Program Files\Java\jdk1.8.0_131\bin 这样的格式目前也是没有问题的 也可以使用
但是后续我们使用的一些工具将默认查找JAVA_HOME变量 比如 tomcat maven等等 

2.为什么要配置环境变量？

配置环境变量相当于把bin目录下的命令通知给操作系统 便于我们使用当前目录下对应的命令

3.为什么不配置classpath ？

classpath表示类路径 (即JVM加载类会寻找的路径)
早期(JDK1.5之前)的JDK都需要配置此环境变量  从JDK1.5开始 不需要人为的配置此变量 

如果配置了，一定删掉
```

## 开发工具

集成开发环境（Integrated Development Environment，IDE）

把代码编写，编译，执行，调试等多种功能综合到一起的开发工具。

## 开发步骤

**新建文件**

```java
/**HelloWorld.java**/
/**主类是指包含main方法的类，main方法是Java程序的入口**/
public class HelloWorld{ // public 公开 class 类 HelloWorld 类名
	public static void main(String [] args){ 
        // public 公开 static 静态 void 返回值空 main 主方法(函数)入口
        // args 为 arguments的简写(参数),参数的类型是string类型的数组
        // 使用JavaAPI中的System.out.print
		System.out.print("Yukisakuna 241202");
	}
}
```

**编译**

第一个`HelloWord` 源程序就编写完成了，但是这个文件是程序员编写的，JVM是看不懂的，也就不能运行，因此我们必须将编写好的`Java源文件` 编译成JVM可以看懂的`字节码文件` ，也就是`.class`文件

```ts
// 生成 .class 字节码文件
javac HelloWorld.java

// 通过idea工具可以将class文件反编译,看到源代码
```

**执行**

```ts
java 主类名字
java HelloChina
```

## 源文件名与类名

## 源文件名和类名规范

```ts
public 修饰的类名 需要和 源文件名保持一致
public 修饰的类名 需要和 源文件名 需要首字母大写(驼峰命名法)
```

（1）源文件名是否必须与类名一致？public呢？

```java
如果这个类不是public，那么源文件名可以和类名不一致。但是不便于代码维护。

如果这个类是public，那么要求源文件名必须与类名一致。否则编译报错。

我们建议大家，不管是否是public，都与源文件名保持一致，而且一个源文件尽量只写一个类，目的是为了好维护。
    
public 修饰的类名必须要与 文件名保持一致
```

（2）一个源文件中是否可以有多个类？public呢？

```java
一个源文件中可以有多个类，编译后会生成多个.class字节码文件。

但是一个源文件只能有一个public的类。
```

## 注释

```java
单行注释
    //注释文字
多行注释
    /* 
    注释文字1 
    注释文字2
    注释文字3
    */
文档注释 (Java特有)
    /**
      @author  指定java程序的作者
      @version  指定源文件的版本
    */ 
```

文档注释

```ts
// 文档注释内容可以被JDK提供的工具 javadoc 所解析，生成一套以网页文件形式体现的该程序的说明文档。
javadoc -d mydoc -author -version HelloWorld.java
```

## 编码格式

```ts
乱码
记事本默认编码格式为UTF-8 而JVM默认文件的编码格式为GBK 最终原因也就是因为编码格式不一致所导致
```

```ts
public class HelloWorld{
	public static void main(String [] args){
       
		System.out.print(System.getProperty("file.encoding"));  // 打印JVM默认文件编码格式
		System.out.print("hello world 666 世界你好");
		
	}
}
```

## 包的概念

```ts
包就是文件夹 
	用来对java文件分门别类的管理
    更加方便结构更加清晰
```

> 包名的命名规范

```ts
全部小写 
域名倒置  com-oracle-net
不能以点开头或者结尾 
只能包含点 
每存在一个点 表示一个子文件夹
```

> :warning:
>
> 举例：  域名 www.baidu.com      包名 com.baidu.xxx
>
> 在包中所编写的类 必须使用 `package`关键字声明当前类所在包  声明包的语句必须在java文件的第一行 
>
> 使用不在同包的类需要导包 使用`import`关键字导包 导包的语句必须在声明包之后 在声明类之前

![image-20241204132100673](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20241204132100673.png)

## 类的概念

```ts
安装的jdk相当于把别人写好的 8000+ 的类复制到自己的电脑上可以使用
```

### 类的规则

> 同一个源文件中可以定义多个类。
>
> 编译后，每个类都会生成独立的 .class文件。
>
> 一个类中，只能有一个main方法，每个类都可以有自己的main方法
>
> public修饰的类称为公开类，要求类名必须与文件名称完全相同，包括大小写。
>
> 一个源文件中，只能有一个公开类。

```java
package com.yuluochenxiao.test2;

/**
 *  同一个源文件中可以定义多个类。
 *  编译后，每个类都会生成独立的 .class文件。
 *  一个类中，只能有一个main方法，每个类都可以有自己的main方法
 *  public修饰的类称为公开类，要求类名必须与文件名称完全相同，包括大小写。
 *  一个源文件中，只能有一个公开类。
 */
public class ClassDescription {
    public static void main(String[] args) {
        System.out.println("TestClassDescription print");
    }
}

class B{
    public static void main(String[] args) {
        System.out.println("B class print");
    }
}

class C{
    public static void main(String[] args) {
        System.out.println("C class print");
    }
}
```



## JavaAPI

API （Application Programming Interface，应用程序编程接口）是 Java 提供的基本编程接口

Java语言提供了大量的基础类

```ts
使用JavaAPI的原理就是使用jdk中的jar包中的java文件
```

```ts
https://docs.oracle.com/en/java/javase/17/docs/api/index.html
离线下载：https://www.oracle.com/java/technologies/javase-jdk17-doc-downloads.html
```

## Idea快捷键

```ts
psvm	创建一个main方法
sout	输出
soutv 	自动生成打印上一行变量的输出语句

同时注释多行代码：选中代码 ctrl + /
自动对齐/格式化代码 ： ctrl + alt + L
红色波浪线：鼠标移动上去 查看报错信息

移动整行代码 ：shift + alt + ↑↓
复制整行代码：ctrl + d
导包：alt+回车


使用结构包裹代码：ctrl + alt + t 
删除数据库中的一条记录：ctrl + t ,然后提交 commit
```

