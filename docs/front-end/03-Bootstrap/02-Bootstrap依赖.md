# BootStrap

## 依赖情况

| 版本        | 依赖 jQuery | 依赖 Popper.js | 说明                                      |
| ----------- | ----------- | -------------- | ----------------------------------------- |
| Bootstrap 3 | ✅           | ❌              | jQuery 必须                               |
| Bootstrap 4 | ✅           | ✅              | JS 插件需要 jQuery + Popper               |
| Bootstrap 5 | ❌           | ✅（内置）      | 不依赖 jQuery，只依赖 Popper.js（已内置） |

是的，**Bootstrap 4 的 JavaScript 组件依赖 jQuery**（和 Popper.js，用于下拉菜单、工具提示等）

Bootstrap 4 本地引用示例

```html
<!-- CSS -->
<link rel="stylesheet" href="/bootstrap4/css/bootstrap.min.css">

<!-- jQuery -->
<script src="/bootstrap4/js/jquery-3.6.0.min.js"></script>

<!-- Popper.js -->
<script src="/bootstrap4/js/popper.min.js"></script>

<!-- Bootstrap JS -->
<script src="/bootstrap4/js/bootstrap.min.js"></script>

```

**顺序很重要**：jQuery → Popper → Bootstrap JS

如果缺少 jQuery，Bootstrap 4 的 Modal、Dropdown、Tooltip 等组件 **无法正常工作**

如果想 **不依赖 jQuery**，要用 **Bootstrap 5**

Bootstrap 4 必须加载 jQuery + Popper.js

示例：

目录结构

```java
webapp/
├─ bootstrap4/
│  ├─ css/bootstrap.min.css
│  ├─ js/jquery-3.6.0.min.js
│  ├─ js/popper.min.js
│  └─ js/bootstrap.min.js
├─ WEB-INF/
│  └─ views/
│      └─ table.html

```

Thymeleaf 页面 `table.html`

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8">
    <title>数据表页面</title>
    <!-- 本地 Bootstrap CSS -->
    <link th:href="@{/bootstrap4/css/bootstrap.min.css}" rel="stylesheet">
    <style>
        body {
            background-color: #f8f9fa; /* 灰色背景 */
        }
        .table-container {
            width: 60%;
            margin-top: 50px;
            background-color: #fff;
            border-radius: 0.5rem;
            box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075);
            display: flex;
            flex-direction: column;
            max-height: 90vh;
        }
        .table-wrapper {
            overflow-y: auto;
            flex-grow: 1;
        }
        thead th {
            position: sticky;
            top: 0;
            background-color: #e9ecef; /* 表头背景 */
        }
    </style>
</head>
<body class="d-flex justify-content-center">

<div class="table-container">

    <!-- 功能栏 -->
    <div class="d-flex justify-content-between align-items-center p-3 border-bottom">
        <!-- 搜索表单 -->
        <form th:action="@{/data/search}" method="get" class="form-inline d-flex">
            <input name="keyword" type="text" class="form-control form-control-sm mr-2" placeholder="搜索...">
            <button type="submit" class="btn btn-primary btn-sm">搜索</button>
        </form>

        <!-- 导出按钮 -->
        <form th:action="@{/data/export}" method="get">
            <button type="submit" class="btn btn-success btn-sm">导出</button>
        </form>
    </div>

    <!-- 表格 -->
    <div class="table-wrapper">
        <table class="table table-striped table-hover mb-0">
            <thead>
            <tr>
                <th>ID</th>
                <th>姓名</th>
                <th>年龄</th>
                <th>邮箱</th>
            </tr>
            </thead>
            <tbody>
            <tr th:each="user : ${users}">
                <td th:text="${user.id}">1</td>
                <td th:text="${user.name}">张三</td>
                <td th:text="${user.age}">25</td>
                <td th:text="${user.email}">zhangsan@example.com</td>
            </tr>
            </tbody>
        </table>
    </div>

</div>

<!-- 本地 jQuery、Popper.js 和 Bootstrap JS -->
<script th:src="@{/bootstrap4/js/jquery-3.6.0.min.js}"></script>
<script th:src="@{/bootstrap4/js/popper.min.js}"></script>
<script th:src="@{/bootstrap4/js/bootstrap.min.js}"></script>

</body>
</html>

```

