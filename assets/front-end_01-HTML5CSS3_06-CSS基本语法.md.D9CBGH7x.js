import{_ as s,c as a,o as i,a5 as n}from"./chunks/framework.DXx0hzU1.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"front-end/01-HTML5CSS3/06-CSS基本语法.md","filePath":"front-end/01-HTML5CSS3/06-CSS基本语法.md"}'),l={name:"front-end/01-HTML5CSS3/06-CSS基本语法.md"},e=n(`<h2 id="css-简介" tabindex="-1">CSS 简介 <a class="header-anchor" href="#css-简介" aria-label="Permalink to &quot;CSS 简介&quot;">​</a></h2><p>层叠样式表(英文全称：Cascading Style Sheets)是一种用来表现 HTML 或 XML 等文件样式的计算机语言。CSS不仅可以静态地修饰网页，还可以配合各种脚本语言动态地对网页各元素进行格式化。</p><p>CSS 能够对网页中元素位置的排版进行像素级精确控制，支持几乎所有的字体字号样式，拥有对网页对象和模型样式编辑的能力。</p><p>CSS 由哈坤·利于 1994 年进行设计，1997 年 W3C 完成了第一份正式标准。</p><h2 id="css-的基本语法" tabindex="-1">CSS 的基本语法 <a class="header-anchor" href="#css-的基本语法" aria-label="Permalink to &quot;CSS 的基本语法&quot;">​</a></h2><h3 id="html-和-css-的关系" tabindex="-1">HTML 和 CSS 的关系 <a class="header-anchor" href="#html-和-css-的关系" aria-label="Permalink to &quot;HTML 和 CSS 的关系&quot;">​</a></h3><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> HTML</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 实现页面结构，</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CSS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 实现页面样式</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> CSS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 样式需要作用在 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">HTML</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 元素上</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 每一个 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">HTML</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 标签也称之为一个元素</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="html-元素树-元素和元素之间的关系" tabindex="-1">HTML 元素树（元素和元素之间的关系） <a class="header-anchor" href="#html-元素树-元素和元素之间的关系" aria-label="Permalink to &quot;HTML 元素树（元素和元素之间的关系）&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>父元素</span></span>
<span class="line"><span>祖先元素</span></span>
<span class="line"><span>子元素</span></span>
<span class="line"><span>后代元素</span></span>
<span class="line"><span>兄弟元素		具体相同父元素的才是兄弟元素</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="css使用方法" tabindex="-1">CSS使用方法 <a class="header-anchor" href="#css使用方法" aria-label="Permalink to &quot;CSS使用方法&quot;">​</a></h2><h3 id="_1-行内式" tabindex="-1">① 行内式 <a class="header-anchor" href="#_1-行内式" aria-label="Permalink to &quot;① 行内式&quot;">​</a></h3><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">标签</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;CSS代码...;&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">标签</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_2-内嵌式" tabindex="-1">② 内嵌式 <a class="header-anchor" href="#_2-内嵌式" aria-label="Permalink to &quot;② 内嵌式&quot;">​</a></h3><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	CSS 代码...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;/</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">style</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>style 标签放在页面的任意位置都可以生效，建议放在 head 中！</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_3-外链式" tabindex="-1">③ 外链式 <a class="header-anchor" href="#_3-外链式" aria-label="Permalink to &quot;③ 外链式&quot;">​</a></h3><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">link</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> rel</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;stylesheet&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> href</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;CSS文件地址&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>link 标签放在页面的任意位置都可以生效，建议放在 head 中！</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h2 id="css-基本语法结构" tabindex="-1">CSS 基本语法结构 <a class="header-anchor" href="#css-基本语法结构" aria-label="Permalink to &quot;CSS 基本语法结构&quot;">​</a></h2><p><strong>选择器：</strong> 用于选择要设置样式的元素。</p><p><strong>声明块：</strong> 选择器后面的大括号，声明块由多条声明组成。</p><p><strong>声明：</strong> 每条声明以分号结尾，声明由CSS属性和它的值组成。</p><h3 id="内嵌式和外链式的语法结构" tabindex="-1">内嵌式和外链式的语法结构 <a class="header-anchor" href="#内嵌式和外链式的语法结构" aria-label="Permalink to &quot;内嵌式和外链式的语法结构&quot;">​</a></h3><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">选择器 {</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    属性名:值;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    属性名:值;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    属性名:值;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    属性名:值;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">	....</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="行内式的语法结构" tabindex="-1">行内式的语法结构 <a class="header-anchor" href="#行内式的语法结构" aria-label="Permalink to &quot;行内式的语法结构&quot;">​</a></h3><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">标签名</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;属性名:值; 属性名:值; 属性名:值; 属性名:值;...&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&lt;/</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">标签名</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="注意区分html-属性-和-css-属性" tabindex="-1">注意区分HTML 属性 和 CSS 属性 <a class="header-anchor" href="#注意区分html-属性-和-css-属性" aria-label="Permalink to &quot;注意区分HTML 属性 和 CSS 属性&quot;">​</a></h3><div class="language-html vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">&lt;!-- 使用HTML属性设置图片尺寸 --&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">img</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> src</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./images/小乐出浴图.jpg&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> alt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;小乐出狱&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> width</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;400&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> height</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;300&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">&lt;!-- 使用CSS属性设置图片尺寸 --&gt;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">img</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> src</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;./images/小乐出浴图.jpg&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> alt</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;小乐出狱&quot;</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> style</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;width:400px;height:300px&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="css-的层叠性" tabindex="-1">CSS 的层叠性 <a class="header-anchor" href="#css-的层叠性" aria-label="Permalink to &quot;CSS 的层叠性&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>不同方式、不同选择器所设置的样式都会层叠在该元素上</span></span>
<span class="line"><span>.开头的是类</span></span>
<span class="line"><span>#开头的是id</span></span>
<span class="line"><span>直接开头的是选择器</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="css-注释" tabindex="-1">CSS 注释 <a class="header-anchor" href="#css-注释" aria-label="Permalink to &quot;CSS 注释&quot;">​</a></h2><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* CSS 注释 */</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    CSS 注释</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    CSS 注释</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    CSS 注释</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    CSS 注释</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">*/</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="css-长度单位和颜色设置" tabindex="-1">CSS 长度单位和颜色设置 <a class="header-anchor" href="#css-长度单位和颜色设置" aria-label="Permalink to &quot;CSS 长度单位和颜色设置&quot;">​</a></h2><h3 id="css-中的长度单位" tabindex="-1">CSS 中的长度单位 <a class="header-anchor" href="#css-中的长度单位" aria-label="Permalink to &quot;CSS 中的长度单位&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>px 像素</span></span>
<span class="line"><span>em 字体大小的倍数</span></span>
<span class="line"><span>%  百分比 宽度参照的是父元素宽度，高度也是父元素的高度</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h3 id="css-中的颜色设置方式" tabindex="-1">CSS 中的颜色设置方式 <a class="header-anchor" href="#css-中的颜色设置方式" aria-label="Permalink to &quot;CSS 中的颜色设置方式&quot;">​</a></h3><h4 id="_1-使用颜色名表示颜色" tabindex="-1">① 使用颜色名表示颜色 <a class="header-anchor" href="#_1-使用颜色名表示颜色" aria-label="Permalink to &quot;① 使用颜色名表示颜色&quot;">​</a></h4><p>常见的颜色名有：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>red、orange、yellow、green、cyan、blue、purple、pink、deeppink、skyblue、greenyellow ...</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="_2-rgb-方式表示颜色" tabindex="-1">② rgb 方式表示颜色 <a class="header-anchor" href="#_2-rgb-方式表示颜色" aria-label="Permalink to &quot;② rgb 方式表示颜色&quot;">​</a></h4><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/*</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    计算机三元色</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    red         0~255   0%~100%</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    green       0~255   0%~100%</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    blue        0~255   0%~100%</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">*/</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">background: rgb(100, 200, 120);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">background: rgb(255, 0, 0);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">background: rgb(255, 0, 255);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 三个元色 取相同的数值  灰色 */</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 数值越大颜色越浅，全是255是白色，数值越小颜色越深，全是0是黑色 */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">background: rgb(255, 255, 255);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">background: rgb(0, 0, 0);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">background: rgb(100, 100, 100);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">background: rgb(199, 199, 199);</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 使用百分比 */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">background: rgb(45%, 80%, 74%);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br></div></div><h4 id="_3-hex-十六进制方式表示颜色" tabindex="-1">③ hex 十六进制方式表示颜色 <a class="header-anchor" href="#_3-hex-十六进制方式表示颜色" aria-label="Permalink to &quot;③ hex 十六进制方式表示颜色&quot;">​</a></h4><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 十六进制 原理同rgb一样 */</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 十进制：    0 1 2 3 4 5 6 7 8 9 10 11 12 13 ... 19 20 21 ... 99 100 ...</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 二进制：    0 1 10 11 100 101 110 111 1000 ...</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 十六进制：  0 1 2 3 4 5 6 7 8 9 a b c d e f 10 11 ... 1f 20 21 ... ff 100 ...</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">*/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* </span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 十进制255 = 十六进制ff</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 两位十六进制的数字可以表示一种原色，六位十六进制数字能够表示三元色</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">*/</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 使用6位十六进制的数字表示颜色 每两位表示一个元色 */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">background: </span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#4fa8bb</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">background: </span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#0000ff</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">background: </span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#ababab;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">background: </span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#131313</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">/* 表示一种元色的两个数字是相同的，且三组元色各自都是相同， 可以简写为3位十六进制数字 */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">background: </span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#a8c;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  /* #aa88cc */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">background: </span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#bbb;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  /* #bbbbbb */</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">background: </span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#ab2233;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">  /* 不可简写 */</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br></div></div>`,43),p=[e];function t(h,r,k,d,c,b){return i(),a("div",null,p)}const u=s(l,[["render",t]]);export{g as __pageData,u as default};
