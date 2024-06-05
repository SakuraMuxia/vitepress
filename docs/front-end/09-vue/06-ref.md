# 处理边界情况

ref是Vue实例vm的property

## 访问元素 & 组件

### 访问根实例

### 访问父级组件实例



### 访问子组件实例或子元素

尽管存在 prop 和事件，有的时候你仍可能需要在 JavaScript 里直接访问一个子组件。

#### vm.ref 方法

返回一个对象，这个对象包含注册过 [`ref` attribute](https://v2.cn.vuejs.org/v2/api/#ref) 的所有 DOM 元素和组件实例。

```javascript
表达式的值：string

1 ref 被用来给元素或子组件注册引用信息。
2 引用信息将会注册在父组件的 $refs 对象上。=== vm.$refs也可以访问
3 如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；
4 如果用在子组件上，引用就指向组件实例：
5 没有设置ref属性时，对象为空
```

```javascript
Vue()实例vm.refs()返回一个对象 
{ref名:对应标签,...}
{inp:input,my:div,btn:button,base:VueComponent}

//html
<div id="app">
    <input type="text" ref="inp">
    <div ref="my">my</div>
    <button ref="btn" @click="fn">点我</button> 
    <base-input ref="base"></base-input>
</div>
 
 
//Vue实例
new Vue({
    methods:{
        fn(e){
        // <button></button>
        console.log('通过event获取DOM对象',e.target);  
        // <button></button>
        console.log('通过document获取DOM对象',document.querySelector("button"));
        // Vue()实例vm
        console.log('this指向',this); 
        // Vue()实例vm.refs()返回一个对象 {ref名:对应标签,...}
        console.log('$ref获取DOM对象',this.$refs);
        // <button></button>
        console.log('通过$ref方法获取DOM对象',this.$refs.btn);
        // value的值
        console.log('通过$ref方法获取DOM对象属性值',this.$refs.inp.value)
	 }
   },
})
```

#### ref和v-for

当 `ref` 和 `v-for` 一起使用的时候，你得到的 ref 将会是一个包含了对应数据源的这些子组件的数组。

```html
// html
<div id="app">
    <ul>
        <li ref="hololive" v-for="arr in arrs" :key="arr">{{arr}}</li>
    </ul>
</div>
```

```javascript
// script
new Vue({
    el:'#app',
    data:{
        arrs:["Minato Aqua","Shirakami Fubuki","Nakiri Ayame","Akai Haato"],
    },
    methods:{
    },
    mounted(){
        // 选择遍历后的第一个元素 li
        console.log(this.$refs.hololive[0])
    }
```

> `$refs` 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 `$refs`。

#### ref和组件

子组件上的ref引用信息将会注册在父组件的 $refs 对象上。=== vm.$refs也可以访问

```javascript
Vue.component("hanser",{
   data(){
      return{
          num:1
      }
  },
  template:(`
  <button @click="num++">{{num}}</button>
  `),
})

new Vue({
    el:'#app',
    data:{
        arrs:["Minato Aqua","Shirakami Fubuki","Nakiri Ayame","Akai Haato"],
    },
    methods:{
        fn(){
            this.$refs.hanserRef.num++;
            console.log(this); // vm.$ref() 返回{hanserRef:VueComponent}
        },
    },
})

```

```html
<div id="app">
    <button @click="fn">父点击</button>
    <hanser ref="hanserRef" ></hanser>
</div>
```

