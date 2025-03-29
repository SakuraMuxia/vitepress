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

## 持久化存储

```ts
自定义存储和自定义数据序列化程序。
npm i pinia-plugin-persistedstate@3.2.1

将插件添加到你的 pinia 实例中：
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

在声明您的store时，请将新persist选项设置为 true。
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStore = defineStore(
  'main',
  () => {
    const someState = ref('hello pinia')
    return { someState }
  },
  {
    persist: true,
  },
)
```

## 请求拦截器和路由拦截器

在 HBuilderX 开发 uni-app 时，可以通过 uni-app 提供的 uni.request 拦截器来定义 请求拦截器，而 路由拦截器 需要在 App.vue 中全局监听 onLaunch 和 onShow 生命周期，或者使用 vue-router 进行拦截（如果是 H5 端）。

## 请求拦截器

uni.request 本身不支持拦截器机制，但可以通过封装 request.js 实现全局拦截：

在 common/request.js 文件中

```js
// common/request.js
export const request = (options) => {
  return new Promise((resolve, reject) => {
    // 请求拦截 - 在这里可以添加 token 或者其他公共参数
    const token = uni.getStorageSync('token') || '';
    
    uni.request({
      ...options,
      header: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
        ...options.header, // 合并自定义 headers
      },
      success: (res) => {
        // 响应拦截 - 处理接口返回数据
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          uni.showToast({
            title: res.data.message || '请求失败',
            icon: 'none'
          });
          reject(res);
        }
      },
      fail: (err) => {
        uni.showToast({
          title: '网络请求失败',
          icon: 'none'
        });
        reject(err);
      }
    });
  });
};

```

使用请求拦截器

在 pages/index/index.vue 或 api.js 文件中

```js
import { request } from '@/common/request.js';

request({
  url: 'https://api.example.com/data',
  method: 'GET'
}).then(res => {
  console.log('请求成功:', res);
}).catch(err => {
  console.error('请求失败:', err);
});

```

## 路由拦截器

uni-app 并没有 vue-router 的 beforeEach 这样的拦截器，但可以在 onLaunch、onShow 监听跳转，并手动拦截

方法一：在 App.vue 中拦截

```ts
// App.vue
export default {
  onLaunch() {
    console.log('App 启动');
  },
  onShow() {
    const token = uni.getStorageSync('token');
    
    // 监听路由跳转
    const pages = getCurrentPages();
    const currentRoute = pages[pages.length - 1]?.route || '';

    // 如果未登录，且访问的不是登录页，则跳转到登录页
    if (!token && currentRoute !== 'pages/login/login') {
      uni.reLaunch({
        url: '/pages/login/login'
      });
    }
  }
};

```

方法二：封装 navigateTo 进行拦截

可以封装 uni.navigateTo、uni.reLaunch 等方法，进行拦截

```ts
// common/router.js
export const navigateTo = (url) => {
  const token = uni.getStorageSync('token');
  
  // 需要登录的页面
  const authPages = ['/pages/profile/profile', '/pages/order/order'];
  
  if (!token && authPages.includes(url)) {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    });
    setTimeout(() => {
      uni.reLaunch({ url: '/pages/login/login' });
    }, 1000);
    return;
  }
  
  uni.navigateTo({ url });
};

```

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





