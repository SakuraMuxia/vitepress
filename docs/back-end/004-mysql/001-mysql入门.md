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

### 常用操作

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
导出的时候选择，导出表结构和表数据。
```

## SQL语句分类

| 分类    | 作用                                                         |
| ------- | ------------------------------------------------------------ |
| DDL语句 | 数据定义语句（Data Define Language），例如：创建（create），修改（alter），删除（drop）等 |
| DML语句 | 数据操作语句，例如：增（insert)，删（delete），改（update），查（select） |
| DCL语句 | 数据控制语句，例如：grant，commit，rollback等                |
| DQL     | 数据查询语句 select                                          |

## 查询语句DQL

### SELECT语句

SELECT语句的基本语法：

```sql
SELECT 常量;
SELECT 表达式;
SELECT 函数;
```

例如：

```sql
SELECT 1;
SELECT 9/2;
SELECT NOW();
```

查询所有字段

```sql
SELECT * FROM employees;
```

查询指定字段

```sql
SELECT name, salary FROM employees;
```

带条件查询

```sql
SELECT name, salary 
FROM employees
WHERE salary > 5000;
```

排序

```sql
SELECT name, salary 
FROM employees
ORDER BY salary DESC;
```

分组统计

```sql
SELECT department_id, COUNT(*) AS total
FROM employees
GROUP BY department_id;

```

分组过滤

```sql
SELECT department_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 6000;

```

分页

```sql
SELECT name, salary 
FROM employees
ORDER BY salary DESC
LIMIT 0, 10;  -- 查询前10条

```

常配合 `WHERE`、`GROUP BY`、`HAVING`、`ORDER BY`、`LIMIT` 使用

### 使用别名

- 给 **表** 或 **字段** 临时起一个名字（仅在当前 SQL 语句中生效）
- 使语句更简洁，更易读
- 在多表查询或函数计算结果中，避免列名混乱

别名分为 **字段别名** 和 **表别名**;

#### 字段别名

```sql
SELECT 字段名 AS 别名
FROM 表名;
```

> `AS` 可以省略，常用简写

```sql
SELECT 字段名 别名
FROM 表名;
```

**示例**

1、**给字段起别名**

```sql
SELECT name AS 姓名, salary AS 薪资
FROM employees;
```

2、**计算字段并取别名**

```sql
SELECT salary * 12 AS 年薪
FROM employees;
```

3、**别名中包含空格时需要引号**

```sql
SELECT name AS "员工 姓名", salary AS "月 薪"
FROM employees;
```

4、**别名省略AS**

```sql
SELECT name "员工 姓名", salary "月 薪"
FROM employees;
```

#### 表别名

1、**给表起别名**

```sql
SELECT e.name, e.salary
FROM employees AS e;
```

2、**多表查询时简化表名**

```sql
SELECT e.name, d.department_name
FROM employees e
JOIN departments d ON e.department_id = d.id;
```

3、**自连接时必须用别名**

```sql
SELECT e1.name AS 员工, e2.name AS 上级
FROM employees e1
JOIN employees e2 ON e1.manager_id = e2.id;
```

------

#### 注意事项

- `AS` 用于给字段或表起别名，可以省略；
- 别名提高可读性，尤其在多表查询、计算字段、列名重复时非常有用；
- 别名可在 `ORDER BY`、`HAVING` 使用，但不能在 `WHERE` 使用；

### 结果去重

使用 关键字 `distinct`关键字去重。

**基本语法：**

```sql
SELECT DISTINCT 字段1, 字段2, ...
FROM 表名
[WHERE 条件];
```

**🔥 示例：**

1、对单个字段去重

```sql
SELECT DISTINCT department_id
FROM employees;
```

2、对多个字段联合去重

```sql
SELECT DISTINCT department_id, job_id
FROM employees;
```

3、结合条件使用

```sql
SELECT DISTINCT name
FROM employees
WHERE salary > 5000;
```

4、和聚合函数一起用

```sql
SELECT COUNT(DISTINCT department_id)
FROM employees;
```

**🔥 注意事项：**

1、DISTINCT 作用范围是 整个字段组合，而不是单独某一个字段；

```sql
SELECT DISTINCT name, department_id
FROM employees;
```

2、DISTINCT 不能直接写在部分字段前面，必须作用于整组；

```sql
❌ 错误写法
SELECT name, DISTINCT department_id FROM employees;

✅ 正确写法
SELECT DISTINCT name, department_id FROM employees;
```

3、如果只是想去掉 重复行，用 DISTINCT；如果是对结果做更复杂的去重、排名，可以结合 ROW_NUMBER()、GROUP BY 等；

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

## 系统函数

### 分组函数

⚡️ **分组函数：**

- **对多行数据进行计算，返回一个结果值。**
- 常用于 **`GROUP BY`** 或统计分析。
- 作用：对一组数据进行汇总统计。

| 函数      | 作用       |
| --------- | ---------- |
| `COUNT()` | 统计行数   |
| `SUM()`   | 计算总和   |
| `AVG()`   | 计算平均值 |
| `MAX()`   | 求最大值   |
| `MIN()`   | 求最小值   |

使用示例：

```sql
-- 建表示例
CREATE TABLE sales (
    id INT,
    product VARCHAR(20),
    amount DECIMAL(10,2)
);

INSERT INTO sales VALUES
(1, '手机', 2000),
(2, '电脑', 5000),
(3, '手机', 3000),
(4, '平板', 2500);

-- 示例1: 求总销售额
SELECT SUM(amount) AS total_sales FROM sales;

-- 示例2: 求平均销售额
SELECT AVG(amount) AS avg_sales FROM sales;

-- 示例3: 按产品分组，统计销售数量 & 总额
SELECT product, COUNT(*) AS sales_count, SUM(amount) AS total
FROM sales
GROUP BY product;

```

```sql
-- 查询平均年龄，聚合函数（分组函数）把多条数组聚合成一条数据
select avg(employee.empage) as "平均年龄" from employee;

-- 统计求和
select sum(employee.empscore) as "绩效总和" from employee;

-- 统计最大的年龄
select max(employee.empage) from employee;

-- 统计最小的年龄
select min(employee.empage) from employee;

-- 统计记录数
-- 统计员工表中总共有多少条记录数，以下两个作用相同
select count(*) as "总记录数" from employee;
select count(1) as "总记录数" from employee;
```

### 单行函数

- **作用于每一行，返回一个结果。**
- 不改变数据的行数。
- 常用于查询结果的格式化、数据处理。

**（1）数值函数**

| 函数          | 作用            |
| ------------- | --------------- |
| `ABS(x)`      | 绝对值          |
| `ROUND(x, d)` | 四舍五入到 d 位 |
| `FLOOR(x)`    | 向下取整        |
| `CEIL(x)`     | 向上取整        |
| `MOD(x,y)`    | 取余            |

```sql
-- 求绝对值
select abs(-123);

-- 四舍五入
select round(3.3);

-- 向下取整
select floor(3.3);

-- 向上取整
select ceil(3.3);

-- 取余
select mod(10,3);

```

**（2）字符串函数**

| 函数                             | 作用                     |
| -------------------------------- | ------------------------ |
| `LENGTH(str)`                    | 返回字符串长度（字符数） |
| `CONCAT(a,b,...)`                | 拼接字符串               |
| `UPPER(str)` / `LOWER(str)`      | 大小写转换               |
| `TRIM(str)`                      | 去掉前后空格             |
| `SUBSTRING(str,pos,len)`         | 截取字符串               |
| `REPLACE(str, from_str, to_str)` | 替换字符串               |

🔖 使用示例：

```sql
-- 字符串长度
select length('Hello World');

-- 拼接
select concat('Hello',' ','SQL');

-- 转大写
select upper('hello');

-- 去掉前后空格
select trim('   SQL   ');

-- 截取字符串
select substring('abcdef', 2, 3);

-- 替换
select replace('hello world','world','SQL');

```

**（3）日期函数**

| 函数                                     | 作用             |
| ---------------------------------------- | ---------------- |
| `NOW()`                                  | 返回当前日期时间 |
| `CURDATE()` / `CURTIME()`                | 当前日期 / 时间  |
| `YEAR(date)`、`MONTH(date)`、`DAY(date)` | 提取年、月、日   |
| `DATE_ADD(date, INTERVAL n unit)`        | 日期加减         |
| `DATEDIFF(d1,d2)`                        | 日期差（天数）   |

🔖 使用示例：

```sql
-- 当前日期时间
select now();

-- 只取日期
select curdate();

-- 提取年、月、日
select year(now()), month(now()), day(now());

-- 日期加减
select date_add('2025-08-19', interval 7 day);

-- 日期差
select datediff('2025-08-19','2025-08-01');

```

**（4）系统信息函数**

| 函数               | 作用                  |
| ------------------ | --------------------- |
| `USER()`           | 当前用户              |
| `DATABASE()`       | 当前数据库            |
| `VERSION()`        | 数据库版本            |
| `LAST_INSERT_ID()` | 最近一次插入的自增 ID |

🔖 使用示例：

```sql
-- 当前用户
select user();

-- 当前数据库
select database();

-- MySQL 版本
select version();

-- 最近一次插入 ID
insert into test(name) values('abc');
select last_insert_id();

```

**（5）条件判断函数**

| 函数                                  | 作用                     |
| ------------------------------------- | ------------------------ |
| `IF(expr, v1, v2)`                    | 条件成立返回 v1，否则 v2 |
| `IFNULL(v1, v2)`                      | v1 为 NULL 时返回 v2     |
| `CASE WHEN ... THEN ... ELSE ... END` | 多条件判断               |

🔖 使用示例：

```sql
-- IF 判断
select if(10>5, '大于', '小于');

-- IFNULL
select ifnull(null, '默认值');

-- CASE，使用方式1：条件是一个区间
select 
  case 
    when score >= 90 then '优秀'
    when score >= 60 then '及格'
    else '不及格'
  end as result
from exam;


-- CASE，使用方式2：条件是常量
select 
  case 
    when 100 then '满分'
    when 60 then '及格'
    else '不及格'
  end as result
from exam;

```

**（6）其他函数**

| 函数       | 作用           |
| ---------- | -------------- |
| `UUID()`   | 生成唯一标识符 |
| `MD5(str)` | 计算 MD5 值    |
| `RAND()`   | 生成随机数     |

🔖 使用示例：

```sql
-- UUID
select uuid();

-- MD5
select md5('123456');

-- 随机数
select rand();

```

**（7）窗口函数（Mysql 8.0新特性）**

| 函数                         | 作用                       |
| ---------------------------- | -------------------------- |
| `ROW_NUMBER()`               | 行号                       |
| `RANK()`                     | 排名（有并列，跳过名次）   |
| `DENSE_RANK()`               | 排名（有并列，不跳过名次） |
| `SUM()/AVG()/COUNT() OVER()` | 窗口聚合                   |

🔖 使用示例：

```sql
-- 按成绩排名
select 
  name, score,
  row_number() over(order by score desc) as rownum,
  rank() over(order by score desc) as ranknum,
  dense_rank() over(order by score desc) as denserank
from exam;

-- 分组内求平均
select 
  dept, name, salary,
  avg(salary) over(partition by dept) as avg_salary
from employee;

```

 **（8）加密函数**

| 函数                    | 作用                                              |
| ----------------------- | ------------------------------------------------- |
| `MD5(str)`              | 返回字符串的 MD5 128 位哈希值（32位16进制字符串） |
| `SHA(str)`              | 返回字符串的 SHA1 哈希值                          |
| `SHA2(str, len)`        | 使用 SHA2 算法加密，len=224/256/384/512           |
| `PASSWORD(str)`         | 返回 MySQL 内部使用的加密串（不推荐用户自行使用） |
| `ENCODE(str, key)`      | 使用 key 对 str 进行加密                          |
| `DECODE(str, key)`      | 使用 key 对加密串进行解密                         |
| `AES_ENCRYPT(str, key)` | 使用 AES 算法加密                                 |
| `AES_DECRYPT(str, key)` | 使用 AES 算法解密                                 |

🔖 使用示例：

```sql
-- 使用 MD5 加密
select md5('123456') as md5_pwd;

-- 使用 SHA1 加密
select sha('hello world') as sha1_val;

-- 使用 SHA2 加密（256位），生成的长度为 256/4 = 64位的字符串
select sha2('hello world', 256) as sha2_val;

-- 使用 AES 加密和解密
select 
  aes_encrypt('secret_data', 'mykey') as encrypted,
  aes_decrypt(aes_encrypt('secret_data', 'mykey'), 'mykey') as decrypted;

-- 使用 ENCODE/DECODE
select 
  encode('testdata','mykey') as encoded,
  decode(encode('testdata','mykey'),'mykey') as decoded;

```

总结：

- **分组函数**：对多行做统计（SUM、COUNT、AVG…）。
- **单行函数**：对单行做处理（ABS、SUBSTRING、NOW…）。

## 关联查询

📌 **什么是关联查询**

关联查询（Join Query）指的是从**多个表**中根据一定的关系条件（通常是主键和外键的对应关系）获取数据。
 常用于数据分布在不同表，需要组合展示时。

📌 **关联查询结果分为几种情况**

### 内连接（INNER JOIN）

- 取两张表中**符合连接条件**的记录。
- 交集效果。

```sql
-- 查询员工及其所在部门
select e.id, e.name, d.dept_name
from employee e
inner join department d
on e.dept_id = d.id;
```

### 左连接（LEFT JOIN）

- 返回左表的所有记录，即使右表没有匹配，也会显示（右表字段为 `NULL`）。
- 左表为主。

```sql
-- 查询所有员工及部门（即便部门为空）
select e.id, e.name, d.dept_name
from employee e
left join department d
on e.dept_id = d.id;
```

### 右连接（RIGHT JOIN）

- 返回右表的所有记录，即使左表没有匹配，也会显示（左表字段为 `NULL`）。
- 右表为主。

```sql
-- 查询所有部门及部门下员工（即便部门没人）
select e.id, e.name, d.dept_name
from employee e
right join department d
on e.dept_id = d.id;
```

### UNION / UNION ALL（联合查询）

- **UNION**：对两个查询结果进行合并，并去重。
- **UNION ALL**：对两个查询结果进行合并，不去重，效率更高。
- 要求：**字段数一致，字段类型兼容**。

```sql
-- 查询所有员工编号（来自正式员工和实习生两张表）
select id, name from employee
union
select id, name from intern;
```

📌 **关联查询的SQL有几种情况**

常见情况：

1. **内连接**（inner join / join）
2. **外连接**（left join、right join、full join）
3. **交叉连接**（cross join，笛卡尔积）
4. **联合查询**（union / union all）
5. **自连接**（表与自身的关联查询）

📌 **联合查询字段列表问题**

使用 `UNION` 或 `UNION ALL` 时：

1. 两个 `select` 的字段**数量必须一致**
2. 对应字段的**类型必须兼容**（数值/字符串/日期）
3. 字段名以**第一个查询的字段名为准**

```sql
select id, name from employee
union
select student_id, student_name from student;
-- 结果字段名是 id, name

```

### 自连接（SELF JOIN）

**自连接**：同一张表与自身进行关联，用于处理表内层级关系（树结构、上下级关系等）。

```sql
-- 查询员工及其上级领导姓名
select 
  e.id as emp_id, e.name as emp_name,
  m.id as mgr_id, m.name as mgr_name
from employee e
left join employee m
on e.manager_id = m.id;

```

📌 总结

| 类型       | 作用                                       | 关键点             |
| ---------- | ------------------------------------------ | ------------------ |
| INNER JOIN | 取两表交集                                 | 匹配的行           |
| LEFT JOIN  | 左表为主，右表可为空                       | 左表全有           |
| RIGHT JOIN | 右表为主，左表可为空                       | 右表全有           |
| FULL JOIN  | 左右表并集（MySQL 不支持，Oracle/PG 支持） | 全部行             |
| UNION      | 合并结果并去重                             | 字段数、类型需一致 |
| UNION ALL  | 合并结果不去重                             | 性能更高           |
| SELF JOIN  | 自己和自己关联                             | 处理树结构         |
