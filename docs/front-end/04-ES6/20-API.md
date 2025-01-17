# API

## 全屏API

可以通过浏览器的 `Fullscreen API` 将任意 DOM 元素或页面全屏化

```ts
<template>
  <div>
    <el-button type="primary" @click="toggleFullscreen">
      {{ isFullscreen ? '退出全屏' : '全屏显示' }}
    </el-button>
    <div ref="fullscreenContent" class="fullscreen-content">
      <el-card>
        <h2>这里是全屏内容</h2>
        <p>你可以将这个区域全屏显示。</p>
      </el-card>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const fullscreenContent = ref(null); // 引用需要全屏的 DOM 元素
    const isFullscreen = ref(false); // 是否全屏的状态

    const toggleFullscreen = () => {
      const elem = fullscreenContent.value;
      if (!isFullscreen.value) {
        // 进入全屏
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
      } else {
        // 退出全屏
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      isFullscreen.value = !isFullscreen.value; // 切换状态
    };

    return {
      fullscreenContent,
      isFullscreen,
      toggleFullscreen,
    };
  },
};
</script>

<style>
.fullscreen-content {
  border: 1px solid #ebeef5;
  padding: 20px;
  margin-top: 20px;
}
</style>

```

