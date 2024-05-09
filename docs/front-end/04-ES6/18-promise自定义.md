# 自定义 Promise

## 1 基本结构搭建

```JavaScript
实例的方法：（设置实例的原型上）
then()
catch()
finally()

类本身的方法：
resolve()
reject()
all()
race()
allSettled

console的方法
console.log() 
console.dir()
```

```js
(window => {
    class Promise {

        /**
         * 构造器方法，实例化的时候自动执行
         */
        constructor() {

        }

        /**
         * 给实例传递成功和失败的回调函数,该方法会添加到实例的原型上
         */
        then() {

        }

        /**
         * 给实例传递失败的回调函数,该方法会添加到实例的原型上
         */
        catch() {

        }


        /**
         * 根据参数返回新的Promise实例，该方法添加到类本身(静态方法)
         */
        static resolve() {

        }

        /**
         * 返回新的失败状态的Promise实例，该方法添加到类本身(静态方法)
         */
        static reject() {

        }

        /**
         * 当传入的所有Promise实例都完成才返回一个Promise实例,该方法添加到类本身(静态方法)
         */
        static all() {

        }

        /**
         * 传入的多个Promise实例只要一个先完成就返回一个Promise实例，该方法添加到类本身(静态方法)
         */
        static race() {

        }


    }

    window.Promise = Promise;
})(window || global);
```



## 2 实例化传入执行器函数

```js
// 实例化 Promise
const p1 = new Promise((resolve, reject) => {
    console.log(resolve);
    console.log(reject);
});
```

```js
(window => {
    class Promise {

        /**
         * 构造器方法，实例化的时候自动执行
         * @param {Function} exector 执行器函数，实例化的时候自动执行 
         */
        constructor(exector) {
            // 执行该函数，可将实例状态更改为成功
            const changeResolved = () => {

            };

            // 执行该函数，可将实例状态更改为成功
            const changeRejected = () => {

            };

            // 调用执行器函数
            exector(changeResolved, changeRejected);
        }

        /**
         * 给实例传递成功和失败的回调函数,该方法会添加到实例的原型上
         */
        then() {

        }

        /**
         * 给实例传递失败的回调函数,该方法会添加到实例的原型上
         */
        catch() {

        }


        /**
         * 根据参数返回新的Promise实例，该方法添加到类本身(静态方法)
         */
        static resolve() {

        }

        /**
         * 返回新的失败状态的Promise实例，该方法添加到类本身(静态方法)
         */
        static reject() {

        }

        /**
         * 当传入的所有Promise实例都完成才返回一个Promise实例,该方法添加到类本身(静态方法)
         */
        static all() {

        }

        /**
         * 传入的多个Promise实例只要一个先完成就返回一个Promise实例，该方法添加到类本身(静态方法)
         */
        static race() {

        }


    }

    window.Promise = Promise;
})(window || global);
```





## 3 更该状态的三种方式

```javascript
1. 执行器函数中调用第一个参数，修改为成功状态
2. 执行器函数中调用第二个参数，修改为失败状态
3. 执行器函数中有异常，修改为失败状态，result就是错误对象
```

```javascript
执行器函数 :
    (resolve, reject) => {
        console.log(resolve);
        console.log(reject);
    }
```



```js
(window => {
    class Promise {
        // 设置私有属性，记录实例的状态和结果
        #state = 'pendding';
        #result;

        /**
         * 构造器方法，实例化的时候自动执行
         * @param {Function} exector 执行器函数，实例化的时候自动执行 
         */
        constructor(exector) {
            // 执行该函数，可将实例状态更改为成功
            const changeResolved = value => {
                // 修改状态和结果
                this.#state = 'fulfilled';
                this.#result = value;
            };

            // 执行该函数，可将实例状态更改为成功
            const changeRejected = reason => {
                // 修改状态和结果
                this.#state = 'rejected';
                this.#result = reason;
            };

            // 调用执行器函数， 如果执行器函数中有异常，修改状态为失败
            try {
                exector(changeResolved, changeRejected);
            } catch (error) {
                // 修改状态和结果
                this.#state = 'rejected';
                this.#result = error;
            }
        }

        /**
         * 给实例传递成功和失败的回调函数,该方法会添加到实例的原型上
         */
        then() {

        }

        /**
         * 给实例传递失败的回调函数,该方法会添加到实例的原型上
         */
        catch() {

        }


        /**
         * 根据参数返回新的Promise实例，该方法添加到类本身(静态方法)
         */
        static resolve() {

        }

        /**
         * 返回新的失败状态的Promise实例，该方法添加到类本身(静态方法)
         */
        static reject() {

        }

        /**
         * 当传入的所有Promise实例都完成才返回一个Promise实例,该方法添加到类本身(静态方法)
         */
        static all() {

        }

        /**
         * 传入的多个Promise实例只要一个先完成就返回一个Promise实例，该方法添加到类本身(静态方法)
         */
        static race() {

        }


    }

    window.Promise = Promise;
})(window || global);
```





## 4 状态只能更改一次

```js
(window => {
    class Promise {
        // 设置私有属性，记录实例的状态和结果
        #state = 'pendding';
        #result;

        /**
         * 构造器方法，实例化的时候自动执行
         * @param {Function} exector 执行器函数，实例化的时候自动执行 
         */
        constructor(exector) {
            // 执行该函数，可将实例状态更改为成功
            const changeResolved = value => {
                // 如果状态已经更改，结束该函数
                if (this.#state !== 'pendding') {
                    return;
                }
                // 修改状态和结果
                this.#state = 'fulfilled';
                this.#result = value;
            };

            // 执行该函数，可将实例状态更改为成功
            const changeRejected = reason => {
                // 如果状态已经更改，结束该函数
                if (this.#state !== 'pendding') {
                    return;
                }
                // 修改状态和结果
                this.#state = 'rejected';
                this.#result = reason;
            };

            // 调用执行器函数， 如果执行器函数中有异常，修改状态为失败
            try {
                exector(changeResolved, changeRejected);
            } catch (error) {
                // 更改为失败状态，错误对象作为结果
                changeRejected(error);
            }
        }

        /**
         * 给实例传递成功和失败的回调函数,该方法会添加到实例的原型上
         */
        then() {

        }

        /**
         * 给实例传递失败的回调函数,该方法会添加到实例的原型上
         */
        catch() {

        }


        /**
         * 根据参数返回新的Promise实例，该方法添加到类本身(静态方法)
         */
        static resolve() {

        }

        /**
         * 返回新的失败状态的Promise实例，该方法添加到类本身(静态方法)
         */
        static reject() {

        }

        /**
         * 当传入的所有Promise实例都完成才返回一个Promise实例,该方法添加到类本身(静态方法)
         */
        static all() {

        }

        /**
         * 传入的多个Promise实例只要一个先完成就返回一个Promise实例，该方法添加到类本身(静态方法)
         */
        static race() {

        }


    }

    window.Promise = Promise;
})(window || global);
```



## 5 实现 then 方法：传入回调并异步执行

```js
1. then() 负责传入两个回调函数
2. then() 的内部根据状态执行两个参数（传入的两个回调）的一个，要异步执行
3. then() 执行的 时机1 回调传入的时候，状态已经发生改变
				时机2 回调传入的时候，状态未发生改变，在回调中先存下来，到执行的时候再执行
```

```js
(window => {
    class Promise {
        // 设置私有属性，记录实例的状态和结果
        #state = 'pendding';
        #result;

        /**
         * 构造器方法，实例化的时候自动执行
         * @param {Function} exector 执行器函数，实例化的时候自动执行 
         */
        constructor(exector) {
            // 执行该函数，可将实例状态更改为成功
            const changeResolved = value => {
                // 如果状态已经更改，结束该函数
                if (this.#state !== 'pendding') {
                    return;
                }
                // 修改状态和结果
                this.#state = 'fulfilled';
                this.#result = value;
            };

            // 执行该函数，可将实例状态更改为成功
            const changeRejected = reason => {
                // 如果状态已经更改，结束该函数
                if (this.#state !== 'pendding') {
                    return;
                }
                // 修改状态和结果
                this.#state = 'rejected';
                this.#result = reason;
            };

            // 调用执行器函数， 如果执行器函数中有异常，修改状态为失败
            try {
                exector(changeResolved, changeRejected);
            } catch (error) {
                // 更改为失败状态，错误对象作为结果
                changeRejected(error);
            }
        }

        /**
         * 给实例传递成功和失败的回调函数,该方法会添加到实例的原型上
         */
        then(onResolved, onRejected) {
            if (this.#state === 'fulfilled') {   // 当传入回调函数是，实例的状态已经改为成功
                setTimeout(() => {
                    onResolved(this.#result);
                });
            } else if (this.#state === 'rejected') {  // 当传入回调函数是，实例的状态已经改为失败
                setTimeout(() => {
                    onRejected(this.#result);
                })
            }
        }

        /**
         * 给实例传递失败的回调函数,该方法会添加到实例的原型上
         */
        catch() {

        }


        /**
         * 根据参数返回新的Promise实例，该方法添加到类本身(静态方法)
         */
        static resolve() {

        }

        /**
         * 返回新的失败状态的Promise实例，该方法添加到类本身(静态方法)
         */
        static reject() {

        }

        /**
         * 当传入的所有Promise实例都完成才返回一个Promise实例,该方法添加到类本身(静态方法)
         */
        static all() {

        }

        /**
         * 传入的多个Promise实例只要一个先完成就返回一个Promise实例，该方法添加到类本身(静态方法)
         */
        static race() {

        }


    }

    window.Promise = Promise;
})(window || global);
```

**传入调用过程1** 

执行器函数 传给class类中的构造器exector作为形参

![image-20240506170947017](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240506170947017.png)

**传入调用过程2** 

构造器函数调用 传来的执行器函数，并且使用两个函数作为参数，（一个成功的函数，一个失败的函数）

![image-20240506171354717](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240506171354717.png)

**传入调用过程3** 

执行器函数 调用成功的函数设置成功状态

![image-20240506173012063](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240506173012063.png)



## 6 实现 then 方法：状态改变才能执行回调

```javascript
1. 调用 then() 可以传入两个回调函数
2. 如果调用 then 的时候状态已经改变，根据状态选择其中一个回调函数，执行调用
3. 如果调用 then 的时候状态还未改变，将两个回调函数存下来，当执行改变状态函数的时候，再调用当初存下来的回调
```

```js
(window => {
    class Promise {
        // 设置私有属性，记录实例的状态和结果
        #state = 'pendding';       
        #result;
        // 设置私有属性，保存then传入的回调函数
        #callbackObj = {};

        /**
         * 构造器方法，实例化的时候自动执行
         * @param {Function} exector 执行器函数，实例化的时候自动执行 
         */
        constructor(exector) {
            // 执行该函数，可将实例状态更改为成功
            const changeResolved = value => {
                // 如果状态已经更改，结束该函数
                if (this.#state !== 'pendding') {
                    return;
                }
                // 修改状态和结果
                this.#state = 'fulfilled';
                this.#result = value;
                // 如果这个时候 then() 已经将成功的回调传入，直接调用
                this.#callbackObj.onResolved?.(value);
                // if (this.#callbackObj.onResolved) {
                //     this.#callbackObj.onResolved();
                // }
            };

            // 执行该函数，可将实例状态更改为成功
            const changeRejected = reason => {
                // 如果状态已经更改，结束该函数
                if (this.#state !== 'pendding') {
                    return;
                }
                // 修改状态和结果
                this.#state = 'rejected';
                this.#result = reason;
                // 如果这个时候 then() 已经将失败的回调传入，直接调用
                this.#callbackObj.onRejected?.(reason);
            };

            // 调用执行器函数， 如果执行器函数中有异常，修改状态为失败
            try {
                exector(changeResolved, changeRejected);
            } catch (error) {
                // 更改为失败状态，错误对象作为结果
                changeRejected(error);
            }
        }

        /**
         * 给实例传递成功和失败的回调函数,该方法会添加到实例的原型上
         */
        then(onResolved, onRejected) {
            if (this.#state === 'fulfilled') {   // 当传入回调函数时，实例的状态已经改为成功
                setTimeout(() => {
                    onResolved(this.#result);
                });
            } else if (this.#state === 'rejected') {  // 当传入回调函数时，实例的状态已经改为失败
                setTimeout(() => {
                    onRejected(this.#result);
                })
            } else {   // 当传入回调函数时，状态还未改变
                // 将两个回调函数保存到私有属性中
                this.#callbackObj = {
                    onResolved,
                    onRejected
                }
            }
        }

        /**
         * 给实例传递失败的回调函数,该方法会添加到实例的原型上
         */
        catch() {

        }


        /**
         * 根据参数返回新的Promise实例，该方法添加到类本身(静态方法)
         */
        static resolve() {

        }

        /**
         * 返回新的失败状态的Promise实例，该方法添加到类本身(静态方法)
         */
        static reject() {

        }

        /**
         * 当传入的所有Promise实例都完成才返回一个Promise实例,该方法添加到类本身(静态方法)
         */
        static all() {

        }

        /**
         * 传入的多个Promise实例只要一个先完成就返回一个Promise实例，该方法添加到类本身(静态方法)
         */
        static race() {

        }


    }

    window.Promise = Promise;
})(window || global);
```





## 7 实现 then 方法：可以设置多个回调

```js
 // 实例化 Promise
const p1 = new Promise((resolve, reject) => {
    // 修改为失败状态
    setTimeout(() => {
        reject('Error');
    }, 2000)
});


// 调用then() 方法，传入回调函数
p1.then(val => {
    console.log('成功1！', val);
}, reason => {
    console.log('失败1！', reason);
});

p1.then(val => {
    console.log('成功2！', val);
}, reason => {
    console.log('失败2！', reason);
});

p1.then(val => {
    console.log('成功3！', val);
}, reason => {
    console.log('失败3！', reason);
});

```

```js
(window => {
    class Promise {
        // 设置私有属性，记录实例的状态和结果
        #state = 'pendding';       
        #result;
        // 设置私有属性，保存 then() 传入的回调函数
        #callbackList = [];

        /**
         * 构造器方法，实例化的时候自动执行
         * @param {Function} exector 执行器函数，实例化的时候自动执行 
         */
        constructor(exector) {
            // 执行该函数，可将实例状态更改为成功
            const changeResolved = value => {
                // 如果状态已经更改，结束该函数
                if (this.#state !== 'pendding') {
                    return;
                }
                // 修改状态和结果
                this.#state = 'fulfilled';
                this.#result = value;
                // 遍历回调函数列表
                this.#callbackList.forEach(callback => {
                    callback.onResolved(value);
                });
            
            };

            // 执行该函数，可将实例状态更改为成功
            const changeRejected = reason => {
                // 如果状态已经更改，结束该函数
                if (this.#state !== 'pendding') {
                    return;
                }
                // 修改状态和结果
                this.#state = 'rejected';
                this.#result = reason;
                  // 遍历回调函数列表
                  this.#callbackList.forEach(callback => {
                    callback.onRejected(reason);
                });
            };

            // 调用执行器函数， 如果执行器函数中有异常，修改状态为失败
            try {
                exector(changeResolved, changeRejected);
            } catch (error) {
                // 更改为失败状态，错误对象作为结果
                changeRejected(error);
            }
        }

        /**
         * 给实例传递成功和失败的回调函数,该方法会添加到实例的原型上
         */
        then(onResolved, onRejected) {
            if (this.#state === 'fulfilled') {   // 当传入回调函数时，实例的状态已经改为成功
                setTimeout(() => {
                    onResolved(this.#result);
                });
            } else if (this.#state === 'rejected') {  // 当传入回调函数时，实例的状态已经改为失败
                setTimeout(() => {
                    onRejected(this.#result);
                })
            } else {   // 当传入回调函数时，状态还未改变
                // 将两个回调函数保存到私有属性中
                this.#callbackList.push({
                    onResolved,
                    onRejected
                });
            }
        }

        /**
         * 给实例传递失败的回调函数,该方法会添加到实例的原型上
         */
        catch() {

        }


        /**
         * 根据参数返回新的Promise实例，该方法添加到类本身(静态方法)
         */
        static resolve() {

        }

        /**
         * 返回新的失败状态的Promise实例，该方法添加到类本身(静态方法)
         */
        static reject() {

        }

        /**
         * 当传入的所有Promise实例都完成才返回一个Promise实例,该方法添加到类本身(静态方法)
         */
        static all() {

        }

        /**
         * 传入的多个Promise实例只要一个先完成就返回一个Promise实例，该方法添加到类本身(静态方法)
         */
        static race() {

        }


    }

    window.Promise = Promise;
})(window || global);
```





## 8 实现 then 方法：返回新的 Promise 对象 实现链式调用

```
1. then() 返回一个新的 Promsie 实例
2. 返回的 Promsie 实例的状态，等到传入的回调函数执行过后才该
```

```js
(window => {
    class Promise {
        // 设置私有属性，记录实例的状态和结果
        #state = 'pendding';       
        #result;
        // 设置私有属性，保存 then() 传入的回调函数
        #callbackList = [];

        /**
         * 构造器方法，实例化的时候自动执行
         * @param {Function} exector 执行器函数，实例化的时候自动执行 
         */
        constructor(exector) {
            // 执行该函数，可将实例状态更改为成功
            const changeResolved = value => {
                // 如果状态已经更改，结束该函数
                if (this.#state !== 'pendding') {
                    return;
                }
                // 修改状态和结果
                this.#state = 'fulfilled';
                this.#result = value;
                // 遍历回调函数列表
                this.#callbackList.forEach(callback => {
                    callback.onResolved(value);
                });
            
            };

            // 执行该函数，可将实例状态更改为成功
            const changeRejected = reason => {
                // 如果状态已经更改，结束该函数
                if (this.#state !== 'pendding') {
                    return;
                }
                // 修改状态和结果
                this.#state = 'rejected';
                this.#result = reason;
                  // 遍历回调函数列表
                  this.#callbackList.forEach(callback => {
                    callback.onRejected(reason);
                });
            };

            // 调用执行器函数， 如果执行器函数中有异常，修改状态为失败
            try {
                exector(changeResolved, changeRejected);
            } catch (error) {
                // 更改为失败状态，错误对象作为结果
                changeRejected(error);
            }
        }

        /**
         * 给实例传递成功和失败的回调函数,该方法会添加到实例的原型上
         */
        then(onResolved, onRejected) {
            // 返回 Promise 对象
            return new Promise((resolve, reject) => {
                if (this.#state === 'fulfilled') {   // 当传入回调函数时，实例的状态已经改为成功
                    setTimeout(() => {
                        try {
                            // 执行 then() 传入的回调函数并获取到返回值
                            const res = onResolved(this.#result);
                            // 判断返回值res是否是Promise的实例
                            if (res instanceof Promise) {
                                // then()返回值的状态与res一致 情况三
                                res.then(resolve, reject);

                                // res.then(value => {
                                //     resolve(value);
                                // }, reason => {
                                //     reject(reason);
                                // })
                            } else {
                                // 改为成功状态，将返回值作为结果 情况一 情况二
                                resolve(res);
                            }
                        } catch (error) {
                            // 如果调用 then() 传入的回调函数的时候出现异常，改为失败状态 情况四
                            reject(error);
                        }
                    });
                } else if (this.#state === 'rejected') {  // 当传入回调函数时，实例的状态已经改为失败
                    setTimeout(() => {
                        try {
                            // 调用 then() 传入的回调函数并得到返回值
                            const res = onRejected(this.#result);
                            // 判断返回值的类型
                            if (res instanceof Promise) {
                                // 情况三 then()返回值的状态与res的状态一致
                                res.then(resolve, reject);
                            } else {
                                // 情况一 情况二： 设置为成功状态
                                resolve(res);
                            }
                        } catch (error) {
                            // 情况四：调用传入的回调函数时出现异常
                            reject(error);
                        }
                    })
                } else {   // 当传入回调函数时，状态还未改变
                    // 将两个回调函数保存到私有属性中
                    this.#callbackList.push({
                        onResolved,
                        onRejected
                    });
                }
            })
        }

        /**
         * 给实例传递失败的回调函数,该方法会添加到实例的原型上
         */
        catch() {

        }


        /**
         * 根据参数返回新的Promise实例，该方法添加到类本身(静态方法)
         */
        static resolve() {

        }

        /**
         * 返回新的失败状态的Promise实例，该方法添加到类本身(静态方法)
         */
        static reject() {

        }

        /**
         * 当传入的所有Promise实例都完成才返回一个Promise实例,该方法添加到类本身(静态方法)
         */
        static all() {

        }

        /**
         * 传入的多个Promise实例只要一个先完成就返回一个Promise实例，该方法添加到类本身(静态方法)
         */
        static race() {

        }


    }

    window.Promise = Promise;
})(window || global);
```

then方法链式调用过程。

then方法返回一个新的Promise对象，新对象在实例化中执行器

![image-20240507105406241](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240507105406241.png)

## 9 实现 then 方法： 进一步封装

```
1. then 执行时候，三种情况，处理逻辑，进一步封装成了 handler() 函数
2. 已经实现链式调用、调用中断
```

```js
(window => {
    class Promise {
        // 设置私有属性，记录实例的状态和结果
        #state = 'pendding';       
        #result;
        // 设置私有属性，保存 then() 传入的回调函数
        #callbackList = [];

        /**
         * 构造器方法，实例化的时候自动执行
         * @param {Function} exector 执行器函数，实例化的时候自动执行 
         */
        constructor(exector) {
            // 执行该函数，可将实例状态更改为成功
            const changeResolved = value => {
                // 如果状态已经更改，结束该函数
                if (this.#state !== 'pendding') {
                    return;
                }
                // 修改状态和结果
                this.#state = 'fulfilled';
                this.#result = value;
                // 遍历回调函数列表
                this.#callbackList.forEach(callback => {
                    callback.onResolved(value);
                });
            
            };

            // 执行该函数，可将实例状态更改为成功
            const changeRejected = reason => {
                // 如果状态已经更改，结束该函数
                if (this.#state !== 'pendding') {
                    return;
                }
                // 修改状态和结果
                this.#state = 'rejected';
                this.#result = reason;
                  // 遍历回调函数列表
                  this.#callbackList.forEach(callback => {
                    callback.onRejected(reason);
                });
            };

            // 调用执行器函数， 如果执行器函数中有异常，修改状态为失败
            try {
                exector(changeResolved, changeRejected);
            } catch (error) {
                // 更改为失败状态，错误对象作为结果
                changeRejected(error);
            }
        }

        /**
         * 给实例传递成功和失败的回调函数,该方法会添加到实例的原型上
         */
        then(onResolved, onRejected) {
            // 返回 Promise 对象
            return new Promise((resolve, reject) => {

                // 封装函数 专门用于执行传入 then() 的回调
                const handler = cb => {
                    try {
                        // 执行 then() 传入的回调函数并获取到返回值
                        const res = cb(this.#result);
                        // 判断返回值res是否是Promise的实例
                        if (res instanceof Promise) {
                            // then()返回值的状态与res一致 情况三
                            res.then(resolve, reject);
                        } else {
                            // 改为成功状态，将返回值作为结果 情况一 情况二
                            resolve(res);
                        }
                    } catch (error) {
                        // 如果调用 then() 传入的回调函数的时候出现异常，改为失败状态 情况四
                        reject(error);
                    }
                };

                // 当传入回调函数时，实例的状态已经改为成功
                if (this.#state === 'fulfilled') {   
                    setTimeout(() => {
                        handler(onResolved);
                    });

                // 当传入回调函数时，实例的状态已经改为失败
                } else if (this.#state === 'rejected') {   
                    setTimeout(() => {
                        handler(onRejected);
                    })

                // 当传入回调函数时，状态还未改变
                } else {   
                    // 将两个回调函数保存到私有属性中
                    this.#callbackList.push({
                        onResolved: () => {
                            handler(onResolved);
                        },
                        onRejected: () => {
                            handler(onRejected);
                        }
                    });
                }
            })
        }

        /**
         * 给实例传递失败的回调函数,该方法会添加到实例的原型上
         */
        catch() {

        }


        /**
         * 根据参数返回新的Promise实例，该方法添加到类本身(静态方法)
         */
        static resolve() {

        }

        /**
         * 返回新的失败状态的Promise实例，该方法添加到类本身(静态方法)
         */
        static reject() {

        }

        /**
         * 当传入的所有Promise实例都完成才返回一个Promise实例,该方法添加到类本身(静态方法)
         */
        static all() {

        }

        /**
         * 传入的多个Promise实例只要一个先完成就返回一个Promise实例，该方法添加到类本身(静态方法)
         */
        static race() {

        }


    }

    window.Promise = Promise;
})(window || global);
```



## 10 实现 then 方法： 参数默认值

```
1. then() 方法如果没有正确传参数（传入两个回调函数）， 没传参或传入的不是函数， 将promsie的状态和结果向下传递
2. 实现真正的异常穿透
```

```js
(window => {
    class Promise {
        // 设置私有属性，记录实例的状态和结果
        #state = 'pendding';       
        #result;
        // 设置私有属性，保存 then() 传入的回调函数
        #callbackList = [];

        /**
         * 构造器方法，实例化的时候自动执行
         * @param {Function} exector 执行器函数，实例化的时候自动执行 
         */
        constructor(exector) {
            // 执行该函数，可将实例状态更改为成功
            const changeResolved = value => {
                // 如果状态已经更改，结束该函数
                if (this.#state !== 'pendding') {
                    return;
                }
                // 修改状态和结果
                this.#state = 'fulfilled';
                this.#result = value;
                // 遍历回调函数列表
                this.#callbackList.forEach(callback => {
                    callback.onResolved();
                });
            
            };

            // 执行该函数，可将实例状态更改为成功
            const changeRejected = reason => {
                // 如果状态已经更改，结束该函数
                if (this.#state !== 'pendding') {
                    return;
                }
                // 修改状态和结果
                this.#state = 'rejected';
                this.#result = reason;
                  // 遍历回调函数列表
                  this.#callbackList.forEach(callback => {
                    callback.onRejected();
                });
            };

            // 调用执行器函数， 如果执行器函数中有异常，修改状态为失败
            try {
                exector(changeResolved, changeRejected);
            } catch (error) {
                // 更改为失败状态，错误对象作为结果
                changeRejected(error);
            }
        }

        /**
         * 给实例传递成功和失败的回调函数,该方法会添加到实例的原型上
         */
        then(onResolved, onRejected) {
            // 如果传入的参数不是函数 给参数设置默认值
            if (typeof onResolved !== 'function') {
                onResolved = value => value;
            }
            
            if (typeof onRejected !== 'function') {
                onRejected = reason => {
                    throw reason;
                }
            }

            // 返回 Promise 对象
            return new Promise((resolve, reject) => {

                // 封装函数 专门用于执行传入 then() 的回调
                const handler = cb => {
                    try {
                        // 执行 then() 传入的回调函数并获取到返回值
                        const res = cb(this.#result);
                        // 判断返回值res是否是Promise的实例
                        if (res instanceof Promise) {
                            // then()返回值的状态与res一致 情况三
                            res.then(resolve, reject);
                        } else {
                            // 改为成功状态，将返回值作为结果 情况一 情况二
                            resolve(res);
                        }
                    } catch (error) {
                        // 如果调用 then() 传入的回调函数的时候出现异常，改为失败状态 情况四
                        reject(error);
                    }
                };

                // 当传入回调函数时，实例的状态已经改为成功
                if (this.#state === 'fulfilled') {   
                    setTimeout(() => {
                        handler(onResolved);
                    });

                // 当传入回调函数时，实例的状态已经改为失败
                } else if (this.#state === 'rejected') {   
                    setTimeout(() => {
                        handler(onRejected);
                    })

                // 当传入回调函数时，状态还未改变
                } else {   
                    // 将两个回调函数保存到私有属性中
                    this.#callbackList.push({
                        onResolved: () => {
                            handler(onResolved);
                        },
                        onRejected: () => {
                            handler(onRejected);
                        }
                    });
                }
            })
        }

        /**
         * 给实例传递失败的回调函数,该方法会添加到实例的原型上
         */
        catch() {

        }


        /**
         * 根据参数返回新的Promise实例，该方法添加到类本身(静态方法)
         */
        static resolve() {

        }

        /**
         * 返回新的失败状态的Promise实例，该方法添加到类本身(静态方法)
         */
        static reject() {

        }

        /**
         * 当传入的所有Promise实例都完成才返回一个Promise实例,该方法添加到类本身(静态方法)
         */
        static all() {

        }

        /**
         * 传入的多个Promise实例只要一个先完成就返回一个Promise实例，该方法添加到类本身(静态方法)
         */
        static race() {

        }


    }

    window.Promise = Promise;
})(window || global);
```



## 11 实现 catch 方法

```
catch 只传入失败状态的回调，相当于 then（undefined, 回调函数）
```

```js
(window => {
    class Promise {
    
        /**
         * 给实例传递失败的回调函数,该方法会添加到实例的原型上
         * @param {Function} onRejected 实例状态失败执行的回调
         */
        catch(onRejected) {
            return this.then(undefined, onRejected);
        }

    }

    window.Promise = Promise;
})(window || global);
```





## 12 实现 Promise.resolve() 方法

```
情况一：没有参数，返回成功状态Promise实例，result是undefined
情况一：参数是非Promise，返回成功状态Promise实例，result是参数
情况三：参数是Promise实例，参数就是返回值
情况四：参数是thenable对象，返回Promise实例，状态由thenable对象中的then方法决定
```

```js
(window => {
    class Promise {
       
        /**
         * 根据参数返回新的Promise实例，该方法添加到类本身(静态方法)
         * @param {Mixed} value 该参数影响返回的Promise
         */
        static resolve(value) {
            if (value instanceof Promise) {
                // 情况三 参数就是Promise对象
                return value;
            } else if (typeof value?.then === 'function') {
              // 情况四 将resolve, reject传递给 value.then方法,由该 thenable 对象决定改为什么状态
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        value.then(resolve, reject);
                    })
                });
            } else {
                // 情况一 情况二 返回成功状态的Promise对象 value作为result
                return new Promise((resolve, reject) => {
                    resolve(value);
                })
            }
        }

    }

    window.Promise = Promise;
})(window || global);
```



## 13 实现 Promise.reject() 方法 

```js
(window => {
    class Promise {
       /**
         * 返回新的失败状态的Promise实例，该方法添加到类本身(静态方法)
         * @param {Mixed} value 该参数作为返回值的result
         */
        static reject(value) {
            return new Promise((resolve, reject) => {
                reject(value);
            });
        }
    }

    window.Promise = Promise;
})(window || global);
```





## 14 实现 Promise.all() 方法

```
1 参数是可遍历对象
  1.1 所有成员都是成功状态，返回的promise也是成功状态，reuslt 是数组，包含每个成员的result
  1.2 有一个成员失败，返回的promise也是失败，result是第一个失败成员的result
2 参数不是可遍历对象
  返回失败状态的promise
```

```js
(window => {
    class Promise {
        /**
         * 当传入的所有Promise实例都完成才返回一个Promise实例,该方法添加到类本身(静态方法)
         * @param {Iterable} items 里面的成员都是Promise对象,不是Promise也会用Promise.resolve()变为Promise对象 
         * @return {Promise} 所有成员都成功状态成功
         */
        static all(items) {
            return new Promise((resolve, reject) => {
                if (typeof items[Symbol.iterator] === 'function') {
                    // 将参数 items 转为数组
                    const itemsArr = Array.from(items);
                    // 记录每个成员成功之后的结果
                    const resArr = Array(itemsArr.length); 
                    // 遍历所有成员
                    itemsArr.forEach((item, index) => {
                        const p = Promise.resolve(item);  // 处理每个成员
                        p
                        .then(res => {
                            resArr[index] = res;
                            // 如果resArr填充满了，说明所有的成员都完成了
                            if ((resArr.filter(()=>true)).length === itemsArr.length) {
                                resolve(resArr);
                            }
                        })
                        .catch(reason => {
                            reject(reason);
                        });
                    })
                } else {
                    // 说明参数items不是可遍历对象
                    reject('argument must is a iterable');
                }
            })
        }
    }

    window.Promise = Promise;
})(window || global);
```



## 15 实现 Promise.race() 方法 

```
1. 传入可遍历对象，一个完成，就最终完成
2. 参数不是可遍历对象，返回失败状态的promise
```

```js
(window => {
    class Promise {
       /**
         * 传入的多个Promise实例只要一个先完成就返回一个Promise实例，该方法添加到类本身(静态方法)
         * @param {Iterable} items 里面的成员都是Promise对象,不是Promise也会用Promise.resolve()变为Promise对象 
         * @return {Promsie}
        */
        static race(items) {
            return new Promise((resolve, reject) => {
                if (typeof items[Symbol.iterator] === 'function') {
                    // 遍历 items
                    for (let item of items) {
                        const p = Promise.resolve(item);
                        p.then(resolve, reject)
                    }
                } else {
                    reject('argument must is a iterable');
                }
            });
        }
    }

    window.Promise = Promise;
})(window || global);
```

