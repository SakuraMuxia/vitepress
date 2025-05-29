# uniapp-Push的使用

修改配置项 manifest.json 

```json
在模块配置中勾选push消息推送-> 勾选2.0版本
```

开通unicloud push 功能

```ts
完善应用的各平台信息，配置App的SHA1，MD5，SHA256，把版本更改为正式版

开通uniPush 选择2.0 选择应用 选择平台 配置包名 应用签名 添加云服务空间


```

使用事件监听push事件

```ts
// 获取push消息事件
uni.onPushMessage((res)=>{
    console.log(res)
})
// 获取push客户端id
uni.getPushClientId({
    success:res=>{
        console.log(res)
        console.log(res.cid)
    }
})
```

## 数据推送

标准基座和自定义基座异同

```ts
标准基座：是没有壳没有签名信息，无法使用push
```

通知消息：应用杀死后的通知

透传消息：应用存活时的通知

选择透传消息

```ts
类型：一个是 receive 一个是 client
透传内容是：一个json格式的对象

使用uni-notice-bar通知栏，模拟消息通知
```

把消息放在通知栏展示

```ts
// 推送消息
uni.onPushMessage(object)

// 在本地创建通知栏
uni.createPushMessage(object)
object={
    title:'',
    content:res.data.payload.name,
    payload:res.data.payload,
    success:res=>{
        
    }
}

// 避免触发两次
if(res.type === 'receive'){
    // 接收消息
}else{
    // 进入详情页
    uni.navigageTo({
        url:'' + id
    })
}

// 在详情页监听路由中包含的参数



```

把事件的监听放在App.vue中的onLaunch生命周期内

```ts

```

在真机上测试应用通知

```ts
在手机的通知管理中，打开通知，同时配置通知过滤的规则。
```

创建一个工具类用于提示用户打开通知权限

```ts
export default function(){
    
}
```

## 一体化开发

新建项目 uni-starter 模版云端一体快速开发-客户端，需要关联服务空间

```ts
右键关联服务空间
```

新建uni-admin后台管理系统-服务端

```ts

```

在客户端中配置云端证书和各平台信息

```ts
 
```

在项目中勾选 unipush，配置自定义基座

```ts

```

配置admin管理后台

```ts
创建admin管理员账号
添加应用信息 uniapp客户端应用 标识

```

后台管理系统向客户端推送消息

```ts
uni-push-admin 插件导入到 admin项目中
重启项目把菜单添加上
应用管理中把客户端的信息追加上来
消息推送-选择应用-透传内容
连接云端函数
在uniCloud文件夹中的cloundfunction中右键上传云函数

```

在uniCloud/database/创建uni-push-log.Schema.json

```json
可以点击uni-push-log选择模版

鼠标放在新建的Schema上，鼠标右键上传到DB云，然后把 database中的所有Schema都上传。
```

然后重新发送消息

```ts

```

## 推送消息

根据uid推送消息

```ts
使用客户端注册用户，然后再后台管理系统中找到uid
```

实现客户端发送消息，服务器响应

```ts
客户端在 uniCloud中创建一个云函数
pushDemo，开启公共模块的依赖库，查看uniapp-push2.0业务文档，添加uni-cloud-push模块
```

调试运行本地云对象

```ts
上传并运行云对象
```

## 升级中心

静默更新

```ts

```

统一发布页面

```ts
提供一个下载页面方式
```

```ts
前台版本
uni-upgrade-center - App 使用 0.7.6版本
后台版本
uni-upgrade-center-admin
```



## cli使用uniCloud

如果要在cli项目中使用uniCloud，可以参考以下步骤

```ts
将cli项目导入HBuilderX
如果没有appid的话，需要打开src/manifest.json，在基础配置-->uni-app应用标识处点击重新获取
在项目根目录（src同级）点右键创建uniCloud云开发环境
对uniCloud目录点右键关联服务空间
完成
```

```ts
运行与发行云函数只能使用HBuilderX的菜单，不可使用package.json内的命令
如果HBuilderX菜单运行不能满足需求可以考虑自行初始化服务空间服务空间初始化
虽然uni-app支持vscode等其他ide开发，但因为uniCloud对安全性要求极高，仅支持使用HBuilderX开发
HBuilderX 也支持 cli。
```

## uni-app项目使用uniCloud

如果您有一个现有的 uni-app 项目，并希望将其与 uniCloud 集成，可以按照以下步骤操作：

1. **导入项目至HBuilderX**

打开HBuilderX后，点击菜单栏的 文件 > 导入 > 从本地目录导入（或者Git/SVN）

2. **创建uniCloud云服务空间**

在项目根目录右键，选择`创建uniCloud云服务空间`， 选择具体云厂商后创建。

3. **关联服务空间**

在uniCloud目录右键，选择`关联服务空间或项目...`，选择之前创建的服务空间。如没有服务空间，请在[uniCloud控制台](https://unicloud.dcloud.net.cn/)创建。

4. **初始化数据库和上传云函数**

在uniCloud目录右键，选择`初始化向导`，按照操作提示上传云函数和数据库schema。