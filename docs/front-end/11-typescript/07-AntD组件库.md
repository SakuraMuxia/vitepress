# AntD组件库

## UI组件库简介

- 封装了一些通用的界面功能效果的组件，简化开发编码
- 流行的React UI组件库
  - 国内：`Ant Design` https://ant.design/index-cn
  - 国外：`Material UI` https://www.mdui.org/design

Antd是一个React中流行的UI组件库

## 基本使用

### 创建ts版本的react项目

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

## Table组件的使用案例

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

使用示例

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



## axios在ts项目中的使用案例



## Form表单在ts项目中的使用案例

