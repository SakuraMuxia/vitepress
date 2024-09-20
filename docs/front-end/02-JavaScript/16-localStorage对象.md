# localStorage

## 介绍

localStorage 是一种 Web 存储机制，可以用于在浏览器中存储和访问数据。它允许前端开发人员在客户端存储键值对，并且在用户关闭浏览器后，数据仍然可以保留。

## 方法

| 方法                | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| setItem(key, value) | 存储或修改值，其中 key 是字符串类型的键，value 可以是任何类型的值。 |
| getItem(key)        | 根据键获取值。                                               |
| removeItem(key)     | 删除指定键的值。                                             |
| clear()             | 删除所有键值对。                                             |

```javascript
localStorage 是window的属性，它是一个全局变量 HTML5新增。

localStorage.setItem('useranem', 'shirly');
localStorage.setItem('address', '上海');
localStorage.setItem('users', [10,20,30,40,50,60]);

console.log(localStorage.getItem('useranem'));
console.log(localStorage.getItem('address'));
console.log(localStorage.getItem('users'));

localStorage.removeItem('address');
localStorage.clear();
```



# sessionStorage

## 介绍

sessionStorage 是一种 Web 存储机制，类似于 localStorage。它允许开发人员在客户端存储键值对，并且在用户关闭浏览器标签页或浏览器窗口后，数据将被删除。sessionStorage 通常用于存储临时数据，比如用户在网站上填写表单时，可以将表单数据存储在 sessionStorage 中，以便在用户提交表单时使用。 

## 方法

| 方法                | 描述                                                         |
| ------------------- | ------------------------------------------------------------ |
| setItem(key, value) | 存储或修改值，其中 key 是字符串类型的键，value 可以是任何类型的值。 |
| getItem(key)        | 根据键获取值。                                               |
| removeItem(key)     | 删除指定键的值。                                             |
| clear()             | 删除所有键值对。                                             |

```javascript
sessionStorage.setItem('name', 'shirly');
sessionStorage.setItem('age', 121);
sessionStorage.setItem('address', '北京');

console.log(sessionStorage.getItem('name'));
console.log(sessionStorage.getItem('age'));
console.log(sessionStorage.getItem('address'));


```

仅存放在同一个网页，已关闭网页就无了

## 注意

```js
本地存储，存储的数据只能存基本数据类型，存不了对象和数组

想存对象和数组怎么办？

JSON.stringify 将对象或数组转化为 json格式的字符串
读取数据：
JSON.parse(JSON格式字符串)===》 JSON格式字符串还原成 对象或数组
```

```js
let todos = [
    {
        id:1,
        title:'吃饭',
        isDone:false
    }
]

localStorage.setItem('todos', todos); // [object Object] 读取数据的时候还原不了
localStorage.setItem('todos', JSON.stringify(todos)) // 存储为json格式字符串

// 读取数据
let res = localStorage.getItem('todos')
let resTodos = JSON.parse(res) // json格式字符串转换为对象

// 如果读取一个不存在的 key 返回null
let res = localStorage.getItem('tssssx') // tssssx 是一个不存在的key,getItem方法的返回值是一个null
```



## 区别

## localStorage 和 sessionStorage 的区别

 localStorage 和 sessionStorage 的主要区别在于它们的作用域和生命周期。   

1. 作用域：localStorage 存储的数据在同一个域名下的所有页面间共享，即使页面被关闭或浏览器被重启，数据仍然存在。而 sessionStorage 存储的数据仅在同一个窗口或标签页内共享，如果用户关闭了窗口或标签页，数据也会被删除。   

2. 生命周期：localStorage 存储的数据没有过期时间，除非被程序或用户删除。而 sessionStorage 存储的数据只在当前会话（session）有效，当用户关闭浏览器窗口时，数据将被删除。   

因此，localStorage 适合用于存储长期有效的数据，比如用户的偏好设置、历史记录等；而 sessionStorage 适合用于存储短期有效的数据，比如表单数据、临时状态等。 

## localStorage、sessionStorage 与 cookie 的区别

localStorage 和 sessionStorage 是 HTML5 中提供的 Web 存储机制，而 cookie 是 HTTP 协议中的一种机制，它们之间有以下区别： 

1. 存储大小：

   cookie 的存储大小一般为 4KB 左右。

   localStorage 和 sessionStorage 的存储大小一般为 5MB 左右。 

2. 设置方式：

   cookie 即可以后端程序通过设置响应头让浏览器设置，也可以前端程序使用 `document.cookie` 进行设置。

   localStorage 和 sessionStorage 只能前端程序进行设置。 

3. 有效期：

   cookie 可以设置过期时间。

   localStorage 长期存在，直到主动删除；  sessionStorage 在用户关闭浏览器后会被删除。

4. 与服务器的交互：

   cookie 在每次 HTTP 请求中自定添加到请求头被发送到服务器，而 localStorage 和 sessionStorage 不会，也可以自行设置。 

5. 安全性：

   cookie 可以设置 HttpOnly 属性，防止被 JavaScript 访问，从而提高安全性，而 localStorage 和 sessionStorage 可以被 JavaScript 直接访问，安全性较低