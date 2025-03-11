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

