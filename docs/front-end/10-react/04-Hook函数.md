# Hook函数

**Hook函数也叫做钩子函数**

```shell
# hook 函数和普通函数有什么区别
区别就在于函数名，函数名是以 use开头后面链接 首字母大写的，react就认为这个函数是hook函数

# 例如
usePosition  	hook
App Father  	函数组件
fn save        	普通函数

# hook函数使用原则
hook函数不能在类组件中使用，只能在函数组件中使用。
hook函数不能在普通函数中使用，只能在其他hook函数中使用。
hook函数数量必须是确定的。例如不能写在 if语句 或 for循环中

```

**Hook函数使用案例**

```jsx
import React, { useState } from 'react'

export default function App() {

    // Hook函数不能定义在普通函数中，报错
    // function save(){
    //     let [count, setCount] = useState(100)
    // }

    // useSave 是自定义的hook函数，内部可以使用 其他hook
    function useSave() { 
        let [count, setCount] = useState(100)
        console.log(count)
    }

    // Hook函数不确定，报错
    // if(true){
    //     let [msg, setMsg] = useState('atguigu')
    // }

    // Hook函数不确定，报错
    // for (let i = 0; i < 100; i++) {
    //     let [msg, setMsg] = useState('atguigu')
    // }

    return (
        <div>
            <button onClick={useSave}>点击</button>
        </div>
    )
}
```

## 自定义Hook

**使用自定义hook封装函数，可以简洁代码，抽离出不同组件中重复的代码。**

```js
hook函数封装：
```

主组件：src->App.jsx

```jsx
import React from 'react'
import Mea from './components/Mea'
import Aqua from './components/Aqua'

export default function App() {
  return (
    <div>
        <Mea />
        <Aqua />
    </div>
  )
}
```

子组件：src->components->Mea.jsx

```jsx
import React, { useState } from 'react'
import { useEffect } from 'react'

export default function Mea() {

    let [x, setX] = useState(110)
    let [y, setY] = useState(110)

    // componentDidMount
    useEffect(() => {
        function move(e) {
            setX(e.clientX)
            setY(e.clientY)
        }
        window.addEventListener('mousemove', move)
        // componentWillUnmount
        return () => {
            window.removeEventListener('mousemove', move)
        }
    }, [])

    return (
        <div style={{ position: 'absolute', left: x, top: y, width: 100, height: 100, border: '2px solid green',backgroundColor:'pink' }}>
            Mea
        </div>
    )
}
```

子组件：src->components->Aqua.jsx

```jsx
import React, { useState } from 'react'
import { useEffect } from 'react'

export default function Aqua() {

    let [x, setX] = useState(0)
    let [y, setY] = useState(0)

    // componentDidMount
    useEffect(() => {
        function move(e) {
            setX(e.clientX-110)
            setY(e.clientY-110)
        }
        window.addEventListener('mousemove', move)
        // componentWillUnmount
        return () => {
            window.removeEventListener('mousemove', move)
        }
    }, [])

    return (
        <div style={{ position: 'absolute', left: x, top: y,width: 100, height: 100, border: '2px solid green', backgroundColor: 'aqua' }}>
            Aqua
        </div>
    )
}
```

**使用Hook函数封装优化代码**

定义一个Hook函数：src->Hook->usePosition.js

```js
import { useEffect,useState } from 'react'
function usePosition(){
    // 设置初始值
    let [x, setX] = useState(110)
    let [y, setY] = useState(110)

    // componentDidMount
    useEffect(() => {
        function move(e) {
            setX(e.clientX)
            setY(e.clientY)
        }
        window.addEventListener('mousemove', move)
        // componentWillUnmount
        return () => {
            window.removeEventListener('mousemove', move)
        }
    }, [])

    return{
        x,
        y
    }

}
export default usePosition
```

子组件：src->components->Mea.jsx

```jsx
import React from 'react'
import usePosition from '../hook/usePosition'

export default function Mea() {

    let { x, y } = usePosition()

    return (
        <div style={{ position: 'absolute', left: x, top: y, width: 100, height: 100, border: '2px solid green',backgroundColor:'pink' }}>
            Mea
        </div>
    )
}
```

子组件：src->components->Aqua.jsx

```jsx
import React from 'react'
import usePosition from '../hook/usePosition'

export default function Aqua() {

    let{x,y} = usePosition()
    x -= 110
    y -= 110
    return (
        <div style={{ position: 'absolute', left: x, top: y,width: 100, height: 100, border: '2px solid green', backgroundColor: 'aqua' }}>
            Aqua
        </div>
    )
}
```

## 组件通信

### props通信

```jsx
父组件通过给子组件标签上设置属性,然后子组件通过this.props接收数据实现父向子传递参数;
子组件通过父组件传递一个函数,子组件通过调用方法,并把实参传递过去,从而实现子向父传递参数;

这种通信的实现缺点是:不能隔代传递参数,同时兄弟之间传递参数需要父亲作为中转。
```



### context通信

(爷-父-孙)

**通过 context组件 和 useContext Hook函数实现组件通信**

> 作用：祖先组件向任意后代组件通信

> :sparkles:**使用方法** 

```js
1. 创建context实例： const context = React.createContext()
2. 使用 context.Provider组件 包裹后代组件 ，并绑定value数据，用于传递参数
3. 后代组件获取数据
   1. 导入context实例
   2. 使用 useContext  函数，解析context对象获取数据
```

:art:**使用案例**

创建content对象：src->context->context.js

```js
// 1 导入createContext 函数
import {createContext} from 'react'
// 2 创建context对象
const context = createContext();

// 3. 将context对象暴露出去
export default context;
```

主组件：src->App.jsx

```jsx
import React, { useState } from 'react'
// 4. 导入context对象
import context from './content/context.js'
import Child from './components/Child'

export default function App() {
    let [user,setUser] = useState({
        username: 'atguigu', 
        age: 10
    })
    function changeUserName(age){
        const newUser = {
            username: 'Hanser',
            age,
        }
        setUser(newUser)
    }
    return (
        // 5. 使用Provider组件包裹 后代组件，被包裹的后代组件及其所有的子组件，都可以直接使用 value中的数据
        // value中传递一个对象,对象中可以同时传递多个属性。
        <context.Provider value={{user,changeUserName}}>
            <div>
                <h3>App</h3>
                <hr />
                <Child />
            </div>
        </context.Provider>
    )
}
```

子组件：src->Child.jsx

```jsx
import React from 'react'
import Grandson from './Grandson'
import context from '../content/content'
import { useContext } from 'react'
export default function Child() {
    // 解构content实例
    let { user } = useContext(context)
    // 渲染数据
    return (
        <div>
            <h4>Child</h4>
            <p>Child username: {user.username}</p>
            <p>Child age: {user.age}</p>
            <hr />
            <Grandson />
        </div>


    )
}
```

孙子组件：src->grandson.jsx

```jsx
import React, { useState } from 'react'
import context from '../content/content'
import { useContext } from 'react'

export default function Grandson() {
    // 解构content实例
    let { user, changeUserName } = useContext(context)
    // 定义状态
    let [age,setAge] = useState(20)
    return (
        <div>
            <h4>Grandson</h4>
            <p>Grandson username: {user.username}</p>
            <p>Grandson age: {user.age}</p>
            <p><button onClick={()=>changeUserName(45)}>更改年龄</button></p>
        </div>
    )
}
```



### pubsub通信

```shell
pub：publish 发布
sub：subscribe 订阅

# 发布消息
PubSub.publish('消息名', 数据)

# 消息的订阅,消息更新触发回调函数,发布的消息数据就会出现在回调函数的data参数中
let 消息id = PubSub.subscribe('消息名', function(msg消息名, data数据){ })

# 取消订阅
PubSub.unsubscribe(消息id)  ==> 取消该消息id 的订阅
PubSub.unsubscribe(消息名) ==> 取消该消息名所有的订阅

# 取消所有的消息
PubSub.clearAllSubscriptions()  取消所有的消息

使用方式：
1. 在组件生命周期挂载阶段 -> 订阅消息
2. 在组件生命周期即将卸载阶段 -> 取消订阅
```

```shell
# 安装pubsub
npm i pubsub-js

# 导入PubSub对象
import PubSub from 'pubsub-js'
```

**pubsub使用案例(吴亦凡蔡徐坤)**

主组件：src->App.jsx

```jsx
import React, { useState } from 'react'
import { useEffect } from 'react'
// 1. 导入PubSub
import PubSub from 'pubsub-js'

import Fan from './components/Fan'
import Kun from './components/Kun'

export default function App() {
    let [user,setUser] = useState({
        username: 'atguigu', 
        age: 10
    })
    function changeUserName(age){
        const newUser = {
            username: 'Hanser',
            age,
        }
        setUser(newUser)
    }
    useEffect(() => { // componentDidMount
        // 订阅Fan消息
        let fanId = PubSub.subscribe('fan', (msg, data) => {
            console.log('App data: ', data);
        })
        // 订阅Kun消息
        let kunId = PubSub.subscribe('kun', (msg, data) => {
            console.log('App data: ', data);
        })
        return () => { // componentWillUnmount
            PubSub.unsubscribe(fanId);// 取消订阅fan的消息
            PubSub.unsubscribe(kunId);
        }
    }, [])
    return (
        <div>
            <h3>App</h3>
            <p><button onClick={() => {
                PubSub.unsubscribe('fan');// 全网封杀fan消息
            }}>取消订阅_fan</button></p>
            <p><button onClick={() => {
                PubSub.clearAllSubscriptions();
            }}>封杀所有艺人</button></p>
            <hr />
            <Fan />
            <hr />
            <Kun />
        </div>
    )
}
```

子组件：src->components->Fan.jsx

```jsx
import React, { useState } from 'react'
import PubSub from 'pubsub-js'

export default function Fan() {
    let [song, setSong] = useState("大碗宽面")
    
    return (
        <div>
            <h3>Fan</h3>
            <button onClick={() => {
                PubSub.publish('fan', song);
            }}>发布消息</button>
        </div>
    )
}

```

子组件：src->components->Kun.jsx

```jsx
import React from 'react'
import PubSub from 'pubsub-js'
import { useEffect } from 'react'
export default function Kun() {
  return (
      <div>
          <h3>Kun</h3>
          <button onClick={() => {
              PubSub.publish('kun', '鸡你太美');
          }}>发布消息</button>
      </div>
  )
}
```

**todoList案例:使用pubsub传递数据**

```jsx
# Pubsub使用过程会产生闭包,使用setState()更改数据时，需要使用第二种方式，把缓存空间中的参数传递进去

const A = PubSub.subscribe('addTodo', B)
const B = function(){C}
const C = setTodos(D)
const D = (todos) => {return [todo, ...todos]}

A,B,C都是一个函数,A中嵌套B,B中嵌套C
C中的作用域中可以使用B中的和C中的作用域中的变量（上层作用域）
C中的todos变量是 首次组件挂载 时，todos中数据
当数据状态更新,代码重新调用,浏览器重新开辟一个执行栈,并从useState的缓存空间中获取最新的数据状态渲染。
D函数就是一个闭包，React设计时，这种方式获取的状态不是实时的，而是从它被创建的那次渲染中被「看到」的
于是需要使用一个参数接收缓存空间中的最新数据,把缓存空间中的数据赋值。

```

```js
// 使用第二种写法：把缓存空间中的todos存放，原因由于产生了闭包
原来
setTodos([todo,...todos])
改写成
setTodos(todos=>{
	return [todo,...todos]
})

原来
setTodos(todos.filter(todo=>!todo.isDone)
改写成
setTodos(todos => todos.filter(todo=>!todo.isDone))
```



## 其他Hook函数

### useCallback

> 作用：缓存一个函数，避免组件更新后，函数被重复创建
>
> 语法: useCallback(()=>{}, [])

更新组件时，函数被重新创建的图示：如下图：App函数更新调用时， addCount会被重复创建。

![image-20240924162308525](https://kano-1303231448.cos.ap-nanjing.myqcloud.com//hanser/image-20240924162308525.png)

```shell

```

```jsx
import React, { useCallback, useState } from 'react'

export default function App() {
    let [count, setCount] = useState(88)
    // 未优化前，addCount 在每一个 App() 调用执行栈中都有一份
    // const addCount = (num) => {
    //     setCount(count + num);
    // }

    /**
     * useCallback
     * 作用: 可以缓存一个函数
     */
    const addCount = useCallback((num)=>{
        // setCount(count + num); // 永远只能读取到初始值，所以需要使用如下回调函数的写法
        setCount(count=>{
            return count + num;
        })
    }, []) 
    return (
        <div>
            <p>count : {count}</p>
            <p><button onClick={() => addCount(3)}>count +</button></p>
        </div>
    )
}
```

### React.memo

> 类似于类的纯组件，当函数组件的 state 和 props没有改变的时候，不会触发重新渲染
>
> 语法：React.memo(函数组件)

使用案例

```jsx

```

### useMemo

> 作用：缓存一个函数计算的结果
>
> 语法： useMemo(函数,[监听的值])

使用案例

```jsx

```



# axios请求

Axios 是前端最流行的 ajax 请求库

```shell
基于 XMLHttpRequest(JS原生) + Promise(JS原生) 的异步的 Ajax 请求库

react项目中使用axios发送ajax请求
```

```shell
# 如果是首屏数据渲染
发送请求的位置 ==> componentDidMount

# 如果是用户交互
用户点击了一个按钮、用户做了xxx操作
```

## 创建axios实例

创建axios实例（request对象）,设置axios请求的请求配置项

```shell
# request 是一个简化版的 axios对象，没有cancelToken、all方法
const request = axios.create({
    baseURL:'xxxx.com:8080',
    timeout:20000
})
```

## 请求默认全局配置

```shell
每次发送请求设置的配置项
# 设置默认路径 baseURL 属性
axios.defaults.baseURL = 'xxx.com:8080'
# 设置超时时间 baseURL 属性
axios.defaults.timeout = 5000
```

> defaults属性是基础路径配置，只能配置一个基础路径
>
> create() 方法可以创建多个request对象，配置多个基础路径

## 发送请求Api

使用axios（或axios的实例:request）发送请求有两种写法

> request 是一个简化版的 axios对象，没有cancelToken、all方法

```
axios(request)函数式用法
axios(request)对象式用法
```

axios（或axios的实例:request）函数式用法

```shell
# axios函数式用法：
语法：
axios(config)
config:{
    method			请求方式:  get 、post、patch、put、delete
    url				请求地址
    headers			请求头
    params			query参数
    data			请求体
    cancelToken		取消请求
    timeout			请求超时
}
```

axios（或axios的实例:request）对象式用法

```shell
# axios对象式用法：按照请求方式分成两类 [,config] 代表可选参数 空或者一个config对象
get、delete
    axios.get(url,[,config])
    axios.delete(url,[,config])
post、put、patch
    axios.post(url,data,[,config])
    axios.put(url,data,[,config])
    axios.patch(url,data,[,config])
```

**axios（或axios的实例:request）使用案例：两种写法**

```shell
# axios函数式用法
axios({
    method:'get',
    url:'zyx.com',
    params:{
        a:1,
        b:2
    }
})
axios({
    method:'post',
    url:'zyx.com',
    data:{
        username:'zyx',
        age:20
    }
})
# axios对象式用法
axios.get('/api/getDate',config)
```

## 设置拦截器

**请求拦截器**

```shell
在请求头里可以携带公共的参数 token
开启loading效果 NProgress
 	安装 
 		npm i nprogress
 	导入nprogress 
 		import NProgress from 'nprogress'
		import 'nprogress/nprogress.css'
```

```js
const request = axios.create({
    baseURL:'http://localhost:8080',
    timeout:2000
})

request.interceptors.request.use(config=>{
    // 1. 公共请求参数在请求头的携带，此处以token举例
    let token = localStorage.getItem('token');
    if(token){
        config.headers.token = token;
    }
    // 2. 开启loading效果
    NProgress.start();
    return config;
})
```

**响应拦截器**

```shell
关闭loading
简化响应数据
进行token鉴权，重定向到 登录页面
进行统一错误处理
```

```js
const request = axios.create({
    baseURL:'http://localhost:8080',
    timeout:2000
})
request.interceptors.response.use(response=>{
    // token鉴权，重定向处理
    if(response.statusCode === 401){ // 说明token过期或token异常
        // 重定向到login页面重新登录重新生成token
        // 清除掉本地存储的token
        localStorage.removeItem('token');
        //
        location.href = '/login.html'// 重定向到登录页
    }
    NProgress.done();// 关闭loading
    return response.data;// 简化响应数据
},error=>{
    // 进行统一错误处理
    console.log("error：",error);
    // 阻止promise链条向下传递
    return new Promise(()=>{})
})
```

**axios使用案例:项目中使用**

```js
1. 在src/request目录中对 axios对象设置请求配置项
2. 使用配置后的request对象发送ajax请求
```

1. 封装request请求对象：src/request/index.js

```js
// 做axios的基本配置：baseURL timeout  请求和响应拦截器
import axios from 'axios'
// 1. 安装nprogress  npm i nprogress
// 2. 导入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const request = axios.create({
    baseURL:'https://api.github.com',
    timeout:2000
})

// 配置请求拦截器
request.interceptors.request.use(config=>{
    // 1. 请求头中携带公共参数 token
    // 2. 开启loading效果
    NProgress.start()
    return config;
})

// 配置响应拦截器
request.interceptors.response.use(response=>{
    // 1. 关闭loading
    NProgress.done()
    // 2. 简化服务器数据
    return response.data;
})

export default request; // 将配置好的axios暴露
```

2. 在组件中使用请求配置对象发送请求：src->App.jsx

```jsx
import React, { useState } from 'react'
// 导入配置号的request
import request from './request'
export default function App() {
    let [count, setCount] = useState(100);
    return (
        <div>
            <p>count: {count}</p>
            <p><button onClick={async () => {
                let res = await request.get('/search/users', {
                    params: {
                        q: 'aa'
                    }
                })
                let totalCount = res.total_count
                console.log(totalCount);
                setCount(count + totalCount);

            }}>count+</button></p>
        </div>
    )
}
```

**axios使用案例:axios-repo案例**

```shell
学习目标及知识点：

1. request.js， 封装axios基础配置
2. useEffect的回调函数不能使用async直接修饰，需要单独定义async函数，手动调用
3. loading 条件渲染
```

1. 封装request请求对象：src/request/index.js

```js
// 做axios的基本配置：baseURL timeout  请求和响应拦截器
import axios from 'axios'
// 1. 安装nprogress  npm i nprogress
// 2. 导入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const request = axios.create({
    baseURL:'https://api.github.com',
    timeout:2000
})

// 配置请求拦截器
request.interceptors.request.use(config=>{
    // 1. 请求头中携带公共参数 token
    // 2. 开启loading效果
    NProgress.start()
    return config;
})

// 配置响应拦截器
request.interceptors.response.use(response=>{
    // 1. 关闭loading
    NProgress.done()
    // 2. 简化服务器数据
    return response.data;
})

export default request; // 将配置好的axios暴露
```

2. 在组件中使用请求配置对象发送请求：src->App.jsx

```jsx
import React, { useEffect, useState } from 'react'
import request from './request';

export default function App() {
    let [loading, setLoading] = useState(false);// 请求加载中的标识符
    let [repo, setRepo] = useState({});  // undefined.html_url
    // componentDidMount
    useEffect( () => { // useEffect中 的回调不能直接写 async， 需要单独定义async函数，在手动调用
        // 定义函数
        async function main(){
            // 开启loading
            setLoading(true);
            let {items} = await request.get('/search/repositories', {
                params: {
                    q: 'vue',
                    sort: 'stars'
                }
            })
            // 设置仓库状态
            setRepo(items[0])
            setLoading(false);
        }
        // 调用函数
        main()
    }, [])
    return (
        <div>
            {loading ? <h1>loading.....</h1> : <div>most star repo is <a href={repo.html_url}>{repo.name}</a></div>}
        </div>
    )
}
```

## 发送请求思路

```js
1. 查看api接口地址：【请求方式、url、请求的参数、响应内容】
   请求参数：
   1-1. query参数： 			axios.get(url, {params:{query参数}})
   1-2. path[params]参数: 	axios.get('url/1/3')后端是有占位符的
   1-3. 请求体参数body
   		- get/delete: 		 axios.get(url,{data:请求体参数})
   		- post、put、patch:   axios.post(url, 请求体参数对象)

2. 封装api 请求的函数【使用该函数向api接口地址发送请求或取数据】
   请求函数返回的都是Promise对象

3. 调用api函数获取数据
   3-1. 在生命周期钩子中调用【首屏数据渲染】，一般是componentDidMount
   3-2. 用户交互调用：用户点击了一个按钮、用户做了xxx操作

4. 用请求回来的数据渲染页面：
   4-1. 定义响应状态，使用插值语法渲染
```

## 使用案例

**github获取用户数据案例**

封装request请求对象：src/request/index.js

```js
// 做axios的基本配置：baseURL timeout  请求和响应拦截器
import axios from 'axios'
// 1. 安装nprogress  npm i nprogress
// 2. 导入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const request = axios.create({
    baseURL:'https://api.github.com',
    timeout:2000
})

// 配置请求拦截器
request.interceptors.request.use(config=>{
    // 1. 请求头中携带公共参数 token
    // 2. 开启loading效果
    NProgress.start()
    return config;
})

// 配置响应拦截器
request.interceptors.response.use(response=>{
    // 1. 关闭loading
    NProgress.done()
    // 2. 简化服务器数据
    return response.data;
})
export default request; // 将配置好的axios暴露
```

封装api接口请求对象：src/api/github.js

```js
/**
 * 封装所有的github相关的请求函数
 * 
 */
import request from '../request'
/**
 * 
 * @param {*} keyword  关键字
 * @param {*} sortType  排序方式
 * @returns Promise对象
 * 
 */
export function getRepo(keyword, sortType='stars'){
    return request.get('/search/repositories',{
        params:{
            q:keyword,
            sort:sortType
        }
    })
}
```

在组件中调用api请求发送请求：src->App.jsx

```jsx
import React, { useEffect, useState } from 'react'
import { getRepo } from './api/github';
export default function App() {
    useEffect(()=>{// componentDidMount
        async function main(){
            // 发送请求之前开启 loading
            setLoading(true);
            let res = await getRepo('vue')
            console.log('res: ', res);
            // 设置状态
            setRepo(res.items[0])
            // 请求结果回来之后，关闭loading
            setLoading(false);
        }
        main();
    },[])
    // 定义状态
    let [repo, setRepo] = useState({});
    // 定义一个条件渲染的状态
    let [loading, setLoading] = useState(false);

    
    // 也可以在这里拦截，实现条件渲染
    // if (loading) {
    //     return <h1>Loadding...</h1>
    // }
    
    return (
        <div>
            {loading ? <h1>loading....</h1> : <div>most stars repo is <a href={repo.html_url}>{repo.name}</a></div>}
        </div>
    )
}
```

**github获取用户案例**

引入Bootstrap：public->index.html

```html
<title>React App</title>
<link rel="stylesheet" href="/css/bootstrap.css">
```

主组件：src->App.jsx

```jsx
import React from 'react'
import './App.css'
import Header from './components/Header'
import Main from './components/Main'

export default function App() {
    return (
        <div className="container">
            <Header />
            <Main />
        </div>
    )
}
```

样式文件：src->App.css

```css
.card {
    float: left;
    width: 33.333%;
    padding: .75rem;
    margin-bottom: 2rem;
    border: 1px solid #efefef;
    text-align: center;
}

.card>img {
    margin-bottom: .75rem;
    border-radius: 100px;
}

.card-text {
    font-size: 85%;
}
```

子组件：src->components->Header.jsx

```jsx
import React from 'react'
import PubSub from 'pubsub-js'
import { useRef } from 'react'

export default function Header() {
    const inputRef = useRef();

    return (
        <section className="jumbotron">
            <h3 className="jumbotron-heading">Search Github Users</h3>
            <div>
                <input ref={inputRef} type="text" placeholder="请输入用户名" />
                <button onClick={() => {
                    // 1. 获取input文本框的输入
                    // 2. 将username数据 传递给兄弟组件 Main
                    let username = inputRef.current.value.trim()
                    // 发布消息
                    PubSub.publish('search', username);
                }}>Search</button>
            </div>
        </section>
    )
}
```

子组件：src->components->Item.jsx

```jsx
import React from 'react'

export default function Item({user}) {

    return (
        <div className="card" key={user.id}>
            <a href={user.html_url} target="_blank" rel="noreferrer">
                <img src={user.avatar_url} alt="" style={{ width: 100 }} />
            </a>
            <p className="card-text">{user.login}</p>
        </div>
    )
}
```

子组件：src->components->Main.jsx

```jsx
import React from 'react'
import PubSub from 'pubsub-js'
import { getUsers } from '../api/github'
import { useEffect,useState } from 'react'
import Item from './Item'
export default function Main() {
    // 定义状态
    let [users, setUsers] = useState([]) // 防止undefined
    let [loading, setLoading] = useState(false);
    let [first, setFirst] = useState(true);// 是否是第一次进入该页面
    useEffect(()=>{
        // 订阅消息
        PubSub.subscribe('search',async (msg,data)=>{
            // 判断first是否第一次
            first && setFirst(false)
            // 设置加载状态
            setLoading(true)
            // 发送请求,接收数据
            console.log(data)
            let {items} = await getUsers(data)
            console.log(items)
            // 设置数据状态
            setUsers(items)
            setLoading(false);
        })
    },[])


    // 首次提示渲染
    if (first) {
        return <h4>请输入用户名搜索</h4>
    }
    // 加载中渲染
    if (loading) {
        return <h1>Loading.....</h1>
    }

    return (
        <div className="row">
            {users.map(user=>(
                <Item user={user} key={user.id}/>
            ))}
        </div>
        
    )
}

```

封装axios实例：src->request->github.js

```js
import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const request = axios.create({
    baseURL: 'https://api.github.com',
    timeout: 2000
})

// 配置请求拦截器
request.interceptors.request.use(config => {
    // 1. 请求头中携带公共参数 token
    // 2. 开启loading效果
    NProgress.start()
    return config;
})

// 配置响应拦截器
request.interceptors.response.use(response => {
    // 1. 关闭loading
    NProgress.done()
    // 2. 简化服务器数据
    return response.data;
})

export default request; // 将配置好的axios暴露
```

封装api请求：src->api->github.js

```js
/**
 * 封装所有的github相关的请求函数
 * 
 */
import githubReq from '../request/github'

/**
 * 
 * @param {*} keyword  关键字
 * @param {*} sortType  排序方式
 * @returns Promise对象
 * 
 */

export function getRepositories(keyword, sortType ='stars'){
    return githubReq.get('/search/repositories',{
        params: {
            q: keyword,
            sort: sortType
        }
    })
}

export function getUsers(username){
    return githubReq.get('/search/users', {
        params: {
            q: username
        }
    })
}
```

