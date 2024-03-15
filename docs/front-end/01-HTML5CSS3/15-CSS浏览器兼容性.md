# 浏览器兼容性

## 1 提高兼容性的设置

- 使用最新版IE渲染

  ```html
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  ```

- 让双核浏览器默认使用webkit内核

  ```html
  <meta name="renderer" content="webkit">
  ```

## 2 CSS hack

由于不同的厂商的浏览器，或者是同一个浏览器不同的版本（ie），对css的解析和认识不完全一样可能会导致不同浏览器显示的效果不相同，那么我们需要针对某个浏览器，去写不同的样式，让代码能够兼容所有的浏览器。

### 2.1 CSS 属性前缀法

```css
*color： /*ie 5,6,7*/
+color： /*ie 5,6,7*/
#color： /*ie 5,6,7*/
_color： /*ie 5、6*/
color\0:  /*ie 9 10 11*/
color\9:ie  /*6 7 8 9 10*/
color\9\0:  /*ie 8 9 10*/
```

### 2.2 选择器前缀法

```css
/* ie 5 6*/
*div{ 

} 

/*ie7*/
*+div{
}
```

## 3 IE 条件注释

IE 中的条件注释对 IE 的版本和非IE版本有优秀的区分能力。

条件注释的基本结构和HTML的注释 `<!-- -->` 是一样的。因此 IE 以外的浏览器将会把它们看作是普通的注释而完全忽略它们。

IE9 以及 IE9 以下浏览器可以识别条件注释。

**比较符号：**

```css
lt    表示    <
gt    表示    >
gte    表示    >=
lte    表示    <=
!      表示    !=
```

**案例：**

```html
<!--[if IE 8]> 仅IE8可见 <![endif]--> 

<!--[if gt IE 8]>仅IE 8以上可见<![endif]—>

<!--[if lt IE 8]>仅IE 8以下可见<![endif]—>

<!--[if gte IE 8]>IE 8及以上可见<![endif]—>

<!--[if lte IE 8]>IE 8及以下可见<![endif]—>

<!--[if !IE 8]>非IE 8的IE可见<![endif]-->

<!--[if !IE]><!--> 您使用不是 Internet Explorer <!--<![endif]-->
```