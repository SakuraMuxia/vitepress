# 虾米项目

## 创建项目

```ts
选择默认项目模版
勾选uni-appx 
vue3
```

## 项目结构

```ts
┌─uniCloud              云空间目录，支付宝小程序云为uniCloud-alipay，阿里云为uniCloud-aliyun，腾讯云为uniCloud-tcb（详见uniCloud）
│─components            符合vue组件规范的uni-app组件目录
│  └─comp-a.vue         可复用的a组件
├─utssdk                存放uts文件（已废弃）
├─pages                 业务页面文件存放的目录
│  ├─index
│  │  └─index.vue       index页面
│  └─list
│     └─list.vue        list页面
├─static                存放应用引用的本地静态资源（如图片、视频等）的目录，注意：静态资源都应存放于此目录
├─uni_modules           存放uni_module 详见
├─platforms             存放各平台专用页面的目录，详见
├─nativeplugins         App原生语言插件 详见
├─nativeResources       App端原生资源目录
│  ├─android            Android原生资源目录 详见
|  └─ios                iOS原生资源目录 详见
├─hybrid                App端存放本地html文件的目录，详见
├─wxcomponents          存放微信小程序、QQ小程序组件的目录，详见
├─mycomponents          存放支付宝小程序组件的目录，详见
├─swancomponents        存放百度小程序组件的目录，详见
├─ttcomponents          存放抖音小程序、飞书小程序组件的目录，详见
├─kscomponents          存放快手小程序组件的目录，详见
├─jdcomponents          存放京东小程序组件的目录，详见
├─unpackage             非工程代码，一般存放运行或发行的编译结果
├─main.js               Vue初始化入口文件
├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
├─pages.json            配置页面路由、导航条、选项卡等页面类信息，详见
├─manifest.json         配置应用名称、appid、logo、版本等打包信息，详见
├─AndroidManifest.xml   Android原生应用清单文件 详见
├─Info.plist            iOS原生应用配置文件 详见
└─uni.scss              内置的常用样式变量
```

## 自动补全

```ts
view.box2
```

## 自定义模版

新建-新建页面-使用自定义模版-然后创建自定义模版.vue

```ts
<template>
	<view class="content">
		<text>雨落辰潇</text>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
	
</style>
```

## 配置格式化

```ts
安装formatAndSave插件
安装好了插件后，发现项目根目录多了.prettierrc.js和.prettierignore文件

在 HBuilderX 左侧目录的任意项目的任意文件中ctrl+s，插件会获取该文件所在项目目录，判断所在项目根目录下是否存在 prettier 配置文件、是否存在 prettier 忽略文件.prettierignore，如果不存在，则会在项目根目录创建默认的.prettierrc.js和.prettierignore，插件会基于这两个文件进行格式化

HBuilderX取消勾选保存时自动格式化
取消勾选保存时自动格式化，主要是为了保存时，不要它的自动格式化代码风格设置。
```

## 新建目录

新建common目录用于存放图片或需要引入的css和js

在static目录中新建images目录存放logo，这里的文件都会被打包进去

## 首页布局*

**设置公共CSS**

/common/css/common-style.scss

```vue

```

在APP.vue中引入 公共css

```vue
<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
@import "common/css/common-style.scss"	
</style>
```

**轮播图布局**

使用swiper组件，设置轮播。

```vue

```

**公告布局**

使用uni-ui设置图标

```vue

```

**封装组件**

新建 components 目录，然后创建 common-title 组件

```vue

```

**每日推荐**

使用scroll-view组件

```vue

```

设置样式

```css
/* 父组件省略写法 scss */
father{
    &-item{
    	
	}
}
/* 使用伪类选择器控制最后一个图片的样式 */
```

使用拓展组件，图标组件。

```ts

```

使用拓展组件，uni-dateformat组件

```vue

```

**专题精选**

创建 theme-item 组件

```vue

```

使用 grid 网格布局*

```vue

```

圆角覆盖设置

```css
/* 在图片的父级元素上设置	*/
.box{
    border-radius:10rpx;
	overflow:hidden;
    .pic{
        width:100%;
        heigh:100%;
    }
}

```

磨砂样式

```css
backdrop-filter:blur(20rpx)
```

通过缩放设置字体小于12

```css

```

通过传参控制显示更多

```vue

```

## 分类页面布局

创建分类页面 classify.vue

```vue

```

分类页面布局

```css

```

## 用户页面布局

设置 card 样式：圆角，阴影。使用伪类选择器控制最后一个没有边框

```vue

```

点击客服，执行挂起微信

```ts
通过设置一个 按钮 设置opentype 为 contack
把这个按钮通过 定位，定位到标签上，然后隐藏透明度
opacity:0
```

通过条件编译，执行 拨打电话的 API

```ts

```



## 底部导航配置

配置底部导航的图标和路径

```ts

```

## 全局顶部导航

配置global样式

```ts
配置 通屏 
	在pages.json文件中pages配置项中的style配置项的navigationStyle设置为custom
	navigationStyle:custom
```

## 条件编译

配置条件编译，控制在不同的平台编译不同的内容。

```ts
以 #ifdef 或 #ifndef 加 %PLATFORM% 开头，以 #endif 结尾。
```

| 条件编译写法                                             | 说明                                                         |
| -------------------------------------------------------- | ------------------------------------------------------------ |
| #ifdef APP-PLUS 需条件编译的代码 #endif                  | 仅出现在 App 平台下的代码                                    |
| #ifndef H5 需条件编译的代码 #endif                       | 除了 H5 平台，其它平台均存在的代码（注意if后面有个n）        |
| #ifdef **H5** \|\| **MP-WEIXIN** 需条件编译的代码 #endif | 在 H5 平台或微信小程序平台存在的代码（这里只有\|\|，不可能出现&&，因为没有交集） |

```ts
在 html 使用 微信小程序使用
<!-- #ifdef MP-WEIXIN -->
    <official-account></official-account>
<!-- #endif -->


在js 中使用
// #ifdef  %PLATFORM%
uni.scanCode(()=>{
    
})
// #endif


在css中使用
/*  #ifdef  %PLATFORM%  */
平台特有样式
/*  #endif  */


在json中使用
// #ifdef  %PLATFORM%
{
    "path":""
}
// #endif

```

## 线性渐变配置*

在 common 中的 common-style.css 中配置统一的页面渐变

```css
background:linear-gradient(),
linear-gradient();
min-height:

```

## 主题色变量

在 全局中的 scss中配置 主题色变量 uni.scss

```css
@import "@/commont/style/base-style.scss"
```

新建 commont/style/base-style.scss

```scss
$brand-theme-color:#
```

通过 设置 uni-icon 控制uni-icon的颜色 (H5可以实现，小程序不支持)

```css
uni-icon{
    color:#ccc !important
}
/**使用 deep穿透 设置uni-ui的样式**/

:deep(){
    uni-icon{
        color:#ccc !important
    }
}
```

## scss混合*

```ts
未了解
```

## 分类列表页面

创建分类列表页面 classlist.vue 

设置分类列表页面布局 

```vue

```

配置navigate设置 跳转页面 （我的评分，我的下载，专题推荐，分类页面）

```ts
配置 navigate的 opentype 类型为 relaunch
```

## 壁纸预览页面

新建页面 preview.vue

使用swiper布局，设置custom通屏样式，

```

```

搭建静态页面，返回，信息，评分，下载，浮动框。

```ts

```

配置样式

```css
/**定位元素设置居中**/
position:absolute;
left:0;
right:0;
width:fit-content; /**宽度根据内容自适应**/
margin:auto;
background:rgba(0,0,0,0.3); /**背景透明 **/
backdrop-filter:blur(10rpx); /**模糊效果 **/

/**使用calc计算的时候，中间需要加空格**/
top:calc(10vh + 80rpx);

/**使用子元素选择器**/
.mask{
    &>{
    	
	}
    .time{
        text-shadow: /**文字阴影 **/
    }
}

```

添加点击事件，隐藏遮罩层

```ts

```

信息弹窗

```ts
使用 uni-popup 拓展组件

vue3语法
infoPopupRef.value.open()
```

自己写信息弹窗的遮罩层的样式和布局

```vue

上边的布局

内容的布局 - 使用scroll-view组件


```

配置评分组件

```ts
配置评分组件只读，可以点击，设置value

设置评分样式
```

配置版权信息样式，配置关闭按钮样式和功能

```ts

```

uni-rate组件点击评分配置

```vue
评分组件的布局
<uni-popup>
    
</uni-popup>


设置评分组件设置半星

设置评分组件点击蒙版才关闭

设置按钮的禁用状态

设置按钮的点击事件


```

## 自定义头部

创建一个公共组件 custom-nav-bar 组件

设置 nav-bar 组件布局

```ts
title-bar 胶囊按钮区域
status-bar 状态栏区域

在状态栏区域设置一个空盒子

设置nav-bar渐变背景色

使用一个空盒子，作为一个填充区域
```

获取系统高度

```ts
状态栏的高度


胶囊按钮的高度
uni.getMenuButtonBoundingClientRect()
let menuButtonInfo = uni.getMenuButtonBoundingClientRect()

使用条件编译判断


```

计算导航栏高度示意图

![](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20250313151457971.png)

抽离计算系统高度

```ts
新建utils目录，并同时创建system.js文件

使用全局API获取设备信息

定义一个计算状态栏高度函数，暴漏这个函数
export const functon(){}

定义一个计算标题栏高度函数，暴漏这个函数
export const functon(){}

在页面中导入，然后调用
```

分类页面的标题栏设置

```ts
把标题栏组件引入，传值
```

预览页面标题栏设置

```ts
引入封装计算状态栏方法，然后调用，设置返回按钮的高度
```

设置页面跳转

```ts
首页点击图片跳转预览

分类页面的点击图片跳转预览


```

创建公告详情页面

```ts
设置公告详情页面布局
```

使用uni.tag标签

```ts

```

设置公告跳转到公告详情页面

```ts

```

## 接口

获取首页banner数据

```ts
获取首页banner数据，渲染数据
```

获取每日推荐接口

```js
获取首页每日推荐数据，渲染数据
```

获取壁纸公告列表

```ts
获取首页壁纸公告数据，渲染数据
```

## 封装请求

新建一个 api 目录，里边存放的是各种接口

新建一个 request.js 文件，作用是封装uni 请求。

apis.js

```ts
export function apiGetBanner(){
    return uni.request({
        url:,
        header:{
        	
    	}
    })
}
```

request.js

```ts
export function request(){
    
}
```

**获取分类列表数据**

```ts
通过封装的request请求和api接口获取数据
渲染数据

```

**分类列表跳转到分类详情页面**

```ts
通过请求参数 classid获取 分类详情数据列表
```

分类详情页面通过 onLoad 生命周期获取 参数

```ts
onLoad(()=>{
    设置导航栏的标题
    
    调用发送网络请求
})
```

## 触底加载*

使用 生命周期函数 onReachbottom() 监听触底

使用 z-padding插件实现防抖

```ts
onReachBottom(()=>{
    pageNum++
})

通过 解构把 新数据和老数据进行拼接
classList.value = [...classList.value,...res.data]

判断如果返回的数据小于pageSize，则不再发送请求,因为最后一次请求的数据，已经小于pageSize了，说明后续已经没有数据了。
```

触底加载loading样式

```ts
使用 uni-loading 插件

在分类列表页面的 html 结构中添加 uni-load-more 标签

在 uni-load-more 标签定义 loading-layout 类名，并把这个类名放在 common 目录中的公共 style.css中

通过 v-if 和 v-else 控制loading加载的显示与隐藏

通过 定义一个 noData 响应式对象，当发送请求相应后，后续没有数据了，改变noData的状态为true

触底加载 和 骨架屏加载的 v-if 判断逻辑是相反的
骨架屏加载显示 条件：数据列表的长度为空，并且 noData标记 为false
触底加载显示 条件：数据列表长度不为空，或者 noDate 标记为 true
通过三元表达式控制 加载中还是没有显示更多
把底部安全区域定义为 通用css样式
在底部新建一个空标签 设置类名为 底部安全区域的类型
```

骨架屏效果

```ts
使用 uv-skeletons 插件
```

在分类页面 使用本地存储 存储数据

```ts
使用本地存储 API存储 数据
uni.setStorageSync("")
```

在预览页面 使用本地存储 读取数据

```ts
uni.getStorageSync("")

// 读取数据后，然后处理数据
把数组中元素添加picurl属性，修改后缀

在预览页面修改 src 绑定的值

修改预览页面的 数量 显示


```

点击图片从当前图片显示

```ts
分类列表页面 通过 url的path 传递 id
预览页面通过 onLoad 函数读取 path中的id属性
使用 findIndex() 方法获取 元素对应的索引值
在swiper组件上设置current属性，对应当前 数据列表的索引值
在swiper组件上设置@change事件，创建change事件回调
const swiperChange = (e) => {
    current.value = e.datail.current
}

```

自定义一个数组，实现swiper的懒加载的效果

```ts
在
image标签上设置v-if属性，v-if通过判断仅显示当前索引值（存在问题，弃用）
创建一个数组对象，把看过的图索引值放在Set数组中，然后判断当前索引值是否包含在数组中，包含则返回true，不包含则返回false

预加载，向左和向右，
在数组对象中，把当前看过的图的索引的前一张和后一张，都放在数组中，实现友好交互。
	
// 设置预览页面数组对象为 set数组
readImgs.value = [...new Set(readImgs.value)]
```

渲染信息数据

```ts
点击信息按钮显示 壁纸信息

定义一个响应式数据
	在onLoad生命周期函数中，把图片的信息赋值给 currentInfo响应式数据
	
```

评分的操作

```ts
点击评分按钮，弹出评分弹框
在确认评分的回调函数中，获取当前用户操作的评分
封装网络接口
发送网络请求
对相应做出反应，评分成功弹窗，评分失败弹窗，评分完成后关闭弹窗。
评分完成后，向分类列表的对象中添加一个userScore属性。
由于没有刷新，评分完成后，向缓存中重新存储分类列表
在评过分的壁纸上，再次点击评分，首先判断当前图片对象中是否存在 userScore属性，设置isScored响应式数据
然后把 userScore的属性值，更改为评分的双向绑定值。
根据isScored的状态，绑定确定评分按钮的禁用状态，同时绑定uni-rate组件的评分状态为disabled

点击确认评分时，发送网络请求时，加上加载状态 uni.showLoading({
    
})

返回数据时，加载完成状态。


```

解构同时设置别名

```ts
let {classid,_id:wallId} = currentInfo.value

在之后使用 wallId 就相当于使用 _id

```

## 图片下载

使用条件编译的语法，区别对待图片下载

```ts
const clickDownload = () => {
    // #ifdef H5 
    	H5逻辑
    // #endif
    
    // #ifndef H5
        uni.saveImageToPhotosAlbum({
            filePath: currentInfo.value.picurl
            success:(res) => {
            		
        	}
        })
    // #endif
    
}
```

设置 小程序的 downloadFile 合法域名

```ts
登陆小程序后台
```

使用 uni.getImageInfo 方法获取图片信息，小程序下获取网络图片信息需先配置download域名白名单才能生效。

```ts
uni.getImageInfo({
    src:currentINfo.value.picurl,
    success:(res)=>{
        console.log(res)
    }
})
uni.showloading({
    title:'加载中',
    mask:true // 遮罩
})
uni.saveImageToPhotosAlbum({
    filePath:currentInfo.value.picurl,
    success:(res)=>{
        console.log(res)
    },
    fail:err=>{
        // 如果没有保存成功
        if(err.errMsg === '...'){
            // 提示 保存失败，请重新点击下载
            return;
        }
        // 再次提示，需要授权保存到相册
        uni.showModal({
            title:"提示",
            content:"需要授权保存相册",
            // 成功回调，点击了确认
            success:res=>{
                if(res.confirm){
                    // 打开手动授权
                    uni.openSetting({
                        // 成功的回调
                        success:(setting)=>{
                            if(setting.authSetting['scope.writePhotosAlbum']){
                                uni.showToast({
                                    title:"",
                                    
                                })
                            }
                            else{
                                // 获取授权失败
                            }
                        }
                    })
                }
            }
            complete:()=>{
            	// 设置加载效果隐藏
        	}
        })
    }
})
```

设置小程序的 服务内容声明，用户隐私指引

```ts

```

![image-20250318151557776](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20250318151557776.png)

设置用户隐私 拒绝 的回调处理

```ts

```

## 下载记录

封装下载记录请求接口

```ts
发送请求，对响应数据进行处理
```

使用try catch 捕获异常

```ts
try {
    
}catch(err){
    // 取消加载效果
    
}
```

处理 v-for 中的key的报错

处理 生命周期，初始值报错

```ts
设置初始值，
设置key
设置v-if判断，数据存在时，再渲染
```

## 分享

分享小程序

```ts
onShareAppMessage(()=>{
    return {
        title:'',
        path:'' + 响应式数据
    }
})
```

分享朋友圈

```ts
onShareTimeline(()=>{
    return {
        title:'咸虾米'+ pageName,
        query:'id=' + queryParmas.classid + "&name="+pageName
    }
})
```

分享传递参数

```ts
onload((e)=>{
    // 解构url中的参数
})

onShareAppMessage(()=>{
    return {
        title:'咸虾米'+ pageName,
        path:'/pages/classlist/classlist?id=' + queryParmas.classid + "&name="+pageName
    }
})
```

预览页面分享传递参数

```ts
在onLoad()的回调函数中获取，url中query参数，
判断query中的 type是否为 share，如果是share则代表是从别人分享过来的
于是需要封装接口，重新发送请求，获取壁纸列表，
并把壁纸列表的picurl处理为bigurl，即可实现需求

```

对分享后页面的返回按钮进行处理

```ts
如果是从分享过来的，进行单独处理

通过在 goBack的回调中
goBack(){
    uni.navigateBack({
        success:()=>{
            
        },
        fail:()=>{
            // 跳转到首页
            uni.reLaunch({
                url:"/page/index/index"
            })
        }
    })
}
```

在分类列表页面，对localStorage进行销毁

```ts
在 onUnLoad() 中，处理 localStorage的数据，进行销毁。
```

首页随机页面点击后跳转到预览页面

```ts
在跳转到预览页面的回调中
	把随机页面存储到localStorage中
    根据id，进行传参，显示那一张图片
    
```

壁纸信息弹窗底部的安全区域处理

```ts
在 uni-popup官方组件的源代码控制
uni-popup.vue 349行代码进行注释
```

如果需要参数的页面没有接收到参数，则提示无参数，选择回到首页弹窗

```ts

```

## 个人用户

布局个人用户页面，设置导航栏的高度

```ts

```

封装用户信息接口

```ts

```

获取用户数据，渲染用户数据

```ts
 
```

无数据时，使用加载效果

```ts

```

我的下载和我的评分页面

```ts
点击我的下载按钮，跳转到分类列表页面

在跳转时传递标题和type类型：download或scope
```

封装获取下载历史接口

```ts

```

封装获取评分的接口

```ts

```



## 用户登陆*

```ts

```

## 公告详情

封装公告详情接口

```ts

```

获取公告详情数据，并渲染数据。

```ts

```

富文本的渲染

```ts
默认会把html标签直接展出来
使用 rich-text 标签展示富文本。
rich-text :nodes=""

或使用第三方富文本插件 vue3 
mp-text :content=""
```

在首页的公告 navegate 标签中设置 跳转的url 同时拼接 参数。

在公告详情页面使用 onLoad 函数接收 id。

在公告详情页面获取公告详情接口中接收id，发送请求

```ts

```

点击常见问题跳转到公告详情页面，同时传递 id 参数，同时更改标题

```ts

```

## 搜索页面

创建 搜索页面 search.vue ，布局，

首页 搜索标签 设置navigate便签 实现跳转

使用 uni-search-bar 组件 搜索框

```ts
在扩展组件中，安装uni-search-bar组件
插件市场，安装uv-empty组件，空状态，搜索为空时的样式

搜索框中的确认搜索 onSearch 回调中
	获取搜索的内容
    把搜索的内容添加到搜索历史的数组中，使用 new Set([]),去重处理
	把搜索历史放置到localStorage中，历史搜索默认从 localStorage中读取，否则为空 
    
搜索删除按钮 removeHistory 回调
	弹窗提示 uni.showModal
    删除缓存 uni.remove
	删除响应式对象 searchHistory.value = []

若搜索历史为空，则不显示搜索删除按钮，和最近搜索标签
	
在 tab 标签的点击事件中 onClick 回调中
	把tab标签中的内容，复制到搜索栏
```

最近搜索

热门搜索

封装搜索接口，发送网络请求，获取搜索数据，渲染数据

```ts
点击标签 tag 时，同时发送请求，获取数据

触底加载数据 onReachBottom 事件中
	如果noDate为true，return
	pageNum ++
	处理响应结果，把老数据和新数据合并
    需要把分类列表放在localStorage中
	发送网络请求
    
加载样式进行处理，追加安全区域

如果后续没有数据，则 使用 noData 作为标记 为 true

使用 noSearch 标记判断 搜索内容和空状态

初始化 initParams 
	清空 classList
    清空 noData标记 noSearch 标记
    清空 queryParams 为初始化
    
在清空搜索和取消按钮 调用 init
在点击标签的回调总 调用init



```

搜索列表页面

```ts
没有 搜索列表页面 ，通过v-if 控制 热门搜索，最近搜索的显示与隐藏
```

点击搜索列表的元素时，跳转到预览页面

```ts
<navigate :url = `/page/...?id=${item._id}`>
    

```

离开页面，清空localStorage中的classList

```ts

```

搜索框初始化，搜索记录限制条数，搜索中添加loading效果。

```ts
初始化函数中，传递value，如果输入框没有，则为空，存在则为value

在搜索 onSearch 回调中 添加搜索加载，

通过数组的 slice方法 截取 只获取10个内容
```

首页轮播图跳转和修复bug

```ts
swiper 标签中 添加 navigate 标签，同时修改 css样式

在navigate标签中设置 url 属性 :url=`/page/...?${item.url}`

再添加一个 navigate标签 通过 v-if 判断 item属性中是否是 miniProgram
	在跳转到第三方小程序navigate的设置 ：url="",target="miniProgram",:app-id=""

超过三个月之后返回null，进行修复，通过v-if进行修复

专题精选 更多按钮上 进行跳转。
```

## 打包

微信小程序

```ts
1. 注册微信小程序开发者
	设置
    服务类名	信息查询 图片处理
    开发管理：
    	配置服务器域名：https:
		downloadFile 合法域名：新增一个合法域名
        unloadFile 合法域名：新增合法域名

2. manifest.json
	设置appid，上传代码时自动压缩勾选
    
3. 发行
	微信小程序
    
4. 打包目录
	unpackage/dist/dev/mp-weixin

5. 开发者工具中
	点击上传 
    
6. 微信小程序的后台
	版本管理-开发版本-提交审核

7. 快的审核 内容发布 新闻发布 审核的时间更长
```

抖音小程序

```ts
1. 运行到 抖音开发者工具
	设置appId,设置域名域名
2. 注册抖音小程序开发者
	抖音开放平台，快速入住，进入控制台，
    使用 条件编译 隐藏标题栏 样式，仅在抖音小程序不显示。
    备案
3. 发行，抖音，上传
4. 上传，
5. 配置域名，downloadFile合法域名
```

H5打包和发布：使用unicloud网页托管

```ts
1. 进入manifest.json文件
	Web配置：
    	配置标题
        配置路由模式
        运行的基础路由 根./ 或者 /xxmwall/
        配置定位和地图
2. 源码视图中配置跨域

3. 打包：发行-网站
		配置名称
4. 打包路径
	unpackage-dist-build-h5
5. 把目录名称为 xxmwall

6. 使用unicloud服务空间
		使用前端网页托管
   		注意 目录名称 必须 与 manifest.json 名称一致。
   		参数配置，使用默认域名访问
        配置跨域，跨域配置，把默认域名新增上
7. 草料二维码，将https链接转为二维码
8. 购买域名
```

安卓APP打包

https://hx.dcloud.net.cn/Tutorial/App/use-chrome-to-debug-android-apps?id=%e9%99%84%e5%bd%95%ef%bc%9aandroid%e6%a8%a1%e6%8b%9f%e5%99%a8%e8%b0%83%e8%af%95%e7%8e%af%e5%a2%83

```ts
1. 运行到手机模拟器
2. manifest.json 进行配置
	应用名称 1.0.1 应用版本号 101
	设置应用图标：
    	App启动界面，原生隐私提示框
    App模块：
    权限配置：
    常用配置：
3. 打包自定义基座

4. 发行
	原生APP-云打包，打正式包
```

打包

![image-20250319151005011](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20250319151005011.png)

## 消息推送*

```ts
3.1-3.2-3.3 push推送更新
```

HBuilder连接夜神模拟器进行调试

```ts
夜神模拟器
编写文件注意后缀名为.bat
d:
cd  D:\Program Files\Nox\bin
nox_adb  connect 127.0.0.1:62001
nox_adb devicese
d:
cd  D:\HBuilder
adb connect 127.0.0.1:62001
adb devices

输入命令：netstat -ano，列出所有端口的情况！
输入命令：netstat -aon|findstr “端口号”！

不通过可以尝试另换端口，或者检查路径是否准确！
```

