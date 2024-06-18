# Ajax

 Ajax 全称为 Asynchronous Javascript And XML，就是异步的 JavaScrript 和 XML。 

# 原生 Ajax

## 基本使用流程

```js
// 第一步 创建 XMLHttpRequest 对象 是XML的dom对象，HTML是XML的子集
const xhr = new XMLHttpRequest();

// 第二步 监听响应成功的事件
xhr.onload = () => {
    console.log('成功接收到后端的响应！');
    box.innerHTML += xhr.responseText + '<br>';
};
// 监听响应超时事件
xhr.ontimeout = function(){
    alert('响应超时！');
}

// 监听按钮点击事件
xhr.onclick = function(){
    // 请求初始化
    
    // 发送请求
}

// 第三步 请求初始化
/*
   第一个参数 请求方式
   第二个参数 请求URL
   第三个参数 是否异步，默认异步
*/
xhr.open('GET', '/getData');

// 第四步 发送请求
/*
  参数可以设置请求体，没有请求可以不设置参数
*/
xhr.send();
```

### 发起请求携带数据

#### 通过 URL 携带数据

> 所有的请求方式都可以通过 URL 携带数据

```js
// 定义查询字符串
const qs = `username=${nameInp.value}&userpwd=${pwdInp.value}`;
// 请求初始化 将携带的数据以查询字符串的形式拼接到 URL 中
xhr.open('GET', '/addData?'+qs)
// 发送请求
xhr.send();
```

#### 通过请求体携带数据

请求体只能是字符串的格式

> POST、PUT 、DELETE等方式可以通过Ajax 发送请求体携带数据

```js
// 定义查询字符串
const qs = `username=${nameInp.value}&userpwd=${pwdInp.value}`;

// 初始化
xhr.open('POST', '/addData');

// 设置请求头  请求头一定要在 open() 之后，send() 之前设置
// 通过请求头 Content-type，告知后端请求体的类型
xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

// 发送请求，请求体必须是字符串，字符串的格式可以有很多
xhr.send(qs)
```

#### 请求体内容类型

text/plain 请求体只要是字符串就可以

```js
1. 默认的请求体类型，如果不设置请求头字段 Content-type，默认就是该种类型
2. 请求体只要是字符串就可以，后端不会做任何处理
```

**application/x-www-form-urlencoded** 要求请求体是查询字符串

```js
1. 需要设置请求头 xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
2. 要求请求体是查询字符串，如 a=100&b=200
3. 点击提交按钮提交表单（非Ajax），如果 Method 是 Post，默认请求体内容就是 x-www-form-urlencoded
```

**application/json** 要求请求体是 json 格式的字符串

```js
1. 设置设置请求头 xhr.setRequestHeader('Content-type', 'application/json');
2. 要求请求体是 json 格式的字符串
先定义一个对象，然后使用JSON内置对象的JSON.stringify(data)方法将对象转为json格式的字符串
```

**multipart/form-data**

```js
参考 FormData
后端自动处理为对象格式
```

POST和PUT请求的区别

```js
POST为了向数据库添加新数据
PUT为了向数据库更新数据
DELETE为了向数据库删除数据
GET向数据库查询数据
```



#### FormData 对象作为请求体

```js
1. 请求体（send()的方法的参数）除了是字符串，也可以是 formData 对象
2. 如果请求体是 FormData 对象，浏览器会自动设置请求头字段 Content-type 为 multipart/form-data
```

```js
// 方式一 创建 空的 FormData，再添加数据，可以添加文件数据或者字符串数据
var fd = new FormData();
fd.append('message', msgInput.value);
fd.append('content', 'hello ajax');

// 方拾二 根据表单元素创建 FormData 会包含表单中所有的信息
var fd = new FormData(formElement);
```

```js
// 点击按钮 发送请求 第一种formData的处理方式
const btn1 = document.querySelector('#btn1');
btn1.onclick = () => {
    // 创建FormData
    const fd = new FormData();
    // 向fd对象添加数据
    fd.append('username', nameInp.value);
    fd.append('userpwd', pwdInp.value);
    fd.append('mssage', 'hello 高小乐');
    fd.append('avator', avatorInp.files[0])

    // 请求初始化
    xhr.open('POST', '/upload');
    // 发送请求 fd对象作为参数, 会自动设置请求头字段 Content-type为multipart/form-data
    xhr.send(fd);
};
```

#### FormData 对象方法

```js
append() 添加数据 第一个参数是key，第二个参数是value
set() 设置数据，有的就修改，没有就添加
delete() 删除数据
get() 查询数据
getAll() 
```

#### FormData 实现文件上传

```js
// 方式一 创建 空的 FormData，再添加数据，可以添加文件数据
var fd = new FormData();
// 当input标签的类型为file时，dom对象元素的files方法，可以得到一个fileList[]伪数组，里边存放了图片内容，如果只传一张照片则只需要第一个
fd.append('avator', avatorInput.files[0]);


// 方拾二 根据表单元素创建 FormData 会包含表单中所有的信息
var fd = new FormData(formElement);
```

```javascript
// 点击按钮1 发送请求 第一种formData的处理方式 不使用form表单 使用ajax方式提交
const btn1 = document.querySelector('#btn1');
btn1.onclick = () => {
    // 创建FormData
    const fd = new FormData();
    // 向fd对象添加数据
    fd.append('username', nameInp.value);
    fd.append('userpwd', pwdInp.value);
    fd.append('mssage', 'hello 高小乐');
    // avatorInp.value只能拿到图片的地址
    fd.append('avator', avatorInp.files[0])

    // 请求初始化
    xhr.open('POST', '/upload');
    // 发送请求 fd对象作为参数, 会自动设置请求头字段 Content-type为multipart/form-data
    xhr.send(fd);
};


// 点击按钮2 发送请求 第二种formData的处理方式 使用form表单 但是阻止默认行为 使用Ajax方式提交
const btn2 = document.querySelector('#btn2');
btn2.onclick = () => {
    const formBox = document.querySelector('form');
    // 创建FormData 参数是form元素
    // 自动将form元素中的表单控件添加到 formData中
    const fd = new FormData(formBox);

    // 请求初始化
    xhr.open('POST', '/upload');
    // 发送请求 fd对象作为参数, 会自动设置请求头字段 Content-type为multipart/form-data
    xhr.send(fd);
};
```

非Ajax上传文件，使用表单上传文件

```html
// input标签的类型为file时，可以上传文件

<h1>非Ajax 表单上传文件</h1>
<!-- 这里使用type指定请求体的类型为multipart/form-data-->
<form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="avator">
    <button>上传</button>
</form>
```



## 读取响应报文

```js
// 响应行
xhr.status;			// 响应状态码
xhr.statusText;		// 响应状态描述

// 响应头
xhr.getResponseHeader('响应头字段');		// 获取指定字段的响应头的信息
xhr.getAllResponseHeaders();		   // 获取所有的响应头信息 返回一个字符串

// 响应体
xhr.responseText;		// 获取响应体体符串
xhr.response;			// 获取响应体字符串，如果响应体是特殊格式的字符串（json），会进行处理
```

## json 格式的数据

### 设置 xhr.responseType 属性

后端设置响应头，告知浏览器响应体的内容类型是 json 格式

```js
Content-type: application/json;charset=utf-8
```

### 客户端处理接收到的 json 数据

① 方式一 使用 JSON.parse

```js
// 监听响应结束的回调函数、
xhr.onload = function() {
    // 将响应体中 json 格式的字符串处理成对象
    var resData = JSON.parse(xhr.responseText);
}
```

② 方式二 设置 xhr.responseType 属性 ，通过 xhr.response获取 

```js
xhr.responseType = 'json';
xhr.onload = function() {
    xhr.response;		// 直接得到处理好的对象
}
```

### 客户端设置响应超时

方案一 兼容方案

```js
// 发送请求
xhr.send();

// 发送请求之后，设置单次定时，如果时间到了还没有接收到响应，中断请求
setTimeout(function(){
    // 判断如果没有响应结束
    if (xhr.readyState !== 4) {
        xhr.abort();  // 中断请求
        alert('请求超时！');
    }
}, 5000);
```

方案二 XHR2 方案

```js
 // 监听响应超时的事件
xhr.ontimeout = function(){
    alert('响应超时！');
}

// 请求初始化
xhr.open('GET', '/getInfo');

// 发送请求之前设置超时时间
xhr.timeout = 5000;

// 发送
xhr.send();
```

### HTTP 进度事件

#### 进度相关事件

```js
xhr.readystatechange = function(){
    
}
```

```js
readystatechange	触发至少 4 次 ，大的事件集合，包含1 2 3 4 过程
readystate 0   初始值
readystate 1   请求初始化完成 执行 open()，开始发送请求
readystate 2   发送请求 执行 send()
readystate 3   开始接收响应 可能触发多次 根据相应体大小 触发多次
readystate 4.  响应接收完毕 load事件触发

readystatechange 拆分出来细分的事件
readyState			readystatechange的状态
loadstart			开始请求的时候触发，对应此时 readyState 的值是 1和2之间
load				响应结束的时候触发，对应此时 readyState 的值是 4，请求成功触发
error				请求失败触发，应用层面的错误也算是请求成功（如 404错误），只有网络错误才算请求失败，请求发不出去
loadend				响应结束之后触发，不论请求是否成功都会触发
progress			开始接收响应内容之后，被触发多次，该事件的回调函数可以获取一个 progressEvent 对象 开始接收响应的时候 不停的触发多次，直到接收响应体完毕




// 早期没有load事件时 兼容性写法
if (xhr.readyState === 4) {
    // 处理响应体
}
// 现在的写法
xhr.onload = function(){
    // 处理响应体
}
```

> **相关事件的触发顺序：** loadstart、progress（可能会触发多次）、 load/error、loadend

#### ProgressEvent 事件对象

progress 事件的回调函数可以获取一个 progressEvent 对象，该对象有如下属性：

```js
loaded		表示当前已经下载的字节数
total		表示响应内容的总长度 后端响应头中content-length
```

```js
// 开始接收响应的时候 不停的触发多次，直到接收响应体完毕
xhr.onprogress = event => {
    console.log('progress：', event.loaded, event.total);
    box.innerHTML = '已下载：' + (event.loaded / event.total * 100).toFixed(2) + '%';
}
```



### 异步请求和同步请求

**两者区别：**

```js
1. 异步请求，请求发送之后，其他同步操作继续执行； 当获取响应之后触发回调函数，回调函数进入回调队列等待主线程空闲执行
2. 同步请求，请求发送之后，其他的同步操作必须等到，响应结束之后才能继续执行
```

**如何发送同步请求：**

```js
open() 方法的第三个参数是布尔值，true 表示异步请求，false 表示同步请求，默认值是 true。
```

## XMLHttpRequest 对象总结

#### ① XHR 对象概述

1）XMLHttpRequest 对象简称 **XHR** 对象。

2）XMLHttpRequest 对象提供了对 HTTP 协议的完全的访问，包括做出 POST 和 HEAD 请求以及普通的 GET 请求的能力。

3）XMLHttpRequest 可以同步或异步地返回 Web 服务器的响应，并且能够以文本或者一个 DOM 文档的形式返回内容。

4）尽管名为 XMLHttpRequest，它并不限于和 XML 文档一起使用，它可以接收任何形式的文本文档。

#### ② 创建 XHR 对象

使用构造函数 XMLHttpRequest 就可以创建一个 XHR 对象。

XMLHttpRequest 对象 是XML的dom对象，HTML是XML的子集

```js
const xhr = new XMLHttpRequest()；
```

注意：在古老的 IE 浏览器中（如：IE6），需要使用其他方式来创建 XHR 对象。

```js
// IE5、IE6
let xhr = new ActiveXObject("Microsoft.XMLHTTP");
```

#### ③ XHR 对象的属性

| 属性名       | 含义                                                         |
| ------------ | ------------------------------------------------------------ |
| readyState   | 返回一个数字，表示请求的状态：<br>0 -- UNSET -- XHR对象已创建或已被 abort() 方法重置。 <br>1 -- OPENDED -- `open()` 方法已经被调用。<br>2 -- HEADERS_RECEIVED -- `send()` 方法已经被调用，并且响应头和响应状态已经可获得。 <br>3 -- LOADING -- 下载中， `responseText` 属性已经包含部分数据。 <br>4 -- DONE -- 所有响应数据接收完毕。 |
| status       | 响应状态码，如 404、200 等。                                 |
| statusText   | 响应状态码的文本描述，如 200 对应的是 “OK”。                 |
| responseXML  | 接收格式为 XML 的响应数据，返回一个 document 对象。          |
| responseText | 获取响应文本，返回一个字符串。是一个字符串类型的响应体。     |
| responseType | 用于设置响应内容的类型 *xhr2*                                |
| response     | 返回的类型取决于 responseType 的设置。 *xhr2*                |
| timeout      | 设置超时时间。*xhr2*                                         |

#### ④ XHR 对象的方法

| 方法名                  | 含义                                                         |
| ----------------------- | ------------------------------------------------------------ |
| open()                  | 初始化 HTTP 请求，用来指定请求方式和 URL。 `xhr.open(method, url, [async], [user], [password])` |
| send()                  | 发送 HTTP 请求，参数可以设置请求体，没有请求体无需设置参数。 |
| setRequestHeader()      | 设置 HTTP 请求头的值。必须在 `open()` 之后、`send()` 之前调用。 |
| abort()                 | 如果请求已被发出，则立刻中止请求。                           |
| getAllResponseHeaders() | 以字符串形式返回所有的响应头。                               |
| getResponseHeader()     | 返回指定的响应头。                                           |

#### ⑤ XHR 对象的事件

| 事件名           | 含义                                                         |
| ---------------- | ------------------------------------------------------------ |
| readystatechange | readyState 属性值发生变化触发该事件。                        |
| abort            | 请求终止时触发。                                             |
| error            | 请求遇到错误时触发。**注意**，只有发生了网络层级别的异常才会触发此事件。 |
| loadstart        | 接收到响应数据时触发。 *xhr2*                                |
| load             | 请求成功完成时触发。*xhr2*                                   |
| loadend          | 当请求结束时触发, 无论请求成功 ( `load`) 还是失败 (`abor` 或 `error`)。*xhr2* |
| progress         | 当请求接收到更多数据时，周期性地触发。*xhr2*                 |
| timeout          | 在预设时间内没有接收到响应时触发。*xhr2*                     |

# 跨域

## 同源策略

* 同源策略是浏览器的一种安全策略。
* 同源策略要求 ajax 代码所在的页面URL中的 协议、域名、端口号与 ajax 请求的 URL 中  协议、域名、端口号保持一致
* 违反同源策略称为跨域， 实现跨域方案： **CORS**  **JSONP**

```js
客户端的请求可以发送到后端，后端也对客户端进行响应，但是客户端（浏览器）对响应进行拒绝
```



## CORS 跨域资源共享

```js
在服务端进行设置
添加一个响应头，设置允许的 域名

Access-Control-Allow-Origin: http://localhost:8080   
# 允许前面页面的域名是http://localhost:8080，才能跨域

Access-Control-Allow-Origin：*
# 允许所有的域名都可以跨域
```

**1） CORS是什么？**

CORS（Cross-Origin Resource Sharing），跨域资源共享。CORS是官方的跨域解决方案，它的特点是不需要在客户端做任何特殊的操作，完全在服务器中进行处理，支持 GET、POST 等所有的请求方式。

**2）CORS怎么工作的？**

CORS 后端是通过设置一个响应头 `Access-Control-Allow-Origin` 来告诉浏览器，该请求允许跨域，浏览器收到该响应以后就会对响应放行。

后端侧设置

```js
// 1. 同源策略 -----------------------------------------------------------------------
// 同源策略
app.get('/page01', (req, res) => {
    res.sendFile(path.join(__dirname, '01-CORS.html'));
});
// 接收 ajax 请求
app.get('/getdata01', (req, res) => {
    // 允许单个域名跨域请求
    // res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    // res.set('Access-Control-Allow-Origin', 'http://192.168.2.231:8080');
    
    // 允许多个域名跨域请求
    // const allowOrigins = ['http://localhost:8080', 'http://192.168.23.62:8080'];
    // req.get('Origin') 请求头中数据包含http://localhost:8080
    // if (allowOrigins.includes(req.get('Origin'))) {
    //     res.set('Access-Control-Allow-Origin', req.get('Origin'));
    // }


    // 允许所有的域名
    res.set('Access-Control-Allow-Origin', '*');

    console.log('接收到请求');
    res.send('hello ajax');
});

```

**相关响应头介绍：**

`Access-Control-Allow-Origin`：允许的域名，多个域名使用逗号隔开，设置为 `*`，表示允许所有的域名。

`Access-Control-Allow-Credentials`：该字段可选。它的值是一个布尔值，表示是否允许发送 Cookie。默认情况下，Cookie不包括在跨域请求之中

`Access-Control-Expose-Headers`：该字段可选。跨域请求时，XMLHttpRequest 对象的 getResponseHeader()方 法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。

```js
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: content-type,cache-control
```

**允许跨域请求携带 Cookie**

在同源请求时，Ajax 发出的请求会默认携带 cookie 信息，无需进行额外的设置。

跨域请求中，默认不允许携带Cookie，如果想在跨域请求中携带 cookie，需要满足以下条件：

1. XMLHttpRequest 对象的 `withCredentials` 属性必须设置为 `true` ，表示允许发送跨域请求时携带身份凭证（包括 Cookie、Authorization 等）。
2. 服务器端必须设置 `Access-Control-Allow-Credentials` 头信息为 `true` ，表示允许接受跨域请求时携带身份凭证。
3. 服务器端必须设置 `Access-Control-Allow-Origin` 头信息为具体的域名，不能设置为通配符 `*` ，表示只允许指定的域名访问资源。
4. 如果在请求头中添加了其他自定义头信息，例如 `Authorization` ，则需要在服务器端设置 `Access-Control-Allow-Headers` 头信息，否则浏览器也不会发送 Cookie。
5. 所有设置的 Cookie 需要设置相关属性 Secure 和 SameSite=None，才允许被跨域携带。

## 解决跨域

- JSONP前端
- 和后端协商设置特定的请求头
- 后端允许跨域
- 代理

### JSONP

**实现思路**

```js
实现基础：
	利用 script 标签也可以发送请求，天然支持跨域， script 会把响应到的内容作为 js 代码执行

实现步骤：（前端）
	1. 创建 script 标签
	2. 指定 script 标签的 src 属性值，src 的属性值就是请求地址， 把函数名通过url中的查询字符串传给后端
	3. 把 script 标签添加到 body 中
	4. 再把 script 标签从 body 中移除
	5. 定义获取数据的函数，该函数会被后端响应的内容调用，把数据传进来
	注意： 在 script 添加到 body 中的瞬间，发起请求，接收响应，调用了函数
	
	
实现步骤：（后端）
	1. 从 url 中的查询字符串里取出函数名
	2. 响应体内容是 js 代码，调用函数的js代码，把数据变为json格式作为函数的参数
	3. 做出响应

```

**1） 什么是JSONP ?**

JSONP(JSON with Padding)，是一个非官方的跨域解决方案，纯粹凭借程序员的聪明才智开发出来，只支持 GET 请求方式。

在网页有一些标签天生具有跨域能力，比如：img link iframe script，JSONP就是利用 script 标签的跨域能力来发送请求的。

```js
原理：
html 中的script标签 浏览器向服务器请求的js代码，会直接执行服务器响应的JS代码。
后端响应一个
```

**2）JSONP 使用步骤**

```js
// 1.动态的创建一个script标签
var script = document.createElement("script");

// 2.设置script的 src
script.src = "http://localhost:3000/testAJAX?callback=abc";

// 3. 定义函数
function abc(data) {
    alert(data.name);
};

// 4.将script添加到 body 中,会发送请求
document.body.appendChild(script);

// 5. 将 script 从 body 中删除
document.body.removeChild(script);
```

**3）服务端的处理**

服务端需要将 js 代码作为响应体：

```j's
var callback = req.query.callback;
var obj = {
  name:"孙悟空",
  age:18
}
res.send(callback+"("+JSON.stringify(obj)+")");
```

**JSONP 缺点**

```
只支持 GET 请求
```

### 代理

手写一个后端服务，放开跨域限制，然后前端向这个地址请求数据。

```javascript
// 导入express中间件
const express = require("express");
const axios = require("axios");
const app = express();
// 允许跨域
app.use((req,res,next)=>{
    // 允许来源
	res.set("Access-Control-Allow-Origin","*");
    // 允许请求方法 所有 (默认不支持put delete)
	res.set("Access-Control-Allow-Methods","*");
    // 允许携带请求头
	res.set("Access-Control-Allow-Headers","*");
	next();
})

// 设置路由 并且响应数据
app.get("/info",(req,res)=>{
	res.json({
		ok:1,
		msg:"get->info"
	})
})
// 设置路由 重新向服务端请求数据 然后把数据响应给客户端
app.get("/maoyan",(req,res)=>{
	axios.get("https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=上海&ci=10&channelId=4")
    .then(value => {
		res.json(value.data);
	})
})
// 启动服务
app.listen(8089,()=>{
	console.log("success");
})

```

### 开发阶段配置

在 `vue.config.js` 文件中，加入如下代码：

```js
devServer:{
    open:true,
    proxy: {
        '/4000': {
                    target: 'http://api.waimai.fuming.site:4000',
                    changeOrigin: true,
                    pathRewrite: {
                        '^/4000': ''
                    }
            }
        }
},
```

### 部署到 nginx 之后通过反向代理解决跨域问题

打开 nginx 配置文件，在 server 的花括号内添加如下一行：

```conf
location /4000 {
     proxy_pass http://api.waimai.fuming.site:4000/;
}
```

### 后端解决跨域

后端也可以通过 CORS 方案结局跨域问题，原理是设置响应头里的`Cross-origin resource sharing` 字段

## 封装一个 Ajax 函数

```js
/*  
            选项：
            url： 请求地址
            method： 请求方式，默认值 GET
            headers: 请求头，默认值 {}
            body： 请求体
            dataType: 响应体类型
            success: 成功的回调
            error: 失败的回调
*/
function ajax(options) {
    // 从 options 取出相关的选项
    const {url, method='GET', headers={}, body, dataType, success=()=>{}, error=()=>{}} = options;

    // 创建 xhr 对象
    const xhr = new XMLHttpRequest();

    // 如果指定了 dataType
    if (dataType) {
        xhr.responseType = dataType;
    }

    // 监听响应成功的事件
    xhr.onload = () => {
        if (xhr.status === 200) {
            success(xhr.response);
        } else {
            error();
        }
    }

    // 监听响应失败的事件
    xhr.onerror = error;

    // 请求初始化
    xhr.open(method, url);

    // 设置请求头
    for (let key in headers) {
        xhr.setRequestHeader(key, headers[key]);
    }

    // 发送
    xhr.send(body);


}
```



# Ajax 记账本

## 数据请求API

```js
获取指定用户的账单： GET  	/api/account/用户ID
给指定用户添加账单： POST 	/api/account/用户ID
删除账单：		  DELETE   /api/account/账单ID
```

## 流程

```js
1. 发起请求获取该用户的账单信息
2. 添加账单
   ① 点击按钮 弹出表单
   ② 填写表单点击提交按钮，监听了表单提交事件，自己处理，阻止默认提交
   ③ 提交事件触发之后，使用formdata获取表单的内容，formdata作为请求体，发送请求
   ④ 当后端确定添加成功之后，重新请求数据，清空原来的，添加新的
3. 删除账单
   ① 事件委托给删除按钮监听事件，提前使用自定义属性保存账单ID
   ② 点击删除按钮之后，发送请求删除
   ③ 确定后端删除成功之后，删除元素
   
```



