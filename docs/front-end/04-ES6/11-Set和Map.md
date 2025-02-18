# Set 和 Map

## Set

Set是一种对象类型，一种构造函数，只能New 不能调用。

ES6 提供了新的数据结构 Set，它类似于数组，但是成员的值都是唯一的，没有重复的值，没有索引的集合。

### ① Set 构造函数

Set 构造函数接收一个数组或者可遍历对象作为参数，该构造函数只能实例化，不能调用。

Set 函数可以接受一个数组或者其他可遍历对象作为参数，用来初始化。生成一个没有重复数据，没有索引的集合。

```js
// 创建 Set 类型的数据
const s1 = new Set();
const s2 = new Set([100,200,200,200,300,400,400,500, {name:'xiaole'},{name:'xiaole'}]);
const s3 = new Set('Hello World');

console.log(s1); // Set(0) {size: 0}
console.log(s2); // Set(7) {100, 200, 300, 400, 500, …}
console.log(s3); // Set(8) {'H', 'e', 'l', 'o', ' ', …}
console.log('');
```

### ② Set 的实例的属性方法

| 属性名和方法名                                               | 描述                                           |
| ------------------------------------------------------------ | ---------------------------------------------- |
| [size](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/size) | 返回 Set 实例的成员总数。                      |
| [add()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/add) | 添加某个值，返回 Set 结构本身。                |
| [delete()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/delete) | 删除某个值，返回一个布尔值，表示删除是否成功。 |
| [has()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/has) | 返回一个布尔值，表示该值是否为Set的成员。      |
| [clear()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/clear) | 清除所有成员，没有返回值。                     |
| [keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/keys) | 返回键名的遍历器                               |
| [values()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/values) | 返回键值的遍历器                               |
| [entries()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/entries) | 返回键值对的遍历器。                           |
| [forEach()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach) | 使用回调函数遍历每个成员。                     |

### ③ Set 的应用

```js
1. Set 中的成员不能重复，用来存储值不允许重复的集合
2. 实现数组的去重
```

**案例**

```ts
// 转为普通的数组
const arr = Array.from(alarmTableRef.value?.setArr || new Set())
或
const arr = [...alarmTableRef.value.setArr]
```



## WeakSet

只能New不能实例化

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别：

1）首先，WeakSet 的成员只能是对象类型的数据，而不能原始类型的数据。

2）WeakSet 不可遍历

### ① WeakSet 构造函数

```js
 const ws = new WeakSet([new Number(100),msg, [10,20,30], {name:'小乐'}, msg]);
```

### ② WeakSet 实例的方法

| 方法名                                                       | 含义                                                |
| ------------------------------------------------------------ | --------------------------------------------------- |
| [add()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/add) | 向 WeakSet 实例添加一个新成员                       |
| [delete()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/delete) | 清除 WeakSet 实例的指定成员。                       |
| [has()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakSet/has) | 返回一个布尔值，表示某个值是否在 WeakSet 实例之中。 |

## Map 

Map 结构类似于 Object 对象，有键值对组成的集合，不同的是， Map 中的键可以是任意类型的数据， 相比较 Object 对象中的键（属性名）只能是字符串或symbol。

### ① Map 构造函数

创建 Map 类型  Map 构造函数的参数必须是个二维数组

```js
 const arr = [10,20,30,40];
const user = {name:'小乐'};
const s = new Set(arr);

// 创建 Map 类型  Map 构造函数的参数必须是个二维数组
const m = new Map([
    [arr, arr],
    [user, '上海'],
    [s, ['司马姥姥', '欧阳姥姥']],
    ['address', '北京'],
    [100, 'helo world']
]);
```

### ② Map 实例的属性方法

| 方法或属性                                                   | 含义                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [size](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/size) | 返回 Map 结构的成员总数                                      |
| [set()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/set) | 设置键名 key 对应的键值为 value，然后返回整个 Map 结构。 如果 key 已经有值，则键值会被更新，否则就新生成该键。 set 方法返回的是当前的Map对象，因此可以采用链式写法。参数写key |
| [get()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/get) | get 方法读取 key 对应的键值，如果找不到 key，返回undefined。 |
| [has()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/has) | has 方法返回一个布尔值，表示某个键是否在当前 Map 对象之中，参数写key |
| [delete()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/delete) | delete 方法删除某个键，返回true。如果删除失败，返回false。   |
| [clear()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/clear) | clear 方法清除所有成员，没有返回值。                         |
| [keys()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/keys) | 返回键名的遍历器对象。                                       |
| [values()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/values) | 返回键值的遍历器遍历器对象。                                 |
| [entries()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) | 返回所有成员的遍历器对象。返回二维数组                       |
| [forEach()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach) | 遍历 Map 的所有成员。                                        |

## WeakMap

WeakMap结构与Map结构类似，也是用于生成键值对的集合，WeakMap 与Map 的区别有两点：

1）WeakMap只接受对象类型的数据作为键名，不接受原始类型数据（直接量形式）的值作为键名。

2）不可遍历。

### ① WeakMap 构造函数

```js
const arr = [10,20,30,40];
const user = {name:'小乐'};
const s = new Set(arr);

// 创建 WeakMap 类型  WeakMap 构造函数的参数必须是个二维数组
const wm = new WeakMap([
    [arr, arr],
    [user, '上海'],
    [s, ['司马姥姥', '欧阳姥姥']],
    [{}, '北京'],
    [new Number(100), 'helo world']
]);
```

### ② WeakMap 实例的方法

| 方法名                                                       | 含义                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [set()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/set) | 添加或修改值                                                 |
| [get()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/get) | 根据 key，获取 value                                         |
| [has()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/has) | has 方法返回一个布尔值，表示某个键是否在当前 WeakMap 对象之中 |
| [delete()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/set) | delete 方法删除某个键，返回true。如果删除失败，返回false。   |



# 