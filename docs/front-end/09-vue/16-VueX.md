# Vuex

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

## 特点

```javascript
`Vuex`是专门在`Vue`中实现集中式状态（数据）管理的一个`Vue`插件，对`vue`应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

1、数据的存取一步到位，不需要层层传递
2、数据的流动非常清晰
3、存储在Vuex中的数据都是响应式的
```

## 状态管理模式

如果您不打算开发大型单页应用，使用 Vuex 可能是繁琐冗余的。确实是如此——如果您的应用够简单，您最好不要使用 Vuex。一个简单的 [store 模式](https://v2.cn.vuejs.org/v2/guide/state-management.html#简单状态管理起步使用)就足够您所需了。但是，如果您需要构建一个中大型单页应用，您很可能会考虑如何更好地在组件外部管理状态，Vuex 将会成为自然而然的选择。引用 Redux 的作者 Dan Abramov 的话说就是：

> Flux 架构就像眼镜：您自会知道什么时候需要它。

```javascript
new Vue({
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
    <div>{{ count }}</div>
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
})
```

这个状态自管理应用包含以下几个部分：

- **state**，驱动应用的数据源；
- **view**，以声明方式将 **state** 映射到视图；
- **actions**，响应在 **view** 上的用户输入导致的状态变化。

以下是一个表示“单向数据流”理念的简单示意：

![image-20240628091308966](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240628091308966.png)

但是，当我们的应用遇到**多个组件共享状态**时，单向数据流的简洁性很容易被破坏：

- 多个视图依赖于同一状态。
- 来自不同视图的行为需要变更同一状态。

对于问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。对于问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

因此，我们为什么不把组件的共享状态抽取出来，以一个全局单例模式管理呢？在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！

通过定义和隔离状态管理中的各种概念并通过强制规则维持视图和状态间的独立性，我们的代码将会变得更结构化且易维护

## 安装

**直接下载 / CDN 引用**

https://unpkg.com/vuex

您也可以通过 `https://unpkg.com/vuex@2.0.0` 这样的方式指定特定的版本。

在 Vue 之后引入 `vuex` 会进行自动安装：

```html
<script src="/path/to/vue.js"></script>
<script src="/path/to/vuex.js"></script>
```

**NPM**

```javascript
npm install vuex --save
```

## Store

每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的**状态 (state)**。Vuex 和单纯的全局对象有以下两点不同：

1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交 (commit) mutation**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

安装Vuex 之后，让我们来创建一个 store。创建过程直截了当——仅需要提供一个初始 state 对象和一些 mutation：

```javascript
import Vue from 'vue'
// 导入vuex
import Vuex from 'vuex'
// 挂载vuex
Vue.use(Vuex)
// 定义一个store对象
const store = new Vuex.Store({
    // 状态
  	state: {
		count: 0
  	},
  	mutations: {
    	increment (state) {
      	state.count++
    }
  }
})
```

`方法：`

```javascript
$store.state 来获取状态对象
$store.commit 方法触发状态变更
```

示例1：

```javascript
store.commit('increment')
console.log(store.state.count) // -> 1
```

为了在 Vue 组件中访问 `this.$store` property，你需要为 Vue 实例提供创建好的 store。Vuex 提供了一个从根组件向所有子组件，以 `store` 选项的方式“注入”该 store 的机制：

```javascript
// 注入Vue实例
new Vue({
  	el: '#app',
  	store: store,
})
```

现在我们可以从组件的方法提交一个变更：

```javascript
methods: {
  increment() {
    this.$store.commit('increment')
    console.log(this.$store.state.count)
  }
}
```

再次强调，我们通过提交 mutation 的方式，而非直接改变 `store.state.count`，是因为我们想要更明确地追踪到状态的变化。这个简单的约定能够让你的意图更加明显，这样你在阅读代码的时候能更容易地解读应用内部的状态改变。此外，这样也让我们有机会去实现一些能记录每次状态改变，保存状态快照的调试工具。有了它，我们甚至可以实现如时间穿梭般的调试体验。

由于 store 中的状态是响应式的，在组件中调用 store 中的状态简单到仅需要在计算属性中返回即可。触发变化也仅仅是在组件的 methods 中提交 mutation。

# 核心概念

## State

Vuex 使用**单一状态树**——是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。单状态树和模块化并不冲突——在后面的章节里我们会讨论如何将状态和状态变更事件分布到各个子模块中。存储在 Vuex 中的数据和 Vue 实例中的 `data` 遵循相同的规则，例如状态对象必须是纯粹 (plain) 的。**参考：**[Vue#data](https://v2.cn.vuejs.org/v2/api/#data)

### 在 Vue 组件中获得 Vuex 状态

那么我们如何在 Vue 组件中展示状态呢？由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在`计算属性`中返回某个状态

```javascript
// 创建一个 Counter 组件,在组件中通过计算属性，获取VueX状态。
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return store.state.count
    }
  }
}
```

每当 `store.state.count` 变化的时候, 都会重新求取计算属性，并且触发更新相关联的 DOM。

然而，这种模式导致组件依赖全局状态单例。在模块化的构建系统中，在每个需要使用 state 的组件中需要频繁地导入，并且在测试组件时需要模拟状态。

Vuex 通过 `store` 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 `Vue.use(Vuex)`）：

```javascript
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
```

通过在根实例中注册 `store` 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store` 访问到。让我们更新下 `Counter` 的实现：

```javascript
const Counter = {
  	template: `<div>{{ count }}</div>`,
    computed: {
        count () {
            return this.$store.state.count
        }
    }
}
```

### mapState 辅助函数

当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：

```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
      //写法1
      computed: mapState({
            // 箭头函数可使代码更简练
            count: state => state.count,

            // 传字符串参数 'count' 等同于 `state => state.count`,给state中的属性名起别名
            countAlias: 'count',

            // 为了能够使用 `this` 获取局部状态，必须使用常规函数
            countPlusLocalState (state) {
              	return state.count + this.localCount
            }
      })
    // 写法2
    computed:{
    	// 对象形式，把store对象中的state中的属性名，映射到实例vc的原型VUE的上
    	// 可以通过this.count访问到
    	// 对象的名字即是计算属性的名字,函数的返回值即是计算属性的值
    	// ...代表合并
        ...mapState({
            countAlias:()=>{}
        })
    },
    // 写法3
    computed:{
        // 数组形式，把store对象中的state中的属性名，映射到实例vc的原型VUE的上，
        // 可以通过this.count访问到
        ...mapState(["count",])
    },
}
```

当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 `mapState` 传一个字符串数组。

```js
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

示例1：

```javascript
<script>
import {mapState} from "vuex";
export default {
    name:"HoloLive",
    data(){
        return{
            
        }
    },
    computed:{
        // 传统计算属性形式
        FourthGeneration(){
            return this.$store.state.FourthGeneration;
        },
        // 字符串数组形式：映射的计算属性的名称与 state 的子节点名称相同时,直接传一个字符串数组
        ...mapState(["ZeroGeneration",]),
        // 起别名形式：把store对象中的state中的属性名起别名FirstGenerationAlias，映射到实例vc的原型VUE的上

        ...mapState({
            FirstGenerationAlias: "FirstGeneration",
        }),

        // 箭头函数形式：把store对象中的state中的属性名SecondGeneration，映射到实例vc的原型VUE的上
        ...mapState({
            SecondGeneration: state => state.SecondGeneration,
            // 或这种方式，把数据直接解构出来
            SecondGeneration: ({SecondGeneration}) => SecondGeneration,
        }),

        // 普通函数形式：把store对象中的state中的属性名SecondGeneration，映射到实例vc的原型VUE的上
        ...mapState({
            ThirdGeneration(state){
                return state.ThirdGeneration
            },
        }),

        // 其他计算属性
        SumGeneration(){
            return this.FirstGenerationAlias + this.ZeroGeneration + this.SecondGeneration + this.ThirdGeneration + this.FourthGeneration;
        }
    },
    mounted(){
        console.log("HoloLive",this);
    }
}
</script>
```

### 实现mapState部分

mapState简写实现：

实现功能：

1 直接传一个字符串数组，返回一个computed对象。

2 直接传一个方法对象，返回一个computed对象

```javascript
// src->Yuluo.js
export const mapState = function(Options){
    // 定义一个对象
    const obj = {};
    // 当mapState() 传入的是一个数组 mapState([])
    if(Options instanceof Array){
        // 将数组元素作为 obj的属性名,属性值是一个函数的返回值: 实例vm中的store中的state的值。
        Options.forEach(arr => {
            obj[arr] = function(){
                return this.$store.state[arr];
            }
        })
        console.log("Welcome to yuluo!!!");
    // 当mapState() 传入的是一个对象 mapState({})
        // {
        //     SecondGeneration: (state) => state.SecondGeneration,
        // }
    }else{
        // 遍历对象,把key作为属性名，属性值。
        for(let key in Options){
            obj[key] = function(){
                // 把这个对象的属性值(函数)调用执行，并把函数的返回值返回
                return Options[key](this.$store.state);
            }
        }
    }
    
    // 把对象返回
    return obj;
}
```

```javascript
// HoloLive.vue
import {mapState} from "@/js/Yuluo";
export default {
    name:"HoloLive",
    data(){
        return{
            
        }
    },
    computed:{
        // 传统计算属性形式
        FourthGeneration(){
            return this.$store.state.FourthGeneration;
        },
        ....
    }
}
```



### 对象展开运算符

`mapState` 函数返回的是一个对象。我们如何将它与局部计算属性混合使用呢？通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 `computed` 属性。但是自从有了[对象展开运算符 (opens new window)](https://github.com/tc39/proposal-object-rest-spread)，我们可以极大地简化写法：

```js
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```

### 组件仍然保有局部状态

使用 Vuex 并不意味着你需要将**所有的**状态放入 Vuex。虽然将所有的状态放到 Vuex 会使状态变化更显式和易调试，但也会使代码变得冗长和不直观。如果有些状态严格属于单个组件，最好还是作为组件的局部状态。你应该根据你的应用开发需要进行权衡和确定。