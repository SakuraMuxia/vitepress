## File API

### FileList 对象和 File 对象

 所有 type 属性 (attribute) 为 file 的 `<input>` 元素都有一个 files 属性 ,用来存储用户所选择的文件 。每个文件用一个 File 对象表示，File 对象是一种二进制数据。

```javascript
[元素对象].files	返回一个filelist类型的伪数组

[元素对象].files[0]  得到第一张图片对象
```



### FileReader

#### 创建实例

FileReader 对象是 HTML5 中新增的 API，用于读取文件数据，FileReader 是一个类，使用时需要创建实例:

```js
const reader = new FileReader();
```

#### 实例的方法

| 方法                         | 描述                                                     |
| ---------------------------- | -------------------------------------------------------- |
| readAsArrayBuffer(file)      | 以 ArrayBuffer 格式读取文件数据。                        |
| readAsBinaryString(file)     | 以二进制字符串格式读取文件数据。                         |
| readAsDataURL(file)          | 以 base64 编码的字符串格式读取文件数据                   |
| readAsText(file, [encoding]) | 以文本格式读取文件数据。可以指定编码方式，默认为 UTF-8。 |
| abort()                      | 停止文件读取操作。                                       |

#### 事件


在使用 FileReader 对象时，通常需要监听其  `load`  事件，该事件在文件读取完成后触发，可以在事件回调函数中获取文件数据。同时，还可以监听  `error`  事件和  `progress`  事件，分别用于处理读取错误和读取进度。

```js
// 获取文件输入框和预览图片的 DOM 元素
const fileInput = document.getElementById('fileInput');
const previewImg = document.getElementById('previewImg');

// 监听文件输入框的 change 事件
fileInput.addEventListener('change', () => {
  // 获取选中的文件
  const file = fileInput.files[0];
  if (!file) {
    return;
  }
  // 创建 FileReader 对象，用于读取文件数据
  const reader = new FileReader();
  // 监听 FileReader 对象的 load 事件，当文件读取完成后，将文件数据显示在预览图片中
  reader.addEventListener('load', () => {
    previewImg.src = reader.result;
  });
  // reader.result 是图片的base64编码
  // 读取文件数据
  reader.readAsDataURL(file);
});
```

