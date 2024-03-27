# let 和 const 关键字

## let 关键字

**let 关键字的作用：** 

```js
用于创建变量，代替 var 关键字
let 变量名 = value;
```

**let 关键字声明的变量与 var 关键字声明的变量有哪些区别：**

```js
1. let 创建的变量不能重复声明
2. let 创建的变量不会提升
3. let 创建的全局变量不是全局对象的属性
4. let 创建的变量除了具有全局作用域、函数内作用域，还具备块级作用域

块级作用域：大括号｛｝内的作用域。
｛｝代表对象，
```



## const 关键字

**const 关键字的作用：**

```js
用于创建变量，const 创建的变量值不能修改，const 创建的变量也可以称为常量
const 常量名 = value;
语法规范：建议常量名全部使用大写


变量的值：内存中地址，栈中的数据。
变量的属性：堆中的数据。
```

**const 声明的变量与 let 声明的变量的区别：**

```js
let 声明的变量，不能重复声明，但可以修改值
const 声明的变量，不能重复声明，也不能修改值
```

**const 声明的变量也具备 let 声明的变量的 4 个特点：**

```js
1. const 创建的变量不能重复声明
2. const 创建的变量不会提升
3. const 创建的全局变量不是全局对象的属性
4. const 创建的变量除了具有全局作用域、函数内作用域，还具备块级作用域
```

## 块级作用域

const let 创建的变量除了具有全局作用域、函数内作用域，还具备块级作用域

```js
1. 分支语句、循环语句等带有 {} 的语句可以产生块级作用域
2. let 声明的变量、const 声明的常量，可以具有块级作用域
```

```js
// 条件语句
if () {}

// switch语句
switch () {}

// for / while循环语句
for () {}
while () {}
do {} while();

// try...catch语句
try () catch (err) {}

// 单大括号
{}
```

创建的变量除了具有全局作用域、函数内作用域，还具备块级作用域

```js
产生块级作用域的情况？
① 大括号中let声明的变量
② 分支结构中
② 循环结构中
```

**块级作用域**：大括号｛｝作为 作用域。

```js
｛｝在ES5中代表对象：属性名+值的形式
｛｝在ES6中也可以代块级作用域
分支结构和循环结构也能创建块级作用域
var创建的只要不是在函数内，都是全局作用域
let 分支结构和循环结构也能创建块级作用域
```

```js
// 获取li的集合，每个li监听个事件
// 使用var创建的变量是全局变量，在for循环过程中，给5个li添加了监听事件
// 当每个li在调用时，console.log输出的i，在回调函数内没有定义，就找到了全局变量中i
// 这时全局变量的i已经是for循环结束的值，i=5,所以每次单机事件的值都是最后一次事件。
var liBoxs = document.querySelectorAll('li');
for (var i = 0; i < liBoxs.length; i ++) {
    liBoxs[i].onclick = function() {
        console.log(i);
    }
}


// 获取li的集合，每个li监听个事件
// 使用let创建的变量是块级变量，在for循环过程中，给5个li添加了监听事件
// 每个li都放在块级作用域中，每个块级作用域中的i的值都不一样。
// 当单机事件被调用时，回调函数使用上层作用域｛块级作用域｝i的值就不一样。
var liBoxs = document.querySelectorAll('li');
for (let i = 0; i < liBoxs.length; i ++) {
    liBoxs[i].onclick = function() {
        console.log(i);
    }
}

// 条件语句
if () {}

// switch语句
switch () {}

// for / while循环语句
for () {}
while () {}
do {} while();

// try...catch语句
try () catch (err) {}

// 单大括号
{}
```

块级作用域的作用

`不用闭包`