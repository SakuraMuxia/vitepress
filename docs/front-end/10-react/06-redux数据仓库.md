# Redux

```js
在已有的东西上验证着学习
```

## 基本介绍

Redux 是 JavaScript 应用的状态容器，提供可预测的状态管理。

```shell
可以帮助你开发出行为稳定可预测的、运行于不同的环境（客户端、服务器、原生应用）、易于测试的应用程序。不仅于此，它还提供超爽的开发体验，比如有一个与时间旅行调试器相结合的实时代码编辑。

可以将 Redux 与 React 或其他视图库一起使用。它体小精悍（只有2kB，包括依赖），却有很强大的插件扩展生态。
```

### redux-toolkit

```shell
redux toolkit: 官方提供的redux工具包

作用：对数据状态进行集中式管理
```

### react-redux

```shell
在react中更方便的使用redux
```

# redux-toolkit使用

```shell
数据仓库是由切片组成的，创建切片过程
# 1. 安装redux-toolkit
npm install @reduxjs/toolkit
# 2. 导包
import {createSlice, configureStore} from '@reduxjs/toolkit'
```

## 核心概念

| 概念          | 名称           | 别称               | 数据类型        |
| ------------- | -------------- | ------------------ | --------------- |
| store         | 数据仓库       | 项目经理           | 对象            |
| slice         | 数据切片       | 子项目             | 对象            |
| reducer       | 执行者         | 程序员             | 方法            |
| action        | 动作行为       | 需求文档           | 对象            |
| actionCreator | action的创造者 | 产品经理           | reducer同名方法 |
| dispatch      | 分发           | [项目经理]指派任务 | 属性(store)     |



<img src="https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240927094726733.png"/>

## 运作过程

通俗的理解：

```shell

项目经理(store)指派(dispatch)产品经理(actionCreator)生成一个需求文档(action)；
产品经理(actionCreator)做了一个需求文档(action)；
根据需求文档(action)，由程序员(reduceer)来实现需求；
项目经理管理(store)了很多个子项目(slice)，每个子项目(slice)中都有对应的成员组成：state，reducer和actionCreator；

```

官方解释

```shell
应用的整体全局状态以对象树的方式存放于单个 store。 
唯一改变状态树（state tree）的方法是创建 action，一个描述发生了什么的对象，并将其 dispatch 给 store。
要指定状态树如何响应 action 来进行更新，你可以编写纯 reducer 函数，这些函数根据旧 state 和 action 来计算新 state
```

## 创建切片(slice)实例

### createSlice()

```js
const countSlice = createSlice()
作用：创建切片的函数

参数：
传入一个对象 对象中包含有name属性(切片名称),initialState属性(定义数据),reducers属性(执行者)
例如:

const countSlice = createSlice({
    name:'count',// name:指定切片名
    initialState:{// 切片数据
        num:99,
        msg:'atguigu'
    },
    reducers:{
        /**
         * 
         * @param {*} state  切片状态数据
         * @param {*} action {type:'count/addNum',payload:数据(actionCreator传的参数)}
         * type:'切片名/reducer方法名'
         * 每创建一个reducer方法，redux会自动帮咱们创建一个同名的方法，
         * 在切片的 actions属性上，该方法的身份是，actionCreator，
         * 例如：(const addNum = function actionCreator(){})
         * addNum,changeMsg 是每一个reducer
         */
        addNum(state, action){ 
            state.num += action.payload
        },
        changeMsg(state, action){
            state.msg += action.payload
        }
        // 附加
        // 增加购买数量
        addBuyNum(state,{payload}){ // 从action属性中结构payload
            // console.log('addBuyNum payload: ', payload)
            // 找到这个id对应的购物车商品
            let index = state.cartList.findIndex(car => car.id === payload)
            state.cartList[index].buyNum += 1
            
			// 和Vue3 reactive()函数相似
            console.log(state.cartList[index]) // 这里返回的每一个元素 是Proxy类型的对象
            
        },
    }
})

返回值：
返回一个切片对象 命名规则为: [切片名]Slice 如: counterSlice
```

## 切片实例属性

### acitons

```
countSlice.actions
作用:返回切片的所有actionCreator身份(类型)的函数(与reducer同名)
```

**使用案例**

```js
// 1. 导入 createSlice包
import {createSlice} from '@reduxjs/toolkit'

// 2. 创建切片
const countSlice = createSlice({
    name:'count',// name:指定切片名
    initialState:{// 切片数据
        num:99,
        msg:'atguigu'
    },
    reducers:{
        /**
         * 
         * @param {*} state  切片状态数据
         * @param {*} action {type:'count/addNum',payload:数据(actionCreator传的参数)}
         * type:'切片名/reducer方法名'
         * 每创建一个reducer方法，redux会自动帮咱们创建一个同名的方法，
         * 在切片的 actions属性上，该方法的身份是，actionCreator，
         * 例如：(const addNum = function actionCreator(){})
         */
        addNum(state, action){ 
            state.num += action.payload
        },
        changeMsg(state, action){
            state.msg += action.payload
        }
    }
})
console.log(countSlice.actions); // {addNum: ƒ, changeMsg: ƒ}
// 获取每个reducer对应的产品经理actionCreator
let {addNum, changeMsg} = countSlice.actions; // 此处 addNum 和 changeMsg身份都是actionCreator

// actionCreator函数，调用的结果，会返回一个 action对象 {type:'切片名/reducer名', payload:调用actionCreator传的参数}

// 调用actionCreator函数
console.log('addNum(10): ',addNum(10));// {type: 'count/addNum', payload: 10}
console.log('changeMsg("+")', changeMsg('+')); //{type: 'count/changeMsg', payload: '+'}
```

### reducer

```
countSlice.reducer
作用：返回切片实例的reducer函数
返回值：返回切片实例的reducer函数
示例：countSlice.reducer
```



## 创建仓库(store)对象

### configureStore()

```js
import {createSlice, configureStore} from '@reduxjs/toolkit'
const store = configureStore()
作用：创建仓库的函数

参数：
传入一个对象，对象中包含reducer属性，reducer中的属性值是一个对象，对象中的属性名是切片名，属性值是切片的reducer属性(本质是一个函数)

返回值：
返回一个仓库对象

示例：
const store = configureStore({
    reducer:{
        count: countSlice.reducer,
        user: userSlice.reducer
    }
})
console.log('store: ',store);
```

**使用案例**

```js
// 1. 导入 createSlice包
import {createSlice, configureStore} from '@reduxjs/toolkit'

// 2. 创建切片
const countSlice = createSlice({
    name:'count',// name:指定切片名
    initialState:{// 切片数据
        num:99,
        msg:'atguigu'
    },
    reducers:{
        addNum(state, action){ 
            state.num += action.payload
        },
        changeMsg(state, action){
            state.msg += action.payload
        }
    }
})
// 获取actionCreator
let {addNum, changeMsg} = countSlice.actions; 

const userSlice = createSlice({
    name:'user',
    initialState:{
        username:'atguigu',
        age:10
    },
    reducers:{
        addAge(state, {payload}){
            state.age += payload
        }
    }
})
// actionCreator  addAge
const {addAge} = userSlice.actions;

// 创建仓库
const store = configureStore({
    reducer:{
        count: countSlice.reducer,
        user: userSlice.reducer
    }
})
console.log('store: ',store); // {dispatch: ƒ, subscribe: ƒ, getState: ƒ, replaceReducer: ƒ, @@observable: ƒ}

// 获取仓库数据  store.getState()
console.log('store.getState(): ', store.getState()); // {count: {…}, user: {…}}
```



## 仓库对象(store)方法

### getState()

```
store.getState()
作用：获取仓库中的数据
参数是：无
返回值：返回一个对象，每个对象是由切片名和数据State组成
示例：
store.getState() // {count: {…}, user: {…}}
```

### dispatch()

只有reducer中的方法才能修改数据

```js
store.dispatch()

作用：修改切片中的数据

通俗理解：项目经理(store)分配(dispatch)一个任务给产品经理(acitonCreator)，产品经理(acitonCreator)创建一个需求(action)，将需求(action)给程序员(reducer)开发

参数:
acitonCreator身份的函数(reducer同名)
actionCreator(payload)

返回值:无返回值

语法：
store.dispatch(actionCreator(payload))

示例：
store.dispatch(addNum(3));// addNum(3) ==> {type:'count/addNum',payload:3}
```

使用案例

```js
// 1. 导入 createSlice包
import { createSlice, configureStore } from '@reduxjs/toolkit'

// 2. 创建切片
const countSlice = createSlice({
    name: 'count',// name:指定切片名
    initialState: {// 切片数据
        num: 99,
        msg: 'atguigu'
    },
    reducers: {
        addNum(state, action) {
            state.num += action.payload
        },
        changeMsg(state, action) {
            state.msg += action.payload
        }
    }
})
// 获取actionCreator
let { addNum, changeMsg } = countSlice.actions;

const userSlice = createSlice({
    name: 'user',
    initialState: {
        username: 'atguigu',
        age: 10
    },
    reducers: {
        addAge(state, { payload }) {
            state.age += payload
        }
    }
})
// actionCreator  addAge
const { addAge } = userSlice.actions;

// 创建仓库
const store = configureStore({
    reducer: {
        count: countSlice.reducer,
        user: userSlice.reducer
    }
})
console.log('store: ', store);

// 获取仓库数据  store.getState()
console.log('store.getState(): ', store.getState());

// 如何修改切片数据    只有reducer中的方法【程序员才能修改数据】
// 项目经理分配一个任务给产品经理，产品经理创建一个需求，将需求给程序员开发

store.dispatch(addNum(3));// addNum(3) ==> {type:'count/addNum',payload:3}
// 触发 count切片中的addNum函数的执行，并且将 action对象作为第二个参数传过去
// 验证
console.log(store.getState().count.num); // 102
```

### subscribe()

```js
作用：
监听store中数据的变化，当仓库数据发生修改时，会触发回调函数的执行。返回值是取消监听的函数，如果调用执行，那么就会取消监听

参数：回调函数

返回值：返回一个取消监听的函数，调用此函数则取消监听数据

示例：
const unsubscribe = store.subscribe(()=>{
    console.log('subscribe: ',store.getState());
})
// 数据发生变化
store.dispatch(addNum(5)) // 控制台输出
// 取消监听
unsubscribe();// 取消监听
```

## 仓库(store)模块化

### 目录结构

```shell
# 目录结构
src
  |- store                    redux数据仓库根目录
  |    |- index.js            创建仓库
  |    |- slice               切片目录
  |    |    |- countSlice.js  切片模块文件
```

### 使用案例

仓库入口：src/store/index.js

```js
import { configureStore } from "@reduxjs/toolkit";
import count from "./slice/countSlice";
import user from "./slice/userSlice";
console.log(count) // ƒ reducer(state, action) {}
// 创建仓库
const store = configureStore({
    reducer:{
        count,
        user
    }
})
export default store;
```

count切片：src/store/slice/countSlice.js

```js
import { createSlice } from '@reduxjs/toolkit'

// 2. 创建切片
const countSlice = createSlice({
    name: 'count',// name:指定切片名
    initialState: {// 切片数据
        num: 99,
        msg: 'atguigu'
    },
    reducers: {
        // addNum就是一个reducer
        addNum(state, action) {
            state.num += action.payload
        },
        changeMsg(state, action) {
            state.msg += action.payload
        }
    }
})
// 暴漏actionCreator
export const { addNum, changeMsg } = countSlice.actions; 
// 暴漏reducer
export default countSlice.reducer;

/**
 * 对于切片，需要暴露如下东西：
 * 1. 暴露切片中的reducer对象：默认暴露
 * 2. 暴露actionCreator       分别暴露
 */
```

user切片：src/slice/userSlice.js

```js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:'user',
    initialState:{
        username:'atguigu',
        age:10
    },
    reducers:{
        addAge(state, {payload}){
            state.age += payload
        }
    }
})
// actionCreator  addAge
export const {addAge} = userSlice.actions;
export default userSlice.reducer;
```

入口文件调用：src/index.js

```js
// 导入仓库
import store from './store'
import {addNum} from './store/slice/countSlice'
const unsubscribe = store.subscribe(()=>{
    console.log('subscribe: ',store.getState());
})
store.dispatch(addNum(5)) // 回调函数执行
store.dispatch(addNum(7))
```

# react-redux

> react-redux是一个在react中更方便的使用redux的包
>
> 原因：在react中使用redux-toolkit包时，数据更新页面并没有发生重新渲染，数据更新页面并没有更新，于是出现了react-redux包。

## 基本使用

```shell
# 安装
npm i react-redux

# 导包: src->index.js
import {Provider} from 'react-redux'

# 使用Provider组件包裹根组件,绑定store属性,把store对象传递给所有被包裹的组件可用。
<Provider store={store}>
    <App/>
</Provider>

# 导包: src->App.js
import {useSelector,useDispatch} from 'react-redux'

```

## 读取数据

### useSelector()

useSelector是`react-redux`包中的一个Hook函数

```shell
import { useSelector,useDispatch } from 'react-redux'

useSelector()
作用：获取redux中的状态数据

语法：参数是一个回调函数，回调函数的参数，就是整个仓库的数据state
	
参数：参数是一个回调函数，回调函数的参数，就是整个仓库的数据state

返回值：回调函数的返回值，就是useSelector函数的返回值

示例：
let res = useSelector(state=>{
     console.log('state: ', state);
     return state;
})
let count = useSelector(state=>state.count) // 获取count切片的数据:{num:...,msg:...}
let user = useSelector(state=>state.user);// 获取userSlice 切片的数据[name属性] userSlice 切片
let {num} = useSelector(state=>state.count);
```

## 修改数据

### useDispatch()

useDispatch()是`react-redux`包中的一个Hook函数

```shell
作用：创建一个dispatch函数，功能跟 store.dispatch一样

参数:无

返回值:无返回值

示例：
const dispatch = useDispatch();
dispatch(actionCreator(payload))
```

## 异步操作

当出现需要异步操作的方法时，需要创建异步的reducer，异步的reducer需要搭配异步的actoinCreator生成action

createAsyncThunk()是`react-redux`包中的一个Hook函数

### 操作步骤

```shell
1. 创建异步actionCreator：createAsyncThunk
2. 创建异步的reducer: extraReducers:

注意：
1. 异步操作的代码，卸载异步的 actionCreator中
2. extraReducers ==> fulfilled 分支 action.payload 值就是 异步actionCreator 成功promise的结果值。
```

1. 创建异步actionCreator：src->

```js
/**
 * 想实现异步的操作，需要有异步的产品经理[actionCreator] 和 异步的程序员
 * 
 * 异步的actionCreator：需要手动创建  createAsyncThunk 函数创建，
 * 异步的reducer： 需要配置在 extraReducers中， 【pending、fulfilled、rejected 】
 */

// 创建异步的产品经理
export const asyncAddNum = createAsyncThunk('count/addNum', async (payload) => {
    let { data } = await axios.get('https://api.github.com/search/users?q=aa')
    // console.log('data: ',data);
    return data.total_count;// 会得到一个成功的promise，成功的结果值是 total_count
    // return Promise.reject('error123123')
})

export const asyncDecNum = createAsyncThunk('count/decNum', (payload)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(payload)
        },2000)
    })
})
```

2. 创建异步的reducer：src->

```js
// 异步的程序员
extraReducers: (builder) => {
    builder
        .addCase(asyncAddNum.pending, (state, action) => {
            console.log('pending action: ', action);
        })
        // 如果是一个成功的promise，成功的结果值就是action的payload属性值
        .addCase(asyncAddNum.fulfilled, (state, action)=>{
            console.log('fulfilled action', action);
            state.num += action.payload
        })
        .addCase(asyncAddNum.rejected, (state, action)=>{
            console.log('rejected action: ', action);
        })
        .addCase(asyncDecNum.fulfilled, (state, {payload})=>{
            state.num -= payload
        })
}
```



## 小结

