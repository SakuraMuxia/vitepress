# CSS补充

## grid布局

CSS Grid（网格布局）是一种强大的布局系统，它可以让我们**创建复杂的网页布局**，相比传统的 `float`、`flexbox`，Grid 更适合**二维布局**（即同时控制行和列）。

```css
.container {
    display: grid;
    grid-template-columns: 100px 200px auto;
    grid-template-rows: 100px 150px auto;
}
```

grid-template-columns: 设定列宽度，这里是三列，宽度分别为 100px`、`200px和 auto剩余空间。

grid-template-rows: 设定 行高度，这里是三行，高度分别为 100px、150px和 auto。

**常见的 grid-template-columns 设定**

| 语法                                                         | 作用                                                       |
| ------------------------------------------------------------ | ---------------------------------------------------------- |
| grid-template-columns: 200px 100px auto;                     | **指定固定列宽**（第一列200px，第二列100px，剩余的为auto） |
| grid-template-columns: 1fr 2fr 1fr;                          | **使用 fr比例分配**（第一列1份，第二列2份，第三列1份）     |
| grid-template-columns: repeat(3, 100px);                     | **使用 `repeat` 生成 3 列，每列 100px**                    |
| grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); | 自动填充列，最小100px，最大自适应                          |

**网格间距 gap**

```css
.container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 100px);
      gap: 10px; /* 行和列间距 */
}
```

- gap: 10px; 设置 行列之间的间距（grid-gap已废弃）。
- 也可以单独设置：
  - row-gap: 10px;（行间距）
  - column-gap: 15px;（列间距）

**网格项的排列**

```
.item {
  	grid-column: 1 / 3; /* 跨 1 到 3 之间的列 */
  	grid-row: 1 / 2;    /* 跨 1 到 2 之间的行 */
}
```

- grid-column: start / end;：指定 起始列 / 结束列。

- grid-row: start / end;：指定 起始行 / 结束行。

- 跨多行/列：

  ```css
  .item{
      grid-column: span 2; /* 让当前元素占几份 */
  	grid-row: span 3; /* 让当前元素占几份 */
  }
  
  ```

**案例：**

1、卡片布局：自动排列卡片，每个最小 200px，超过时 平均分布。

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.card {
  background: lightblue;
  padding: 20px;
  text-align: center;
}

```

```html
<div class="container">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
</div>

```

2、响应式两列布局：sidebar占 1 份宽度，content占 3 份宽度。

```css
.container {
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 10px;
}

.sidebar {
  background: #f2f2f2;
  padding: 10px;
}

.content {
  background: #ddd;
  padding: 10px;
}

<div class="container">
  <div class="sidebar">Sidebar</div>
  <div class="content">Content</div>
</div>
```

3、响应式布局：

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); // 最小值为200px,最大值为分割整数
  gap: 20px;
}
```

4、不均等的布局

```css
.container {
    display: grid;
    // 最小值为200px,最大值为分割整数
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    .item{
        // 当前行 占两行 1/1+2
        grid-row: 1/3; 
    }
}
```

## 渐变

### 线性渐变

**linear-gradient:线性渐变**：从上到下

基本语法

```css
background: linear-gradient(方向, 颜色1, 颜色2, ...);
```

```ts
方向（可选）：
	可以是 to right、to bottom、角度（如 45deg）。
颜色：
	两个或多个颜色之间会产生渐变。
```

常见用法

**1、左 → 右 渐变**

```css
从 左红色 渐变到 右蓝色
background: linear-gradient(to right, red, blue);

```

**2、角度渐变**

```css
以 45° 角度从 橙色 渐变到 粉色
background: linear-gradient(45deg, orange, pink);
```

**3、多色渐变**

```css
从 红色 → 黄色 → 绿色 依次过渡
background: linear-gradient(to bottom, red, yellow, green);

20% 以内是红色,50% 处是黄色,80% 处是蓝色,其余部分颜色会平滑过渡。
background: linear-gradient(to right, red 20%, yellow 50%, blue 80%);
```

4、颜色控制范围

```css
// 白色占比 20%
background: linear-gradient(pink,write 20%);
// transparent 透明 
background: linear-gradient(pink,transparent 200px);
```

5、多个方向渐变：多个背景使用 , 间隔

```css
从左到右，粉色渐变为透明,从上到下，透明渐变为白色
background: 
url(/static/bg.png) no-repeat 高度 宽度,
linear-gradient(to bottom,transparent 100px,#fff 200px),
linear-gradient(to right,pink,transparent);
```



### 径向渐变

**radial-gradient径向渐变**：从中心到两边

基本语法

```css
background: radial-gradient(形状 大小 at 位置, 颜色1, 颜色2, ...);
```

```ts
形状：
	circle（圆形），ellipse（椭圆）。
大小：
    closest-side：渐变 从中心点 到 最接近的边。
    farthest-side：渐变 从中心点 到 最远的边。
    closest-corner：渐变 从中心点 到 最接近的角。
    farthest-corner（默认）：渐变 从中心点 到 最远的角。
at 位置：
	指定渐变中心，如 at 50% 50%（默认居中）。
```

常见用法

1、默认径向渐变

```css
中心 红色 向外渐变为 蓝色
background: radial-gradient(red, blue);
```

2、圆形渐变

```css
圆形从 红色 → 黄色 → 绿色 过渡
background: radial-gradient(circle, red, yellow, green);
```

3、椭圆渐变

```CSS
椭圆形 从 红色 → 蓝色 过渡
background: radial-gradient(ellipse, red, blue);
```

4、调整中心位置

```css
圆心在 左上角，从 红色 到 蓝色
background: radial-gradient(circle at top left, red, blue);
```

5、径向渐变

```css
从中心到四周
background:radial-gradient(渐变区域,中心位置(), 颜色1,颜色2)
background:radial-gradient(100px 200px,at 80% 200px, blue,pink);
渐变区域的宽度和高度相同时，可以只写一个
background:radial-gradient(100px,at 80% 200px, blue,pink),

多个方向渐变
background:
linear-gradient(to bottom,transparent,#fff 200px),
radial-gradient(100px,at left top, blue,transparent),
radial-gradient(100px,at right top, pink,transparent);
```

6、渐变案例

```css
.layout{
    width: 100%;
    height: 100vh;
    background: 
    linear-gradient(to bottom, transparent, #fff 260px),
    radial-gradient(20% 150px at 70% 230px, rgba(0,210,255,0.2),transparent),
    radial-gradient(40% 180px at 80% 50px, rgba(249,167,176,0.3),transparent),
    radial-gradient(50% 300px at 90% 100px, rgba(212,230,241,0.8),transparent),            
    radial-gradient(20% 150px at 0px 0px, rgba(162,213,239,0.5),transparent),
    radial-gradient(30% 200px at 100px 50px, rgba(249,167,176,0.5),transparent),
    #FFF0F5;
}

```



### 锥形渐变

conic-gradient

基本语法

```css
background: conic-gradient(from 角度 at 位置, 颜色1, 颜色2, ...);
```

```ts
from 角度：
	起始角度（如 from 0deg）。
at 位置：
	渐变中心（如 at center）。
颜色：
	多个颜色按角度均匀分布。
```

常见用法

1、基本锥形渐变

```css
从 红 → 黄 → 绿 顺时针过渡
background: conic-gradient(red, yellow, green);
```

2、饼图渐变：

```css
0°-120° 是红色，120°-240° 是黄色，240°-360° 是蓝色，可用于 饼图 UI。
background: conic-gradient(red 0deg 120deg, yellow 120deg 240deg, blue 240deg 360deg);
```

3、渐变中心偏移

```css
将 渐变中心点 移到 (25%, 25%)。
background: conic-gradient(at 25% 25%, red, yellow, green);
```

