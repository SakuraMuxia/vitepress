# vue介绍 

## 官网

* 英文官网：http://vuejs.org
* 中文官网：https://cn.vuejs.org
* `Vue2`中文官网：https://v2.cn.vuejs.org



* 响应式：视图是通过数据进行驱动的（当数据发生改变，视图会根据所使用的数据的变化而变化）响应式即是视图会响应最新的数据。

## Vue介绍

> * `Vue (读音 /vjuː/，类似于 view)` 是一套用于构建用户界面的**渐进式框架**。
> * 作者: 尤雨溪

##  Vue的特点

> * 遵循`MVVM`模式
>
> * 编码简洁, 体积小, 运行效率高, 适合移动/PC端开发
>
> * 它本身只关注界面, 也可以配合其它第三方库开发项目

## Vue周边库

> * ` vue-cli（vue脚手架）`
>
> * `axios`
>
> * `vue-router`（路由）
>
> * `vuex`（状态管理）
>
> * `element-ui`（`UI`组件库）
>
>   ……

##  Vue 环境的配置

* 直接引入

  ```shell
  # 下载地址
  https://v2.cn.vuejs.org/v2/guide/installation.html
  ```

  

* `CDN` 引入

  ```html
  <!-- 开发环境版本，包含完整的警告和调试模式 -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
  <!-- 生产环境版本，删除了警告 -->
  <script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
  ```

* `NPM` 安装

  ```shell
  # 最新稳定版
  $ npm install vue
  ```

# Vue的基本用法

> `Vue.js` 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层` Vue` 实例的数据。所有 `Vue.js` 的模板都是合法的 HTML，所以能被遵循规范的浏览器和 HTML 解析器解析。
>
> 在底层的实现上，`Vue` 将模板编译成虚拟 DOM 渲染函数。结合响应系统，`Vue` 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。



## 导入Vue模块

```javascript
<!--1- 引入核心模块，提供了构造函数Vue	-->
<script src="lib/vue.js"></script>

<!-- 第二种写法 -->
<script type="module">
  import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
</script>
```

## 创建实例

- 每个 Vue 应用都是通过用 Vue 函数创建一个新的 Vue 实例开始的
- 一个 Vue 应用由一个通过 new Vue 创建的根 Vue 实例，以及可选的嵌套的、可复用的组件树组成。

```html
<body>
	<div id="app">{{}}</div>
</body>
```

```javascript
var app = new Vue({
    //绑定标签元素
	el: '#app',
    // 定义属性名
	data: {
		message: 'Hello Vue!'
	},
	// 定义方法
	methods:{
		fn(){...}
 	}
})
```

```javascript
1 app即是Vue实例。
2 Vue构造函数接收一个配置对象。
3 配置对象中可以设置data属性（类型是一个对象）
4 data对象的属性会作为app的实例属性。
5 建议将方法放置到methods属性中（类型也是一个对象）
```

## 数据和方法

## 术语

```javascript
实例或组件中的 data,methods,template,components,computer 这类属性名 称为 property

实例或组件中的 data中的数据,methods中的方法名,template,components中的组件名,computer方法名 这类属性名 称为 attribute
```



### 数据data

```javascript
当一个 Vue 实例被创建时，它向 Vue 的响应式系统中加入了其 data 对象中能找到的所有的属性。当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。
只有当实例被创建时 data 中存在的属性才是响应式的
如果你知道你会在晚些时候需要一个属性，但是一开始它为空或不存在，那么你仅需要设置一些初始值
```

```javascript
关于data的特点：
1- data中的属性会作为Vue实例中的属性
2- data的属性值发生改变，那么Vue实例中对应的属性值也会发生改变
3- Vue实例中的属性值发生改变，那么data中的属性值也会发生改变。
```

### 实例方法

```javascript
Vue 实例还暴露了一些有用的实例属性与方法。它们都有前缀 $，以便与用户定义的属性区分开来

vm.$el
vm.$data
vm.$watch(dataAttr, fn)

```

### methods

```javascript
methods用来装载可以调用的函数，你可以直接通过 Vue 实例访问这些方法，或者在指令表达式中使用。
方法中的 this 自动绑定为 Vue 实例。

methods中的函数中的变量使用的是实例中的属性名
```

> 注意，不应该使用箭头函数来定义 methods 函数（例如 plus: () => this.a++）。理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.a 将是 undefined。示例代码如下。

如果你要通过对 DOM 的操作来触发这些函数，那么应该使用 v-on 对操作和事件进行绑定

```javascript
var vm = new Vue({
  data: { a: 1 },
  methods: {
    plus: function () {
      this.a++
    }
  }
})

vm.plus()
vm.a // 2
```

## Vue挂载

使用实例的`el`属性 ：指定Vue实例应用的元素

```html
<script src="lib/vue.js"></script>
<body>
	<div class="root" id="root">
		<h1>{{str}}</h1>
		<h1>{{this.str}}</h1>
		<h1>{{vm.str}}</h1>
	</div>
</body>
```

```javascript
const vm = new Vue({
    // el:document.querySelector("#root")

    // 将ID为root的元素作为Vue实例挂载的元素（挂载的元素自此可以称为Vue模板）
    el:"#root",
	el: root,
    // 将class为root的元素作为Vue实例挂载的元素（不建议）
    el:".root",

    // 将标签名字为div的元素作为Vue实例挂载的元素（不建议）
    el:"div",

    el:"body",// 不允许
    el:"html",// 不允许
    
    data:{
        str:"我现在开始学习Vue,第一步要进行挂载",
        vm:{
            str:"vm"
        }
    }
})
```

`注意重点`

```javascript
挂载的元素自此可以称为Vue模板
在Vue模板中可以直接使用Vue实例中的属性或方法（不需要使用this,不需要使用this)
模块中可以使用this(不建议），说明模块所处的环境上下文中的this指向的是Vue实例
```

相同Vue实例挂载到不同元素

`只会将第一个<div>标签元素作为挂载元素`

```html
<div>
    <h1>{{str}}</h1>
</div>
<div>
    <h1>{{str}}</h1>
</div>

<script>
	// 只会将第一个<div>标签元素作为挂载元素
	new Vue({
		el:"div",
		data:{
			str:"one"
		}
	})
</script>
```

不同Vue实例挂载到不同元素

`同一个页面，支持多个实例挂载至不同元素中。`

```html

<body>
    <div id="one">
        <h1>{{str}}</h1>
    </div>
    <div id="two">
        <h1>{{str}}</h1>
    </div>
</body>
<script>
	// 同一个页面，支持多个实例挂载至不同元素中。
	new Vue({
		el:"#one",
		data:{
			str:"one"
		}
	})
	new Vue({
		el:"#two",
		data:{
			str:"two"
		}
	})
</script>
```

## 插值

最基本的数据绑定形式是文本插值，它使用的是“Mustache”语法 (即双大括号)：

```html
<span>Message: {{ msg }}</span>
```

双大括号标签会被替换为[相应组件实例中](https://cn.vuejs.org/guide/essentials/reactivity-fundamentals.html#declaring-reactive-state) `msg` 属性的值。同时每次 `msg` 属性更改时它也会同步更新。

```javascript
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>

<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}

<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```

在布尔属性的情况下，它们的存在即暗示为 true， 如果值是 null、undefined 或 false，则属性不会被包含在渲染出来的

`Mustache语法不能作用在 HTML 特性上，遇到这种情况应该使用 v-bind 指令`

```html
<div v-bind:id="dynamicId"></div>
```

对于布尔 attribute (它们只要存在就意味着值为 `true`)，`v-bind` 工作起来略有不同，在这个例子中：

```javascript
<button v-bind:disabled="isButtonDisabled">Button</button>
```

如果 `isButtonDisabled` 的值是 `null`、`undefined` 或 `false`，则 `disabled` attribute 甚至不会被包含在渲染出来的 `<button>` 元素中。

### [使用 JavaScript 表达式](https://v2.cn.vuejs.org/v2/guide/syntax.html#使用-JavaScript-表达式)

迄今为止，在我们的模板中，我们一直都只绑定简单的 property 键值。但实际上，对于所有的数据绑定，Vue.js 都提供了完全的 JavaScript 表达式支持。

```javascript
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
```

这些表达式会在所属 Vue 实例的数据作用域下作为 JavaScript 被解析。有个限制就是，每个绑定都只能包含**单个表达式**，所以下面的例子都**不会**生效。

```javascript
<!-- 这是语句，不是表达式 -->
{{ var a = 1 }}

<!-- 流控制也不会生效，请使用三元表达式 -->
{{ if (ok) { return message } }}
```

总结

```javascript
1：插值表达式支持字符串，数字，布尔，对象，数组，方法数据类型
2：undefined,null不会进行任何输出（与React相同）
3：数组不支持直接展开（React支持）
4：支持输出对象（React不支持）
5：Vue中包裹标签为<template></template>
```

案例

```html
<div id="root">
		<!--将Vue实例下的属性num进行渲染-->
		<p>{{num}}</p>
		<!--将Vue实例下的属性str进行渲染-->
		<p>{{str}}</p>
		<!--将字符串进行渲染-->
		<p>{{"str"}}</p>
		<!--将数字进行渲染-->
		<p>{{1}}</p>
		<!--将Vue实例下的属性bol进行渲染-->
		<p>{{bol}}</p>
		<!--将布尔值进行渲染-->
		<p>{{false}}</p>
		<!--将Vue实例下的属性fn进行渲染-->
		<p>{{fn}}</p>
		<!--将Vue实例下的fn函数运行的结果进行渲染-->
		<p>{{fn()}}</p>
		<!--将Vue实例下的属性arr进行渲染-->
		<p>{{arr}}</p>
		<!--将Vue实例下的属性obj进行渲染-->
		<p>{{obj}}</p>
		<p>{{null}}</p>
		<p>{{undefined}}</p>
		<p>{{sex===1?"男":"女"}}</p>
		<p>{{str.split("").reverse().join("")}}</p>
		<template></template>
	</div>
</body>
```

```javascript
new Vue({
    el:"#root",
    data:{
        num:1,
        str:"兰音Reine",
        bol:true,
        arr:[1,2,3,4],
        sex:1,
        obj:{
            userName:"zhangsan"
        }
    },
    methods:{
        fn(){
            return this.str.split("").reverse().join("");
        }
    }
})
```

## template标签

用于声明组件的字符串模板。不会被浏览器渲染出标签，标签包裹的内容会作为文本直接显示，用来包裹文本，标签等

```html
<template v-if="isLogin">您好，欢迎您的到来！</template>	
// 浏览器查看源代码
您好，欢迎您的到来！
```

