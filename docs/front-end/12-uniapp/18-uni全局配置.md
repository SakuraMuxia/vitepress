# 全局配置

## pages.json

以下是一个包含了所有配置选项的 `pages.json` 

```json
{
	"pages": [{
		"path": "pages/component/index",
		"style": {
			"navigationBarTitleText": "组件"
		}
	}, {
		"path": "pages/API/index",
		"style": {
			"navigationBarTitleText": "接口"
		}
	}, {
		"path": "pages/component/view/index",
		"style": {
			"navigationBarTitleText": "view"
		}
	}],
	"condition": { //模式配置，仅开发期间生效
		"current": 0, //当前激活的模式（list 的索引项）
		"list": [{
			"name": "test", //模式名称
			"path": "pages/component/view/index" //启动页面，必选
		}]
	},
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "演示",
		"navigationBarBackgroundColor": "#F8F8F8",
		"backgroundColor": "#F8F8F8",
		"usingComponents":{
			"collapse-tree-item":"/components/collapse-tree-item"
		},
		"renderingMode": "seperated", // 仅微信小程序，webrtc 无法正常时尝试强制关闭同层渲染
		"pageOrientation": "portrait", //横屏配置，全局屏幕旋转设置(仅 APP/微信/QQ小程序)，支持 auto / portrait / landscape
		"rpxCalcMaxDeviceWidth": 960,
		"rpxCalcBaseDeviceWidth": 375,
		"rpxCalcIncludeWidth": 750
	},
	"tabBar": {
		"color": "#7A7E83",
		"selectedColor": "#3cc51f",
		"borderStyle": "black",
		"backgroundColor": "#ffffff",
		"height": "50px",
		"fontSize": "10px",
		"iconWidth": "24px",
		"spacing": "3px",
    	"iconfontSrc":"static/iconfont.ttf", // app tabbar 字体.ttf文件路径 app 3.4.4+
		"list": [{
			"pagePath": "pages/component/index",
			"iconPath": "static/image/icon_component.png",
			"selectedIconPath": "static/image/icon_component_HL.png",
			"text": "组件",
      		"iconfont": { // 优先级高于 iconPath，该属性依赖 tabbar 根节点的 iconfontSrc
       			"text": "\ue102",
        		"selectedText": "\ue103",
        		"fontSize": "17px",
        		"color": "#000000",
        		"selectedColor": "#0000ff"
      		}
		}, {
			"pagePath": "pages/API/index",
			"iconPath": "static/image/icon_API.png",
			"selectedIconPath": "static/image/icon_API_HL.png",
			"text": "接口"
		}],
		"midButton": {
			"width": "80px",
			"height": "50px",
			"text": "文字",
			"iconPath": "static/image/midButton_iconPath.png",
			"iconWidth": "24px",
			"backgroundImage": "static/image/midButton_backgroundImage.png"
		}
	},
  "easycom": {
    "autoscan": true, //是否自动扫描组件
    "custom": {//自定义扫描规则
      "^uni-(.*)": "@/components/uni-$1.vue"
    }
  },
  "topWindow": {
    "path": "responsive/top-window.vue",
    "style": {
      "height": "44px"
    }
  },
  "leftWindow": {
    "path": "responsive/left-window.vue",
    "style": {
      "width": "300px"
    }
  },
  "rightWindow": {
    "path": "responsive/right-window.vue",
    "style": {
      "width": "300px"
    },
    "matchMedia": {
      "minWidth": 768
    }
  }
}

```

`pages.json` 文件用来对 uni-app 进行全局配置，决定页面文件的路径、窗口样式、原生的导航栏、底部的原生tabbar 等。

它类似微信小程序中`app.json`的**页面管理**部分。注意定位权限申请等原属于`app.json`的内容，在uni-app中是在manifest中配置。

导航栏高度为 44px (不含状态栏)，tabBar 高度为 50px (不含安全区)。

| 属性名                                                       | 类型         |      | 作用                                    |                          |
| ------------------------------------------------------------ | ------------ | ---- | --------------------------------------- | ------------------------ |
| [globalStyle](https://uniapp.dcloud.net.cn/collocation/pages#globalstyle) | Object       | 否   | 设置默认页面的窗口表现                  |                          |
| [pages](https://uniapp.dcloud.net.cn/collocation/pages#pages) | Object Array | 是   | 设置页面路径及窗口表现                  |                          |
| [easycom](https://uniapp.dcloud.net.cn/collocation/pages#easycom) | Object       | 否   | 组件自动引入规则                        | 2.5.5+                   |
| [tabBar](https://uniapp.dcloud.net.cn/collocation/pages#tabbar) | Object       | 否   | 设置底部 tab 的表现                     |                          |
| [condition](https://uniapp.dcloud.net.cn/collocation/pages#condition) | Object       | 否   | 启动模式配置                            |                          |
| [subPackages](https://uniapp.dcloud.net.cn/collocation/pages#subPackages) | Object Array | 否   | 分包加载配置                            | H5 不支持                |
| [preloadRule](https://uniapp.dcloud.net.cn/collocation/pages#preloadrule) | Object       | 否   | 分包预下载规则                          | 微信小程序               |
| [workers](https://developers.weixin.qq.com/miniprogram/dev/framework/workers.html) | String       | 否   | `Worker` 代码放置的目录                 | 微信小程序               |
| [leftWindow](https://uniapp.dcloud.net.cn/collocation/pages#leftwindow) | Object       | 否   | 大屏左侧窗口                            | H5                       |
| [topWindow](https://uniapp.dcloud.net.cn/collocation/pages#topwindow) | Object       | 否   | 大屏顶部窗口                            | H5                       |
| [rightWindow](https://uniapp.dcloud.net.cn/collocation/pages#rightwindow) | Object       | 否   | 大屏右侧窗口                            | H5                       |
| [uniIdRouter](https://doc.dcloud.net.cn/uniCloud/uni-id/summary.html#uni-id-router) | Object       | 否   | 自动跳转相关配置，新增于HBuilderX 3.5.0 |                          |
| entryPagePath                                                | String       | 否   | 默认启动首页，新增于HBuilderX 3.7.0     | 微信小程序、支付宝小程序 |

### globalStyle

| 属性名                       | 类型     |         | 作用                                                         |
| ---------------------------- | -------- | ------- | ------------------------------------------------------------ |
| navigationBarBackgroundColor | HexColor | #F8F8F8 | 导航栏背景颜色（同状态栏背景色）                             |
| navigationBarTextStyle       | String   | black   | 导航栏标题颜色及状态栏前景颜色，仅支持 black/white           |
| navigationBarTitleText       | String   |         | 导航栏标题文字内容                                           |
| navigationStyle              | String   | default | 导航栏样式，仅支持 default/custom。custom即取消默认的原生导航栏 |
| backgroundColor              | HexColor | #ffffff | 下拉显示出来的窗口的背景色                                   |
| enablePullDownRefresh        | Boolean  | false   | 是否开启下拉刷新                                             |
| backgroundTextStyle          | String   | dark    | 下拉 loading 的样式，仅支持 dark / light                     |
|                              |          |         |                                                              |

### pages

`uni-app` 通过 pages 节点配置应用由哪些页面组成，pages 节点接收一个数组，数组每个项都是一个对象，其属性值如下：

| 属性      | 类型    | 默认值 | 描述                                                         |
| :-------- | :------ | :----- | :----------------------------------------------------------- |
| path      | String  |        | 配置页面路径                                                 |
| style     | Object  |        | 配置页面窗口表现，配置项参考下方 [pageStyle](https://uniapp.dcloud.net.cn/collocation/pages#style) |
| needLogin | Boolean | false  | 是否需要登录才可访问                                         |

**style**

用于设置每个页面的状态栏、导航条、标题、窗口背景色等。

页面中配置项会覆盖 globalStyle 中相同的配置项

| 属性                         | 类型     | 默认值  | 描述                                                         |
| :--------------------------- | :------- | :------ | :----------------------------------------------------------- |
| navigationBarBackgroundColor | HexColor | #F8F8F8 | 导航栏背景颜色（同状态栏背景色）                             |
| navigationBarTextStyle       | String   | black   | 导航栏标题颜色及状态栏前景颜色，仅支持 black/white           |
| navigationBarTitleText       | String   |         | 导航栏标题文字内容                                           |
| navigationBarShadow          | Object   |         | 导航栏阴影，配置参考下方 [导航栏阴影](https://uniapp.dcloud.net.cn/collocation/pages#navigationBarShadow) |
| navigationStyle              | String   | default | 导航栏样式，仅支持 default/custom。custom即取消默认的原生导航栏，需看[使用注意](https://uniapp.dcloud.net.cn/collocation/pages#customnav) |
| disableScroll                | Boolean  | false   | 设置为 true 则页面整体不能上下滚动（bounce效果），只在页面配置中有效，在globalStyle中设置无效 |
| backgroundColor              | HexColor | #ffffff | 窗口的背景色                                                 |
| backgroundTextStyle          | String   | dark    | 下拉 loading 的样式，仅支持 dark/light                       |
| enablePullDownRefresh        | Boolean  | false   | 是否开启下拉刷新，详见[页面生命周期](https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle)。 |
| onReachBottomDistance        | Number   | 50      | 页面上拉触底事件触发时距页面底部距离，单位只支持px，详见[页面生命周期](https://uniapp.dcloud.net.cn/tutorial/page.html#lifecycle) |
| backgroundColorTop           | HexColor | #ffffff | 顶部窗口的背景色（bounce回弹区域）                           |
| backgroundColorBottom        | HexColor | #ffffff | 底部窗口的背景色（bounce回弹区域）                           |
| disableSwipeBack             | Boolean  | false   | 是否禁用滑动返回                                             |
| titleImage                   | String   |         | 导航栏图片地址（替换当前文字标题），支付宝小程序内必须使用https的图片链接地址 |

### easycom

**自动引入规则**

传统vue组件，需要安装、引用、注册，三个步骤后才能使用组件。`easycom`将其精简为一步。

只要组件路径符合规范（具体见下），就可以不用引用、注册，直接在页面中使用。如下：

`路径规范`指：

1. 安装在项目根目录的components目录下，并符合`components/组件名称/组件名称.vue`
2. 安装在uni_modules下，路径为`uni_modules/插件ID/components/组件名称/组件名称.vue`

### tabBar

如果应用是一个多 tab 应用，可以通过 tabBar 配置项指定一级导航栏，以及 tab 切换时显示的对应页。

在 pages.json 中提供 tabBar 配置，不仅仅是为了方便快速开发导航，更重要的是在App和小程序端提升性能。在这两个平台，底层原生引擎在启动时无需等待js引擎初始化，即可直接读取 pages.json 中配置的 tabBar 信息，渲染原生tab。

**Tips**

- 当设置 position 为 top 时，将不会显示 icon
- tabBar 中的 list 是一个数组，只能配置最少2个、最多5个 tab，tab 按数组的顺序排序。
- tabbar 切换第一次加载时可能渲染不及时，可以在每个tabbar页面的onLoad生命周期里先弹出一个等待雪花（hello uni-app使用了此方式）
- tabbar 的页面展现过一次后就保留在内存中，再次切换 tabbar 页面，只会触发每个页面的onShow，不会再触发onLoad。
- 顶部的 tabbar 目前仅微信小程序上支持。需要用到顶部选项卡的话，建议不使用 tabbar 的顶部设置，而是自己做顶部选项卡，可参考 hello uni-app->模板->顶部选项卡。

**属性说明：**

| 属性            | 类型     | 必填 | 默认值 | 描述                                                         |
| :-------------- | :------- | :--- | :----- | :----------------------------------------------------------- |
| color           | HexColor | 是   |        | tab 上的文字默认颜色                                         |
| selectedColor   | HexColor | 是   |        | tab 上的文字选中时的颜色                                     |
| backgroundColor | HexColor | 是   |        | tab 的背景色                                                 |
| borderStyle     | String   | 否   | black  | tabbar 上边框的颜色，可选值 black/white，black对应颜色rgba(0,0,0,0.33)，white对应颜色rgba(255,255,255,0.33)。 |
| blurEffect      | String   | 否   | none   | iOS 高斯模糊效果，可选值 dark/extralight/light/none（参考:[使用说明](https://ask.dcloud.net.cn/article/36617)） |
| list            | Array    | 是   |        | tab 的列表，详见 list 属性说明，最少2个、最多5个 tab         |
| position        | String   | 否   | bottom | 可选值 bottom、top                                           |
| fontSize        | String   | 否   | 10px   | 文字默认大小                                                 |
|                 |          |      |        |                                                              |
|                 |          |      |        |                                                              |
|                 |          |      |        |                                                              |

其中 list 接收一个数组，数组中的每个项都是一个对象，其属性值如下：

| 属性             | 类型    | 必填 | 说明                                                         |
| :--------------- | :------ | :--- | :----------------------------------------------------------- |
| pagePath         | String  | 是   | 页面路径，必须在 pages 中先定义                              |
| text             | String  | 是   | tab 上按钮文字，在 App 和 H5 平台为非必填。例如中间可放一个没有文字的+号图标 |
| iconPath         | String  | 否   | 图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px，当 position 为 top 时，此参数无效，不支持网络图片，不支持字体图标 |
| selectedIconPath | String  | 否   | 选中时的图片路径，icon 大小限制为40kb，建议尺寸为 81px * 81px ，当 position 为 top 时，此参数无效 |
| visible          | Boolean | 否   | 该项是否显示，默认显示                                       |
| iconfont         | Object  | 否   | 字体图标，优先级高于 iconPath                                |

### condition

启动模式配置，仅开发期间生效，用于模拟直达页面的场景，如：小程序转发后，用户点击所打开的页面。

## manifest.json

`manifest.json` 文件是应用的配置文件，用于指定应用的名称、图标、权限等。HBuilderX 创建的工程此文件在根目录，CLI 创建的工程此文件在 src 目录。

```ts
// 微信公众平台
https://mp.weixin.qq.com/
```

在打包上线的时候配置。

### 配置项

| 属性        | 类型   | 默认值                                                       | 描述                                                         |
| :---------- | :----- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| name        | String |                                                              | 应用名称                                                     |
| appid       | String | 新建 uni-app 项目时，DCloud 云端分配。用途[详见](https://ask.dcloud.net.cn/article/35907) | 应用标识                                                     |
| description | String |                                                              | 应用描述                                                     |
| locale      | String | auto                                                         | 设置当前默认语言，具体参考 [locale](https://uniapp.dcloud.net.cn/api/ui/locale) |
| versionName | String |                                                              | 版本名称，例如：1.0.0。详见下方Tips说明                      |
| versionCode | Number |                                                              | 版本号，例如：36                                             |

## vite.config.js

vite.config.js 是一个可选的配置文件，如果项目的根目录中存在这个文件，那么它会被自动加载，一般用于配置 vite 的编译选项，具体规范参考：[vite.config.js](https://cn.vitejs.dev/)

**基础内容**

```js
必须引用 '@dcloudio/vite-plugin-uni' 并且添加到 plugins 中
import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';

export default defineConfig({
	plugins: [uni()],
});
```

### 自动导入配置

使用自动导入插件`unplugin-auto-import`

1.在项目命令行终端中执行如下代码

```javascript
npm install unplugin-auto-import
```

2.根目录下创建vite.config.js，并拷贝下面的代码

```js
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
 
export default defineConfig({
    plugins: [
        uni(),        
        // 自动导入配置
        AutoImport({
            imports:[
                // 预设
                'vue',
                'uni-app'                
            ]
        })
    ]    
})


```

3.去除vue和uniapp模块导入，项目可以正常运行

```js
<script setup>
const count = ref(0);
const state = ref(true)
onLoad(()=>{
	console.log("onLoad,页面生命周期钩子");
})
onMounted(()=>{
	console.log("onMounted,组件生命周期函数");
})
</script>

```

