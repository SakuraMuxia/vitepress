# Mysql8新特性

## 字符集

- **默认字符集** 改为 **utf8mb4**（之前是 latin1 → utf8）。
  - 支持完整的 Unicode，包括 emoji 😊。

## 存储引擎

- **系统表全部使用 InnoDB**
  - 以前是 MyISAM，8.0 全部迁移到 InnoDB，保证事务性和一致性。

## SQL 功能增强

- **窗口函数 (Window Functions)**

  - 例如：`ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `LEAD()`, `LAG()` 等。

  ```
  SELECT name, score,
         RANK() OVER (PARTITION BY class_id ORDER BY score DESC) AS rank
  FROM student;
  ```

- **公用表表达式 (CTE, Common Table Expressions)**

  - 支持 `WITH` 递归查询。

  ```
  WITH RECURSIVE cte AS (
    SELECT 1 AS n
    UNION ALL
    SELECT n+1 FROM cte WHERE n < 5
  )
  SELECT * FROM cte;
  ```

## 数据字典

- **统一的数据字典**
  - 以前元数据分散在 `.frm`、`.ibd` 文件里。
  - 8.0 把表定义、元数据等都统一存储在 InnoDB 数据字典。

## JSON 增强

- **JSON 函数更丰富**：`JSON_TABLE()`, `->>`, `JSON_ARRAYAGG()`, `JSON_OBJECTAGG()`。

## 安全性增强

- **角色 (Roles)**
  - 可以创建角色并赋予权限，简化权限管理。
- **更强的密码加密方式**（默认 caching_sha2_password）。

## 其他改进

- **隐藏索引 (Invisible Index)**
  - 可以让索引在优化器中“失效”，但不需要删除，方便调优。
- **持久化系统变量 (Persisted Variables)**
  - `SET PERSIST` 修改的参数会写入 `mysqld-auto.cnf`，重启后依旧生效。
- **原子 DDL**
  - DDL 操作要么成功要么回滚，避免中间状态。

