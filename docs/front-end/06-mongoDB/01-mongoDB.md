# MongoDB

## MongoDB 数据库

简介

MongoDB 是为快速开发互联网Web应用而设计的数据库系统，官方地址 <https://www.mongodb.com/>

数据库（DataBase）是按照数据结构来组织、存储和管理数据的仓库。是一个应用程序。

下载地址

下载地址  https://www.mongodb.com/try/download/community

## windows安装

**默认安装目录：**

```
C:\Program Files\MongoDB\Server\5.0
```

**默认配置文件地址：**

```
C:\Program Files\MongoDB\Server\5.0\bin\mongod.cfg
```

**默认数据存放目录：**

```
C:\Program Files\MongoDB\Server\5.0\data
```

## linux安装

```js
https://www.mongodb.com/try/download/community
tar -zxvf mongodb-linux-x86_64-rhel70-4.4.17.tgz

移动安装文件夹并重命名
mv mongodb-linux-x86_64-rhel70-5.0.26
cd /usr/local
mv mongodb-linux-x86_64-rhel70-4.4.17/ mongodb

在mongodb目录下创建data、logs目录
mkdir data logs
创建logs/mongodb.log文件
touch mongodb.log

在mongodb 的bin目录下创建mongodb.conf配置文件
vim /usr/local/mongodb/bin/mongodb.conf

// 手动启动配置文件
# 数据文件存放目录
dbpath = /usr/local/mongodb/data
# 日志文件存放目录
logpath = /usr/local/mongodb/logs/mongodb.log
logappend=true
# 端口
port = 27017
# 以守护程序的方式启用，即在后台运行
fork = false
# 认证模式
auth=true
# 远程连接
bind_ip=0.0.0.0
mongod启动的常用参数详细说明：


设置启动用户
useradd mongodb -M -s /sbin/nologin
chown -R mongodb:mongodb /usr/local/mongodb
```

```js

```

![image-20240424104802355](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240424104802355.png)

启动

```js
直接启动数据库：

./mongod -f mongodb.conf
使用Ctrl+C停止进程！
使用mongo命令进入数据库，当未添加环境变量时，命令mongo不能直接使用。
将mongodb命令添加到环境变量中：

vim /etc/profile
# 添加mongodb环境变量
export PATH=$PATH:/usr/local/mongodb/bin
# 重新加载配置文件
source /etc/profile
# 检查环境变量
echo $PATH

使用mongo命令进入数据库：
```

后台启动

```js
MongoDB守护进程，后台启动
在上述mongodb.conf配置文件中，fork设置的为false，需要把fork设置为true,让它后台执行，修改后执行如下：
./mongod -f mongodb.conf

关闭
ps aux | grep mongod
kill -2 进程
pkill -2 进程名称
```

注册为服务的配置文件 mongodb.conf

```js
dbpath = /usr/local/mongodb/data
logpath = /usr/local/mongodb/logs/mongodb.log
logappend=true
port = 27017
auth=true
bind_ip=0.0.0.0

```

注册为服务

```js
vim /etc/systemd/system/mongod.service



[Unit]
Description=MongoDB Database Server
After=network.target

[Service]
User=root
Group=root
ExecStart=/usr/local/mongodb/bin/mongod --config /usr/local/mongodb/bin/mongodb.conf
ExecReload=/bin/kill -HUP $MAINPID
PIDFile=/var/run/mongodb/mongod.pid

[Install]
WantedBy=multi-user.target


systemctl daemon-reload
systemctl start mongod
systemctl status mongod
systemctl enable mongod
```

修改权限

```js
chmod -R 755 /usr/local/mongodb
chown -R root.root /usr/local/mongodb
```



### MongoDB开启auth验证

​    在上述mongodb.conf配置文件中，auth设置的为true,这时就需要对数据库的操作需要权限，如下所示，在普通用户下执行插入时就报错了（root用户下执行也是会报错），这就是因为设置了权限的问题：

```js
此时需要先把mongo进程给关闭，把配置文件中的auth改为false,然后重新启动。启动后到admin集合下创建超级管理员账户，创建后，再把配置文件中的auth改为true,重新启动mongo进程进可以了。这时候我们就可以使用超级管理员来创建一般用户，分别给予不同权限。

auth = false

#切换到admin数据库
use admin
#使用db.createUser()函数在admin数据库下创建用户
db.createUser({user:"root",pwd:"88888888",roles:[{role:"userAdminAnyDatabase",db:"admin"},{role:"readWriteAnyDatabase",db:"admin"}]})


创建超级用户成功后，将mongodb.conf文件中的安全认证开启auth=true

重启MongoDB

#切换到admin数据库
use admin
#进行验证，认证通过返回：1
db.auth('root','88888888')
// 修改root密码 
db.updateUser('root',{pwd:'sakura',roles:[{role:'root',db:'admin'}]})
db.updateUser("root",{pwd: "new_password"})
// 修改root密码后 需要重新验证允许用户从shell中对数据库进行身份验证
#进行验证，认证通过返回：1
db.auth('root','88888888')

Built-In Roles（内置角色）：

1. 数据库用户角色：read、readWrite;
2. 数据库管理角色：dbAdmin、dbOwner、userAdmin；
3. 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager；
4. 备份恢复角色：backup、restore；
5. 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
6. 超级用户角色：root  
// 这里还有几个角色间接或直接提供了系统超级用户的访问（dbOwner 、userAdmin、userAdminAnyDatabase）
7. 内部角色：__system

```

创建普通用户

```js
//切换到admin数据库
use admin
//进行auth认证，认证通过返回：1
db.auth("root","88888888")
//切换或创建数据库，例：test
use test
db.createUser({user:"user",pwd:"123456",roles:[{role:"readWrite",db:"test"}]})
db.createUser({user:"dgw",pwd:"88888888",roles:[{role:"dbAdmin",db:"test_data"},{role:"readWrite",db:"test_data"},{role:"userAdmin",db:"test_data"}]})


查看和删除用户：
#切换到admin数据库
use admin
#查看所有用户
db.system.users.find()
#删除用户 删除时需要切换到该账户所在的数据库
db.system.users.remove({user:"user"})

超级管理员也可能没有删除的权限，查看其role中是否有删除该用户的权限。
```



## 配置环境变量

为了能够全局使用 MongoDB 相关的命令，需要配置环境变量。

> 此电脑 -> 属性 -> 高级系统设置 -> 环境变量 -> 双击 Path ->  新建 -> 设置 `mongod.exe` 所在文件夹路径。

`mongod.exe`  默认所在路径如下：

```
C:\Program Files\MongoDB\Server\5.0\bin
```

## 启动Mongodb 服务

第一种方式 windows 服务

> 此电脑 > 管理 > 服务和应用程序 >  服务 > MongoDB Server

第二种方式 命令行启动

```bash
# 启动 mongodb 服务， 数据目录默认是命令行所在盘符下的 /data/db, 数据存储目录需要提前创建，否则启动失败
mongod

# 启动 mongodb 服务， 指定数据存储目录，数据存储目录需要提前创建，否则启动失败
mongod --dbpath E:\data\db

# 启动 mongodb 服务，指定数据存储目录，指定端口号，端口号不指定默认27017
mongod --dbpath D:\data\db --port 27017
```

> 关闭命令行工具或者 `Ctrol` + `C`，服务进程会终止！

## 三个重要概念

**数据库（database）：**  数据库是一个仓库，一个 MongoDB 服务可以创建多个数据库。

**集合（collection）：**    集合类似于 JavaScript 中的数组，一个数据库中可以创建多个集合。

**文档（document）：**   文档是数据库中的最小单位，类似于 JavaScript 中的对象，表示一条数据信息，一个集合中可以有多个文档。

![img](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/db.jpg)

| MongoDB 概念     | 关系型数据库概念 |
| ---------------- | ---------------- |
| database 数据库  | database 数据库  |
| collection 集合  | table 表格       |
| document 文档    | row 行/记录      |
| field 字段       | column 列/字段   |
| index 索引       | index 索引       |
| primary key 主键 | primary key 主键 |

```js
admin： 从权限的角度来看，这是"root"数据库。要是将一个用户添加到这个数据库，这个用户自动继承所有数据库的权限。一些特定的服务器端命令也只能从这个数据库运行，比如列出所有的数据库或者关闭服务器。**

local: 这个数据永远不会被复制，可以用来存储限于本地单台服务器的任意集合

config: 当Mongo用于分片设置时，config数据库在内部使用，用于保存分片的相关信息
```

## 数据类型

| 数据类型           | 描述                                                         |
| ------------------ | ------------------------------------------------------------ |
| String             | 字符串。存储数据常用的数据类型。在 MongoDB 中，UTF-8 编码的字符串才是合法的。 |
| Integer            | 整型数值。用于存储数值。根据你所采用的服务器，可分为 32 位或 64 位。 |
| Boolean            | 布尔值。用于存储布尔值（真/假）。                            |
| Double             | 双精度浮点值。用于存储浮点值。                               |
| Min/Max keys       | 将一个值与 BSON（二进制的 JSON）元素的最低值和最高值相对比。 |
| Arrays             | 用于将数组或列表或多个值存储为一个键。                       |
| Timestamp          | 时间戳。记录文档修改或添加的具体时间。                       |
| Object             | 用于内嵌文档。                                               |
| Null               | 用于创建空值。                                               |
| Symbol             | 符号。该数据类型基本上等同于字符串类型，但不同的是，它一般用于采用特殊符号类型的语言。 |
| Date               | 日期时间。用 UNIX 时间格式来存储当前日期或时间。你可以指定自己的日期时间：创建 Date 对象，传入年月日信息。 |
| Object ID          | 对象 ID。用于创建文档的 ID。                                 |
| Binary Data        | 二进制数据。用于存储二进制数据。                             |
| Code               | 代码类型。用于在文档中存储 JavaScript 代码。                 |
| Regular expression | 正则表达式类型。用于存储正则表达式                           |

## 使用工具操作数据库

### 命令行工具

#### ① 连接 MongoDB 服务

**连接：**

```bash
# 如果 mongodb 服务在本机且不需要用户密码验证
mongo
```

```bash
# 指定 mongodb 服务所在电脑的地址，并需要用户密码验证
mongo host:port/database -u user -p password
```

- `host` MongoDB服务器的主机名(地址)，默认 locahost
- `port` MongoDB服务器端口，默认 27017
- `database` 连接后打开的数据库，默认test

**退出：**

```bash
exit
```

#### ② 数据库操作

```js
help  #查看帮助
db.help()  #db对象的方法 属性
```

显示所有的数据库

```
show dbs
show databases
db.getCollectionName(); # 返回数组
```

> **注意：** 如果数据库中没有集合，则不会显示该数据库。

创建或切换到指定的数据库

```bash
use 数据库名
```

显示当前所在的数据库

```bash
db
db.getName();
```

删除当前数据库

```
db.dropDatabase()
```

> **注意：** 先切换到需要删除的数据库

获取数据库信息

```js
db.versions();  #数据库版本
db.getMongo();  #当前数据库服务器地址
```

#### ③ 集合操作

创建集合

```js
db.createCollection('集合名')
db.createCollection(“collName”, options); #options是对象，指定集合特性 可以说省略
```

显示当前数据库中的所有集合

```js
show collections
```

删除集合

```js
db.集合名.drop()
```

重命名集合

```js
db.集合名.renameCollection('新名字')
```

得到当前集合所在的db

```js
db.collName.getDB()
```

空间大小

```js
db.collName.dataSize();  #数据空间大小
db.collName.storageSize();  #集合储存空间大小
db.collName.totalSize();  #集合总大小
```

#### ④文档操作CURD

数据库的基本操作包括四个，增加（create），删除（delete），修改（update），查询（read）

插入文档

```js
db.集合名.insert(文档对象);

db.collName.insertOne()
db.collNaem.inserMany()
db.collName.insert()
db.collName.save()



示例
// 插入一条文档数据
db.collName.save({name: ‘zhangsan’, age: 25, sex: true});  

//插入多条文档数据
db.collName.insert([{name:'JIM', age:19, 'address':'北京'},{name:'Jack', age:29, 'address':'洛杉矶'}]); 

// 如果不指定 _id 字段 save() 方法类似于 insert() 方法。如果指定 _id 字段，则会更新该 _id 的数据。 
db.collName.save({name: ‘zhangsan’, age: 25, sex: true}); 

//插入一条文档数据
db.collName.insertOne({}); 

//插入多条文档数据
db.collName.insertMany([{},{},{});
                        
# 创建文档并插入到集合中
db.集合名.insert({name:'高小乐', age: 14, address:'上海'})
db.集合名.insert({name:'高小乐', age: 14, address:'上海', message:'喜欢借给别人钱'})
db.集合名.insert({_id: 1001, name:'高大乐', age: 14, address:'上海'})
```

查询文档

```
db.集合名.find()
db.集合名.find(查询条件)	查询条件是一个对象类型
db.集合名.findOne(查询条件)
```

更新文档

```js
# 更新一个 用新文档替换旧文档
db.集合名.update(查询条件,新的文档)   
# 批量更新 用新文档替换旧文档
db.集合名.updateMany(查询条件,要更新的内容)
# 更新指定的属性
db.集合名.update({name:'xiaole'},{$set:{age:19}})
```

```js
db.collName.updateOne()
db.collName.updateMany()
db.collName.update()
db.collName.relpaceOne()

# 更新文档
# 用新文档替换掉原来的文档
db.集合名.update({name:'高小乐'}, {address:'北京'})
# 在文档中修改或添加某个属性
db.集合名.update({_id:ObjectId("647aa87097c580a4cc6587ef")}, {$set: {address:'乌鲁木齐'}})
db.集合名.update({_id:ObjectId("647aa87097c580a4cc6587ef")}, {$set: {job:'CURD仔'}})
```

语法

```js
db.collName.update(
   <query>,
   <update>,
   {
     upsert: <boolean>,
     multi: <boolean>,
     writeConcern: <document>
   }
)


query : update的查询条件，类似sql update查询内where后面的。
update : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
upsert : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
multi : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
writeConcern :可选，用于控制写入安全的级别

更新操作符
$set 设置字段的值 用法 : { $set : { field : value } }
$unset 删除字段 用法：{ $unset : { field : 1} }
$inc 字段增加 字段要求是数字 用法：{ $inc : { field : value } }
$push 给字段添加值，字段要求是数组 用法：{ $push : { field : value } }
$pushAll 同pusth 一次可以追加多个值 { $pushAll : { field : value_array } }
$pop 删除数组内的一个值 用法：删除最后一个值：{ $pop : { field : 1 } } 删除第一个值：{ $pop : { field : -1 } }
$min 更改比键对应值小的记录：{ $min: { : } }
$max 更改比键对应值大的记录：{ $max: { : } }
$currentDate 更改时间类的值到当前时间：{$currentDate:{ "CreateAt" : true}}
```

示例

```javascript
//只更新(满足条件的)第一条文档
db.col.update( { "count" : { $gt : 1 } } , { $set : { "test2" : "OK"} } );

//(满足条件)全部更新
db.colName.update( { "count" : { $gt : 3 } } , { $set : { "test2" : "OK"} },false,true );

//（如果没有满足条件的）添加一条数据
db.col.update( { "count" : { $gt : 4 } } , { $set : { "test5" : "OK"} },true,false );

//updateOne() 方法更新单个文档
db.users.updateOne({"name":"abc"},{$set:{"age":"28"}});

//updateMany() 更新多个文档
db.users.updateMany({"age":{$gt:"10"}},{$set:{"status":"xyz"}})
```

删除集合中的文档

```
db.集合名.remove(查询条件)
```

方法

- db.collName.deleteOne()
- db.collName.deleteMany()
- db.collName.remove()

语法

```js
db.collName.remove(
   <query>,
   {
     justOne: <boolean>,
     writeConcern: <document>
   }
)

query :（可选）删除的文档的条件。
justOne : （可选）默认false。如果设为 true 或 1，则只删除一个文档。
writeConcern :（可选）抛出异常的级别。


```

示例

```javascript
// 删除所有满足条件的数据
db.collName.remove({'title':'MongoDB'});

//删除满足条件的第一条数据
db.collName.remove({title:'MongoDB'}, {justOne: true})

//删除集合下全部文档
db.collName.deleteMany({})

//删除满足条件的全部文档
db.collName.deleteMany({ status : "A" })

//删除满足条件的第一个语法
db.collName.deleteOne( { status: "D" } )
```

#### ⑤ 条件控制

文档操作中，会用到条件控制。

运算符

在 mongodb 不能使用 `>` 、`<`、 `>`、 `=`、  `<`、`=`、 `!==` 等运算符，需要使用替代符号：

| 操作       | 格式                              | 范例                                        |
| ---------- | --------------------------------- | ------------------------------------------- |
| 等于       | `{<key>:<value>}` value可以是正则 | `db.collName.find({"by":"钢铁侠"});`        |
| 小于       | `{<key>:{$lt:<value>}}`           | `db.collName.find({"likes":{$lt:50}});`     |
| 小于或等于 | `{<key>:{$lte:<value>}}`          | `db.collName.find({"likes":{$lte:50}});`    |
| 大于       | `{<key>:{$gt:<value>}}`           | `db.collName.find({"likes":{$gt:50}});`     |
| 大于或等于 | `{<key>:{$gte:<value>}}`          | `db.collName.find({"likes":{$gte:50}});`    |
| 不等于     | `{<key>:{$ne:<value>}}`           | `db.collName.find({"likes":{$ne:50}});`     |
| 存在于     | `{key:{$in:[1,2,3,5]}}`           | `db.collName.find({'likes':{$in:[10,23]}})` |

`$in` 满足其中一个即可 

```js
db.集合名.find({age:{$in:[18,24,26]}}) //  /[aedf]/  
```

`$or` 逻辑或的情况

```js
db.集合名.find({$or:[{age:18},{age:24}]});
```

`$and` 逻辑与的情况

```js
db.集合名.find({$and: [{age: {$lt:20}}, {age: {$gt: 15}}]});
```

正则匹配

条件中可以直接使用 JS 的正则语法

```js
db.集合名.find({name:/imissyou/});
```

案例

```js
# 查询作者是谭维维的歌曲
db.songs.find({author:'谭维维'})

# 查询国语演唱歌曲 并且歌手是林飞如
db.songs.find({author:'林飞如', language:'国语'})

# 查询播放时长小于 150 秒的歌曲
db.songs.find({duration: {$lt: 150}})

# 查询播放时长大于300 秒的歌曲
db.songs.find({duration: {$gt: 300}})

# 查询播放时长大于等于350 秒的歌曲
db.songs.find({duration: {$gte: 350}})

# 查询歌手不是林飞如的歌曲
db.songs.find({author: {$ne: '林飞如'}})

# 查询蔡徐坤或者林飞如的歌曲 $in
db.songs.find({author: {$in:['蔡徐坤', '林飞如']}})

# 查询蔡徐坤或者林飞如的歌曲（另一种写法）$or
db.songs.find({$or: [{author:'蔡徐坤'}, {author:'林飞如'}]})

# 查询热度 5000 以上并且时长 200 以上
db.songs.find({hot:{$gte:5000}, duration:{$gte: 200}})

# 查询author里面包含蔡徐坤,使用正则
db.songs.find({author: /蔡徐坤/})

# 统计查询结果的数量
db.songs.find().count()

# 显示查询结果中的前十条
db.songs.find().limit(10)

# 显示查询结果中第15个开始，显示3条
db.songs.find().skip(15).limit(3)


# 将第一个热度是 5000 以上的歌曲，修改时长为 100
db.songs.findOne({hot: {$gt:5000}})
db.songs.update({hot: {$gt:5000}}, {$set: {duration:100}})

# 将所有热度是 5000 以上的歌曲，修改时长为 100
db.songs.find({hot: {$gt:5000}})
db.songs.updateMany({hot: {$gt:5000}}, {$set: {duration:100}})

# 删除时长 100以及以下 或者 300以及以上
db.songs.remove({$or: [{duration: {$lte: 100}}, {duration: {$gte:300}}]})
```



#### ⑥排序

使用sort()方法对数据进行排序，sort()方法可以通过参数指定排序的字段，并使用 1 和 -1 来指定排序的方式，其中 1 为升序排列，而-1是用于降序排列。

```js
db.collName.find().sort({KEY:1})
```

#### ⑦分组操作

```javascript
db.collName.aggregate(AGGREGATE_OPERATION)
```

| 表达式 | 描述                                   | 实例                                                         |
| ------ | -------------------------------------- | ------------------------------------------------------------ |
| $sum   | 计算总和。                             | db.collName.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : "$likes"}}}]) |
| $avg   | 计算平均值                             | db.collName.aggregate([{$group : {_id : "$by_user", num_tutorial : {$avg : "$likes"}}}]) |
| $min   | 获取集合中所有文档对应值得最小值。     | db.collName.aggregate([{$group : {_id : "$by_user", num_tutorial : {$min : "$likes"}}}]) |
| $max   | 获取集合中所有文档对应值得最大值。     | db.collName.aggregate([{$group : {_id : "$by_user", num_tutorial : {$max : "$likes"}}}]) |
| $first | 根据资源文档的排序获取第一个文档数据。 | db.collName.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}]) |
| $last  | 根据资源文档的排序获取最后一个文档数据 | db.collName.aggregate([{$group : {_id : "$by_user", last_url : {$last : "$url"}}}]) |

#### ⑧索引

查看索引

```js
db.collName.getIndexs()
```

查看执行时间

```js
db.collName.find().explain( "executionStats" )
```

创建索引

```js
db.collName.ensureIndex({KEY:1},[options])
```

语法中 Key 值为你要创建的索引字段，1为指定按升序创建索引，如果你想按降序来创建索引指定为-1即可。

ensureIndex() 接收可选参数，可选参数列表如下：

| 选项               | 类型          | 描述                                                         |
| ------------------ | ------------- | ------------------------------------------------------------ |
| background         | Boolean       | 建索引过程会阻塞其它数据库操作，background可指定以后台方式创建索引，即增加 "background" 可选参数。 "background" 默认值为**false**。 |
| unique             | Boolean       | 建立的索引是否唯一。指定为true创建唯一索引。默认值为**false**. |
| name               | string        | 索引的名称。如果未指定，MongoDB的通过连接索引的字段名和排序顺序生成一个索引名称。 |
| dropDups           | Boolean       | 在建立唯一索引时是否删除重复记录,指定 true 创建唯一索引。默认值为 **false**. |
| sparse             | Boolean       | 对文档中不存在的字段数据不启用索引；这个参数需要特别注意，如果设置为true的话，在索引字段中不会查询出不包含对应字段的文档.。默认值为 **false**. |
| expireAfterSeconds | integer       | 指定一个以秒为单位的数值，完成 TTL设定，设定集合的生存时间。 |
| v                  | index version | 索引的版本号。默认的索引版本取决于mongod创建索引时运行的版本。 |
| weights            | document      | 索引权重值，数值在 1 到 99,999 之间，表示该索引相对于其他索引字段的得分权重。 |
| default_language   | string        | 对于文本索引，该参数决定了停用词及词干和词器的规则的列表。 默认为英语 |
| language_override  | string        | 对于文本索引，该参数指定了包含在文档中的字段名，语言覆盖默认的language，默认值为 language. |

删除索引

```javascript
//删除指定索引
db.collName.dropIndex("INDEX-NAME")

//删除所有索引
db.collName.dropIndexes();
```

### GUI 可视化工具

* **Studio 3T**	下载地址：https://studio3t.com/download/
* **MongoDB-Compass**  下载地址：https://www.mongodb.com/try/download/compass

# node MongoDB驱动

node操作MongoDB的驱动以及它的语法

## MongoDB Native Driver

这是 MongoDB 官方提供的驱动，运行在 Node 中的 JavaScript 可以调用该驱动提供的 API 实现对象 MongoDB 的操作，使用前需要安装。

```bash
npm install mongodb
```

>  **注意：** 目前更多使用的是 Mongoose！

### 连接服务

连接不需要登录验证的 MongoDB 服务

```javascript
//导入模块
const MongoClient = require('mongodb').MongoClient;

// 定义 连接url
const url = 'mongodb://localhost:27017';

// 定义数据库
const dbName = 'myproject';

// 连接MongoDB服务器
MongoClient.connect(url, function(err, client) {
  if (err) throw err;

  //选择数据库
  const db = client.db(dbName);

  client.close();
});
```

连接需要登录验证的 MongoDB 服务

```javascript
//导入模块
const MongoClient = require('mongodb').MongoClient;
const util = require('util');

//声明用户名 密码
const user = encodeURIComponent('dave');
const password = encodeURIComponent('abc123');

// 定义 URL
const url = util.format('mongodb://%s:%s@localhost:27017/',
  user, password);

// 连接服务
MongoClient.connect(url, function(err, client) {
  if (err) throw err;

  //选择数据库
  const db = client.db(dbName);

  client.close();
});
```

### 集合操作

创建集合

```javascript
db.createCollection(coolName, { "capped": true, "size": 100000, "max": 5000},
    function(err, results) {
      if (err) throw err;
      //results 是表示集合的对象
      console.log("集合创建成功.");
    }
);
```

删除集合

```Javascript
db.dropCollection(coolName, (err, result) => {
    if (err) throw err;
    console.log('删除成功');
})
```

### 文档操作

添加文档

```javascript
// 添加一条文档
db.collection('collName').insertOne({a:1}, function(err, r) {
    if (err) throw err;
    console.log(r.insertedCount);
});

// 添加多条文档
db.collection('collName').insertMany([{a:2}, {a:3}], function(err, r) {
    if (err) throw err;
    console.log(r.insertedCount);
});
```

> **不温馨地提示：**MongoDB 会自动创建集合。

更新文档

```javascript
const col = db.collection('collName');

// 更新一条文档
col.updateOne({a:3}, {$set: {b: 1}}, {
    upsert: true
}, function(err, r) {
    if (err) throw err;
    console.log(r.matchedCount);
    console.log(r.upsertedCount);
});

// 更新多条文档
col.updateMany({a:2}, {$set: {b: 1}}, function(err, r) {
    if (err) throw err;
    console.log(r.matchedCount);
    console.log(r.modifiedCount);
})
```

删除文档

```javascript
const col = db.collection('collName');

// 删除一条文档
col.deleteOne({a:1}, function(err, r) {
    if (err) throw err;
    console.log(r.deletedCount);
});

// 删除多条文档
col.deleteMany({a:2}, function(err, r) {
    if(err) throw err;
    console.log(r.deletedCount);
});
```

查询文档

```javascript
const col = db.collection('collName');

// 查询满足条件的一条数据
col.findOne({a:100}, function(err, result) { // 返回集合中所有数据
    if (err) throw err;
    console.log(result);
});

// 查询满足条件的所有数据
col.find({}).toArray(function(err, result) { // 返回集合中所有数据
    if (err) throw err;
    console.log(result);
});

// 查询并修改
col.findOneAndUpdate({a:1}, {$set: {b: 1}}, {
    returnOriginal: false
    , sort: [[a,1]]
    , upsert: true
}, function(err, r) {
    if (err) throw err;
    console.log(r.value); //r.value是修改前的文档
})

// 查询并且删除
col.findOneAndDelete({a:2}, function(err, r) {
    if (err) throw err;
    console.log(r.value); //返回被删掉的文档
});

// 排序
col.find().sort().toArray()

// 数量限制
col.find().skip().limit().toArray()
col.find().limit().toArray()
```

## Mongoose

### 介绍

Mongoose 是一个对象文档模型（ODM）库，它对 MongoDB Native Driver 模块进行了进一步的优化封装，并提供了更多的功能。 使用 Node 操作数据库 

官网：http://www.mongoosejs.com

中文网：http://www.mongoosejs.net/

**安装  mongoose：**

```bash
npm install mongoose@6 

```

### 使用流程

```js
// 1. 导入 mongoose 模块
const mongoose = require('mongoose');
// 不想有警告，可以写下面代码
mongoose.set('strictQuery', false);

// 2. 连接 MongoDB 服务如果启动时遇到警告提醒
mongoose.connect('mongodb://127.0.0.1:27017/project04');
认证的方式链接为
mongoose.connect('mongodb://root:sakura@192.168.1.38:27017/hanser?authSource=admin');
// 3. 监听连接成功的事件和连接失败的事件
// 当连接成功事件触发
mongoose.connection.on('open', () => {
    // 4. 创建文档结构 对应users集合
    const usersSchema = new mongoose.Schema({
        name: String,
        age: Number,
        address: String,
        ctime: Date
    });

    // 5. 根据 schema 创建与集合对应的模型
    const usersModel = mongoose.model('users', usersSchema);

    // 6. 使用模型进行数据的 CURD
    // 向集合中添加一个文档
    usersModel.create({
        name: '高小乐',
        age: 101,
        address: '上海',
        ctime: Date()
    }, (err, res) => {
        if (err) {
            console.log('添加文档失败！');
        } else {
            console.log('添加文档成功！添加的数据是：', res);
            // 关闭连接 实际开发不需要
            // mongoose.connection.close();
        }
    });
// 向集合中添加一个文档 批量
    songsModel.create(require('./data.json').song_list, (err, res) => {
        if (err) {
            console.log('添加文档失败！');
        } else {
            console.log('添加文档成功！添加的数据是：', res);
            // 关闭连接 实际开发不需要
            // mongoose.connection.close();
        }
    });
});

// 当连接失败事件触发
mongoose.connection.on('error', err => {
    console.log('数据库连接失败！');
    throw err;
});
```

### mongoose 基本概念

#### ① Schema 文档结构

mongoose 的一切都始于一个 Schema。每个 Schema 映射到 MongoDB 的集合(collection)和定义该集合(collection)中的文档的形式。 Schema 不仅定义了文档和属性的结构，还定义了文档实例方法、静态模型方法、复合索引和文档被称为中间件的生命周期钩子。

```javascript
const SongSchema = new mongoose.Schema({
    language: String,
    image: String,
    duration: Number,
    hot: Number,
    title: String,
    author: String,
});
```

**Schema 的类型：**

| 类型       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| String     | 字符串                                                       |
| Number     | 数字                                                         |
| Boolean    | 布尔值                                                       |
| Array      | 数组，也可以使用 `[]` 来标识                                 |
| Date       | 日期                                                         |
| Buffer     | Buffer 对象                                                  |
| Mixed      | 任意类型，需要使用 `mongoose.Schema.Types.Mixed` 指定        |
| ObjectId   | 对象 ID，需要使用 `mongoose.Schema.Types.ObjectId` 指定      |
| Decimal128 | 高精度数字，需要使用 `mongoose.Schema.Types.Decimal128` 指定 |

#### ② Model 文档模型

使用 Schema 定义，我们需要 Schema 转成可以用的模型。一个 Model 对应一个集合，通过 Model 可以对集合中的文档进行增删改查。

```javascript
var Blog = mongoose.model('Blog', blogSchema); //返回的是模型 是一种有结构的集合
model这个方法的第一个参数是集合的名字，第二个参数是对应的文档结构Schema
```

```js
查询 Model.find()
删除 remove()
更新 update()
```

####  ③ Document

- Document对象是Model的实例，表示集合中的一个文档

### mongoose 增删改查

数据库的基本操作包括四个，增加（create），删除（delete），修改（update），查（read）

#### 增加 Create

插入一条

```js
SongModel.create({
    title:'给我一首歌的时间',
    author: 'Jay'
}, function(err, data){
    //错误
    console.log(err);
    //插入后的数据对象
    console.log(data);
});
```

批量插入

```js
SongModel.insertMany([
    {
        title:'给我一首歌的时间',
        author: 'Jay'
    },
    {
        title:'爱笑的眼睛',
        author: 'JJ Lin',
    },
    {
        title:'缘分一道桥',
        author: 'Leehom Wang'
    }
], function(err, data){
    console.log(err);
    console.log(data);
});
```

#### 删除

删除一条数据

```js
SongModel.deleteOne({_id:'5dd65f32be6401035cb5b1ed'}, function(err, data){
    console.log(err);
    console.log(data);
});
```

批量删除

```js
SongModel.deleteMany({author:'Jay'}, function(err, data){
    console.log(err);
    console.log(data);
});
```

#### 更新

更新一条数据

```js
SongModel.updateOne({author: 'JJ Lin'}, {author: '高小乐'}, function (err, data) {
    console.log(err);
    console.log(data);
});
```

批量更新数据

```js
SongModel.updateMany({author: 'Leehom Wang'}, {author: '高小乐'}, function (err, data) {
    console.log(err);
    console.log(data);
});
```

#### 查询

查询一条数据

```js
SongModel.findOne({author: '高小乐'}, function(err, data){
    console.log(err);
    console.log(data);
});
//根据 id 查询数据
SongModel.findById('5dd662b5381fc316b44ce167',function(err, data){
    console.log(err);
    console.log(data);
});
```

批量查询数据

```js
//不加条件查询
SongModel.find(function(err, data){
    console.log(err);
    console.log(data);
});
//加条件查询
SongModel.find({author: '高小乐'}, function(err, data){
    console.log(err);
    console.log(data);
});
```

字段筛选

```js
SongModel.find().select({_id:0,title:1}).exec(function(err,data){
    console.log(data);
});
```

数据排序

```js
// 1表示升序  -1表示降序
SongModel.find().sort({hot:1}).exec(function(err,data){
    console.log(data);
});
```

数据截取

```js
SongModel.find().skip(10).limit(10).exec(function(err,data){
    console.log(data);
});
```

# 附录

##  MongoDB 配置密码

启动 mongod 带验证选项

```sh
mongod --dbpath d:\data --auth
```

创建用户

```sh
> use admin
> db.createUser({user:"admin",pwd:"password",roles:["root"]})
```

连接 mongod 服务

```
> mongo
> use admin
> db.auth("admin", "password")
```

mongoose 连接操作

```js
mongoose.connect('mongodb://admin:password@localhost/prepare?authSource=admin');
```

## 验证登陆

第一种方式，连接mongoDB服务器后再验证

```
mongo
db.auth(user, pwd)
```

第二种方式， 连接的时候指定用户名密码

```
mongo -u username -p pwd host:port/dbName
```

启动带访问控制的MongoDB服务器

```
mongod --auth --config ...
```

## MongoDB 安全问题

暴露在公网上的MongoDB服务器 https://www.shodan.io/report/h0bgF6zM

## 用户管理

添加管理员

```javascript
use admin; //管理员 只能 添加到 admin 数据库下


db.createUser(
  {
    user: "adminUser",
    pwd: "adminPass",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)
```

添加普通用户

```javascript
use dbName; //所有数据库下 都可以添加普通用户

db.createUser(
  {
    user: "simpleUser",
    pwd: "simplePass",
    roles: [ { role: "readWrite", db: "foo" },
             { role: "read", db: "bar" } ]
  }
)
```

过程类似创建管理员账户，只是 role 有所不同

一点需要注意，如果 admin 库没有任何用户的话，即使在其他数据库中创建了用户，启用身份验证，默认的连接方式依然会有超级权限

### 角色

- read：允许用户读取指定数据库
- readWrite：允许用户读写指定数据库
- dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
- userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
- clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
- readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限
- readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限
- userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
- dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。
- root：只在admin数据库中可用。超级账号，超级权限

### 用户操作

```javascript
//查找指定用户
db.getUser(username)

//查找全部用户
db.getUsers();
show users;


//修改用户
db.updateUser(
   "<username>",
   {
     roles : [
               { role: "<role>", db: "<database>" } | "<role>",
               ...
             ],
     pwd: "<cleartext password>"
    }
)

//修改用户密码
db.changeUserPassword(username, password)

//删除用户
db.dropUser(username);
```

## 关系型和非关系型数据库

### 关系型数据库（RDBS）

**代表：**MySQL、Oracle、DB2、SQL Server...

**特点：**关系紧密，由表组成。

**优点：**

1、易于维护：都是使用表结构，格式一致；

2、使用方便：通用，可用于复杂查询；

3、高级查询：可用于一个表以及多个表之间非常复杂的查询。  

**缺点：**

1、读写性能比较差，尤其是海量数据的高效率读写；

2、有固定的表结构，字段不可随意更改，灵活度稍欠；

3、高并发读写需求，传统关系型数据库来说，硬盘I/O是一个很大的瓶颈。

### 非关系型数据库

（NoSQL   not  only  SQL ）

**代表：**MongoDB、Redis...

**特点：**关系不紧密，有文档或有键值对。

**优点：**

1、格式灵活：存储数据的格式可以是key,value形式。

2、速度快：nosql可以内存作为载体，而关系型数据库只能使用硬盘；

3、易用：nosql数据库部署简单。

**缺点：**

1、不支持事务；

2、复杂查询时语句过于繁琐。

# 记账本项目使用 MongoDB

```js
第一步：
   当数据库连接成功之后，才能启动 http 服务
   在 bin/www 里面：
   	1. 导入模块
    2. 建立连接
    3. 监听连接成功事件  连接失败事件

第二步
	创建 models/account.js 文件
		4. 创建 schema
		5. 创建 model
	并将Model对象作为暴露数据

第三步
	在 rountes/account.js 中
	导入  models/account.js  得到 model 对象
	使用 model 对象进行增删改查
```

