# JSON 数据格式以及处理

## 什么是`JSON`数据格式

`JSON`全称是 `JavaScript Object Notation` (JavaScript 对象表示法) ,是一种轻量级的数据交换格式。

`JSON` 的语法与 `JS` 定义数组和对象的语法存在如下的区别：

```
1. json 中的字符串必须使用双引号
2. json 中的属性名必须使用双引号包裹
3. json 中的最后一个属性不能有逗号
4. json 中的属性值不能是表达式
```

## JS 中的 JSON 对象

把对象变成json的格式

JSON是ES6的内置对象，不需要导入，可以直接使用。

- `JSON.stringify(obj/arr)`	将对象或数组转为 json 格式的字符串。

- `JSON.parse(json)`:`	将 json 格式的字符串转为对象或数组。

json格式转为对象

```js
// 导入
const fs = require('fs');
const path = require('path');
const jsonData = require('./data/hanser.json');
// console.log('jsonData:',jsonData); // 得到一个对象
// 路径
const filename = path.resolve(__dirname,'./data/hanser.json',)
const filename1 = path.resolve(__dirname,'./data/yousa.json',)
// 读文件1
fs.readFile(filename,'utf-8',(err,data)=>{
    if(err){
        console.log('读取文件失败:',err,message);
    }
    // 将json格式的字符串解析为对象
    const jsonObj = JSON.parse(data);
    console.log(jsonObj); // 得到一个对象
    
    // 遍历这个对象
    for(let ele in jsonObj){
        console.log(ele);
    }

});
// 读文件2
fs.readFile(filename1,'utf-8',(err,data)=>{
    if(err){
        // console.log('读取文件失败:',err,message);
    }
    // 将json格式的字符串解析为对象
    const jsonObj = JSON.parse(data);

    
    // 遍历这个对象
    jsonObj.forEach(element => {
        // console.log(element);
    });

});
```

对象转为json格式文件

```js
// 导入
const fs = require('fs');
const path = require('path');
const url = require('url');

const siteAddress = 'https://learn.fuming.site:8888/front-end/node/add.html?name=xiaol&age=101#nav';
const filename = path.resolve(__dirname,'./data/kano.json');

// 将url解析为对象
const urlObj = url.parse(siteAddress);

// 将对象转为json格式
const jsonStr = JSON.stringify(urlObj);

// 将json字符串写入文件
fs.writeFile(filename,jsonStr,err=>{
    if(err){
        console.log('error');
    }else{
        console.log('success!');
    }
});
```

hanser.json

```json
{
    "name": "hanser",
    "age": 18,
    "child": ["司马姥姥", "欧阳姥姥", "东方姥姥"],
    "address": "上海",
    "message": ""
}
```

## 导入JSON数据

```js
const jsonData = require('./data/hanser.json');
// console.log('jsonData:',jsonData); // 得到一个对象，属性名去掉双引号，属性值变单引号。
```

