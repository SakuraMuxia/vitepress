# Redux数据仓库

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

## redux-toolkit使用

```shell
数据仓库是由切片组成的，创建切片过程
# 1. 安装redux-toolkit
npm install @reduxjs/toolkit
# 2. 导包
import {createSlice, configureStore} from '@reduxjs/toolkit'
```

### 核心概念

| 概念          | 名称           | 别称               | 数据类型        |
| ------------- | -------------- | ------------------ | --------------- |
| store         | 数据仓库       | 项目经理           | 对象            |
| slice         | 数据切片       | 子项目             | 对象            |
| reducer       | 执行者         | 程序员             | 方法            |
| action        | 动作行为       | 需求文档           | 对象            |
| actionCreator | action的创造者 | 产品经理           | reducer同名方法 |
| dispatch      | 分发           | [项目经理]指派任务 | 属性(store)     |



<img src="https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240927094726733.png"/>

### 运作过程

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

### 创建切片(slice)实例

#### createSlice()创建实例

```js
const countSlice = createSlice()
作用：创建切片的函数

参数：
传入一个对象 对象中包含有name属性(切片名称),initialState属性(定义数据state),reducers属性(执行者)
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
        addBuyNum(state,{payload}){ // 从action属性中解构出payload
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

### 切片实例属性

#### acitons

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
console.log(countSlice)// 是一个对象
// {name: 'count', actions: {…}, caseReducers: {…}, reducer: ƒ, getInitialState: ƒ, …}
// 把reducer暴漏出去
export default countSlice.reducer
// 把actionCreator暴漏出去
export const { addNum, decNum } = countSlice.actions;

// 调用actionCreator函数
console.log('addNum(10): ',addNum(10));// {type: 'count/addNum', payload: 10}
console.log('changeMsg("+")', changeMsg('+')); //{type: 'count/changeMsg', payload: '+'}
```

#### reducer

```
countSlice.reducer
作用：返回切片实例的reducer函数
返回值：返回切片实例的reducer函数
示例：countSlice.reducer
```



### 创建仓库(store)对象

#### configureStore()

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



### 仓库对象(store)方法

#### getState()获取

```shell
store.getState()
作用：获取仓库中的数据
参数是：无
返回值：返回一个对象，每个对象是由切片名和数据State组成
示例：
store.getState() // {count: { … }, user: { … }}
```

#### dispatch()修改

**只有reducer中的方法才能修改数据**

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

**使用案例**

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

#### subscribe()监听

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

### 仓库(store)模块化

#### 目录结构

```shell
# 目录结构
src
  |- store                    redux数据仓库根目录
  |    |- index.js            创建仓库
  |    |- slice               切片目录
  |    |    |- countSlice.js  切片模块文件
```

#### 使用案例

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

console.log(countSlice) // 是一个对象
// {name: 'count', actions: {…}, caseReducers: {…}, reducer: ƒ, getInitialState: ƒ, …}
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

## react-redux使用

> react-redux是一个在react中更方便的使用redux的包
>
> 原因：在react中使用redux-toolkit包时，数据更新页面并没有发生重新渲染，数据更新页面并没有更新，于是出现了react-redux包。

### 基本使用

#### Provider

使用Provider组件包裹根组件,绑定store属性,把store对象传递给所有被包裹的组件可用。

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

### 读取数据

#### useSelector()获取

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

### 修改数据

#### useDispatch()修改

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

createAsyncThunk()是`react-redux`包中的一个Hook函数，用于创建异步的actionCreator（异步的需要手动创建，同步的自动创建）

### 操作步骤

```shell
1. 创建异步actionCreator：createAsyncThunk
2. 创建异步的reducer: extraReducers:

注意：
1. 异步操作的代码，写在异步的 actionCreator中
2. extraReducers ==> fulfilled 分支 action.payload 值就是 异步actionCreator 成功promise的结果值。
```

```shell
createAsyncThunk() 
createAsyncThunk 是一个高阶函数，接收两个参数，其中一个参数是一个promise对象，返回值是一个actionCreator函数
作用：返回一个异步的actionCreator函数
参数：
第一个参数是'切片名/异步程序员名',可以随意起名
第二个参数是一个回调函数：回调函数中的参数是 异步actionCreator调用后返回的action对象中的payload。
(第一个参数可以随便写，但是基于同步的action的结构，也按照同步的写)
返回值：返回一个异步的actionCreator函数
```

1. 创建异步actionCreator：

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
    // 回调函数返回一个成功的promise对象，成功的结果值是 total_count
    // 这个promise对象作为 createAsyncThunk() 函数的一个参数
    return data.total_count;
    
    // 回调函数返回一个失败的promise
    return Promise.reject('error123123')
})

// ƒ actionCreator(arg) {}, asyncAddNum是一个actionCreator函数
console.log(asyncAddNum) 

// 减操作 回调函数两秒后返回一个成功的promise，成功的返回值是传过来的payload
export const asyncDecNum = createAsyncThunk('count/decNum', (payload)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(payload)
        },2000)
    })
})
```

2. 创建异步的reducer：这里执行的还是同步的代码，只不过他是接收异步actionCreator三个分支（pending，fulfilled，reject）进行处理。

```js
// 异步的程序员
extraReducers: (builder) => {
    builder
    	// 调用 asyncAddNum() (异步产品经理) ,返回一个 action对象
        // {type:'count/addNum/pending',payload:undefined,meta:{...}}
    
    	// 监听  asyncAddNum 对象的pending状态
    	// addCase()方法：接收两个参数
    	// 第一个参数是 asyncAddNum 对象的状态,
    	// 第二个参数是 一个回调函数
    	// 回调函数中的第一个参数是 数据状态，第二个参数是 action对象
        .addCase(asyncAddNum.pending, (state, action) => {
            console.log('pending action: ', action);
        })
        // 如果是一个成功的promise，成功的结果值return的total_count会传给action对象中的payload属性值
        .addCase(asyncAddNum.fulfilled, (state, action)=>{
            console.log('fulfilled action', action);
            state.num += action.payload
        })
    	// 如果是一个失败的promise，失败的结果值return的Promise.reject('error123123')在action对象中的error对象中的message属性中
        .addCase(asyncAddNum.rejected, (state, action)=>{
            console.log('rejected action: ', action);
        })
    
    	// 创建减操作成功的异步reducer
        .addCase(asyncDecNum.fulfilled, (state, {payload})=>{
            state.num -= payload
        })
}
```

3. 调用 App.jsx

```jsx
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNum, decNum,asyncAddNum } from './store/slice/countSlice'
export default function App() {
    // 获取数据
    let { num } = useSelector(state => state.count)
    const dispatch = useDispatch()
    return (
        <div>

            <p>num: {num}</p>

            {/* 调用同步的reducer */}
            <p><button onClick={() => {
                dispatch(addNum(3))
            }}>num ++</button></p>

            <p><button onClick={() => {
                dispatch(decNum(5))
            }}>num--</button></p>

            <hr />

            {/* 调用异步的reducer */}
            <p><button onClick={() => {
                dispatch(asyncAddNum(10))
            }}>异步的 addNum</button></p>


        </div>
    )
}
```



### 修改数据

使用 dispatch 调用异步的actionCreator

```shell
const dispatch = useDispatch()
# 这里的payload参数会作为 action对象中meta对象中的arg属性 
# {type:'count/addNum/pending',payload:undefined,meta:{...}}
dispatch(异步的actionCreator(payload))
```

### 使用案例

src->App.jsx

```jsx
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNum, decNum,asyncAddNum,asyncDecNum } from './store/slice/countSlice'
export default function App() {
    // 获取数据
    let { num } = useSelector(state => state.count)
    const dispatch = useDispatch()
    return (
        <div>

            <p>num: {num}</p>

            {/* 调用同步的reducer */}
            <p><button onClick={() => {
                dispatch(addNum(3))
            }}>同步的加</button></p>

            <p><button onClick={() => {
                dispatch(decNum(5))
            }}>同步的减</button></p>

            <hr />

            {/* 调用异步的reducer */}
            <p><button onClick={() => {
                dispatch(asyncAddNum(10))
            }}>异步的加</button></p>

            <p><button onClick={() => {
                dispatch(asyncDecNum(9));
            }}>异步的减</button></p>

        </div>
    )
}
```

src->store->index.js

```js
import { configureStore } from "@reduxjs/toolkit";
import count from './slice/countSlice'

const store = configureStore({
    reducer: {
        count
    }
})
export default store;
```

src->strore->countSlice.js

```js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const countSlice = createSlice({
    name:'count',
    initialState:{
        num:88
    },
    // 同步的reducer
    reducers:{
        // 加操作
        addNum(state,{payload}){
            state.num += payload
        },
        // 减操作
        decNum(state,{payload}){
            state.num -= payload
        }
    },
    // 异步reducer
    extraReducers: (builder)=>{
        builder
            .addCase(asyncAddNum.pending,(state,action)=>{
                console.log('pending action: ', action);
            })
            // action对象的payload属性接收成功的PromiseResult值
            .addCase(asyncAddNum.fulfilled, (state, action) => {
                console.log('fulfilled action', action);
                state.num += action.payload
            })
            .addCase(asyncAddNum.rejected, (state, action) => {
                console.log('rejected action: ', action);
            })
            // 减操作 异步
            .addCase(asyncDecNum.fulfilled,(state,action)=>{
                state.num -= action.payload
            })
    }
    

})

// 暴漏同步actionCreator
export const { addNum,decNum } = countSlice.actions

// 暴漏异步加操作的actionCreator
export const asyncAddNum = createAsyncThunk('count/addNum',async (payload)=>{
    // 发送异步请求，获取数据
    let { data } = await axios.get('https://api.github.com/search/users?q=aa')
    // 回调函数返回成功promise
    return data.total_count;
    // 回调函数返回失败的promise
    return Promise.reject("bad request")
})
// 暴漏异步减操作的actionCreator
export const asyncDecNum = createAsyncThunk('count/decNum', (payload) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve() 中的参数作为成功Promise对象中 PromiseResult
            // 这个Result会作为actionCreator调用后返回的action对象中的payload属性值
            resolve(payload)
        }, 2000)
    })
})
// 暴漏默认reducer
export default countSlice.reducer
```

## 小结

### reduxjs/toolkit使用

1. store仓库入口文件：src->store->index.js

```js
const store = configureStore({
 reducer:{
     count
 }
})
```

2. 创建切片slice：src->slice->countSlice.js

```js
const countSlice = createSlice({
    name:'',		// name
    initialState:{ 	// 数据状态state
        
    },
    
    reducers:{		// 同步的reducer
        
    },
    				// 同步的actionCreator redux帮咱们创建在了切片的actions属性上
    
    extraReducers: (builder)=>{
        builder		// 异步reducer
            .addCase(asyncAddNum.pending,(state,action)=>{
                
            })
            
            .addCase(asyncAddNum.fulfilled, (state, action) => {
                
            })
            .addCase(asyncAddNum.rejected, (state, action) => {
                console.log('rejected action: ', action);
            })
    }
    				
    
})

// 定义异步的actionCreator
const asyncAddNum = createAsyncThunk('count/addNum',async (payload)=>{
    return 
})

// 分别暴露同步的actionCreator
export const { addNum,decNum } = countSlice.actions

// 分别暴露异步的actionCreator
export {asyncAddNum}

// 暴漏默认reducer
export default countSlice.reducer
```

### react-redux使用

```js
1. Provider: 包裹根组件 绑定store
2. useSelector: 获取状态数据
3. useDispatch：创建dispatch函数

修改状态数据：

1. 同步： dispatch(同步actionCreator(payload))
2. 异步：dispatch(异步的actionCreator(payload))
```

