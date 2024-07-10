本文链接：https://v3.router.vuejs.org/zh/guide/

# 路由对象

一个路由对象 (route object) 表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的路由记录 (route records)。

路由对象是不可变 (immutable) 的，每次成功的导航后都会产生一个新的对象。

## 使用路由对象

```javascript
路由对象出现在多个地方:
1 在组件内，即 this.$route
2 在 $route 观察者回调内
3 router.match(location) 的返回值
4 导航守卫的参数：
    router.beforeEach((to, from, next) => {
      // `to` 和 `from` 都是路由对象
    })
5 scrollBehavior 方法的参数:
    const router = new VueRouter({
      scrollBehavior(to, from, savedPosition) {
        // `to` 和 `from` 都是路由对象
      }
    })
```

## 路由对象属性

```javascript
$route.path 
// 类型:string 
// 字符串，对应当前路由的路径，总是解析为绝对路径，如 "/foo/bar"
$route.params
// 类型: Object 
// 一个 key/value 对象，包含了动态片段和全匹配片段，如果没有路由参数，就是一个空对象。
$route.query
// 类型: Object 
// 一个 key/value 对象，表示 URL 查询参数。例如，对于路径 /foo?user=1，则有 $route.query.user == 1，如果没有查询参数，则是个空对象。
$route.hash
// 类型: string
// 当前路由的 hash 值 (带 #) ，如果没有 hash 值，则为空字符串。
$route.fullPath
// 类型: string
// 完成解析后的 URL，包含查询参数和 hash 的完整路径。
$route.matched
// 类型: Array<RouteRecord>
// 一个数组，包含当前路由的所有嵌套路径片段的路由记录 。路由记录就是 routes 配置数组中的对象副本 (还有在 children 数组)。
```

```javascript
const router = new VueRouter({
  routes: [
    // 下面的对象就是路由记录
    {
      path: '/foo',
      component: Foo,
      children: [
        // 这也是个路由记录
        { path: 'bar', component: Bar }
      ]
    }
  ]
})
// 当 URL 为 /foo/bar，$route.matched 将会是一个包含从上到下的所有对象 (副本)。
```

```javascript
$route.name
// 当前路由的名称，如果有的话。
$route.redirectedFrom
// 如果存在重定向，即为重定向来源的路由的名字。
```

## 组件注入

通过在 Vue 根实例的 router 配置传入 router 实例，下面这些属性成员会被注入到每个子组件

```javascript
this.$router
// router 实例
this.$route
// 当前激活的路由信息对象。这个属性是只读的，里面的属性是 immutable (不可变) 的，不过你可以 watch (监测变化) 它
```

# 导航守卫

> “导航”表示路由正在发生改变。vue-router 提供的导航守卫主要用来通过跳转或取消的方式守卫导航

正如其名，`vue-router` 提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的, 或者组件级的。

记住**参数或查询的改变并不会触发进入/离开的导航守卫**。你可以通过观察 `$route` 对象来应对这些变化，或使用 `beforeRouteUpdate` 的组件内守卫。

## 全局前置守卫

### beforeEach

所有路由进入之前执行的钩子函数。此时还没有创建实例。

你可以使用 `router.beforeEach` 注册一个全局前置守卫：

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 **等待中**。

每个守卫方法接收三个参数：

```javascript
to:(类型:Route): 即将要进入的目标
from:(类型:Route): 当前导航正要离开的路由
next:(类型:Function): 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
```

```javascript
// next方法 ：作用：当前的导航被中断，然后进行一个新的导航。

1 next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
2 next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
3 next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。
4 你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
5 next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
```

**确保 `next` 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错**

```js
// BAD 错误用法
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // 如果用户未能验证身份，则 `next` 会被调用两次
  next()
})

// GOOD 正确用法
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```

```javascript
router.beforeEach(function (to, from, next) {
    console.log("beforeEach");
    console.log("to", to);  //即将要进入的路由
    console.log("from", from); //当前导航正要离开的路由
    console.log("next", next);  //函数
    console.log("this", this);  //undefined
    next(); //放行
    // next(),不支持回调函数
})
```



## 全局解析守卫

### beforeResolve

你可以用 `router.beforeResolve `注册一个全局守卫。这和` router.beforeEach `类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。

**执行时机**

```javascript
// 进入一个新路由'/my'时
路由钩子顺序：
全局：
	1-beforeEach
'/my'路由独享：
	2-beforeEnter
'/my'组件内：
	3-beforeRouteEnter
全局：
	4-beforeResolve
'/my'组件内挂载：
	5-beforeCreate
	6-created
	7-BeforeMonted
	8-mounted
```

```javascript
// 在组件内路由跳转时，
路由钩子顺序：
全局：
	1-beforeEach
'/my'组件内：
	2-beforeRouteUpdate
全局：
	3-beforeResolve
```

```javascript
// 离开一个路由'/my'时：
路由钩子顺序：
'/my'组件内：
	1-beforeRouteLeave
全局：
	2-beforeEach
全局：
	3-beforeResolve
```

```javascript
router.beforeResolve(function(to,from,next){
	console.log("beforeResolve")
	next();
})
```

## 全局后置钩子

### afterEach

你也可以注册全局后置钩子`router.afterEach`，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身：

```js
router.afterEach((to, from) => {
  // ...
})
// 用于设置网页标题
router.afterEach(function(to,from,next){
	// console.log("afterEach",next);// undefined
	// console.log("afterEach->from",from); // 来自的路由
	// console.log("afterEach->to",to);	//去往的路由
	// console.log(to.meta.title)	// 去往的路由的meta的title属性
	console.log("afterEach");
	const {title = "vue"} = to.meta;
	document.title = title;
})
```

**执行时机**

```javascript
// 进入一个新路由'/my'时
路由钩子顺序：
全局：
	1-beforeEach
'/my'路由独享：
	2-beforeEnter
'/my'组件内：
	3-beforeRouteEnter
全局：
	4-beforeResolve
	5-afterEach
'/my'组件内挂载：
	6-beforeCreate
	7-created
	8-BeforeMonted
	9-mounted
```

```javascript
// 在组件内路由跳转时Update，
路由钩子顺序：
全局：
	1-beforeEach
'/my'组件内：
	2-beforeRouteUpdate
全局：
	3-beforeResolve
	4-afterEach
```

```javascript
// 离开一个路由'/my'时：
路由钩子顺序：
'/my'组件内：
	1-beforeRouteLeave
全局：
	2-beforeEach
全局：
	3-beforeResolve
	4-afterEach
```

```javascript
router.beforeResolve(function(to,from,next){
	console.log("beforeResolve")
	next();
})
```

## 路由独享的守卫

### beforeEnter

在组件路由守卫`beforeRouteEnter`之前执行

你可以在路由配置上直接定义 `beforeEnter` 守卫：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        	console.log("beforeEnter", this);//undefined
          	console.log("beforeEnter->to", to);//去哪个路由
          	console.log("beforeEnter->from", from);// 来自哪个路由
          	next();//放行
          // next()不支持接收回调函数
      }
    }
  ]
})
```

这些守卫与全局前置守卫的方法参数是一样的。

## 组件内的守卫

最后，你可以在路由组件内直接定义以下路由导航守卫：

### beforeRouteEnter

在进入路由之前可以进行调用拦截

```js

const Foo = {
  template: `...`,
    // 在进入路由之前可以进行拦截。在组件的1-beforeCreate之前执行
    // next:是一个函数。作用：决定是否允许进入到路由to，放行。
    beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`，注意不是回调函数中的this，回调函数是在beforMount与mounted之间执行
    // 因为当守卫执行前，组件实例还没被创建
},
```

`beforeRouteEnter` 守卫 **不能** 访问 `this`，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。

不过，你可以通过传一个`回调函数`给 `next`来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

```js
// 当回调函数是箭头函数,回调函数会在组件的beforMount与mounted之间执行
beforeRouteEnter (to, from, next) {
  next(vc => {
    // 通过 `vc` 访问组件实例，这时vc.$route === to
  })
}

// 当回调函数是普通函数时,回调函数会在组件的beforMount与mounted之间执行
beforeRouteEnter (to, from, next) {
  next(function(){
      // 
      this // 这里的this指向自己这个回调函数
  })
}
```

注意 `beforeRouteEnter` 是支持给 `next` 传递回调的唯一守卫。

### beforeRouteUpdate

在当前路由改变，但是该组件被复用时调用并拦截

```javascript
from：当前的路由对象
to：去哪里的路由对象
这里的this.$route === from

beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    console.log(this.$route === from) // true 
},
```

对于 `beforeRouteUpdate` 和 `beforeRouteLeave` 来说，`this` 已经可用了，所以**不支持**传递回调，因为没有必要了。

```js
beforeRouteUpdate (to, from, next) {
  // just use `this`
  this.name = to.params.name
  next()
}
```

### beforeRouteLeave

导航离开该组件的对应路由时调用并拦截

```javascript
from：当前的路由对象
to：去哪里的路由对象
this.$route:当前的路由对象

beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
	}
}
```

这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 `next(false)` 来取消。

```js
beforeRouteLeave (to, from , next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```

## 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫 
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数。

# 路由元信息

定义路由的时候可以配置 `meta` 字段：

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```

那么如何访问这个 `meta` 字段呢？

首先，我们称呼 `routes` 配置中的每个路由对象为 **路由记录**。路由记录可以是嵌套的，因此，当一个路由匹配成功后，他可能匹配多个路由记录。

例如，根据上面的路由配置，`/foo/bar` 这个 URL 将会匹配父路由记录以及子路由记录。

一个路由匹配到的所有路由记录会暴露为 `$route` 对象 (还有在导航守卫中的路由对象) 的 `$route.matched` 数组。因此，我们需要遍历 `$route.matched` 来检查路由记录中的 `meta` 字段。

下面例子展示在全局导航守卫中检查元字段：

```js
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```

## Meta字段

在 Vue Router 的上下文中，meta 字段是您为路由定义的自定义字段，它可以用来存储路由相关的一些额外信息。您可以把它理解为附加在路由上的标签或属性，这些标签或属性对应的信息可以在路由守卫、组件等地方被访问和利用。

```javascript
标记某个路由需要用户认证。
为某个路由设置特定的页面标题。
标记某个路由是否需要加载特定的数据。
```

定义路由时，添加meta字段

```javascript
在定义路由的时候，给特定路由添加 meta 字段：

 const routes = [
   {
     path: '/dashboard',
     component: DashboardComponent,
     meta: { requiresAuth: true, title: 'User Dashboard' }
   }
 ]

 
 	{
        path:'/film/:filmId',
        name:'film',
        component:Details,
        meta:{
            isHide:true,
        }
    }
```

```javascript
在路由守卫或组件内访问这些 meta 字段：
router.beforeEach((to, from, next) => {
   // 使用 to.meta 来访问目标路由的 meta 字段
   if (to.meta.requiresAuth && !isUserLoggedIn()) {
     next('/login');
   } else {
     next();
   }
 });
```



**示例2**：隐藏导航栏：隐藏导航标签，在需要隐藏路由上设置meta信息。然后通过样式控制，隐藏导航

```javascript
// 	// 隐藏导航标签，在需要隐藏路由上设置meta信息。然后通过样式控制，隐藏导航
// src->router->index.js
...
{
    path:'/film/:filmId',
    name:'film',
    component:Details,
    meta:{
        isHide:true,
    }
}
```

```vue
<!-- src->App.vue -->
<template>
    <div id="app">
        <nav v-show="!$route.meta.isHide">
            <router-link active-class="active" to="/nowplaying">正在热映</router-link> |
            <router-link active-class="active" to="/comingsoon">即将上映</router-link>
        </nav>
        <router-view></router-view>
    </div>
</template>
```

# 过渡动效

`<router-view>` 是基本的动态组件，所以我们可以用 `<transition>` 组件给它添加一些过渡效果：

```vue
<transition>
  <router-view></router-view>
</transition>
```

[Transition 的所有功能](https://cn.vuejs.org/guide/transitions.html) 在这里同样适用。

## 单个路由的过渡

上面的用法会给所有路由设置一样的过渡效果，如果你想让每个路由组件有各自的过渡效果，可以在各路由组件内使用 `<transition>` 并设置不同的 name。

```js
const Foo = {
  template: `
    <transition name="slide">
      <div class="foo">...</div>
    </transition>
  `
}

const Bar = {
  template: `
    <transition name="fade">
      <div class="bar">...</div>
    </transition>
  `
}
```

## 基于路由的动态过渡

还可以基于当前路由与目标路由的变化关系，动态设置过渡效果：

```html
<!-- 使用动态的 transition name -->
<transition :name="transitionName">
  <router-view></router-view>
</transition>
```

```vue
<!-- 使用动态的 transition name -->
<transition :name="transitionName">
  <router-view></router-view>
</transition>
// 接着在父组件内
// watch $route 决定使用哪种过渡
watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}
```

## 数据获取

有时候，进入某个路由后，需要从服务器获取数据。例如，在渲染用户信息时，你需要从服务器获取用户的数据。我们可以通过两种方式来实现：

- **导航完成之后获取**：先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示“加载中”之类的指示。
- **导航完成之前获取**：导航完成前，在路由进入的守卫中获取数据，在数据获取成功后执行导航。

从技术角度讲，两种方式都不错 —— 就看你想要的用户体验是哪种。

### 导航完成后获取数据

当你使用这种方式时，我们会马上导航和渲染组件，然后在组件的 `created` 钩子中获取数据。这让我们有机会在数据获取期间展示一个 loading 状态，还可以在不同视图间展示不同的 loading 状态。

假设我们有一个 `Post` 组件，需要基于 `$route.params.id` 获取文章数据：

```vue
<template>
  <div class="post">
    <div class="loading" v-if="loading">
      Loading...
    </div>

    <div v-if="error" class="error">
      {{ error }}
    </div>

    <div v-if="post" class="content">
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

```

```javascript
export default {
  data () {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      // replace getPost with your data fetching util / API wrapper
      getPost(this.$route.params.id, (err, post) => {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.post = post
        }
      })
    }
  }
}
```

### 在导航完成前获取数据

通过这种方式，我们在导航转入新的路由前获取数据。我们可以在接下来的组件的 `beforeRouteEnter`守卫中获取数据，当数据获取成功后只调用 `next` 方法。

```js
export default {
  data () {
    return {
      post: null,
      error: null
    }
  },
  beforeRouteEnter (to, from, next) {
    getPost(to.params.id, (err, post) => {
      next(vm => vm.setData(err, post))
    })
  },
  // 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  beforeRouteUpdate (to, from, next) {
    this.post = null
    getPost(to.params.id, (err, post) => {
      this.setData(err, post)
      next()
    })
  },
  methods: {
    setData (err, post) {
      if (err) {
        this.error = err.toString()
      } else {
        this.post = post
      }
    }
  }
}
```

在为后面的视图获取数据时，用户会停留在当前的界面，因此建议在数据获取期间，显示一些进度条或者别的指示。如果数据获取失败，同样有必要展示一些全局的错误提醒。

## 滚动行为

### 滚动行为

使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。 `vue-router` 能做到，而且更好，它让你可以自定义路由切换时页面如何滚动。

**注意: 这个功能只在支持 history.pushState 的浏览器中可用。**

当创建一个 Router 实例，你可以提供一个 `scrollBehavior` 方法：

```js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})
```

`scrollBehavior` 方法接收 `to` 和 `from` 路由对象。第三个参数 `savedPosition` 当且仅当 `popstate` 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。

这个方法返回滚动位置的对象信息，长这样：

- `{ x: number, y: number }`
- `{ selector: string, offset? : { x: number, y: number }}` (offset 只在 2.6.0+ 支持)

如果返回一个 falsy (译者注：falsy 不是 `false`，[参考这里](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy))的值，或者是一个空对象，那么不会发生滚动。

举例：

```js
scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```

对于所有路由导航，简单地让页面滚动到顶部。

返回 `savedPosition`，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样：

```js
scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
```

如果你要模拟“滚动到锚点”的行为：

```js
scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }
}
```

### 异步滚动

> 2.8.0 新增

你也可以返回一个 Promise 来得出预期的位置描述：

```javascript
scrollBehavior (to, from, savedPosition) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ x: 0, y: 0 })
    }, 500)
  })
}
```

将其挂载到从页面级别的过渡组件的事件上，令其滚动行为和页面过渡一起良好运行是可能的。但是考虑到用例的多样性和复杂性，我们仅提供这个原始的接口，以支持不同用户场景的具体实现。

### 平滑滚动

只需将 `behavior` 选项添加到 `scrollBehavior` 内部返回的对象中，就可以为[支持它的浏览器 (opens new window)](https://developer.mozilla.org/en-US/docs/Web/API/ScrollToOptions/behavior)启用原生平滑滚动：

```js
scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash,
      behavior: 'smooth',
    }
  }
}
```

# 路由懒加载

## 懒加载

当打包构建应用时，Javascript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。

结合 Vue 的[异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#异步组件)和 Webpack 的[代码分割功能](https://doc.webpack-china.org/guides/code-splitting-async/#require-ensure-/)，轻松实现路由组件的懒加载。

首先，可以将异步组件定义为返回一个 Promise 的工厂函数 (该函数返回的 Promise 应该 resolve 组件本身)：

```js
const Foo = () =>
  Promise.resolve({
    /* 组件定义对象 */
  })
```

第二，在 Webpack 2 中，我们可以使用[动态 import](https://github.com/tc39/proposal-dynamic-import)语法来定义代码分块点 (split point)：

```js
import('./Foo.vue') // 返回 Promise
```

> 注意
>
> 如果您使用的是 Babel，你将需要添加 [`syntax-dynamic-import`](https://babeljs.io/docs/plugins/syntax-dynamic-import/) 插件，才能使 Babel 可以正确地解析语法。
>

结合这两者，这就是如何定义一个能够被 Webpack 自动代码分割的异步组件。

```js
const Foo = () => import('./Foo.vue')
引入函数的形式来引入组件。
```

在路由配置中什么都不需要改变，只需要像往常一样使用 `Foo`：

```js
const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
})
```

## 把组件按组分块

有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用 [命名 chunk](https://webpack.js.org/guides/code-splitting-require/#chunkname)，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。

```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```

Webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中。

# 导航故障

导航故障，或者叫导航失败，表示一次失败的导航，原文叫 navigation failures，本文统一采用导航故障。

当使用 `router-link` 组件时，Vue Router 会自动调用 `router.push` 来触发一次导航。 虽然大多数链接的预期行为是将用户导航到一个新页面，但也有少数情况下用户将留在同一页面上：

- 用户已经位于他们正在尝试导航到的页面
- 一个[导航守卫](https://v3.router.vuejs.org/zh/guide/advanced/navigation-guards.html)通过调用 `next(false)` 中断了这次导航
- 一个[导航守卫](https://v3.router.vuejs.org/zh/guide/advanced/navigation-guards.html)抛出了一个错误，或者调用了 `next(new Error())`

当使用 `router-link` 组件时，**这些失败都不会打印出错误**。然而，如果你使用 `router.push` 或者 `router.replace` 的话，可能会在控制台看到一条 *"Uncaught (in promise) Error"* 这样的错误，后面跟着一条更具体的消息。让我们来了解一下如何区分*导航故障*。

> 背景故事
>
> 在 v3.2.0 中，可以通过使用 `router.push` 的两个可选的回调函数：`onComplete` 和 `onAbort` 来暴露*导航故障*。从版本 3.1.0 开始，`router.push` 和 `router.replace` 在没有提供 `onComplete`/`onAbort` 回调的情况下会返回一个 *Promise*。这个 *Promise* 的 resolve 和 reject 将分别用来代替 `onComplete` 和 `onAbort` 的调用。

## 检测导航故障

*导航故障*是一个 `Error` 实例，附带了一些额外的属性。要检查一个错误是否来自于路由器，可以使用 `isNavigationFailure` 函数：

```js
import VueRouter from 'vue-router'
const { isNavigationFailure, NavigationFailureType } = VueRouter

// 正在尝试访问 admin 页面
router.push('/admin').catch(failure => {
  if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
    // 向用户显示一个小通知
    showToast('Login in order to access the admin panel')
  }
})
```

> 提示
>
> 如果你忽略第二个参数：`isNavigationFailure(failure)`，那么就只会检查这个错误是不是一个导航故障。

## NavigationFailureType

`NavigationFailureType` 可以帮助开发者来区分不同类型的*导航故障*。有四种不同的类型：

- `redirected`：在导航守卫中调用了 `next(newLocation)` 重定向到了其他地方。
- `aborted`：在导航守卫中调用了 `next(false)` 中断了本次导航。
- `cancelled`：在当前导航还没有完成之前又有了一个新的导航。比如，在等待导航守卫的过程中又调用了 `router.push`。
- `duplicated`：导航被阻止，因为我们已经在目标位置了。

## 导航故障的属性

所有的导航故障都会有 `to` 和 `from` 属性，分别用来表达这次失败的导航的目标位置和当前位置。

```js
// 正在尝试访问 admin 页面
router.push('/admin').catch(failure => {
  if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
    failure.to.path // '/admin'
    failure.from.path // '/'
  }
})
```

在所有情况下，`to` 和 `from` 都是规范化的路由位置。

# RouterView插槽

RotuerView 组件暴露了一个插槽，可以用来渲染路由组件：

```javascript
<router-view v-slot="{ Component }">
  <component :is="Component" />
</router-view>
```

上面的代码等价于不带插槽的 `<router-view />`，但是当我们想要获得其他功能时，插槽提供了额外的扩展性。

## KeepAlive & Transition

当在处理 [KeepAlive](https://vuejs.org/guide/built-ins/keep-alive.html) 组件时，我们通常想要保持路由组件活跃，而不是 RouterView 本身。为了实现这个目的，我们可以将 KeepAlive 组件放置在插槽内：

```html
<router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
```

类似地，插槽允许我们使用一个 [Transition](https://vuejs.org/guide/built-ins/transition.html) 组件来实现在路由组件之间切换时实现过渡效果：

```html
<router-view v-slot="{ Component }">
  <transition>
    <component :is="Component" />
  </transition>
</router-view>
```

我们也可以在 Transition 组件内使用 KeepAlive 组件：

```html
<router-view v-slot="{ Component }">
  <transition>
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </transition>
</router-view>

// 缓存一个或多个页面
<keep-alive include="ComponentA,ComponentB">
    <router-view></router-view>
</keep-alive>
// 排除缓存一个或多个页面
<keep-alive include="ComponentA,ComponentB">
    <router-view></router-view>
</keep-alive>
// 缓存一个或多个页面
<keep-alive include="ComponentA,ComponentB">
    <router-view v-if="isKeep"></router-view>
</keep-alive>
```

关于更多 RouterView 组件和 Transition 组件之间的互动，请参考 [Transitions](https://router.vuejs.org/zh/guide/advanced/transitions.html) 指南。

## 传递 props 和插槽

我们可以利用其插槽给路由组件传递 props 或插槽：

```html
<router-view v-slot="{ Component }">
  <component :is="Component" some-prop="a value">
    <p>Some slotted content</p>
  </component>
</router-view>
```

实践中通常不会这么做，因为这样会导致所有路由组件**都使用相同的 props 和插槽**。请查阅[传递 props 给路由组件](https://router.vuejs.org/zh/guide/essentials/passing-props.html)获取其他传递 props 的方式。

## 模板引用

使用插槽可以让我们直接将[模板引用](https://vuejs.org/guide/essentials/template-refs.html)放置在路由组件上：

template

```html
<router-view v-slot="{ Component }">
  <component :is="Component" ref="mainContent" />
</router-view>
```

而如果我们将引用放在 `<router-view>` 上，那引用将会被 RouterView 的实例填充，而不是路由组件本身。
