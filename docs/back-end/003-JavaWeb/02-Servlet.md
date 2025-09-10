# Servlet技术

## 基本概念

1、Servlet 是JavaEE 规范之一。规范就是接口

2、Servlet 就JavaWeb 三大组件之一。三大组件分别是：Servlet 程序、Filter 过滤器、Listener 监听器。

3、Servlet 是运行在服务器上的一个java 小程序，它可以接收客户端发送过来的请求，并响应数据给客户端。

## API

### GenericServlet类

Tomcat包中的实现方法。

### ServletRequest类

### ServletResponse类

## 使用步骤

### 方式一

1、首先将`GenericServlet类`导入到Idea环境变量中；

```java
GenericServlet 类位于 Tomcat 安装目录中的 tomcat安装目录/lib/servlet-api.jar 包中

点击项目文件夹，点击File，选择 Project Structure，选择Modules，切换到Dependencies选项卡。
    
点击 + 号，选择library，选择Tomcat（如果在Idea中配置过Tomcat，这里会有显示）
```

![image-20250910142738704](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20250910142738704.png)

2、编写一个Servlet类；

```java
package com.fruit.servlet;

import javax.servlet.GenericServlet;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class loginServlet extends GenericServlet {
    // 当请求到来时，service会被自动调用(通过tomcat利用反射技术进行调用)
    @Override
    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
        // 1. 设置响应类型
        // 这里告诉浏览器返回的是文本内容，编码为UTF-8，避免中文乱码
        res.setContentType("text/html;charset=UTF-8");

        // 2 获取请求参数
        String uname = req.getParameter("uname");
        String pwd = req.getParameter("pwd");

        // 3. 打印到控制台（便于调试）
        System.out.println("账号密码分别为" + uname + pwd);

        // 4. 获取输出流，向浏览器返回响应
        PrintWriter out = res.getWriter();

        // 5. 返回简单HTML响应
        if ("admin".equals(uname) && "123456".equals(pwd)) {
            out.println("<h1>登录成功，欢迎：" + uname + "</h1>");
        } else {
            out.println("<h1>登录失败，请检查用户名或密码</h1>");
        }

        // 6. 关闭流
        out.close();
    }
}
```

```java
service方法中：
    参数中req是请求对象，res是响应对象。

```

3、更改Tomcat配置，设置更新重新部署，IDEA失去焦点重新编译资源。

![image-20250910142820828](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20250910142820828.png)

3、实现service 方法，处理请求，并响应数据；

4、到web.xml 中去配置servlet 程序的访问地址；

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
<!--登陆请求-->
    <servlet>
        <servlet-name>login</servlet-name>
        <servlet-class>com.fruit.servlet.loginServlet</servlet-class>
    </servlet>
    <servlet-mapping>
        <servlet-name>login</servlet-name>
        <url-pattern>/login</url-pattern>
    </servlet-mapping>
</web-app>
```

5、新建前端页面 login.html

```html
<!DOCTYPE html>
<html lang="" xmlns="http://www.w3.org/1999/html">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>
        TomCat
    </title>
</head>

<body>
    
    <div id="app">Welcome</div>
    <form action="abcd" method="post">
        账号: <input type="text" name="uname"></br>
        密码: <input type="password" name="pwd"></br>
        <button>登陆</button>
    </form>
</body>
```

✨ 注意：

```java
注意：<url-pattern>/hello</url-pattern>中的地址必须以斜杠打头
```

### 方式二

使用 Servlet3 + 注解方式实现（无需 web.xml）

步骤：

1、下载 **Servlet API 3.x JAR**

```java
例如 javax.servlet-api-3.1.0.jar
    
Maven 仓库下载地址：https://mvnrepository.com/artifact/javax.servlet/javax.servlet-api/3.1.0
```

2、将 JAR 添加到项目的 **classpath** 或 IDE 的 **Libraries** 中

```java
package com.fruit.servlet;

import javax.servlet.annotation.WebServlet;
import javax.servlet.GenericServlet;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * 使用 Servlet 3.0 注解方式
 */
@WebServlet("/login")  // 设置访问路径为 /login
public class LoginServlet extends GenericServlet {

    @Override
    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
        res.setContentType("text/html;charset=UTF-8");

        String uname = req.getParameter("uname");
        String pwd = req.getParameter("pwd");

        PrintWriter out = res.getWriter();

        if ("admin".equals(uname) && "123456".equals(pwd)) {
            out.println("<h1>登录成功，欢迎：" + uname + "</h1>");
        } else {
            out.println("<h1>登录失败，请检查用户名或密码</h1>");
        }

        out.close();
    }
}

```

3、Tomcat 自带 Servlet API，一般无需打包到 WAR 文件中。

**小结**

- **包**：`javax.servlet` 和 `javax.servlet.annotation`
- **核心类**：`GenericServlet`, `HttpServlet`, `ServletRequest`, `ServletResponse`, `@WebServlet` 等
- **注意**：运行时依赖 Tomcat，不要把 `javax.servlet-api` 打包到 WAR

访问路径：

```java
http://localhost:8080/yourWebApp/login?uname=admin&pwd=123456
```



## 生命周期



## 请求处理

### Get请求和POST请求



## httpServlet

通过继承httpServlet实现Servlet程序。