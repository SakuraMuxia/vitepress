# Static关键字

**成员变量**

* 静态变量，可以直接通过类名访问

**成员方法**

* 静态方法，本类中直接访问，其他类直接通过类名访问

**代码块**

* 静态代码，当Java虚拟机加载类时，就会执行该代码块

> 创建对象也叫做实例（真真实实存在的一个个例）化，对象级别也称之为实例级别。

## Static关键字

### 修饰属性

static修饰属性，称之为静态属性，也叫静态变量，也叫类变量

> 被static修饰的属性，不属于任何对象，只属于当前类，可以被此类的所有对象共享，在内存中`只存在一份`。
>
> 静态属性：本类中直接访问（例如：name），其他类通过类名加点访问（例如：Drink.name）

> 静态属性推荐使用类名加点访问（例如：Drink.name），因为静态属性不属于任何对象，不推荐使用对象名加点的方式访问（drink.name）

```java
package com.staticPart;

public class Drink {
    String name;
    static int water = 100;
    // 构造方法
    public Drink(String name) {
        this.name = name;
    }

    public Drink() {
    }

    // 喝水方法
    public void getWater(){
        if(water > 0 ){
            water -= 2;
            System.out.println(name + "接水2L,剩余" + water +"L");
        }else{
            System.out.println("没水了");
        }
    }
    // 测试类
    public static void main(String[] args) {
        // 实例化1
        Drink drink = new Drink("yousa");
        drink.getWater(); // yousa接水2L,剩余98L
        // 通过对象名访问 静态属性 （不推荐）
        drink.water = 200;
        // 通过类名访问静态属性,在本类中直接访问
        water = 201;
        // 通过类名访问静态属性
        Drink.water = 202;

        // 实例化2
        Drink drink2 = new Drink("Reine");
        drink2.getWater(); // Reine接水2L,剩余198L
    }
}

```

> 在实例方法中不可以定义 static 属性变量。原因：实例方法是在创建对象后才可以调用，而static变量在加载类时就会被创建，不属于任何对象，两者的范围不同。

### 修饰方法

```ts
静态无法访问实例的属性和方法原因：
静态访问实例的属性前提是这个实例必须先要new出来，要先存在这个实例才可以访问到。有静态的时候不一定有对象。

同样原因：父类无法访问子类
父类需要在子类存在的情况下才能访问，父类是无法得知子类是否存在。
```

> 静态方法：本类中直接调用，其他类通过类名加点调用。
>
> 静态方法不同于静态属性，因为方法只有调用的过程才会执行，调用就会进栈。
>
> 静态方法可以被继承。

> 静态方法：可直接通过类名访问
>
> * 静态方法中不能使用this和super
> * 不能直接访问所属类的实例变量和实例方法
> * 可直接访问类的静态变量和静态方法

> 实例方法：通过实例访问
>
> * 可直接访问所属类的静态变量、静态方法、实例变量和实例方法
> * main()就是最常用的静态方法

```java
package com.staticPart;

public class Eat {
    // 属性
    String name;
    String food;
    static int remain = 100;
    // 构造方法
    public Eat(){}
    // 构造方法
    public Eat(String name,String food){
        this.name = name;
        this.food = food;
    }
    // 实例方法
    public void info(){
        System.out.println(this.name + "吃了" + this.food + "现在剩余的事物数量为:"+ remain);
    }
    // 静态方法 drink
    public static void eatFood(){
        // 静态方法中使用静态属性
        Eat.remain -= 1;
    }
    // 测试类
    public static void main(String[] args) {
        Eat eater = new Eat("九月","泡面");
        // 实例调用静态方法：会出现警告，但是可以使用
        eater.eatFood();
        // 实例调用实例方法
        eater.info();
        // 实例调用静态属性：会出现警告，但是可以使用
        System.out.println("现在剩余的事物数量"+eater.remain);
    }
}

```



### 修饰代码块

```java
什么是代码块
	直接由{}包裹的代码块
    
静态代码块，普通代码块和方法的区别
	静态代码块是随着JVM加载类时而执行,多个静态代码块按照书写顺序执行,每个只执行一次。
    普通代码块会随着对象创建而执行，每创建一个对象，就执行一次。
    方法只有在调用的时候才会执行。
    
什么时候会加载类
    1. new对象
    2. 访问类中的静态属性或者静态方法
    
静态代码块特性  
	1.静态代码块是随着JVM加载类时而执行。
    2.多个静态代码块按照书写顺序执行。
    3.每个只执行一次。
    4.静态代码块的执行会在构造方法之前执行。
    
静态代码块的用途
    1.当我们需要执行一些前置的操作，并且这个操作只需要执行一次（例如连接数据库操作，数据初始化等操作，读取硬盘数据到内存中）

```



### 创建对象过程

对象创建过程

![image-20250701105433939](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20250701105433939.png)

```ts
前提：
方法区：Java的Sun公司提出的一种规范，把这种格式的内存区域称之为方法区。
永久代和元数据,元空间分别指的是JDK7和JDK8对方法区的一个命名。两者的关系例如学校和大学中学小学之间的关系。
方法区类比学校，永久代类比某某大学，元空间类比某某中学之类。

对象创建过程：
1. 将当前对象所属类对应的class文件加载到方法区
	在加载类信息文件(class文件)之前，会先判断此类是否已经被加载过。
    如果加载过，则直接执行第2步。
    如果没有加载过，则先加载。
    加载类的同时会在方法区的静态区初始化静态相关的信息，此时静态相关的信息将有初始值，但对象还没有创建完成。
2.在堆中开辟空间创建对象，此时实例级别的属性将有默认值
3.将堆中的地址赋值给栈中的引用，完成对象的创建。

注意：
类只加载一次。
静态属性只存在一份。
```

## 方法重写

**方法重写的特性与条件**

```java
方法重写的特性与条件：
    1. 存在于父子类之间
    2. 方法名称相同
    3. 参数列表相同
    4. 返回值相同或者是其子类
    5. 访问权限不能严于父类，子类的访问权限不能小于父类的访问权限
    6. 静态方法可以被继承，但是不能被重写
    7. 不能抛出、声明比父类更多的异常
```

注解的作用：

```java
@override // 注解
public void print(){
    
}
```

> 辅助提示：检查方法重写是否正确。
>
> @Override 注解，此注解只能加在方法上，表示此方法属于重写父类的方法，如果没有正确重写，则编译报错。

方法重写案例：

父类

```java
package com.methodRenamePart;

public class Vtuber {
    String name;
    int age;
    char gender;
    String height;

    public Vtuber() {
    }

    public Vtuber(String name, int age, char gender, String height) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.height = height;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public void info() {
        System.out.println("Vtuber" +
                " name='" + name + '\'' +
                ", age=" + age +
                ", gender=" + gender +
                ", height='" + height + '\'');
    }
}

```

子类

```java
package com.methodRenamePart;

public class Gamer extends Vtuber{
    String games;

    public Gamer(String games) {
        this.games = games;
    }

    public Gamer(String name, int age, char gender, String height, String games) {
        super(name, age, gender, height);
        this.games = games;
    }

    public String getGames() {
        return games;
    }

    public void setGames(String games) {
        this.games = games;
    }
    // 子类方法重写
    public void info(){
        // 调用父类的方法
        super.info();
        System.out.println("爱好的游戏是" + this.games);
    }
}

```

测试类

```java
package com.methodRenamePart;

public class Test {
    public static void main(String[] args) {
        // 创建对象
        Gamer gamer = new Gamer("凑阿夸",5,'女',"156","Apex");
        gamer.info();
    }
}

```

### toString()方法重写

```java
直接打印一个对象，相当于调用此对象的toString方法，toString方法从顶层父类Object类中继承而来。

sout(object)
直接打印对象相当于调用了这个对象的toString方法
objcet.toString() 

我们在实际开发中通常需要重写toString方法,用于将本类中的属性名和属性值进行拼接,以方便直接打印对象实现输出 属性信息的效果。
```

> 重写toSting在开发中99%的作用就是为了看对象属性。（可通过idea插件快速生成）

```ts
通过 alt+insert 快捷键，然后点击toString，就可以快速生成一个toString重写方法
```

toString方法重写案例

```java
package com.methodRenamePart;

public class Vtuber {
    String name;
    int age;
    char gender;
    String height;

    public Vtuber() {
    }

    public Vtuber(String name, int age, char gender, String height) {
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.height = height;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public char getGender() {
        return gender;
    }

    public void setGender(char gender) {
        this.gender = gender;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    @Override
    public String toString() {
        return "Vtuber{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", gender=" + gender +
                ", height='" + height + '\'' +
                '}';
    }
}

```

