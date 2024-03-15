# 页面布局

## 页面的组成部分

![image-20240311101934590](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240311101934590.png)

![image-20240311101957648](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240311101957648.png)

## 重置样式表

很多元素是具有默认样式的，比如 p 元素有默认的上外边距和下外边距，h1~h6 标题元素也有默认的上外边距和下外边距且字体加粗，body 元素有默认的外边距，超链接有默认的字体颜色和下划线，ul 元素有默认的左内边距 等等。

在不同的浏览器下，元素的默认样式有时候有些差异，这样元素的默认样式就未我们的开发带来了一些问题。

所以，在开发页面之前，我们会选择重置元素的默认样式，这里介绍三种重置方案。

### 全局选择器重置样式

```js
* {
    margin: 0;
    padding: 0;
}
```

### Reset.css

```js
选择到具有默认样式的元素，清空其默认的样式。

body,h1,h2,h3,h4,h5,h6,hr,p,
blockquote,dl,dt,dd,ul,ol,li,
pre,form,fieldset,legend,button,
input,textarea,th,td{
    margin: 0;
    padding: 0;
}

ul,ol {
    list-style: none;
}

img {
    display: block;
    border:0;
}

b,strong {
    font-weight: 400;
}

h1,h2,h3,h4,h5,h6 {
    font-size: 100%;
    font-weight: 400;
}

i,em {
    font-style: normal;
}

u,ins,s,del {
    text-decoration: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

input,button,select,textarea {
    outline: none;
}

```

各网站都会定义自己的重置样式表，请参考 http://www.unclealan.cn/index.php/front/174.html

```sh
1. reset.css  将元素自带的样式重置掉
2. normalize.css 重新设置了元素自带的样式，保持各浏览器统一，需要设计稿也使用normalize标准
```

### Normalize.css

```js
Normalize.css是一种CSS reset的替代方案。它在默认的HTML元素样式上提供了跨浏览器的高度一致性。相比于传统的CSS reset，Normalize.css是一种现代的、为HTML5准备的优质替代方案。

官网地址：http://necolas.github.io/normalize.css/

GitHub: https://github.com/necolas/normalize.css/

相对于 Reset.css， Normalize.css 有如下特点：

保护有价值的浏览器默认样式而不是完全去掉它们。
新增对 HTML5 元素的设置。
修复浏览器 BUG 并保证各浏览器的一致性，修复的 BUG 有预格式化文字的 font-size 问题、在 IE9 中 SVG 的溢出、许多出现在各浏览器和操作系统中的与表单相关的 BUF 等。
Normalize.css 对并集选择器的使用比较谨慎，有效避免调试工具杂乱。
```



## 版心 container

在 PC 端网页中,一般都会有一个固定宽度且水平居中的盒子,来显示网页的主要内容,称为网页的**版心**。版心常见的宽度有 1200px、1000px、960px 等。

![image-20240311102213925](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240311102213925.png)

```sh
1. 固定宽度
2. 水平居中
```

## 编码规范

https://learn.fuming.site/front-end/html5css3/CSS/CSS%E4%B9%A6%E5%86%99%E8%A7%84%E8%8C%83.html





## 网站标题图标

### ① favicon 图标的使用

**使用方法一：**把 ico 图标文件命名为 `favicon.ico` ,放在网站根目录下，网页会自动获取 ico 图标。

**使用方法二：**在网页中使用 link 标签自行引入 ico 文件。

```html
<link rel="shortcut icon" type="images/x-icon" href="favicon.ico">
```

### ② favicon 图标的制作

- 在线工具 http://www.ico51.cn/
- 在线工具 http://www.bitbug.net/

### 图片的使用原则

```css
如果图片的主要用作内容，则选择img
如果图片只用作修饰，则选择背景图
```

### 块级元素的背景图，线视图遮挡后不显示

```css
通过设置min-weith可以避免
```

块级元素的宽度不会大于父元素的大小，就算加上边框也会在父元素的里边

## 精灵图

### 什么是精灵图

CSS Sprites 也称之为精灵图或雪碧图，是一种**背景图片**的应用处理方式，将很多小图片合并到到一张大图中去。把整个大图作为背景图，然后通过 `background-position` 属性讲合适的图片显示到元素上。

精灵图最大的作用是**减少网络的请求次数**，因为图片只要下载一次就好，不用再分别去下载那些小图。



把小的图片合并到一张大的图片上

多个元素使用相同的图片作为**背景图像**，但是设置不同的图像位置，实现各自元素显示的图案不同



### background-postion

实现精灵图主要是靠 设置 `background-postion` 来对背景图片进行定位，从而在元素上显示合适的图片，`background-position` 属性可能的值有：

| 值                                                           | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| left top left center left bottom center top center center center bottom right top right center right bottom | 如果您仅规定了一个关键词，那么第二个值将是"center"。 默认值：0% 0%。 |
| x% y%                                                        | 第一个值是水平位置，第二个值是垂直位置。 左上角是 0% 0%,右下角是 100% 100%。 如果您仅规定了一个值，另一个值将是 50%。 |
| xpos ypos                                                    | 第一个值是水平位置，第二个值是垂直位置。 单位是像素 (0px 0px) 或任何其他的 CSS 单位，可以为负值 z如果您仅规定了一个值，另一个值将是50%。 您可以混合使用 % 和 position 值。 |

**关于百分比：**

百分比值的偏移指定图片的相对位置和容器的相对位置重合。值0%代表图片的左边界（或上边界）和容器的左边界（上边界）重合。值100%代表图片的右边界（或下边界）和容器的右边界（或下边界）重合。值50%则代表图片的中点和容器的中点重合。

当指定百分比值的时候，实际上执行了以下的计算公式（该公式可以用数学方式定义图片和容器相对位置重合）：

```sh
(元素宽度 - 图片宽度) * 百分比 = 水平方向偏移位置
(元素宽度 - 图片宽度) * 百分比 = 垂直方向偏移位置
```

使用 X 坐标来举个例子，假设有一个 300px 宽的图片，将这个图片使用到一个 100px 宽的元素中，

```
100px - 300px = -200px (元素和图片的宽度差)
```

当对 `background-position` 设置值依次为 -25%，0%，50%，100%，125%，得到图片相对容器的偏移值为：

```js
-200px * -25% = 50px
-200px * 0% = 0px
-200px * 50% = -100px
-200px * 100% = -200px
-200px * 125% = -250px
```

### 精灵图的优点

减少图片的请求次数，提高网页加载速度。

### 制作精灵图在线工具

https://alloyteam.github.io/gopng/

```css
使用 style="background-position: ;"定位到精灵图的位置 中间没有逗号
```

