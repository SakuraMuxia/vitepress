# UniappX

## 创建UniappX项目

使用命令行创建

```ts
uni-app x不支持cli创建项目，但HBuilderX创建的项目，可以调用HBuilderX的cli来通过命令行打包
```

使用图形化创建

```ts

```

## Uniapp项目过程

新建api，components，common，interceptors，store，utils等文件夹

```ts

```

配置manifest.json。

```ts

```

安装必要插件

```ts
npm install

npm install qs

npm uninstall pinia
npm cache clean --force
npm install pinia@2.1.7 --legacy-peer-deps
```

封装请求 request

```ts

```

配置拦截器

```ts

```

配置通用 样式表

```ts

```

安装 sass npm包

```ts

```

配置好的模版在 前端练习案例/uniapp/ding 目录下。注意此项目是通过cli方式创建的。

tabbar的配置

```ts
你现在是 原生 tabBar 配置，图片在 App 端不显示，但 H5 可以显示。这个问题在 UniApp 中很常见，通常是因为 图片路径或资源访问方式 在 App 和 H5 端有区别。


"iconPath": "/src/static/icon/index_active.png",
"selectedIconPath": "/src/static/icon/index.png"
前面有 / → 在 H5 下是从根路径 / 访问资源，所以能显示

App 端（真机） → /src/... 不是 App 的资源根路径，导致找不到图片
UniApp App 打包时资源路径和 H5 不同，不能直接用绝对路径 /src/...

(2) 图片资源放置位置
正确位置：放在 static 目录下，例如：

/static/icon/index_active.png
/static/icon/index.png
```

