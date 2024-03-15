# HTML新增属性

## HTML5 新增标签

### 新增排版布局标签（最重要）

| 标签名     | 语义和功能                             | 属性 | 单标签还是双标签 |
| ---------- | -------------------------------------- | ---- | ---------------- |
| header     | 页头                                   |      | 双标签           |
| footer     | 页脚                                   |      | 双标签           |
| picture    | 图片标签                               |      | 双标签           |
| nav        | 导航                                   |      | 双标签           |
| section    | 页面中的独立区域或文章中的一节         |      | 双标签           |
| aside      | 侧边栏                                 |      | 双标签           |
| article    | 文章、博客、评论、帖子等               |      | 双标签           |
| main       | 主要内容部分                           |      | 双标签           |
| figure     | 表示一段独立的流内容，比如文章中的插图 |      | 双标签           |
| figcaption | 表示 figure 中的标题                   |      | 双标签           |
| hgroup     | 标题组（很少使用）                     |      | 双标签           |

> **注意：**
>
> ①  W3C 标准中没有 hgroup 标签。 
>
> ② WHATWG 标准中没有 main 标签，所有版本 IE 均不支持 main 标签。 

### 新增状态标签（了解）

| 标签名   | 语义和功能 | 属性                                      | 单标签还是双标签 |
| -------- | ---------- | ----------------------------------------- | ---------------- |
| meter    | 静态度量   | max、min、high、low 、value、optimum 等等 | 双标签           |
| progress | 动态进度   | max、value                                | 双标签           |

**meter 和 progress 什么区别：**

```sh
meter 定义已知范围或分数值内的标量测量，一般用于表示静态的度量，如电池电量、磁盘用量、温度、湿度等。
progress 定义某个任务完成的进度的指示器，一般用于表示动态的进度，如进度条。
```

```css
meter {
    /* 可以设置宽高 */
}
meter::-webkit-meter-bar {
    /* 可以设置总体边框，空白区域背景等 */
}
meter::-webkit-meter-optimum-value {
    /* 设置最优值范围内的样式 */
}
meter::-webkit-meter-suboptimum-value {
    /* 凑合范围内的样式*/
}
meter::-webkit-meter-even-less-good-value {
    /* 糟糕范围内的样式*/
}
```

设置progress样式

```css
progress {
    /* 所有浏览器都可以设置宽高、边框 */
    /* IE、firefox 可以设置空白区域背景色*/
    /* color 可以设置 IE 下进度条区域的背景色*/
    /* 只有设置了 border 或者 background 属性， chrome 才可以设置空白区域颜色*/
}
::-webkit-progress-bar {
    /* chrome 空白区域颜色 */
}
::-webkit-progress-value {
    /* chrome 设置进度条区域 */
}
::-moz-progress-bar {
    /* firefox 设置进度条区域 */
}
```

### 详情标签（了解）

| 标签名  | 语义和功能                         | 属性 | 单标签还是双标签 |
| ------- | ---------------------------------- | ---- | ---------------- |
| details | 表示一个可以展开或收起的细节或内容 |      | 双标签           |
| summary | 表示 details 中的标题              |      | 双标签           |

```html
<details>
    <summary>鲁迅的真名是是什么？</summary>
    <p>周树人</p>
</details>

<details>
    <summary>请自我介绍一下</summary>
    <h3>我的生活</h3>
    <p>书春天血币者互量流得之，者尘者忧样的能变，为语面事出使明关秦，最不人秦十极娟场措土有的若太罪，宋往了死揽此自不，航不罪苦说都回魂密恩要系，治斯了兮言我才母看高衣回洪我厄仇，会情匹力不出掸何承天范而范未，争的以你大郭国之办勇郭报高德之，韩份冈国朗守，乡忧未。</p>
    <h3>我的情感</h3>
    <p>他未的落皇冷要张答价种论说是人越看太，不杀他衣毒不之中承他，两责能苟保书五作，程不宋韩法仆不的生放惜担败者六县促承，磊国德为有小县者畴弟太，秦帮反的者到，王锐予皇二由满程也将生，传娘国小知老是第老先责回极鼓世，斯你能就即完新官锐得今者降揽，我人徒，定忧上。</p>
</details>
```

### 新增注音标签

| 标签名 | 语义和功能       | 属性 | 单标签还是双标签 |
| ------ | ---------------- | ---- | ---------------- |
| ruby   | 包裹要注音的文字 |      | 双标签           |
| rt     | 写具体的注音     |      | 双标签           |

```html
<ruby>
    饕餮
    <rt>taotie</rt>
</ruby>
```

### 新增文本标签

| 标签名 | 语义和功能             | 属性 | 单标签还是双标签 |
| ------ | ---------------------- | ---- | ---------------- |
| mark   | 用于对某个词语进行标记 |      | 双标签           |

```sh
mark 元素定义带有记号的文本，请在需要突出显示文本时使用，如搜索引擎搜索页面。
```



## HTML5 表单新增功能

### 表单控件新增属性

**旧标准存在的表单控件属性：**

```sh
disabled	设置不可用，该属性不需要值
name		表单控件的标识
value		表单控件的值
```

**新标准增加的表单控件属性：**

```html
placeholder		给输入框或文本域设置提示文字
autofocus		自动获取焦点，不需要设置值
required		设置必填或必选，不需要设置，否则表单无法提交
pattern			值是一个正则表达式用于验证输入的内容，如果不匹配表单如法提交
autocomplete	输入框是否显示输入记录，值：on、off，默认值on，需要设置name才可以显示
form			可以以某个表单的ID作为值，将该表单控件与表单关联
```

### input 标签的 type 属性新增的值(新增的表单控件类型)

**旧标准 input 标签 type 属性的值：**

```html
text
password
radio
checkbox
submit
reset
button
```

#### ① 输入框类（5个）

```html
<!-- 邮箱  要求必须输入电子邮箱，否则表单提交； 如果不输入不会验证 -->
<input type="email" placeholder="请输入邮箱">

<!-- 数字 不是数字无法输入 -->
<input type="number" placeholder="请输入数字"> <br>
<!-- 设置可输入数字范围，超出表单无法提交， 如果不输入不会验证-->
<input type="number" placeholder="请输入数字" max="100" min="-20"> <br>
<!-- step属性表示数字变化幅度，默认值是1，默认只能输入整数 -->
<input type="number" step=".1">

<!-- URL 要求必须输入URL， 否则表单无法提交； 如果不输入不会验证 -->
<input type="url" placeholder="请输入网址">

<!-- 电话号码  没有验证功能，手机端会自动弹出数字键盘 -->
<input type="tel" placeholder="请输入电话号码">
        
<!-- 搜索框 没有验证功能-->
<input type="search" placeholder="请搜索...">
```

#### ② 范围选择框（1个）

```html
<!-- 拖动滑块 选择数字 默认0~100 -->
<input type="range" name="n1"> <br>
<!-- 修改所选数字的范围 -->
<input type="range" name="n2" max="50" min="-50" value="40"> <br>
<!-- step属性设置数字的变化幅度 -->
<input type="range" name="n3" max="50" min="-50" step="10">
```

#### ③ 颜色选择框（1个）

```html
<input type="color">
```

#### ④ 日期时间选择框类（5个）

```html
<!-- 选择日期 年月日 -->
<input type="date"> <br><br>
<!-- 选择年月 -->
<input type="month"> <br><br>
<!-- 选择年、第几周 --> 
<input type="week"> <br><br>
<!-- 选择时间 小时 分钟 -->
<input type="time"> <br><br>
<!-- 选择日期和时间 -->
<input type="datetime-local">
```

### form 标签新增属性

```sh
novalidate		该属性不需要值，让表单不进行验证
```

### 输入框的搜索提示

```html
<input type="text" class="text-input" list="searchData">
<datalist id="searchData">
    <option value="高小乐"></option>
    <option value="高启强"></option>
    <option value="高育良"></option>
    <option value="Hello"></option>
    <option value="Hello World"></option>
    <option value="老头乐"></option>
</datalist>
```

## HTML5 音视频

### 音视频标签

| 标签名 | 功能和语义 | 属性                                                         | 单标签还是双标签 |
| ------ | ---------- | ------------------------------------------------------------ | ---------------- |
| video  | 视频       | src：视频地址。<br>width：设置宽度。<br>height：设置高度。<br>controls：显示控制条，不需要值。<br>muted：默认静音，不需要值。<br>autoplay：自动播放，不需要值。<br>loop：循环播放，不需要值。<br>preload：预先加载，不需要值。<br>poster：设置视频封面图地址。 | 双标签           |
| audio  | 音频       | src：音频地址。<br/>controls：显示控制条，不需要值。<br/>muted：默认静音，不需要值。<br/>autoplay：自动播放，不需要值。<br/>loop：循环播放，不需要值。<br/>preload：预先加载，不需要值。 | 双标签           |
| source | 视频或音频 | src：视频或音频的地址。<br>type：视频或音频的类型<br>前边覆盖后边的属性<br>srcset:设置图片地址<br>media:设置响应式图片显示 | 单标签           |
|        |            |                                                              |                  |

### 浏览器支持的音视频格式

#### ① 视频格式

```sh
mp4
webm
ogg
```

#### ② 音频格式

```sh
mp3
wav
ogg
```

### 视频背景

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>视频背景</title>
    <style>
        body{
            margin: 0;
        }
        html,body{
            height: 100%;
        }
        .video-bg{
            width: 100%;
            height: 100%;
            /* 自动拉伸 */
            object-fit:fill;
        }
        .box{
            position: fixed;
            top: 100px;
            left: 50%;
            margin-left: -200px;
            width: 400px;
            color: #fff;
        }
    </style>
</head>
<body>
    <video src="./video/xingzhishouhuzhe.mp4" class="video-bg" muted autoplay loop></video>
    <div class="box">
        <h1>LOL</h1>
        <p></p>
    </div>
</body>
</html>
```

## HTML5 新增全局属性

| data-*          | 允许开发者在 HTML 元素中存储自定义数据               |
| --------------- | ---------------------------------------------------- |
| draggable       | 控制 HTML 元素是否可以拖动                           |
| hidden          | 隐藏 HTML 元素                                       |
| contenteditable | 使 HTML 元素可编辑                                   |
| spellcheck      | 控制 HTML 元素是否启用拼写检查                       |
| translate       | 控制 HTML 元素是否应该被翻译                         |
| tabindex        | 设置 HTML 元素在按 Tab 键时的聚焦顺序                |
| role            | 为 HTML 元素指定角色，用于描述元素在文档结构中的作用 |

**旧标准中的全局属性：**

```sh
id
class
style
name
title
lang
```

**HTML5 标准新增的全局属性**

```sh
hidden 		让元素隐藏，不需要值
```

**a 标签新增的属性：**

```sh
download	如果设置该属性，超链接点击下载目标文件，该属性不需要值。
            目标文件需要与当前文件同服务器，才有下载功能
```



## HTML5 兼容性方案

### 设置元信息

```html
<!--设置IE总是使用最新的文档模式进行渲染-->
<meta http-equiv="X-UA-Compatible" content="IE=Edge">

<!--优先使用 webkit ( Chromium ) 内核进行渲染, 针对360等壳浏览器-->
<meta name="renderer" content="webkit">
```

### html5shiv.js 

让IE8以及以下的浏览器支持H5新标签

```html
<!--[if lt ie 9]>
	<script src="../js/html5shiv.js"></script>
<![endif]-->
```

