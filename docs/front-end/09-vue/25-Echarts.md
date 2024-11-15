# Echarts

数据大屏

```ts
# 使用数据大屏时,兼容性处理
    方式一：宽度和高度不要写死,使用 vw(宽度) vh(高度) 作为计量单位 代替px
    方式二：使用transform缩放(css3语法)
```

## 基础铺垫

### canvas标签

`canvas` 是 HTML5 的新特性，它允许我们使用 `canvas` 元素在网页上通过 JavaScript 绘制图像。

`<canvas>` 标签只是图形容器，相当于一个画布，`canvas` 元素本身是没有绘图能力的。所有的绘制工作必须在 JavaScript 内部完成，相当于使用画笔在画布上画画。

```ts
# 默认高度和宽度 300px * 150 px

# 浏览器认为canvas标签相当于图片

# canvas的宽度和高度不能用样式去设置
	需要使用 属性 来设置 
    
# canvas中标签内的内容必须通过js控制
```

**注意：必须指定宽高，没有高度不显示**

```html
<canvas id="charts" width="800" height="400"></canvas>
```

### getContext()

`context` 是一个封装了很多绘图功能的对象，我们在页面中创建一个 `canvas` 标签之后，首先要使用 `getContext()` 获取 `canvas` 的上下文环境，目前 `getContext()` 的参数只有 2d，暂时还不支持 3d 

`getContext("2d")` 对象是内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法。

`返回值`是一个对象: context ，context上有很多属性，原型上也有很多方法。

```js
const canvas = document.getElementById('charts');
const context = canvas.getContext('2d');
const context = canvas.getContext('WebGL'); // 3D绘制
```

#### 对象方法

##### 绘制线段

- `moveTo(x, y)`：把路径移动到画布中的指定点，不创建线条
- `lineTo(x, y)`：添加一个新点，然后在画布中创建从该点到最后指定点的线条

```js
// 设置线段的颜色
context.strokeStyle = 'yellowgreen';
// 设置线段的起点
context.moveTo(0, 0);
// 设置线段的其他点
context.lineTo(100, 100);
// 画线
context.stroke();
// 签字的效果
// 使用canvas
canvas.onmousedown = (event)=>{
    context.beginPath();
    // 鼠标移动起点
    context.moveTo(event.offsetX,event.offsetY);
    // 鼠标移动
    canvas.onmousemove = () =>{
        // 中间的点
        context.lineTo(event.offsetX,event.offsetY)
        // 划线
        context.stroke();
    }
}
// 鼠标抬起
canvas.onmouseup = (event)=>{
    // 清除划线效果
    canvas.onmousemove = null
}
```


##### 绘制矩形

- `fillRect(x, y, width, height)` 绘制填充颜色的矩形
- `strokeRect(x, y, width, height)` 绘制线条的矩形

```js
// 设置颜色 支持英文 支持十六进制 支持rgb
context.fillStyle = "pink";
context.strokeStyle = "darkred";
context.fillRect(0, 0, 100, 100);
context.strokeRect(120, 0, 100, 100);
```

##### 绘制圆形

- `arc(x, y, radius, starAngle, endAngle, anticlockwise)`
  - x : 圆心的 x 坐标
  - y：圆心的 y 坐标
  - radius ： 半径
  - starAngle ：开始角度
  - endAngle：结束角度
  - anticlockwise ：是否逆时针（true）为逆时针，(false)为顺时针

```js
context.beginPath();
context.arc(300, 350, 100, 0, Math.PI * 2, true);
//不关闭路径路径会一直保留下去
context.closePath();
context.fillStyle = 'rgba(0,255,0,0.25)';
context.fill(); 
// 或
// context.stroke(); // 此时就会有问题
```

##### 绘制弧

清除绘画的路径，多个图形就不会连接在一起

```js
// 开始绘制
context.beginPath()
// 弧度
context.arc(x坐标,y坐标,半径,起始度数,结束度数,是否逆时针绘制)
context.arc(100,100,50,0,Math.PI,false)
// 设置弧线的宽度
context.lineWidth = 10
// 设置弧线的颜色
context.strokeStyle = 'red'
// 停止绘制
context.closePath()
```

##### 清除矩形区域

当在一个画布反复绘制图形，需要将上一次的图形清空

- `clearRect(x, y, width, height)`

##### 绘制文字

- `fillText(text, x, y, maxWidth)`
- font()

```ts
设置字体
content.font = '20px 微软雅黑'
```

[一个少女心满满的例子带你入门 Canvas](https://juejin.cn/post/6844903490020442125)

#### 使用案例

```ts
后台管理项目 首页 

\FrontTraining\Vue3\Project\backEndManagement
```



### svg标签

SVG是一种基于 XML 的图像文件格式，它的英文全称为Scalable Vector Graphics，意思为可缩放的矢量图形

svg可以设置样式


#### 基本SVG元素

你可以深入 SVG 复杂的细节，但这对我们即将创建的图标不是必须的。以下列表涵盖了我们将用到的构建块。

- `<svg>` 包裹并定义整个矢量图。`<svg>` 标签之于矢量图就如同 `<html>` 标签之于一个 web 页面。
- `<line>` 创建一条直线。
- `<polyline>` 创建折线。

- `<rect>` 创建矩形。
- `<circle>` 创建圆。
- `<ellipse>` 创建圆和椭圆。
- `<polygon>` 创建多边形。
- `<path>` 通过指定点以及点和点之间的线来创建任意形状。

#### 详细使用

所有标签都要包裹在 `<svg>` 中使用

1. `<line>`

```html
<!-- 
  x1 y1 是第一个点坐标
  x2 y2 是第二个点坐标
 -->
<line x1="" y1="" x2="" y2=""></line>
```

2. `<polyline>`

```html
<!-- 
  依次传入点坐标，即可绘制
 -->
<polyline points="
  x1 y1
  x2 y2
  x3 y3
  ...
"></polyline>
<!-- 你也可以把上面的代码写成： -->
<polyline points="x1 y1, x2 y2, x3 y3"></polyline>
<!-- 或 -->
<polyline points="x1 y1 x2 y2 x3 y3"></polyline>
```

3. `<rect>`

```html
<!-- 
  x y 左上角点坐标
  width 宽度
  height 高度
 -->
<rect x="" y="" width="" height=""></rect>
```

4. `<circle>`

```html
<!--  
  cx cy 圆心点坐标
  r 半径
  style 样式
-->
<circle cx='70' cy='95' r='50' style='stroke:black; fill:none;stroke-width=10px'></circle>
```

5. `<ellipse>`

```html
<!-- 
  cx cy 圆心点坐标
  rx x轴半径
  ry y轴半径
 -->
<ellipse cx="" cy="" rx="" ry="" style="fill:black;"></ellipse>
```

6. `<polygon>`

```html
<polygon points="x1 y1, x2 y2, x3 y3" />
```

7. `<path>`

```html
<!--
  M 移动到初始位置
  L 画线
  Z 将结束和开始点闭合
-->
<path d="
  M x1 y1
  L x2 y2
  L x3 y3
  L x4 y4
  L x5 y5
  L x6 y6
  L x7 y7
  Z
"></path>
```

起始文件

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Hand Coded SVG</title>
  <style>
    html,
    body {
      height: 100%;
      width: 100%;
      background: #e9e9e9;
    }

    body {
      margin: 0;
      text-align: center;
    }

    .grid {
      width: 750px;
      height: 500px;
      margin: 0 auto;
      padding-top: 100px;
      padding-left: 100px;
      background-image: url('grid.png');
      position: relative;
    }

    .grid::before {
      content: "";
      border-left: 1px solid #7c7cea;
      position: absolute;
      top: 0;
      left: 100px;
      width: 750px;
      height: 600px;
    }

    .grid::after {
      content: "";
      border-top: 1px solid #7c7cea;
      position: absolute;
      top: 100px;
      left: 0;
      width: 850px;
      height: 500px;
    }

    svg {
      stroke: #000;
      stroke-width: 5;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
    }
  </style>
</head>

<body>

  <div class="grid">

  </div>

</body>

</html>
```

- [SVG入门—如何手写SVG](https://juejin.cn/post/6844903589807128590)
- [SVG 入门指南](https://juejin.cn/post/6844904017273815048)

## 配置项使用

### 安装

```ts
npm install echarts
```

### 入门使用

**1 引入Echarts**

在刚才保存 `echarts.js` 的目录新建一个 `index.html` 文件，内容如下

```ts
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <!-- 引入刚刚下载的 ECharts 文件 -->
    <script src="echarts.js"></script>
  </head>
</html>
```

**2 创建一个容器,用于挂载点**

```html
<body>
  <!-- 为 ECharts 准备一个定义了宽高的 DOM 务必要有高度-->
  <div id="main" style="width: 600px;height:400px;"></div>
</body>
```

**3 绘制柱状图**

```ts
echarts.js 这个包对外暴漏了一个对象 `echarts`

echarts.init 方法初始化一个 echarts 实例

实例setOption()方法

setOption()方法传一个配置对象
const option = {}
setOption(option)

var option = {
        title: { //图形图标标题 在Echarts中每一个配置项叫组件
          text: 'ECharts 入门示例' //标题
          left:'center' //标题位置
          textStyle{
            color:'red' //标题颜色
          }
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: { // x轴
          type:'category' // 在x轴上均匀分布
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: { // y轴
            show:false // 隐藏y轴
            axisline:{ // 
                show:true // 显示轴线
            } 
        },
        series: [ // 系列组件
          {
            name: '销量',
            type: 'bar', // 图形图标类型
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };
```

echarts.js 这个包对外暴漏了一个对象 `echarts`

然后就可以通过 echarts.init 方法初始化一个 echarts 实例并通过 setOption 方法生成一个简单的柱状图，下面是完整代码

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>ECharts</title>
    <!-- 引入刚刚下载的 ECharts 文件 -->
    <script src="echarts.js"></script>
  </head>
  <body>
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
    <div id="main" style="width: 600px;height:400px;"></div>
    <script type="text/javascript">
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    </script>
  </body>
</html>
```

**使用案例**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 引入echarts依赖包 -->
    <script src="./js/echarts.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .app {
            width: 600px;
            height: 400px;
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <!-- 呈现图形图标的区域:务必要有高度 -->
    <div class="app"></div>
</body>

</html>
<script>
    //初始化一个echarts实例
    const mycharts = echarts.init(document.querySelector('.app'));
    //准备一个配置对象
    let options = {
        //图形图标的标题:组件
        title: {
            text: '柱状图',//主标题的内容
            left: "center",//标题位置
            textStyle: {
                color: 'red'
            }
        },
        //x轴组件
        xAxis: {
            axisLine: {
                show: true
            },
            type: 'category'
        },
        //y轴组件
        yAxis: {
            axisLine: {
                show: true
            },

        },
        //系列组件
        series: {
            //图形图标的类型
            type: 'bar',//bar,pie,line......
            //图形图标需要展示的数据
            data: [10, 20, 30, 40, 50]
        }
    };
    //通过echarts类的实力setOption方法设置配置对象
    mycharts.setOption(options);
</script>
```

### 柱状图

**使用案例**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 引入echarts依赖包 -->
    <script src="./js/echarts.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .app {
            width: 700px;
            height: 400px;
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <!-- 呈现图形图标的区域:务必要有高度 -->
    <div class="app"></div>
</body>

</html>
<script>
    //初始化一个echarts实例
    const mycharts = echarts.init(document.querySelector('.app'));
    //准备一个配置对象
    let options = {
        //标题组件
        title: {
            text: '柱状图',//标题内容
            link: 'http://www.sina.com',//超链接的设置
            textStyle: {
                color: '#2b2b2b', // 设置字体颜色
                fontWeight: 900, // 设置字体粗细
                textBorderColor: 'cyan', // 设置字体描边颜色
                textBorderWidth: 1, // 设置字体描边宽度
                textBorderType: 'dashed' // 设置字体描边虚实线
            },
            subtext: '副标题',
            //副标题与主标题距离设置
            itemGap: 20,
            left: 'center',//位置的调试
        },
        xAxis: {
            //x轴图形图标均匀分布
            type: 'category',
            //x轴的名称
            name: '中国军事',
            //轴的位置
            nameLocation: 'center',
            //轴名称与轴线距离
            nameGap: 25,
            //坐标轴上的数值
            min: 0,
            max: 6,
            //x轴的轴线设置
            axisLine: {
                symbol: ['none', 'arrow'], // 轴线两边箭头
                symbolSize: [15, 15], // 箭头大小
                symbolOffset: [15, 18], // 箭头的偏移
                lineStyle: { // 轴线的style
                    
                    color: { //轴线的渐变颜色
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'red' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'blue' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    },
                    type: 'dashed', // 设置轴线的 虚实
                    width: 1  // 设置轴线的宽度
                }
            },
            axisTick: { //刻度
                lineStyle: {
                    color: 'red' // 设置刻度的颜色
                }
            }
            
        },
        yAxis: {
            //轴线
            axisLine: {
                show: true
            },
            //分割线
            splitLine: {
                show: false, // 不展示分割线
                lineStyle: {
                    color: ['red', 'orange', 'yellow'], // 分割线的颜色
                    width: 10 // 分割线的宽度
                }
            },
            //刻度
            axisTick: {
                show: true
            },
            type: 'value'
        },
        series: { // 当系列的类型是一个对象时,只能在容器中展示一个图形,系列的类型是数组时,容器展示多个图形
            type: "bar",
            data: [11, 88, 44, 32, 81],
            //柱条的背景颜色的设置
            showBackground: true,
            backgroundStyle: {
                color: "#3c3c3c"
            },
            //图形的文字标签
            label: {
                show: true, // 图形的值
                rotate: 15, // 图形值的样式
                //文字位置
                position: 'top'
            },
            
            itemStyle: { //柱条样式设置
                borderWidth: 3,// 柱条的描边宽度
                borderColor: 'red', // 柱条的描边颜色
                borderType: 'dotted', // 柱条的描边类型
                color: (params) => { // 柱条的颜色 支持回调函数写法
                    // 回调函数在每个柱条渲染时都执行一次
                    // 函数中参数是一个对象 
                    // 对象中包含每个柱条的属性(data,dataIndex...)
                    // 返回值是一个颜色对象
                    const arr = ['red', 'orange', 'yellow', 'green', 'cyan']
                    return arr[params.dataIndex] //返回一个颜色对象
                },
            },
            //柱条的宽度
            barWidth: 30
        }
    };
    //通过echarts类的实例setOption方法设置配置对象
    mycharts.setOption(options);
</script>
```

一个容器显示多个图形图标

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 引入echarts依赖包 -->
    <script src="./js/echarts.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .app {
            width: 700px;
            height: 400px;
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <!-- 呈现图形图标的区域:务必要有高度 -->
    <div class="app"></div>
</body>

</html>
<script>
    //初始化一个echarts实例
    const mycharts = echarts.init(document.querySelector('.app'));
    //准备一个配置对象
    let options = {
        //标题组件
        title: {
            text: '柱状图',//标题内容
            link: 'http://www.sina.com',//超链接的设置
            textStyle: {
                color: '#2b2b2b',
                fontWeight: 900,
                textBorderColor: 'cyan',
                textBorderWidth: 1,
                textBorderType: 'dashed'
            },
            subtext: '副标题',
            //副标题与主标题距离设置
            itemGap: 20,
            left: 'center',//位置的调试
        },
        xAxis: {
            //x轴图形图标均匀分布
            type: 'category',
            //x轴的名称
            name: '中国军事',
            //轴的位置
            nameLocation: 'center',
            //轴名称与轴线距离
            nameGap: 25,
            //最小数值
            min: 0,
            max: 6,
            //x轴的轴线设置
            axisLine: {
                symbol: ['none', 'arrow'],
                symbolSize: [15, 15],
                symbolOffset: [15, 18],
                lineStyle: {
                    //轴线的颜色
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'red' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'blue' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    },
                    type: 'dashed',
                    width: 1
                }
            },
            //刻度
            axisTick: {

                lineStyle: {
                    color: 'red'
                }
            }
        },
        yAxis: {
            //轴线
            axisLine: {
                show: true
            },
            //分割线
            splitLine: {
                show: false,
                lineStyle: {
                    color: ['red', 'orange', 'yellow'],
                    width: 10
                }
            },
            //刻度
            axisTick: {
                show: true
            },
        },
        series: [
            {
                type: 'bar',
                data: [11, 33, 21, 44, 66]
            }
            ,
            {
                type: 'bar',
                data: [10, 20, 30, 40, 50]
            },
            {
                type: 'bar',
                data: [10, 20, 30, 40, 50]
            },
            {
                type: 'line',
                data: [10, 20, 30, 40, 50]
            }

        ]
    };
    //通过echarts类的实力setOption方法设置配置对象
    mycharts.setOption(options);
</script>
```

### 折线图

**使用案例**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 引入echarts依赖包 -->
    <script src="./js/echarts.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .app {
            width: 700px;
            height: 400px;
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <!-- 呈现图形图标的区域:务必要有高度 -->
    <div class="app"></div>
</body>

</html>
<script>
    //初始化一个echarts实例
    const mycharts = echarts.init(document.querySelector('.app'));
    //准备一个配置对象
    let options = {
        title: {
            text: '折线'
        },
        xAxis: {
            // 均匀分布
            type: 'category',
            //两个留白取消
            boundaryGap: false
            // 在x轴上设置指示器
            axisPointer:{
            	show:true,
            	type://指示器的类型
        	}
        },
        yAxis: {},
        series: [
            {
                type: 'line',
                data: [0, 33, 77, 21, 88, 44, 65, 59, 66, 2],
                //平滑曲线
                smooth: true,
                //填充区域
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0, color: 'white' // 0% 处的颜色
                        }, {
                            offset: 1, color: 'black' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
                //图文标签
                label: {
                    show: true,
                    color: 'pink'
                },
                //折线拐点标志的样式。
                itemStyle: {
                    color: 'red'
                },
                //线条的颜色
                lineStyle: {
                    color: 'green',
                    type: 'dashed'
                },

                //拐点的样式
                symbol: (value, b) => {
					// 回调函数
                    // 参数是 拐点的值,第二个参数是 拐点对象
                    // 返回值是一个图片对象
                    return 'image://https://img1.baidu.com/it/u=1870893305,2129963787&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889'
                },
                symbolSize: '22', // 设置拐点的大小
                //高亮样式
                emphasis: {
                    // focus:'self',
                    // itemStyle:{
                    //     color:'red'
                    // }
                }
            },

        ]
    	// 提示框组件(存在拐点时才显示，设置x轴y轴指示器时也可以显示)
        tooltip: {
            textStyle: {
                color: 'red'
            },
            //背景颜色
            backgroundColor: 'rgba(0,0,0,.3)'
            // 限制在图表区域内
            confine:true
        },
        // 布局组件:用于把柱状图,饼图,折线图 设置样式
        grid: {
            left:25,
            bottom:25,
            right:0,
            show: true,
            // 设置背景色
            backgroundColor: 'red'
        },
    };
    //通过echarts类的实力setOption方法设置配置对象
    mycharts.setOption(options);
</script>
```

### 饼状图布局

**使用案例**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 引入echarts依赖包 -->
    <script src="./js/echarts.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .app {
            width: 700px;
            height: 400px;
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <!-- 呈现图形图标的区域:务必要有高度 -->
    <div class="app"></div>
</body>

</html>
<script>
    //初始化一个echarts实例
    const mycharts = echarts.init(document.querySelector('.app'));
    //准备一个配置对象
    let options = {
        title: {
            text: '饼图'
        },
        xAxis: {
            type: 'category',
            //分割线
            splitLine: {
                show: true
            }
        },
        yAxis: {

            axisLine:{
                show:true,
                lineStyle:{
                    width:10
                }
            }
        },
        series: [
            {
                type: 'pie',
                // data 的数据类型 引用数据类型
                data: [{ name: '中国', value: 1888 }, { name: '菲律宾', value: 128 }, { name: '蒙古', value: 666 }],
                //饼图大小
                width: 300,
                height: 300,
                //位置调试
                left: '20%',
                // 设置饼图的半径
                radius: 50,
                // 饼图同心圆
                radius: [80,20],
                //图文标签
                label: {
                    position: 'outside', // 标签位置
                    color: 'green' // 标签颜色
                },
                //视觉引导线
                labelLine: {
                    smooth: true, // 是否是平滑曲线
                    lineStyle: { // 视觉引导线样式
                        color: "red",
                        type: 'dashed'
                    }
                },
                //图形的颜色
                itemStyle: {
                    color: (value) => {
                        const arr = ['cyan', 'red', 'yellowgreen'];
                        return arr[value.dataIndex]
                    },
                    borderWidth: 3, // 描边宽度
                    borderColor: 'pink' // 描边颜色
                }
            },
            {
                type: 'bar',
                data: [10, 20, 30, 40, 50, 60]
            }
        ],
        // 布局组件:用于把柱状图,饼图 设置样式
        grid: {
            left:25,
            bottom:25,
            right:0,
            show: true,
            backgroundColor: 'red'
        }
    };
    //通过echarts类的实力setOption方法设置配置对象
    mycharts.setOption(options);
</script>
```

### 雷达图

```ts

```



### 其他组件

#### 图例组件

图例组件展现了不同`系列`(图形)的`标记`(symbol)，颜色和名字。可以通过点击`图例`控制哪些系列不显示

#### 提示框组件

不能设置div的样式,div样式会影响提示框的样式

```ts
//提示框组件
tooltip: {
    textStyle: {
        color: 'red'
    },
    //背景颜色
    backgroundColor: 'rgba(0,0,0,.3)'
},
```

#### 区域缩放组件

```ts

```

#### 工具栏组件

```ts

```

**使用案例**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 引入echarts依赖包 -->
    <script src="./js/echarts.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .app {
            width: 700px;
            height: 400px;
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <!-- 呈现图形图标的区域:务必要有高度 -->
    <div class="app"></div>
</body>

</html>
<script>
    //初始化一个echarts实例
    const mycharts = echarts.init(document.querySelector('.app'));
    //准备一个配置对象
    let options = {
        title: {
            text: '其他组件'
        },
        xAxis: {
            // 在x轴均匀分布
            type: 'category'
        },
        yAxis: {},
        //图例组件
        legend: { // 控制哪个图形显示和隐藏
            left: 0,
            //方向的设置
            orient: 'vertical',
            //图标距离
            itemGap: 20
        },
        series: [ // 存放不同的图形
            {
                name: '柱状图', // 系列的名称用于 图例组件控制 显示与隐藏
                type: 'bar',
                data: [10, 20, 30, 40, 50, 60]
            },
            {
                name: '折线图',
                type: 'line',
                data: [33, 77, 22, 13, 66, 93]
            },
            {
                name: '散点图',
                type: 'scatter',
                data: [10, 44, 33, 22, 11, 23, 2, 44, 37, 99, 77, 555, 444]
            }
        ],
        //提示框组件 这里的样式用的是 div标签 ,注意div的样式 不要影响这个提示框
        tooltip: {
            textStyle: {
                color: 'red' // 提示框内
            },
            //背景颜色
            backgroundColor: 'rgba(0,0,0,.3)'
        },
        //区域缩放组件
        dataZoom: {},
        //工具栏组件
        toolbox: {
            show: true,
            feature: {

                dataView: {
                    readOnly: false
                },
                magicType: { // 
                    type: ["line", "bar"]
                },
                restore: {}, // 还原
                saveAsImage: {}, // 保存图片
                dataZoom: { // 区域缩放
                    yAxisIndex: "none"
                },
            }
        }
    }
    //通过echarts类的实力setOption方法设置配置对象
    mycharts.setOption(options);
</script>
```

### 双坐标绑定事件

两个y轴,或两个x轴

**使用案例**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 引入echarts依赖包 -->
    <script src="./js/echarts.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .app {
            width: 100vw;
            height: 400px;
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <!-- 呈现图形图标的区域:务必要有高度 -->
    <div class="app"></div>
</body>

</html>
<script>
    //初始化一个echarts实例
    const mycharts = echarts.init(document.querySelector('.app'));
    //准备一个配置对象
    let options = {
        title: {
            text: '双坐标'
        },
        xAxis: { //一个x轴
            type: 'category'
        },
        yAxis: [
            { //一个y轴
                axisLine: { // 显示轴线
                    show: true
                }
            },
            { //一个y轴
                axisLine: {
                    show: true
                }
            }
        ],
        series: [
            { // 第一个柱状图
                type: 'bar',
                data: [10, 20, 30, 40, 50],

                yAxisIndex: 0 // 在第一个y轴上显示
            },
            { // 第二个柱状图
                type: 'bar',
                data: [60, 70, 80, 90, 100],

                yAxisIndex: 1 // 在第二个y轴上显示
            }
        ]
    }
    //通过echarts类的实力setOption方法设置配置对象
    mycharts.setOption(options);


    //监听浏览器窗口的变化
    window.onresize = function(){
        mycharts.resize();
    }

    //绑定事件
    mycharts.on('click',function(val){
          mycharts.setOption({
              title:{
                text:'数据为:'+val.data
              }
          })
    })
</script>
```

### geo地图航线特效

地理坐标系组件用于地图的绘制，支持在地理坐标系上绘制[散点图](https://echarts.apache.org/zh/option.html#series-scatter)，[线集](https://echarts.apache.org/zh/option.html#series-lines)。

```ts
3.1.10 开始 geo 组件也支持鼠标事件。事件参数为

{
    componentType: 'geo',
    // Geo 组件在 option 中的 index
    geoIndex: number,
    // 点击区域的名称，比如"上海"
    name: string,
    // 传入的点击区域的 region 对象，见 geo.regions
    region: Object
}
```

**中国地图json**

```ts
https://datav.aliyun.com/portal/school/atlas/area_selector
```

```ts
# 使用 中国地图json

# 新建一个本地ts文件 src/data/data.ts ,存放json数据,然后暴漏出去
export const dataJson:any= {
    ...
}
```

**geo配置**

```ts
<div class = 'bar' ref="bar" style="height:600px;width:400px"></div>

import {ref,onMounted} from "vue"
import * as echarts from 'echarts';
import {dataJson} from "./data/data.ts"
// 注册
echarts.registerMap('china', {geoJSON: dataJson});

# 初始化echars实例(在 onMounted 时挂载)
onMounted(()=>{
    const mycharts = echarts.init(bar.value)
    // 创建图形
    mycharts.setOption(option)
    // 配置
    var option = {
        geo: [
            {
                map: 'china', // 配置地图名
                label:{ // 文本标签
                    show:true,
                    color:aqua
                },
                itemStyle:{ // 区域设置
                	// 颜色
            	},
            	emphasis:{ // 高亮设置
            		label:{ // 高亮标签设置
                        fontSize:40 // 高亮字体大小
                        
                    },
                    itemStyle:{ // 高亮元素设置
                        areaColor:"bluesky" // 高亮元素区域颜色设置
                    }
            	},
                roam:true // 开启地图缩放
            },
        ]
        series:[
            {	// 飞机航线
                type:"lines", 
                data:[
        			{
                        coords: [
                            [120, 66],  // 起点
                            [122, 67],   // 终点
                            ...         // 如果 polyline 为 true 还可以设置更多的点
                        ],
                        // 统一的样式设置
                        lineStyle: { // 设置线的颜色
                            // 设置颜色
                        },
					},
        		],
          		symbol:"", // 设置线两端的标记 设置线两端的标记点，把标记点设置为 图片
          		effect:{ // 设置线的特效
          			show:true, // 开启动画
          			symbol = 'circle', // 动画两端的标记，可以设置为图片
          			color = 'red', // 设置颜色
          		}
            }
        ]
	}
})
```

官方

```ts
$.get('map/china_geo.json', function (chinaJson) { // Jquery
    echarts.registerMap('china', {geoJSON: geoJson});
    var chart = echarts.init(document.getElementById('main'));
    chart.setOption({
        geo: [{
            map: 'china',
            ...
        }]
    });
});
```

### Echarts拓展组件

在 npm.js官网上搜索 echarts,文档中有Extensions中存在 水球图，字浮云，地图等拓展

#### 水球图

```ts
# 安装
npm install echarts-liquidfill

# 引入
import * as echarts from 'echarts/core'
import 'echarts-liquidfill'
# 使用

<div class = 'bar' ref="bar" style="height:600px;width:400px"></div>

import {ref,onMounted} from "vue"

# 初始化echars实例(在 onMounted 时挂载)
onMounted(()=>{
    const mycharts = echarts.init(bar.value)
    // 创建图形
    mycharts.setOption(option)
    // 配置
    var option = {
        series: [{
            type: 'liquidFill', // 设置图形为水球图
            data: [0.6, 0.5, 0.4, 0.3], // 0-1之间
            color: ['red', '#0f0', 'rgb(0, 0, 255)'], // 设置颜色
            itemStyle: {
                opacity: 0.6 // 透明度
            },
            emphasis: { // 高亮
                itemStyle: {
                    opacity: 0.9
                }
            },
            shape: 'diamond' // 设置外形
        }]
	}
})



```

#### 字浮云

```ts

```



#### 百度地图

```ts
引入：
<!-- 引入百度地图的 JS SDK，这里需要使用你在百度地图开发者平台申请的 ak -->
<!-- 如需使用百度地图 2.0 版本，请将 `v=3.0` 改为 `v=2.0` -->
<script src="https://api.map.baidu.com/api?v=3.0&ak="></script>
<!-- 引入 ECharts -->
<script src="dist/echarts.min.js"></script>
<!-- 引入百度地图扩展 -->
<script src="dist/extension/bmap.min.js"></script>
```

使用：

扩展主要提供了跟 geo 一样的坐标系和底图的绘制，因此配置方式非常简单，如下

```ts
option = {
    // 加载 bmap 组件
    bmap: {
        // 百度地图中心经纬度。默认为 [104.114129, 37.550339]。
        center: [120.13066322374, 30.240018034923],
        // 百度地图缩放级别。默认为 5。
        zoom: 14,
        // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'。默认关闭。
        roam: true,
        // 百度地图的旧版自定义样式，见 https://lbsyun.baidu.com/custom/index.htm
        mapStyle: {},
        // 百度地图 3.0 之后的新版自定义样式，见 https://lbsyun.baidu.com/index.php?title=open/custom
        mapStyleV2: {},
        // 百度地图的初始化配置，见 https://lbsyun.baidu.com/cms/jsapi/reference/jsapi_reference.html#a0b1
        mapOptions: {
            // 禁用百度地图自带的底图可点功能
            enableMapClick: false
        }
    },
    series: [{
        type: 'scatter',
        // 使用百度地图坐标系
        coordinateSystem: 'bmap',
        // 数据格式跟在 geo 坐标系上一样，每一项都是 [经度，纬度，数值大小，其它维度...]
        data: [ [120, 30, 1] ],
        // 编码数据项中第三个元素作为 value 维度
        encode: {
            value: 2
        }
    }]
}

// 获取百度地图实例，使用百度地图自带的控件
var bmap = chart.getModel().getComponent('bmap').getBMap();
bmap.addControl(new BMap.MapTypeControl());
```

## API使用

API中包含了 Echarts 的属性和方法，以及Echarts的实例的方法和属性

### Echarts的方法

全局 echarts 对象，在 script 标签引入 `echarts.js` 文件后获得，或者在环境中通过`require('echarts')` 获得。

**init()**

```ts
echarts.init()

参数：
    dom:实例容器，一般是一个具有高宽的 DIV 元素。
    theme:应用的主题。
    opts:附加参数 
返回值:
	返回一个echart实例
```

### 实例的方法

通过 [echarts.init](https://echarts.apache.org/zh/api.html#echarts.init) 创建的实例。

#### setOption()配置

```ts
echartsInstance.setOption()

作用:设置图表实例的配置项以及数据，万能接口，所有参数和数据的修改都可以通过 setOption 完成

参数：一个配置对象option,
```

#### resize()自适应

```ts
作用:改变图表尺寸，在容器大小发生改变时需要手动调用,用于响应式

参数:无

返回值:无

执行时机:
	浏览器窗口改变时执行
    windows.onresize = () =>{
        mycharts.resize(); // 前提需要设置 宽度和高度单位为 vw 而不是 px
    }
```

#### on()事件

绑定事件处理函数

ECharts 中的事件有两种，一种是鼠标事件，在鼠标点击某个图形上会触发，还有一种是 调用 [dispatchAction](https://echarts.apache.org/zh/api.html#echartsInstance.dispatchAction) 后触发的事件

```ts
作用：

参数：eventName(事件名字),query(过滤条件,可选),handler(回调),context(可选。回调函数内部的context，即this的指向)

返回值：

eventName 可以绑定事件类型:事件名称，全小写，例如'click'，'mousemove', 'legendselected'
handler(val) 回调函数默认参数可以接收点击的对象
```

示例

```ts
chart.on('click', 'series', function () {...});
chart.on('click', 'series.line', function () {...});
chart.on('click', 'xAxis.category', function () {...});
```

使用案例

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- 引入echarts依赖包 -->
    <script src="./js/echarts.min.js"></script>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        .app {
            width: 100vw;
            height: 400px;
            border: 1px solid black;
        }
    </style>
</head>

<body>
    <!-- 呈现图形图标的区域:务必要有高度 -->
    <div class="app"></div>
</body>

</html>
<script>
    //初始化一个echarts实例
    const mycharts = echarts.init(document.querySelector('.app'));
    //准备一个配置对象
    let options = {
        title: {
            text: '双坐标'
        },
        xAxis: {
            type: 'category'
        },//一个x轴
        yAxis: [
            {
                axisLine: {
                    show: true
                }
            },
            {
                axisLine: {
                    show: true
                }
            }
        ],
        series: [
            {
                type: 'bar',
                data: [10, 20, 30, 40, 50],

                yAxisIndex: 0
            },
            {
                type: 'bar',
                data: [60, 70, 80, 90, 100],

                yAxisIndex: 1
            }
        ]
    }
    //通过echarts类的实力setOption方法设置配置对象
    mycharts.setOption(options);


    //监听浏览器窗口的变化
    window.onresize = function(){
        mycharts.resize();
    }

    //绑定事件
    mycharts.on('click',function(val){ // 回调函数中的参数可以获取到点击的对象
          mycharts.setOption({
              title:{
                text:'数据为:'+val.data
              }
          })
    })
</script>
```

## Vue使用Echarts

入门使用

```ts
# 安装插件
npm install echarts

# 在组件中导包
import * as echarts from 'echarts'
import {ref,onMounted} from "vue"
import * as echarts from 'echarts';
import {dataJson} from "./data/data.ts"

// 注册
echarts.registerMap('china', {geoJSON: dataJson});

# 准备一个 具有高度 的容器
<div class = 'bar' ref="bar" style="height:600px;width:400px"></div>


# 初始化echars实例(在 onMounted 时挂载)
onMounted(()=>{
    const mycharts = echarts.init(bar.value)
    // 创建图形
    mycharts.setOption(option)
    // 配置
    var option = {
        geo: [
            {
                map: 'china', // 配置地图名
                label:{ // 文本标签
                    show:true,
                    color:aqua
                },
                itemStyle:{ // 区域设置
                	// 颜色
            	},
            	emphasis:{ // 高亮设置
            		label:{ // 高亮标签设置
                        fontSize:40 // 高亮字体大小
                        
                    },
                    itemStyle:{ // 高亮元素设置
                        areaColor:"bluesky" // 高亮元素区域颜色设置
                    }
            	},
                roam:true // 开启地图缩放
            },
        ]
        series:[
            {	// 飞机航线
                type:"lines", 
                data:[
        			{
                        coords: [
                            [120, 66],  // 起点
                            [122, 67],   // 终点
                            ...         // 如果 polyline 为 true 还可以设置更多的点
                        ],
                        // 统一的样式设置
                        lineStyle: { // 设置线的颜色
                            // 设置颜色
                        },
					},
        		],
          		symbol:"", // 设置线两端的标记 设置线两端的标记点，把标记点设置为 图片
          		effect:{ // 设置线的特效
          			show:true, // 开启动画
          			symbol = 'circle', // 动画两端的标记，可以设置为图片
          			color = 'red', // 设置颜色
          		}
            }
        ]
	}
})

```

## vue-echarts插件

```ts
echart功能:
https://www.isqqw.com/login?redirect=%2F
```

### 基本使用

```ts
仅服务于vue框架，封装成了一个组件
# 安装 npm install echarts vue-echarts 
# 如果是vue2项目,还需要安装其他的东西

# 把vue-echarts提供的组件变为全局组件
	在入口mian.ts文件引入，并注册为全局组件
    import * as echarts from 'echarts'
    import VueEcharts from 'vue-echarts'
	app.component('v-chart',VueEcharts);
	# 在组件中使用,通过option属性设置配置项 如同Echarts那样，同样需要设置高度(父元素)
	# v-chart标签的高度 已经封装好了,默认和父元素一样高
	# v-chart组件 默认设置了监听 当组件内的数据data发生变化,就会执行getOption()函数
    <div style="height=80px;">
        <v-chart :option="getOption()" autoresize></v-chart>
    </div>    
	const getOption = ()=> {
        return {
            // 写一个配置项
            xAixs:{},
            yAixs:{}
        }
    }
```

### 设置自适应

在 标签属性上设置 autoresize属性即可

```ts
仅服务于vue框架，封装成了一个组件
# 安装 npm install echarts vue-echarts 
# 如果是vue2项目,还需要安装其他的东西

# 把vue-echarts提供的组件变为全局组件
	在入口文件引入，并注册为全局组件
    import * as echarts from 'echarts'
    import VueEcharts from 'vue-echarts'
	app.component('v-chart',VueEcharts);
	# 在组件中使用,通过option属性设置配置项 如同Echarts那样，同样需要设置高度(父元素)
	# v-chart标签的高度 已经封装好了,默认和父元素一样高
    <div style="height=80px;">
        <v-chart :option="getOption()" autoresize></v-chart>
    </div>    
	const getOption = ()=> {
        return {
            // 写一个配置项
            xAixs:{},
            yAixs:{}
        }
    }
    # 设置配置项
    	设置x轴
        	均匀分布
        	隐藏轴线
        设置y轴
        	
        设置布局
        	图片在容器的位置
        设置自适应窗口(在标签上设置属性)
        设置提示框
        	设置指示器(x轴,y轴) axisPointer(type:十字准星)
			
# 这样写（组件的形式）的优点：
	不需要频繁引入Echarts
    不需要初始化实例
    不需要使用setOption
    autoresize：自适应窗口，解决容器变化时，echarts中的onsize事件的缺点
```

```vue
<template>
    <div class="bar">
        <!-- autoresize:自适应 -->
        <!-- 通过option属性设置配置项 -->
        <v-chart :option="getOption()" autoresize></v-chart>
    </div>
</template>

<script setup lang="ts">
const getOption = () => {
    return {
        xAxis: {
            // x轴均匀分布
            type: "category",
            // x轴不显示
            show: false,
        },
        yAxis: {
            // y轴不显示
            show: false,
        },
        series: {
            // 类型为柱状图
            type: "bar",
            // 传递数据
            data: barData.data
        },
        grid: {
            // 设置布局
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
        },
        //提示框组件
        tooltip: {
            // 设置指示器的类型为 十字准星
            axisPointer: {
                type: "cross",
            },
        },
    };

};

const barData = defineProps(["data"]);
</script>

<style scoped>
.bar {
    width: 100%;
    height: 100%;
}
</style>
```



### 设置事件

直接在 标签上设置 属性点击事件，事件包含 onmouseover click 

```ts
直接在 标签上设置 属性点击事件

<div style="height=80px;">
        <v-chart :option="getOption()" autoresize @click="handle"></v-chart>
    </div> 

const handle = () =>{
    
}
```

```ts
<!-- 展示饼图 设置鼠标事件-->
<v-chart ref="charts" style="height: 300px" :option="getPie()" @mouseover="handler"></v-chart>

const charts = ref();

// 鼠标进入事件 params 默认是饼图的元素对象
const handler = (params: any) => {
    // 获取 饼图 实例对象,并使用实例对象上的 setOption方法
    // 重新设置 label的 内容 为 当前鼠标选中的 饼图元素对象 
    charts.value.setOption({
        title: { // 设置标题
            text: params.name, // 设置主标题
            subtext: params.value // 设置副标题
        }
    })

}

//饼图的配置项
const getPie = () => {
    return {
        // 提示框
        tooltip: {
            trigger: "item", // 触发时机
        },
        // 图例
        legend: {
            right: "0",
            orient: 'vertical' // 设置纵向
        },
        series: [
            {
                type: "pie", // 类型为饼图
                //饼图半径
                radius: ["30%", "60%"],
                avoidLabelOverlap: false, // 标签放在中心位置

                itemStyle: { // 图形的样式
                    borderRadius: 10, // 图形的边角
                    borderColor: "#fff", // 描边的颜色
                    borderWidth: 2, // 描边的宽度
                },
                //设置标签标题
                label: {
                    show: true,
                },
                //高亮效果
                emphasis: {
                    label: { //高亮显示label标签
                        show: true,
                        fontSize: 20, // 设置视觉引导线字体大小
                        fontWeight: "bold", // 设置字体宽度
                    },
                },
                //视觉引导线
                labelLine: {
                    show: true,
                },
                //数据
                data: radio.value == '品类' ? arr1 : arr2,

            },
        ],
        //标题组件
        title: {
            //主标题
            text: radio.value == '品类' ? arr1[0].name : arr2[0].name, //主标题
            subtext: radio.value == '品类' ? arr1[0].value : arr2[0].value, //副标题
            //标题的位置
            left: 'center',
            top: 'center'
        }
    };
};
```

