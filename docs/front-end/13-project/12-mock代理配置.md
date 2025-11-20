# Mock代理配置

Vite.config.ts中配置

```ts
// 设置代理服务器
		server: {
			proxy: {
				'/app-dev': {
					target: 'http://jdgz.xwydl.com:8310',
					// target: 'http://192.168.0.109:8310',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/app-dev/, ''),
				},
				'/app-prod': {
					target: 'env.VITE_API_URL',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/app-dev/, ''),
				},
				'/mock': {
					target: 'http://192.168.1.38:4060',
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/mock/, '/mock/11'),
				},
			}
		},
```

新增工具类 

mock-request.ts

```ts
import axios, { type AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import pinia from '@/stores/index';
import { useUserInfoStore } from '../stores/userInfo';

/* 定义response对象的data接口 */
interface ResponseData<T> {
	code: number;
	data: T;
	message: string;
}

// 配置新建一个 axios 实例
const service = axios.create({
	baseURL: '/mock',
	timeout: 50000,
});

// 添加请求拦截器
service.interceptors.request.use(
	(config:any) => {
		// 获取用户仓库
		const userInfo = useUserInfoStore(pinia)
		const token = userInfo.token
		// 请求头中添加token
		config.headers['X-Token'] = token
		// 返回请求配置项
		return config;
	}
);

// 添加响应拦截器
service.interceptors.response.use(
	/* 约束一下response */
	async (response: AxiosResponse<ResponseData<any>>) => {
		// 对响应数据简化数据
		const res = response.data;
		// 排除二进制响应
		if(response.config.responseType== "arraybuffer"){
			// 放行
			return response;
		}
		/* 成功数据的code值为0 */
		if (res.code !== 0) { 
			// 统一的错误提示
			ElMessage({
				message: (typeof res.data == 'string' && res.data) || res.message || 'Error',
				type: 'error',
				duration: 5 * 1000
			})

			// `token` 过期或者账号已在别处登录
			if (response.status === 401) {
				const storeUserInfo = useUserInfoStore(pinia)
				await storeUserInfo.reset()
				window.location.href = '/' // 去登录页
				ElMessageBox.alert('你已被登出，请重新登录', '提示', {})
					.then(() => { })
					.catch(() => { })
			}
			return Promise.reject(service.interceptors.response);
		} else {
			return res.data; /* 返回成功响应数据中的data属性数据 */
		}
	},
	(error) => {
		// 对响应错误做点什么
		if (error.message.indexOf('timeout') != -1) {
			ElMessage.error('网络超时');
		} else if (error.message == 'Network Error') {
			ElMessage.error('网络连接错误');
		} else {
			if (error.response.data) ElMessage.error(error.response.statusText);
			else ElMessage.error('接口路径找不到');
		}
		return Promise.reject(error);
	}
);

export default service;

```

在 api 中

device.ts

```ts
import request from '@/utils/request' // 生产
import mockrequest from '@/utils/mock-request' // mock

enum API {
    // 设备列表
    DEVICELIST = "/api/core/device/list",
    // 设备在线离线数量统计
    DEVICECNT = "/api/core/device/dash/count",
    // 设备告警日志(汇总前)
    DEVICEALARMLOG = "/api/core/device/dash/alarm/info",
}

// get+query 形式
export const reqDeviceCnt = (params: any) => request.get<any, any>(API.DEVICECNT, { params })

// get+path拼接形式
export const reqDeviceInfo = (id: number) => request.get<any, any>(API.DEVICEINFO + `/${id}`)

// post + body形式
export const reqDeviceCreate= (data:any) => request.post<any,any>(API.DEVICECREATE,data)

// post + query形式
export const reqNBInit = (params: any) => request.post<any, any>(API.NBINIT, null, { params })

// post + body + 设置请求头 head
export const reqDeviceUploadFirm = (data: any) => request.post<any, any>(API.DEVICEUPLOADFIRM, data, {
    headers: {
        'Content-Type': 'multipart/form-data;charset=utf-8'
    }
})

// get + quety + 设置响应头
export const reqDeviceDownFirm = (params: any) => request.get<any, any>(API.DEVICEDOWNFIRM, {
    params,
    responseType: 'blob'
})

// mock
export const reqNBInit = (params: any) => mockrequest.post<any, any>(API.NBINIT, null, { params })
```

## Uniapp H5端报错

```ts

设置别名

import { defineConfig } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';

export default defineConfig({
  plugins: [uni()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@dcloudio/uni-ui': path.resolve(__dirname, 'node_modules/@dcloudio/uni-ui')
    }
  }
});
```

升级uni ui

```ts
确保 uni-ui 最新版本
npm update @dcloudio/uni-ui
```

