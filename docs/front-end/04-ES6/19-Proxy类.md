# Proxy

## 什么是Proxy代理

Proxy是JavaScript的一个内置对象，它允许我们创建一个代理对象，用于拦截和自定义操作。通过使用Proxy，我们可以拦截目标对象的底层操作，如属性读取（get）、属性赋值（set）、函数调用（apply）等，并在这些操作发生时执行自定义的行为。

## 使用Proxy的基本语法

创建一个Proxy代理对象的基本语法如下

```javascript
let proxy = new Proxy(target, handler);
```

- target：表示要代理的目标对象。
- handler：一个包含各种拦截操作的处理器对象。

基本用法

```javascript
const obj = {};
const proxy = new Proxy(obj, {
    // target 目标对象；propKey 属性名；receiver 实例本身；
    get: function(target, propKey, receiver) {
        return 10;
    }
})
console.log(proxy.a); // 10
console.log(proxy.b); // 10
console.log(obj.a); // undefined
console.log(obj.b); // undefined

```

以上代码对obj对象的get操作进行了拦截，任何读取操作都仅会返回10，且该操作只作用在代理对象proxy上，对原对象本身是不起作用的。

若obj对象是不可写及不可配置的，代理对象的返回值要与被代理对象的返回值保持一致；

若被代理对象没有配置get方位方法，即get方法是undefined，那么返回值必须是undefined



## 拦截操作的种类

Proxy代理提供了多种拦截操作，以下是其中一些常用的操作 

### get

get：拦截属性读取操作。

```javascript
const handler = {
  get: function(target, property) {
    console.log(`正在读取属性：${property}`);
    return target[property];
  }
};
const obj = { name: "John" };
const proxy = new Proxy(obj, handler);
console.log(proxy.name); // 输出：正在读取属性：name   John
```

### set

set：拦截属性赋值操作。

```javascript
const handler = {
  set: function(target, property, value) {
    console.log(`正在设置属性：${property}，新值为：${value}`);
    target[property] = value;
  }
};
const obj = {};
const proxy = new Proxy(obj, handler);
proxy.name = "John"; // 输出：正在设置属性：name，新值为：John
console.log(proxy.name); // 输出：John
```

### apply

apply：拦截函数调用操作。

```javascript
const handler = {
  apply: function(target, thisArg, argumentsList) {
    console.log(`正在调用函数：${target.name}`);
    return target.apply(thisArg, argumentsList);
  }
};
function sayHello(name) {
  console.log(`Hello, ${name}!`);
}
const proxy = new Proxy(sayHello, handler);
proxy("John"); // 输出：正在调用函数：sayHello  Hello, John!
```

## 进一步定制Proxy代理

除了上述的基本拦截操作外，我们还可以进一步定制Proxy代理的行为，例如 

### 拦截操作的条件判断

```javascript
const handler = {
  get: function(target, property) {
    if (property === 'age') {
      return target[property] || '未知';
    } else {
      return target[property];
    }
  }
};
const obj = { name: "John" };
const proxy = new Proxy(obj, handler);
console.log(proxy.name); // 输出：John
console.log(proxy.age); // 输出：未知
```

### 拦截操作的扩展和限制

```javascript
const handler = {
  get: function(target, property) {
    if (property === 'name') {
      return target[property];
    } else {
      throw new Error(`访问的属性${property}被禁止`);
    }
  }
};
const obj = { name: "John", age: 25 };
const proxy = new Proxy(obj, handler);
console.log(proxy.name); // 输出：John
console.log(proxy.age); // 抛出错误：访问的属性age被禁止
```

### 拦截操作的属性验证和修改

```javascript
const handler = {
  set: function(target, property, value) {
    if (property === 'age') {
      if (typeof value !== 'number' || value < 0) {
        throw new Error(`无效的年龄值：${value}`);
      }
      target[property] = value;
    } else {
      throw new Error(`设置属性${property}被禁止`);
    }
  }
};
const obj = { name: "John", age: 25 };
const proxy = new Proxy(obj, handler);
proxy.age = 30; // 设置成功
console.log(proxy.age); // 输出：30
proxy.age = -5; // 抛出错误：无效的年龄值：-5
proxy.name = "Tom"; // 抛出错误：设置属性name被禁止
```

Proxy代理是JavaScript中一项强大而灵活的功能，它可以用于拦截、修改和自定义对象的底层操作。通过使用Proxy，我们可以实现各种定制化的功能，如属性读取拦截、属性赋值拦截、函数调用拦截等。此外，我们还可以根据实际需求对拦截操作进行条件判断、扩展和限制，以及属性验证和修改。掌握Proxy代理的使用将使我们的JavaScript代码更具可读性、灵活性和安全性。

## handle对象的常用方法

|      方法      |                             描述                             |
| :------------: | :----------------------------------------------------------: |
|      has       |                        in操作符捕捉器                        |
|      get       |                     属性读取操作符捕捉器                     |
|      set       |                     属性设置操作符读取器                     |
| deleteProperty |                      delete操作符读取器                      |
|    ownKeys     | Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器。 |
|     apply      |                        函数调用捕捉器                        |
|   construct    |                      new操作符的捕捉器                       |

## 可消除的Proxy

 Proxy有一个唯一的静态方法Proxy.revocable(target, handler)，可以用来创建一个可撤销的代理对象，该方法的返回值是一个对象，其结构为： `{"proxy": proxy, "revoke": revoke}`。

- proxy 表示新生成的代理对象本身，和用一般方式 new Proxy(target, handler) 创建的代理对象没什么不同，只是它可以被撤销掉。
- revoke 撤销方法，调用的时候不需要加任何参数，就可以撤销掉和它一起生成的那个代理对象。

ps.该方法常用于完全封闭对目标对象的访问。

## Vue为什么要用Proxy重构

 Vue3.0之前，双向绑定主要是由defineProperty实现的。

而defineProperty这个方法本身其实是存在不足的，比如说对于对象属性增加、数组按下标修改等一下操作无法做到原生实现。

虽然Vue有提供相应的手动observer方法，但在使用体验上还是不尽如人意的。而想较于defineProperty针对属性进行拦截，Proxy直接劫持了整个对象，即不需要对特殊的操作做单独处理。

## Proxy与defineProperty的对比

（1）Proxy作为新标准，浏览器支持良好

（2）Proxy能观察的类型比`defineProperty` 更丰富

（3）Proxy不兼容IE，也没有polyfill，`defineProperty` 可以支持到IE9

（4）`defineProperty` 劫持对象的属性，当新增属性时，需要再次`defineProperty`；Proxy直接劫持整个对象，不需要额外操作。

（5）`defineProperty` 在原对象本身进行拦截操作，而Proxy只能在生成的拦截的对象上进行拦截操作。