import{_ as s,c as a,o as n,a5 as i}from"./chunks/framework.DXx0hzU1.js";const b=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"front-end/01-HTML5CSS3/26-渐变色.md","filePath":"front-end/01-HTML5CSS3/26-渐变色.md"}'),l={name:"front-end/01-HTML5CSS3/26-渐变色.md"},e=i(`<h2 id="css3-渐变" tabindex="-1">CSS3 渐变 <a class="header-anchor" href="#css3-渐变" aria-label="Permalink to &quot;CSS3 渐变&quot;">​</a></h2><p>渐变是一个值，要作为一个图片被使用，可以使用渐变作为值的属性有 <code>background-image</code>、<code>list-style-image</code> 等。</p><h3 id="线性渐变" tabindex="-1">线性渐变 <a class="header-anchor" href="#线性渐变" aria-label="Permalink to &quot;线性渐变&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>linear-gradient(渐变方向，颜色列表 长度)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language-CSS vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">CSS</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">1. 渐变方向 默认从上到下</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   ① 使用关键字，如 to bottom、to left、to top bottom、to right top ...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   ② 使用角度，取值 0 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">~</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 360，角度单位是deg</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">2. 颜色列表</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   每个颜色之间使用逗号分隔</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   每个颜色可以指定颜色位置，如果不指定位置，多个颜色位置平均分布</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">background-image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: linear-gradient(45deg,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">#ff6ec7</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#70db93</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">background-image</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: linear-gradient(45deg,</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">#ff6ec7</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 50%,</span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#70db93</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 50%);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;angle</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">：用角度值指定渐变的方向（或角度）。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    to left： 设置渐变为从右到左。相当于: 270deg</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    to right：设置渐变从左到右。相当于: 90deg</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    to top：  设置渐变从下到上。相当于: 0deg</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    to bottom： 设置渐变从上到下。相当于: 180deg。这是默认值，等同于留空不写。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&lt;</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">color-stop</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 用于指定渐变的起止颜色：</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;color</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">：  指定颜色。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;length</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">： 用长度值指定起止色位置。不允许负值</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    &lt;percentage</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&gt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">： 用百分比指定起止色位置。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br></div></div><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">linear-gradient(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">#fff</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#333</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">linear-gradient(to bottom, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">#fff</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#333</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">linear-gradient(to top, </span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#333</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">#fff</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">linear-gradient(180deg, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">#fff</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#333</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">linear-gradient(to bottom, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">#fff</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 0%, </span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#333</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 100%);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h3 id="径向渐变" tabindex="-1">径向渐变 <a class="header-anchor" href="#径向渐变" aria-label="Permalink to &quot;径向渐变&quot;">​</a></h3><div class="language-CSS vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">CSS</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">radial-gradient(半径长度 at 圆心位置，颜色列表)</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>取值</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>&lt;position&gt; 确定圆心的位置。如果提供2个参数，第一个表示横坐标，第二个表示纵坐标；如果只提供一个，第二值默认为50%，即center</span></span>
<span class="line"><span>    &lt;percentage&gt;①：用百分比指定径向渐变圆心的横坐标值。可以为负值。</span></span>
<span class="line"><span>    &lt;length&gt;①：用长度值指定径向渐变圆心的横坐标值。可以为负值。</span></span>
<span class="line"><span>    left：设置左边为径向渐变圆心的横坐标值。</span></span>
<span class="line"><span>    center①：设置中间为径向渐变圆心的横坐标值。</span></span>
<span class="line"><span>    right：设置右边为径向渐变圆心的横坐标值。</span></span>
<span class="line"><span>    &lt;percentage&gt;②：用百分比指定径向渐变圆心的纵坐标值。可以为负值。</span></span>
<span class="line"><span>    &lt;length&gt;②：用长度值指定径向渐变圆心的纵坐标值。可以为负值。</span></span>
<span class="line"><span>    top：设置顶部为径向渐变圆心的纵坐标值。</span></span>
<span class="line"><span>    center②：设置中间为径向渐变圆心的纵坐标值。</span></span>
<span class="line"><span>    bottom：设置底部为径向渐变圆心的纵坐标值。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;shape&gt; 确定圆的类型</span></span>
<span class="line"><span>    circle：指定圆形的径向渐变</span></span>
<span class="line"><span>    ellipse：指定椭圆形的径向渐变。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;extent-keyword&gt; circle | ellipse 都接受该值作为 size</span></span>
<span class="line"><span>    closest-side：指定径向渐变的半径长度为从圆心到离圆心最近的边</span></span>
<span class="line"><span>    closest-corner：指定径向渐变的半径长度为从圆心到离圆心最近的角</span></span>
<span class="line"><span>    farthest-side：指定径向渐变的半径长度为从圆心到离圆心最远的边</span></span>
<span class="line"><span>    farthest-corner：指定径向渐变的半径长度为从圆心到离圆心最远的角 （默认值）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;circle-size&gt; circle 接受该值作为 size</span></span>
<span class="line"><span>    &lt;length&gt;：用长度值指定正圆径向渐变的半径长度。不允许负值。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;ellipse-size&gt; ellipse 接受该值作为 size</span></span>
<span class="line"><span>    &lt;length&gt;：用长度值指定椭圆径向渐变的横向或纵向半径长度。不允许负值。</span></span>
<span class="line"><span>    &lt;percentage&gt;：用百分比指定椭圆径向渐变的横向或纵向半径长度。不允许负值。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;color-stop&gt; 用于指定渐变的起止颜色：</span></span>
<span class="line"><span>    &lt;color&gt;：指定颜色。</span></span>
<span class="line"><span>    &lt;length&gt;：用长度值指定起止色位置。不允许负值</span></span>
<span class="line"><span>    &lt;percentage&gt;：用百分比指定起止色位置。不允许负值</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br></div></div><p>示例</p><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">radial-gradient(</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">circle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">#f00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">#ff0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#080</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">radial-gradient(</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">circle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> at </span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">center</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">#f00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">#ff0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#080</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">radial-gradient(</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">circle</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> at 50%, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">#f00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">#ff0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#080</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">radial-gradient(</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">circle</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> farthest-corner</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">#f00</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">#ff0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">, </span><span style="--shiki-light:#B31D28;--shiki-dark:#FDAEB7;--shiki-light-font-style:italic;--shiki-dark-font-style:italic;">#080</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">);</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h3 id="重复渐变" tabindex="-1">重复渐变 <a class="header-anchor" href="#重复渐变" aria-label="Permalink to &quot;重复渐变&quot;">​</a></h3><div class="language-CSS vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">CSS</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">repeating-linear-gradient()    重复线性渐变</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">repeating-radial-gradient()	   重复径向渐变</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="" tabindex="-1"><a class="header-anchor" href="#" aria-label="Permalink to &quot;&quot;">​</a></h2>`,16),p=[e];function t(h,r,k,c,d,E){return n(),a("div",null,p)}const o=s(l,[["render",t]]);export{b as __pageData,o as default};
