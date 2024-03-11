## URL

### 什么是 URL

统一资源定位符（URL，英语 Uniform Resource Locator 的缩写），它的英文简称叫做 URL。也被称为网页地址，是因特网上标准的资源的地址。它最初是由蒂姆·伯纳斯－李发明用来作为万维网的地址的，现在它已经被万维网联盟编制为因特网标准RFC1738了。

URL 就是表示互联网上一个资源的地址。

> 资源包括网页、图片、音乐、视频、样式文件、脚步文件以及其他各种文件等。

### URL 的格式

```
scheme://host.domain:port/path/filename
```

> - scheme - 定义因特网服务的类型。最常见的类型是 http
> - host - 定义域主机（http 的默认主机是 www）
> - domain - 定义因特网域名，比如 w3school.com.cn
> - port - 定义主机上的端口号（http 的默认端口号是 80）
> - path - 定义服务器上的路径（如果省略，则文档必须位于网站的根目录中）
> - filename - 定义文档/资源的名称

## 相对路径和绝对路径

### HTML 中用到路径的地方

- 使用 img 标签导入图片
- a 标签指定链接到页面地址
- link 标签引入 css 文件或图标文件
- script 标签引入 js 文件

### 绝对路径

#### 本地绝对路径

```
C:\Library\200524\index.html
```

> 后端程序可以用来读取文件

#### 网络绝对路径

```
https://www.baidu.com/img/pc_cc75653cd975aea6d4ba1f59b3697455.png
```

> 前端地址用绝对路径，就使用网络的绝对路径。
>
> 网络绝对路径其实就是URL。

### 相对路径

#### 要引用的文件在同级或者下一级

```
./
直接写
```

#### 要引用的文件在上一级或者更上级

```
../ 上级目录
../../ 上上级目录
../../../ 上上上级目录
```

## meta 元信息

```html
<!-- 字符集编码 -->
<meta charset="UTF-8">
<meta http-equiv="content-type" content="text/html;charset=utf-8">

<!-- 网页关键字 -->
<meta name="keywords" content="8-12个以英文逗号隔开的单词/词语">

<!-- 网页描述信息 -->
<meta name="description" content="80字以内的一段话，与网站内容相关">

<!-- 设置完美视口 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- 设置网页刷新 -->
<!-- <meta http-equiv="refresh" content="3"> -->
<!-- 定时跳转 -->
<meta http-equiv="refresh" content="10,url=http://www.atguigu.com">
<title>Document</title>
```

## Meta 标签属性的使用规则

- content 属性定义与 http-equiv 属性或 name 属性相关的元信息。

- name 属性把 content 属性关联到一个名称。

  > name 属性常见的值：
  >
  > author
  >
  > description
  >
  > keywords
  >
  > generator
  >
  > revised
  >
  > robots
  >
  > others

- http-equiv 把 content 属性关联到 HTTP 头部信息。

  > http-equiv 属性常见的值：
  >
  > content-type expires refresh set-cookie

- charset 属性定义字符集编码。

  > 常见字符集编码：
  >
  > GB2312
  >
  > GBK
  >
  > UTF8

## 案例

```html
编码字符集
<meta charset="utf-8">  HTML5 支持 HTML5向下兼容
<meta http-equiv="content-type" content="text/html;charset=utf-8" /> HTML 4支持

网页关键字：
<meta name="keywords" content="8-12个以英文逗号隔开的单词/词语">

网页描述信息
<meta name="description" content="80字以内的一段话，与网站内容相关">

所有搜索引擎，抓取这个页面、爬行链接、禁止快照：  
<meta name="robots" content="index,follow,noarchive">
  all：文件将被检索，且页面上的链接可以被查询；
  none：文件将不被检索，且页面上的链接不可以被查询；
  index：文件将被检索；
  follow：页面上的链接可以被查询；
  noindex：文件将不被检索，但页面上的链接可以被查询；
  nofollow：文件将被检索，但页面上的链接不可以被查询；
  noarchive：文件将被检索，但禁止保存快照；

网页作者：
<meta name="author" content="obama">

网页网页生成工具 
<meta name="generator" content="Sublime Text3">

定义页面最新版本 
<meta name="revised" content="David, 2008/8/8/" />

网页版权信息：
<meta name="copyright" content="2009-2014©版权所有">

网页刷新信息：(10秒后跳转到百度页面)
<meta http-equiv="refresh" content="10;url=http://www.baidu.com">
```

