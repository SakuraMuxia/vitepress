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

## 首页布局

**设置公共CSS**

/common/css/common-style.scss

```css
view,swiper,swiper-item{
	box-sizing: border-box;
}

.pageBg{
	background: 
	linear-gradient(to bottom,transparent,#fff 400rpx),
	linear-gradient(to right,#beecd8 20%,#F4E2D8);
	min-height: 80vh;
}
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

**设置自定义颜色**

common/style/base-style-scss

```ts
$brand-theme-color:#28B389;      //品牌主体红色

$border-color:#e0e0e0;           //边框颜色
$border-color-light:#efefef;     //边框亮色

$text-font-color-1:#000;         //文字主色
$text-font-color-2:#676767;      //副标题颜色
$text-font-color-3:#a7a7a7;      //浅色
$text-font-color-4:#e4e4e4;      //更浅
```

**在 uni.scss 中引入**

```css
@import "@/common/style/base-style.scss";

/* 行为相关颜色 */
$uni-color-primary: #007aff;
$uni-color-success: #4cd964;
$uni-color-warning: #f0ad4e;
$uni-color-error: #dd524d;
```

**公告布局**

使用uni-ui设置图标

**封装组件**

新建 components 目录，然后创建 common-title 公共组件

```vue
<template>
	<view class="common-title">
		<view class="name">
			<slot name="name"></slot>
		</view>
		<view class="custom">
			<slot name="custom"></slot>
		</view>
	</view>
</template>

<script setup></script>

<style lang="scss">
.common-title {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 30rpx;
	.name {
		font-size: 40rpx;
	}
}
</style>
```

**每日推荐**

使用scroll-view组件

```vue
<view class="select">
    <common-title>
        <template #name>每日推荐</template>
        <template #custom>
            <view class="date">
                <uni-icons type="calendar" size="20"></uni-icons>
                <view class="text">
                    <uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
                </view>
            </view>
        </template>
    </common-title>
</view>
```

**设置样式**

```css
/* 父组件省略写法 scss */
father{
    &-item{
    	
	}
}

/* 使用伪类选择器控制最后一个图片的样式 */

.box:last-child {
    margin-right: 30rpx;
}
```

使用拓展组件，图标组件。

使用拓展组件，uni-dateformat组件

![image-20250320102313479](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20250320102313479.png)

![image-20250320102333547](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20250320102333547.png)

## 深度和子选择器

```css
深度选择器
.left { // 放置在 left 类中，让受影响的范围仅在left中生效
    :deep() { // 使用 deep 穿透 ，让小程序和H5都可以使用，穿透到子组件中改变类名
        .uni-icons {
            color: $brand-theme-color !important; // 
        }
	}
}
// 子元素选择器
.row {
    display: flex;
    height: 100rpx;
    &:last-child{
        border-bottom:0
    }
}
// 最后一个孩子选择器
.box:last-child {
    margin-right: 30rpx;
}

// &- 的写法是 SCSS 的 BEM（块-元素-修饰符）风格，用来简化类名拼接，是正确的
.father {
    &-item {
        color: red;
    }
}
编译成
.father-item {
    color: red;
}

```

**设置精选模块内容**

```ts
<!-- 精选 -->
<view class="select">
    <common-title>
        <template #name>每日推荐</template>
        <template #custom>
            <view class="date">
                <uni-icons type="calendar" size="20"></uni-icons>
                <view class="text">
                    <uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
                </view>
            </view>
        </template>
    </common-title>
    <!-- 内容 -->
    <view class="content">
        <scroll-view scroll-x>
            <view class="box" v-for="item in 8" @click="goPreview">
                <image src="../../common/images/preview_small.webp" mode="aspectFill"></image>
            </view>
        </scroll-view>
    </view>
</view>
.center {
    flex: 1;
    swiper {
        height: 100%;
        &-item {
            height: 100%;
            font-size: 30rpx;
            color: #666;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
```

**专题精选**

创建 theme-item 组件

```vue
<template>
	<view class="themeItem">
		<!-- 图片跳转 -->
		<navigator url="/pages/classlist/classlist" class="box" v-if="!isMore">
			<image class="pic" src="../../common/images/classify1.jpg" mode="aspectFill"></image>
			<view class="mask">明星美女</view>
			<view class="tab">3天前更新</view>
		</navigator>
		<!-- 最后一张图显示更多跳转到分类 -->
		<navigator url="/pages/classify/classify" open-type="reLaunch" class="box more" v-if="isMore">
			<image class="pic" src="../../common/images/more.jpg" mode="aspectFill"></image>
			<view class="mask">
				<uni-icons type="more-filled" size="34" color="#fff"></uni-icons>
				<view class="text">更多</view>
			</view>
		</navigator>
	</view>
</template>
```

**使用 grid 网格布局***

```css
.theme {
    padding: 50rpx 0;
    .more {
        font-size: 32rpx;
        color: #888;
    }
    .content {
        margin-top: 30rpx;
        padding: 0 30rpx;
        display: grid;
        gap: 15rpx;
        grid-template-columns: repeat(3, 1fr);
    }
}
```

**圆角覆盖设置**

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

**磨砂样式**

```css
backdrop-filter:blur(20rpx)
```

通过缩放设置字体小于12

```css
// 缩放
transform: scale(0.8);
transform-origin: left top;
```

通过传参控制显示更多

```vue
<!-- 内容 -->
<view class="content">
    <theme-item v-for="item in 8"></theme-item>
    <theme-item :isMore="true"></theme-item>
</view>
```

## 分类页面布局

封装自定义标题栏 custom-nav-bar 组件

```ts
/components/custom-nav-bar/custom-nav-bar.vue
```

```vue
<template>
	<view class="layout">
		<view class="navbar">
			<view class="statusBar" :style="{ height: getStatusBarHeight() + 'px' }"></view>
			<view class="titleBar" :style="{ height: getTitleBarHeight() + 'px', marginLeft: getLeftIconLeft() + 'px' }">
				<view class="title">{{ title }}</view>
				<navigator url="/pages/search/search" class="search">
					<uni-icons class="icon" type="search" color="#888" size="18"></uni-icons>
					<text class="text">搜索</text>
				</navigator>
			</view>
		</view>
		<!-- 填充 由于上边设置了定位 把后续的内容往后填充 -->
		<view class="fill" :style="{height:getNavBarHeight()+'px'}"></view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { getStatusBarHeight, getTitleBarHeight, getNavBarHeight, getLeftIconLeft } from '/utils/system.js';
// 接收title
defineProps({
	title: {
		type: String,
		default: '壁纸'
	}
});
</script>

<style lang="scss" scoped>
.layout {
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
		background: linear-gradient(to bottom, transparent, #fff 400rpx), linear-gradient(to right, #beecd8 20%, #f4e2d8);
		.statusBar {
		}
		.titleBar {
			display: flex;
			align-items: center;
			padding: 0 30rpx;

			.title {
				font-size: 22px;
				font-weight: 700;
				color: $text-font-color-1;
			}
			.search {
				width: 220rpx;
				height: 50rpx;
				border-radius: 60rpx;
				background: rgba(255, 255, 255, 0.4);
				border: 1px solid #fff;
				margin-left: 30rpx;
				color: #999;
				font-size: 28rpx;
				display: flex;
				align-items: center;
				.icon {
					margin-left: 5rpx;
				}
				.text {
					padding-left: 10rpx;
				}
			}
		}
	}
}
</style>

```

设置 pages.json 中页面的自定义 navbar样式

```json
{
    "path" : "pages/classify/classify",
    "style" : 
    {
        "navigationBarTitleText" : "分类",
        "navigationStyle": "custom"
    }
}
```

## 标题栏高度

新建一个 /utils/system.js 工具用于获取状态栏的高度信息

通过uni API获取标题栏的高度

```ts

并在 需要使用页面导入
// 获取手机系统信息
const SYSTEM_INFO = uni.getSystemInfoSync();
console.log("手机系统信息", SYSTEM_INFO)

// 获取状态栏高度
const getStatusBarHeight = () => {
	return SYSTEM_INFO.statusBarHeight || 15
}

// 获取标题栏高度
const getTitleBarHeight = () => {
	// 如果存在 胶囊按钮
	if (uni.getMenuButtonBoundingClientRect) {
		// 获取胶囊按钮的高度和高度定位
		let {
			top,
			height
		} = uni.getMenuButtonBoundingClientRect();
		// 返回计算之后标题栏高度
		return height + (top - getStatusBarHeight()) * 2
	} else { // 返回40像素
		return 40;
	}
}

// 导航栏高度
const getNavBarHeight = () => {
	return getStatusBarHeight() + getTitleBarHeight()
}

// 获取左侧抖音logo宽度
const getLeftIconLeft = () => {
	// 使用条件编译
	// #ifdef MP-TOUTIAO
	// 使用头条中的api方法，获取icon的宽度
	let {
		leftIcon: {
			left,
			width
		}
	} = tt.getCustomButtonBoundingClientRect();
	return left + parseInt(width);
	// #endif
	// #ifndef MP-TOUTIAO
	return 0
	// #endif
}

// 暴漏
export {
	getStatusBarHeight,
	getTitleBarHeight,
	getNavBarHeight,
	getLeftIconLeft
}
```

创建分类页面 classify.vue，并完成分类页面布局和样式。

```vue
<template>
	<view class="classLayout pageBg">
		<custom-nav-bar title="分类"></custom-nav-bar>
		<view class="classify">
			<theme-item v-for="item in 15"></theme-item>
		</view>
	</view>
</template>

<script setup>
	
</script>

<style lang="scss" scoped>
.classify{
	padding:30rpx;
	display: grid;
	grid-template-columns: repeat(3,1fr);
	gap:15rpx;
}
</style>
```

## 用户页面布局

新建 用户页面 /pages/user/user ,设置布局和样式

```vue
<template>
	<view class="userLayout pageBg">
		<view class="userInfo">
			<view class="avatar">
				<image src="../../static/images/logo.png" mode="aspectFill"></image>
			</view>
			<view class="ip">145.45.45.45</view>
			<view class="address">来自于：河南</view>
		</view>
		<!-- 第一部分 -->
		<view class="section">
			
		</view>
		<!-- 第二部分 -->
		<view class="section">
        </view>
    </view>
</template>
```



## card盒子样式

设置 card 样式：圆角，阴影。使用伪类选择器控制最后一个没有边框

```css
{
    width: 690rpx;
    margin:50rpx auto;
    border:1px solid #eee;
    border-radius: 10rpx;
    overflow: hidden;
    box-shadow: 0 0 30rpx rgba(0,0,0,0.05);
}

```

点击客服，执行挂起微信

```css
通过设置一个 按钮 设置opentype 为 contack
把这个按钮通过 定位，定位到标签上，然后隐藏透明度
opacity:0

<!-- #ifdef MP -->
	<button open-type="contact">联系客服</button>
<!-- #endif -->

button {
    position: absolute;
    top: 0;
    left: 0;
    height: 100rpx;
    width: 100%;
    opacity: 0;
}
```

通过条件编译，执行 拨打电话的 API

```vue
<view class="row">
    <view class="left">
        <uni-icons type="chatboxes-filled" size="20"></uni-icons>
        <view class="text">联系客服</view>
    </view>
    <view class="right">
        <view class="text"></view>
        <uni-icons type="right" size="15" color="#aaa"></uni-icons>
    </view>
    <!-- #ifdef MP -->
    <button open-type="contact">联系客服</button>
    <!-- #endif -->
    <!-- #ifndef MP -->
    <button @click="clickContact">拨打电话</button>
    <!-- #endif -->
</view>
```

点击我的下载，我的评分跳转到分类页面

```ts
<view @click="goClassify" class="row">
    <view class="left">
        <uni-icons type="download-filled" size="20"></uni-icons>
        <view class="text">我的下载</view>
    </view>
    <view class="right">
        <view class="text">33</view>
        <uni-icons type="right" size="15" color="#aaa"></uni-icons>
    </view>
</view>

const goClassify = () => {
	console.log("走，忽略，...")
	uni.navigateTo({
		url: '/pages/classify/classify'
	});
}
```



## 底部导航配置

配置底部导航的图标和路径，配置文件是  pages.json 

```ts
{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index/index",
			"style": {
				"navigationBarTitleText": "首页",
				"navigationStyle": "custom"
			}
		},
		{
			"path": "pages/notice/notice",
			"style": {
				"navigationBarTitleText": "公告"
			}
		},
		{
			"path": "pages/classify/classify",
			"style": {
				"navigationBarTitleText": "分类",
				"navigationStyle": "custom"
			}
		}
	],
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "雨落辰潇WallPaper",
		"navigationBarBackgroundColor": "#fff",
		"backgroundColor": "#F8F8F8"
	},
	"tabBar": {
		"color": "#9799a5",
		"selectedColor": "#28B389",
		"list": [{
			"text": "首页",
			"pagePath": "pages/index/index",
			"iconPath": "static/images/tabBar/home.png",
			"selectedIconPath": "static/images/tabBar/home-h.png"
		}, {
			"text": "分类",
			"pagePath": "pages/classify/classify",
			"iconPath": "static/images/tabBar/classify.png",
			"selectedIconPath": "static/images/tabBar/classify-h.png"
		}, {
			"text": "我的",
			"pagePath": "pages/user/user",
			"iconPath": "static/images/tabBar/user.png",
			"selectedIconPath": "static/images/tabBar/user-h.png"
		}]
	},
	"uniIdRouter": {}
}
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

## 线性渐变配置

在 common 中的 common-style.css 中配置统一的页面渐变

```css
background:linear-gradient(),
linear-gradient();
min-height:

```

## 主题色变量

在 全局中的 scss中配置  主题色变量 /uni.scss

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

## scss混合

```ts

```

## 离线打包

显示所有项目文件

![image-20250321104640898](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20250321104640898.png)



```ts
jdk 和 node

Androidstudio

HbuilderX

下载SDK 4.56

申请DCloud开发者账号，后期会用到

打开项目的manifest.json文件，在“（App）模块权限配置”页的“Android权限配置”项下根据需求勾选需要的权限

使用原生隐私提示框

忽略版本的提示

使用 SDK 中的后编译后提供HBuilder-Integrate-AS工程，可以直接导入HBuilder-Integrate-AS工程

把这个文件复制到一个单独的目录
D:\Software\HbuilderSDKBuild\HBuilder-Integrate-AS
使用Androidstudio 打开这个项目

更改镜像源地址
位置在
/gradle/wrapper/gradle-wrapper.properties

#Mon Dec 28 18:07:31 CST 2020
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
distributionUrl=https\://services.gradle.org/distributions/gradle-8.11.1-bin.zip

更改最后一行
distributionUrl=https\://mirrors.tencent.com/gradle/gradle-8.11.1-bin.zip

AndroidStudio设置配置
搜索gradle

设置dis 为 wrapper
更改jdk中的版本

这里的jdk版本需要和 build.gradle(不是src/main/中的文件) 文件中的一致

配置
src/main/AndroidManifest.xml中的 Appid 和离线key打包管理

生成云证书 记录别名 md5 sha1 sha256 证书密码 

添加应用信息

包名如果是同一个会认为是同一个软件

生成离线key

把离线key放在 value中

修改apk的名字
src/main/res/values/strings.xml 

src/main/assets/data/dclound_control.xml 更改appid
 
src/build.gradle 修改包名

下载证书 把这个key test.jks (src/test.jks)覆盖

根据生成云证书 记录别名 md5 sha1 sha256 证书密码 
再次修改 src/build.gradle 配置密码 名字
signingConfigs {
        config {
            keyAlias '__uni'
            keyPassword 'Km1R'
            storeFile file('test.jks')
            storePassword 'Km1R'
            v1SigningEnabled true
            v2SigningEnabled true
        }
    }

Hbuilder发行后，把资源复制到 src/main/assets/apps/

build selsct build variant 为 release

build App Bundle build APk
 
输出目录在
/simpleDemo/build/outputs/apk
 
关于权限问题
 
首先需要在Hbuilder中勾选后这些权限，然后打开源码模式或权限标签，把里边的 xml复制

放在 AndriodMainIfest.xml(src/andriodMainifest.xml) 中的mainifest 标签内

点击build 第一个 锤子图标
```

设置 Gradle

![image-20250321114135898](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20250321114135898.png)

配置Appid 和 离线Key

离线Key

![image-20250321104932100](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20250321104932100.png)

app应用名字 （simpleDemo/src/main/res/values/strings/xml）

![image-20250321105012561](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20250321105012561.png)

appId (src/main/assets/data/dclound_control.xml 更改appid)

![image-20250321105230521](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20250321105230521.png)



