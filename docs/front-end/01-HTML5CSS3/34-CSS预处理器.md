# CSS预处理器

```css
同一类物质，趋同化发展
```

css 预处理器定义了一种新的语言, 其基本思想是, 用一种专门的编程语言, 为 css 增加一些特性, 将 css 作为目标生成文件。

通俗的讲，用CSS预处理器的语法写，最后在编译成CSS； 因为任何浏览器都无法解析CSS预处理器的语法。

## 为什么要用CSS预处理器

**CSS本身具有如下问题：**

- 语法不够强大，比如无法嵌套书写导致模块化开发中需要书写很多重复的选择器；
- 没有变量和合理的样式复用机制，使得逻辑上相关的属性值必须以**字面量**的形式重复输出，导致难以维护。

**这就决定了CSS预处理器要解决的问题：**

- 提供 CSS 缺失的*样式层*复用机制、减少冗余代码，提高样式代码的可维护性。

## 主流的 CSS 预处理器

- Less
- Sass
- Stylus

#  Less 的使用

Less 是一种动态样式语言，属于 CSS 预处理器的范畴，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展

因为 Less 和 CSS 非常像，学习很容易。而且 Less 仅对 CSS 语言增加了少许方便的扩展，这就是 Less 如此易学的原因之一。

Less (Less编辑器 ) 是开源的，其第一个版本由 Ruby 写成，但在后续的版本当中，Ruby 逐渐被替换为 JavaScript。受益于JavaScript，LESS可以在客户端上运行（IE6+、Webkit、Firefox），也可以在服务端运行（Node.js 、Rhino）。

Less中可以直接写CSS

## 编译 less

```html
<style type="text/less">
        @fcolor: #900;
        @bcolor: #099;
        @len: 1000px;

        #box {
            width: @len;
            height: (@len/4);
            color: @fcolor;
            background: @bcolor;
            padding: 20px;
        }
</style>
<script src="./less.js"></script>
```

less.js

```html
<!doctype html>
<html lang="cn-ZH">
    <head>
        <meta charset="utf-8"></meta>
        <title>LESS</title>
        <!-- 直接在 style 标签内写 less 代码-->
        <style style="text/less">
            ...
        </style>

        <!--也可以单独引入 less 文件-->
        <link rel="stylesheet/less" type="text/css" href="styles.less">

        <!--less.js 可以将上面的 less 编译为 css-->
        <script src="https://cdn.bootcss.com/less.js/3.9.0/less.js"></script>
    </head>
    <body></body>
</html>
```

### vscode 插件自动编译 less

```
1. vscode 安装扩展 "Easy Less"
2. 创建扩展名是 .less 的文件，在文件中写 less 代码； Easy Less 会自动编译成同名的CSS； 每次保存都会自动编译。
3. html 中使用 link 引入 css 文件
```

### 命令行安装 less

此方式需要 node 的支持

**安装**

```
npm install less -g
```

**使用**

```
lessc bootstrap.less bootstrap.css
```

## Less 语法

### Less 的注释

```less
/* 这是 CSS 注释,会原样编译到 CSS 中 */
// 这是 LESS 注释，不会编译到 CSS 中

块注释和行注释都可以使用：

/* 一个块注释
 * style comment! */
@var: red;

// 这一行被注释掉了！
@var: white;
```

 ### Less 的变量

#### ① 定义变量

**定义变量的一般形式：**

```less
@变量名:值;

@len: 600px;
@master-red: #900;
@master-green: #080;
@sencond-red: #600;


@width: 10px;
@height: @width + 10px;
```

**如果变量的值有特殊符号（空格短横线）：**

```less
@变量名:~"值";

@min768: ~"min-width:768px";
@min992: ~"min-width:992px";
@sel02: ~".news li";
```

#### ② 使用变量

**1、将变量作为属性值使用（大部分应用场景）：**

作为普通属性值只来使用：直接使用 

```less
// 直接使用 @变量名
width: @len;
color: @master-green;
background: @master-red;
border: 1px solid @master-green;

@media (@min768) {
    .container {
        width: 100%;
    }
}
```

**2、将变量作为属性名或者选择器使用：**

作为选择器和属性名：`@{selector的值}` 的形式

```less
// @{变量名}

.box {
    // 变量作为属性名
    @{prop}: 10px 10px;
}

// 变量名作为选择器
@{sel01} {
    width: @len;
    height: (@len/2);
}
```

```less
@width: 500px;
@g:grey;
@w:wrap;
@bg:background;

#@{w}{
  width: @width;
  height: 400px;
  @{bg}: pink;
}
#header {
  width: @width;
  @{bg}: @g;
}
```

**编译为：**

```css
#wrap {
  width: 500px;
  height: 400px;
  background: pink;
}
#header {
  width: 500px;
  background: gray;
}
```

**作用域：**

> 1. 首先在本地查找变量和混合函数
> 2. 如果找不到它们，则从“父”范围继承。

**延迟加载（懒加载），是作用域基础上的特性：**

> 1. 先找子元素，如果出现两个相同的变量，我们拿后边的
> 2. 再找父元素，把子元素的东西排除掉
> 3. 如果当前找不到这个变量，他需要到上一层去找

### Less 混合 (mixins)

混合就是将一系列属性从一个规则集引入到另一个规则集的方式，类似于 JavaScript 中的**函数**， 目的是提高代码的重用性。

#### ① 混合

**定义混合：**

```less
.center-box01() {
    position: absolute;
    width: 400px;
    height: 300px;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -150px;
}
```

**使用混合：**

```less
.item {
    // 调用混合
    .center-box01();
}

.news li {
    // 调用混合
    .center-box01();
    // 其他样式
    background: #900;
    border: 1px solid #999;
}
```

```less
.a {
  color: red;
}
.mixin-class {
  .a();
}
.mixin-id {
  .a();
}
```

编译为：

```css
.a {
  color: red;
}
.mixin-class {
  color: red;
}
.mixin-id {
  color: red;
}
```

#### ② 带参数的混合

**定义带参数的混合：**

```less
// 定义混合 有参数
.center-box02(@width, @height) {
    position: absolute;
    width: @width;
    height: @height;
    left: 50%;
    top: 50%;
    margin-left: -(@width/2);
    margin-top: -(@height/2);
}
```

**使用有参数的混合：**

```js
// 调用有参数的混合 按照顺序传参数
.center-box02(600px,500px);

 // 调用有参数的混合 按照名字传参
.center-box02(@height:600px, @width:700px);
```

```less
.border-radius(@radius) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius;
}

#header {
  .border-radius(4px);
}
.button {
  .border-radius(6px);
}
```

编译为：

```css
#header {
    -webkit-border-radius: 4px;
     -moz-border-radius: 4px;
          border-radius 4px;
}
.button {
    -webkit-border-radius: 6px;
     -moz-border-radius: 6px;
          border-radius 6px;
}
```

#### ③ 参数有默认值的混合

```less
// 定义混合 参数设置默认值
// 有默认值的参数在后面
// 可以按照顺序传参，也可以按照名字传参
.center-box03(@width, @height：800px) {
    position: absolute;
    width: @width;
    height: @height;
    left: 50%;
    top: 50%;
    margin-left: -(@width/2);
    margin-top: -(@height/2);
}

// 有默认值的参数在前面后面都可以
// 只能按照名字传参
.center-box04(@width：1200px, @height) {
    position: absolute;
    width: @width;
    height: @height;
    left: 50%;
    top: 50%;
    margin-left: -(@width/2);
    margin-top: -(@height/2);
}
```

```less
.border-radius(@radius: 5px) {
  -webkit-border-radius: @radius;
     -moz-border-radius: @radius;
          border-radius: @radius;
}

#header {
  .border-radius();
}
.button {
  .border-radius(6px);
}
```

编译为：

```css
#header {
    -webkit-border-radius: 5px;
     -moz-border-radius: 5px;
          border-radius 5px;
}
.button {
    -webkit-border-radius: 6px;
     -moz-border-radius: 6px;
          border-radius 6px;
}
```

#### ④ @arguments

所有参数组成的列表

```js
// @arguments 获取参数列表
.box-shadow(@x, @y, @b, @o, @color) {
    -webkit-box-shadow: @arguments;
    -moz-box-shadow: @arguments;
    -o-box-shadow: @arguments;
    box-shadow: @arguments;
}

.box {
    width: 400px;
    height: 300px;
    background: #900;
    .box-shadow(3px, 10px, 15px, 0px, #ccc);
}
```

```less
.box-shadow(@x: 0; @y: 0; @blur: 1px; @color: #000) {
  -webkit-box-shadow: @arguments;
     -moz-box-shadow: @arguments;
          box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px; 5px);
}
```

编译为：

```css
.big-block {
  -webkit-box-shadow: 2px 5px 1px #000;
     -moz-box-shadow: 2px 5px 1px #000;
          box-shadow: 2px 5px 1px #000;
}
```

#### ⑤多个参数的混合

```less
.mixin(@color: black; @margin, @padding: 20px) {
  color: @color;
  margin: @margin;
  padding: @padding;
}
.class1 {
  .mixin(@margin: 20px; @color: #33acfe);
}
.class2 {
  .mixin(#efca44; @padding: 40px);
}
```

编译为：

```css
.class1 {
  color: #33acfe;
  margin: 20px;
  padding: 20px;
}
.class2 {
  color: #efca44;
  margin: 10px;
  padding: 40px;
}
```

#### ⑥不带输出的混合

```less
.my-mixin {
  color: black;
}

// 该混合不会被输出
.my-other-mixin() {
  background: white;
}

.class {
  .my-mixin();
  .my-other-mixin();
}
```

编译为：

```css
.my-mixin {
  color: black;
}
.class {
  color: black;
  background: white;
}
```



### Less 条件判断

Less 可以使用 when 关键字实现条件判断

```less
.triangle(@border-width, @color, @direction) when (@direction=up) {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: @border-width;
    border-color: transparent transparent @color transparent;
}

.triangle(@border-width, @color, @direction) when (@direction=down) {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: @border-width;
    border-color: @color transparent transparent transparent;
}
 
.triangle(@border-width, @color, @direction) when (@direction=left) {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: @border-width;
    border-color: transparent @color transparent transparent;
}

.triangle(@border-width, @color, @direction) when (@direction=right) {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: @border-width;
    border-color: transparent transparent transparent @color;
}
```

### Less 导入

**导入 less 文件：**

```js
// 将 文件名.less 中的内容编译到 css 中
@import "文件名.less";

// 可以省略扩展名
@import "文件名"
```

**导入 css 文件**:

```less
// 原样编译到 css 中
@import "文件名.css";
```

常用作导入变量

index.less 入口文件

```less
// 导入变量文件
@import "variables";

// 导入重置样式表
@import "reset";


.box {
    width: 500px;
    color: @master-red;
}
```

variables.less

```less
@master-red: #900;
@second-red: #080;
```

reset.less

```less
* {
    margin: 0;
    padding: 0;
    font-size: 16px;
}
```



### Less 嵌套

Less 提供了使用嵌套代替层叠或与层叠结合使用的能力

#### ① 基本使用(层级选择器)

```less
.news {
    li {}	后代选择器
    >li {}	子元素选择器
    +li {}	相邻兄弟选择器
    ~li {}	通用兄弟选择器
}
```

**编译为：**

```css
.news {}
.news li {}
.news > li {}
.news + li {}
.news ~ li {}
```

#### ② & 符号应用（交集选择器组合）

```less
.item {
    &:hover {}	交集选择器
    &.active {}
}
```

**编译为：**

```css
.item {}
.item:hover {}
.item.active {}
```

#### ③ 媒体查询的嵌套

```less
.container {
    width: 100%;
    margin-left: auto;
    margin-right: auto;

    @media (min-width:768px) {
        width: 750px;
    }

    @media (min-width: 992px) {
        width: 970px;
    }

    @media (min-width: 1200px) {
        width: 1170px;
    }
}
```

**编译为：**

```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1170px;
  }
}
```

#### ③media 第二种嵌套方式

```less
@min1024: ~"(min-width: 1024px)";
.element {
  font-size: 15px;
  @media (min-width:640px) {
    font-size: 16px;
  }
  @media @min1024 {
    font-size: 18px;
  }
}
```

编译为：

```css
.element {
  font-size: 15px;
}
@media (min-width: 640px) {
  .element {
    font-size: 16px;
  }
}
@media (min-width: 1024px) {
  .element {
    font-size: 18px;
  }
}
```

#### ④ 混合和嵌套结合

混合里边的变量作用域，在混合调用后才可以使用。（不重要）

```less
.clearfix() {
    &::after {
        content: "";
        display: block;
        clear:both;
    }
}
```

### Less 运算符

算术运算 `+`、`-`、 `*`、 `/` 可以对任何数字、颜色或变量进行运算。如果可能的话，数学运算在加、减或比较之前会考虑到单位并转换数字。

结果具有最左边的显式单位类型。如果转换不可能或没有意义，则忽略单位。

```js
1. Less 可以进行 +、-、*、/ 运算
2. 除运算需要使用小括号
3. 如果两个操作数单位不一致，结果使用第一个操作数的单位
   如果只有一个操作数有单位，结果就使用该单位
   
   
// numbers are converted into the same units
@conversion-1: 5cm + 10mm; // result is 6cm
@conversion-2: 2 - 3cm - 5mm; // result is -1.5cm

// conversion is impossible
@incompatible-units: 2 + 5px - 3cm; // result is 4px

// example with variables
@base: 5%;
@filler: @base * 2; // result is 10%
@other: @base + @filler; // result is 15%
```

### Less 函数

混合（Mixins）类似于 JavaScript 中的**自定义函数**， 而这里的函数类似于 JavaScript 中的**内置函数**。

Less 内置了多种函数用于转换颜色、处理字符串、算术运算等。

可以参考 Less 中文网提供的函数手册： http://lesscss.cn/functions/#misc-functions

需要**注意**的是，一般我们很少会使用这些内置函数。

```js
percentage()		计算百分比	
mod()				取余运算
lighten()			颜色调高亮度
darken()			颜色调低亮度
```

https://less.bootcss.com/functions/

```css
@base: #f04615;
@width: 0.5;

.class {
  width: percentage(@width); // 将小数转换为百分比 returns `50%`
  color: saturate(@base, 5%);  // 将颜色饱和度增加 %5
  background-color: spin(lighten(@base, -25%), 8);  // 颜色亮度减小 25% 并且色相值增加 8 
}

mod(100,6)			4
percentage(.7)		70%
lighten(#900,10%);	颜色调高亮度
darken(#900,10%);	颜色调低亮度
```

### map

less 3.5之后，新增了 map 语法

```less
#colors() {
  primary: blue;
  secondary: green;
}

.button {
  color: #colors[primary];
  border: 1px solid #colors[secondary];
}
```

编译为:

```css
.button {
  color: blue;
  border: 1px solid green;
}
```
