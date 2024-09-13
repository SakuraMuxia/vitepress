# React入门

## 认识React

- React 中文文档1(国内社区)：https://react.docschina.org/   
- React 中文文档2(官方)：https://zh-hans.reactjs.org   

### React 概述

React 是一个用于`构建(动态显示)用户界面`的 JavaScript 库。 

> React 起源于 `Facebook` ,并于 2013 年 5 月开源 
>
> React本身只关注界面, 其它如：前后台交互、路由管理、状态管理等都由其扩展插件或其它第三方插件搞定
>
> React全家桶： react 、 react-router-dom、  redux

### React 三个特点

- 1 声明式  ==> 命令式编程    arr.filter(item => item.price>80)
  - 利用JSX 语法来声明描述动态页面， 数据更新界面自动更新
  - 我们不用亲自操作DOM, 只需要更新数据, 界面就会自动更新
  - React.createElement() 是命令式
- 2 组件化
  - 将一个较大较复杂的界面拆分成几个可复用的部分封装成多个组件， 再组合使用
  - 组件可以被反复使用
- 3 一次学习，随处编写
  - 不仅可以开发 web 应用（react-dom），还可以开发原生安卓或ios应用（react-native）

### React 开发的网站

可以通过插件查看验证

- MDN: https://developer.mozilla.org/zh-CN/
- 知乎: https://www.zhihu.com/
- 阿里云: https://www.aliyun.com/
- 美团: https://bj.meituan.com/
- 飞猪旅行: https://www.fliggy.com/?spm=181.11358650.0.0.6718223eLhsSSU

### 安装VSCode插件

- ES7+ React 作者dsznajder
- open in browser

### 配置Vscode代码片段

```sh
1. 文件->首选项->配置用户代码片段->新代码片段->回车->创建一个代码片段文件

2. 复制粘贴以下内容
```

```
字段解释
prefix:唤醒词
scope: 生效的文件
body: [] 生成的代码，一个元素代表一行
$1 $2 光标停留的位置
```

```xml
{

	"react模板":{
		"prefix": "!react",
		"body": [
			"<!DOCTYPE html>",
			"<html lang=\"en\">",
			"<head>",
				"\t<meta charset=\"UTF-8\">",
				"\t<title>Title</title>",
				"\t<script src=\"./lib/react.development.js\"></script>",
				"\t<script src=\"./lib/react-dom.development.js\"></script>",
				"\t<script src=\"./lib/babel.min.js\"></script>",
			"</head>",
			"<body>",
			"\t<div id=\"root\"></div>",
			"</body>",
			"<script type=\"text/babel\">",
			"\tconst root = ReactDOM.createRoot(document.querySelector(\"#root\"));",
			"\troot.render((",
				"\t\t<div></div>",
			"\t))",
			"</script>",
			"</html>"
		],
		"description": "快速构建react模板页页面"
	},
    "react模板2":{
		"prefix": "!react2",
		"body": [
			"<!DOCTYPE html>",
			"<html lang=\"en\">",
			"<head>",
				"\t<meta charset=\"UTF-8\">",
				"\t<title>Title</title>",
				"\t<script src=\"./lib/react.development.js\"></script>",
				"\t<script src=\"./lib/react-dom.development.js\"></script>",
			"</head>",
			"<body>",
			"\t<div id=\"root\"></div>",
			"</body>",
			"<script>",
			"\tconst root = ReactDOM.createRoot(document.querySelector(\"#root\"));",
			"\troot.render((",
				"\t\t<div></div>",
			"\t))",
			"</script>",
			"</html>"
		],
		"description": "快速构建react模板页页面"
	}
}
```

### 删除代码片段

```bash
1. 显示文件路径：查看->外观->痕迹导航
2. 按照目录-找到文件删除即可
```



## React基本使用

### 基本使用步骤

> 1. 导入 React对象
> 2. 导入ReactDOM对象
> 3. 提供react挂载的入口
> 4. 创建react的根节点[ ReactDOM.createRoot]
> 5. 使用render方法渲染

1. 引入两个JS文件（ 注意引入顺序 ）

   ```javascript
   <!-- react库, 提供全局React对象 -->
   <script src="../js/react.development.js"></script>
   <!-- react-dom库, 提供了全局ReactDOM对象 -->
   <script src="../js/react-dom.development.js"></script>
   ```

2. 在html定义一个根容器标签 

   ```html
   <div id="root"></div>
   ```

3. 创建react元素(类似html元素)

   ```js
   // 返回值：React元素 
   // 参数1：要创建的React元素名称 => 字符串
   // 参数2：元素的属性  => 对象 {id: 'box'} 或者 null
   // 后面参数：该React元素的所有子节点 => 文本或者其他react元素
   const element = React.createElement(
     'h1', 
     {title: '你好, React!'}, 
     'Hello React!'
   )
   ```

4. 渲染 react 元素

   ```js
   // 渲染React元素到页面容器div中
   ReactDOM.render(element, document.getElementById('root'))
   ```

**使用案例**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!--1. 得到一个全局对象 React 提供了react核心的方法-->
    <script src="./lib/react.development.js"></script>
    <!--1. 得到一个全局对象 ReactDOM,用来操作 dom的 -->
    <script src="./lib/react-dom.development.js"></script>
</head>
<body>
    <!--2. 提供一个出口 -->
    <div id="root"></div>

    <script>
        console.log(React);
        console.log(ReactDOM);
        // 3. 让react 和 dom建立联系
        /**
         * 创建一个根节点
         * create 创建
         * root   根
         * createRoot 创建一个根节点
         * 
         */
        const root = ReactDOM.createRoot(document.getElementById('root'));
        // 4. 在根节点中使用render方法渲染,render的内容会出现在 div#root中
        root.render('我是react代码');
    </script>
</body>
</html>
```

### 注意事项

```sh
1. dom元素和react根节点root必须一一对应
2. render函数可以重复调用，后面的覆盖前面的
3. 不要使用body 和 html作为react的根节点
```

**使用案例**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="./lib/react.development.js"></script>
    <script src="./lib/react-dom.development.js"></script>
</head>
<body>
    <div id="root"></div>
</body>
<script>
    // 1. dom容器 和 react的根节点需要是一一对应的,虽然可以正常渲染，但是控制台会有警告
    const root1 = ReactDOM.createRoot(document.querySelector("#root"))
    const root2 = ReactDOM.createRoot(document.querySelector("#root"))
    
    root2.render('root2')
    root1.render('root1')

    // 2. render函数可以重复调用，后面的会覆盖前面的
    const root = ReactDOM.createRoot(document.querySelector("#root"));
    root.render('第一次渲染');
    root.render('第二次渲染');

    // 3. 根节点不要使用 body 和 html
    const root = ReactDOM.createRoot(document.body); // body
    const root = ReactDOM.createRoot(document.documentElement); // html
    root.render('第一次渲染');
</script>
</html>
```

### 理解 React 元素

```sh
React元素也称`虚拟 DOM` (virtual DOM) 或`虚拟节点`(virtual Node)，它就是一个普通的 JS 对象, 它不是真实 DOM 元素对象。

虚拟 DOM 可以转换为对应的真实 DOM 通过 ReactDOM.render方法将虚拟DOM转换为真实DOM再插入页面
虚拟 DOM 对象包含了对应的真实 DOM 的关键信息属性

真实DOM的特点：操作真实dom，当改变dom元素的几何属性的时候，会导致自身及相关元素位置的重新计算，这个重新计算的过程叫做重排，重排后重新渲染的过程叫做重绘。

什么是几何属性？一个元素的宽高、位置、边框、margin、padding

操作真实DOM的弊端，会导致大量的重排和重绘，效率较低

真实DOM本质也是一个对象，属性较多200多个

react引入虚拟dom 的概念，可以减少页面的重排和重绘

虚拟DOM的特点:

1. 本质就是一个对象：属性较少【9个属性】
2. 虚拟dom有的属性和真实dom的属性是一一对应的
3. 虚拟dom通过render方法，可以转化为真实dom
4. 在react中，虚拟dom 也称之为 react元素
5. 在react中如何创建虚拟dom？
   5-1. React.createElement
   5-2. 通过 jsx 语法创建
```

### 创建react元素

1. 通过` createElement `方法创建react元素

```sh
React.createElement(标签名,标签属性, 子元素1, 子元素2,....)

标签名 => type: "h1"
标签属性 => props: {title: '你好, React!'}
子节点 => props: {children: 'Hello React!'}

如果没有属性，怎么创建？第二个参数需要占位 {}、null、undefined

特殊属性：className

当创建复杂页面结构，标签需要嵌套的时候，写法非常的麻烦，所以，引入了jsx语法，用来快速创建复杂页面的结构的react元素

react元素写法注意：
标签和html5中不太一样，需要闭合或者单标签
<input /> 或 <input></input>
不能写成
<input>
```

使用案例：

```js
// 创建根节点
const root = ReactDOM.createRoot(document.querySelector("#root"));
/**
 * 创建react元素[虚拟dom]
 * React.createElement(标签名,标签属性, 子元素1, 子元素2,....)
 */
const oDiv = React.createElement('div',{id:'box', school:'atguigu'},'我是div','我真的是div')

// oDiv就是一个对象  type是标签名 props是属性 props.children是子元素
console.log('oDiv: ', oDiv);

// 通过render方法，将react元素渲染到页面
root.render(oDiv);

// 如果没有属性，怎么创建？第二个参数需要占位 {}、null、undefined
const oSpan = React.createElement('span',{},'我是span标签');
const oSpan = React.createElement('span',null,'我是span标签');
const oSpan = React.createElement('span',undefined,'我是span标签');

// 用任何值占位都可以，但是不推荐，推荐以上三种
const oSpan = React.createElement('span',[],'我是span标签');
const oSpan = React.createElement('span',1231232132435,'我是span标签');
root.render(oSpan);
```

* 特殊属性className：用来设置react元素上的class类名

```js
const root = ReactDOM.createRoot(document.querySelector("#root"));

// 属性：普通属性、自定义属性
const oDiv = React.createElement('div', { id: 'box', school: 'atguigu',className:'wrapper' }, '内容');

/**
* 特殊属性className
* class 是 es6 定义类的关键字，为什么class使用className?
* 虚拟dom真实dom属性一一对应的，虚拟dom最终会转化为真实dom，因为真实dom用的是className
*/

root.render(oDiv)

// 真实dom用的就是className
console.dir(document.querySelectorAll('.wrapper')[0]);
```

2. 通过 `jsx `语法创建react元素

## jsx语法

jsx是react特有的语法，用于快速创建react元素，需要用`babel`编译成浏览器可识别的js代码，编译后的代码还是 React.createElement的方式。

> jsx相当于xml和js的结合体。

xml的特点：

```xml
<user>
	<name>迪丽热巴</name>
 	<age>30</age>
</user>
```

xml：使用自定义标签的形式表示数据属性，后来被json格式取代

### 基本使用步骤

```js
1. 导入babel
2. script标签更改类型 type='text/babel'
3. jsx 代码块用()包裹，方便代码快速格式化
```

**使用案例**

```jsx
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="./lib/react.development.js"></script>
    <script src="./lib/react-dom.development.js"></script>
    <script src="./lib/babel.min.js"></script>
</head>

<body>
    <div id="root"></div>
</body>

<script type="text/babel">
    /*
     * jsx: xml + js 的混合语法
     * 是react特有的，用来创建react元素[虚拟dom],作用跟 React.createElement一样
     */
     
    const root = ReactDOM.createRoot(document.querySelector("#root"));
    const oDiv = (
        <div className="wrapper">
            <div className="swipper">
                <h3>我是轮播图</h3>
                <p>我是文字</p>
            </div>
            <span>我是span</span>
            <span>我也是span</span>
        </div>
    )
    
    console.log(oDiv) // 虚拟DOM对象
    
    root.render(oDiv) // 渲染oDiv
</script>
</html>
```

### 插值表达式

```sh
语法：{ js表达式 }
可以渲染 react 元素
```

```sh
js表达式和js语句的区别？

1. js表达式都是有值的，可以用变量接收或者 使用 console进行打印
2. js语句是控制代码执行顺序的，是没有值的，不能存入变量也不能打印

js表达式包括
1. 常量、变量：(usonb:you are so nb) undefined string object null number boolean
2. 三元表达式: 
3. 逻辑运算表达式
4. 函数调用:return 返回一个值

js语句包括
1. 赋值语句： `var a = 1;`
2. if ...else
3. switch case
4. 循环语句等
```

```jsx
jsx 中的 插值表达式语法： { js表达式 }

js表达式的类型如果是：

number：正常输出
string：正常输出
boolean:不输出内容
null,undefined:不输出内容
对象会报错(设置元素行内样式除外)
数组: 遍历每一个元素输出
函数调用：输出return的值,无return返回undefined
```

**使用案例**

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>React功能验证</title>
    <script src="./lib/react.development.js"></script>
    <script src="./lib/react-dom.development.js"></script>
    <script src="./lib/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>
</body>
<script type="text/babel">
    const root = ReactDOM.createRoot(document.querySelector("#root"))

    let a = 123
    const str = 'abc'
    const isLoading = true
    const fn = function(){
        return 100
    }
    root.render((
        <div>
            <p>{a}</p>
            <p>{str}</p>
            <p>{true}</p>
            <p>{undefined}</p>
            {/* 对象报错 */}
            {/* <p>{{ username: 'atguigu', age: 20 }}</p> */}
            <p>数组: {['a', 'b', 'c', 'd']}</p>
            {/* 对象报错 */}
            {/* <p>数组: {[{ name: 'atguigu' }, { name: '迪丽热巴' }]}</p> */}
            <p>{isLoading ? '页面加载中.....' : '页面内容'}</p>
            {5 && 8}
            <p>{fn()}</p>
        </div>
    ))
</script>
</html>
```

插值表达式给标签属性赋值

```jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));
let width = 200;
let height = 100;

let styles = {
    width: 200,
    height: 100,
    border: 1
}

root.render((
    <div>
        {/* 方式1：直接修改 */}
        <table border="1" width={width} height={height}>
            <tbody>
                <tr>
                    <td>1</td>
                </tr>
            </tbody>
        </table>
		{/* 方式2：通过对象的形式修改 */}
        <table border={styles.border} width={styles.width} height={styles.height}>
            <tbody>
                <tr>
                    <td>1</td>
                </tr>
            </tbody>
        </table>
		{/* 方式3：使用拓展运算符修改，React自动将 ":" 转为 "=" 处理*/}
        <table {...styles}>
            <tbody>
                <tr>
                    <td>1</td>
                </tr>
            </tbody>
        </table>
    </div>
))
```

**jsx中注释的写法**

```jsx
{/*
	在插值表达式之中写js注释
	<p>对象：<span>{{username:'atguigu',age:20}}</span></p>
*/}
```

### 条件渲染

插值表达式也可渲染 react元素

```jsx
通过js表达式的条件判断 插值表达式渲染哪部分 react 元素

单分支: 逻辑运算符实现
双分支: if...else 或 三元运算符
多分枝: 使用函数逻辑判断
```

**使用案例**

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>React功能验证</title>
    <script src="./lib/react.development.js"></script>
    <script src="./lib/react-dom.development.js"></script>
    <script src="./lib/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>
</body>
<script type="text/babel">
    const root = ReactDOM.createRoot(document.querySelector("#root"));
    const flag = true;
    const isLoading = false;
    const oDiv = (
        <div>
            我是div
        </div>
    )
    function isWatchTV(age) {
        if (age < 18) {
            return <div>请在父母的陪同下观看</div>
        } else if (age > 18 && age < 60) {
            return <div>敬请欣赏</div>
        } else if (age > 60 && age < 80) {
            return <div>保重身体</div>
        }
    }
    // 单分支 if写法
    let single = null;
    if (flag) {
        single = <div>一起看电影</div>
    }

    root.render((
        <div>
            <h4>插值表达式也可以渲染react元素</h4>
            {oDiv}
            <h4>单分支</h4>
            {flag && <div>一起看电影</div>}
            <h4>双分支</h4>
            {isLoading ? <h3>页面正在加载中....</h3> : <div>加载完成</div>}
            <h4>多分支</h4>
            {isWatchTV(16)}
        </div>
    ))
</script>
</html>
```

### 行内样式处理

> style 的值必须是一个对象
>
> 如果是复合属性，需要用小驼峰命名法  backgroundColor 
>
> 单位如果是px，那么可以省略，直接写数字

**使用案例**

```jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));
let style = {
    color: 'red',
    border: '1px solid blue',
    backgroundColor: 'pink',
    width: '200px',
    height: 500,
    fontSize: 30
}
root.render((
    <div>
        <h3>行内样式style处理</h3>
        <div style={{ color: 'red', border: '1px solid blue', backgroundColor: 'pink', width: '200px', height: 500, fontSize: 30 }}>红色文字，蓝色边框，粉色背景</div>

        <div style={style}>我是div</div>
    </div>
))
```

### Class样式处理

> 1. class是字符串：样式类名 中间用空格隔开
> 2. class是数组：使用join(' '), 拼接字符串用空格连接

**使用案例**

```jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));
let class1 = "box c1 f1"
let class2 = ['box','c1','f1']; 

root.render((
    <div>
        <h3>样式类名</h3>
        <div className="box">
            box1
        </div>
        <div className="box c1 f1">box2</div>
        <h3>插值表达式处理样式</h3>
        <div className={class1}>box3</div>
        <h3>样式是一个数组</h3>
        <!--数组如果不是class属性，使用插值表达式，遍历渲染-->
        <!--数组如果是 class属性，遍历挨个渲染，默认中间用 , 链接-->
        <div className={class2}>box4</div>
        <!--数组如果是 class属性，使用join方法，中间用 空格 链接-->
        <div className={class2.join(' ')}>box5</div>
    </div>
))
```

### 列表渲染

> 列表渲染的原理：根据普通数组的遍历，使用map方法，生成一个react元素的新数组，利用插值表达式渲染数组的特性，进行渲染。
>
> 列表渲染需要给每一个遍历的元素，添加一个唯一不重复的属性 key值，key值推荐使用 id，如果没有id，可以考虑使用索引。

**使用案例**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="./lib/react.development.js"></script>
    <script src="./lib/react-dom.development.js"></script>
    <script src="./lib/babel.min.js"></script>
    <style>
        .f1{
            font-size: 20px;
            color:blue;
        }
    </style>
</head>

<body>
    <div id="root"></div>
</body>
<script type="text/babel">
    /**
     *  列表渲染，要求数据类型 99.99% 都是一个数组
     * 
     *  react列表渲染的原理，就是将普通数据的数组，映射成一个react元素的数组，然后使用插值表达式渲染
     */
    const root = ReactDOM.createRoot(document.querySelector("#root"));
    let arr1 = [1, 2, 3, 4];
    // 数组中的元素，可以是react元素
    let arr2 = [<li>1</li>, <li>2</li>, <li>3</li>, <li>4</li>];

    // 数组的map方法 返回一个新数组，新数组的长度跟原数组一样，新数组每一个元素，可以根据原数组生成,新数组的元素由回调函数的返回值决定

    let arr3 = arr1.map(item => {
        return (
            <li>{item}</li>
        )
    })
    
    // 优化 map映射
    let arr4 = arr1.map(item => (
        <li>
            {item}
        </li>
    ))

    let users = [
        {
            id: 1,
            username: 'atguigu',
            age: 19
        },
        {
            id: 2,
            username: '迪丽热巴',
            age: 29
        },
        {
            id: 3,
            username: '古力娜扎',
            age: 20
        },
    ]

    root.render((
        <div>
            <h3>简单数组元素渲染</h3>
            {arr1}
            <h3>将简单数组，渲染成 ul li 列表</h3>
            <ul>
                {arr2}
            </ul>
            <hr />
            <h3>使用map映射成一个react元素的新数组</h3>
            <ul>
                {arr3}
            </ul>
            <h3>map 映射优化后， 省略return 和 { }</h3>
            <ul>
                {arr4}
            </ul>
            <h3>map 映射列表渲染终极版本</h3>
            <ul>
                {arr1.map(item => (
                    <li>{item}</li>
                ))}
            </ul>

            <hr />
            <h3>数组是对象，复杂数据类型渲染</h3>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <h3 style={{ color: 'red' }}>姓名: {user.username}</h3>
                        <p className='f1'>年龄: {user.age}</p>
                    </li>
                ))}
            </ul>
        </div>
    ))
</script>
</html>
```

使用key值遍历:React的虚拟DOM在重新渲染数据的时候可以复用，节省资源，用Key作为新旧数据比对的依据。

把数据的id作为Key的值。

```jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));
/**
 * 需求：实现评论列表功能

    li> a > [h3 p]

    - 如果有评论数据，就展示列表结构 li（ 列表渲染 ）要包含a标签
    - name 表示评论人，渲染 h3
    - content 表示评论内容，渲染 p
    - 如果没有评论数据，就展示一个 h1 标签，内容为： 暂无评论！
    - 用户名的字体25px, 内容的字体20px
 * 
 */

const list = [
    { id: 1, name: 'jack', content: 'rose, you jump i jump', time: '03:21' },
    { id: 2, name: 'rose', content: 'jack, you see you, one day day', time: '03:22' },
    { id: 3, name: 'tom', content: 'jack,。。。。。', time: '03:23' }
]
root.render((
    <div>
        {list.length === 0 ? <h1> 暂无评论！</h1> : (
            <ul>
                {list.map(item => (
                    <li key={item.id}>
                        {/* 冒泡会重新刷新页面，阻止a标签的默认行为 */}
                        <a href="" onClick={(e)=>e.preventDefault()}>
                            <h3 style={{fontSize:25}}>{item.name}</h3>
                            <p className="f20" onClick={()=>alert(item.time)>{item.content}</p>
                        </a>
                    </li>
                ))}
            </ul>
        )}
    </div>
))
```



## 事件

### 原生DOM事件

> 通过标签属性绑定事件
>
> 1. 语法：on事件名="事件回调函数()" 例如：`onclick='fn()'`
> 2. 事件回调函数的调用者是 window，所以this指向window
> 3. 通过传递实参event（window.event），获取事件对象
> 4. 阻止默认行为：e.preventDefault();
> 5. 可以同时传递普通参数和事件对象
> 6. 如果想获取指向按钮的this，需要通过实参传递
>

```jsx
原生 oninput 事件 和 onchange事件的区别

1. 触发时机不同：
   - oninput: 键盘有输入就立刻触发
   - onchange：内容有变化，并且失去焦点时触发
2. 事件对象不同：
   - oninput：InputEvent
   - onchange：Event
```

原生DOM事件使用案例

```jsx
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>React功能验证</title>
    <script src="./lib/react.development.js"></script>
    <script src="./lib/react-dom.development.js"></script>
    <script src="./lib/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>
    <p><button onclick="fn(event);">按钮</button></p>
    <p><a href="http://baidu.com" onclick="fn(event)">百度</a></p>
    
    <p><button onclick="f1(1,2)">自定义参数和事件对象</button></p>
    <p><button onclick="f2(1,event)">自定义参数和事件对象</button></p>
    <p><button onclick="f3(this)">实参this,指向当前按钮</button></p>
    <input type="text" name="" id="" oninput="f4(event)">
    <input type="text" name="" id="" onchange="f5(event)">
</body>
<script>

    function fn(e) {
        console.log('this: ', this); // window
        console.log('e: ', e); // 事件对象 PointerEvent
        e.preventDefault(); // 阻止默认行为跳转
    }

    function f1(a, b) {
            console.log('a: ', a); // 1
            console.log('b: ', b); // 2
    }

    function f2(a, b) {
        console.log('a: ', a); // 1
        console.log('b: ', b); // 事件对象 PointerEvent
    }

    function f3(_this) {
        console.log('_this: ', _this);// 指向当前按钮:当前点击的按钮对象button
        console.log(this);// window 调用者是window
    }


    function f4(e) {
        //oninput 触发时机，有输入就触发
        console.log('oninput value: ', e.target.value)
        console.log('oninput e: ', e);//事件对象 InputEvent
    }

    function f5(e) {
        // onchange 内容有变化，并且失去交点触发
        console.log('onchange value: ', e.target.value)
        console.log('onchange e: ', e);//事件对象 Event 
    }

</script>
</html>
```

### jsx事件

> 绑定事件的语法：【通过标签属性的方式绑定】，函数名用插值表达式包裹
>
> `<button onClick={函数名}>click</button>`

```jsx
*事件回调函数研究：

*this指向问题：react的事件回调函数的调用者是window，所以this指向window（同原生DOM一致），因为react使用的是严格模式，所以，this指向undefined

*事件对象：
1. react的事件对象默认可以通过第一个形参进行接收
2. react的事件对象是一个经过react处理后的事件对象，原生的事件对象的常用属性都有，并且做了兼容性处理
3. 如果想获取原生的事件对象，可以通过nativeEvent 属性获取
4. 通过`e.preventDefault()`阻止默认行为

*事件回调函数传递参数
1. 包裹箭头函数：
`<button onClick={()=>click(1,2)}>参数</button>`
2. 即传递参数又传递事件对象 click是自己写的回调函数：
`<button onClick={(e)=>click(e,1,2)}>参数事件对象同时传递</button>`

*jsx中的 onChange事件实际是原生的 oninput事件
1. 触发时机是键盘输入就触发
2. 事件对象是 InputEvent
```

```jsx

* 在标签属性上通过 on事件名=事件回调函数 进行绑定
1. 事件名首字母大写
2. 事件回调函数填的是函数名[函数的定义、函数的引用地址]，而不是函数的调用(原生DOM中写的是函数调用)

* -----------
* this指向问题：undefined 说明 react中的事件回调的调用者也是window，严格模式所以是undefined

* React中事件对象e：
1. 一个经过react包装后的事件对象，原生的事件对象常用属性，基本都有。这个事件对象更好用，已经做过兼容性处理了
2. 如果想获取原生的事件对象：使用e.nativeEvent获取
3. 事件的回调函数是window帮我们调用的，会默认的将事件对象作为第一个实参传递过来

* 事件回调函数参数的传递
* 包裹一个箭头函数，在箭头函数内部调用函数click并传递参数
<button onClick={(e)=>click(e,1,2)}>参数事件对象同时传递</button>

* react中的 onChange事件，实际是原生的 oninput事件,有输入就触发
```

事件回调函数的绑定及调用使用案例

```jsx
<script type="text/babel">
    const root = ReactDOM.createRoot(document.querySelector("#root"));
    function click1() {
        console.log('click1');
        console.log('this: ', this);//undefined
    }

    function click2(e) {
        console.log(e); // SyntheticBaseEvent 事件对象
        e.preventDefault(); // 阻止默认行为
    }

    function click3(a, b) {
        console.log('click3');
        console.log('a: ', a); // undefined
        console.log('b: ', b); // undefined
    }

    function outFn() {
        click3(1, 2);
    }

    function click4(e, a, b) {
        console.log('e: ', e);
        console.log('a: ', a);
        console.log('b: ', b);
        e.preventDefault();
    }

    function change(e) {
        console.log('change e: ', e); // e: SyntheticBaseEvent 事件对象
        console.log('value: ', e.target.value); // 1 12 123
    }
    
    root.render((
        <div>
            {/* 事件触发执行回调函数click1*/}
            <p><button onClick={click1}>click1</button></p>
            {/* 事件触发执行回调函数click2*/}
            <p><a href="http://baidu.com" onClick={click2}>百度</a></p>

            <h3>事件回调函数传参</h3>
            {/* 不能直接调用函数，这样就相当于插值表达式使用函数的返回值，return 空，相当于undefined，a: undefined,b: undefined ,点击无反应,错误的示范*/}
            <p><button onClick={click3()}>click3</button></p>
            {/* 通过函数传递参数，a: 1,b: 2 ,正确的示范*/}
            <p><button onClick={outFn}>传递参数</button></p>
            {/* 通过包裹匿名函数传递参数，a: 1,b: 2 ,正确的示范*/}
            <p><button onClick={function () { click3(2, 3) }}>包裹匿名函数传递参数</button></p>
            {/* 通过箭头函数传递参数，a: 1,b: 2 ,正确的示范*/}
            <p><button onClick={() => click3(2, 3)}>包裹箭头函数传参</button></p>

            <h3>即传递参数，又同时传递事件对象</h3>
            {/* 通过箭头函数传递参数：e: SyntheticBaseEvent 事件对象 a: 1,b: SyntheticBaseEvent*/}
            <p><button onClick={(e) => { click3(1, e) }}>即传递参数，又同时传递事件对象</button></p>
            {/* 通过箭头函数传递参数：e: SyntheticBaseEvent 事件对象 a: 100,b: 222 */}
            <p><a href="http://baidu.com" onClick={(e) => click4(e, 100, 222)}>百度</a></p>
            {/* 通过函数传递参数 react中的 onChange事件，实际是原生的 oninput事件 有输入就触发*/}
            <input type="text" onChange={change} name="" id="" />
        </div>
    ))
</script>
```

## 注释

> jsx中的注释：
>
> 1. 单行注释： {//   }
>
> 2. 多行注释： {/*   */}
>
> 3. 行内属性注释： /*    */

使用案例

```jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render((
    <div>
        { //单行注释，最少得两行
        }
        
        {/*多行注释*/}
        {/*
            多行注释
            123123
            123123
            123123
        */}
        <div id='box' /* className='wrapper' */>我是div</div>
    </div>
))
```

## 文档碎片

### 原生DOM中使用

原生DOM的文档碎片使用：通过一个文档碎片(容器)，把JS动态创建的元素放进去，等待JS创建完毕，再进行渲染，减少页面的重排和重绘，同时在渲染时 fragment 标签不显示。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>功能验证</title>
</head>
<body>
    <h4>用户列表</h4>
    <button>添加li</button>
    <ul>
        <li>Hanser</li>
    </ul>
    <p>无聊的并不是时间，而是平庸无奇的我。</p>
</body>
<script>
    // 创建用户列表
    const userList = ["Yousa","MinatoAqua","FBK"]
    // 获取元素
    const oBtn = document.querySelector('button')
    const oUl = document.querySelector('ul')

    // 绑定单机事件
    oBtn.onclick = function(){
        // 创建文档碎片
        const fragment = document.createDocumentFragment();
        // 遍历并创建元素
        userList.forEach((item)=>{
            // 创建li元素对象
            const oLi = document.createElement('li')
            // 设置li元素的内容
            oLi.innerHTML = item
            // 把li元素放置到文档碎片中
            fragment.appendChild(oLi)
        })
        // 把文档碎片放置到DOM中
        oUl.appendChild(fragment)
    }
</script>
</html>
```

### React中使用

> React.Fragment 解决了react中必须有唯一根节点，导致标签结构多一层嵌套的问题
>
> 原理：渲染时 fragment 标签不显示

React.Fragment 用法有三种

```jsx
const root = ReactDOM.createRoot(document.querySelector("#root"));
const { Fragment } = React;
root.render((
    // 用法一

    <React.Fragment>
        <div>1111</div>
        <div>2222</div>
    </React.Fragment>


    // 用法二

    <Fragment>
        <div>1111</div>
        <div>2222</div>
    </Fragment>

    // 用法三
    <>
        <div>1111</div>
        <div>2222</div>
    </>
))
```

