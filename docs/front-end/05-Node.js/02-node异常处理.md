# 异常处理语法

## Error 对象

```js
new Error('错误的信息');
```

## throw 主动抛出错误

```js
throw 100;	// 抛出100
throw 'Hello World';
throw new Error('高小乐 is not defined'); //抛出错误对象
```

## try catch 结构

作用：把错误的影响，缩小在最小范围内。

```js
try {
    // 系统报错  调用不存在的函数
    getInfo();

    // 主动抛出的错误
    // throw new Error('xiaole is not defiend');
} catch (err) {
    console.log('捕获到错误：', err.errno, err.message);
}
```

```js
1. try 里面的错误会被 catch 捕获，不论是代码错误还是主动抛出，捕获到错误之后由程序员处理，系统不会报错
2. try catch 不论是否抛出错误，都不影响后面的语句的执行
3. try 内部，错误后面的语句不会执行
```

