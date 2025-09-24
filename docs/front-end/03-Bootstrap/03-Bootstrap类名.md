# Bootstrap类名

## 颜色类

文本颜色

```html
<p class="text-primary">蓝色</p>
<p class="text-success">绿色</p>
<p class="text-danger">红色</p>
<p class="text-warning">橙色</p>
<p class="text-info">浅蓝色</p>
<p class="text-dark">黑色</p>
<p class="text-muted">灰色</p>

```

背景颜色

```html
<div class="bg-primary text-white">蓝底白字</div>
<div class="bg-success text-white">绿底白字</div>
<div class="bg-danger text-white">红底白字</div>
```

| 类名       | 功能           |
| ---------- | -------------- |
| bg-primary | success        |
| text-white | text-dark      |
| border     | border-0       |
| rounded    | rounded-circle |

## 间距类

语法：`m|p {方向}-{大小}`

- `m` = margin（外边距），`p` = padding（内边距）
- 方向：`t` 上，`b` 下，`s` 左，`e` 右，`x` 左右，`y` 上下
- 大小：0 ~ 5，auto

```html
<div class="mt-3 mb-2">上外边距3，下外边距2</div>
<div class="px-4 py-2">左右内边距4，上下内边距2</div>
<div class="mx-auto" style="width:200px;">水平居中</div>
```

```html
<!-- 全部外边距 3 -->
<div class="m-3 p-2 bg-light">外边距3</div>

<!-- 全部内边距 2 -->
<div class="p-2 bg-light">内边距2</div>

<!-- 上外边距 3 -->
<div class="mt-3 p-2 bg-light">上外边距3</div>

<!-- 下外边距 2 -->
<div class="mb-2 p-2 bg-light">下外边距2</div>

<!-- 水平居中 -->
<div class="mx-auto p-2 bg-primary text-white" style="width:100px;">居中</div>

<!-- 上下内边距 2 -->
<div class="py-2 bg-success text-white">上下内边距2</div>

<!-- 左右内边距 3 -->
<div class="px-3 bg-danger text-white">左右内边距3</div>

```



## 布局类

**Flex 布局**

```html
<div class="d-flex justify-content-between align-items-center">
    <div>左</div>
    <div>右</div>
</div>
```

- `d-flex` → 启用 flex
- `flex-column` → 垂直方向
- `justify-content-start|center|end|between|around` → 主轴对齐方式
- `align-items-start|center|end` → 交叉轴对齐方式

**栅格系统**

```html
<div class="row">
  <div class="col-4">宽度 4</div>
  <div class="col-8">宽度 8</div>
</div>
```

```html
<!-- 固定宽度容器 -->
<div class="container bg-light p-3">固定宽度容器</div>

<!-- 全宽容器 -->
<div class="container-fluid bg-light p-3">全宽容器</div>

<!-- 栅格行 + 列 -->
<div class="row">
  <div class="col bg-primary text-white">列1</div>
  <div class="col bg-success text-white">列2</div>
</div>

<!-- 指定列宽 -->
<div class="row">
  <div class="col-6 bg-primary text-white">50%</div>
  <div class="col-6 bg-success text-white">50%</div>
</div>

<!-- Flex 布局 -->
<div class="d-flex">
  <div class="p-2 bg-primary text-white">左</div>
  <div class="p-2 bg-success text-white">右</div>
</div>

<!-- Flex 垂直排列 -->
<div class="d-flex flex-column">
  <div class="p-2 bg-primary text-white">上</div>
  <div class="p-2 bg-success text-white">下</div>
</div>

<!-- 主轴两端对齐 -->
<div class="d-flex justify-content-between">
  <div>左</div>
  <div>右</div>
</div>

<!-- 交叉轴居中 -->
<div class="d-flex align-items-center" style="height:50px;">
  <div>居中</div>
</div>

```

`gap` 是 **Bootstrap 5** 新增的类，用于 **设置 Flex 或 Grid 容器子元素之间的间距**

```html
gap-{size}      // 同时设置行间距和列间距
gap-x-{size}    // 设置水平方向间距
gap-y-{size}    // 设置垂直方向间距

<div class="d-flex gap-2">
  <div class="p-2 bg-primary text-white">子元素1</div>
  <div class="p-2 bg-success text-white">子元素2</div>
  <div class="p-2 bg-danger text-white">子元素3</div>
</div>
```

使用CSS样式，竖着排列

```html
<i style="writing-mode: vertical-rl;">添加</i>
```



## 文本类

```html
<p class="fw-bold">加粗</p>
<p class="fw-light">细字</p>
<p class="fst-italic">斜体</p>
<p class="text-center">居中</p>
<p class="text-end">右对齐</p>
<p class="text-uppercase">大写</p>
<p class="fs-1">字体大小1</p>
<p class="fs-6">字体大小6（最小）</p>

```

```html
<!-- 文本居中 -->
<p class="text-center">居中文本</p>

<!-- 文本右对齐 -->
<p class="text-end">右对齐文本</p>

<!-- 大写 -->
<p class="text-uppercase">大写文本</p>

<!-- 加粗 -->
<p class="fw-bold">加粗文本</p>

<!-- 斜体 -->
<p class="fst-italic">斜体文本</p>

<!-- 字号最大 -->
<p class="fs-1">最大字体</p>

<!-- 字号最小 -->
<p class="fs-6">最小字体</p>

```



## 按钮类

```html
<button class="btn btn-primary">主要按钮</button>
<button class="btn btn-outline-success btn-sm">小号边框按钮</button>
<button class="btn btn-danger btn-lg">大红按钮</button>

```

```html
<!-- 基本按钮 -->
<button class="btn btn-primary">按钮</button>

<!-- 描边按钮 -->
<button class="btn btn-outline-success">描边</button>

<!-- 小号按钮 -->
<button class="btn btn-primary btn-sm">小按钮</button>

<!-- 大号按钮 -->
<button class="btn btn-primary btn-lg">大按钮</button>

<!-- 禁用状态 -->
<button class="btn btn-primary disabled">禁用</button>

<!-- 块级按钮（纵向排列） -->
<button class="btn btn-primary d-block mb-2">纵向排列</button>

```



## 背景边框

```html
<!-- 蓝色背景 -->
<div class="bg-primary text-white p-2">蓝色背景</div>

<!-- 绿色背景 -->
<div class="bg-success text-white p-2">绿色背景</div>

<!-- 白色文字 -->
<p class="text-white bg-dark p-2">白色文字</p>

<!-- 边框 -->
<div class="border p-2">边框</div>

<!-- 圆角边框 -->
<div class="border rounded p-2">圆角边框</div>

<!-- 圆形 -->
<img src="https://via.placeholder.com/50" class="rounded-circle" alt="圆形头像">

```



## 表格类

```html
<table class="table table-striped table-hover table-bordered">
  <thead class="table-dark">
    <tr><th>编号</th><th>名称</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>苹果</td></tr>
  </tbody>
</table>

```

- `table-striped` → 斑马线
- `table-hover` → 悬停变色
- `table-bordered` → 边框

```html
<!-- 基本表格 -->
<table class="table">
  <tr><td>数据</td></tr>
</table>

<!-- 斑马线 -->
<table class="table table-striped">
  <tr><td>数据1</td></tr>
  <tr><td>数据2</td></tr>
</table>

<!-- 悬停变色 -->
<table class="table table-hover">
  <tr><td>悬停</td></tr>
</table>

<!-- 有边框 -->
<table class="table table-bordered">
  <tr><td>边框</td></tr>
</table>

<!-- 紧凑表格 -->
<table class="table table-sm">
  <tr><td>紧凑</td></tr>
</table>

<!-- 响应式表格 -->
<div class="table-responsive">
  <table class="table">
    <tr><td>滚动表格</td></tr>
  </table>
</div>

```



## 表单类

```html
<!-- 输入框 -->
<input type="text" class="form-control" placeholder="输入内容">

<!-- 下拉框 -->
<select class="form-select">
  <option>选项1</option>
  <option>选项2</option>
</select>

<!-- 复选框 -->
<div class="form-check">
  <input class="form-check-input" type="checkbox" id="check1">
  <label class="form-check-label" for="check1">勾选</label>
</div>

<!-- 校验成功 -->
<input class="form-control is-valid" placeholder="校验成功">

<!-- 校验失败 -->
<input class="form-control is-invalid" placeholder="校验失败">

```



## 卡片类

```html
<div class="card shadow-sm" style="width:18rem;">
  <div class="card-header">标题</div>
  <div class="card-body">
    <p class="card-text">内容</p>
    <a href="#" class="btn btn-primary">按钮</a>
  </div>
</div>
```

## 图片类

| 类名             | 功能                 |
| ---------------- | -------------------- |
| `img-fluid`      | 自适应宽度，高度自动 |
| `rounded`        | 圆角图片             |
| `rounded-circle` | 圆形头像             |
| `img-thumbnail`  | 缩略图边框样式       |

```html
<!-- 自适应宽度 -->
<img src="https://via.placeholder.com/150" class="img-fluid" alt="自适应图片">

<!-- 圆角 -->
<img src="https://via.placeholder.com/150" class="rounded" alt="圆角图片">

<!-- 圆形头像 -->
<img src="https://via.placeholder.com/50" class="rounded-circle" alt="圆形头像">

<!-- 缩略图 -->
<img src="https://via.placeholder.com/150" class="img-thumbnail" alt="缩略图">

```

## 阴影可视化

```html
<!-- 普通阴影 -->
<div class="shadow p-2">阴影</div>

<!-- 小阴影 -->
<div class="shadow-sm p-2">小阴影</div>

<!-- 大阴影 -->
<div class="shadow-lg p-2">大阴影</div>

<!-- 半透明 -->
<div class="bg-primary text-white opacity-50 p-2">半透明</div>

```

## 显示 / 隐藏类

```html
<!-- 隐藏 -->
<div class="d-none">隐藏内容</div>

<!-- 块级显示 -->
<div class="d-block p-2 bg-primary text-white">块级显示</div>

<!-- 内联显示 -->
<span class="d-inline bg-success text-white">内联显示</span>

<!-- 内联块显示 -->
<span class="d-inline-block bg-danger text-white p-1">内联块显示</span>

```



## 其他常用类

- `rounded` → 圆角
- `rounded-circle` → 圆形
- `shadow-sm|shadow|shadow-lg` → 阴影
- `w-25|w-50|w-75|w-100` → 宽度百分比
- `h-25|h-50|h-100` → 高度百分比

## 案例

### flex-column

多个按钮竖排

```java
<div class="d-flex flex-column gap-2" style="width: 100px;">
    <a th:href="@{/newFruit}" class="btn btn-outline-success btn-sm">
        <i>添加</i>
    </a>
    <a th:href="@{/editFruit}" class="btn btn-outline-primary btn-sm">
        <i>编辑</i>
    </a>
    <a th:href="@{/delFruit}" class="btn btn-outline-danger btn-sm">
        <i>删除</i>
    </a>
</div>

```

### display:block

如果只有一个按钮，不用 flex，只要让它自己占一行

```html
<a th:href="@{/newFruit}" class="btn btn-outline-success btn-sm d-block mb-2">
    <i>添加</i>
</a>

```

