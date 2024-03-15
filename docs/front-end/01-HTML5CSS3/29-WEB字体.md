# WEB 字体

## web 字体基本语法

```css
/* 声明 web 字体 */
@font-face {
    font-family: 'diyfont';
    src: url('diyfont.eot'); /* IE9兼容模式 */
    src: url('diyfont.eot?#iefix') format('embedded-opentype'), /* IE9 - */
         url('diyfont.woff') format('woff'), /* chrome、firefox opera  safari  IE9+ 最佳格式 */
         url('diyfont.ttf') format('truetype'), /* chrome、firefox、opera、Safari, Android, iOS 4.2+ IE9+*/
         url('diyfont.svg#fontname') format('svg'); /* iOS 4.1- */
}


/* 使用 web 字体 */
.box {
    font-family: "diyfont";
}
```

**字体格式的转换工具：**

- https://www.fontsquirrel.com/tools/webfont-generator FontSquirrel在线工具
- https://www.fontke.com/tool/fontface/ 字客网

**字体定制工具：**

- https://www.iconfont.cn/webfont?spm=a313x.7781068.0.d81ec59f2#!/webfont/index 阿里Web字体
- http://www.youziku.com/ 字体库网站
- https://www.ziti163.com/webfont/create.aspx 字体网

### 字体图标

#### ① 阿里图标

地址：  http://www.iconfont.cn/

#### ② font-awesome

地址：http://fontawesome.dashgame.com/

#### ③ 字体图标制作工具 icoMoon

地址： http://icomoon.io/app/#/select



