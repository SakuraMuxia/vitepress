# 路由

服务端的路由：根据地址决定调用哪个函数

前端的路由：根据地址决定使用哪个组件

## vue-router

当在创建项目时，勾选了router，自动下载了vue-router

## 安装

### 直接引入

- 直接 [下载](https://unpkg.com/vue-router/dist/vue-router.js)
- 使用CDN [Unpkg.com](https://unpkg.com/) 提供了基于 NPM 的 CDN 链接

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router@2.0.0/dist/vue-router.js"></script>
```

### 模块化引入

```javascript
#使用npm 安装
npm install  vue-router
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
```

### 构建开发版

如果你想使用最新的开发版，就得从 GitHub 上直接 clone，然后自己 build 一个 `vue-router`。

```javascript
git clone https://github.com/vuejs/vue-router.git node_modules/vue-router
cd node_modules/vue-router
npm install
npm run build
```

## 基本使用

### VueRouter创建实例

```javascript
// 0. 导入Vue和VueRouter，要调用 Vue.use(VueRouter)
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' };
const Bar = { template: '<div>bar</div>' };

// 2. 定义路由 routes
// 每个路由应该映射一个组件。 其中"component" 可以是通过 Vue.extend() 创建的组件构造器,或者，只是一个组件配置对象。

const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 方式一:创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数 如 base 配置 mode配置
const router = new VueRouter({
  	routes, // (缩写) 相当于 routes: routes
    mode: "history",
    
})


// mode 指定路由模式，参数为history和hash，默认为hash
// base 指定根目录，base:"/"
	

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
  	router:router,
}).$mount('#app')

// 现在，应用已经启动了！
```

```vue
<template>
    <div id="app">
        <h1>Hello App!</h1>
        <p>
            <!-- 使用 router-link 组件来导航 -->
            <!-- 通过传入 `to` 属性指定链接 -->
            <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
            <router-link to="/foo">Go to Foo</router-link>
            <router-link to="/bar">Go to Bar</router-link>
        </p>

        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
    </div>
</template>
```

```javascript
在这个 `template` 中使用了两个由 Vue Router 提供的组件: `RouterLink` 和 `RouterView`。
不同于常规的 `<a>` 标签，我们使用组件 `RouterLink` 来创建链接。
这使得 Vue Router 能够在不重新加载页面的情况下改变 URL，处理 URL 的生成、编码和其他功能。我们将会在之后的部分深入了解 `RouterLink` 组件。
`RouterView` 组件可以使 Vue Router 知道你想要在哪里渲染当前 URL 路径对应的路由组件。
```

### createRouter()创建实例

路由器实例是通过调用 `createRouter()` 函数创建的:

```javascript
// 导入构造函数对象
import { createMemoryHistory, createRouter } from 'vue-router'
// 导入组件
import HomeView from './HomeView.vue'
import AboutView from './AboutView.vue'
// 定义路由 routes
const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
]
// 创建 router 实例 通过函数方式创建。
const router = createRouter({
    // 这里的history选项控制了路由和 URL 路径是如何双向映射的。
    // 它会完全忽略浏览器的 URL 而使用其自己内部的 URL
    // createWebHistory() History模式
    // createWebHashHistory() Hash模式
  	history: createMemoryHistory(),
  	routes,
})

// 注册路由器插件
// 一旦创建了我们的路由器实例，我们就需要将其注册为插件，这一步骤可以通过调用use()来完成

```

## 动态路由匹配

## 嵌套路由

## 编程式导航

## 命名视图

## 重定向和别名

### 重定向

```javascript
重定向也是通过 routes 配置来完成，下面例子是从 /home 重定向到 /：
const routes = [{ path: '/home', redirect: '/' }]
重定向的目标也可以是一个命名的路由：
const routes = [{ path: '/home', redirect: { name: 'homepage' } }]
```

使用方法，动态返回重定向目标：

```javascript
const routes = [
  {
    // /search/screens -> /search?q=screens
    path: '/search/:searchText',
    redirect: to => {
      // 方法接收目标路由作为参数
      // return 重定向的字符串路径/路径对象
      return { path: '/search', query: { q: to.params.searchText } }
    },
  },
  {
    path: '/search',
    // ...
  },
]
```

### 相对重定向

也可以重定向到相对位置：

```javascript
const routes = [
  {
    // 将总是把/users/123/posts重定向到/users/123/profile。
    path: '/users/:id/posts',
    redirect: to => {
      // 该函数接收目标路由作为参数
      // 相对位置不以`/`开头
      // 或 { path: 'profile'}
      return 'profile'
    },
  },
]
```

### 别名

将 `/` 别名为 `/home`，意味着当用户访问 `/home` 时，URL 仍然是 `/home`，但会被匹配为用户正在访问 `/`。

上面对应的路由配置为：

```javascript
const routes = [{ path: '/', component: Homepage, alias: '/home' }]
```

通过别名，你可以自由地将 UI 结构映射到一个任意的 URL，而不受配置的嵌套结构的限制。

使别名以 `/` 开头，以使嵌套路径中的路径成为绝对路径。你甚至可以将两者结合起来，用一个数组提供多个别名：

```javascript
const routes = [
  {
    path: '/users',
    component: UsersLayout,
    children: [
      // 为这 3 个 URL 呈现 UserList
      // - /users
      // - /users/list
      // - /people
      { path: '', component: UserList, alias: ['/people', 'list'] },
    ],
  },
]
```

如果你的路由有参数，请确保在任何绝对别名中包含它们：

```javascript
const routes = [
  {
    path: '/users/:id',
    component: UsersByIdLayout,
    children: [
      // 为这 3 个 URL 呈现 UserDetails
      // - /users/24
      // - /users/24/profile
      // - /24
      { path: 'profile', component: UserDetails, alias: ['/:id', ''] },
    ],
  },
]
```

## 代理Proxy

Vue是基于Node.js和Webpack构建，所以vue.config.js与webpack的配置文件类似，都存在devServer配置项

### devServer

```javascript
// vue.config.js
const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
	transpileDependencies: true,
    
	devServer:{
		open:true,
		port:8989,
		host:"127.0.0.1",
        // 代理
		proxy:{
            // 对 `/hanser` 的请求会将请求代理到 `https://i.maoyan.com/hanser`
			"/hanser":{
				target:"https://i.maoyan.com"
                // 不保留主机头的来源，默认为保留
                changeOrigin:true,
                // 重写路径 把/hanser 替换为空
                pathRewrite: {
					"^/hanser":""
				}
            	// 证书验证
            	secure: false,
			}
		}
	}
})

```

如果想将多个请求代理到同一个，则可以使用一个或多个带有 `context` 属性的对象的数组：

```javascript
module.exports = {
  //...
  devServer: {
    proxy: [
      {
        context: ['/auth', '/api'],
        target: 'http://localhost:3000',
      },
    ],
  },
};
```



