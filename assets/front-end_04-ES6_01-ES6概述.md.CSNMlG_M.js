import{_ as a,c as i,o as e,a5 as s}from"./chunks/framework.ysm0ofoH.js";const k=JSON.parse('{"title":"ES6+ 简介","description":"","frontmatter":{},"headers":[],"relativePath":"front-end/04-ES6/01-ES6概述.md","filePath":"front-end/04-ES6/01-ES6概述.md"}'),t={name:"front-end/04-ES6/01-ES6概述.md"},n=s(`<h1 id="es6-简介" tabindex="-1">ES6+ 简介 <a class="header-anchor" href="#es6-简介" aria-label="Permalink to &quot;ES6+ 简介&quot;">​</a></h1><p>ECMAScript 6， 简称 ES6。 于2015年6月正式发布，是 JavaScript 语言的下一代标准。</p><p>官方地址：<a href="https://www.ecma-international.org/technical-committees/tc39/" target="_blank" rel="noreferrer">https://www.ecma-international.org/technical-committees/tc39/</a></p><p>铭哥教程：<a href="https://learn.fuming.site/front-end/es6/" target="_blank" rel="noreferrer">https://learn.fuming.site/front-end/es6/</a></p><p>阮一峰教程：<a href="https://es6.ruanyifeng.com/" target="_blank" rel="noreferrer">https://es6.ruanyifeng.com/</a></p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">程序员：用最简短的语句表达准确的意思。仅仅记忆字符串的功能，用的时候再查找</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>兼容性</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">http</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//kangax.github.io/es5-compat-table/es6/ 可以查看各大平台对ES6的支持情况。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">目前最新版的各大浏览器，尤其是 Chrome 已经能够支持大部分ES6的语法。</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">node.js 也支持 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ES6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 大部分的语法， </span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">http</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//node.green/ 上可以看到node对ES6的支持情况</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">可以使用 Babel 转码器将 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ES6</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 代码转换成浏览器兼容性更好的 </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">ES5</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> 代码。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>严格模式</p><div class="language-js vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">use strict</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//严格模式下不允许八进制定义方式</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">//函数内变量必须加 var，不加var 相当于全局变量。</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><h2 id="ecmascript-和-javascript" tabindex="-1">ECMAScript 和 JavaScript <a class="header-anchor" href="#ecmascript-和-javascript" aria-label="Permalink to &quot;ECMAScript 和 JavaScript&quot;">​</a></h2><ul><li>ECMA（European Computer Manufactures Association ）是欧洲计算机标准化协会的简称。</li><li>1996年JavaScript的创造者 Netspace（网景公司），将JavaScript提交给ECMA进行管理，希望JavScript能够成为国际标准。</li><li>1997年 ECMA 发布 262 号标准文件，规定了浏览器脚本语言的标准，将其命名为 ECMAScript。</li><li>ECMAScript 是 JavaScript 的规格，JavaScript 是 ECMAScript 的的一种实现。另外，以ECAMScript为规格的语言还有 JScript 和 ActionScript。</li></ul><h2 id="es6-和-es2015" tabindex="-1">ES6 和 ES2015 <a class="header-anchor" href="#es6-和-es2015" aria-label="Permalink to &quot;ES6 和 ES2015&quot;">​</a></h2><ul><li>ES6 的第一个版本在2015年6发布，正式名称是《ECMAScript 2015标准》，故也称之为 ECMAScript 2015，简称 ES2015。</li><li>此后，每年的6月都会发布新的版本，2016年6月发布了 ES2016，也被称之为 ES7；2017年6月发布了ES2017，也被称之为ES8。</li><li>ES6 在原先的 ES5 基础上加入了大量的新特性，但是此后的版本只是进行了小幅修订，所以有时候<strong>我们使用 ES6 来代指 ES6 以及之后的版本</strong>。</li></ul><h2 id="ecmascript-时间节点" tabindex="-1">ECMAScript 时间节点 <a class="header-anchor" href="#ecmascript-时间节点" aria-label="Permalink to &quot;ECMAScript 时间节点&quot;">​</a></h2><ul><li>ECMAScript 1（1997 年 6 月）：规范第一版。</li><li>ECMAScript 2（1998 年 6 月）：为了同步 ISO 标准，引入了一些小更新。</li><li>ECMAScript 3（1999 年 12 月）： 3.0 版本是一个巨大的成功，得到了广泛的支持，奠定了JavaScript的基础，我们一开始学习的JavaScript 其实就是3.0版本。</li><li>ECMAScript 4（2008 年 7 月废除)：本来是一次大规模升级（静态类型、模块、命名空间等），但跨度过大，出现了分歧，最终没能推广使用。</li><li>ECMAScript 5（2009 年 12 月）：变化不大，加了一些标准库特性和严格模式。</li><li>ECMAScript 5.1（2011 年 6 月）：又一次小更新，为了同步 ISO 标准。</li><li>ECMAScript 6（2015 年 6 月）：一大波更新，实现了当年 ES4 的许多设想，并正式改为按年份命名规范版本。</li><li>ECMAScript 2016（2016 年 6 月）：第一个年度版本，与 ES6 相比，发布周期较短，新特性也相对少些。</li><li>ECMAScript 2017（2017 年 6 月）：第二个年度版本。</li><li>以后的 ECMAScript 版本（ES2018、ES2019、ES2020、ES2021、ES2022等）都在 6 月正式获准生效。</li></ul><h2 id="ecmascript-语法标准制定流程" tabindex="-1">ECMAScript 语法标准制定流程 <a class="header-anchor" href="#ecmascript-语法标准制定流程" aria-label="Permalink to &quot;ECMAScript 语法标准制定流程&quot;">​</a></h2><p>任何人都可以向标准委员会（又称 TC39 委员会）提案，要求修改语言标准。一种新的语法从提案到变成正式标准，需要经历五个阶段：</p><ul><li>Stage 0 - Strawman（展示阶段）</li><li>Stage 1 - Proposal（征求意见阶段）</li><li>Stage 2 - Draft（草案阶段）</li><li>Stage 3 - Candidate（候选人阶段）</li><li>Stage 4 - Finished（定案阶段）</li></ul><p><strong>只要进入第 4 阶段就已经算是标准特性了，会在下一个 6 月正式纳入标准</strong>。</p><p>ECMAScript 当前的所有提案，可以在 TC39 的官方网站 <a href="https://github.com/tc39/ecma262" target="_blank" rel="noreferrer">GitHub.com/tc39/ecma262</a> 查看。</p><h2 id="es6-的兼容性问题" tabindex="-1">ES6 的兼容性问题 <a class="header-anchor" href="#es6-的兼容性问题" aria-label="Permalink to &quot;ES6 的兼容性问题&quot;">​</a></h2><ul><li><a href="http://kangax.github.io/es5-compat-table/es6/" target="_blank" rel="noreferrer">http://kangax.github.io/es5-compat-table/es6/</a> 可以查看各大平台对ES6的支持情况。</li><li>目前最新版的各大浏览器，尤其是 Chrome 已经能够支持大部分ES6的语法。</li><li>node.js 也支持 ES6 大部分的语法， <a href="http://node.green/" target="_blank" rel="noreferrer">http://node.green/</a> 上可以看到node对ES6的支持情况</li><li>可以使用 Babel 转码器将 ES6 代码转换成浏览器兼容性更好的 ES5 代码。</li></ul><h2 id="参考网站" tabindex="-1">参考网站 <a class="header-anchor" href="#参考网站" aria-label="Permalink to &quot;参考网站&quot;">​</a></h2><ul><li><a href="http://www.ecma-international.org/ecma-262/6.0" target="_blank" rel="noreferrer">http://www.ecma-international.org/ecma-262/6.0</a></li><li><a href="https://es6.ruanyifeng.com/" target="_blank" rel="noreferrer">https://es6.ruanyifeng.com/</a></li></ul>`,25),r=[n];function l(p,c,h,o,E,d){return e(),i("div",null,r)}const u=a(t,[["render",l]]);export{k as __pageData,u as default};
