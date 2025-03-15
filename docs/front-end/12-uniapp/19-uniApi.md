# API

`uni-app`的 js API 由标准 ECMAScript 的 js API 和 uni 扩展 API 这两部分组成。

由DClound公司封装好的API，包含对Android，微信，钉钉，支付宝中API进行再一次封装，实现全平台支持。

## 界面

### uni.showToast(OBJECT)

显示消息提示框。

**OBJECT参数说明**

| 参数     | 类型     | 必填 | 说明                                                         | 平台差异说明                                           |
| :------- | :------- | :--- | :----------------------------------------------------------- | :----------------------------------------------------- |
| title    | String   | 是   | 提示的内容，长度与 icon 取值有关。                           |                                                        |
| icon     | String   | 否   | 图标，有效值详见下方说明，默认：success。                    |                                                        |
| image    | String   | 否   | 自定义图标的本地路径（app端暂不支持gif）                     | App、H5、微信小程序、百度小程序、抖音小程序（2.62.0+） |
| mask     | Boolean  | 否   | 是否显示透明蒙层，防止触摸穿透，默认：false                  | App、微信小程序、抖音小程序（2.47.0+）                 |
| duration | Number   | 否   | 提示的延迟时间，单位毫秒，默认：1500                         |                                                        |
| position | String   | 否   | 纯文本轻提示显示位置，填写有效值后只有 `title` 属性生效，且不支持通过 uni.hideToast 隐藏。有效值详见下方说明。 | App                                                    |
| success  | Function | 否   | 接口调用成功的回调函数                                       |                                                        |
| fail     | Function | 否   | 接口调用失败的回调函数                                       |                                                        |
| complete | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |                                                        |

```ts
uni.showToast({
    title:"操作成功",
    icon:"none", // 取消图标，完全显示文字
    success:()=>{
        
    }
})
```

### uni.hideToast()

隐藏消息提示框。

```ts
uni.hideToast();
```

### uni.showLoading(OBJECT)

显示 loading 提示框, 需主动调用 [uni.hideLoading](https://uniapp.dcloud.net.cn/api/ui/prompt.html#hideloading) 才能关闭提示框。

**OBJECT参数说明**

| 参数     | 类型     | 必填 | 说明                                             | 平台差异说明                                           |
| :------- | :------- | :--- | :----------------------------------------------- | :----------------------------------------------------- |
| title    | String   | 是   | 提示的文字内容，显示在loading的下方              |                                                        |
| mask     | Boolean  | 否   | 是否显示透明蒙层，防止触摸穿透，默认：false      | H5、App、微信小程序、百度小程序、抖音小程序（2.47.0+） |
| success  | Function | 否   | 接口调用成功的回调函数                           |                                                        |
| fail     | Function | 否   | 接口调用失败的回调函数                           |                                                        |
| complete | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |                                                        |

```ts
uni.showLoading({
	title: '加载中'
});
```

### uni.hideLoading()

隐藏 loading 提示框。

```ts
uni.showLoading({
	title: '加载中'
});

setTimeout(function () {
	uni.hideLoading();
}, 2000);
```

### uni.showModal(OBJECT)

显示模态弹窗，可以只有一个确定按钮，也可以同时有确定和取消按钮。类似于一个API整合了 html 中：alert、confirm。

**OBJECT参数说明**

| 参数            | 类型     | 必填 | 说明                                                         |
| :-------------- | :------- | :--- | :----------------------------------------------------------- |
| title           | String   | 否   | 提示的标题                                                   |
| content         | String   | 否   | 提示的内容                                                   |
| showCancel      | Boolean  | 否   | 是否显示取消按钮，默认为 true                                |
| cancelText      | String   | 否   | 取消按钮的文字，默认为"取消"                                 |
| cancelColor     | HexColor | 否   | 取消按钮的文字颜色，默认为"#000000"                          |
| confirmText     | String   | 否   | 确定按钮的文字，默认为"确定"                                 |
| confirmColor    | HexColor | 否   | 确定按钮的文字颜色，H5平台默认为"#007aff"，微信小程序平台默认为"#576B95"，百度小程序平台默认为"#3c76ff" |
| editable        | Boolean  | 否   | 是否显示输入框                                               |
| placeholderText | String   | 否   | 显示输入框时的提示文本                                       |
| success         | Function | 否   | 接口调用成功的回调函数                                       |
| fail            | Function | 否   | 接口调用失败的回调函数                                       |
| complete        | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |

示例

```ts
<template>
	<view class="">
		分类页面
		<button @click="remove">删除</button>
		<view>---</view>
		<button @click="select">学历</button>		
	</view>
</template>
function remove(){
	uni.showModal({
		title:"是否删除？",		
		cancelText:"No",
		confirmText:"Yes",
		cancelColor:"#999",
		confirmColor:"#f00",
		editable:true,		
		success:res=>{
			// if(res.confirm) uni.showToast({title:"删除成功"})
			console.log(res);
		}
	})
}
```



### uni.showActionSheet(OBJECT)

从底部向上弹出操作菜单

**OBJECT参数说明**

| 参数      | 类型     | 必填 | 说明                                               |
| :-------- | :------- | :--- | :------------------------------------------------- |
| title     | String   | 否   | 菜单标题                                           |
| alertText | String   | 否   | 警示文案（同菜单标题）                             |
| itemList  | Array    | 是   | 按钮的文字数组                                     |
| itemColor | HexColor | 否   | 按钮的文字颜色，字符串格式，默认为"#000000"        |
| popover   | Object   | 否   | 大屏设备弹出原生选择按钮框的指示区域，默认居中显示 |
| success   | Function | 否   | 接口调用成功的回调函数，详见返回参数说明           |
| fail      | Function | 否   | 接口调用失败的回调函数                             |
| complete  | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）   |

示例

```ts
<template>
	<view class="">
		分类页面
		<button @click="remove">删除</button>
		<view>---</view>
		<button @click="select">学历</button>		
	</view>
</template>
let arrs = ["高中","大专","本科","研究生"];
function select(){
	uni.showActionSheet({
		title:"请选择",
		itemList:arrs,
		success:res=>{			
			console.log(res);
			console.log(arrs[res.tapIndex]);
		}
	})
}
```

### 导航栏

### uni.setNavigationBarTitle(OBJECT)

动态设置当前页面的标题。

**OBJECT参数说明**

| 参数     | 类型     | 必填 | 说明                                             |
| :------- | :------- | :--- | :----------------------------------------------- |
| title    | String   | 是   | 页面标题                                         |
| success  | Function | 否   | 接口调用成功的回调函数                           |
| fail     | Function | 否   | 接口调用失败的回调函数                           |
| complete | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

### uni.setNavigationBarColor(OBJECT)

设置页面导航条颜色。**如果需要进入页面就设置颜色，请延迟执行，防止被框架内设置颜色逻辑覆盖**

**OBJECT参数说明**

| 参数            | 类型     | 必填 | 说明                                                         |
| :-------------- | :------- | :--- | :----------------------------------------------------------- |
| frontColor      | String   | 是   | 前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000 |
| backgroundColor | String   | 是   | 背景颜色值，有效值为十六进制颜色                             |
| animation       | Object   | 否   | 动画效果                                                     |
| success         | Function | 否   | 接口调用成功的回调函数                                       |
| fail            | Function | 否   | 接口调用失败的回调函数                                       |
| complete        | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |

### uni.showNavigationBarLoading(OBJECT)

在当前页面显示导航条加载动画。

**OBJECT参数说明**

| 参数     | 类型     | 必填 | 说明                                             |
| -------- | -------- | ---- | ------------------------------------------------ |
| success  | Function | 否   | 接口调用成功的回调函数                           |
| fail     | Function | 否   | 接口调用失败的回调函数                           |
| complete | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

```ts
uni.showNavigationBarLoading()
```

### uni.hideNavigationBarLoading(OBJECT)

在当前页面隐藏导航条加载动画。

**OBJECT参数说明**

| 参数     | 类型     | 必填 | 说明                                             |
| -------- | -------- | ---- | ------------------------------------------------ |
| success  | Function | 否   | 接口调用成功的回调函数                           |
| fail     | Function | 否   | 接口调用失败的回调函数                           |
| complete | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

```javascript
uni.hideNavigationBarLoading()
```

### uni.hideHomeButton(OBJECT)

**OBJECT参数说明**

| 参数     | 类型     | 必填 | 说明                                             |
| -------- | -------- | ---- | ------------------------------------------------ |
| success  | Function | 否   | 接口调用成功的回调函数                           |
| fail     | Function | 否   | 接口调用失败的回调函数                           |
| complete | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

```javascript
uni.hideHomeButton()
```

### 工具栏

### uni.setTabBarItem(OBJECT)

动态设置 tabBar 某一项的内容

**OBJECT参数说明：**

| 属性             | 类型    | 默认值 | 必填 | 说明                                                         |
| :--------------- | :------ | :----- | :--- | :----------------------------------------------------------- |
| index            | number  |        | 是   | tabBar 的哪一项，从左边算起                                  |
| text             | String  |        | 否   | tab 上的按钮文字                                             |
| iconPath         | String  |        | 否   | 图片路径，icon 大小限制为 40kb，建议尺寸为 81px * 81px，当 position 为 top 时，此参数无效。微信小程序 2.7.0+、支付宝小程序支持网络图片，其他平台暂不支持网络图片 |
| selectedIconPath | String  |        | 否   | 选中时的图片路径，icon 大小限制为 40kb，建议尺寸为 81px * 81px ，当 position 为 top 时，此参数无效 |
| pagePath         | String  |        | 否   | 页面绝对路径，必须在 [pages](https://uniapp.dcloud.net.cn/collocation/pages#pages) 中先定义，被替换掉的 pagePath 不会变成普通页面（仍然需要使用 uni.switchTab 跳转） |
| visible          | Boolean | true   | 否   | 该项是否显示                                                 |
| iconfont         | Object  |        | 否   | 字体图标，优先级高于 iconPath                                |
| success          | Funtion |        | 否   | 接口调用成功的回调函数                                       |
| fail             | Funtion |        | 否   | 接口调用失败的回调函数                                       |
| complete         | Funtion |        | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |

### uni.hideTabBar(OBJECT)

隐藏 tabBar

### uni.showTabBar(OBJECT)

显示 tabBar

### uni.setTabBarBadge(OBJECT)

为 tabBar 某一项的右上角添加文本。

**OBJECT参数说明：**

| 参数     | 类型     | 必填 | 说明                                             |
| :------- | :------- | :--- | :----------------------------------------------- |
| index    | Number   | 是   | tabBar的哪一项，从左边算起                       |
| text     | String   | 是   | 显示的文本，不超过 3 个半角字符                  |
| success  | Function | 否   | 接口调用成功的回调函数                           |
| fail     | Function | 否   | 接口调用失败的回调函数                           |
| complete | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

```ts
uni.setTabBarBadge({
  index: 0,
  text: '1'
})
```

设置工具栏的样式通常在 APP.vue全局配置页中的 onLaunch 生命周期中执行

```ts
<script>
	export default {
		onLaunch: function() {
			uni.setTabBarBadge({
                index:1,
                text:33,
            })
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>
```

### uni.removeTabBarBadge(OBJECT)

移除 tabBar 某一项右上角的文本。

### uni.showTabBarRedDot(OBJECT)

显示 tabBar 某一项的右上角的红点。

### uni.hideTabBarRedDot(OBJECT)

隐藏 tabBar 某一项的右上角的红点。

### 下拉刷新

在 js 中定义 onPullDownRefresh 处理函数（和onLoad等生命周期函数同级），监听该页面用户下拉刷新事件。

- 需要在 `pages.json` 里，找到的当前页面的pages节点，并在 `style` 选项中开启 `enablePullDownRefresh`。
- 当处理完数据刷新后，`uni.stopPullDownRefresh` 可以停止当前页面的下拉刷新。

### uni.startPullDownRefresh(OBJECT)

开始下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致。

**OBJECT 参数说明**

| 参数名   | 类型     | 必填 | 说明                                             |
| :------- | :------- | :--- | :----------------------------------------------- |
| success  | Function | 否   | 接口调用成功的回调                               |
| fail     | Function | 否   | 接口调用失败的回调函数                           |
| complete | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

### uni.stopPullDownRefresh()

停止当前页面下拉刷新。

**示例**

pages.json

```ts
{
    "pages": [
        {
        	"path": "pages/index/index",
        	"style": {
        		"navigationBarTitleText": "uni-app",
        		"enablePullDownRefresh": true
        	}
        }
    ],
    "globalStyle": {
    	"navigationBarTextStyle": "white",
    	"navigationBarBackgroundColor": "#0faeff",
    	"backgroundColor": "#fbf9fe"
    }
}
```

```javascript
// 仅做示例，实际开发中延时根据需求来使用。
export default {
	data() {
		return {
			text: 'uni-app'
		}
	},
	onLoad: function (options) {
		setTimeout(function () {
			console.log('start pulldown');
		}, 1000);
		uni.startPullDownRefresh();
	},
	onPullDownRefresh() {
		console.log('refresh');
		setTimeout(function () {
			uni.stopPullDownRefresh();
		}, 1000);
	}
}
```

### 滚动

### uni.pageScrollTo(OBJECT)

**OBJECT参数说明**

| 参数名    | 类型     | 必填 | 说明                                                         |
| :-------- | :------- | :--- | :----------------------------------------------------------- |
| scrollTop | Number   | 否   | 滚动到页面的目标位置（单位px）                               |
| selector  | String   | 否   | 元素选择器，用于指定要滚动到的元素位置，App、H5、微信小程序2.7.3+ 、支付宝小程序1.20.0+支持 |
| duration  | Number   | 否   | 滚动动画的时长，默认300ms，单位 ms                           |
| success   | function | 否   | 接口调用成功的回调函数                                       |
| fail      | function | 否   | 接口调用失败的回调函数                                       |
| complete  | function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |

```ts

```



## 路由

**open-type 有效值**

| 值           | 说明                                   |
| :----------- | :------------------------------------- |
| navigate     | 对应 uni.navigateTo 的功能             |
| redirect     | 对应 uni.redirectTo 的功能             |
| switchTab    | 对应 uni.switchTab 的功能              |
| reLaunch     | 对应 uni.reLaunch 的功能               |
| navigateBack | 对应 uni.navigateBack 的功能           |
| exit         | 退出小程序，target="miniProgram"时生效 |

### uni.navigateTo(OBJECT)

保留当前页面，跳转到应用内的某个页面，使用`uni.navigateBack`可以返回到原页面。无法跳转到tabbar页面

**OBJECT参数说明**

| 参数              | 类型     | 必填 | 默认值 | 说明                                                         |
| :---------------- | :------- | :--- | :----- | :----------------------------------------------------------- |
| url               | String   | 是   |        | 需要跳转的应用内`非 tabBar `的页面的路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'，path为下一个页面的路径，下一个页面的onLoad函数可得到传递的参数 |
| animationType     | String   | 否   | pop-in | 窗口显示的动画效果，详见：[窗口动画](https://uniapp.dcloud.net.cn/api/router.html#animation) |
| animationDuration | Number   | 否   | 300    | 窗口动画持续时间，单位为 ms                                  |
| events            | Object   | 否   |        | 页面间通信接口，用于监听被打开页面发送到当前页面的数据。2.8.9+ 开始支持。 |
| success           | Function | 否   |        | 接口调用成功的回调函数                                       |
| fail              | Function | 否   |        | 接口调用失败的回调函数                                       |
| complete          | Function | 否   |        | 接口调用结束的回调函数（调用成功、失败都会执行）             |

```vue
<template>
	<view class="">
		demo页面
		<!-- <navigator url="/pages/demo2/demo2">demo2跳转</navigator> -->
		<view @click="goDemo2">跳转到demo2</view>
		<view>-----</view>
		<view @click="goIndex">跳转到首页</view>
		
	</view>
</template>

<script setup>
// uni.hideHomeButton()
function goDemo2(){
	uni.navigateTo({
		url:"/pages/demo2/demo2?name=张三&age=18&like=篮球"
	})
}
function goIndex(){
	uni.reLaunch({
		url:"/pages/index/index"
	})
}
```

### uni.reLaunch(OBJECT)

关闭所有页面，打开到应用内的某个页面。

**OBJECT参数说明**

| 参数     | 类型     | 必填 | 说明                                                         |
| :------- | :------- | :--- | :----------------------------------------------------------- |
| url      | String   | 是   | 需要跳转的应用内页面路径 , 路径后可以带参数。参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'，如果跳转的页面路径是 tabBar 页面则不能带参数 |
| success  | Function | 否   | 接口调用成功的回调函数                                       |
| fail     | Function | 否   | 接口调用失败的回调函数                                       |
| complete | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |

### uni.navigateBack(OBJECT)

关闭当前页面，返回上一页面或多级页面。可通过 `getCurrentPages()` 获取当前的页面栈，决定需要返回几层。

**OBJECT参数说明**

| 参数              | 类型     | 必填 | 默认值  | 说明                                                         |
| :---------------- | :------- | :--- | :------ | :----------------------------------------------------------- |
| delta             | Number   | 否   | 1       | 返回的页面数，如果 delta 大于现有页面数，则返回到首页。      |
| animationType     | String   | 否   | pop-out | 窗口关闭的动画效果，详见：[窗口动画](https://uniapp.dcloud.net.cn/api/router.html#animation) |
| animationDuration | Number   | 否   | 300     | 窗口关闭动画的持续时间，单位为 ms                            |
| success           | Function | 否   |         | 接口调用成功的回调函数                                       |
| fail              | Function | 否   |         | 接口调用失败的回调函数                                       |
| complete          | Function | 否   |         | 接口调用结束的回调函数（调用成功、失败都会执行）             |

```vue
<template>
	<view class="">
		demo2页面
		<button @click="goBack">返回首页</button>
	</view>
</template>

<script setup>
onLoad((e)=>{
	console.log(e);
})
function goBack(){
	uni.navigateBack()
}
console.log(getCurrentPages());
</script>
```

### getCurrentPages()

`getCurrentPages()` 获取当前的页面栈，包含当前页面的信息。

## 组件通信

### uni.$emit(eventName,OBJECT)

触发全局的自定义事件，附加参数都会传给监听器回调函数。

```ts
uni.$emit('update',{msg:'页面更新'})
```

### uni.$on(eventName,callback)

监听全局的自定义事件，事件由 `uni.$emit` 触发，回调函数会接收事件触发函数的传入参数。

```javascript
uni.$on('update',function(data){
		console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
	})
```

### uni.$once(eventName,callback)

监听全局的自定义事件，事件由 `uni.$emit` 触发，但仅触发一次，在第一次触发之后移除该监听器。

### uni.$off(eventName, callback)

## 数据缓存

### uni.setStorage(OBJECT)

```ts
将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。
```

**OBJECT 参数说明**

| 参数名   | 类型     | 必填 | 说明                                                         |
| :------- | :------- | :--- | :----------------------------------------------------------- |
| key      | String   | 是   | 本地缓存中的指定的 key                                       |
| data     | Any      | 是   | 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象 |
| success  | Function | 否   | 接口调用成功的回调函数                                       |
| fail     | Function | 否   | 接口调用失败的回调函数                                       |
| complete | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |

```ts
uni.setStorage({
	key: 'storage_key',
	data: 'hello',
	success: function () {
		console.log('success');
	}
});
```

### uni.setStorageSync(KEY,DATA)

将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。

**参数说明**

| 参数 | 类型   | 必填 | 说明                                                         |
| :--- | :----- | :--- | :----------------------------------------------------------- |
| key  | String | 是   | 本地缓存中的指定的 key                                       |
| data | Any    | 是   | 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象 |

```ts
try {
	uni.setStorageSync('storage_key', 'hello');
} catch (e) {
	// error
}
```

### uni.getStorage(OBJECT)

从本地缓存中异步获取指定 key 对应的内容。

**OBJECT 参数说明**

| 参数名   | 类型     | 必填 | 说明                                             |
| :------- | :------- | :--- | :----------------------------------------------- |
| key      | String   | 是   | 本地缓存中的指定的 key                           |
| success  | Function | 是   | 接口调用的回调函数，res = {data: key对应的内容}  |
| fail     | Function | 否   | 接口调用失败的回调函数                           |
| complete | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

### uni.getStorageSync(KEY)

从本地缓存中同步获取指定 key 对应的内容。

**参数说明**

| 参数 | 类型   | 必填 | 说明                   |
| :--- | :----- | :--- | :--------------------- |
| key  | String | 是   | 本地缓存中的指定的 key |

### uni.removeStorage(OBJECT)

从本地缓存中异步移除指定 key。

**OBJECT 参数说明**

| 参数名   | 类型     | 必填 | 说明                                             |
| :------- | :------- | :--- | :----------------------------------------------- |
| key      | String   | 是   | 本地缓存中的指定的 key                           |
| success  | Function | 是   | 接口调用的回调函数                               |
| fail     | Function | 否   | 接口调用失败的回调函数                           |
| complete | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

### uni.removeStorageSync(KEY)

从本地缓存中同步移除指定 key。

**参数说明**

| 参数名 | 类型   | 必填 | 说明                   |
| :----- | :----- | :--- | :--------------------- |
| key    | String | 是   | 本地缓存中的指定的 key |

**localStorage和SessionStorage的区别**

```ts
SessionStorage浏览器关了，就消失了，不是持久化
```

### uni.clearStorageSync()

同步清理本地数据缓存。

```ts
try {
	uni.clearStorageSync();
} catch (e) {
	// error
}
```

## 媒体

### uni.previewImage(OBJECT)

预览图片。

**OBJECT 参数说明**

| 参数名           | 类型          | 必填         | 说明                                                         |
| :--------------- | :------------ | :----------- | :----------------------------------------------------------- |
| current          | String/Number | 详见下方说明 | 详见下方说明                                                 |
| showmenu         | Boolean       | 否           | 是否显示长按菜单，默认值为 true                              |
| urls             | Array         | 是           | 需要预览的图片链接列表                                       |
| indicator        | String        | 否           | 图片指示器样式，可取值："default" - 底部圆点指示器； "number" - 顶部数字指示器； "none" - 不显示指示器。 |
| loop             | Boolean       | 否           | 是否可循环预览，默认值为 false                               |
| longPressActions | Object        | 否           | 长按图片显示操作菜单，如不填默认为**保存相册**               |
| success          | Function      | 否           | 接口调用成功的回调函数                                       |
| fail             | Function      | 否           | 接口调用失败的回调函数                                       |
| complete         | Function      | 否           | 接口调用结束的回调函数（调用成功、失败都会执行）             |

```vue
<view class="layout">
    <view class="box" v-for="(item,index) in pets" :key="item._id">
        <view class="pic">
            <image lazy-load :src="item.url" mode="widthFix" @click="onPreview(index)"></image>
        </view>
        <view class="text">{{item.content}}</view>
        <view class="author">—— {{item.author}}</view>
    </view>
</view>	
<script setup>
//点击预览
const onPreview = function (index){
	let urls = pets.value.map(item=>item.url);	
	uni.previewImage({
		current:index,
		urls
	}) 
}
</script>
```

## 设备

### uni.makePhoneCall(OBJECT)

拨打电话

```ts

```

**OBJECT 参数说明**

| 参数名      | 类型     | 必填 | 说明                                             |
| :---------- | :------- | :--- | :----------------------------------------------- |
| phoneNumber | String   | 是   | 需要拨打的电话号码                               |
| success     | Function | 否   | 接口调用成功的回调                               |
| fail        | Function | 否   | 接口调用失败的回调函数                           |
| complete    | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

### uni.getSystemInfo(OBJECT)

异步获取系统信息

**OBJECT 参数说明：**

| 参数名   | 类型     | 必填 | 说明                                             |
| :------- | :------- | :--- | :----------------------------------------------- |
| success  | Function | 是   | 接口调用成功的回调                               |
| fail     | Function | 否   | 接口调用失败的回调函数                           |
| complete | Function | 否   | 接口调用结束的回调函数（调用成功、失败都会执行） |

### uni.getSystemInfosync(OBJECT)

异步获取系统信息

```ts
方式1
uni.getSystemInfo({
	success: function (res) {
		console.log(res.appName)
	}
});
方式2
SYSTEM_INFO = uni.getSystemInfo()
console.log(SYSTEM_INFO.navigationBarHeight) // 这里返回的值是 px单位，不是rpx单位
```

**参数说明**

| 参数                | 说明             |
| ------------------- | ---------------- |
| navigationBarHeight | 导航栏的高度     |
| titleBarHeight      | 标题栏高度       |
| statusBarHeight     | 手机状态栏的高度 |

**各部分高度说明**

**状态栏高度（Status Bar Height）**

- **指的是手机顶部状态栏的高度**，即显示时间、电量、信号的部分。
- 这个高度因设备不同而不同（如 iPhone X 及以上的刘海屏，安卓手机等）。
- 可以通过 `wx.getSystemInfoSync().statusBarHeight` 获取。

**导航栏高度（Navigation Bar Height）**

- **指的是小程序页面顶部的导航栏（包含返回按钮、标题等）**。
- 这个高度在不同设备上是固定的，通常是 **44px**（iOS）或 **48px**（Android）。

**标题栏高度Title Bar Height**

- **标题栏 = 状态栏 + 导航栏**，也就是整个小程序顶部的高度。

- 计算方式：

  ```js
  const systemInfo = wx.getSystemInfoSync();
  const statusBarHeight = systemInfo.statusBarHeight; // 状态栏高度
  const navBarHeight = systemInfo.platform === 'ios' ? 44 : 48; // iOS 为 44，Android 为 48
  const titleBarHeight = statusBarHeight + navBarHeight; // 总标题栏高度
  ```

![image-20250313151457971](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20250313151457971.png)

## 网络

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

### uni.connectSocket(OBJECT)

创建一个 [WebSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket) 连接。

uni-app的socket，分全局socket和socketTask。全局socket只能有一个，一旦被占用就无法再开启。**所以不推荐使用全局socket，一般使用socketTask。**

**OBJECT 参数说明**

| 参数名    | 类型          | 必填 | 说明                                                         | 平台差异说明                                            |
| :-------- | :------------ | :--- | :----------------------------------------------------------- | :------------------------------------------------------ |
| url       | String        | 是   | 服务器接口地址                                               | 小程序中必须是 `wss://` 协议                            |
| multiple  | Boolean       | 否   | 是否多实例。传入 true 时，将返回一个包含 SocketTask 实例。   | 仅支付宝小程序支持                                      |
| header    | Object        | 否   | HTTP Header , header 中不能设置 Referer                      | 小程序、App 2.9.6+                                      |
| method    | String        | 否   | 默认是GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT | 仅微信小程序支持                                        |
| protocols | Array<String> | 否   | 子协议数组                                                   | App、H5、微信小程序、百度小程序、抖音小程序、飞书小程序 |
| success   | Function      | 否   | 接口调用成功的回调函数                                       |                                                         |
| fail      | Function      | 否   | 接口调用失败的回调函数                                       |                                                         |
| complete  | Function      | 否   | 接口调用结束的回调函数（调用成功、失败都会执行）             |                                                         |
