# BootStrap

**bootstrap 3 文档地址：** https://v3.bootcss.com/

## JQuery

jQuery是JS的函数库。把一些常用的函数进行封装。

## 全局样式

### 栅格系统

栅格系统靠的是浮动。

```js
1. 将父元素分为 12 份，水平排列的元素可以指定占多少份
2. 可以自动换行
```

```html
<div class="row">
	<div class="com-md-8"></div>
	<div class="com-md-4"></div>
</div>
```

### 响应式栅格系统

按照移动优先的方式。超小屏幕没有设置就按照100%，最大屏幕没有设置的话，按照之前设置的。

|                     | 超小屏幕    | 小屏幕                      | 中等屏幕                    | 大屏幕                        |
| ------------------- | ----------- | --------------------------- | --------------------------- | ----------------------------- |
| 视口大小            | < 768px     | 768px ~ 992px               | 992px ~ 1200px              | >= 1200px                     |
| 媒体查询语法        | 默认        | `@media (min-width: 768px)` | `@media (min-width: 992px)` | `@meida )(min-width: 1200px)` |
| `.container` 的宽度 | 100%        | 750px                       | 970px                       | 1170px;                       |
| 列的类名            | `.col-xs-*` | `.col-sm-*`                 | `.col-md-*`                 | `.col-lg-*`                   |

```js
<div class="row">
    <div class="col-xs-6 col-sm-4 col-md-3 col-lg-2">珍面，胆偶非月王便，张楚以。</div>
</div>
```

**列偏移：**

```js
col-xs/sm/md/lg-offset-数字    向右偏移（相当于外边距偏移）
col-xs/sm/md/lg-push-数字	     向右偏移（相当于相对定位偏移）
col-xs/sm/md/lg-pull-数字		 向左偏移
也可以自己设置外边距，
```

### 表格

加类名

```js
在表格元素中设置类名
.table
.table-striped
.table-bordered
.table-hover
.table-condensed

```

加类名的值

```js
类名的值
.active		鼠标悬停在行或单元格上时所设置的颜色	灰色
.success	标识成功或积极的动作 绿色
.info		标识普通的提示信息或动作 蓝色
.warning	标识警告或需要用户注意	黄色
.danger		标识危险或潜在的带来负面影响的动作 红色
```

### 表单

#### ① 基本样式

```js
.form-group
.form-control
```

#### ② 水平排列的表单

```js
form.form-horizontal
里面的 .form-group 相当于 .row 内部可以分列
```

### 按钮

```js
.btn.btn-default
.btn.btn-primay
.btn.btn-info
.btn.btn-success
.btn.btn-warning
.btn.btn-danger
.btn.btn-link

.btn-lg
.btn-sm

.btn-block
```

### 辅助类

#### ① 文字颜色

```html
<p class="text-muted">...</p>
<p class="text-primary">...</p>
<p class="text-success">...</p>
<p class="text-info">...</p>
<p class="text-warning">...</p>
<p class="text-danger">...</p>
```

#### ② 背景颜色

```html
<p class="bg-primary">...</p>
<p class="bg-success">...</p>
<p class="bg-info">...</p>
<p class="bg-warning">...</p>
<p class="bg-danger">...</p>
```

### 响应式工具类

```js
.visible-xs/sm/md/lg-block/inline/inline-block
.hidden-xs/sm/md/lg
```

## 组件

```js
推荐使用自定义类名，在原有类名的前边加一个自定义前缀，可以根据项目的名称。
```

```js
1. 导航条
2. 下拉菜单
3. 输入框组
4. 字体图标
5. 巨幕
6. 路径导航
7. 缩略图
8. 分页
```

## JavaScript 插件

```js
1. 下拉菜单
2. collapse
3. 模态框 modal.js
4. 轮播图 carousel.js
```

```js
role 和aria的类名是为了无障碍阅读，屏幕阅读器使用。
```

使用自定义JS

```html
<div class="row">
    <div class="col-md-6">
        <button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="left" title="Tooltip on left">Tooltip on left</button>

        <button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" title="Tooltip on top">Tooltip on top</button>

        <button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">Tooltip on bottom</button>

        <button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="right" title="Tooltip on right">Tooltip on right</button>
    </div>
</div>
<!-- jquery -->
    <script src="./dist/jquery/jquery-1.12.3.min.js"></script>
    <!-- bootstrap -->
    <script src="./dist/js/bootstrap.min.js"></script>
	<!-- 自定义JS -->
```

```js

(function(){
    var btn02 = document.querySelector('#profile_btn');
    btn02.onclick = function() {
        //$相当于document.queryselector()，是jQuery的封装,返回元素的对象。
        //jQuery的$得到的对象的类型与queryselector()得到的对象虽然都是html中的同一个元素
        //但是对象类型不一致，且$方法得到的对象才可以使用tab方法
        $('a[href="#profile"]').tab('show');
    };
    $('[data-toggle="tooltip"]').tooltip()
})()
```

> $相当于document.queryselector()，是jQuery的封装,返回元素的对象。
>
> jQuery的$得到的对象的类型与queryselector()得到的对象虽然都是html中的同一个元素。
>
> 但是对象类型不一致，且$方法得到的对象才可以使用tab方法。
>
> jQuery自己封装了一种数据类型。

## BootStrap 定制和主题

定制 BootStrap： https://v3.bootcss.com/customize/

BootStrap 主题分享网站： https://bootswatch.com/3/

## 自定义栅格系统

### 创建栅格样式

**栅格样式 --grid.css**

```js
.row {
    display: flex;
    flex-wrap: wrap;
}

[class*="col-"] {
    flex: 0 0 auto;
    box-sizing: border-box;
    padding: 0 10px;
}

.col-1 {
    width: 8.33%;
}

.col-2 {
    width: 16.66%;
}

.col-3 {
    width: 25%;
}

.col-4 {
    width: 33.33%;
}

.col-5 {
    width: 41.66%;
}

.col-6 {
    width: 50%;
}

.col-7 {
    width: 58.33%;
}

.col-8 {
    width: 66.66%;
}

.col-9 {
    width: 75%;
}

.col-10 {
    width: 83.33%;
}

.col-11 {
    width: 91.66%;
}

.col-12 {
    width: 100%;
}
```

## 自定义响应式栅格系统

### 创建自定义响应式栅格



自定义响应式栅格入口 --aquastrap.less

```less
//导入变量
@import "variables";
//导入混合
@import "mixins";
//导入重置样式表
@import "normalize";
//导入整体布局样式
@import "layout";
//导入栅格系统
@import "grid";
```

1、自定义变量 --variables.less

```js
// 定义阈值
@sm-width: 768px;
@md-width: 992px;
@lg-width: 1200px;
// 定义版心宽度
@container-xs: 100%;
@container-sm: 750px;
@container-md: 970px;
@container-lg: 1170px;
// 栅格系统的列数
@columns: 16;
```

2、清除(替换)原有样式表 --normalize.less

```less
// stylelint-disable

/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */

//
// 1. Set default font family to sans-serif.
// 2. Prevent iOS and IE text size adjust after device orientation change,
//    without disabling user zoom.
//

html {
    font-family: sans-serif; // 1
    -ms-text-size-adjust: 100%; // 2
    -webkit-text-size-adjust: 100%; // 2
}

//
// Remove default margin.
//

body {
    margin: 0;
}

// HTML5 display definitions
// ==========================================================================

//
// Correct `block` display not defined for any HTML5 element in IE 8/9.
// Correct `block` display not defined for `details` or `summary` in IE 10/11
// and Firefox.
// Correct `block` display not defined for `main` in IE 11.
//

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
menu,
nav,
section,
summary {
    display: block;
}

//
// 1. Correct `inline-block` display not defined in IE 8/9.
// 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.
//

audio,
canvas,
progress,
video {
    display: inline-block; // 1
    vertical-align: baseline; // 2
}

//
// Prevent modern browsers from displaying `audio` without controls.
// Remove excess height in iOS 5 devices.
//

audio:not([controls]) {
    display: none;
    height: 0;
}

//
// Address `[hidden]` styling not present in IE 8/9/10.
// Hide the `template` element in IE 8/9/10/11, Safari, and Firefox < 22.
//

[hidden],
template {
    display: none;
}

// Links
// ==========================================================================

//
// Remove the gray background color from active links in IE 10.
//

a {
    background-color: transparent;
}

//
// Improve readability of focused elements when they are also in an
// active/hover state.
//

a:active,
a:hover {
    outline: 0;
}

// Text-level semantics
// ==========================================================================

//
// 1. Remove the bottom border in Chrome 57- and Firefox 39-.
// 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
//

abbr[title] {
    border-bottom: none; // 1
    text-decoration: underline; // 2
    text-decoration: underline dotted; // 2
}

//
// Address style set to `bolder` in Firefox 4+, Safari, and Chrome.
//

b,
strong {
    font-weight: bold;
}

//
// Address styling not present in Safari and Chrome.
//

dfn {
    font-style: italic;
}

//
// Address variable `h1` font-size and margin within `section` and `article`
// contexts in Firefox 4+, Safari, and Chrome.
//

h1 {
    font-size: 2em;
    margin: 0.67em 0;
}

//
// Address styling not present in IE 8/9.
//

mark {
    background: #ff0;
    color: #000;
}

//
// Address inconsistent and variable font size in all browsers.
//

small {
    font-size: 80%;
}

//
// Prevent `sub` and `sup` affecting `line-height` in all browsers.
//

sub,
sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
}

sup {
    top: -0.5em;
}

sub {
    bottom: -0.25em;
}

// Embedded content
// ==========================================================================

//
// Remove border when inside `a` element in IE 8/9/10.
//

img {
    border: 0;
}

//
// Correct overflow not hidden in IE 9/10/11.
//

svg:not(:root) {
    overflow: hidden;
}

// Grouping content
// ==========================================================================

//
// Address margin not present in IE 8/9 and Safari.
//

figure {
    margin: 1em 40px;
}

//
// Address differences between Firefox and other browsers.
//

hr {
    box-sizing: content-box;
    height: 0;
}

//
// Contain overflow in all browsers.
//

pre {
    overflow: auto;
}

//
// Address odd `em`-unit font size rendering in all browsers.
//

code,
kbd,
pre,
samp {
    font-family: monospace, monospace;
    font-size: 1em;
}

// Forms
// ==========================================================================

//
// Known limitation: by default, Chrome and Safari on OS X allow very limited
// styling of `select`, unless a `border` property is set.
//

//
// 1. Correct color not being inherited.
//    Known issue: affects color of disabled elements.
// 2. Correct font properties not being inherited.
// 3. Address margins set differently in Firefox 4+, Safari, and Chrome.
//

button,
input,
optgroup,
select,
textarea {
    color: inherit; // 1
    font: inherit; // 2
    margin: 0; // 3
}

//
// Address `overflow` set to `hidden` in IE 8/9/10/11.
//

button {
    overflow: visible;
}

//
// Address inconsistent `text-transform` inheritance for `button` and `select`.
// All other form control elements do not inherit `text-transform` values.
// Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.
// Correct `select` style inheritance in Firefox.
//

button,
select {
    text-transform: none;
}

//
// 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`
//    and `video` controls.
// 2. Correct inability to style clickable `input` types in iOS.
// 3. Improve usability and consistency of cursor style between image-type
//    `input` and others.
//

button,
html input[type="button"],
// 1
input[type="reset"],
input[type="submit"] {
    -webkit-appearance: button; // 2
    cursor: pointer; // 3
}

//
// Re-set default cursor for disabled elements.
//

button[disabled],
html input[disabled] {
    cursor: default;
}

//
// Remove inner padding and border in Firefox 4+.
//

button::-moz-focus-inner,
input::-moz-focus-inner {
    border: 0;
    padding: 0;
}

//
// Address Firefox 4+ setting `line-height` on `input` using `!important` in
// the UA stylesheet.
//

input {
    line-height: normal;
}

//
// It's recommended that you don't attempt to style these elements.
// Firefox's implementation doesn't respect box-sizing, padding, or width.
//
// 1. Address box sizing set to `content-box` in IE 8/9/10.
// 2. Remove excess padding in IE 8/9/10.
//

input[type="checkbox"],
input[type="radio"] {
    box-sizing: border-box; // 1
    padding: 0; // 2
}

//
// Fix the cursor style for Chrome's increment/decrement buttons. For certain
// `font-size` values of the `input`, it causes the cursor style of the
// decrement button to change from `default` to `text`.
//

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
    height: auto;
}

//
// 1. Address `appearance` set to `searchfield` in Safari and Chrome.
// 2. Address `box-sizing` set to `border-box` in Safari and Chrome.
//

input[type="search"] {
    -webkit-appearance: textfield; // 1
    box-sizing: content-box; //2
}

//
// Remove inner padding and search cancel button in Safari and Chrome on OS X.
// Safari (but not Chrome) clips the cancel button when the search input has
// padding (and `textfield` appearance).
//

input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
}

//
// Define consistent border, margin, and padding.
//

fieldset {
    border: 1px solid #c0c0c0;
    margin: 0 2px;
    padding: 0.35em 0.625em 0.75em;
}

//
// 1. Correct `color` not being inherited in IE 8/9/10/11.
// 2. Remove padding so people aren't caught out if they zero out fieldsets.
//

legend {
    border: 0; // 1
    padding: 0; // 2
}

//
// Remove default vertical scrollbar in IE 8/9/10/11.
//

textarea {
    overflow: auto;
}

//
// Don't inherit the `font-weight` (applied by a rule above).
// NOTE: the default cannot safely be changed in Chrome and Safari on OS X.
//

optgroup {
    font-weight: bold;
}

// Tables
// ==========================================================================

//
// Remove most spacing between table cells.
//

table {
    border-collapse: collapse;
    border-spacing: 0;
}

td,
th {
    padding: 0;
}
```

3、整体布局 --layout.less

```less
* {
    box-sizing: border-box;
}

.container {
    width: @container-xs;

    @media (min-width:@sm-width) {
        margin-left: auto;
        margin-right: auto;
        width: @container-sm;
    }

    @media (min-width:@md-width) {
        margin-left: auto;
        margin-right: auto;
        width: @container-md;
    }

    @media (min-width:@lg-width) {
        margin-left: auto;
        margin-right: auto;
        width: @container-lg;
    }
}
```

4、CSS混合 --mixins.less

```less
// 生成栅格系统
.grid(@type: xs) {
    .make-col(1);

    .make-col(@num) when (@num <=@columns) {
        .col-@{type}-@{num} {
            width: percentage((@num/@columns))
        }

        .make-col(@num+1);
    }
}
```

5、动态响应 --grid.less

```less
.row {
    display: flex;
    flex-wrap: wrap;
}

[class*="col-"] {
    flex: 0 0 auto;
    padding: 10px;
}

// 默认最小尺寸 移动优先显示 应用到全部
.grid(xs);

// 当尺寸大于小尺寸屏幕显示
@media (min-width: @sm-width) {
    .grid(sm);
}

// 当尺寸大于中尺寸屏幕显示
@media (min-width: @md-width) {
    .grid(md);
}

// 当尺寸大于大尺寸屏幕显示
@media (min-width: @lg-width) {
    .grid(lg);
}
```



### 使用响应式栅格系统

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    //引入自定义栅格
    <link rel="stylesheet" href="./aquastrap/aquastrap.css">
</head>
<body>
    <div class="container">
        <h3>Hanser</h3>
        // 需要在父元素设置 row类
        <div class="row">
            // 子元素添加 col-[type]-[数字] 类
            <p class="col-sm-6 col-md-4">锐到有皇，主高论。</p>
            <p class="col-sm-6 col-md-4">锐妙投今圣到有和皇，主高论。</p>
            <p class="col-sm-6 col-md-4">锐心今圣到有和皇，主高论。</p>
            <p class="col-sm-6 col-md-4">锐心到有和皇，主高论。</p>
        </div>
    </div>
</body>
</html>
```

