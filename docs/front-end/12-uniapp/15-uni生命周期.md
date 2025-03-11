# uni生命周期

## uniapp生命周期

uniapp页面生命周期函数与 Vue.js 的生命周期函数有所不同，因为 uni-app 是基于 Vue.js 的跨平台应用框架，因此它具有自己特定的生命周期函数。
可以在这些生命周期函数中编写相应的逻辑代码，以便在不同阶段对页面进行初始化、展示、隐藏和卸载时执行特定的操作。

```ts
在开发uniapp Vue3版本的时候，不能像vue2的选项式API一样，可以直接使用onLoad、onShow等，在组合式API中需要先从“@dcloudio/uni-app”模块中导入才可以。
```

```ts
<script setup>
	import {onLoad,onReady} from "@dcloudio/uni-app"
</script>
```

```ts
onLoad：页面加载时触发，可以在此生命周期函数中进行页面初始化操作。
onShow：页面显示时触发，可以在此生命周期函数中进行页面展示相关的操作。
onReady：页面初次渲染完成时触发，可以在此生命周期函数中进行页面渲染完成后的操作。
onHide：页面隐藏时触发，可以在此生命周期函数中进行页面隐藏相关的操作。
onUnload：页面卸载时触发，可以在此生命周期函数中进行页面卸载相关的操作。
```

## 应用级

在app.js中的App()函数内调用执行，应用级别的钩子函数

```ts
onLaunch	小程序初始化完成时,触发onLaunch(全局只触发一次)
onShow		小程序启动,或从后台进入前台显示触发
onHide		小程序隐藏时,触发
onError		小程序发生错误时,触发
```

### onLaunch

```ts
验证token
```

### onShow

```ts
整个应用的 onShow
```

### onHide

### onError

## 页面级

在index.js中的Page()函数内调用执行，页面级别的钩子函数

```ts
onLoad		生命周期回调—监听页面加载--相当于vue中的setup阶段
onShow		生命周期回调—监听页面显示
onReady		生命周期回调—监听页面初次渲染完成
onHide		生命周期回调—监听页面隐藏
onUnload	生命周期回调—监听页面卸载
```

### onLoad()

页面加载时触发。一个页面只会调用一次，可以在 onLoad 的参数中获取打开当前页面路径中的参数。

可以获取页面中参数

**参数**

| 名称  | 类型   | 说明                     |
| ----- | ------ | ------------------------ |
| query | Object | 打开当前页面路径中的参数 |

使用案例（微信小程序）

/pages/detail/detail.js

```js
Page({
    //详情页面生命周期函数onLoad
    onLoad(options) {
        console.log(options);
    },
    //系统左上角的三个点分享
    onShareAppMessage(params) {
        //params对象:from区分事件源 
        //menu:左上角三个按钮
        //button:自定义按钮
        if (params.from == 'menu') {
            //分享自定义内容
            return {
                title: '我来自系统三个点',
                path: "/pages/detail/detail",
                imageUrl: ''
            }
        }else{
            return {
                title: '自定义按钮分享',
                path: "/pages/detail/detail",
                imageUrl: '' 
            }
        }
    }
})
```

/pages/detail/detail.wxml

```xml
<!--pages/detail/detail.wxml-->
<view>我是详情</view>
<!-- 通过设置属性 open-type 为自定义转发按钮 -->
<button type="primary" size="mini" open-type="share">分享内容</button>
```

/pages/index/index.wxml

```xml
<view class="home">
    <view class="title">首页</view>
    <view>{{name}}</view>
    <image src="https://2216847528.oss-cn-beijing.aliyuncs.com/asset/20241118104045.png" 
        style="transform:rotate({{deg}}deg)"
        class="avatar"
    />
    <view>声明式导航</view>
    <navigator url="/pages/detail/detail">
        <text class="iconfont icon-baomirenyuan" style="font-size: 80rpx;"></text>
    </navigator>
    <view>编程式导航</view>
    <button type="primary" size="mini" bind:tap="goDetail">
        <text class="iconfont icon-baomirenyuan"></text>
    </button>
</view>
```

/pages/index/index.js

```js
//通过Page方法创建页面   App->Page
Page({
    //页面数据
    data: {
        name: '结城sakuna',
        deg:0,
    },
    //编程式导航按钮回调
    goDetail(){
        //编程式导航页面跳转
        //navigateTo:A->B，但是A页面不会销毁(不能跳转到tabbar页面)
        //redirectTo 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
        wx.redirectTo({
          url: '/pages/detail/detail?a=1&b=2',
        })
    },
})
```

### onShow()

监听页面显示,页面隐藏再次显示时执行触发，onload和onready不会重复触发。

```ts
//通过Page方法创建页面   App->Page
Page({
    onShow() {
        //获取用户信息
        // 发请求前,先判断token是否存在
        const token = wx.getStorageSync('TOKEN');
        //用户授权过登录成功,在获取用户信息
        if (token) {
            //获取用户信息
            this.getUserInfo();
        }
    },
    // 获取用户信息
    async getUserInfo() {
        const result = await reqUserInfo();
         if(result.code==200){
             this.setData({
                 nickname:result.data.nickname,
                 headimgurl:result.data.headimgurl
             })
         }
    },
})
```

### onReady()

**类似于onMounted生命周期**

```ts
onReady(()=>{
    // 业务逻辑
})
```

### onHide()

当页面隐藏之后触发，页面离开。onHide和onShow成对触发。

```ts
onHide(()=>{
    // 中断定时器
})

onShow(()=>{
    // 继续定时器
})
```

### onUnload()

页面卸载的生命周期，页面关掉时触发。

```ts

```

### onPageScroll()

监听页面的滚动，滚动条滚动时触发，返回滚动的距离

```ts
onPageScroll(()=>{
    
})
```

### onReachBottom()

可在pages.json里定义具体页面底部的触发距离

比如设为50，那么滚动页面到距离底部50px时，就会触发onReachBottom事件。

如使用scroll-view导致页面没有滚动，则触底事件不会被触发。scroll-view滚动到底部的事件请参考scroll-view的文档

## uniapp执行顺序

**页面生命周期**

onLoad > onShow > onReady

**包含组件的页面**

onLoad > onShow > onBeforeMount > onReady > onMounted

**优先执行应用级别的生命周期**

onLaunch>onShow>onLoad>onShow>onReady

## Vue3生命周期

```ts
setup()是在beforeCreate和created之前运行的，所以可以用setup代替这两个钩子函数。
onBeforeMount() : 已经完成了模板的编译，但是组件还未挂载到DOM上的函数。
onMounted() : 组件挂载到DOM完成后执行的函数。
onBeforeUpdate(): 组件更新之前执行的函数。
onUpdated(): 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该函数。
onBeforeUnmount(): 在组件实例被卸载之前调用。
onUnmounted(): 组件卸载完成后执行的函数
onActivated(): 若组件实例是 缓存树的一部分，当组件被插入到 DOM 中时调用。
onDeactivated(): 若组件实例是 缓存树的一部分，当组件从 DOM 中被移除时调用。
onErrorCaptured(): 在捕获了后代组件传递的错误时调用。
```

```ts
在uniapp组件中，onBeforeUpdate、onUpdated、onActivated、onDeactivated，H5支持，小程序无法使用。
```

![image-20250311101512814](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20250311101512814.png)