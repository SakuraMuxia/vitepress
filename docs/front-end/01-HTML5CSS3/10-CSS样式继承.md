# 样式继承和自带样式

## 样式继承

**哪些样式可以被后代元素继承：**

```shell
1. 字体样式 font-size、font-weight、font-style font-family、font
2. 文字颜色 color
3. 文本样式 letter-spacing、word-spacing、text-decoration、text-indent、text-align、line-height （vertical-align 不可以被继承）
```

## 自带样式（用户代理样式）

```css
标题h1~h6 自带 font-size、font-weight、上下外边距
input元素默认自带字体大小 font-size
p 自带 上下外边距
em 自带 font-style
strong 自带 font-weight
a 自带 color、text-decoration、cursor
ul、ol 自带 padding-left、上下外边距
...
```

## 权重

```js
直接设置的样式 > 自带的样式 > 继承的样式
```

# CSS 属性的继承

## 哪些 CSS 属性可以继承

- 字体设置、颜色、文本设置这些 css 属性可以继承。
- 其他的 css 属性，如跟盒子相关的 cs s属性无法继承，像边框、宽高、内外边距、背景等等。

> 要善于利用继承的特性，字体、颜色和文本的相关设置可以设置在包裹在外层的元素上。

## 特殊情况

- 背景属性无法继承，看起来像继承是因为元素默认的背景色是透明色（transparent）.

- 继承下来的属性优先级最低，比元素默认属性值还要低。

  ```html
     给超链接的父元素设置 color 或 text-decoration 的时候，我们发现超链接并不会安装父元素的设置；其实，超链接也继承了父元素的相关属性，只是同时超链接有默认的 color 和 text-decoration 设置，继承的属性优先级要低于默认的属性值，所以仍然按照默认的样式显示。
     所以，如果给超链接设置颜色或者 text-decoration 的时候，需要直接选择器选择到 a 元素来设置，不能依靠继承。
     类似的这种情况还有标题元素，标题元素有默认的 font-size 和 font-weight 设置继承的属性是不如默认的属性
  ```
