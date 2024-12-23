# JavaAPI

## Scanner

`Scanner`是JDK提供的一个类,位于`java.util`包下,用来接收用户在控制台输入的信息。

**作用**

```ts
此类中提供了用于接收各种类型数据的方法，多用于接收用户输入的各种信息
```

**方法**

```shell
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

## String

方法

```ts
equals() 
对字符串进行判断 必须使用equals方法
用法： 变量名.equals("比较的内容")
返回值：boolean类型
```

