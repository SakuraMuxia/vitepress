# 后台管理项目

## Sku管理

sku管理页面静态页面

src/views/product/sku/index.vue

```vue
<template>
    <el-card>

        <el-table border style="margin: 10px 0px">
            <el-table-column type="index" width="80px" align="center" label="序号"></el-table-column>
            <el-table-column label="名称" width="180px"></el-table-column>
            <el-table-column label="描述" width="180px" ></el-table-column>
            <el-table-column label="默认图片" width="180px">
                <!-- 代表SKU:商品 -->
                <template #="{ row, $index }">
                    <img alt="" style="width: 100px; height: 100px" />
                </template>
            </el-table-column>
            <el-table-column label="重量" width="180px"></el-table-column>
            <el-table-column label="价格" width="180px" ></el-table-column>
            <el-table-column label="操作" width="280px" fixed="right">
                <template #="{ row, $index }">
                    <el-button
                        size="small"
                        :icon="Top">
                    </el-button>
                    <el-button
                        type="primary"
                        size="small"
                        :icon="Edit">
                    </el-button>
                    <el-button
                        type="primary"
                        size="small"
                        :icon="InfoFilled">
                    </el-button>
                    <el-button
                        type="primary"
                        size="small"
                        :icon="Delete">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            background
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="total"
        />

        <!-- 抽屉组件 -->
        <el-drawer title="查看商品的详情">
            <el-divider content-position="left">商品信息</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">名称</el-col>
                <el-col :span="16"></el-col>
            </el-row>
            <el-divider content-position="left">商品描述</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">商品描述</el-col>
                <el-col :span="16"></el-col>
            </el-row>
            <el-divider content-position="left">商品价格</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">商品价格</el-col>
                <el-col :span="16"></el-col>
            </el-row>
            <el-divider content-position="left">平台属性</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">平台属性</el-col>
                <el-col :span="16">
                    <el-tag >123</el-tag>
                </el-col>
            </el-row>
            <el-divider content-position="left">销售属性</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">销售属性</el-col>
                <el-col :span="16">
                    <el-tag
                        round
                        style="margin: 4px">
                        123
                    </el-tag>
                </el-col>
            </el-row>
            <el-divider content-position="left">商品图片</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">商品图片</el-col>
                <el-col :span="16">
                <el-carousel :interval="4000" type="card" height="200px">
                    <el-carousel-item >
                        <img alt="" style="width: 100%; height: 100%" />
                    </el-carousel-item>
                </el-carousel>
                </el-col>
            </el-row>
        </el-drawer>
  </el-card>
</template>

<script setup lang='ts'>
import { ref, onMounted } from "vue";
import { Top, Bottom, Edit, Delete, InfoFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

//分页器默认的页码
const pageNo = ref<number>(1);
//每一页数据的条数
const pageSize = ref<number>(10);
//存储商品的总个数
const total = ref<any>(0);


</script>

<style scoped lang="less">
</style>
```

### 封装获取sku列表接口

```ts
# 定义sku类型

# 定义sku接口
	获取sku列表接口
```

src/api/product/sku.ts

```ts
import request from '@/utils/request';
import type { SkuListResponseData } from './type/sku';

//枚举SKU模块相关的地址
enum API {
    // 获取SKU分页接口
    SKULIST_URL = "/admin/product/list/",
    // 对应商品上架的请求
    SALE_URL = "/admin/product/onSale/",
    // 对应商品下架的请求
    CANCELSALE_URL = "/admin/product/cancelSale/",
    // 获取商品详情
    SKUINFO_URL="/admin/product/getSkuById/",
    // 删除商品的接口
    DELETESKU_URL="/admin/product/deleteSku/"
}

//获取商品分页的数据
export const reqSkuList = (page: number, limit: number) => {
    return request.get<any,SkuListResponseData>(API.SKULIST_URL +  `${page}/${limit}`)
}
```

```ts
/*************获取sku列表*************/

export interface Record {
    category3Id:number,
    id?:number,
    isSale:number,
    price:number,
    skuAttrValueList:null,
    skuDefaultImg:string,
    skuDesc:string,
    skuImageList:null,
    skuName:string,
    skuSaleAttrValueList:null,
    spuId:number,
    tmId:number,
    weight:string
}

export type Records = Record[]

export interface SkuListResponseData {
    current:number,
    pages:number,
    records:Records,
    searchCount:boolean,
    size:number,
    total:number
}
```

### 获取并渲染数据

```ts
# 定义响应式数据
	 总个数
        当前页
        商品列表
        
# 定义获取sku列表函数
	const getHasSku 
    
# 渲染table
# 渲染分页
	渲染分页的切换
    	size变化重新渲染页面并回到第一页
```

src/views/product/sku.ts

```vue
<template>
    <el-card>

        <el-table border style="margin: 10px 0px" :data="skuList">
            <el-table-column type="index" width="80px" align="center" label="序号"></el-table-column>
            <el-table-column label="名称" width="180px" prop="skuName"></el-table-column>
            <el-table-column label="描述" width="180px" prop="skuDesc"></el-table-column>
            <el-table-column label="默认图片" width="180px">
                <!-- 代表SKU:商品 -->
                <template #="{ row, $index }">
                    <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px" />
                </template>
            </el-table-column>
            <el-table-column label="重量" width="180px" prop="weight"></el-table-column>
            <el-table-column label="价格" width="180px" prop="price"></el-table-column>
            <el-table-column label="操作" width="280px" fixed="right">
                <template #="{ row, $index }">
                    <el-button
                        size="small"
                        :type="row.isSale ? 'warning' : 'danger'"
                        :icon="row.isSale ? Bottom : Top">
                    </el-button>
                    <el-button
                        type="primary"
                        size="small"
                        :icon="Edit">
                    </el-button>
                    <el-button
                        type="primary"
                        size="small"
                        :icon="InfoFilled">
                    </el-button>
                    <el-button
                        type="primary"
                        size="small"
                        :icon="Delete">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            background
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="total"
            @current-change="getHasSku"
            @size-change="changeSize"
        />

        <!-- 抽屉组件 -->
        <el-drawer title="查看商品的详情">
            <el-divider content-position="left">商品信息</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">名称</el-col>
                <el-col :span="16"></el-col>
            </el-row>
            <el-divider content-position="left">商品描述</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">商品描述</el-col>
                <el-col :span="16"></el-col>
            </el-row>
            <el-divider content-position="left">商品价格</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">商品价格</el-col>
                <el-col :span="16"></el-col>
            </el-row>
            <el-divider content-position="left">平台属性</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">平台属性</el-col>
                <el-col :span="16">
                    <el-tag >123</el-tag>
                </el-col>
            </el-row>
            <el-divider content-position="left">销售属性</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">销售属性</el-col>
                <el-col :span="16">
                    <el-tag
                        round
                        style="margin: 4px">
                        123
                    </el-tag>
                </el-col>
            </el-row>
            <el-divider content-position="left">商品图片</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">商品图片</el-col>
                <el-col :span="16">
                <el-carousel :interval="4000" type="card" height="200px">
                    <el-carousel-item >
                        <img alt="" style="width: 100%; height: 100%" />
                    </el-carousel-item>
                </el-carousel>
                </el-col>
            </el-row>
        </el-drawer>
  </el-card>
</template>

<script setup lang='ts'>
import { ref, onMounted } from "vue";
import { Top, Bottom, Edit, Delete, InfoFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { reqSkuList } from "@/api/product/sku";
import type { SkuListResponseData,Records } from '@/api/product/type/sku';

// 分页器默认的页码
const pageNo = ref<number>(1);
// 每一页数据的条数
const pageSize = ref<number>(10);
// 存储商品的总个数
const total = ref<any>(0);
// 存储商品列表
const skuList = ref<Records>([]);

// 挂载
onMounted(()=>{
    getHasSku()
})

// 获取SKU列表
const getHasSku = async (value: number = 1) =>{
    // 收集当前页码
    pageNo.value = value
    const result: SkuListResponseData = await reqSkuList(pageNo.value, pageSize.value)
    // 存储商品列表
    skuList.value = result.records
    // 存储商品总数
    total.value = result.total
}
// 改变每页总数
const changeSize = async(val:number)=>{
    // 修改数据
    pageSize.value = val
    getHasSku()
}
</script>

<style scoped lang="less">
</style>
```

## 商品上下架功能

### 封装接口

```ts
# 封装商品的上下架接口

# 封装商品的上下架接口类型
```

```ts
//获取商品分页的数据
export const reqSkuList = (page: number, limit: number) => {
    return request.get<any,SkuListResponseData>(API.SKULIST_URL +  `${page}/${limit}`)
}
// 商品上线接口
export const reqSkuOnline = (skuId: number) =>{
    return request.get<any, any>(API.SALE_URL + skuId);
}
// 商品下线接口
export const reqSkuOffline = (skuId: number) =>{
    return request.get<any, any>(API.CANCELSALE_URL + skuId);
}
//获取商品详情数据
export const reqSkuInfo = (skuId:number)=>request.get<any,any>(API.SKUINFO_URL+skuId);
//删除商品的接口
export const reqDeleteSku = (skuId:number)=>request.delete<any,any>(API.DELETESKU_URL+skuId);
```

### 渲染数据

```ts
# 上下架按钮上下架按钮图标切换和图标显示
	根据行对象isSale属性控制上下架按钮哪个图标显示
    绑定单击事件回调函数,控制上下架按钮图标切换
		回调函数控制图标切换
        回调函数获取最新数据(当前页)
```

```vue
<template>
    <el-card>

        <el-table border style="margin: 10px 0px" :data="skuList">
            <el-table-column type="index" width="80px" align="center" label="序号"></el-table-column>
            <el-table-column label="名称" width="180px" prop="skuName"></el-table-column>
            <el-table-column label="描述" width="180px" prop="skuDesc"></el-table-column>
            <el-table-column label="默认图片" width="180px">
                <!-- 代表SKU:商品 -->
                <template #="{ row, $index }">
                    <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px" />
                </template>
            </el-table-column>
            <el-table-column label="重量" width="180px" prop="weight"></el-table-column>
            <el-table-column label="价格" width="180px" prop="price"></el-table-column>
            <el-table-column label="操作" width="280px" fixed="right">
                <template #="{ row, $index }">
                    <el-button
                        size="small"
                        :type="row.isSale ? 'warning' : 'danger'"
                        @click="changeSale(row)"
                        :icon="row.isSale ? Bottom : Top">
                    </el-button>
                    <el-button
                        type="primary"
                        size="small"
                        :icon="Edit">
                    </el-button>
                    <el-button
                        type="primary"
                        size="small"
                        :icon="InfoFilled">
                    </el-button>
                    <el-button
                        type="primary"
                        size="small"
                        :icon="Delete">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页器 -->
        <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            background
            layout="prev, pager, next, jumper,->,sizes,total"
            :total="total"
            @current-change="getHasSku"
            @size-change="changeSize"
        />

        <!-- 抽屉组件 -->
        <el-drawer title="查看商品的详情">
            <el-divider content-position="left">商品信息</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">名称</el-col>
                <el-col :span="16"></el-col>
            </el-row>
            <el-divider content-position="left">商品描述</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">商品描述</el-col>
                <el-col :span="16"></el-col>
            </el-row>
            <el-divider content-position="left">商品价格</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">商品价格</el-col>
                <el-col :span="16"></el-col>
            </el-row>
            <el-divider content-position="left">平台属性</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">平台属性</el-col>
                <el-col :span="16">
                    <el-tag >123</el-tag>
                </el-col>
            </el-row>
            <el-divider content-position="left">销售属性</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">销售属性</el-col>
                <el-col :span="16">
                    <el-tag
                        round
                        style="margin: 4px">
                        123
                    </el-tag>
                </el-col>
            </el-row>
            <el-divider content-position="left">商品图片</el-divider>
            <el-row :gutter="20">
                <el-col :span="8">商品图片</el-col>
                <el-col :span="16">
                <el-carousel :interval="4000" type="card" height="200px">
                    <el-carousel-item >
                        <img alt="" style="width: 100%; height: 100%" />
                    </el-carousel-item>
                </el-carousel>
                </el-col>
            </el-row>
        </el-drawer>
  </el-card>
</template>

<script setup lang='ts'>
import { ref, onMounted } from "vue";
import { Top, Bottom, Edit, Delete, InfoFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { reqSkuList, reqSkuOffline, reqSkuOnline } from "@/api/product/sku";
import type { SkuListResponseData,Records } from '@/api/product/type/sku';

// 分页器默认的页码
const pageNo = ref<number>(1);
// 每一页数据的条数
const pageSize = ref<number>(10);
// 存储商品的总个数
const total = ref<any>(0);
// 存储商品列表
const skuList = ref<Records>([]);

// 挂载
onMounted(()=>{
    getHasSku()
})

// 获取SKU列表
const getHasSku = async (value: number = 1) =>{
    // 收集当前页码
    pageNo.value = value
    const result: SkuListResponseData = await reqSkuList(pageNo.value, pageSize.value)
    // 存储商品列表
    skuList.value = result.records
    // 存储商品总数
    total.value = result.total
}
// 改变每页总数
const changeSize = async(val:number)=>{
    // 修改数据
    pageSize.value = val
    getHasSku()
}
// 改变销售状态
const changeSale = async (row:any)=>{
    // 判断当前商品的销售状态
    if (row.isSale == 1) {
        // 下线
        await reqSkuOffline(row.id);
        //提示消息
        ElMessage({
            type: "success",
            message: "下架成功",
        })
    }else{
        await reqSkuOnline(row.id)
        ElMessage({
            type: "success",
            message: "上架成功",
        })
    }
    // 刷新页面 设置完 停留在当前页面
    getHasSku(pageNo.value)
}
</script>

<style scoped lang="less">
</style>
```

## 更新商品数据

### 封装接口

```ts
// 更新已有的sku
const updateSku = (row: any) => {
    ElMessage({
        type: "success",
        message: "程序正在努力开发....",
    })
};
```

### 渲染数据

无

## 查看商品数据

### 静态页面

```ts
# 使用Drawer抽屉 展示文档或form,和dialog一样的API,展示的内容更多
# 抽屉组件可以嵌套
	使用drawer组件,并设置一个响应式数据控制显示与隐藏showDrawer
# element-plus中的layout布局也是响应式布局类似于bootstrap
	使用layout布局,设置drawer响应式布局
	使用轮播图
```

```vue
<el-drawer title="查看商品的详情" v-model="showDrawer">
    <el-divider content-position="left">商品信息</el-divider>
    <el-row :gutter="20">
        <el-col :span="8">名称</el-col>
        <el-col :span="16">{{ skuInfo.skuName }}</el-col>
    </el-row>
    <el-divider content-position="left">商品描述</el-divider>
    <el-row :gutter="20">
        <el-col :span="8">商品描述</el-col>
        <el-col :span="16">{{ skuInfo.skuDesc }}</el-col>
    </el-row>
    <el-divider content-position="left">商品价格</el-divider>
    <el-row :gutter="20">
        <el-col :span="8">商品价格</el-col>
        <el-col :span="16">{{ skuInfo.price }}</el-col>
    </el-row>
    <el-divider content-position="left">平台属性</el-divider>
    <el-row :gutter="20">
        <el-col :span="8">平台属性</el-col>
        <el-col :span="16">
            <el-tag 
                :key="item.id"
                v-for="(item, index) in skuInfo.skuAttrValueList"
                style="margin: 4px">{{ item.valueName }}
            </el-tag>
        </el-col>
    </el-row>
    <el-divider content-position="left">销售属性</el-divider>
    <el-row :gutter="20">
        <el-col :span="8">销售属性</el-col>
        <el-col :span="16">
            <el-tag
                round
                v-for="(item, index) in skuInfo.skuSaleAttrValueList"
                :key="item.id"
                style="margin: 4px">{{ item.saleAttrValueName }}
            </el-tag>
        </el-col>
    </el-row>
    <el-divider content-position="left">商品图片</el-divider>
    <el-row :gutter="20">
        <el-col :span="8">商品图片</el-col>
        <el-col :span="16">
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl" alt="" style="width: 100%; height: 100%" />
            </el-carousel-item>
        </el-carousel>
        </el-col>
    </el-row>
</el-drawer>
```

### 封装接口

```ts
// 封装商品详情数据
```

```ts
//获取商品详情数据
export const reqSkuInfo = (skuId:number)=>request.get<any,any>(API.SKUINFO_URL+skuId);
//删除商品的接口
export const reqDeleteSku = (skuId:number)=>request.delete<any,any>(API.DELETESKU_URL+skuId);
```



### 渲染数据

```ts
# 发送请求获取数据
# 定义响应式对象接收数据
# 渲染页面	

# 更改轮播图的样式
	把轮播图的线改为圈(更改指示器的样式)
```

```ts
// 存储商品列表
const skuList = ref<Records>([]);
// 抽屉组件的展示
const showDrawer = ref<boolean>(false)
// 商品信息的存储
const skuInfo = ref<any>({})

// 获取商品sku信息
const findSkuInfo = async (row: any)=>{
    showDrawer.value = true;
    const result = await reqSkuInfo(row.id)
    skuInfo.value = result
}
```

## 深度选择器改ele样式

### 修改按钮颜色

```css
::v-deep(.el-button.is-disabled){
    background-color: orange !important;
}
```

### 修改分页器

```ts
使用 !importent 提升权限
```

```css
::v-deep(.is-active){
    background-color: red !important;
}
```

### 修改轮播图

```ts
先通过 开发者工具 查看修改元素的 类名
然后通过类名选择器选择到元素,并且结合深度选择器穿透到元素上
```

```vue
# 修改指示器,就是修改button按钮的样式
```

```css
::v-deep .el-carousel__button {
  width: 10px;
  height: 10px;
  background: aqua;
  border-radius: 50%;
}

```

## 删除商品接口

### 封装接口

```ts
//删除商品的接口
export const reqDeleteSku = (skuId:number)=>request.delete<any,any>(API.DELETESKU_URL+skuId);
```

```ts
<el-button
    type="primary"
    size="small"
    @click="delSku(row.id)"
    :icon="Delete">
</el-button>

// 删除商品sku数据
const delSku = async (id: number) =>{
    reqDeleteSku(id).then(() => {
        ElMessage({
            type: "success",
            message: "删除成功",
        })
    })
    // 刷新页面 设置完 停留在当前页面
    getHasSku(pageNo.value)
}
```

