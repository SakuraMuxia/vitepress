import{_ as e,c as t,o,a5 as a}from"./chunks/framework.ysm0ofoH.js";const _=JSON.parse('{"title":"BFC","description":"","frontmatter":{},"headers":[],"relativePath":"front-end/01-HTML5CSS3/33-BFC.md","filePath":"front-end/01-HTML5CSS3/33-BFC.md"}'),r={name:"front-end/01-HTML5CSS3/33-BFC.md"},n=a('<h1 id="bfc" tabindex="-1">BFC <a class="header-anchor" href="#bfc" aria-label="Permalink to &quot;BFC&quot;">​</a></h1><h2 id="_1-什么是-bfc" tabindex="-1">1 什么是 BFC <a class="header-anchor" href="#_1-什么是-bfc" aria-label="Permalink to &quot;1 什么是 BFC&quot;">​</a></h2><p><strong>Block Formatting Context</strong> 简称 <strong>BFC</strong>，中文翻译为 <strong>块级格式上下文</strong>。</p><h3 id="_1-w3c-中对-bfc-的定义" tabindex="-1">① W3C 中对 BFC 的定义 <a class="header-anchor" href="#_1-w3c-中对-bfc-的定义" aria-label="Permalink to &quot;① W3C 中对 BFC 的定义&quot;">​</a></h3><p>Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with &#39;overflow&#39; other than &#39;visible&#39; (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.</p><blockquote><p><strong>译文：</strong></p><p>浮动、绝对定位元素、不是块盒子的块容器(如inline-blocks、table-cells和table-captions)，以及<code>overflow</code>属性的值除<code>visible</code>以外的块盒(除非该值已传播到视口)，将为其内容建立新的块格式化上下文。</p></blockquote><p><a href="https://www.w3.org/TR/CSS22/visuren.html#block-formatting" target="_blank" rel="noreferrer">https://www.w3.org/TR/CSS22/visuren.html#block-formatting</a></p><h3 id="_2-mdn-上对-bfc-的定义" tabindex="-1">② MDN 上对 BFC 的定义 <a class="header-anchor" href="#_2-mdn-上对-bfc-的定义" aria-label="Permalink to &quot;② MDN 上对 BFC 的定义&quot;">​</a></h3><p>A <strong>block formatting context</strong> is a part of a visual CSS rendering of a web page. It&#39;s the region in which the layout of block boxes occurs and in which floats interact with other elements.</p><blockquote><p><strong>译文：</strong></p><p><strong>块格式化上下文（Block Formatting Context，BFC）</strong> 是Web页面的可视CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。</p></blockquote><p><a href="https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context" target="_blank" rel="noreferrer">https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context</a></p><h3 id="_3-到底什么是-bfc" tabindex="-1">③ 到底什么是 BFC <a class="header-anchor" href="#_3-到底什么是-bfc" aria-label="Permalink to &quot;③ 到底什么是 BFC&quot;">​</a></h3><p>首先，BFC 的意思是 <strong>Block Formatting Context</strong> ，即<strong>块级格式上下文</strong>。 然后，当元素满足了某些条件，我们认为该元素创建了 <strong>BFC</strong>。 创建了 BFC 的元素我们可以把他看做是一个独立的容器，容器内的元素不论如何布局都不会影响到外面。</p><h2 id="_2-创建-bfc-的方式" tabindex="-1">2 创建 BFC 的方式 <a class="header-anchor" href="#_2-创建-bfc-的方式" aria-label="Permalink to &quot;2 创建 BFC 的方式&quot;">​</a></h2><ul><li>根元素。</li><li>浮动元素。</li><li>绝对定位或固定定位的元素。</li><li>行内块元素。</li><li>表格单元格（th、td）、表格行（tr）、表格标题（caption）、table、thead、tbody、tfoot。</li><li><code>overflow</code> 的值不为 <code>visible</code> 的块元素。</li><li>伸缩项目。</li><li>多列容器。</li><li><code>column-span</code> 为 <code>all</code> 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中。</li></ul><h2 id="_3-创建-bfc-可以解决的问题" tabindex="-1">3 创建 BFC 可以解决的问题 <a class="header-anchor" href="#_3-创建-bfc-可以解决的问题" aria-label="Permalink to &quot;3 创建 BFC 可以解决的问题&quot;">​</a></h2><h3 id="_1-清除子元素浮动的影响" tabindex="-1">① 清除子元素浮动的影响 <a class="header-anchor" href="#_1-清除子元素浮动的影响" aria-label="Permalink to &quot;① 清除子元素浮动的影响&quot;">​</a></h3><p>给浮动元素的父元素创建 BFC，清除掉子元素浮动的影响。</p><h3 id="_2-解决外边距塌陷" tabindex="-1">② 解决外边距塌陷 <a class="header-anchor" href="#_2-解决外边距塌陷" aria-label="Permalink to &quot;② 解决外边距塌陷&quot;">​</a></h3><p>给父元素创建 BFC，第一个和最后一个子元素的外边距不会塌陷。</p>',20),l=[n];function i(c,s,h,d,b,f){return o(),t("div",null,l)}const C=e(r,[["render",i]]);export{_ as __pageData,C as default};
