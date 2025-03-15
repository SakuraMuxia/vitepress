# uniapp

## uniapp介绍

```ts
https://uniapp.dcloud.net.cn/

uni-app 是一个使用 Vue.js 开发所有前端应用的框架，开发者编写一套代码，可发布到iOS、Android、Web（响应式）、以及各种小程序（微信/支付宝/百度/头条/飞书/QQ/快手/钉钉/淘宝）、快应用等多个平台
```

## HBuilderX使用

```ts
首先需要登陆

文件-新建项目-uni-app-默认模版

使用vue2 或vue3版本

第一步：用工具创建完配置 mainfest.json - 微信小程序配置

第二部：找到微信小程序配置，设置appId
```

导入项目后，我们打开manifest.json文件，修改下小程序的AppID

![image-20241129103738168](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20241129103738168.png)

```ts
第三部：运行-运行到模拟器-运行设置-
运行项目-运行模拟器-安装一个底座
```

![image-20241129103804931](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20241129103804931.png)

```ts
微信开发者工具-右上角上的设置-安全-服务端口打开
```

![image-20241129103823192](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20241129103823192.png)

```ts
运行-运行到小程序模拟器-运行微信开发者工具
```

## 创建项目

### 通过cli工具创建项目

```ts
全局安装
npm install -g @vue/cli
使用正式版
vue create -p dcloudio/uni-preset-vue my-project
使用Vue3/Vite版
创建以 javascript 开发的工程（如命令行创建失败，请直接访问 gitee 下载模板）
npx degit dcloudio/uni-preset-vue#vite my-vue3-project
npx degit dcloudio/uni-preset-vue#vite-alpha my-vue3-project
创建以 typescript 开发的工程（如命令行创建失败，请直接访问 gitee 下载模板）

npx degit dcloudio/uni-preset-vue#vite-ts my-vue3-project (使用这个)

```

### 安装依赖

```ts
安装依赖
npm install 
运行指令
npm run dev:mp-weixin (微信)
出现一个dist文件夹,把dist文件夹导入微信小程序程序中
```

## 样式导入

使用`@import`语句可以导入外联样式表，`@import`后跟需要导入的外联样式表的相对路径，用`;`表示语句结束。

```ts
<style>
    @import "../../common/uni.css";

    .uni-card {
        box-shadow: none;
    }
</style>
```

**内联样式**

框架组件上支持使用 style、class 属性来控制组件的样式。

style：静态的样式统一写到 class 中。style 接收动态的样式，在运行时会进行解析，请尽量避免将静态的样式写进 style 中，以免影响渲染速度。

```html
<view :style="{color:color}" />
```

class：用于指定样式规则，其属性值是样式规则中类选择器名(样式类名)的集合，样式类名不需要带上.，样式类名之间用空格分隔。

```html
<view class="normal_view" />
```

## 注册局部组件

局部注册之前，在需要引用该组件的页面，导入你想使用的组件。

**页面引入组件方式**

1、**传统vue规范：** 在 index.vue 页面中，通过 `import` 方式引入组件 ，在 `components` 选项中定义你想要使用的组件

2、**通过uni-app的[easycom](https://uniapp.dcloud.io/collocation/pages?id=easycom)**：将组件引入精简为一步。只要组件安装在项目的 `components` 目录下，并符合 `components/组件名称/组件名称.vue` （驼峰命名法，首字母大写UserName或 短横线分隔命名xxm-icon 前缀+业务名称）目录结构。就可以不用引用、注册，直接在页面中使用。

```vue
<!-- 在index.vue引入 uni-badge 组件-->
<template>
    <view>
        <uni-badge text="1"></uni-badge><!-- 3.使用组件 -->
    </view>
</template>
<script>
    // 这里不用import引入，也不需要在components内注册uni-badge组件。template里就可以直接用
    export default {
        data() {
            return {
            }
        }
    }
</script>
```

**easycom是自动开启的**，不需要手动开启，有需求时可以在 `pages.json` 的 `easycom` 节点进行个性化设置

不管`components`目录下安装了多少组件，`easycom`打包后会自动剔除没有使用的组件，对组件库的使用尤为友好



## 项目结构

根目录

```ts
node_modules	项目依赖文件夹(vue3,babel,)
src				源代码区域
.gitignore		忽略文件
index.html 		首页
package.json 	依赖文件
shims-uni.ts 	ts的配置文件
tsconfig.json 	ts配置文件
vite.config.ts 	vite配置文件
```

src目录

```ts
pages				页面(都是vue文件,使用vue语法(div可以用view替代),也可以使用微信语法)
uni.scss			全局样式文件(样式变量)
shime-uni.d.ts 		声明vue类型
pages.json 			类似于微信小程序中的app.json应用文件(配置页面路由，配置导航，tabbar，分包)
mainfest.json 		项目配置文件(设置微信小程序的APPID)
main.ts 			入口文件
App.vue 			相当于微信小程序中的app.js和app.wxss文件
```

pages.json

```json
"pages":[
    {
        "path":"pages/index/index", // 路由配置 -类似于 app.json 文件中的 pages配置
       "style":{
            "navigationBarTitleText":"uni-app", // 页面配置- 类似于 页面配置文件中的 配置
        }
    }
],
"globalStyle":{ // window全局配置-类似于 app.json 文件中的 window全局配置
	
}
```

vscode插件

```ts
uni-app-snippets 		uniapp语法提示
```

> :warning:
>
> *.vue 页面可以使用微信小程序语法,同时也可以使用vue3语法



## 生命周期

### onPageScroll

监听页面在垂直方向已滚动的距离 px 

uni-app-教程-页面

```ts
监听页面在垂直方向已滚动的距离 px 
属性 scrollTop
```

```ts
onPageScroll : function(e) { //nvue暂不支持滚动监听，可用bindingx代替
	console.log("滚动距离为：" + e.scrollTop);
},
```

```ts
onPageScroll(event){
        console.log(event)
        // 如果滚动的距离大于200像素
        if(event.scrollTop>200){
            // 显示
            back.value = true
        }else{
            // 隐藏
            back.value = false
        }
    }
```

## API

### uni.pageScrollTo

uniapp-API-界面

将页面滚动到目标位置

### uni.request

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
| enableHttpDNS        | Boolean                   | 否   | false  | 是否开启 HttpDNS 服务。如开启，需要同时填入 httpDNSServiceId 。 HttpDNS 用法详见 移动解析HttpDNS |
| httpDNSServiceId     | String                    | 否   |        | HttpDNS 服务商 Id。 HttpDNS 用法详见 移动解析HttpDNS         |
| enableChunked        | Boolean                   | 否   | false  | 开启 transfer-encoding chunked                               |
| forceCellularNetwork | Boolean                   | 否   | false  | wifi下使用移动网络发送请求                                   |
| enableCookie         | Boolean                   | 否   | false  | 开启后可在headers中编辑cookie                                |
| cloudCache           | Object/Boolean            | 否   | false  | 是否开启云加速（详见云加速服务                               |
| defer                | Boolean                   | 否   | false  | 控制当前请求是否延时至首屏内容渲染后发送                     |
| success              | Function                  | 否   |        | 收到开发者服务器成功返回的回调函数                           |
| fail                 | Function                  | 否   |        | 接口调用失败的回调函数                                       |
| complete             | Function                  | 否   |        | 接口调用结束的回调函数（调用成功、失败都会执行）             |

### 封装request

发送网络请求

```ts
class Servive{
    // 原型对象的方法
    API(params:any):any{
        // 定义全局基础路由
        baseUrl:
        // 开启加载效果
        
        // 返回一个promise对象
        return new Promise(()=>{
            // 发送request请求
            uni.request({
                // 地址
                url:baseUrl + params.url,
                // 方法
                method:params.method || 'GET',
                // 请求体
                data:params.data || {},
                // 成功回调
                success(res){
                	// 执行成功的回调
            	},
                // 失败回调
                fail(){
                    // 执行失败的回调
                },
                // 都会执行的回调
                complete(){
                    // 关闭加载效果
                    uni.hideLoading
                }
            })
        })
    }
    // get请求方法
    get(params:any){
        params.method = "GET"
        return this.API(params)
    }
    // post请求方法
    get(params:any){
        params.method = "post"
        return this.API(params)
    }
    // delete 请求方法
    get(params:any){
        params.method = "delete"
        return this.API(params)
    }
}
// 暴漏数据
export default Servive
```

```ts
//ES6类
class Service {
    //原型对象的方法
    API(params: any): any {
        // 定义全局基础路由
        const baseURL = 'https://gmall-prod.atguigu.cn/skb';
        //加载效果开启
        uni.showLoading({
            title: '加载中....'
        })

        //判断用户是否登录:如有token携带
        const token = uni.getStorageSync('TOKEN');
        // 定义请求头
        var header: any = {};
        // 如果token存在,则携带请求头
        if (token) {
            header.token = token;
        }

        // 返回一个promise对象
        return new Promise((resolve, reject) => {
            //uni-app 提供的API进行网络发请求
            uni.request({
                url: baseURL + params.url,// 请求的地址
                method: params.method || 'GET',// 请求方式
                data: params.data || {},// 携带的参数
                header, // 请求头
                success(res) {// 请求成功的回调
                    resolve(res.data); // 返回一个成功的Promise对象,同时简化数据
                },
                fail(error) { // 请求失败的回调
                    reject(error);
                },
                complete() { // 成功失败都执行
                    uni.hideLoading(); // 隐藏加载动画
                }
            })

        })
    }
    // get请求方法
    get(params: any) {
        params.method = "GET";
        return this.API(params);
    }
    // post请求方法
    post(params: any) {
        params.method = "POST";
        return this.API(params);
    }
    // delete 请求方法
    delete(params: any) {
        params.method = "DELETE";
        return this.API(params);
    }
}
// 暴漏数据
export default Service;
```

### uni.setStorageSync

存储storage中的数据

```ts
uni.setStorageSync("TOKEN", result.data.token);
```



### uni.getStorageSync

获取storage中的数据

```ts
uni.getStorageSync('TOKEN');
从本地缓存中同步获取指定 key 对应的内容。
```

### uni.showLoading

加载效果展示

```ts
uni.showLoading({
    title: '加载....'
})
```

### uni.showToast

uniapp-API-界面-交互反馈

显示消息提示框。

```ts
//提示
uni.showToast({ title: "取消收藏" });
```

### uni.login

uniapp-API-第三方服务-登陆

uni.login是一个客户端API，统一封装了各个平台的各种常见的登录方式，包括App手机号一键登陆、三方登录（微信、微博、QQ、Apple、google、facebook）、各家小程序内置登录

```ts
uni.login({
  provider: 'weixin', //使用微信登录
  success: function (loginRes) {
    console.log(loginRes.authResult);
  }
});
```

### uni.navigateTo

保留当前页面，跳转到应用内的某个页面，使用`uni.navigateBack`可以返回到原页面

```ts
uni.navigateTo({
    url: `/pages/course/video/index?videoSourceId=${course.value.chapterList[0].children[0].videoSourceId}&courseId=${courseId.value}`,
});
```



### uni.navigateBack()

返回上一个路由

```ts
uni.navigateBack();
```

### uni.requestPayment()

uni.requestPayment是一个统一各平台的客户端支付API，不管是在某家小程序还是在App中，客户端均使用本API调用支付

```ts
uni.requestPayment({
    provide:'',
    
})
```

```ts
uni.requestPayment({
    provider: 'alipay',
    orderInfo: 'orderInfo', //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
    success: function (res) {
        console.log('success:' + JSON.stringify(res));
    },
    fail: function (err) {
        console.log('fail:' + JSON.stringify(err));
    }
});
```



## 组件库

### 安装使用

方式一：通过 uni_modules 单独安装

```ts
如果你没有创建uni-ui项目模板，也可以在你的工程里，通过 uni_modules 单独安装需要的某个组件。
下表为uni-ui的扩展组件清单，点击每个组件在详情页面可以导入组件到项目下，导入后直接使用即可，无需import和注册
```

| 组件名                | 组件说明                                                     |
| --------------------- | ------------------------------------------------------------ |
| uni-badge             | [数字角标](https://ext.dcloud.net.cn/plugin?name=uni-badge)  |
| uni-calendar          | [日历](https://ext.dcloud.net.cn/plugin?name=uni-calendar)   |
| uni-card              | [卡片](https://ext.dcloud.net.cn/plugin?name=uni-card)       |
| uni-collapse          | [折叠面板](https://ext.dcloud.net.cn/plugin?name=uni-collapse) |
| uni-combox            | [组合框](https://ext.dcloud.net.cn/plugin?name=uni-combox)   |
| uni-countdown         | [倒计时](https://ext.dcloud.net.cn/plugin?name=uni-countdown) |
| uni-data-checkbox     | [数据选择器](https://ext.dcloud.net.cn/plugin?name=uni-data-checkbox) |
| uni-data-picker       | [数据驱动的picker选择器](https://ext.dcloud.net.cn/plugin?name=uni-data-picker) |
| uni-dateformat        | [日期格式化](https://ext.dcloud.net.cn/plugin?name=uni-dateformat) |
| uni-datetime-picker   | [日期选择器](https://ext.dcloud.net.cn/plugin?name=uni-datetime-picker) |
| uni-drawer            | [抽屉](https://ext.dcloud.net.cn/plugin?name=uni-drawer)     |
| uni-easyinput         | [增强输入框](https://ext.dcloud.net.cn/plugin?name=uni-easyinput) |
| uni-fab               | [悬浮按钮](https://ext.dcloud.net.cn/plugin?name=uni-fab)    |
| uni-fav               | [收藏按钮](https://ext.dcloud.net.cn/plugin?name=uni-fav)    |
| uni-file-picker       | [文件选择上传](https://ext.dcloud.net.cn/plugin?name=uni-file-picker) |
| uni-forms             | [表单](https://ext.dcloud.net.cn/plugin?name=uni-forms)      |
| uni-goods-nav         | [商品导航](https://ext.dcloud.net.cn/plugin?name=uni-goods-nav) |
| uni-grid              | [宫格](https://ext.dcloud.net.cn/plugin?name=uni-grid)       |
| uni-group             | [分组](https://ext.dcloud.net.cn/plugin?name=uni-group)      |
| uni-icons             | [图标](https://ext.dcloud.net.cn/plugin?name=uni-icons)      |
| uni-indexed-list      | [索引列表](https://ext.dcloud.net.cn/plugin?name=uni-indexed-list) |
| uni-link              | [超链接](https://ext.dcloud.net.cn/plugin?name=uni-link)     |
| uni-list              | [列表](https://ext.dcloud.net.cn/plugin?name=uni-list)       |
| uni-load-more         | [加载更多](https://ext.dcloud.net.cn/plugin?name=uni-load-more) |
| uni-nav-bar           | [自定义导航栏](https://ext.dcloud.net.cn/plugin?name=uni-nav-bar) |
| uni-notice-bar        | [通告栏](https://ext.dcloud.net.cn/plugin?name=uni-notice-bar) |
| uni-number-box        | [数字输入框](https://ext.dcloud.net.cn/plugin?name=uni-number-box) |
| uni-pagination        | [分页器](https://ext.dcloud.net.cn/plugin?name=uni-pagination) |
| uni-popup             | [弹出层](https://ext.dcloud.net.cn/plugin?name=uni-popup)    |
| uni-rate              | [评分](https://ext.dcloud.net.cn/plugin?name=uni-rate)       |
| uni-row               | [布局-行](https://ext.dcloud.net.cn/plugin?name=uni-row)     |
| uni-search-bar        | [搜索栏](https://ext.dcloud.net.cn/plugin?name=uni-search-bar) |
| uni-segmented-control | [分段器](https://ext.dcloud.net.cn/plugin?name=uni-segmented-control) |
| uni-steps             | [步骤条](https://ext.dcloud.net.cn/plugin?name=uni-steps)    |
| uni-swipe-action      | [滑动操作](https://ext.dcloud.net.cn/plugin?name=uni-swipe-action) |
| uni-swiper-dot        | [轮播图指示点](https://ext.dcloud.net.cn/plugin?name=uni-swiper-dot) |
| uni-table             | [表格](https://ext.dcloud.net.cn/plugin?name=uni-table)      |
| uni-tag               | [标签](https://ext.dcloud.net.cn/plugin?name=uni-tag)        |
| uni-title             | [章节标题](https://ext.dcloud.net.cn/plugin?name=uni-title)  |
| uni-transition        | [过渡动画](https://ext.dcloud.net.cn/plugin?name=uni-transition) |

方式二：通过npm安装

```ts
在 vue-cli 项目中可以使用 npm 安装 uni-ui 库 ，或者直接在 HBuilderX 项目中使用 npm

注意 cli 项目默认是不编译 node_modules 下的组件的，导致条件编译等功能失效 ，导致组件异常 需要在根目录创建 vue.config.js 文件 ，增加 @dcloudio/uni-ui 包的编译即可正常

// vue.config.js
module.exports = {
		transpileDependencies:['@dcloudio/uni-ui']
}
```

```ts
准备 sass

vue-cli 项目请先安装 sass 及 sass-loader，如在 HBuliderX 中使用，可跳过此步。

安装 sass
npm i sass -D   或   yarn add sass -D  

安装 sass-loader
npm i sass-loader@10.1.1 -D   或   yarn add sass-loader@10.1.1 -D

安装 uni-ui

npm i @dcloudio/uni-ui   或   yarn add @dcloudio/uni-ui

配置easycom

使用 npm 安装好 uni-ui 之后，需要配置 easycom 规则，让 npm 安装的组件支持 easycom

打开项目根目录下的 pages.json 并添加 easycom 节点：

```

```ts
// pages.json
{
	"easycom": {
		"autoscan": true,
		"custom": {
			// uni-ui 规则如下配置
			"^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
		}
	},
	
	// 其他内容
	pages:[
		// ...
	]
}
```

使用

```vue
在 template 中使用组件：

<uni-badge text="1"></uni-badge>
<uni-badge text="2" type="success" @click="bindClick"></uni-badge>
<uni-badge text="3" type="primary" :inverted="true"></uni-badge>
```

> :warning:
>
> - uni-ui 现在只推荐使用 `easycom` ，如自己引用组件，可能会出现组件找不到的问题
> - 使用 npm 安装的组件，默认情况下 babel-loader 会忽略所有 node_modules 中的文件 ，导致条件编译失效，需要通过配置 `vue.config.js` 解决：

```ts
// 在根目录创建 vue.config.js 文件，并配置如下
module.exports = {
   transpileDependencies: ['@dcloudio/uni-ui']
}
// 如果是 vue3 + vite, 无需添加配置
```

### collapse组件

折叠面板-手风琴效果

```vue
<uni-collapse ref="collapse" accordion>
<uni-collapse-item :title="item.title" v-for="(item, index) in course.chapterList"
    :key="item.id">
    <view class="task_list" v-for="(info, index) in item.children" :key="info.id">
        <view class="task_items">
            <image class="task_type"
                src="https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/f1c59a1527e075f6ebfba3d7ac605f07.png" />
            <view class="task_title">{{ info.title }}</view>
            <image v-show="!course.isBuy" class="task_icon"
                src="https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/064fdd1eb99fcb8bef80085f2b548e4b.png" />
        </view>
    </view>
</uni-collapse-item>
</uni-collapse>
```

### rate组件

评分组件

```vue
<uni-rate :touchable="false" :value="3.5" size="12" />
```

### icon组件

图标组件

```ts
<uni-icons class="input_icon" type="paperplane-filled" size="20" @click="add" />
```

## 兼容性

在大多数情况下，`wx` 的 API 在 `uni` 里都有对应的封装，虽然 `uni-app` 推荐用 `uni` 代替 `wx`，但在 **编译为微信小程序时**，仍然可以使用 `wx` API，不过这样就无法跨平台。

**示例**

仅限微信小程序环境时使用

```ts
if (wx && wx.getSystemInfoSync) {
  const info = wx.getSystemInfoSync();
  console.log("微信小程序设备信息:", info);
}
```

或者使用 **条件编译** 让这段代码只在微信小程序中执行：

```ts
// #ifdef MP-WEIXIN
	wx.showToast({ title: "仅微信小程序可见" });
// #endif
```

但是有些 API 在 `uni` 中没有封装，必须用 `wx`，例如

- `wx.cloud`（云开发）
- `wx.login`（微信登录）
- `wx.getUserProfile`（用户授权）

**总结**

如果你的项目只面向 **微信小程序**，可以直接用 `wx`。但如果要支持 H5、App、小程序等多个端，最好用 `uni`。
