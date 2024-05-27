# DOM 介绍

- DOM 英文全称“Document Object Model”，译为“文档对象模型”。
- DOM 是一个与平台和编程语言无关的接口，通过这个接口程序和脚本可以动态的访问和修改文档的内容、结构和样式。

**<font color="red">MDN 文档对象模型手册</font>：**https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model

##  DOM 的组成

1）**核心DOM** - 针对任何结构化文档的标准模型。

2）**XML DOM** - 针对 XML 文档的标准模型。

3）**HTML DOM** - 针对 HTML 文档的标准模型。

# document 对象

document 表示整个文档，document 是 html 元素的父节点，document 是 window 的一个属性，document 对象具有如下属性方法：

```js
documentElement		获取html根元素
body				获取body元素
head				获取head元素
all					获取到所有的元素组成的集合
title				读写标题栏标题
cookie				读写cookie信息

createElement()		
getElementById()
getElementsByTagName()
getElementsByClassName()
getElementsByName()
querySelector()
querySelectorAll()
```

## DOM 部分知识点介绍

DOM 全称 Document Object Model，译为文档对象模型。

DOM 是 HTML 文档为 JavaScript 提供的能够对 HTML 文档进行相关操作的 API。

```js
1. 获取元素  
   document.getElementById()

2. 给元素添加事件
   元素对象.oncilck = function() {};

3. 设置元素的 CSS 样式
   元素对象.style.属性名 = '值';

4. 设置元素中的文字内容
   元素对象.innerHTML = '内容';

5. 离开窗口属性
	document.hidden 	 监测用户是否离开页面 返回true/false
```



## 节点 Node

文档中的每一个部分都是节点,包括document 元素 属性 文本...

### 五大节点(Node)类型 

```js
document 	文档类型的节点 是html的父节点
element		元素类型的节点
attribute	属性类型的节点
text		文本类型的节点
comment		注释类型的节点



节点分类
document 文档节点
elementNode 元素节点
attributeNode 属性节点
textNode 文本节点
commentNode 注释节点


```

```js
// document类型的节点 document表示整个文档
console.log(document);
console.log('nodeName：', document.nodeName);
console.log('nodeValue：', document.nodeValue);
console.log('nodeType：', document.nodeType);
console.log('');


// 元素类型的节点
var ele = document.getElementById('box');
console.log(ele);
console.log('nodeName：', ele.nodeName); //元素类型节点的名称是标签名
console.log('nodeValue：', ele.nodeValue);
console.log('nodeType：', ele.nodeType);
console.log('');


// 属性类型的节点
var attr = ele.getAttributeNode('class');
console.log(attr);
console.log('nodeName：', attr.nodeName);
console.log('nodeValue：', attr.nodeValue);
console.log('nodeType：', attr.nodeType);
console.log('');


// 文本类型的节点
var text = ele.firstChild;
console.log(text);
console.log('nodeName：', text.nodeName);
console.log('nodeValue：', text.nodeValue); //控制台显示换行，html不显示换行。
console.log('nodeType：', text.nodeType);
console.log('');

// 注释类型的节点
var comment = ele.childNodes[1];
console.log(comment);
console.log('nodeName：', comment.nodeName);
console.log('nodeValue：', comment.nodeValue);
console.log('nodeType：', comment.nodeType);
```



### 节点的属性

所有的节点对象具有以下三个属性：

```js
nodeName		节点名称，元素类型节点的节点名称是标签名，返回的标签名称都是大写
tagName			标签名称，返回的标签名称都是大写
nodeValue		节点值
nodeType		节点类型 文档:9; 元素：1； 属性：2； 文本：3；  注释：8
```

document（9） element(1) attribute(2) text(3) comment(8)

# DOM 操作

## 获取元素

### ① 通过 ID 名

```js
var 元素 = document.getElementById('ID名') //返回符合条件的元素对象
```

```js
1. 返回符合条件的元素对象
2. 如果获取不到元素，返回 null
```

案例

```js
var box01 = document.getElementById('box01');
var box02 = document.getElementById('box01');
var box04 = document.getElementById('box04'); //找不到元素返回为 null
```



### ② 通过标签名

```js
// 从文档中获取所有指定标签名的元素
document.getElementsByTagName('标签名'); // 返回一个集合（类数组对象）从整个文档获取

// 从某个元素的后代中获取所有指定标签名的元素
var 元素 = document.getElementById('id名');
元素.getElementsByTagName('标签名'); // 从element的后代元素中获取
```

```js
1. 返回的是一个 HTMLCollection类型的对象，是一个伪数组，里面的成员是元素对象
2. 如果没有符合条件的元素，同样返回 HTMLCollection 对象，是个空集合
```

案例

```js
// 获取文档中所有标签名是 p 的元素
var pEles = document.getElementsByTagName('p'); //返回一个集合
// 遍历 pEle 使用循环结构
for (var i = 0; i < pEles.length; i ++) {
    pEles[i].innerHTML = '第' + i + '个段落 ' + Math.random();
}
// 获取ID是box的元素
var box = document.getElementById('box');
// 从box的后代元素中获取所有标签名是p的元素
var pEles02 = box.getElementsByTagName('p');

// 给 pEles02 中的最后一个元素 设置背景色红色
pEles02[pEles02.length-1].style.backgroundColor = '#f00';
//如果没有符合条件的元素，同样返回 HTMLCollection 对象，是个空集合
var liEles = document.getElementsByTagName('li'); 
```



### ③ 通过类名（了解，IE8 + 支持）

```js
// 从文档中获取所有指定类名的元素
document.getElementsByClassName('标签名'); // 返回一个集合（类数组对象）  从整个文档获取

// 从某个元素的后代中获取所有指定类名的元素
元素.getElementsByClassName('标签名'); // 从element的后代中获取
```

```js
1. 返回的是一个 HTMLCollection 对象，是一个伪数组，里面的成员是元素对象
2. 如果没有符合条件的元素，同样返回 HTMLCollection 对象，是个空集合
```

```js
// 从文档中获取所有类名是 item 的元素
var items = document.getElementsByClassName('item'); //返回一个 HTMLCollection集合：伪数据

// 从某个元素的后代中获取所有类名的元素
var box = document.getElementById('box');
var items02 = box.getElementsByClassName('item');

```



### ④ 通过 name 属性值 （了解）

```js
只有 document 才有 getElementsByName 方法，不能通过元素后代中选择

document.getElementsByName('name属性值'); //返回集合（NodeList 对象）  只有document才有该方法
```

```js
1. 返回的是一个 NodeList 对象，是一个伪数组，里面的成员是元素对象
2. 如果没有符合条件的元素，同样返回 NodeList 对象，是个空集合
```

```js
//返回一个NodeList 也是伪数组，和HTMLCollection很像。
var eles = document.getElementsByName('xiaole'); 
```



### ⑤ 使用 CSS 选择器获取元素 (推荐)

```js
// 从整个文档中获取
document.querySelector('CSS选择器') // 返回第一个符合条件的元素
document.querySelectorAll('CSS选择器') // 返回符合所有条件元素的集合

// 从指定元素的后代中获取
元素.querySelector('CSS选择器') // 返回第一个符合条件的元素
元素.querySelectorAll('CSS选择器') // 返回符合所有条件元素的集合
```

```js
1. querySelector() 返回符合选择器条件的第一个元素，没有符合条件的元素返回 null
2. querySelectorAll() 返回所有符合选择器条件的元素组成的集合，是 NodeList 对象，是伪数组。
```

queryselectorAll 得到的是 Nodolist 集合，它是一个伪数组，可以使用 forEach 遍历，但是 HTMLCollection 集合不可以用 forEach 遍。

案例

```js
// 从整个文档中获取 
// 获取符合选择器条件的第一个元素
var boxEle = document.querySelector('#box'); //和getElementByid效果选择的一样。
var itemEle = document.querySelector('.item'); 
// 没有就返回空集合
var itemEle = document.querySelector('.wrapper .item.active'); 
var oddEle = document.querySelector('.wrapper :nth-child(odd)');

// 获取符合选择器条件的所有元素
var itemEles = document.querySelectorAll('.wrapper .item');
var boxEles = document.querySelectorAll('#box');
var activeEles = document.querySelectorAll('p.active');

// 从指定元素的后代中获取  
var pEle = boxEle.querySelector('p');
var pEles = boxEle.querySelectorAll('p'); 
```

案例

```js
// 获取列表中复选框的集合
var checkBoxItems = document.querySelectorAll('#checkboxList input');
// 获取全选的复选框按钮
var checkAllBox = document.querySelector('#checkAllBox');

// 全选复选框按钮 监听 单击事件
checkAllBox.onclick = function() {
    // 遍历列表中所有的复选框
    checkBoxItems.forEach(function(checkBoxItem) {
        checkBoxItem.checked = checkAllBox.checked;
    });
};
```

### ⑤ jQuery$

jQuery的使用最重要的函数就是`$`

```javascript
jQuery中的$ 作用 与 document.querySelector() 类似;

$ 专门用于获取DOM元素对象，它的参数是一个选择器，返回值也是一个对象。这个对象的方法是JQuery自己设计的方法。与DOM元素的方法不一样。
// jQuery给标签添加类名hide
$('#标签id').modal('hide')

```



### ⑥ 快捷方式获取元素

```js
document.body				获取到body元素
document.head				获取到head元素
document.documentElement	获取到html元素（根元素）
document.all				获取本文档中所有的元素组成的集合
```

**使用 document.all 判断是否是 IE 浏览器：**

```js
document.all在这里是语法糖，为了解决问题专门设计的。有值正常来讲是true，但是为了共识都定为false。
if (document.all) {
    // IE10以及以下的浏览器
    document.write('您使用的是IE浏览器！');
} else {
    // IE11、EDGE、Chrome、Firefox、Safari 等等
    document.write('您使用的不是IE浏览器！');
}
```

**JS自动创建与ID同名的变量**

```js
<div id="box">叹大妙，乡九榜，就。</div>
// js中创建与ID同名的变量 变量的值对应该元素
var bos = document.getElementById('bos');
```

**HTMLCollect与NodeList区别**

```js
HTMLCollect 里的每一个成员必须都是元素，
NodeList 里的成员除了元素之外，其他类型的也可以作为成员。
```



## 文档结构

目的是为了 根据元素关系获取元素。

### 作为元素树（推荐）

```js
元素.children				获取所有的子元素，是一个 HTMLCollection 类型的对象
元素.firstElementChild		获取第一个子元素
元素.lastElementChild		获取最后一个子元素

元素.parentElement			获取元素的父元素

元素.previousElementSibling	获取紧邻的前面的一个兄弟元素
元素.nextElementSibling		获取紧邻的后面的一个兄弟元素
```

### 作为节点树

```js
节点说的是类型

作为节点树的时候，代码中的换行会被当作文本节点
```

使用方式 `元素.firstChild`

```js
元素.parentNode    父节点
元素.childNode     所有子节点的集合
元素.firstChild    第一个子节点
元素.lastChild     最后一个子节点
元素.previousSibling   上一个兄弟节点
元素.nextSibling       下一个兄弟节点
```

### 作为元素树

```js
元素说的是的标签
```

使用方式 `元素.children`

```js
parentElement  父元素
children     所有子元素的集合
firstElementChild   第一个子元素  IE9+
lastElementChild    最后一个子元素 IE9+
previousElementSibling  上一个兄弟元素
nextElementSibling    下一个兄弟元素
childElementCount    子元素的数量
ownerDocument     元素所属的文档对象（document）
```



```html
<h1>文档结果</h1>
<div id="box" class="wrapper">
    <p>而不壬归病尺你文着李国颜，才专法书，收。</p>
    <p>而不壬归病尺你文着李国颜，才专法书，收。</p>
    <p>而不壬归病尺你文着李国颜，才专法书，收。</p>
    <p>而不壬归病尺你文着李国颜，才专法书，收。</p>
    <p>而不壬归病尺你文着李国颜，才专法书，收。</p>
    <p>而不壬归病尺你文着李国颜，才专法书，收。</p>
</div>
<hr>

<script>
    // 获取id是box的元素
    var boxEle = document.querySelector('#box');

    // 获取boxEle所有的子节点
    console.log(boxEle.childNodes);
    // 获取boxEle所有的子元素
    console.log(boxEle.children);

    console.log('boxEle的第一子元素：', boxEle.firstElementChild);
    console.log('boxEle的最后一子元素：', boxEle.lastElementChild);
    console.log('boxEle的第二个子元素：', boxEle.children[1]);
    // 给第三个子元素设置样式
    boxEle.children[2].style.textDecoration = 'underline #f00 wavy';
    console.log('');
    console.log('');


    console.log('boxEle的父元素：', boxEle.parentElement);
    console.log('boxEle的父元素的父元素：', boxEle.parentElement.parentElement);
    console.log('');
    console.log('');

    console.log('上一个兄弟元素：', boxEle.previousElementSibling);
    console.log('下一个兄弟元素：', boxEle.nextElementSibling);
</script>
</body>
</html>
```



## 元素的属性操作

### 读写元素（标签）的内置属性

标准中所规定的标签上的属性会映射成js元素对象上的属性，称为内置属性

```js
//读取元素属性
元素对象.属性名;
//修改元素属性
元素对象.属性名 = 新值;
```

```js
1. 标准中所规定的标签上的属性会映射成js元素对象上的属性，称为内置属性
2. html标签中不需要设置值的属性，对应的js元素对象的属性值是布尔值
```

读取表单form标签中的数值(仅支持在form标签中使用)

```javascript
1. 首先在html页面中 在表单标签中设置 name 属性
<form name="adminForm" id="addAdminForm"> </form>
2. JS 获取表单数据,直接使用document.[name].[].value 就可以得到表单中的数据
const passWord = document.adminForm.passWord.value.trim();
```



### 读写设置在标签代码上的属性

标签自定义的属性，内置属性不存在的。

```js
元素对象.getAttribute('属性名');		// 读取设置在标签代码上的属性（不区分内置属性和自定义属性）
元素对象.setAttribute('属性名', '值'); // 将属性值设置在标签的文档结构中，如果不存在属性会自动添加
```

### `data-*` 形式的自定义属性

w3c设计的规范可以使用自定义属性

如果在html中设置自定义属性名为标准形式`data-home-address=""`，则在JS语法中使用属性名就不需要带 `data-`前缀，`data-`后的`home-address`中的"-",会自动映射成小驼峰的形式，如`imgEle.dataset.homeAddress;`。

```html
<img data-loadpic="" data-home-address="">
```

```js
imgEle.dataset.loadpic;  // 可读可写
imgEle.dataset.homeAddress; // 可读可写 自动转为小驼峰
```



## 元素的样式的操作

### 读写行内样式

```js
// 只能读取设置在行内的样式
元素对象.style.属性名;
元素对象.style.color;
元素对象.style.backgroundColor;

// 设置样式 如果行内设置过修改，如果行内没有添加
元素对象.style.属性名 = 新值;
元素对象.style.color = '#f00';
元素对象.style.backgroundColor = '#099';
```

### 读取计算样式

**计算样式：** 最终作用在元素上的样式，即使没有设置也有默认样式。只能读取不能设置。

getcomputedStyle(元素) 是 window 的属性

返回值是元素的全部属性叠加后的对象，然后通过对象.后的子属性拿到对应的属性，如果是设置属性。使用行内设置属性。



```js
// 返回由计算样式组成的对象
getComputedStyle(元素);

var computedStyle = getComputedStyle(box);
console.log(computedStyle.background);
console.log(computedStyle.backgroundColor);

console.log(getComputedStyle(box).backgroundColor);
console.log(getComputedStyle(box).fontSize);


```

```js
/**
 * 获取元素的计算属性
 * @param Elment ele 元素
 * @param String attr css属性名
 * @param String 计算属性值
 */

function getStyle(ele, attr) {
    if (window.getComputedStyle) {
       return  getComputedStyle(ele)[attr];
    } else {
       return ele.currentStyle[attr];
    }  
}
```



### 操作元素的类名

#### ① className

```js
元素对象.className 对应标签上的 class 属性，由于class是一个关键字所以无法使用。
```

#### ② classList

```js
元素对象.classList 可以得到管理类名的对象，该对象有如下方法：
add()		添加一个类名
remove()    删除一个类名
contains()	判断是否包含指定的类名
toggle()	切换类名，如果存在类名删除，如果没有类名添加
```

### 读写元素的文本内容（可读可写）

```js
元素对象.innerHTML		读写内部的html代码和文本内容
元素对象.outerHTML		读写包括元素自身在内的html代码和文本内容
元素对象.innerText		读写内部的文本内容，会剔除掉标签
元素对象.textContent	读写内部的文本内容，会剔除掉标签，读取的值保留空格
```



### 读取元素的尺寸（只读）

```js
元素对象.offsetWidth / 元素对象.offsetHeight	获取元素的总宽总高 内容+内边距+边框
元素对象.clientWidth / 元素对象.clientHeight    获取元素宽高，内容+内边距
元素对象.scrollWidth / 元素对象.scrollHeight	获取元素宽高，client加上溢出的部分


元素对象.getBoundingClientRect() 返回对象，对象包含元素的位置和尺寸信息，对象有如下属性：
元素对象.getBoundingClientRect().width	 同offsetWidth
元素对象.getBoundingClientRect().height  同offsetHeihgt
```

设置元素的尺寸 用CSS设置 `.style`

### 获取视口的尺寸

```js
// 会包括滚动条本身的宽度
window.innerWidth
window.innerHeight

// 不会包括滚动条本身的宽度 语法糖 = 特殊情况解决特殊问题设计的，使用HTML根元素.clientWidth
document.documentElenment.clientWidth
document.documentElenment.clientHeight
```



### 读取元素的位置 （只读）

```js
//获取元素在第一个定位的祖先元素上的位置（祖先元素没有定位的，参照整个页面），不包含外边距和边框，在祖先元素内边距中
元素对象.offsetLeft / 元素对象.offsetTop

//获取元素的左边框宽度、上边框宽度
元素对象.clientLeft / 元素对象.clientTop 

//元素对象.getBoundingClientRect() 返回对象，对象包含元素的位置（参照视口）和尺寸信息，对象有如下属性：
坐标以视口的左上角为原点
left		读取元素在视口上到位置x坐标
top			读取元素在视口上到位置y坐标
x			同 left
y			共 top
right		元素右边的x坐标
bottom		元素底部的y坐标
```

页面与视口的区别

![image-20240313112142364](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240313112142364.png)

视口是浏览器窗口的宽度，由用户自行设置。元素在页面上，页面在视口的滚动，元素在页面上的位置不会发生变化，元素在视口上的位置会发生变化。

图片延迟加载案例

```js
事件 window监听事件
```

### onscroll事件

```js
滑动事件
window.onscroll
```



### 读写元素中内容滚动的位置（可读可写）

```js
元素.scrollLeft		内容在元素中向左滚动的距离
元素.scrollTop		内容在元素中向上滚动的距离
```

> **注意：** 需要设置元素 overflow 的值不是 visible.

**读写整个页面在视口中滚动的位置：**

```js
document.documentElenment : HTML 根元素 特殊情况 可以替代 视口
document.documentElement.scrollLeft
document.documentElement.scrollTop
```

![image-20240313115746380](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240313115746380.png)

## 元素节点的添加/删除/替换/克隆

### 创建元素节点

```js
document.createElement('标签名');
```

### 添加子节点

```js
父元素.appendChild(新元素); //在最后添加
父元素.insertBefore(新元素， 旧元素); //在旧元素的后边
```

### 删除子节点

```js
父元素.removeChild(要删除元素);
```

### 替换子节点

```js
父元素.replaceChild(新元素， 旧元素);
```

### 克隆节点

```js
元素.cloneNode(true)  返回克隆后的元素 参数设置为true表示元素和里面的内容一起克隆
```

案例 标题滚动

```js
// 设置网站标题内容
document.title = '【您有一条新消息】澳门最大的线上赌场上线了，性感荷官在线发牌';
// 设置定时器
setInterval(function() {
    document.title = document.title.slice(1) + document.title[0];
}, 300);
```

点名器案例

```js
<style>
.wrapper {
    margin: 100px auto;
    width: 400px;
    text-align: center;
}
#box {
    line-height: 150px;
    font-size: 80px;
}
#btn {
    width: 200px;
    height: 80px;
    font-size: 40px;
    border: none;
}
</style>

<body>
<div class="wrapper">
    <div id="box">随机点名器</div>
 	<button id="btn">开始</button>
</div>

<script>
(function() {
    // 定义数组 包含姓名列表
    var nameList = ['曹操', '尉迟敬德', '秦琼'];
    // 获取元素
    var box = document.querySelector('#box');
    var btn = document.querySelector('#btn');
    var intervalId = null;
    // 点击按钮的事件
    btn.onclick = function() {
    // 判断按钮上的文字
    if (btn.innerHTML === '停止') {
    // 停止定时器
    clearInterval(intervalId);
    // 修改按钮上的文字
     btn.innerHTML = '继续';
     } else {
     // 开启定时器
     intervalId = setInterval(function() {
     // 随机从数组取出一个元素 作为box的内容
      box.innerHTML = nameList[Math.floor(Math.random() * nameList.length)];
      }, 100);
      // 修改按钮上的文字
       btn.innerHTML = '停止';
      }
     }
})();
</script>
```

选项卡案例

```js
<style>
    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

.tab {
    margin: 100px auto;
    width: 800px;
}

.tab-nav {
    display: flex;
    height: 40px;
    line-height: 40px;
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
}

.tab-nav li {
    padding: 0 20px;
    background: #f5f5f5;
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
}

.tab-nav li.active {
    /*把上边框遮盖住了*/
    height: 40px;
    background: #fff;
}

.tab-content li {
    display: none;
    min-height: 200px;
    padding: 20px;
    border: 1px solid #ccc;
    border-top: none;
}

.tab-content li.active {
    display: block;
}
</style>

<div class="tab">
    <ul class="tab-nav">
        <li class="active">未付款订单</li>
<li>未发货订单</li>
<li>未收货订单</li>
<li>未评价订单</li>
<li>已完成订单</li>
</ul>
<ul class="tab-content">
    <li class="active">这是未付款订单</li>
<li>这是未发货订单</li>
<li>这是未收货订单</li>
<li>这是未评价订单</li>
<li>这是已完成订单</li>
</ul>
</div>

    (function() {
        // 获取元素
        var tabNavItems = document.querySelectorAll('.tab-nav li');
        var tabContentItems = document.querySelectorAll('.tab-content li');
        // 遍历选项卡导航 每一个添加单击事件
        tabNavItems.forEach(function(tabNavItem, index) {
            tabNavItem.onclick = function() {
                // 排他
                // 把所有的tabNav都取消选中  把所有的tabContent隐藏
                for (var i = 0; i < tabNavItems.length; i ++) {
                    tabNavItems[i].classList.remove('active');
                    tabContentItems[i].classList.remove('active');
                }
                // 当前点击添加 active 类名 表示当前选中
                tabNavItem.classList.add('active');
                // 与当前tabNav对应的tabContent要显示出来
                tabContentItems[index].classList.add('active');
            }
        });
    })()
```

# HTML DOM

## 表单相关元素

#### ① form 元素

```js
length		获取该表单中表单控件的数量
elements    获取该表单中表单控件元素的集合 挑选出来了 返回的对象是HTMLformCollection

submit()	执行该方法表单会提交
reset()     执行该方法表单会重置
```

#### ② 文本输入框类和文本域（input 和 textarea）

```js
blur()		执行该方法会失去焦点
focus()		执行该方法会获取焦点
select()	执行该方法会选中里面的文字
```

#### ③ select 元素

```js
length				获取到选项的数量
options				获取到所有选项元素的集合
selectedIndex		获取当前被选中的选项的索引

add(option元素)		添加一个新的选项
remove(选项的索引)	  删除指定索引的选项
blur()				 执行该方法会失去焦点
focus()				 执行该方法会获取焦点
```

**快速创建 option 元素的方式：**

```js
new Option('内容'， 'value值')
```

**使用 document.表单内元素name属性值 快速得到 表单内的元素对象**

```javascript
使用的前提是 form表单的name唯一，如果不唯一，则得到的是一个数组  
document.formName[0]

可以一直使用"."获取里层的元素的对象,同样使用name属性值
document.formName.inputName..value

以上仅仅在表单元素控件内才可以使用

提交表单内的所有数据
document.formName.submit();
```



## 表格相关元素 

#### ① table 元素

```js
rows			获取所有行元素的集合tr的集合

insertRow(索引)	添加一行，如果不设置参数添加到最后，返回一个tr
deleteRow(索引)	删除一行
```

#### ② tableRow 元素（tr 元素）

```js
rowIndex		本行的索引
cells			获取本行中单元格元素的集合

insertCell(索引)	添加一个单元格，，如果不设置参数添加到最后 返回一个td，
设置内容insertCell.innerHTML = ;
deleteCell(索引)	删除一个单元格
```

#### ③ tableCell 元素 （td 或 th）

```js
cellIndex		本单元格的索引（同一行内）
```

## 快速创建 img 元素

```js
new Image(); 创建的时候可以指定宽高 200 100
new Image(width, height);
```

# DOM 对象深入分析

## 元素对象的原型链关系

```js
div元素对象 -> HTMLDivElement.prototype -> HTMlElement.prototype -> Element.prototype -> Node.prototype -> EventTarget.prototype -> Object.prototype
```

##  事件对象的原型链关系

以鼠标事件对象为例：

```js
鼠标事件对象 -> MouseEvent.prototype -> UIEvent.prototype -> Event.prototype -> Object.prototype
```

## HTMLCollection 和 NodeList 的区别

这两种都是集合

### ① HTMLCollection 对象

```js
1. 能够返回HTMLCollection 对象的属性和方法： 
getElementsByTagName()、getElementsByClassName()、children（得到所有子元素）
2. HTMLCollection 对象的成员只能是元素类型对象 
3. 没有 forEach 方法
4. 是动态的集合，如果文档中新增了满足条件的元素，集合会自动更新
```

### ② NodeList

```js
1. 能够返回 NodeList 对象的属性和方法： 
querySelectorAll()、getElementsByName()、childNodes:（得到所有子节点）
2. NodeList 对象的成员可以是节点类型的对象（包括元素类型、document 等）
3. 具有 forEach 方法
4. 静态的集合
```

# 

