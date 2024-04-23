# 中间件

Express 是一个自身功能极简，完全是由路由和中间件构成一个的 web 开发框架：从本质上来说，一个 Express 应用就是在调用各种中间件。

**中间件（Middleware）** 就是一个**回调函数**，它可以接收参数 请求对象（req)）, 响应对象（ res）, 和 web 应用中处于请求-响应循环流程中的中间件的函数，一般被命名为 `next` 的变量。

中间件的功能包括：

- 执行任何代码。
- 修改请求和响应对象。
- 结束响应。
- 调用堆栈中的下一个中间件。

如果当前中间件没有结束响应，则必须调用 `next()` 方法将控制权交给下一个中间件，否则请求就会挂起。

中间件相当于一个回调函数，可以对请求对象和响应对象进行修改，比如加入新的方法。

## 应用级中间件

应用级中间件绑定在应用对象app上，中间件函数作为` app.use() `或者路由方法的回调函数。

```js
1. 通过 app.use() 或者路由方法来绑定中间件
2. 路由方法的回调函数就是中间件
```

**第一种方式 ：定义访问日志中间件:**

1. 创建 accesslog.js，作为单独模块，定义中间件的代码

需要使用到 [moment](https://www.npmjs.com/package/moment) npm包 

```js
moment包的使用
moment().format('YYYY [escaped] YYYY');    得到一个字符串
```

accesslog.js

```js
const moment = require('moment');
const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
    // 从请求报文中获取信息
    const ip = req.ip.slice(7);
    const method = req.method;
    const url = req.url;
    const dt = moment().format('YYYY-MM-DD HH:mm:ss');
    
    // 拼接日志内容
    const logMsg = `${ip} ${dt} ${method} ${url}\n`;
    console.log(logMsg);

    // 写入文件
    fs.appendFile(path.resolve(__dirname, '../logs/access.log'), logMsg, err => {
        if (err) {
            throw err;
        }
        // 成功写入日志 放行
        next();
    });
};
```

2. 在应用的入口文件挂载中间件

```js
// 导入自定义中间件
const accessLog = require('./middleware/accesslog');

// 创建服务
const app = express();

// 在所有路由方法的前面
// 挂载访问日志中间件
app.use(accessLog);
```

**第二种方式 ：路由方法的回调函数就是中间件:**

```js
// 首页路由
app.get('/index', (req, res,next) => {
    console.log('我也是中间件，路由回调就是中间件，我叫小乐子');
    next();
});
```

**第三种方式 ：直接将中间件挂载到应用上:**

```js
app.use((req, res, next) => {
    console.log('Hello， 我是中间件 Tom， How Are You?');
    
    // 结束响应
    //res.send('到这就结束了！');
    
    // 执行下一个中间件
    next();
});
```

**第三种方式 ：直接将中间件挂载到应用的指定路径上:**

```js
app.use('/login', (req, res, next) => {
    post(); // 执行不存在的函数 报错
    console.log('刷我的卡，我是中间件，我叫泰裤辣！');
    next();
    // console.log('next 后面的语句会执行');
});
```

多个中间件同时匹配，按照顺序响应，就像高速上的收费站，经过的中间件需要在处理后，进行放行Next();

## 错误处理中间件

> 错误处理中间件有 *4* 个参数，定义错误处理中间件时必须使用这 4 个参数。即使不需要 `next` 对象，也必须声明它，否则中间件会被识别为一个常规中间件，不能处理错误。
>
> 错误处理中间件需要挂载在所有路由和中间件的后面，如果路由回调函数或前面的中间件中出现错误，会自动进入错误处理中间件！

错误处理中间件和其他中间件定义类似，只是要使用 4 个参数，而不是 3 个，其写法如下： `(err, req, res, next)`。

```javascript
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

**定义一个错误处理中间件，响应500，且记录错误日志**

创建文件 catcherror.js，作为一个模块，代码如下：

```js
const moment = require('moment');
const fs = require('fs');
const path = require('path');

module.exports = (err, req, res, next) => {
    // 从请求报文中获取信息
    const ip = req.ip.slice(7);
    const method = req.method;
    const url = req.url;
    const dt = moment().format('YYYY-MM-DD HH:mm:ss');
    
    // 拼接日志内容
    // err.stack 记录详细的错误信息
    const errMsg = `${ip} ${dt} ${method} ${url} \n ${err.stack} \n\n\n\n`;

    // 写入文件
    fs.appendFile(path.resolve(__dirname, '../logs/error.log'), errMsg, err => {
        if (err) {
            throw err;
        }
    });

    // 响应 500
    res.status(500).send('<h1>500 服务器出错！</h1>');
};
```

在应用的入口文件挂载中间件

```js
// 导入自定义中间件
const catchError = require('./middleware/catcherror');

// 创建服务
const app = express();

// 在所有路由方法的后面
// 挂载访问日志中间件
app.use(catchError);
```

## 托管静态文件

将静态资源文件所在的目录作为参数传递给 `express.static` 中间件就可以提供静态资源文件的访问了。例如，假设在 `public` 目录放置了图片、CSS 和 JavaScript 文件，你就可以：

```
app.use(express.static('public'));
```

如果你的静态资源存放在多个目录下面，你可以多次调用 `express.static` 中间件：

访问静态资源文件时，`express.static` 中间件会根据目录添加的顺序查找所需的文件。

```js
app.use(express.static('public'));
app.use(express.static('files'));
```

如果你希望所有通过 `express.static` 访问的文件都存放在一个“虚拟（virtual）”目录（即目录根本不存在）下面，可以通过为静态资源目录[指定一个挂载路径](http://www.expressjs.com.cn/4x/api.html#app.use)的方式来实现，如下所示：

```Javascript
app.use('/static', express.static('public'));
```

## 路由级中间件

路由级中间件和应用级中间件一样，只是它绑定的对象为 `express.Router()`的返回值，路由级中间件可以实现路由的模块化。

可使用 `express.Router` 类创建模块化、可挂载的路由系统。`Router` 实例是一个完整的中间件和路由系统，因此常称其为一个 `mini-app`。

下面的实例程序创建了一个路由模块，并加载了一个中间件，定义了一些路由，并且将它们挂载至应用的路径上。

**实现路由模块化：**

创建路由文件 index.js:

```js
// 导入模块
const express = require('express');

// 创建路由对象
const route = express.Router();

// 路由
route.get('/', (req, res) => {
    res.redirect('/index');
});

// 路由
route.get('/index', (req, res,next) => {
    res.send(`
    <h1>首页</h1>
    <hr>
    <a href="/login">登录</a>
    `);
});

// 将路由对象作为暴露数据
module.exports = route;


```

创建路由文件 login.js

```js
// 导入模块
const express = require('express');

// 创建路由对象
const route = express.Router();


// 路由
// 这里由于 挂载路由的方式是指定路径，所以只写/login/后边的 这里的根就是login文件夹
route.get('/', (req, res) => {
    res.send(`
    <h1>登录</h1>
    <hr>
    <form action="/login" method="post">
        <input placeholder="请输入用户名" type="text" name="username">
        <input placeholder="请输入密码" type="password" name="userpwd">
        <button>提交</button>
    </form>
    `);
});

// 路由
route.post('/', (req, res) => {
    res.send('<h2>提交成功！</h2>');
});

// 将路由对象作为暴露数据
module.exports = route;
```

在入口文件中，将路由文件挂载到应用上：

```js
// 导入路由模块
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');

// 挂载路由模块
app.use(indexRouter);  //
app.use('/login', loginRouter);  // 挂载路由 指定路径
```

