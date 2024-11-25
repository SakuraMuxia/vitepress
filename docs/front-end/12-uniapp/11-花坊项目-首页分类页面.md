# 项目起步

## 搭建项目骨架

### 全局配置文件

app.js 全局应用文件

```js
App({
    onLaunch() {
        
    },

    /**
     * 当小程序启动，或从后台进入前台显示，会触发 onShow
     */
    onShow: function (options) {

    },

    /**
     * 当小程序从前台进入后台，会触发 onHide
     */
    onHide: function () {

    },

    /**
     * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
     */
    onError: function (msg) {

    }
})

```

app.json 应用配置文件

```json
{
    "window":{
        # 配置标题
    	# 设置颜色
        # 设置背景色
    },
    "pages":{
        
    },
    "tabbar":{
        
    }
}
```

```json
{
    "window": {
        "navigationBarBackgroundColor": "#2980B9",
        "navigationBarTextStyle": "white",
        "navigationBarTitleText": "结城sakana"
    },
    "pages": [
        "pages/category/category",
        "pages/shopcart/shopcart",
        "pages/home/home",
        "pages/my/my"
    ]
}
```

app.wxss 全局应用样式

```css
page{
    width:100%;
    height:100%;
}
.flex{
    display:flex
}
.flex_c{
    displat:flex;
    flex# zongxiang排列
}
```

### 新建页面

新建 pages 文件夹，创建 category 页面，shopcart页面，home页面，my页面

### 创建tabbar

在 app.json 中配置tarbar，配置tabbar中的路径，标题，图标，激活图标

```json
{
    "window": {
        "navigationBarBackgroundColor": "#2980B9",
        "navigationBarTextStyle": "white",
        "navigationBarTitleText": "结城sakana"
    },
    "pages": [ // 设置路由
        "pages/category/category",
        "pages/shopcart/shopcart",
        "pages/home/home",
        "pages/my/my"
    ],
    "tabBar": { // 设置tabbar
        "list": [
            {
                "pagePath": "pages/home/home",
                "text": "首页",
                "iconPath": "/static/tabbar/home_active.png",
                "selectedIconPath": "/static/tabbar/home.png"
            },
            {
                "pagePath": "pages/category/category",
                "text": "分类",
                "iconPath": "/static/tabbar/category.png",
                "selectedIconPath": "/static/tabbar/category_active.png"
            },
            {
                "pagePath": "pages/shopcart/shopcart",
                "text": "购物车",
                "iconPath": "/static/tabbar/cart.png",
                "selectedIconPath": "/static/tabbar/cart_active.png"
            },
            {
                "pagePath": "pages/my/my",
                "text": "我的",
                "iconPath": "/static/tabbar/my.png",
                "selectedIconPath": "/static/tabbar/my_active.png"
            }
        ],
        "color": "#bfbfbf",  // 设置tabbar字体颜色
        "selectedColor": "#2c2c2c" // 设置tabbar字体颜色
    }
}
```



### 静态图片文件

把项目中的静态图片复制到项目中

## 首页页面

### 搭建首页的静态

**首页骨架**

/pages/home/home.wxml

```ts
// 首页轮播图
# 设置轮播图的指示器的样式和颜色
# 首页分类的结构
# 通过 &&运算 动态添加active类名,动态设置元素的样式
```

```xml
<!--pages/home/home.wxml-->
<view class="home">
    <!-- 轮播图 -->
    <swiper class="swiper" indicator-dots indicator-color="pink" indicator-active-color="black" autoplay interval="2000" circular>
        <swiper-item >
            <image src="/static/image/banner1.jpg" mode="aspectFill" class="banner" />
        </swiper-item>
        <swiper-item >
            <image src="/static/image/banner1.jpg" mode="aspectFill" class="banner" />
        </swiper-item>
        <swiper-item >
            <image src="/static/image/banner1.jpg" mode="aspectFill" class="banner" />
        </swiper-item>
    </swiper>
    <!-- 分类 -->
    <view class="cate flex">
        <!-- 动态设置伸缩项目的样式 -->
        <view class="cate-item flex_c {{ index > 4 && 'bottom'}}" wx:for="{{10}}" wx:key="{{index}}">
            <image src="/static/category/category1.png" mode="" class="cate-img"/>
            <text class="cate-text">sakuna</text>
        </view>
    </view>
    <!-- 首页logo -->
    <image src="https://img02.hua.com/zhuanti/valentine/2023/23_valentine_mbanner_m.png?a1" mode="widthFix" class="logo"/>
    <!-- 底部猜你喜欢和热门推荐 -->
    <view class="footer" >
        <view class="like">猜你喜欢</view>
        <!-- 页面给组件传递参数:属性-类似于vue的props -->
    </view>
</view>
```

**首页样式**

/pages/home/home.wxss

```ts
// 设置首页轮播图样式

// 首页分类的样式
```

```css
/* pages/home/home.wxss */
.home {
    width: 750rpx;
}
.home .swiper{
    width: 750rpx;
    height: 300rpx; 
 }
 .home .swiper .banner{
    width: 750rpx;
    height: 300rpx;
}
/* 分类 */
.cate{
    flex-wrap: wrap;
    margin-top: 10rpx;
}
.cate .cate-img{
    width: 88rpx;
    height: 88rpx;
}
.cate .cate-item{
    width: 150rpx;
    justify-content: center;
    align-items: center;
    margin: 10rpx 0rpx;
}
.cate .cate-item .cate-text{
    font-size: 30rpx;
    margin: 10rpx 0rpx;
}
.cate .bottom .cate-img{
    width: 40rpx;
    height: 40rpx;
}
.cate .bottom .cate-text{
    font-size: 28rpx;
    margin: 10rpx 0rpx;
}
/* logo */
.home .logo{
    width: 750rpx;
}

```

### 接口在线文档

http://39.98.123.211:8300/doc.html#/home

### 通过API 发送网络请求

```ts
# 通过API 发送网络请求
	wx.request() 参数是一个对象[obj]

# 网络请求:https协议的(默认)勾选不校验合法域名可以发http请求

# 二次封装request
	封装utils工具
    	新建一个utils文件夹,新建一个request.js文件
		定义一个函数
		返回一个promise对象
        发送请求,出现加载效果, wx.showLoading()
            获取到数据时,执行成功的回调success(res){},同时返回一个成功的Promise对象
			获取不到数据时,执行失败的回调fail(error){},同时返回一个失败的Promise对象
			不管成功或失败complete(){}拿到数据隐藏加载效果wx.hideLoading()

# 封装api统一管理接口:防止出现换接口,然后挨个找换
	新建api文件夹,新建index.js文件
	导入request
    封装一个函数用于发送请求并复用 
    
# 获取首页分类数据
	定义一个函数发送请求
	在加载load钩子中调用这个函数发送请求(需要在后台添加网络域名配置)
    
```

/api/index.js

```ts
import request from '../utils/request';
// 获取首页数据
// banner
export const reqBanner = () =>{
    return request({
        url:"/mall-api/index/findBanner"
    })
}
// 获取首页分类的数据
export const reqCategory = () =>{
    return request({
        url:"/mall-api/index/findCategory1"
    })
}
// 猜你喜欢的接口
export const reqLike = () =>{
    return request({
        url:"/mall-api/index/findListGoods"
    })
}
// 热门推荐
export const reqHot = () =>{
    return request({
        url:`/mall-api/index/findRecommendGoods`
    })
}
//获取分类模块的数据
export const reqSort = () => request({
    url: `/mall-api/index/findCategoryTree`
})
```

/utils/request.js

```js
// 网络请求全部的页面使用--功能封装函数(复用)
// params:调用函数传递参数 {url:'xxxx'.method:'post',data:{a:1}}
export default (params) => {
    return new Promise((resolve,reject)=>{
        //请求基础路径
        const baseURL = 'https://gmall-prod.atguigu.cn'
        //发请求之前加载效果出来
        wx.showLoading({
            title: '加载....',
        });
        // 获取token信息
        const token = wx.getStorageSync('TOKEN');
        // 定义请求头
        let header = {};
        // 如果token存在,添加请求头
        if (token) {
            header.token = token;
        }
        // 发请求
        wx.request({
            //请求URL----绝对路径
            url: baseURL + params.url,
            //请求方式
            method: params.method || "GET",
            //携带请求体
            data: params.data || {},
            // 携带请求头
            header,
            //成功回调
            //res即为服务器响应数据
            success(res) {
                //返回一个成功的Promise对象
                //简化数据
                resolve(res.data);
            },
            fail(error) {
                reject(error);
            },
            //成功与失败钩子
            complete() {
                //加载效果取消
                wx.hideLoading()
            }
        })
    })
}
```



### 网络配置

```ts
# 在小程序后台 开发 开发设置中 配置网络合法域名
# 在 小程序开发 软件中的详情 本地配置 勾选不校验合法域名
# 域名不可以使用IP地址
```

### 猜你喜欢部分

```ts
# 配置猜你喜欢静态页面

	# 猜你喜欢的样式,文字居中,字体加粗
	# 把猜你喜欢的内容封装成一个组件card
    	component文件夹内新建组件card
        	组件的静态骨架
            组件的样式
        发请求获取数据
        	封装api方法
            页面给组件传参(同vue的写法,只是不需要 前边加 ":")
```

/pages/home/home.wxml

```xml
<!-- 底部猜你喜欢和热门推荐 -->
    <view class="footer" >
        <view class="like">猜你喜欢</view>
        <!-- 引入组件 -->
        <!-- 页面给组件传递参数:属性-类似于vue的props 不写 ":" -->
        <card list="{{likeArr}}"></card>
        <button class="more">查看更多</button>
        <view class="like">热门推荐</view>
        <card list="{{hotArr}}"></card>
        <button class="more">查看更多</button>
    </view>
```



### 封装card组件

新建 components 文件夹,新建组件文件夹card，新建组件card（不是新建页面）

/components/card/card.wxml

```xml
<!--components/card/card.wxml-->
<view class="card">
    <!-- 卡片组件:item 即为展示商品 -->
    <view class="item" wx:for="{{list}}" wx:key="id">
        <image src="{{item.imageUrl}}" class="image" />
        <view class="title">{{item.name}}</view>
        <view class="subtitle">{{item.packing}}</view>
        <view class="bottom">
            <view class="price">{{item.price}}</view>
            <view class="right">
                <view class="money">{{item.marketPrice}}</view>
                <image src="https://img02.hua.com/m/home/img/home_buy_btn.png" class="cart" />
            </view>
        </view>
    </view>
</view>
```

/components/card/card.wxss

```css
/* components/card/card.wxss */
.card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.card .item {
    width: 360rpx;
    background: white;
    margin: 10rpx 0rpx;
    border-radius: 30rpx;
}
.card .item .title{
    font-weight: 900;
    font-size: 26rpx;
}
.card .item .image {
    width: 360rpx;
    height: 360rpx;
    border-radius: 40rpx;
}
.card .item .subtitle{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    font-size: 24rpx;
    margin: 10rpx 0rpx;
    height: 60rpx;
}
.card .item .bottom{
    display: flex;
    justify-content: space-around;
}
.card .item .bottom .right{
    display: flex;
    justify-content: space-between;
}
.card .item .cart {
    width: 48rpx;
    height: 48rpx;
    margin-left: 20rpx;
}
.card .item .bottom .right .money{
    color: #ccc;
    text-decoration: line-through;
}
```

/components/card/card.js

```js
// components/card/card.js
Component({

    /**
     * 组件的属性列表
     */
    //类似于 vue中的 props，接收props
    properties: {
        list:{
            type:Array
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
```

/components/card/card.json

```json
{
    "component": true,
    "usingComponents": {}
}
```



### 引入组件

在页面上引用组件,并使用组件

在页面 中添加组件并注册

/pages/home/home.json 

```ts
{
    "usingComponents": {
        "card":"/components/card/card"
    }
}
```

在页面中使用组件

/pages/home.wxml

```xml
<!--pages/home/home.wxml-->
<view class="home">
    <!-- 轮播图 -->
    <swiper class="swiper" indicator-dots indicator-color="pink" indicator-active-color="black" autoplay interval="2000" circular>
        <swiper-item wx:for="{{bannerArr}}" wx:key="id">
            <image src="{{item.imageUrl}}" mode="aspectFill" class="banner" />
        </swiper-item>
    </swiper>
    <!-- 分类 -->
    <view class="cate flex">
        <!-- 动态设置伸缩项目的样式 -->
        <view class="cate-item flex_c {{ index > 4 && 'bottom'}}" wx:for="{{categoryArr}}" wx:key="id">
            <image src="{{item.imageUrl}}" mode="" class="cate-img"/>
            <text class="cate-text">{{item.name}}</text>
        </view>
    </view>
    <!-- 首页logo -->
    <image src="https://img02.hua.com/zhuanti/valentine/2023/23_valentine_mbanner_m.png?a1" mode="widthFix" class="logo"/>
    <!-- 底部猜你喜欢和热门推荐 -->
    <view class="footer" >
        <view class="like">猜你喜欢</view>
        <!-- 引入组件 -->
        <!-- 页面给组件传递参数:属性-类似于vue的props 不写 ":" -->
        <card list="{{likeArr}}"></card>
        <button class="more">查看更多</button>
        <view class="like">热门推荐</view>
        <card list="{{hotArr}}"></card>
        <button class="more">查看更多</button>
    </view>
</view>
```



### 页面给组件传参

父组件：/pages/home/home.ts

```xml
<!--pages/home/home.wxml-->
<view class="home">
    <!-- 轮播图 -->
    <swiper class="swiper" indicator-dots indicator-color="pink" indicator-active-color="black" autoplay interval="2000" circular>
        <swiper-item wx:for="{{bannerArr}}" wx:key="id">
            <image src="{{item.imageUrl}}" mode="aspectFill" class="banner" />
        </swiper-item>
    </swiper>
    <!-- 分类 -->
    <view class="cate flex">
        <!-- 动态设置伸缩项目的样式 -->
        <view class="cate-item flex_c {{ index > 4 && 'bottom'}}" wx:for="{{categoryArr}}" wx:key="id">
            <image src="{{item.imageUrl}}" mode="" class="cate-img"/>
            <text class="cate-text">{{item.name}}</text>
        </view>
    </view>
    <!-- 首页logo -->
    <image src="https://img02.hua.com/zhuanti/valentine/2023/23_valentine_mbanner_m.png?a1" mode="widthFix" class="logo"/>
    <!-- 底部猜你喜欢和热门推荐 -->
    <view class="footer" >
        <view class="like">猜你喜欢</view>
        <!-- 引入组件 -->
        <!-- 页面给组件传递参数:属性-类似于vue的props 不写 ":" -->
        <card list="{{likeArr}}"></card>
        <button class="more">查看更多</button>
        <view class="like">热门推荐</view>
        <card list="{{hotArr}}"></card>
        <button class="more">查看更多</button>
    </view>
</view>
```

### 子组件接收参数

子组件：/components/card/card.js

```ts
// components/card/card.js
Component({

    /**
     * 组件的属性列表
     */
    //类似于 vue中的 props，接收props
    properties: {
        list:{
            type:Array
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
```

子组件：/components/card/card.json

```json
{
    "component": true,
    "usingComponents": {}
}
```

/components/card/card.wxml

```xml
<!--components/card/card.wxml-->
<view class="card">
    <!-- 卡片组件:item 即为展示商品 -->
    <view class="item" wx:for="{{list}}" wx:key="id">
        <image src="{{item.imageUrl}}" class="image" />
        <view class="title">{{item.name}}</view>
        <view class="subtitle">{{item.packing}}</view>
        <view class="bottom">
            <view class="price">{{item.price}}</view>
            <view class="right">
                <view class="money">{{item.marketPrice}}</view>
                <image src="https://img02.hua.com/m/home/img/home_buy_btn.png" class="cart" />
            </view>
        </view>
    </view>
</view>
```

/components/card/card.wxss

```css

```

### 热门推荐部分

```ts
<!--pages/home/home.wxml-->
<view class="home">
    <!-- 轮播图 -->
    <swiper class="swiper" indicator-dots indicator-color="pink" indicator-active-color="black" autoplay interval="2000" circular>
        <swiper-item wx:for="{{bannerArr}}" wx:key="id">
            <image src="{{item.imageUrl}}" mode="aspectFill" class="banner" />
        </swiper-item>
    </swiper>
    <!-- 分类 -->
    <view class="cate flex">
        <!-- 动态设置伸缩项目的样式 -->
        <view class="cate-item flex_c {{ index > 4 && 'bottom'}}" wx:for="{{categoryArr}}" wx:key="id">
            <image src="{{item.imageUrl}}" mode="" class="cate-img"/>
            <text class="cate-text">{{item.name}}</text>
        </view>
    </view>
    <!-- 首页logo -->
    <image src="https://img02.hua.com/zhuanti/valentine/2023/23_valentine_mbanner_m.png?a1" mode="widthFix" class="logo"/>
    <!-- 底部猜你喜欢和热门推荐 -->
    <view class="footer" >
        <view class="like">猜你喜欢</view>
        <!-- 引入组件 -->
        <!-- 页面给组件传递参数:属性-类似于vue的props 不写 ":" -->
        <card list="{{likeArr}}"></card>
        <button class="more">查看更多</button>
        <view class="like">热门推荐</view>
        <card list="{{hotArr}}"></card>
        <button class="more">查看更多</button>
    </view>
</view>
```

## 分类页面

### 搭建分类的静态

分类的静态骨架

```ts
# 左右两个view
```

分类的样式

```ts
# 左右flex布局
# 设置左右两侧的宽度
	左侧的样式：
    	设置宽度和高度
        	使用scroll组件,设置scroll组件的高度
			设置样式
    右侧的样式：
    	设置宽度和高度
        	搭建右侧的样式
```

/pages/category/category.js

```js
// pages/category/category.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0, //控制左侧菜单高亮
        sortArr: [], //存储分类的数据
    },

    //左侧菜单点击事件回调
    changeActive(event) {
        //修改active数据
        this.setData({
            active: event.currentTarget.dataset.index
        })
    },
})
```

/pages/category/category.json

```json
{
  "usingComponents": {}
}
```

/pages/category/category.wxml

```xml
<!--pages/category/category.wxml-->
<view class="category flex">
    <view class="left">
        <!-- 滚动视图 -->
        <scroll-view class="scroll" scroll-y enhanced show-scrollbar="{{false}}">
            <view data-index="{{index}}" bind:tap="changeActive" class="item {{index===active&&'active'}}" wx:for="{{50}}" wx:key="{{index}}">
                <text class="select" wx:if="{{index==active}}">|</text>
                <image wx:if="{{index < 2}}" class="img" src="/static/category/hot.png" mode=""/>
                <text>生命周期</text>
            </view>
        </scroll-view>
        
    </view>
    <view class="right">
       <view class="title">香气护体</view>
       <view class="box">
         <view class="item" wx:for="{{11}}">
           <image class="img" src="https://2216847528.oss-cn-beijing.aliyuncs.com/asset/20241118104045.png"/>
           <text class="title">123</text>
         </view>
       </view>
    </view>
</view>
```

/pages/category/category.wxss

```css

```

### x轴滚动案例

x轴滚动: /pages/category/category.wxml

```xml
<!--pages/shopcart/shopcart.wxml-->
<view class="shopcart">
    <!-- 分类横向排列 -->
    <!-- enable-flex 开启flex布局 -->
    <!-- scroll-x x轴排列 -->
    <!-- scroll-into-view 滚动到对应项目 -->
    <!-- scroll-with-animation 滚动动画 -->
    <scroll-view class="scroll" enable-flex scroll-x scroll-into-view="a{{activeNum}}" scroll-with-animation>
        <view class="item {{ index == activeNum && 'active'}}" 
            bind:tap="changeActive"
            id="a{{index}}"
            data-index="{{index}}"
            wx:for="{{50}}" wx:key="{{index}}">阿夸
        </view>
    </scroll-view>
</view>
```

/pages/category/category.js

```js
// pages/shopcart/shopcart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeNum:null,
    },
    // 改变激活状态
    changeActive(event){
        this.setData({
            activeNum: event.currentTarget.dataset.index
        })
    },
})
```

/pages/category/category.wxss

```css
/* pages/shopcart/shopcart.wxss */
.shopcart{
    width: 750rpx;
    height: 100%;
}
.shopcart .scroll{
    display: flex;
    height: 80rpx;
    background-color: antiquewhite;
}
.shopcart .scroll .item{
    width: 80rpx;
    /* 伸缩项目不等比缩小 */
    flex-shrink:0;
    line-height: 80rpx;
    text-align: center;
}
.shopcart .scroll .active{
    background-color: white;
    font-weight: 700;
}
```

### 获取数据渲染数据

```ts
封装获取分类数据api接口

获取数据,存储数据状态,渲染数据
```

api/index.js

```js
//获取分类模块的数据
export const reqSort = () => request({
    url: `/mall-api/index/findCategoryTree`
})
```

/pages/category/category.js

```js
import { reqSort } from "../../api/index"

// pages/category/category.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        active: 0, //控制左侧菜单高亮
        sortArr: [], //存储分类的数据
    },

    //左侧菜单点击事件回调
    changeActive(event) {
        //修改active数据
        this.setData({
            active: event.currentTarget.dataset.index
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //获取分类的功能函数
        this.getData();
    },
    
    // 获取分类项目的数据
    async getData(){
        const res = await reqSort();
        if(res.code === 200){
            this.setData({
                sortArr:res.data
            })
        }
    },
})
```

/pages/category/category.wxml

```xml
<!--pages/category/category.wxml-->
<view class="category flex">
    <view class="left">
        <!-- 滚动视图 -->
        <scroll-view class="scroll" scroll-y enhanced show-scrollbar="{{false}}">
            <view data-index="{{index}}" 
                bind:tap="changeActive" 
                class="item {{index===active&&'active'}}" 
                wx:for="{{sortArr}}" 
                wx:key="id">
                <text class="select" wx:if="{{index==active}}">|</text>
                <image wx:if="{{index < 2}}" class="img" src="/static/category/hot.png" mode=""/>
                <text>{{item.name}}</text>
            </view>
        </scroll-view>
    </view>

    <view class="right">
       <view class="title">{{sortArr[active].name}}</view>
       <view class="box">
         <view class="item" wx:for="{{sortArr[active].children}}" 
            wx:key="id"
            data-category2id="{{item.id}}" >
           <image class="img" 
           src="{{item.imageUrl}}"/>
           <text class="title">{{item.name}}</text>
         </view>
       </view>
    </view>
</view>
```

