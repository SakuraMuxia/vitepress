#   工程化项目开发笔记

## 0. 准备

前端演示地址：http://adv.manage.fuming.site/

后端代码仓库地址：https://gitee.com/sh230320/backend_project

![image-20240514085359065](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240514085359065.png)

## 1 项目初始化配置

* 初始化

  ```shell
  npm init
  ```

* 安装相关依赖

  ```shell
  npm install webpack webpack-cli webpack-dev-server html-webpack-plugin webpack-merge -D
  ```

* 创建 src/app.js

* 创建 public/index.html

* 创建webpack基础配置文件 config/webpack.base.config.js

  ```js
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  
  module.exports = {
      // 入口
      entry: path.resolve(__dirname, '../src/app.js'),
  
      // 出口
      output: {
          path: path.resolve(__dirname, '../dist'),
          filename: 'js/[name].[hash:12].js',
          clean: true,
          // 设置打包后的js文件的路径前加 / 在webpack官网 - 配置 - 出口配置项中可以查阅到
          publicPath: '/'
      },
  
      // 插件
      plugins: [
          new HtmlWebpackPlugin({
              // 起始html文件 
              template: path.resolve(__dirname, '../public/index.html'),
              // 将 script 放在 body 结尾
              inject: 'body',
              // 压缩优化
              minify: {
                  removeAttributeQuotes: true,  // 去除引号
                  removeComments: true, // 去除注释
                  collapseWhitespace: true, // 代码折叠
              }
          })
      ]
  }
  ```

* 创建开发模式配置文件 configs/webpack.dev.config.js

  ```js
  const {merge} = require('webpack-merge');
  const baseConfig = require('./webpack.base.config');
  
  module.exports = merge(baseConfig, {
  
      // 模式
      mode: 'development',
  
      // 自动开启服务
      devServer: {
          host: 'shirly.com',
          port: '80',
          open: true
      }
  })
  ```

* 创建生成模式配置文件 configs/webpack.prod.config.js

  ```js
  const {merge} = require('webpack-merge');
  const baseConfig = require('./webpack.base.config');
  
  module.exports = merge(baseConfig, {
  
      // 模式
      mode: 'production'
  })
  ```

* 配置 pageage.json 中的 scripts

  ```json
  {
    "name": "frontend_project",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "start": "npx webpack server --config ./config/webpack.dev.config.js",
      "build": "npx webpack --config ./config/webpack.prod.config.js"
    },
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "html-webpack-plugin": "^5.5.3",
      "webpack": "^5.87.0",
      "webpack-cli": "^5.1.4",
      "webpack-dev-server": "^4.15.1",
      "webpack-merge": "^5.9.0"
    }
  }
  
  ```

* 运行命令

  ```shell
  npm start   # 启动
  npm run build  # 打包
  ```

  

## 2 设置标题和站标

* public/index.html

  ```html
  <!DOCTYPE html>
  <html lang="zh-CN">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title><%= htmlWebpackPlugin.options.title %></title>
      <link rel="icon" href="./favicon.ico">
  </head>
  <body>
      <h1>Hello Shirly</h1>
  </body>
  </html>
  ```

* 安装插件 copy-webpack-plugin， 将 public 中的文件复制到 dist 中

* html-loader 插件所有文件缺点 名字hash编码，路径默认放在dist目录，需要单独设置路径

  ```shell
  npm install copy-webpack-plugin -D
  ```

* 配置 config/webpack.base.config.js

  ```js
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  
  module.exports = {
      // 入口
      entry: path.resolve(__dirname, '../src/app.js'),
  
      // 出口
      output: {
          path: path.resolve(__dirname, '../dist'),
          filename: 'js/[name].[hash:12].js',
          clean: true,
          publicPath: '/'
      },
  
      // 插件
      plugins: [
          // 打包 html 资源
          new HtmlWebpackPlugin({
              // 起始html文件 
              template: path.resolve(__dirname, '../public/index.html'),
              // 将 script 放在 body 结尾
              inject: 'body',
              // 压缩优化
              minify: {
                  removeAttributeQuotes: true,  // 去除引号
                  removeComments: true, // 去除注释
                  //collapseWhitespace: true, // 代码折叠
              },
              // 自定义的选项
              title: '尚硅谷广告管理系统 shirly'
          }),
  
          // 将源目录（public）中的文件复制到目标目录（项目输出目录）
          new CopyWebpackPlugin({
              patterns: [
                  { 
                      // 源目录
                      from: path.resolve(__dirname, '../public'), 
                      // 目标目录
                      to: path.resolve(__dirname, '../dist'),
                      globOptions: {
                          ignore: ['**/**.html']  // 忽略所有的html文件
                      }
                  },
              ],
          }),
      ]
  }
  ```

  

## 3 使用 sme-router 构建单页面应用

* 安装 sme-router 这个是在npmjs.com 

* vue-router 也是nodejs中的

  ```shell
  npm install sme-router 作用是路由 前端的路由
  ```

* 在 src/app.js 中使用

  ```js
  // 导入
  import SMERouter from 'sme-router'
  
  // 创建实例
  // 默认是 hash 模式，特点  http://adv.manage.fuming.site/#/index/advlist
  // 可以改为 history 模式，特点  http://adv.manage.fuming.site/index/advlist
  const router = new SMERouter('app') 
  // 这里的app是index.html 舞台文件的标签中的id标签
  
  router.route('/index', (req, res) => {
      res.render('首页');
  });
  
  router.route('/admin', (req, res) => {
      res.render('管理员列表');
  });
  
  router.route('/adv', (req, res) => {
      res.render('广告列表');
  });
  
  router.route('/login', (req, res) => {
      res.render('登录');
  });
  
  router.route('*', (req, res) => {
      res.redirect('/index');
  })
  ```

* 允许使用 history 模式，配置文件 config/webpack.dev.config.js

  ```js
  const {merge} = require('webpack-merge');
  const baseConfig = require('./webpack.base.config');
  
  module.exports = merge(baseConfig, {
  
      // 模式
      mode: 'development',
  
      // 自动开启服务
      devServer: {
          host: 'shirly.com',
          port: '80',
          open: true,
          // 开发中，允许前端路由使用 history 模式
          historyApiFallback: true
      }
  })
  ```

  ```javascript
  // history模式 在入口文件 需要设置 第二个参数
  const router = new SMERouter('app',"html5") 
  ```

  

## 4 使用 ejs 模板

* 安装 loader，需要把ejs模版文件导入到js文件中，作为一个模块使用

  ```shell
  npm install ejs-loader -D
  ```

* 配置 config/webpack.base.config.js

  ```js
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  
  module.exports = {
      // 入口
      entry: path.resolve(__dirname, '../src/app.js'),
  
      // 出口
      output: {
          path: path.resolve(__dirname, '../dist'),
          filename: 'js/[name].[hash:12].js',
          clean: true,
          publicPath: '/'
      },
  
      // loaders
      module: {
          rules: [
              {
                  test: /\.ejs$/,
                  loader: 'ejs-loader',
                  options: {
                    variable: 'data',
                    // 自定义定界符 替代 <% %>	执行其中语句
                    //interpolate : '\\{\\{(.+?)\\}\\}', 
                    // 自定义定界符 替代 <%= %>  原样显示 
                    //evaluate : '\\[\\[(.+?)\\]\\]'
                  }
              }
          ]
      },
  
      // 插件
      plugins: [
          // 打包 html 资源
          new HtmlWebpackPlugin({
              // 起始html文件 
              template: path.resolve(__dirname, '../public/index.html'),
              // 将 script 放在 body 结尾
              inject: 'body',
              // 压缩优化
              minify: {
                  removeAttributeQuotes: true,  // 去除引号
                  removeComments: true, // 去除注释
                  //collapseWhitespace: true, // 代码折叠
              },
              // 自定义的选项
              title: '尚硅谷广告管理系统 shirly'
          }),
  
          // 将源目录（public）中的文件复制到目标目录（项目输出目录）
          new CopyWebpackPlugin({
              patterns: [
                  { 
                      from: path.resolve(__dirname, '../public'), 
                      to: path.resolve(__dirname, '../dist'),
                      globOptions: {
                          ignore: ['**/**.html']
                      }
                  },
              ],
          }),
      ]
  }
  ```

* 创建模板文件 views/index.js、 views/admin.js、views/login.js、views/adv.js

* 在 src/app.js 中引入模板并使用

  ```js
  // 导入
  import SMERouter from 'sme-router'
  
  // 导入一个模板
  import indexV from  './views/index.ejs';
  import adminV from  './views/admin.ejs';
  import loginV from  './views/login.ejs';
  import advV from  './views/adv.ejs';
  
  // indexV 是一个函数，调用indexV的返回值 是模版中的内容
  
  // 创建实例
  // 默认是 hash 模式，特点  http://adv.manage.fuming.site/#/index/advlist
  // 可以改为 history 模式，需要第二个参数设置为 html5 特点  http://adv.manage.fuming.site/index/advlist
  const router = new SMERouter('app', 'html5')
  
  
  router.route('/index', (req, res) => {
      //console.log(indexV);
      res.render(indexV({title:'Shirly', message:'锄禾日当午'}));
  });
  
  router.route('/admin', (req, res) => {
      res.render(adminV());
  });
  
  router.route('/adv', (req, res) => {
      res.render(advV());
  });
  
  router.route('/login', (req, res) => {
      res.render(loginV());
  });
  
  router.route('*', (req, res) => {
      res.redirect('/index');
  })
  ```

  模版配置

```javascript
1. 需要把 原来index.html 中的 wrapper标签中的 内容放在 index.ejs
2. 同时还需要把 原来index.html 中的css js 标签放在 舞台文件 ./public/index.html 中
3. 把原 *.html 文件中的静态文件 css js 字体 图片 放在 ./public/文件夹中
```




## 5 省略 ejs 扩展名和路径别名

* 修改配置文件 `config/webpack.base.config.js`

  ```js
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CopyWebpackPlugin = require('copy-webpack-plugin');
  
  module.exports = {
  
  
      // 插件
      plugins: [
          
      ],
  
  
      // 解析
      resolve: {
          // 设置可以省略的扩展名
          extensions: ['.js', '.json', '.ejs'],
          // 设置路径别名
          alias: {
              '@': path.resolve(__dirname, '../src')
          }
      }
  }
  ```

* 导入模板文件可以省略扩展名 `src/app.js`

  ```js
  // 导入
  import SMERouter from 'sme-router'
  
  // 导入一个模板
  import indexV from  '@/views/index';
  import adminV from  '@/views/admin';
  import loginV from  '@/views/login';
  import advV from  '@/views/adv';
  
  // 创建实例
  // 默认是 hash 模式，特点  http://adv.manage.fuming.site/#/index/advlist
  // 可以改为 history 模式，需要第二个参数设置为 html5 特点  http://adv.manage.fuming.site/index/advlist
  const router = new SMERouter('app', 'html5')
  
  
  router.route('/index', (req, res) => {
      //console.log(indexV);
      res.render(indexV({title:'Shirly', message:'锄禾日当午'}));
  });
  
  router.route('/admin', (req, res) => {
      res.render(adminV());
  });
  
  router.route('/adv', (req, res) => {
      res.render(advV());
  });
  
  router.route('/login', (req, res) => {
      res.render(loginV());
  });
  
  router.route('*', (req, res) => {
      res.redirect('/index');
  })
  ```

  

## 6 二级路由 呈现页面

* 二级路由设置 `src/app.js`

  ```js
  // 导入
  import SMERouter from 'sme-router'
  
  // 导入一个模板
  import indexV from  '@/views/index';
  import adminV from  '@/views/admin';
  import loginV from  '@/views/login';
  import advV from  '@/views/adv';
  
  // 创建实例
  // 默认是 hash 模式，特点  http://adv.manage.fuming.site/#/index/advlist
  // 可以改为 history 模式，需要第二个参数设置为 html5 特点  http://adv.manage.fuming.site/index/advlist
  const router = new SMERouter('app', 'html5')
  
  
  router.route('/index', (req, res, next) => {
      //res.render(indexV({title:'Shirly', message:'锄禾日当午'}));
      
      // res.render(`
      //     <h1>首页</h1>
      //     ${res.subRoute()}
      // `)
  	// next函数可以 让二级路由的页面内容 呈现该该路由页面内容的内部
      next(`
          <h1>首页</h1>
          ${res.subRoute()}
      `)
  
      console.log('/index');
  });
  
  router.route('/index/admin', (req, res) => {
      //res.render(adminV());
      res.render(`<h2>管理员列表</h2>`);
      console.log('/index/admin');
  
  });
  
  router.route('/index/adv', (req, res) => {
      res.render(advV());
      console.log('/index/adv');
  
  });
  
  router.route('/login', (req, res) => {
      res.render(loginV());
  });
  
  router.route('*', (req, res) => {
      res.redirect('/index');
  })
  ```

* `加载模板`  `src/app.js`

  ```js
  router.route('/index', (req, res, next) => {
      // next函数可以 让二级路由的页面内容 呈现该该路由页面内容的内部
      // 渲染一个首页模版，把子路由的内容，添加到 subRouteContent 处，
      next(indexV({
          subRouteContent: res.subRoute()
      }))
  });
  
  router.route('/index/admin', (req, res) => {
      res.render(adminV());
  });
  
  router.route('/index/adv', (req, res) => {
      res.render(advV());
    
  });
  
  ```

* `/index` 对应的模板文本 `/views/index.ejs`

  ```ejs
  <div class="wrapper">
  
      <!-- 顶部导航 -->
    	省略内容
  
      <!-- 侧边栏 -->
      省略内容
     
  
      <!-- 主要内容 -->
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <div class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="m-0">页面标题</h1>
              </div>
            </div><!-- /.row -->
          </div><!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->
  
        <!-- Main content -->
        <div class="content">
          <div class="container-fluid">
              // 这里是 子路由传来的内容 data.subRouteContent 
              // data 来自indexV(data) 函数形式参数 在ejs的loader中定义
              // subRouteContent 是父路由定义的对象中的属性 index({subRouteContent:})
            <%= data.subRouteContent %>
          </div><!-- /.container-fluid -->
        </div>
        <!-- /.content -->
      </div>
  
      <!-- Main Footer -->
      省略内容
    
  ```

/ : 代表网站根目录，不加 / 默认在后边拼接

```javascript
<link rel="stylesheet" href="/css/fontawesome.min.css"> / 这里代表 网站根目录
/ : 代表网站根目录，不加 / 默认在后边拼接
```

二级路由过程：

```javascript
1 http://127.0.0.1:8080/index/admin
2 会同时匹配index 路由和 admin 路由（区别于后端express精准匹配）
3 通过index路由时，渲染一个页面，使用next方法，让子路由内容添加到这个页面中某处。
4 通过admin路由时，渲染一个页面，子路由页面得到渲染，通过res.subRoute()方法，把内容传递给父路由某处

res.subRoute()方法是 sme-route npm包自带的 方法，用于获取子路由的内容。
```

![image-20240516110933060](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240516110933060.png)



## 7 管理员列表模板页面和广告列表模板页

* `views/admin.ejs`

  ```ejs
  <div id="__sub-route-view">
      <div class="card adminlist">
          ...
       </div>
  </div>
  
      <!-- 模态框 -->
  <div class="modal fade" id="addAdminModal" style="display: none;" aria-hidden="true">
      ...
  </div>
  ```

* `views/adv.ejs`

  ```javascript
  <div id="__sub-route-view">
      <div class="card">
          ...
      </div>
  </div>
  ```

* `views/login.ejs`

  ```ejs
  <div class="wrapper">
     ...
  </div>
  ```

  



## 8 页面组件化

* `components/Header.ejs`

  ```ejs
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      ...
  </nav>
  ```

* `components/Sidebar.ejs`

  ```ejs
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
      ...
  </aside>
  ```

  

* `components/Footer.ejs`

  ```ejs
  <footer class="main-footer">
      <!-- To the right -->
      <div class="float-right d-none d-sm-inline">
          Anything you want
      </div>
      <!-- Default to the left -->
      <strong>Copyright © 2023-2024 <a href="http://learn.fuming.site">尚硅谷</a>.</strong> All rights reserved.
  </footer>
  ```

  

* `components/Content.ejs`

  ```js
  <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
          <div class="container-fluid">
              <div class="row mb-2">
                  <div class="col-sm-6">
                      <h1 class="m-0">页面标题</h1>
                  </div>
              </div><!-- /.row -->
          </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->
  
      <!-- Main content -->
      <div class="content">
          <div class="container-fluid">
              <%= data.subRouteContent %>
          </div><!-- /.container-fluid -->
      </div>
      <!-- /.content -->
  </div>
  ```

* `src/app.js`

  ```js
  // 导入
  import SMERouter from 'sme-router'
  
  // 导入组件
  import HeaderComponent from '@/components/Header'; 
  import SidebarComponent from '@/components/Sidebar'; 
  import FooterComponent from '@/components/Footer'; 
  import ContentComponent from '@/components/Content'; 
  
  // 导入一个模板
  import indexV from  '@/views/index';
  import adminV from  '@/views/admin';
  import loginV from  '@/views/login';
  import advV from  '@/views/adv';
  
  // 创建实例
  // 默认是 hash 模式，特点  http://adv.manage.fuming.site/#/index/advlist
  // 可以改为 history 模式，需要第二个参数设置为 html5 特点  http://adv.manage.fuming.site/index/advlist
  const router = new SMERouter('app', 'html5')
  
  
  router.route('/index', (req, res, next) => {
      // next函数可以 让二级路由的页面内容 呈现该该路由页面内容的内部
      next(indexV({
          // 页头组件
          Header: HeaderComponent(),
          // 侧边栏组件
          Sidebar: SidebarComponent(),
          // 页脚组件
          Footer: FooterComponent(),
          // 主要内容组件
          Content: ContentComponent({
              // 把二级路由放在 组件中
              subRouteContent: res.subRoute()
          }),
      }))
  });
  
  router.route('/index/admin', (req, res) => {
      res.render(adminV());
  });
  
  router.route('/index/adv', (req, res) => {
      res.render(advV());
      console.log('/index/adv');
  
  });
  
  router.route('/login', (req, res) => {
      res.render(loginV());
  });
  
  router.route('*', (req, res) => {
      res.redirect('/index');
  })
  ```

  index.ejs模版

  ```javascript
  <div class="wrapper">
  <!-- 在app.js入口文件中把 内容传过来 -->
      <!-- 顶部导航 -->
      <%= data.Header %>
      <!-- 侧边栏 -->
      <%= data.Sidebar %>
     
      <!-- 主要内容 -->
      <%= data.Content %>
      
      <!-- Footer -->
      <%= data.Footer %>
  
  </div>
  ```

  

## 9 抽离控制器

控制器：路由后边执行的函数 抽离出来 单独放在一个文件夹中

* `src/controllers/index.js`

  ```js
  // 导入组件
  import HeaderComponent from '@/components/Header'; 
  import SidebarComponent from '@/components/Sidebar'; 
  import FooterComponent from '@/components/Footer'; 
  import ContentComponent from '@/components/Content'; 
  
  // 导入模板
  import indexV from  '@/views/index';
  
  export default (req, res, next) => {
      // next函数可以 让二级路由的页面内容 呈现该该路由页面内容的内部
      next(indexV({
          // 页头组件
          Header: HeaderComponent(),
          // 侧边栏组件
          Sidebar: SidebarComponent(),
          // 页脚组件
          Footer: FooterComponent(),
          // 主要内容组件
          Content: ContentComponent({
              subRouteContent: res.subRoute()
          }),
      }))
  }
  ```

* `src/controllers/admin.js`

  ```js
  // 导入模板页
  import adminV from  '@/views/admin';
  
  
  export default (req, res) => {
      res.render(adminV());
  }
  ```

* `src/controllers/adv.js`

  ```js
  // 导入模板页面
  import advV from  '@/views/adv';
  
  export default (req, res) => {
      res.render(advV());
  }
  ```

* `src/controllers/login.js`

  ```JS
  // 导入模板
  import loginV from  '@/views/login';
  
  export default (req, res) => {
      res.render(loginV());
  }
  ```

* `src/app.js`

  ```js
  // 导入
  import SMERouter from 'sme-router'
  
  // 导入控制器
  import indexC from '@/controllers/index';
  import adminC from '@/controllers/admin';
  import advC from '@/controllers/adv';
  import loginC from '@/controllers/login';
  
  
  // 创建实例
  // 默认是 hash 模式，特点  http://adv.manage.fuming.site/#/index/advlist
  // 可以改为 history 模式，需要第二个参数设置为 html5 特点  http://adv.manage.fuming.site/index/advlist
  const router = new SMERouter('app', 'html5')
  
  
  router.route('/index', indexC);
  
  router.route('/index/admin', adminC);
  
  router.route('/index/adv', advC);
  
  router.route('/login', loginC);
  
  router.route('*', (req, res) => {
      res.redirect('/index/admin');
  })
  ```

  

## 10 抽离路由配置

* `src/routes/index.js`

  ```js
  // 导入控制器
  import indexC from '@/controllers/index';
  import adminC from '@/controllers/admin';
  import advC from '@/controllers/adv';
  import loginC from '@/controllers/login';
  
  export default [
      {
          path: '/index',
          element: indexC
      },
      {
          path: '/index/admin',
          element: adminC,
      },
      {
          path: '/index/adv',
          element: advC
      },
      {
          path: '/login',
          element: loginC
      },
      {
          path: '*',
          element: (req, res) => {
              res.redirect('/index/admin')
          }
      }
  ]
  ```

* `src/app.js`

  ```js
  // 导入
  import SMERouter from 'sme-router'
  // 导入路由配置
  import routes from './routes';
  
  // 创建实例
  // 默认是 hash 模式，特点  http://adv.manage.fuming.site/#/index/advlist
  // 可以改为 history 模式，需要第二个参数设置为 html5 特点  http://adv.manage.fuming.site/index/advlist
  const router = new SMERouter('app', 'html5')
  
  // 遍历路由配置 设置路由
  routes.forEach(routeItem => {
      router.route(routeItem.path, routeItem.element);
  })
  ```

## 11 路由导航

**第一种情况：点击刷新**

* `src/components/Sidebar.ejs`

  ```html
  ...
  <nav class="mt-2">
  	<ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- 菜单列表 -->
          <li class="nav-item menu-open">
              <!-- 更改这里的href -->
              <a href="/index/admin" class="nav-link">
                  <i class="nav-icon fas fa-user"></i>
  				<p>管理员列表</p>
  			</a>
  		</li>
  		<li class="nav-item menu-open">
              <!-- 更改这里的href -->
      		<a href="/index/adv" class="nav-link">
          	<i class="nav-icon fas fa-audio-description"></i>
  			<p>广告管理列表</p>
  			</a>
  		</li>
  	</ul>
  </nav>
  ...
  ```

**第一种情况：点击不刷新**

* `src/components/Sidebar.ejs`

  ```javascript
  ...
  <nav class="mt-2">
  	<ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- 菜单列表 -->
          <li class="nav-item menu-open">
              <!-- 更改这里的href 阻止浏览器默认行为-->
              <!-- 添加onclick监听事件 使用暴漏的全局对象 router 的go()方法 跳转页面-->
              <a href="javascript:;" class="nav-link" onclick="router.go('/index/admin')" >
                  <i class="nav-icon fas fa-user"></i>
  				<p>管理员列表</p>
  			</a>
  		</li>
  		<li class="nav-item menu-open">
              <!-- 更改这里的href 阻止浏览器默认行为-->
      		<a href="javascript:;" class="nav-link">
          	<i class="nav-icon fas fa-audio-description"></i>
  			<p>广告管理列表</p>
  			</a>
  		</li>
  	</ul>
  </nav>
  ...
  ```

`src/app.js`

```javascript
const router = new SMERouter('app', 'html5');
// 将 router 暴露到全局,webpack默认是模块化，每一个js是一个单独的作用域，默认没有暴漏到全局
window.router = router;
// 使用 router 的go()方法 无刷新跳转页面
```

**设置导航高亮**

* `src/components/Sidebar.ejs`

  ```ejs
  ...
  <!-- 菜单列表 -->
  
  <% data.routes.filter(item=>item.isNav).forEach(item => { %>
  <li class="nav-item menu-open">
      <!-- 判断url和path是否一致，用于高亮显示active -->
      <a href="javascript:;" class="nav-link <%= data.url === item.path ? 'active' : '' %>" onclick="router.go('<%= item.path %>')">
          <!-- 显示导航的logo -->
          <i class="nav-icon fas <%= item.icon %>"></i>
          <!-- 显示导航的标题 -->
          <p><%= item.title %></p>
      </a>
  </li>
  <% }) %>
  ...
  ```

* `src/controllers/index.js`

  ```js
  // 导入模板
  import indexV from  '@/views/index';
  
  
  // 导入组件
  import HeaderComponent from '@/components/Header'; 
  import SidebarComponent from '@/components/Sidebar'; 
  import FooterComponent from '@/components/Footer'; 
  import ContentComponent from '@/components/Content'; 
  
  // indexV 是一个ejs-loader 包做处理的函数 ，调用indexV的返回值 是模版中的内容,indexV(data)
  // HeaderComponent 同样也是一个函数 调用的返回值 是模版中的内容
  
  // 导入路由配置模块，谁用谁导入
  import routes from '@/routes';
  
  // 这里使用 req.url 方法得到路由，使用结构赋值简写为{url}
  export default ({url}, res, next) => {
      // res.render(indexV({title:'Shirly', message:'锄禾日当午'}));
      next(indexV({
          // 页头组件
          Header:HeaderComponent(),
          // 侧边栏组件
          Sidebar: SidebarComponent({
              // url:req.url
              url,
              routes
          }),
          // 页脚组件
          Footer: FooterComponent(),
          // 主要内容组件
          Content: ContentComponent({
              // 把二级路由放在 组件中
              subRouteContent: res.subRoute()
          }),
      }));
  }
  ```



## 12 渲染导航列表

> **注意：** 本项目已经引入了字体图标库 fontawesome， 地址：https://fontawesome.com.cn/

* `src/routes/index.js`

  ```js
  // 导入控制器
  import indexC from '@/controllers/index';
  import adminC from '@/controllers/admin';
  import advC from '@/controllers/adv';
  import loginC from '@/controllers/login';
  
  export default [
      {
          path: '/index',
          element: indexC
      },
      {
          path: '/index/admin',
          element: adminC,
          isNav: true,
          title: '管理员列表',
          icon: 'fa-user',
      },
      {
          path: '/index/adv',
          element: advC,
          isNav: true,
          title: '广告列表',
          icon: 'fa-audio-description'
      },
      {
          path: '/index',
          element: advC,
          isNav: true,
          title: '首页',
          icon: 'fa-home'
      },
      {
          path: '/login',
          element: loginC
      },
      {
          path: '*',
          element: (req, res) => {
              res.redirect('/index/admin')
          }
      }
  ]
  ```

* `src/controllers/index.js`

  ```js
  // 导入组件
  import HeaderComponent from '@/components/Header'; 
  import SidebarComponent from '@/components/Sidebar'; 
  import FooterComponent from '@/components/Footer'; 
  import ContentComponent from '@/components/Content'; 
  
  // 导入模板
  import indexV from  '@/views/index';
  
  // 导入路由配置对象
  import routes from '../routes';
  
  export default ({url}, res, next) => {
  
      // next函数可以 让二级路由的页面内容 呈现该该路由页面内容的内部
      next(indexV({
          // 页头组件
          Header: HeaderComponent(),
          // 侧边栏组件
          Sidebar: SidebarComponent({
              url,
              routes
          }),
          // 页脚组件
          Footer: FooterComponent(),
          // 主要内容组件
          Content: ContentComponent({
              subRouteContent: res.subRoute()
          }),
      }))
  }
  ```

* `src/components/Sidebar.ejs`

  ```javascript
  <aside class="main-sidebar sidebar-dark-primary elevation-4">
  <% data.routes.filter(item=>item.isNav).forEach(item => { %>
      <li class="nav-item menu-open">
          <a href="javascript:;" class="nav-link <%= data.url === item.path ? 'active' : '' %>" onclick="router.go('<%= item.path %>')">
              <i class="nav-icon fas <%= item.icon %>"></i>
              <p><%= item.title %></p>
          </a>
      </li>
  <% }) %>
  </aside>
  ```




## 13 不同页面显示不同 title

* `src/controllers/index.js`

  ```js
  // 导入组件
  import HeaderComponent from '@/components/Header'; 
  import SidebarComponent from '@/components/Sidebar'; 
  import FooterComponent from '@/components/Footer'; 
  import ContentComponent from '@/components/Content'; 
  
  // 导入模板
  import indexV from  '@/views/index';
  
  // 导入路由配置对象
  import routes from '../routes';
  
  export default ({url}, res, next) => {
  
      // next函数可以 让二级路由的页面内容 呈现该该路由页面内容的内部
      next(indexV({
          // 页头组件
          Header: HeaderComponent(),
          // 侧边栏组件
          Sidebar: SidebarComponent({
              url,
              routes
          }),
          // 页脚组件
          Footer: FooterComponent(),
          // 主要内容组件
          Content: ContentComponent({
              title: routes.find(item=>item.path===url).title,
              subRouteContent: res.subRoute()
          }),
      }))
  }
  ```

* `src/components/Content.ejs`

  ```ejs
  <div class="content-wrapper">
      <!-- Content Header (Page header) -->
      <div class="content-header">
          <div class="container-fluid">
              <div class="row mb-2">
                  <div class="col-sm-6">
                      <h1 class="m-0"><%= data.title %></h1>
                  </div>
              </div><!-- /.row -->
          </div><!-- /.container-fluid -->
      </div>
      <!-- /.content-header -->
  
      <!-- Main content -->
      <div class="content">
          <div class="container-fluid">
              <%= data.subRouteContent %>
          </div><!-- /.container-fluid -->
      </div>
      <!-- /.content -->
  </div>
  ```


## 14 支持 LESS

* 安装依赖

  ```shell
  npm install style-loader css-loader less-loader less -D
  ```

* `config/webpack.base.config.js`

  ```js
  module: {
          rules: [
              
              {
                  test: /\.less$/,
                  use: ['style-loader', 'css-loader', 'less-loader']
              }
          ]
      },
  ```

* `src/assets/less/app.less`

  ```less
  #advTable {
      table {
          min-width: 1200px;
      }
  }
  ```

* `src/views/adv.ejs`

  ```javascript
  // 加入自动滚动条 table-responsive bootstrap样式属性
  <div id="advTable" class="card-body table-responsive">
        <table id="" class="table table-bordered">
            ...
        </table>
  </div>
  ```

  

* `src/app.js`

```javascript
// 入口文件导入 因为只有一个页面 只需要导入一个就可以

// 导入
import SMERouter from 'sme-router';

// 导入路由配置
import routes from './routes';

// 导入less
import './assets/less/app.less'

// 创建实例
// 默认是 hash 模式，特点  http://adv.manage.fuming.site/#/index/advlist
// 可以改为 history 模式，特点  http://adv.manage.fuming.site/index/advlist

const router = new SMERouter('app',"html5");

// 遍历路由配置 设置路由
routes.forEach(routeItem => {
    router.route(routeItem.path,routeItem.element)
})

// 暴漏router对象
window.router = router;
```



## 15 添加管理员验证数据

* `src/controllers/admin.js`

  ```js
  // 导入模板页
  import adminV from  '@/views/admin';
  
  // 执行添加管理员账号
  const addAdminExec = () => {
      // 获取表单数据
      const adminName = document.adminForm.adminName.value.trim();
      const passWord = document.adminForm.passWord.value.trim();
      const rePassWord = document.adminForm.rePassWord.value.trim();
  
      // 管理员账号只能由英文字母组成 ^[a-zA-Z]+$
      if (adminName.search(/^[a-zA-Z]+$/) === -1) {
          alert('管理员账号只能由英文字母组成！');
          return;
      }
  
      // 密码是6-18位的数字、字母、下划线 ^\w{6,18}$
      if (passWord.search(/^\w{6,18}$/) === -1) {
          alert('密码必须由6到18位数字、字母、下划线组成');
          return;
      }
  
      // 确认密码
      if (passWord !== rePassWord) {
          alert('两次密码不一致');
          return;
      }
  
  
  }
  
  export default (req, res) => {
      // 加载模板内容
      res.render(adminV());
  
      // 给添加按钮监听click事件
      document.querySelector('#addAdminBtn').addEventListener('click', addAdminExec)
    
  }
  ```

* `src/views/admin.ejs`

  ```ejs
  ...
  <div class="modal-body">
      <form name="adminForm" id="addAdminForm">
          <div class="form-group">
              <label for="exampleInputEmail1">管理员账号</label>
              <input type="text" name="adminName" class="form-control" id="exampleInputEmail1" placeholder="请输入管理员账号">
          </div>
          <div class="form-group">
              <label for="exampleInputPassword1">管理员密码</label>
              <input type="password" name="passWord" class="form-control" id="exampleInputPassword1"
                  placeholder="请输入管理员密码">
          </div>
          <div class="form-group">
              <label for="exampleInputPassword2">重复密码</label>
              <input name="rePassWord" type="password" class="form-control" id="exampleInputPassword2"
                  placeholder="请输入管理员密码">
          </div>
      </form>
  </div>
  ...
  ```

  

## 16 使用 toastr 提示信息

* 安装依赖 产品依赖

  ```shell
  npm install toastr
  ```

* 修改配置 `config/webpack.base.config.js`

  ```js
   module: {
          rules: [
              
              {
                  test: /\.css$/,
                  use: ['style-loader', 'css-loader']
              }
          ]
      },
  ```

* 使用 `src/controllers/admin.js`

  ```js
  // 导入 toastr
  import toastr from 'toastr';
  import '../../node_modules/toastr/build/toastr.css';
  
  // 导入模板页
  import adminV from  '@/views/admin';
  
  // 执行添加管理员账号
  const addAdminExec = () => {
      // 获取表单数据
      const adminName = document.adminForm.adminName.value.trim();
      const passWord = document.adminForm.passWord.value.trim();
      const rePassWord = document.adminForm.rePassWord.value.trim();
  
      // 管理员账号只能由英文字母组成 ^[a-zA-Z]+$
      if (adminName.search(/^[a-zA-Z]+$/) === -1) {
          toastr.error('管理员账号只能由英文字母组成！');
          return;
      }
  
      // 密码是6-18位的数字、字母、下划线 ^\w{6,18}$
      if (passWord.search(/^\w{6,18}$/) === -1) {
          toastr.error('密码必须由6到18位数字、字母、下划线组成');
          return;
      }
  
      // 确认密码
      if (passWord !== rePassWord) {
          toastr.error('两次密码不一致');
          return;
      }
  
  
  }
  
  export default (req, res) => {
      // 加载模板内容
      res.render(adminV());
  
      // 给添加按钮监听click事件
      document.querySelector('#addAdminBtn').addEventListener('click', addAdminExec)
    
  }
  ```

  





## 17 设置代理并调用添加管理员接口

* 安装 axios 产品依赖

  ```shell
  npm install axios
  ```

* 设置代理 `config/webpack.dev.config.js`

  ```js
  const {merge} = require('webpack-merge');
  const baseConfig = require('./webpack.base.config');
  
  module.exports = merge(baseConfig, {
  
      // 模式
      mode: 'development',
  
      // 自动开启服务
      devServer: {
          host: 'shirly.com',
          port: '80',
          open: true,
          // 开发中，允许前端路由使用 history 模式
          historyApiFallback: true,
  
          proxy: [
              {
                  context: ['/api'],
                  target: 'http://192.168.1.198:8088',
                  secure: false,
                  pathRewrite: { '^/api': '' },
              },
          ]
      }
  })
  ```

* 使用 axios 发送请求 `src/controller/admin.js`

  ```js
  // 导入 toastr
  import toastr from 'toastr';
  import '../../node_modules/toastr/build/toastr.css';
  
  // 导入 axios
  import axios from 'axios';
  
  // 导入模板页
  import adminV from  '@/views/admin';
  
  // 执行添加管理员账号
  const addAdminExec = () => {
      // 获取表单数据
      const adminName = document.adminForm.adminName.value.trim();
      const passWord = document.adminForm.passWord.value.trim();
      const rePassWord = document.adminForm.rePassWord.value.trim();
  
      // 管理员账号只能由英文字母组成 ^[a-zA-Z]+$
      if (adminName.search(/^[a-zA-Z]+$/) === -1) {
          toastr.error('管理员账号只能由英文字母组成！');
          return;
      }
  
      // 密码是6-18位的数字、字母、下划线 ^\w{6,18}$
      if (passWord.search(/^\w{6,18}$/) === -1) {
          toastr.error('密码必须由6到18位数字、字母、下划线组成');
          return;
      }
  
      // 确认密码
      if (passWord !== rePassWord) {
          toastr.error('两次密码不一致');
          return;
      }
  
      // 使用 axios 发送请求
      axios
      .post('/api/admin', {
          adminName,
          passWord
      })
      .then( res => {
          console.log(res);
      })
      .catch (err => {
          console.log('请示失败', err);
      })
  
  }
  
  export default (req, res) => {
      // 加载模板内容
      res.render(adminV());
  
      // 给添加按钮监听click事件
      document.querySelector('#addAdminBtn').addEventListener('click', addAdminExec)
    
  }
  ```



## 18 axios 响应拦截器统一处理可能出现的错误

* `src/request/advserver.js`  创建请求实例，设置响应拦截器，统一处理可能出现的错误

  ```js
  // 导入 axios
  import axios from 'axios';
  import toastr from 'toastr';
  
  // 创建 axios 实例
  const advServer = axios.create({
      baseURL: '/api',
      timeout: 5000
  });
  
  // 给 实例设置响应拦截器
  advServer.interceptors.response.use(res => {
      if (res.data.ok !== 1) {
          toastr.error(res.data.msg);
          // 返回不改变状态的 Promise，执行链结束了
          return new Promise(()=>{});
      }
  
      return res.data;
  
  }, error => {
      toastr.error('请求错误！');
      // 返回不改变状态的 Promise，执行链结束了
      return new Promise(()=>{});
  });
  
  // 暴露实例
  export default advServer;
  ```

* `src/controllers/admin.js`

  ```js
  // 导入 toastr
  import toastr from 'toastr';
  import '../../node_modules/toastr/build/toastr.css';
  
  // 导入请求实例
  import advServer from '../request/advserver';
  
  // 导入模板页
  import adminV from  '@/views/admin';
  
  // 执行添加管理员账号
  const addAdminExec = () => {
      // 获取表单数据
      const adminName = document.adminForm.adminName.value.trim();
      const passWord = document.adminForm.passWord.value.trim();
      const rePassWord = document.adminForm.rePassWord.value.trim();
  
      // 管理员账号只能由英文字母组成 ^[a-zA-Z]+$
      if (adminName.search(/^[a-zA-Z]+$/) === -1) {
          toastr.error('管理员账号只能由英文字母组成！');
          return;
      }
  
      // 密码是6-18位的数字、字母、下划线 ^\w{6,18}$
      if (passWord.search(/^\w{6,18}$/) === -1) {
          toastr.error('密码必须由6到18位数字、字母、下划线组成');
          return;
      }
  
      // 确认密码
      if (passWord !== rePassWord) {
          toastr.error('两次密码不一致');
          return;
      }
  
      // 使用 axios 发送请求
      advServer
      .post('/admin', {
          adminName,
          passWord
      })
      .then( res => {
          toastr.success('管理员添加成功');
          console.log('成功：',res);
      })
  
  
  }
  
  export default (req, res) => {
      // 加载模板内容
      res.render(adminV());
  
      // 给添加按钮监听click事件
      document.querySelector('#addAdminBtn').addEventListener('click', addAdminExec)
    
  }
  ```


结构分析图

![image-20240517125659175](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240517125659175.png)

代理服务器原理图

![image-20240517125718264](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240517125718264.png)

## 19 axios 二次封装

* `src/api/admin.js`  api文件跟后端接口对应，一个或多个后端接口对应一个函数

  ```js
  // 导入实例
  import advServer from '../request/advserver';
  
  // 添加管理员
  export const postAdmin = body => {
      return advServer.post('/admin', body);
  }
  
  // 获取管理员
  export const getAdmin = () => {
      return advServer.get('/admin');
  }
  
  // 删除指定id的管理员
  export const deleteAdmin = id => {
      return advServer.delete('/admin/'+id);
  }
  
  // 修改密码
  export const changePassword = body => {
      return advServer.patch('/changpwd', body)
  }
  ```

* 控制器中导入 api 暴露的函数

  ```js
  // 导入 toastr
  import toastr from 'toastr';
  import '../../node_modules/toastr/build/toastr.css';
  
  // 导入发送请求的函数
  import {postAdmin} from '../api/admin';
  
  // 导入模板页
  import adminV from  '@/views/admin';
  
  // 执行添加管理员账号
  const addAdminExec = () => {
      // 获取表单数据
      const adminName = document.adminForm.adminName.value.trim();
      const passWord = document.adminForm.passWord.value.trim();
      const rePassWord = document.adminForm.rePassWord.value.trim();
  
      // 管理员账号只能由英文字母组成 ^[a-zA-Z]+$
      if (adminName.search(/^[a-zA-Z]+$/) === -1) {
          toastr.error('管理员账号只能由英文字母组成！');
          return;
      }
  
      // 密码是6-18位的数字、字母、下划线 ^\w{6,18}$
      if (passWord.search(/^\w{6,18}$/) === -1) {
          toastr.error('密码必须由6到18位数字、字母、下划线组成');
          return;
      }
  
      // 确认密码
      if (passWord !== rePassWord) {
          toastr.error('两次密码不一致');
          return;
      }
  
      // 调用后端API 添加管理员
      postAdmin({
          adminName,
          passWord
      })
      .then( res => {
          toastr.success('管理员添加成功');
          console.log('成功：',res);
      })
  
  
  }
  
  export default (req, res) => {
      // 加载模板内容
      res.render(adminV());
  
      // 给添加按钮监听click事件
      document.querySelector('#addAdminBtn').addEventListener('click', addAdminExec)
    
  }
  ```

  





## 20 获取管理员数据并渲染页面

* `src/controllers/admin.js` 控制器

  ```js
  // 导入 toastr
  import toastr from 'toastr';
  import '../../node_modules/toastr/build/toastr.css';
  
  // 导入发送请求的函数
  import {postAdmin, getAdmin} from '../api/admin';
  
  // 导入管理员列表表格的组件
  import AdminTabelComponent from '../components/AdminTable';
  // 导入模板页
  import adminV from  '@/views/admin';
  
  // 执行添加管理员账号
  const addAdminExec = () => {
      // 获取表单数据
      const adminName = document.adminForm.adminName.value.trim();
      const passWord = document.adminForm.passWord.value.trim();
      const rePassWord = document.adminForm.rePassWord.value.trim();
  
      // 管理员账号只能由英文字母组成 ^[a-zA-Z]+$
      if (adminName.search(/^[a-zA-Z]+$/) === -1) {
          toastr.error('管理员账号只能由英文字母组成！');
          return;
      }
  
      // 密码是6-18位的数字、字母、下划线 ^\w{6,18}$
      if (passWord.search(/^\w{6,18}$/) === -1) {
          toastr.error('密码必须由6到18位数字、字母、下划线组成');
          return;
      }
  
      // 确认密码
      if (passWord !== rePassWord) {
          toastr.error('两次密码不一致');
          return;
      }
  
      // 调用后端API 添加管理员
      postAdmin({
          adminName,
          passWord
      })
      .then( res => {
          toastr.success('管理员添加成功');
          console.log('成功：',res);
      })
  
  
  }
  
  // 获取管理员信息 并渲染页面
  const getAdminExec = () => {
      // 向后端API请求
      getAdmin()
      .then(res => {
          // 将数据发送到管理员表格组件中 将组件设置到模板的指定位置
          document.querySelector('#amdinListBox').innerHTML = AdminTabelComponent({adminList: res.data})
      });
  }
  
  export default (req, res) => {
      // 加载模板内容
      res.render(adminV());
  
      // 获取管理员信息
      getAdminExec();
  
      // 给添加按钮监听click事件
      document.querySelector('#addAdminBtn').addEventListener('click', addAdminExec)
    
  }
  ```

* `src/components/AdminTable.ejs` 组件

  ```javascript
  <table class="table table-bordered">
  ...
      <tbody>
          <% data.adminList.forEach(adminItem => { %>
              <tr>
                  <!-- <td>648d3b13dbeadd55199ab0a7</td> -->
                  <td><%= adminItem.adminName %></td>
                  <td><%= adminItem.lastLoginTime %></td>
                  <td><%= adminItem.regTime %></td>
                  <td>
                      <button type="button" class="btn btn-danger" data-id="<%= adminItem._id %>">删除</button>
                      <button type="button" class="btn btn-success">修改密码</button>
                  </td>
              </tr>
  
          <% }) %>
      </tbody>
  </table>
  ```

  



## 21 完成添加管理员更新列表

* `src/controllers/admin.js`

  ```js
  // 导入 toastr
  import toastr from 'toastr';
  import '../../node_modules/toastr/build/toastr.css';
  
  // 导入发送请求的函数
  import {postAdmin, getAdmin} from '../api/admin';
  
  // 导入管理员列表表格的组件
  import AdminTabelComponent from '../components/AdminTable';
  // 导入模板页
  import adminV from  '@/views/admin';
  
  // 执行添加管理员账号
  const addAdminExec = () => {
      // 获取表单数据
      const adminName = document.adminForm.adminName.value.trim();
      const passWord = document.adminForm.passWord.value.trim();
      const rePassWord = document.adminForm.rePassWord.value.trim();
  
      // 管理员账号只能由英文字母组成 ^[a-zA-Z]+$
      if (adminName.search(/^[a-zA-Z]+$/) === -1) {
          toastr.error('管理员账号只能由英文字母组成！');
          return;
      }
  
      // 密码是6-18位的数字、字母、下划线 ^\w{6,18}$
      if (passWord.search(/^\w{6,18}$/) === -1) {
          toastr.error('密码必须由6到18位数字、字母、下划线组成');
          return;
      }
  
      // 确认密码
      if (passWord !== rePassWord) {
          toastr.error('两次密码不一致');
          return;
      }
  
      // 调用后端API 添加管理员
      postAdmin({
          adminName,
          passWord
      })
      .then( res => {
          toastr.success('管理员添加成功');
          
          // 关闭模态框
          $('#addAdminModal').modal('hide');
          // 清空表单
          document.adminForm.reset();
          // 更新列表
          getAdminExec();
      });
  
  
  }
  
  // 获取管理员信息 并渲染页面
  const getAdminExec = () => {
      // 向后端API请求
      getAdmin()
      .then(res => {
          // 将数据发送到管理员表格组件中 将组件设置到模板的指定位置
          document.querySelector('#amdinListBox').innerHTML = AdminTabelComponent({adminList: res.data})
      });
  }
  
  export default (req, res) => {
      // 加载模板内容
      res.render(adminV());
  
      // 获取管理员信息
      getAdminExec();
  
      // 给添加按钮监听click事件
      document.querySelector('#addAdminBtn').addEventListener('click', addAdminExec)
    
  }
  ```

  

## 22 删除管理员

* `src/controllers/admin.js`

  ```js
  // 导入 toastr
  import toastr from 'toastr';
  import '../../node_modules/toastr/build/toastr.css';
  
  // 导入发送请求的函数
  import {postAdmin, getAdmin, deleteAdmin} from '../api/admin';
  
  // 导入管理员列表表格的组件
  import AdminTabelComponent from '../components/AdminTable';
  // 导入模板页
  import adminV from  '@/views/admin';
  
  // 执行添加管理员账号
  const addAdminExec = () => {
      // 获取表单数据
      const adminName = document.adminForm.adminName.value.trim();
      const passWord = document.adminForm.passWord.value.trim();
      const rePassWord = document.adminForm.rePassWord.value.trim();
  
      // 管理员账号只能由英文字母组成 ^[a-zA-Z]+$
      if (adminName.search(/^[a-zA-Z]+$/) === -1) {
          toastr.error('管理员账号只能由英文字母组成！');
          return;
      }
  
      // 密码是6-18位的数字、字母、下划线 ^\w{6,18}$
      if (passWord.search(/^\w{6,18}$/) === -1) {
          toastr.error('密码必须由6到18位数字、字母、下划线组成');
          return;
      }
  
      // 确认密码
      if (passWord !== rePassWord) {
          toastr.error('两次密码不一致');
          return;
      }
  
      // 调用后端API 添加管理员
      postAdmin({
          adminName,
          passWord
      })
      .then( res => {
          toastr.success('管理员添加成功');
          
          // 关闭模态框
          $('#addAdminModal').modal('hide');
          // 清空表单
          document.adminForm.reset();
          // 更新列表
          getAdminExec();
      });
  
  
  }
  
  // 获取管理员信息 并渲染页面
  const getAdminExec = () => {
      // 向后端API请求
      getAdmin()
      .then(res => {
          // 将数据发送到管理员表格组件中 将组件设置到模板的指定位置
          document.querySelector('#amdinListBox').innerHTML = AdminTabelComponent({adminList: res.data})
      });
  }
  
  // 执行管理员的删除
  const deleteAdminExec = event => {
      // 判断目标元素是否是删除按钮
      if (event.target.classList.contains('btn-danger')) {
          // 弹出确认框
          if (confirm('确定删除？')) {
              // 调用后端API执行删除
              deleteAdmin(event.target.dataset.id)
              .then(res => {
                  alert('删除成功！');
                  // 更新列表
                  getAdminExec();
              })
          } 
      }
  };
  
  export default (req, res) => {
      // 加载模板内容
      res.render(adminV());
  
      // 获取管理员信息
      getAdminExec();
  
      // 给添加按钮监听click事件
      document.querySelector('#addAdminBtn').addEventListener('click', addAdminExec)
    
      // 给管理员列表中的删除按钮监听单击事件 事件位置
      document.querySelector('#amdinListBox').addEventListener('click', deleteAdminExec)
  }
  ```

  



## 23 使用 sweetalert2 优化确认框

* 安装依赖 产品依赖

  ```shell
  npm install sweetalert2
  ```

* `src/controllers/admin.js`

  ```js
  // 导入 sweetalert2
  import Swal from 'sweetalert2';
  // 执行管理员的删除
  const deleteAdminExec = event => {
      // 判断目标元素是否是删除按钮
      if (event.target.classList.contains('btn-danger')) {
          // 弹出确认框
          Swal.fire({
              title: '确定删除？',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消'
          }).then((result) => {
              if (result.isConfirmed) {
                  // 调用后端API执行删除
                  deleteAdmin(event.target.dataset.id)
                  .then(res => {
                      // 更新列表
                      getAdminExec();
                      // 弹框提示删除成功
                      Swal.fire({
                          title: '删除成功！',
                          icon: 'success'
                      })
                  })
              }
          })
      }
  };
  
  ```

  

## 24 登录并显示账号名

* `src/controllers/login.js` 控制

  ```js
  import toastr from 'toastr';
  // 导入模板
  import loginV from  '@/views/login';
  // 导入api函数
  import {postLogin} from '../api/login';
  
  // 执行登录的函数
  const postLoginExec = event => {
      // 阻止默认行为
      event.preventDefault();
  
      // 获取表单数据
      const adminName = document.loginForm.adminName.value.trim();
      const passWord = document.loginForm.passWord.value.trim();
  
      // 账号不能为空
      if (adminName.length === 0) {
          toastr.error('请填写管理员账号！');
          return;
      }
  
      // 密码不能为空
      if (passWord.length === 0) {
          toastr.error('密码不能为空！');
          return;
      }
  
      // 使用后端API 发送数据执行登录
      postLogin({
          adminName,
          passWord
      })
      .then(res => {
          // 将用户信息记录到 localStorage
          localStorage.setItem('adminName', adminName);
          // 跳转管理员列表页
          router.go('/index/admin');
      });
  }
  
  export default (req, res) => {
      // 渲染模板
      res.render(loginV());
  
      // 给表单监听提交事件
      document.loginForm.addEventListener('submit', postLoginExec)
  }
  ```

* `src/views/login.ejs` 模板文件

  ```javascript
  <div class="wrapper">
      <div class="login-page">
          <div class="login-box">
              <!-- /.login-logo -->
              <div class="card">
                  <div class="card-body login-card-body">
                      <p class="login-box-msg">尚硅谷广告后台管理系统</p>
                      <form name="loginForm">
                          <div class="input-group mb-3">
                              <input name="adminName" type="text" class="form-control" placeholder="管理员账号">
                              <div class="input-group-append">
                                  <div class="input-group-text">
                                      <span class="fas fa-user"></span>
                                  </div>
                              </div>
                          </div>
                          <div class="input-group mb-3">
                              <input name="passWord" type="password" class="form-control" placeholder="请输入密码">
                              <div class="input-group-append">
                                  <div class="input-group-text">
                                      <span class="fas fa-lock"></span>
                                  </div>
                              </div>
                          </div>
                          <div class="row">
                              <!-- /.col -->
                              <div class="col-12">
                                  <button type="submit" id="loginBtn" class="btn btn-primary btn-block">登陆</button>
                              </div>
                              <!-- /.col -->
                          </div>
                      </form>
                  </div>
                  <!-- /.login-card-body -->
              </div>
          </div>
      </div>
  
  </div>
  ```

* `src/api/login.js` API

  ```js
  // 导入实例
  import advServer from '../request/advserver';
  
  export const postLogin = body => {
      return advServer.post('/login', body);
  }
  ```

* 显示管理员账号名 `src/components/Sidebar.ejs`

  ```javascript
  <!-- Sidebar user panel (optional) -->
  <div class="user-panel mt-3 pb-3 mb-3 d-flex">
      <div class="info">
      	<a href="#" class="d-block">欢迎您：<%= localStorage.getItem('adminName') %></a>
      </div>
  ```

  



## 25 登录验证和退出登录

* 退出登录按钮所在的组件 `src/components/Header.ejs`

  ```ejs
  <nav class="main-header navbar navbar-expand navbar-white navbar-light">
      <!-- Left navbar links -->
      <ul class="navbar-nav">
          <li class="nav-item">
              <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
          </li>
      </ul>
      <!-- Right navbar links -->
      <ul class="navbar-nav ml-auto">
          <li class="nav-item">
              <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="javascript:;" role="button">
                  <button type="button" id="logoutBtn" class="btn btn-block btn-danger btn-sm">退出登陆</button>
              </a>
          </li>
      </ul>
  </nav>
  ```

* `src/controllers/index`  该控制器导入了 Header 组件

  ```js
  // 导入组件
  import HeaderComponent from '@/components/Header'; 
  import SidebarComponent from '@/components/Sidebar'; 
  import FooterComponent from '@/components/Footer'; 
  import ContentComponent from '@/components/Content'; 
  
  // 导入模板
  import indexV from  '@/views/index';
  
  // 导入路由配置对象
  import routes from '../routes';
  
  export default ({url}, res, next) => {
  
      // next函数可以 让二级路由的页面内容 呈现该该路由页面内容的内部
      next(indexV({
          // 页头组件
          Header: HeaderComponent(),
          // 侧边栏组件
          Sidebar: SidebarComponent({
              url,
              routes
          }),
          // 页脚组件
          Footer: FooterComponent(),
          // 主要内容组件
          Content: ContentComponent({
              title: routes.find(item=>item.path===url).title,
              subRouteContent: res.subRoute()
          }),
      }));
  
      // 点击退出登录按钮
      document.querySelector('#logoutBtn').addEventListener('click', () => {
          // 清空 localStorage
          localStorage.clear();
          // 跳转到登录页面
          router.go('/login');
      });
  }
  ```

* 全局验证是否登录，如果没有登录，跳转到登录页 `src/app.js`

  ```js
  ...
  // 如果没有登录 跳转到登录页
  if (!localStorage.getItem('adminName')) {
      router.go('/login');
  }
  
  // 遍历路由配置 设置路由
  routes.forEach(routeItem => {
      router.route(routeItem.path, routeItem.element);
  })
  ```

  

## 26 使用 token 完善登录机制

**前端 token 的使用步骤：**

```javascript
1. 登录之后，后端会创建 token 并响应给前端
2. 前端需要将 token 进行存储，localStorage或者sessionStorage或cookie
3. 以后，前端的每次请求，都在请求头里携带token， 如果没有token或者是无效的token，后端不会做出正确的响应
4. 退出登录，删除本地存储的 token
注意：token有时效率，超时会变无效token
```

```javascript
{
	ok: -2
	msg: '登录异常，请求重新登录'
}
```

* `src/controllers/login.js`

  ```js
  import toastr from 'toastr';
  // 导入模板
  import loginV from  '@/views/login';
  // 导入api函数
  import {postLogin} from '../api/login';
  
  // 执行登录的函数
  const postLoginExec = event => {
      // 阻止默认行为
      event.preventDefault();
  
      // 获取表单数据
      const adminName = document.loginForm.adminName.value.trim();
      const passWord = document.loginForm.passWord.value.trim();
  
      // 账号不能为空
      if (adminName.length === 0) {
          toastr.error('请填写管理员账号！');
          return;
      }
  
      // 密码不能为空
      if (passWord.length === 0) {
          toastr.error('密码不能为空！');
          return;
      }
  
      // 使用后端API 发送数据执行登录
      postLogin({
          adminName,
          passWord
      })
      .then(res => {
          console.log(res);
  
          // 将用户信息和用户名记录到 localStorage
          localStorage.setItem('adminName', adminName);
          localStorage.setItem('token', res.token);
  
          // 跳转管理员列表页
          router.go('/index/admin');
      });
  }
  
  export default (req, res) => {
      // 渲染模板
      res.render(loginV());
  
      // 给表单监听提交事件
      document.loginForm.addEventListener('submit', postLoginExec)
  }
  ```

* `src/request/advserver.js`

  ```js
  // 导入 axios
  import axios from 'axios';
  import toastr from 'toastr';
  
  // 创建 axios 实例
  const advServer = axios.create({
      baseURL: '/api',
      timeout: 5000
  });
  
  // 给实例添加请求拦截器
  advServer.interceptors.request.use(config => {
      // 如果localStorage中有token，就添加到请求头
      if (localStorage.getItem('token')) {
          config.headers.token = localStorage.getItem('token');
      }
      return config;
  });
  
  
  // 给 实例设置响应拦截器
  advServer.interceptors.response.use(res => {
      if (res.data.ok === -1) {
          toastr.error(res.data.msg);
          // 返回不改变状态的 Promise，执行链结束了
          return new Promise(()=>{});
      }
  
      if (res.data.ok === -2) {
          toastr.error(res.data.msg);
          // 跳转到 登录页
          router.go('/login');
          // 清空localStorage
          localStorage.clear();
          // 返回不改变状态的 Promise，执行链结束了
          return new Promise(()=>{});
      }
  
      return res.data;
  
  }, error => {
      toastr.error('请求错误！');
      // 返回不改变状态的 Promise，执行链结束了
      return new Promise(()=>{});
  });
  
  // 暴露实例
  export default advServer;
  ```

  

## 27 添加广告：图片预览

* `src/controllers/adv.js`

  ```js
  // 导入模板页面
  import advV from  '@/views/adv';
  
  // 执行图片预览
  const prevImgExec = function() {
      // 获取file对象
      const file = this.files[0];
  
      // 判断
      if (!file) {
          return;
      }
  
      // 实例化 FilerReader
      const reader = new FileReader()
  
      // 将文件读取成 base64 编码的形式  异步
      reader.readAsDataURL(file);
  
      // 获取预览图元素
      const preImgEle = document.querySelector('#preImg');
  
      // 监听读取完毕
      reader.onload = () => {
          // 将 base64编码的图片作为 src 属性的值
         preImgEle.src = reader.result;
         preImgEle.style.display = 'block';
      }
  }
  
  export default (req, res) => {
      // 渲染页面
      res.render(advV());
  
      // 给图片上传input监听change事件，实现图片实时预览
      document.querySelector('#advPic').addEventListener('change', prevImgExec);
  }
  ```

* `src/views/adv.ejs`

  ```javascript
  <div class="col-sm-10 custom-file">
      <!--可以选择多个文件上传-->
      <!--<input multiple type="file" class="form-control" name="advPic" id="advPic">-->
      <!--  可以选择一个文件上传-->
      <input type="file" class="form-control" name="advPic" id="advPic"> </div>
  </div>
  
  ```



## 28 使用后端API添加广告

* `src/api/adv.js`

  ```js
  // 导入实例
  import advServer from '../request/advserver';
  
  export const postAdv = formdata => {
      return advServer.post('/adv', formdata)
  }
  ```

* `src/controllers/adv.js`

  ```js
  import toastr from 'toastr';
  // 导入模板页面
  import advV from  '@/views/adv';
  // 导入api函数
  import {postAdv} from '../api/adv';
  
  // 创建变量 记录预览图元素
  let preImgEle;
  
  // 执行图片预览
  const prevImgExec = function() {
      // 获取file对象
      const file = this.files[0];
  
      // 判断
      if (!file) {
          return;
      }
  
      // 实例化 FilerReader
      const reader = new FileReader()
  
      // 将文件读取成 base64 编码的形式  异步
      reader.readAsDataURL(file);
  
      // 监听读取完毕
      reader.onload = () => {
          // 将 base64编码的图片作为 src 属性的值
         preImgEle.src = reader.result;
         preImgEle.style.display = 'block';
      }
  }
  
  // 执行广告添加
  const addAdvExec = async event => {
      // 阻止默认行为
      event.preventDefault();
  
      // 创建 FomrData 对象，以 form元素作为参数
      const fd = new FormData(document.addAdvForm);
  
      // 利用纯数组进行判断
      const fdArr = Array.from(fd);
      if (!fdArr.every(item => item[1])) {
          toastr.error('请将表单填写完整！');
          return;
      }
  
      if (fd.get('advPic').size === 0) {
          toastr.error('请选择要上传的图片！');
          return;
      }
  
      // 使用后端API添加广告
      const res = await  postAdv(fd)
     
      console.log(res);
  
      // 模态框关闭
      $('#advModal').modal('hide');
      // 表单清空
      document.addAdvForm.reset();
      // 隐藏预览图
      preImgEle.style.display = 'none';
      // 更新列表
  }
  
  export default (req, res) => {
      // 渲染页面
      res.render(advV());
  
      // 获取预览图元素
      preImgEle = document.querySelector('#preImg');
  
      // 给图片上传input监听change事件，实现图片实时预览
      document.querySelector('#advPic').addEventListener('change', prevImgExec);
  
      // 给表单监听提交事件
      document.addAdvForm.addEventListener('submit', addAdvExec);
  }
  ```

  



## 29 获取广告列表

* `src/api/adv.js`

  ```js
  // 导入实例
  import advServer from '../request/advserver';
  
  // 添加广告
  export const postAdv = formdata => {
      return advServer.post('/adv', formdata)
  }
  
  // 获取广告列表
  export const getAdv = (pageNo, pageSize, keyword) => {
      return advServer.get('/adv', {
          params: {
              pageNo,
              pageSize,
              keyword
          }
      })
  }
  ```

* `src/controllers/adv.js`

  ```js
  import toastr from 'toastr';
  // 导入模板页面
  import advV from  '@/views/adv';
  // 导入组件
  import AdvTableComponent from '../components/AdvTable';
  // 导入api函数
  import {postAdv, getAdv} from '../api/adv';
  
  // 创建变量 记录预览图元素
  let preImgEle;
  
  // 执行获取广告列表并渲染页面
  const getAdvExec = async () => {
      // 定义广告类型的描述   1：轮播图广告 2：轮播图底部广告 3：热门回收广告 4：优品精选广告
      const advTypeDes = {
          1: '轮播图广告',
          2: '轮播图底部广告',
          3: '热门回收广告',
          4: '优品精选广告'
      };
  
      // 调用后端API获取数据
      const {data} = await getAdv();
      //console.log(res);
  
      // 将数据传入组件
      document.querySelector('#advTable').innerHTML = AdvTableComponent({
          advList:data,
          advTypeDes
      });
  };
  
  // 执行图片预览
  const prevImgExec = function() {
      // 获取file对象
      const file = this.files[0];
  
      // 判断
      if (!file) {
          return;
      }
  
      // 实例化 FilerReader
      const reader = new FileReader()
  
      // 将文件读取成 base64 编码的形式  异步
      reader.readAsDataURL(file);
  
      // 监听读取完毕
      reader.onload = () => {
          // 将 base64编码的图片作为 src 属性的值
         preImgEle.src = reader.result;
         preImgEle.style.display = 'block';
      }
  }
  
  // 执行广告添加
  const addAdvExec = async event => {
      // 阻止默认行为
      event.preventDefault();
  
      // 创建 FomrData 对象，以 form元素作为参数
      const fd = new FormData(document.addAdvForm);
  
      // 利用纯数组进行判断
      const fdArr = Array.from(fd);
      if (!fdArr.every(item => item[1])) {
          toastr.error('请将表单填写完整！');
          return;
      }
  
      if (fd.get('advPic').size === 0) {
          toastr.error('请选择要上传的图片！');
          return;
      }
  
      // 使用后端API添加广告
      const res = await  postAdv(fd)
     
      console.log(res);
  
      // 模态框关闭
      $('#advModal').modal('hide');
      // 表单清空
      document.addAdvForm.reset();
      // 隐藏预览图
      preImgEle.style.display = 'none';
      // 更新列表
      getAdvExec();
  }
  
  export default (req, res) => {
      // 渲染页面
      res.render(advV());
  
      // 获取广告列表并渲染到页面
      getAdvExec();
  
      // 获取预览图元素
      preImgEle = document.querySelector('#preImg');
  
      // 给图片上传input监听change事件，实现图片实时预览
      document.querySelector('#advPic').addEventListener('change', prevImgExec);
  
      // 给表单监听提交事件
      document.addAdvForm.addEventListener('submit', addAdvExec);
  }
  ```

* `src/views/adv.ejs`

  ```ejs
  <div id="__sub-route-view">
      <div class="card">
          <div class="card-header">
              <button type="button" id="addAdvBtn" class="btn btn-primary" data-toggle="modal"
                  data-target="#advModal">添加广告</button>
              <div class="card-tools">
                  <div class="input-group input-group-md">
                      <input type="text" class="form-control" id="keyword" placeholder="搜索关键字">
                      <div class="input-group-append">
                          <div class="btn btn-primary" id="searchAdv">
                              <i class="fas fa-search"></i>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          
          <div id="advTable"></div>
  
          
      </div>
  
      <div class="modal fade show" id="advModal" style="padding-right: 17px;" aria-modal="true" role="dialog">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <h4 class="modal-title">添加广告</h4>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">×</span>
                      </button>
                  </div>
                  <form name="addAdvForm" class="form-horizontal" id="addAdvForm">
                      <div class="card-body">
                          <div class="form-group row">
                              <label class="col-sm-2 col-form-label" for="advTitle">标题：</label>
                              <div class="col-sm-10">
                                  <input id="advTitle" name="advTitle" type="text" class="form-control" placeholder="请输入广告标题">
                              </div>
                          </div>
                          <div class="form-group row">
                              <label class="col-sm-2 col-form-label" for="advType">类别:</label>
                              <div class="col-sm-10">
                                  <select name="advType" id="advType" class="form-control">
                                      <option value="1">轮播图广告</option>
                                      <option value="2">轮播图底部广告</option>
                                      <option value="3">热门回收广告</option>
                                      <option value="4">优品精选广告</option>
                                  </select>
                              </div>
                          </div>
                          <div class="form-group row">
                              <label class="col-sm-2 col-form-label" for="advHref">链接：</label>
                              <div class="col-sm-10">
                                  <input id="advHref" name="advHref" type="text" class="form-control" placeholder="请输入广告链接">
                              </div>
                          </div>
                          <div class="form-group row">
                              <label class="col-sm-2 col-form-label" for="orderNum">排序：</label>
                              <div class="col-sm-10">
                                  <input id="orderNum" name="orderNum" type="text" class="form-control"
                                      placeholder="请输入广告排序，数字越大越靠前">
                              </div>
                          </div>
  
  
                          <div class="form-group row">
                              <label class="col-sm-2 col-form-label" for="advPic">图片：</label>
                              <div class="col-sm-10 custom-file">
                                  <!--  可以选择多个文件上传                          -->
                                  <!--  <input multiple type="file" class="form-control" name="advPic" id="advPic">-->
                                  <!--  可以选择一个文件上传                          -->
                                  <input type="file" class="form-control" name="advPic" id="advPic">
                              </div>
                          </div>
                          <div>
                              <img style="display: none;" id="preImg" height="100">
                          </div>
  
                      </div>
                  </form>
                  <div class="modal-footer justify-content-between">
                      <button type="button" class="btn btn-default" id="adv-cancel" data-dismiss="modal">取消</button>
                      <button type="submit" class="btn btn-primary" id="adv-save" form="addAdvForm">提交</button>
                  </div>
              </div>
              <!-- /.modal-content -->
          </div>
          <!-- /.modal-dialog -->
      </div>
  </div>
  ```

* `src/components/AdvTable.ejs`

  ```ejs
  <div class="card-body table-responsive">
      <table id="" class="table table-bordered">
          <thead>
              <tr>
                  <th>标题</th>
                  <th>图片</th>
                  <th>类别</th>
                  <th>链接</th>
                  <th>排序</th>
                  <th>添加时间</th>
                  <th>修改时间</th>
                  <th>操作</th>
              </tr>
          </thead>
          <tbody>
              <% data.advList.forEach(advItem => { %>
                  <tr>
                      <td><%= advItem.advTitle %></td>
                      <td><img height="80" src="/api/<%= advItem.advPic %>" alt="">
                      </td>
                      <td><%= data.advTypeDes[advItem.advType] %></td>
                      <td><%= advItem.advHref %></td>
                      <td><%= advItem.orderNum %></td>
                      <td><%= advItem.addTime %></td>
                      <td><%= advItem.upTime %></td>
                      <td>
                          <button type="button" class="btn btn-danger btn-sm">删除</button>
                          <button type="button" data-id="<%= advItem._id %>" class="btn btn-success btn-sm btn-edit">修改</button>
                      </td>
                  </tr>
              <% }) %>
          </tbody>
      </table>
  </div>
  <div class="card-footer clearfix" id="pageDiv">
      <ul class="pagination pagination-sm m-0 float-right">
          <li class="page-item"><a href="javascript:;" data-i="0" class="page-link">«</a></li>
  
          <li class="page-item active">
              <a class="page-link" data-i="1" href="javascript:;">1</a>
          </li>
  
  
          <li class="page-item"><a href="javascript:;" data-i="2" class="page-link">»</a></li>
      </ul>
  </div>
  ```

  

## 30 分页

* `src/controllers/adv.js`

  ```js
  import toastr from 'toastr';
  // 导入模板页面
  import advV from  '@/views/adv';
  // 导入组件
  import AdvTableComponent from '../components/AdvTable';
  // 导入api函数
  import {postAdv, getAdv} from '../api/adv';
  
  // 创建变量 记录预览图元素
  let preImgEle;
  
  // 执行获取广告列表并渲染页面
  const getAdvExec = async (no=1, size=3) => {
      // 定义广告类型的描述   1：轮播图广告 2：轮播图底部广告 3：热门回收广告 4：优品精选广告
      const advTypeDes = {
          1: '轮播图广告',
          2: '轮播图底部广告',
          3: '热门回收广告',
          4: '优品精选广告'
      };
  
      // 调用后端API获取数据
      const {data, pageNo, pageSum} = await getAdv(no, size);
      //console.log(res);
  
      // 将数据传入组件
      document.querySelector('#advTable').innerHTML = AdvTableComponent({
          advList:data,
          advTypeDes,
          pageNo,
          pageSum
      });
  };
  
  // 执行分页渲染的函数
  const setPageExec = event => {
      // 判断是否是分页按钮
      if (event.target.classList.contains('page-link')) {
          getAdvExec(event.target.dataset.i);
      }
  }
  
  // 执行图片预览
  const prevImgExec = function() {
      // 获取file对象
      const file = this.files[0];
  
      // 判断
      if (!file) {
          return;
      }
  
      // 实例化 FilerReader
      const reader = new FileReader()
  
      // 将文件读取成 base64 编码的形式  异步
      reader.readAsDataURL(file);
  
      // 监听读取完毕
      reader.onload = () => {
          // 将 base64编码的图片作为 src 属性的值
         preImgEle.src = reader.result;
         preImgEle.style.display = 'block';
      }
  }
  
  // 执行广告添加
  const addAdvExec = async event => {
      // 阻止默认行为
      event.preventDefault();
  
      // 创建 FomrData 对象，以 form元素作为参数
      const fd = new FormData(document.addAdvForm);
  
      // 利用纯数组进行判断
      const fdArr = Array.from(fd);
      if (!fdArr.every(item => item[1])) {
          toastr.error('请将表单填写完整！');
          return;
      }
  
      if (fd.get('advPic').size === 0) {
          toastr.error('请选择要上传的图片！');
          return;
      }
  
      // 使用后端API添加广告
      const res = await  postAdv(fd)
     
      console.log(res);
  
      // 模态框关闭
      $('#advModal').modal('hide');
      // 表单清空
      document.addAdvForm.reset();
      // 隐藏预览图
      preImgEle.style.display = 'none';
      // 更新列表
      getAdvExec();
  }
  
  export default (req, res) => {
      // 渲染页面
      res.render(advV());
  
      // 获取广告列表并渲染到页面
      getAdvExec();
  
      // 点击分页按钮 事件委托
      document.querySelector('#advTable').addEventListener('click', setPageExec);
  
      // 获取预览图元素
      preImgEle = document.querySelector('#preImg');
  
      // 给图片上传input监听change事件，实现图片实时预览
      document.querySelector('#advPic').addEventListener('change', prevImgExec);
  
      // 给表单监听提交事件
      document.addAdvForm.addEventListener('submit', addAdvExec);
  }
  ```

* `src/components/AdvTable.ejs`

  ```ejs
  <div class="card-body table-responsive">
      <table id="" class="table table-bordered">
          <thead>
              <tr>
                  <th>标题</th>
                  <th>图片</th>
                  <th>类别</th>
                  <th>链接</th>
                  <th>排序</th>
                  <th>添加时间</th>
                  <th>修改时间</th>
                  <th>操作</th>
              </tr>
          </thead>
          <tbody>
              <% data.advList.forEach(advItem => { %>
                  <tr>
                      <td><%= advItem.advTitle %></td>
                      <td><img height="80" src="/api/<%= advItem.advPic %>" alt="">
                      </td>
                      <td><%= data.advTypeDes[advItem.advType] %></td>
                      <td><%= advItem.advHref %></td>
                      <td><%= advItem.orderNum %></td>
                      <td><%= advItem.addTime %></td>
                      <td><%= advItem.upTime %></td>
                      <td>
                          <button type="button" class="btn btn-danger btn-sm">删除</button>
                          <button type="button" data-id="<%= advItem._id %>" class="btn btn-success btn-sm btn-edit">修改</button>
                      </td>
                  </tr>
              <% }) %>
          </tbody>
      </table>
  </div>
  <div class="card-footer clearfix" id="pageDiv">
      <ul class="pagination pagination-sm m-0 float-right">
          <li class="page-item">
              <a href="javascript:;" data-i="<%= data.pageNo - 1 %>" class="page-link">«</a>
          </li>
  
          <% for (let i = 1; i <= data.pageSum; i ++) { %> 
              <li class="page-item <%= data.pageNo === i ? 'active' : '' %>">
                  <a class="page-link" data-i="<%= i %>" href="javascript:;"><%= i %></a>
              </li>
          <% } %>
  
          <li class="page-item">
              <a href="javascript:;" data-i="<%= data.pageNo + 1 %>" class="page-link">»</a>
          </li>
      </ul>
  </div>
  ```

  

## 31 搜索

* `src/controllers/adv.js`

  ```js
  import toastr from 'toastr';
  // 导入模板页面
  import advV from  '@/views/adv';
  // 导入组件
  import AdvTableComponent from '../components/AdvTable';
  // 导入api函数
  import {postAdv, getAdv} from '../api/adv';
  
  // 创建变量 记录预览图元素
  let preImgEle;
  
  // 执行获取广告列表并渲染页面
  const getAdvExec = async (no=1, size=3) => {
      console.log(no);
  
      // 定义广告类型的描述   1：轮播图广告 2：轮播图底部广告 3：热门回收广告 4：优品精选广告
      const advTypeDes = {
          1: '轮播图广告',
          2: '轮播图底部广告',
          3: '热门回收广告',
          4: '优品精选广告'
      };
  
      // 获取搜索框中的数据
      const kw = document.querySelector('#keyword').value.trim();
      // 调用后端API获取数据
      const {data, pageNo, pageSum} = await getAdv(no, size, kw);
      //console.log(res);
  
      // 将数据传入组件
      document.querySelector('#advTable').innerHTML = AdvTableComponent({
          advList:data,
          advTypeDes,
          pageNo,
          pageSum
      });
  };
  
  // 执行分页渲染的函数
  const setPageExec = event => {
      // 判断是否是分页按钮
      if (event.target.classList.contains('page-link')) {
          getAdvExec(event.target.dataset.i);
      }
  }
  
  // 执行图片预览
  const prevImgExec = function() {
      // 获取file对象
      const file = this.files[0];
  
      // 判断
      if (!file) {
          return;
      }
  
      // 实例化 FilerReader
      const reader = new FileReader()
  
      // 将文件读取成 base64 编码的形式  异步
      reader.readAsDataURL(file);
  
      // 监听读取完毕
      reader.onload = () => {
          // 将 base64编码的图片作为 src 属性的值
         preImgEle.src = reader.result;
         preImgEle.style.display = 'block';
      }
  }
  
  // 执行广告添加
  const addAdvExec = async event => {
      // 阻止默认行为
      event.preventDefault();
  
      // 创建 FomrData 对象，以 form元素作为参数
      const fd = new FormData(document.addAdvForm);
  
      // 利用纯数组进行判断
      const fdArr = Array.from(fd);
      if (!fdArr.every(item => item[1])) {
          toastr.error('请将表单填写完整！');
          return;
      }
  
      if (fd.get('advPic').size === 0) {
          toastr.error('请选择要上传的图片！');
          return;
      }
  
      // 使用后端API添加广告
      const res = await  postAdv(fd)
     
      console.log(res);
  
      // 模态框关闭
      $('#advModal').modal('hide');
      // 表单清空
      document.addAdvForm.reset();
      // 隐藏预览图
      preImgEle.style.display = 'none';
      // 清空搜索框
      document.querySelector('#keyword').value = '';
      // 更新列表
      getAdvExec();
  }
  
  export default (req, res) => {
      // 渲染页面
      res.render(advV());
  
      // 获取广告列表并渲染到页面
      getAdvExec();
  
      // 点击分页按钮 事件委托
      document.querySelector('#advTable').addEventListener('click', setPageExec);
  
      // 点击搜索按钮
      document.querySelector('#searchAdvBtn').addEventListener('click', () => {
          getAdvExec();
      });
  
      // 获取预览图元素
      preImgEle = document.querySelector('#preImg');
  
      // 给图片上传input监听change事件，实现图片实时预览
      document.querySelector('#advPic').addEventListener('change', prevImgExec);
  
      // 给表单监听提交事件
      document.addAdvForm.addEventListener('submit', addAdvExec);
  }
  ```

  ``src/views/adv.ejs`

```html
<div class="input-group input-group-md">
<input type="text" class="form-control" id="keyword" placeholder="搜索关键字">
    <div class="input-group-append">
        <div class="btn btn-primary" id="searchAdvBtn">
            <i class="fas fa-search"></i>
        </div>
    </div>
</div>
```



## 32 打开修改广告的模态框和添加广告的模态框

* `src/api/adv.js`

  ```js
  // 导入实例
  import advServer from '../request/advserver';
  
  // 添加广告
  export const postAdv = formdata => {
      return advServer.post('/adv', formdata)
  }
  
  // 获取广告列表
  export const getAdv = (pageNo, pageSize, keyword) => {
      return advServer.get('/adv', {
          params: {
              pageNo,
              pageSize,
              keyword
          }
      })
  }
  
  // 根据id获取广告信息
  export const getAdvById = id => {
      return advServer.get('/adv/'+id);
  }
  ```

* `src/controllers/adv.js`

  ```js
  import toastr from 'toastr';
  // 导入模板页面
  import advV from  '@/views/adv';
  // 导入组件
  import AdvTableComponent from '../components/AdvTable';
  // 导入api函数
  import {postAdv, getAdv, getAdvById} from '../api/adv';
  
  // 创建变量 记录预览图元素
  let preImgEle;
  
  // 执行获取广告列表并渲染页面
  const getAdvExec = async (no=1, size=3) => {
      console.log(no);
  
      // 定义广告类型的描述   1：轮播图广告 2：轮播图底部广告 3：热门回收广告 4：优品精选广告
      const advTypeDes = {
          1: '轮播图广告',
          2: '轮播图底部广告',
          3: '热门回收广告',
          4: '优品精选广告'
      };
  
      // 获取搜索框中的数据
      const kw = document.querySelector('#keyword').value.trim();
      // 调用后端API获取数据
      const {data, pageNo, pageSum} = await getAdv(no, size, kw);
      //console.log(res);
  
      // 将数据传入组件
      document.querySelector('#advTable').innerHTML = AdvTableComponent({
          advList:data,
          advTypeDes,
          pageNo,
          pageSum
      });
  };
  
  // 执行分页渲染的函数
  const setPageExec = event => {
      // 判断是否是分页按钮
      if (event.target.classList.contains('page-link')) {
          getAdvExec(event.target.dataset.i);
      }
  }
  
  // 打开添加广告的模态框
  const openAddModalExec = () => {
      // 清空表单
      document.addAdvForm.reset();
      // 隐藏预览图
      preImgEle.style.display = 'none';
      // 修改标题
      document.querySelector('#advModal .modal-title').innerHTML = '添加广告';
      // 打开模态框
      $('#advModal').modal('show');
  }
  
  // 打开修改广告的模态框 获取当前广告的详细信息，
  const openEditModalExec = async event => {
      // 判断点击是修改按钮
      if (event.target.classList.contains('btn-edit')) {
          // 获取该条广告的信息
          const {data} = await getAdvById(event.target.dataset.id);
  
          // 将广告信息显示在表单里，作为表单控件的默认值
          document.addAdvForm.advTitle.value = data.advTitle;
          document.addAdvForm.advType.value = data.advType;
          document.addAdvForm.advHref.value = data.advHref;
          document.addAdvForm.orderNum.value = data.orderNum;
          // 显示预览图
          preImgEle.style.display = 'block';
          preImgEle.src = '/api/' + data.advPic;
          // 修改模态框标题
          document.querySelector('#advModal .modal-title').innerHTML = '修改广告';
  
          // 打开模态框
          $('#advModal').modal('show');
      }   
  
    
  
  }
  
  // 执行图片预览
  const prevImgExec = function() {
      // 获取file对象
      const file = this.files[0];
  
      // 判断
      if (!file) {
          return;
      }
  
      // 实例化 FilerReader
      const reader = new FileReader()
  
      // 将文件读取成 base64 编码的形式  异步
      reader.readAsDataURL(file);
  
      // 监听读取完毕
      reader.onload = () => {
          // 将 base64编码的图片作为 src 属性的值
         preImgEle.src = reader.result;
         preImgEle.style.display = 'block';
      }
  }
  
  // 执行广告添加
  const addAdvExec = async event => {
      // 阻止默认行为
      event.preventDefault();
  
      // 创建 FomrData 对象，以 form元素作为参数
      const fd = new FormData(document.addAdvForm);
  
      // 利用纯数组进行判断
      const fdArr = Array.from(fd);
      if (!fdArr.every(item => item[1])) {
          toastr.error('请将表单填写完整！');
          return;
      }
  
      if (fd.get('advPic').size === 0) {
          toastr.error('请选择要上传的图片！');
          return;
      }
  
      // 使用后端API添加广告
      const res = await  postAdv(fd)
     
      console.log(res);
  
      // 模态框关闭
      $('#advModal').modal('hide');
      // 表单清空
      document.addAdvForm.reset();
      // 隐藏预览图
      preImgEle.style.display = 'none';
      // 清空搜索框
      document.querySelector('#keyword').value = '';
      // 更新列表
      getAdvExec();
  }
  
  export default (req, res) => {
      // 渲染页面
      res.render(advV());
  
      // 获取广告列表并渲染到页面
      getAdvExec();
  
      // 点击分页按钮 事件委托
      document.querySelector('#advTable').addEventListener('click', setPageExec);
  
      // 点击搜索按钮
      document.querySelector('#searchAdvBtn').addEventListener('click', () => {
          getAdvExec();
      });
  
      // 点击添加广告的按钮
      document.querySelector('#addAdvBtn').addEventListener('click', openAddModalExec);
  
      // 点击表格中的修改按钮 事件委托
      document.querySelector('#advTable').addEventListener('click', openEditModalExec);
  
      // 获取预览图元素
      preImgEle = document.querySelector('#preImg');
  
      // 给图片上传input监听change事件，实现图片实时预览
      document.querySelector('#advPic').addEventListener('change', prevImgExec);
  
      
      // 给表单监听提交事件
      document.addAdvForm.addEventListener('submit', addAdvExec);
  }
  ```

* `src/views/adv.ejs`

  ```ejs
  <div id="__sub-route-view">
      ...
      <div id="advTable"></div>
  </div>
  
  ```

  

## 33 执行修改或者添加

```javascript
1. 根据formdata中id是否有值作为判断依据，有值修改，无值添加
```

* `src/api/adv.js`

* ```javascript
  // 修改广告
  export const putAdv = formdata => {
      return advServer.put('/adv', formdata);
  }
  ```

  

* `src/controllers/adv.js`

  ```js
  import toastr from 'toastr';
  // 导入模板页面
  import advV from  '@/views/adv';
  // 导入组件
  import AdvTableComponent from '../components/AdvTable';
  // 导入api函数
  import {postAdv, getAdv, getAdvById, putAdv} from '../api/adv';
  
  // 创建变量 记录预览图元素
  let preImgEle;
  
  // 执行获取广告列表并渲染页面
  const getAdvExec = async (no=1, size=3) => {
      // 定义广告类型的描述   1：轮播图广告 2：轮播图底部广告 3：热门回收广告 4：优品精选广告
      const advTypeDes = {
          1: '轮播图广告',
          2: '轮播图底部广告',
          3: '热门回收广告',
          4: '优品精选广告'
      };
  
      // 获取搜索框中的数据
      const kw = document.querySelector('#keyword').value.trim();
      // 调用后端API获取数据
      const {data, pageNo, pageSum} = await getAdv(no, size, kw);
      //console.log(res);
  
      // 将数据传入组件
      document.querySelector('#advTable').innerHTML = AdvTableComponent({
          advList:data,
          advTypeDes,
          pageNo,
          pageSum
      });
  };
  
  // 执行分页渲染的函数
  const setPageExec = event => {
      // 判断是否是分页按钮
      if (event.target.classList.contains('page-link')) {
          getAdvExec(event.target.dataset.i);
      }
  }
  
  // 打开添加广告的模态框
  const openAddModalExec = () => {
      // 清空表单
      document.addAdvForm.reset();
      // 清空隐藏域
      document.addAdvForm.id.value = '';
      // 隐藏预览图
      preImgEle.style.display = 'none';
      // 修改标题
      document.querySelector('#advModal .modal-title').innerHTML = '添加广告';
      // 打开模态框
      $('#advModal').modal('show');
  }
  
  // 打开修改广告的模态框 获取当前广告的详细信息，
  const openEditModalExec = async event => {
      // 判断点击是修改按钮
      if (event.target.classList.contains('btn-edit')) {
          // 获取该条广告的信息
          const {data} = await getAdvById(event.target.dataset.id);
  
          // 将广告信息显示在表单里，作为表单控件的默认值
          document.addAdvForm.advTitle.value = data.advTitle;
          document.addAdvForm.id.value = data._id;
          document.addAdvForm.advType.value = data.advType;
          document.addAdvForm.advHref.value = data.advHref;
          document.addAdvForm.orderNum.value = data.orderNum;
          // 显示预览图
          preImgEle.style.display = 'block';
          preImgEle.src = '/api/' + data.advPic;
          // 修改模态框标题
          document.querySelector('#advModal .modal-title').innerHTML = '修改广告';
  
          // 打开模态框
          $('#advModal').modal('show');
      }   
  
    
  
  }
  
  // 执行图片预览
  const prevImgExec = function() {
      // 获取file对象
      const file = this.files[0];
  
      // 判断
      if (!file) {
          return;
      }
  
      // 实例化 FilerReader
      const reader = new FileReader()
  
      // 将文件读取成 base64 编码的形式  异步
      reader.readAsDataURL(file);
  
      // 监听读取完毕
      reader.onload = () => {
          // 将 base64编码的图片作为 src 属性的值
         preImgEle.src = reader.result;
         preImgEle.style.display = 'block';
      }
  }
  
  // 执行广告添加或修改
  const addAdvExec = async event => {
      // 阻止默认行为
      event.preventDefault();
  
      // 创建 FomrData 对象，以 form元素作为参数
      const fd = new FormData(document.addAdvForm);
  
      // 如果表单内容中有id
      if ((fd.get('id'))) {
          // 执行修改
          await putAdv(fd);
          toastr.success('修改成功！');
      } else {
          // 执行添加
          // 将 id 从fd中删除
          fd.delete('id');
          // 利用纯数组进行判断
          const fdArr = Array.from(fd);
          if (!fdArr.every(item => item[1])) {
              toastr.error('请将表单填写完整！');
              return;
          }
  
          if (fd.get('advPic').size === 0) {
              toastr.error('请选择要上传的图片！');
              return;
          }
  
          // 使用后端API添加广告
          await postAdv(fd)
          toastr.success('添加成功！');
      }
  
  
      // 模态框关闭
      $('#advModal').modal('hide');
      // 表单清空
      document.addAdvForm.reset();
      // 隐藏预览图
      preImgEle.style.display = 'none';
      // 清空搜索框
      document.querySelector('#keyword').value = '';
      // 更新列表
      getAdvExec();
  }
  
  export default (req, res) => {
      // 渲染页面
      res.render(advV());
  
      // 获取广告列表并渲染到页面
      getAdvExec();
  
      // 点击分页按钮 事件委托
      document.querySelector('#advTable').addEventListener('click', setPageExec);
  
      // 点击搜索按钮
      document.querySelector('#searchAdvBtn').addEventListener('click', () => {
          getAdvExec();
      });
  
      // 点击添加广告的按钮
      document.querySelector('#addAdvBtn').addEventListener('click', openAddModalExec);
  
      // 点击表格中的修改按钮 事件委托
      document.querySelector('#advTable').addEventListener('click', openEditModalExec);
  
      // 获取预览图元素
      preImgEle = document.querySelector('#preImg');
  
      // 给图片上传input监听change事件，实现图片实时预览
      document.querySelector('#advPic').addEventListener('change', prevImgExec);
  
      // 给表单监听提交事件 添加或修改
      document.addAdvForm.addEventListener('submit', addAdvExec);
  }
  ```

* `src/views/adv.ejs`  表单中添加隐藏域  `<input type=hidden name="" value="">`

  ```ejs
  <form name="addAdvForm" class="form-horizontal" id="addAdvForm">
      <!-- 隐藏域 -->
      <input type="hidden" name="id" value="">
      ...
  </form>    
  ```

  



## 34 打包 生产模式下配置

* 安装依赖

  ```shell
  npm i mini-css-extract-plugin -D
  npm i css-minimizer-webpack-plugin -D
  ```

  

* 生产配置 `config/webpack.prod.config.js`  抽离css并压缩

  ```js
  const MiniCssExtractPlugin = require("mini-css-extract-plugin");
  const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
  const {merge} = require('webpack-merge');
  const baseConfig = require('./webpack.base.config');
  
  module.exports = merge(baseConfig, {
      // loaders
      module: {
          rules: [
              {
                  test: /\.less$/,
                  use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
              },
              {
                  test: /\.css$/,
                  use: [MiniCssExtractPlugin.loader, 'css-loader']
              }
          ]
      },
  
      // 插件
      plugins: [
          new MiniCssExtractPlugin({
              filename: 'css/main.[hash:12].css'
          })
      ],  
  
      optimization: {
      minimizer: [
          // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
          `...`,
          new CssMinimizerPlugin(),
      ],
      },
  
      // 模式
      mode: 'production',
  
      // sourceMap
      devtool:'source-map',
  })
  ```



* 开发配置 `config/webpack.dev.config.js`

  ```js
  const {merge} = require('webpack-merge');
  const baseConfig = require('./webpack.base.config');
  
  module.exports = merge(baseConfig, {
  
      // 模式
      mode: 'development',
  
      // sourceMap
      devtool:'cheap-module-source-map',
  
  
      // 自动开启服务
      devServer: {
          host: 'shirly.com',
          port: '80',
          open: true,
          // 开发中，允许前端路由使用 history 模式
          historyApiFallback: true,
  
          proxy: {
              // 默认替换方式：/api/admin  -> http://127.0.0.1:8088/api/admin
              // '/api': 'http://127.0.0.1:8088'
  
            
              '/api': {
                  target: 'http://127.0.0.1:8088',
  
                  // /api/admin  -> http://127.0.0.1:8088/admin  去掉 /api
                  pathRewrite: { '^/api': ''},
  
                  // 默认值请求中 Host  http://shirly.com
                  // 设置为 true  请求头 Host http://127.0.0.1:8088
                  changeOrigin: true,
              }
  
          }
      }
  })
  ```

  



## 35 生产模式和开发模式使用不同的 baseURL

```html
后端服务地址： http://api.fuming.site:54254/
代理服务器地址： /api
```

* DefinePlugin默认的插件

* ```javascript
  const webpack = require ('webpack');
  ```

  

* 开发配置 `config/webpack.dev.config.js`

  ```js
  plugins: [
       new webpack.DefinePlugin({
           // SERVICE_URL: "/api" ，后边的默认是代码片段 /api 会执行，然后报错，经过stringify处理会转为 字符串，SERVICE_URL: 全局变量
           SERVICE_URL: JSON.stringify('/api')
       })
  ],
  
  // 模式
  mode: 'development',
  ```

* 生产配置 `config/webpack.prod.config.js`

  ```js
   // 插件
      plugins: [
        	// SERVICE_URL: 全局变量
          new webpack.DefinePlugin({
              SERVICE_URL: JSON.stringify('http://api.fuming.site:54254')
          })
      ],  
  ```

* 项目中使用 `src/request/advserver.js`

  ```js
  // 导入 axios
  import axios from 'axios';
  import toastr from 'toastr';
  
  // 创建 axios 实例
  const advServer = axios.create({
      baseURL: SERVICE_URL,
      timeout: 5000
  });
  
  // 给实例添加请求拦截器
  advServer.interceptors.request.use(config => {
      // 如果localStorage中有token，就添加到请求头
      if (localStorage.getItem('token')) {
          config.headers.token = localStorage.getItem('token');
      }
      return config;
  });
  
  
  // 给 实例设置响应拦截器
  advServer.interceptors.response.use(res => {
      if (res.data.ok === -1) {
          toastr.error(res.data.msg);
          // 返回不改变状态的 Promise，执行链结束了
          return new Promise(()=>{});
      }
  
      if (res.data.ok === -2) {
          toastr.error(res.data.msg);
          // 跳转到 登录页
          router.go('/login');
          // 清空localStorage
          localStorage.clear();
          // 返回不改变状态的 Promise，执行链结束了
          return new Promise(()=>{});
      }
  
      return res.data;
  
  }, error => {
      toastr.error('请求错误！');
      // 返回不改变状态的 Promise，执行链结束了
      return new Promise(()=>{});
  });
  
  // 暴露实例
  export default advServer;
  ```

`src/AdvTable.ejs`

```javascript
<td><%= advItem.advTitle %></td>
      <td><img height="80" src="SERVICE_URL/<%= advItem.advPic %>" alt="">
```



## 36 部署上线

```javascript
1. 将输出目录中的东西上传至前端静态资源服务
   示例地址： http://adv.manage.fuming.site
   该静态资源服务器使用nginx搭建
   
2. 在后端服务器允许跨域， 允许前端静态资源服务器的协议、域名、端口 http://adv.manage.fuming.site

3. 在前端静态资源服务器配置，允许history模式

4. node后端 linux管理工具 pm2 list，部署后端

5. 更改nginx配置文件：前端history路由，nginx设置

try_files $uri /index.html
```

![image-20240520142606633](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240520142606633.png)



# 附录

功能需求分析

```javascript
管理员列表

添加管理员

删除管理员

修改密码（扩展）

登录

广告列表

添加广告

修改广告

删除广告（扩展）
```



# 后端API 文档

后端程序源码获取 https://gitee.com/sh230320/backend_project

## [获取管理员列表]

请求地址：/admin

请求方式：GET

请求参数：无

响应体类型：`application/json`

响应结果示例（成功）

```json
{
	"ok": 1,
	"data": [
		{
			"_id": "648a159c4d6466fa02cbd9c7",
			"adminName": "xiaowang",
			"passWord": "2f9d236cc82263310be1131d0d13d6c3",
			"regTime": "2023-06-15 03:31:40",
			"lastLoginTime": "2023-06-15 03:31:40"
		},
        {
			"_id": "648a159c4d6466fa02cbd9c7",
			"adminName": "xiaowang",
			"passWord": "2f9d236cc82263310be1131d0d13d6c3",
			"regTime": "2023-06-15 03:31:40",
			"lastLoginTime": "2023-06-15 03:31:40"
		},
		...
	]
}
```

响应结果示例（失败）

```json
{
	"ok": -1,
	"msg": "数据获取失败"
}
```



## [添加管理员]

请求地址：/admin

请求方式：POST

请求体类型：`application/json`

请求体示例：

```json
{
    "adminName":"shirly",
    "passWord":"123123"
}
```

响应体类型：`application/json`

响应结果示例（成功）

```json
{
    "ok":1,
    "msg":"添加管理员成功"
}
```

响应结果示例（失败）

```json
{
	"ok": -1,
	"msg": "管理员账号已经存在！"
}
```



## [删除管理员]

请求地址：/admin/:id

请求方式：DELETE

说明：需要在路径中指定ID

响应体类型：`application/json`

响应结果示例（成功）

```json
{
	"ok": 1,
	"msg": "删除成功"
}
```

响应结果示例（失败）

```json
{
	"ok": -1,
	"msg": "删除失败"
}
```



## [修改管理员密码]

请求地址：/changepwd

请求方式：PATCH

请求体类型：`application/json`

请求体示例：

```json
{
    "id": "648a159c4d6466fa02cbd9c7",
    "oldPwd":"123456",
    "newPwd":"123123"
}
```

响应体类型：`application/json`

响应结果示例（成功）

```json
{
	"ok": 1,
	"msg": "修改成功"
}
```

响应结果示例（失败）

```json
{
	"ok": -1,
	"msg": "修改失败"
}
```





## [登陆]

请求地址：/login

请求方式：POST

请求体类型：`application/json`

请求体示例：

```js
{
    "adminName":"管理员账号"
	"passWord":"管理员密码"
}
```

响应体类型：`application/json`

响应结果示例（成功）

```json
{
	"ok": 1,
	"msg": "登陆成功",
	"token": "token信息"
}
```

响应结果示例（失败）

```json
{
	"ok": -1,
	"msg": "账号或密码错误"
}
```



## [获取广告列表]

请求地址：/adv

请求方式：GET

请求参数

```shell
pageNo:指定页码，如果不传，默认是1
pageSize:每页显示的条数，如果不传，默认是3
keyword:搜索的关键词，如果不传，默认是空字符
```

响应体类型：`application/json`

响应结果示例（成功）

```json
{
	"ok": 1,
	"data": [
		{
			"_id": "6485dae7721b3e41fb8aeb20",
			"advTitle": "小米平板2",
			"advHref": "http://www.xiaomi.com/product/121212.html",
			"orderNum": 1212,
			"advPic": "2023/06/11/2c29e4c12ba5953776e2eaf00.jpg",
			"advType": 1,
			"addTime": "2023-06-11 22:32:07",
			"upTime": "2023-06-11 22:35:07"
		},
		...
	],
	"pageNo": 1,   // 当前的页码
	"pageSum": 2   // 总页数
}
```

响应结果示例（失败）

```json
{
	"ok": -1,
	"msg": "数据获取失败"
}
```



## [根据 ID 获取广告信息]

请求地址：/adv/:id

请求方式：GET

说明：需要在路径中指定ID

响应体类型：`application/json`

响应结果示例（成功）

```json
{
	"ok": 1,
	"data": {
		"_id": "6485dae7721b3e41fb8aeb20",
		"advTitle": "莱斯来说广告",
		"advHref": "http://atguigu.com",
		"orderNum": 1212,
		"advPic": "2023/06/11/2c29e4c12ba5953776e2eaf00.jpg",
		"advType": 1,
		"addTime": "2023-06-11 22:32:07",
		"upTime": "2023-06-11 22:35:07"
	}
}
```

响应结果示例（失败）

```json
{
	"ok": -1,
	"msg": "数据获取失败"
}
```





## [添加广告]

请求地址：/adv

请求方式：POST   

请求体类型：`multipart/form-data`

请求体字段要求：

```js
advTitle: 广告名称
advType: 广告类型   1：轮播图广告 2：轮播图底部广告 3：热门回收广告 4：优品精选广告
advHref: 广告链接
orderNum: 排序编号
advPic: （图片的二进制数据）
```

响应体类型：`application/json`

响应结果示例（成功）

```json
{
    "ok":1,
    "msg":"添加成功"
}
```

响应结果示例（失败）

```json
{
	"ok": -1,
	"msg": "添加失败"
}
```



## [修改广告]

请求地址：/adv

请求方式：PUT   

请求体类型：`multipart/form-data`

请求体字段要求：

```js
id：需要指定ID
advTitle: 广告名称
advType: 广告类型   1：轮播图广告 2：轮播图底部广告 3：热门回收广告 4：
advHref: 广告链接
orderNum: 排序编号
advPic: （图片的二进制数据）
```

响应体类型：`application/json`

响应结果示例（成功）

```json
{
    "ok":1,
    "msg":"修改成功"
}
```

响应结果示例（失败）

```json
{
	"ok": -1,
	"msg": "修改失败"
}
```



## [删除广告]

请求地址：adv/:id

请求方式：DELETE

说明：需要在路径中指定ID

响应体类型：`application/json`

响应结果示例（成功）

```json
{
	"ok": 1,
	"msg": "删除成功"
}
```

响应结果示例（失败）

```json
{
	"ok": -1,
	"msg": "删除失败"
}
```



## [token 验证失败]

token 验证失败返回的响应结果如下：

```json
{
	"ok": -2
	"msg": '登录异常，请求重新登录'
}
```





项目目录结构分析

```javascript
19-axios二次封装
 ┣ config
 ┃ ┣ webpack.base.config.js
 ┃ ┣ webpack.dev.config.js
 ┃ ┗ webpack.prod.config.js
 ┣ src
 ┃ ┣ api
 ┃ ┃ ┣ admin.js
 ┃ ┃ ┣ adv.js
 ┃ ┃ ┗ login.js
 ┃ ┣ assets
 ┃ ┃ ┗ less
 ┃ ┃ ┃ ┗ app.less
 ┃ ┣ components
 ┃ ┃ ┣ Content.ejs
 ┃ ┃ ┣ Footer.ejs
 ┃ ┃ ┣ Header.ejs
 ┃ ┃ ┗ Sidebar.ejs
 ┃ ┣ controllers
 ┃ ┃ ┣ admin.js
 ┃ ┃ ┣ adv.js
 ┃ ┃ ┣ index.js
 ┃ ┃ ┗ login.js
 ┃ ┣ request
 ┃ ┃ ┗ advserver.js
 ┃ ┣ routes
 ┃ ┃ ┗ index.js
 ┃ ┣ views
 ┃ ┃ ┣ admin.ejs
 ┃ ┃ ┣ adv.ejs
 ┃ ┃ ┣ index.ejs
 ┃ ┃ ┗ login.ejs
 ┃ ┗ app.js
 ┣ package-lock.json
 ┗ package.json


```

结构图

![image-20240513165346643](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240513165346643.png)

项目结构1

![image-20240513165411902](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240513165411902.png)

项目结构2

![image-20240513174531109](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240513174531109.png)



项目结构3

![image-20240521145319490](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240521145319490.png)