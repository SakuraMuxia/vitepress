# 模板引擎

- 渲染产生HTML
- 替换HTML中的数据内容
- 通过模板引擎的模板继承功能或模版包含功能实现页面的复用(如页头,页脚等)

## 模板引擎设置

需要使用 [ejs](https://www.npmjs.com/package/ejs) npm包

```js
npm install ejs
```



```js
//1. 设置 express 所使用的模板引擎 会根据这里的设置自动引入模板引擎，无需再写 require()
app.set('view engine', 'ejs');

//2. 设置模板文件的存放目录
app.set('views', path.join(__dirname, 'pages'));
```

## 渲染

render() 	方法用于加载模板文件 放入数据 响应给客户端

```js
render() 第一个参数是模版文件的文件名，第二个参数是一个对象
```



```js
app.get('/', function (req, res) {
  // 会在模板文件的存放目录中查找 index.ejs 文件
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});
```

## 修改模板文件扩展名

```js
const ejs = require('ejs');

//1. 更改模板引擎名字为 html
app.engine('html', ejs.renderFile);
//2. 设置 express 所使用的模板引擎 
app.set('view engine', 'html');
//3. 设置模板文件的存放目录
app.set('views', path.join(__dirname, 'pages'));
```

## EJS 模板引擎

### 定界符

#### ①执行语句

```ejs
<% code %>
```

```ejs
<% top.forEach(item => { %>	// 这里括号包裹的只能是语句 ，变量等JS语法，不能是HTML语法
    <tr>
        <td><%= item.id %></td>
        <td><%= item.name %></td>
        <td><%= item.money %> 亿美元</td>
    </tr>
<% }) %> // 这里括号包裹的只能是语句 ，变量等JS语法，不能是HTML语法
```

#### ②输出转义的数据

```ejs
<%= code %>
```

```js
<p class="alert alert-warning">
    <%= Date.now() %> <br>
    <%= Math.random() %> <br>
    <%= 10 * 7 + 8 %> <br>
</p>
```

#### ③输出非转义的数据

```ejs
<%- code %>
```

```mjs
<%= code %> 如果 code 的值中有html标签，会被转义成字符实体，原样显示
<%- code %> 如果 code 的值中有html标签，浏览器会解析处理
```

#### ④注释标签

```ejs
`<%#` 注释标签，不执行、不输出内容
```

#### ⑤结束标签(定界符)

- `%>` 一般结束标签
- `-%>` 删除紧随其后的换行符

#### ⑥模板内使用JavaScript

```ejs
<%= new Date() %>
<%= 1 + 100 %>
<%= nameList.join(',') %>


```

#### ⑦ includes 语法

```ejs
<ul>
  <% users.forEach(function(user){ %>
    <%- include('user/show', {user: user}) %>
  <% }); %>
</ul>
<%- include('header') -%>
<h1>
  Title
</h1>
<p>
  My page
</p>
<%- include('footer') -%>
```

## Express 项目生成器

使用npm包[express-generator](https://www.npmjs.com/package/express-generator)

```js
express-generator自带body-prase中间件把req.body中的数据转为对象
```

**全局安装：**

```shell
npm install -g express-generator
```

**运行命令生成目录结构并指定模板引擎为 ejs：**

```shell
express --view=ejs
```

**安装依赖:**

```shell
npm install
```

**启动项目：**

```shell
npm start
```

> 注意不要直接运行入口文件！



## 记账本项目

需要使用 [lowdb](https://www.npmjs.com/package/lowdb/v/1.0.0) npm包，用于存储少量数据

```js
npm i lowdb@1.0.0 
```

```js
第一步： 使用 express-generator 创建目录结构并安装依赖
	   express --view=ejs
	   npm install

第二步： 设计路由
      GET /  				    重定向到 /account
      GET /account			    展示账单列表
      GET /account/create       添加表单页面
      POST /account/create  	执行添加
      GET  /account/delete/:id  执行删除	
   
第三步： 模板和静态资源设置
	  1. 将账单相关模板文件放入 views 下的 account 目录中
	  2. 将模板所需要的css、js 放入静态资源目录 public
	  3. 路由回调函数渲染对应的模板
	  
第四步： 添加账单记录
      1. get  /account/create 
         给表单控件设置 name, 给 form 设置 method 和 action
      2. post /account/create  
         取出请求体
         使用 shortid 创建唯一 id
         将id和请求体里的数据添加到 lowdb 中（提取进行手动初始化）
         渲染 success 模板
         
第五步： 账单列表
       get /account
       1. 从lowdb中取出所有账单
       2. 渲染模板，向模板发送数据
       3. 在模板中展示数据
          遍历
          三元运算符
          双向分支
          
 第六步： 删除指定的账单
       1. 在列表页模板中设置超级链接，将id拼接到路径中
       2. get /account/delete/:id
          获取id
          根据id从lowdb中删除对应的记录
          渲染 success 模板
```
