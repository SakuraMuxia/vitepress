# 数据库

## 安装配置

```java
见运维篇
```

### 启动服务

```java
windows系统
net stop 服务名
net start 服务名

打开服务面板
运行 -> services.msc 打开服务设置面板 -> 找到mysql打开80
```

### 可视化工具

```java
navicat 客户端
    
DataGrip 2023.3.4
```

### 注释方式

```sql
# 来注释
-- 来注释
/* 来注释 */ 
```

### 导出和导入

```java
导出的时候选择，同时勾选表结构和表数据。
```

### 创建表方式

1️⃣  **使用图形化界面创建表**

1. **连接数据库**
   - 打开 DataGrip → 在 **Database** 面板点击 **+ → Data Source → MySQL**（或其他数据库类型）
   - 填写连接信息（主机、端口、用户名、密码）
   - 测试连接成功后点击 **OK**
2. **选择数据库**
   - 展开连接 → 找到你要创建表的数据库 → 右键点击 **Tables → New → Table**
3. **填写表名和字段**
   - 在弹出的窗口中：
     - **Table name**：输入表名
     - **Columns**：
       - 点击 **+** 添加字段
       - 输入字段名
       - 选择类型（如 `INT`, `VARCHAR(255)`, `DATETIME` 等）
       - 可勾选 **Primary Key**、**Not Null**、**Auto Increment** 等选项
4. **保存表**
   - 确认无误后点击 **OK** 或 **Apply**
   - 表会出现在数据库列表中

💡 **Tip**：可以在界面下方切换到 **DDL** 标签页，DataGrip 会自动生成对应的 SQL 语句。

------

**2️⃣ 使用 SQL 语句创建表**

1. **打开 SQL Console**

```ts
右键点击数据库 → New → Console
```

2. **编写 SQL**

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

3. **执行 SQL**

------

**3️⃣ 查看和修改表**

- **查看表结构**：右键表 → **Jump to DDL** 或 **Modify Table**
- **修改表结构**：
  - 图形化修改 → **Modify Table**
  - 或直接写 `ALTER TABLE` SQL：

```sql
ALTER TABLE users ADD COLUMN last_login DATETIME;
```

### Schema

在 **MySQL** 里，**Schema** 基本上就是 **数据库（Database）** 的另一种叫法

**基本概念**

- **Schema = Database**
  - 在 MySQL 中，创建一个 schema 就相当于创建一个数据库
  - Schema 用来组织和存储表、视图、存储过程、函数等对象
- **语法**：

```sql
-- 创建 schema（数据库）
CREATE SCHEMA my_schema;

-- 等价于
CREATE DATABASE my_database;
```

> 注意：在 MySQL 中，`CREATE SCHEMA` 和 `CREATE DATABASE` 完全等价，功能一样。

------

**使用 Schema**

- **切换当前 Schema / 数据库**：

```sql
USE my_schema;
```

- **查看所有 Schema**：

```sql
SHOW SCHEMAS;
-- 或
SHOW DATABASES;
```

- **删除 Schema**：

```sql
DROP SCHEMA my_schema;
-- 等价于 DROP DATABASE my_schema;
```

## SQL语句分类

| 分类    | 作用                                                         |
| ------- | ------------------------------------------------------------ |
| DDL语句 | 数据定义语句（Data Define Language），例如：创建（create），修改（alter），删除（drop）等 |
| DML语句 | 数据操作语句，例如：增（insert)，删（delete），改（update），查（select） |
| DCL语句 | 数据控制语句，例如：grant，commit，rollback等                |
| DQL     | 数据查询语句 select                                          |

## 常用语句

数据库操作

```sql
-- 查看所有数据库
SHOW DATABASES;

-- 创建数据库
CREATE DATABASE dbname CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- 使用数据库
USE dbname;

-- 删除数据库
DROP DATABASE IF EXISTS dbname;

-- 修改数据库字符集
ALTER DATABASE dbname CHARACTER SET utf8mb4;

-- 查看数据库创建语句（字符集等）
SHOW CREATE DATABASE dbname;

```

表操作

```sqlite
-- 查看所有表
SHOW TABLES;

-- 查看表结构
DESC 表名;

-- 查看表的建表语句
SHOW CREATE TABLE 表名;

-- 创建表
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    age INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 删除表
DROP TABLE IF EXISTS 表名;

-- 修改表名
RENAME TABLE old_name TO new_name;

-- 添加列
ALTER TABLE users ADD COLUMN email VARCHAR(100);

-- 修改列类型
ALTER TABLE users MODIFY COLUMN age SMALLINT;

-- 删除列
ALTER TABLE users DROP COLUMN email;

-- 修改表字符集
ALTER TABLE users CONVERT TO CHARACTER SET utf8mb4;

```

数据操作

```sql
-- 查询所有
SELECT * FROM users;

-- 条件查询
SELECT * FROM users WHERE age > 18;

-- 插入数据
INSERT INTO users (name, age) VALUES ('Alice', 25);

-- 更新数据
UPDATE users SET age = 30 WHERE name = 'Alice';

-- 删除数据
DELETE FROM users WHERE id = 1;

-- 计数
SELECT COUNT(*) FROM users;

-- 排序
SELECT * FROM users ORDER BY age DESC;

-- 分页
SELECT * FROM users LIMIT 10 OFFSET 20;  -- 从第21条开始，取10条

```

索引与主键

```sql
-- 创建普通索引
CREATE INDEX idx_name ON users(name);

-- 创建唯一索引
CREATE UNIQUE INDEX idx_email ON users(email);

-- 删除索引
DROP INDEX idx_name ON users;

-- 添加主键
ALTER TABLE users ADD PRIMARY KEY (id);

-- 删除主键
ALTER TABLE users DROP PRIMARY KEY;

```

用户与权限

```sql
-- 查看用户
SELECT user, host FROM mysql.user;

-- 创建用户
CREATE USER 'testuser'@'%' IDENTIFIED BY 'password';

-- 授权
GRANT ALL PRIVILEGES ON dbname.* TO 'testuser'@'%';

-- 撤销权限
REVOKE ALL PRIVILEGES ON dbname.* FROM 'testuser'@'%';

-- 刷新权限
FLUSH PRIVILEGES;

-- 删除用户
DROP USER 'testuser'@'%';

```

事务与锁

```sql
-- 开始事务
START TRANSACTION;

-- 提交事务
COMMIT;

-- 回滚事务
ROLLBACK;

-- 设置事务隔离级别
SET SESSION TRANSACTION ISOLATION LEVEL REPEATABLE READ;

```

其他常用

```sql
-- 当前时间
SELECT NOW();

-- MySQL 版本
SELECT VERSION();

-- 当前数据库
SELECT DATABASE();

-- 当前用户
SELECT USER();

```

## 运算符

### 算术运算符

| 运算符      | 说明     | 示例                                   |
| ----------- | -------- | -------------------------------------- |
| `+`         | 加法     | `SELECT 5 + 3 AS sum;` 返回 `8`        |
| `-`         | 减法     | `SELECT 5 - 3 AS diff;` 返回 `2`       |
| `*`         | 乘法     | `SELECT 5 * 3 AS product;` 返回 `15`   |
| `/`         | 除法     | `SELECT 5 / 2 AS quotient;` 返回 `2.5` |
| `DIV`       | 整数除法 | `SELECT 5 DIV 2 AS int_div;` 返回 `2`  |
| `%` / `MOD` | 取模     | `SELECT 5 % 2 AS remainder;` 返回 `1`  |

**示例说明**：算术运算符用于对数值字段或常量进行数学运算。

### 比较运算符

| 运算符      | 说明     | 示例                                            |
| ----------- | -------- | ----------------------------------------------- |
| `=`         | 等于     | `SELECT * FROM employees WHERE salary = 5000;`  |
| `!=` / `<>` | 不等于   | `SELECT * FROM employees WHERE salary != 5000;` |
| `>`         | 大于     | `SELECT * FROM employees WHERE salary > 5000;`  |
| `<`         | 小于     | `SELECT * FROM employees WHERE salary < 5000;`  |
| `>=`        | 大于等于 | `SELECT * FROM employees WHERE salary >= 5000;` |
| `<=`        | 小于等于 | `SELECT * FROM employees WHERE salary <= 5000;` |

**示例说明**：比较运算符用于筛选满足条件的记录。

### 区间比较运算符

| 运算符                    | 说明       | 示例                                                         |
| ------------------------- | ---------- | ------------------------------------------------------------ |
| `BETWEEN ... AND ...`     | 在区间内   | `SELECT * FROM employees WHERE salary BETWEEN 3000 AND 8000;` |
| `NOT BETWEEN ... AND ...` | 不在区间   | `SELECT * FROM employees WHERE salary NOT BETWEEN 3000 AND 8000;` |
| `IN (...)`                | 在集合中   | `SELECT * FROM employees WHERE department_id IN (10,20,30);` |
| `NOT IN (...)`            | 不在集合中 | `SELECT * FROM employees WHERE department_id NOT IN (10,20,30);` |

**示例说明**：用于快速判断字段值是否落在指定区间或集合中。

### 模糊匹配

| 运算符     | 说明           | 示例                                                         |
| ---------- | -------------- | ------------------------------------------------------------ |
| `LIKE`     | 模糊匹配       | `SELECT * FROM employees WHERE name LIKE 'A%';` （名字以A开头） |
| `%`        | 任意长度通配符 | `SELECT * FROM employees WHERE name LIKE '%son';` （名字以son结尾） |
| `_`        | 单字符通配符   | `SELECT * FROM employees WHERE name LIKE '_a%';` （第二个字符是a） |
| `NOT LIKE` | 不匹配         | `SELECT * FROM employees WHERE name NOT LIKE 'A%';`          |
| `REGEXP`   | 正则匹配       | `SELECT * FROM employees WHERE name REGEXP '^A.*n$';`        |

**示例说明**：模糊匹配用于部分匹配字符串或复杂模式匹配。

```sql
-- 模糊匹配，包含son的字段 
SELECT * FROM employees WHERE name LIKE '%son%';

-- 模糊匹配，查询名字以son开头的字段
SELECT * FROM employees WHERE name LIKE 'son%';

-- 模糊匹配，查询名字有A这个字，同时A的前边只有一个字
SELECT * FROM employees WHERE name LIKE '_A';

-- 查询当前mysql数据库的字符集情况
show variables like '%character%';
```

### 逻辑运算符

| 运算符       | 说明   | 示例                                                         |
| ------------ | ------ | ------------------------------------------------------------ |
| `AND`或 `&&` | 逻辑与 | `SELECT * FROM employees WHERE salary > 5000 AND department_id = 10;` |
| `OR`或`||`   | 逻辑或 | `SELECT * FROM employees WHERE salary > 5000 OR department_id = 10;` |
| `NOT`或`!`   | 逻辑非 | `SELECT * FROM employees WHERE NOT salary > 5000;`           |
| `XOR`        | 异或   | 两个条件只能满足一个的数据                                   |

**示例说明**：逻辑运算符用于组合多个条件进行筛选。

```sql
-- 查询查询employee表中的 empname包含赵，同时年龄大于25的数据
select * from employee where empname like '%赵%' and empage > 25;

-- 查询查询employee表中的 empname包含赵，同时年龄大于25的数据
select * from employee where empname like '%赵%' && empage > 25;

-- 查询查询employee表中的性别为男，或年龄大于30的数据
select * from employee where empname = '男' or empage > 30;

-- 查询查询employee表中的性别为男，或年龄大于30的数据
select * from employee where empname = '男' || empage > 30;

-- 逻辑异或，两个条件只能满足一个的数据
select * from employee where empage > 30 xor empsex = '男';

```

### null值处理

| 运算符 / 函数            | 说明                    | 示例                                                    |
| ------------------------ | ----------------------- | ------------------------------------------------------- |
| `IS NULL`                | 判断是否为 NULL         | `SELECT * FROM employees WHERE commission IS NULL;`     |
| `IS NOT NULL`            | 判断不为 NULL           | `SELECT * FROM employees WHERE commission IS NOT NULL;` |
| `<=>`                    | 安全等于（可比较 NULL） | `SELECT NULL <=> NULL;` 返回 `1`                        |
| `IFNULL(a,b)`            | a 为 NULL 返回 b        | `SELECT IFNULL(commission, 0) FROM employees;`          |
| `COALESCE(a1,a2,...,an)` | 返回第一个非 NULL       | `SELECT COALESCE(NULL,NULL,'A');` 返回 `'A'`            |

**示例说明**：用于判断或处理字段为 NULL 的情况。

### 位运算符

| 运算符 | 说明     | 示例                       |
| ------ | -------- | -------------------------- |
| `&`    | 按位与   | `SELECT 6 & 3;` 返回 `2`   |
| `|`    | 按位或   | SELECT 5  \| 3 AS result   |
| `^`    | 按位异或 | `SELECT 6 ^ 3;` 返回 `5`   |
| `~`    | 按位取反 | `SELECT ~6;` 返回 `-7`     |
| `<<`   | 左移     | `SELECT 6 << 1;` 返回 `12` |
| `>>`   | 右移     | `SELECT 6 >> 1;` 返回 `3`  |

**示例说明**：位运算符用于对整数的二进制位进行操作，常用于权限、标志位等场景。

