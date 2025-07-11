# JavaAPI

## Scanner类

`Scanner`是JDK提供的一个类,位于`java.util`包下,用来接收用户在控制台输入的信息。

**作用**

```ts
此类中提供了用于接收各种类型数据的方法，多用于接收用户输入的各种信息
```

**方法**

```java
next() 接收用户输入的字符串
nextByte() 接收用户输入的byte类型的数据
nextShort() 接收用户输入的short类型的数据
nextInt() 接收用户输入的int类型的数据
nextLong() 接收long类型的数据
nextFloat() 接收float类型的数据
nextDouble() 接收double类型的数据
nextBoolean() 接收布尔类型的数据
```

**使用**

```ts
导包：Scanner类是位于java.util包中类 是JDK提供的 所以我们如需使用 必须导包 
```

**异常**

```ts
如果输入类型不匹配的数据 将会出现 ：InputMismatchException 输入不匹配异常

异常会中断我们的程序
```

**示例**

```java
package com.atguigu.test3;
// 导包，使用JDK中封装的 class类 Scanner
import java.util.Scanner;
/**
 * @author WHD
 * @description TODO
 * @date 2023/7/29 14:16
 *  需求：使用Scanner类 接收用户输入的各种信息
 *  如果输入类型不匹配的数据 将会出现 ：InputMismatchException 输入不匹配异常
 *  异常会中断我们的程序
 */
public class TestScanner {
    public static void main(String[] args) {
        // 创建Scanner类型的变量 取名为input
        // 通过Scanner类，传入一个参数，创建scanner实例。
        Scanner input = new Scanner(System.in);

        // 提示用户输入数据
        System.out.println("请输入您的名字");

        // 表示接收用户输入的数据 并且赋值给name变量
        // 当程序执行到这一步 会停下来等待用户输入
        // 用户输入完毕 按下回车 程序再继续执行
        String name = input.next();

        // 将用户输入的信息打印
        System.out.println("您输入的名字是：" + name);
        System.out.println("请输入您的年龄");
        int age = input.nextInt();
        System.out.println("您输入的年龄为：" + age);
        System.out.println("请输入您的身高");
        double height = input.nextDouble();
        System.out.println("您输入的身高为：" + height);
        System.out.println("请输入您今天是否开心？");
        boolean isHappy = input.nextBoolean();
        System.out.println(isHappy == true ? "恭喜你很开心" : "没有什么大不了的");
        System.out.println(isHappy  ? "恭喜你很开心" : "没有什么大不了的");

    }
}
```

## String类

String类是 `Java.lang` 包中的类，`Java.lang` 包默认加载，不用导包。

**方法**

```ts
equals():对两个字符串对象是否相同进行判断
参数：字符串对象
返回值：boolean类型

例子：
String str1 = "hello";
String str2 = "hello";
boolean result = str1.equals(str2);
```

```ts
length()：表示获取字符串的长度
参数：无
返回值：int类型

例子：
String str1 = "hello";
System.out.println(str1.length());
```

```java
toCharArray()：将字符串 str1 转换为一个字符数组（char[]）
参数：无
返回值：返回一个新的 char[] 数组

例子：
String str1 = "hello";
char[] chars = str1.toCharArray();
for (char c : chars) {
    System.out.println(c);
}
```



## Object类

Object类是所有类的父亲，所有类都可以直接使用Object类中的方法。

**属性**

```java
Object类中没有属性。
```

**方法**

```ts
getClass().getName() 获取当前类的包名+类名。
参数：无
返回值：String

例子：
String result = getClass().getName();
```

```java
equals()：比较两个对象地址是否相同
参数：无
返回值：boolean

例子：
Person per1 = new Persion();
Person per2 = new Persion();
boolean result = per1.equals(per2);
```

```java
toString():默认返回当前对象包名和哈希值，通常会被重写
参数：无
返回值：String
    
例子：
Person per2 = new Persion();
String result = per2.toString();// 和直接打印对象，效果是一样的。
```

```java
hashCode()：默认返回当前对象的哈希值，通常会被重写
参数：无
返回值：int

例子：
Person per2 = new Persion();
int result = per2.hashCode();
System.out.println("per2 "+per2.hashCode());

说明：
哈希值是由对象的地址等一些信息，使用凑杂算法计算出来的一个十进制的数值。哈希值不是地址值。
Java中的地址值无法获取,计算Hash值的方式也无法获取。
哈希值是通过对象的地址和一些信息进行加权，计算出来的十进制数值。
hashCode()方法中使用了equals()方法的比较规则进行计算哈希值。
```

