# CSS 基本选择器

## 四种基本选择器

### ① 标签名（元素名）选择器

```css
标签名 {}
```

### ② 类名选择器

```css
.类名 {}
```

```
1. 多个元素可以设置相同的类名
2. 一个元素可以设置多个类名
```

### ③ ID 选择器

```css
#ID名 {}
```

> 元素的ID名必须是唯一的！

### ④ 全局（通配）选择器

```css
* {}
```

### 基本选择器之间的权重

```sh
1. ID选择器 > 类选择器 > 标签名选择器 > 全局选择器
2. 行内式大于所有的选择器
```

```css
padding 设置内边距
```

## 组合选择器

### ① 后代元素选择器

```css
选择器1 选择器2 {}
```

### ② 子元素选择器

```css
选择器1 > 选择器2 {}
```

### ③ 交集选择器

```css
选择器1选择器2 {}

.item.active {}
.active.item {}
div.item {}
```

### ④ 并集选择器

```css
选择器1, 选择器2 {}
```

## 属性选择器

- `E[attr]` 选择具有att属性的E元素。
- `E[attr="val"]` 选择具有att属性且属性值等于val的E元素。
- `E[attr~="val"]` 选择具有att属性且属性值为一用空格分隔的字词列表，其中一个等于val的E元素（包含只有一个值且该值等于val的情况。
- `E[attr^="val"]` 选择具有att属性且属性值为以val开头的字符串的E元素。
- `E[attr$="val"]`选择具有att属性且属性值为以val结尾的字符串的E元素。
- `E[attr*="val"]` 选择具有att属性且属性值为包含val的字符串的E元素。
- `E[attr|="val"]` 选择具有att属性且属性值为以val开头并用连接符"-"分隔的字符串的E元素，如果属性值仅为val，也将被选择。

```js
var checkboxInput = document.querySelector('input[type="checkbox"]');
```



## 伪类选择器

```sh
:link			选择未访问过的超链接
:visited		选择已访问过的超链接
:hover			鼠标悬停在元素上
:active			鼠标悬停在元素上且鼠标按键按下不抬起
```

```sh
多个伪类选择器一起使用，请按照 :link、:visited、:hover、:active 顺序书写 (love hate 记忆法)
```

### 选择器权重（优先级）

### ① 单个选择器之间的权重

```sh
ID选择器 > 类选择器、伪类选择器 > 标签名选择器 > 全局选择器
```

### ② 组合选择器优先级比较规则

```sh
1. 两个组合选择器，先比较ID的数量，数量多者权重高，比较结束
2. ID数量无法分胜负，比较类、伪类的数量，数量多者权重高，比较结束
3. 类、伪类的数量无法分胜负，比较标签名的数量，数量多者权重高， 比较结束
4. 两个选择器权重一致，后面覆盖前面
```

> **组合： ** 并集选择器的组合，各自计算各自的权重，不会放在一起计算。

