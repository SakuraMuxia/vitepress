# HTML结构

## HTML结构

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>标准HTML结构示例</title>
    
    <!-- 网站图标 -->
    <link rel="icon" href="favicon.ico">

    <!-- 引入外部CSS -->
    <link rel="stylesheet" href="styles.css">
	<!-- 引入外部JS 会引起HTML加载阻塞，但是如果是bootstrap之类的框架，必须放在前边-->
    <script src="script.js"></script>
    <!-- 内联CSS -->
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 20px;
        }
        h1 {
            color: #333;
        }
    </style>
</head>
<body>

    <header>
        <h1>这是一个标准HTML页面</h1>
    </header>

    <main>
        <p>这里是页面的主要内容。</p>
        <button id="btn">点我</button>
    </main>

    <footer>
        <p>© 2025 示例公司</p>
    </footer>

    <!-- 引入外部JS -->
    <script src="script.js"></script>

    <!-- 内联JS -->
    <script>
        document.getElementById('btn').addEventListener('click', function() {
            alert('按钮被点击了！');
        });
    </script>
</body>
</html>

```

如果直接把 `<script>` 放在 `<head>` 里，页面在加载 JS 的时候会**阻塞 HTML 的解析**（浏览器会先执行 JS，才继续渲染页面）。

```html
<head>
    <script src="script.js"></script>
</head>

```

**优化方式**

- **使用 `defer`**（推荐）：
   脚本会在 HTML 解析完毕后才执行，适合大部分情况。

  ```html
  <head>
      <script src="script.js" defer></script>
  </head>
  ```

- **使用 `async`**：
   脚本会异步下载并执行，不保证执行顺序（适合一些独立、不依赖其他代码的脚本，比如广告/统计）。

  ```html
  <head>
      <script src="script.js" async></script>
  </head>
  ```

**传统做法**
 很多时候把 `<script>` 放在 `</body>` 前，避免阻塞渲染：

```html
<body>
    ...
    <script src="script.js"></script>
</body>
```

## Bootstrap的使用

```html
<!DOCTYPE html>
<html lang="zh-CN" xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8" />
    <title>水果管理</title>
    <!-- 可选择引入 Bootstrap（可去掉或换成自己样式） -->
    <link th:href="@{https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css}" rel="stylesheet">
    <script th:src="@{https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js}"></script>
</head>
<body class="bg-light">
<div class="container py-4">

    <h1 class="mb-4">水果管理</h1>

    <!-- 新增表单（可以改为 modal，如果喜欢） -->
    <div class="card mb-4">
        <div class="card-header">添加新水果</div>
        <div class="card-body">
            <form th:action="@{/fruit/add}" method="post" class="row g-2">
                <div class="col-md-3">
                    <input class="form-control" name="name" placeholder="名称 (例如：苹果)" required>
                </div>
                <div class="col-md-2">
                    <input class="form-control" name="price" placeholder="价格" type="number" step="0.01" required>
                </div>
                <div class="col-md-2">
                    <input class="form-control" name="count" placeholder="库存" type="number" min="0" required>
                </div>
                <div class="col-md-3">
                    <input class="form-control" name="remark" placeholder="备注（可选）">
                </div>
                <div class="col-md-2">
                    <button type="submit" class="btn btn-primary w-100">添加</button>
                </div>
            </form>
        </div>
    </div>

    <!-- 列表 -->
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <span>水果列表</span>
            <form th:action="@{/fruit/list}" method="get" class="d-flex" style="max-width: 420px;">
                <input name="keyword" th:value="${keyword}" class="form-control form-control-sm me-2" placeholder="按名称搜索">
                <button class="btn btn-sm btn-outline-secondary" type="submit">搜索</button>
            </form>
        </div>

        <div class="table-responsive">
            <table class="table table-hover mb-0">
                <thead class="table-light">
                <tr>
                    <th>ID</th>
                    <th>名称</th>
                    <th>价格</th>
                    <th>库存</th>
                    <th>备注</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                <!-- 遍历 fruits 列表 -->
                <tr th:each="f : ${fruits}">
                    <td th:text="${f.id}">1</td>
                    <td th:text="${f.name}">苹果</td>
                    <td th:text="${#numbers.formatDecimal(f.price, 1, 'COMMA', 2, 'POINT')}">1.00</td>
                    <td th:text="${f.count}">10</td>
                    <td th:text="${f.remark}">新鲜</td>
                    <td>
                        <!-- 编辑：跳转到带 id 的编辑页面，后台构建对应的 fruit 放入 model -->
                        <a th:href="@{/fruit/edit(id=${f.id})}" class="btn btn-sm btn-outline-primary me-1">编辑</a>

                        <!-- 删除：点击确认后访问删除接口 -->
                        <a href="javascript:void(0);"
                           th:onclick="'if(confirm(\'确认删除：【' + ${f.name} + '】?\')) location.href=\'' + @{/fruit/delete(id=${f.id})} + '\';'"
                           class="btn btn-sm btn-outline-danger">删除</a>
                    </td>
                </tr>

                <!-- 如果列表为空 -->
                <tr th:if="${fruits == null or #lists.isEmpty(fruits)}">
                    <td colspan="6" class="text-center text-muted">暂无数据</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- 编辑表单（当后台返回一个 'fruit' 对象时显示） -->
    <div th:if="${fruit != null}" class="card mt-4">
        <div class="card-header">编辑水果（ID: <span th:text="${fruit.id}">0</span>）</div>
        <div class="card-body">
            <form th:action="@{/fruit/update}" method="post" class="row g-2">
                <!-- id 隐藏 -->
                <input type="hidden" name="id" th:value="${fruit.id}">
                <div class="col-md-3">
                    <input class="form-control" name="name" th:value="${fruit.name}" required>
                </div>
                <div class="col-md-2">
                    <input class="form-control" name="price" type="number" step="0.01" th:value="${fruit.price}" required>
                </div>
                <div class="col-md-2">
                    <input class="form-control" name="count" type="number" min="0" th:value="${fruit.count}" required>
                </div>
                <div class="col-md-3">
                    <input class="form-control" name="remark" th:value="${fruit.remark}">
                </div>
                <div class="col-md-2 d-flex gap-1">
                    <button class="btn btn-success w-100" type="submit">保存修改</button>
                    <a th:href="@{/fruit/list}" class="btn btn-outline-secondary w-100">取消</a>
                </div>
            </form>
        </div>
    </div>

</div>

<!-- 简单脚本（Bootstrap 已包含） -->
<script>
    // 如果你希望使用 POST 删除（更安全），可以通过 fetch 发起请求并刷新页面
    function doDeletePost(url) {
        if (!confirm('确认删除？')) return;
        fetch(url, {method: 'POST'}).then(r => location.reload());
    }
</script>
</body>
</html>

```

## form表单按钮类型

```html
<form action="addFruit" method="post">
    <!-- 水果名称 -->
    <div class="mb-3">
      <label class="form-label">水果名称：</label>
      <input type="text" class="form-control" name="fname">
    </div>
    <!-- 价格 -->
    <div class="mb-3">
      <label class="form-label">价格：</label>
      <input type="number" class="form-control" name="price" >
    </div>
    <!-- 库存数量 -->
    <div class="mb-3">
      <label class="form-label">库存数量：</label>
      <input type="number" class="form-control" name="count">
    </div>
    <!-- 备注 -->
    <div class="mb-3">
      <label class="form-label">备注：</label>
      <input type="text" class="form-control" name="remark">
    </div>
    <!-- 操作按钮 -->
    <div class="d-flex justify-content-between">
      <button type="submit" class="btn btn-success">保存</button>
      <button onclick="handleJumpList()" type="button">取消</button>
    </div>
</form>
<script>
  const handleJumpList = () => {
    // 方式2：如果你使用的是后端路由，比如 Spring Boot 的 /fruit/list
    window.location.href = '/fruit/fruitList';
  }
</script>
```

```html
<form th:action="@{/updateFruit}" method="post" th:object="${fruit}">
  <!-- 隐藏id -->
  <input type="hidden" name="id" th:value="*{id}">

  <label>水果名称：</label>
  <input type="text" name="fname" th:value="*{fname}" required>
  <br>

  <label>价格：</label>
  <input type="number" name="price" th:value="*{price}" step="0.1" required>
  <br>

  <label>库存数量：</label>
  <input type="number" name="count" th:value="*{count}" required>
  <br>

  <label>备注：</label>
  <input type="text" name="remark" th:value="*{remark}">
  <br>

  <button type="submit">保存修改</button>
  <!--取消默认提交功能-->
  <button onclick="handleJumpList()" type="button">取消</button>
</form>
<script>
    function handleJumpList(){
      // 方式1：直接跳转到某个页面
      window.location.href = '/fruit/fruitList.html'; // 改成你的列表页路径

      // 方式2：如果你使用的是后端路由，比如 Spring Boot 的 /fruit/list
      // window.location.href = '/fruit/list';
    }
</script>
```

## CSS闪烁样式

方式1：

```html
<svg t="1758857706414" class="icon-blick path" viewBox="0 0 1092 1024" version="1.1">
    <path ></path>
    <title>浪涌开关动作</title>
    <path></path>
</svg>
```

```css
.icon-blick path {
  animation: blink 1s infinite;
}

// 定义闪烁动画
@keyframes blink {
  0% {
    opacity: 1;
    fill: #efb336; /* 初始颜色 */
  }
  50% {
    opacity: 0.2;
    fill: #ffd36a; /* 变亮一点 */
  }
  100% {
    opacity: 1;
    fill: #efb336;
  }
}
```

方式2：

```css
// 绿灯
.green-light-on {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #00ff00;
    box-shadow: 0 0 15px #00ff00;
}
// 灰灯
.gray-light-on {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #afaeae;
}
@keyframes blinkYellow {

    0%,
    100% {
        background-color: #ffcc00;
        box-shadow: 0 0 10px #ffcc00;
    }

    50% {
        background-color: #996600;
        box-shadow: none;
    }
}
// 黄灯闪烁
.yellow-light {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ffcc00;
    box-shadow: 0 0 10px #ffcc00;
    animation: blinkYellow 1s infinite;
}
```

### 动态Class切换

```html
你这个需求在前端里就是一个动态 class 切换。常见写法：
<svg :class="device.online ? 'icon-blick path' : 'icon-static path'">
  <!-- ... -->
</svg>

// 或
<svg :class="['path', device.online ? 'icon-blick' : 'icon-static']">
  <!-- ... -->
</svg>
```

