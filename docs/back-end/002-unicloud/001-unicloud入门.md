# unicloud

## 初始化

创建项目，关联云服务空间

## 普通云函数

新建一个普通云函数，相当于对应一个网络接口

```ts
'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	//返回数据给客户端
	return event
};
```

调用云函数，传值。

```ts
@/src/pages/index/index.vue

<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			// 调用云函数
			uniCloud.callFunction({
				name:'myCloundFun',
                // 给服务端传参
                data:{
                    name:'sakuna',
                    age:18
                }
			}).then(res => {
				console.log(res)
			})
		},
		methods: {

		}
	}
</script>
```

案例：使用普通云函数得到响应数据

服务端

```ts
'use strict';
exports.main = async (event, context) => {
	let {num} = event
	//event为客户端上传的参数
	let arr = [{"id":"28ee4e3e6050598b0af006d25246ec3f","picurl":"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8c036f36-4afa-43c7-9a76-ffc7e5723056/a95e5617-49b9-4613-aa8c-a8e529a28ba6.jpg","price":"5208/饼","title":"六妙紫印"},
		{"id":"28ee4e3e6050b76c0b014bdb0431265a","picurl":"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8c036f36-4afa-43c7-9a76-ffc7e5723056/eb9ffa17-b85c-4a95-a01a-454b7396bf91.jpg","price":"3120/箱","pronum":"LM-2020018","title":"老树贡眉"},
		{"id":"79550af26050b9d00a6375ad20319360", "picurl":"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8c036f36-4afa-43c7-9a76-ffc7e5723056/7cbba642-5338-4a34-9f67-9e83ad122005.jpg","price":"936/盒","pronum":"LM-201810","title":"贡眉散茶"},
		{"id":"28ee4e3e60507a2f0af735f57087eaa5","picurl":"https://vkceyugu.cdn.bspapp.com/VKCEYUGU-8c036f36-4afa-43c7-9a76-ffc7e5723056/5d094288-2503-48c1-b145-e6270bccc774.jpg","price":"1949/饼","pronum":"LM-201868","title":"改革开放四十周年纪念茶"}]
	arr = arr.slice(0,num)
	//返回数据给客户端
	return arr;
};

```

客户端

```ts
onLoad() {
    // 调用云函数
    uniCloud.callFunction({
        name:'myCloundFun',
        data:{
            num:3
        }
    }).then(res => {
        this.arr = res.result
        console.log(this.arr)
    })
},
```

## 云数据库入门

数据库分类：关系型数据库和非关系型数据库

1. 创建数据表

```ts
user
```

2. 添加记录

```ts
添加记录：
手动创建：输入json格式的 数据
例如
{
    'name':'张三',
    'gender':'男'
}

通过代码：插入和查找
例如：新建一个云函数 cloudForDB
'use strict';
// 连接数据库
const db = uniCloud.database()

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	// 选择数据库中的表
	const userTable = db.collection('users')
	// 获取数据库中的数据
	const res = await userTable.get()
	
	
	//返回数据给客户端
	return res
};
```

```ts
'use strict';
// 连接数据库
const db = uniCloud.database()

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	// 选择数据库中的表
	const userTable = db.collection('users')
	// 获取数据库中的数据
	// const res = await userTable.get()
	// 获取数据库中的条数
	// const res = await userTable.count()
	// 向数据库中添加数据
	// const data = {
	// 	name:'aqua',
	// 	age:'28',
	// 	hobby:'chat',
	// 	gender:'woman'
	// }
	const arr = [{ // 批量添加
		name:'shiyin',
		age:'28',
		hobby:'chat',
		gender:'woman'
	},{
		name:'fubuki',
		age:'28',
		hobby:'chat',
		gender:'woman'
	}]
	const res = await userTable.add(arr)
	//返回数据给客户端
	return res
};
```

案例：前端新增数据

```ts
// 前端
<template>
	<view class="home">
		<form @submit="onsubmit">
			<input type="text" name="name" placeholder="这是一个姓名"/>
			<input type="text" name="age" placeholder="这是一个年龄"/>
			<input type="text" name="gender" placeholder="这是一个性别"/>
			<input type="text" name="hobby" placeholder="这是一个爱好"/>
			<button form-type="submit">提交</button>
		</form>
	</view>
</template>
methods: {
    onCloudAdd(data){
        // 调用云函数
        uniCloud.callFunction({
            name:'cloudForDB',
            data
        }).then(res => {
            console.log('响应数据',res)
        })
    },
    onsubmit(e){
        console.log('提交e',e.detail.value)
        this.formData = e.detail.value
        this.onCloudAdd(e.detail.value)
    }
}

```

```ts
// 后端

'use strict';
// 连接数据库
const db = uniCloud.database()

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	// 解构
	const {name,age,hobby,gender} = event
	// 选择数据库中的表
	const userTable = db.collection('users')
	const data = {
		name,
		age,
		hobby,
		gender
	}
	const res = await userTable.add(data)
	//返回数据给客户端
	return res
};
```

### Collect操作

#### add

新增

```ts
// 后端

'use strict';
// 连接数据库
const db = uniCloud.database()

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	// 解构
	const {name,age,hobby,gender} = event
	// 选择数据库中的表
	const userTable = db.collection('users')
	const data = {
		name,
		age,
		hobby,
		gender
	}
	const res = await userTable.add(data)
	//返回数据给客户端
	return res
};
```

#### get

查询：创建新的云函数 getUserList

```ts
'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	const usersTable = db.collection('users')
	// 通过_id查询数据 doc
	const res = usersTable.doc('123123414').get()
    // 通过个数限制获取搜索的数据 limit
	const res = usersTable.limit(5).get()
    // 分页的效果 skip 跳过之前的多少个
	const res = usersTable.limit(5).skip(1).get()
    // 通过 _id 正序排列 orderBy
	const res = usersTable.limit(5).orderBy("_id","asc").get()
	// 通过 _id 逆序排列 orderBy
	const res = usersTable.limit(5).orderBy("_id","desc").get()
    // 过滤 只返回age字段 其他字段不返回
	const res = usersTable.field({
		"age":true
	}).get()
    // where 查询 类似doc查询
	const res = usersTable.where({
		_id:"68259c371c90b6a2f1f50c77"
	}).get()
    // where 关联查询 查询姓名为 hanser 且 年龄为28
	const res = usersTable.where({
		age:"28",
		name:'hanser'
	}).get()
    // where 结合command指令 查询
	// 定义dbCmd对象
	const dbCmd = db.command
	const res = usersTable.where({
		age:dbCmd.eq(28) // 等于
        age:dbCmd.neq(28) // 不等于
    	age:dbCmd.gt(28) // 大于 number类型的
    	age:dbCmd.gte(28) // 大于等于
    	age:dbCmd.in([18,28]) // 指定年龄在 18 和 28
    	age:dbCmd.nin([18,28]) // 指定年龄不在 18 和 28
    	age:dbCmd.gt(18).and(dbCmd.lt(28)) // 指定年龄在 18 和 28 之间的 且 写法1
    	age:dbCmd.and(dbCmd.gt(10),dbCmd.lt(28)) // 指定年龄在 18 和 28 之间的 且 写法2
    	age:dbCmd.lt(20).or(dbCmd.gt(25)) // 指定年龄在 小于20 或 大于 25 之间的 写法1
    	age:dbCmd.or(dbCmd.lt(20),dbCmd.gt(25)) // 指定年龄在 小于20 或 大于 25 之间的 写法2
	}).get()
    
	//返回数据给客户端
	return res
};
```

正则表达式的查询

```ts
'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database()
	const usersTable = db.collection('users')
	// 通过正则查询,搜索
    let {keyword} = event
    const res = usersTable.where({
        // 使用正则 // i 不区分大小写 g 全局检索 ^ 匹配开头 $ 匹配结束
        name:new RegExp(keyword,"ig")
    })
	
    
	//返回数据给客户端
	return res
};
```

#### Update

修改：服务器接口

```ts
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const usersTable = db.collection("users")
	// 修改指定_id对应的数据 
	const res = await usersTable.doc("68259c371c90b6a2f1f50c77").update({
		name:'lironghao',
		age:39
	})
	//返回数据给客户端
	return {
		msg:"修改成功",
		res:res,
		code:100
	}
};
```

客户端接口

```ts
updataUserList(){
    uniCloud.callFunction({
        name:'updateUserList'
    }).then(res=>{
        console.log('userList',res.result.data)
    })
}
```

使用where 修改

```ts
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const usersTable = db.collection("users")
	// 修改指定_id对应的数据 
	const res = await usersTable.where({
		age:18
	}).update({
		tel:1008611
	})
	//返回数据给客户端
	return {
		msg:"修改成功",
		res:res,
		code:100
	}
};
```

修改数组对象中的内容

```ts
'use strict';
const db = uniCloud.database()
// 定义数据库命令对象
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const usersTable = db.collection("users")
	// 修改指定_id对应的数据 
	const res = await usersTable.where({
		_id:"682be7197ae70877b56610b8"
	}).update({
		name:'ikun',
		like:{
			0:'篮球'
		}
	})
	//返回数据给客户端
	return {
		msg:"修改成功",
		res:res,
		code:100
	}
};
```

修改对象的值

```ts
'use strict';
const db = uniCloud.database()
// 定义数据库命令对象
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const usersTable = db.collection("users")
	// 修改指定_id对应的数据 
	const res = await usersTable.where({
		_id:"682be7197ae70877b56610b8"
	}).update({
		name:'ikun',
		tags:{
			jobs:'歌手',
			
		},
        "tags.jobs":"演员" // 另一种方式
	})
	//返回数据给客户端
	return {
		msg:"修改成功",
		res:res,
		code:100
	}
};
```

修改数组的方法: Command语法

```ts
'use strict';
const db = uniCloud.database()
// 定义数据库命令对象
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const usersTable = db.collection("users")
	// 修改指定_id对应的数据 
	const res = await usersTable.where({
		_id:"682be7197ae70877b56610b8"
	}).update({
		like:dbCmd.unshift(["篮球","演员"]) // 向前追加
        like:dbCmd.push(["偶像"]) // 向后追加
    	like:dbCmd.pop() // 删除末尾
    	like:dbCmd.shift() // 删除前边
    	favour:dbCmd.inc(1) // 原子性，多用户同时写。自增1
    	favour:dbCmd.mul(1) // 原子性，多用户同时写。自乘
        tags:dbCmd.set({
           height:"196cm" // 修改 tags对象的height属性,tags对象的其他字段就会被置空。
        })
    	like:dbCmd.push({
			each:["ccc","bbb"],
			position:0 // 在指定数组下标后追加元素
		})
	})
	//返回数据给客户端
	return {
		msg:"修改成功",
		res:res,
		code:100
	}
};
```

update和set的区别

```ts
set方法: 如果没有设置更新的字段就会被置空
update方法：只更新更新的字段，其他字段不会发生变化
'use strict';
const db = uniCloud.database()
// 定义数据库命令对象
const dbCmd = db.command;
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const usersTable = db.collection("users")
	// 修改指定_id对应的数据 
	const res = await usersTable.doc("682be7197ae70877b56610b8").set({
		name:'ikunIkun'
	})
	//返回数据给客户端
	return {
		msg:"修改成功",
		res:res,
		code:100
	}
};
```

#### remove

```ts
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const userTable = db.collection("users")
	const res = await userTable.doc("682be7197ae70877b56610b8").remove() // 删除id记录
    const res = await userTable.where({
		age:dbCmd.lt(20) // 使用 Cmd 批量删除
	}).remove()
	//返回数据给客户端
	return {
		msg: "修改成功",
		res: res,
		code: 200
	}
};
```

## 案例

新闻列表案例：左图右文

```ts

```

一个固定定位的加号按钮

```css
.goEdit{
    width: 80rpx;
    height: 80rpx;
    background: #1EBBF3;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 50rpx;
    position: fixed; // 固定定位
    right: 30rpx;
    bottom: 100rpx;
    box-shadow: 0 0 20rpx rgba(43,153,57,0.6);
}
```

两行省略号样式

```css
.title {
    font-size: 46rpx;
    color: #333;
    display: -webkit-box; /* 弹性伸缩盒子模型 */
    -webkit-line-clamp: 2; /* 限制显示两行 */
    -webkit-box-orient: vertical; /* 垂直排列子元素 */
    overflow: hidden; /* 隐藏超出部分 */
    text-overflow: ellipsis; /* 超出显示省略号 */
    text-align: justify;
}
```

创建一个新表

```ts
在 unicloud中创建一个新的空表，设置表结构 时间戳 Date.now()
{
    "title":"",
    "author":"",
    "content":"人生小满胜万全，懂得知足便是幸福",
    "creatTime":"1747792305237",
}
```

创建云函数

```ts
查询新闻列表
```

form表单默认submit事件

```ts
<template>
	<view class="add">
		<form @submit="handleSubmit">
			<view class="item">
				<input type="text" name="title" placeholder="请输入标题"></input>
			</view>
			<view class="item">
				<input type="text" name="author" placeholder="请输入作者"></input>
			</view>
			<view class="item">
				<textarea name="content" placeholder="请输入内容"></textarea>
			</view>
			<view class="item">
				<button form-type="reset" style="margin-bottom: 10rpx;">重置</button>
				<button form-type="submit" type="warn">提交</button>
			</view>
		</form>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { onLoad, onReady } from '@dcloudio/uni-app';

const handleSubmit = (e:any) => {
	const detail = e.detail.value
	console.log('提交',detail)
}

</script>
```

获取新闻列表

```ts
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const artTable = db.collection('article')
	const res = await artTable.get()
	//返回数据给客户端
	return {
		code:200,
		data:res,
		msg:'哈哈'
	}
};
```

新增新闻

```ts

const handleSubmit = (e:any) => {
	const detail = e.detail.value
	detail.createTime = Date.now()
	console.log('提交',detail)
	// 调用云函数并传值
	uniCloud.callFunction({
		name:'addNews',
		data:{
			detail
		}
	}).then(res=>{
		// 消息提示
		uni.showToast({
			title: '新闻发布成功'
		})
		// 延迟跳转
		setTimeout(()=>{
			uni.reLaunch({
				url:'/pages/index/index'
			})
		},1500)
	})
}
```

新增新闻后，最新的新闻在最上边，下拉刷新，触底加载更多功能实现。

```ts
methods: {		
    // 获取新闻列表
    handleGetNewsList(){
        uniCloud.callFunction({
            name:'getNewsList',
            data:{
                skip:this.newsList.length
            }
        }).then(res=> {
            const oldList = this.newsList
            const newList = [...oldList,...res.result.data.data]
            this.newsList = newList.map(item=>{
                item.date = this.handleTimeToDate(item.createTime)
                return item;
            })
        })
    },
    // 处理时间
    handleTimeToDate(time){
        return formatTime(time)
    },
},
// 触底加载
onReachBottom(){
    console.log('触底加载')
    this.handleGetNewsList()
},
```

```ts
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const {skip = 0} = event
	const artTable = db.collection('article')
	// 按照时间戳逆序排列，限制每次返回8条
	const res = await artTable.limit(8).skip(skip).orderBy("createTime","desc").get()
	//返回数据给客户端
	return {
		code:200,
		data:res,
		msg:'操作成功'
	}
};
```

使用时间转换标签显示日期

```html
<uni-dateformat :threshold="[60000, 3600000]" format='MM-dd' :date='item.createTime'></uni-dateformat>
```

新建详情页，点击item，通过事件跳转到详情页面

```ts

```

详情页布局，获取详情数据，渲染数据

```ts

```

详情页加载动画，设置详情页的标题

```ts

```

修改新闻

```ts

```

删除新闻

```ts
新建删除新闻的云函数

```

下拉刷新功能

```ts
封装下拉刷新请求
```

上传所有云函数

```ts

```



### JQL语法

### 聚合操作

### 上传操作

云存储

```ts
使用uni-file-picker插件使用
```

```ts
<uni-file-picker 
	v-model="imageValue" 
	fileMediatype="image" 
	mode="grid" 
	:auto-upload="false"
	@select="select" 
	@progress="progress" 
	@success="success" 
	@fail="fail" 
/>
        
methods:{
    // 获取上传状态
    select(e){
        console.log('选择文件：',e)
    },
    // 获取上传进度
    progress(e){
        console.log('上传进度：',e)
    },

    // 上传成功
    success(e){
        console.log('上传成功')
    },

    // 上传失败
    fail(e){
        console.log('上传失败：',e)
    }
}
```

使用手动上传上传图片

```ts
关闭手动上传，使用点击事件上传文件。
处理上传成功回调时执行的逻辑。
@success="success"
在 submit 的回调中上传文件
把上传成功后得到的url地址存储到数据库中。
新建一个图片的表 picurl
把上传成功之后，把响应中的url存储到fileUrl中
```

手写上传方式上传

```ts
unicloud.uploadFile
```

使用Promise.all监听promise异步请求有没有完全成功

```ts

```

