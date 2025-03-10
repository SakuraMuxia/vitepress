# 移动端项目APP

## 创建项目

```ts
通过 cli工具创建项目
npx degit dcloudio/uni-preset-vue#vite-ts my-vue3-project
安装依赖
npm install
```

## 配置Pages.json

```json
{
  "pages": [
    {
      "path": "pages/index/index",
      "style": {
        "navigationBarTitleText": ""
      }
    },
    {
      "path": "pages/device/device",
      "style": {
        "navigationBarTitleText": ""
      }
    },
    {
      "path": "pages/devops/devops",
      "style": {
        "navigationBarTitleText": ""
      }
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black",
    "navigationBarTitleText": "",
    "backgroundColor": "#F8F8F8"
  },
  "tabBar": {
	"color": "#a29f9f",
	"selectedColor": "#000000",
    "list": [
      {
        "pagePath": "pages/index/index",
		"iconPath": "static/tabbar/home.png",
        "selectedIconPath": "static/tabbar/homeHL.png",
		"text": "首页"
      },
      {
        "pagePath": "pages/device/device",
		"iconPath": "static/tabbar/device.png",
		"selectedIconPath": "static/tabbar/deviceHL.png",
        "text": "设备"
      },
      {
        "pagePath": "pages/devops/devops",
		"iconPath": "static/tabbar/devops.png",
		"selectedIconPath": "static/tabbar/devopsHL.png",
        "text": "运维"
      }
    ]
  },
  "easycom": {
    "autoscan": true,
    "custom": {
      "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
    }
  },
	"condition" : { //模式配置，仅开发期间生效
		"current": 0, //当前激活的模式(list 的索引项)
		"list": [
			{
				"name": "", //模式名称
				"path": "", //启动页面，必选
				"query": "" //启动参数，在页面的onLoad函数里面得到
			}
		]
	}
}

```

## 隐藏默认导航栏

隐藏默认导航栏，自定义 Navbar 组件

```ts
如果每个页面的标题区域布局不同，pages.json 配置的默认标题栏可能不够灵活。可以在 pages.json 里隐藏导航栏，然后在页面中自定义：
```

