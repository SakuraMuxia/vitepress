# 全局对象API

wx. wx是微信小程序中的全局对象,每一个页面中都可以使用,他身上有很多API方法

## wx.navigateTo(Object)

```ts
wx.navigateTo(Object object)
作用：保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面

对象中属性:
	url		string	需要跳转的应用内非 tabBar 的页面的路径,路径后可以带参数,如 'path?key=value&key2=value2'
	events	object 	页面间通信接口，用于监听被打开页面发送到当前页面的数据
    success	function	接口调用成功的回调函数
	fail	function	接口调用失败的回调函数
	complete function	接口调用结束的回调函数（调用成功、失败都会执行）
```

## wx.redirectTo(Object)

```ts
wx.redirectTo(Object object)
作用：关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。

对象中属性:
	url		string	需要跳转的应用内非 tabBar 的页面的路径,路径后可以带参数,如 'path?key=value&key2=value2'
	events	object 	页面间通信接口，用于监听被打开页面发送到当前页面的数据
    success	function	接口调用成功的回调函数
	fail	function	接口调用失败的回调函数
	complete function	接口调用结束的回调函数（调用成功、失败都会执行）
```

## wx.pageScrollTo(Object)

```ts
将页面滚动到目标位置，支持选择器和滚动距离两种方式定位
```

| 属性      | 类型     | 默认值 | 必填 | 说明                                                         |
| :-------- | :------- | :----- | :--- | :----------------------------------------------------------- |
| scrollTop | number   |        | 否   | 滚动到页面的目标位置，单位 px                                |
| duration  | number   | 300    | 否   | 滚动动画的时长，单位 ms                                      |
| selector  | string   |        | 否   | 选择器                                                       |
| offsetTop | number   |        | 否   | 偏移距离，需要和 selector 参数搭配使用，可以滚动到 selector 加偏移距离的位置，单位 px |
| success   | function |        | 否   | 接口调用成功的回调函数                                       |
| fail      | function |        | 否   | 接口调用失败的回调函数                                       |
| complete  | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |

## wx.request(Object)

发起 HTTPS 网络请求

参数：一个对象，对象中的属性如下

| 属性    | 类型                      | 默认值 | 必填 | 说明                                                         |
| :------ | :------------------------ | :----- | :--- | :----------------------------------------------------------- |
| url     | string                    |        | 是   | 开发者服务器接口地址                                         |
| data    | string/object/ArrayBuffer |        | 否   | 请求的参数                                                   |
| header  | Object                    |        | 否   | 设置请求的 header，header 中不能设置 Referer。 `content-type` 默认为 `application/json` |
| timeout | number                    |        | 否   | 超时时间，单位为毫秒。默认值为 60000                         |
| method  | string                    | GET    | 否   | HTTP 请求方法                                                |

method 属性值

```ts
OPTIONS		HTTP 请求 OPTIONS
GET			HTTP 请求 GET
HEAD		HTTP 请求 HEAD
POST		HTTP 请求 POST
PUT			HTTP 请求 PUT
DELETE		HTTP 请求 DELETE
TRACE		HTTP 请求 TRACE
CONNECT		HTTP 请求 CONNECT
```

| 属性     | 类型   | 默认值 | 必填           |
| -------- | ------ | ------ | -------------- |
| dataType | string | json   | 返回的数据格式 |

dataType 属性值

```ts
json	返回的数据为 JSON，返回后会对返回的数据进行一次 JSON.parse
其他	不对返回的内容进行 JSON.parse
```

**object.success 回调函数**

| 属性       | 类型                      | 说明                                         |
| :--------- | :------------------------ | :------------------------------------------- |
| data       | string/Object/Arraybuffer | 开发者服务器返回的数据                       |
| statusCode | number                    | 开发者服务器返回的 HTTP 状态码               |
| header     | Object                    | 开发者服务器返回的 HTTP Response Header      |
| cookies    | Array                     | 开发者服务器返回的 cookies，格式为字符串数组 |

**使用案例**

```ts
// 网络请求全部的页面使用--功能封装函数(复用)
// params:调用函数传递参数 {url:'xxxx'.method:'post',data:{a:1}}
export default (params) => {
    return new Promise((resolve,reject)=>{
        //请求基础路径
        const baseURL = 'https://gmall-prod.atguigu.cn'
        //发请求之前加载效果出来
        wx.showLoading({
            title: '加载....',
        });
        // 获取token信息
        const token = wx.getStorageSync('TOKEN');
        // 定义请求头
        let header = {};
        // 如果token存在,添加请求头
        if (token) {
            header.token = token;
        }
        // 发请求
        wx.request({
            //请求URL----绝对路径
            url: baseURL + params.url,
            //请求方式
            method: params.method || "GET",
            //携带请求体
            data: params.data || {},
            // 携带请求头
            header,
            //成功回调
            //res即为服务器响应数据
            success(res) {
                //返回一个成功的Promise对象
                //简化数据
                resolve(res.data);
            },
            fail(error) {
                reject(error);
            },
            //成功与失败钩子
            complete() {
                //加载效果取消
                wx.hideLoading()
            }
        })
    })
}
```



## wx.showLoading(Object)

显示 loading 提示框。需主动调用 wx.hideLoading() 才能关闭提示框

参数：object

| 属性     | 类型     | 默认值 | 必填 | 说明                                             |
| :------- | :------- | :----- | :--- | :----------------------------------------------- |
| title    | string   |        | 是   | 提示的内容                                       |
| mask     | boolean  | false  | 否   | 是否显示透明蒙层，防止触摸穿透                   |
| success  | function |        | 否   | 接口调用成功的回调函数                           |
| fail     | function |        | 否   | 接口调用失败的回调函数                           |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

##  wx.hideLoading()

取消加载loading效果

## wx.load()

**登陆流程**

```shell
# 使用 指南-开放能力- 用户信息-小程序登陆
```

![image-20241120141230357](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20241120141230357.png)

```ts
说明
调用 wx.login() 获取 临时登录凭证code ，并回传到开发者服务器。
调用 auth.code2Session 接口，换取 用户唯一标识 OpenID 、 用户在微信开放平台账号下的唯一标识UnionID（若当前小程序已绑定到微信开放平台账号） 和 会话密钥 session_key。
之后开发者服务器可以根据用户标识来生成自定义登录态，用于后续业务逻辑中前后端交互时识别用户身份。

自定义登录态：相当于就是对 session_key 和 openid 进行加密处理

注意事项
会话密钥  session_key 是对用户数据进行 加密签名 的密钥。为了应用自身的数据安全，开发者服务器不应该把会话密钥下发到小程序，也不应该对外提供这个密钥。
临时登录凭证 code 只能使用一次
```

调用接口获取登录凭证（code）。通过凭证进而换取用户登录态信息，包括用户在当前小程序的唯一标识（openid）、微信开放平台账号下的唯一标识（unionid，若当前小程序已绑定到微信开放平台账号）及本次登录的会话密钥（session_key）等。用户数据的加解密通讯需要依赖会话密钥完成

| 属性     | 类型     | 默认值 | 必填 | 说明                                           |
| :------- | :------- | :----- | :--- | :--------------------------------------------- |
| timeout  | number   |        | 否   | 超时时间，单位ms                               |
| success  | function |        | 否   | 接口调用成功的回调函数                         |
| fail     | function |        | 否   | 接口调用失败的回调函数                         |
| complete | function |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行 |
|          |          |        |      |                                                |

**使用案例**

```js
// pages/login/login.js
import {reqToken} from '../../api/index'
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    // 登陆按钮回调钩子
    goLogin(){
        // 调用 wx.login 方法获取 code
        // 点击授权登录按钮:需要通过wx.login获取用户登录临时凭证code 
        wx.login({
            success: (res) => {
                // 调用登陆借口
                this.getToken(res.code)
            },
        })
    },
    // 获取token方法
    async getToken(code){
        const result =  await reqToken(code);
        if(result.code==200){
            //微信小程序本地持久化存储token 上限10M
            wx.setStorageSync('TOKEN', result.data.token);
            //跳转到编辑页
            wx.redirectTo({
                url: '/pages/edit/edit',
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },
})
```

## wx.setStorageSync()

```ts
把token存在本地存储中(上限10M,PC上限5M) wx.setStorageSync("Token",value)
登陆成功后使用 redirectTo(不保留当前页面痕迹) 跳转页面进入编辑页面(方便回退到tabbar页面)

登陆成功后在request.js中获取本地token, wx.getStorageSync('TOKEN');
在请求头中添加token

封装获取用户信息的接口(携带参数 header:{token})
```



## wx.getStorageSync()

```ts
把token存在本地存储中(上限10M,PC上限5M) wx.setStorageSync("Token",value)
登陆成功后使用 redirectTo(不保留当前页面痕迹) 跳转页面进入编辑页面(方便回退到tabbar页面)

登陆成功后在request.js中获取本地token, wx.getStorageSync('TOKEN');
在请求头中添加token

封装获取用户信息的接口(携带参数 header:{token})
```

## wx.requestPayment(object)

支付流程：开发指引-左侧开发指引

```ts
支付流程：开发指引-左侧开发指引

微信鉴权：微信平台做的处理，有没有开通网上银行，余额


```

![image-20241129141558634](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20241125164914359.png)

```ts
1. 发送请求获取订单号

2. 根据订单号,获取支付参数信息

3. wx.requestPayment(object) 发起支付

4. 支付成功的回调
success(){
    查询支付状态,调用 查询支付状态 接口
    如果响应的状态是成功的
        跳转到支付成功页面
        新建一个支付成功页面
            支付成功页面放一个图片和一个按钮,按钮跳转首页,使用wx.reLaunch方法跳转到tabBar首页
}

```

