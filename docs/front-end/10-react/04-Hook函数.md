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

#### useContext

> :sparkles:在接收context传递数据的组件中，使用useContext快速拿到数据

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
> 优化函数组件中堆内存重复创建问题
>
> 语法: useCallback(()=>{}, [])
>
> 参数：参数是一个回调函数和一个空数组，回调函数执行逻辑代码
>
> 用法如同 useEffect()，回调函数中的第二个参数空数组代表只在挂载的时候执行一次，更新时不执行。

更新组件时，函数被重新创建的图示：如下图：App函数更新调用时， addCount会被重复创建。

![image-20240924162308525](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240924162308525.png)

```shell
App函数组件的执行过程：
App函数是一个函数，是一个引用类型，

1. 在window作用域中定义一个函数组件App，数据类型是引用数据类型，浏览器会开辟一个堆内存xxxfff111;
2. 堆内存中会存放着App函数代码(以字符串的形式存放),并产生一个内存地址xxxfff111;
3. App函数名对应的是一个内存地址:xxxfff111,指向堆内存
4. 第一次运行App函数组件时,内存会开辟一个调用执行栈的内存空间,会把App函数代码从堆内存中取出来按顺序执行
5. 当执行useState(88)时,useState Hook函数会开辟一个缓存空间,把88存入，
6. 同时setCount也是一个函数，也会开辟一个堆内存存放setCount的代码
7. 执行到 const addCount...时这也是一个函数,也会开辟一个堆内存存放addCount的代码
8. 当触发了数据更新,数据发生改变,App组件重新渲染,默认情况下会重新开辟空间放置一样的堆内存代码,造成了性能浪费
9. 于是通过useCallback Hook函数缓存函数，这样每次重新渲染，react就可以从缓存中读取代码不需要重新开辟空间存放。
10. 但是需要注意 useCallback(()=>{}) 这种形式产生了闭包,结合react的特性,永远只能读取到初始值
11. 所以需要使用useState的第二种修改数据方法：通过回调函数的形式；
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

> 类似于类的纯组件，优化当函数组件的 state 和 props没有改变的时候，不会触发重新渲染
>
> 语法：React.memo(函数组件)

**使用案例**

主组件：src->App.jsx

```jsx
import React, { Component,PureComponent } from 'react'
import Hanser from './components/Hanser';

export default class App extends PureComponent {
    state = {
        count: 88
    }
    render() {
        console.log('App render');
        let { count } = this.state;
        return (
            <div>
                <h3>App</h3>
                <p>App state count: {count}</p>
                <p><button onClick={() => {
                    this.setState({
                        count: count + 1
                    })
                }}>count ++</button></p>
                <p><button onClick={() => {
                    this.setState({
                        count: 99
                    })
                }}>count == 99</button></p>
                <hr />
                <Hanser count={count} />
            </div>
        )
    }
}
```

子组件：src->components->Hanser.jsx

```jsx
import React, { useState } from 'react'
/**
 * 函数组件：state已经做过优化了， 当状态不变时，只多渲染一次
 *           props没有优化，外部数据不改变的时候，也会重新render
 * 
 * React.memo: 作用：函数组件 state 和 props 不发生改变的时候，不会触发重新render
 */
function Hanser({ count }) {
    console.log('Hanser render');
    let [money, setMoney] = useState(88)
    return (
        <div>
            <h3>Hanser</h3>
            <p>Hanser state money: {money}</p>
            <p>Hanser props count: {count}</p>
            <p><button onClick={() => {
                setMoney(money + 100)

            }}>money++</button></p>

            <p><button onClick={() => {
                setMoney(10000)
            }}>money == 10000</button></p>
        </div>
    )

}

export default React.memo(Hanser)
```

### useMemo

> 作用：缓存一个函数计算的结果，优化函数组件中重新渲染时无关方法重复执行问题
>
> 语法： useMemo(逻辑代码,[监听的值])
>
> 使用方法如同 useEffect() Hook函数 update+mounted

**使用案例**

App.jsx

```jsx
import React from 'react'
import WithMemo from './components/WithMemo'
import WithoutMemo from './components/WithoutMemo'

export default function App() {
    return (
        <div>
            <h3>without memo</h3>
            <WithoutMemo/>
            <h3>With memo</h3>
            <WithMemo/>
        </div>
    )
}
```

WithMemo.jsx

```jsx
import { useMemo, useState } from "react";

/**
 * useMemo 缓存一个函数计算的结果
 * @returns 
 */
export default function WithMemo() {
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');
    const expensive = useMemo(() => {
        console.log('compute');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) {
            sum += i;
        }
        return sum;
    }, [count]);

    return <div>
        <h4>{count}-{expensive}</h4>
        {val}
        <div>
            <button onClick={() => setCount(count + 1)}>+c1</button>
            <input value={val} onChange={event => setValue(event.target.value)} />
        </div>
    </div>;
}
```

WithoutMemo.jsx

```jsx
// 使用前
import React, { useState } from 'react';

export default function WithoutMemo() {
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');

    function expensive() { // expensive 昂贵的
        console.log('compute');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) {
            sum += i;
        }
        return sum;
    }

    return <div>
        <h4>{count}-{val}-{expensive()}</h4>
        <div>
            <button onClick={() => setCount(count + 1)}>+c1</button>
            <input value={val} onChange={event => setValue(event.target.value)} />
        </div>
    </div>;
}
```

### useReducer

> 作用：组件中有大量数据,使用useState,略显繁琐,使用useReducer更方便的管理数据

> 语法：类似于简化版的redux
>
> 参数：
>
> ​	第一个参数是 reducer函数，
>
> ​	第二个参数是数据 initalState
>
> 返回值：返回一个数组，从数组中解构出 数据状态和dispatch函数，通过调用dispatch函数来执行reducer中的方法。

```js
使用方法如同 redux
let [state,dispatch] = useReducer(reducer, initalState) //arr对象为 [{…}, ƒ]

定义reducer函数
function reducer(state,action){
    switch(action.type){
        case '方法名':{
            return{
                ...state,
                num:state.num + action.payload
            }
        }
        ...
    }
}

调用dispatch(),参数是一个action对象(需要手动定义,区别于redux,redux自动创建)
dispatch({type:'方法名',payload:3})
```

**使用示例：**

src->App.jsx

```jsx
import React from 'react'
import { useReducer } from 'react'

const initalState = {
    num: 88,
    msg: 'atguigu'
}
function reducer(state, action) {
    switch (action.type) {
        case 'addNum':
            return {
                ...state,
                num: state.num + action.payload
            }
        case 'decNum':
            return {
                ...state,
                num: state.num - action.payload
            }
    }
}
export default function App() {
    let [state, dispatch] = useReducer(reducer, initalState)
    console.log('state: ', state)
    let { num, msg } = state;
    return (
        <div>
            <p>state num: {num}</p>
            <p>state msg: {msg}</p>
            <p><button onClick={() => {
                dispatch({ type: 'addNum', payload: 3 })
            }}>num++</button></p>

            <p><button onClick={() => {
                dispatch({ type: 'decNum', payload: 5 })
            }}>num--</button></p>
        </div>
    )
}


```

### useDebugValue

> 可用于在 React 开发者工具中显示 自定义 hook 的标签
>
> 注意:只能在自定义hook中使用
>
> 参数：useDebugValue(数据状态)
>
> 返回值：undefined

使用示例：

src->hook->useFriendStatus.js(自定义hook)

```js
import { useState, useDebugValue } from 'react'

// 创建一个方法：在最小值和最大值之间取随机整数
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //含最大值，含最小值
}

// 定义一个自定义hook函数
export default function useFriendStatus() {
    // 定义一个数据状态
    const [isOnline, setIsOnline] = useState(null)
    // 设置一个定时器，每秒会随机变化为online和offline
    setTimeout(() => {
        let result = getRandomIntInclusive(0, 1)// [0 | 1]
        console.log(result)
        setIsOnline(result ? 'online' : 'offline')
    }, 1000)

    // 在react开发者工具中的这个 Hook 旁边显示标签
    // "FriendStatus: Online"
    // 调用useDebugValue(数据状态)
    useDebugValue(isOnline)

    return isOnline
}
```

入口文件：src->App.js

```jsx
import React from 'react'
import useFriendStatus from './hook/useFriendStatus'

export default function App() {
    useFriendStatus()
    return (
        <div>App</div>
    )
}
```

### useImpretiveHandle

> 作用：封装公共组件的时候,可以给使用公共组件的组件提供指定的API. 有条件的操作公共组件的真实dom
>
> `useImperativeHandle` 可以让你在使用 `ref` 时自定义暴露给父组件的实例值. `useImperativeHandle` 应当与 [`forwardRef`]一起使用

```shell
函数组件本身不能绑定ref，会报错，但是配合React.forwardRef就可以绑定ref属性了
可以实现在父组件上操作子组件中的dom元素
我们希望父组件的ref，只能有限的操作子组件的真实dom，那就需要能够在子组件中自定义父组件ref的current属性，实现有限的功能===>useImpretiveHandle
```

**使用示例**

App.jsx

```jsx
import React ,{useRef} from 'react'
import FunTest from './components/FunTest';

export default function App() {
    const funRef = useRef('我是谁？');
    return (
        <div>
            <h3>函数组件 绑定ref</h3>
            <FunTest ref={funRef} />
            <hr />
            <button onClick={() => {
                // 操作子组件中的dom
                // funRef.current.style.color='red'
                // funRef.current.style.fontSize = '30px'
                funRef.current.changeColor();
                funRef.current.changeFontSize();
            }}>获取ref</button>
        </div>
    )
}
```

src->component->FunTest.jsx

```jsx
import React, { useRef } from 'react'
import { useImperativeHandle } from 'react';

// 通过函数组件中的第二个参数接收父组件传过来的 ref属性
function FunTest(props, ref) {
    console.log('ref:', ref); // 父组件传过来的 ref对象
    const myselfRef = useRef();

    // 设置父组件ref的权限，参数是 父组件ref和回调函数
    // 回调函数中的返回值是一个对象，对象中的方法就是给父组件ref使用的方法
    useImperativeHandle(ref, () => ({
        changeColor() {
            // 使用自己的ref对象绑定元素
            myselfRef.current.style.color = 'green';
        },
        changeFontSize() {
            myselfRef.current.style.fontSize = '30px';
        }
    }))
    return (
        // 未使用useImperativeHandle，父组件会完全控制子组件
        // <div ref={ref}>FunTest</div>
        // 使用useImperativeHandle，父组件只能操作useImperativeHandle中回调函数返回的对象中的方法
        <div ref={myselfRef}>FunTest</div>
    )
}
// 通过forwardRef()函数 让可以在函数组件上设置ref属性
export default React.forwardRef(FunTest)
```

### useLayoutEffect

> 作用与 `useEffect` 相同，但它会在所有的 DOM 变更之后同步调用 effect。
>
> 作用：可以使用它来读取 DOM 布局并同步触发重渲染。
>
> 在浏览器执行绘制之前，`useLayoutEffect` 内部的更新计划将被同步刷新。

```shell
useEffect
这个是在render结束后,你的callback函数执行,但是不会阻塞浏览器渲染

useLayoutEffect
这个是用在处理DOM的时候,当你的useEffect里面的操作需要处理DOM,并且会改变页面的样式,就需要用这个,否则可能会出现出现闪屏问题, useLayoutEffect里面的callback函数会在DOM更新完成后立即执行,但是会在浏览器进行任何绘制之前运行完成,阻塞了浏览器的绘制
```

**使用案例：**

src->component->Animate.jsx

```jsx
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import TweenMax from 'gsap' // npm i gsap@3.7.0
import './index.css'

const Animate = () => {
    const REl = useRef(null)
    useLayoutEffect(() => {
        /*下面这段代码的意思是当组件加载完成后,在0秒的时间内,将方块的横坐标位置移到600px的位置*/
        TweenMax.to(REl.current, 0, { x: 600 })
    }, [])
    return (
        <div className="animate">
            <div ref={REl} className="square">
                square
            </div>
        </div>
    )
}

export default Animate
```

src->component->index.css

```css
.square {
    width: 100px;
    height: 100px;
    background-color: aqua;
}
```

src->App.jsx

```jsx
import React from 'react'
import Animate from './components/Animate'

export default function App() {
    return (
        <div>
            <Animate />
        </div>
    )
}
```

