# JDBC

## 概念

JDBC：Java Database Connectivity，它是代表一组独立于任何数据库管理系统（DBMS）的API，声明在java.sql与javax.sql包中，是SUN(现在Oracle)提供的一组接口规范。由各个数据库厂商来提供实现类，这些实现类的集合构成了数据库驱动jar。

![image-20250826154855771](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20250826154855771.png)

![image-20250826155215758](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20250826155215758.png)

```java
JDBC是SUN公司提供的一套规范，一套接口，位于java.sql包中。
具体实现类有各个厂商负责实现来连接各自的数据库。
```

## 基本使用

### 准备驱动

```ts
前提操作：
1.选中项目文件 右键new directory 创建名为lib的文件夹
2.将mysql jdbc对应的jar文件粘贴到此目录，例如：mysql-connector-java-8.0.25.jar
3.选中lib文件夹 右键 add as library，这样就可以下拉查看里边的class文件了
```

### 使用步骤

```java
try {
    // 1. 加载驱动
    Class.forName("com.mysql.cj.jdbc.Driver");
    // 2. 获取连接对象
    String url = "jdbc:mysql://192.168.1.38:3306/chatai";
    String userName = "xxx";
    String password = "xxx";
    // 获取对象
    Connection connection = DriverManager.getConnection(url, userName, password);
    // 3. 创建执行SQL语句st对象
    Statement st = connection.createStatement();
    // 4. 编写SQL
    String sql = "select * from student";
    // 5. 执行SQL
    ResultSet resultSet = st.executeQuery(sql);
    // 6. 遍历结果集
    while (resultSet.next()){
        int anInt = resultSet.getInt(1);
        String anString = resultSet.getString(2);
        System.out.println("第一列数据为:" + anInt);
        System.out.println("第二列数据为:" + anString);
    }
} catch (ClassNotFoundException e) {
    e.printStackTrace();
} catch (SQLException e) {
    e.printStackTrace();
}
```

## API

### DriverManager类

位于java.sql包中，驱动管理类。

**构造方法**：

```java
无
```

**方法**：

getConnection()（静态方法）

```java
作用：获取数据库连接对象
    
参数：url地址,用户名,密码
    
返回值：Connection对象
    
示例：
String url = "jdbc:mysql://xxx.xxx.xxx.xxx:3306/数据库名称";
String userName = "xxx";
String password = "xxx";
// 获取对象
Connection connection = DriverManager.getConnection(url, userName, password);
```



### Connection接口

位于java.sql包中，数据库连接对象，他的实现类就是我们导入的mysql公司提供的jar包中的文件。

**构造方法**：

```java
无
```

**方法**：

createStatement()

```java
作用：创建SQL语句对象
    
参数：无
    
返回值：Statement对象
    
示例：
// 获取对象
Connection connection = DriverManager.getConnection(url, userName, password);
// 3. 创建执行SQL语句st对象
Statement st = connection.createStatement();
```

close()

```java
作用：关闭连接
    
参数：无
    
返回值：无
    
示例：
// 获取对象
Connection connection = DriverManager.getConnection(url, userName, password);
// 3. 创建执行SQL语句st对象
Statement st = connection.createStatement();
// 关闭连接
connection.close;
```

prepareStatement(String sql)

```java
作用：创建一个 PreparedStatement对象
    
参数：String类型的SQL语句
    
返回值：PreparedStatement类型对象
    
示例：
// 获取对象
Connection connection = DriverManager.getConnection(url, userName, password);
// 定义一个SQL
String sql = "select * from user where userName = ? and password = ?";

// 创建执行SQL语句pst对象
PrepareedStatement pst = connection.prepareStatement(sql);
// 传值,给第一个？的位置设置值
pst.setString(1,user);
// 传值,给第二个？的位置设置值
pst.setString(2,user);

// 执行SQL语句
ResultSet resultSet = pst.executeQuery();
```

prepareStatement(String sql,Statement.RETURN_GENERATED_KEYS);

```java
作用：创建一个 PreparedStatement对象,Statement.RETURN_GENERATED_KEYS 的作用就是 让 JDBC 在执行 INSERT 后返回数据库生成的自增主键，方便你在程序里继续使用（比如后续插入子表数据时需要用这个主键）
    
参数：String类型的SQL语句,Statement.RETURN_GENERATED_KEYS
    
返回值：PreparedStatement类型对象
    
示例：

// 创建执行SQL语句的 PreparedStatement 对象，指定返回自增主键
PreparedStatement pst = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

// 传值：给 SQL 中的 ? 占位符设置值
if (params != null && params.length > 0) {
    for (int i = 0; i < params.length; i++) {
        pst.setObject(i + 1, params[i]); // JDBC 的占位符索引从 1 开始
    }
}

// 执行 SQL 语句（返回受影响的行数）
int count = pst.executeUpdate();

// 获取主键值（返回的是 ResultSet）
ResultSet rs = pst.getGeneratedKeys();
if (rs.next()) {
    int id = rs.getInt(1); // 获取第一列（自增主键ID）
    System.out.println("新插入记录的ID: " + id);
}

```



### Statement接口

位于java.sql包中，用来执行sql的对象，他的实现类就是我们导入的mysql公司提供的jar包中的文件。

**构造方法**：

```java
无
```

**方法**：

executeUpdate()

```java
作用：执行SQL更新语句
    
参数：SQL语句string类型
    
返回值：int类型，大于0成功，小于0失败
    
示例：
// 获取对象
Connection connection = DriverManager.getConnection(url, userName, password);
// 创建执行SQL语句st对象
Statement st = connection.createStatement();
// 编写SQL
String sql = "xxx";
// 执行SQL
Int aint = st.executeUpdate(sql);
```

executeQuery()

```java
作用：执行SQL查询语句
    
参数：SQL语句string类型
    
返回值：ResultSet类型
    
示例：
// 获取对象
Connection connection = DriverManager.getConnection(url, userName, password);
// 创建执行SQL语句st对象
Statement st = connection.createStatement();
// 编写SQL
String sql = "select * from student";
// 执行SQL
ResultSet resultSet = st.executeQuery(sql);
```

close()

```java
作用：关闭连接
    
参数：SQL语句string类型
    
返回值：int类型，大于0成功，小于0失败
    
示例：
// 获取对象
Connection connection = DriverManager.getConnection(url, userName, password);
// 创建执行SQL语句st对象
Statement st = connection.createStatement();
// 编写SQL
String sql = "select * from student";
// 执行SQL
ResultSet resultSet = st.executeQuery(sql);
```



### PreparedStatement接口

位于java.sql包中，用来执行sql的类，他的父类是Statement类。

**构造方法**：

```java

```

**方法**：

executeUpdate()

```java
作用：执行增删改SQL语句
    
参数：无
    
返回值：int类型
    
示例：
```

executeQuery()

```java
作用：执行查询SQL语句
    
参数：无
    
返回值：ResultSet类型
    
示例：
```

setXxx()

```java
作用：将指定的参数设置为给定的值
    
参数：
    第一个是int类型，代表的是？的位置,第二个参数为当前位置传递的值；
    
返回值：int类型
    
示例：
```

toString()

```java
作用：直接打印这个对象，相当于调用它的toString方法
    
参数：
    
返回值：String类型，可以看到拼接好的sql语句
    
示例：
```

setDate()

```java
作用：将指定的参数设置为给定的值
    
参数：
    第一个是int类型，代表的是？的位置,第二个参数为当前位置传递的值,
	这个Date不是java.util包中的Date，而是java.sql.Date,这个Date没有无参构造，
    需要给这个构造方法传递一个long类型的毫秒数。
    
    
返回值：int类型
    
示例：
PrepareedStatement pst = connection.prepareStatement(sql);
// 给第一个位置，设置值为Date类型，Date使用的是Java.sql中的Date
pst.setDate(1,new Date(System.currentTimeMills()));
```

setObject()

```java
作用：将指定的参数设置为给定的值,类型为Object，任何类型都可以。
    
参数：
    第一个是int类型，代表的是？的位置,第二个参数为当前位置传递的值,
	这个Date不是java.util包中的Date，而是java.sql.Date,这个Date没有无参构造，
    需要给这个构造方法传递一个long类型的毫秒数。
    
    
返回值：int类型
    
示例：
PrepareedStatement pst = connection.prepareStatement(sql);
// 给第一个位置，设置值为Date类型，Date使用的是Java.sql中的Date
pst.setObject(1,new Date(System.currentTimeMills()));
```

getGeneratedKeys()

```java
作用：获取主键值（返回的是 ResultSet）
    
参数：无
    
返回值：返回的是 ResultSet
    
示例：
int count = pst.executeUpdate();

// 获取主键值（返回的是 ResultSet）
ResultSet rs = pst.getGeneratedKeys();
if (rs.next()) {
    int id = rs.getInt(1); // 获取第一列（自增主键ID）
    System.out.println("新插入记录的ID: " + id);
}
```



### ResultSet接口

是一个接口，位于java.sql包中，表示数据库结果集的数据表，通常通过执行查询数据库的语句生成。

（类似于数据库软件中的Excel表格形式）。

通过IO流的方式获取到数据，得到一个Socket对象（网络编程中的），拿这个Socket对象去解析数据就可以获取到数据。

```java
把Connection比喻成Socket，一个网络连接；
把Statement比喻成OutputStream，写入流；
把ResultSet比喻成InputStream，读取流；
```

**构造方法**：

```java
无
```

**方法**：

next()

```java
作用：是否存在下一条数据
    
参数：无
    
返回值：布尔类型
    
示例：
// 6. 遍历结果集
while (resultSet.next()){
    int anInt = resultSet.getInt(1);
    String anString = resultSet.getString(2);
    System.out.println("第一列数据为:" + anInt);
    System.out.println("第二列数据为:" + anString);
}
```

getInt()

```java
作用：获取结果集数据表中的列的数据，列的数据类型是Int类型
    
参数：
    当为int类型时，表示第几列的数据；
    当为string类型时，表示列的名称；
    
返回值：Int类型
    
示例：
// 6. 遍历结果集
while (resultSet.next()){
    int anInt = resultSet.getInt(1);
    String anString = resultSet.getString(2);
    System.out.println("第一列数据为:" + anInt);
    System.out.println("第二列数据为:" + anString);
}
```

getString()

```java
作用：获取结果集数据表中的列的数据，列的数据类型是String类型
    
参数：
    当为int类型时，表示第几列的数据；
    当为string类型时，表示列的名称；
    
返回值：String类型
    
示例：
// 6. 遍历结果集
while (resultSet.next()){
    int anInt = resultSet.getInt(1);
    String anString = resultSet.getString(2);
    System.out.println("第一列数据为:" + anInt);
    System.out.println("第二列数据为:" + anString);
}
```

getXxx()

```java
作用：根据类型获取列的数据
    
参数：String类型的列名
    
返回值：Xxx类型（基本数据类型和Blob类型等）
    
示例：

```

close()

```java
作用：关闭结果集
    
参数：无
    
返回值：无
    
示例：
resultSet.close()
```

getMetaData()

```java
作用：获取表的元数据（列名、列类型、列数等信息）。
	通常用于写通用的工具方法，比如查询结果不固定时，动态解析结果集。
    
参数：无
    
返回值：ResultSetMetaData类型
    
示例：
```

```java
import java.sql.*;

public class MetaDataDemo {
    public static void main(String[] args) throws Exception {
        // 1. 获取数据库连接
        Connection conn = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/testdb?useSSL=false&serverTimezone=UTC",
                "root", "123456");

        // 2. 执行查询
        String sql = "SELECT id, fname, price, fcont, remark FROM goods";
        PreparedStatement pst = conn.prepareStatement(sql);
        ResultSet rs = pst.executeQuery();

        // 3. 获取元数据
        ResultSetMetaData metaData = rs.getMetaData();

        // 4. 输出列的信息
        int columnCount = metaData.getColumnCount(); // 列的数量
        System.out.println("表包含的列数: " + columnCount);

        for (int i = 1; i <= columnCount; i++) {
            String columnName = metaData.getColumnName(i);   // 列名
            String columnType = metaData.getColumnTypeName(i); // 列类型
            System.out.println("列 " + i + ": " + columnName + "，类型: " + columnType);
        }

        // 5. 遍历结果数据
        while (rs.next()) {
            for (int i = 1; i <= columnCount; i++) {
                System.out.print(rs.getObject(i) + "\t");
            }
            System.out.println();
        }
        // 关闭资源
        ...
    }
}
```

getObject(i)

```java
作用：获取当前行中指定列的值
    
参数：列的索引 int类型 1
    
返回值：Object
    
示例：
while (rs.next()) {
    for (int i = 1; i <= columnCount; i++) {
        System.out.print(rs.getObject(i) + "\t");
    }
    System.out.println();
}
```



## CRUD

### 增删改查

建表语句：部门表

```sql
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department`  (
  `depid` int NOT NULL AUTO_INCREMENT COMMENT '部门编号',
  `depname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '部门名称',
  PRIMARY KEY (`depid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of department
-- ----------------------------
INSERT INTO `department` VALUES (1, '技术部');
INSERT INTO `department` VALUES (2, '人社部');
INSERT INTO `department` VALUES (3, '后勤部');
INSERT INTO `department` VALUES (4, '安保部');
INSERT INTO `department` VALUES (5, '公关部');
INSERT INTO `department` VALUES (8, '销售部');
INSERT INTO `department` VALUES (9, '人事部');

SET FOREIGN_KEY_CHECKS = 1;
```

建表语句：员工表

```sql
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee`  (
  `empid` int NOT NULL AUTO_INCREMENT COMMENT '员工编号',
  `empname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '员工名称',
  `empage` int NULL DEFAULT NULL COMMENT '员工年龄',
  `empaddress` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '员工地址',
  `empsex` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '员工性别',
  `empbirthday` date NULL DEFAULT NULL COMMENT '员工生日',
  `empscore` double NULL DEFAULT NULL COMMENT '员工绩效',
  `depid` int NULL DEFAULT NULL COMMENT '部门编号',
  `empinfo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '员工备注',
  `empstatus` int NULL DEFAULT NULL COMMENT '在岗状态',
  PRIMARY KEY (`empid`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of employee
-- ----------------------------
INSERT INTO `employee` VALUES (4, '小宝', 15, '东莞', '男', '1993-01-01', 65, 6, '力气大', 1);
INSERT INTO `employee` VALUES (5, '大拿', 35, '深圳', '男', '1994-01-01', 75, 3, '活好', 1);
INSERT INTO `employee` VALUES (6, '云姨', 45, '深圳', '女', '1996-01-01', 85, 7, NULL, 1);
INSERT INTO `employee` VALUES (7, '赵小四', 25, '深圳', '男', '1995-01-01', 95, 5, NULL, 1);
INSERT INTO `employee` VALUES (8, '赵大四', 35, '广州', '男', '1991-02-01', 96, 2, NULL, 0);
INSERT INTO `employee` VALUES (9, '四小赵', 28, '佛山', '男', '1992-01-01', 55, 3, NULL, 3);
INSERT INTO `employee` VALUES (10, '赵四思', 15, '东莞', '男', '1993-01-01', 65, 4, NULL, 0);
INSERT INTO `employee` VALUES (11, '赵四五', 35, '深圳', '男', '1994-01-01', 75, 6, NULL, 3);
INSERT INTO `employee` VALUES (12, '赵五六', 55, '深圳', '女', '1996-01-01', 85, 3, NULL, 0);
INSERT INTO `employee` VALUES (13, '赵四', 25, '深圳', '男', '1997-10-10', 85, 1, NULL, 1);

SET FOREIGN_KEY_CHECKS = 1;
```

`增删改`使用的是` statement`接口中的`executeUpdate()`方法。

使用statement添加数据

```java
package com.JDBCTest.statementPart;

import java.sql.*;

public class JDBCQuery {
    public static void main(String[] args) {
        try {
            // 1. 加载驱动
            Class.forName("com.mysql.cj.jdbc.Driver");
            // 2. 获取连接对象
            String url = "jdbc:mysql://192.168.1.38:3306/chatai";
            String userName = "xxx";
            String password = "xxx";
            // 获取对象
            Connection connection = DriverManager.getConnection(url, userName, password);

            // 3. 创建执行SQL语句st对象
            Statement st = connection.createStatement();
            // 4. 编写SQL-添加数据
            String sql = "insert into department(depId,depName) values (11,'市场部')";

            // 5. 执行SQL,返回值为受影响行数
            int result = st.executeUpdate(sql);
            System.out.println("result = " + result);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
```

使用statement删除数据

```java
...
// 3. 创建执行SQL语句st对象
Statement st = connection.createStatement();
// 4. 编写SQL-删除数据
String sql = "delete from department where depid = 11";
...
```

使用statement修改数据

```java
...
// 3. 创建执行SQL语句st对象
Statement st = connection.createStatement();
// 4. 编写SQL-修改数据
String sql = "update department set depname = '信息部' where depid = 9";
...
```

使用statement查询数据

```java
// 获取对象
Connection connection = DriverManager.getConnection(url, userName, password);
// 3. 创建执行SQL语句st对象
Statement st = connection.createStatement();
// 4. 编写SQL
String sql = "select * from department";
// 5. 执行SQL
ResultSet resultSet = st.executeQuery(sql);
// 6. 遍历结果集
while (resultSet.next()){
    int anInt = resultSet.getInt(1);
    String anString = resultSet.getString(2);
    System.out.println("第一列数据为:" + anInt);
    System.out.println("第二列数据为:" + anString);
}
```

**使用statement拼接SQL**

```sql
-- 使用 '' 包裹字符串,这是sql语句中的语法
-- 先把变量转为字符串，然后再根据sql 把字符串加上一个''，符合sql语法。
```

```java
package com.JDBCTest.statementPart;

import java.sql.*;
import java.text.SimpleDateFormat;

public class JDBCQuery {
    public static void main(String[] args) {
        try {
            // 1. 加载驱动
            Class.forName("com.mysql.cj.jdbc.Driver");
            // 2. 获取连接对象
            String url = "jdbc:mysql://192.168.1.38:3306/chatai";
            String userName = "hanser";
            String password = "123.com";
            // 获取对象
            Connection connection = DriverManager.getConnection(url, userName, password);
            // 3. 创建执行SQL语句st对象
            Statement st = connection.createStatement();
            // 定义变量
            String name = "aqua";
            int age = 18;
            String address = "河南郑州";
            char sex = '女';
            Date birthday = new Date(System.currentTimeMillis());
            // Date对象转为字符串
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String dateBirthday = sdf.format(birthday);
            double score = 98.98;
            int depid = 2;

            // 4. 编写SQL，通过字符串拼接的方式
            // "+ age +" 这里表示把一个变量 转成一个字符串
            // 这里需要给 String类型的外边再添加一个 '' 因为这是sql中的语法
            String sql = "insert into employee(empName,empAge,empAddress,empSex,empBirthday,empScore,depId) " +
                    "values ('"+ name +"',"+ age +",'"+address+"','"+sex+"','"+ dateBirthday +"',"+score+","+depid+")";
            // 5. 执行SQL
            int result = st.executeUpdate(sql);
            System.out.println("result = " + result);

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

```

**使用statement拼接SQL存在SQL注入问题**

```java
/** 这种方式会出现一个 sql注入漏洞问题（严重）**/
String sql = "SELECT * FROM t_employee where ename='" + ename + "'";
// 如果我此时从键盘输入ename值的时候，输入：张三' or '1'= '1
// 结果会把所有数据都查询出来
Statement st = conn.createStatement();
ResultSet rs = st.executeQuery(sql);
```

### PreparedStatement使用

通过PreparedStatement来代替statement接口，解决问题。

🎉 **statement问题：**

`PreparedStatement`可以用来解决一下`statement`问题：

（1）sql拼接问题

```java
String sql = "insert into t_employee(ename,tel,gender,salary) values('" + ename + "','" + tel + "','" + gender + "'," + salary +")";
Statement st = conn.createStatement();
int len = st.executeUpdate(sql);
```

（2）sql注入问题

```java
String sql = "SELECT * FROM t_employee where ename='" + ename + "'";
// 如果我此时从键盘输入ename值的时候，输入：张三' or '1'= '1
// 结果会把所有数据都查询出来
Statement st = conn.createStatement();
ResultSet rs = st.executeQuery(sql);
```

（3）处理blob等类型的数据问题

```java
String sql = "insert into user(username,photo) values('chailinyan', 图片字节流)";
//此时photo是blob类型的数据时，无法在sql中直接拼接
```

🎉 **PreparedStatement的解决方式：**

（1）避免sql拼接

```java
// 写SQL语句，通过？设置占位符
String sql = "insert into t_employee(ename,tel,gender,salary) values(?,?,?,?)";

// 这里要传带？的sql，然后mysql端就会对这个sql进行预编译
PreparedStatement pst = conn.prepareStatement(sql);

// 根据？的类型 设置？的具体值
pst.setString(1, ename);
pst.setString(2, tel);
pst.setString(3, gender);
pst.setDouble(4, salary);

// 根据？的类型 设置？的具体值
pst.setObject(1, ename);
pst.setObject(2, tel);
pst.setObject(3, gender);
pst.setObject(4, salary);

//此处不用传参了
int len = pst.executeUpdate();

System.out.println(len);
```

（2）不会有sql注入

```java
String sql = "SELECT * FROM t_employee where ename=?";
//即使输入'张三' or '1'= '1'也没问题
PreparedStatement pst = conn.prepareStatement(sql);

//中间加入设置？的值
pst.setObject(1, ename);

ResultSet rs = pst.executeQuery();
```

（3）处理blob类型的数据

```java
String sql = "insert into user(username,photo) values(?,?)";
PreparedStatement pst = conn.prepareStatement(sql);

//设置？的值
pst.setObject(1, "chailinyan");
FileInputStream fis = new FileInputStream("D:/QMDownload/img/美女/15.jpg");
pst.setBlob(2, fis);

int len = pst.executeUpdate();
System.out.println(len>0?"成功":"失败");
```

✅ **使用 `preparedStatement`实现增删改**

把获取连接对象封装成一个工具类：DBUtil.java

```java
import java.sql.DriverManager;
import java.sql.SQLException;

/*
    数据库工具
    1. 获取连接对象
 */
public class DBUtil {
    // 定义一个静态方法,返回值为 Connection对象 （sql包中的）
    public static Connection getConnection(){
        // 定义一个 connection对象
        Connection connection = null;
        try {
            // 1. 加载驱动
            Class.forName("com.mysql.cj.jdbc.Driver");
            // 2. 获取连接对象
            String url = "jdbc:mysql://192.168.1.38:3306/chatai";
            String userName = "xx";
            String password = "xx";
            // 3. 获取对象
            connection = DriverManager.getConnection(url, userName, password);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return connection;
    }
}
```

把关闭资源封装成一个方法

```java
package com.JDBCTest;

import java.sql.*;

/*
    数据库工具
    1. 获取连接对象
 */
public class DBUtil {
    // 定义一个静态方法,返回值为 Connection对象 （sql包中的）
    public static Connection getConnection(){
        // 定义一个 connection对象
        Connection connection = null;
        try {
            // 1. 加载驱动
            Class.forName("com.mysql.cj.jdbc.Driver");
            // 2. 获取连接对象
            String url = "jdbc:mysql://192.168.1.38:3306/chatai";
            String userName = "xxx";
            String password = "xxx";
            // 3. 获取对象
            connection = DriverManager.getConnection(url, userName, password);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return connection;
    }
    // 静态方法：关闭资源
    public static void closeConnect(Connection con, PreparedStatement pst, ResultSet res){
        // 判断是否为空,关闭读取流
        try {
            if (res != null){
                res.close();
            }
            if (pst != null){
                pst.close();
            }
            if (con != null){
                con.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

```

使用preparedStatement添加数据

```java
package com.JDBCTest;

import org.junit.Test;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class pstCURD {
    // 使用preparedStatement增加数据
    @Test
    public void addData(){
        Connection connection = null;
        PreparedStatement pst = null;
        try {
            // 调用封装的工具类,获取连接对象
            connection = DBUtil.getConnection();
            // 定义sql
            String sql = "insert into employee values (?,?,?,?,?,?,?,?,?,?)";
            // 创建pst对象
            pst = connection.prepareStatement(sql);
            // 创建一个日期对象
            Date date = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String nowDate = sdf.format(date);
            // 设置值
            pst.setInt(1,16);
            pst.setString(2,"sakuna");
            pst.setInt(3,21);
            pst.setString(4,"日本东京");
            pst.setString(5,"女");
            // 这里使用 java.sql中的Date类的构造方法，参数是一个毫秒数
            pst.setDate(6,new java.sql.Date(System.currentTimeMillis()));
            pst.setDouble(7,98.98);
            pst.setInt(8,2);
            pst.setString(9,"歌姬");
            pst.setInt(10,1);
            // 执行SQL
            int resRow = pst.executeUpdate();
            System.out.println("resRow = " + resRow);
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // 关闭资源
            DBUtil.closeConnect(connection,pst,null);
        }
    }
}
```

使用preparedStatement删除数据

```java
public void delData(){
    Connection connection = null;
    PreparedStatement pst = null;

    try {
        // 调用封装的工具类,获取连接对象
        connection = DBUtil.getConnection();
        // 定义sql
        String sql = "delete from employee where empid = ?";
        // 创建pst对象
        pst = connection.prepareStatement(sql);
        // 设置值
        pst.setInt(1,16);

        // 执行SQL
        int resRow = pst.executeUpdate();
        System.out.println("resRow = " + resRow);
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        // 关闭资源
        DBUtil.closeConnect(connection,pst,null);
    }
}
```

使用preparedStatement修改数据

```java
public void editData(){
    Connection connection = null;
    PreparedStatement pst = null;

    try {
        // 调用封装的工具类,获取连接对象
        connection = DBUtil.getConnection();
        // 定义sql
        String sql = "update employee set empname = ? where empid = ?";
        // 创建pst对象
        pst = connection.prepareStatement(sql);
        // 设置值
        pst.setString(1,"Akie");
        pst.setInt(2,14);
        // 执行SQL
        int resRow = pst.executeUpdate();
        System.out.println("resRow = " + resRow);
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        // 关闭资源
        DBUtil.closeConnect(connection,pst,null);
    }
}
```

使用preparedStatement查询数据

```java
package com.JDBCTest;

import java.sql.*;

public class preparedStatement {
    public static void main(String[] args) {
        try {
            // 1. 加载驱动
            Class.forName("com.mysql.cj.jdbc.Driver");
            // 2. 获取连接对象
            String url = "jdbc:mysql://192.168.1.38:3306/chatai";
            String userName = "hanser";
            String password = "123.com";
            // 获取对象
            Connection connection = DriverManager.getConnection(url, userName, password);
            // 定义SQL
            String sql = "select * from employee where empname = ?";

            // 创建preparedStatement对象
            PreparedStatement pst = connection.prepareStatement(sql);
            // 赋值,第一个?处，设置值
            pst.setString(1,"aqua");
            // 执行SQL
            ResultSet resultSet = pst.executeQuery();
            // 遍历结果集
            while (resultSet.next()){
                int empId = resultSet.getInt(1);
                String empName = resultSet.getString(2);
                String empAddress = resultSet.getString(4);
                // 打印信息
                System.out.println("id为："+empId+"，名字为："+empName+"，地址为："+empAddress);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } finally {
            // 关闭资源

        }
    }
}
```



### 两者区别

**prepareedStatement和Statement的区别：**

- prepareedStatement属于Statement类的子类。
- Statement对象每次执行sql都需要校验以及编译的操作，而prepareedStatement对象只需要校验以及编译一次（性能更高）。
- Statement对象可以拼接sql存在安全隐患。
- preparedStatement对象不能拼接SQL，更加简单，更加安全。

## 封装BasicDAOImpl

Data Access Object: 数据访问对象，专门用来操作数据库的，将之前的CURD进行简化。

业务分层：

```java
Service：业务逻辑层。
DAO：负责与数据打交道。
Controller：控制器，负责调用业务逻辑层，将数据返回给前端。
entity：实体表，与表一一对应的实体类。
ORM：Object relation Mapping：对象关系映射
```

实现效果：

- 将之前的CURD操作进行简化，简化为两个方法，分别是增删改所有数据，以及查询所有数据。
- 增删改都会调用executeUpdate()方法，返回值都为int类型，表示受影响的行数，所以单独划分为一类。
- 查询都需要调用executeQuery方法，返回值都为ResultSet类型的结果集，所以单独划分为一类。

✅ 定义一个DAO类（基础版）：查询方法出现问题。

1、DAO 类：封装SQL语句方法。

```java
package com.JDBCTest.BaseDao;

import com.JDBCTest.DBUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class BaseDao {
    // 问题：
	// 我们不知道用户会执行哪种操作，操作哪个表，所以将SQL语句作为参数；
    // 我们不知道用户是否要传入参数到sql中，传入参数的类型
    // 定义一个 增删改的方法,参数是SQL语句和sql中的参数
    public int modifyDataAny(String sql,Object ...args){
        int resRow = 0;
        Connection connection = null;
        PreparedStatement pst = null;
        try {
            // 获取连接对象
            connection = DBUtil.getConnection();
            // 获取pst对象
            pst = connection.prepareStatement(sql);
            // 设置值
            for (int i = 0; i < args.length; i++) {
                // 使用Object类型，解决类型不清楚的问题
                pst.setObject(i+1,args[i]);
            }

            // 执行sql
            resRow = pst.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // 关闭资源
            DBUtil.closeConnect(connection,pst,null);
        }
        // 返回
        return resRow;
    }

    // 定义一个 查询的方法
    public ResultSet queryDataAny(String sql,Object ...args){
        Connection connection = null;
        PreparedStatement pst = null;
        ResultSet resultSet = null;
        try {
            connection = DBUtil.getConnection();

            pst = connection.prepareStatement(sql);

            // 设置值
            for (int i = 0; i < args.length; i++) {
                // 使用Object类型，解决类型不清楚的问题
                pst.setObject(i+1,args[i]);
            }
            // 执行
            resultSet = pst.executeQuery();

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // 关闭资源
            DBUtil.closeConnect(connection,pst,resultSet);
        }
        return resultSet;
    }
}

```

2、DBUtil类：获取Connection连接和关闭资源

```java
package com.JDBCTest;

import java.sql.*;

/*
    数据库工具
    1. 获取连接对象
 */
public class DBUtil {
    // 定义一个静态方法,返回值为 Connection对象 （sql包中的）
    public static Connection getConnection(){
        // 定义一个 connection对象
        Connection connection = null;
        try {
            // 1. 加载驱动
            Class.forName("com.mysql.cj.jdbc.Driver");
            // 2. 获取连接对象
            String url = "jdbc:mysql://192.168.1.38:3306/chatai";
            String userName = "hanser";
            String password = "123.com";
            // 获取对象
            connection = DriverManager.getConnection(url, userName, password);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return connection;
    }
    public static void closeConnect(Connection con, PreparedStatement pst, ResultSet res){
        // 判断是否为空,关闭读取流
        try {
            if (res != null){
                res.close();
            }
            if (pst != null){
                pst.close();
            }
            if (con != null){
                con.close();
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

```

3、测试类：测试增删改查，查询方法出现问题

```java
public class TestDAO {
    // 创建DAO对象，获取DAO对象
    BaseDao baseDao = new BaseDao();
    @Test
    public void TestDaoV1(){
        // 调用增删改方法
        String sql = "insert into employee values (?,?,?,?,?,?,?,?,?,?)";
        int resRow = baseDao.modifyDataAny(sql, new Object[]{18, "许嵩", 22, "河南洛阳", "男", "2024-03-06 15:59:59", 99.99, 2, "歌手", 1});
        System.out.println("resRow = " + resRow);

    }
    
    // 查询数据
    @Test
    public void queryData() throws SQLException {
        // 调用增删改方法
        String sql = "select * from employee where empid = ?";
        ResultSet res = baseDao.queryDataAny(sql, new Object[]{18});
        while (res.next()){
            // 报错 ：Operation not allowed after ResultSet closed
            // 原因是：读数据时，读取流已经关闭
            System.out.println( "名字是：" +res.getString(2));
        }
    }
}
```

✅ 定义一个DAO类（改良版，解决ResultSet读取流关闭后，无法读取数据问题）

1、定义实体类（每个表对应一个）：定义数据库表结构每一行的数据类型。

定义实体类的作用：

> - 定义与数据表对应的entity，用来存放mysql查询得到的数据元素类型，然后把这些元素放在集合中保存起来。
> - 这里推荐使用基本数据类型的包装类，因为包装类未赋值时默认值为null，还原数据。

定义employee实体类：存放employee数据表每一行的数据对象

```java
package com.JDBCTest.entity;

import java.util.Date;

/**
 * ORM Object Relation Mapping 对象关系映射
 * 将数据库中的表结构和Java代码中的实体类一一对应
 */
public class Employee {
    // 使用包装类，默认值为null，不会造成数据混乱
    private Integer empId;
    private String empName;
    private Integer empAge;
    private String empAddress;
    private String empSex;
    private Date empBirthday;
    private Double empScore;
    private Integer depId;
    private String empInfo;
    private Integer empStatus;

    // 封装

    public Integer getEmpId() {
        return empId;
    }

    public void setEmpId(Integer empId) {
        this.empId = empId;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public Integer getEmpAge() {
        return empAge;
    }

    public void setEmpAge(Integer empAge) {
        this.empAge = empAge;
    }

    public String getEmpAddress() {
        return empAddress;
    }

    public void setEmpAddress(String empAddress) {
        this.empAddress = empAddress;
    }

    public String getEmpSex() {
        return empSex;
    }

    public void setEmpSex(String empSex) {
        this.empSex = empSex;
    }

    public Date getEmpBirthday() {
        return empBirthday;
    }

    public void setEmpBirthday(Date empBirthday) {
        this.empBirthday = empBirthday;
    }

    public Double getEmpScore() {
        return empScore;
    }

    public void setEmpScore(Double empScore) {
        this.empScore = empScore;
    }

    public Integer getDepId() {
        return depId;
    }

    public void setDepId(Integer depId) {
        this.depId = depId;
    }

    public String getEmpInfo() {
        return empInfo;
    }

    public void setEmpInfo(String empInfo) {
        this.empInfo = empInfo;
    }

    public Integer getEmpStatus() {
        return empStatus;
    }

    public void setEmpStatus(Integer empStatus) {
        this.empStatus = empStatus;
    }
    // 构造

    public Employee(Integer empId, String empName, Integer empAge, String empAddress, String empSex, Date empBirthday, Double empScore, Integer depId, String empInfo, Integer empStatus) {
        this.empId = empId;
        this.empName = empName;
        this.empAge = empAge;
        this.empAddress = empAddress;
        this.empSex = empSex;
        this.empBirthday = empBirthday;
        this.empScore = empScore;
        this.depId = depId;
        this.empInfo = empInfo;
        this.empStatus = empStatus;
    }

    public Employee() {
    }

    @Override
    public String toString() {
        return "Employee{" +
                "empId=" + empId +
                ", empName='" + empName + '\'' +
                ", empAge=" + empAge +
                ", empAddress='" + empAddress + '\'' +
                ", empSex='" + empSex + '\'' +
                ", empBirthday=" + empBirthday +
                ", empScore=" + empScore +
                ", depId=" + depId +
                ", empInfo='" + empInfo + '\'' +
                ", empStatus=" + empStatus +
                '}';
    }
}

```

2、定义一个数据解析器接口：用来根据结果集解析不同的数据，将解析不同的查询结果，把不同的表的行数据，存放在不同的对象（实体类）中

```java
package com.JDBCTest.mapper;
import java.sql.ResultSet;

/**
 * 解析器接口：
 * 用来根据结果集解析不同的数据，因为数据不同，所以类型是不确定，所以使用泛型
 * @param <T>
 */
public interface RowMapper<T> {
    T parseData(ResultSet resultSet);
}
```

3、根据表的数据，写具体数据解析器的实现类：employee表的数据解析器

> - 把数据库中查询到的数据，取出来，然后保存在实体类对象中，再把这些对象存放在集合中。
> - 这样整个过程就实现了 对象关系映射 ORM

```java
package com.JDBCTest.mapper.impl;

import com.JDBCTest.entity.Employee;
import com.JDBCTest.mapper.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;

public class EmployeeRowMapperImpl implements RowMapper<Employee> {

    @Override
    public Employee parseData(ResultSet resultSet) {
        // 创建实体类对象
        Employee employee = new Employee();
        try {
            // 存储每一行的数据到 实体类中
            employee.setDepId(resultSet.getInt(1));
            employee.setEmpName(resultSet.getString(2));
            employee.setEmpAge(resultSet.getInt(3));
            employee.setEmpAddress(resultSet.getString(4));
            employee.setEmpSex(resultSet.getString(5));
            Date sqlDate = resultSet.getDate(6);
            // 转为 util类的Date类
            java.util.Date utilDate = new java.util.Date(sqlDate.getTime());
            employee.setEmpBirthday(utilDate);
            employee.setEmpScore(resultSet.getDouble(7));
            employee.setDepId(resultSet.getInt(8));
            employee.setEmpInfo(resultSet.getString(9));
            employee.setEmpStatus(resultSet.getInt(10));

        } catch (SQLException e) {
            e.printStackTrace();
        }
        // 把这个对象返回
        return employee;
    }
}

```

4、在DAO类中使用数据解析器，存储数据

```java
package com.JDBCTest.BaseDao;

import com.JDBCTest.DBUtil;
import com.JDBCTest.entity.Employee;
import com.JDBCTest.mapper.RowMapper;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class BaseDao<T> {
    // 定义一个 增删改的方法,参数是SQL语句和sql中的参数
    public int modifyDataAny(String sql,Object ...args){
        int resRow = 0;
        Connection connection = null;
        PreparedStatement pst = null;
        try {
            // 获取连接对象
            connection = DBUtil.getConnection();
            // 获取pst对象
            pst = connection.prepareStatement(sql);
            // 设置值
            for (int i = 0; i < args.length; i++) {
                // 使用Object类型，解决类型不清楚的问题
                pst.setObject(i+1,args[i]);
            }

            // 执行sql
            resRow = pst.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // 关闭资源
            DBUtil.closeConnect(connection,pst,null);
        }
        // 返回
        return resRow;
    }

    // 定义一个 查询的方法
    public List<T> queryDataAny(String sql, RowMapper<T> rowMapper,Object ...args){
        Connection connection = null;
        PreparedStatement pst = null;
        ResultSet resultSet = null;
        List<T> list = new ArrayList<T>();
        try {
            connection = DBUtil.getConnection();
            pst = connection.prepareStatement(sql);
            // 设置值
            for (int i = 0; i < args.length; i++) {
                // 使用Object类型，解决类型不清楚的问题
                pst.setObject(i+1,args[i]);
            }
            // 执行sql,得到结果集
            resultSet = pst.executeQuery();

            // 遍历这个结果集
            while(resultSet.next()){
                // 使用数据解析器接口中的方法，把结果集保存到集合中
                T t = rowMapper.parseData(resultSet);
                // 行数据添加到集合中
                list.add(t);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // 关闭资源
            DBUtil.closeConnect(connection,pst,resultSet);
        }
        return list;
    }
}

```

4、在测试类中，调用DAO类中的方法，查询SQL，并使用数据解析器的实现类，存储每一行数据到实体对象中，再把实体对象元素保存在List集合中，把这个集合返回。

```java
// 查询数据
    @Test
    public void TestDaoV2(){
        String sql = "select * from employee";
        // 定义通过多态的方式创建rowmapper对象，使用接口中的方法，这样更换他的实现类，代码不用改变，支持热插拔。
        RowMapper rowMapper = new EmployeeRowMapperImpl();
        // 通过baseDao中的查询方法获取数据
        List list = baseDao.queryDataAny(sql, rowMapper);
        for (Object o : list) {
            System.out.println("o = " + o);
        }
    }
```

✅ 定义一个DAO类（增强版，添加Count查询计数数量方法）

```java
public class BaseDao<T> {
...
// 定义一个查询总数的方法,Count函数的返回
public int getScalaData(String sql) throws SQLException {
    // 声明数据行
    int res = 0;
    Connection con = null;
    PreparedStatement pst = null;
    ResultSet resultSet = null;

    try {
        con = DBUtil.getConnection();
        pst = con.prepareStatement(sql);
        // 执行
        resultSet = pst.executeQuery();
        // 遍历resultSet
        while (resultSet.next()){
            res = resultSet.getInt(1);
        }
    } catch (SQLException e) {
        e.printStackTrace();
    } finally {
        // 关闭连接
        DBUtil.closeConnect(con,pst,resultSet);
    }
    // 返回查询到的行数
    return res;
}
...
}
```

```java
@Test
public void TestDaoV3() throws SQLException {
    String sql = "select count(*) from employee";
    // 定义通过多态的方式创建rowmapper对象，使用接口中的方法，这样更换他的实现类，代码不用改变，支持热插拔。
    RowMapper rowMapper = new EmployeeRowMapperImpl();
    // 通过baseDao中的查询方法获取数据
    int sum = baseDao.getScalaData(sql);
    System.out.println("sum = " + sum);
}
```

✅ 定义一个DAO类和每个表DAO接口（`DAO终极版`，针对不同的表，写不同的子类）。

```java
// Spring Data JPA 负责数据库的增删改查，我们只需要写抽象方法即可
// 方法名规范 动作 + 目标 + 根据条件
```

```java
// 热插拔：父类引用指向子类实现，通过调用父类的方法，后边的子类实现可以换，并且都可以用
```

1、定义具体员工的实体类：与数据库中的表结构一一对应。包名为 `entity/Employee.java`

```java
package com.JDBCTest.entity;

import java.util.Date;

/**
 * ORM Object Relation Mapping 对象关系映射
 * 将数据库中的表结构和Java代码中的实体类一一对应
 */
public class Employee {
    // 使用包装类，默认值为null，不会造成数据混乱
    private Integer empId;
    private String empName;
    private Integer empAge;
    private String empAddress;
    private String empSex;
    private Date empBirthday;
    private Double empScore;
    private Integer depId;
    private String empInfo;
    private Integer empStatus;

    // 封装

    public Integer getEmpId() {
        return empId;
    }

    public void setEmpId(Integer empId) {
        this.empId = empId;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public Integer getEmpAge() {
        return empAge;
    }

    public void setEmpAge(Integer empAge) {
        this.empAge = empAge;
    }

    public String getEmpAddress() {
        return empAddress;
    }

    public void setEmpAddress(String empAddress) {
        this.empAddress = empAddress;
    }

    public String getEmpSex() {
        return empSex;
    }

    public void setEmpSex(String empSex) {
        this.empSex = empSex;
    }

    public Date getEmpBirthday() {
        return empBirthday;
    }

    public void setEmpBirthday(Date empBirthday) {
        this.empBirthday = empBirthday;
    }

    public Double getEmpScore() {
        return empScore;
    }

    public void setEmpScore(Double empScore) {
        this.empScore = empScore;
    }

    public Integer getDepId() {
        return depId;
    }

    public void setDepId(Integer depId) {
        this.depId = depId;
    }

    public String getEmpInfo() {
        return empInfo;
    }

    public void setEmpInfo(String empInfo) {
        this.empInfo = empInfo;
    }

    public Integer getEmpStatus() {
        return empStatus;
    }

    public void setEmpStatus(Integer empStatus) {
        this.empStatus = empStatus;
    }
    // 构造

    public Employee(Integer empId, String empName, Integer empAge, String empAddress, String empSex, Date empBirthday, Double empScore, Integer depId, String empInfo, Integer empStatus) {
        this.empId = empId;
        this.empName = empName;
        this.empAge = empAge;
        this.empAddress = empAddress;
        this.empSex = empSex;
        this.empBirthday = empBirthday;
        this.empScore = empScore;
        this.depId = depId;
        this.empInfo = empInfo;
        this.empStatus = empStatus;
    }

    public Employee() {
    }

    @Override
    public String toString() {
        return "Employee{" +
                "empId=" + empId +
                ", empName='" + empName + '\'' +
                ", empAge=" + empAge +
                ", empAddress='" + empAddress + '\'' +
                ", empSex='" + empSex + '\'' +
                ", empBirthday=" + empBirthday +
                ", empScore=" + empScore +
                ", depId=" + depId +
                ", empInfo='" + empInfo + '\'' +
                ", empStatus=" + empStatus +
                '}';
    }
}

```

2、定义通用的RowMapper类：用于解析数据，将数据库中查询到的每一行数据，转为对象元素。包名为：`mapper/RowMapper.java`。

```java
package com.JDBCTest.mapper;
import java.sql.ResultSet;

/**
 * 解析器接口：
 * 用来根据结果集解析不同的数据，因为数据不同，所以类型是不确定，所以使用泛型
 * @param <T>
 */
public interface RowMapper<T> {
    // 转化数据方法，ResultSet流中的数据保存到实体类对象中
    T parseData(ResultSet resultSet);
}
```

3、定义具体的RowMapper实现类，实现通用RowMapper接口：用于将查询到的每一行数据，转为员工类对象元素。

```java
package com.JDBCTest.mapper.impl;

import com.JDBCTest.entity.Employee;
import com.JDBCTest.mapper.RowMapper;

import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;

public class EmployeeRowMapperImpl implements RowMapper<Employee> {

    @Override
    public Employee parseData(ResultSet resultSet) {
        // 创建实体类对象
        Employee employee = new Employee();
        try {

            // 存储每一行的数据到 实体类中
            employee.setEmpId(resultSet.getInt(1));
            employee.setEmpName(resultSet.getString(2));
            employee.setEmpAge(resultSet.getInt(3));
            employee.setEmpAddress(resultSet.getString(4));
            employee.setEmpSex(resultSet.getString(5));
            Date sqlDate = resultSet.getDate(6);
            // 转为 util类的Date类
            java.util.Date utilDate = new java.util.Date(sqlDate.getTime());
            employee.setEmpBirthday(utilDate);
            employee.setEmpScore(resultSet.getDouble(7));
            employee.setDepId(resultSet.getInt(8));
            employee.setEmpInfo(resultSet.getString(9));
            employee.setEmpStatus(resultSet.getInt(10));

        } catch (SQLException e) {
            e.printStackTrace();
        }
        // 把这个对象返回
        return employee;
    }
}

```

4、定义通用BaseDao：用于操作数据库，包名为 `baseDao/BaseDao.java`

```java
package com.JDBCTest.BaseDao;

import com.JDBCTest.DBUtil;
import com.JDBCTest.entity.Employee;
import com.JDBCTest.mapper.RowMapper;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;


public class BaseDao<T> {
    // 定义一个 增删改的方法,参数是SQL语句和sql中的参数
    public int modifyDataAny(String sql,Object ...args){
        int resRow = 0;
        Connection connection = null;
        PreparedStatement pst = null;
        try {
            // 获取连接对象
            connection = DBUtil.getConnection();
            // 获取pst对象
            pst = connection.prepareStatement(sql);
            // 设置值
            for (int i = 0; i < args.length; i++) {
                // 使用Object类型，解决类型不清楚的问题
                pst.setObject(i+1,args[i]);
            }

            // 执行sql
            resRow = pst.executeUpdate();

        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // 关闭资源
            DBUtil.closeConnect(connection,pst,null);
        }
        // 返回
        return resRow;
    }

    // 定义一个 查询的方法
    public List<T> queryDataAny(String sql, RowMapper<T> rowMapper,Object ...args){
        Connection connection = null;
        PreparedStatement pst = null;
        ResultSet resultSet = null;
        List<T> list = new ArrayList<T>();
        try {
            connection = DBUtil.getConnection();
            pst = connection.prepareStatement(sql);
            // 设置值
            for (int i = 0; i < args.length; i++) {
                // 使用Object类型，解决类型不清楚的问题
                pst.setObject(i+1,args[i]);
            }
            // 执行sql,得到结果集
            resultSet = pst.executeQuery();

            // 遍历这个结果集
            while(resultSet.next()){
                // 使用数据解析器接口中的方法，把结果集保存到集合中
                T t = rowMapper.parseData(resultSet);
                // 行数据添加到集合中
                list.add(t);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // 关闭资源
            DBUtil.closeConnect(connection,pst,resultSet);
        }
        return list;
    }
    // 定义一个查询总数的方法,Count函数的返回
    public int getScalaData(String sql) throws SQLException {
        // 声明数据行
        int res = 0;
        Connection con = null;
        PreparedStatement pst = null;
        ResultSet resultSet = null;

        try {
            con = DBUtil.getConnection();
            pst = con.prepareStatement(sql);
            // 执行
            resultSet = pst.executeQuery();
            // 遍历resultSet
            while (resultSet.next()){
                res = resultSet.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // 关闭连接
            DBUtil.closeConnect(con,pst,resultSet);
        }
        // 返回查询到的行数
        return res;
    }
}

```

5、定义一个 具体员工表的 DAO接口：用于专门负责部门表的增删改查。（baseDao是所有的表都可以使用的增删改查）包名为：`dao/EmployeeDao.java`

```java
package com.JDBCTest.dao;

import com.JDBCTest.entity.Employee;

import java.util.List;

/**
 * 定义 专门用于部门表的dao增删改查
 */
public interface EmployeeDao {
    // 这里的抽象方法，全部用于操作部门表的增删改查
    // 增加员工,参数是一个Employee员工对象
    int addEmployee(Employee employee);
    // 删除员工：方法名的规范，约定：动作 + 目标 + 根据条件
    int delEmployee(Integer empId);
    // 更新数据
    int updateEmployee(Employee employee);
    // 查询数据
    List<Employee> getEmployee();
}
```

6、定义具体员工表DAO接口的实现类，同时继承BaseDAO。包名为 `dao/impl/EmployeeDaoImpl.java`。

- 把具体的sql语句写在这里，不写在测试类中了，调用时，只需要写方法名即可
- BaseDao已经可以增删改查了，调用BaseDao中的方法实现实现类中具体的名字的增删改查
- 一个接口可以写多个实现类，可以一个线程安全，一个线程不安全。

```java
package com.JDBCTest.dao.Impl;

import com.JDBCTest.BaseDao.BaseDao;
import com.JDBCTest.dao.EmployeeDao;
import com.JDBCTest.entity.Employee;
import com.JDBCTest.mapper.RowMapper;
import com.JDBCTest.mapper.impl.EmployeeRowMapperImpl;

import java.util.List;

public class EmployeeDaoImpl extends BaseDao<Employee> implements EmployeeDao {
    // 新增员工sql
    @Override
    public int addEmployee(Employee employee) {
        // 定义sql
        String sql = "insert into employee values (?,?,?,?,?,?,?,?,?,?)";
        // 定义参数列表
        Object[] args = new Object[]{employee.getEmpId(),employee.getEmpName(),employee.getEmpAge(),employee.getEmpAddress(),employee.getEmpSex(),employee.getEmpBirthday(),employee.getEmpScore(),employee.getDepId(),employee.getEmpInfo(),employee.getEmpStatus()};
        // 调用BaseDao中新增的方法
        int resRow = this.modifyDataAny(sql,args);
        return resRow;
    }

    @Override
    public int delEmployee(Integer empId) {
        return 0;
    }

    @Override
    public int updateEmployee(Employee employee) {
        return 0;
    }

    @Override
    public List<Employee> getEmployee() {
        return null;
    }
}

```

7、测试类：测试调用，包名为：`test/TestDao.java`

```java
// 添加数据
@Test
public void addEmployee(){
    // 创建一个员工类DAO对象
    EmployeeDao employeeDao = new EmployeeDaoImpl();
    // 创建一个员工对象
    Employee employee = new Employee(20,"hanser",21,"河南新乡","女",null,97.65,2,"演员",2);
    // 调用添加员工的方法
    int resRow = employeeDao.addEmployee(employee);
    System.out.println("resRow = " + resRow);
}
```



## Apache的DBUtils

commons-dbutils 是 Apache 组织提供的一个开源 JDBC工具类库，它是对JDBC的简单封装，学习成本极低，并且使用dbutils能极大简化jdbc编码的工作量，同时也不会影响程序的性能。

其中QueryRunner类封装了SQL的执行，是线程安全的。

（1）可以实现增、删、改、查、批处理、

（2）考虑了事务处理需要共用Connection。

（3）该类最主要的就是简单化了SQL查询，它与ResultSetHandler组合在一起使用可以完成大部分的数据库操作，能够大大减少编码量。



## 数据库连接池

### 基本概念

连接对象的缓冲区。负责申请，分配管理，释放连接的操作。

### 使用作用

不使用数据库连接池，每次都通过DriverManager获取新连接，用完直接抛弃断开，连接的利用率太低，太浪费。
对于数据库服务器来说，压力太大了。我们数据库服务器和Java程序对连接数也无法控制，很容易导致数据库服务器崩溃。我们就希望能管理连接。我们可以建立一个连接池，这个池中可以容纳一定数量的连接对象，一开始，我们可以先替用户先创建好一些连接对象，等用户要拿连接对象时，就直接从池中拿，不用新建了，这样也可以节省时间。然后用户用完后，放回去，别人可以接着用。可以提高连接的使用率。当池中的现有的连接都用完了，那么连接池可以向服务器申请新的连接放到池中。直到池中的连接达到“最大连接数”，就不能在申请新的连接了，如果没有拿到连接的用户只能等待。

### 连接池技术

* **DBCP** 是Apache提供的数据库连接池，**速度相对c3p0较快**，但因自身存在BUG，Hibernate3已不再提供支持。
* **C3P0** 是一个开源组织提供的一个数据库连接池，**速度相对较慢，稳定性还可以**。
* **Proxool** 是sourceforge下的一个开源项目数据库连接池，有监控连接池状态的功能，**稳定性较c3p0差一点**。
* **BoneCP** 是一个开源组织提供的数据库连接池，速度快。
* **Druid** 是阿里提供的数据库连接池，据说是集DBCP 、C3P0 、Proxool 优点于一身的数据库连接池。

### 技术使用

阿里的德鲁伊连接池技术：

（1）加入jar包

```java
例如：druid-1.1.10.jar
```

（2）代码步骤

```java
第一步：建立一个数据库连接池
第二步：设置连接池的参数
第三步：获取连接
```

```java
public class TestPool {
	public static void main(String[] args) throws SQLException {
		//1、创建数据源（数据库连接池）对象
		DruidDataSource ds =new DruidDataSource();
		
		//2、设置参数
		//(1)设置基本参数
		ds.setDriverClassName("com.mysql.jdbc.Driver");
		ds.setUrl("jdbc:mysql://localhost:3306/test");
		ds.setUsername("root");
		ds.setPassword("123456");
		
		//(2)设置连接数等参数
		ds.setInitialSize(5);//一开始提前申请好5个连接，不够了，重写申请
		ds.setMaxActive(10);//最多不超过10个，如果10都用完了，还没还回来，就会出现等待
		ds.setMaxWait(1000);//用户最多等1000毫秒，如果1000毫秒还没有人还回来，就异常了
		
		//3、获取连接
		for (int i = 1; i <=15; i++) {
			Connection conn = ds.getConnection();
			System.out.println("第"+i+"个：" + conn);
			
			//如果这里没有关闭，就相当于没有还
//			conn.close();#这里关闭，是还回池中
		}
	}
}
```

### DataSource接口

这个接口位于 `javax.sql` 包中。

构造方法

```js
无
```

方法

getConnection() 

```java
作用：尝试建立与此 DataSource对象所代表的数据源的连接
    
参数：无
    
返回值：Connection类型数据
    
示例：
//1、创建数据源（数据库连接池）对象
DruidDataSource ds =new DruidDataSource();

//2、设置参数
//(1)设置基本参数
ds.setDriverClassName("com.mysql.jdbc.Driver");
ds.setUrl("jdbc:mysql://localhost:3306/test");
ds.setUsername("root");
ds.setPassword("123456");

//(2)设置连接数等参数
ds.setInitialSize(5);//一开始提前申请好5个连接，不够了，重写申请
ds.setMaxActive(10);//最多不超过10个，如果10都用完了，还没还回来，就会出现等待
ds.setMaxWait(1000);//用户最多等1000毫秒，如果1000毫秒还没有人还回来，就异常了

//3、获取连接
Connection conn = ds.getConnection(); 
```



## 封装JDBCUtils

配置文件：src/jdbc.properties

```java
#key=value
driverClassName=com.mysql.jdbc.Driver
url=jdbc:mysql://localhost:3306/test
username=root
password=123456
initialSize=5
maxActive=10
maxWait=1000
```

JDBCTools工具类：

```java
package com.atguigu.util;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

import javax.sql.DataSource;

import com.alibaba.druid.pool.DruidDataSourceFactory;

/*
 * 获取连接或释放连接的工具类
 */
public class JDBCTools {
	// 1、数据源,即连接池
	private static DataSource dataSource;
	
	// 2、ThreadLocal对象
	private static ThreadLocal<Connection> threadLocal;

	static {
		try {
			//1、读取druip.properties文件
			Properties pro = new Properties();
			pro.load(JDBCTools.class.getClassLoader().getResourceAsStream("druid.properties"));
			
			//2、连接连接池
			dataSource = DruidDataSourceFactory.createDataSource(pro);

			//3、创建线程池
			threadLocal = new ThreadLocal<>();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取连接的方法
	 * 
	 * @return
	 * @throws SQLException
	 */
	public static Connection getConnection() {
		// 从当前线程中获取连接
		Connection connection = threadLocal.get();
		if (connection == null) {
			// 从连接池中获取一个连接
			try {
				connection = dataSource.getConnection();
				// 将连接与当前线程绑定
				threadLocal.set(connection);
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		return connection;
	}

	/**
	 * 释放连接的方法
	 * 
	 * @param connection
	 */
	public static void releaseConnection() {
		// 获取当前线程中的连接
		Connection connection = threadLocal.get();
		if (connection != null) {
			try {
				connection.close();
				// 将已经关闭的连接从当前线程中移除
				threadLocal.remove();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
	}
}
```

### ThreadLocal类

JDK 1.2的版本中就提供java.lang.ThreadLocal，为解决多线程程序的并发问题提供了一种新的思路。使用这个工具类可以很简洁地编写出优美的多线程程序。通常用来在在多线程中管理共享数据库连接、Session等。

```java
ThreadLocal用于保存某个线程共享变量，
    原因是在Java中，每一个线程对象中都有一个ThreadLocalMap<ThreadLocal, Object>，
    其key就是一个ThreadLocal，而Object即为该线程的共享变量。
    而这个map是通过ThreadLocal的set和get方法操作的。
    对于同一个static ThreadLocal，不同线程只能从中get，set，remove自己的变量，而不会影响其他线程的变量。
```

**方法**

```ts
1、ThreadLocal.get: 获取ThreadLocal中当前线程共享变量的值。

2、ThreadLocal.set: 设置ThreadLocal中当前线程共享变量的值。

3、ThreadLocal.remove: 移除ThreadLocal中当前线程共享变量的值。
```

