# BFC

## 1 什么是 BFC

**Block Formatting Context** 简称 **BFC**，中文翻译为 **块级格式上下文**。

### ① W3C 中对 BFC 的定义

Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with 'overflow' other than 'visible' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.

> **译文：**
>
> 浮动、绝对定位元素、不是块盒子的块容器(如inline-blocks、table-cells和table-captions)，以及`overflow`属性的值除`visible`以外的块盒(除非该值已传播到视口)，将为其内容建立新的块格式化上下文。

https://www.w3.org/TR/CSS22/visuren.html#block-formatting

### ② MDN 上对 BFC 的定义

A **block formatting context** is a part of a visual CSS rendering of a web page. It's the region in which the layout of block boxes occurs and in which floats interact with other elements.

> **译文：**
>
> **块格式化上下文（Block Formatting Context，BFC）** 是Web页面的可视CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。

https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context

### ③ 到底什么是 BFC 

首先，BFC 的意思是 **Block Formatting Context** ，即**块级格式上下文**。 然后，当元素满足了某些条件，我们认为该元素创建了 **BFC**。 创建了 BFC 的元素我们可以把他看做是一个独立的容器，容器内的元素不论如何布局都不会影响到外面。

## 2 创建 BFC 的方式

- 根元素。
- 浮动元素。
- 绝对定位或固定定位的元素。
- 行内块元素。
- 表格单元格（th、td）、表格行（tr）、表格标题（caption）、table、thead、tbody、tfoot。
- `overflow` 的值不为 `visible` 的块元素。
- 伸缩项目。
- 多列容器。
- `column-span` 为 `all` 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中。

## 3 创建 BFC 可以解决的问题

### ① 清除子元素浮动的影响

给浮动元素的父元素创建 BFC，清除掉子元素浮动的影响。

### ② 解决外边距塌陷

给父元素创建 BFC，第一个和最后一个子元素的外边距不会塌陷。