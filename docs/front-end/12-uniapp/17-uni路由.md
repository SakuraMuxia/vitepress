# uni路由

该组件类似HTML中的`<a>`组件，但只能跳转本地页面。目标页面必须在pages.json中注册。

除了组件方式，API方式也可以实现页面跳转，另见：https://uniapp.dcloud.io/api/router?id=navigateto

**属性说明**

| 属性名                 | 类型    | 默认值          | 说明                                                         |
| :--------------------- | :------ | :-------------- | :----------------------------------------------------------- |
| url                    | String  |                 | 应用内的跳转链接，值为相对路径或绝对路径，如："../first/first"，"/pages/first/first"，注意不能加 `.vue` 后缀 |
| open-type              | String  | navigate        | 跳转方式                                                     |
| delta                  | Number  |                 | 当 open-type 为 'navigateBack' 时有效，表示回退的层数        |
| animation-type         | String  | pop-in/out      | 当 open-type 为 navigate、navigateBack 时有效，窗口的显示/关闭动画效果，详见：[窗口动画](https://uniapp.dcloud.net.cn/api/router#animation) |
| animation-duration     | Number  | 300             | 当 open-type 为 navigate、navigateBack 时有效，窗口显示/关闭动画的持续时间。 |
| render-link            | boolean | true            | 是否给 navigator 组件加一层 a 标签控制 ssr 渲染              |
| hover-class            | String  | navigator-hover | 指定点击时的样式类，当hover-class="none"时，没有点击态效果   |
| hover-stop-propagation | Boolean | false           | 指定是否阻止本节点的祖先节点出现点击态                       |
| hover-start-time       | Number  | 50              | 按住后多久出现点击态，单位毫秒                               |
| hover-stay-time        | Number  | 600             | 手指松开后点击态保留时间，单位毫秒                           |
| target                 | String  | self            | 在哪个小程序目标上发生跳转，默认当前小程序，值域self/miniProgram |

**open-type 有效值**

| 值           | 说明                                   |
| :----------- | :------------------------------------- |
| navigate     | 对应 uni.navigateTo 的功能             |
| redirect     | 对应 uni.redirectTo 的功能             |
| switchTab    | 对应 uni.switchTab 的功能              |
| reLaunch     | 对应 uni.reLaunch 的功能               |
| navigateBack | 对应 uni.navigateBack 的功能           |
| exit         | 退出小程序，target="miniProgram"时生效 |

## 路由跳转

```ts
页面的跳转方式有两种

编程式导航	类似于vue中 router.push(...)
声明式导航 	类似于vue中 <router-link :to="...">
```

```ts
新建一个文件夹detail,用于存放详情的页面
设置页面的标题
```

## 声明式导航

```ts
navigitor 组件
[属性]
url				当前小程序内的跳转链接
open-type		跳转方式
```

```xml
<navigitor url="" open-type="navigate" ></navigitor>
```

```ts
open-type = "reLaunch" 关闭所有页面，打开到应用内的某个页面(能跳到tabbar)
open-type = "navigate" 保留当前页面，跳转到应用内的某个页面(不能跳到tabbar)，默认
open-type = "redirect" 关闭当前页面，跳转到应用内的某个页面(不能跳到tabbar)
```

```ts
<navigator url="/pages/shopcart/shopcart" open-type="reLaunch">
    <view class="icon_wrap flex">
        <van-icon name="shopping-cart" color="#666" size="22px"></van-icon>
        <text>购物车</text>
    </view>
</navigator>
```

## uni请求

### uni.request(OBJECT)

发起网络请求。

**OBJECT 参数说明**

| 参数名               | 类型                      | 必填 | 默认值 | 说明                                                         |
| :------------------- | :------------------------ | :--- | :----- | :----------------------------------------------------------- |
| url                  | String                    | 是   |        | 开发者服务器接口地址                                         |
| data                 | Object/String/ArrayBuffer | 否   |        | 请求的参数                                                   |
| header               | Object                    | 否   |        | 设置请求的 header，header 中不能设置 Referer                 |
| method               | String                    | 否   | GET    | 有效值详见下方说明                                           |
| timeout              | Number                    | 否   | 60000  | 超时时间，单位 ms                                            |
| dataType             | String                    | 否   | json   | 如果设为 json，会对返回的数据进行一次 JSON.parse，非 json 不会进行 JSON.parse |
| responseType         | String                    | 否   | text   | 设置响应的数据类型。合法值：text、arraybuffer                |
| sslVerify            | Boolean                   | 否   | true   | 验证 ssl 证书                                                |
| withCredentials      | Boolean                   | 否   | false  | 跨域请求时是否携带凭证（cookies）                            |
| firstIpv4            | Boolean                   | 否   | false  | DNS解析时优先使用ipv4                                        |
| enableHttp2          | Boolean                   | 否   | false  | 开启 http2                                                   |
| enableQuic           | Boolean                   | 否   | false  | 开启 quic                                                    |
| enableCache          | Boolean                   | 否   | false  | 开启 cache                                                   |
| enableHttpDNS        | Boolean                   | 否   | false  | 是否开启 HttpDNS 服务。如开启，需要同时填入 httpDNSServiceId 。 HttpDNS 用法详见 [移动解析HttpDNS](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/HTTPDNS.html) |
| httpDNSServiceId     | String                    | 否   |        | HttpDNS 服务商 Id。 HttpDNS 用法详见 [移动解析HttpDNS](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/HTTPDNS.html) |
| enableChunked        | Boolean                   | 否   | false  | 开启 transfer-encoding chunked                               |
| forceCellularNetwork | Boolean                   | 否   | false  | wifi下使用移动网络发送请求                                   |
| enableCookie         | Boolean                   | 否   | false  | 开启后可在headers中编辑cookie                                |
| cloudCache           | Object/Boolean            | 否   | false  | 是否开启云加速（详见[云加速服务](https://smartprogram.baidu.com/docs/develop/extended/component-codeless/cloud-speed/introduction/)） |
| defer                | Boolean                   | 否   | false  | 控制当前请求是否延时至首屏内容渲染后发送                     |
| success              | Function                  | 否   |        | 收到开发者服务器成功返回的回调函数                           |
| fail                 | Function                  | 否   |        | 接口调用失败的回调函数                                       |
| complete             | Function                  | 否   |        | 接口调用结束的回调函数（调用成功、失败都会执行）             |

**success 返回参数说明**

| 参数       | 类型                      | 说明                                         |
| :--------- | :------------------------ | :------------------------------------------- |
| data       | Object/String/ArrayBuffer | 开发者服务器返回的数据                       |
| statusCode | Number                    | 开发者服务器返回的 HTTP 状态码               |
| header     | Object                    | 开发者服务器返回的 HTTP Response Header      |
| cookies    |                           | 开发者服务器返回的 cookies，格式为字符串数组 |

**示例**

```ts
写法方式1
function request(){
	uni.request({
		url:"https://jsonplaceholder.typicode.com/posts",
		success:res=>{
			console.log(res);
			arrs.value = res.data 
		}
	})
}
写法方式2
function request(){
	uni.request({
		url:"https://jsonplaceholder.typicode.com/posts"
	}).then(res=>{
		arrs.value = res.data 
	})
}
写法方式3
async function request(){
	let res = await uni.request({
		url:"https://jsonplaceholder.typicode.com/posts"
	})	
	arrs.value = res.data 
}
```

**请求参数**

**data 数据说明**

最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String。转换规则如下：

- 对于 `GET` 方法，会将数据转换为 query string。例如 `{ name: 'name', age: 18 }` 转换后的结果是 `name=name&age=18`。
- 对于 `POST` 方法且 `header['content-type']` 为 `application/json` 的数据，会进行 JSON 序列化。
- 对于 `POST` 方法且 `header['content-type']` 为 `application/x-www-form-urlencoded` 的数据，会将数据转换为 query string。

**示例**

```javascript
uni.request({
    url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
    data: {
        text: 'uni.request'
    },
    header: {
        'custom-header': 'hello', //自定义请求头信息
        'token':'xxxx'
    },
    method:"get",
    success: (res) => {
        console.log(res.data);
        this.text = 'request success';
    }
});
```

**返回值**

如果希望返回一个 `requestTask` 对象，需要至少传入 success / fail / complete 参数中的一个。例如：

```javascript
var requestTask = uni.request({
	url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
	complete: ()=> {}
});
requestTask.abort();
```

如果没有传入 success / fail / complete 参数，则会返回封装后的 Promise 对象：[Promise 封装](https://uniapp.dcloud.net.cn/api/index.html#promise-封装)

通过 `requestTask`，可中断请求任务。

### requestTask.abort()

如果没有传入 success / fail / complete 参数，则会返回封装后的 Promise 对象：[Promise 封装](https://uniapp.dcloud.net.cn/api/index.html#promise-封装)

通过 `requestTask`，可中断请求任务。

