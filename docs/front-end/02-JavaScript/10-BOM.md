# BOM

BOM 全称 Browser Object Model，译为浏览器对象模型。

BOM 是浏览器为 JavaScript 提供的能够对浏览器进行相关操作的 API。

## BOM 的作用

1）弹出新浏览器窗口的能力。

2）移动、关闭和更改浏览器窗口大小的能力。

3）可提供WEB浏览器详细信息的导航对象。

4）可提供浏览器载入页面详细信息的本地对象。

5）可提供用户屏幕分辨率详细信息的屏幕对象；

6）支持Cookies。

## BOM 对象

浏览器对象模型提供了独立于内容的、可以与浏览器窗口进行互动的对象结构，一共有 5 个对象：

1）window

2）location

3）history

4）navigator

5）screen

## window对象

window 表示浏览器窗口，打开页面的时候会自动创建； 运行在浏览器上的 JS，window 是全局对象， 所有的全局变量都是 window 的属性，使用 window 的属性可以省略 `window.`。

BOM 的核心对象是 window，它表示浏览器的一个实例。

在浏览器中，window 对象有双重角色，它既是通过 JavaScript 访问浏览器窗口的一个接口，又是 ECMAScript 规定的 Global 对象。

所有在全局作用域中声明的变量、函数都会变成 window 对象的属性和方法。

其他的 4 个 BOM 对象也都是 window 的属性。

> **注意：**使用 window 对象的属性或方法的时候，通常可以省略 window。

### 属性

| 属性名      | 属性含义                                   |
| ----------- | ------------------------------------------ |
| name        | 获取/设置窗口的名称。                      |
| innerWidth  | 获得浏览器窗口的内容区域的宽度。（只读）   |
| innerHeight | 获得浏览器窗口的内容区域的高度。（只读）   |
| document    | 对当前窗口所包含文档对象的引用。（只读）   |
| location    | 获取、设置 location 对象, 或者当前的 URL。 |
| history     | 对 history 对象的引用。（只读）            |
| navigator   | 对 navigator 对象的引用。（只读）          |
| screen      | 对 screen 对象的引用。（只读）             |

### 方法

| 方法名          | 方法含义                                                     |
| --------------- | ------------------------------------------------------------ |
| alert()         | 显示带有一段消息和一个确认按钮的警告框。                     |
| confirm()       | 显示带有一段消息以及确认按钮和取消按钮的对话框。             |
| prompt()        | 显示可提示用户输入的对话框。                                 |
| open()          | 打开一个新的浏览器窗口或查找一个已命名的窗口。 `window.open(strUrl, strWindowName, [strWindowFeatures]);` |
| close()         | 关闭浏览器窗口。只有open() 方法打开的窗口才可以用 close() 关闭。 |
| print()         | 打印当前窗口的内容。                                         |
| scrollTo()      | 滚动到文档中的某个坐标。                                     |
| scrollBy()      | 在窗口中按指定的偏移量滚动文档。                             |
| setTimeout()    | 单次定时                                                     |
| clearTimeout()  | 取消单次定时                                                 |
| setInterval()   | 多次定时                                                     |
| clearInterval() | 取消多次定时                                                 |

#### ① 弹框

```js
// 警告框  没有返回值
alert()

// 确认框  返回布尔值
confirm()

// 输入框  返回用户输入的内容（string）
prompt()
```

#### ② 打开关闭窗口

```
open()		打开新窗口
close()		关闭本窗口，要求该窗口必须是 open 打开的
```

```js
// 打开空白窗口
open();

// 打开新窗口 指定网页
open('网页地址');

// 在指定的窗口打开网页 
open('网页地址', '窗口名称');

// 打开新窗口指定尺寸
open('网页地址', '', 'width=400,height=300')
```

#### ③ 页面滚动

```
scrollTo()		页面滚动到指定位置，设置坐标
scrollBy()		页面滚动指定距离，设置距离
```

```js
// 设置两个参数作为坐标
scrollTo(0, 0);

// 设置一个参数，该参数是对象
scrollTo({
    left: 0, 
    top: 0,
    behavior: 'smooth'
});

// 设置两个参数作为滚动的距离
scrollBy(100, 100);

// 设置一个参数，该参数是对象
scrollBy({
    top: 600,
    behavior: "smooth"
});

滚动到文档中的某个坐标:
window.scrollTo(0, 1000);

// 设置滚动行为改为平滑的滚动
window.scrollTo({ 
    top: 1000, 
    behavior: "smooth" 
});


在窗口中按指定的偏移量滚动文档:

// 向下滚动一页：
window.scrollBy(0, window.innerHeight);

// 向上滚动一页：
window.scrollBy(0, window.innerHeight);

// 平滑滚动
window.scrollBy({   
  top: 100,
  left: 100,   
  behavior: "smooth" 
});



```

#### ④ 定时器

**多次定时器：**

```js
setInterval(回调函数, 时间间隔)		时间间隔单位是毫秒，默认值是 0， 返回定时器标记
clearInterval(定时器标记)		  停止定时器，指定定时器标记
```

**单次定时器：**

```js
setTimeout(回调函数, 时间间隔)		时间间隔单位是毫秒，默认值是 0， 返回定时器标记
clearTimeout(定时器标记)			  停止定时器，指定定时器标记
```

**单次定时器**

设置定时：

```js
// 第一个参数可以传递一个字符串，第二个参数是延迟时间
setTimeout("alert('Hello world!') ", 1000); 

// 第一个参数也可以传递一个回调函数，这是推荐的用法
setTimeout(function() { 
 alert("Hello world!"); 
}, 1000);

// 还可传递更多的参数作为回调函数的参数
setTimeout(myCallback, 500, 'Parameter 1', 'Parameter 2');
```

取消定时：

```js
//设置超时调用
var timeoutId = setTimeout(function() { 
 alert("Hello world!"); 
}, 1000); 
//注意：把它取消
clearTimeout(timeoutId);
```

**多次定时器**

设置定时：

```js
// 第一个参数可以传递一个字符串，第二个参数是延迟时间
setInterval ("alert('Hello world!') ", 10000); 

// 第一个参数也可以传递一个回调函数，这是推荐的用法
setInterval (function() { 
 alert("Hello world!"); 
}, 10000); 
IntervalExample01.htm

// 还可传递更多的参数作为回调函数的参数
setInterval(myCallback, 500, 'Parameter 1', 'Parameter 2');
```

取消定时:

```js
//设置定时
var invalId = setInterval(function() { 
 alert("Hello world!"); 
}, 1000); 
//注意：把它取消
clearInterval(timeoutId);
```

#### ⑤ window 对象属性和方法总结

```js
name			窗口的名字，可读可写
innerWidth		读取视口的宽度
innerHeight 	读取视口的高度
document		获取文档对象 DOM对象
history			
location
navigator
screen

alert()
confirm()
prompt()
open()
close()
scrollTo()
scrollBy()
setTimeout()
setInterval()
clearTimeout()
clearInterval()
```

## history对象

history 表示**本窗口的历史记录**， 相关属性方法如下：

```js
length			获取本窗口历史记录的数量

back()			回到历史记录上一个
forward()		回到历史记录下一个
go()			设置一个数字作为参数，正数前进，负数后退
```

history 对象提供了操作浏览器*会话历史*（浏览器地址栏中访问的页面，以及当前页面中通过框架加载的页面）的接口。

### 属性

| 属性名 | 属性含义       |
| ------ | -------------- |
| length | 历史记录的数量 |

### 方法

| 方法名    | 方法含义        |
| --------- | --------------- |
| back()    | 后退一步        |
| forward() | 前进一步        |
| go(n)     | 前进或后退 n 步 |

```js
//后退一步
history.go(-1); 
//前进一步
history.go(1); 
//前进两步
history.go(2);
```

## location对象

location 是最有用的 BOM 对象之一，它提供了与当前窗口中加载的文档有关的信息，还提供了一些导航功能。location 对象的用处不只表现在它保存着当前文档的信息，还表现在它将 URL 解析为独立的片段，让开发人员可以通过不同的属性访问这些片段。

location 表示本窗口的地址信息，相关属性方法如下：

```js
href		完整的url，可读可写
protocol	协议部分，可读可写
hostname	主机名，可读可写
port		端口号，可读可写
host		主机名和端口号，可读可写
pathname	文件路径，可读可写
hash		锚点信息，可读可写
search		参数信息，可读可写

reload()	刷新页面
assign()	页面跳转，设置一个地址作为参数，留下历史记录
repalce()	页面跳转，设置一个地址作为参数，不会留下历史记录
```

### 属性

| 属性名   | 属性含义                                                     |
| -------- | ------------------------------------------------------------ |
| href     | 返回当前加载页面的完整URL。直接输出 location 也会返回这个值。 |
| protocol | 设置或返回页面使用的协议。通常是 `http:` 或 `https:`         |
| host     | 返回服务器名称和端口号（如果有）。                           |
| hostname | 返回不带端口号的服务器名称。                                 |
| port     | 返回URL中指定的端口号。                                      |
| pathname | 返回URL中的目录和（或）文件名。                              |
| search   | 返回URL的查询字符串。这个字符串以问号开头。                  |
| hash     | 返回URL中的hash（#号后跟零或多个字符）。                     |

### 方法

| 方法名    | 方法含义                                           |
| --------- | -------------------------------------------------- |
| reload()  | 重新加载 如果设置参数 true，表示强制从浏览器加载。 |
| assign()  | 打开新的页面。                                     |
| replace() | 打开新的页面替换旧业面，不会产生历史记录。         |



## navigator对象

### 属性

navigator 用于表示浏览器版本信息以及操作系统信息，属性如下：

```js
userAgent		获取客户端浏览器信息
```

最早由 Netscape Navigator 2.0 引入的 navigator 对象，现在已经成为识别客户端浏览器的事实标准。

| 属性名    | 属性含义                                             |
| --------- | ---------------------------------------------------- |
| userAgent | 用户代理信息，该属性可以用来检测用户所使用的浏览器。 |

## screen对象

### 属性

screen 对象返回当前渲染窗口中和屏幕有关的属性。

| 属性名 | 属性含义     |
| ------ | ------------ |
| width  | 返回屏幕宽度 |
| height | 返回屏幕高度 |

screen 用于表示屏幕相关信息，属性如下：

```js
width		获取屏幕宽度
height		获取屏幕高度
```



