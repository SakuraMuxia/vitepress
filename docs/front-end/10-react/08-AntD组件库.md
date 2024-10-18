# AntD组件库

## UI组件库简介

- 封装了一些通用的界面功能效果的组件，简化开发编码
- 流行的React UI组件库
  - 国内：`Ant Design` https://ant.design/index-cn
  - 国外：`Material UI` https://www.mdui.org/design

Antd是一个React中流行的UI组件库

## 基本使用

### 创建react项目(ts)

```ts
# npm 创建
create-react-app 项目名 --template typescript
create-react-app basetest --template typescript
# yarn 创建
yarn create react-app 项目名 --template typescript
```

### 启动项目

```ts
cd 项目名
npm start
```

### 安装antd

```ts
npm install antd --save

npm install @ant-design/icons // 增加图标
```

### AntD在ts项目使用

主组件：src->App.tsx

```tsx
import React from 'react'
import {Button, Table} from 'antd' //引入需要用的antd组件
import {SearchOutlined} from '@ant-design/icons' // 引入图标组件

export default function App() {
    return (
        <div>
            <Button type='primary'>按钮</Button>
        </div>
    )
}
```

### 定义主题文件

修改主题变量

通过 `theme` 中的 `token` 属性，可以修改一些主题变量。部分主题变量会引起其他主题变量的变化，我们把这些主题变量称为 Seed Token

```tsx
import { Button, ConfigProvider, Space } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        // Seed Token，影响范围大
        colorPrimary: '#00b96b',
        borderRadius: 2,

        // 派生变量，影响范围小
        colorBgContainer: '#f6ffed',
      },
    }}
  >
    <Space>
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
    </Space>
  </ConfigProvider>
);

export default App;
```



### 官方文档使用

[官方地址](https://ant.design/index-cn)

```shell
1. 点击 “组件” 选项卡
2. 找到想要使用的组件
3. 点击显示源代码，复制粘贴到自己的项目
4. 高级功能查看 api
```

## Table组件

antd中的Table组件中的属性介绍，这些可以在antd Table组件中的API章节看到官方详细的介绍

```ts
rowKey： 指定key值
columns : 配置列信息
	title：列头信息
  	dataIndex: 该列渲染数据源中的哪个字段
  	render: 自定义渲染内容
    	render(value, row, index)
      	value: 如果有dataIndex, 是dataIndex指定的字段值，如果没有dataIndex, 就是row，当前行对象
      	row：遍历的当前行对象
		index：索引
dataSource：渲染的列表数据源
```

### React在TS定义数据状态

```ts
React在TS项目中定义数据需要给数据状态添加类型，否则 在设置数据状态的时候，ts也不认识类型，报错。
示例：
let [current, setCurrent] = useState<number>(1);
```

### React在TS定义方法

```ts
React在TS项目中定义方法时需要给方法的变量和返回值添加类型。返回值可以省略(类型推断)
```

### React在TS定义数据源类型

```ts
/**
 * 定义dataSource数据源的类型
 */
interface IUserItem {
    id: number;
    name: string;
    age: number;
    address: string;
}

// 这里的数据是静态的，数据变化无法支持响应式
// data 数据  source 资源  数据资源，要渲染的表格数据
    const dataSource:IUserList = [
        {
            id: 1,
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            id: 2,
            name: '吴彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        }
    ];

```

**使用示例**

新建一个组件：src->component->TableTest.tsx

```tsx
import React from 'react'
import { Table, Button } from 'antd'
// 定义一个类型
import type { ColumnsType } from 'antd/es/table';
export default function TableTest() {
    // 这里的IUserItem泛型是给ColumnsType组件使用的，ColumnsType是antd定义的看不到怎么用
    // IUserItem他是确定每个数据中元素的格式
    const columns: ColumnsType<IUserItem> = [
        {
            title: '姓名', // title 属性是表头信息
            dataIndex: 'name', // 渲染dataSource数据源中的哪个字段[属性]
        },
        {
            title: '年龄',
            dataIndex: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
        },
        {
            // 自定义渲染内容
            title: '操作',
            /**
             * 
             * @param value  当前行对象
             *        当有dataIndex属性的时候， value就是dataIndex指定的字段值
             *        没有dataIndex属性的时候， value就是   当前行对象
             * @param row   当前行对象
             * @param index 索引
             * @returns 
             */
            dataIndex: 'name',
            render(value: string, row: IUserItem, index: number) { // 自定义该列显示的内容
                console.log('value: ', value);
                console.log('row: ', row);
                console.log('index: ', index);
                return (
                    <>
                        <Button type='primary' danger onClick={()=>{
                            // delete(row.id)
                        }}>删除</Button>
                    </>
                )
            }
        }
    ];

    /**
     * 定义dataSource数据源的类型
     */
    interface IUserItem {
        id: number;
        name: string;
        age: number;
        address: string;
    }
    type IUserList = IUserItem[]
    // data 数据  source 资源  数据资源，要渲染的表格数据
    const dataSource:IUserList = [
        {
            id: 1,
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            id: 2,
            name: '吴彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        }
    ];

    return (
        <div>
            <h3>Table组件</h3>
            <Table
                rowKey='id'  // 修改antd默认，指定key取值从属性名为'id'中获取
                columns={columns}
                dataSource={dataSource}
            />
        </div>
    )
}
```

### pagination分页

使用pagination实现分页功能：src->component->TableTest.tsx

> 给table组件添加pagination 属性，进行分页配置。
>
> 定义分页状态数据，添加onChange 事件回调，实现动态分页。

```ts
import React, { useState } from 'react'
import { Table, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table';


export default function TableTest() {
    // 这里的IUserItem泛型是给ColumnsType组件使用的，ColumnsType是antd定义的看不到怎么用
    // IUserItem他是确定每个数据中元素的格式
    const columns: ColumnsType<IUserItem> = [
        {
            title: '姓名', // title 属性是表头信息
            dataIndex: 'name', // 渲染dataSource数据源中的哪个字段[属性]
        },
        {
            title: '年龄',
            dataIndex: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
        },
        // 自定义渲染
        {
            title:'操作',
            dataIndex: 'age',
            render(text: number, record: IUserItem,index:number){
                return(
                    <>
                        <Button type='primary' danger onClick={()=>{
                            console.log('text',text)
                            console.log('record', record)
                            console.log('index', index)
                        }}>删除</Button>
                    </>
                )
            }

        }
    ]
    // 定义数据源的类型
    interface IUserItem {
        id: number;
        name: string;
        age: number;
        address: string;
    }
    // 定义一个数组类型
    type IUserList = IUserItem[]
    // 定义静态数据，不支持响应式
    const dataSource: IUserList = [
        {
            id: 1,
            name: '胡彦斌',
            age: 32,
            address: '西湖区湖底公园1号',
        },
        {
            id: 2,
            name: '吴彦祖',
            age: 42,
            address: '西湖区湖底公园1号',
        },
        {
            id: 3,
            name: '迪丽热巴',
            age: 42,
            address: '西湖区湖底公园1号',
        },
        {
            id: 4,
            name: '古力娜扎',
            age: 42,
            address: '西湖区湖底公园1号',
        },
        {
            id: 5,
            name: '佟丽娅',
            age: 42,
            address: '西湖区湖底公园1号',
        }
    ]
    // 设置分页相关状态,设置数据状态的类型
    let [current, setCurrent] = useState<number>(1);// 当前页
    let [pageSize, setPageSize] = useState<number>(2); // 每页几条
    let [total, setTotal] = useState<number>(5); // 总条数
    return (
        <div>
            <h3>Table组件</h3>
            <Table
                rowKey='id'  // 修改antd默认，指定key取值从属性名为'id'中获取
                columns={columns}
                dataSource={dataSource}
                // 使用pagination实现分页功能
                pagination={{
                    current, // 当前页
                    pageSize, // 每页显示几条 
                    total,// 总条数
                    showQuickJumper: true, // 快速跳转
                    showSizeChanger: true, // 每页显示几条下拉框
                    pageSizeOptions: [2, 3, 5, 10], // 下拉框选项
                    // 总条数自定义显示
                    showTotal: (total: number) => {
                        return (
                            <div>
                                总体条数是: <span style={{ color: 'red' }}>{total}</span>
                            </div>
                        )
                    },
                    // 监听Change事件
                    onChange:(page:number,pageSize:number)=>{
                        // 设置页码
                        setCurrent(page);
                        setPageSize(pageSize);
                    }
                }}
            />
        </div>
    )
}
```

## axios的使用(ts)

> :warning:  ts类型检查是在编译阶段，当代码在运行阶段时，ts语法检查就管不到了。

### 基本环境

```shell
# 安装
npm i axios
# 二次封装
src/http/index.ts
# 发送请求api函数
src/api/github.ts
```

### 问题

```ts
问：
为什么设置了接口，axios返回的数据中存在多余的属性却不报错
答：
ts类型检查是在编译阶段，当代码在运行阶段时，ts语法检查就管不到了。


注意：ts是在编译阶段进行语法检查，是代码执行之前会进行的检查，但发送ajax回来的数据结构是在代码执行之后，所以想要使用请求回来的数据，需要提前定义好数据类型，通过泛型参数，告诉给ts，axios响应回来的数据类型，否则，ts会报错
```

### 使用步骤

```shell
在ts中发送请求的步骤如下：

1. 查看接口：请求方式、url、参数、响应数据[后面定义类型的依据]
2. 封装api函数：
   1. 定义类型：请求参数类型、响应数据类型(重要)
   2. 定义函数：请求方法中通过泛型传递参数
3. 调用api函数
   1. 生命周期钩子中调用
   2. 事件回调中调用
4. 渲染页面：
   1. 修改数据状态：状态数据要传递类型，通过泛型传递
   2. 重置状态，进行渲染
```

#### 封装request请求

定义github请求的全局配置文件

src/http/index.ts

```ts
import axios from 'axios';

// 1. 基础配置
const request = axios.create({
    baseURL:'https://api.github.com',
    timeout:20000
})

// 2. 配置拦截器

// 请求拦截器
request.interceptors.request.use(config=>{

    return config;
})

// 响应拦截器
request.interceptors.response.use(response=>{

    return response.data;
})
export default request;
```

#### 封装api函数

api请求函数需要传递泛型，比如

```ts
request.get<any, 响应体类型>
request.post<any,响应体类型>
request.delete<any,响应体类型>
    
// 可通过 ctrl + 点击api方法名 查看react源码
```

**使用案例**

1. 定义api请求函数res数据类型：通常在当前目录下的model目录内封装

src/api/model/githubTypes.ts

```ts
/**
 * 定义 github.ts 中定义的请求api函数，需要的类型
 */

/**
 * 用户对象类型
 */
export interface IUserItem {
    id:number;
    login:string;
    avatar_url:string;
    html_url:string;
}
/**
 * 用户列表数组类型
 */
export type IUserList = IUserItem[]
/**
 * 获取用户列表响应结果类型
 */
export interface IUsersResponse {
    items: IUserList
}
```

2. 封装api函数，并传递类型

src/api/github.ts

```ts
import request from "../http"
import { IUsersResponse } from "./model/githubTypes"
export const getUsers = (keyword:string)=>{
    return request.get<any, IUsersResponse>('/search/users', {
        params:{
            q:keyword
        }
    })
}
```

3. 调用api函数

src/components/AxiosTest.tsx

```tsx
import React, { useEffect, useState } from 'react'
import { getUsers } from '../api/github';
import { IUserList } from '../api/model/githubTypes';

export default function AxiosTest() {
    let [users, setUsers] = useState<IUserList>([]) // 设置数据状态类型

    useEffect(()=>{
        async function main(){
            let res = await getUsers('aa')
            
            setUsers(res.items); // 设置数据状态，需要设置数据装填类型
        }
        main();
    }, [])
    return (
        <div>
            <h3>Axios 测试</h3>
        </div>
    )
}
```

### 使用案例

**axios结合table实现分页**

1. 定义api响应体数据类型：src->api->model->githubTyepe.ts

```ts
/**
 * 定义 github.ts 中定义的请求api函数，需要的类型
 */

/**
 * 用户对象类型
 */
export interface IUserItem {
    id: number;
    login: string;
    avatar_url: string;
    html_url: string;
}
/**
 * 用户列表数组类型
 */
export type IUserList = IUserItem[]
/**
 * 获取用户列表响应结果类型
 */
export interface IUsersResponse {
    items: IUserList
}
```

2. 定义api函数：src->api->github.ts

```ts
import request from "../http"
import { IUsersResponse } from "./model/githubType"
export const getUsers = (keyword: string) => {
    return request.get<any, IUsersResponse>('/search/users', {
        params: {
            q: keyword
        }
    })
}
```

3. 在组件中调用api请求

```tsx
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react'
import { getUsers } from '../api/github';
import { IUserItem, IUserList } from '../api/model/githubTypes';

export default function AxiosTable() {
    // 定义状态数据
    let [users, setUsers] = useState<IUserList>([])

    let [current, setCurrent] = useState<number>(1)
    let [pageSize, setPageSize] = useState<number>(3)
    let [total, setTotal] = useState<number>(10)
    useEffect(() => {
        
        // 调用api函数
        async function main() {
            let res = await getUsers('aa')
            console.log('res: ', res);
            console.log('user: ', res.items);// ts 报错，res身上没有 items属性
            // ts 是在编译阶段执行代码检查，数据是执行之后才有数据结构，需要让ts直到未来请求回来的数据结构，也就是需要先定义出响应数据的类型告诉ts
            setUsers(res.items);
            // 设置总条数
            setTotal(res.items.length);
        }
        main();
    }, [])
    // 定义列配置
    const columns: ColumnsType<IUserItem> = [
        {
            title: 'id',
            dataIndex:'id'
        },
        {
            title:'login',
            dataIndex:'login'
        },
        {
            title:'头像',
            render(row:IUserItem){
                return <a href={row.html_url}><img width={100} src={row.avatar_url}/></a>
            }
        }
    ]
    
    return (
        <div>
            <h3>axios请求数据渲染table练习</h3>
            <Table
                rowKey={'id'}
                columns={columns}
                dataSource={users}
                pagination={{
                    current,
                    pageSize,
                    total,
                    onChange:(page:number, pageSize:number)=>{
                        setCurrent(page)
                        setPageSize(pageSize)
                    }
                }}
            />
        </div>
    )
}
```



### axios的使用(js)

如果按照js的语法发送ajax请求会在ts工程中报错，因为：ts 是在编译阶段执行代码检查，数据是执行之后才有数据结构，需要让ts知道未来请求回来的数据结构，也就是需要提前定义出响应数据的类型告诉ts，让ts通过编译阶段

**使用案例**

src/http/index.ts  对axios 进行二次封装

```ts
import axios from 'axios';

// 1. 基础配置
const request = axios.create({
    baseURL:'https://api.github.com',
    timeout:20000
})

// 2. 配置拦截器

// 请求拦截器
request.interceptors.request.use(config=>{

    return config;
})

// 响应拦截器
request.interceptors.response.use(response=>{

    return response.data;
})
export default request;
```

src/api/github.ts  封装请求的api函数(注意这里没有添加api响应体的类型)

```ts
import request from "../http"
export const getUsers = (keyword:string)=>{
    return request.get('/search/users', {
        params:{
            q:keyword
        }
    })
}
```

src/components/AxiosTest.tsx

```tsx
import React, { useEffect, useState } from 'react'
import { getUsers } from '../api/github';

export default function AxiosTest() {
    let [users, setUsers] = useState([])

    useEffect(()=>{
        async function main(){
            let res = await getUsers('aa')
            console.log('res: ', res);
            //console.log('user: ', res.items);// ts 报错，res身上没有 items属性
            // ts 是在编译阶段执行代码检查，数据是执行之后才有数据结构，需要让ts知道未来请求回来的数据结构，也就是需要提前定义出响应数据的类型告诉ts，让ts通过编译阶段
        }
        main();
    }, [])
    return (
        <div>
            <h3>Axios 测试</h3>
        </div>
    )
}
```



## Form表单的使用(ts)

### 使用步骤

有两种方式获取表单中的数据

方式一：通过给form表单中的`button`按钮上添加`htmlType`属性，属性值为`submit`。和JS中的`type=submit`类似。同时在From组件上设置`onFinish={onFinishfun}`属性监听submit提交事件，当触发事件，会调用回调函数onFinishfun，onFinishfun(values)函数中的参数values可以收集到提交的所有数据。（以上都是antd中的语法，也就是antd他提供的From组件的使用方法）

方式二：通过from对象操作表单（antd提供的方法）：

```shell
通过form对象操作表单，使用 form对象操作表单的好处，可以更方便的操作表单数据
通过form对象获取数据的步骤

1. 创建一个form对象
2. 给Form表单组件绑定 form对象
3. 通过form的api对表单数据进行操作 
```

### 使用案例

方式一：使用 submit 按钮，把表单中的数据通过 values属性 收集起来

src->component->FromTest.tsx

```tsx
import React from 'react'
import { Button, Checkbox, Form, Input } from 'antd'

export default function FromTest() {
    // 设置onFinish方法，不知道values的属性，暂时使用any指定类型
    const onFinish = (values: any) => {
        // values 当点击 submit提交按钮的时候触发，并将表单数据收集到values中
        console.log('Success:', values);
    }

    return (
        <>
            <h3>Form表单组件</h3>
            <Form
                name="basic"
                labelCol={{ span: 8 }} // 文字宽度
                wrapperCol={{ span: 16 }} // 表单宽度
                initialValues={{ remember: false, username: '' }} // 设置默认值
                onFinish={onFinish} // 当点击提交按钮时，执行的回调函数
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="phone"
                    name="phone"
                    rules={[
                        { required: true, message: '手机号必填' },
                        { pattern: /^1[3-9]\d{9}$/, message: '手机号不合法' } // 使用正则表达式验证手机号格式
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}

```

方式二：通过form对象获取数据的步骤

src->component->FromTest2.tsx

```tsx
import { Button, Checkbox, Form, Input } from 'antd'
import React from 'react'

export default function FormData() {
    /**
     * 使用 form对象操作表单的好处，可以更方便的操作表单数据
     * 获取表单数据的第二种方式：
     * 1. 创建一个form对象
     * 2. 给Form表单组件绑定 form对象
     * 3. 通过form的api对表单数据进行操作 
     */

    const [form] = Form.useForm(); // 1. 创建form对象,antd固定写法

    const onFinish = (values: any) => {
        // values 当点击 submit提交按钮的时候触发，并将表单数据收集到values中
        console.log('Success:', values);
        // getFieldsValue 获取表单的数据
        console.log('form data: ', form.getFieldsValue());
    };

    const reset = () => {
        console.log('reset');
        // form.resetFields(); // 恢复初始值

        form.setFieldsValue({ // 可以指定表单值的字段，进行批量设置
            username: 'atguigu',
            password: '123123',
            phone: 13141801331
        })
    }



    return (
        <>
            <h3>Form表单组件 数据处理</h3>
            <Form
                name="basic"
                labelCol={{ span: 8 }} // 文字宽度
                wrapperCol={{ span: 16 }} // 表单宽度
                initialValues={{ remember: false, username: '' }} // 设置默认值
                onFinish={onFinish} // 提交按钮的回调函数
                // 绑定form对象到表单组件
                form={form}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="phone"
                    name="phone"
                    rules={[
                        { required: true, message: '手机号必填' },
                        { pattern: /^1[3-9]\d{9}$/, message: '手机号不合法' }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    <Button onClick={reset}>清空</Button>
                </Form.Item>
            </Form>
        </>
    )
}
```

## 其他组件

### Space组件

元素之间添加空格间隙

```tsx
import { Button, Card, message, Space,Modal } from 'antd'
// 添加组件图标
import {ExclamationCircleFilled} from '@ant-design/icons'
import React from 'react'
export default function Anthor() {
    return (
        <h3>Space组件</h3>
        <div>
            <Space size={50}>
                <Button>保存</Button>
                <Button>取消</Button>
            </Space>
        </div>
    )
}
```

### Card组件

最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面

```tsx
import { Button, Card, message, Space,Modal } from 'antd'
// 添加组件图标
import {ExclamationCircleFilled} from '@ant-design/icons'
import React from 'react'
export default function Anthor() {
    return (
        <h3>Card组件</h3>
        <Card>
            <p>我是card组件中的内容</p>
        </Card>
    )
}
```

### Message组件

消息提示

```tsx
import { Button, Card, message, Space,Modal } from 'antd'
// 添加组件图标
import {ExclamationCircleFilled} from '@ant-design/icons'
export default function Anthor() {
    return (
        <h3>message函数 - 提示信息</h3>
        <Button onClick={() => {
            message.success('添加成功!')
        }}>成功提示</Button>
        <Button onClick={() => {
            message.error('添加失败')
        }}>失败提示</Button>
    )
}
```

### Confirm组件

确认提示框

```tsx
import { Button, Card, message, Space,Modal } from 'antd'
// 添加组件图标
import {ExclamationCircleFilled} from '@ant-design/icons'
const {confirm} = Modal
export default function Anthor() {
    return (
        <h3>Confirm 提示框</h3>
        <Button onClick={() => {
            confirm({
                title: '确定删除么?',
                icon: <ExclamationCircleFilled />,
                content: '删除当前记录',
                onOk() {
                    console.log('OK');
                },
                onCancel() {
                    console.log('Cancel');
                },
            });
        }}>删除</Button>
    )
}
```

### Button组件

```tsx
import React, { useState } from 'react'
import { Button } from 'antd'
import { SearchOutlined, QuestionCircleOutlined } from '@ant-design/icons';
export default function ButtonTest() {
    let [loading, setLoading] = useState(false);
    return (
        <>
            <h3>Button按钮</h3>
            <Button type='primary'>按钮</Button>
            {/* 设置图标 */}
            <Button type="primary" icon={<SearchOutlined />} block >
                Search
            </Button>
            {/* 危险按钮 */}
            <Button danger type='primary'>danger</Button>
            {/* 禁用效果 */}
            <Button type='primary' disabled>disabled</Button>
            {/* 设置超链接行为 */}
            <Button href='http://baidu.com'>百度</Button>
            {/* 给按钮设置图标，并设置按钮提交属性 */}
            <Button htmlType='submit' icon={<QuestionCircleOutlined />}>htmlType</Button>
            {/* 原生button */}
            <button type='submit'>提交</button>

            <QuestionCircleOutlined />
            {/* 使用loading状态 */}
            <Button loading={loading}>loading</Button>
            {/* 使用loading状态 */}
            <Button onClick={() => {
                setLoading(!loading)
            }}> changeLoading</Button>
            {/* Button按钮是一个图标 */}
            <Button shape='circle' icon={<SearchOutlined />}></Button>
        </>
    )
}
```

