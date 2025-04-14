# 移动端项目APP

## 创建项目

在 VSCode 中开发 UniApp（APP 端），需要进行一些环境配置，包括安装必要的扩展、配置 HBuilderX、运行调试等。下面是完整的步骤

```ts
通过 cli工具创建项目
npx degit dcloudio/uni-preset-vue#vite-ts cooling-app
cd cooling-app/
安装依赖
npm install

通过Hbuilder创建项目（通过这种方式创建的，默认项目中没有vite.config.ts文件）
如果你在 HBuilderX 中创建的项目没有初始化 npm，你首先需要初始化 npm。
打开 HBuilderX，进入你的项目文件夹
运行以下命令来初始化 npm
npm init -y
这将生成一个默认的 package.json 文件
```

## 模拟器抓包

打开 Fidder，Tools，HTTPS - 勾选 DecryptHttpsTraffic - 点击 Actions - 导出 Export 到桌面

把证书格式更改，把cer格式变为pem，

```ts
openssl x509 -in 当前路径.cer -inform DER -out 新文件路径.pem -outform PEM

openssl x509 -in ~/Desktop/123.cer -inform DER -out 123.pem -outform PEM
openssl x509 -inform DER -in Fiddler_Root_Certificate_Authority.cer -out cacert.pem

查看哈希值
openssl x509 -subject_hash_old -in pem文件
openssl x509 -in -subject_hash_old -in 123.pem
openssl x509 -inform PEM -subject_hash_old -in cacert.pem
$ openssl x509 -inform PEM -subject_hash_old -in 123.pem
269953fb
-----BEGIN CERTIFICATE-----

T6arzzah/dxqqmtE1uYxaezynHF/XEKh79jDhEKnRSbYFS28IcY=
-----END CERTIFICATE-----

将桌面上的 cacaert.pem 证书 修改为 0725b47c.0 ，名称为上一步操作的 hash 值，后缀为 0
启动一个Android 7 以上的模拟器，按照下图指示
启动模拟器
设置模拟器静态IP并且开启网桥模式
开启模拟器Root
修改完重启模拟器
修改模拟器WIFI代理为手动，设置为 Filder的IP地址和端口
打开夜神模拟器设备的 USB 调试选项
将0725b47c.0证书放入夜神模拟器系统证书目录
复制上图中的0725b47c.0文件，然后打开下图指示的根目录文件夹，点击右上角的粘贴按钮，即可将0725b47c.0证书放入系统证书目录 /system/etc/security/cacerts/

夜神模拟器 cmd 环境配置
这个文件夹内可以看到有个 nox_adb 应用程序
打开查看高级系统设置，进入下图页面，按照顺序进行配置环境变量地址即可，在系统变量的Path中添加 nox_adb的路径
D:\Program Files\Nox\bin


给 0725b47c.0 证书赋予权限
使用 nox_adb devices 命令查看设备连接状态
使用 nox_adb conncet 127.0.0.1:62025 命令建立 adb 连接
nox_adb connect 127.0.0.1:62001
夜神模拟器的端口是规律的，第一个模拟器端口是62001，第二个模拟器端口是62025，第三个是62025+1，以此类推
使用nox_adb -s 127.0.0.1:62025 shell 命令进入模拟器 shell 命令行
nox_adb -s 127.0.0.1:62001 shell
使用 mount -o remount -rw /system 命令给外层根目录中的 system 赋予权限
使用 cd system/etc/security/cacerts 命令到系统证书目录


使用 chmod 644 0725b47c.0 命令给证书赋予权限
chmod 644 269953fb.0

修改完成后，使用ls -l 命令查看权限是否启用，如下图所示
最后需要在把最外层system的权限改回去
cd ../../../..
mount -o remount -ro system


以下为OpenSSL安装：
去官网下载好以后傻瓜式安装一直下一步，然后部署环境变量即可。
部署完cmd命令行输入openssl显示以下页面表示安装成功
安装完证书后，浏览器可能会一直弹窗报错“该网站的完全证书有问题
浏览器 【设置】- 【隐私与安全】- 【显示安全警告】 ，取消勾选就行

Fiddler过滤抓包如何设置
配置fiddler允许监听到https
设置过滤规则： 在 Fiddler 中，过滤规则可以通过 Filters 面板来配置
在 Fiddler 界面上，点击上方的 Filters 标签。

在左侧面板中，你会看到一个名为 Use Filters 的选项，确保这个选项被勾选。
配置过滤条件： 你需要通过 Host 或 IP 地址来过滤特定的客户端流量。步骤如下
根据 IP 过滤：

在 Filters 面板中，找到 Request Filters 部分。
你可以在 Host 或 IP 地址框中输入需要过滤的客户端 IP 地址。
比如，你想要过滤 192.168.1.100 这个 IP 的流量，你可以在 Host 或 Request URL 中设置为该 IP。
选择 Only Show Traffic to/from...：
这可以帮助你进一步精确过滤，仅捕获目标 IP 与 Fiddler 代理之间的流量。

使用 FiddlerScript 进一步定制过滤条件（可选）： 如果你需要更加复杂的过滤条件，Fiddler 允许你通过 FiddlerScript 脚本来设置过滤条件。
打开 FiddlerScript，点击 Rules -> Customize Rules。
在 OnBeforeRequest 或 OnBeforeResponse 函数中，可以编写自定义代码来检查流量的源 IP，过滤不需要的流量。你可以使用以下代码来判断请求的来源 IP：
if (oSession.remoteIP !== "192.168.1.100") {
    oSession["ui-hide"] = "True";  // 隐藏非目标 IP 的请求
}

这样，只有来自 IP 192.168.1.100 的流量会被显示。
验证过滤： 过滤设置完成后，你可以进行相应的测试，确保 Fiddler 只显示来自指定客户端 IP 的流量。
```

## 安装插件

### sass安装

```ts
npm install sass@1.77.5
```



### uviewUI组件

```ts
安装
https://uviewui.com/
使用 Hbuilder 导入
```

### UnoCss

基本使用

```ts
原子化CSS是一种CSS架构方式，其支持小型、单一用途的类，其名称基于视觉功能

安装
npm install -D unocss
vite配置
// vite.config.js
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
  ],
})
// webpack.config.js
const UnoCSS = require('@unocss/webpack').default

module.exports = {
  plugins: [
    UnoCSS(),
  ],
  optimization: {
    realContentHash: true,
  },
}
在根目录创建一个uno.config.ts配置文件
用于编写用户想要的 unocss 配置
// uno.config.js
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
})
 全局引入
// main.js
import 'virtual:uno.css';
```

## 安装pinia

```ts
将 vue 版本更新到 3.5.13，以匹配 pinia
npm install vue@3.5.13
npm install pinia

新建 stora/index.ts
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // 启用持久化插件

export default pinia

在 main.js 中引入并使用 Pinia：
import { createSSRApp } from "vue";
import App from "./App.vue";
import pinia from './store'

export function createApp() {
  const app = createSSRApp(App);
  app.use(pinia)
  return {
    app,
	pinia
  };
}

创建 store 文件夹并定义状态管理模块

在项目根目录下创建一个 store 文件夹，然后在其中创建所需的状态管理模块
// store/counter.js
import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
});

在需要使用状态的页面中，引入并使用 useCounterStore
<script setup>
import { useCounterStore } from '@/store/counter.js';

const counterStore = useCounterStore();
</script>


======================
自定义存储和自定义数据序列化程序。
npm i pinia-plugin-persistedstate@4.2.0

将插件添加到你的 pinia 实例中：
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


在定义具体的 Store 时，使用 persist 选项来启用持久化功能
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    token: '',
  }),
  persist: true, // 启用持久化
});

在状态管理模块中启用持久化：
  // store/counter.js
  import { defineStore } from 'pinia';

  export const useCounterStore = defineStore('counter', {
    state: () => ({
      count: 0,
    }),
    actions: {
      increment() {
        this.count++;
      },
    },
    persist: true, // 启用持久化
  });
通过上述步骤，您可以在 uni-app 的 HBuilder X 项目中成功集成并使用 Pinia 进行状态管理
```

自定义持久化内容

如果您需要自定义持久化的行为，例如更改存储方式或指定需要持久化的状态字段，可以在 `persist` 选项中进行配置：

```ts
自定义持久化配置（可选）

import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '',
    token: '',
  }),
  persist: {
    key: 'user_data', // 自定义存储的键名
    storage: sessionStorage, // 使用 sessionStorage 而非 localStorage
    paths: ['token'], // 仅持久化 token 字段
  },
});

```

## 请求拦截器

src/interceptors/request.ts

```js
// request拦截器
export const requestInterceptor = () => {
	// 添加请求和响应拦截器
	uni.addInterceptor('request', {
		invoke(args) {
			// 请求前的处理，如添加 token
			const token = uni.getStorageSync('TOKEN');
			if (token) {
				args.header = {
					...args.header,
					Authorization: `Bearer ${token}`,
				};
			}
			return args;
		},
		success(response) {
			// 响应后的处理，如统一处理错误码
			if (response.statusCode === 401) {
				uni.showToast({
					title: '登录已过期，请重新登录',
					icon: 'none',
				});
				// 可以跳转到登录页面
				uni.redirectTo({ url: '/pages/login/login' });
			}
			return response;
		},
		fail(err) {
			// 请求失败的处理
			uni.showToast({
				title: '请求失败，请检查网络',
				icon: 'none',
			});
			return Promise.reject(err);
		},
	});
}
```



## 路由拦截器

src/interceptors/route.ts

```ts
import { getToken } from "@/utils/system";

// 定义需要拦截的路由跳转方法
const methodsToIntercept = ['navigateTo', 'redirectTo', 'reLaunch', 'switchTab'];

// navigate拦截器
const navigateToInterceptor = (args) => {
	const WHITE_LIST = ['/pages/login/login']; // 定义白名单页面
	// 获取目标页面的路径
	const url = args.url.split('?')[0];

	// 如果目标页面在白名单中，则直接放行
	if (WHITE_LIST.includes(url)) {
		return args;
	}

	// 获取token
	const token = getToken();

	if (!token) {
		// 如果没有 Token，提示用户并跳转到登录页面
		uni.showToast({ title: '请先登录', icon: 'none' });
		uni.navigateTo({ url: '/pages/login/login' });
		return false; // 阻止原始跳转
	}

	// Token 有效，允许跳转
	return args;
}

export const routeInterceptor = {
	install() {
		methodsToIntercept.forEach((method) => {
			uni.addInterceptor(method, {
				invoke: navigateToInterceptor,
			});
		});
	},
}
```

拦截器

src/interceptors/index.ts

```ts
export { requestInterceptor } from './request'
export { routeInterceptor } from './route'
```

在main.ts中挂载

```ts
import { createSSRApp } from "vue";
import App from "./App.vue";
import pinia from './store'

import { routeInterceptor ,requestInterceptor } from './interceptors/index'

export function createApp() {
	const app = createSSRApp(App);
	app.use(pinia)
	app.use(routeInterceptor)
	app.use(requestInterceptor)
	return {
		app,
		pinia
	};
}
```



## src目录

在 uni-app 中，默认情况下 @ 符号不会指向 src 目录，而是需要手动配置。

```ts
在项目根目录的 vite.config.js 文件中，添加以下代码：

import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 将 @ 指向 src 目录
    },
  },
});
```

## 跨域配置

```ts

```

## 底部配置

```ts
在 pages.json 中配置
{
	"pages": [ //pages数组中第一项表示应用启动页，参考：https://uniapp.dcloud.io/collocation/pages
		{
			"path": "pages/index/index",
			"style": {
				"navigationBarTitleText": "首页"
			}
		},
		{
			"path": "pages/device/device",
			"style": {
				"navigationBarTitleText": "设备"
			}
		},
		{
			"path": "pages/user/user",
			"style": {
				"navigationBarTitleText": "用户"
			}
		}
	],
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "通信基站机柜高效热管理平台",
		"navigationBarBackgroundColor": "#F8F8F8",
		"backgroundColor": "#F8F8F8"
	},
	"tabBar": {
		"color": "#9799a5",
		"selectedColor": "#3284FF",
		"borderStyle": "white",
		"list": [{
				"pagePath": "pages/index/index",
				"iconPath": "static/images/tabbar/home.png",
				"selectedIconPath": "static/images/tabbar/home-h.png",
				"text": "首页"
			},
			{
				"pagePath": "pages/device/device",
				"iconPath": "static/images/tabbar/device.png",
				"selectedIconPath": "static/images/tabbar/device-h.png",
				"text": "设备"
			},
			{
				"pagePath": "pages/user/user",
				"iconPath": "static/images/tabbar/my.png",
				"selectedIconPath": "static/images/tabbar/my-h.png",
				"text": "我的"
			}
		]
	},
	"easycom": {
		"autoscan": true,
		"custom": {
			"^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
		}
	},
	"condition": { //模式配置，仅开发期间生效
		"current": 0, //当前激活的模式(list 的索引项)
		"list": [{
			"name": "", //模式名称
			"path": "", //启动页面，必选
			"query": "" //启动参数，在页面的onLoad函数里面得到
		}]
	}
}
```

## 配置高德Key

配置 manifest.json 后再打自定义基座，再自定义基座确定好 包名 然后等待 云打包完成，可以登陆 uclioud后台看到应用的 SHA1和包名。然后在运行，使用自定义基座运行。

获取高德地图 API Key

```ts
访问 高德开放平台。

注册并登录后，进入「应用管理」->「创建新应用」。

选择 Web服务 类型，获取 API Key（key）。
云打包，使用云打包中的证书中的SHA1 5D:2B:50:B0:DF:5B:A5:EA:A5:9F:66
启用 逆地理编码（Geocode） 和 POI搜索 服务。
```

在 manifest.json 配置

```ts
在 HBuilderX 中，打开 manifest.json，找到 App -> SDK 配置 -> 地图，填入你的 API Key

{
  "appid": "",
  "uniStatistics": {},
  "permissions": {
    "Maps": {
      "provider": "amap",
      "key": {
        "android": "你的高德API Key",
        "ios": "你的高德API Key"
      }
    }
  }
}

```

在 main.ts 中初始化地图

```ts
在 main.ts 文件中，确保 uni-app 知道你使用的是高德地图：
uni.setStorageSync('amap_key', '你的高德API Key');
```

使用腾讯地图SDK

## uni 请求

在使用 uni.request 发起网络请求时，处理请求参数的方式与 axios 存在一些差异。在 axios 中，params 通常用于 GET 请求的查询参数，data 则用于 POST 请求的请求体。而在 uni.request 中，所有请求类型的参数都通过 data 字段传递

```ts

```

在 `uni.request` 中处理请求参数的建议

```ts
// 方法一：将查询参数直接添加到 URL 中
uni.request({
  url: 'https://example.com/api/resource?param1=value1&param2=value2',
  method: 'GET',
  success: (res) => {
    // 处理响应
  },
  fail: (err) => {
    // 处理错误
  }
});

// 方法二：使用 data 字段传递查询参数
uni.request({
  url: 'https://example.com/api/resource',
  method: 'GET',
  data: {
    param1: 'value1',
    param2: 'value2'
  },
  success: (res) => {
    // 处理响应
  },
  fail: (err) => {
    // 处理错误
  }
});

```

**POST 请求：**将请求体参数放在 `data` 字段中

```
uni.request({
  url: 'https://example.com/api/resource',
  method: 'POST',
  data: {
    key1: 'value1',
    key2: 'value2'
  },
  success: (res) => {
    // 处理响应
  },
  fail: (err) => {
    // 处理错误
  }
});

```

**封装 `uni.request` 以模拟 `axios` 的用法：**

为了使 `uni.request` 的使用方式更接近 `axios`，可以进行封装，使其支持类似的配置项。

```ts
const request = (options) => {
  const { url, method = 'GET', params = {}, data = {}, header = {} } = options;

  // 处理 GET 请求的查询参数
  let fullUrl = url;
  if (method.toUpperCase() === 'GET' && Object.keys(params).length > 0) {
    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');
    fullUrl = `${url}?${queryString}`;
  }

  // 发起请求
  return new Promise((resolve, reject) => {
    uni.request({
      url: fullUrl,
      method,
      data: method.toUpperCase() === 'GET' ? {} : data,
      header,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};

// 使用示例
request({
  url: 'https://example.com/api/resource',
  method: 'GET',
  params: {
    param1: 'value1',
    param2: 'value2'
  }
}).then(response => {
  // 处理响应
}).catch(error => {
  // 处理错误
});

```

您可以使用 qs 插件将参数对象序列化为查询字符串，以处理类似 axios 的 params 参数。qs 是一个流行的查询字符串解析和序列化库，常用于将对象转换为 URL 查询字符串格式

```ts
npm install qs
```

在 uni.request 中使用 qs 处理查询参数

## 封装request

src/utils/request.ts

在使用 uni.request 发起 GET 请求时，您可以使用 qs.stringify() 方法将参数对象转换为查询字符串，并将其附加到 URL 中

```ts
import qs from 'qs';
//ES6类
class Service {
    //原型对象的方法
    API(options: any): any {
		var queryString = '';
		// 解构
		const {params = {}, data = {}, header = {} } = options;
		
        // 定义全局基础路由
        const baseURL = 'http://jdgz.xwydl.com:8310';
		
        //加载效果开启
        uni.showLoading({
            title: '加载中...'
        })

        //判断用户是否登录:如有token携带
        const token = uni.getStorageSync('TOKEN');
        // 定义请求头
		header['Content-Type'] = 'application/json;charset=UTF-8'
        
        // 如果token存在,则携带请求头
        if (token) {
            header.token = token;
        }
		
		// 如果存在 params
		if(params){
			// 序列化params
			queryString = '?' + qs.stringify(params)
		}else{
			queryString = ''
		}
		
        // 返回一个promise对象
        return new Promise((resolve, reject) => {
            //uni-app 提供的API进行网络发请求
            uni.request({
                url: baseURL + options.url + queryString,// 请求的地址
                method: options.method || 'GET',// 请求方式
                data: options.data || {},// 携带的参数
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
    get(options: any) {
        options.method = "GET";
        return this.API(options);
    }
    // post请求方法
    post(options: any) {
        options.method = "POST";
        return this.API(options);
    }
    // delete 请求方法
    delete(options: any) {
        options.method = "DELETE";
        return this.API(options);
    }
}
// 暴漏数据
export default Service;
```

## 封装API

src/api/home/home.ts

```ts
import Service from "@/utils/request";

class Request extends Service {
    // 登陆请求
	reqLogin(data:any){
		return this.post({
			url:'/api/mob/login',
			data:data
		})
	}
	// 获取地图数据
	reqDeviceMapList(params:any){
		return this.post({
			url:'/api/core/device/map/list',
			data:null,
			params:params
		})
	}
}
export default new Request;
```

## nvue

启用nvue格式，来支持原生SDK或API的支持

首先在pages.json文件中，把对应的页面添加上 app-plus；

```json
{
    "path" : "pages/map/map",
    "style" : 
    {
        "navigationBarTitleText" : "地图",
        "navigationStyle": "custom",
        "app-plus":{"nvue":true}
    }
},
```

然后更改文件的后缀 map.vue => map.nvue

使用vue2的语法编写

```vue
map.nvue
```

## 坐标系

高德默认使用的gcj02（国内）坐标系得到的经纬度，一些第三方软件如 奥维地图获取的经纬度是 wsg（国际）坐标，两者相差500m左右。注意，根据需要进行转换

wsg转gcj02

```ts
// 坐标转换方法（WGS84 -> GCJ02）
function wgs84ToGcj02(lon, lat) {
	const a = 6378245.0;
	const ee = 0.00669342162296594323;

	function outOfChina(lon, lat) {
		return lon < 72.004 || lon > 137.8347 || lat < 0.8293 || lat > 55.8271;
	}

	function transformLat(x, y) {
		let ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y +
			0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
		ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(y * Math.PI) + 40.0 * Math.sin(y / 3.0 * Math.PI)) * 2.0 / 3.0;
		ret += (160.0 * Math.sin(y / 12.0 * Math.PI) + 320 * Math.sin(y * Math.PI / 30.0)) * 2.0 / 3.0;
		return ret;
	}

	function transformLon(x, y) {
		let ret = 300.0 + x + 2.0 * y + 0.1 * x * x +
			0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
		ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
		ret += (20.0 * Math.sin(x * Math.PI) + 40.0 * Math.sin(x / 3.0 * Math.PI)) * 2.0 / 3.0;
		ret += (150.0 * Math.sin(x / 12.0 * Math.PI) + 300.0 * Math.sin(x / 30.0 * Math.PI)) * 2.0 / 3.0;
		return ret;
	}

	if (outOfChina(lon, lat)) {
		return [lon, lat];
	}

	const dLat = transformLat(lon - 105.0, lat - 35.0);
	const dLon = transformLon(lon - 105.0, lat - 35.0);
	const radLat = lat / 180.0 * Math.PI;
	let magic = Math.sin(radLat);
	magic = 1 - ee * magic * magic;
	const sqrtMagic = Math.sqrt(magic);
	const mgLat = lat + (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * Math.PI);
	const mgLon = lon + (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * Math.PI);

	return [mgLon, mgLat];
}
```

