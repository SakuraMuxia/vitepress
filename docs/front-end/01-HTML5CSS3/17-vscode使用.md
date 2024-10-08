# 附录 VsCode 的使用

## 使用方式

```sh
整个目录拖进vsode
在vscode里面新建文件和目录
```

## 相关设置

```sh
自动保存：  设置 -> Auto Save
字体大小：  设置 -> Font Size
目录结构缩进距离： 设置 ->  Tree: Indent
合并单个目录结构： 设置 ->  Compact Folders  去掉前面的√
颜色主题
文件图标主题
```

## 快捷键

```sh
代码自动格式化: alt + shift + f

复制当前行到下一行: alt shift + 上/下

多列同时编辑: ctrl A -> 选中代码 -> shift+alt+i -> 从末尾编辑
多列同时编辑: ctrl alt + 上/下
多列同时编辑: shift alt + 使用鼠标拖动

ctrl+H 替换 :
使用正则表达式 (.*?)\n 替换为'$1'\n : 可以把当前列全部替换为字符串
批量增加引号: (.*?):(.*) 替换为 '$1':'$2', 即为json格式的字符串
```

## Emmet 快捷键

```sh
!
标签名+tab
```

更多Emmet快捷键： https://docs.emmet.io/abbreviations/syntax/

```sh
设置语言为zh-CN
设置 -> Emmet: Variables 点击添加项 选择 lang 值 zh-CN
```

## 常用扩展

```shell
Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code
open in browser
Live Server
Chinese Lorem
```

使用的拓展

```jsx
Auto Rename Tag	-> JunHan
Chinese -> microsoft
Chinese Lorem -> catlair
Custom Css and JS Loader -> be5invis
ES7+React/Redux/React-Native snippets -> dsznajder
Git Graph -> mhutchie
JS JSX Snippets -> NaiYouRan
Live Server -> RitwickDey
Markdown All in One ->YuZhang
open in browser -> TexhER
Open in GitHub, Bitbucket, Gitlab, VisualStudio.com ! -> ziyasal
vscode-icon -> VSCode Icons Team
Vue - Official -> Vue
Vue 3 Snippets -> hollowtree
npm Intellisense -> Christian Kohler
```

```shell
vscode 插件推荐
GitLens。便于查看代码提交记录，甩锅专用
Todo Tree。可以高亮一些个人自定义的注释，比如 TODO、NOTE 等
ES7 React/Redux/GraphQL/React-Native snippets。react 支持
Volar。Vue 支持
Import Cost。查看引入文件的大小，比如 import、require 引入的依赖
filesize。查看当前文件的大小，右下角显示
Paste JSON as Code。能快速生成 JSON 数据的 ts 数据类型
Markdown Preview Enhanced。markdown 预览增强版，比默认的预览工具好用
tree-generator。快速生成目录树
koroFileHeader。生成文件头部注释和函数注释
```

