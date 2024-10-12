---
title:typescript入门
---

# typescript入门

## 介绍

TypeScript 简称『TS』，是微软开发的一个开源的编程语言。

## 特点

TS 主要有如下几个特点:

* 完全兼容 JavaScript，是 JavaScript 的超集
* 引入类型系统，可以尽早的定位错误位置, 帮助提升开发效率
* 先进的 JavaScript，支持 JavaScript 的最新特性

> TypeScript 在社区的流行度越来越高，它非常适用于一些大型项目，也非常适用于一些基础库，极大地帮助我们提升了开发效率和体验。

## TS环境搭建

学习 TS 阶段我们可以借助 TypeScript 的编译工具『typescript』

```shell
npm i -g typescript
```

使用下面的命令检查是否安装成功以及查看包的版本

```shell
tsc -v
```

## TS初始化

1. typescript 初始化.  创建 ts 的配置文件`tsconfig.json`

   ```shell
   tsc --init
   ```

2. 创建一个 JS 文件 『hello.ts』

   ```javascript
   let str: string = 'hello world';
   console.log(str);
   
   function add(a: number, b:number):number{
     return a + b;
   }
   console.log(add(1, 100));
   ```

3. 命令行运行，`这里的后缀是 ts`

   ```sh
   tsc hello.ts
   ```

4. 命令行运行，`这里的后缀是 js`

   ```shell
   node hello.js
   ```


> 可以使用 `tsc -w` 命令开启自动编译

## TS工程化项目

### 目录结构

```shell
创建一个项目目录结构如下： 
ts_webpack
    |- src
    |   |-index.ts
    |-public
    |   |-index.html
    |-webpack.config.js
    |-package.json
    |-tsconfig.js
```

### 创建项目

1. 创建ts文件：src/index.ts

```ts
let str:string = 'abc'
console.log(str);
```

2. 根html文件：public/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
</body>
</html>
```

3. webpack配置文件：webpack.config.js

```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // 配置入口文件
    entry: './src/index.ts',
    // 配置打包的出口位置
    output: {
        path: resolve(__dirname, 'build'),
        filename: 'js/bundle.js'
    },
    // 开发模式
    mode: 'development',
    // 配置loader
    module: {
        rules: [
            // 使用ts-loader插件，把ts或tsx转为js
            // .jsx 使用jsx语法写react模版的文件
            // .tsx 使用ts语法写react模版的文件
            {
                test: /\.tsx?$/,
                use: 'ts-loader'
            }
        ]
    },
    // 配置缩写，导入时可以缩写后缀，添加查找顺序
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    // 配置插件
    plugins: [
        new HtmlWebpackPlugin({
            // 以 ./public/index.html 为模版，把打包好的js插入到html的body标签中
            template: './public/index.html',
            inject:'body'
        })
    ],
    // 配置服务启动
    devServer: {
        port: 5000,
        open: true
    }
}
```

4. 创建package.json 文件

```shell
# 命令终端目录在 ts_webpack中执行
npm init -y
```

5. 安装依赖

```shell
npm i webpack webpack-cli webpack-dev-server ts-loader html-webpack-plugin typescript  -D
```

6. 创建tsconfig.js

```js
npm i -g typescript
# 命令终端目录在 ts_webpack中执行
tsc --init
```

### 启动项目

```shell
npx webpack-dev-server  
```

```js
vim package.json

"start": "npx webpack-dev-server "
```

### 打包项目

```js
npx webpack
```

```
"build": "npx webpack "
```



## 模块化开发

在src目录中添加ts文件，在每个ts文件的末尾添加export语句，使得每个ts文件成为一个模块，这样做的好处是限定每个ts文件中变量的作用域，因为最后这些ts文件会被webpack打包在一起插入到html中，默认相当于在同一个js文件中写代码，于是需要把ts文件定义成一个模块

src->index.ts

```js
....
export {}
```

