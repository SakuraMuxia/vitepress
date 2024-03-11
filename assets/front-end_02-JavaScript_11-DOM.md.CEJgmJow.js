import{_ as s,c as a,o as i,a5 as n}from"./chunks/framework.DXx0hzU1.js";const g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"front-end/02-JavaScript/11-DOM.md","filePath":"front-end/02-JavaScript/11-DOM.md"}'),e={name:"front-end/02-JavaScript/11-DOM.md"},p=n(`<h2 id="dom-部分知识点介绍" tabindex="-1">DOM 部分知识点介绍 <a class="header-anchor" href="#dom-部分知识点介绍" aria-label="Permalink to &quot;DOM 部分知识点介绍&quot;">​</a></h2><p>DOM 全称 Document Object Model，译为文档对象模型。</p><p>DOM 是 HTML 文档为 JavaScript 提供的能够对 HTML 文档进行相关操作的 API。</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 获取元素  </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   document.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">getElementById</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">()</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 给元素添加事件</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   元素对象.</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">oncilck</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> function</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">() {};</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">3.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 设置元素的 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">CSS</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 样式</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   元素对象.style.属性名 </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;值&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">4.</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 设置元素中的文字内容</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   元素对象.innerHTML </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;内容&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div>`,4),l=[p];function t(h,r,k,d,c,E){return i(),a("div",null,l)}const b=s(e,[["render",t]]);export{g as __pageData,b as default};