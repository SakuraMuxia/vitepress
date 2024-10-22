# Antd国际化

## 下载安装

```shell
yarn add i18next react-i18next
npm install i18next react-i18next -f (强制)
```

## 定义语言包

英语语言包：src/locales/lang/en_US.json

```ts
{
    // app组件中的需要转化的语言
    "app":{
        "hello":"hello",
        "sz":"shenzhen",
        "click":"click",
        "name":"name",
        "age":"age",
        "address":"address",
        "tag":"tag",
        "action":"action"
    },
    "detail":{
        
    }
}
```

中文语言包： src/locales/lang/zh_CN.json

```json
{
    "app":{
        "hello":"你好",
        "sz":"深圳",
        "click":"点击",
        "name":"姓名",
        "age":"年龄",
        "address":"地址",
        "tag":"标签",
        "action":"行为"
    },
    "detail":{
        
    }
}
```

定义国际化配置文件： src/locales/i18n.ts

```ts
// 引入第三方库
import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
// 导入语言包
import en_US from './lang/en_US.json'
import zh_CN from './lang/zh_CN.json'
// 语言包配置对象
const resources = {
    en:en_US,
    zh:zh_CN
}
// 初始化i18n
i18n.use(initReactI18next).init({
    resources,// 所有语言包
    lng:'en', // 默认语言，值是resource的键
    interpolation:{
        // escapeValue: 转义传入的值以避免xss注入
        // react已经处理了，这里设置为false
        escapeValue:false
    }
})
```

## 导入react项目

在入口文件中引入国际化配置文件：src/index.ts

```ts
// 引入国际化语言包
import './locales/i18n'
```

## 组件中使用

```tsx
import React from 'react'
// 引入国际化 hook:useTranslation
import { useTranslation } from 'react-i18next'
export default function App() {
    const { t, i18n } = useTranslation(['app'])// 表示使用语言包中的app字段下面的内容
    return (
        <div>
             <p>
                <button onClick={() => {
                    i18n.changeLanguage('en')
                }}>英文</button>
                <button onClick={() => {
                    i18n.changeLanguage('zh')
                }}>中文</button>
            </p>
            {t('hello')}
        </div>
    )
}
```

## 处理antd中内置文本

> 上面的例子中，table中的分页的文本还未实现国际化，antd中内置的文本默认使用en_US

### ConfigProvider组件

在antd中引入组件`ConfigProvider`

```ts
import {Space, Table, Button, ConfigProvider} from 'antd'
```

引入antd中内置的语言包

```ts
import zhCN from 'antd/es/locale/zh_CN'
import en_US from 'antd/es/locale/en_US'
// 其他语言包可查询antd官网
```

使用ConfigProvider 包裹jsx结构，一般用来包裹整个应用结构

```tsx
// 如需切换语言，只需要动态修改传入locale属性的语言包即可
<ConfigProvider locale={en_US}>
    <Table
		columns={columns}
		dataSource={dataSource}
		pagination={{
        	total:50,
            showSizeChange:true
        }}

	/>
</ConfigProvider>
```

### 使用案例

```tsx
import { Button, Table, ConfigProvider } from 'antd'
import React,{useState} from 'react'
// 引入国际化 hook:useTranslation
import { useTranslation } from 'react-i18next'
import './App.css'
// antd 语言包
import zhCN from 'antd/es/locale/zh_CN'
import enUS from 'antd/es/locale/en_US'
import { ConfigConsumer } from 'antd/lib/config-provider'

export default function App() {
    const { t, i18n } = useTranslation(['app'])// 表示使用语言包中的app字段下面的内容
    const [locale, setLocale] = useState<string>('zh')
    return (
        <ConfigProvider locale={locale==='zh' ? zhCN : enUS}>
            <div>
                <Button type='primary' onClick={() => {
                    i18n.changeLanguage('zh')
                    setLocale('zh')
                }}>中文</Button>
                <Button type='primary' onClick={() => {
                    i18n.changeLanguage('en')
                    setLocale('en')
                }}>英文</Button>
                <div>
                    {t('hello')}

                </div>
                <Table
                    rowKey={'id'}
                    columns={[
                        {
                            title: t('index') as string,
                            render(value, row, index) {
                                return index + 1
                            }
                        },
                        {
                            title: t('name') as string,
                            dataIndex: 'name'
                        }
                    ]}
                    dataSource={[
                        {
                            id: 1,
                            name: 'yy'
                        },
                        {
                            id: 2,
                            name: 'xx'
                        }
                    ]}
                    pagination={{
                        total: 50,
                        current: 1,
                        pageSize: 10,
                        showQuickJumper: true,
                        showSizeChanger: true
                    }}
                />
            </div>
        </ConfigProvider>
    )
}
```

