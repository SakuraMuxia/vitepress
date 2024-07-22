# AXIOS

## Axios 概述

### axios 是什么?

Axios 是前端最流行的 ajax 请求库 ，没有之一，react、vue官方都推荐使用 的 Ajax 请求库。

官方网站：https://axios-http.com

仓库地址：https://github.com/axios/axios

中文文档：https://axios-http.com/zh/docs/intro

### axios特点

```javascript
1. 基于 XMLHttpRequest + Promise 的异步的 Ajax 请求库
2. 浏览器端、Node端都可以使用
3. 支持请求和响应拦截器
4. 支持请求取消 
5. 批量发送多个请求
6. 支持请求与响应的数据转换（二次封装）
```



## axios 的安装使用

### 浏览器中使用

下载后在页面引入或者直接使用 CDN

```html
<script src="axios脚本文件地址"></script>
```

```html
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```

### Node 中使用

**安装**

```bash
npm install axios
```

**代码中引入模块**

```js
const axios = require(‘axios’)
```



## axios 基本使用

```javascript
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
这个js文件就是创建一个全局变量 axios
```

axios方法返回的是Promise对象，data属性就是响应体，axios内部做了判断，判断出是一个json格式，自动为json格式的数据，

```js
// axios 设置请求配置项
axios({
    method: 'GET',
    url: 'http://127.0.0.1/server',
    其他请求配置项... // 没有设置，就使用默认值
})
.then(成功回调， 失败回调);

// axios 第一个参数是URL，第二个参数是请求配置项
axios('http://127.0.0.1/server', {
    method: 'GET',
    其他请求配置项...
})
.then(成功回调， 失败回调);

// axios 设置请求配置项 同 axios功能一致
axios.request({
    method: 'GET',
    url: 'http://127.0.0.1/server',
    其他请求配置项... // 没有设置，就使用默认值
})
.then(成功回调， 失败回调);


// 请求方法别名
axios
.get('http://127.0.0.1/server', {请求配置项...})
.then(成功回调， 失败回调);

axios
.post('http://127.0.0.1/server', {请求体}, {请求配置项...})
.then(成功回调， 失败回调);

axios
.put('http://127.0.0.1/server', {请求体}, {请求配置项...})
.then(成功回调， 失败回调);

axios
.patch('http://127.0.0.1/server', {请求体}, {请求配置项...})
.then(成功回调， 失败回调);
```

* axios(config): 通用/最本质的发送意类型请求的方式。
* axios(url[, config]): 第一个参数是地址，第二个参数是配置项。

* axios.request(config): 等同于axios(config)  （了解）
* axios.get(url[, config]): 发get请求
* axios.delete(url[, config]): 发delete请求
* axios.post(url[, data, config]): 发post请求
* axios.put(url[, data, config]): 发put请求
* axios.patch(url[, data[, config]]) 发送patch请求



## axios 请求配置项

### 常用的请求配置项

```js
{
 	// `url` 是用于请求的服务器 URL
  	url: '/user',

  	// `method` 是创建请求时使用的方法
  	method: 'get', // default

  	// `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  	// 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  	baseURL: 'https://some-domain.com/api/',
        
    // `headers` 是即将被发送的请求头
  	headers: {
        'Content-type': 'appliation/json',
        // 可以在这里设置请求头，解决跨域问题，卖座网的案例
    },
    
    // `params` 是即将与请求一起发送的 URL 参数 相当于查询字符串
    // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
    params: {
       ID: 12345
    },
      
    // `data` 是作为请求主体被发送的数据
    // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
    // 在没有设置 `transformRequest` 时，必须是以下类型之一：
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams 会自动处理为json格式
    // - 浏览器专属：FormData, File, Blob
    // - Node 专属： Stream
    data: {
       firstName: 'Fred'
    },

     // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
     // 如果请求话费了超过 `timeout` 的时间，请求将被中断
     timeout: 1000,
         
     // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  	 responseType: 'json', // default
}
```

> **注意：** 更多的请求配置项见附录

### params规避浏览器缓存

```javascript
params: {
    ID: 12345,
    // 使用时间戳规避浏览器缓存
    t:Date.now
},
```

### params使用JSON.stringify()

将对象转为 json 格式的字符串

```javascript
params: {
    
    // 将对象转为 json 格式的字符串
    X-client-Info:JSON.stringify({"a":"3000","b":"1000"})
},
```



### 每次发送请求时设置配置项

```js
axios({
    配置项
    ...
});

axios(url, {
    配置项
   	...
});

axios.request(url, {
    配置项
    ...
});

axios.get(url, {
    配置项
    ...
});

axios.post(url, data, {
    配置项
    ...
})
```

### 设置全局配置项

 设置全局配置项，将被应用到每一个要求。 

```js
axios.defaults.baseURL = "http://api.example.com";
axios.defaults.timeout = 2000;
axios.defaults.headers = {
    token:"abc"
}
```



## 响应结构

```js
{
  // `data` 由服务器提供的响应体
  data: {},

  // `status` 来自服务器响应的 HTTP 状态码
  status: 200,

  // `statusText` 来自服务器响应的 HTTP 状态信息
  statusText: 'OK',

  // `headers` 服务器响应的头
  headers: {},

   // `config` 是为请求提供的配置信息
  config: {},
 // 'request'
  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance the browser
  request: {} //XHR对象
}
```

## 获取响应体内容

方式1：使用then直接获取

```javascript
axios.get("https://api.github.com/search/repositories",{
    // ?q=r&sort=stars
    params:{
        q:"r",
        sort:"stars"
    }
}).then(response=>{
    console.log(response.data);
})
```

方式2：使用解构赋值获取数据

```javascript
// 方式2 结构赋值
axios.get("https://api.github.com/search/repositories",{
    // ?q=r&sort=stars
    params:{
        q:"r",
        sort:"stars"
    }
}).then(({data})=>{
    console.log(data);
})
```

方式3：使用 async await 函数

```javascript
// 方式3 async await 函数
const {data} = await  axios.get("https://api.github.com/search/repositories",{
    params: {
        q: "r",
        sort: "stars"
    }
});
console.log(data);
```

原始axios获取数据

```javascript
axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(response => {	// 正常请求
    this.tableData = response.data;
  })
  .catch(error => {	// 出现异常
    console.log(error);
  });

// 因为请求后即使没出现异常，也可能会出现请求没获取到任何数据的情况，这时候要加些判断过滤了，还有如果出错了要给用户提示

axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(response => {	// 正常请求
    if(!response || !response.data){
         this.warnMsg("数据获取失败！");
         this.tableData = [];
    }else if(result.data.status == 0){
         this.tableData = result.data;
    }
  })
  .catch(error => {	// 出现异常
    this.errMsg("系统异常，数据获取失败！");
    console.log(error);
  });

// Promise中有finally，可以加在后面
return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    }).finally(console.log("执行finally"))
// 就直接自己定义一个对象用于回调时返回所需数据吧，这回都回调then
return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
.then(response => {
     if (!response || !response.data) {
         Message("数据获取失败！");
         resolve({ ok: false, data: null });	// 回调then，返回失败提示
      } else if (response.data.status == 0) {
         resolve({ ok: true, data: response.data.data });	// 回调then，请求得到的数据
      } else {
         Message(response.data.msg);
         resolve({ ok: false, data: null });	// 回调then，返回失败状态
      }
}).catch(err => {
     Message("系统异常！" + err);
     resolve({ ok: false, data: null });	// 回调then，返回失败状态
 })
    
```



## 创建 axios 实例

```javascript
1. 根据指定配置创建一个自定义的 axios 实例, 每个自定义的 axios 实例都有自己的配置。

2. axios 实例只是没有取消请求和批量发请求的方法, 其它所有方法与默认 axios 本身是一样的。

3. 为什么要设计这个语法?
   (1) 需求: 项目中有部分接口需要的配置与另一部分接口需要的配置不太一样, 如何处理
   (2) 解决: 创建 2 个自定义 axios 新实例, 每个都有自己特有的配置, 分别应用到不同要求的接口请求中
```

```js
// 设置请求配置项
const instance = axios.create({
  baseURL: 'https://example.com/api/',
  timeout: 1000,
});

instance.get(url).then(res => {
    console.log(res);
});
```



## 拦截器

拦截器本质上是一个函数，参数是 两个回调函数 ，返回一个promise对象。

在请求或响应被 `then` 或 `catch` 处理前拦截它们。

```js
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
```

如果你想在稍后移除拦截器，可以这样：

```js
// 定义拦截器的时候使用变量记录拦截器的唯一标识
const reqInterceptor = axios.interceptors.request.use(function () {/*...*/});
const resInterceptor = axios.interceptors.response.use(function () {/*...*/});
// 根据唯一标识移除拦截器
axios.interceptors.request.eject(reqInterceptor);
axios.interceptors.response.eject(resInterceptor);
```

可以为自定义 axios 实例添加拦截器

```js
const instance = axios.create();
instance.interceptors.request.use(function () {/*...*/});
```

调用 axios() 并不是立即发送 ajax 请求, 而是需要经历一个较长的流程

```javascript
1. 流程: 请求拦截器2 -> 请求拦截器1 -> 发ajax请求 -> 响应拦截器1 -> 响应拦截器2 -> 请求的回调
2. 注意: 此流程是通过 Promise 串连起来的, 请求拦截器传递的是 config, 响应拦截器传递的是 response
```



## 取消请求

**基本流程：**

```js
1. 请求配置项中配置 cancelToken 对象
2. 用变量保存用于取消请求的 cancel 函数
3. 在后面特定时机调用 cancel 函数实现取消请求
4. 在错误回调中判断如果 error 是 cancel, 做相应处理
```

**具体实现：**

```js
// 定义变量用于保存 cancel 函数
let cancel = null;

axios({
    method: "GET",
    url:'api.emaple.com',
    // 配置取消请求的选项 这里的 ()=>{} 作为回调函数 传入CancelToken这个类中
    // callback : (value)=>{}
    // CancelToken这个类中的执行器函数exector(callback)，返回一个函数给cb作为参数,
    /*
    constructor(exector) {
        const callback  = value = {
        	...经过处理...
        	return value; // value是一个函数
        }
    	
        //调用
        exector(callback)
    }
    */
    const
    cancelToken: new axios.CancelToken(cb => {
        cancel = cb; // 把取消请求函数 赋值给cancel变量，这个变量只能取消这个请求，其他请求取消不了
    })
})
.then(response => {
    console.log(response);
})
.catch(err => {
    console.log(err);
    console.log(axios.isCancel(err));// 判断错误信息是否由取消请求触发的
});

// 如果需要取消，只需调用 cancel 函数
cancel();
```



## 批量发送请求(批量处理响应)

```js
const r1 = axios.get("http://127.0.0.1:3000/computers/1");
const r2 = axios.get("http://127.0.0.1:3000/computers/2");
const r3 = axios.get("http://127.0.0.1:3000/computers/3");

axios
.all([r1,r2,r3]) // axios.all()方法 返回的是一个数组，数组中每个值都是Promise的值，功能和promise.all()一样
.then(axios.spread((s1,s2,s3) => { // 和 res => {} 一样
    console.log(s1,s2,s3);
}))

/* 
.then(res => {
	const [s1,s2,s3,s4] = res;
	consolo.log(s1,s2,s3,s4);
})
*/

.catch(err => {
    console.log(err);
})
```



## [附录] axios 方法总结

* axios(config): 通用/最本质的发任意类型请求的方式。
* axios(url[, config]): 第一个参数是地址，第二个参数是配置项。
* axios.request(config): 等同于axios(config) 
* axios.get(url[, config]): 发get请求
* axios.delete(url[, config]): 发delete请求
* axios.post(url[, data, config]): 发post请求
* axios.put(url[, data, config]): 发put请求
* axios.patch(url[, data, config]): 发put请求
* axios.defaults.xxx: 请求的默认全局配置
* axios.interceptors.request.use(): 添加请求拦截器
* axios.interceptors.response.use(): 添加响应拦截器
* axios.create([config]): 创建一个新的axios实例。
* axios.CancelToken(): 用于创建取消请求的token对象
* axios.isCancel(): 是否是一个取消请求的错误
* axios.all(promises): 用于批量执行多个异步请求
* axios.spread(): 用来指定接收所有成功数据的回调函数的方法

![](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/axios-function.png)



## [附录] 请求配置项

```js
{
   // `url` 是用于请求的服务器 URL
  url: '/user',

  // `method` 是创建请求时使用的方法
  method: 'get', // default

  // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
  // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
  baseURL: 'https://some-domain.com/api/',

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [function (data, headers) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    return data;
  }],

  // `headers` 是即将被发送的请求头
  headers: {'X-Requested-With': 'XMLHttpRequest'},

  // `params` 是即将与请求一起发送的 URL 参数
  // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  params: {
    ID: 12345
  },

   // `paramsSerializer` 是一个负责 `params` 序列化的函数
  // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
  paramsSerializer: function(params) {
    return Qs.stringify(params, {arrayFormat: 'brackets'})
  },

  // `data` 是作为请求主体被发送的数据
  // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
  // 在没有设置 `transformRequest` 时，必须是以下类型之一：
  // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
  // - 浏览器专属：FormData, File, Blob
  // - Node 专属： Stream
  data: {
    firstName: 'Fred'
  },

  // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
  // 如果请求话费了超过 `timeout` 的时间，请求将被中断
  timeout: 1000,

   // `withCredentials` 表示跨域请求时是否需要使用凭证
  withCredentials: false, // default

  // `adapter` 允许自定义处理请求，以使测试更轻松
  // 返回一个 promise 并应用一个有效的响应 (查阅 [response docs](#response-api)).
  adapter: function (config) {
    /* ... */
  },

 // `auth` 表示应该使用 HTTP 基础验证，并提供凭据
  // 这将设置一个 `Authorization` 头，覆写掉现有的任意使用 `headers` 设置的自定义 `Authorization`头
  auth: {
    username: 'janedoe',
    password: 's00pers3cret'
  },

   // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
  responseType: 'json', // default

  // `responseEncoding` indicates encoding to use for decoding responses
  // Note: Ignored for `responseType` of 'stream' or client-side requests
  responseEncoding: 'utf8', // default

   // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
  xsrfCookieName: 'XSRF-TOKEN', // default

  // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
  xsrfHeaderName: 'X-XSRF-TOKEN', // default

   // `onUploadProgress` 允许为上传处理进度事件
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` 允许为下载处理进度事件
  onDownloadProgress: function (progressEvent) {
    // 对原生进度事件的处理
  },

   // `maxContentLength` 定义允许的响应内容的最大尺寸
  maxContentLength: 2000,

  // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },

  // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
  // 如果设置为0，将不会 follow 任何重定向
  maxRedirects: 5, // default

  // `socketPath` defines a UNIX Socket to be used in node.js.
  // e.g. '/var/run/docker.sock' to send requests to the docker daemon.
  // Only either `socketPath` or `proxy` can be specified.
  // If both are specified, `socketPath` is used.
  socketPath: null, // default

  // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
  // `keepAlive` 默认没有启用
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),

  // 'proxy' 定义代理服务器的主机名称和端口
  // `auth` 表示 HTTP 基础验证应当用于连接代理，并提供凭据
  // 这将会设置一个 `Proxy-Authorization` 头，覆写掉已有的通过使用 `header` 设置的自定义 `Proxy-Authorization` 头。
  proxy: {
    host: '127.0.0.1',
    port: 9000,
    auth: {
      username: 'mikeymike',
      password: 'rapunz3l'
    }
  },

  // `cancelToken` 指定用于取消请求的 cancel token
  // （查看后面的 Cancellation 这节了解更多）
  cancelToken: new CancelToken(function (cancel) {
  })
}
```

# REST API

## 后端 API

### 非 REST(restless) API：地址一般不会重复

```javascript
增加：POST http://127.0.0.1/news/create
删除：GET 	http://127.0.0.1/news/delete?id=12121
修改：POST http://127.0.0.1/news/modify
查找：GET	http://127.0.0.1/news/list
```

> 1. 不同的 URL 路径对应不同的 CURD 操作。
> 2. 请求方式一般只有GET、POST。

### REST(restful) API：URL路径不变，改变的只是请求方式

```javascript
Creae  增加：POST http://127.0.0.1/news
Delete 删除：DELETE http://127.0.0.1/news/id
Update 更新：PUT http://127.0.0.1/news
Read   读取：GET http://127.0.0.1/news
```

> 1. 所有的操作使用相同的 URL 路径，由请求方式决定哪一种操作
> 2. 请求方式会用到 GET、POST、PUT、DELETE 等

```js
// 删除请求配置项
functionA(){
    delete this.$route.query.categoryName
}
```



## json-server

### 使用json-server搭建 restful API

### json-server 是什么?

json-server 是用来快速搭建模拟的、 REST API 的工具包，可以搭建站点服务并提供数据的操作。可以作为前端工程师的开发测试工具。

在线文档: https://github.com/typicode/json-server

### 使用json-server 

**安装 Node**
由于json-server需要通过Node对其进行启动，所以首先要安装Node。

**全局安装 json-server**

```shell
npm install json-server -g
```

**检查是否安装成功**

```shell
json-server --version
```

**准备一份JSON文件: 内容必须是一个对象，不能是数组**

**启动**

```shell
json-server --watch json文件的地址 --port 6000 --host 127.0.0.1 --delay 2000
```

```shell
--watch:	可以省略，如果省略那么数据发生变化，站点服务不会及时响应。
--delay:	指定延长响应的时间 ，单位为毫秒。
--port:		指定端口号
--host:		指定主机名
```

###  使用浏览器访问测试

```shell
http://192.168.1.1:3000/scores
http://192.168.1.1:3000/scores/1
```

### 使用工具测试

**Postman：** https://www.postman.com

**Apipost：** https://www.apipost.cn

这两个工具都是用于测试后端 API 的软件，可以发送各种方式的 HTTP 请求。

### json-server 后端服务的 API 规则

```javascript
查询
GET http://localhost:6100/news
GET http://localhost:6100/news/2

增加
POST http://localhost:6100/news  需要请求体

修改
PUT	http://localhost:6100/news/2	整个修改
PATCH http://localhost:6100/news/2		修改单个数据中的属性

删除
DELETE http://localhost:6100/news/2
```

news.json

```json
{
    "news":[
        {
            "id":1,
            "title":"A-SOUL",
            "content":"A-SOUL是2020年11月23日公开的字节跳动朝夕光年工作室旗下、与乐华娱乐合作打造的虚拟偶像团体，主要于Bilibili和抖音上开展活动。企划前身为“Project V”虚拟偶像女团，未证实疑似前身企划为虚拟偶像“蓝闪Menelaus"
        },
        {
            "id": 2,
            "title": "虚研社",
            "content":"虚研社是中国最早进行虚拟UP主活动的社团之一，由微笑科技创建，2017年推出了大陆最早同时也是偶像组合企划“虚拟次元计划”的首位虚拟UP主——小希，同时“虚拟UP主”一词的概念也是由小希于出道视频中提出"
        },
        {
            "id": 3,
            "title": "psplive",
            "content":"psplive（又称Project SP，简称P-SP）是在中国诞生的虚拟艺人团体，于2019年9月24日正式公开"
        }
    ]
}
```



## 配置 hosts 文件

windows 系统的 hosts 文件一般位于 `C:\Windows\System32\drivers\etc\` 下， macos 系统的 host 文件一般位于 `/etc` 目录下。

hosts 文件的格式如下：

```config
127.0.0.1       localhost 
127.0.0.1       example.com
```

如上面的设置，当我们向 example.com 这个地址发送请求的时候，会映射到 127.0.0.1 这个 IP。

# Fetch

Fetch就是一个方法或者函数，返回一个Promise对象

Fetch 被设计用来取代 XMLHttpRequest，它提供了许多与 XMLHttpRequest 相同的功能，但被设计成更具可扩展性和高效性。

## fetch 方法返回一个 Promise 对象

```js
fetch('http://example.com/movies.json')
.then(response => response.json()) // 调用响应体的json（）方法 把响应体处理为json格式，读取响应体 ，等待读取流读取结束。
.then(data => console.log(data));
```



## fetch 设置请求配置项

```js
fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE
    headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data) // body data type must match "Content-Type" header
});
```

更多选项： https://developer.mozilla.org/zh-CN/docs/Web/API/fetch

## 代码片段

代码片段：把常见的代码编一个快捷键，在使用的时候输入快捷键即可出现代码。

```js
bootcss bootjs axiosjs
在vscode中的
文件 - 首选项 - 配置用户代码片段 - 选择配置语言 - 
    全局 -
    css - 
    html - 仅仅在html文件中起作用
	
双引号 包裹双引号 需要使用反斜杠转义
```

## 跨域

```js
页面的 协议 域名 端口号和后台服务的 协议 域名 端口号不在同一个服务器上就是跨域。

json-server 默认解决了跨域问题。
```

