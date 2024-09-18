# Class 语法

只能调用不能New，是一种函数。

JavaScript 中，定义构造函数与普通函数并无差别，这种写法跟传统的面向对象语言（比如 C++ 和 Java）差异很大，很容易让新学习这门语言的程序员感到困惑。

ES6 提供了更接近传统语言的写法，引入了 Class（类）这个概念，作为对象的模板。通过 class 关键字，可以定义类。

## Class 定义类（定义构造函数）

**语法：**

```js
// 定义类
class Product {
    // 给实例设置属性 属性会直接添加到实例本身
    name = '汽车';
    price = 121.23;

    // 给实例设置方法 简写方式 这些方法会添加到实例的原型上
    buy(n) {
        console.log(`购买了${n}件${this.name}`);
    };

    addShopcar() {
        console.log('将' + this.name + '加入购物车！');
    };
}


console.log(Product);
console.log(typeof Product);    // function
console.log('');

// Product();                   // 不能调用 只能实例化

// 实例化
const p1 = new Product();       
console.log(p1);                // 返回Product类型的对象
p1.buy(45);                     // 购买了45件汽车
p1.addShopcar();                // 将汽车加入购物车！
```

**特点：**

```js
1. 使用 class 关键字定义的类本质上仍然是构造函数，使用 typeof 判断返回 function;
2. 使用 class 关键字定义的类（构造函数）不能被调用，只能被实例化;
3. 在 class 里面使用简写方式为设置的方法，会自动添加到实例的原型上;
4. 在 class 里面只能定义属性和方法，如果有其他代码可以在方法内部写;
5. 以分号结尾。
```

上面方式定义的类，具有如下特点：

- 1）ES6 的类，本质上还是构造函数，使用 typeof 查看类的类型，返回`function`。
- 2）类可以被实例化，但是不能被调用，这是与之前的构造函数的主要区别。
- 3）上述代码中定义的属性，会添加到类的实例上。
- 4）上述代码中定义的方法，会添加到类的实例的原型上。
- 5）constructor 被称之为构造方法，会在实例化的时候自动调用，可用于对属性初始化赋值。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
- 6）类中的方法内使用 this，它默认指向类的实例，任然遵循谁调用指向谁的规则。
- 7）类中可以定义属性和方法，但不能写其他语句，否则会报错；当然，方法的里面就可以写任何的语句了。

## 类中定义构造器方法

使用`构造器方法`给实例的属性进行赋值。构造器方法在实例化的时候会自动执行。

```js
constructor(){}
```

class 语法可以直接添加访问器属性，不用像 ES5 那样使用 Object.defineProperty() 方法。

**语法：**

```js
class Product {
    // 给实例设置属性
    name;
    price;

    // 构造器方法
    constructor(name, price) {
        this.name = name;
        this.price = Math.max(price, 100);
        this.num = Math.random();
    };
}
```

**特点：**

```js
1. 构造器方法在实例化的时候会自动执行
2. 构造函数方法通常用于给属性进行赋初始值，构造器方法中的this指向实例
```

```js
// 定义类
class Product {
    // 给实例设置属性
    name;
    price;

    // 构造器方法
    constructor(name, price) {
        this.name = name;
        this.price = Math.max(price, 100);
        this.num = Math.random();
    };

    // 给实例设置方法
    buy(n) {
        console.log(`购买了${n}件${this.name}`);
    };

    addShopcar() {
        console.log('将' + this.name + '加入购物车！');
    };
}


// 实例化   构造器方法在实例化的时候会自动执行
//构造函数方法 给属性赋初始值。实例中的 name='华为p40',price='199'
const p1 = new Product('华为p40', 199);     

//构造函数方法 给属性赋初始值。实例中的 name='iphone15',price='100'
//构造器方法在实例化的时候会自动执行,price=100
const p2 = new Product('iphone15', 99);   

console.log(p1);    //Object对象实例
console.log(p2);    //Object对象实例

//修改 Object对象实例 属性值
p1.name = '华为Nova11';     
console.log(p1);  	//Object对象实例
p1.buy(99);        //购买了99件华为Nova11
```



## 私有属性

类中的属性名前加 '#' 代表私有属性

- 私有属性只能在类中的方法中通过this使用，在类的外部无法通过对象名使用。
- 私有属性需要在赋值前提前声明

子类的代码不能更改父类定义的属性（这一点有别于其他编程语言）

**语法：**

```js
// 定义类
class Product {
    // 给实例设置属性
    #name;
    #price;
    #num;

    // 构造器方法
    constructor(name, price) {
        this.#name = name;
        this.#price = Math.max(price, 100);
        this.#num = Math.random();
    };

    // 给实例设置方法
    buy(n) {
        console.log(`购买了${n}件${this.#name}`);
    };

    addShopcar() {
        console.log('将' + this.#name + '加入购物车！');
    };
}


// 实例化
const p1 = new Product('华为p40', 199);     
console.log(p1);            //Product对象

console.log(p1.name);       //undefined
console.log(p1.price);      //undefined
console.log(p1.num);        //undefined

p1.buy(12);                 //购买了12件华为p40
```

**特点：**

```js
1. 私有属性只能在类中的方法中通过this使用，在类的外部无法通过对象名使用
2. 私有属性需要在赋值前提前声明
```



## 类方法的几种形式

```js
class Person{
    // say定义在Person的原型对象(Person.prototype)上,类本身无法用,实例可以用,
    // this指向:谁调用指向谁
    say(){
        console.log("say is running,name: ",this)
    }
    // sleep定义在实例化对象(Person)上,类本身无法用,实例可以用,
    // this指向:谁调用指向谁
    sleep = function(){
        console.log("sleep is running,age: ", this)
    }
    // 箭头函数定义在 实例化对象上，类本身无法用,实例可以用
    // this指向：箭头函数没有this,this的指向取决于上层作用域中的this指向
    // 上层作用域中的this是CLass类，this的指向是实例，所以是Person实例
    rap = () => {
        console.log("rap is running,rap_this ",this)
    }
    // 静态方法，定义在Person的原型对象中(Person.prototype)的constructor属性中
    // 类本身的方法，类本身可以用，实例无法用,
    // this指向:指向类本身
    static eat(){
        console.log("eat is running,eat_this ",this)
    }
}

const p1 = new Person()
const p2 = new Person()

// 验证引用地址是否相同
console.log(p1.say === p2.say) //true 说明是在原型对象(Person.prototype)上
console.log(p1.sleep === p2.sleep) //false 说明是在实例化对象(Person)上，每一个实例对象都有一个自己的sleep方法
// 查看实例
console.log("info->p1",p1)  // 也能看到say方法和sleep方法的位置不同

// 只能类本身调用eat方法
Person.eat()
```

使用案例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Class功能验证</title>
</head>
<body>
    <div id="root">Class功能验证</div>
</body>
<script>
    class Person{
        constructor(name,age){
            this.name = name;
            this.age = age
        }
        state={
            name:"Hanser",
            age:18
        }
        // 函数形式中 this 谁调用，指向谁
        // say在Person的原型对象上，类本身无法用，实例可以用
        say(){
            console.log("say is running,name: ",this.state.name)
        }
        // sleep在实例化对象上p，类本身无法用，实例可以用
        sleep = function(){
            console.log("sleep is running,age: ", this.state.name)
        }
        // 使用static 设置eat为静态的方法，eat只会在Persion本身类上，实例上用不了
        static eat(){
            console.log("eat is running,eat_this ",this)
        }
        sing(){
            console.log("sing is running, sing_this ",this)
        }
        dance = function(){
            console.log("dance is running,dance_this ",this)
        }
        // 箭头函数中的this，箭头函数没有this,this的指向取决于上层作用域中的this指向
        // 上层作用域中的this是CLass类，this的指向是实例，所以是Person实例
        rap = () => {
            console.log("rap is running,rap_this ",this)
        }
    }
    // 实例化对象
    const p1 = new Person()
    const p2 = new Person()
    // 调用方法
    p1.say()
    p2.say()
    p1.sleep()
    p2.sleep()

    // 验证引用地址是否相同
    console.log(p1.say === p2.say) //true 说明是在原型对象(Person.prototype)上
    console.log(p1.sleep === p2.sleep) //false 说明是在实例化对象(Person)上，每一个实例对象都有一个自己的sleep方法
    // 查看实例
    console.log("info->p1",p1)  // 也能看到say方法和sleep方法的位置不同

    // static 语法调用
    // 只能类本身调用eat方法
    Person.eat() //  this 指向Person类本身，谁调用，this指向谁
    // 实例上调用static 静态方法
    // p1.eat() // 报错

    // this指向的问题
    // 定义一个对象，把say的引用地址和eat的引用地址赋值给f1和f2属性
    const obj = {
        name: "Yousa",
        f1: p1.sing,
        f2: p1.dance,
        f3:p1.rap
    }
    p1.sing() // this 指向Person实例，谁调用，指向谁
    p1.dance() // this 指向Person实例，谁调用，指向谁
    p1.rap() // this 指向Person实例，谁调用，指向谁

    obj.f1() // this 指向obj对象，谁调用，指向谁
    obj.f2() // this 指向obj对象，谁调用，指向谁
    obj.f3() // this 指向Person实例，原因因为箭头函数没有this,this的指向取决于上层作用域中的this指向，
    // 上层作用域中的this是CLass类，this的指向是实例，所以是Person实例
</script>
</html>
```



## 静态方法

构造函数本身的方法就是静态方法。

方法前面加`static` 关键字，就表示该方法不会添加到实例的原型上，而是添加到类本身上，被称为**静态方法**。

如果静态方法包含 this 关键字，这个 this 默认指向的是类本身，任然遵循谁调用指向谁的规则。

- 静态方法就是构造函数（类）自身的方法
- 静态属性也是构造函数（类）自身的属性

**语法：**

```js
  // 定义类
class Product {
    // 静态属性 静态属性语法还处提案阶段，没有正式纳入标准，6月更新。
    static name = '小乐';

	// 静态属性
    static getInfo() {
        console.log('我是 Product 类中的静态方法');
    }
}

```

```js
// 定义类
class Product {
    // 给实例设置属性
    static name = '小乐';

    // 静态属性
    static getInfo() {
        console.log('我是 Product 类中的静态方法');
    }
}

// 添加Product静态方法
Product.getPrice = function() {
    console.log("我是Product添加的静态方法");
}
// 创建实例
p1 = new Product(name);
console.log(p1.name);               // undefined
console.log(Product.getInfo);       // ƒ getInfo() {...}
console.log(Product.name);          // "小乐"
Product.getInfo();                  // "我是 Product 类中的静态方法"
console.log(Product.getPrice)       // ƒ () {...}
```

**特点：**

```js
静态方法就是构造函数（类）自身的方法
```

## 继承

class 可以通过 extends 关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

### ① extends 关键字实现继承

**语法：**

```js
class 父类 {
    
}

class 子类 extends 父类 {
    
}
```

**特点：**

```js
1. 一个父类可以被多个子类继承，一个子类只能继承一个父类;
2. 子类的实例的原型会自动设置成父类的一个实例; extends
   子类的实例的原型的 constructor 属性会自动指向子类; extends 
   与构造函数和构造函数之间继承(子类 父类)相同。
```

### ② 方法和属性的重写

- 子类中定义的属性和方法如果与父类中定义的属性或方法重名，子类中会重写继承下来的属性和方法。
- 如果子类中重写父类中的构造器方法，子类中构造器方法中必须先通过 super 关键字来调用父类的构造器方法，再进行其他操作。

**语法：**

```js
class 父类 {
    name;
    price;
    say() {}
    eat() {}
}

class 子类 extends 父类 {
    name;
    say() {}
}

class 子类 extends 父类 {
  	constructor() {
        super();   // 将父类的构造器方法执行一次，父类中的参数需要传进来。
    }
}
```

**特点：**

```js
1. 子类中定义的属性和方法如果与父类中定义的属性或方法重名，子类中会重写继承下来的属性和方法。
2. 如果子类中重写父类中的构造器方法，子类中构造器方法中必须先通过 super 关键字来调用父类的构造器方法，再进行其他操作。
```

```js
// 定义类
class Product {
    // 给实例设置属性
    name;
    #num;
    price;

    // 构造器方法
    constructor(name, price) {
        this.name = name;
        this.price = Math.max(price, 100);
        this.#num = Math.random();
    };

    // 给实例设置方法
    buy(n) {
        console.log(`购买了${n}件${this.name}, 单价是${this.price}`);
    };

    addShopcar() {
        console.log('将' + this.name + '加入购物车！');
    };
}


// 定义子类
class Phone extends Product {
    color = 'red';

    constructor(name, price, color) {
        // 将父类的构造器方法调用一次
        super(name, price);
        // 设置自己的属性
        this.color = color;
    }
    discount(per) {
        this.price *= per;
    }
    buy() {
        console.log(`购买了${this.name}，价格：${this.price},颜色：${this.color}`);
    }
}


// 实例化子类
const p = new Phone('华为P50', 89.9, 'green');
console.log(p); //Phone对象
p.buy(12); //购买了华为P50，价格：100,颜色：green
```



### ③ super 关键字

super 关键字可以作为对象使用，也可以作为函数使用。

super 关键字作为对象使用，具有如下特点：

```js
1. super 关键字 写在使用 {} 声明对象时，只能用在简写形式的方法中,其他形式的方法一律报错;
2. super 表示方法所属的对象的原型;

super 的指向与谁调用该方法无关，只与定义方法时所在的对象的有关;
```

super 关键字作为函数使用，具有如下特点：

```js
1. 在子类的构造器方法中使用 super， 只能在构造器方法中使用，其他方法中不能使用。
2. 此时 super 表示父类的构造器方法constructor:constructor(){}， 子类若重写父类构造器方法，必须先调用 super，然后再写自己的方法;
3. 在子类的构造器方法中，要求 super 必须写在最前面;
```

### ④ 继承内置类（内置构造函数）

Number String Boolean Math Date Array Function 这些都是内置构造函数。

使用自定义的类来继承这些内置构造函数，就是继承内置类。

```js
 // 定义类 继承Array
class MyArray extends Array {
    #name;
    // 重写构造器方法
    constructor(name, ...args) {
        super(...args);
        this.#name = name;
    }
}

const ma = new MyArray('xiaole', 10,20,30,40,50,60);
console.log(ma);
```

