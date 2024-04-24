# Express 概述

## 什么是 Express

Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，它提供一系列强大的特性，帮助你快速创建各种 Web 和移动设备应用。 Express 中的**路由**和**中间件**为我们的开发带来极大便利。

简单来说， Express 就是一个第三方模块，专门用来创建 HTTP服务。

## 相关网站

* 官网： http://expressjs.com/
* 中文网：https://www.expressjs.com.cn/
* Github: https://github.com/expressjs/express

## 安装 

```bash
npm install express;
```

## 基本使用

```js
// 导入模块
const path = require('path');
const express = require('express');

// 创建 express 应用
const app = express();


// 使用内置的中间件 express.static() 托管静态文件 指定静态文件所在的目录
app.use(express.static(path.join(__dirname, 'public')));

// 匹配 GET /index.html
app.get('/index', (request, response) => {
    response.send('<h1>首页</h1>');
});

// 匹配 GET /login
app.get('/login', (request, response) => {
    response.sendFile(path.join(__dirname, 'pages', 'login.html'));
});

// 匹配 POST /login
app.post('/login', (request, response) => {
    response.send('提交成功！');
});

// 启动 http 服务指定端口
app.listen(8080, () => {
    console.log('express server is running on :8080');
});
```

# 路由

## 路由方法	

> app.all 可以匹配所有的请求方式

express 定义了如下路由方法：

| 方法名        | 描述               |
| ------------- | ------------------ |
| app.get()     | get 请求的路由     |
| app.post()    | post 请求的路由    |
| app.put()     | put 请求的路由     |
| app.head()    | head 请求的路由    |
| app.delete()  | delete 请求的路由  |
| app.options() | options 请求的路由 |
| app.trace()   | trace 请求的路由   |
| app.connect() | connect 请求的路由 |
| app.all()     | 所有请求方法的路由 |

`app.all()` 是一个特殊的路由方法，没有任何 HTTP 方法与其对应，它的作用是对于一个路径上的所有请求加载中间件。

## 路径匹配

```js
1. URL 中的 pathname 需要与路由方法进行匹配，匹配成功才能执行对应的回调函数
2. URL 中只有 pathname 参与匹配，查询字符串会被剔除
```

```js
//1 路由匹配方式：字符串精准匹配
app.get('/home', (req, res) => {
    res.send('<h1>Home</h1>');
});

// ---------------------------------------
//2 路由匹配方式：字符串模糊匹配
/*
    ?   前面的字符一次或0次
    +   前面的字符一次或多次
    *   任意字符任意次
    ()  将多个字符作为整体
*/
// 匹配 /admin/ 、 /admin/index 等等
app.get('/admin/*', (req, res) => {
    res.send('<h1>Admin</h1>');
});

// app.get('/index.html?', (req, res) => {
// app.get('/index.html+', (req, res) => {
app.get('/index(.html)?', (req, res) => {
    res.send('<h1>首页</h1>');
});

// ---------------------------------------
// 3 路由匹配方式：正则模糊匹配
app.get(/.css$/, (req, res) => {
    res.send('<h1>这是一个快乐的页面！</h1>');
});


// ---------------------------------------
// 4  匹配到带有参数的 URL
app.get('/article/:id', (req, res) => {
    res.send('<h1>文章</h1>');
    console.log(req.params.id);
});


// --------------------------------------------
// 5 路由组合
// 分配匹配 get:/login 和 post:/login
app.route('/login')
   .get((req, res)=>{
        res.sendFile(path.resolve(__dirname, 'pages', 'login.html'));
   })
   .post((req, res)=>{
        res.send('<h1>表单提交成功！</h1>');
   });

// ---------------------------------------
// 6 给路由设置多个回调函数
app.get('/product/index', (req, res, next) => {
    //res.send('Product 首页1');
    // 继续执行下一个回调函数
    console.log('第一个回调函数');
    next();
}, (req, res) => {
    console.log('第二个回调函数');
    res.send('Product 首页2');
});


// -------------------------------------------
// 前面没有匹配到 执行到这里都会匹配
// 定制 404  
app.all('*', (req, res) => {
    res.status(404).send('<h1>404 页面不存在！</h1>');
});

   

```

## 路由回调函数

```js
1. 路由方法可以设置回调函数，当url与该路由匹配的时候，调用回调函数，回调函数接收两个参数，分别请求对象和响应对象
2. 一个路由方法可以设置多个回调函数
```

使用一个回调函数处理路由：

```javascript
app.get('/example/a', function (req, res) {
  res.send('Hello from A!');
});
```

使用多个回调函数处理路由（记得指定 `next` 参数）：

```Javascript
app.get('/example/b', function (req, res, next) {
  // 继续执行下一个回调函数
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from B!');
});
```

使用回调函数数组处理路由：

```Javascript
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

var cb2 = function (req, res) {
  res.send('Hello from C!');
}

app.get('/example/c', [cb0, cb1, cb2]);
```

混合使用函数和函数数组处理路由：

```Javascript
var cb0 = function (req, res, next) {
  console.log('CB0');
  next();
}

var cb1 = function (req, res, next) {
  console.log('CB1');
  next();
}

app.get('/example/d', [cb0, cb1], function (req, res, next) {
  console.log('response will be sent by the next function ...');
  next();
}, function (req, res) {
  res.send('Hello from D!');
});
```

## app.route()

可使用 `app.route()` 创建路由路径的链式路由句柄，由于路径在一个地方指定，这样做有助于创建模块化的路由，而且减少了代码冗余和拼写错误。

```js
app.route('/login')
    .get((request, response) => {
        response.sendFile(path.join(__dirname, 'pages', 'login.html'));
    })
    .post((request, response) => {
        response.send('提交成功！');
    });
```

```js
app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });
```



# 请求对象和响应对象

## 请求对象

request 对象是路由回调函数中的第一个参数，代表了用户发送给服务器的请求信息，通过 request 对象可以读取用户发送的请求包括 URL 地址中的查询字符串中的参数，和 post 请求的请求体中的参数。

`这里的请求对象request继承了node中的request,同样响应对象也继承了node中的response`

```js
请求对象.method
请求对象.url
请求对象.httpVersion
请求对象.headers
请求对象.socket.remoteAddress
```



### npm包

```js
body-parser					中间件 设置编解码	
```



### 获取URL

```js
request.url
```

### 获取客户端 IP

```js
request.ip
```

### 获取请求头

```js
request.get('请求头key');
```

### 查询字符串信息

```js
request.query;  // 得到一个由查询字符串组成的对象 { wd: '你好', type: '1', origin: '2' }
```

### 路径中的参数信息

```js
request.params //得到一个由参数组成的对象 { cate: '地平线', id: '5' }
```

```js
// 路径中的参数信息 代替 查询字符串  匹配 /news/20342323/a12.shtml
app.get('/news/:date/:id.shtml', (request, response) => {
    const data = `
    <h1>news</h1>
    <p>date： ${request.params.date}</p>
    <p>id： ${request.params.id}</p>
    `;
    console.log(request.params);  // 对象 date 和 id 是属性名
    response.send(data);
})
```

### 获取请求体

https://www.npmjs.com/package/body-parser

```js
request.body 必须经过第三方中间件的处理才能获取到请求体数据解析成的对象，否则只能得到 undefined
request.body 返回一个对象 对象中的属性名是表单提交的name

body-parser包中间件 可以把req.body中的数据解析转为对象
express-generator包 自带body-parser可以把req.body中的数据自动解析为对象
mongoose包自带body-parser可以把req.body中的数据自动解析为对象

```

```js
// 导入中间件
const bodyParser = require('body-parser'); //中间件

// 创建 express 应用
const app = express();

// 使用 body-parser 解析请求体内容 extended 设置为false 仅解析表单中 设置true全部解析
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login', (request, response) => {
    // 使用request.body方法获取请求体
    console.log(request.body);  // 对象
    response.send('提交成功！');
});
```

## 响应对象

response 对象是路由回调函数中的第二个参数，代表了服务器发送给用户的响应信息，通过 response 对象可以设置响应报文中的各个内容，包括响应头和响应体。

`这里的请求对象request继承了node中的request,同样响应对象也继承了node中的response`

```js
响应对象.statusCode = 响应状态码
响应对象.statusMessage = 响应状态描述

响应对象.setHeader('键', '值'); 设置响应头
response.write('内容'); 设置响应体
响应对象.end(); 结束响应
```



### 设置响应状态码

```js
response.status(404);
```

### 设置响应头

```js
response.set('响应头key', '值');
```

### 设置响应体

```js
response.end()				结束响应
response.send()				结束响应 比起 end() 可以自动添加 Content-type 响应头
response.sendFile(文件地址)	  将文件中的内容读取作为响应体
response.download(文件地址)	  将文件下载
response.json()				将对象转为json字符串，进行响应
response.jsonp()			将对象转为jsonp调用形式，进行响应
response.render()			渲染模板
```

### 重定向

```js
response.redirect()			重定向
```

```js
app.get('/data', (req, res) => {
    res.json({name:'小乐', age:1212}); 得到一个json字符串
});

app.get('/files', (req, res) => {
    res.download(path.resolve(__dirname, './pages/form.html'));
})

// 放在最后 匹配不到就执行这里 
app.all('*', (req, res) => {
    res.status(404).send('<h1>404 页面不存在！</h1>');
})
```

新闻案例

```js
// 导入模块
const express = require('express');
// 导入数据模块
const newsData = require('./data.json');

console.log(newsData);

// 拼接html li标签结构
const res = newsData.map(item => '<li><a href="#">' + item.newsTitle + '</a></li>').join('');
console.log(res);

// 创建服务
const app = express();

// 匹配路由
app.get('/',(req,res)=>{
    res.redirect('/news');
});

// 新闻页
app.get('/news',(req,res)=>{
    // 定义响应内容
    const resBody = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>新闻列表</title>
    </head>
    <body>
        <h1>新闻列表</h1>
        <hr>
        <ul>
            ${newsData.map(item => '<li><a href="/news/details?id='+item.id+'">'+item.newsTitle+'</a></li>').join('')}
        </ul>
    </body>
    </html>
    `;
    // 响应
    res.send(resBody);
});
// 新闻详情页
app.get('/news/details', (req, res) => {
    // 从查询字符串中获取id信息
    const id = req.query.id;
    // 根据id从数组中获取对应的新闻
    // 使用数组es6 find方法 得到第一个满足条件的元素
    const newsItem = newsData.find(item => item.id === id);
    console.log(newsItem);
    if(!newsItem){
        res.status(404).send('<h1>您的新闻走丢了~~~~</h1>');
        return;
    }

    // 定义响应内容
    const resBody = `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>新闻列表</title>
    </head>
    <body>
        <h1>${newsItem.newsTitle}</h1>
        <hr>
        <p>${newsItem.newsContent}</p>
    </body>
    </html>
    `;

    // 响应
    res.send(resBody);
});

// 启动服务
app.listen(8080, () => {
    console.log('http server is runing on :8080');
});
```

data.json

```json
[
    {
      "id": "H0ECDR01051784S3",
      "newsTitle": "俄罗斯议员：乌克兰之后，下一个“去纳粹化”的国家是波兰",
      "newsContent": "莫罗佐夫此处回击的是波兰总统及总理的言论。俄乌冲突以来，波兰始终冲在反俄一线，誓言支持乌克兰，积极向乌克兰运送武器，并要求对俄实施严厉制裁。根据俄罗斯卫星通讯社5月初报道，波兰已经向乌克兰提供了232辆T-72M1型主战坦克，以及自行榴弹炮、无人机等，向乌克兰提供武器数量方面仅次于美国。波兰总统安杰伊·杜达13日称，他相信国际社会将要求俄罗斯向乌克兰支付赔偿金，以帮助乌克兰重建。波兰总理莫拉维茨基10日在《每日电讯报》发表专栏文章时甚至将“俄罗斯世界”（Russkiy Mir）称作“癌症”，称其是一种“可怕的新意识形态”，必须被“根除”。"
    },
    {
      "id": "H0GGDCVA051784S3",
      "newsTitle": "将演员身份转变为资产 泽连斯基已向23个国家在线演讲",
      "newsContent": "近一个多月以来，泽连斯基几乎每天都在向外国议会和政府发表演讲，甚至有时一天要演讲多次，通过在线视频不断将乌克兰的声音传向亚、欧、美、中东、大洋洲等地。根据乌克兰总统官网发布，自2月底至4月13日，他至少向23个国家发表在线演讲，此外还先后在北约峰会、欧洲理事会和联合国安理会等组织发表讲话。“你们至少拥有2万辆坦克! 乌克兰要求将你们所有坦克的百分之一送给或卖给我们! 但我们还没有得到明确的答复......在战争期间，最糟糕的事情是对求助者没有明确的答复。”泽连斯基3月24日受邀以线上方式在北约峰会发表讲话，以强烈的语调要求北约国家提供武器。"
    },
    {
      "id": "H0DV9HQP051482D9",
      "newsTitle": "王宝强深夜会友吃火锅，穿着时髦，精气神十足心情好",
      "newsContent": "近日，王宝强被拍到与一众好友去火锅店吃火锅，同行的还有漂亮的女性友人。<br/>从照片中可以看见，王宝强穿着一身黑，阔腿裤搭配着高筒靴子，羽绒服还是叠穿的，头发也梳得很有型，看着很是时髦，整个人精气神十足。<br/>众人吃饭结束后，王宝强走在最前头，还时不时回头与两位女性友人聊天，看上去心情很好，离开时也挥手向友人告别，可以发现，几人的关系还是非常好的。"
    }
]
```

