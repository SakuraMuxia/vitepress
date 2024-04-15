# Node

官方网站地址： https://nodejs.org/en/	中文网站地址 ：http://nodejs.cn/

## Node 概述

什么是Node.js

 Node.js，也称 Node，是一个基于 `Chrome V8` 引擎的 JavaScript 运行环境（宿主），与浏览器是等价的。 

什么学习 Node.js

```js
1. 基于 Node 进行后端开发，前端工程师秒变全栈工程师。
2. 前端可以实现工程化开发，前端自动化工具、模块化打包工具gulp、webpack以及 vue、react 的脚手架工具都是基于 Node 运行的。
3. 以开发很多小工具，如自动化脚本，爬虫程序等。
4. 可以开发桌面应用，框架 Electron、ReactNative等
```

什么是后端开发

- 前端是运行在客户端上的代码， 也单指WEB前端，运行在客户端浏览器上的代码
- 后端是运行在服务器端的程序，主要实现业务逻辑，数据库读取等功能

常见后端开发平台

- LAMP或LNMP （Linux Apache/Nginx MySQL PHP ）
- JavaEE （Java Tomcat MySQL/Oricle）
- .NET (C# IIS SQLServer)
- Node.js (JavaScript MongoDB/MySQL)

- 后端编程语言（PHP、Java、C#、GO、Python、Ruby、JavaScript）
- WEB服务器程序 （Apache、Tomcat、Nginx、IIS 等）
- 数据库程序（MySQL、Oricle、SQLite、MongoDB）

### Node.js 的特点

* 单线程
* 非阻塞 I/O (non-blocking I/O)
* 事件驱动 （event-driven）



## 安装和使用

### 下载地址

官方网站 https://nodejs.org/en/download/

中文网站 http://nodejs.cn/download/

历史版本下载 https://npm.taobao.org/mirrors/node/

### 版本选择

注意区分 LTS 版本与 Current 版本的不同，我们推荐安装 LTS 版本。

LTS 为长期稳定版（long term service），对于追求稳定性的企业级项目来说，推荐安装 LTS 版本的 Noode.js。

Current 为新特性尝鲜版，对热衷于尝试新特性的用户来说，可以安装 Current 版本的 Node.js，但是，Current 版本中可能存在隐藏的 Bug 或安全漏洞，因此不推荐在企业级项目中使用 Current 版本的

### REPL 方式运行

进入REPL

命令行或终端运行 node ，就进入了 repl 模式

退出REPL

.exit 或者 按两下 `ctrl+c` 或者 `ctrl+d`

REPL命令

- `ctrl + c` - 按下两次 - 退出 Node REPL。
- `ctrl + d` - 退出 Node REPL.
- 向上/向下键 - 查看输入的历史命令*
- `tab` 键 - 列出当前变量（对象）
- `.help` - 列出使用命令
- `.break` - 退出多行表达式
- `.clear` - 退出多行表达式
- `.save filename` - 保存当前的 Node REPL 会话到指定文件
- `.load filename` - 载入当前 Node REPL 会话的文件内容。

### 脚本方式运行

```bash
node JS脚本文件地址
```

### 命令行工具

① windows 平台

```js
cmd
powershell
gitbash
```

② macOS 平台

```js
终端
```

③ vscode 内置的终端工具

```js
鼠标放在目录上，右键菜单，选择在“在集中终端中打开”
```

# 内置常量

```js
__dirname		获取JS脚本所在目录的绝对路径
__filename		获取JS脚本自己的绝对路径
```

# Buffer

## Buffer 介绍

Buffer 是一个和数组类似的对象，不同是 Buffer 是专门用来保存二进制数据的。

![image-20240409100611371](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240409100611371.png)

**特点：**

- 大小固定：在创建时就确定了，且无法调整。
- 性能较好：直接对计算机的内存进行操作。
- 每个元素大小为 1 字节（Byte）。

**字节单位：**

```json
1 Byte = 8 bit；
1 KB = 1024 Byte;
1 MB = 1024 KB;
1 GB = 1024 MB;
1 TB = 1024 GB;
...
```

## 创建 Buffer

1） 使用 Buffer.alloc() 方法创建 Buffer。

```js
Buffer.alloc(10);        // <Buffer 00 00 00 00 00 00 00 00 00 00> 每一个字节 使用16进制表示8位二进制位

Buffer.alloc(2,"a");    // <Buffer 61 61>

Buffer.alloc(2,257);    // <Buffer 01 01> 超了8位二进制表示的256就会溢出
 
Buffer.from("abcdefghik");    // <Buffer 61 62 63 64 65 66 67 68 69 6b>
Buffer.from([1, 2, 3]);        // <Buffer 01 02 03>
```

2） Buffer.allocUnsafe() 方法创建不安全的 Buffer，可能会存在旧数据。

```js
Buffer.allocUnsafe(10);
```

3）Buffer.from() 方法通过指定的数组或字符串创建 Buffer。

```js
Buffer.from("abcdefghik");    // <Buffer 61 62 63 64 65 66 67 68 69 6b>
Buffer.from([1, 2, 3]);        // <Buffer 01 02 03>，数组存储汉字会只存一位，多的2位超出。
```

**alloc 和 allocUnsafe 的区别：**

```js
不安全创建 Buffer.allocUnsafe(size)： 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以该方法比 alloc() 要快得多，但可能包含的旧数据。
```

## 读写 Buffer

可以直接通过 `[]` 的方式对数据进行处理，可以使用 toString 方法将 Buffer 输出为字符串。

使用 Buffer 实例的 `toString()` 方法将 Buffer 转为字符串.

```js
const b = Buffer.from("abcdefghik");
b[7];
b.toString();
b.forEach((item, index)=>{
    console.log(item, index);
});


let buf = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117])
console.log(buf.toString()) //=>iloveyou
```

## 关于溢出

buffer 每个元素能表示的最大数字是 255，如果超过 255 的数字，会舍去高位（二进制）

```js
buff3[0] = 365;                    // ‭0001 0110 1101‬ 
console.log(buff3[0]);             // 109
```

## 关于中文

一个 UTF-8 的中文字符大多数情况都是占 3 个字节。





# 内置模块

Noode 当中的模块分为三种：内置模块，第三方模块以及自定义模块。 不论哪一种模块，在使用时都必须先引入模块。

## 模块引入方式

```js
const 变量 = require('模块');
```

## path 模块

- `path.join([path1][, path2][, ...])` 用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"`/`"，Windows系统是"`\`"。
- `path.isAbsolute(path)` 判断参数 **path** 是否是绝对路径。返回值是true或false
- `path.dirname(p)` 返回路径中目录的部分 。
- `path.basename(p[, ext])` 返回路径中的最后一部分，文件名部分。
- `path.extname(p)` 返回路径中文件的后缀名。
- `path.resolve()` 将路径或者路径片段序列化为绝对路径 (常用)和join类似。

path 模块用于处理路径，模块的常用方法如下：

| 方法名       | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| join()       | 用于连接路径，该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"`/`"，Windows系统是"`\`"。 |
| isAbsolute() | 判断参数是否是绝对路径。                                     |
| dirname()    | 返回路径中目录的部分 。                                      |
| basename()   | 返回路径中的最后一部分，文件名部分。                         |
| extname()    | 返回路径中文件的后缀名。                                     |
| resolve()    | 将路径或者路径片段序列化为绝对路径 (常用)。                  |

## fs 模块

| 方法             | 描述                                 |
| ---------------- | ------------------------------------ |
| readFile()       | 异步方式读取文件                     |
| readFileSync()   | 同步方式读取文件                     |
| writeFile()      | 异步方式写入文件，原来的内容会被覆盖 |
| writeFileSync()  | 同步方式写入文件，原来的内容会被覆盖 |
| appendFile()     | 异步方式追加写入文件                 |
| appendFileSync() | 同步方式追加写入文件                 |
| rename()         | 异步方式重命名或移动文件             |
| renameSync()     | 同步方式重命名或移动文件             |
| copy()           | 异步方式复制文件                     |
| copySync()       | 同步方式复制文件                     |
| unlink()         | 异步方式删除文件                     |
| unlinkSync()     | 同步方式删除文件                     |

### ① 文件读取

```js
path <string> | <Buffer> | <URL> | <integer> 文件名或文件描述符

options <Object> | <string>

encoding <string> | <null> 默认值：null

flag <string> 参见 支持文件系统 flags。默认值：'r'。

signal <AbortSignal> 允许中止正在进行的 readFile

callback <Function>

err <Error> | <AggregateError>

data <string> | <Buffer>

异步地读取文件的全部内容。
```



```js
// 引入模块
const fs = require('fs');
const path = require('path');

// 要读取文件的路径
const filename = path.join(__dirname, './data/a.txt');


// ----------------------------------------------------
// 异步方式 读取文件内容

fs.readFile(filename, (err, data) => {
    if (err) {
        console.log('文件读取失败：', err.errno, err.code);
        return;
    }
    // console.log(data);  // Buffer 数据
    console.log(data.toString());
});
console.log('开始读取...');

// 指定编码方式 直接对读取到二进制数据进行编码
fs.readFile(filename,'utf-8', (err, data) => {
    if (err) {
        console.log('文件读取失败：', err.errno, err.code);
        return;
    }
    console.log(data); 
  
});
console.log('开始读取...');

// -------------------------------------------
同步方式读取文件内容
try {
     // const data = fs.readFileSync(filename);指定编码方式为utf-8
     const data = fs.readFileSync(filename, 'utf-8');
     console.log(data);
} catch (error) {
     console.log('文件读取失败：', error.errno, error.code);
}
	 console.log('开始读取...');
```

### ② 文件写入

```js
// 导入模块
const fs = require('fs');
const path = require('path');


// 要写入文件的地址
// const filename = path.join(__dirname, './data/b.txt');
const filename = path.resolve('./data/b.txt');

// 要写入的内容
const data01 = '你好小乐' + Math.random() + '\n';
// const data02 = Buffer.alloc(20, 100);

// -----------------------------------------------------
// 异步f方式 写入文件
fs.writeFile(filename, data01, err => {
    if (err) {
        console.log('写入失败！', err.errno, err.code);
    } else {
        console.log('写入成功！');
    }
});



// ----------------------------------------------------------
// 同步方式 写入文件
try {
    fs.writeFileSync(filename, data01);
    console.log('写入成功！');
} catch (err) {
    console.log('写入失败！');
};


// -------------------------------------------------------------------
// 追加写 同步方式写入
try {
    for (let i = 0; i <= 10000; i ++) {
        fs.appendFileSync(filename, data01);
    }
} catch (err) {
    console.log('写入失败！');
}
```

### ③ 文件重命名

```js
// 导入模块
const fs = require('fs');

// ---------------------------------------------------
// 重命名 将a.txt 改成 a.md
fs.rename('./data/a.txt', './data/a.md', err => {
    if (err) {
        console.log('重命名失败！');
    } else {
        console.log('重命名成功！');
    }
});


// ---------------------------------------

// 移动文件的位置
fs.rename('./data/a.md', './a.md', err => {
    if (err) {
        console.log('重命名失败！');
    } else {
        console.log('重命名成功！');
    }
});

fs.renameSync()
```

### ④ 删除文件

```js
const fs = require('fs');

fs.unlink('./a.md', err => {
    if (err) {
        console.log('文件删除失败！');
    } else {
        console.log('文件删除成功！');
    }
})

fs.unlinkSync()
```

### ⑤ 创建目录

```js
fs.mkdir(newDir, {recursive:true},err => {
    if (err) {
        console.log('创建目录失败：', err.message);
    } else {
        console.log('创建目录成功！');
    }
});

// 异步方式 创建目录 递归方式创建多级目录 
fs.mkdir(newDir, {recursive:true},err => {
    if (err) {
        console.log('创建目录失败：', err.message);
    } else {
        console.log('创建目录成功！');
    }
});

// 同步方式 创建目录
try {
    fs.mkdirSync(newDir);
    // fs.mkdirSync(newDir,{recursive:true});  递归方式创建多级目录
} catch (err) {
    console.log('目录创建失败：', err.message);
}
```

### ⑥ 删除目录

```js
// 异步方式 删除空目录
fs.rmdir(dirname01, err => {
    if (err) {
        console.log('删除失败：', err.message);
    } else {
        console.log('删除成功！');
    }
});

// 异步方式 删除非空目录使用递归方式
fs.rmdir(dirname02, {recursive: true}, err => {
    if (err) {
        console.log('删除失败：', err.message);
    } else {
        console.log('删除成功！');
    }
});

// 同步方式 删除目录
try {
    fs.rmdirSync(dirname01);
    console.log('删除成功！');
} catch (err) {
    console.log('删除失败：', err.message);
}
```

### ⑦ 读取目录

一般回调函数都是两个参数，一个是错误的对象，一个是读到的内容。

```js
// 异步方式 读取目录
fs.readdir(dirname, (err, data) => {
    if (err) {
        console.log('读取失败：', err.message);
    } else {
        for (let basename of data) {
            // console.log(basename);
            console.log(path.resolve(dirname, basename));
        }
    }
});

// 同步方式 读取目录
try {
    const files = fs.readdirSync(dirname);
    console.log(files);
} catch (err) {
    console.log('读取失败：', err);
}
```

### ⑧ 判断文件或目录是否存在

```js
// 异步方式 判断文件或目录是否存下
fs.access(file02, err => {
    if (err) {
        console.log('文件不存在！');
    } else {
        console.log('文件存在！');
    }
});

// 同步方式
try {
    fs.accessSync(file02);
    console.log('文件存在！');
} catch {
    console.log('文件不存在！');
}
```

### ⑨ 判断是文件还是目录

```js
读取文件的大小可以使用 stat得到的对象中的属性size属性。
```



```js
fs.stat(file02, (err, stats) => {
    if (err) {
        console.log('错误：', err.message);
    } else {
        console.log('是否是目录：', stats.isDirectory());
        console.log('是否是文件：', stats.isFile());
    }
})

// 同步方式
try {
    const stats = fs.statSync(file01)
    console.log(file01);
    console.log('是否是目录：', stats.isDirectory());
    console.log('是否是文件：', stats.isFile());
    console.log('');
} catch (err) {
    console.log('错误：', err,message);
}
```

### ⑩ 流式读写文件

**流式读取文件内容：**

每次读64KB

| 方法                | 描述                                      |
| ------------------- | ----------------------------------------- |
| createReadStream()  | 创建一个读取流，返回一个 readStream 对象  |
| createWriteStream() | 创建一个写入流，返回一个 writeStream 对象 |

```js
// 创建文件读取流
const rs = fs.createReadStream(file);
// 事件监听到数据上
rs.on('data', chunk => {
    console.log(chunk);
});
// 事件监听到结束
rs.on('end', () => {
    console.log('读取完毕！');
});

rs.on('error', () => {
    console.log('读取出错！');
});


// 流式读取
const rs = fs.createReadStream(path.resolve(__dirname,"./1.mp4"));
rs.on("error",function (){
    console.log("异常时执行");
})
rs.on("open",function (){
    console.log("打开读取的文件时执行");
})
rs.on("ready",function (){
    console.log("准备就绪");
})
rs.on("data",function (chunk){
    console.log("读取数据",chunk.length)
})
rs.on("end",function (){
    console.log("读取完毕")
})

```

**流式写文件：**

每次写64KB

```js
// 创建写入流
const ws = fs.createWriteStream(file);
// 监听事件close
ws.on('close', () => {
    console.log('写入完毕！');
});

for (let i = 0; i < 100000; i ++) {
    ws.write(`${i} ${Math.random()} ${Date.now()} \n`);
}
ws.write("a");
ws.write("b");
ws.write("c");
ws.write("d");
ws.write("e")
ws.close();
```

**流式复制文件：**

```js
// 创建读取流
const rs = fs.createReadStream(originFile);
// 创建写入取流
const ws = fs.createWriteStream(targetFile);
// 使用管道
rs.pipe(ws);

========================
const fs = require('fs');
const path = require('path');

// 文件地址
const originFile = path.resolve(__dirname,'./data/test.txt');
const targetFile = path.resolve(__dirname,'./data/hanser.txt');

// 创建读取流
const rs = fs.createReadStream(originFile);
// 创建写入流
const ws = fs.createWriteStream(targetFile);

// 监听事件
rs.on('data',chunk=>{
    ws.write(chunk);
});

rs.on('end',()=>{
    console.log("流式复制完毕");
});
```

## url 模块

```js
parse方法：	解析url，第一个参数是url，返回一个对象，第二个参数是true时，得到的对象的query属性是一个对象，而不是字符串
```



```js
// 解析网址 用法一
const urlData = url.parse(siteAddress);
console.log(urlData);
console.log(urlData.query);
console.log('');

// 解析网址 用法二
const urlInfo = new url.URL(siteAddress);
console.log(urlInfo);
console.log(urlInfo.searchParams);


url 模块用于 URL 处理与解析。

const url = require("url");
const str = "http://www.fuming.site/a/b/index.html?id=12&type=1#one";

// 用法一 返回一个url信息组成的对象（过时）
url.parse(str);

// 用法二 实例化得到一个url信息组成的对象
const u = new url.URL(str);
```

```js
const url = require('url');

// 定义URL
const siteAddress = 'https://yuluochenxiao.top/web/';
console.log(siteAddress);

// 解析URL
const urlData = url.parse(siteAddress);
console.log(urlData);
console.log(urlData.query);

const urlInfo = new url.URL(siteAddress);
console.log(urlInfo);
console.log(urlInfo.searchParams);
```



## querystring 模块

获取url中的查询字符串

url = pathname（文件路径） + querystring 查询字符串

方法：

parse	把url中的字符串解析为对象

stringify 将对象转为查询字符串形式

```js
const qs = require('querystring');

qs.parse(字符串);  	// 将查询字符串解析成对象
qs.stringify(对象)  // 将对象转为查询字符串的形式


// 导入模块
const qs = require('querystring');

// 定义查询字符串
const searchData = 'name=hanser&age=18&address=南京';

// 将查询字符串解析为对象
console.log(qs.parse(searchData));  //Object对象格式

// 将对象转为查询字符串形式
const user = {
    username:'Kano',
    email:'123456@qq.com',

}
console.log(qs.stringify(user));
```

## OS模块

得到操作系统信息

## process模块

process是node内置对象

argv方法可以得到一个数组（包含文件路径和输入）

```js
[
  'C:\\Program Files\\nodejs\\node.exe',
  'D:\\devSpace\\FrontExamples\\node\\发布npm包\\exec.js',
  '12340',
  '1'
]

const bytes = process.argv[2];
const type = process.argv[3];
```

## http模块

```js
导入http模块
const http = require('http');
创建http模块
创建 http 服务的方法的参数是个回调函数
回调函数在接收到请求的时候自动执行
回调函数在执行的时候，接收到两个参数，分别是请求对象，响应对象
createServer 方法返回一个对象
```

### createServer方法

参数是个回调函数，回调函数中接收到两个参数，分别是请求对象，响应对象，createServer 方法返回一个对象，回调函数在接收到请求的时候自动执行。

```js
createServer((req, res) => {
    console.log('我接收到了一个请求！ 客户端IP：', req.socket.remoteAddress);
    // 设置响应
    res.end('<h1>Welcome to My WebSite</h1>');
});
```

启动服务 给http服务对象监听端口, 服务启动成功，回调函数就执行,第二个参数可以设置 ip

```js
server.listen(8080,'127.0.0.1', () => {
    console.log('http server is running on 8080');
});
```

## JSON模块
