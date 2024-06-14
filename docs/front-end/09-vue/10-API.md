# API

## 全局API

### Vue.set

Vue.set( target, propertyName/index, value )

- **参数**：

  - `{Object | Array} target`
  - `{string | number} propertyName/index`
  - `{any} value`

- **返回值**：设置的值。

- **用法**：

  向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property (比如 `this.myObject.newProperty = 'hi'`)

  注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象。

### Vue.nextTick

Vue.nextTick( [callback, context] )

```javascript
Vue.nextTick( [callback, context] )
参数：

{Function} [callback]
{Object} [context]
用法：

在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

```

```javascript
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function () {
  // DOM 更新了
})

// 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
Vue.nextTick()
  .then(function () {
    // DOM 更新了
})
```

### Vue.use

- **参数**：

  - `{Object | Function} plugin`

- **用法**：

  安装 Vue.js 插件。如果插件是一个对象，必须提供 `install` 方法。

  如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将` Vue 构造函数对象 `作为参数传入。

  该方法需要在调用 `new Vue()` 之前被调用。`beforecreate`

  当 install 方法被同一个插件多次调用，插件将只会被安装一次。

```javascript
插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：

1 添加全局方法或者 property。如：vue-custom-element
2 添加全局资源：指令/过滤器/过渡等。如 vue-touch
3 通过全局混入来添加一些组件选项。如 vue-router
4添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
5一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如 vue-router
```

**使用插件**

通过全局方法 Vue.use() 使用插件。它需要在你调用 new Vue() 启动应用之前完成：

```javascript
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)

new Vue({
  // ...组件选项
})
```

也可以传入一个可选的选项对象：

```javascript
Vue.use(MyPlugin, { someOption: true })
```

`Vue.use` 会自动阻止多次注册相同插件，届时即使多次调用也只会注册一次该插件。

Vue.js 官方提供的一些插件 (例如 `vue-router`) 在检测到 `Vue` 是可访问的全局变量时会自动调用 `Vue.use()`。然而在像 CommonJS 这样的模块环境中，你应该始终显式地调用 `Vue.use()`：

```javascript
// 用 Browserify 或 webpack 提供的 CommonJS 模块环境时
var Vue = require('vue')
var VueRouter = require('vue-router')

// 不要忘了调用此方法
Vue.use(VueRouter)
```

[awesome-vue](https://github.com/vuejs/awesome-vue#components--libraries) 集合了大量由社区贡献的插件和库。

**开发插件**

Vue.js 的插件应该暴露一个 `install` 方法。这个方法的第一个参数是 `Vue` 构造器，第二个参数是一个可选的选项对象：

```javascript
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

**filter过滤器作为插件安装**

## 实例方法-数据

### vm.$watch

vm.$watch( expOrFn, callback, [options\] )

- **参数**：

  - `{string | Function} expOrFn`
  - `{Function | Object} callback`
  - `{Object} [options]`
    - `{boolean} deep`
    - `{boolean} immediate`

- **返回值**：`{Function} unwatch`

- **用法**：

  观察 Vue 实例上的一个表达式或者一个函数计算结果的变化。回调函数得到的参数为新值和旧值。表达式只接受简单的键路径。对于更复杂的表达式，用一个函数取代。

  注意：在变更 (不是替换) 对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变更之前值的副本。

- **示例**：

  ```javascript
  // 键路径
  vm.$watch('a.b.c', function (newVal, oldVal) {
    // 做点什么
  })
  
  // 函数
  vm.$watch(
    function () {
      // 表达式 `this.a + this.b` 每次得出一个不同的结果时
      // 处理函数都会被调用。
      // 这就像监听一个未被定义的计算属性
      return this.a + this.b
    },
    function (newVal, oldVal) {
      // 做点什么
    }
  )
  ```

  `vm.$watch` 返回一个取消观察函数，用来停止触发回调：

  ```javascript
  var unwatch = vm.$watch('a', cb)
  // 之后取消观察
  unwatch()
  ```

- **选项：deep**

  为了发现对象内部值的变化，可以在选项参数中指定 `deep: true`。注意监听数组的变更不需要这么做。

  ```javascript
  vm.$watch('someObject', callback, {
    deep: true
  })
  vm.someObject.nestedValue = 123
  // callback is fired
  ```

- **选项：immediate**

  在选项参数中指定 `immediate: true` 将立即以表达式的当前值触发回调：

  ```javascript
  vm.$watch('a', callback, {
    immediate: true
  })
  // 立即以 `a` 的当前值触发回调
  ```

  注意在带有 `immediate` 选项时，你不能在第一次回调时取消侦听给定的 property。

  ```javascript
  // 这会导致报错
  var unwatch = vm.$watch(
    'value',
    function () {
      doSomething()
      unwatch()
    },
    { immediate: true }
  )
  ```

  如果你仍然希望在回调内部调用一个取消侦听的函数，你应该先检查其函数的可用性：

  ```javascript
  var unwatch = vm.$watch(
    'value',
    function () {
      doSomething()
      if (unwatch) {
        unwatch()
      }
    },
    { immediate: true }
  )
  ```

### vm.$set

vm.$set( target, propertyName/index, value )

- **参数**：

  - `{Object | Array} target`
  - `{string | number} propertyName/index`
  - `{any} value`

- **返回值**：设置的值。

- **用法**：

  这是全局 `Vue.set` 的**别名**。向响应式对象中添加一个 property，并确保这个新 property 同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新 property，因为 Vue 无法探测普通的新增 property (比如 `this.myObject.newProperty = 'hi'`)

  注意对象不能是 Vue 实例，或者 Vue 实例的根数据对象。

## 实例方法-声明周期

### vm.$mount

vm.$mount( [elementOrSelector\] )

- **参数**：

  - `{Element | string} [elementOrSelector]`
  - `{boolean} [hydrating]`

- **返回值**：`vm` - 实例自身

- **用法**：

  如果 Vue 实例在实例化时没有收到 el 选项，则它处于“未挂载”状态，没有关联的 DOM 元素。可以使用 `vm.$mount()` 手动地挂载一个未挂载的实例。

  如果没有提供 `elementOrSelector` 参数，模板将被渲染为文档之外的的元素，并且你必须使用原生 DOM API 把它插入文档中。

  这个方法返回实例自身，因而可以链式调用其它实例方法。

- **示例**：

  ```javascript
  var MyComponent = Vue.extend({
    template: '<div>Hello!</div>'
  })
  
  // 创建并挂载到 #app (会替换 #app)
  new MyComponent().$mount('#app')
  
  // 同上
  new MyComponent({ el: '#app' })
  
  // 或者，在文档之外渲染并且随后挂载 手动挂载
  var component = new MyComponent().$mount()
  document.getElementById('app').appendChild(component.$el)
  ```

## 实例property

### vm.$data

- **类型**：`Object`

- **限制**：组件的定义只接受 `function`。

- **详细**：

  Vue 实例观察的数据对象。Vue 实例代理了对其 data 对象 property 的访问。

  Vue 实例的数据对象。Vue 会递归地把 data 的 property 转换为 getter/setter，从而让 data 的 property 能够响应数据变化。**对象必须是纯粹的对象 (含有零个或多个的 key/value 对)**：浏览器 API 创建的原生对象，原型上的 property 会被忽略。大概来说，data 应该只能是数据 - 不推荐观察拥有状态行为的对象。

```javascript
一旦观察过，你就无法在根数据对象上添加响应式 property。因此推荐在创建实例之前，就声明所有的根级响应式 property。

实例创建之后，可以通过 vm.$data 访问原始数据对象。Vue 实例也代理了 data 对象上所有的 property，因此访问 vm.a 等价于访问 vm.$data.a。

以 _ 或 $ 开头的 property 不会被 Vue 实例代理，因为它们可能和 Vue 内置的 property、API 方法冲突。你可以使用例如 vm.$data._property 的方式访问这些 property。

当一个组件被定义，data 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果 data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！通过提供 data 函数，每次创建一个新实例后，我们能够调用 data 函数，从而返回初始数据的一个全新副本数据对象。

如果需要，可以通过将 vm.$data 传入 JSON.parse(JSON.stringify(...)) 得到深拷贝的原始数据对象。
```

```javascript
var data = { a: 1 }

// 直接创建一个实例
var vm = new Vue({
  data: data
})
vm.a // => 1
vm.$data === data // => true

// Vue.extend() 中 data 必须是函数
var Component = Vue.extend({
  data: function () {
    return { a: 1 }
  }
})
注意，如果你为 data property 使用了箭头函数，则 this 不会指向这个组件的实例，不过你仍然可以将其实例作为函数的第一个参数来访问。

data: vm => ({ a: vm.myProp })
```



### vm.$el

vm.$el

- **类型**：`Element`

- **只读**

- **详细**：

  Vue 实例使用的根 DOM 元素，指向Vue所挂载的元素

```javascript
const vm = new Vue({
    el:"#app",
    ...
})
vm.$el.style.color="red";
```



### vm.$options

vm.$options

- **类型**：`Object`

- **只读**

- **详细**：

  用于当前 Vue 实例的初始化选项。需要在选项中包含自定义 property 时会有用处：

  ```javascript
  new Vue({
    customOption: 'foo',
    created: function () {
      console.log(this.$options.customOption) // => 'foo'
    }
  })
  ```

### vm.$nextTick

vm.$nextTick( [callback] )

可能你还没有注意到，Vue 在更新 DOM 时是**异步**执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。

```javascript
vm.$nextTick( [callback] )
参数：
{Function} [callback]
用法：
将回调延迟到下次 DOM 更新，update钩子函数执行之后执行。
它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。

2.1.0 起新增：如果没有提供回调且在支持 Promise 的环境中，则返回一个 Promise。

请注意 Vue 不自带 Promise 的 polyfill，所以如果你的目标浏览器不是原生支持 Promise 
(IE：你们都看我干嘛)，你得自行 polyfill。
```

```javascript
new Vue({
  // ...
  methods: {
    // ...
    example: function () {
      // 修改数据
      this.message = 'changed'
      // DOM 还没有更新,
      // 作为一个回调函数使用
      this.$nextTick(function () {
        // DOM 现在更新了 
        // 延迟到 updated钩子 之后执行
        // `this` 绑定到当前实例
        this.doSomethingElse()
      })
    }
  }

  // 实例创建之后调用
  created(){
    	// 延迟到挂载完毕 mounted 之后调用，获取挂载后的视图。
    	// 作为一个 Promise 使用
		this.$nextTick().then(()=>{
            console.log("nextTick")
   })
  },
})
```

### vm.$destroy

```javascript
vm.$destroy()
```

- **用法**：

  完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。

  触发 `beforeDestroy` 和 `destroyed` 的钩子。

  在大多数场景中你不应该调用这个方法。最好使用 `v-if` 和 `v-for` 指令以数据驱动的方式控制子组件的生命周期。
