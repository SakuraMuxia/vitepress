# CSS 常用属性

## 字体属性

- font

  ```css
  font:字体风格[字体加粗]<字体大小>[/行高]<字体族科>
  ```

- font-family 字体族科 宋体|微软雅黑

  ```css
  font-family:"Arial","Helvetica",sans-serif;
  ```

- font-size 字体大小

- font-style 字体风格 normal | italic | oblique (斜体)

- font-weight 字体加粗 normal | bold | lighter

- font-variant 字体变形 normal | small-caps

## 字体样式

| 属性名      | 作用             | 属性值                                                       |
| ----------- | ---------------- | ------------------------------------------------------------ |
| font-size   | 字体大小         | 长度                                                         |
| font-weight | 字体粗细         | normal：正常。<br>lighter：细。<br>bold：粗。<br>100~900数字：100~300是细体，400、500正常，600以及以上粗体 |
| font-style  | 斜体字           | normal：正常。<br>italic：斜体字。                           |
| font-family | 字体族科         | 字体名称、字体列表                                           |
| font        | 设置多种字体样式 | 多个值，使用空格分隔                                         |

### 字体族科 font-family

**字体族科的设置：**

``` 
font-family: 字体名称；
font-family: "字体名称";  /* 如果字体名称中有空格，如 Microsoft YaHei 建议使用引号包裹*/
```

**设置字体列表：**

```css
font-family: arial, "Hiragino Sans GB", "Microsoft Yahei", 微软雅黑, 宋体, Tahoma, Arial, Helvetica, STHeiti;
font-family: "Microsoft YaHei", 微软雅黑, 宋体, sans-serif;
```

**衬线字体和非衬线字体：**

```sh
serif 表示衬线字体，笔画粗细不一致，如宋体、仿宋体、楷体等
sans-serif 表示非衬线字体，笔画粗细一致，如微软雅黑、黑体、Helvetica
```

### 复合属性 font

```css
/* 最少两个值 字体大小 字体族科 */
font: 20px 宋体;
font: 20px "Microsoft YaHei",微软雅黑,宋体,sans-serif;

/* 粗体字 字体大小 字体族科  */
font: 800 16px "Microsoft YaHei",微软雅黑,宋体,sans-serif;

/* 斜体字 字体大小 字体族科  */
font: italic 16px "Microsoft YaHei",微软雅黑,宋体,sans-serif;

/* 又粗又斜 字体大小 字体族科  */
font: 800 italic 16px "Microsoft YaHei",微软雅黑,宋体,sans-serif;
font: italic italic 16px "Microsoft YaHei",微软雅黑,宋体,sans-serif;
```

### 子属性和复合属性的关系

```js
1. 复合属性写在子属性的后面，前面的子属性全部失效，复合属性即使没写对应的值也会用默认值覆盖掉子属性
2. 子属性写在复合属性的后面，子属性会覆盖掉复合属性中与之对应的样式
```

### 文本颜色

| 属性名 | 作用         | 属性值 |
| ------ | ------------ | ------ |
| color  | 设置文字颜色 | 颜色   |

```sh
行高可选值：
1.normal：由浏览器根据文字大小决定的一个默认值。
2.像素（px）
3.数字：参考自身font-size的倍数（很常用。通常是1.5~2倍之间）
4.百分比：参考自身font-size的百分比。
备注：由于字体设计的原因，文字在一行中，并不是绝对垂直居中，若一行中都是文字，不会太影响观感。

注意：
1.行高过小：导致文字重叠，且最小值是0，不能为负数（负数会无效，默认为normal）。
2.行高是可以继承的。
3. 

```

## 文本样式

| 属性名          | 作用                 | 属性值                                                       |
| --------------- | -------------------- | ------------------------------------------------------------ |
| letter-spacing  | 字间距               | 长度                                                         |
| word-spacing    | 词间距（中文无效果） | 长度                                                         |
| text-decoration | 文本修饰线           | none：无修饰线。<br>underline：下划线。<br>overline：上划线。<br>line-throuth：删除线 |
| text-indent     | 首行缩进             | 长度                                                         |
| text-align      | 文本水平对齐方式     | left：左对齐。<br>right：右对齐。<br>center：居中对齐        |
| vertical-align  | 与同行文本如何对齐   | baseline：基线对齐。<br>top：顶线对齐。<br>middle：中线对齐。<br>bottom：底线对齐。<br>sub：下标字。<br>super：上标字。<br>长度：元素底部与基线的距离 |
| line-height     | 行高                 | 长度                                                         |

#### ① vertical-align

```sh
1. 设置行内元素或行内块元素与同行文本如何对齐，如 基线对齐、顶线对齐、中线对齐、底线对齐等
2. 设置上标字和下标字
3. 设置单元格中内容的纵向对齐方式，只能用于 td、th
```

#### ② line-height 设置行高

**行高的概念：**

```sh
1. 上一行文字中线与下一行文字中线的距离称为行高
2. 上一行文字底线与下一行文字顶线的距离称为行距，调整行高大小，行距受到影响
```

> 第一行文字中线与元素顶部距离是行高一半，最后一行文字中线与元素底部距离是行高一半！

**使用行高实现元素中的一行文字垂直居中，满足以下条件：**

```sh
1. 只有一行文字
2. 设置行高与高度一致
```

**line-height 是 font 的子属性：**

```css
 /* 将行高写在font复合属性中 */
font: bold 14px/30px 'Microsoft YaHei';
font: bold 14px/3 'Microsoft YaHei';  /* 此时 3 表示字体大小的倍数，相当于em */
```

![image-20240311094401475](000-images/08-CSS常用属性/image-20240311094401475.png)

## 背景样式

| 属性名                | 作用                 | 属性值                                                       |
| --------------------- | -------------------- | ------------------------------------------------------------ |
| background-color      | 背景颜色             | 颜色                                                         |
| background-image      | 设置背景图像地址     | url(地址)                                                    |
| background-repeat     | 设置背景图像重复方式 | repeat：重复。<br>repeat-x：横向重复。<br>repeat-y：纵向重复。<br>no-repeat：不重复。 |
| background-position   | 设置背景图像位置     | 关键字。<br>两个长度表示的坐标。<br>百分比                   |
| background-attachment | 背景图像固定         | scroll：随元素滚动，默认值。<br>fixed：固定。                |
| background            | 背景复合属性         | 多个值使用空格分隔                                           |

### ① 背景颜色

```sh
1. 元素默认背景颜色是透明,background-color的默认值是 transparent（透明）
2. 给 body 设置背景色就是给整个页面设置背景色
```

### ① 设置背景图像的位置 background-position

**使用关键字设置属性值：**

```css
/* 
    x轴位置：left right center
    y轴位置：top bottom center
*/
/* 使用两个值 */
background-position: left top;
background-position: right bottom;
background-position: right center;
background-position: right top;
/* 使用一个值  另一个值默认center*/
background-position: left;   /* left center */
background-position: bottom; /* center bottom */
background-position: center; /* center center */
```

**通过指定坐标（用长度）设置属性值：**

```css
/* 使用坐标设置背景图像位置 */
/* 设置的是图像的左上角位置 */
/* 使用两个长度（px、em） 分别是x坐标 y 坐标 */
background-position: 0 0;
background-position: 100px 20px;
background-position: 520px 320px;
background-position: -100px 100px;
/* 只设置一个长度， 被认为是x坐标 y轴位置默认取center */
background-position: 100px;
/* 长度表示的坐标和关键字混搭 */
background-position: right -50px;
background-position: 100px bottom;
```

**使用百分比设置属性值：**

```css
/* 
    元素和图像各自创建一个坐标系
    原点在各自的左上角，x轴从左到右，y轴从上到下
    根据百分比从元素上找到坐标点，根据百分比从图像上找到坐标点，两点重合
*/
/* 两个百分比 */
background-position: 0% 0%;
background-position: 50% 50%;
background-position: 20% 10%;
background-position: 100% 100%;
/* 百分比和其他混搭 */
background-position: 100% 100px;
background-position: left 100%;
/* 值使用一个百分比 被认为x方向位置，另一个方向默认center */
background-position: 10%;
```

**background-position 的两个子属性：**

```sh
background-position-x	设置x位置，y的值为默认状态 0
background-position-y   设置y位置，x的值为默认状态 0
```

### ② 背景图像固定 background-attachment

```sh
如果设置 background-attachment 为 fixed， 背景图像定位的坐标原点是视口的左上角
背景图像只能显示图像与元素位置重合的位置
```

### ③ 背景复合属性 background

```sh
任何子属性的值都可以作为background的值，没有数量要去，没有顺序要求
```

### ④ 背景图片背面隐藏属性

```css
backface-visibility:hidden;
```

## 鼠标光标样式

| 属性名 | 作用         | 属性值                              |
| ------ | ------------ | ----------------------------------- |
| cursor | 设置鼠标光标 | pointer：小手。<br>move：移动图标。 |

```css
/* 自定义鼠标光标 */
cursor: url(../images/arrow03.png),pointer;
```

## 列表样式

| 属性名              | 作用               | 属性值                                    |
| ------------------- | ------------------ | ----------------------------------------- |
| list-style-type     | 设置列表项图标     | none：无                                  |
| list-style-position | 设置列表项图标位置 | outside：在li外面。<br>inside：在li里面。 |
| list-style-image    | 自定义列表项图标   | url(图片地址)                             |
| list-style          | 复合属性           | 多个值使用空格分隔                        |

> **注意：** 只有 ul、ol、li 这些标签设置列表样式才有效果！

## 表格样式

| 属性名          | 作用                         | 属性值                               |
| --------------- | ---------------------------- | ------------------------------------ |
| table-layout    | 设置列宽固定                 | auto：默认值。<br>fixed：固定。      |
| border-spacing  | 设置单元格之间的距离         | 长度                                 |
| border-collapse | 合并单元格边框               | separate：默认值。<br>collapse：合并 |
| caption-side    | 标题位置                     | top：表格上面。<br>bottom：表格下面  |
| empty-cells     | 没有内容的单元格显示还是隐藏 | show：显示，默认值。<br>hide：隐藏   |

> **注意：** 表格相关的属性只能设置到 table 标签上才生效！









 
