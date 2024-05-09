# Promise

## Promise 概述

Promise 是异步编程的一种解决方法，比传统的方式更加高效、友好！Promise 是 ES6 新增的语法。

使用 Promise 语法需要创建一个 promise 对象，promise 对象中包含一个异步操作， 可以通过实例化 Promise 构造函数来创造 promise 对象。

promise 对象具有三种状态：

1. pending 状态， 进行中， 刚创建的 promise 对象就处于 pending 状态。
2. resolved（fulfilled） 状态，已成功， 内部的异步操作执行成功，promise 对象的状态由 pending -> resolved
3. rejected 状态，已失败。 内部的异步操作执行失败，promise 对象的状态由 pending -> rejected

当 promise 的状态发生改变，就再也不会变了！

![image-20240429160021066](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240429160021066.png)

## Promise 基本语法

### ① 使用 Promise 构造函数创建 promise 对象

```js
 new Promise((res, rej) => {
     console.log('第一个参数：', res);
     console.log('第二个参数：', rej);
 });
// 这个函数是同步任务
```

```js
1. 实例化 Promise 类，需要传一个回调函数作为参数，当作事件
2. Promise 类的回调函数（参数），在实例化 Promise 的时候会自动调用，是同步任务
3. Promise 类的回调函数（参数），在被调用的时候，会接收两个参数，两个参数都是函数
```

### ② 修改 promise 对象的状态

```js
new Promise((resolve, reject) => {
    // 调用第一个参数 该promise对象的状态改为 resolved（fulfilled）
    // 可以传个参数作为 PromiseResult
    // resolve('hello');
    // resolve({status:'OK', msg: 'success'});

    // 调用第二个参数， 该promise对象的状态改为 rejected
    // 可以传个参数作为 PromiseResult
    // reject();
    reject([10,20,30,40]);
});
```

```JavaScript
1. 调用 Promise 类回调函数的第一个参数，该 promise 对象改为 resolve(fulfilled)状态，可以传个参数作为 PromiseResult
2. 调用 Promise 类回调函数的第二个参数，该 promise 对象改为 rejected 状态，可以传个参数作为 PromiseResult
3.promise 类回调函数中抛出异常promise对象改为rejected状态，值是异常信息
3. promise 对象的状态一旦改变，就无法再修改

```

### ③ 为 promise 对象设置回调函数

then方法接收两个参数，这两个参数都是回调函数，第一个函数是[PromiseState成功时，执行的函数，第二个函数是[PromiseState失败时，执行的函数

```js
promise对象.then(res => {
    // 如果promise对象是成功状态，执行该回调函数
    // res 可以获取 PromiseResult
}, err => {
    // 如果promise对象是失败状态，执行该回调函数
    // err 可以获取 PromiseResult
});
// then 方法的两个回调函数都是异步执行！
```

```js
1. promise对象的then方法第第一个参数（回调函数），状态变为成功会执行，可以通过形参得到 PromiseResult
2. promise对象的then方法第第二个参数（回调函数），状态变为失败会执行，可以通过形参得到 PromiseResult
3. then 方法的两个回调函数都是异步执行！
```

### ④Promise封装函数

```js
// 7 封装定时器Promise函数
// 使用原本定时器
setTimeout(() => {
    console.log('原版定时器执行了');
}, 4000);

// 使用Promise版定时器
setTimeoutPromise(3000)
// 执行的回调函数res（then后边的语句）
    .then(() => {
    console.log('Promise版定时器执行了');
});

// console.log(p);

/**
 * @params number 时间，单位毫秒
 * @returns Promise对象 
  * Promise状态PromiseStatus成功时，执行成功的回调函数res（then后边的语句）
*/
function setTimeoutPromise(delay) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}
```

Promise封装Ajax函数

```js
/*  
    选项：
    url： 请求地址
    method： 请求方式，默认值 GET
    headers: 请求头，默认值 {}
    body： 请求体
    dataType: 响应体类型
    返回 promise 对象
*/
function ajaxPromise(options) {
    // 从 options 取出相关的选项
    const { url, method = 'GET', headers = {}, body, dataType} = options;

    // 返回 promise 对象
    return new Promise((resolve, reject) => {
            // 创建 xhr 对象
        const xhr = new XMLHttpRequest();

        // 如果指定了 dataType
        if (dataType) {
            xhr.responseType = dataType;
        }

        // 监听响应成功的事件
        xhr.onload = () => {
            if (xhr.status === 200) {
                // 设置成成功状态，将响应内容作为 PromiseResult
                resolve(xhr.response);
            } else {
                // 设置成失败状态
                reject({error:1001, msg: '未能获取到正确的内容！'});
            }
        }

        // 监听响应失败的事件
        xhr.onerror = () =>{
            // 设置成失败状态
            reject({error:1002, msg: '未能成功发送请求！'});
        };

        // 请求初始化
        xhr.open(method, url);

        // 设置请求头
        for (let key in headers) {
            xhr.setRequestHeader(key, headers[key]);
        }

        // 发送
        xhr.send(body);
    });
}
```



## Promise 实例的方法

### then 方法

then方法执行的回调函数只有在Promise的状态改变时才会执行。

#### ① 参数

```js
1. 第一个参数，是一个回调函数，当promise对象的状态改为成功的时候，会被调用，并接收到参数 PromiseResult
2. 第二个参数，是一个回调函数，当promise对象的状态改为失败的时候，会被调用，并接收到参数 PromiseResult
3. 只设置一个参数，作为回调函数，当promise对象的状态改为成功的时候，会被调用，并接收到参数 PromiseResult
```

#### ② 返回值

`then()` 方法的返回值是一个 Promise 对象，该 Promise 对象的状态取决于 `then()` 方法回调函数的返回值（then 可以设置两个回调函数，哪个回调函数执行就取决于谁）

`then()` 方法回调函数的返回值对 `then()` 方法返回的 Promise 对象的影响，如下：

```js
1. 情况一，回调函数没有返回值, then()返回的Promise对象改为成功状态，PromiseResult是undefined
2. 情况二：返回非Promise类型的对象或原始类型数据，then()返回的Promise对象改为成功状态，PromiseResult是该回调的返回值
3. 情况三：返回Promise对象， then()返回的Promise对象与该回调返回的Promise对象，状态和PromiseResult保持一致
4. 情况四：出现代码运行错误,  then()返回的Promise对象,状态改为失败，PromiseResult是错误对象
```

#### ③ 链式调用

由于 then() 方法返回的仍然是一个 promise 对象，所以支持链式调用，then() 的链式调用可以解决**回调地狱**的问题。 

回调地狱：回调函数嵌套回调函数，

```js
promise对象
.then(val => {}, reason => {})
.then(val => {}, reason => {})
.then(val => {}, reason => {})
.then(val => {}, reason => {})
.then(val => {}, reason => {})
```

### catch 方法

```js
调用 catch() 方法 参数是一个回调函数，Promise对象的状态为失败时，执行回调函数。
调用 then() 方法 只设置一个参数，作为回调函数，当promise对象的状态改为成功的时候，会被调用，并接收到参数 PromiseResult
```



#### ① 参数

需要一个回调函数作为参数，Promise对象的状态改为失败的的时候，执行该回调函数。

#### ② then 和 catch 可以配合使用

```js
promise对象
.then(value => {
    console.log('成功！', value);
})
.catch(reason => {
    console.log('失败！', reason);
})
```

#### ③ 返回值

catch() 返回 promise 对象，promise 对象的状态由回调函数的返回值决定，与 then() 方法相同

#### ③ 异常穿透

```js
promise对象
.then(val => {})
.then(val => {})
.then(val => {})
.then(val => {})
.then(val => {})
.catch(reason => {})
```

### finally

finally() 也需要设置一个回调函数作为参数，不论 promise 对象是什么状态，都一定会执行，可以与 then() catch() 一起使用：

```js
promise对象
.then(value => {
     console.log('成功！', value);
 })
.catch(reason => {
     console.log('失败！', reason);
 })
.finally( () => {
     console.log('finally');
 });
```

node中使用promise

```js

const fs = require('node:fs/promises');
const path = require('path');

// 第一步读取 data1.txt
fs.readFile(path.resolve(__dirname, './data/data1.txt'), 'utf-8')
.then(data=>{
    console.log('data1.txt 中的内容：');
    console.log(data);
    console.log('');
    // 第二步读取 data2.txt
    return fs.readFile(path.resolve(__dirname, './data/data2.txt'), 'utf-8');
})
.then(data => {
    console.log('data2.txt 中的内容：');
    console.log(data);
    console.log('');
    console.log('');
    
    // 第三步读取 data3.txt
    return fs.readFile(path.resolve(__dirname, './data/data3.txt'), 'utf-8');
})
.then(data => {
    console.log('data3.txt 中的内容：');
    console.log(data);
    console.log('');
    console.log('');
})
.catch (err => {
    throw err;
});
```



## Promise 构造函数本身的方法

Promise 构造函数本身的方法 又称 `静态方法`

### Promise.resolve()

#### ①  功能

该方法返回一个 promise 对象， 状态由参数决定。

作用：快速创建promise对象

#### ② 根据参数不同返回的 Promise 对象的状态也不同：

1) 情况一： 没有参数，返回的 promise 对象状态会变为成功，PromiseResult 是 undefined

2) 情况二： 参数是除了 Promise 对象和 thenable 对象以外的其他对象或原始类型数据 ，返回的 promise 对象状态会变为成功，PromiseResult 是 参数

3) 情况三：参数是一个 promise 对象，该参数直接作为 resolve() 方法的返回值

```js
 const p1 = new Promise((resolve, reject) => {
     const randNum = Math.random();
     if ( randNum>= .5) {
         // 设置为成功状态
         resolve(randNum);
     } else {
         // 设置为失败的状态
         reject(randNum);
     }
 });

const p = Promise.resolve(p1);  // 等价于 const p = p1;
```

  4) 情况四：参数是一个 thenable 对象, `具有 then 方法的对象称为 thenable 对象`， then 方法接收两个参数，返回值的 promiseStatus 调用第一个参数，设置为成功状态，promiseResult为参数的值；  调用第二个参数设置为失败状态 

```js
// 创建一个 thenable 对象
const obj = {
    then(res, rej) {
        const randNum = Math.floor(Math.random() * 10);
        if ( randNum>= 5) {
            // 设置为成功状态
            res(randNum);
        } else {
            // 设置为失败的状态
            rej(randNum);
        }
    }
}

const p = Promise.resolve(obj);
```

### Promise.reject()

返回一个 失败状态的 Promise 对象，参数作为 PromiseResult。

1. 该方法返回一个 rejected 状态的 promise 对象
2. 该方法所有的参数都被视为 promise 对象的 PromiseResult

### Promise.all()

**都成功才成功，一个失败全盘皆输**

#### ① 参数

```js
1. 要求传入一个可遍历对象（如：数组、Set、Map、字符串等）
2. 作为参数的可遍历对象，要求每个成员都是 promise 对象； 如果存在非 promise 对象的成员，会使用 Promise.resolve() 自动将其转为 promise 对象
```

#### ② 返回值

Promise.all() 返回一个 promise 对象， 状态和PromiseResult的规则如下：

```js
1. 如果参数的每个成员的状态都是成功的，当所有成员状态都改变返回值的状态才改变, 返回的 promise 对象状态是成功，PromiseResult 是一个数组，数组中是参数的每个成员的 PromiseResult， 顺序是按照成员传入的顺序,不是事件完成的顺序。
2. 如果参数的成员一旦有失败状态的，会立即得到返回值，返回的 promise 对象是失败状态，PromiseResult 是失败的成员的 PromiseResult
3. 如果参数不是可遍历对象，返回失败状态的 promise 对象      
```

```js

```



### Promise.race()

**谁先完成就是谁**

#### ① 参数

```javascript
1. 要求传入一个可遍历对象（如：数组、Set、Map、字符串等）
2. 作为参数的可遍历对象，要求每个成员都是 promise 对象； 如果存在非 promise 对象的成员，会使用 Promise.resolve() 自动将其转为 promise 对象
```

#### ② 返回值

Promise.race() 返回一个 promise 对象， 状态和PromiseResult的规则如下：

```javascript
1. 参数（可遍历对象）中哪个成员先完成，不论成功还是失败，该成员直接作为 Promise.race() 的返回值
2. 如果参数不是可遍历对象，返回失败状态的 promise 对象      
```

### Promise.allSettled()

#### ① 参数

```javascript
1. 要求传入一个可遍历对象（如：数组、Set、Map、字符串等）
2. 作为参数的可遍历对象，要求每个成员都是 promise 对象； 如果存在非 promise 对象的成员，会使用 Promise.resolve() 自动将其转为 promise 对象
```

#### ② 返回值

Promise.allsettled() 返回一个 promise 对象， 状态一直都是成功(除非传入的对象不是可遍历对象)和PromiseResult的规则如下：

```javascript
1. 参数是可遍历对象，返回值一定是个成功状态的 promise 对象，所有的参数的成员都完成，返回值状态才改变， PromiseResult是一个数组，数组中每个成员与参数每个成员按照顺序对应 
2. 返回值是一个数组，数组的每个成员是一个对象，对象的结构由{status:'',value:''}组成，成员状态如果成功 PromiseResult[元素]是{status value}, 如果成员的状态是失败则：PromiseResult[元素]是{status,reason}
3. 如果参数不是可遍历对象，返回失败状态的 promise 对象      
```

# 关键问题总结

1. **如何改变promise的状态?**

   (1) resolve(value): 如果当前是pending就会变为resolved。

   (2) reject(reason): 如果当前是pending就会变为rejected。

   (3) 抛出异常（throw）: 如果当前是pending就会变为rejected。

2. **一个 Promise 实例指定多个成功/失败回调函数, 都会调用吗?**

   当 Promise 实例改变为对应状态时都会调用。

3. **改变 Promise 实例状态和指定回调函数谁先谁后?**

   (1) 都有可能, 正常情况下是先指定回调再改变状态, 但也可以先改状态再指定回调。

   (2) 如何先改状态再指定回调?

   ​        ① 在执行器中直接调用resolve() / reject()。

   ​        ② 延迟更长时间才调用then()。

   (3) 什么时候才能得到数据?

   ​        ① 如果先指定的回调, 那当状态发生改变时, 回调函数就会调用, 得到数据。

   ​        ② 如果先改变的状态, 那当指定回调时, 回调函数就会调用, 得到数据。

4. **then() 方法返回的新 Promise 实例的结果状态由什么决定?**

   (1) 简单表达: 由 then() 指定的回调函数执行的结果决定

   (2) 详细表达:

   ​       ① 如果没写返回值，新 Promise 实例的状态为 resolved，value 为 undefined。

   ​       ② 如果返回的是非 Promise 实例的任意值, 新 Promise 实例变为 resolved, value 为返回的值。

   ​       ③ 如果返回的是另一个新 Promise 实例, 此 Promise 实例的结果就会成为新 Promise 的结果。 

   ​       ④ 如果抛出异常, 新 Promise 变为 rejected, reason 为抛出的异常。 

5. **Promise 如何串连多个操作任务?**

   (1) Promise 实例的`then()`方法返回一个新的 Promise 实例, 可以写成成`then()`的链式调用。

   (2) 通过 `then()` 的链式调用串连多个任务。

6. **Promise 异常传透?**

   (1) 当使用 Promise 实例的 `then()`链式调用时, 可以在最后指定失败的回调。 

   (2) 前面任何操作出了异常, 都会传到最后失败的回调中处理。

7. **中断 Promise 链?**

   (1) 当使用 Promise 实例的 `then()` 链式调用时, 在中间中断, 不再调用后面的回调函数。

   (2) 在回调函数中返回一个pendding状态的 Promise 实例。

# async 与 await

**async** 和 **await** 关键字让我们可以用一种更简洁的方式写出基于  **Promise**  的异步行为，而无需刻意地链式调用。

是ES的语法，用来替代then来进行链式调用

## async 函数

### ① 定义一个 async 函数

任何形式的函数，声明的时候，添加 async 关键字就可以变为 async 函数

```js
 // 1. function 关键字方式
async function fn01() {}

// 2. 表达式方式
const fn02 = async function() {};

// 3. 箭头函数
const fn03 = async () => {};

// 4. 立即执行的函数
(async () => {

})();

// 5. 对象中的方法
const user = {
    async say() {}
}
```

### ② async 函数的返回值

async 函数返回一个 Promise 对象， Promise 对象的状态取决于 async 函数内的 return， 规则如下：

```javascript
1. 情况一，没有reutrn, async函数返回的Promise对象改为成功状态，PromiseResult是undefined
2. 情况二：return 非Promise类型的对象或原始类型数据，async函数返回的Promise对象改为成功状态，PromiseResult 是 return 的值
3. 情况三：return Promise对象， async函数返回的Promise对象就是 return 的 Promise对象
4. 情况四：抛出异常, async函数返回的Promise对象,状态改为失败，PromiseResult是错误对象
```

## await 表达式

### ① await 表达式

```javascript
1. await 关键字与后边的表达式共同组成 await 表达式
2. await 表示只能写在 async 函数中， async 函数中可以有 0 个或多个 await 表示式
```

### ② await 表达式取值

```javascript
1. await 右侧的表达式是 非Promsie, 右侧表达式的值就是 await 表达式的值
2. await 右侧的表达式是成功状态 Promise 对象，状态改变之后，await 表达式才能取到值，值是 Promise 对象的PromiseResult
3. await 右侧的表达式是失败状态的 Promise 对象, 抛出异常, await 表达式取不到值，中断链式调用
4. await 相当于then链式调用，上一个不完成（状态不改变），下一个不开始，要的就是等待。
5. await 后边的语句就相当于在promise对象的then的回调中。
```

```javascript

    async function fn1() {
        console.log(1);
        await fn2();
        console.log(2);  // 相当于在promise对象的then的回调里  微任务,立即进入异步队列中等待，下一轮执行。
    }

    async function fn2() {
        console.log(3);
    }

    console.log(4);
    
    setTimeout(function () {
        console.log(5);
    }, 0)
    
    fn1();
    
    new Promise(function (resolve) {
        console.log(6);
        resolve();
    }).then(function () {
        console.log(7);
    });
    
    console.log(8);

<!-- 
    同步任务： 4   1   3  6  8
    微任务 2 7
    宏任务 5

 -->
```



### ③ await 处理 rejected 状态的 Promise 对象

```javascript
第一种方式： 将 await 表达式写在 try {} catch() {} 结构中
第二种方式： async函数返回promise对象，里面抛出异常，状态改为失败，使用 catch 设置失败状态的回调
```

async 与 await 实现链式调用

```js
(async () => {
    try {
        // 第一步 获取所有的榜单
        const res1 = await ajaxPromise({
            url: 'http://api.fuming.site:54255/toplist',
            dataType: 'json'
        })

        // 第二步 根据榜单ID，获取该榜单下的歌曲列表
        const res2 = await ajaxPromise({
            url: 'http://api.fuming.site:54255/playlist/detail?id=' + res1.list[0].id,
            dataType: 'json'
        });

        // 第三步 根据歌曲id 获取歌曲的详细信息
        const res3 = await ajaxPromise({
            url: 'http://api.fuming.site:54255/song/detail?ids=' + res2.privileges[0].id,
            dataType: 'json'
        });
        console.log(res3);
    } catch (error)  {
        console.log('获取数据失败！');
    }
})();
```

# 微队列和宏队列

1. 异步任务可以分为微任务和宏任务，它们的回调函数会分别进入微队列和宏队列
2. 微列队：用来保存待执行的微任务(回调)，比如：Promise 的回调、MutationObserver 的回调。
3. 宏队列：按照最新的 W3C 标准，宏队列分为交互队列（DOM事件回调），延迟队列（定时器回调，Ajax回调）
4. 队列的执行优先级： 微队列 > 交互队列 > 延迟队列



1. JS 中用来存储待执行回调函数的队列包含2个不同特定的列队
2. 宏队列：用来保存待执行的宏任务(回调)，比如：定时器回调、DOM事件回调、ajax回调。
3. 微队列：用来保存待执行的微任务(回调)，比如：Promise 的回调、MutationObserver 的回调。
4. JS 执行时会区别这2个队列：
   - (1) JS 引擎首先必须先执行所有的初始化同步任务代码。
   - (2) 每次准备取出第一个宏任务执行前, 都要将所有的微任务一个一个取出来执行。

![image-20240506142439784](000-images/17-promise/image-20240506142439784.png)

