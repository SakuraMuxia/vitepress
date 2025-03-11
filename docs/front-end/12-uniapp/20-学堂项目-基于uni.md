# uniapp项目

学堂项目

## 配置tabbar

```ts
创建首页页面 index
创建课程页面 course
创建我的页面 my
配置pages.json
	修改页面的标题,增加页面的路由,设置全局样式
	配置tabbar,配置页面,配置图标

配置全局样式：app.vue的style标签中 
/**全局的样式**/
page{
  width: 100%;
  height: 100%;
}
```

src/pages.json

```json
{
	"pages": [
		{
			"path": "pages/index/index",
			"style": {
				"navigationBarTitleText": "首页"
			}
		},
		{
			"path": "pages/course/course",
			"style": {
				"navigationBarTitleText": "课程"
			}
		},
		{
			"path": "pages/my/my",
			"style": {
				"navigationBarTitleText": "个人中心"
			}
		}
	],
	"globalStyle": {
		"navigationBarTextStyle": "black",
		"navigationBarTitleText": "雨落辰潇",
		"navigationBarBackgroundColor": "#3cc",
		"backgroundColor": "#F8F8F8"
	},
	"tabBar": {
		"list": [
			{
				"pagePath": "pages/index/index",
				"text": "首页",
				"iconPath":"/static/images/tabbar/home-off.png",
				"selectedIconPath":"/static/images/tabbar/home-on.png"
			},
			{
				"pagePath": "pages/my/my",
				"text": "个人中心",
				"iconPath":"/static/images/tabbar/home-off.png",
				"selectedIconPath":"/static/images/tabbar/home-on.png"
			},
			{
				"pagePath": "pages/course/course",
				"text": "课程中心",
				"iconPath":"/static/images/tabbar/home-off.png",
				"selectedIconPath":"/static/images/tabbar/home-on.png"
			}
		]
	}
	
}
```

## 配置全局样式

src/App.vue

```vue
<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style>
/**全局的样式**/
page{
  width: 100%;
  height: 100%;
}
</style>
```



## 首页页面

### 静态搭建

```ts
顶部轮播图：使用uni中的 swiper组件

渲染分类数据

使用card组件,并传参,使用插槽,并在插槽处传递一个 item组件,在item组件上传递prop
	list:列表数据
    type:标记区分是 课程 还是 老师
    

```

### mock假数据

```ts
使用mock创建后端假数据
src/mock/index.ts
里边是ts代码,没有通过服务的形式运行,是通过js代码的方式运行的
import { bannerCateList, hotCateList } from "@/mock/index";
```

### easycom规范

```
组件中的 文件夹名字 和 组件名字 一致时,直接使用(符合uniapp easycom规范)
uniapp 规范 组件-easycom规范 文档中有规范
```

### 封装card组件

```ts
热门课程封装为一个组件(组件和页面的区别，组件没有路由，页面有路由)
src/components/
组件中的 文件夹名字 和 组件名字 一致时,直接使用(符合uniapp easycom规范)
uniapp 规范 组件-easycom规范 文档中有规范


搭建v-card组件静态 src/components/v-card/v-card.vue
v-card组件样式配置
	box-sizing:border-box(怪异模型)

v-card设置插槽,把课程内容或老师内容,通过父组件使用插槽显示
```

src/components/v-card/v-card.vue

```vue
<template>
    <view class="card">
        <!-- 卡片顶部的标题 -->
        <view class="header">
            <text class="left">{{ title }}</text>
            <text class="right">{{ subtitle }}</text>
        </view>
        <!-- 插槽展示课程的地方 -->
        <slot name="content"></slot>
    </view>
</template>

<script setup lang='ts'>
// 接收父组件传来的 props
const props = defineProps(['title','subtitle'])
</script>

<style scoped lang="less">
.card{
    width: 100%;
    padding: 20rpx;
    box-sizing: border-box;
}
.card .header{
    display: flex;
    justify-content: space-between;
    background: #3cc;
    color: white;
    border-radius: 10rpx;
    font-size: 30rpx;
    height: 80rpx;
    line-height: 80rpx;
}
</style>
```

### 封装item组件

```ts
搭建v-item组件静态：用于 父组件填充card组件插槽,展示老师和课程内容
样式配置
	white-space:nowrap 不换行 
    overflow:hidden 超出范围隐藏
    text-overflow:ellipsis 超出范围显示...
    font-size: 34rpx设置字体大小
    
通过 defineProps获取父组件传递的 props, 
    list 数据列表
    type 标记是"课程"还是"老师"
如果 type是"课程" 展示课程内容,
如果 type是"老师" 真实老师内容
```

```vue
<template>
    <view class="box">
        <view class="item" v-for="(item, index) in list" :key="item.id"">
            <image class="img" :src="type == 'course' ? item.cover : item.avatar" mode="widthFix" />
            <!-- 课程的结构 -->
            <view v-if="type == 'course'">
                <view class="title">{{ item.title }}</view>
                <view class="study">已有{{ item.viewCount }}学习</view>
                <view class="footer">
                    <view class="price">¥{{ item.price }}</view>
                    <view class="buy">已有{{ item.buyCount }}购买</view>
                </view>
            </view>
            <!-- 老师的结构-->
            <view v-else>
                <view class="info">{{ item.intro }}</view>
                <view class="name">{{ item.name }}</view>
            </view>
        </view>
    </view>
</template>

<script setup lang='ts'>
// 接收父组件传递的 列表数据
const props = defineProps(["list", "type"]);
</script>

<style scoped lang="less">
.box {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.box .item {
    width: 340rpx;
    margin: 20rpx 0rpx;
}

.box .item .img {
    width: 100%;
}

.box .item .title {
    font-weight: 900;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 34rpx;
}

.box .item .study {
    font-size: 24rpx;
    margin: 10rpx 0rpx;
}

.box .item .footer {
    display: flex;
    justify-content: space-between;
    font-size: 24rpx;
}

.box .item .footer .price {
    color: red;
}

.box .item .info {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    font-size: 24rpx;
}

.box .item .name {
    color: #3cc;
    font-size: 36rpx;
    font-weight: 900;
    margin-top: 10rpx;
}
</style>
```

### 封装v-top组件

```vue
<template>
    <image class="btn" src="https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/03de0936a7aafee76646b8b2d5fa5b4f.png"
        mode="scaleToFill" @click="toTop" />
</template>

<script setup lang="ts">

const toTop = () => {
    //点击图片页面滚动到顶部
    uni.pageScrollTo({
        scrollTop: 0,
        duration: 200,
    })
}
</script>

<style scoped>
.btn {
    position: fixed;
    right: 0rpx;
    bottom: 100rpx;
    width: 100rpx;
    height: 100rpx;
}
</style>
```

### 封装网络请求

网络请求二次封装 通过类的方式

#### 加载组件

```ts
显示 loading 提示框, 需主动调用 uni.hideLoading 才能关闭提示框
uni.showLoading({
    title: '加载....'
})
```

#### 网络请求组件

uni-app-API-网络

```ts
发起网络请求
uni.request({
	
})
```

#### 获取token

```ts
uni.getStorageSync('TOKEN');
从本地缓存中同步获取指定 key 对应的内容。
```

utils/service.ts

```ts
class Servive{
    // 原型对象的方法
    API(params:any):any{
        // 定义全局基础路由
        baseUrl:
        // 开启加载效果
        
        // 返回一个promise对象
        return new Promise(()=>{
            // 发送request请求
            uni.request({
                // 地址
                url:baseUrl + params.url,
                // 方法
                method:params.method || 'GET',
                // 请求体
                data:params.data || {},
                // 成功回调
                success(res){
                	// 执行成功的回调
            	},
                // 失败回调
                fail(){
                    // 执行失败的回调
                },
                // 都会执行的回调
                complete(){
                    // 关闭加载效果
                    uni.hideLoading
                }
            })
        })
    }
    // get请求方法
    get(params:any){
        params.method = "GET"
        return this.API(params)
    }
    // post请求方法
    get(params:any){
        params.method = "post"
        return this.API(params)
    }
    // delete 请求方法
    get(params:any){
        params.method = "delete"
        return this.API(params)
    }
}
// 暴漏数据
export default Servive
```

```ts
//ES6类
class Service {
    //原型对象的方法
    API(params: any): any {
        // 定义全局基础路由
        const baseURL = 'https://gmall-prod.atguigu.cn/skb';
        //加载效果开启
        uni.showLoading({
            title: '加载中....'
        })

        //判断用户是否登录:如有token携带
        const token = uni.getStorageSync('TOKEN');
        // 定义请求头
        var header: any = {};
        // 如果token存在,则携带请求头
        if (token) {
            header.token = token;
        }

        // 返回一个promise对象
        return new Promise((resolve, reject) => {
            //uni-app 提供的API进行网络发请求
            uni.request({
                url: baseURL + params.url,// 请求的地址
                method: params.method || 'GET',// 请求方式
                data: params.data || {},// 携带的参数
                header, // 请求头
                success(res) {// 请求成功的回调
                    resolve(res.data); // 返回一个成功的Promise对象,同时简化数据
                },
                fail(error) { // 请求失败的回调
                    reject(error);
                },
                complete() { // 成功失败都执行
                    uni.hideLoading(); // 隐藏加载动画
                }
            })

        })
    }
    // get请求方法
    get(params: any) {
        params.method = "GET";
        return this.API(params);
    }
    // post请求方法
    post(params: any) {
        params.method = "POST";
        return this.API(params);
    }
    // delete 请求方法
    delete(params: any) {
        params.method = "DELETE";
        return this.API(params);
    }
}
// 暴漏数据
export default Service;
```

### 封装获取首页api

```ts
src/api/index.ts
// 引入 Service 
import Service from ''
// 类的继承：Request的实例可以使用Service的方法
class Request extends Service{
    // 获取首页数据
    reqHome(){
        return this.get({
            url:'',
            
        })
    }
}
// 暴漏Request类的实例
export default new Request
```

```ts
// 引入请求需要的类
import Service from "@/utils/service";
// 类的继承
class Request extends Service {
    //获取首页老师和课程的数据
    reqEdu() {
        return this.get({ url: '/api/edu/index' })
    }
    //获取课程接口
    reqCouse(page: number, limit: number) {
        return this.get({ url: `/api/edu/course/${page}/${limit}` })
    }
}
// 暴露Request类的实例
export default new Request;
```

### 获取并渲染首页数据

```ts
引入uniapp的页面生命周期函数
import {onload} from "@dcloudio/uni-app"
import req from "@/api/index"
onLoad(()=>{
    // 获取首页的数据,发送请求获取首页数据
    getHomeData()
})

// 定义一个 获取首页的 函数
const async getHomeData(){
    // 发送请求
    const result = await req.reqHome()
}

// 存储课程数据 存储老师数据
courseList
teachList

// 渲染课程数据

首页页面给v-item组件传参 通过 props传参
v-item组件接收数据，渲染数据

同一个组件,但是渲染的数据结构不一样
	通过设置一个 type="teacher" 标识,然后通过type的标识结合 v-if 展示相应的内容
    通过设置一个 type="course" 标识,然后通过type的标识结合 v-if 展示相应的内容
    相同的结构,但是数据的结构不一样：可以通过 三元表达式 :src="type==='course' ? '':''"
```

```ts
首页触底 显示 回到顶部
封装置顶组件 v-back组件
搭建静态页面
设置静态样式
	设置定位：固定定位，固定定位位置
监听页面滚动的钩子事件

定义响应式数据控制 置顶组件的显示与隐藏 const back = ref(true)
// 父组件控制子组件的显示与隐藏
uni-app-教程-页面
	onLoad(){
        
    }
	onPageScroll(event){
        console.log(event)
        // 如果滚动的距离大于200像素
        if(event.scrollTop>200){
            // 显示
            back.value = true
        }else{
            // 隐藏
            back.value = false
        }
    }

// 子组件回到顶部的事件
uni-app-教程-
    const toTop = ()=>{
        // 调用uni API
        uni.pageScrollTo({
            // 滚动的位置
            scrollTop:0
            // 持续的事件
            duration:1000
        })
    }
    
```

```vue
<template>
	<view class="home">
		<!-- 顶部的轮播 -->
		<swiper class="swiper" indicator-dots autoplay circular>
			<swiper-item v-for="(item, index) in bannerList" :key="index">
				<image class="img" :src="item.src" mode="scaleToFill" />
			</swiper-item>
		</swiper>
		<!-- 学习课程分类 -->
		<view class="study">
			<view class="item" v-for="(item, index) in categoryList" :key="index">
				<image class="img" :src="item.src" mode="scaleToFill" />
				<text class="title">{{ item.name }}</text>
			</view>
		</view>

		<!-- 热门课程组件 -->
		<!-- 传递 title和subtitle -->
		<v-card title="热门课程" subtitle="全部课程>">
			<!-- 使用 具名插槽 -->
			<template #content>
				<v-item :list="courseArr" type="course"></v-item>
			</template>
		</v-card>

		<!-- 展示老师的地方 -->
		<v-card title="名师大咖" subtitle="全部名师>">
			<template #content>
				<v-item :list="teacherArr" type="teacher"></v-item>
			</template>
    	</v-card>

		<!-- 回到顶部 -->
		 <!-- 底部指定的组件 -->
		 <v-top v-show="back"></v-top>
	</view>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { bannerCateList, hotCateList } from "@/mock/index";
//页面生命周期函数
import { onLoad, onPageScroll } from "@dcloudio/uni-app";
import ajax from "@/api/index.ts";


// 首页轮播图
const bannerList = ref(bannerCateList);
const categoryList = ref(hotCateList);
// 存储课程的数据
const courseArr = ref([]);
// 老师的数据
const teacherArr = ref([]);
// 回到顶部组件状态
const back = ref(false);

const getHomeData = async () => {
	//获取首页的数据
	const result = await ajax.reqEdu();
	if (result.code == 200) {
		courseArr.value = result.data.courseList;
		teacherArr.value = result.data.teacherList;
	}
};

onLoad(() => {
	//获取首页的数据(课程与老师的数据)
	getHomeData();
});
//监听页面的滚动
onPageScroll((event) => {
	if (event.scrollTop >= 200) {
		back.value = true;
	} else {
		back.value = false;
	}
})


</script>

<style scoped lang="less">
.home {
	width: 100%;
}

.home .swiper {
	width: 100%;
	height: 300rpx;
}

.home .swiper .img {
	width: 100%;
	height: 100%;
}

.home .study {
	display: flex;
	padding: 20rpx;
}

.home .study .item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.home .study .item .img {
	width: 72rpx;
	height: 72rpx;
}

.home .study .item .title {
	color: hotpink;
}
</style>
```

点击课程跳转到课程详情

```ts
<view class="item" v-for="(item, index) in list" :key="item.id" @click="goCourseDetial(item.id)">
    
//点击课程进入课程详情页
const goCourseDetial = (id: string) => {
    if (props.type == "course") {
        //跳转课程详情页-->携带id
        uni.navigateTo({
            url: `/pages/course/detail/detail?courseId=${id}`,
        })
    }
}
```



## 课程页面

### 静态搭建

```ts
在课程静态页面 src/pages/course/index.vue
导入二次封装的 api接口
import ajax from '@/api/index'
导入 onLoad 生命周期函数
import {onLoad} from '@dcloudio/uni-app'
定义响应式数据
const page = ref()
const limit = ref()
onLoad(){
    
}
定义获取课程函数
const getCourse = async ()=>{
    const res = await ajax.reqCourse(page.value,limit.value)
    console.log(res)
    如果 res.data.items.length === 10 存在下一次
    	
    否则 没有更多了
    把 当前课程列表 拼接上新的课程列表
}
定义响应式状态 下拉状态 
const status = ref("")
渲染 课程列表 数据

监听 页面触底 
onReachbottom(){
    如果 status 的值为more时，发送请求
    如果 status 的值为nomore时，不发送请求
}

当 status的 数据状态为 nomore 时,使用v-if显示 没有更多

显示更多静态搭建 定义一个 view 标签
	设置 宽度，设置高度为2rpx,设置背景颜色为red
	
```

```vue
<template>
	<view class="course">
		<view class="item" v-for="item in courseArr" :key="item.id">
			<view class="left">
				<image class="img" :src="item.cover" mode="widthFix" />
			</view>
			<view class="right">
				<view class="title">
					<uni-icons type="fire" size="16" color="red"></uni-icons>{{ item.title }}
				</view>
				<view class="bottom">
					<view class="price">¥{{ item.price }}</view>
					<view class="buy">已有{{ item.buyCount }}人购买</view>
				</view>
			</view>
		</view>
		<view class="status" v-if="status == 'nomore'">
			<view class="line"></view>
			<view class="text">没有更多</view>
			<view class="line"></view>
		</view>
	</view>
</template>

<script setup lang="ts">
import ajax from "../../api/index"
import { ref } from "vue"
import { onLoad, onReachBottom } from "@dcloudio/uni-app"
//默认页码
const page = ref(1);
//默认一页几条数据
const limit = ref(10);
//存储课程的数据
const courseArr: any = ref([]);
//存储下拉状态
const status = ref("");

//获取课程的方法
const getCourse = async () => {
	const result = await ajax.reqCouse(page.value, limit.value);
	// 先判断触底是否有下一次请求
	if (result.data.items.length == 10) {
		status.value = "more";
	} else {
		status.value = "nomore";
	}

	courseArr.value.push(...result.data.items);
};

//页面加载完毕
onLoad(() => {
	getCourse();
})

// 监听到底函数
onReachBottom(() => {
	if (status.value == "more") {
		page.value++
		getCourse()
	}
})

</script>

<style scoped>
.course {
	background: #ccc;
	width: 100%;
}

.course .item {
	background: white;
	margin: 10rpx 0rpx;
	display: flex;
	padding: 20rpx;
}

.course .item .img {
	width: 220rpx;
}

.course .item .right {
	margin-left: 20rpx;
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.course .item .right .title {
	font-weight: 900;
}

.course .bottom {
	display: flex;
	justify-content: space-between;
}

.course .bottom .price {
	color: red;
}

.status {
	color: red;
	font-weight: 900;
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
}

.status .line {
	width: 200rpx;
	height: 2rpx;
	background: red;
}
</style>

```

### uni组件库

```ts
uniapp 中使用UI组件库
	uniapp官网-组件-推展组件
	在 标题 旁边设置图标
    npm安装uniapp组件库
    配置vue.config.js
	安装sass
    安装sass-loader
	安装uni-ui
	配置easycom
    使用uniapp中的组件
    <uni-icon></uni-icon>
	设置图标的类型和颜色
```

```ts
<view class="title">
    <uni-icons type="fire" size="16" color="red"></uni-icons>{{ item.title }}
</view>
```

### 触底重发请求

```ts
// 监听到底函数
onReachBottom(() => {
	if (status.value == "more") {
		page.value++
		getCourse()
	}
})
```

### 跳转到课程详情

```ts
<view class="item" v-for="item in courseArr" :key="item.id" @click="goCourseDetial(item.id)">
    
//点击课程进入课程详情页
const goCourseDetial = (id: string) => {
	uni.navigateTo({
		url: `/pages/course/detail/detail?courseId=${id}`,
	})
}
```



## 课程详情页面

### 配置路由

```ts
{
    "path": "pages/course/detail/detail",
    "style": {
        "navigationBarTitleText": "课程详情"
    }
}
```



### 静态骨架

```ts

```

### 首页和课程列表跳转

```ts
在 v-item组件上 绑定单击事件 
const goCourseDetail = ()=>{
    if(props.type == 'course'){
        跳转到课程详情页面 带参数 [id]
    }
}
在 课程列表上 绑定单击事件 
const goCourseDetail = (id)=>{
    跳转到课程详情页面 带参数 [id]
}
```

### 封装课程详情和评价接口

```ts
定义 course 存储课程详情对象
定义 获取课程详情 的函数
const getCourse = (courseId) =>{
    发送 获取课程详情 请求
    获取数据，存储数据
}
```



```ts
// 引入请求需要的类
import Service from "@/utils/service";
// 类的继承
class Request extends Service {
    //获取首页老师和课程的数据
    reqEdu() {
        return this.get({ url: '/api/edu/index' })
    }
    //获取课程接口
    reqCouse(page: number, limit: number) {
        return this.get({ url: `/api/edu/course/${page}/${limit}` })
    }
    // 获取某一个课程详情
    reqCourseDetail(id: string) {
        return this.get({ url: `/api/edu/course/${id}` })
    }
    //获取某一个课程的评价
    reqComment(page: number, limit: number, courseId: string) {
        return this.get({ url: `/api/edu/comment/${page}/${limit}?courseId=${courseId}` })
    }
}
// 暴露Request类的实例
export default new Request;
```

### 获取课程详情和评价数据

```ts
定义 courseId 存储课程ID
课程详情页面 在 onLoad(){} 钩子中获取 课程详情id
onLoad(option){
    console.log(option)
    // 存储课程id
    courseId = option.id
    调用 获取课程详情 函数
}
```

```ts
// 获取课程详情函数
const getCourseDetail = async () => {
    const result = await ajax.reqCourseDetail(courseId.value);
    if (result.code == 200) {
        course.value = result.data;
    }
    console.log(course.value)
}
//获取学员的评价
const getComment = async () => {
    const result = await ajax.reqComment(1, 10, courseId.value);
    if (result.code == 200) {
        total.value = result.data.total;
        recommentArr.value = result.data.items;
    }
}
onLoad((options) => {
    //存储用户点击的课程的ID
    courseId.value = options.courseId
    //获取课程详情
    getCourseDetail()
    //获取学员对于某一个课程的评价
    getComment()
})
```

### 渲染数据

```ts

isCollect 控制是否收藏

课程章节字段静态渲染
    使用uniapp-组件中的 uni-collapse 手风琴效果 开启手风琴效果
    通过isbuy 控制 锁图标的显示与隐藏
```

### 回到顶部

```ts
定义 isShowBack 控制置顶按钮显示与隐藏
```

```ts
<!-- 回到顶部 -->
<v-top v-show="isShowBack"></v-top>
//控制课程详情页v-back的显示与隐藏
const isShowBack = ref(false);
//监听课程详情页的滚动
onPageScroll((event) => {
    if (event.scrollTop >= 200) {
        isShowBack.value = true;
    } else {
        isShowBack.value = false;
    }
})
```

### 底部按钮

#### 样式的条件渲染

购买/学习按钮和收藏

```ts
课程详情页面底部的渲染
收藏渲染和去学习渲染 使用三元表达式控制显示与隐藏

通过 && 表达式控制样式的条件渲染
<view :class="['bg', course.isCollect && 'active']"></view>


收藏和取消收藏功能

isCollect 字段控制未收藏和已收藏的功能
在按钮上绑定单击事件 @click="handle"

封装 课程收藏 的接口api 参数 [课程id,token]
封装 课程取消收藏 的接口api 参数 [课程id,token]

const handle = () =>{
    // 拿到课程的状态，如果是真，点击后变为假，发送取消收藏的请求，提示取消收藏
    // 拿到课程的状态，如果是假，点击后变为真，发送收藏的请求，提示收藏
    console.log(course.value.isCollect)
    再次获取课程数据
    把课程收藏取反(仅前端显示)
}
```

#### 封装收藏接口

```ts
//收藏
reqSave(courseId:string){
    return this.post({url:`/api/edu/courseCollect/auth/save/${courseId}`})
}

//取消收藏
reqDeleteSave(id:string){
    return this.delete({url:`/api/edu/courseCollect/auth/remove/${id}`})
}
```

#### 切换收藏状态

```vue
<view class="bottom_tabbar">
    <view class="bottom_wrap">
        <view class="bottom_button">
            <!-- 收藏 -->
            <view class="favo_button" @click="changeCollect">
                <view :class="['bg', course.isCollect && 'active']"></view>
                {{ course.isCollect ? "已收藏" : "未收藏" }}
            </view>
        </view>
        <view class="bottom_main">
            <view class="buy_button" @click="goBuyOrLearn">
                {{ course.isBuy ? "去学习" : "去购买" }}
            </view>
        </view>
    </view>
</view>
```



```ts
// 收藏回调函数
const changeCollect = async() =>{
    // 如果已经收藏
    if (course.value.isCollect) {
        await ajax.reqDeleteSave(courseId.value)
        //提示
        uni.showToast({ title: "取消收藏" });
    }else {
        //添加收藏
        await ajax.reqSave(courseId.value);
        uni.showToast({ title: "收藏成功" });
    }
    //第一种做法:再一次获取课程的数据
    //第二种:把课程的收集的字段取反
    course.value.isCollect = !course.value.isCollect;
}
```

### 跳转到课程评价页面

在 更多评价 的navigate标签上 设置url跳转到对应页面，通过query拼接参数

```vue
<view class="title">
    <view class="title_left"> 学员评价（{{ total }}）</view>
    <navigator
        :url="`/pages/course/comments/index?courseId=${courseId}&teacherId=${course.course?.teacherId}`"
        class="title_right">
        查看全部<uni-icons type="right" color="#666c80" size="12"></uni-icons>
    </navigator>
</view>
```



## 课程评价页面

### 封装评价相关接口

```ts
//获取某一个课程的评价
reqComment(page: number, limit: number, courseId: string) {
    return this.get({ url: `/api/edu/comment/${page}/${limit}?courseId=${courseId}` })
}

//添加评论
reqAddComment(data:any){
      return this.post({url:`/api/edu/comment/auth/save`,data});
}
```

### 新建评价页面和配置路由

```ts
{
    "path": "pages/course/comments/comments",
    "style": {
        "navigationBarTitleText": "学员评价"
    }
}
```



### 展示评价

#### 获取课程id

```ts
onLoad((options) => {
    //课程的ID
    courseId.value = options.courseId;
    //存储老师的ID
    teacherId.value = options.teacherId;
    console.log(courseId.value)
});
```

#### 获取评价数据

```ts
//当前默认页码
const page = ref(1);
//每一页展示学员评价个数
const limit = ref(10);
const teacherId = ref("")
const courseId = ref("")
//收集学员评价的内容
const commentsList = ref([])
//相应数据判断是否有发下一次请求,触底重新发送请求
const status = ref("");
//收集学员评价的内容
const content = ref("");

onLoad((options) => {
    //课程的ID
    courseId.value = options.courseId;
    //存储老师的ID
    teacherId.value = options.teacherId;
    // 获取全部评价
    getCommentsById()
})

//获取学员的评价
const getCommentsById = async () => {
    const result = await ajax.reqComment(page.value, limit.value, courseId.value);
    if (result.data.items.length < 10) {
        status.value = "nomore";
    } else {
        status.value = "more";
    }
    //存储学员评价
    commentsList.value.push(...result.data.items);
};
```

#### 渲染数据

```vue
<template>
    <view class="container comment">
        <!-- 学员的更多的评价 -->
        <view class="comment_wrapper">
            <view class="comment_list">
                <!-- 每一个结构代表的是一个学员评价 -->
                <view class="comment_item" v-for="(item, index) in commentsList" :key="item.id">
                    <view class="logo">
                        <image :src="item.avatar" />
                    </view>
                    <view class="content_wrap">
                        <view class="name">{{ item.nickname }}</view>
                        <veiw class="date">
                            {{ item.gmtCreate }}
                            <uni-rate :touchable="false" :value="3.5" size="12" />
                        </veiw>
                        <view class="content">{{ item.content }}</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 新增评论 -->
        <view class="comment_bar">
            <input class="input_box" placeholder="请点击输入" cursor-spacing="10" v-model="content" />
            <uni-icons class="input_icon" type="paperplane-filled" size="20" @click="addComments" />
        </view>
        <!-- 没有更多 -->
        <view v-if="status == 'nomore'" class="more">----没有更多----</view>
    </view>
</template>
```



### 添加评价

```ts
渲染评价列表
使用 uni-rate 组件 实现评分的功能
```



```ts
// 新增评价
const addComments = async () => {
    // 先判断是否是空内容
    if (content.value.trim() == "") {
        uni.showToast({ title: "评论内容不能为空", icon: "error" });
        return;
    }
    // 发送 添加评价请求
    const result = await ajax.reqAddComment({
        courseId: courseId.value,
        teacherId: teacherId.value,
        content: content.value,
    })
    // 再次获取更新后全部评价
    if (result.code == 200) {
        // 清空评价列表
        commentsList.value = [];
        page.value = 1;
        // 清空评论框内容
        content.value = '';
        getCommentsById();
    }
}
```

### 删除评价

```ts

```

### 触底重新发送请求

```ts
监听触底事件 
onReachBottom(){
	如果状态为更多，则再次发送请求
}
```

```ts
onReachBottom(() => {
    //如果状态为更多在发请求
    if (status.value == "more") {
        page.value++;
        getCommentsById()
    }
})
```

完整代码

```vue
<template>
    <view class="container comment">
        <!-- 学员的更多的评价 -->
        <view class="comment_wrapper">
            <view class="comment_list">
                <!-- 每一个结构代表的是一个学员评价 -->
                <view class="comment_item" v-for="(item, index) in commentsList" :key="item.id">
                    <view class="logo">
                        <image :src="item.avatar" />
                    </view>
                    <view class="content_wrap">
                        <view class="name">{{ item.nickname }}</view>
                        <veiw class="date">
                            {{ item.gmtCreate }}
                            <uni-rate :touchable="false" :value="3.5" size="12" />
                        </veiw>
                        <view class="content">{{ item.content }}</view>
                    </view>
                </view>
            </view>
        </view>
        <!-- 新增评论 -->
        <view class="comment_bar">
            <input class="input_box" placeholder="请点击输入" cursor-spacing="10" v-model="content" />
            <uni-icons class="input_icon" type="paperplane-filled" size="20" @click="addComments" />
        </view>
        <!-- 没有更多 -->
        <view v-if="status == 'nomore'" class="more">----没有更多----</view>
    </view>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { onLoad, onReachBottom } from "@dcloudio/uni-app";
import ajax from "@/api/index";
//当前默认页码
const page = ref(1);
//每一页展示学员评价个数
const limit = ref(10);
const teacherId = ref("")
const courseId = ref("")
//收集学员评价的内容
const commentsList = ref([])
//相应数据判断是否有发下一次请求,触底重新发送请求
const status = ref("");
//收集学员评价的内容
const content = ref("");

onLoad((options) => {
    //课程的ID
    courseId.value = options.courseId;
    //存储老师的ID
    teacherId.value = options.teacherId;
    // 获取全部评价
    getCommentsById()
})

//获取学员的评价
const getCommentsById = async () => {
    const result = await ajax.reqComment(page.value, limit.value, courseId.value);
    if (result.data.items.length < 10) {
        status.value = "nomore";
    } else {
        status.value = "more";
    }
    //存储学员评价
    commentsList.value.push(...result.data.items);
};

// 新增评价
const addComments = async () => {
    // 先判断是否是空内容
    if (content.value.trim() == "") {
        uni.showToast({ title: "评论内容不能为空", icon: "error" });
        return;
    }
    // 发送 添加评价请求
    const result = await ajax.reqAddComment({
        courseId: courseId.value,
        teacherId: teacherId.value,
        content: content.value,
    })
    // 再次获取更新后全部评价
    if (result.code == 200) {
        // 清空评价列表
        commentsList.value = [];
        page.value = 1;
        // 清空评论框内容
        content.value = '';
        getCommentsById();
    }
}
onReachBottom(() => {
    //如果状态为更多在发请求
    if (status.value == "more") {
        page.value++;
        getCommentsById()
    }
})

</script>

<style lang="less" scoped>
.comment_list {
    .comment_item {
        display: flex;
        padding: 15px 0;
        border-bottom: 0.07143rem solid #ececec;

        .logo {
            border-radius: 50%;
            width: 32px;
            height: 32px;
            margin-right: 8px;

            image {
                border-radius: 50%;
                height: 100%;
                width: 100%;
            }
        }

        .content_wrap {
            font-size: 12px;
            color: #000;
            flex: 1;

            .date {
                color: #a1a5b2;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .content {
                margin-top: 8px;
            }
        }
    }
}

.comment {
    background: white;
    padding: 16px 16px 60px 16px;

    .comment_bar {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 999;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(180deg,
                hsla(0, 0%, 86.7%, 0) 0,
                hsla(0, 0%, 86.7%, 0.2) 0.42857rem,
                hsla(0, 0%, 86.7%, 0.2) 0.57143rem,
                #fff 0.64286rem,
                #fff);

        .input_box {
            width: 80%;
            height: 30px;
            line-height: 30px;
            background-color: #f2f3f7;
            border-radius: 20px;
            // text-indent: 10px;
            padding-left: 10px;
            font-size: 16px;
        }

        .input_icon {
            margin-left: 8px;
        }
    }
}

.more {
    text-align: center;
    color: yellowgreen;
}
</style>
```

## 个人中心页面

```ts
个人中心页面静态渲染，样式搭建
在个人中心页面的 onShow(){} 钩子中 判断是否存在 token
token不存在,则跳转到 登录页,token存在则获取用户信息数据，展示个人中心页面

封装 获取用户信息 接口api 参数[token]

定义 获取用户信息 函数
	如果存在token则发送 
    	如果用户信息不存在 userInfo.value.nickname存在再发请求
            获取用户信息数据 请求
            存储用户数据信息 userInfo 
    
在 utils/service.ts 中
	判断本地储存中是否存在token,
        如果有,则在header中添加token
渲染个人中心数据，如果有数据则展示，没有数据则显示默认，通过 &&表达式
```

### 封装获取个人信息接口

```ts
//根据token获取用户信息
reqUserInfo() {
    return this.get({ url: `/api/ucenter/member/auth/getLoginInfo` });
}
```

### 配置路由和新建页面

```vue
<template>
	<view class="container user">
		<view class="info dark-mode">
			<h1 class="info_title">
				<image class="info_title_logo" :src="userInfo.avatar ? userInfo.avatar : '/static/logo.png'" />
				<text class="info_title_name">{{
					userInfo.nickname ? userInfo.nickname : "请登录"
				}}</text>
			</h1>
			<view class="info_list">
				<view class="info_item">
					<navigator class="item_a info-link" url="/pages/order/list/index">
						<uni-icons type="shop-filled" size="24" color="#333"></uni-icons>
						<text class="item_dsc">我的订单</text>
					</navigator>
				</view>
				<view class="info_item">
					<navigator class="item_a info-link" url="/pages/course/collect/index">
						<uni-icons type="vip-filled" size="24" color="#333"></uni-icons>
						<text class="item_dsc">我的收藏</text>
					</navigator>
				</view>
			</view>
		</view>
		<view class="list"></view>
		<view class="logout dark-mode info-link">退出登陆</view>
	</view>
</template>

<script lang="ts" setup>
import ajax from "@/api/index";
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";
//存储用户信息
const userInfo = ref<any>({});

// 获取个人信息
const getUserInfo = async () => {
	// 判断是否存在token
	const token = uni.getStorageSync("TOKEN");
	if (token) {
		// 获取用户信息:头像昵称,前提没有发一次，有了用户信息不需要再发请求获取用户信息
		if (!userInfo.value.nickname) {
			const result = await ajax.reqUserInfo();
			if (result.code == 200) {
				userInfo.value = result.data.item;
			}
		}
	} else { // token不存在
		uni.navigateTo({
			url: "/pages/login/login",
		});
	}
};

// 生命周期 onshow触发
onShow(() => {
	getUserInfo()
})

</script>

<style lang="less" scoped>
.user {
	height: 100vh;
	background: #eee;
}

.info {
	background: #00cc99;

	&_title {
		height: 97px;
		padding: 0 24px;
		display: flex;
		align-items: center;
		border-bottom: 1rpx solid #eee;
		border-top: 1rpx solid #eee;

		&_logo {
			height: 60px;
			width: 60px;
			border-radius: 50%;
			background: #fff;
		}

		&_name {
			margin-left: 10px;
			color: #333;
			font-size: 20px;
			flex: 1;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			word-wrap: normal;
		}
	}

	&_list {
		display: flex;

		.info_item {
			width: 50%;
			text-align: center;

			.item_a {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 24px 0;
			}

			.item_dsc {
				font-size: 14px;
				margin-top: 8px;
			}
		}
	}
}

.logout {
	height: 52px;
	line-height: 52px;
	text-align: center;
	margin-top: 10px;
	background: #00cc99;
}

.popup_height {
	height: 100px;
	width: 100%;
	background: #fff;
}
</style>

```



## 登陆页面

### 封装登陆接口

```ts
// 根据临时凭证code获取token
reqToken(code: string) {
    return this.get({ url: `/api/ucenter/webChat/callback?code=${code}` });
}
```

### 配置登陆路由

```ts

定义响应式数据 复选框勾选状态 
const agree = ref(false)
在 用户协议 复选框处 绑定单击事件

定义 登陆按钮的 回调
const login = ()=>{
    判断是否勾选了 用户协议
    如果没有 勾选
    	使用 uni.showToast() 提示消息
    如果勾选了 用户协议
		使用 uni.login() 获取code
        uni.login({
            success(res){
                // 获取code
                getToken(res.code)
            }
        })
}

封装用户登陆的接口api
reqToken(code){
    return 
}

定义 获取用户身份token
const getToken = async (code) =>{
    发送请求
    如果 响应成功
    把token存储到本地
    返回 上一页
    uni.
}
```

### 新建登陆页面

```vue
<template>
    <view class="container login_container">
        <!-- 登录页面顶部 -->
        <view class="login_content">
            <view class="login_logo"></view>
            <view class="login_main_type">
                <button class="login_main_type_item" @click="login">
                    <text>微信登陆</text>
                </button>
            </view>
        </view>
        <!-- 登录底部:带有协议 -->
        <view class="login_footer">
            <view class="login_protocol">
                <view :class="['login_check_icon', agree && 'checked']" @click="agree = !agree"></view>
                <view class="login_block">
                    我已阅读并同意
                    <navigator class="link">用户协议</navigator>
                    和
                    <navigator class="link">隐私声明</navigator>
                </view>
            </view>
        </view>
    </view>
</template>
```

#### 安装less

```ts
npm install less
```

### 发送请求

```ts
<script setup lang='ts'>
import ajax from "@/api/index";
import { ref } from "vue";
// 控制复选框的勾选状态
const agree = ref(false);


//微信登录按钮的回调 获取code
const login = () => {
    // 微信授权登录先判断是都协议同意了！！
    if (!agree.value) {
        uni.showToast({
            title: "请务必勾选协议", //标题
            icon: "error", //图标
        });
        return;
    }

    //用户同意协议:获取微信登录临时凭证
    uni.login({
        provider: 'weixin', //使用微信登录
        success(res: any) { // 获取code
            //获取token
            getToken(res.code);
        },
    })
}

//获取用户身份凭证token
const getToken = async (code: string) => {
    const result = await ajax.reqToken(code);
    if (result.code == 200) {
        uni.setStorageSync("TOKEN", result.data.token);
        //返回上一页
        uni.navigateBack();
    }
};

</script>
```

## 课程学习页面

### 新建课程学习页面和配置路由

### 封装课程学习相关接口

```ts
//获取视频学习的地址
reqPlayUrl(videoSourceId:string){
    return this.get({url:`/api/vod/video/getPlayURL/${videoSourceId}`})
}
```



### 获取课程学习数据

```ts
import ajax from "@/api/index";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";
const videoSourceId = ref("");
const chapterList = ref([]);
//存储播放视频地址
const playUrl = ref("");
//存储课程的id
const courseId = ref("");

// 获取视频
const getVideo = async () => {
    // 切记:微信小程序、uniapp，播放视频不能用本地资源
    const reuslt = await ajax.reqPlayUrl(videoSourceId.value);
    if (reuslt.code == 200) {
        playUrl.value = reuslt.data.playURL;
    }
}

// 获取课程详情数据
const getCourse = async () => {
    const result = await ajax.reqCourseDetail(courseId.value);
    if (result.code == 200) {
        chapterList.value = result.data.chapterList;
    }
}

onLoad((options) => {
    videoSourceId.value = options.videoSourceId;
    courseId.value = options.courseId;
    //获取第一个视播放地址
    getVideo()
    //获取课程详情
    getCourse()
})
```



### 渲染数据

```vue
<template>
    <view class="container">
        <!-- 学习的视频 -->
        <view>
            <video class="video" :src="playUrl"
                poster="https://www.gulixueyuan.com/files/course/2022/11-15/10000666c9a9690562.jpg" object-fit="fill"
                :controls="true" autoplay page-gesture enable-play-gesture>
            </video>
        </view>
        <!-- 学习某一个课程内容 -->
        <view class="catalogue">
            <view class="title"> 课程目录 </view>
            <view class="catalogue_list">
                <uni-collapse ref="collapse">
                    <uni-collapse-item :title="item.title" v-for="item in chapterList" :key="item.id">
                        <view class="task_list">
                            <view class="task_items" v-for="info in item.children" :key="info.id">
                                <image class="task_type"
                                    src="https://cdn-cos-ke.myoed.com/ke_proj/mobilev2/m-core/f1c59a1527e075f6ebfba3d7ac605f07.png" />
                                <view class="task_title">{{ info.title }}</view>
                            </view>
                        </view>
                    </uni-collapse-item>
                </uni-collapse>
            </view>
        </view>
    </view>
</template>
```

## 订单页面

### 封装新建订单接口

```ts

```

### 配置路由和新建页面

```ts

```

### 发送请求

```ts
uni.requestPayment({
    "provider": "wxpay",
    "orderInfo": {
        "appid": "wx499********7c70e",  // 微信开放平台 - 应用 - AppId，注意和微信小程序、公众号 AppId 可能不一致
        "noncestr": "c5sEwbaNPiXAF3iv", // 随机字符串
        "package": "Sign=WXPay",        // 固定值
        "partnerid": "148*****52",      // 微信支付商户号
        "prepayid": "wx202254********************fbe90000", // 统一下单订单号
        "timestamp": 1597935292,        // 时间戳（单位：秒）
        "sign": "A842B45937F6EFF60DEC7A2EAA52D5A0" // 签名，这里用的 MD5/RSA 签名
    },
    success(res) {},
    fail(e) {}
})
```

### 支付流程

```ts
发请求获取订单号 给自己的后台发送请求获取订单号

发请求获取参数 给自己的后台发送请求获取支付参数

发请求支付 调用uni支付API发起支付
uni.requestPayment({
    provide:'',
    
})

支付成功查询状态

```

```ts
uni.requestPayment({
    provide('weixin')
})

```

```ts
发请求 拿订单号
发请求 参数[订单号] 获取支付参数
调用支付方法
支付成功，查询支付状态
```

