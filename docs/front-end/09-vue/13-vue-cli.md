# Vue脚手架

```javascript
1. Vue脚手架是Vue官方提供的标准化开发工具（开发平台）。它简化了程序员基于webpack创建工程化的Vue项目过程。

2. 最新的版本是`5.x`。

3. 文档: https://cli.vuejs.org/zh/。

Vue CLI 致力于将 Vue 生态中的工具基础标准化。
它确保了各种构建工具能够基于智能的默认配置即可平稳衔接，这样你可以专注在撰写应用上，而不必花好几天去纠结配置的问题。
与此同时，它也为每个工具提供了调整配置的灵活性，无需 eject。
```

## 入门使用

### 安装

```javascript
CLI:Command Line Interface 命令行接口
@vue/cli 是一个全局安装的 npm 包，提供了终端里的 vue 命令。
```

```bash
// 安装命令
npm install -g @vue/cli
# OR
yarn global add @vue/cli

// 查看版本命令
vue --version
# OR
vue -V @vue/cli 5.0.8
```

### 创建项目

```bash
## 创建一个新项目
vue create first

## 选择自动配置还是手动配置，我们选择自动配置
Manually select features

## 选择插件 全选（a)   单选（空格）
babel、typscript、路由、Vuex、css预编译 

## 选择Vue版本
选择2.x

## 选择是否使用 history 风格的路由
输入y

## 选择 `css` 预编译
Less

## 选择各插件配置的保存方式:选择各个配置单独文件 
In dedicated config files

## 是否将这个配置保存下来:
选择N

## 执行依赖的下载
```

### 启动项目

```bash
## 进入项目目录
cd first

## 启动项目
yarn serve 或 npm run serve

## 浏览器查看
```

### 配置信息调整

```bash
C:\Users\zhangpeiyue\.vuerc 

{
  "useTaobaoRegistry": true,
  "packageManager": "yarn",
  "presets": {
    "230320": {
      "useConfigFiles": true,
      "plugins": {
        "@vue/cli-plugin-babel": {},
        "@vue/cli-plugin-router": {
          "historyMode": true
        },
        "@vue/cli-plugin-vuex": {}
      },
      "vueVersion": "2",
      "cssPreprocessor": "less"
    }
  }
}
```

### Vue开发配置文件

```javascript
const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
	// 是否将依赖包中的程序进行转换。（兼容低版本浏览器）
	transpileDependencies: true,
	// 配置开发服务
	devServer:{
		port:80,
		host:"zhangpeiyue.com",
		open:true,// 启动项目后会自动打开浏览器
	}
})
```

### 开放API

```javascript
https://i.maoyan.com/api/mmdb/movie/v3/list/hot.json?ct=上海&ci=10&channelId=4
https://api.github.com/search/repositories?q=r&sort=stars
https://api.github.com/search/users?q=r&sort=stars
```

### 组件命名

组件名称为大驼峰，不要用系统中命令常见的名称

方式1修改.eslintrc.js文件，关闭组件命名语法检查

```javascript
module.exports = {
    root: true,
    env: {
      node: true
    },
    'extends': [
      'plugin:vue/essential',
      'eslint:recommended'
    ],
    parserOptions: {
      parser: '@babel/eslint-parser'
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
       //在rules中添加自定义规则
       //关闭组件命名规则
       "vue/multi-word-component-names":"off",
    },
    overrides: [
      {
        files: [
          '**/__tests__/*.{j,t}s?(x)',
          '**/tests/unit/**/*.spec.{j,t}s?(x)'
        ],
        env: {
          jest: true
        }
      }
    ]
  }
```

方式2：修改Vue项目主配置文件vue.config.js文件

```javascript
const { defineConfig } = require('@vue/cli-service')
	module.exports = defineConfig({
	  transpileDependencies: true,
	  lintOnSave:false  //关闭语法检查
	})
```



## 项目结构

```bash
├── node_modules 
├── public
│   ├── favicon.ico: 页签图标
│	├── bootstrap.css: 第三方的CSS样式
│   └── index.html: 主页面
├── src
│   ├── assets: 存放静态资源
│   │   └── logo.png
│   │── components: 存放组件
│   │   └── HelloWorld.vue
│   │── App.vue: 汇总所有组件
│   │── main.js: 入口文件
├── .gitignore: git版本管制忽略的配置
├── babel.config.js: babel的配置文件
├── jsconfig.json: js配置文件
├── package.json: 应用包配置文件 
├── vue.config.js: vue配置文件
├── README.md: 应用描述文件
├── package-lock.json：包版本控制文件
```

## 入口文件

src->main.js

```javascript
import Vue from 'vue'
import App from './App.vue'

// Vue调试信息提示
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

```



## 组件的使用

### 单文件组件

```bash
组件的命名: 首字母大写
组件内分为三层
	结构层-<template> 
		不允许省略
		有且只能有一个根元素
	逻辑层-<script> 
		正常js代码处理逻辑
	样式层-<style> 
		lang="less"属性 ：css预处理为less，
    	scoped 属性：设置css为局部的，不会影响其他组件（原理是自动设置data-v-hash自定义属性）
```

src->App.vue主组件

```vue
<!--
    结构层-不允许省略
    有且只能是一个根元素
-->
<template>
    <div>
        <h3 @click="num++">APP:{{num}}</h3>
        <hr/>
        <Child :num="num"></Child>
    </div>
</template>

<!--逻辑层-->
<script>
import Child from "@/components/Child";
export default {
    name: "App",
    data(){
        return {
            num:1
        }
    },
    // 设置子组件
    components:{
        Child
    }
}
</script>

<!--样式层-->
<style lang="less" scoped>
    div{
        h3{
            color:red;
        }
    }
</style>
```

src->Child.vue子组件

```vue
<template>
    <div>
        <h3>Child:{{num}}</h3>
    </div>
</template>

<script>
export default {
    name: "Child",
    // props:["num"],
    props:{
        num:{
            type:Number,
            default:100
        }
    },
    beforeCreate() {
        console.log("1-beforeCreate");
    },
    created(){
        console.log("2-created");
    },
    beforeMount() {
        console.log("3-beforeMount");
    },
    mounted(){
        console.log("4-mounted");
    },
    beforeUpdate() {
        console.log("1-beforeUpdate");
    },
    updated(){
        console.log("2-updated");
    }

}
</script>

<style scoped>
    h3{
        color:green;
    }
</style>
```

src->main.js主入口文件

```javascript
// 导入Vue构造函数对象
import Vue from "vue";
// 导入App对象，主组件
import App from "@/App";
// 创建Vue实例
new Vue({
    // 渲染主组件视图
	render:h=>h(App)
    // 挂载到public->index.html的app标签上
}).$mount("#app");
```

public->index.html

```javascript
<div id="app"></div>
<!-- built files will be auto injected -->
</body>
```

### Vscode组件插件

```bash

```



## 过滤器的使用

过滤器在Vue-cli脚手架上的使用

### 全局过滤器

方式1：放在入口文件中(src->main.js)使用，并且放在new Vue(){...}代码前使用。

```javascript
// src->main.js
Vue.filter("date",function(t){
 	const timer = new Date(t);
 	return timer.getFullYear() + "-" +
 		(timer.getMonth() + 1).toString().padStart(2, 0) + "-" +
 		timer.getDate().toString().padStart(2, 0) + " " +
 		timer.getHours().toString().padStart(2, 0) + ":" +
 		timer.getMinutes().toString().padStart(2, 0) + ":" +
 		timer.getSeconds().toString().padStart(2, 0);
 });
 Vue.filter("currency",function(v,n=2,type="$"){
 	return type+v.toFixed(n);
 })
```

方式2：抽离到文件夹中模块化使用(src->filters->index.js)

```javascript
// src->main.js
import filters from "@/filters";
 for(let key in filters){
 	Vue.filter(key,filters[key]);
 }
```

```javascript
// src->filters->index.js
export default {
	date(t){
		const timer = new Date(t);
		return timer.getFullYear() + "-" +
			(timer.getMonth() + 1).toString().padStart(2, 0) + "-" +
			timer.getDate().toString().padStart(2, 0) + " " +
			timer.getHours().toString().padStart(2, 0) + ":" +
			timer.getMinutes().toString().padStart(2, 0) + ":" +
			timer.getSeconds().toString().padStart(2, 0);
	},
	currency(v,n=2,type="$"){
		return type+v.toFixed(n);
	}
}
```

### 局部过滤器

在哪个组中注册的，只允许在哪个组件中使用

```javascript
// src->App.vue
filters:{
    date(t){
        const timer = new Date(t);
        return timer.getFullYear() + "-" +
            (timer.getMonth() + 1).toString().padStart(2, 0) + "-" +
            timer.getDate().toString().padStart(2, 0) + " " +
            timer.getHours().toString().padStart(2, 0) + ":" +
            timer.getMinutes().toString().padStart(2, 0) + ":" +
            timer.getSeconds().toString().padStart(2, 0);
    },
        currency(v,n=2,type="$"){
            return type+v.toFixed(n);
        }
}
```



### 作为插件安装到Vue(全局)

方式1：定义一个过滤器对象并暴漏一个函数，然后在入口文件把过滤器插件安装到全局Vue构造函数中

src->filters->index.js

```javascript
// src->filters->index.js
// 定义一个对象
const filters = {
	date(t){
		const timer = new Date(t);
		return timer.getFullYear() + "-" +
			(timer.getMonth() + 1).toString().padStart(2, 0) + "-" +
			timer.getDate().toString().padStart(2, 0) + " " +
			timer.getHours().toString().padStart(2, 0) + ":" +
			timer.getMinutes().toString().padStart(2, 0) + ":" +
			timer.getSeconds().toString().padStart(2, 0);
	},
	currency(v,n=2,type="$"){
		return type+v.toFixed(n);
	}
};
// 暴漏一个函数 fun(Vue){...}
export default function(V){
	for(let key in filters){
		V.filter(key,filters[key]);
	}
}
```

src->main.js

```javascript
// src->main.js
// 导入Vue构造函数对象
import Vue from "vue";
// 导入APP主组件
import App from "@/App";
// 导入过滤器对象
import filters from "@/filters";

// 安装过滤器插件
// filters的两种类型：
// 1- 如果filters暴漏是一个对象，Vue.use会调用对象下的install方法，并传递Vue
// 2- 如果filters暴漏是一个函数，会直接调用该函数，并传递Vue
Vue.use(filters);
```

方式2：定义一个过滤器对象并暴漏一个对象，然后在入口文件把过滤器插件安装到全局Vue构造函数中

```javascript
// src->filters->index.js
// 定义一个对象
const filters = {
	date(t){
		const timer = new Date(t);
		return timer.getFullYear() + "-" +
			(timer.getMonth() + 1).toString().padStart(2, 0) + "-" +
			timer.getDate().toString().padStart(2, 0) + " " +
			timer.getHours().toString().padStart(2, 0) + ":" +
			timer.getMinutes().toString().padStart(2, 0) + ":" +
			timer.getSeconds().toString().padStart(2, 0);
	},
	currency(v,n=2,type="$"){
		return type+v.toFixed(n);
	},
    install(V) {
        for (let key in filters) {
            V.filter(key, filters[key]);
        }
    },
};
// 暴漏一个对象
export default filters;
```

入口文件通过插件形式安装过滤器到全局

```javascript
// src->main.js
// 导入Vue构造函数对象
import Vue from "vue";
// 导入APP主组件
import App from "@/App";
// 导入过滤器对象
import filters from "@/filters";

// 安装过滤器插件
// filters的两种类型：
// 1- 如果filters暴漏是一个对象，Vue.use会调用对象下的install方法，并传递参数Vue(构造函数)
// 2- 如果filters暴漏是一个函数，会直接调用该函数，并传递参数Vue(构造函数)
Vue.use(filters);
```



## axios的使用

### 安装axios插件

```bash
cnpm install axios
```

### 通过axios获取数据

```vue
// src->App.vue
<template>
    <div>
        <h3>App</h3>
    </div>
</template>

<script>
    // 导入axios对象
    import axios from "axios";
    // 暴漏
    export default {
        name: "App",
        data(){
            return {
                items:[]
            }
        },
        async mounted(){
            // 方式3 async await 函数
            const {data} = await axios.get("https://api.github.com/search/repositories",{
                params: {
                    q: "r",
                    sort: "stars"
                }
            });
    		this.items = data.items;
        }
    }
</script>

<style scoped>

</style>
```

### axios加载中

src->App.vue

```vue
<template>
    <div>
        <h3>App</h3>
        <h3 v-if="isLoading">正在拼命加载中……</h3>
        <h3 v-else-if="isError">产生异常，请稍后再试……</h3>
        <template v-else>
            <div v-for="item in items" :key="item.id">
                <p>{{item.full_name}}</p>
            </div>
        </template>
    </div>
</template>

<script>
import axios from "axios";
export default {
    name: "App",
    data(){
        return {
            items:[],
            isLoading:true,
            isError:false,// 是否有异常
        }
    },
    async mounted(){
        try{
            const {data} = await  axios.get("https://api.github.com/search/repositories",{
                params: {
                    q: "r",
                    sort: "stars"
                }
            });
            this.items = data.items;
            this.isLoading = false;
        }catch (err){
            this.isLoading = false;
            this.isError= true;
        }
    }
}
</script>

<style scoped>

</style>
```

### axios封装

方式一：将axios信息抽离到src->request->index.js，然后使用把axios用插件安装到Vue中

src->request->index.js

```javascript
// src->request->index.js
// 导入axios对象
import axios from "axios";
// 设置baseURL
axios.defaults.baseURL = "https://api.github.com";
// 设置拦截器
axios.interceptors.response.use(res=>{
    // 放行
	return res.data;
});
// 暴漏数据，暴漏一个函数
export default function(Vue){
    // 把axios对象设置为Vue实例的$axios属性
	Vue.prototype.$axios = axios;
}
```

src-main.js

```javascript
// src-main.js
import Vue from "vue";
import App from "@/App";
import axios from "@/request/index";
new Vue({
	render:h=>h(App),
	beforeCreate() {
        // 安装axios插件
		Vue.use(axios);
	}
}).$mount("#app");
```

src->App.vue

```vue
<template>
    <div>
        <h3>App</h3>
        <h3 v-if="isLoading">正在拼命加载中……</h3>
        <h3 v-else-if="isError">产生异常，请稍后再试……</h3>
        <template v-else>
            <div v-for="item in items" :key="item.id">
                <p>{{item.full_name}}</p>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    name: "App",
    data(){
        return {
            items:[],
            isLoading:true,
            isError:false,// 是否有异常
        }
    },
    async mounted(){
        try{
            const {items} = await this.$axios.get("/search/repositories",{
                params: {
                    q: "r",
                    sort: "stars"
                }
            });
            this.items = items;
            this.isLoading = false;
        }catch (err){
            this.isLoading = false;
            this.isError= true;
        }
    }
}
</script>

<style scoped>

</style>
```

方式二：将axios信息抽离到src->request->index.js，直接将暴漏的对象设置为Vue实例的属性$axios

```javascript
// src->request->index.js
import axios from "axios";
axios.defaults.baseURL = "https://api.github.com";
axios.interceptors.response.use(res=>{
	return res.data;
});
暴漏数据，暴漏一个对象
export default axios;
```

```javascript
// src-main.js
import Vue from "vue";
import App from "@/App";
import axios from "@/request/index";
new Vue({
	render:h=>h(App),
	beforeCreate() {
        // 将暴漏的对象设置为Vue实例的属性$axios
		Vue.prototype.$axios = axios;
	}
}).$mount("#app");
```

方式三：直接在src->main.js中设置axios对象

```javascript
// src-main.js
import Vue from "vue";
import App from "@/App";
import axios from "@/request/index";
new Vue({
	render:h=>h(App),
	beforeCreate() {
        axios.defaults.baseURL = "https://api.github.com";
		axios.interceptors.response.use(res=>{
			return res.data;
		})
		Vue.prototype.$axios = axios;
	}
}).$mount("#app");
```


