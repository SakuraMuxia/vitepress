# Pinia

> 符合直觉的 Vue.js 状态管理库
>
> https://pinia.vuejs.org/zh/

## 基本使用

下载安装：

```js
yarn add pinia
npm i pinia
```

创建一个Store：/stores/counter.js

```js
// stores/counter.js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => {
    return { count: 0 }
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++
    },
  },
})
```

然后你就可以在一个组件中使用该 store 了

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'
// 这里counter是一个Proxy对象
const counter = useCounterStore()
// 直接使用store，修改state的值
counter.count++
// 调用store的$patch方法，修改state的值，自动补全
counter.$patch({ count: counter.count + 1 })
// 调用store的action中的方法，修改state的值 
counter.increment()
</script>

<template>
  <!-- 直接从 store 中访问 state -->
  <div>Current Count: {{ counter.count }}</div>
</template>
```

为实现更多高级用法，你甚至可以使用一个函数 (与组件 setup() 类似) 来定义一个 Store

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

如果你还不熟悉 setup() 函数和组合式 API，别担心，Pinia 也提供了一组类似 Vuex 的 映射 state 的辅助函数。你可以用和之前一样的方式来定义 Store，然后通过 mapStores()、mapState() 或 mapActions() 访问

```js
const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})

const useUserStore = defineStore('user', {
  // ...
})

export default defineComponent({
  computed: {
    // 其他计算属性
    // ...
    // 允许访问 this.counterStore 和 this.userStore
    ...mapStores(useCounterStore, useUserStore)
    // 允许读取 this.count 和 this.double
    ...mapState(useCounterStore, ['count', 'double']),
  },
  methods: {
    // 允许读取 this.increment()
    ...mapActions(useCounterStore, ['increment']),
  },
})
```

### 使用案例

1. 创建大仓库。src->store->index.ts

```js
// 创建大仓库。
import {createPinia} from "pinia";
export default createPinia();

```

2. 挂载到入口文件：src->main.ts

```js
import {createApp} from "vue";
import App from "@/App.vue";
import store from "./store";
createApp(App)
    .use(store)
    .mount("#app");
```

> 目的是为了可以使用 createPinia()

## 对比Vuex

Pinia 起源于一次探索 Vuex 下一个迭代的实验，因此结合了 Vuex 5 核心团队讨论中的许多想法。最后，我们意识到 Pinia 已经实现了我们在 Vuex 5 中想要的大部分功能，所以决定将其作为新的推荐方案来代替 Vuex。

与 Vuex 相比，Pinia 不仅提供了一个更简单的 API，也提供了符合组合式 API 风格的 API，最重要的是，搭配 TypeScript 一起使用时有非常可靠的类型推断支持

## 定义Store

在深入研究核心概念之前，我们得知道 Store 是用 defineStore() 定义的，它的第一个参数要求是一个独一无二的名字

```js
import { defineStore } from 'pinia'

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useAlertsStore = defineStore('alerts', {
  // 其他配置...
})
```

这个名字 ，也被用作 id ，是必须传入的， Pinia 将用它来连接 store 和 devtools。为了养成习惯性的用法，将返回的函数命名为 use... 是一个符合组合式函数风格的约定。

```js
defineStore() 的第二个参数可接受两类值：Setup 函数或 Option 对象。
```

### 选项式定义Store

与 Vue 的选项式 API 类似，我们也可以传入一个带有 state、actions 与 getters 属性的 Option 对象

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```

你可以认为 `state` 是 store 的数据 (`data`)，`getters` 是 store 的计算属性 (`computed`)，而 `actions` 则是方法 (`methods`)。为方便上手使用，Option Store 应尽可能直观简单。

### 组合式定义Store

也存在另一种定义 store 的可用语法。与 Vue 组合式 API 的 [setup 函数](https://cn.vuejs.org/api/composition-api-setup.html) 相似，我们可以传入一个函数，该函数定义了一些响应式属性和方法，并且返回一个带有我们想暴露出去的属性和方法的对象。

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
```

```js
在 Setup Store 中：
	ref() 就是 state 属性
	computed() 就是 getters
	function() 就是 actions
注意，要让 pinia 正确识别 state，你必须在 setup store 中返回 state 的所有属性。这意味着，你不能在 store 中使用私有属性。不完整返回会影响 SSR ，开发工具和其他插件的正常运行。

Setup store 比 Option Store 带来了更多的灵活性，因为你可以在一个 store 内创建侦听器，并自由地使用任何组合式函数。不过，请记住，使用组合式函数会让 SSR 变得更加复杂
```

Setup store 也可以依赖于全局**提供**的属性，比如路由。任何[应用层面提供](https://vuejs.org/api/application.html#app-provide)的属性都可以在 store 中使用 `inject()` 访问，就像在组件中一样：

```js
import { inject } from 'vue'
import { useRoute } from 'vue-router'
import { defineStore } from 'pinia'

export const useSearchFilters = defineStore('search-filters', () => {
  const route = useRoute()
  // 这里假定 `app.provide('appProvided', 'value')` 已经调用过
  const appProvided = inject('appProvided')

  // ...

  return {
    // ...
  }
})
```

### 使用 Store

虽然我们前面定义了一个 store，但在我们使用 `<script setup>` 调用 `useStore()`(或者使用 `setup()` 函数，**像所有的组件那样**) 之前，store 实例是不会被创建的

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useCounterStore()
</script>
```

你可以定义任意多的 store，但为了让使用 pinia 的益处最大化 (比如允许构建工具自动进行代码分割以及 TypeScript 推断)，**你应该在不同的文件中去定义 store**。

一旦 store 被实例化，你可以直接访问在 store 的 `state`、`getters` 和 `actions` 中定义的任何属性。我们将在后续章节继续了解这些细节，目前自动补全将帮助你使用相关属性。

请注意，`store` 是一个用 `reactive` 包装的对象，这意味着不需要在 getters 后面写 `.value`。就像 `setup` 中的 `props` 一样，**我们不能对它进行解构**：

```vue
<script setup>
import { useCounterStore } from '@/stores/counter'
import { computed } from 'vue'
// 调用函数 得到一个store对象
const store = useCounterStore()
// ❌ 这将不起作用，因为它破坏了响应性
// 这就和直接解构 `props` 一样
const { name, doubleCount } = store
name // 将始终是 "Eduardo"
doubleCount // 将始终是 0
setTimeout(() => {
  store.increment()
}, 1000)
// ✅ 这样写是响应式的
// 💡 当然你也可以直接使用 `store.doubleCount`
const doubleValue = computed(() => store.doubleCount)
</script>
```

### 从 Store 解构

为了从 store 中提取属性时保持其响应性，你需要使用 `storeToRefs()`。它将为每一个响应式属性创建引用。当你只使用 store 的状态而不调用任何 action 时，它会非常有用。请注意，你可以直接从 store 中解构 action，因为它们也被绑定到 store 上

```vue
<script setup>
import { storeToRefs } from 'pinia'
const store = useCounterStore()
// `name` 和 `doubleCount` 是响应式的 ref
// 同时通过插件添加的属性也会被提取为 ref
// 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
const { name, doubleCount } = storeToRefs(store)
// 作为 action 的 increment 可以直接解构
const { increment } = store
</script>
```



## State

在大多数情况下，state 都是你的 store 的核心。人们通常会先定义能代表他们 APP 的 state。在 Pinia 中，state 被定义为一个返回初始状态的函数。这使得 Pinia 可以同时支持服务端和客户端

```js
import { defineStore } from 'pinia'

const useStore = defineStore('storeId', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断出它们的类型
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: true,
    }
  },
})
```

### 访问 state

默认情况下，你可以通过 `store` 实例访问 state，直接对其进行读写。

```js
const store = useStore()

store.count++
```

注意，新的属性**如果没有在 `state()` 中被定义**，则不能被添加。它必须包含初始状态。例如：如果 `secondCount` 没有在 `state()` 中定义，我们无法执行 `store.secondCount = 2`。

### 重置 state

使用选项式 API时，你可以通过调用 store 的 `$reset()` 方法将 state 重置为初始值。

```js
const store = useStore()

store.$reset()
```

在 `$reset()` 内部，会调用 `state()` 函数来创建一个新的状态对象，并用它替换当前状态。

在 Setup Stores 中，您需要创建自己的 `$reset()` 方法：

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function $reset() {
    count.value = 0
  }

  return { count, $reset }
})
```

### 可修改的 state

如果你想修改这些 state 属性 (例如，如果你有一个表单)，你可以使用 `mapWritableState()` 作为代替。但注意你不能像 `mapState()` 那样传递一个函数

```js
import { mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // 可以访问组件中的 this.count，并允许设置它。
    // this.count++
    // 与从 store.count 中读取的数据相同
    ...mapWritableState(useCounterStore, ['count'])
    // 与上述相同，但将其注册为 this.myOwnName
    ...mapWritableState(useCounterStore, {
      myOwnName: 'count',
    }),
  },
}
```

### 变更 state

方式1：用 `store.count++` 直接改变 store，

方式2：你还可以调用 `$patch` 方法。

**$patch()**

```js
// $patch接收一个对象，对象的属性名即是要修改的状态名，对应的属性值即是要修改的状态值。
store.$patch()
返回值：void
参数：state的数据状态:{}
$patch<F>(stateMutator): void
```

它允许你用一个 `state` 的补丁对象在同一时间更改多个属性：

```js
store.$patch({
  count: store.count + 1,
  age: 120,
  name: 'DIO',
})
```

不过，用这种语法的话，有些变更真的很难实现或者很耗时：任何集合的修改（例如，向数组中添加、移除一个元素或是做 `splice` 操作）都需要你创建一个新的集合。因此，`$patch` 方法也接受一个函数来组合这种难以用补丁对象实现的变更。

```js
store.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```

两种变更 store 方法的主要区别是，`$patch()` 允许你将多个变更归入 devtools 的同一个条目中。

同时请注意，**直接修改 `state`，`$patch()` 也会出现在 devtools 中**，而且可以进行 time travel (在 Vue 3 中还没有)。

### 替换 state

你**不能完全替换掉** store 的 state，因为那样会破坏其响应性。但是，你可以 patch 它。

```js
// 这实际上并没有替换`$state`
store.$state = { count: 24 }
// 在它内部调用 `$patch()`：
store.$patch({ count: 24 })
```

你也可以通过变更 `pinia` 实例的 `state` 来设置整个应用的初始 state。这常用于 [SSR 中的激活过程](https://pinia.vuejs.org/zh/ssr/#state-hydration)。

```js
pinia.state.value = {}
```

### 使用案例

1. 定义一个Store模块：src->store->modules->counter.ts

```js
import {defineStore} from "pinia";
// 通过defineStore可以定义小仓库（模块）
// defineStore()返回的值一般保存至以use开头的常量中。
// defineStore()第一个参数是模块的标识,第二个参数是配置项
const useCounterStore = defineStore("counter",{
    // 通过state函数可以定义状态，返回的值即是该模块中的数据状态。
    state(){
         return {
             num:100
         }
    }
    // 上方代码也可以写为：
    state:()=>({
        // 支持响应式
        num:200,
        // 支持响应式
        arr:[1,2,3,4,5]
    })
});
// 在组件可以通过运行useCounterStore函数操作该模块中的数据状态。
export default useCounterStore;

```

2. 入口文件：src->App.vue

```vue
<template>
    <h3>练习Pinia</h3>
	<!--template解析-->
	<!--counter:"$id":"counter","num":"203","arr":"[10,2,3,5,4],"_isOptionsAPI":"true"-->
    <p>counter:{{counter}}</p>
	<!--模块的标识-->
    <p>counter.$id:{{counter.$id}}</p>
	<!--数据状态-->
    <p>num:{{counter.num}}</p>
    <p>arr:{{counter.arr}}</p>
	<!--是否是选项时API-->
    <p>_isOptionsAPI:{{counter._isOptionsAPI}}</p>
</template>

<script lang="ts" setup>
import useCounterStore from "@/store/modules/counter";
const counter = useCounterStore();
// 输出counter模块中的数据状态num
// 返回一个Proxy对象，Proxy对象中存在Target属性，Target中有定义的state数据对象
console.log(counter) 
// 获取state中的数据
console.log(counter.num); // 200
</script>
```

## Action

Action 相当于组件中的 method。它们可以通过 defineStore() 中的 actions 属性来定义，并且它们也是定义业务逻辑的完美选择

```js
export const useCounterStore = defineStore('main', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
  },
})
```

类似 [getter](https://pinia.vuejs.org/zh/core-concepts/getters.html)，action 也可通过 `this` 访问**整个 store 实例**，并支持**完整的类型标注(以及自动补全✨)**。**不同的是，`action` 可以是异步的**，你可以在它们里面 `await` 调用任何 API，以及其他 action！下面是一个使用 [Mande](https://github.com/posva/mande) 的例子。请注意，你使用什么库并不重要，只要你得到的是一个`Promise`。你甚至可以 (在浏览器中) 使用原生 `fetch` 函数：

```js
import { mande } from 'mande'

const api = mande('/api/users')

export const useUsers = defineStore('users', {
  state: () => ({
    userData: null,
    // ...
  }),

  actions: {
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password })
        showTooltip(`Welcome back ${this.userData.name}!`)
      } catch (error) {
        showTooltip(error)
        // 让表单组件显示错误
        return error
      }
    },
  },
})
```

### 访问其他 store 的 action

想要使用另一个 store 的话，那你直接在 action 中调用就好了

```js
import { useAuthStore } from './auth-store'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    preferences: null,
    // ...
  }),
  actions: {
    async fetchUserPreferences() {
      const auth = useAuthStore()
      if (auth.isAuthenticated) {
        this.preferences = await fetchPreferences()
      } else {
        throw new Error('User must be authenticated')
      }
    },
  },
})
```

### 使用选项式 API 的用法

在下面的例子中，你可以假设相关的 store 已经创建了

```js
// 示例文件路径：
// ./src/stores/counter.js

import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++
    },
  },
})
```

**使用 setup()**

虽然并不是每个开发者都会使用组合式 API，但 setup() 钩子依旧可以使 Pinia 在选项式 API 中更易用。并且不需要额外的映射辅助函数!

```vue
<script>
import { useCounterStore } from '../stores/counter'
export default defineComponent({
  setup() {
    const counterStore = useCounterStore()
    return { counterStore }
  },
  methods: {
    incrementAndPrint() {
      this.counterStore.increment()
      console.log('New Count:', this.counterStore.count)
    },
  },
})
</script>
```

**不使用setup()**

如果你不喜欢使用组合式 API，你也可以使用 mapActions() 辅助函数将 action 属性映射为你组件中的方法。

```js
import { mapActions } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  methods: {
    // 访问组件内的 this.increment()
    // 与从 store.increment() 调用相同
    ...mapActions(useCounterStore, ['increment'])
    // 与上述相同，但将其注册为this.myOwnName()
    ...mapActions(useCounterStore, { myOwnName: 'increment' }),
  },
}
```

### $onAction()

可以通过 `store.$onAction()` 来监听 action 和它们的结果。

```js
$onAction(callback, detached?): () => void
```

```js
设置一个回调，当一个 action 即将被调用时，就会被调用。回调接收一个对象，其包含被调用 action 的所有相关信息：

store: 被调用的 store
name: action 的名称
args: 传递给 action 的参数
除此之外，它会接收两个函数，允许在 action 完成或失败时执行的回调。

它还会返回一个用来删除回调的函数。 请注意，当在组件内调用 store.$onAction() 时，除非 detached 被设置为 true， 否则当组件被卸载时，它将被自动清理掉。

store.$onAction(({ after, onError}) => {
  // 你可以在这里创建所有钩子之间的共享变量，
  // 同时设置侦听器并清理它们。
  after((resolvedValue) => {
    // 可以用来清理副作用
    // `resolvedValue` 是 action 返回的值，
    // 如果是一个 Promise，它将是已经 resolved 的值
  })
  onError((error) => {
    // 可以用于向上传递错误
  })
})
```

你传递给它的回调函数会在 action 本身之前执行。`after` 表示在 promise 解决之后，允许你在 action 解决后执行一个回调函数。同样地，`onError` 允许你在 action 抛出错误或 reject 时执行一个回调函数。这些函数对于追踪运行时错误非常有用。

这里有一个例子，在运行 action 之前以及 action resolve/reject 之后打印日志记录。

```js
const unsubscribe = someStore.$onAction(
  ({
    name, // action 名称
    store, // store 实例，类似 `someStore`
    args, // 传递给 action 的参数数组
    after, // 在 action 返回或解决后的钩子
    onError, // action 抛出或拒绝的钩子
  }) => {
    // 为这个特定的 action 调用提供一个共享变量
    const startTime = Date.now()
    // 这将在执行 "store "的 action 之前触发。
    console.log(`Start "${name}" with params [${args.join(', ')}].`)

    // 这将在 action 成功并完全运行后触发。
    // 它等待着任何返回的 promise
    after((result) => {
      console.log(
        `Finished "${name}" after ${
          Date.now() - startTime
        }ms.\nResult: ${result}.`
      )
    })

    // 如果 action 抛出或返回一个拒绝的 promise，这将触发
    onError((error) => {
      console.warn(
        `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      )
    })
  }
)

// 手动删除监听器
unsubscribe()
```

默认情况下，*action 订阅器*会被绑定到添加它们的组件上(如果 store 在组件的 `setup()` 内)。这意味着，当该组件被卸载时，它们将被自动删除。如果你想在组件卸载后依旧保留它们，请将 `true` 作为第二个参数传递给 *action 订阅器*，以便将其从当前组件中分离

```vue
<script setup>
const someStore = useSomeStore()
// 此订阅器即便在组件卸载之后仍会被保留
someStore.$onAction(callback, true)
</script>
```

### 使用案例

1. src->store->modules->counter.ts

```tsx
import {defineStore} from "pinia";
// 通过defineStore可以定义模块
// defineStore返回的值一般保存至以use开头的常量中。
// 第一个参数是模块的标识,第二个参数是配置对象
const useCounterStore = defineStore("counter",{
    // 通过state函数可以定义状态，返回的值即是该模块中的数据状态。
    state(){
         return {
             num:100
         }
    }
    // 上方代码也可以写为：
    state:()=>({
        num:200,
        arr:[1,2,3,4,5]
    }),
    // 定义store中的方法
    actions:{
        // 同步修改state
        addOne(a:number,b:number,c:number,d:number){
            console.log(a,b,c,d);
            this.num+=1;
        },
        // 异步修改state
        delaySet(){
            setTimeout(()=>{
                this.num=900
            },2000)
        }
    }
});
// 在组件可以通过运行useCounterStore函数操作该模块中的数据状态。
export default useCounterStore;

```

2. 入口文件：src->App.vue

```vue
<template>
    <!--支持双向绑定-->
    <input type="text" v-model.number="counter.num">
    <!--更改数据状态方案一：直接修改-->
    <button @click="counter.num++">{{counter.num}}</button>
    <!--更改数据状态方案二：通过函数调用counter.$patch-->
    <button @click="setNum">{{counter.num}}</button>
    <!--更改数据状态方案三：使用actions中的方法-->
    <button @click="counter.addOne">{{counter.num}}</button>
    <button @click="counter.addOne(1,2,3,4)">{{counter.num}}</button>
    <button @click="counter.delaySet">异步更新{{counter.num}}</button>
	<button @click="actionAddOne">{{counter.num}}</button>
</template>

<script lang="ts" setup>
import useCounterStore from "@/store/modules/counter";
// 得到conter的store
const counter = useCounterStore();
// 更改数据状态方案一：直接修改
    counter.num+=2;    
// 更改数据状态方案二：借助$patch
const setNum = function(){
    // 通过$patch修改state
    counter.$patch({
         num:counter.num+3
    })
	// 通过$patch修改state
    const num = counter.num+3;
    // $patch接收一个对象，对象的属性名即是要修改的状态名，对应的属性值即是要修改的状态值。
    counter.$patch({
        num
    })
}
// 更改数据状态方案三：调用store中的action
const actionAddOne = function(){
    counter.addOne(10,11,12,13);
}
</script>

<style scoped>

</style>
```

## Getter

Getter 完全等同于 store 的 state 的计算值。可以通过 defineStore() 中的 getters 属性来定义它们。推荐使用箭头函数，并且它将接收 state 作为第一个参数

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
})
```

大多数时候，getter 仅依赖 state。不过，有时它们也可能会使用其他 getter。因此，即使在使用常规函数定义 getter 时，我们也可以通过 `this` 访问到整个 store 实例，但(在 TypeScript 中)必须定义返回类型。这是为了避免 TypeScript 的已知缺陷，不过这不影响用箭头函数定义的 getter，也不会影响不使用 `this` 的 getter

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // 自动推断出返回类型是一个 number
    doubleCount(state) {
      return state.count * 2
    },
    // 返回类型**必须**明确设置
    doublePlusOne(): number {
      // 整个 store 的 自动补全和类型标注 ✨
      return this.doubleCount + 1
    },
  },
})
```

然后你可以直接访问 store 实例上的 getter 了

```vue
<script setup>
import { useCounterStore } from './counterStore'

const store = useCounterStore()
</script>

<template>
  <p>Double count is {{ store.doubleCount }}</p>
</template>
```

### 访问其他 getter

与计算属性一样，你也可以组合多个 getter。通过 this，你可以访问到其他任何 getter。在这种情况下，你需要为这个 getter 指定一个返回值的类型

```js
// 你可以在 JavaScript 中使用 JSDoc (https://jsdoc.app/tags-returns.html)
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // 类型是自动推断出来的，因为我们没有使用 `this`
    doubleCount: (state) => state.count * 2,
    // 这里我们需要自己添加类型(在 JS 中使用 JSDoc)
    // 可以用 this 来引用 getter
    /**
     * 返回 count 的值乘以 2 加 1
     *
     * @returns {number}
     */
    doubleCountPlusOne() {
      // 自动补全 ✨
      return this.doubleCount + 1
    },
  },
})
```

### 向 getter 传递参数

*Getter* 只是幕后的**计算**属性，所以不可以向它们传递任何参数。不过，你可以从 *getter* 返回一个函数，该函数可以接受任意参数：

```js
export const useUserListStore = defineStore('userList', {
  getters: {
    getUserById: (state) => {
      return (userId) => state.users.find((user) => user.id === userId)
    },
  },
})
```

并在组件中使用：

```vue
<script setup>
import { useUserListStore } from './store'
const userList = useUserListStore()
const { getUserById } = storeToRefs(userList)
// 请注意，你需要使用 `getUserById.value` 来访问
// <script setup> 中的函数
</script>

<template>
  <p>User 2: {{ getUserById(2) }}</p>
</template>
```

请注意，当你这样做时，**getter 将不再被缓存**。它们只是一个被你调用的函数。不过，你可以在 getter 本身中缓存一些结果，虽然这种做法并不常见，但有证明表明它的性能会更好：

```js
export const useUserListStore = defineStore('userList', {
  getters: {
    getActiveUserById(state) {
      const activeUsers = state.users.filter((user) => user.active)
      return (userId) => activeUsers.find((user) => user.id === userId)
    },
  },
})
```

### 访问其他 store 的 getter

想要使用另一个 store 的 getter 的话，那就直接在 *getter* 内使用就好：

```js
import { useOtherStore } from './other-store'

export const useStore = defineStore('main', {
  state: () => ({
    // ...
  }),
  getters: {
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.localData + otherStore.data
    },
  },
})
```

### 使用 setup() 时的用法

作为 store 的一个属性，你可以直接访问任何 getter(与 state 属性完全一样)：

```vue
<script setup>
const store = useCounterStore()
store.count = 3
store.doubleCount // 6
</script>
```

### 使用选项式 API 的用法

在下面的例子中，你可以假设相关的 store 已经创建了

```js
// 示例文件路径：
// ./src/stores/counter.js

import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2
    },
  },
})
```

### 使用 setup()

虽然并不是每个开发者都会使用组合式 API，但 setup() 钩子依旧可以使 Pinia 在选项式 API 中更易用。并且不需要额外的映射辅助函数

```js
<script>
import { useCounterStore } from '../stores/counter'

export default defineComponent({
  setup() {
    const counterStore = useCounterStore()

    return { counterStore }
  },
  computed: {
    quadrupleCounter() {
      return this.counterStore.doubleCount * 2
    },
  },
})
</script>
```

这在将组件从选项式 API 迁移到组合式 API 时很有用，但**应该只是一个迁移步骤**。始终尽量不要在同一组件中混合两种 API 样式。

### 不使用 setup()

你可以使用[前一节的 state](https://pinia.vuejs.org/zh/core-concepts/state.html#options-api) 中的 `mapState()` 函数来将其映射为 getters：

```js
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // 允许在组件中访问 this.doubleCount
    // 与从 store.doubleCount 中读取的相同
    ...mapState(useCounterStore, ['doubleCount']),
    // 与上述相同，但将其注册为 this.myOwnName
    ...mapState(useCounterStore, {
      myOwnName: 'doubleCount',
      // 你也可以写一个函数来获得对 store 的访问权
      double: (store) => store.doubleCount,
    }),
  },
}
```

### 使用案例

1. src->store->modules->counter.ts

```js
getters:{
    sum(){
        console.log("sum");
        // ts语法：定义value的类型，
        // 累加运算
        const value:number = this.arr.reduce((s:number,item:number)=>{
            return s+item;
        },0)
        return value;
    }
}
```

2. src->APP.vue

```vue
<template>2    
	<p @click="counter.changeArr">getters->sum:{{counter.sum}}</p>
</template> 
```

3. src->store->modules->todos.ts

```js
import {defineStore} from "pinia";
import {computed, reactive, ref, watch} from "vue";
const useTodosStore = defineStore("todos",()=>{
    
    // 响应式的ref,reactive----->state
    let taskList = ref([1,2,3,4]);
    let obj = reactive({
        userName:"zhangsan",
        age:12
    })
    
    // 定义的方法相当于------------>actions
    const addTaskList = function(num:number){
        taskList.value.push(num);
    }
    
    // 计算属性------------------->getters
    const sum = computed(()=>taskList.value.reduce((v:number,item:number)=>v=v+item,0));
    
    // 使用侦听器方式1 侦听taskList
    watch(taskList,()=>{
         console.log("taskList改变了")
     },{
         immediate:true,
        // 深度侦听
         deep:true
    })
    
	// 使用侦听器方式2 侦听taskList中的value值
    watch(()=>taskList.value,()=>{
        console.log("taskList改变了")
    },{
        immediate:true,
        deep:true
    })
    
    // 切记一定一定一定要返回！
    return {
        taskList,
        obj,
        addTaskList,
        sum
    }
})
export default useTodosStore;
```

4. src->App.vue

```vue
<template>
    <h3>组合式API</h3>
    <p>{{todos}}</p>
    <p>taskList:{{todos.taskList}}</p>
    <p>sum:{{todos.sum}}</p>
    <button @click="todos.addTaskList(todos.taskList.length+1)">增加元素</button>
</template>

<script lang="ts" setup>
import useTodosStore from "@/store/modules/todos";
const todos = useTodosStore();
</script>

<style scoped>
</style>
```



## 在组件外使用 store

Pinia store 依靠 pinia 实例在所有调用中共享同一个 store 实例。大多数时候，只需调用你定义的 useStore() 函数，完全开箱即用。例如，在 setup() 中，你不需要再做任何事情。但在组件之外，情况就有点不同了。 实际上，useStore() 给你的 app 自动注入了 pinia 实例。这意味着，如果 pinia 实例不能自动注入，你必须手动提供给 useStore() 函数。 你可以根据不同的应用，以不同的方式解决这个问题。

### 单页面应用

如果你不做任何 SSR(服务器端渲染)，在用 app.use(pinia) 安装 pinia 插件后，对 useStore() 的任何调用都会正常执行：

```js
import { useUserStore } from '@/stores/user'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

// ❌  失败，因为它是在创建 pinia 之前被调用的
const userStore = useUserStore()

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// ✅ 成功，因为 pinia 实例现在激活了
const userStore = useUserStore()
```

为确保 pinia 实例被激活，最简单的方法就是将 `useStore()` 的调用放在 pinia 安装后才会执行的函数中。

让我们来看看这个在 Vue Router 的导航守卫中使用 store 的例子。

```js
import { createRouter } from 'vue-router'
const router = createRouter({
  // ...
})

// ❌ 由于引入顺序的问题，这将失败
const store = useStore()

router.beforeEach((to, from, next) => {
  // 我们想要在这里使用 store
  if (store.isLoggedIn) next()
  else next('/login')
})

router.beforeEach((to) => {
  // ✅ 这样做是可行的，因为路由器是在其被安装之后开始导航的，
  // 而此时 Pinia 也已经被安装。
  const store = useStore()

  if (to.meta.requiresAuth && !store.isLoggedIn) return '/login'
})
```

### 服务端渲染应用

当处理服务端渲染时，你将必须把 `pinia` 实例传递给 `useStore()`。这可以防止 pinia 在不同的应用实例之间共享全局状态。

在[SSR 指南](https://pinia.vuejs.org/zh/ssr/)中有一整节专门讨论这个问题，这里只是一个简短的解释

### 使用案例

2. 大仓库。src->store->index.ts

```js
// 创建大仓库。
import {createPinia} from "pinia";
export default createPinia();

```

3. 引入到入口文件：src->main.ts

```js
import {createApp} from "vue";
import App from "@/App.vue";
import store from "./store";
// 引入到入口文件
import "@/module.ts";
createApp(App)
    .use(store)
    .mount("#app");
```

> 目的是为了可以使用 createPinia()

1. src->module.ts

```js
// 1- 引入大仓库
import store from "@/store";
import useTodosStore from "@/store/modules/todos";
// 2- 传入大仓库：告知模块todos是属于哪一个大仓库下的。
const todos = useTodosStore(store);
console.log(todos.taskList);
```

## 插件

由于有了底层 API 的支持，Pinia store 现在完全支持扩展。以下是你可以扩展的内容

```js
为 store 添加新的属性
定义 store 时增加新的选项
为 store 增加新的方法
包装现有的方法
改变甚至取消 action
实现副作用，如本地存储
仅应用插件于特定 store
```

插件是通过 `pinia.use()` 添加到 pinia 实例的。最简单的例子是通过返回一个对象将一个静态属性添加到所有 store

```js
import { createPinia } from 'pinia'

// 创建的每个 store 中都会添加一个名为 `secret` 的属性。
// 在安装此插件后，插件可以保存在不同的文件中
function SecretPiniaPlugin() {
  return { secret: 'the cake is a lie' }
}

const pinia = createPinia()
// 将该插件交给 Pinia
pinia.use(SecretPiniaPlugin)

// 在另一个文件中
const store = useStore()
store.secret // 'the cake is a lie'
```

这对添加全局对象很有用，如路由器、modal 或 toast 管理器