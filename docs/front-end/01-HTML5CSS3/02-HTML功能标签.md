## 开发文档

W3C 官网：  https://html.spec.whatwg.org/multipage/

W3Cscholl：https://www.w3cschool.cn/htmltags/

MDN: https://developer.mozilla.org/zh-CN/docs/Web/HTML

## 排版标签

| 标签名  | 语义和功能           | 属性 | 单标签还是双标签 |
| ------- | -------------------- | ---- | ---------------- |
| h1 ~ h6 | 一级标题~六级标题    | 无   | 双标签           |
| p       | 段落                 | 无   | 双标签           |
| hr      | 分隔线               | 无   | 单标签           |
| br      | 换行                 | 无   | 单标签           |
| pre     | 原格式显示           | 无   | 双标签           |
| div     | 无语义，用于页面布局 | 无   | 双标签           |

## 主体结构标签

| 标签名 | 语义和功能 | 属性 | 单标签还是双标签 |
| ------ | ---------- | ---- | ---------------- |
| html   | 根元素     |      | 双标签           |
| head   | 头         |      | 双标签           |
| body   | 主体       |      | 双标签           |

### HEAD 中的标签

| 标签名 | 语义和功能     | 属性                                  | 单标签还是双标签 |
| ------ | -------------- | ------------------------------------- | ---------------- |
| meta   | 设置页面元信息 | charset: 设置字符集编码，值推荐 utf-8 | 单标签           |
| title  | 标题栏标题     |                                       | 双标签           |

## 文本标签

| 标签名 | 语义和功能                     | 属性 | 单标签还是双标签 |
| ------ | ------------------------------ | ---- | ---------------- |
| em     | 强调，默认表现斜体字           | 无   | 双标签           |
| strong | 强调，默认表现粗体字           | 无   | 双标签           |
| ins    | 表示增加的内容，默认添加下划线 | 无   | 双标签           |
| del    | 表示删除的内容，默认添加删除线 | 无   | 双标签           |
| sub    | 下标字                         | 无   | 双标签           |
| sup    | 上标字                         | 无   | 双标签           |
| span   | 无语义，配合CSS给文字设置样式  | 无   | 双标签           |

```html
以下文本标签  作为了解

<cite>    		用于引证、举例、(标签定义作品（比如书籍、歌曲、电影、电视节目、绘画、雕塑等等）的标题)通				 常为斜体字
<dfn> 	  		定义一个定义项目
<code> 	  		定义计算机代码文本
<samp>    		定义样式文本 标签并不经常使用。只有在要从正常的上下文中将某些短字符序列提取出来，对它们				加以强调的极少情况下，才使用这个标签。
<kbd>     		定义键盘文本。它表示文本是从键盘上键入的。它经常用在与计算机相关的文档或手册中。
<abbr>    		定义缩写 配合title属性  (IE6以上)
<bdo>     		来覆盖默认的文本方向 dir属性 值: lrt  rtl
<var>     		定义变量。您可以将此标签与 <pre> 及 <code> 标签配合使用。
<small>   		标签定义小型文本（和旁注）
<b>       		粗体字标签 根据 HTML 5 的规范，<b> 标签应该做为最后的选择，只有在没有其他标记比较合适				 时才使用它。
<i>       		斜体字标签 标签被用来表示科技术语、其他语种的成语俗语、想法、宇宙飞船的名字等等。
<u>       		下划线字体标签 标签定义与常规文本风格不同的文本，像拼写错误的单词或者汉语中的专有名词。 				 请尽量避免使用该标签为文本加下划线，用户会把它混淆为一个超链接。
<q>       		签定义一个短的引用。浏览器经常会在这种引用的周围插入引号。(小段文字)
<blockquote> 	标签定义摘自另一个源的块引用。浏览器通常会对 <blockquote> 元素进行缩进。(大段文字) 				  (块状元素)
<address>    	定义地址 通常为斜体 (注意非通讯地址)  块状元素
<font>     		H5已删除 字体标签，可以通过标签的属性指定文字的大小、颜色及字体等信息
<tt>       		H5已删除 打字机文字
<big>      		H5已删除 大型字体标签
<strike>   		H5已删除 添加删除线
<acronym>  		H5已删除 首字母缩写 请使用<abbr>代替
```

##  图片标签

### img 标签

| 标签名 | 语义和功能 | 属性                                                         | 单标签还是双标签 |
| ------ | ---------- | ------------------------------------------------------------ | ---------------- |
| img    | 引入图片   | src：设置图片地址。<br>alt：设置图片替代文字。<br>width：设置宽度。<br>height：设置高度 | 单标签           |

**总结：**

```
1. alt 设置图片替代文字，当图片无法正常显示，显示alt中的文字
2. 如果单独设置宽度或者高度，另一个方向根据比例自动计算。同时设置宽高容易导致图片拉伸失真。
```

### 常见的图片格式

```
jpg / jpeg
png
gif
bmp
webp
...
```

### base64 图片

```
1. 本质：一串特殊的文本，要通过浏览器打开，传统看图应用通常无法打开。
2. 原理：把图片进行 base64 编码，形成一串文本。
3. 如何生成：靠一些工具或网站。
4. 如何使用：直接作为 img 标签的 src 属性的值即可，并且不受文件位置的影响。
5. 使用场景：一些较小的图片，或者需要和网页一起加载的图片。
```

base64编码工具： https://tool.chinaz.com/tools/imgtobase/

## 相对路径和绝对路径

**当前文件：** html代码所在的文件

**目标文件：** 被引用的文件

### 绝对路径

**网络绝对路径：** 目标文字在万维网上的绝对地址，如  `https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png`，前端开发主要使用网络绝对路径。

**本地绝对路径：** 目标文字在计算上的绝对地址, 如 `D:\Library\SH230320\Day02_HTML\课堂案例\02-图片标签\铭哥工作照.jpg`，后端开发主要使用本地绝对路径。

### 相对路径

```
./		当前目录（当前文件所在的目录）， ./可以省略
        如果目标文件在同级或者下级
        
../     上级目录（当前文件的上级目录）
        如果目标文件在上级或者先进入上级再访问所在目录
        
../../  上上级
../../../ 上上上级
```

### HTML 中使用路径的场景

```
1. img 标签引入图片
2. 超链接设置目标文件
3. video 标签引入视频
4. audio 标签引入音频
5. iframe 标签引入各种类型的文件
6. link 标签关联 css 文件
7. script 标签引入 js 文件
...
```



## 超链接和锚点

###  a 标签

| 标签名 | 语义和功能 | 属性                                                         | 单标签还是双标签 |
| ------ | ---------- | ------------------------------------------------------------ | ---------------- |
| a      | 超链接     | href：设置目标文件地址。<br>target：设置目标文件在哪个窗口打开 | 双标签           |

**总结：**

```
target 属性设置目标文件在哪个窗口打开，默认值是 _self,表示本窗口打开；可以设置为 _blank, 表示新窗口打开
```

###  超链接

####  目标文件是网页

```html
<a href="https://www.163.com/news/article/I0ELH95T000189FH.html">一篇新闻</a> <br>
<a href="../03-相对路径练习/pages/index.html">相对路径练习</a>
```

#### 目标文件是网页以外的其他类型文件

```html
<a href="./resouces/小乐老师的业余生活.jpg">[图片]小乐老师的业余生活</a> <br>
<a href="./resouces/如何30岁之前走上人生巅峰.pdf">[pdf]如何30岁之前走上人生巅峰</a> <br>
<a href="./resouces/小乐老师的性福生活.mp4">[视频]小乐老师的性福生活</a> <br>
<a href="./resouces/如何拥有百亿资产.docx">[word文件]如何拥有百亿资产</a> <br>
<a href="./resouces/小乐老师的私房照片.7z">[压缩文件]小乐老师的私房照片</a>
```

```
目标文件分为两种：
浏览器能够打开： 点击超链接，浏览器直接打开，如网页文件、图片文件、视频文件、pdf文件等
浏览器无法打开： 点击超链接，直接下载
```

####  超链接唤起指定应用

```html
<a href="tel:10086">打电话</a> <br>
<a href="sms:10010">发短信</a> <br>
<a href="mailto:fuming@atguigu.cn">发邮件</a>
```

####  href 的值是空的点击刷新

```html
<a href="">刷新</a>
```

### 锚点

####  如何设置锚点

```
给标签设置一个ID属性，该标签就成为一个锚点，ID的属性值就是锚点的名字
```

```html
<div id="锚点名"></div>
<p id="锚点名"></p>
<hr id="锚点名">
```

####  如何跳转到锚点（通过超链接跳转到锚点）

```html
<!-- 跳转到本页面的锚点 -->
<a href="#锚点名"></a>

<!-- 跳转到其他页面的锚点 -->
<a href="页面地址#锚点名"></a>

<!-- 跳转到页面顶部 -->
<a href="#"></a>
```

## 列表标签

### 无序列表

```html
文字无序列表：
<ul>
      <li>HTML 超文本标记语言</li>
      <li>CSS 层叠样式表</li>
      <li>JavaScript 浏览器端脚本语言</li>
</ul>

超链接无序列表：
<ul>
     <li>
         <a href="#">感悟习近平主席俄罗斯之行的“历史逻辑”</a>
     </li>
     <li>
         <a href="#">携手向未来！习近平谈构建人类命运共同体</a>
     </li>
     <li>
         <a href="#">镜观·领航｜命运与共 携手建设更加美好的世界</a>
     </li>
     <li>
         <a href="#">总台“中国式现代化与世界新机遇”阿联酋专场研讨会在阿布扎比成功举办</a>
     </li>
</ul>

嵌套无序列表：
 <ul>
     <li>
         <a href="#">首页</a>
     </li>
     <li>
         <a href="#">论坛</a>
     </li>
     <li>
         <a href="#">关于我们</a>
         <ul>
             <li>
                 <a href="#">联系我们</a>
             </li>
             <li>
                 <a href="#">加入我们</a>
             </li>
             <li>
                 <a href="#">举报我们</a>
             </li>
         </ul>
     </li>
     <li>
         <a href="#">商城</a>
     </li>
     <li>
         <a href="#">博客</a>
     </li>
</ul>
```

> 无序列表可以用于表示一组相关的内容，如新闻列表、文章列表、商品列表、导航 等

### 有序列表

```html
<ol>
    <li>高小乐</li>
    <li>比尔盖茨</li>
    <li>巴菲特</li>
    <li>索罗斯</li>
    <li>马云</li>
</ol>
```

> 有序列表可以用于排序类的列表，如排行榜等。

### 自定义列表

```html
<!-- 
	一个dt对应一个dd
-->
<dl>
    <dt>HTML</dt>
    <dd>超文本标记语言</dd>
    <dt>CSS</dt>
    <dd>层叠样式表</dd>
    <dt>JavaScript</dt>
    <dd>浏览器端脚本语言</dd>
</dl>

<!-- 
	一个dt对应多个dd 
-->
<dl>
    <dt>如何掌握一个HTML标签？</dt>
    <dd>该标签的语义功能</dd>
    <dd>该标签的属性以及属性值如何设置</dd>
    <dd>该标签是单标签还是双标签</dd>
</dl>
```

###  列表标签总结

| 标签名 | 功能和语义       | 属性 | 单标签还是双标签 |
| ------ | ---------------- | ---- | ---------------- |
| ul     | 无序列表包裹元素 |      | 双标签           |
| ol     | 有序列表包裹元素 |      | 双标签           |
| li     | 列表项           |      | 双标签           |
| dl     | 定义列表包裹元素 |      | 双标签           |
| dt     | 定义列表项标题   |      | 双标签           |
| dd     | 定义列表项描述   |      | 双标签           |

**注意：**

```
li 必须被 ul 或者 ol 直接包裹!
```

## 表格标签

### 表格的结构

```html
table
	caption
	thead
		tr
			td/th
			....
		tr
		...
	tbody
		tr
			td/th
			...
		tr
		...
	tfoot
		tr
			td/th
			...
		tr
		...
```

```html
<table border="1">
    <!-- 表格标题 -->
    <caption>用户信息表</caption>
    <!-- 表格头 -->
    <thead>
        <tr>
            <th>序号</th>
            <th>姓名</th>
            <th>性别</th>
            <th>电话</th>
            <th>地址</th>
        </tr>
    </thead>
    <!-- 表格体 -->
    <tbody>
        <tr>
            <td>1</td>
            <td>曹操</td>
            <td>男</td>
            <td>13378652389</td>
            <td>上海市松江区</td>
        </tr>
        <tr>
            <td>2</td>
            <td>刘备</td>
            <td>男</td>
            <td>13378652388</td>
            <td>上海市浦东区</td>
        </tr>
        <tr>
            <td>3</td>
            <td>高小乐</td>
            <td>男</td>
            <td>13378652387</td>
            <td>上海市松江区</td>
        </tr>
        <tr>
            <td>4</td>
            <td>孙悟空</td>
            <td>男</td>
            <td>13378652386</td>
            <td>上海市黄浦区</td>
        </tr>
    </tbody>
    <!-- 表格脚 -->
    <tfoot></tfoot>
</table>
```

### 表格整体样式设置

给 table 标签设置如下属性：

```
width： 	设置宽度
height:  设置高度
cellspacing： 设置单元格之间的间距
cellpadding： 设置单元格内补白（边框与内容的间距）
border： 设置边框边框
```

### 设置单元格宽高

给 td、th 设置 width 和 height 属性：

```
给 td、th 设置 width 相当于设置列宽
给 td、th 设置 height 相当于设置行高 
```

给 tr 和 td 设置 height 有什么区别：

```
给 th、td 设置height，实际行高会在设置的高度的基础上加上上下的 cellpadding
给 tr 设置 height 就是总行高
```

### 设置单元格中内容对齐方式

**设置单元格内容横向对齐方式：**

```
给 thead、tbody、tfoot 设置 align 属性，属性的值： left、right、center，所包裹的单元格都会生效
给 tr 设置 align 属性，属性的值： left、right、center，所包裹的单元格都会生效
给 td、th 设置 align 属性，属性的值： left、right、center，本单元格会生效
```

**设置单元格内容纵向对齐方式：**

```
给 thead、tbody、tfoot 设置 valign 属性，属性的值： top、bottom、middle，所包裹的单元格都会生效
给 tr 设置 valign 属性，属性的值： top、bottom、middle，所包裹的单元格都会生效
给td、th 设置 valign 属性，属性的值： top、bottom、middle，本单元格会生效
```

### 单元格跨行和跨列（重要）

给 td、th 设置属性：

```
rowspan： 设置所跨行数
colspan： 设置所跨列数
```

### 表格标签总结

| 标签名  | 功能和语义   | 属性                                                         | 单标签还是双标签 |
| ------- | ------------ | ------------------------------------------------------------ | ---------------- |
| table   | 表格包裹元素 | width<br>height<br>cellspacing<br>cellpadding<br>border      | 双标签           |
| caption | 表格标题     |                                                              | 双标签           |
| thead   | 表格头       | align<br>valign                                              | 双标签           |
| tbody   | 表格体       | align<br/>valign                                             | 双标签           |
| tfoot   | 表格脚       | align<br/>valign                                             | 双标签           |
| tr      | 行           | height<br>align<br/>valign                                   | 双标签           |
| td      | 单元格       | width<br>height<br>align<br/>valign<br>colspan<br>rowspan    | 双标签           |
| th      | 表头单元格   | width<br/>height<br/>align<br/>valign<br/>colspan<br/>rowspan | 双标签           |

##  表单

### 表单总体设置

```html
<form action="http://www.baidu.com/s" target="_blank">
     <input type="text" name="wd">
     <button>搜索</button>
</form>
```

### 表单控件

#### 文本输入框

```html
<input type="text"> <br>

<!-- type 属性的默认值就是 text -->
<input> <br>

<!-- maxlength 可以限制最大输入长度 -->
<input type="text" maxlength="10">
```

#### 密码输入框

```html
<input type="password"> <br>
<input type="password" maxlength="6">
```

#### 单选框

```html
 <input type="radio" name="gender">男
<input type="radio" name="gender">女
<input type="radio" name="gender" checked>其他
```

```
1. 多个单选框要实现单选效果，需要设置相同的 name 属性值
2. 设置 checked 属性可以实现默认选中，该属性不需要值 
```

#### 复选框

```html
<input type="checkbox">唱
<input type="checkbox">跳
<input type="checkbox" checked>RAP
<input type="checkbox">打篮球
<input type="checkbox" checked>敲代码
```

```
设置 checked 属性可以实现默认选中，该属性不需要值 
```

#### 提交按钮

```html
<input type="submit">
<input type="submit" value="免费注册">
<button type="submit">提交</button>
<button>登录</button>
```

#### 重置按钮

```html
<input type="reset">
<button type="reset">重置</button>
```

#### 普通按钮

```html
<input type="button" value="普通按钮01">
<button type="button">普通按钮02</button>
```

#### 文本域

```html
<textarea rows="10" cols="60"></textarea>
```

```
rows 设置默认显示的行数，影响高度
cols 设置默认显示的列数，影响宽度
```

#### 下拉选项

```html
<select>
    <option>江苏省</option>
    <option>安徽省</option>
    <option>河南省</option>
    <option selected>新疆维吾尔自治区</option>
    <option>内蒙古自治区</option>
    <option>广西壮族自治区</option>
</select>
```

```
默认选中的是第一个选项，可以使用 selected 设置默认选项
```

### 表单控件的属性

#### name 属性

```
1. name 用于给表单控件设置标识，与后端对应
2. 多个单选框要实现单选效果需要设置相同的 name
3. 下拉选项需要将 name 设置到 select 上
4. 提交按钮、重置按钮、普通按钮不要设置 name 属性
```

#### value 属性

```
1. 文本输入框、密码输入框，value 可以设置默认显示的内容
2. 单选框、复选框，value 设置真正提交的数据
3. input 实现的提交按钮、重置按钮、普通按钮，value 设置按钮上的文字
4. button 和 textarea 不需要 value 双标签不需要设置value值
5. 下拉选项option可以使用value设置真正提交的数据，如果没有设置value，双标签中的文字作为提交的数据
```

#### disabled 属性

```
1. 表单控件设置 disabled 属性将变为不可用
2. disabled 属性不需要值
3. select 设置disable 属性整个下拉选项不可用；option 设置 disabled 属性该选项不可选。
```

### label 标签的使用

```html
<!-- 使用label关联描述文字和输入框 -->
<label for="usernameInp">用户名：</label>
<input type="text" id="usernameInp">

<!-- 使用label关联选择框 单选框、复选框 -->
<label>
    <input type="radio" name="gender">男
</label>
<label>
    <input type="radio" name="gender">女
</label>
```

### fieldset 和 legend 标签

```html
<form>
    <fieldset>
        <legend>标题内容</legend>
        各种表单控件...
    </fieldset>
</form>
```

### 表单标签总结

| 标签名   | 语义和功能                         | 属性                                                         | 单标签和双标签 |
| -------- | ---------------------------------- | ------------------------------------------------------------ | -------------- |
| form     | 表单包裹元素                       | action：设置表单提交地址。<br>target：设置提交地址从那个窗口打开 | 双标签         |
| input    | 各种类型的表单控件                 | type：表单控件类型。<br>maxlength：最大可输入长度。<br>checked：设置默认选中。<br>name：表单控件标识。<br>value：表单控件的值。<br>disabled：设置为不可用。 | 单标签         |
| button   | 各种类型的按钮                     | type：按钮类型。<br>disabled：设置为不可用。                 | 双标签         |
| textarea | 文本域                             | rows: 默认显示的行数。<br>cols：默认显示的列数。<br>name：表单控件标识。<br/>disabled：设置为不可用。 | 双标签         |
| select   | 下拉选项包裹元素                   | name：表单控件标识。<br/>disabled：设置为不可用。            | 双标签         |
| option   | 下拉的选项                         | value：表单控件的值。<br/>selected：设置默认选中<br>disabled：设置为不可用。 | 双标签         |
| label    | 用于关联表单控件                   | for：表单控件的id                                            | 双标签         |
| fieldset | 设置外围的边框                     | 无                                                           | 双标签         |
| legend   | 设置表单标题<br>需要与fieldset配合 | 无                                                           | 双标签         |

```js
input 标签的 type 属性值有 text、password、radio、checkbox、submit、reset、button， 默认值 text
button 标签的 type 属性值有 submit、reset、button，默认值 submit
```



## 内联框架标签

| 标签名 | 功能和语义                               | 属性                                                         | 单标签还是双标签 |
| ------ | ---------------------------------------- | ------------------------------------------------------------ | ---------------- |
| iframe | 内联框架<br>将各种类型的文件引入当前页面 | src: 设置目标文件地址。<br>frameborder：设置是否有边框，0表示没有，其他数字表示有。<br>width：设置宽度。<br>height：设置高度。 | 双标签           |

```html
<h3>iframe</h3>
    <a href="http://www.baidu.com" target="xiaole">百度</a>
    <a href="http://www.so.com/s" target="xiaole">360搜索</a>
    <br>

    <form action="http://www.so.com/s" target="xiaole">
        <input type="text" name="q">
        <button>搜索</button>
    </form>
    <iframe src="" frameborder="0" width="1000" height="500" name="xiaole"></iframe>
```


