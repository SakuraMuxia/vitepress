# CSS 书写规范

## 1CSS 书写的几点建议

- 去掉小数点前面的 0，`0.5em` → `.5em` 。
- 颜色用小写，用缩写，如：`#fff` 。
- 不要随意使用 ID，ID 是唯一的，不能多次使用，而使用 class 类选择器却可以重复使用，另外 ID 的优先级高于 class，所以 ID 应该按需使用，而不能滥用。
- 0 不用加单位。
- 尽量缩写，`margin: 5px 10px 5px 10px;` → `margin: 5px 10px;` 。

## 2 CSS 属性书写顺序

相关的属性声明应当归为一组，并按照下面的顺序排列：

- Positioning 定位相关属性
- Box model 盒子模型相关属性
- Typography 文字字体相关属性
- Visual 视觉效果相关属性（背景等）

由于定位（Positioning）可以从正常的文档流中移除元素，并且还能覆盖盒模型（Box model）相关的样式，因此排在首位。盒模型排在第二位，因为它决定了组件的尺寸和位置。

其他属性只是影响组件的内部（inside）或者是不影响前两组属性，因此排在后面。

```css
.declaration-order {
    /* Positioning */
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;


    /* Box-model */
    display: block;
    float: right;
    width: 100px;
    height: 100px;


    /* Typography */
    font: normal 13px "Helvetica Neue", sans-serif;
    line-height: 1.5;
    color: #333;
    text-align: center;

    /* Visual */
    background-color: #f5f5f5;
    border: 1px solid #e5e5e5;
    border-radius: 3px;

    /* Misc */
    opacity: 1;
}
```

## 3 Class 命名规则

- 推荐使用小写字母。
- class 名称应当尽可能短，并且意义明确，使用有意义的词语作为名称。
- 避免过度任意的简写，`.btn` 代表 *button*，但是 `.s` 不能表达任何意思。
- 允许多个单词组成类名，推荐 kebab-case 命名方式（短横线分隔符），如 `btn-danger`、`col-md-hidden`。
- 基于最近的父元素或基本 class 作为新 class 的前缀，如`news-title`

```css
/* Bad example */
.t { ... }
.abc { ... }
.aaa { ... }

/* Good example */
.tweet { ... }
.important { ... }
.tweet-header { ... }
```

## 4 常见的命名

### 4.1 常见命名 1

| **名称**          | **用途**     |
| :---------------- | :----------- |
| .wrap 或 .wrapper | 用于外侧包裹 |
| .container 或 .ct | 包裹容器     |
| .header           | 用于头部     |
| .body             | 页面 body    |
| .footer           | 页面尾部     |
| .aside、.sidebar  | 用于侧边栏   |
| .content          | 用于主要内容 |
| .navigation       | 导航元素     |
| .pagination       | 分页         |

### 4.2 常见命名 2

| **名称**     | **用途**           |
| :----------- | :----------------- |
| .tabs        | tab 切换、选项卡   |
| .breadcrumbs | 导航列表、面包屑   |
| .dropdown    | 下拉菜单           |
| .article     | 文章               |
| .main        | 用于主体           |
| .thumbnail   | 头像、小图像       |
| .media       | 媒体资源           |
| .panel       | 面板               |
| .tooltip     | 鼠标放置上去的提示 |
| .popup       | 鼠标点击弹出的提示 |

### 4.3 常见命名 3

| **名称**              | **用途** |
| :-------------------- | :------- |
| .button、.btn         | 按钮     |
| .ad                   | 广告     |
| .subnav               | 二级导航 |
| .menu                 | 菜单     |
| .tag                  | 标签     |
| .message 或者 .notice | 提示消息 |
| .summary              | 摘要     |
| .logo                 | logo     |
| .search               | 搜索框   |
| .login                | 登录     |

### 4.4 常见命名 4

| **名称**            | **用途** |
| :------------------ | :------- |
| .register           | 注册     |
| .username           | 用户名   |
| .password           | 密码     |
| .banner             | 广告条   |
| .copyright          | 版权     |
| .modal 或者 .dialog | 弹窗     |

## 5 ID 命名规则

- ID 名称应当尽可能短，并且意义明确，使用有意义的词语作为名称。
- ID 名称可以由多个单词组成，推荐 camelCase （小驼峰）命名法，如 `#pageHeader`。
- ID 不随意使用，一般页面中明确唯一的地方可以使用 ID 选择器，比如页头、页脚等。