import{_ as s,c as a,o as n,a5 as i}from"./chunks/framework.DXx0hzU1.js";const u=JSON.parse('{"title":"定位","description":"","frontmatter":{},"headers":[],"relativePath":"front-end/01-HTML5CSS3/12-CSS定位.md","filePath":"front-end/01-HTML5CSS3/12-CSS定位.md"}'),e={name:"front-end/01-HTML5CSS3/12-CSS定位.md"},l=i(`<h1 id="定位" tabindex="-1">定位 <a class="header-anchor" href="#定位" aria-label="Permalink to &quot;定位&quot;">​</a></h1><p>\\1) 除非专门指定，否则所有框都在普通流中定位。也就是说，普通流中的元素的位置由元素在 HTML 中的位置决定。</p><p>\\2) 定位的基本思想很简单，它允许你定义元素相对于其正常位置应该出现的位置，或者相对于父元素甚至浏览器窗口本身的位置。</p><p>\\3) 通过使用 position 属性，我们可以选择 4 种不同类型的定位。</p><ul><li>position属性是把元素放置到一个静态的、相对的、绝对的、或固定的位置中。</li><li>position属性的四个值分别对应 static、relative、absolute、fixed。</li></ul><h2 id="相对定位" tabindex="-1">相对定位 <a class="header-anchor" href="#相对定位" aria-label="Permalink to &quot;相对定位&quot;">​</a></h2><ul><li>使用相对定位的盒子,会相对于它原来的位置,通过偏移指定的距离,到达新的位置</li><li>使用相对定位的盒子,仍在标准流中,它对父块好兄弟盒子没有任何影响</li></ul><h3 id="_1-如何设置相对定位" tabindex="-1">① 如何设置相对定位 <a class="header-anchor" href="#_1-如何设置相对定位" aria-label="Permalink to &quot;① 如何设置相对定位&quot;">​</a></h3><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">position: relative</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.box</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    position</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">relative</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    top</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    left</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">相对定位可以和浮动一起使用。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br></div></div><h3 id="_2-相对定位元素定位的参考点" tabindex="-1">② 相对定位元素定位的参考点 <a class="header-anchor" href="#_2-相对定位元素定位的参考点" aria-label="Permalink to &quot;② 相对定位元素定位的参考点&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>自己原来的位置</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><h3 id="_3-相对定位元素的特点" tabindex="-1">③ 相对定位元素的特点 <a class="header-anchor" href="#_3-相对定位元素的特点" aria-label="Permalink to &quot;③ 相对定位元素的特点&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>不脱离文档流，相邻元素仍然按照其原来的位置进行排列</span></span>
<span class="line"><span>相对定位不会改变元素原有的显示模式，可以与浮动一起设置</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="绝对定位" tabindex="-1">绝对定位 <a class="header-anchor" href="#绝对定位" aria-label="Permalink to &quot;绝对定位&quot;">​</a></h2><ul><li>使用绝对定位的盒子以它&quot;最近&quot;的一个&quot;已经定位&quot;的&quot;祖先元素&quot;为基准进行偏移. 如果没有已经定位的&quot;祖先元素&quot;, 那么会以根元素 html 为基准进行定位。</li><li>绝对定位的框从标准流中脱离,这意味着它们对其后的兄弟盒子的定位没有影响,其他的盒子就好像这个盒子不存在一样</li></ul><h3 id="_1-如何设置绝对定位" tabindex="-1">① 如何设置绝对定位 <a class="header-anchor" href="#_1-如何设置绝对定位" aria-label="Permalink to &quot;① 如何设置绝对定位&quot;">​</a></h3><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">position：absolute;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.box</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    position</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">absolute</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    top</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    left</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h3 id="_2-绝对定位元素定位的参考点" tabindex="-1">② 绝对定位元素定位的参考点 <a class="header-anchor" href="#_2-绝对定位元素定位的参考点" aria-label="Permalink to &quot;② 绝对定位元素定位的参考点&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>1. 绝对定位元素参照它的包含块进行定位</span></span>
<span class="line"><span>2. 一般元素的包含块就是父元素，绝对定位元素的包含块是第一个定位的祖先元素（从父元素开始向上找），如果没有定位的祖先元素，包含块就是整个页面</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_3-绝对定位元素的特点" tabindex="-1">③ 绝对定位元素的特点 <a class="header-anchor" href="#_3-绝对定位元素的特点" aria-label="Permalink to &quot;③ 绝对定位元素的特点&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>1. 脱离文档流</span></span>
<span class="line"><span>2. 不论元素原来的显示模式是什么，设置为绝对定位就是绝对定位元素； 同时设置浮动和绝对定位，浮动不生效。</span></span>
<span class="line"><span>3. 绝对定位元素具有自己的显示特点</span></span>
<span class="line"><span>   ① 默认宽高都是被内容撑开，不存在外边距的塌陷和合并</span></span>
<span class="line"><span>   ② 宽高内外边距都可以设置</span></span>
<span class="line"><span>   ③ 不会被父元素作为文本</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="_4-绝对定位元素的应用" tabindex="-1">④ 绝对定位元素的应用 <a class="header-anchor" href="#_4-绝对定位元素的应用" aria-label="Permalink to &quot;④ 绝对定位元素的应用&quot;">​</a></h3><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">1. 元素显示在不相关元素的上边，典型的就是导航栏的下拉菜单，这里使用绝对定位，然后使用相对定位作为父元素，不能让绝对定位到处乱跑</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><blockquote><p><strong>注意：</strong></p><p>绝对定位的元素无法再设置浮动。</p><p><strong>关于包含块：</strong></p><p>绝对定位的元素其实是以他的包含块元素为基准进行定位的，但是元素 position 设置的不同，其包含块也会引起变化。</p><p>\\1) 如果一个元素自身的 position 属性是 static或者是relative：它的包含块就是离他最近的祖先元素或者是格式化上下文。</p><p>\\2) 如果一个元素自身的 position 属性是absolute，它的包含块就是离他最近的拥有定位属性（值不为static）的元素。</p><p>\\3) 如果一个元素自身的 position 属性是 fixed，它的包含块就是离他最近的拥有定位属性（值不为static）的元素。</p><p>\\4) 如果由内向外找不到包含块条件的元素，那么html（根元素）被称作为初始包含块。</p></blockquote><h2 id="固定定位" tabindex="-1">固定定位 <a class="header-anchor" href="#固定定位" aria-label="Permalink to &quot;固定定位&quot;">​</a></h2><ul><li>以视口（viewport）为基准进行定位</li><li>窗口滚动时,依然保持位置不变</li></ul><h3 id="_1-如何设置为固定定位" tabindex="-1">① 如何设置为固定定位 <a class="header-anchor" href="#_1-如何设置为固定定位" aria-label="Permalink to &quot;① 如何设置为固定定位&quot;">​</a></h3><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">position: fixed;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">.box</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    position</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">fixed</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    top</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    left</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">20</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">px</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h3 id="_2-固定定位的元素定位参考点" tabindex="-1">② 固定定位的元素定位参考点 <a class="header-anchor" href="#_2-固定定位的元素定位参考点" aria-label="Permalink to &quot;② 固定定位的元素定位参考点&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>1. 固定定位元素参照它的包含块进行定位</span></span>
<span class="line"><span>2. 固定定位元素的包含块是视口</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h3 id="_3-固定定位元素的特点-同绝对定位" tabindex="-1">③ 固定定位元素的特点（同绝对定位） <a class="header-anchor" href="#_3-固定定位元素的特点-同绝对定位" aria-label="Permalink to &quot;③ 固定定位元素的特点（同绝对定位）&quot;">​</a></h3><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>1. 脱离文档流</span></span>
<span class="line"><span>2. 不论元素原来的显示模式是什么，设置为固定定位就是固定定位元素； 同时设置浮动和固定定位，浮动不生效。</span></span>
<span class="line"><span>3. 固定定位元素具有自己的显示特点</span></span>
<span class="line"><span>   ① 默认宽高都是被内容撑开，不存在外边距的塌陷和合并</span></span>
<span class="line"><span>   ② 宽高内外边距都可以设置</span></span>
<span class="line"><span>   ③ 不会被父元素作为文本</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h2 id="定位显示层级-z-index" tabindex="-1">定位显示层级 z-index <a class="header-anchor" href="#定位显示层级-z-index" aria-label="Permalink to &quot;定位显示层级 z-index&quot;">​</a></h2><ul><li>指定一个定位的元素及其后代的层叠顺序，只有定位元素（非static值）设置 z-index 才可以生效。</li><li>z-index的值是数字，没有单位， 理论上来说 z-index的值大的元素会覆盖小的元素；z-index 的默认值是 auto。</li></ul><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>1. 定位的元素默认显示层级是相同的，不论进行哪一种定位，后面的元素显示在上层； 定位元素的显示层级比不定位高。</span></span>
<span class="line"><span>2. 定位的可以通过 CSS 属性 z-index 设置显示层级，值是数字，可以是负值，值越大显示层级越高； 不定位的元素设置 z-index 无效！</span></span>
<span class="line"><span>3. 定位的元素默认父元素的显示层级是auto可以按照0来计算，但是当父元素设置了z-index，他的子元素都是父元素的显示层级。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><p><img src="https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240311101615960.png" alt="image-20240311101615960"></p><h3 id="定位相关-css-属性" tabindex="-1">定位相关 CSS 属性 <a class="header-anchor" href="#定位相关-css-属性" aria-label="Permalink to &quot;定位相关 CSS 属性&quot;">​</a></h3><table><thead><tr><th>CSS 属性名</th><th>功能</th><th>属性值</th></tr></thead><tbody><tr><td>position</td><td>设置定位</td><td>static：不定位，默认值。<br>relative：相对定位。<br>absolute：绝对定位。<br>fixed：固定定位</td></tr><tr><td>left</td><td>与参照点左侧距离</td><td>长度</td></tr><tr><td>right</td><td>与参照点右侧距离</td><td>长度</td></tr><tr><td>top</td><td>与参照点上侧距离</td><td>长度</td></tr><tr><td>bottom</td><td>与参照点下侧距离</td><td>长度</td></tr><tr><td>z-index</td><td>显示层级</td><td>纯数字</td></tr></tbody></table><h2 id="定位元素-绝对和固定-的默认宽高计算规则" tabindex="-1">定位元素（绝对和固定）的默认宽高计算规则 <a class="header-anchor" href="#定位元素-绝对和固定-的默认宽高计算规则" aria-label="Permalink to &quot;定位元素（绝对和固定）的默认宽高计算规则&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>1. 定位的元素，如果没有固定宽度，同时 left 和 right 都会生效，进而影响到默认的宽度</span></span>
<span class="line"><span>2. 定位的元素，如果没有固定高度，同时 top 和 bottom 都会生效，进而影响到默认的高度</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="设置定位元素-绝对和固定-在包含块中水平垂直都居中" tabindex="-1">设置定位元素（绝对和固定）在包含块中水平垂直都居中 <a class="header-anchor" href="#设置定位元素-绝对和固定-在包含块中水平垂直都居中" aria-label="Permalink to &quot;设置定位元素（绝对和固定）在包含块中水平垂直都居中&quot;">​</a></h2><p><strong>方案一：</strong></p><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">position: absolute/fixed;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">left: 50%;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">top:50%;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">margin-left</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: -自身总宽度（加上左右外边距）/2; (这是因为左上角的点在页面的中心位置，所以挪动自身的一半)</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">margin-top</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:-自身总高度（加上左右外边距）/2;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">margin-top</span><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;"> margin-left参照的是父元素的宽度</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p><img src="https://2216847528.oss-cn-beijing.aliyuncs.com/asset/image-20240202094328703.png" alt="image-20240202094328703"></p><p><strong>方案二：</strong></p><div class="language-css vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">css</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">position: absolute/fixed;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">left: 0;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">right: 0;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">top: 0;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">bottom: 0;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">margin: auto;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div>`,46),p=[l];function t(r,h,d,c,o,k){return n(),a("div",null,p)}const g=s(e,[["render",t]]);export{u as __pageData,g as default};
