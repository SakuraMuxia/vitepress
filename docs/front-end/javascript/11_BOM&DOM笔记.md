# Day11 BOM&DOM 课堂笔记

## 1 回顾 内置对象

```js
1. Number
2. String
3. Math 
4. Date
5. Array
```

结合操作，结合案例理解，不能只看中文。

## 2 内置对象

### 2.1 Function

Function 是所有函数的构造函数，Function 也是自己的构造函数，Function 实例的属性方法：

```js
length		获取形参的数量

call()		调用函数并设置函数里面的this，第二个参数开始后面的参数都是给所调用的函数使用的
call()		call的返回值就是函数调用后的返回值 不指定this默认是window

apply()		调用函数并设置函数里面的this，第二个参数是数组，数组中的元素作为函数的参数


bind()		调用函数并永久设置函数里面的this，返回值为 永久设置this的新函数

```

.call案例

```js
// 创建对象
var user = {
    name: '曹操',
    getInfo: func
};

// 调用函数  window调用，里面的this指向 window
func(10, 20);
user.getInfo(4, 6);
console.log('');

// 执行 func 函数类型的对象的 call 方法； 函数会被调用
// call 调用 func的同时可以设置里面的 this
var res = func.call({name:'高小乐'}, 10, 6);
user.getInfo.call([10,20,30], 8, 5);
console.log(res);
console.log('');
```

.call案例2

```js
// 使用 forEach 遍历字符串
var str = 'Hello高小乐';
// Array.prototype.forEach(function(){}); forEach系统默认遍历的是this
[].forEach.call(str, function(item,index, arr){
    console.log(item, index);
});
console.log('');

var str1 = [].reduceRight.call(str, function(prev, item){
    return prev + item
});  
console.log(str1);  
console.log('');
```

```js
var str1 = [].reduceRight.call(str, function(prev, item){
    return prev + item
});  
console.log(str1); 
```

.bind案例

```js
function func(num01, num02) {
    console.log('func被调用了：', num01*num02, this);
    return num01+num02;
};

// var fn01 = func;
var fn01 = func.bind([10,20,30,40,50]); //第一个参数 设置函数fn01里的this 永久为数组
console.log(fn01(10, 20));
console.log('');
// 函数科里化
var fn02 = func.bind([10,20,30], 10000); //第二个参数 设置函数fn02中第一个参数的值，以此类推

console.log(fn02(2)); //函数调用，传入参数，设置函数fn02中的第二个参数的值。
console.log('');

var fn03 = func.bind([10,20,30], 100, 200);
console.log(fn03());

```



### 2.2 Global

ECMAScript 标准中规定了一个全局对象 Global，像 Array、Number、 String、isNaN、isFinite 等都是 Global 的属性。

浏览器上存在 window 对象，向alert、prompt 等都是 window 的属性，运行在浏览器上的 JS，Global 就是 window。

```
eval()					参数是字符串，将字符串作为代码执行
encodeURI()				对URL进行编码
decodeURI()				对编码后的URL进行解码
```



## 3 DOM 部分知识点介绍

DOM 全称 Document Object Model，译为文档对象模型。

DOM 是 HTML 文档为 JavaScript 提供的能够对 HTML 文档进行相关操作的 API。

```
1. 获取元素  
   document.getElementById()

2. 给元素添加事件
   元素对象.oncilck = function() {};

3. 设置元素的 CSS 样式
   元素对象.style.属性名 = '值';

4. 设置元素中的文字内容
   元素对象.innerHTML = '内容';
```



## 4 BOM

BOM 全称 Browser Object Model，译为浏览器对象模型。

BOM 是浏览器为 JavaScript 提供的能够对浏览器进行相关操作的 API。

### 4.1 window

window 表示浏览器窗口，打开页面的时候会自动创建； 运行在浏览器上的 JS，window 是全局对象， 所有的全局变量都是 window 的属性，使用 window 的属性可以省略 `window.`。

#### ① 弹框

```js
// 警告框  没有返回值
alert()

// 确认框  返回布尔值
confirm()

// 输入框  返回用户输入的内容（string）
prompt()
```

#### ② 打开关闭窗口

```
open()		打开新窗口
close()		关闭本窗口，要求该窗口必须是 open 打开的
```

```js
// 打开空白窗口
open();

// 打开新窗口 指定网页
open('网页地址');

// 在指定的窗口打开网页 
open('网页地址', '窗口名称');

// 打开新窗口指定尺寸
open('网页地址', '', 'width=400,height=300')
```

#### ③ 页面滚动

```
scrollTo()		页面滚动到指定位置，设置坐标
scrollBy()		页面滚动指定距离，设置距离
```

```js
// 设置两个参数作为坐标
scrollTo(0, 0);

// 设置一个参数，该参数是对象
scrollTo({
    left: 0, 
    top: 0,
    behavior: 'smooth'
});

// 设置两个参数作为滚动的距离
scrollBy(100, 100);

// 设置一个参数，该参数是对象
scrollBy({
    top: 600,
    behavior: "smooth"
});
```

#### ④ 定时器

**多次定时器：**

```js
setInterval(回调函数, 时间间隔)		时间间隔单位是毫秒，默认值是 0， 返回定时器标记
clearInterval(定时器标记)		  停止定时器，指定定时器标记
```

**单次定时器：**

```js
setTimeout(回调函数, 时间间隔)		时间间隔单位是毫秒，默认值是 0， 返回定时器标记
clearTimeout(定时器标记)			  停止定时器，指定定时器标记
```

#### ⑤ window 对象属性和方法总结

```
name			窗口的名字，可读可写
innerWidth		读取视口的宽度
innerHeight 	读取视口的高度
document		获取文档对象 DOM对象
history			
location
navigator
screen

alert()
confirm()
prompt()
open()
close()
scrollTo()
scrollBy()
setTimeout()
setInterval()
clearTimeout()
clearInterval()
```

### 4.2 history

history 表示**本窗口的历史记录**， 相关属性方法如下：

```
length			获取本窗口历史记录的数量

back()			回到历史记录上一个
forward()		回到历史记录下一个
go()			设置一个数字作为参数，正数前进，负数后退
```

### 4.3 location

location 表示本窗口的地址信息，相关属性方法如下：

```
href		完整的url，可读可写
protocol	协议部分，可读可写
hostname	主机名，可读可写
port		端口号，可读可写
host		主机名和端口号，可读可写
pathname	文件路径，可读可写
hash		锚点信息，可读可写
search		参数信息，可读可写

reload()	刷新页面
assign()	页面跳转，设置一个地址作为参数，留下历史记录
repalce()	页面跳转，设置一个地址作为参数，不会留下历史记录
```

### 4.4 navigator

navigator 用于表示浏览器版本信息以及操作系统信息，属性如下：

```
userAgent		获取客户端浏览器信息
```

### 4.5 screen

screen 用于表示屏幕相关信息，属性如下：

```
width		获取屏幕宽度
height		获取屏幕高度
```









## 作业

```
1. 页面滚动
2. 电子钟表
3. 倒计时（选做）
```



