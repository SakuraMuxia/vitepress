# Uni内置组件

## view组件

相当于div

```ts
view组件 替代 div标签

<view class="box" hover-class="boxHover" hover-start-time="0" hover-stay-time="0">view布局标签</view>
```

冒泡事件

```ts
hover-stop-propagation 点击子元素的，复元素的样式也发生了改变。通过在子元素上加上这个属性，阻止冒泡
```

## button组件

button组件 替代 button按钮 类似于 element-plus中的button组件

```ts
size 按钮的大小
type 按钮的样式类型
plain 按钮是否镂空，背景色透明
disabled 是否禁用
loading 名称前是否带 loading 图标
form-type 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
open-type 开放能力
```

```ts
size
type: primary(绿色) default白 warn红
open-type
    contact	打开客服
    share	分享

// 使用button组件的 open-type="chooseAvatar" 属性获取用户头像
// 使用button组件的 bindchooseavatar 属性绑定获取用户头像的钩子函数,设置用户头像数据状态
// 使用button组件的 open-type="contact" 属性获取客服
// 使用button组件的 open-type="getPhoneNumber" 属性获取手机号
```

使用案例

```xml
<button type="primary" size="mini" open-type="share">分享内容</button>
```

### 获取用户头像

```xml
<!-- 展示用户头像 -->
    <button class="avatar" open-type="chooseAvatar" bindchooseavatar="chooseAvatar">
        <text class="text">头像:</text>
        <image src="{{headimgurl}}" class="img" />
    </button>
```

```ts
//获取用户头像的回调
    chooseAvatar(event) { // event对象指向当前
        this.setData({
            headimgurl: event.detail.avatarUrl
        })
    },
```



## text组件

类似于span

```ts
text组件 替代 span标签
```

属性

```ts
space	显示连续空格
selectable	 文本是否可选
```



## textarea组件

```ts
textarea 组件的 name="textarea" 属性 用于提交表单时获取属性值
```



## image组件

```ts
image组件 替代 img标签

mode属性: 图片的裁剪和缩放
	scaleToFill 不保持比例缩放图片
    widthFix 	保持比例,宽度不变
	aspectFill  缩放模式，保持纵横比缩放图片
```

```ts
src 图片资源地址
lazy-load 图片懒加载
class 设置组件的样式
mode 有效值，mode 有 14 种模式，其中 5 种是缩放模式，9 种是裁剪模式。
	aspectFit 使图片的长边能完全显示出来。
    aspectFill 只保证图片的短边能完全显示出来，另一个方向将会发生截取。(常用)
	widthFix 宽度不变，高度自动变化，保持原图宽高比不变
    heightFix 高度不变，宽度自动变化，保持原图宽高比不变
```

```xml
<view class="home">
    <view class="title">微信小程序基础语法</view>
    <image src="https://2216847528.oss-cn-beijing.aliyuncs.com/asset/20241118104045.png" mode="aspectFill"/>
    <button type="primary" size="mini">按钮</button>
</view>
```

```less
/* pages/home/home.wxss */
.home{
    width: 100%;
    height: 100%;
    .title{
        width: 750rpx;
        height: 200rpx;
        background-color: aquamarine;
        text-align: center;
        line-height: 200rpx;
    }
}
```



## input组件

```ts
input组件 替代 input标签 类似于 element-plus中的input组件
```

属性

```ts
placeholder 输入框为空时占位符
value 输入框的初始内容
type input的类型
confirm-type 设置键盘右下角按钮的文字，仅在 type="text" 时生效
```

| 属性              | 类型   | 默认值 | 必填 | 说明                    |
| :---------------- | :----- | :----- | :--- | :---------------------- |
| type              | string | text   | 否   | input 的类型            |
| placeholder-style | string |        | 是   | 指定 placeholder 的样式 |





type 属性值

```ts
text	文本输入键盘	
number	数字输入键盘	
idcard	身份证输入键盘	
digit	带小数点的数字键盘	
safe-password	密码安全输入键盘 指引。仅 Webview 支持。	2.18.0
nickname	昵称输入键盘。
```

### input双向绑定

```ts
<!-- 展示微信用户昵称 -->
    <view class="nickname">
        <text class="text">昵称:</text>
        <input type="nickname" placeholder="请你输入昵称" model:value="{{nickname}}"/>
    </view>
```



## icon组件

微信内置图标组件 icon

```ts
<icon type="success" size="16" color="red"></icon>
```

## navigator组件

类似于a标签，除了组件方式，API方式也可以实现页面跳转

```ts
# 路由跳转的组件 声明式导航
```

属性

```ts
url 应用内的跳转链接，值为相对路径或绝对路径注意不能加 .vue 后缀
open-type 跳转方式
	navigate 对应 uni.navigateTo 的功能
    reLaunch 对应 uni.reLaunch 的功能
    switchTab 对应 uni.switchTab 的功能
target 在哪个小程序目标上发生跳转，默认当前小程序，值域self/miniProgram
```

## scroll-view组件

可滚动视图区域。用于区域滚动。

```ts
<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper"
    @scrolltolower="lower" @scroll="scroll">
    <view id="demo1" class="scroll-view-item uni-bg-red">A</view>
    <view id="demo2" class="scroll-view-item uni-bg-green">B</view>
    <view id="demo3" class="scroll-view-item uni-bg-blue">C</view>
</scroll-view>
```

```ts
不换行一行展示

子元素设置inline-block
复元素设置不换行nowrap
```

## checkbox-group组件

checkbox组件的外层包裹标签

```ts
@change change 事件，需要给子元素的check-box设置value值
```

```vue
<checkbox-group @change="itemChange">
    <view class="item" v-for="(item,index) in goods" :key="item.id">
        <checkbox :value="item.id" :checked="item.checked"></checkbox>
        <text class="title">{{item.name}}</text>
        <text class="price">{{item.price}}元</text>
        <text class="del" @click="remove(index)">删除</text>
    </view>
</checkbox-group>
```

## checkbox组件

多选框组

```ts
value	选中时触发checkbox-group的 change 事件，并携带 <checkbox> 的 value。
checked 当前是否选中，可用来设置默认选中
```

## 案例

热搜排行

```vue
<template>
    <view class="title">近期热搜</view>

    <view class="out">
        <view class="list">
            <view class="row" v-for="(item, index) in lists" :key="item.id">
                <view class="text">{{ index + 1 }}. {{ item.title }}</view>
                <view class="close" @click="onClose(index)">
                    <icon type="clear" size="26" />
                </view>
            </view>
        </view>
        <view class="count">共{{ lists.length }}条梗</view>
        <view class="comment">
            <input
                type="text"
                placeholder="请输入热梗..."
                v-model="inputValue"
                @confirm="onSubmit" />
            <button
                size="mini"
                type="primary"
                :disabled="!inputValue.length"
                @click="onSubmit">
                发布
            </button>
        </view>
    </view>
</template>

<script setup>
import { ref } from "vue";
const lists = ref([
    { id: 111, title: "YuukiSakuna" },
    { id: 222, title: "紫咲诗音" },
    { id: 333, title: "遥遥领先" },
    { id: 444, title: "最大值我爱你" },
]);

const inputValue = ref("");

const onClose = function (index) {
    lists.value.splice(index, 1);
};

const onSubmit = function () {
	// 数组中添加
    lists.value.push({ 
		id: Date.now(), 
		title: inputValue.value ,
	});
	// 清空输入框中的内容
    inputValue.value = "";
};
</script>

<style lang="scss" scoped>
.title {
    font-size: 26px;
    text-align: center;
    color: #3c3c3c;
    padding: 30px 0 15px;
}
.out {
    width: 90vw;
    margin: 15px auto;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    padding: 15px;
    box-sizing: border-box;
    .list {
        .row {
            padding: 10px 0;
            border-bottom: 1px solid #e8e8e8;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 18px;
            color: #333;
            .text {
                padding-right: 5px;
                box-sizing: border-box;
            }
        }
    }
    .count {
        padding: 10px 0;
        font-size: 15px;
        color: #888;
        text-align: center;
    }
    .comment {
        display: flex;
        margin-top: 10px;
        input {
            flex: 4;
            background: #f4f4f4;
            margin-right: 5px;
            height: 100%;
            height: 32px;
            border-radius: 4px;
            padding: 0 10px;
            color: #333;
        }
        button {
            flex: 1;
        }
    }
}
</style>

```

pic通过定位，实现居中。

```css
.out{
	padding:0 20px;
	margin-top:40px;
	position: relative;
	input{
		border:1px solid #ccc;
		height: 40px;
		position: relative;
		z-index: 2;
		background: #fff;
		padding:0 10px;
	}
	.pic{
		width: 24px;
		height: 24px;
		z-index: 1;
		position: absolute;
		top:0px;
		left:calc(50% - 12px); // calc计算 50% 然后减去自身的宽度的一半。
		transition: top 0.3s; // 变换向上 0.3s
	}
	.pic.active{
		top:-24px; // active类
	}
}
```

