# 盒子模型

## 元素的显示模式

### ① 块级元素 block

显示模式是块级的元素称为块级元素，特点：

```sh
1. 在页面中是一个块，能够独占一行
2. 可以设置宽度和高度
```

### ② 行内元素 inline

显示模式是行内的元素称为行内元素，特点：

```sh
1. 显示在行内，不能独占一行
2. 无法设置宽度和高度
```

### ③ 行内块元素 inline-block

显示模式是行内块的元素称为行内块元素，特点：

```sh
1. 显示在行内，不能独占一行
2. 可以设置宽度和高度
```

> 按照最早的标准，行内块元素也被当做行内元素！

## HTML 元素的默认显示模式

### ① 默认显示模式是 block 的元素：

```sh
排版标签： h1~h6、p、pre、hr、div
列表标签： ul、ol、li、dl、dt、dd
表单标签： form、option
```

### ② 默认显示模式是 inline 的元素：

```sh
文本标签： em、strong、del、ins、sub、sup、span
超链接标签： a
表单标签： label
```

### ③ 默认显示模式是 inline-block 的元素：

```sh
图片标签： img
表单标签： input、button、textarea、select
框架标签： iframe
```

## 修改元素的显示模式

使用CSS属性 `display` 可以设置元素的显示模式，该属性的值如下：

```sh
inline
block
inline-block
none
visibility:hidden;
```

```sh
按照最早的标准只有行内和块级，默认显示模式是行内块的元素，无法设置成真正的行内
```

## 隐藏元素

```css
display:none
visibility:hidden;
hidden
```

# 盒子模型的组成

## 盒子模型的相关概念

![image-20240311095022669](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240311095022669.png)

```sh
1. 将元素比作成一个盒子
2. 页面布局就是盒子的排列和堆砌
```

**内容（content）：** 内容是元素的核心区域，元素中的文本内容和后代元素都显示在内容上。

**内边距（padding）：** 内容与元素边界的距离。

**边框（border）：** 位于元素的边界上。

**外边距（margin）：** 在元素边界之外，是与相邻元素的距离。

##  影响盒子大小的因素

```sh
盒子的总宽度 = 内容宽度 + 左右内边距 + 左右边框
盒子的总高度 = 内容高度 + 上下内边距 + 上下边框
```

## 盒子中的内容区域

###  设置内容区域的宽高的 CSS 属性

| CSS 属性名 | 功能     | 属性值 |
| ---------- | -------- | ------ |
| width      | 宽度     | 长度   |
| max-width  | 最大宽度 | 长度   |
| min-width  | 最小宽度 | 长度   |
| height     | 高度     | 长度   |
| max-height | 最大高度 | 长度   |
| min-height | 最小高度 | 长度   |

> **注意：** 最大最小宽高一般不与固定宽高一同设置！

### 元素的默认宽高

**行内元素：**

```sh
默认宽度被内容撑开，没有内容就没有宽度
默认高度被内容撑开，没有内容也会有一个文字的高度
```

**行内块元素：**

```sh
默认宽度被内容撑开，没有内容就没有宽度
默认高度被内容撑开，没有内容就没有高度
```

**块级元素：**

```sh
默认宽度被内容撑开，没有内容就没有高度
```

```sh
默认总宽度 = 父元素内容宽度 - 自身的左右外边距
默认内容宽度 = 父元素内容宽度 - 自身的左右外边距 - 自身的左右内边距 - 自身的左右边框
```

## 盒子的内边距 padding

### ① 相关 CSS 属性

| CSS 属性名     | 功能           | 属性值           |
| -------------- | -------------- | ---------------- |
| padding-left   | 左内边距       | 长度             |
| padding-right  | 右内边距       | 长度             |
| padding-top    | 上内边距       | 长度             |
| padding-bottom | 下内边距       | 长度             |
| padding        | 上下左右内边距 | 多个长度空格分隔 |

### ② padding 设置规则

**padding 值设置的规则：**

```sh
1. 不能是负值
2. 使用百分比，上下左右内边距都参照父元素内容宽度
```

**padding 复合属性的设置规则：**

```css
/* 1个值: 上下左右 */
padding: 20px;
/* 2个值： 上下 左右*/
padding: 40px 30px;
/* 3个值： 上 左右 下*/
padding: 10px 20px 30px;
/* 4个值： 上 右 下 左*/
padding: 15px 25px 35px 45px;
```

**不同显示模式的元素设置内边距：**

```sh
1. 块级元素、行内块元素内边距可以完美设置
2. 行内元素，左右内边距可以完美设置，上下内边距效果不完美
```

## 边框 border

- 边框不会显示在 margin 中。
- 背景颜色在边框中显示（实线的时候，我们看不到）。
- 背景图片原点没有从边框开始 而是从padding开始的，但是可能会平铺到边框中。

| CSS 属性名                                                   | 功能                     | 属性值                                                       |
| ------------------------------------------------------------ | ------------------------ | ------------------------------------------------------------ |
| border-style                                                 | 边框风格                 | none：无风格。<br>solid：实线。<br>dashed：虚线。<br>dotted：点线。<br>double：双实线。 |
| border-color                                                 | 边框颜色                 | 颜色，默认值是文字颜色                                       |
| border-width                                                 | 边框宽度                 | 长度，默认值是3px                                            |
| border                                                       | 同时设置风格、颜色、宽度 | 多个值使用空格分隔                                           |
| border-left-style<br>border-left-color<br>border-left-width<br>border-left<br><br>border-right-style<br/>border-right-color<br/>border-right-width<br/>border-right<br><br>border-top-style<br/>border-top-color<br/>border-top-width<br/>border-top<br/><br/>border-bottom-style<br/>border-bottom-color<br/>border-bottom-width<br/>border-bottom |                          |                                                              |

```css
border的子属性有： border-style、border-color、border-width

border-left 的子属性： bordre-left-style、border-left-color、border-left-width
border-right border-top border-bottom 各种具有子属性

border-style 的子属性： border-left-style、border-right-style、border-top-style、border-bottom-style
border-color、border-width 各种具有子属性
```

## 外边距 margin

```sh
1. 外边距是元素与相邻兄弟元素的距离，如果没有相邻兄弟元素就是与父元素内容边界的距离
2. 左外边距和上外边距主要影响自己的位置，右外边距和下外边距主要影响相邻兄弟元素的位置
```

### ① 相关 css 属性

| CSS 属性名    | 功能           | 属性值           |
| ------------- | -------------- | ---------------- |
| margin-left   | 左外边距       | 长度             |
| margin-right  | 右外边距       | 长度             |
| margin-top    | 上外边距       | 长度             |
| margin-bottom | 下外边距       | 长度             |
| margin        | 外边距复合属性 | 多个长度空格分隔 |

### ② margin 设置规则

**margin 值设置的规则：**

```sh
1. 使用百分比，上下左右内边距都参照父元素内容宽度
2. 外边距可以是负值
3. 块级元素左右外边距都设置为 auto，该元素在父元素中横向居中
```

**margin 复合属性的设置规则：**

```sh
1个值： 上下左右
2个值： 上下 左右
3个置： 上 左右 下
4个值： 上 右 下 左
```

**不同显示模式的元素设置外边距：**

```sh
1. 块级元素、行内块元素外边距可以完美设置
2. 行内元素，只能设置左右外边距，上下外边距设置无效
```

### ③ margin 塌陷

**什么是 margin 塌陷？**

```shell
1. 最上面元素的上外边距、最下面元素的下外边距会塌陷到父元素
2. 外边距塌陷只会发生在块级元素上
```

**如何解决 margin 塌陷？**

```shell
- 方案一： 父元素设置边框
- 方案二： 父元素设置内边距
- 方案三： 父元素开启BFC，设置 overflow:hidden;
```

### ④ margin 合并

**什么是 margin 合并？**

```shell
1. 上面兄弟元素的下外边距会与下面兄弟元素的上外边距合并，两者之间距离取较大的外边距
2. 外边距合并只会发生在块级元素上
```

**如何解决 margin 合并？**

```shell
不用解决
```

##  内容溢出

| CSS 属性名 | 功能                      | 属性值                                                       |
| ---------- | ------------------------- | ------------------------------------------------------------ |
| overflow   | 设置溢出内容的显示方式    | visible：显示，默认值。<br>hidden：隐藏。<br>scroll：滚动条。<br>auto：自动。 |
| overflow-x | x轴方向溢出内容的显示方式 | 同上                                                         |
| overflow-y | y轴方向溢出内容的显示方式 | 同上                                                         |

**auto 和 scroll 的区别：**

```shell
1. scroll 不论内容是否会溢出，都有滚动条
2. auto 只有内容溢出才会显示滚动条
```

## 隐藏元素

```CSS
1. 设置 visibility:hidden;   元素隐藏但是占据位置
2. 设置 display:none;  元素彻底隐藏，不占据位置
3. 设置背景图片隐藏 backface-visibility
```



## 行内元素或行内块元素在布局中的特点

### 父元素设置的文本属性可以作用于行内元素和行内块元素

#### ① 让行内块元素在父元素中水平居中

```shell
给父元素设置 text-align:center
```

#### ② 让行内块元素在父元素中纵向居中

```shell
1. 给父元素设置行高
2. 给行内块元素设置 vertical-align:middle
```

### 行内元素或行内块元素之间的空白问题

#### ① 元素之间的空白（左右）

**产生原因：**

```shell
代码中，元素之间的换行
```

**解决方案：**

```shell
方案一： 代码中，元素之间不写换行（不推荐）
方案二： 父元素设置字体大小为0； 如果行内块元素中还有文字单独设置字体大小。
```

#### ② 底部的空白（图片的幽灵空白）

**产生原因：**

```shell
行内块元素与文字基线对齐，底部的空白就是基线与底线的距离
```

**解放方案：**

```shell
方案一： 父元素设置字体大小 0
方案二： 给行内块元素设置 vertical-align:bottom (推荐)
方案三： 经典解决方案，针对图片，将图片设置成块级元素
```

#### ③ 文字内容个数不同的行内块元素水平排列无法对齐

**产生原因：**

```shell
1. 如果行内块元素中没有文字，该元素的底部与基线对齐
2. 如果行内块元素中有一行文字，文字与外面的基线对齐，进而影响行内块元素的位置
3. 如果行内块元素中有多行文字，最后一行文字与外面的基线对齐，进而影响行内块元素的位置
```

**解决方案：**

```html
给行内块元素设置 vertical-align, 值不是 baseline 都可以解决问题
```





