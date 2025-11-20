# API

## uni拦截器

**uni.addInterceptor(name, interceptor)**

添加拦截器

| 名称        | 类型        | 必填 | 默认值 | 兼容性 | 描述                |
| :---------- | :---------- | :--- | :----- | :----: | :------------------ |
| name        | string      | 是   | -      |        | 需要拦截的 API 名称 |
| interceptor | Interceptor | 是   | -      |        | 拦截器              |

uni.removeInterceptor(name, interceptor?)

删除拦截器

| 名称        | 类型        | 必填 | 默认值 | 兼容性 | 描述                      |
| :---------- | :---------- | :--- | :----- | :----: | :------------------------ |
| name        | string      | 是   | -      |        | 需要删除拦截器的 API 名称 |
| interceptor | Interceptor | 否   | -      |        | 拦截器                    |

示例：

```ts
export const routeInterceptor = {
	install() {
		methodsToIntercept.forEach((method) => {
			uni.addInterceptor(method, {
				invoke: navigateToInterceptor,
			});
		});
	},
}

routeInterceptor 是一个对象，暴露了一个 install 方法。
它的功能是 批量为 uni-app 的路由方法添加拦截器。
这里 methodsToIntercept 是一个数组，存放了需要拦截的路由方法名称，如：
const methodsToIntercept = ['navigateTo', 'redirectTo', 'switchTab']
```

## install 方法名

在 Vue / UniApp 插件开发中，**`install` 是标准方法名**，用于插件的安装。

- 当你用 Vue 或 UniApp 插件机制注册时，会调用 `install`：

```ts
import { routeInterceptor } from './routeInterceptor.js'

// Vue 3
const app = createApp(App)
app.use(routeInterceptor)
```

内部原理：Vue 会自动调用 `routeInterceptor.install(app)`（如果对象有 `install` 方法）；这里你可以在 `install` 里做一些全局初始化操作，比如注册指令、添加全局方法、挂载插件功能。换句话说，`install()` 就是插件初始化逻辑的入口。

## 全局拦截器

代码解析

```ts
// import { useUserInfoStore } from '@/store/user';

// request拦截器
export const requestInterceptor = () => {
	// const userInfoStore = useUserInfoStore();
	// 添加请求和响应拦截器
	uni.addInterceptor('request', {
		invoke(args) {
			// 请求前的处理，如添加 token
			// const token = uni.getStorageSync('TOKEN');
			// if (token) {
			// 	args.header = {
			// 		...args.header,
			// 		Authorization: `Bearer ${token}`,
			// 	};
			// }
			console.log("请求拦截:",args)
			return args;
		},
		success(response) {
			// 响应后的处理，如统一处理错误码
			console.log("响应拦截:",response)
			if (response.data.code === 401) {
				// uni.showToast({
				// 	title: '登录已过期，请重新登录',
				// 	icon: 'none',
				// });
				// // 可以跳转到登录页面
				// uni.redirectTo({ url: '/pages/login/login' });
				// 自动重新登陆
				// if(userInfoStore.username && userInfoStore.passwd){
				// 	userInfoStore.silentLogin()
				// }
			}
			return response;
		},
		fail(err) {
			// 请求失败的处理
			uni.showToast({
				title: '请求失败，请检查网络',
				icon: 'none',
			});
			console.warn('err',err)
			return Promise.reject(err);
		},
	});
}
```

```
uni.addInterceptor(methodName, interceptorObj)
```

- **methodName**：要拦截的 uni-app 方法名，比如：
  - `'request'` → HTTP 请求（`uni.request`）
  - `'navigateTo'` → 页面跳转
  - `'showToast'` → 弹框
- **interceptorObj**：拦截器对象，里面可以包含：
  - `invoke(args)`：方法调用前执行
  - `success(res)`：调用成功后执行
  - `fail(err)`：调用失败后执行
  - `complete(res)`：调用完成后执行（无论成功或失败）

> 所以你写的 `requestInterceptor` 其实是给 `uni.request` 添加了 **全局前置和后置钩子**。

假设调用 `uni.request`

```ts
uni.request({
  url: 'https://api.example.com/user',
  method: 'GET',
  data: { id: 1 }
})
```

实际执行顺序如下：

1. **调用前** → `invoke`
   - 拦截器先执行 `invoke(args)`
   - 可以修改请求参数（比如添加 token、headers）
   - `return args` 后，才会真正发出请求
   - 如果返回 `false` 或不返回 args，可以阻止请求
2. **请求成功** → `success`
   - 网络请求返回后，会触发 `success(response)`
   - 可以在这里统一处理业务错误码（如 `401` / `403`）
   - 也可以修改响应内容再返回给业务逻辑
3. **请求失败** → `fail`
   - 网络错误或者服务器无法访问时，会触发 `fail(err)`
   - 可以统一提示用户网络错误
4. **请求完成** → `complete`（可选）
   - 成功或失败都会触发

```ts
uni.addInterceptor('request', {
	invoke(args) {
		console.log("请求拦截:", args)
		return args; // 必须返回 args，才能继续请求
	},
	success(response) {
		console.log("响应拦截:", response)
		if (response.data.code === 401) {
			// 统一处理登录过期
		}
		return response; // 返回给业务逻辑
	},
	fail(err) {
		uni.showToast({ title: '请求失败', icon: 'none' });
		return Promise.reject(err); // 让业务逻辑 catch 到
	}
});
```

