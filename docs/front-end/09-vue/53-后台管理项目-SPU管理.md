# 后台管理项目

## SPU管理页面

### SPU数据渲染

#### 静态页面搭建

src/views/product/spu/index.vue

```tsx
# 定义场景 数据状态

# 引入分类组件，传值

# 展示已有的SPU

# 设置分页 
```

```vue
<template>
    <div>
        <!-- 分类全局组件-->
        <Category :scene="scene"></Category>
        <!-- 展示已有的SPU -->
        <el-card style="margin: 10px 0px">
            <div v-show="scene == 0">

                <!-- 添加按钮 -->
                <el-button
                    type="primary"
                    :icon="Plus"
                    :disabled="categoryStore.c3Id ? false : true">添加SPU
                </el-button>

                <!-- 表格展示已有的SPU -->
                <el-table border style="margin: 10px 0px">
                    <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="80px">
                    </el-table-column>
                    <el-table-column
                        label="SPU名称"
                        :resizable="false"
                        >
                    </el-table-column>
                    <el-table-column
                        label="SPU描述"
                        prop="description"
                        >
                    </el-table-column>
                    <el-table-column label="SPU操作">
                    <!-- row:代表即为某一个三级分类下已有的SPU -->
                        <template #="{ row, $index }">
                            <el-button
                                :icon="Plus"
                                type="primary"
                                size="small"
                                title="添加SKU">
                            </el-button>
                            <el-button
                                :icon="Edit"
                                type="warning"
                                size="small"
                                title="修改SPU">
                            </el-button>
                            <el-button
                                :icon="InfoFilled"
                                type="info"
                                size="small"
                                title="查看SKU列表">
                            </el-button>
                            <el-button
                                :icon="Delete"
                                type="danger"
                                size="small"
                                title="删除SPU">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页器 -->
                
            </div>
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import { ref, watch } from "vue";
import { Plus, Edit, Delete, InfoFilled } from "@element-plus/icons-vue";
import type {Records} from "@/api/product/type/spu"
import useCategoryStore from "@/stores/category"

//分类需要的场景的数值
const scene = ref<number>(0);
//获取小仓库
const categoryStore = useCategoryStore();
//存储全部已有的SPU
const spuList = ref<Records>([]);

</script>

<style scoped lang="less">
</style>
```



#### 封装商品SPU接口

src/api/product/spu.ts

```ts
# 获取全部已有的SPU列表

//SPU管理模块的接口
import request from '@/utils/request';
import type {SpuListResponseData} from '@/api/product/type/spu'


enum API {
    //获取全部已有SPU列表数据
    GETSPULIST_URL = "/admin/product/",
}

// 获取SPU列表数据
export const reqSpuList = (page:number,limit:number,category3Id:number|string) => {
    return request.get<any,SpuListResponseData>(API.GETSPULIST_URL + `${page}/${limit}?category3Id=${category3Id}`)
}
```

src/api/product/type/spu.ts

```ts
//代表已有的SPU数据类型
export interface Spu {
    id?: number,//SPU的ID
    category3Id: string | number,//三级分类的ID
    spuName: string,//SPU的名字
    description: string,//SPU的描述
    tmId: number|string,//品牌的ID
    spuImageList?:null,//已有的SPU照片墙的数据(目前不知道数据类型)
    spuSaleAttrList?:null,//已有的SPU销售属性的数据(目前不知道数据类型)
}

//存储已有的SPU(数组)
export type Records = Spu[];

//SPU列表返回的数据的TS类型
export interface SpuListResponseData {
    records: Records,
    total: number,
    size: number,
    current: number,
    searchCount: boolean,
    pages: number
}
```

#### 发送请求

```ts
# 获取三级分类Id
	通过分类pinia仓库获取，并通过监听三级分类Id发送请求。
    
# 修改数据：存储spuList，存储total

# 三级分类存在时，才发送请求

# 三级分类变化时，清空spuList

# 三级分类变化时，分页total设置为0

```

```vue
<template>

</template>

<script>
import { ref, watch } from "vue";
import { Plus, Edit, Delete, InfoFilled } from "@element-plus/icons-vue";
import type {Records, SpuListResponseData} from "@/api/product/type/spu"
import useCategoryStore from "@/stores/category"
import { reqSpuList } from "@/api/product/spu";

//分类需要的场景的数值
const scene = ref<number>(0);
//小仓库
const categoryStore = useCategoryStore();
//全部已有的SPU
const spuList = ref<Records>([])
//spu总个数
const total = ref<number>(0)
//分页器当前页码
const pageNo = ref<number>(1);
//每一页展示数据的条数
const pageSize = ref<number>(3);

watch(()=>categoryStore.c3Id,()=>{
    // 清空SPU列表
    spuList.value = [];
    // 分页设置为0
    total.value = 0;
    categoryStore.c3Id && getHasSpuList();
})

// 获取SPU列表
const getHasSpuList = async(value: number = 1)=>{
    // 修改pageNo
    pageNo.value = value;
    // 发送请求
    const result:SpuListResponseData = await reqSpuList(pageNo.value,pageSize.value,categoryStore.c3Id)
    // 修改数据
    total.value = result.total
    spuList.value = result.records
}
</script>

```



#### 渲染数据

```ts
# 渲染数据
	配置 :date prop total
    
# 设置内容过长时，隐藏显示
	在table-column上设置show-overflow-tooltip属性

# el-table中的列宽是否可调
	在table-column上设置:resizable="false"属性

# 添加按钮提示
	在按钮上设置 title 属性
```

```vue
<template>
<!-- 表格展示已有的SPU -->
<el-table border style="margin: 10px 0px" :data="spuList">
    <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80px">
    </el-table-column>
    <el-table-column
        label="SPU名称"
        :resizable="false"
        prop="spuName"
        >
    </el-table-column>
    <el-table-column
        label="SPU描述"
        prop="description"
        show-overflow-tooltip
        >
    </el-table-column>
    <el-table-column label="SPU操作">
    <!-- row:代表即为某一个三级分类下已有的SPU -->
        <template #="{ row, $index }">
            <el-button
                :icon="Plus"
                type="primary"
                size="small"
                title="添加SKU">
            </el-button>
            <el-button
                :icon="Edit"
                type="warning"
                size="small"
                title="修改SPU">
            </el-button>
            <el-button
                :icon="InfoFilled"
                type="info"
                size="small"
                title="查看SKU列表">
            </el-button>
            <el-button
                :icon="Delete"
                type="danger"
                size="small"
                title="删除SPU">
            </el-button>
        </template>
    </el-table-column>
</el-table>
</template>

<script>

</script>
```

#### 配置分页

```vue
<template>
<!-- 分页器 -->
<el-pagination
    v-model:current-page="pageNo"
    v-model:page-size="pageSize"
    :page-sizes="[3, 5, 7]"
    background
    layout="prev, pager, next, jumper,->,sizes,total"
    :total="total"
    @current-change="getHasSpuList"
    @size-change="SizeChange"
/>
</template>

<script>
//spu总个数
const total = ref<number>(0)
//分页器当前页码
const pageNo = ref<number>(1);
//每一页展示数据的条数
const pageSize = ref<number>(3);    
    
// 获取SPU列表
const getHasSpuList = async(value: number = 1)=>{
    // 修改pageNo
    pageNo.value = value;
    // 发送请求
    const result:SpuListResponseData = await reqSpuList(pageNo.value,pageSize.value,categoryStore.c3Id)
    // 修改数据
    total.value = result.total
    spuList.value = result.records
}
// 每页数改变
const SizeChange = (value: number) => {
    pageSize.value = value;
    getHasSpuList();
}
</script>
```

#### 配置分隔符

```vue
# 设置分页分割线


<template>
    <el-table border style="margin: 10px 0px" :data="spuList" v-if="spuList.length"></el-table>


    <!-- 分割线 -->
    <el-divider content-position="center" v-else>
        <span style="color: aqua">暂无数据</span>
    </el-divider>

</template>

<script>

</script>
```

### 编辑SPU静态页面

#### 静态页面-切换场景

设置 scene 标记，用于场景页面的切换，把skuForm，spuForm抽离出来。

```ts
# scene = 0 SPU数据渲染
# scene = 1 添加SPU场景和更新SPU场景
# scene = 2 添加SKU

# 新增spuForm和skuForm组件
	把spuForm和skuForm引入

# SPU数据渲染 设置属性 v-show="scene === 0"
# 添加SPU场景和更新SPU场景 设置属性 v-show="scene === 1"
# 添加SKU 设置属性 v-show="scene === 2"

# 添加和更新按钮绑定事件
	修改scene
# 更新SPU按钮绑定事件回调
	修改scene,获取id
# 取消按钮修改scene
	在父组件上定义方法修改scene，通过给子组件设置自定义事件，子组件调用事件传参给父组件
```

src/views/product/spu/index.vue

```vue
<template>
    <div>
        <!-- 分类全局组件-->
        <Category :scene="scene"></Category>
        <!-- 展示已有的SPU -->
        <el-card style="margin: 10px 0px">
            <!-- SPU table -->
            <div v-show="scene === 0">

                <!-- 添加按钮 -->
                <el-button
                    type="primary"
                    :icon="Plus"
                    @click="addSpu"
                    :disabled="categoryStore.c3Id ? false : true">添加SPU
                </el-button>

                <!-- 表格展示已有的SPU -->
                <el-table border style="margin: 10px 0px" :data="spuList" v-if="spuList.length">
                    <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="80px">
                    </el-table-column>
                    <el-table-column
                        label="SPU名称"
                        :resizable="false"
                        prop="spuName"
                        >
                    </el-table-column>
                    <el-table-column
                        label="SPU描述"
                        prop="description"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column label="SPU操作">
                    <!-- row:代表即为某一个三级分类下已有的SPU -->
                        <template #="{ row, $index }">
                            <el-button
                                :icon="Plus"
                                type="primary"
                                size="small"
                                title="添加SKU">
                            </el-button>
                            <el-button
                                :icon="Edit"
                                type="warning"
                                size="small"
                                @click="updateSpu(row)"
                                title="修改SPU">
                            </el-button>
                            <el-button
                                :icon="InfoFilled"
                                type="info"
                                size="small"
                                title="查看SKU列表">
                            </el-button>
                            <el-button
                                :icon="Delete"
                                type="danger"
                                size="small"
                                title="删除SPU">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分割线 -->
                <el-divider content-position="center" v-else>
                    <span style="color: aqua">暂无数据</span>
                </el-divider>
                <!-- 分页器 -->
                <el-pagination
                    v-model:current-page="pageNo"
                    v-model:page-size="pageSize"
                    :page-sizes="[3, 5, 7]"
                    background
                    layout="prev, pager, next, jumper,->,sizes,total"
                    :total="total"
                    @current-change="getHasSpuList"
                    @size-change="SizeChange"
                />
            </div>
            <!-- spu form -->
            <SpuForm @changeScene="changescene" v-show="scene === 1"></SpuForm>
            
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import SpuForm from './spuForm/index.vue'

import { ref, watch } from "vue";
import { Plus, Edit, Delete, InfoFilled,StarFilled  } from "@element-plus/icons-vue";
import type {Records, SpuListResponseData} from "@/api/product/type/spu"
import useCategoryStore from "@/stores/category"
import { reqSpuList } from "@/api/product/spu";

//分类需要的场景的数值
const scene = ref<number>(0);
//小仓库
const categoryStore = useCategoryStore();
//全部已有的SPU
const spuList = ref<Records>([])
//spu总个数
const total = ref<number>(0)
//分页器当前页码
const pageNo = ref<number>(1);
//每一页展示数据的条数
const pageSize = ref<number>(3);

watch(()=>categoryStore.c3Id,()=>{
    // 清空SPU列表
    spuList.value = [];
    // 分页设置为0
    total.value = 0;
    categoryStore.c3Id && getHasSpuList();
})

// 获取SPU列表
const getHasSpuList = async(value: number = 1)=>{
    // 修改pageNo
    pageNo.value = value;
    // 发送请求
    const result:SpuListResponseData = await reqSpuList(pageNo.value,pageSize.value,categoryStore.c3Id)
    // 修改数据
    total.value = result.total
    spuList.value = result.records
}

// 每页数改变
const SizeChange = (value: number) => {
    pageSize.value = value;
    getHasSpuList();
}

// 添加SPU
const addSpu = ()=>{
    //点击切换场景为1 (添加新的SPU|更新已有的SPU)
    scene.value = 1;
}

// 更新SPU
const updateSpu = () =>{
    scene.value = 1;
}

// 改变场景scene
const changescene = (val:number) =>{
    scene.value = val
}


</script>

<style scoped lang="less">
</style>
```

src/views/product/spu/spuForm/index.vue

```vue
<template>
	<el-form label-width="120px">
		<el-form-item label="SPU名称">
			<el-input placeholder="请你输入SPU名称"></el-input>
		</el-form-item>
		<el-form-item label="SPU品牌">
			<el-select>
				
			</el-select>
		</el-form-item>
		<el-form-item label="SPU描述">
			<el-input type="textarea"></el-input>
		</el-form-item>
		<el-form-item label="SPU图片">
			<el-upload list-type="picture-card">
				<el-icon>
					<Plus />
				</el-icon>
			</el-upload>
			<el-dialog style="margin-top: 100px">
				<img alt="Preview Image" style="width: 100%; height: 250px" />
			</el-dialog>
		</el-form-item>
		<el-form-item label="SPU销售属性">
			<el-select>
				
			</el-select>
			<el-button type="primary" :icon="Plus" style="margin-left: 10px">
				添加销售属性
			</el-button>
		</el-form-item>
		<!-- 销售table -->
		<el-form-item>
			<el-table border>
				<el-table-column type="index" align="center" width="80px" label="序号"></el-table-column>
				<el-table-column label="属性名" width="120px"></el-table-column>

				<el-table-column label="属性值">
					<template #="{ row, $index }">
						<el-tag style="margin: 5px" closable>
							123
						</el-tag>
						<el-input type="text" placeholder="请你输入属性值" size="small" style="width: 120px"></el-input>
						<el-button type="primary" :icon="Plus" size="small"></el-button>
					</template>
				</el-table-column>

				<el-table-column label="操作" width="120px">
					<template #="{ row, $index }">
						<el-button type="danger" size="small" :icon="Delete"></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-form-item>
		<!-- 保存和取消 -->
		<el-form-item>
			<el-button type="primary" size="default">保存</el-button>
			<el-button type="primary" size="default" @click="cancel">取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup lang='ts'>
import { Plus, Delete } from "@element-plus/icons-vue";
// 获取事件函数
const $emits = defineEmits(["changeScene"]);

// 取消按钮
const cancel = () =>{
	// 调用自定义事件 改变场景为1
	$emits("changeScene",0)
}


</script>

<script lang="ts">
export default {
	name: "SpuForm"
}
</script>

<style scoped lang="less"></style>
```

src/views/product/spu/skuForm/index.vue

```vue
<template>

</template>

<script>

</script>
```

#### 取消按钮

```ts
# 子组件上取消按钮绑定单机事件，事件回调 调用父组件设置的自定义事件

# 通过自定义事件 子传父 
```

父组件

```vue
<template>
 <!-- spu form -->
<SpuForm @changeScene="changescene" v-show="scene === 1"></SpuForm>
</template>

<script>
// 改变场景scene
const changescene = (val:number) =>{
    scene.value = val
}
</script>

```

子组件

```vue
<template>
<el-button type="primary" size="default" @click="cancel">取消</el-button>
</template>

<script>
const $emits = defineEmits(["changeScene"]);
// 取消按钮
const cancel = () =>{
	// 调用自定义事件 改变场景为1
	$emits("changeScene",0)
}
</script>
```

### 更新SPU

由于`getHasSpuList`获取SPU列表请求的响应结果`res.records`中没有`spuSaleAttrList` `spuImageList` 属性数据，需要单独发送请求获取，然后把数据渲染到页面上

```ts
SpuList.value = res.records
SpuList:[{
    id?: number,//SPU的ID √
    category3Id: string | number,//三级分类的ID √
    spuName: string,//SPU的名字 √
    description: string,//SPU的描述 √
    tmId: number|string,//品牌的ID √
    spuImageList?:null,//已有的SPU照片墙的数据(目前不知道数据类型) ×
    spuSaleAttrList?:null,//已有的SPU销售属性的数据(目前不知道数据类型) ×
}]
Spu:{
    id?: number,//SPU的ID
    category3Id: string | number,//三级分类的ID
    spuName: string,//SPU的名字
    description: string,//SPU的描述
    tmId: number|string,//品牌的ID
    spuImageList?:null,//已有的SPU照片墙的数据(目前不知道数据类型)
    spuSaleAttrList?:null,//已有的SPU销售属性的数据(目前不知道数据类型)
}
```

#### 封装接口

##### 获取SPU照片

封装获取SPU照片列表接口：src/api/product/spu.ts 

```ts
// SPU 照片墙ts类型
export interface ImgObj{
    id?:number,
    spuId?:number,

    imgName?:string,
    imgUrl?:string,

    name?:string,
    url?:string,
}

export type ImageArr = ImgObj[];
```

```ts
//获取某一个SPU的照片墙的数据
export const reqImageList = (spuId: number) => {
    return request.get<any, ImageArr>(API.GETIMAGELIST_URL + spuId);
}
```

##### 获取SPU销售属性

封装获取SPU销售属性列表接口：src/api/product/spu.ts

```ts
// 销售属性ts类型 
    // 销售属性值对象类型
export interface SaleAttrValueObj{
    id?:number,
    spuId?:number,
    baseSaleAttrId:number,
    saleAttrValueName:string,
    saleAttrName?:string,
    isChecked:null
}
    // 销售属性值数组类型
export type SaleAttrValueArr = SaleAttrValueObj[];
    // 销售属性对象类型
export interface SaleAttrObj{
    id?:number,
    spuId?:number,
    baseSaleAttrId?:number,
    saleAttrName?:string,
    spuSaleAttrValueList?:SaleAttrValueArr ,
    showInput?:boolean,
}
    // 销售属性数组类型
export type SaleAttrArr =SaleAttrObj[]
```

```ts
// 获取Spu已有销售属性
export const reqSpuHasSaleAttr = (spuId: number) => {
    return request.get<any, SaleAttrArr>(API.GETSALEATTR_URL + spuId);
}
```

##### 获取SPU销售属性属性名

封装获取SPU销售属性属性名下拉框列表接口：src/api/product/spu.ts

```ts
// 销售属性属性名
export interface SaleAttrNameObj{
    id:number,
    name:string
}
export type SaleAttrNameArr =SaleAttrNameObj[];
```

```ts
// 获取Spu销售属性名称
export const reqBaseSale = () => {
    return request.get<any, SaleAttrNameArr>(API.GETBASESALE_URL);
}
```

##### 获取SPU品牌列表

封装获取SPU品牌下拉框列表接口：src/api/product/spu.ts

```ts
// SPU 品牌ts类型
export interface TradeMarkObj{
    id:number,
    tmName:string,
    logoUrl:string
}

export type TradeMarkArr = TradeMarkObj[];
```

```ts
//获取全部的品牌接口
export const reqAllTradeMark = () => {
    return request.get<any, TradeMarkArr>(API.GETALLTRADEMARK_URL);
}
```

##### 更新SPU提交接口

封装提交更新SPU的接口：src/api/product/spu.ts

```ts
# 把更新和添加合并为一个方法
	根据是否有ID区分 更新和添加

```

```ts
//添加与更新已有的SPU接口
export const reqAddOrUpdateSpu = (data: SpuObj) => {
    if (data.id) {
        //更新
        return request.post(API.UPDATESPU_URL, data);
    } else {
        //添加
        return request.post(API.ADDSPU_URL, data);
    }
}
```



#### 发送请求-获取数据

```ts
# 发送请求时机
	点击更新按钮时，发送请求(需要id)
# 发送请求位置
	如果在父组件发送请求，拿到数据，再给子组件传过去(通过pinia，或传参)(麻烦)
	如果在子组件发送请求，就不用传参(通过ref绑定组件的用法，父组件直接调用子组件内的方法)(推荐)
# 子组件暴漏方法，父组件调用执行
	export
    
# 存储数据，把获取的数据存储到本地
```

子组件暴漏方法：

```vue
<template>

</template>

<script>
    
// 修改数据 接收父组件的参数,存储getHasSpuList请求的响应数据(不完整)
const initSpuObj = async (row: SpuObj) => {
	// 使用对象深拷贝给spuParamsObj赋值
	Object.assign(spuParamsObj, cloneDeep(row));
	//获取全部品牌的数据
	const result: TradeMarkArr = await reqAllTradeMark();
	//获取某一个已有的SPU照片墙的数据
	const result1:ImageArr  = await reqImageList(row.id as number);
	//获取spu销售属性
	const result2:SaleAttrArr  = await reqSpuHasSaleAttr(row.id as number);
	//获取spu销售属性名称
	const result3:SaleAttrNameArr  = await reqBaseSale();
	// 存储品牌数组
	tradeMarkList.value = result
	// 存储照片墙数组
	imageList.value = result1
	// 存储element渲染照片做专门处理
	imageListForEle.value = result1.map((item) => {
		return {
			name: item.imgName,
			url: item.imgUrl,
		};
  	})
	// 存储spu销售属性
	SaleAttrList.value = result2
	// 存储销售属性属性名称数组
	SaleAttrNameList.value = result3
}
defineExpose({
	initSpuObj,

});
    
</script>


```

父组件在点击编辑按钮时通过ref对象调用子组件中的方法，并给子组件传参,当前行对象。

```vue
<template>

<el-button
    :icon="Edit"
    type="warning"
    size="small"
    @click="updateSpu(row)"
    title="修改SPU">
</el-button>

<!-- spu form -->
<SpuForm ref="spu" @changeScene="changescene" v-show="scene === 1"></SpuForm>
</template>

<script>
// 更新SPU
const updateSpu = (row:SpuObj) =>{
    // 切换场景
    scene.value = 1;
    // 通过ref对象调用子组件中的方法,并给子组件传参
    spu.value.initSpuObj(row)
}
</script>
```

#### 渲染数据

```ts
# 在子组件渲染父组件传来的spu对象(不完整)
	在子组件中创建响应式数据，存储已有的spu：const spuParams = reactive()
	把父组件传来的spu对象 赋值给 子组件 ： Object.assign()

# 使用v-model双向绑定 SPU名称 

# 使用v-for渲染品牌下拉列表，使用v-model双向绑定

# 在upload组件中渲染图片
	使用map遍历把服务器返回的数据，更改属性名(element-plus的语法要求)
    更改图片ts类型，添加新增的属性名
    
# 渲染spu销售属性名和属性值

# 渲染销售属性下拉菜单：遍历过滤后的数组
	使用所有的销售属性列表-已有销售属性列表：使用数组的过滤方法过滤，过滤出已有中没有的
	allSaleArr.value.filter(item =>{
        // 为true时，返回当前item
        return spuHasSaleArr.value.every(item1 =>{
            // 当hasSaleArr中没有时，表达式成立，返回true
            return item.name != item1.saleAttrName
        })
    })
	
```

```vue
<template>
	<el-form label-width="120px">
		<el-form-item label="SPU名称">
			<el-input placeholder="请你输入SPU名称" v-model="spuParamsObj.spuName"></el-input>
		</el-form-item>
		<el-form-item label="SPU品牌">
			<el-select v-model="spuParamsObj.tmId" style="width: 240px">
				<el-option
					v-for="(trademark, index) in tradeMarkList"
					:key="trademark.id"
					:label="trademark.tmName"
					:value="trademark.id">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="SPU描述">
			<el-input type="textarea" v-model="spuParamsObj.description"></el-input>
		</el-form-item>
		<el-form-item label="SPU图片">
			<el-upload 
				:on-preview="handleImagePreview"
				list-type="picture-card"
				action="/app-dev/admin/product/fileUpload"
				v-model:file-list="imageListForEle">
				<el-icon>
					<Plus />
				</el-icon>
			</el-upload>
			<el-dialog style="margin-top: 100px" v-model="dialogVisible">
				<img alt="Preview Image" style="width: 250px; height: 250px" :src="dialogImageUrl"/>
			</el-dialog>
		</el-form-item>
		<el-form-item label="SPU销售属性">
			<el-select v-model="SaleAttrNameNoHasStr" style="width: 240px">
				<el-option
					v-for="(item, index) in SaleAttrNameNoHasObj"
					:key="item.id"
					:label="item.name"
					:value="`${item.id}:${item.name}`">
				</el-option>
			</el-select>
			<el-button type="primary" :icon="Plus" style="margin-left: 10px" :disabled="SaleAttrNameNoHasStr ? false : true">
				添加销售属性
			</el-button>
		</el-form-item>
		<!-- 销售table -->
		<el-form-item>
			<el-table border :data="SaleAttrList">
				<el-table-column type="index" align="center" width="80px" label="序号"></el-table-column>
				<el-table-column label="属性名" width="120px" prop="saleAttrName"></el-table-column>

				<el-table-column label="属性值">
					<template #="{ row, $index }">
						<el-tag style="margin: 5px" 
							v-for="(item, index) in row.spuSaleAttrValueList"
							:key="item.id"
							closable>
							{{item.saleAttrValueName}}
						</el-tag>
						<el-input type="text" placeholder="请你输入属性值" size="small" style="width: 120px"></el-input>
						<el-button type="primary" :icon="Plus" size="small"></el-button>
					</template>
				</el-table-column>

				<el-table-column label="操作" width="120px">
					<template #="{ row, $index }">
						<el-button type="danger" size="small" :icon="Delete"></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-form-item>
		<!-- 保存和取消 -->
		<el-form-item>
			<el-button type="primary" size="default">保存</el-button>
			<el-button type="primary" size="default" @click="cancel">取消</el-button>
		</el-form-item>
	</el-form>
</template>
<script setup lang='ts'>
import { Plus, Delete } from "@element-plus/icons-vue";
import { ref, reactive, computed } from "vue";
import type { ImageArr, SaleAttrArr, SaleAttrNameArr, SpuObj, TradeMarkArr } from "@/api/product/type/spu"
import { reqAllTradeMark, reqBaseSale, reqImageList, reqSpuHasSaleAttr } from "@/api/product/spu"
import type { UploadProps, UploadUserFile } from 'element-plus'
import cloneDeep from 'lodash/cloneDeep'
// 定义 spuObj 响应式数据对象
const spuParamsObj = reactive<SpuObj>({
	category3Id: "",
	spuName: "",
	description: "",
	tmId: "",
	spuImageList: null,
	spuSaleAttrList: null,
});

// 品牌数据
const tradeMarkList = ref<TradeMarkArr>([]);
// 照片墙数据
const imageList = ref<ImageArr>([])
// 照片墙数据 (用于element渲染)
const imageListForEle = ref<UploadUserFile[]>([])
// 控制照片对话框的显示与隐藏
const dialogVisible = ref<boolean>(false)
// 预览照片的地址
const dialogImageUrl = ref<string>("");

// 销售属性数组
const SaleAttrList = ref<SaleAttrArr>([]);


// 销售属性属性名数组
const SaleAttrNameList = ref<SaleAttrNameArr>([])
// 销售属性属性名字符串(目前销售属性未拥有)
const SaleAttrNameNoHasStr = ref<string>("")
// 销售属性属性名数组(目前销售属性未拥有) 计算属性 
const SaleAttrNameNoHasObj = computed(() => {
	const result = SaleAttrNameList.value.filter((item) => {
		return SaleAttrList.value.every((obj) => {
			return item.name != obj.saleAttrName;
		})
	})
	return result
});


// 获取事件函数
const $emits = defineEmits(["changeScene"]);
// 取消按钮
const cancel = () => {
	// 调用自定义事件 改变场景为1
	$emits("changeScene", 0)
}

// 修改数据 接收父组件的参数,存储getHasSpuList请求的响应数据(不完整)
const initSpuObj = async (row: SpuObj) => {
	// 使用对象深拷贝给spuParamsObj赋值
	Object.assign(spuParamsObj, cloneDeep(row));
	//获取全部品牌的数据
	const result: TradeMarkArr = await reqAllTradeMark();
	//获取某一个已有的SPU照片墙的数据
	const result1:ImageArr  = await reqImageList(row.id as number);
	//获取spu销售属性
	const result2:SaleAttrArr  = await reqSpuHasSaleAttr(row.id as number);
	//获取spu销售属性名称
	const result3:SaleAttrNameArr  = await reqBaseSale();
	// 存储品牌数组
	tradeMarkList.value = result
	// 存储照片墙数组
	imageList.value = result1
	// 存储element渲染照片做专门处理
	imageListForEle.value = result1.map((item) => {
		return {
			name: item.imgName,
			url: item.imgUrl,
		};
  	}) as UploadUserFile[]
	// 存储spu销售属性
	SaleAttrList.value = result2
	// 存储销售属性属性名称数组
	SaleAttrNameList.value = result3
}

// 显示照片的显示放大
const handleImagePreview:UploadProps['onPreview'] =(uploadFile)=>{
	// 对话框显示出来
	dialogVisible.value = true;
	// 设置预览照片地址
	dialogImageUrl.value = uploadFile.url as string;
}
defineExpose({
	initSpuObj,

});

</script>

<script lang="ts">
export default {
	name: "SpuForm"
}
</script>

<style scoped lang="less"></style>
```

#### 收集更新后数据

```ts
目的把数据全部收集到 spuParamsObj 响应式对象中

# 收集品牌 在el-select设置属性双向绑定v-model,el-option设置属性:value=""，展示数据

# 收集SPU描述

# 收集SPU图片
	SPU图片默认不在spuParamsObj中，而是在imageList中
    合并前需要更改属性名(更改格式)
    合并到spuParamsObj
    
# 上传图片组件(详细见 element-plus 文档)
	设置v-model双向绑定数据
	设置上传的接口 action属性
    设置list-type属性：文件列表的类型
	设置:on-preview属性：预览钩子
	设置:on-remove属性：删除钩子
	定义dialog响应式对象，用于控制预览的显示与隐藏
    const dialogVisible = ref(0)
    预览钩子函数，类型(element已经提供)
    const 预览钩子 = (文件对象:类型) =>{
        
    }
    上传钩子不用定义，element直接自动添加到imageListForEle中
    但是自动添加到imageListForEle中对象的url地址需要更改，默认是本地，需要更改为服务器上的URL
    定义dialog图片地址 对象存储图片地址
    
# 收集销售属性
	下拉框选择后，添加属性按钮激活
    往table表格中追加数据
    	属性列表中push数据
    table表格中tag的增加和删除
    	属性值列表中操作增加和删除
    往table表格中删除数据
    	属性列表中push数据
    在el-option标签上设置:value属性,用于收集下拉框元素的id和label名字
		使用 :value="`${}:${}`" 
		定义一个数据对象接收下拉框收集到的value值 const unSaleIdAndValue = ref()
    在el-select下拉框设置v-model="unSaleIdAndValue"
		点击添加销售属性按钮时，把unSaleIdAndValue中的内容(需要修改属性名)追加到spuHasSaleArr
# 把unSaleIdAndValue中的内容(需要修改属性名)追加到spuHasSaleArr

# 清空下拉框内的显示
	unSaleIdAndValue.value = ''

# table表格中tag的增加和删除
	静态页面属性值和编辑属性值的切换
    由于是多个分开控制切换，于是在数组中的对象中添加一个属性showInput，用于控制显示和编辑的切换
    定义一个点击事件回调，用于修改编辑模式切换，
    同时收集input输入框的数据，使用v-model双向绑定到当前行对象的saleAttrValueName属性上
    在ts类型中添加showInput属性和saleAttrValueName属性
    定义一个blur事件回调函数，用于往spuSaleAttrValueList中push一个新对象(把当前行对象提取出来内容，组成一个新对象)
	blur的回调后，判断属性值不能为空，不能重复，然后展示为div模式
# 删除销售属性的属性值
	直接在数组中删除 @close="row.spuSaleAttrValueList.splice(index, 1)"
# 删除销售属性 
    直接在数组中删除 @click="spuHasSaleArr.splice($index, 1)"
```

```vue
<template>
	<el-form label-width="120px">
		<el-form-item label="SPU名称">
			<el-input placeholder="请你输入SPU名称" v-model="spuParamsObj.spuName"></el-input>
		</el-form-item>
		<el-form-item label="SPU品牌">
			<el-select v-model="spuParamsObj.tmId" style="width: 240px">
				<el-option
					v-for="(trademark, index) in tradeMarkList"
					:key="trademark.id"
					:label="trademark.tmName"
					:value="trademark.id">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="SPU描述">
			<el-input type="textarea" v-model="spuParamsObj.description"></el-input>
		</el-form-item>
		<el-form-item label="SPU图片">
			<el-upload 
				:on-preview="handleImagePreview"
				list-type="picture-card"
				action="/app-dev/admin/product/fileUpload"
				v-model:file-list="imageListForEle">
				<el-icon>
					<Plus />
				</el-icon>
			</el-upload>
			<el-dialog style="margin-top: 100px" v-model="dialogVisible">
				<img alt="Preview Image" style="width: 250px; height: 250px" :src="dialogImageUrl"/>
			</el-dialog>
		</el-form-item>
		<el-form-item label="SPU销售属性">
			<el-select v-model="SaleAttrNameNoHasSelectStr" style="width: 240px">
				<el-option
					v-for="(item, index) in SaleAttrNameNoHasList"
					:key="item.id"
					:label="item.name"
					:value="`${item.id}:${item.name}`">
				</el-option>
			</el-select>
			<el-button type="primary" :icon="Plus" style="margin-left: 10px" 
				@click="addSaleAttr"
				:disabled="SaleAttrNameNoHasSelectStr ? false : true">
				添加销售属性
			</el-button>
		</el-form-item>
		<!-- 销售table -->
		<el-form-item>
			<el-table border :data="SaleAttrList">
				<el-table-column type="index" align="center" width="80px" label="序号"></el-table-column>
				<el-table-column label="属性名" width="120px" prop="saleAttrName"></el-table-column>

				<el-table-column label="属性值">
					<template #="{ row, $index }">
						<el-tag style="margin: 5px" 
							v-for="(item, index) in row.spuSaleAttrValueList"
							:key="item.id"
							@close="row.spuSaleAttrValueList.splice(index, 1)"
							closable>
							{{item.saleAttrValueName}}
						</el-tag>
						<el-input type="text" placeholder="请你输入属性值"
							v-model="row.saleAttrValueNameInp"
							v-if="row.showInput"
							@blur="toLook(row)"
							ref="inputRef"
							size="small" style="width: 120px"></el-input>
						<el-button type="primary" :icon="Plus" 
							v-else
							@click="toEdit(row)"
							size="small">
						</el-button>
					</template>
				</el-table-column>

				<el-table-column label="操作" width="120px">
					<template #="{ row, $index }">
						<el-button type="danger" size="small" 
							@click="SaleAttrList.splice($index, 1)"
							:icon="Delete">
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-form-item>
		<!-- 保存和取消 -->
		<el-form-item>
			<el-button type="primary" size="default" @click="save">保存</el-button>
			<el-button type="primary" size="default" @click="cancel">取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup lang='ts'>
import { Plus, Delete } from "@element-plus/icons-vue";
import { ref, reactive, computed,nextTick } from "vue";
import type { ImageArr, SaleAttrArr, SaleAttrNameArr, SaleAttrObj, SaleAttrValueObj, SpuObj, TradeMarkArr } from "@/api/product/type/spu"
import { reqAllTradeMark, reqBaseSale, reqImageList, reqSpuHasSaleAttr } from "@/api/product/spu"
import type { UploadProps, UploadUserFile } from 'element-plus'
import cloneDeep from 'lodash/cloneDeep'
import { ElMessage } from "element-plus";
// 获取input标签元素
const inputRef = ref<any>()

// 定义 spuObj 响应式数据对象
const spuParamsObj = reactive<SpuObj>({
	category3Id: "",
	spuName: "",
	description: "",
	tmId: "",
	spuImageList: [],
	spuSaleAttrList: []
});

// 品牌数据
const tradeMarkList = ref<TradeMarkArr>([]);
// 照片墙数据
const imageList = ref<ImageArr>([])
// 照片墙数据 (用于element渲染)
const imageListForEle = ref<any>([])
// 控制照片对话框的显示与隐藏
const dialogVisible = ref<boolean>(false)
// 预览照片的地址
const dialogImageUrl = ref<string>("");

// 销售属性数组
const SaleAttrList = ref<SaleAttrArr>([]);


// 销售属性属性名数组
const SaleAttrNameList = ref<SaleAttrNameArr>([])
// 销售属性属性名字符串(目前销售属性未拥有但是现在选中)
const SaleAttrNameNoHasSelectStr = ref<string>("")
// 销售属性属性名数组(目前销售属性未拥有的数组) 计算属性 
const SaleAttrNameNoHasList = computed(() => {
	const result = SaleAttrNameList.value.filter((item) => {
		return SaleAttrList.value.every((obj) => {
			return item.name != obj.saleAttrName;
		})
	})
	return result
});


// 获取事件函数
const $emits = defineEmits(["changeScene"]);
// 取消按钮
const cancel = () => {
	// 调用自定义事件 改变场景为1
	$emits("changeScene", 0)
}

// 编辑SPU函数 接收父组件的参数,存储getHasSpuList请求的响应数据(不完整),然后再发其他请求获取全部数据
const initSpuObj = async (row: SpuObj) => {
	// 使用对象深拷贝给spuParamsObj赋值
	Object.assign(spuParamsObj, cloneDeep(row));
	//获取全部品牌的数据
	const result: TradeMarkArr = await reqAllTradeMark();
	//获取某一个已有的SPU照片墙的数据
	const result1:ImageArr  = await reqImageList(row.id as number);
	//获取spu销售属性
	const result2:SaleAttrArr  = await reqSpuHasSaleAttr(row.id as number);
	//获取spu销售属性名称
	const result3:SaleAttrNameArr  = await reqBaseSale();
	// 存储品牌数组
	tradeMarkList.value = result
	// 存储照片墙数组
	imageList.value = result1
	// element渲染的照片做专门处理
	imageListForEle.value = result1.map((item) => {
		return {
			name: item.imgName,
			url: item.imgUrl,
		};
  	})
	// 存储spu销售属性
	SaleAttrList.value = result2
	// 存储销售属性属性名称数组
	SaleAttrNameList.value = result3
}

// 提交按钮
const save = () =>{
	// 处理照片墙
	handleImageUpload()
}

// 显示照片的显示放大
const handleImagePreview =(uploadFile:any)=>{
	// 对话框显示出来
	dialogVisible.value = true;
	// 设置预览照片地址
	dialogImageUrl.value = uploadFile.url as string;
}

// 处理照片墙的上传和合并到请求体
const handleImageUpload = () =>{

	// 遍历imageListForEle,并把imageListForEle中对象的url地址更改,最后赋值给imageList
	imageList.value = imageListForEle.value?.map((item:any)=>{
		return {
			Imgname:item.name,
			Imgurl:(item.response && item.response.data) || item.url
		}
	})
	// 把照片墙数组 imageList 追加到 spuParamsObj 中
	spuParamsObj.spuImageList = imageList.value
}

// 新增销售属性方法
const addSaleAttr = ()=>{
	// 从下拉框选中的字符串中结构出 属性名id和属性名Name
	const [baseSaleAttrId, saleAttrName] = SaleAttrNameNoHasSelectStr.value.split(":")
	// 定义一个 销售属性对象 用来存放新添加的 销售属性
	const SaleAttr = {
		baseSaleAttrId, //新增销售属性的ID
		saleAttrName, //新增的销售属性名字
		spuSaleAttrValueList: [], //存储属性值的数组
	}
	// 把这个销售对象 追加到 销售属性列表中
	SaleAttrList.value.push(SaleAttr as SaleAttrObj)
	// 清空下拉框的双向绑定数据
	SaleAttrNameNoHasSelectStr.value = ""
}

// 销售属性表格内 属性值列表 编辑和查看模式切换
	// 编辑模式
const toEdit = (row:SaleAttrObj)=>{
	// 在row行对象中的添加showInput属性,用于控制当前行对象中的显示和隐藏
	row.showInput = true
	// 清空输入框内容
	row.saleAttrValueNameInp = ""
	// 获取焦点
	// input输入框获取焦点
    nextTick(() => {
        inputRef.value.focus();
    });
}
	// 查看模式
const toLook = (row:SaleAttrObj)=>{
	// 非法情况判断
	// 属性值不能为空
		// 在行对象中添加saleAttrValueNameInp属性,用于存储当前行对象中input输入的内容
	if (row.saleAttrValueNameInp?.trim() == "") {
		ElMessage({
			type: "error",
			message: "属性值不能为空",
		})
		row.showInput = false
		return
	}
	// 属性值不能重复
	const repeat = row.spuSaleAttrValueList?.find((item) => {
		return row.saleAttrValueNameInp === item.saleAttrValueName;
	})
	if (repeat) {
		ElMessage({
			type: "error",
			message: "属性值不能重复",
		})
		return
	}
	// 切换为查看模式
	row.showInput = false
	// 向spuSaleAttrValueList数组中添加数据
		// 定义一个对象
	const SaleAttrValueItem = {
		baseSaleAttrId: row.baseSaleAttrId, //属性值对属于哪个属性名
    	saleAttrValueName: row.saleAttrValueNameInp, //新增的属性值的名字
	}
		// 添加新的属性值
	row.spuSaleAttrValueList?.push(SaleAttrValueItem as SaleAttrValueObj);
}


// 暴漏数据
defineExpose({
	initSpuObj,

});

</script>

<script lang="ts">
export default {
	name: "SpuForm"
}
</script>

<style scoped lang="less"></style>
```

#### 发送请求-更新

```ts
# 点击保存按钮提交数据
	定义save函数用于提交
    	整理参数
        	把照片列表和销售列表合并到spuParams中
                合并前把照片列表的结构更改为后端需要的结构
                    (使用数组的map方法把name属性更改为Imgname
                    使用数组的map方法把url属性更改为Imgurl)
                        当url是新增时,他的属性值为response中的url
                        当url是原有时，他的属性值就是url
            销售列表合并到spuParams中
        发送请求
        处理响应
        成功提示
        并切换场景
        	调用父组件的事件修改父组件中的scene值
            	父组件事件中的方法需要再次获取更新后的数据
                
```

父组件

```vue
<template>

</template>

<script>
// 改变场景scene
const changescene = (val:number) =>{
    // 修改scene的值
    scene.value = val
    //更新添加或者更新留在当前页或者第一页
    getHasSpuList()
    // if (val.flag == "add") {
    //     //添加
    //     getHasSpuList();
    // } else {
    //     //更新
    //     getHasSpuList(pageNo.value);
    // }
}
</script>
```

子组件

```vue
<template>
	<el-form label-width="120px">
		<el-form-item label="SPU名称">
			<el-input placeholder="请你输入SPU名称" v-model="spuParamsObj.spuName" style="width: 320px"></el-input>
		</el-form-item>
		<el-form-item label="SPU品牌">
			<el-select v-model="spuParamsObj.tmId" style="width: 320px">
				<el-option
					v-for="(trademark, index) in tradeMarkList"
					:key="trademark.id"
					:label="trademark.tmName"
					:value="trademark.id">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="SPU描述">
			<el-input type="textarea" v-model="spuParamsObj.description" style="width: 320px"></el-input>
		</el-form-item>
		<el-form-item label="SPU图片">
			<el-upload 
				:on-preview="handleImagePreview"
				list-type="picture-card"
				action="/app-dev/admin/product/fileUpload"
				v-model:file-list="imageListForEle">
				<el-icon>
					<Plus />
				</el-icon>
			</el-upload>
			<el-dialog style="margin-top: 100px" v-model="dialogVisible">
				<img alt="Preview Image" style="width: 250px; height: 250px" :src="dialogImageUrl"/>
			</el-dialog>
		</el-form-item>
		<el-form-item label="SPU销售属性">
			<el-select v-model="SaleAttrNameNoHasSelectStr" style="width: 240px">
				<el-option
					v-for="(item, index) in SaleAttrNameNoHasList"
					:key="item.id"
					:label="item.name"
					:value="`${item.id}:${item.name}`">
				</el-option>
			</el-select>
			<el-button type="primary" :icon="Plus" style="margin-left: 10px" 
				@click="addSaleAttr"
				:disabled="SaleAttrNameNoHasSelectStr ? false : true">
				添加销售属性
			</el-button>
		</el-form-item>
		<!-- 销售table -->
		<el-form-item>
			<el-table border :data="SaleAttrList">
				<el-table-column type="index" align="center" width="80px" label="序号"></el-table-column>
				<el-table-column label="属性名" width="120px" prop="saleAttrName"></el-table-column>

				<el-table-column label="属性值">
					<template #="{ row, $index }">
						<el-tag style="margin: 5px" 
							v-for="(item, index) in row.spuSaleAttrValueList"
							:key="item.id"
							@close="row.spuSaleAttrValueList.splice(index, 1)"
							closable>
							{{item.saleAttrValueName}}
						</el-tag>
						<el-input type="text" placeholder="请你输入属性值"
							v-model="row.saleAttrValueNameInp"
							v-if="row.showInput"
							@blur="toLook(row)"
							ref="inputRef"
							size="small" style="width: 120px"></el-input>
						<el-button type="primary" :icon="Plus" 
							v-else
							@click="toEdit(row)"
							size="small">
						</el-button>
					</template>
				</el-table-column>

				<el-table-column label="操作" width="120px">
					<template #="{ row, $index }">
						<el-button type="danger" size="small" 
							@click="SaleAttrList.splice($index, 1)"
							:icon="Delete">
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-form-item>
		<!-- 保存和取消 -->
		<el-form-item>
			<el-button type="primary" size="default" @click="save">保存</el-button>
			<el-button type="primary" size="default" @click="cancel">取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup lang='ts'>
import { Plus, Delete } from "@element-plus/icons-vue";
import { ref, reactive, computed,nextTick } from "vue";
import type { ImageArr, SaleAttrArr, SaleAttrNameArr, SaleAttrObj, SaleAttrValueObj, SpuObj, TradeMarkArr } from "@/api/product/type/spu"
import { reqAddOrUpdateSpu, reqAllTradeMark, reqBaseSale, reqImageList, reqSpuHasSaleAttr } from "@/api/product/spu"
import type { UploadProps, UploadUserFile } from 'element-plus'
import cloneDeep from 'lodash/cloneDeep'
import { ElMessage } from "element-plus";
// 获取input标签元素
const inputRef = ref<any>()

// 定义 spuObj 响应式数据对象
const spuParamsObj = reactive<SpuObj>({
	category3Id: "",
	spuName: "",
	description: "",
	tmId: "",
	spuImageList: [],
	spuSaleAttrList: []
});

// 品牌数据
const tradeMarkList = ref<TradeMarkArr>([]);
// 照片墙数据
const imageList = ref<ImageArr>([])
// 照片墙数据 (用于element渲染)
const imageListForEle = ref<any>([])
// 控制照片对话框的显示与隐藏
const dialogVisible = ref<boolean>(false)
// 预览照片的地址
const dialogImageUrl = ref<string>("");

// 销售属性数组
const SaleAttrList = ref<SaleAttrArr>([]);


// 销售属性属性名数组
const SaleAttrNameList = ref<SaleAttrNameArr>([])
// 销售属性属性名字符串(目前销售属性未拥有但是现在选中)
const SaleAttrNameNoHasSelectStr = ref<string>("")
// 销售属性属性名数组(目前销售属性未拥有的数组) 计算属性 
const SaleAttrNameNoHasList = computed(() => {
	const result = SaleAttrNameList.value.filter((item) => {
		return SaleAttrList.value.every((obj) => {
			return item.name != obj.saleAttrName;
		})
	})
	return result
});


// 获取事件函数
const $emits = defineEmits(["changeScene"]);
// 取消按钮
const cancel = () => {
	// 调用自定义事件 改变场景为1
	$emits("changeScene", 0)
}

// 编辑SPU函数 接收父组件的参数,存储getHasSpuList请求的响应数据(不完整),然后再发其他请求获取全部数据
const initSpuObj = async (row: SpuObj) => {
	// 使用对象深拷贝给spuParamsObj赋值
	Object.assign(spuParamsObj, cloneDeep(row));
	//获取全部品牌的数据
	const result: TradeMarkArr = await reqAllTradeMark();
	//获取某一个已有的SPU照片墙的数据
	const result1:ImageArr  = await reqImageList(row.id as number);
	//获取spu销售属性
	const result2:SaleAttrArr  = await reqSpuHasSaleAttr(row.id as number);
	//获取spu销售属性名称
	const result3:SaleAttrNameArr  = await reqBaseSale();
	// 存储品牌数组
	tradeMarkList.value = result
	// 存储照片墙数组
	imageList.value = result1
	// element渲染的照片做专门处理
	imageListForEle.value = result1.map((item) => {
		return {
			name: item.imgName,
			url: item.imgUrl,
		};
  	})
	// 存储spu销售属性
	SaleAttrList.value = result2
	// 存储销售属性属性名称数组
	SaleAttrNameList.value = result3
}

// 提交按钮
const save = async () =>{
	// 处理照片墙
	handleImageUpload()
	// 处理销售属性
	handleSaleAttr()
	// 发送请求
	await reqAddOrUpdateSpu(spuParamsObj).then(()=>{
		//提示消息
		ElMessage({
			type: "success",
			message: spuParamsObj.id ? "更新成功" : "添加成功",
    	});
		// 切换场景为 spu table展示数据
		$emits("changeScene",0)
	}).catch((err)=>{
		console.log(err)
	})
}

// 显示照片的显示放大
const handleImagePreview =(uploadFile:any)=>{
	// 对话框显示出来
	dialogVisible.value = true;
	// 设置预览照片地址
	dialogImageUrl.value = uploadFile.url as string;
}

// 处理销售属性
const handleSaleAttr = () =>{
	// 把销售属性 合并到 spuParamsObj中
	spuParamsObj.spuSaleAttrList = SaleAttrList.value
}

// 处理照片墙的上传和合并到请求体
const handleImageUpload = () =>{

	// 遍历imageListForEle,并把imageListForEle中对象的url地址更改,最后赋值给imageList
	imageList.value = imageListForEle.value?.map((item:any)=>{
		return {
			imgName:item.name,
			imgUrl:(item.response && item.response.data) || item.url
		}
	})
	// 把照片墙数组 imageList 追加到 spuParamsObj 中
	spuParamsObj.spuImageList = imageList.value
}

// 新增销售属性方法
const addSaleAttr = ()=>{
	// 从下拉框选中的字符串中结构出 属性名id和属性名Name
	const [baseSaleAttrId, saleAttrName] = SaleAttrNameNoHasSelectStr.value.split(":")
	// 定义一个 销售属性对象 用来存放新添加的 销售属性
	const SaleAttr = {
		baseSaleAttrId, //新增销售属性的ID
		saleAttrName, //新增的销售属性名字
		spuSaleAttrValueList: [], //存储属性值的数组
	}
	// 把这个销售对象 追加到 销售属性列表中
	SaleAttrList.value.push(SaleAttr as SaleAttrObj)
	// 清空下拉框的双向绑定数据
	SaleAttrNameNoHasSelectStr.value = ""
}

// 销售属性表格内 属性值列表 编辑和查看模式切换
	// 编辑模式
const toEdit = (row:SaleAttrObj)=>{
	// 在row行对象中的添加showInput属性,用于控制当前行对象中的显示和隐藏
	row.showInput = true
	// 清空输入框内容
	row.saleAttrValueNameInp = ""
	// 获取焦点
	// input输入框获取焦点
    nextTick(() => {
        inputRef.value.focus();
    });
}
	// 查看模式
const toLook = (row:SaleAttrObj)=>{
	// 非法情况判断
	// 属性值不能为空
		// 在行对象中添加saleAttrValueNameInp属性,用于存储当前行对象中input输入的内容
	if (row.saleAttrValueNameInp?.trim() == "") {
		ElMessage({
			type: "error",
			message: "属性值不能为空",
		})
		row.showInput = false
		return
	}
	// 属性值不能重复
	const repeat = row.spuSaleAttrValueList?.find((item) => {
		return row.saleAttrValueNameInp === item.saleAttrValueName;
	})
	if (repeat) {
		ElMessage({
			type: "error",
			message: "属性值不能重复",
		})
		return
	}
	// 切换为查看模式
	row.showInput = false
	// 向spuSaleAttrValueList数组中添加数据
		// 定义一个对象
	const SaleAttrValueItem = {
		baseSaleAttrId: row.baseSaleAttrId, //属性值对属于哪个属性名
    	saleAttrValueName: row.saleAttrValueNameInp, //新增的属性值的名字
	}
		// 添加新的属性值
	row.spuSaleAttrValueList?.push(SaleAttrValueItem as SaleAttrValueObj);
}


// 暴漏数据
defineExpose({
	initSpuObj,

});

</script>

<script lang="ts">
export default {
	name: "SpuForm"
}
</script>

<style scoped lang="less"></style>
```

### 添加SPU

#### 封装接口

src/api/product/spu.ts

```ts
//添加与更新已有的SPU接口
export const reqAddOrUpdateSpu = (data: SpuObj) => {
    if (data.id) {
        //更新
        return request.post(API.UPDATESPU_URL, data);
    } else {
        //添加
        return request.post(API.ADDSPU_URL, data);
    }
}
```

#### 切换场景发送请求

```ts
# 在添加按钮上设置 事件
	事件回调中设置
    	切换场景
        发送请求：
        	 获取品牌和销售属性名(子组件暴漏方法,父组件调用)
			获取三级分类Id(父组件传参)
			调用接口
# 优化
	编辑后，取消后清空数组
    	在点击添加SPU按钮的回调中清空数组(子组件暴露的方法中)
			清空照片墙
             清空销售属性
             清空spuParamsObj
			清空spuid
	添加后,回到第一页,更新保持在当前页
		在父组件的changescene函数中更改
        	使用第二个参数或使用一个对象作为参数,用来区分是添加还是更新
# 点击保存按钮发送请求
```

父组件

```vue
<template>
    <div>
        <!-- 分类全局组件-->
        <Category :scene="scene"></Category>
        <!-- 展示已有的SPU -->
        <el-card style="margin: 10px 0px">
            <!-- SPU table -->
            <div v-show="scene === 0">

                <!-- 添加按钮 -->
                <el-button
                    type="primary"
                    :icon="Plus"
                    @click="addSpu"
                    :disabled="categoryStore.c3Id ? false : true">添加SPU
                </el-button>

                <!-- 表格展示已有的SPU -->
                <el-table border style="margin: 10px 0px" :data="spuList" v-if="spuList.length">
                    <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="80px">
                    </el-table-column>
                    <el-table-column
                        label="SPU名称"
                        :resizable="false"
                        prop="spuName"
                        >
                    </el-table-column>
                    <el-table-column
                        label="SPU描述"
                        prop="description"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column label="SPU操作">
                    <!-- row:代表即为某一个三级分类下已有的SPU -->
                        <template #="{ row, $index }">
                            <el-button
                                :icon="Plus"
                                type="primary"
                                size="small"
                                title="添加SKU">
                            </el-button>
                            <el-button
                                :icon="Edit"
                                type="warning"
                                size="small"
                                @click="updateSpu(row)"
                                title="修改SPU">
                            </el-button>
                            <el-button
                                :icon="InfoFilled"
                                type="info"
                                size="small"
                                title="查看SKU列表">
                            </el-button>
                            <el-button
                                :icon="Delete"
                                type="danger"
                                size="small"
                                title="删除SPU">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分割线 -->
                <el-divider content-position="center" v-else>
                    <span style="color: aqua">暂无数据</span>
                </el-divider>
                <!-- 分页器 -->
                <el-pagination
                    v-model:current-page="pageNo"
                    v-model:page-size="pageSize"
                    :page-sizes="[3, 5, 7]"
                    background
                    layout="prev, pager, next, jumper,->,sizes,total"
                    :total="total"
                    @current-change="getHasSpuList"
                    @size-change="SizeChange"
                />
            </div>
            <!-- spu form -->
            <SpuForm ref="spu" @changeScene="changescene" v-show="scene === 1"></SpuForm>
            
        </el-card>
    </div>
</template>

<script setup lang='ts'>
import SpuForm from './spuForm/index.vue'

import { ref, watch } from "vue";
import { Plus, Edit, Delete, InfoFilled,StarFilled  } from "@element-plus/icons-vue";
import type {SpuObjArr,SpuObj, SpuListResponseData} from "@/api/product/type/spu"
import useCategoryStore from "@/stores/category"
import { reqSpuList } from "@/api/product/spu";

//获取子组件spuForm
const spu = ref<any>();
//分类需要的场景的数值
const scene = ref<number>(0);
//小仓库
const categoryStore = useCategoryStore();
//全部已有的SPU
const spuList = ref<SpuObjArr>([])
//spu总个数
const total = ref<number>(0)
//分页器当前页码
const pageNo = ref<number>(1);
//每一页展示数据的条数
const pageSize = ref<number>(3);

watch(()=>categoryStore.c3Id,()=>{
    // 清空SPU列表
    spuList.value = [];
    // 分页设置为0
    total.value = 0;
    categoryStore.c3Id && getHasSpuList();
})

// 获取SPU列表
const getHasSpuList = async(value: number = 1)=>{
    // 修改pageNo
    pageNo.value = value;
    // 发送请求
    const result:SpuListResponseData = await reqSpuList(pageNo.value,pageSize.value,categoryStore.c3Id)
    // 修改数据
    total.value = result.total
    spuList.value = result.records
}

// 每页数改变
const SizeChange = (value: number) => {
    pageSize.value = value;
    getHasSpuList();
}

// 添加SPU
const addSpu = ()=>{
    //点击切换场景为1 (添加新的SPU|更新已有的SPU)
    scene.value = 1;
    // 父组件调用子组件方法
    spu.value.initDataForAddSpu(categoryStore.c3Id)
}

// 更新SPU
const updateSpu = (row:SpuObj) =>{
    // 切换场景
    scene.value = 1;
    // 通过ref对象调用子组件中的方法,并给子组件传参
    spu.value.initDataForEditSpu(row)
}

// 改变场景scene
const changescene = (val:number,flag:string) =>{
    // 修改scene的值
    scene.value = val
    //更新添加或者更新留在当前页或者第一页
    if (flag === "add") {
        //添加
        getHasSpuList();
    } else {
        //更新
        getHasSpuList(pageNo.value);
    }
}


</script>

<style scoped lang="less">
</style>
```

子组件

```vue
<template>
	<el-form label-width="120px">
		<el-form-item label="SPU名称">
			<el-input placeholder="请你输入SPU名称" v-model="spuParamsObj.spuName" style="width: 320px"></el-input>
		</el-form-item>
		<el-form-item label="SPU品牌">
			<el-select v-model="spuParamsObj.tmId" style="width: 320px">
				<el-option
					v-for="(trademark, index) in tradeMarkList"
					:key="trademark.id"
					:label="trademark.tmName"
					:value="trademark.id">
				</el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="SPU描述">
			<el-input type="textarea" v-model="spuParamsObj.description" style="width: 320px"></el-input>
		</el-form-item>
		<el-form-item label="SPU图片">
			<el-upload 
				:on-preview="handleImagePreview"
				list-type="picture-card"
				action="/app-dev/admin/product/fileUpload"
				v-model:file-list="imageListForEle">
				<el-icon>
					<Plus />
				</el-icon>
			</el-upload>
			<el-dialog style="margin-top: 100px" v-model="dialogVisible">
				<img alt="Preview Image" style="width: 250px; height: 250px" :src="dialogImageUrl"/>
			</el-dialog>
		</el-form-item>
		<el-form-item label="SPU销售属性">
			<el-select v-model="SaleAttrNameNoHasSelectStr" style="width: 240px">
				<el-option
					v-for="(item, index) in SaleAttrNameNoHasList"
					:key="item.id"
					:label="item.name"
					:value="`${item.id}:${item.name}`">
				</el-option>
			</el-select>
			<el-button type="primary" :icon="Plus" style="margin-left: 10px" 
				@click="addSaleAttr"
				:disabled="SaleAttrNameNoHasSelectStr ? false : true">
				添加销售属性
			</el-button>
		</el-form-item>
		<!-- 销售table -->
		<el-form-item>
			<el-table border :data="SaleAttrList">
				<el-table-column type="index" align="center" width="80px" label="序号"></el-table-column>
				<el-table-column label="属性名" width="120px" prop="saleAttrName"></el-table-column>

				<el-table-column label="属性值">
					<template #="{ row, $index }">
						<el-tag style="margin: 5px" 
							v-for="(item, index) in row.spuSaleAttrValueList"
							:key="item.id"
							@close="row.spuSaleAttrValueList.splice(index, 1)"
							closable>
							{{item.saleAttrValueName}}
						</el-tag>
						<el-input type="text" placeholder="请你输入属性值"
							v-model="row.saleAttrValueNameInp"
							v-if="row.showInput"
							@blur="toLook(row)"
							ref="inputRef"
							size="small" style="width: 120px"></el-input>
						<el-button type="primary" :icon="Plus" 
							v-else
							@click="toEdit(row)"
							size="small">
						</el-button>
					</template>
				</el-table-column>

				<el-table-column label="操作" width="120px">
					<template #="{ row, $index }">
						<el-button type="danger" size="small" 
							@click="SaleAttrList.splice($index, 1)"
							:icon="Delete">
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-form-item>
		<!-- 保存和取消 -->
		<el-form-item>
			<el-button type="primary" size="default" @click="save">保存</el-button>
			<el-button type="primary" size="default" @click="cancel">取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script setup lang='ts'>
import { Plus, Delete } from "@element-plus/icons-vue";
import { ref, reactive, computed,nextTick } from "vue";
import type { ImageArr, SaleAttrArr, SaleAttrNameArr, SaleAttrObj, SaleAttrValueObj, SpuObj, TradeMarkArr } from "@/api/product/type/spu"
import { reqAddOrUpdateSpu, reqAllTradeMark, reqBaseSale, reqImageList, reqSpuHasSaleAttr } from "@/api/product/spu"
import type { UploadProps, UploadUserFile } from 'element-plus'
import cloneDeep from 'lodash/cloneDeep'
import { ElMessage } from "element-plus";
// 获取input标签元素
const inputRef = ref<any>()

// 定义 spuObj 响应式数据对象
const spuParamsObj = reactive<SpuObj>({
	category3Id: "",
	spuName: "",
	description: "",
	tmId: "",
	spuImageList: [],
	spuSaleAttrList: []
});

// 品牌数据
const tradeMarkList = ref<TradeMarkArr>([]);
// 照片墙数据 (用于element渲染)
const imageListForEle = ref<any>([])
// 控制照片对话框的显示与隐藏
const dialogVisible = ref<boolean>(false)
// 预览照片的地址
const dialogImageUrl = ref<string>("");

// 销售属性数组
const SaleAttrList = ref<SaleAttrArr>([]);


// 销售属性属性名数组
const SaleAttrNameList = ref<SaleAttrNameArr>([])
// 销售属性属性名字符串(目前销售属性未拥有但是现在选中)
const SaleAttrNameNoHasSelectStr = ref<string>("")
// 销售属性属性名数组(目前销售属性未拥有的数组) 计算属性 
const SaleAttrNameNoHasList = computed(() => {
	const result = SaleAttrNameList.value.filter((item) => {
		// 从SaleAttrNameList数组中过滤出SaleAttrList中没有的
		return SaleAttrList.value.every((obj) => {
			return item.name != obj.saleAttrName;
		})
	})
	return result
});


// 获取事件函数
const $emits = defineEmits(["changeScene"]);
// 取消按钮
const cancel = () => {
	// 调用自定义事件 改变场景为1
	$emits("changeScene", 0)
}

// 编辑SPU函数 接收父组件的参数,存储getHasSpuList请求的响应数据(不完整),然后再发其他请求获取全部数据
const initDataForEditSpu = async (row: SpuObj) => {
	// 使用对象深拷贝给spuParamsObj赋值
	Object.assign(spuParamsObj, cloneDeep(row));
	//获取全部品牌的数据
	const result: TradeMarkArr = await reqAllTradeMark();
	//获取某一个已有的SPU照片墙的数据
	const result1:ImageArr  = await reqImageList(row.id as number);
	//获取spu销售属性
	const result2:SaleAttrArr  = await reqSpuHasSaleAttr(row.id as number);
	//获取spu销售属性名称
	const result3:SaleAttrNameArr  = await reqBaseSale();
	// 存储品牌数组
	tradeMarkList.value = result
	// element渲染的照片做专门处理
	imageListForEle.value = result1.map((item) => {
		return {
			name: item.imgName,
			url: item.imgUrl,
		};
  	})
	// 存储spu销售属性
	SaleAttrList.value = result2
	// 存储销售属性属性名称数组
	SaleAttrNameList.value = result3
}

// 新增SPU函数
const initDataForAddSpu = async (c3Id:string| number) =>{
	// 清空表单数据
	reset()
	// 收集三级分类id
	spuParamsObj.category3Id = c3Id
	// 收集品牌数据
	const result:TradeMarkArr = await reqAllTradeMark()
	// 收集销售属性
	const result1:SaleAttrNameArr = await reqBaseSale()
	tradeMarkList.value = result
	SaleAttrNameList.value = result1
}

// 提交按钮
const save = async () =>{
	// 处理照片墙
	handleImageUpload()
	// 处理销售属性
	handleSaleAttr()
	// 发送请求
	await reqAddOrUpdateSpu(spuParamsObj).then(()=>{
		//提示消息
		ElMessage({
			type: "success",
			message: spuParamsObj.id ? "更新成功" : "添加成功",
    	});
		// 切换场景为 spu table展示数据
		$emits("changeScene",0,spuParamsObj.id ? 'update':'add')
	}).catch((err)=>{
		console.log(err)
	})
}

// 重置表单
const reset = () =>{
	// 清空照片墙
	imageListForEle.value = []
	// 清空销售属性
	SaleAttrList.value = []
	// 清空请求体数据
	Object.assign(spuParamsObj,{
		category3Id: "",
		spuName: "",
		description: "",
		tmId: "",
		spuImageList: [],
		spuSaleAttrList: [],
		id:''
	})
}

// 显示照片的显示放大
const handleImagePreview =(uploadFile:any)=>{
	// 对话框显示出来
	dialogVisible.value = true;
	// 设置预览照片地址
	dialogImageUrl.value = uploadFile.url as string;
}

// 处理销售属性
const handleSaleAttr = () =>{
	// 把销售属性 合并到 spuParamsObj中
	spuParamsObj.spuSaleAttrList = SaleAttrList.value
}

// 处理照片墙的上传和合并到请求体
const handleImageUpload = () =>{

	// 遍历imageListForEle,并把imageListForEle中对象的url地址更改,最后赋值给spuParamsObj.spuImageList
	const imageTemp = imageListForEle.value?.map((item:any)=>{
		return {
			imgName:item.name,
			imgUrl:(item.response && item.response.data) || item.url
		}
	})
	spuParamsObj.spuImageList = imageTemp
}

// 新增销售属性方法
const addSaleAttr = ()=>{
	// 从下拉框选中的字符串中结构出 属性名id和属性名Name
	const [baseSaleAttrId, saleAttrName] = SaleAttrNameNoHasSelectStr.value.split(":")
	// 定义一个 销售属性对象 用来存放新添加的 销售属性
	const SaleAttr = {
		baseSaleAttrId, //新增销售属性的ID
		saleAttrName, //新增的销售属性名字
		spuSaleAttrValueList: [], //存储属性值的数组
	}
	// 把这个销售对象 追加到 销售属性列表中
	SaleAttrList.value.push(SaleAttr as SaleAttrObj)
	// 清空下拉框的双向绑定数据
	SaleAttrNameNoHasSelectStr.value = ""
}

// 销售属性表格内 属性值列表 编辑和查看模式切换
	// 编辑模式
const toEdit = (row:SaleAttrObj)=>{
	// 在row行对象中的添加showInput属性,用于控制当前行对象中的显示和隐藏
	row.showInput = true
	// 清空输入框内容
	row.saleAttrValueNameInp = ""
	// 获取焦点
	// input输入框获取焦点
    nextTick(() => {
        inputRef.value.focus();
    });
}
	// 查看模式
const toLook = (row:SaleAttrObj)=>{
	// 非法情况判断
	// 属性值不能为空
		// 在行对象中添加saleAttrValueNameInp属性,用于存储当前行对象中input输入的内容
	if (row.saleAttrValueNameInp?.trim() == "") {
		ElMessage({
			type: "error",
			message: "属性值不能为空",
		})
		row.showInput = false
		return
	}
	// 属性值不能重复
	const repeat = row.spuSaleAttrValueList?.find((item) => {
		return row.saleAttrValueNameInp === item.saleAttrValueName;
	})
	if (repeat) {
		ElMessage({
			type: "error",
			message: "属性值不能重复",
		})
		return
	}
	// 切换为查看模式
	row.showInput = false
	// 向spuSaleAttrValueList数组中添加数据
		// 定义一个对象
	const SaleAttrValueItem = {
		baseSaleAttrId: row.baseSaleAttrId, //属性值对属于哪个属性名
    	saleAttrValueName: row.saleAttrValueNameInp, //新增的属性值的名字
	}
		// 添加新的属性值
	row.spuSaleAttrValueList?.push(SaleAttrValueItem as SaleAttrValueObj);
}


// 暴漏数据
defineExpose({
	initDataForEditSpu,
	initDataForAddSpu
});

</script>

<script lang="ts">
export default {
	name: "SpuForm"
}
</script>

<style scoped lang="less"></style>
```

### 向Spu添加Sku

#### 添加SKU静态页面

```vue
<template>
    <el-form label-width="80px">
        <el-form-item label="SKU名称">
            <el-input placeholder="请你输入SKU名称"></el-input>
        </el-form-item>
        <el-form-item label="SKU价格">
            <el-input
                placeholder="请你输入SKU价格"
                type="number">
            </el-input>
        </el-form-item>
        <el-form-item label="SKU重量">
            <el-input
                placeholder="请你输入SKU重量"
                type="number">
            </el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input
                placeholder="请你输入SKU描述"
                type="textarea">
            </el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form :inline="true">
                <el-form-item>
                    123
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true">
                <el-form-item>
                    <el-select>
                        123
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border ref="table">
                <el-table-column type="selection" align="center" width="80px"></el-table-column>
                <el-table-column label="图片">
                    <template #="{ row, $index }">
                        <img style="width: 100px; height: 100px" />
                    </template>
                </el-table-column>
                <el-table-column label="名称" ></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button>123</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" >保存</el-button>
            <el-button size="default" >取消</el-button>
        </el-form-item>
  </el-form>
</template>

<script setup lang='ts'>

</script>

<script lang='ts'>
export default {
    name: "skuForm"
}
</script>

<style scoped lang="less"></style>
```

#### 封装请求接口

src/api/product/spu.ts

```ts
// 添加sku接口
export const reqAddSku = (data:skuParamsObj)=>request.post<any,any>(API.ADDSKU_URL,data);
```

#### 绑定事件获取数据

```ts
# 点击添加SKU按钮触发事件
	父组件设置自定义事件,定义更新场景的函数
# 给子组件绑定自定义事件:更新场景值
	子组件点击取消,保存按钮时调用父组件的事件传参,更新场景值(不需要发请求刷新页面)
# 点击添加SKU按钮时发送请求获取数据
	在子组件定义一个函数初始化数据 initDataForSku
    	获取一级,二级,三级分类id
        获取平台属性
        获取销售属性名
        获取照片墙
    父组件调用子组件的方法或属性(ref绑定子组件 ref="addSku" v-show不需要使用nextTick,因为v-show是隐藏)
    存储数据
    	存储平台属性
        存储销售属性名
        存储照片墙
```

#### 渲染数据

```vue
<template>
    <el-form label-width="80px">
        <el-form-item label="SKU名称">
            <el-input placeholder="请你输入SKU名称" v-model="skuParams.skuName"></el-input>
        </el-form-item>
        <el-form-item label="SKU价格">
            <el-input
                placeholder="请你输入SKU价格"
                v-model="skuParams.price"
                type="number">
            </el-input>
        </el-form-item>
        <el-form-item label="SKU重量">
            <el-input
                placeholder="请你输入SKU重量"
                v-model="skuParams.weight"
                type="number">
            </el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input
                placeholder="请你输入SKU描述"
                v-model="skuParams.skuDesc"
                type="textarea">
            </el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form :inline="true">
                <el-form-item
                    style="margin-top:10px"
                    label-width="80px"
                    :key="platAttrValue.id"
                    :label="platAttrValue.attrName"
                    v-for="(platAttrValue, index) in platAttrValueList">
                    <el-select style="width: 260px;">
                        <el-option
                            v-for="(item, index) in platAttrValue.attrValueList"
                            :label="item.valueName"
                            :key="item.id"
                            :value="`${platAttrValue.id}:${item.id}`">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true">
                <el-form-item
                    style="margin-top:10px"
                    label-width="80px"
                    :label="saleAttrValue.saleAttrName"
                    v-for="(saleAttrValue, index) in saleAttrValueList"
                    :key="saleAttrValue.baseSaleAttrId">
                    <el-select style="width: 260px;">
                        <el-option
                            v-for="(item, index) in saleAttrValue.spuSaleAttrValueList"
                            :label="item.saleAttrValueName"
                            :key="item.id"
                            :value="`${saleAttrValue.baseSaleAttrId}:${item.id}`">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border ref="table" :data="imageList">
                <el-table-column type="selection" align="center" width="80px"></el-table-column>
                <el-table-column label="图片">
                    <template #="{ row, $index }">
                        <img :src="row.imgUrl" style="width: 100px; height: 100px" />
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button
                            
                            :type="row.isDefault ? 'primary' : 'danger'"
                            size="small">
                            {{ row.isDefault ? "默认图片" : "设置默认" }}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="default" @click="save">保存</el-button>
            <el-button size="default" @click="$emits('changeSceneForSku', 0)">取消</el-button>
        </el-form-item>
  </el-form>
</template>

<script setup lang='ts'>
import { reqAttrList } from "@/api/product/attr";
import { reqImageList, reqSpuHasSaleAttr } from "@/api/product/spu";
import type { AttrResponseData } from "@/api/product/type/attr";
import type { ImageArr, SaleAttrArr, SaleAttrNameArr, skuParamsObj, SpuObj } from "@/api/product/type/spu";
import { nextTick, ref } from "vue";

const table = ref<any>()

const skuParams = ref<skuParamsObj>({
    //父组件传递过来数据
    category3Id: "", //三级分类的ID
    spuId: "", //SPU的ID
    tmId: "", //SPU归属于哪一个品牌
    //v-model
    skuName: "", //SKU名字
    price: "", //SKU价格
    weight: "", //SKU重量
    skuDesc: "", //SKU商品的描述
    skuDefaultImg: "", //默认图片的地址
    skuAttrValueList: [
        //收集平台属性的数据
        // {
        //   attrId: "", //平台属性的ID
        //   valueId: "", //平台属性值的ID
        // },
    ],
    skuSaleAttrValueList: [
        //收集销售属性
        // {
        //   saleAttrId: "", //销售属性的ID
        //   saleAttrValueId: "", //属性值的ID
        // },
    ],
})

// 存储平台属性
const platAttrValueList = ref<AttrResponseData>([])
// 存储销售属性
const saleAttrValueList = ref<SaleAttrArr>([]);
// 存储照片墙的数据
const imageList = ref<ImageArr>([]);


// 初始化数据
const initDataForAddSku = async (c1Id:number|string,c2Id:number|string,data:SpuObj) =>{
    // 清空数据


    // 收集数据
    skuParams.value.category3Id = data.category3Id;
    skuParams.value.spuId = data.id as number;
    skuParams.value.tmId = data.tmId;
    //获取某一个三级分类下全部平台属性
    const result1: AttrResponseData = await reqAttrList(c1Id, c2Id, data.category3Id);
    //获取某一个SPU下拥有销售属性
    const result2: SaleAttrArr = await reqSpuHasSaleAttr(data.id as number);
    //获取某一个SPU旗下照片墙的数据
    const result3: ImageArr = await reqImageList(data.id as number);
    platAttrValueList.value = result1;
    saleAttrValueList.value = result2;
    // 调用处理照片墙
    handleImage(result3)

}
// 提交
const save = () =>{
    $emits("changeSceneForSku", 0);
}

// 处理照片墙
const handleImage = (res:ImageArr)=>{
    // 如果存在照片,修改数据结构
    if (res.length) {
        // 排他
        for (var i = 0; i < res.length; i++) {
            res[i].isDefault = false;
        }
        // 第一张设置默认样式
        res[0].isDefault = true;
        // 收集默认图片地址为第一张
        skuParams.value.skuDefaultImg = res[0].imgUrl;
    }
    // 将修改后的图片存储
    imageList.value = res
    // 设置table复选框勾选,使用nextTick获取更新后的dom
    nextTick(() => {
        table.value.toggleRowSelection(imageList.value[0], true);
    })
}

// 获取事件对象
const $emits = defineEmits(["changeSceneForSku"])
// 暴露数据
defineExpose({
    initDataForAddSku
})

</script>

<script lang='ts'>
export default {
    name: "skuForm"
}
</script>

<style scoped lang="less"></style>
```

#### 收集更新数据发送请求

```ts
# 需要收集的数据
{
      category3Id:"",//三级分类的ID
      spuId:"",//SPU的ID
      tmId:"",//SPU归属于哪一个品牌

      skuName: "",//SKU名字
      price:"",//SKU价格
      weight: "",//SKU重量
      skuDesc: "",//SKU商品的描述
      skuDefaultImg: "", //默认图片的地址
      skuAttrValueList: [ //收集平台属性的数据
        {
              attrId:"",//平台属性的ID
              valueId:"",//平台属性值的ID
        }
      ],
     skuSaleAttrValueList: [ //收集销售属性值
         {
             saleAttrId:"",//销售属性的ID
             saleAttrValueId:"",//属性值的ID
        }
     ]
}
```

```ts
# 定义一个数据类型
# 收集父组件传过来的参数
	category3Id:"",//三级分类的ID
     spuId:"",//SPU的ID
     tmId:"",//SPU归属于哪一个品牌
# 在el-form-item标签中设置 v-model 双向绑定收集
	 skuName: "",//SKU名字
      price:"",//SKU价格
      weight: "",//SKU重量
      skuDesc: "",//SKU商品的描述
# 收集平台属性
	skuAttrValueList: [ //收集平台属性的数据
        {
              attrId:"",//平台属性的ID，在外层for循环
              valueId:"",//平台属性值的ID，在内层for循环
        },
        {
              attrId:"",//平台属性的ID，在外层for循环
              valueId:"",//平台属性值的ID，在内层for循环
        }
	]

     思路：先把收集的到的平台属性id和属性值id放在对象attr上attrAndValueStr(字符串中拼接的有属性ID和属性值ID),然后处理字符串,把字符串内容赋值给skuAttrValueList数组内对应对象的对应属性上。
		在el-option标签上通过value属性把两个数据收集到一个字符串中 :value="`${}:${}`"
		在el-select标签上通过v-model属性双向绑定数据到 attr对象的 attrAndValueStr 属性上
         (这里的attrList是通过reqSpuHasSaleAttr接口请求获取到的)
	<el-form-item v-for="(attr,index) in attrList">
        <el-select v-model="attr.attrAndValueStr">
            <el-option v-for="(item,index) in attr" :value="`${}:${}`">
            	
            </el-option>
        </el-select>
	</el-form-item>

# 收集销售属性数据
	修改数据结构：使用字符串收集到数组中的对象属性上
    
# 收集图片地址
	在table表格中设置默认图片操作
    	修改数据结构：在数组中的对象中设置isDefault属性
        	使用数组的方法遍历图片数组,给所有对象中设置isDefault属性默认为false
			第一张图片设置为true
        通过三元表达式设置默认按钮渲染
    table表格设置复选框勾选
    	给table设置ref对象,使用table的方法设置勾选(需要nextTick获取最新的dom)
		
    给设置默认图片按钮设置事件,执行回调函数changeDefaultImage
		updateDefault()函数中(排他思想)
        	遍历数组全部为不勾选
            点击的行对象设置默认按钮,勾选复选框
			收集sku默认图片地址同时默认设置收集第一张(在初始化数据时)
            
```

#### 处理数据发送请求

```ts
# 处理平台属性数据结构和销售属性结构
	遍历平台属性数组(使用reduce方法)，判断每个元素是否有attrIdAndValueId(收集的属性名和属性值字符串)
		有,把字符串转为对象,追加到数组中,最后返回这个数组
		无,跳过
# 把处理好的数据赋值给skuParams

# 发送请求
	成功,
        提示信息
		跳转页面
    失败
    
# 清空数据
	在初始化数据(点击添加按钮的回调)时首先清空数据
```

```ts
使用reduce方法模拟for循环:
// 设置起始值为一个空数组为初始值,往空数组追加元素,遍历完数组后,返回最有一次执行的结果。
arr.reduce((prev,next)=>{
    // 如果元素对象中存在某一个属性,把这个属性的属性值
   	if(next.attrIdAndValueId){
        // 从数组中解构出属性id和属性值id
        const [attrId,valueId] = next.attrIdAndValueId.split(":")
        // 定义一个对象
        const attrIdAndValueIdObj = {
            attrId,
            valueId
        }
        // 向空数组中push追加元素
        prev.push(attrIdAndValueIdObj)
        // 返回数组
        return prev
    }
},[])
```

### 查看Spu中的sku

```ts
# 查看sku按钮绑定单机事件,并定义事件回调函数showSku
# 渲染dialog页面
	定义响应式数据控制显示和隐藏showDialog
	使用table组件
    
# 封装请求
	定义类型
    定义接口

# 发送请求
	在点击事件时发送请求(父组件传递spuid,通过ref对象绑定组件实现)
	在点击事件时发送请求(直接发送,因为在同一个组件中)

# 存储数据
	定义响应式数据 skuArr
    
# 渲染数据
	
# 加载效果
	element-plus所有组件都支持
	在table上加上v-loading效果
	在查看sku列表的回调中设置 loading数据状态的切换
    	每次查看sku列表的时候把上次数据清空
        发请求之前加载,数据回来之后加载消失
```

接口类型和接口

```ts
/*********************查看sku类型**********************/
export interface skuElement{
    id?:number,
    spuId?:number,
    price:number,
    skuName:string,
    skuDesc:string,
    weight:string,
    tmId:number,
    category3Id:number,
    skuDefaultImg:string,
    isSale?:number,
    skuImageList?:null,
    skuAttrValueList?:null,
    skuSaleAttrValueList?:null
}
export type skuArr = skuElement[]
/*****************************************************/
```

```ts
// 获取某品牌的sku
export const reqSkuList = (spuId:number)=>request.get<any,skuArr>(API.FINDSKU_URL+spuId);
```

渲染数据

```vue
<template>
    <div>
        <!-- 分类全局组件-->
        <Category :scene="scene"></Category>
        <!-- 展示已有的SPU -->
        <el-card style="margin: 10px 0px">
            <!-- SPU table -->
            <div v-show="scene === 0">

                <!-- 添加按钮 -->
                <el-button
                    type="primary"
                    :icon="Plus"
                    @click="addSpu"
                    :disabled="categoryStore.c3Id ? false : true">添加SPU
                </el-button>

                <!-- 表格展示已有的SPU -->
                <el-table border style="margin: 10px 0px" :data="spuList" v-if="spuList.length">
                    <el-table-column
                        type="index"
                        label="序号"
                        align="center"
                        width="80px">
                    </el-table-column>
                    <el-table-column
                        label="SPU名称"
                        :resizable="false"
                        prop="spuName"
                        >
                    </el-table-column>
                    <el-table-column
                        label="SPU描述"
                        prop="description"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column label="SPU操作">
                    <!-- row:代表即为某一个三级分类下已有的SPU -->
                        <template #="{ row, $index }">
                            <el-button
                                :icon="Plus"
                                type="primary"
                                size="small"
                                @click="addSku(row)"
                                title="添加SKU">
                            </el-button>
                            <el-button
                                :icon="Edit"
                                type="warning"
                                size="small"
                                @click="updateSpu(row)"
                                title="修改SPU">
                            </el-button>
                            <el-button
                                :icon="InfoFilled"
                                type="info"
                                size="small"
                                @click="showSku(row)"
                                title="查看SKU列表">
                            </el-button>
                            <el-button
                                :icon="Delete"
                                type="danger"
                                size="small"
                                title="删除SPU">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分割线 -->
                <el-divider content-position="center" v-else>
                    <span style="color: aqua">暂无数据</span>
                </el-divider>
                <!-- 分页器 -->
                <el-pagination
                    v-model:current-page="pageNo"
                    v-model:page-size="pageSize"
                    :page-sizes="[3, 5, 7]"
                    background
                    layout="prev, pager, next, jumper,->,sizes,total"
                    :total="total"
                    @current-change="getHasSpuList"
                    @size-change="SizeChange"
                />
            </div>
            <!-- spu form -->
            <SpuForm ref="spu" @changeScene="changescene" v-show="scene === 1"></SpuForm>
            <!-- sku form -->
            <SkuForm ref="sku" @changeSceneForSku="changesceneForsku" v-show="scene === 2"></SkuForm>
        </el-card>
        <!-- dialog -->
        <el-dialog title="SKU列表" v-model="showDailog">
            <el-table border :data="skuList" v-loading="tableLoading">
                <el-table-column label="SKU名称" prop="skuName"></el-table-column>
                <el-table-column label="SKU价格" prop="price"></el-table-column>
                <el-table-column label="SKU重量" prop="weight"></el-table-column>
                <el-table-column label="SKU图片">
                    <template #="{ row, $index }">
                        <img :src="row.skuDefaultImg" alt="" style="width: 100px; height: 100px" />
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script setup lang='ts'>
import SpuForm from './spuForm/index.vue'
import SkuForm from '@/views/product/spu/skuFrom/index.vue'
import { ref, watch } from "vue";
import { Plus, Edit, Delete, InfoFilled,StarFilled  } from "@element-plus/icons-vue";
import type {SpuObjArr,SpuObj, SpuListResponseData, skuArr} from "@/api/product/type/spu"
import useCategoryStore from "@/stores/category"
import { reqSkuList, reqSpuList } from "@/api/product/spu";

//获取子组件spuForm
const spu = ref<any>();
const sku = ref<any>();
//分类需要的场景的数值
const scene = ref<number>(0);
//小仓库
const categoryStore = useCategoryStore();
//全部已有的SPU
const spuList = ref<SpuObjArr>([])
//spu总个数
const total = ref<number>(0)
//分页器当前页码
const pageNo = ref<number>(1);
//每一页展示数据的条数
const pageSize = ref<number>(3);
// sku列表数据
const skuList = ref<skuArr>([])
// 控制dialog显示与隐藏
const showDailog = ref<boolean>(false)
const tableLoading = ref<boolean>(false)
watch(()=>categoryStore.c3Id,()=>{
    // 清空SPU列表
    spuList.value = [];
    // 分页设置为0
    total.value = 0;
    categoryStore.c3Id && getHasSpuList();
})

// 获取SPU列表
const getHasSpuList = async(value: number = 1)=>{
    // 修改pageNo
    pageNo.value = value;
    // 发送请求
    const result:SpuListResponseData = await reqSpuList(pageNo.value,pageSize.value,categoryStore.c3Id)
    // 修改数据
    total.value = result.total
    spuList.value = result.records
}

// 每页数改变
const SizeChange = (value: number) => {
    pageSize.value = value;
    getHasSpuList();
}

// 添加SPU
const addSpu = ()=>{
    //点击切换场景为1 (添加新的SPU|更新已有的SPU)
    scene.value = 1;
    // 父组件调用子组件方法
    spu.value.initDataForAddSpu(categoryStore.c3Id)
}

// 更新SPU
const updateSpu = (row:SpuObj) =>{
    // 切换场景
    scene.value = 1;
    // 通过ref对象调用子组件中的方法,并给子组件传参
    spu.value.initDataForEditSpu(row)
}

// 添加Sku
const addSku = (row:SpuObj) =>{
    // 切换场景
    scene.value = 2;
    // 父组件调用子组件方法
    sku.value.initDataForAddSku(categoryStore.c1Id,categoryStore.c2Id,row)
}

// 查看sku
const showSku = async (row:SpuObj)=>{
    // 清空数据
    skuList.value = []
    
    // 显示dialog
    showDailog.value = true;
    // 加载
    tableLoading.value=true
    // 发送请求
    skuList.value = await reqSkuList(row.id as number);
    // 加载取消
    tableLoading.value=false
}

// 改变场景scene
const changescene = (val:number,flag:string) =>{
    // 修改scene的值
    scene.value = val
    //更新添加或者更新留在当前页或者第一页
    if (flag === "add") {
        //添加
        getHasSpuList();
    } else {
        //更新
        getHasSpuList(pageNo.value);
    }
}
const changesceneForsku = (val:number) =>{
    scene.value = val
}

</script>

<style scoped lang="less">
</style>
```



### 删除SPU业务

```ts
# 封装接口

# 绑定事件,并定义事件回调函数

# 发送请求
	在点击事件时发送请求
  	
```

```vue
<template>
<el-button
    :icon="Delete"
    type="danger"
    size="small"
    @click="delSpu(row)"
    title="删除SPU">
</el-button>
</template>

<script>

// 删除spu
const delSpu = async(row:SpuObj)=>{
    await reqDeleteSpu(row.id as number).then(()=>{
        ElMessage({
            type: "success",
            message: "删除成功",
        })
        getHasSpuList()
    }).catch((err)=>{
        ElMessage({
            type: "error",
            message: "删除失败",
        })
    })
}
</script>

```

