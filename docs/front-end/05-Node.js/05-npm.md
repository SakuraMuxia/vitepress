# NPM

## NPM 的作用

类似于appstore

通过 NPM 可以对 Node 的工具包进行搜索、下载、安装、删除、上传。借助别人写好的包，可以让我们的开发更加方便。

常见的使用场景有以下 3 种：

- 允许用户从NPM服务器下载别人编写的第三方包到本地使用。
- 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用。 
- 允许用户将自己编写的包上传到NPM服务器供别人使用。

## NPM的安装

在安装node的时候就同时安装了npm

```js
# 查看node版本
node -v
```



## NPM 操作

```bash
# 查看版本
npm -v

# --------------------------------------------
# 初始化
npm init
# 快速初始化
npm init -y    
npm init --yes 

# --------------------------------------------
# 安装包
npm install 包名     # 默认添加到产品依赖  项目本身会用到的依赖
npm i 包名
npm install 包名 -D  # 添加到开发依赖  只有开发工程中会用到，项目本身用不到
npm i 包名 -D


# --------------------------------------------
# 全局安装  主要安装命令行工具
npm install 包名 -g
npm install 包名 --global

# --------------------------------------------
# 安装指定的版本
npm install 包名@版本号
npm install 包名@版本号 -g

# --------------------------------------------
# 删除包
npm remove 包名
npm remove 包名 -g

# --------------------------------------------
# 更新包
npm update 包名
npm update 包名 -g
# 查看哪些包可以更新
npm outdated
npm outdated -g

# --------------------------------------------
# 安装依赖
npm install   # 根据package.json 安装所需依赖
npm i

# --------------------------------------------
# 清除缓存
npm cache clean --force        # force 表示强制清除


# 查看已安装的npm
npm list --global --depth=1
npm list -g cnpm 查看当前(本地)安装包列表 
npm list --dept 0 查看安装包信息


```

## package.json

```json
{
  "name": "01-project",		// 包名
  "version": "1.0.0",		// 版本
  "description": "",		// 描述信息
  "main": "index.js",	    // 入口文件
  "scripts": {				// 可执行的名
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",				// 作者信息
  "license": "ISC",			// 开源许可
  "dependencies": {			// 依赖信息
     "bootstrap": "^5.1.3",
     "jquery": "^3.6.0"
  }，
  "devDependencies": {		// 开发中的依赖
     "babel": "^6.23.0"
  }
}
```

**版本号信息：**

- "^3.0.0" ：锁定大版本，以后安装包的时候，保证包是3.x.x版本，x默认取最新的。
- "~3.1.x" ：锁定小版本，以后安装包的时候，保证包是3.1.x版本，x默认取最新的。
- "3.1.1" ：锁定完整版本，以后安装包的时候，保证包必须是3.1.1版本。

**package-lock.json 文件**

该文件记录包具体的版本信息，用于锁定版本。

**配置命令别名：**

配置 package.json 中的 `scripts` 属性：

```json
{
    "scripts": {
        "server": "node server.js",
        "start": "node index.js",
    },
}
```

配置完成之后，可以使用别名执行命令：`npm run server` 和 `npm run start`

## 模块的查找过程

```js
require('模块名')
```

```js
1. 先确定模块名路径是不是以 ./ 或者 ../ 开头，如果不是就认为是内置模块或者第三方模块
2. 再确定有没有该内置模块，如果有该内置模块直接加载；如果没有该内置模块，判定为第三方模块
3. 第三方模块加载过程：
   ① 先从脚本本就所在的目录中查找有没有 node_modules 目录，如果有进入查找模块
   ② 如果脚本同级目录没有 node_modules 目录，去上级目录查找 node_modules 目录，如果有进入查找模块
   ③ 以此类推，一直查找到 根目录（全局的目录，node的环境变量位置）
```

## npm设置代理

```js
# npm源镜像源
npm config set registry https://registry.npmjs.org
// 查看镜像地址
npm config get registry
// 查看配置文件
npm config list

// 使用以下命令行：
npm config set proxy http://proxy-server-address:port
npm config set https-proxy http://proxy-server-address:port

其中 proxy-server-address 和 port 分别是您所要使用的代理服务器地址和端口号。如果您需要在使用SSL连接时也使用代理，那么还需要设置 https-proxy。

如果您想要查看当前npm配置中的代理设置，可以使用以下命令行：
npm config list


-----------------
npm删除代理
npm config delete proxy

npm删除镜像源
npm config delete registry

```



## 全局安装

安全的位置在node的环境变量中，在任何位置都可以使用的命令。

### nodemon

nodemon:命令行工具：如果js发生了改变，他会自动运行一遍。

## 环境变量

如果希望某个程序在任何工作目录下都能正常运行，就应该将该程序的所在目录配置到环境 变量 Path 中

windows 下查找命令的所在位置：

```js
cmd:

where 命令名
powershell：

get-command 命令名
```

修改执行策略

```js
第一步：以管理员身份打开 powershell 命令行
第二步：键入命令 set-ExecutionPolicy remoteSigned
第三步：键入 A 然后敲回车

第四步：如果不生效，如果用的是 vscode 中的终端工具吗，可以重启 vscode
```

### npm包

```js
npm i chalk@4.1.0	// 输出显示工具 5.0之前支持commentJS,最新版本只支持ES6版本
npm i lodash	// JS库
npm i uniq	// 数组去重
npm i nodemon -g // 命令行工具，自动刷新js代码
npm i table //命令行输入输出 加格式
```



### git npm

```js
前提：
	仓库中将 node_modules 忽略，只同步 package.json

上班第一天：
	1. 从远程仓库克隆到本地
	2. 进入项目目录，运行 npm install 安装依赖
	3. 进行后续开发
	4. 下班之前推送
	
以后上班每一天：	
	1. 从远程仓库拉取
	2. 进入项目目录，运行 npm install 安装依赖 （同事可能会安装了新的依赖）
	3. 进行后续开发
	4. 下班之前推送
```

### 配置命令别名

配置 package.json 中的 `scripts` 属性：

```json
{
    "scripts": {
        "server": "node server.js",
        "start": "node index.js",
    },
}
```

配置完成之后，可以使用别名执行命令：

```bash
npm run server
npm run start
```

不过 `start` 别名比较特别，使用时可以省略 `run`

```bash
npm start
```

> 补充说明：
>
> - `npm start` 是项目中常用的一个命令，一般用来启动项目
> - `npm run` 有自动向上级目录查找的特性，跟 `require` 函数也一样
> - 对于陌生的项目，我们可以通过查看 `scripts` 属性来参考项目的一些操作



## cnpm

使用国内的镜像作为 npm 源

方式一：全局安装 cnpm 命令，安装完成后使用 `cnpm ` 命令代替 `npm` 命令。

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

方式二：通过添加 `npm` 参数 `alias` 一个新命令，安装完成后使用 `cnpm ` 命令代替 `npm` 命令。

```bash
alias cnpm="npm --registry=https://registry.npm.taobao.org \
--cache=HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/dist \
--userconfig=HOME/.cnpmrc"
```

方式三：把官方镜像地址修改为淘宝镜像地址，修改后继续使用 `npm 命令`。

```bash
# 设置为淘宝镜像
npm config set registry https://registry.npm.taobao.org

# 如果想改回官方镜像   
npm config set registry https://registry.npmjs.org/
```

> 修改了镜像地址之后，直接用 `npm` 命令就可以了。

## yarn

yarn 命令是 facebook 退出的可以代替 npm 的命令行工具

```shell
只需要一行命令即可安装 yarn

npm install yarn -g
```

yarn 相比于 npm 有几个特点：

- 本地缓存。安装过的包下次不会进行远程安装
- 并行下载。一次下载多个包，而 npm 是串行下载
- 精准的版本控制。保证每次安装跟上次都是一样的

```js
yarn --version

yarn init  # 初始化包 生成 package.json   

yarn add 包名 # 安装包

yarn add 包名 --dev    # 相当于 npm 中的--save-dev

yarn global add  包铭 #全局安装  全局安装路径 C:\Users\你的用户名\AppData\Local\Yarn\bin

yarn remove 包名 # 移除包

yarn # 安装 package.json中的所有依赖 

yarn config set registry https://registry.npm.taobao.org  # yarn 修改镜像地址
```

**注意：** 这里有个小问题就是 全局安装的包不可用，需要自行配置环境变量，yarn 全局安装包的位置可以通过 `yarn global bin`来查看。

##  cyarn

跟 npm 与 cnpm 的关系一样，可以为 yarn 设置国内的淘宝镜像，提升安装的速度

```sh
npm install cyarn -g --registry "https://registry.npm.taobao.org"
```

配置后，只需将 yarn 改为 cyarn 使用即可

yarn 也可以使用淘宝镜像

```bash
npm install cyarn -g --registry "https://registry.npm.taobao.org"
```

## npx

npx可以执行本应该安装在全局，却安装在了项目本地的命令行工具

`npx` 是 `npm 5.2+` 版本中自带的一个命令行工具，用于执行依赖包中的可执行文件。它的作用是在不安装全局包的情况下，使用依赖包中的命令行工具。

举个例子，如果你想要使用 `create-react-app` 创建一个新的 React 应用程序，你可以使用以下命令：

```bash
npx create-react-app my-app
npx npmmon [脚本]
```



## 发布 npm 包

### 发布步骤

**第一步 本地开发好包内容**

1. `npm init` 进行初始化
2. 开发包的内容， `module.exports` 暴露数据

**第二步 注册账号并在命令行登录**

1.  npmjs.org 官网注册账号
2.  命令行登录账户  `npm login`

> 如果修改过官方的镜像地址，得改回来  `npm config set registry https://registry.npmjs.org/`

**第三步 发布**

1. 发布 `npm publish`

2. 如果要更新，先修改 package.json 中的版本号，再发布

### 发布全局命令

第一步 创建命令行执行的脚步文件，第一行代码写 `#!/usr/bin/env node`。

```js
#!/usr/bin/env node
/*
	这里是运行命令时候要执行的代码
*/
```

第二步 在 `package.json` 文件中配置 `bin` 字段

```js
"bin": {
     "命令名": "刚才创建的脚步文件路径"
}
```

## 包管理工具扩展介绍

在很多语言中都有包管理工具，比如：

| 语言       | 包管理工具          |
| ---------- | ------------------- |
| PHP        | composer            |
| Python     | pip                 |
| Java       | maven               |
| Go         | go mod              |
| JavaScript | npm/yarn/cnpm/other |
| Ruby       | rubyGems            |

除了编程语言领域有包管理工具之外，操作系统层面也存在包管理工具，不过这个包指的是『`软件包`』

| 操作系统 | 包管理工具 | 网址                                                         |
| -------- | ---------- | ------------------------------------------------------------ |
| Centos   | yum        | [https://packages.debian.org/stable/](https://gitee.com/link?target=https%3A%2F%2Fpackages.debian.org%2Fstable%2F) |
| Ubuntu   | apt        | [https://packages.ubuntu.com/](https://gitee.com/link?target=https%3A%2F%2Fpackages.ubuntu.com%2F) |
| MacOS    | homebrew   | [https://brew.sh/](https://gitee.com/link?target=https%3A%2F%2Fbrew.sh%2F) |
| Windows  | chocolatey | [https://chocolatey.org/](https://gitee.com/link?target=https%3A%2F%2Fchocolatey.org%2F) |
