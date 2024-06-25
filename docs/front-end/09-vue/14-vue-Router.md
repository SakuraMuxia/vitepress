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

给`<router-link>`标签设置`router-link-exact-active`，`exact`，`exact-active-class`属性后。

`<router-view>`在渲染后的`<a>`标签会被Vue自动设置上对应的Class类 ，`router-link-active`和`router-link-exact-active`两个class类，通过这些类进行样式设置。

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

### 通过params传递(动态)

方式1：父组件通过`name属性`和`params属性(对象)`传递参数，子组件通过`this.$route.params`接收参数。刷新页面数据会丢失

```vue
<!-- src->App.vue -->
<template>
	<div>
         <router-link :to="{
              name:'newslist',
              params:{
                 username:'hanser',
              }, 
         }">新闻列表</router-link>
    </div>
</template>
```

```vue
<!-- src->views->newslist.vue -->
<template>
    <div>
        <h3>新闻列表界面</h3>
        <p>艺名: {{$route.params.username}}</p>
        <!-- <p>艺名: {{this}}</p> -->
        <p>朋友: {{ $route.query.username}}</p>
    </div>
</template>
```

方式2：通过路由中的`path属性`设置形参，父组件设置`path属性`设置实参，子组件通过`this.$route.params`接收参数。刷新页面数据不会丢失

```javascript
src->route->index.js
const routes:[
    {
        path: '/newslist/:username',
        name:"newslist",
        component: NewsList,
    },
]
```

```vue
src->App.vue
<router-link to="/newslist/hanser">
```

```vue
src->views->newslist.vue
<script>
	consolo.log(this.$route.params.username)
</script>
```

方式3：通过路由中的`path属性`设置形参，父组件设置`name属性`匹配路由同时设置`params属性`设置实参，子组件通过`this.$route.params`接收参数。刷新页面数据不会丢失

```javascript
<!-- src->route->index.js -->

const routes:[
    {
        path: '/newslist/:username',
        name:"newslist",
        component: NewsList,
    },
]
```

```vue
<!-- src->App.vue -->

<router-link :to="{
	name:'newslist',
	params:{
		username:'yousa'
	}
}">新闻资讯</router-link>
```

```vue
<!-- src->views->newslist.vue -->

<p>艺名: {{$route.params.username}}</p>
```

### 响应路由参数的变化

提醒一下，当使用路由参数时，例如从 `/user/foo` 导航到 `/user/bar`，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会再被调用**。

复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) `$route` 对象

```javascript
const User = {
  template: '...',
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

或者使用 2.2 中引入的 `beforeRouteUpdate` 导航守卫

```javascript
const User = {
  template: '...',
  beforeRouteUpdate(to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```

### 捕获所有路由或 404 Not found 路由

常规参数只会匹配被 `/` 分隔的 URL 片段中的字符。如果想匹配**任意路径**，我们可以使用通配符 (`*`)

```javascript
{
  // 会匹配所有路径
  path: '*'
}
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
}
```

当使用通配符路由时，请确保路由的顺序是正确的，也就是说含有通配符的路由应该放在最后。路由 { path: '*' } 通常用于客户端 404 错误。如果你使用了History 模式，请确保正确配置你的服务器。

当使用一个通配符时，$route.params 内会自动添加一个名为 pathMatch 参数。它包含了 URL 通过通配符被匹配的部分：

```javascript
// 给出一个路由 { path: '/user-*' }
this.$router.push('/user-admin')
this.$route.params.pathMatch // 'admin'
// 给出一个路由 { path: '*' }
this.$router.push('/non-existing')
this.$route.params.pathMatch // '/non-existing'
```

### 高级匹配模式

vue-router 使用 path-to-regexp (opens new window)作为路径匹配引擎，所以支持很多高级的匹配模式，例如：可选的动态路径参数、匹配零个或多个、一个或多个，甚至是自定义正则匹配。查看它的文档 (opens new window)学习高阶的路径匹配，还有这个例子  (opens new window)展示 vue-router 怎么使用这类匹配

### 匹配优先级

有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：路由定义得越早，优先级就越高。

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

## 路由重定向和别名

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

### $route方法

```javascript
this.$route.fullPath 完整路径
this.$route.query 获取查询字符串中的数据
```

## 编程式导航

除了使用 `<router-link>` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例方法，通过编写代码来实现

```javascript
注意: 下面的示例中的 `router` 指代路由器实例。
在组件内部，你可以使用 `$router` 属性访问路由，例如 `this.$router.push(...)`。
如果使用组合式 API，你可以通过调用 `useRouter()`来访问路由器。
```

### $router方法

```javascript
router.push、router.replace 和 router.go 是 window.history.pushState、window.history.replaceState 和 window.history.go 的翻版，它们确实模仿了 window.history 的 API
```

```javascript
// 当你点击 `<router-link>` 时，内部会调用这个方法，所以点击 `<router-link :to="...">` 相当于调用 router.push(...);
// 这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，会回到之前的 URL;
// 该方法的参数可以是一个字符串路径，或者一个描述地址的对象;
router.push() 导航到不同的 URL,
    
// 它的作用类似于 router.push，唯一不同的是，它在导航时不会向 history 添加新记录，正如它的名字所暗示的那样——它取代了当前的条目 
// 等同于 <router-link :to="..." replace>
router.replace(...) 导航到不同的 URL,但不会向 history 添加新记录

// 类似于 window.history.go(n)
router.go(1) 该方法采用一个整数作为参数，表示在历史堆栈中前进或后退多少步


```

无论在创建路由器实例时传递什么 `history` 配置，Vue Router 的导航方法 (`push`、`replace`、`go`) 都能始终正常工作。

**示例1**：router.push()

```javascript
// 字符串
router.push('home')

// 对象
router.push({ path: 'home' })

// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

**注意**：如果提供了 `path`，`params` 会被忽略，上述例子中的 `query` 并不受影响

**取而代之的是下面例子的做法，你需要提供路由的 `name` 或手写完整的带有参数的 `path`：**

```javascript
const userId = '123'
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

同样的规则也适用于 `router-link` 组件的 `to` 属性；

`router.push` 和所有其他导航方法都会返回一个 Promise对象。

在 2.2.0+，可选的在 `router.push` 或 `router.replace` 中提供 `onComplete` 和 `onAbort` 回调作为第二个和第三个参数。这些回调将会在导航成功完成 (在所有的异步钩子被解析之后) 或终止 (导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由) 的时候进行相应的调用。在 3.1.0+，可以省略第二个和第三个参数，此时如果支持 Promise，`router.push` 或 `router.replace` 将返回一个 Promise。

**注意**： 如果目的地和当前路由相同，只有参数发生了改变 (比如从一个用户资料到另一个 `/users/1` -> `/users/2`)，你需要使用 [`beforeRouteUpdate`](https://v3.router.vuejs.org/zh/guide/essentials/dynamic-matching.html#响应路由参数的变化) 来响应这个变化 (比如抓取用户信息)。

**示例2**：router.replace()

```javascript
router.push({ path: '/home', replace: true })
// 相当于
router.replace({ path: '/home' })
```

**示例3**：router.go()

```javascript
// 向前移动一条记录，与 router.forward() 相同
router.go(1)

// 返回一条记录，与 router.back() 相同
router.go(-1)

// 前进 3 条记录
router.go(3)

// 如果没有那么多记录，静默失败
router.go(-100)
router.go(100)
```

Vue Router 的导航方法 (`push`、 `replace`、 `go`) 在各类路由模式 (`history`、 `hash` 和 `abstract`) 下表现一致

## 路由嵌套

一些应用程序的 UI 由多层嵌套的组件组成。在这种情况下，URL 的片段通常对应于特定的嵌套组件结构。

通过 Vue Router，你可以使用嵌套路由配置来表达这种关系。

**示例1**：原始界面，vue官方示例。

```vue
<!-- App.vue -->
<template>
  <router-view />
</template>
```

```vue
<!-- User.vue -->
<template>
  <div>
    User {{ $route.params.id }}
  </div>
</template>
```

```js
import User from './User.vue'

// 这些都会传递给 `createRouter`
const routes = [{ path: '/user/:id', component: User }]
```

这里的 `<router-view>` 是一个顶层的 `router-view`。它渲染顶层路由匹配的组件。同样地，一个被渲染的组件也可以包含自己嵌套的 `<router-view>`。例如，如果我们在 `User` 组件的模板内添加一个 `<router-view>`。

```vue
<!-- User.vue -->
<template>
  <div class="user">
    <h2>User {{ $route.params.id }}</h2>
    <router-view />
  </div>
</template>
```

要将组件渲染到这个嵌套的 `router-view` 中，我们需要在路由中配置 `children`

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'profile',
        component: UserProfile,
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        // 二级路由path可以省略一级路由地址部分
        path: 'posts',
        component: UserPosts,
      }, 
    ],
  },
]
```

**注意，以 `/` 开头的嵌套路径将被视为根路径。**

此时，基于上面的配置，当你访问 `/user/foo` 时，`User` 的出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个 空的 子路由：

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      // 当 /user/:id 匹配成功
      // UserHome 将被渲染到 User 的 <router-view> 内部
      { path: '', component: UserHome },

      // ...其他子路由
    ],
  },
]
```

### 命名路由

给子路由命名

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    // 请注意，只有子路由具有名称
    children: [{ path: '', name: 'user', component: UserHome }],
  },
]
```

这将确保导航到 `/user/:id` 时始终显示嵌套路由

在一些场景中，你可能希望导航到命名路由而不导航到嵌套路由，例如，你想导航 `/user/:id` 而不显示嵌套路由。那样的话，你还可以**命名父路由**，但请注意**重新加载页面将始终显示嵌套的子路由**，因为它被视为指向路径`/users/:id` 的导航，而不是命名路由：

```javascript
const routes = [
  {
    path: '/user/:id',
    name: 'user-parent',
    component: User,
    children: [{ path: '', name: 'user', component: UserHome }],
  },
]
```

### 默认显示二级导航

**示例1**：将二级路由地址与上一级地址设置为相同地址。

```javascript
{
        path:'/newslist',
        name:'newslist',
        component:NewsList,
        children:[
            {	
                // 将二级路由地址与上一级地址设置为相同地址。
                path:'/newslist/',
                name:'games',
                component: games
            },
            {
                path: '/newslist/sports',
                name: 'sports',
                component: sports
            },
            {
                path: '/newslist/criminality',
                name: 'criminality',
                component: criminality
            },
        ],
    }
```

**示例2**：设置重定向。

```javascript
{
        path:'/newslist',
        name:'newslist',
        component:NewsList,
        children:[
            {
                // 重定向到 运动页面
                path:'/newslist',
                redirect:'/newslist/sports'
            },
            {
                path:'games',
                name:'games',
                component: games
            },
            {
                path: 'sports',
                name: 'sports',
                component: sports
            },
            {
                path: 'criminality',
                name: 'criminality',
                component: criminality
            },
        ],
    }
```



### 隐藏导航栏

**示例1**：原理：通过设置`路由出口`和路由的`父子关系`，把`不需要导航栏`的视图放在`没有导航栏的页面`渲染

```vue
// src -> App.vue

<router-link active-class="active" to="/nowplaying">正在热映</router-link>    
<!-- 匹配到 /nowplaying(NowPlaying.vue中的<router-link>标签中的内容)将渲染在这里 -->
<router-view></router-view>
```

```javascript
const routes = [
    // 没有设置children属性，默认将在 App.vue(主组件)中的 <router-view></router-view> 渲染
    {
        path:'/film/:filmId',
        name:'film',
        component:Details,
	}
    
    path: '/',
        component: Home,
    	// 设置了children属性，将在父组件(Home)的 <router-view></router-view> 渲染
        children:[
            // 默认选中热映
            {
                path: '/',
                redirect:'/nowplaying',
            },
            {
                path: 'nowplaying',
                name: 'nowplaying',
                component: NowPlaying,
            },
            {
                path: 'comingsoon',
                name: 'comingsoon',
                component: ComingSoon,
            },
        ]
]

```

## HTML5 History模式

`vue-router` 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

如果不想要很丑的 hash，我们可以用路由的 **history 模式**，这种模式充分利用 `history.pushState` API 来完成 URL 跳转而无须重新加载页面。

```js
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```

当你使用 history 模式时，URL 就像正常的 url，例如 `http://yoursite.com/user/id`，也好看！

不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 `http://oursite.com/user/id` 就会返回 404，这就不好看了。

所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 `index.html` 页面，这个页面就是你 app 依赖的页面。

## 后端配置例子

**注意**：下列示例假设你在根目录服务这个应用。如果想部署到一个子目录，你需要使用 [Vue CLI 的 `publicPath` 选项 (opens new window)](https://cli.vuejs.org/zh/config/#publicpath)和相关的 [router `base` property (opens new window)](https://router.vuejs.org/zh/api/#base)。你还需要把下列示例中的根目录调整成为子目录 (例如用 `RewriteBase /name-of-your-subfolder/` 替换掉 `RewriteBase /`)。

### Apache

```text
<IfModule mod_negotiation.c>
  Options -MultiViews
</IfModule>
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

除了 `mod_rewrite`，你也可以使用 [`FallbackResource` (opens new window)](https://httpd.apache.org/docs/2.2/mod/mod_dir.html#fallbackresource)。

### nginx

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### 原生 Node.js

```js
const http = require('http')
const fs = require('fs')
const httpPort = 80

http.createServer((req, res) => {
  fs.readFile('index.html', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.html" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})
```

### 基于 Node.js 的 Express

对于 Node.js/Express，请考虑使用 [connect-history-api-fallback 中间件 (opens new window)](https://github.com/bripkens/connect-history-api-fallback)。

### Internet Information Services (IIS)

1. 安装 [IIS UrlRewrite(opens new window)](https://www.iis.net/downloads/microsoft/url-rewrite)
2. 在你的网站根目录中创建一个 `web.config` 文件，内容如下：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="Handle History Mode and custom 404/500" stopProcessing="true">
          <match url="(.*)" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

### Caddy

```text
rewrite {
    regexp .*
    to {path} /
}
```

### Firebase 主机

在你的 `firebase.json` 中加入：

```json
{
  "hosting": {
    "public": "dist",
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  }
}
```

### 警告

给个警告，因为这么做以后，你的服务器就不再返回 404 错误页面，因为对于所有路径都会返回 `index.html` 文件。为了避免这种情况，你应该在 Vue 应用里面覆盖所有的路由情况，然后再给出一个 404 页面。

```js
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*', component: NotFoundComponent }
  ]
})
```

或者，如果你使用 Node.js 服务器，你可以用服务端路由匹配到来的 URL，并在没有匹配到路由的时候返回 404，以实现回退。
