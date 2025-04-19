# nvue语法差异

使用vue2语法

## css差异

![image-20250408110449730](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20250408110449730.png)

## ust差异

![image-20250408110622332](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20250408110622332.png)

![image-20250408111007569](https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20250408111007569.png)

## 安全区域空白处理

使用内置的 safe-area 样式类

```vue
<template>
  <view class="container">
    <map class="map" id="map" :latitude="latitude" :longitude="longitude" />
    <view class="safe-area-inset-bottom"></view>
  </view>
</template>

<style scoped>
.container {
  flex: 1;
  flex-direction: column;
}
.map {
  flex: 1;
  width: 750rpx;
}
</style>

```

##  超出部分显示省略号

使用 lines 和 text-overflow 实现单行省略号

```css
.ellipsis-text {
  lines: 1; /* 显示1行 */
  text-overflow: ellipsis; /* 超出显示... */
  overflow: hidden;
  font-size: 28rpx;
  color: #333;
}
```

