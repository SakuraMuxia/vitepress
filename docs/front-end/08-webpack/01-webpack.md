# webpack

## 1 webpack 概述

### 1.1 什么是 webpack

**webpack** 是一个用于现代 JavaScript 应用程序的 **打包工具**。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个依赖图，然后将项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，可以在浏览器上直接运行。 

打包工具：把很多细分的功能合成一个，让浏览器支持。

在 webpack 看来, 前端的所有资源文件（js、json、css、img 、html...）都会作为模块处理。

**官方网站：** https://webpack.js.org/

**中文网站：** https://www.webpackjs.com/ 或者 https://webpack.docschina.org/guides/

### 1.2 为什么需要打包工具

开发时，我们会使用框架（React、Vue 等），ES6 模块化语法，less、sass 这种 css 预处理器等语法进行开发。这样的代码要想在浏览器运行必须经过编译成浏览器能识别的 js、css 等语法，才能运行。所以我们需要打包工具帮我们做完这些事。除此之外，打包工具还能压缩代码、做兼容性处理、提升代码性能等。

常见的打包工具有 Grunt、Gulp、Parcel、Webpack、Rollup、Vite 等， 目前最流行的打包工具是 webpack。

### 1.3 webpack 五大核心概念

* Entry： 指示 webpack 从哪个文件开始打包 。
 * Output： 指示 webpack 打包完的文件输出到哪里去，如何命名等 。
* Loader： webpack 本身只能处理 js、json 等资源，其他资源需要借助 loader，Webpack 才能解析 。
 * Plugins： 扩展 webpack 的功能 ，如打包优化、压缩等。
* Mode：模式，有生产模式 production 和开发模式 development 两种。

### 1.4 开发模式和生产模式

#### 开发模式：

开发模式顾名思义就是我们开发代码时使用的模式。这个模式下我们主要做两件事：

1. 编译代码，使浏览器能识别运行，开发时我们有样式资源、字体图标、图片资源、html 资源等，webpack 默认都不能处理这些资源，所以我们要加载配置来编译这些资源。
2. 代码质量检查，树立代码规范，提前检查代码的一些隐患，让代码运行时能更加健壮。提前检查代码规范和格式，统一团队编码风格，让代码更优雅美观。

#### 生产模式：

生产模式是开发完成代码后，我们需要得到代码将来部署上线。这个模式下我们主要对代码进行优化，让其运行性能更好。优化主要从两个角度出发:

1. 优化代码运行性能。
2. 优化代码打包速度。



## 2 安装 webpack

**全局安装：**

```shell
# 安装
npm install webpack webpack-cli -g

# 使用
webpack -v
```

**本地安装（推荐）：**

```bash
# 安装
npm install webpack webpack-cli -D

# 使用
npx webpack -v
```

> ① wepback 是核心内容，webpack-cli 是在运行 webpack命令时，所依赖的一个工具。
>
> ② 使用 npx 可以执行安装在本地的命令行可执行命令。





## 3 零配置使用 webpack 命令

### 3.1 webpack 命令

顾名思义，零配置指的是可以在无配置的情况下使用 wepack 命令对代码进行打包操作。

```js
# 将 src/index.js 打包至 dist/main.js  模式默认值：production
npx webpack

# 将 src/index.js 打包至 dist/main.js  模式指定为：development
npx webpack --mode development

# 将 src/one.js 打包至 dist/main.js
npx webpack ./src/one.js --mode development

# 将 src/one.js、two.js 打包至 dist/main.js
npx webpack ./src/one.js ./src/two.js --mode development

# 将 src/one.js 打包至 build/main.js
npx webpack ./src/one.js --output-path build --mode development

# 将 src/two.js 打包至 dist/index.js 
npx webpack ./src/two.js --output-filename index.js --mode development

# 将 src/one.js 和 src/two.js 打包至 build/index.js 
npx webpack ./src/one.js ./src/two.js --output-path build --output-filename index.js --mode development
```

eavl全局函数：字符串当作代码进行执行。目的是为了方便统计代码的长度，优化的建议。

### 3.2 配置 npm 执行命令

可以通过配置 `package.json` 来保存命令：

```json
{
  "scripts": {
    "build": "npx webpack ./src/index.js --output-path build --output-filename ./dist/app.js --mode development",
    "start": "npx webpack ./src/index.js --output-path start --output-filename ./dist/app.js --mode development"
  }
}

```

可以通过`npm run build` 或者 `npm start` 运行命令 （如果名字为 `start` 可以省略 `run`）

### 3.3 演示：编译打包应用

**创建 js 文件**

```javascript
 src/app.js
 src/js/one.js
 src/js/two.js
 src/js/three.js
```

**创建 json 文件**

```javascript
src/json/data.json   
```

**src/app.js 文件：**

```js
// 导入模块
import one from './js/one';   // 扩展名可以省略
import two from './js/two';   // 扩展名可以省略
import three from './js/three';   // 扩展名可以省略

// 导入json
import users from './json/data';  //  扩展名可以省略

one();
two();
three();
console.log(users);
```

**运行指令：**

```bash
npx webpack ./src/app.js --output-path dist --output-filename index.js --mode development
```

**总结：**

```javascript
webpack实现的功能：
- 能够编译打包 js 和 json 文件
- 能将 es6 的模块化语法转换成浏览器能识别的语法
- 能压缩代码(生产模式)

webpack不能实现的功能：
- 不能编译打包 css、img 等文件
- 不能将实现 js 兼容性处理 
```



## 4 webpack 配置文件

在项目的根目录创建一个名字为 `webpack.config.js` 的文件。

```js
const path = require('path');

module.exports = {
    /********* 入口 **********/
    // 字符串指定单一入口
    entry: "./src/app.js",
    // 数组指定多入口
    //entry: ['./src/js/one.js', './src/js/two.js'],
    // 对象指定多入口
    // entry: {
    //     frist: './src/js/one.js',
    //     second: './src/js/two.js',
    // },

    /********* 出口 **********/
    output: {
        path: path.resolve(__dirname, './dist'),
        // 固定的输出文件名
        // filename: 'index.js',
        // filename: '[name].js', //默认name是main
        // filename: '[name][hash:8].js',
        filename: 'index-[hash:12].js',
        clean: true  // 每次打包会把清空原来的输出目录 
    },

    /********* loader **********/
    /********* 插件 **********/
    /********* 模式 **********/
    mode: "development"
}
```

```javascript
运行命令：按照 webpack配置文件 执行
npx webpack
```

**情况一：单入口单出口**

```js
const path = require("path");
module.exports = {
    /**************** 入口 ***********************************/
    entry:"./src/app.js",
    
    /**************** 出口 *************************************/
    output:{
        filename: "index.js",
        path:path.join(__dirname,"/build"),
        clean:true
    },
}
```

**情况二：多入口单出口**

```js
const path = require("path");
module.exports = {
    /**************** 入口 ***********************************/
    entry:['./src/js/one.js', './src/js/two.js'],
    
    /**************** 出口 *************************************/
    output:{
        filename: "index.js",
        path:path.join(__dirname,"/build"),
        clean:true
    },
}
```

**情况三：多入口多出口**

```js
const path = require("path");
module.exports = {
    /**************** 入口 ***********************************/
    entry: {
        frist: './src/js/one.js',
        second: './src/js/two.js',
    },
    
    /**************** 出口 *************************************/
    output:{
        // filename: '[name].js', 这里[name] name是入口对象的名称
        // hash是为了浏览器刷缓存
        filename: '[name][hash:8].js',
        path:path.join(__dirname,"/build"),
        clean:true
    },
}
```



## 5 处理样式资源

Webpack 本身是不能识别样式资源的，所以我们需要借助 Loader 来帮助 Webpack 解析样式资源，我们找 Loader 都应该去官方文档中找到对应的 Loader，然后使用，如果官方文档找不到的话，可以从社区 Github 中搜索查询。

### 5.1 处理 Css 资源

**下载包**

```bash
npm i css-loader style-loader -D
-D 代表开发依赖
```

注意：需要下载两个 loader

**功能介绍**

- `css-loader`：负责将 Css 文件编译成 Webpack 能识别的模块（js文件）
- `style-loader`：会动态创建一个 Style 标签,添加到html结构中(Dom操作)，里面放置 Webpack 中 Css 模块内容

此时样式就会以 Style 标签的形式在页面上生效

**配置**

```js
module: {
    rules: [
        {
            // 用来匹配 .css 结尾的文件 使用正则 /\.css$/
            test: /\.css$/,
            // use 数组里面 Loader 执行顺序是从右到左
            use: ["style-loader", "css-loader"],
        },
    ],
},
```

**添加 Css 资源**

- src/css/index.css

```css
.box1 {
  width: 100px;
  height: 100px;
  background-color: pink;
}
```

**在 JS 入口文件 app.js 中奖将CSS 作为模块导入**

```js
// 引入 Css 资源，Webpack才会对其打包
import "./css/index.css";
```

**运行指令**

```javascript
npx webpack
```

### 5.2 处理 Less 资源

**下载包**

```javascript
npm i less less-loader -D
```

**功能介绍**

* `less`：负责编译 less 文件，命令行工具

- `less-loader`：负责导入 less 文件

**配置**

```js
module: {
    rules: [
        {
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"],
        },
    ],
},
```

**添加 Less 资源**

- src/less/index.less

```css
.box2 {
  width: 100px;
  height: 100px;
  background-color: deeppink;
}
```

**在 JS 入口文件中奖将CSS 作为模块导入**

```js
// 引入资源，Webpack才会对其打包
import "./less/index.less";
```

**运行指令**

```javascript
npx webpack
```



## 6 处理样式中的图片资源

### 6.1 打包图片资源

过去在 Webpack4 时，我们处理图片资源通过 `file-loader` 和 `url-loader` 进行处理，现在 Webpack5 已经将两个 Loader 功能内置到 Webpack 里了，我们不需要即可处理图片资源。

**样式文件中使用图片资源**

```css
.box{
  background-image: url("../images/1.jpeg");
}
```

**运行指令**

```javascript
npx webpack
```

此时如果查看 dist 目录的话，会发现多出几张图片资源，因为 Webpack 会将所有打包好的资源输出到 dist 目录下。

### 6.2 输出 base64 格式图片

配置将小于某个值的图片转化成 data URI 形式（Base64 格式）

```js
module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
          }
        }
      },
    ],
},
```

- 优点：减少请求数量
- 缺点：体积变得更大

### 6.3 修改输出图片资源的名称和路径

```js
module: {
    rules: [
        {
            test: /\.(png|jpe?g|gif|webp)$/,
            type: "asset",
            parser: {
                dataUrlCondition: {
                    maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
                },
            },
            generator: {
                // 将图片文件输出到 static/images 目录中
                // 将图片文件命名 [hash:8][ext][query]
                // [hash:8]: hash值取8位
                // [ext]: 使用之前的文件扩展名
                // [query]: 添加之前的query参数 对应less文件图片url ?="query参数" 打包的时候不会变
                filename: "static/images/[hash:8][ext][query]",
            },
        },
    ],
},
```

src/less/app.less入口文件

```less
@len: 1000px;
@color: #f90;

@font-face {
    font-family: "FZSJ";
    src: url("../fonts/FZSJ-WSMQSJW.woff2") format("woff2"),
         url("../fonts/FZSJ-WSMQSJW.woff") format("woff"),
         url("../fonts/FZSJ-WSMQSJW.ttf") format("truetype"),
         url("../fonts/FZSJ-WSMQSJW.eot") format("embedded-opentype"),
         url("../fonts/FZSJ-WSMQSJW.svg") format("svg");
    font-weight: normal;
    font-style: normal;
  }

.box {
    width: @len;
    height: (@len/5);
    background: @color;
    padding: 20px;
    font-family: FZSJ;
}

p {
    width: 400px;
    height: 200px;
}

.p1 {background: url(../images/101.webp?n=123123123123)}
.p2 {background: url(../images/bg01.jpg)}
.p3 {background: url(../images/bg02.jpg)}
.p4 {background: url(../images/db01.jpeg)}
.p5 {background: url(../images/db02.png)}
.p6 {background: url(../images/db03.gif)}
```



## 7 处理样式中的字体文件资源

**Webpack5 可以自动导入样式中需要的所有文件资源**， 如需要设置输出目录，需要进行配置：

```js
module: {
    rules: [
        ...
        {
            test: /\.(ttf|woff2?|woff|svg|eot)$/
            type: "asset/resource",
            generator: {
                filename: "static/fonts/[hash:8][ext][query]",
            },
        },
        ...
    ],
},
```

**`asset/resource` 和 `asset` 的区别：**

```javascript
1. `asset/resource` 发送一个单独的文件并导出 URL。之前通过使用 `file-loader` 实现。 
2. `asset` 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 `url-loader`，并且配置资源体积限制实现。
```

**样式中使用字体文件资源**

```css
@font-face {
  font-family: "FZSJ";
  src: url("../fonts/FZSJ-WSMQSJW.woff2") format("woff2"),
       url("../fonts/FZSJ-WSMQSJW.woff") format("woff"),
       url("../fonts/FZSJ-WSMQSJW.ttf") format("truetype"),
       url("../fonts/FZSJ-WSMQSJW.eot") format("embedded-opentype"),
       url("../fonts/FZSJ-WSMQSJW.svg") format("svg");
  font-weight: normal;
  font-style: normal;
}
```

**运行指令**

```bash
npx wepback
```



## 8 处理样式中的其他文件资源 音视频

与处理字体文件资源的配置类似，**无需配置即可导入**，如果需要配置输出目录，可进行如下配置：

```js
module: {
    rules: [
        {
            test: /\.(mp3|mp4|avi)$/,
            type: "asset/resource",
            generator: {
                filename: "static/media/[hash:8][ext][query]",
            },
        },
    ]
}
```



## 9 处理 HTML 文件本身

HTML 文件不能直接被 webpack 解析，需要借助 `HtmlWebpackPlugin` 插件编译解析。

**下载包**

```bash
npm i html-webpack-plugin -D
```

**配置**

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [
        ...
        new HtmlWebpackPlugin({
          // 以 public/index.html 为模板创建文件
          template: path.resolve(__dirname, "public/index.html"),

          // 目标文件地址,目标文件会在输出目录的里面
          filename: 'page/[index]-[hash].html'

          // 注意：输出的模板页面会默认引入打包后的JS文件
          // inject:false,// 不会引入JS文件
          inject: "body",// 在body尾部引入JS文件
          hash:true,// 为JS文件增加后缀，可以去除缓存

          minify: {
            removeAttributeQuotes:true,// 移除双引号
            removeComments:true,// 移除注释
            collapseWhitespace:true// 代码进行折叠
          }
        }),
        ...
	],
}

```

**HTML 文件注意事项**

注意不要在 HTML 中引入 JS  文件，  `HtmlWebpackPlugin` 会自动引入 

**运行命令**

```js
npx webpack
```

js的加载默认会阻塞页面

```javascript
<script defer src="index.js"> <script>
    defer : 异步加载 加载js的同时，不影响html的渲染
```



## 10 处理 HTML 中使用的图片、视频、音频等内部资源

**下载包**

```bash
npm i html-loader -D
```

**功能介绍**

`html-loader`：负责打包 html 中所使用的图片、视频、音频等

之前的图片loader仍然生效。

**配置**

```js
module: {
    rules: [
        {
            // 导入 html 文件内容所使用的的资源，如图片、音视频等
            test: /\.html$/i,
            use: ["html-loader"],
        },
    ],
},
```

**HTML 页面中可以通过标签使用图片、视频、音频等**

**运行指令：**

```bash
npx webpack
```



## 11 处理 JS 资源

### 11.1 使用 ESLint 进行语法检查 

ESLint 能对 JS 基本语法错误/隐患进行提前检查，可以通过配置设置检查规则。

Github： https://github.com/eslint/eslint

中文网：https://zh-hans.eslint.org/

**下载包：**

```shell
npm i eslint-webpack-plugin eslint -D
```

**功能介绍：**

* `eslint` 是语法检查的包。

* `eslint-webpack-plugin` 是 eslint 在 webpack 中使用的 wepback 插件。

**配置 webpack.config.js 文件：**

```js
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  // ...
  plugins: [
      new ESLintPlugin({
          // 指定检查文件的根目录
      	  context: path.resolve(__dirname, "src"),
      })
  ],
  // ...
};
```

**在项目根目录中配置 `.eslintrc.js` 文件**

```js
module.exports = {
    "extends": "eslint:recommended",    // 继承eslint推荐的默认规则
    "parserOptions": {
        "ecmaVersion": 6, 				// 支持es6
        "sourceType": "module"			// 使用es6模块化
    },
    "env": { 							// 设置环境
        "browser": true,   				// 支持浏览器环境： 能够使用window上的全局变量
        "node": true       				// 支持服务器环境:  能够使用node上global的全局变量
    },
    "globals": {						// 声明使用的全局变量, 这样即使没有定义也不会报错了
        "$": "readonly"				    // $ 不允许重写变量 可写writable
    },
    "rules": {  						// eslint检查的规则  0 忽略 1 警告 2 错误
        "no-console": 0, 				// 不检查console
        "eqeqeq": 0,					// 用 == 而不用 === 就报错
        "no-alert": 0 					// 不能使用alert
    }
}
```

**运行指令**

```bash
npm webpack
```

### 11.2 使用 Babel 进行语法转换

借助 Babel 可以将浏览器不能识别的新语法（ES6, ES7）转换成原来识别的旧语法（ES5），浏览器兼容性处理。

**下载包**

```javascript
npm i babel-loader @babel/core @babel/preset-env -D
```

**功能介绍**

* `@babel/core`  是 babel 的核心库

* `@babel/preset-env`  是 babel 的预设的工具包，默认可以将所有最新的语法转为为 ES5

* `babel-loader`   是 babel 在 webpack 中的 loader 包

**配置 webpack.config.js：**

```javascript
module: {
    rules: [
       ...
       {
            test: /\.js$/,
            exclude: /node_modules/, // 排除node_modules代码不编译
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        },
        ...
    ]
}
```

**也可以在项目根目录单独配置 babel.config.js**

```js
module.exports = {
  presets: ["@babel/preset-env"],
};
```

**运行指令：**

```bash
npx webpack	
```

### 11.3 使用 Polyfill 提高兼容性

Polyfill 是一块代码（通常是 Web 上的 JavaScript），用来为旧浏览器提供它没有原生支持的较新的功能

**下载包**

```shell
npm i @babel/polyfill 生产依赖
```

**项目入口文件引入**

```js
import '@babel/polyfill';
```

> 解决 babel 只能转换语法的问题(如：let/const/解构赋值...)，引入polyfill可以转换高级语法(如:Promise...)



## 12 SourceMap

SourceMap（源代码映射）是一个用来生成源代码与构建后代码一一映射的文件的方案。

它会生成一个 xxx.map 文件，里面包含源代码和构建后代码每一行、每一列的映射关系。当构建后代码出错了，会通过 xxx.map 文件，从构建后代码出错位置找到映射后源代码出错位置，从而让浏览器提示源代码文件出错位置，帮助我们更快的找到错误根源

详细配置官网地址 <https://www.webpackjs.com/configuration/devtool/>

**配置 webpack.config.js** 

```js
module.exports = {
 	devtool:'cheap-module-source-map',// 只有行映射，打包编译速度快。
 	mode: 'development'
}
```

**devtool 可选的值：**

*  `cheap-module-source-map` 	只有行映射，打包编译速度快，适合开发模式。
*  ` source-map ` 包含行和列的映射，打包编译速度慢，适合生产模式



## 13 开发服务自动化

### 13.1 实现自动打包运行

之前的操作，每次修改代码都需要重新执行 webpack 命令，可以使用 `webpack-dev-server` 自动打包运行，通过 `webapck-dev-server` 可以快速搭建服务、代理。

**下载包**

```bash
npm i webpack-dev-server -D
```

**修改 webpack.config.js 配置**

```js
module.exports = {
    module: {
    },
    
    // 增加 devServer 配置
    devServer:{
         port:80,// 设置端口号
         host:"127.0.0.1",
         open:true,	// 自动在浏览器中打开页面
         compress:true,	// false关闭gzip压缩,true开启（默认）
         // open:["home.html"],	// 打开home.html.如果不指定默认打开的是index.html
     },

     mode: 'development'
    }
}
```

**启动服务**

```javascript
npx webpack serve  //不会打包到dist目录，打包到内存中
```

### 13.2 配置 npm 执行命令

**在 `pageage.json` 中添加执行命令**

```json
"scripts": {
     "start": "npx webpack serve" 
 },
```

**运行命令**

```bash
npm start
```



## 14 开发模式和生产模式使用不同的配置文件

开发模式和生产模式可以使用不同的配置文件，进行不同的编译配置

**创建文件夹 config，将 webpack.config.js 复制两份**

* `./config/webpack.dev.js` 中的 `mode` 设置为 `development`
* `./config/webpack.prod.js` 中的 `mode` 设置为 `production`

**在 `pageage.json` 中添加 npm 执行命令**

```json
"scripts": {
      "start": "npx webpack serve --config ./config/webpack.dev.js",
 	  "build": "npx webpack --config ./config/webpack.prod.js"
}
```

不可出现 一样的代码出现了两遍

```javascript
开发模式：项目打包到内存中，响应速度快
生产模式：项目打包到文件，响应速度慢
```



## 15 生产模式下 CSS 处理

### 15.1 提取 CSS 成单独文件

前面的 CSS 样式代码都是放在 style 标签中，这里可以借助 `mini-css-extract-plugin` 抽离 CSS 文件

**安装插件**

```javascript
npm i mini-css-extract-plugin -D

使用 webpack-merge 包 把两个配置文件合并，如果两个配置文件有不同的选项，会使用后边的添加，而不是覆盖。

npm install webpack-merge -D
```

**配置 webpack.prod.js**

```js
// 1. 引入插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
   module: {
       rules: [
          {
                // 用来匹配 .css 结尾的文件 未经过兼容性处理
                test: /\.css$/,
                // use 数组里面 Loader 执行顺序是从右到左
                use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
           {
               // 用来匹配 .css 结尾的文件 经过兼容性处理
               test: /\.css$/,
               // use 数组里面 Loader 执行顺序是从右到左
               use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
           },
          {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
          },
          {
            test: /\.s[ac]ss$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          },
       ]
   },
   plugins: [
       // 配置插件
       new MiniCssExtractPlugin({					
           filename: "static/css/main-[hash].css",	// 定义输出文件名和目录
       })
   ]
}
```

**运行指令**

```bash
npm start
```

### 15.2 处理 CSS 兼容

**下载包**

```shell
npm i postcss-loader autoprefixer -D
```

**配置 webpack.prod.js**

```js
modules.exports = {
    module: {
         rules: [
             {
                 test: /\.less$/, 
                 use: [
                     MiniCssExtractPlugin.loader,
                     'css-loader',
                     "postcss-loader",
                     'less-loader',
                 ]
             },
         ]
 	}
}

```

**在项目的根目录下创建 postcss.config.js**

```js
module.exports = {
 // ...
 plugins: [
     require("autoprefixer")
 ]
 // ...
}
```

**在项目目录下创建 `.browserslistrc` **

这里一要加目标浏览器设置

```javascript
cover 99.5%
```

配置规则介绍

| 规则                   | 介绍                                                  |
| ---------------------- | ----------------------------------------------------- |
| > 1%                   | 全球超过1%人使用的浏览器                              |
| > 5% in US             | 指定国家使用率覆盖                                    |
| last 2 versions        | 所有浏览器兼容到最后两个版本根据CanIUse.com追踪的版本 |
| Firefox > 20           | 指定浏览器的版本范围                                  |
| not ie <=8             | 排除 ie8 及以下                                       |
| Firefox 12.1           | 指定浏览器的兼容到指定版本                            |
| since 2013             | 2013年之后发布的所有版本                              |
| not dead with > 0.2%   | 仍然还在使用且使用率大于 0.2%                         |
| last 2 Chrome versions | 最新的两个 Chrome 配置                                |
| cover 99.5%            | 99.5% 的浏览器都是目标                                |

**运行指令：**

```bash
npm run build
```

### 15.2 压缩 CSS

**安装插件**

```bash
npm install css-minimizer-webpack-plugin --save-dev
```

**配置 webpack.prod.js**

```js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); 

module.exports = {
    optimization: {
        minimizer: [
          // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`）
          // `...`,
          new CssMinimizerPlugin(),
        ],
    },
    
  	plugins: [
        new MiniCssExtractPlugin()
    ],
}


```

**运行指令**

```bash
npm run build
```

## 16 生产模式下 JS 处理

默认生产模式已经开启了 js 压缩 ,不需要额外进行配置。

## 17 生产模式下 HTML 处理

默认生产模式已经开启了html 压缩不需要额外进行配置

## Webpack总结

![image-20240515100140070](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240515100140070.png)



