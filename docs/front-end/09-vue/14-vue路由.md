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

// src=> main.js

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

// src=> App.vue

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
            <!-- 通过传入 `:to` 属性传入对象 -->
            <router-link :to="{path:'/foo'}">Go to Foo</router-link>
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
这使得 Vue Router 能够在不重新加载页面的情况下改变 URL，处理 URL 的生成、编码和其他功能。
`RouterView` 组件可以使 Vue Router 知道你想要在哪里渲染当前 URL 路径对应的路由组件。
```

```javascript
<router-link to="/foo">Go to Foo</router-link>
<!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
<a href=""></a>
```

### RouterLink组件

#### 实现跳转

方式1：值是一个字符串

```html
<nav>
    <router-link to="/">首页</router-link>|
    <router-link to="/newsList">新闻列表页</router-link>|
    <router-link to="/goodsList">商品列表页</router-link>|
    <router-link to="/my">个人中心</router-link>
</nav>
```

方式2：值是一个对象，通过path进行跳转

```html
<nav>
    <router-link :to="{path:'/'}">首页</router-link>|
    <router-link :to="{path:'/newsList'}">新闻列表页</router-link>|
    <router-link :to="{path:'/goodsList'}">商品列表页</router-link>|
    <router-link :to="{path:'/my'}">个人中心</router-link>
</nav>
```

方式3：值是一个对象，通过name进行跳转

```html
<nav>
    <router-link :to="{name:'index'}">首页</router-link>|
    <router-link :to="{name:'newsList'}">新闻列表页</router-link>|
    <router-link :to="{name:'goodsList'}">商品列表页</router-link>|
    <router-link :to="{name:'my'}">个人中心</router-link>
</nav>
```



#### 设置样式

给<router-link>标签设置`router-link-exact-active`，`exact`，`exact-active-class`属性后。

<router-view>在渲染后的<a>标签会被Vue自动设置上对应的Class类 ，`router-link-active`和`router-link-exact-active`两个class类，通过这些类进行样式设置。

**精确匹配和非精确匹配**

```javascript
精确匹配: 请求地址(https://xxx/hanser) 路由(path:'/hanser')
非精确匹配: 请求地址(https://xxx/hanser/yousa) 路由(path:'/hanser')
无匹配: 请求地址(https://xxx/hanseryousa) 路由(path:'/hanser')
非精确匹配包含了精确匹配
```

方式1：使用`router-link-exact-active`类匹配样式

```javascript
// 当请求地址与路由非精确匹配时，a标签会自动添加这个类 router-link-active
// 当请求地址与路由精确匹配,a标签会自动添加这个类 router-link-exact-active
// 非精确匹配包含精确匹配

// index.html
<a class="router-link-active router-link-exact-active"> </a>

```

```vue
// src=>App.vue
// 使用 router-link-exact-active 匹配样式
<stype>
	a.router-link-exact-active{
    	color:red
    }
</style>
```

方式2：设置`exact`属性，使用`router-link-active`类匹配样式

```javascript
exact属性特点：
在router-link标签上设置exact属性，只有当请求地址与路由精确匹配时，a标签才会有 router-link-active 这个类。
若不适用exact属性，那么地址精确匹配以及非精确匹配a标签都会有router-link-active。
```

```javascript
<nav>
    <!--为了规避 / 和 /newsList 后边几个路由，因为非精确匹配，同时都添加router-link-active这个类，造成样式都被匹配上。-->
    <!--解决办法：给 / 这个路由上单独设置 exact 属性-->
	<router-link exact to="/">首页</router-link>
	<router-link to="/newsList">新闻列表页</router-link>
	<router-link to="/goodsList">商品列表页</router-link>
	<router-link to="/my">个人中心</router-link>
</nav>
```

```vue
// src=>App.vue
<stype>
	a.router-link-active{
    	color:red
    }
</style>
```

方式3:  设置`active-class `属性和`exact`属性，使用自定义类匹配样式

```javascript
active-class属性特点：
无论请求地址与路由精确匹配或非精确匹配时，a标签都会有 active-class 属性设置的类。
同时在非精确匹配的<router-link>标签上设置 exact 属性，把非精确匹配的标签去掉自定义的类。
```

```html
<nav>
    <router-link exact active-class="active" to="/">首页</router-link> |
    <router-link active-class="active" to="/newslist">新闻列表</router-link> |
    <router-link active-class="active" to="/goodslist">商品列表</router-link> |
    <router-link active-class="active" to="/my">个人中心</router-link> |
</nav>
```

```vue
// src=>App.vue
<stype>
	a.active{
    	color:red
    }
</style>
```

方式4：设置 `exact-active-class`属性，使用自定义类匹配样式。

```javascript
exact-active-class属性特点：
只有精确匹配时，a标签才会使用exact-active-class属性设置的样式，相当于active-class与exact的结合。
```

```html
<nav>
    <router-link exact-active-class="active" to="/">首页</router-link> |
    <router-link exact-active-class="active" to="/newslist">新闻列表</router-link> |
    <router-link exact-active-class="active" to="/goodslist">商品列表</router-link> |
    <router-link exact-active-class="active" to="/my">个人中心</router-link> |
</nav>
```

```vue
// src=>App.vue
<stype>
	a.active{
    	color:red
    }
</style>
```

方式5：使用 vue-router配置项`linkActiveClass`和`exact`属性，使用自定义类匹配样式。

```javascript
linkActiveClass 配置项
在创建router实例时，设置router的配置项
```

```javascript
const router = new VueRouter({
    routes,
    mode:"",
    // 设置自定义类 等同于在标签router-link标签上设置active-class属性
    // <router-link active-class="active" to="/"></router-link> 
    linkActiveClass:"active"
})
```

```javascript
<nav>
    <router-link exact to="/">首页</router-link> |
    <router-link to="/newslist">新闻列表</router-link> |
    <router-link to="/goodslist">商品列表</router-link> |
    <router-link to="/my">个人中心</router-link> |
</nav>
```

```vue
// src=>App.vue
<stype>
	a.active{
    	color:red;
    }
</style>
```

方式6：使用 vue-router配置项 `linkExactActiveClass`，使用自定义类匹配样式。

```javascript
const router = new VueRouter({
    routes,
    mode:"",
    // 设置自定义类 等同于在标签router-link标签上设置active-class属性
    // <router-link exact-active-class="active" to="/"></router-link> 
    linkExactActiveClass:"active"
})
```

```javascript
<nav>
    <router-link to="/">首页</router-link> |
    <router-link to="/newslist">新闻列表</router-link> |
    <router-link to="/goodslist">商品列表</router-link> |
    <router-link to="/my">个人中心</router-link> |
</nav>
```

```vue
// src=>App.vue
<stype>
	a.active{
    	color:red;
    }
</style>
```

### RouterView 和 RouterLink

组件 `RouterView` 和 `RouterLink` 都是[全局注册](https://cn.vuejs.org/guide/components/registration.html#global-registration)的，因此它们不需要在组件模板中导入。但你也可以通过局部导入它们，例如 `import { RouterLink } from 'vue-router'`。

在模板中，组件的名字可以是 PascalCase 风格或 kebab-case 风格的。Vue 的模板编译器支持两种格式，因此 `<RouterView>` 和 `<router-view>` 通常是等效的。此时应该遵循你自己项目中使用的约定。

如果使用 DOM 内模板，那么需要[注意](https://cn.vuejs.org/guide/essentials/component-basics.html#in-dom-template-parsing-caveats)：组件名字必须使用 kebab-case 风格且不支持自闭合标签。因此你不能直接写 `<RouterView />`，而需要使用 `<router-view></router-view>`。

## 命名路由

当创建一个路由时，我们可以选择给路由一个 `name`：

src->main.js

```javascript
const routes = [
  {
    // 带参数
	path: '/user/:username',
    name: 'profile', 
    component: User
  }
]
```

可以使用 `name` 而不是 `path` 来传递 `to` 属性给 `<router-link>`：

src->App.vue

```vue
<template>
	<-- 传参数 -->
    <router-link :to="{ name: 'profile', params: { username: 'erina' } }">
    	User profile
    </router-link>
</template>
```

## 路由传递参数

### 通过query传递

`通过this.$route.query全局属性，父向子传递参数`

```javascript
// 注意：
仅查询字符串改变而路由未改变时，路由组件不会重新挂载（mounted）,而会调用(update)钩子函数。
如果要在修改查询字符串过程中调用函数，可以设置watch，监控this.$route.query属性
// 例如:
/one?id=1 切换至 /one?id=2
```

**方式1**：query的类型是字符串

src=>App.vue 父

```vue
<router-link to="/newslist?username='hanser'">新闻列表</router-link> |
<!-- 路由出口 -->
<router-view></router-view>
```

src->views->NewsList.vue 子

```vue
<template>
    <div>
        <h3>新闻列表界面</h3>
        <p>艺人名字:{{this.$route.query.username}},</p>
    </div>
</template>
```

**方式2**：query的类型是对象，路由跳转时会将对象自动转为查询字符串与path进行拼接

```javascript
JSON.parse(json):将 json 格式的字符串转为对象或数组
```

src=>App.vue 父

```vue
// 这里使用 v-bind:to 绑定path等属性

// 主组件(src->App.vue)在入口文件(src->main.js)中作为模版(template)被渲染。
// 路由器对象router (src->router->index.js)在入口文件(src->main.js)中导入，并挂载。

// 这里的属性绑定是在入口文件(src->main.js)导入的 router (src->router->index.js)中定义的path和vue-router的内置属性。

// 当使用path属性作为路由判断，age:12中的12会作为String类型进行传递
// 当使用name属性作为路由判断，age:12中的12会作为Number类型进行传递
<router-link :to="{
	path:'newslist',
	query:{
		username: 'hanser',
        age:12,
		friends:{
			username:'yousa',
            age:14,
		},
	},
}">新闻列表</router-link>
```

src->views->NewsList.vue 子

```vue
<template>
    <div>
        <h3>新闻列表界面</h3>
        <p>艺名: {{this.$route.query.username}}</p>
        <p>朋友: {{this.$route.query.friends.username}}</p>
    </div>
</template>
```

**方式3**：如果要在修改查询字符串过程中调用函数，使用watch或update钩子函数。

```vue
<script>
export default {
    updated(){
        console.log("updated",this.$route.query);
    },
    watch:{
        // 监听对象的一个属性,这里的this指向VueComponent的实例vc
        "this.$route.query":{
            handler(){
                console.log("watch",this.$route.query)
            },
            immediate:true
        }
    }
}
</script>
```



### 通过params传递

### 通过params和path传递

## 命名视图

有时候想同时 (同级) 展示多个视图，而不是嵌套展示，例如创建一个布局，有 `sidebar` (侧导航) 和 `main` (主内容) 两个视图，这个时候命名视图就派上用场了。

你可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 `router-view` 没有设置名字，那么默认为 `default`。

```vue
<router-view class="view left-sidebar" name="LeftSidebar" />
<router-view class="view main-content" />
<router-view class="view right-sidebar" name="RightSidebar" />
```

一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 `components` 配置 (带上 **s**)

```javascript
// 方式1 
const router = createRouter({
	history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            components: {
                default: Home,
                // LeftSidebar: LeftSidebar 的缩写
                LeftSidebar,
                // 它们与 `<router-view>` 上的 `name` 属性匹配
                RightSidebar,
            },
        },
    ],
})
```

```javascript
// 方式2 src=> main.js
const routes = [
    {
        path:"/fubuki",
        components:{
            // 定义默认组件
            default: Home,
            FubukiHeader,
            FubukiMain,
            FubukiFooter
        }
    }
]
```

## 定向和别名

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

## 路由跳转过程

一个路由的初始挂载过程 

Home路由的挂载

```javascript
1-Home->beforeCreate
2-Home->created
3-Home->beforeMount
4-Home->mounted
```

从Home路由跳转到newslist路由

```javascript
1-Home->beforeCreate
2-Home->created
3-Home->beforeMount
4-Home->mounted
5-NewsList->beforeCreate
6-NewsList->created
7-NewsList->beforeMount
8-Home->beforeDestroy
9-Home->destroyed
10-NewsList->mounted
```

点击路由跳转的瞬间，新路由经过beforeCreate->created->created->beforeMount，在挂载前，旧路由会卸载，然后新路由进行挂载。

## 组件API风格

Vue Router 可以使用组合式 API （函数返回）或选项式 API （this.）

## router 和 route

`在视图中的this可以省略不写`

```html
<h3>id:{{this.$router}}</h3>
<h3>id:{{this.$route}}</h3>
```

 `router`：路由器实例，即由 `createRouter()` 返回的对象。在应用中，访问该对象的方式取决于上下文。

```javascript
在组合式 API 中，它可以通过调用 `useRouter()` 来访问。
在选项式 API 中，它可以通过 `this.$router` 来访问。
```

`$route`：当前路由对象，可以在组件模板中使用 `$route` 来访问当前的路由对象。

```javascript
$route属性在 Vuecomponent的实例vc的原型Vue的实例vm的原型上，因为在入口文件main.js挂载到了vm上
```

```javascript
在组合式 API 中，它可以通过调用 `useRoute()` 来访问。
在选项式 API 中，它可以通过 `this.$route` 来访问。
```

**方法**

```javascript
this.$route.fullPath 完整路径
this.$route.query 获取查询字符串中的数据
```

### 
