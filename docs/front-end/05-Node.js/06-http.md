# HTTP 协议

HTTP（hypertext transport protocol）协议；中文叫 超文本传输协议，是一种基于TCP/IP的应用层通信协议吗，这个协议详细规定了 `浏览器` 和 万维网 `服务器` 之间互相通信的规则协议中主要规定了两个方面的内容:

- 客户端：用来向服务器发送数据，可以被称之为 请求报文
- 服务端：向客户端返回数据，可以被称之为 响应报文

## 请求报文

```
POST https://comment.api.163.com/api/v1/products/a2869674571f77b5a0867c3d71db5856/threads/I5TOD9K40001899O/comments?ibc=newspc&_=1685348594866 HTTP/1.1
Host: comment.api.163.com
Connection: keep-alive
Content-Length: 342
sec-ch-ua: "Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"
Accept: application/json, text/plain, */*
Content-Type: application/x-www-form-urlencoded
sec-ch-ua-mobile: ?0
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36
sec-ch-ua-platform: "Windows"
Origin: https://comment.tie.163.com
Sec-Fetch-Site: same-site
Sec-Fetch-Mode: cors
Sec-Fetch-Dest: empty
Referer: https://comment.tie.163.com/
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7,en-US;q=0.6
Cookie: nts_mail_user=fmuncle@163.com:-1:1; _n

content=%E7%89%9B%E9%80%BC%EF%BC%81%E8%B5%9E%EF%BC%81%E5%8E%89%E5%AE%B3%EF%BC%81&originalContent=牛逼！赞！厉害！&ntoken=2e4db38d-2dd8-4dc2-97f5-dd39e528794b&token=9ca17ae2e6ffcda170e2e6eeacf33af8acb7a9b63f91868aa2c54b878b9e86c5649cb5a1d1c83df38ebf8df52af0feaec3b92a869e97d9cc7ab89ca198e65b928f9fa6c55f909e00a8ea33ace7c087d972afb9ee9e
```

请求报文四部分组成： 请求行、请求头、空行、请求体

### ① 请求行

**请求方式：** 包括 GET、POST、PUT 方式等，更多 https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods

**URL：** 统一资源定位符，确定具体请求的资源

**协议版本：** http1.1

### ② 请求头

请求头是键值对结构，用于标记客户端相关的信息，更多请求头：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers

### ③ 空行

用于分隔请求头和请求体

### ④ 请求体

向后端发送的数据，请求体可以为空

## 响应报文

```
HTTP/1.1 200 OK
Server: Tengine
Content-Type: text/html; charset=utf-8
Content-Length: 330076
Connection: keep-alive
Date: Mon, 29 May 2023 07:45:58 GMT
Last-Modified: Mon, 29 May 2023 07:45:01 GMT
Vary: Accept-Encoding
Expires: Mon, 29 May 2023 07:46:28 GMT
Cache-Control: no-cache,no-store,private
P3P: CP=CAO PSA OUR
Ali-Swift-Global-Savetime: 1685346358
Via: cache79.l2cn3036[47,47,200-0,M], cache24.l2cn3036[49,0], vcache1.cn4730[0,0,200-0,H], vcache1.cn4730[2,0]
Age: 29
X-Cache: HIT TCP_MEM_HIT dirn:10:364746730
X-Swift-SaveTime: Mon, 29 May 2023 07:45:58 GMT
X-Swift-CacheTime: 30
cdn-src-ip: 116.238.99.140
X-Cache-Remote: HIT
cdn-ip: 58.215.47.197
cdn-source: ali
cdn-user-ip: 116.238.99.140
x-server-ip: 58.215.47.197
Timing-Allow-Origin: *
EagleId: 3ad72f1516853463874755901e

响应体...
```

响应报文由四部分组成： 响应行、响应头、空行、响应体

### ① 响应行

**协议版本：** HTTP/1,1

**响应状态码：** 200，标记响应状态，更多地响应状态码：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status

**响应状态描述：** 与响应状态码对应

### ② 响应头

键值对结构，标识服务端相关信息

**更多响应头：**https://developer.mozilla.org/zh-CN/docs/Glossary/Response_header

### ③ 空行

分隔响应头和响应体

### ④  响应体

服务器向客户端发送的数据都在响应体中，如 html文件的内容、css文件的内容、js文件的内容等

## URL

统一资源定位系统（uniform resource locator;URL）是因特网的万维网服务程序上用于指定信息位置的表示方法。

```
http://www.baidu.com:8080/home/msg/data/personalcontent?num=8&indextype=manht#logo
```

完整 URL 的组成部分：

- 协议 ，如 https、http。
- 主机名，一般使用 IP 地址或域名。
- 端口号 ，HTTP 的端口号为 80，HTTPS 的为 443
- 路径，上面 URL 中的路径部分为： `/home/msg/data/personalcontent`。
- 查询字符串，上面 URL 中的路径部分为：`num=8&indextype=manht`。
- 锚点，上面 URL 中的路径部分为：`#logo`

## HTTP 响应状态码

[MDN状态码](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)

状态码由三位数字组成，第一位数字表示响应的类型，常用的状态码有五大类如下所示：

- `1xx`：指示信息--表示请求已接收，继续处理。
- `2xx`：成功--表示请求已被成功接收、理解、接受。
- `3xx`：重定向--要完成请求必须进行更进一步的操作。
- `4xx`：客户端错误--请求有语法错误或请求无法实现。
- `5xx`：服务器端错误--服务器未能实现合法的请求。

常见状态代码、状态描述的说明如下。

- 200 OK：客户端请求成功。

- 400 Bad Request：客户端请求有语法错误，不能被服务器所理解。

- 401 Unauthorized：请求未经授权

- 403 Forbidden：服务器收到请求，但是拒绝提供服务。

- 404 Not Found：请求资源不存在，举个例子：输入了错误的URL。

- 500 Internal Server Error：服务器发生不可预期的错误。

- 503 Server Unavailable：服务器当前不能处理客户端的请求，一段时间后可能恢复正常

# 创建 http 服务

## 创建服务

写一个程序，该程序可以接收到客户端浏览器的请求，并能为客户端浏览器做出响应； 该程序是后端程序，运行在服务器上，需要 node 的支持。

```js
// 导入模块
const http = require('http');

/*
    1. 创建 http 服务的方法的参数是个回调函数
    2. 回调函数在接收到请求的时候自动执行
    3. 回调函数在执行的时候，接收到两个参数，分别是请求对象，响应对象
    4. createServer 方法返回一个对象
*/
const server = http.createServer((req, res) => {
    console.log('我接收到了一个请求！ 客户端IP：', req.socket.remoteAddress);
    // 设置响应
    res.end('<h1>Welcome to My WebSite</h1>');
});

// 启动服务 给http服务对象监听端口, 服务启动成功，回调函数就执行
// 端口号如果是 80，浏览器中的地址可以省略端口号
server.listen(8080, () => {
    console.log('http server is running on 8080');
});

// 第二个参数可以设置 ip
// server.listen(8080, '127.0.0.1', () => {
//     console.log('http server is running on 8080');
// });

/*
   注意：
   1. 修改代码之后，要重新启动服务，先 ctrl+c 结束，再重新运行
   2. 如果端口号被占用，可以换一个端口或者关闭占用端口的进程

*/
```

```js
1. http 对象 ==> 导入的 http 内置模块
2. http.Server 对象 ==> http.createServer() 的返回值
3. http.clientRequest 对象 ==> http.createServer() 的回调函数的第一个参数
4. http.serverResponse 对象 ==> http.createServer() 的回调函数的第二个参数
```

**注意：如果启动服务的时候，报错提示端口被占用，可以采用下面两种方案来解决：**

1）给我们的程序换个端口

2）把占用端口的其他程序关闭

- windows cmd 命令行中运行命令 `netstat -ano | findstr 端口号` 来获取占用端口的程序的进程ID
- 资源管理器->详细信息，根据进程ID找到程序，右键选择结束任务。

## 获取请求报文信息

### 获取请求行的信息

```js
请求对象.method
请求对象.url	获取到 url中的 pathname 部分和查询字符串部分，不包括协议、主机名、端口号、锚点
请求对象.httpVersion

request.httpVersion;		// 获取 http 版本
request.url;				// 获取请求的 url 地址
request.method;				// 获取请求方式（请求方法）
```

### 获取请求头信息

```js
请求对象.headers

request.headers;			// 返回对象，包含请求报文中所有的请求头信息
request.headers.请求头名字；
```

### 获取客户端 IP 地址

```js
请求对象.socket.remoteAddress
```

### 获取 URL 中的查询字符串

```js
// 第一种方式 解析url
const url = require('url');
parse方法的第二个参数 设置为true ，得到的对象中的query属性是一个对象属性
const urlInfo =  url.parse(req.url, true);
console.log(urlInfo.query);
------------------------------------------
const url = requeire('url');
url.parse(request.url, true).query;  // 返回一个对象
```

```js
// 第二种方式 解析 url
const {URL} = require('url');

// 需要手动拼接成完整的url，否则会报错
const urlInfo = new URL('http://127.0.0.1/' + req.url);
// 使用得到的对象中的searchParams属性，searchParams属性本身是一种类似MAP结构的对象
console.log(urlInfo.searchParams); // 得到一个类似MAP结构的对象
// 使用 get 方法获取相应的信息
console.log(urlInfo.searchParams.get('a'));
console.log(urlInfo.searchParams.get('b'));
```

> get、post、put、delete 等所有的请求方式，都可以在url中拼接查询字符串！

### 获取请求体信息

```js
 // 给请求对象监听 data 事件   请求对象本质上就是以读取流
req.on('data', chunk => {
    // += 会让 buffer 自动转为 string
    reqBody += chunk;
});

// 给请求对象监听 end 事件， 读取完毕触发该事件
req.on('end', () => {
  	reqBody;  // 是查询字符串格式，可以使用 querystring 模块处理成对象
});
```

> 只有 post、put 等请求方式才能有请求体，get 、delete 等方式没有请求体！
>
> form 表单可以通过设置 method属性为 post 让表单通过 post方式提交数据，而不是默认查找字符床get方式

```js
// request 本质上是一个可读流对象
// 定义变量 将请求体中读取的内容拼接到该变量
let reqBody = '';

// 分次从请求体中读取数据
req.on('data', chunk => {
    reqBody += chunk;
});

// 请求体内容读取结束
req.on('end', () => {
   	reqBody;  					 // 查询字符串
    querystring.parse(reqBody);   // 解析为对象
});
```



## 设置响应报文

### 设置响应行

```js
响应对象.statusCode = 响应状态码
响应对象.statusMessage = 响应状态描述
------------------------------
response.statusCode = 200;		// 设置响应状态码
response.statusMessage = 'OK';	// 设置响应状态描述
```

### 设置响应头

```js
响应对象.setHeader('键', '值');
--------------------------
response.setHeader('响应头名字'， '响应头内容')
```

```js
// 同时设置 响应状态码 响应状态描述 响应头
响应对象.writeHead(响应状态码, '响应状态描述', {
    '键':'值',
    '键':'值',
    '键':'值',
})


=--------------------------------
// 同时设置 响应状态码、设置响应状态描述、响应头
response.writeHead(响应状态码, '响应状态描述', {
    '响应头名字' ：'响应头内容',
    '响应头名字' ：'响应头内容',
    '响应头名字' ：'响应头内容'
    ...
})
```

### 设置响应体

```js
// resposne 本质上是一个可写流对象 可以通过 write 将内容写入流
response.write('内容');
response.write('内容');
response.write('内容');
response.write('内容');
```

### 结束响应

```js
// 结束响应
响应对象.end();

// 向响应体写入内容并结束响应
响应对象.end('<hr><h2>结束<h2>');

---------------------
// 只用来结束响应
resposne.end();

// 设置响应体并结束响应
response.end('响应体内容');
```

# http 服务案例

## 根据路径不同做出不同响应

```js
/*
    http://127.0.0.1:8080/           首页
    http://127.0.0.1:8080/login      登录页    
    http://127.0.0.1:8080/register    注册页
    其他                              404
*/
// 导入模块
const http = require('http');
const url = require('url');

// 创建服务
const server = http.createServer((req, res) => {
    // 获取到 url 中的路径名部分
    const pathname = url.parse(req.url).pathname;

    // 根据路径名不同做出不同的响应
    switch (pathname) {
        case '/':
        case '/index':
            res.setHeader('Content-type', 'text/html;charset=utf-8');
            res.end('<h1>首页</h1><hr><a href="/login">登录</a> <a href="/register">注册</a>');
            break;
        case '/login':
            res.setHeader('Content-type', 'text/html;charset=utf-8');
            res.end('<h1>登录</h1>');  
            break;
        case '/register':
            res.setHeader('Content-type', 'text/html;charset=utf-8');
            res.end('<h1>注册</h1>');  
            break;
        default:
            res.writeHead(404, 'Not Found', {
                'Content-type': 'text/html;charset=utf-8'
            });
            res.end('<h1>404 您访问的页面不存在的！</h1><a href="/">返回首页</a>');
    }
});

// 启动服务
server.listen(8080, () => {
    console.log('http server is runing on 8080');
});
```

## 根据请求方式不同做出不同的响应

```js
/*
    所有请求方式 / 或者 /index    响应首页
    get方式 /login          加载登录页面
    post方式 /login         执行登录
    其他路径             404
*/


// 导入模块
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');

// 创建服务
const server = http.createServer((req, res) => {
    // 获取到 url 中的路径名部分
    const pathname = url.parse(req.url).pathname;

    // 根据路径和请求方式判断 做出不同的响应
    if (pathname === '/' || pathname === '/index') {
        const resBody = `
        <h1>首页</h1>
        <hr>
        <a href="/login">登录</a>
        `;
        res.writeHead(200, 'OK', {
            'Content-type': 'text/html;charset=utf-8'
        });
        res.end(resBody);
    } else if (pathname === '/login' && req.method === 'GET') {
        // 读取文件 login.html
        fs.readFile(path.resolve(__dirname, './login.html'), (err,data) => {
            if (err) {
                res.writeHead(500, 'Internal Server Error', {
                    'Content-type': 'text/html;charset=utf-8'
                });
                res.end('<h1>500 服务器错误！</h1>');
            } else {
                res.end(data);
            }
        });
    } else if (pathname === '/login' && req.method === 'POST') {
        // 接收表单提交的数据
        let reqBody = '';
        req.on('data', chunk => {
            reqBody += chunk;
        });
        // 读取请求体完毕
        req.on('end', () => {
            // 解析请求体
            const body = qs.parse(reqBody);
            
            // 定义响应内容
            let resBody = '';
            // 执行模拟登录
            if (body.username === 'admin' && body.pwd === '123456') {
                // 登录成功
                resBody = '<p>登录成功！ <a href="/">返回首页</a></p>';
            } else {
                // 登录失败
                resBody = '<p>登录失败！ <a href="/login">重新登录</a></p>';
            }

            // 作出响应
            res.writeHead(200, 'OK', {
                'Content-type': 'text/html;charset=utf-8'
            });
            res.end(resBody);

        });
    } else {
        res.writeHead(404, 'Not Found', {
            'Content-type': 'text/html;charset=utf-8'
        });
        res.end('<h1>404 页面不存在！</h1>');
    }


});

// 启动服务
server.listen(8080, () => {
    console.log('http server is runing on 8080');
});

```

index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>登录</title>
    <link href="http://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/3.4.1/css/bootstrap.min.css" rel="stylesheet">
    <style>
        .form-box {
            margin-top: 40px;
        }
    </style>
</head>
<body>
    <div class="form-box">
        <div class="row">
            <div class="col-sm-4 col-sm-offset-4">
                <form method="post" action="/login">
                    <div class="form-group">
                        <label for="example01">用户</label>
                        <input name="username" type="text" class="form-control" id="example01" required>
                    </div>
                    <div class="form-group">
                        <label for="example02">密码：</label>
                        <input name="pwd" type="password" class="form-control" id="example02" required>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">登录</button>
                </form>
            </div>
        </div>
    </div>
</body>
</html>
```



##  http 服务

```js
1. 创建服务和启动服务
2. 从请求报文中获取数据
3. 设置响应报文
```

## GET 方式和 POST方式的区别：

```js
1. get 方式一般用于从服务器获取数据； post 方式一般用于像服务器提交数据
2. get 方式的请求报文没有请求体； post 方式的请求报文中有请求体
3. post 方式更安全， get 方式通过url查询字符串向服务器传递数据，完全暴露； post 方式通过请求体传递数据，默认不可见的
4. get 方式传递数据受制于url的长度， post 方式传递数据理论上没有容量限制
```

## 实现静态资源托管服务

````js
1. 根据url中的pathname，拼接静态资源文件在服务器上的路径
2. 读取静态资源文件，将文件内容作为响应体
   如果静态资源文件不存在，响应 404； 如果文件读取失败，响应 500
3. 浏览器会对中文路径编码，后端程序需要使用 decodeURI() 解码
4. 响应头中设置 Content-type 指定静态资源文件的 MIME 类型
````

```js
// 导入模块
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const mimes = require('./mimes/mimes.json');

// 创建服务
const server = http.createServer((req, res) => {
    // 从url中获取路径名
    const pathname = url.parse(req.url).pathname;
    
    // 获取到文件的扩展名
    const extname = pathname.slice(pathname.lastIndexOf('.')+1);
   
    // 根据 pathnaem 定义要请求的静态资源文件的路径
    let filename = path.join(__dirname, 'public', pathname);

    // 可能存在中文路径，浏览器会自动编码，需要进行解码
    filename = decodeURI(filename);
   
    // 判断要请求的静态资源文件是否存在
    fs.access(filename, err => {
        if (err) {
            res.writeHead(404,'Not Found', {
                'Content-type': 'text/html;charset=utf-8'
            });
            res.end('<h1>404 您访问的页面不存在！</h1>');
        } else {
            // 读取文件的内容 响应给客户端浏览器
            fs.readFile(filename, (err,data) => {
                if (err) {
                    res.writeHead(500,'Internal Server Error', {
                        'Content-type': 'text/html;charset=utf-8'
                    });
                    res.end('<h1>500 服务器发生未知错误！ </h1>');
                } else {
                    res.setHeader('Content-type', mimes[extname] || '')
                    res.end(data);
                }
            })
        }
    });
});

// 启动服务
server.listen(8080, () => {
    console.log('http server is running on 8080');
});
```



## MIME 文件类型

**媒体类型**（通常称为 **Multipurpose Internet Mail Extensions** 或 **MIME** 类型）是一种标准，用来表示文档、文件或字节流的性质和格式 。

服务器应该在响应头中设置 Content-type 指定响应内容的 MIME 类型。

```json
{
    "css":"text/css",
    "gif":"image/gif",
    "html":"text/html;charset=utf-8",
    "ico":"image/x-icon",
    "jpeg":"image/jpeg",
    "jpg":"image/jpeg",
    "js":"text/javascrip;charset=utf-8",
    "json":"application/json;charset=utf-8",
    "pdf":"application/pdf",
    "png":"image/png",
    "svg":"image/svg+xml",
    "swf":"application/x-shockwave-flash",
    "tiff":"image/tiff",
    "txt":"txt/plain;charset=utf-8",
    "wav":"audio/x-wav",
    "wma":"audio/x-ms-wma",
    "wmv":"video/x-ms-wmv",
    "mp4":"video/mp4",
    "mp3":"video/mpeg",
    "xml":"text/xml"
}
```

