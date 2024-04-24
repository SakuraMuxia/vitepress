import { defineConfig } from 'vitepress';
import { set_sidebar } from "./utils/auto-gen-sidebar.mjs";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  head: [["link", { rel: "icon", href: "/vitepress/logo.svg" }]],
    base: "/vitepress/",
  title: "雨落辰潇-文档站",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
//-----------------------------------------------------------------------
    // 优化文章目录
    outline: {
      level: [1, 6],
      label: '目录'
    },
      //上一页下一页配置
    docFooter: {
      prev: '上一篇',
      next: '回到第一章',
    },
    // logo配置
    logo: "logo.svg",
    //页脚
    footer: {
      message: '',
      copyright: 'Copyright © 2024 雨落辰潇',
    },
//-----------------------------------------------------------------------
    // nav导航
    nav: [
      { text: '首页', link: '/' }, // 表示docs/index.md
      { text: '前端', items:[
          {
            text: 'HTML5CSS3',
            link: '/front-end/01-HTML5CSS3/'
          },
          {
            text: 'JavaScript',
            link: '/front-end/02-JavaScript/'
          },
          {
            text: 'BootStrap',
            link: '/front-end/03-Bootstrap/'
          },
          {
            text: 'ES6',
            link: '/front-end/04-ES6/'
          },
          {
            text: 'MongoDB',
            link: '/front-end/06-mongoDB/'
          },
          {
            text: 'Ajax',
            link: '/front-end/'
          },
          {
            text: 'Promise',
            link: '/front-end/'
          },
          {
            text: 'Nodejs',
            link: '/front-end/05-Node.js/'
          },
          {
            text: 'React',
            link: '/front-end/'
          },
          {
            text: 'TypeScript',
            link: '/front-end/'
          },
          {
            text: 'Vue',
            link: '/front-end/'
          },
          {
            text: 'uni-app',
            link: '/front-end/'
          },
        ]},
      { text: '运维', items:[
          {
            text: 'Linux',
            link: '/front-end/'
          },
          {
            text: 'Git',
            link: '/devops/git/'
          },
          {
              text: 'Ansible',
              link: '/front-end/'
          },
          {
            text: 'Jenkins',
            link: '/front-end/'
          },
          {
              text: 'Prometheus+Grafana',
              link: '/front-end/'
          },
          {
            text: 'zabbix',
            link: '/front-end/'
          },
          {
            text: 'docker',
            link: '/front-end/'
          },
          {
            text: 'kubernetes',
            link: '/front-end/'
          },
        ]},
      { text: '网络', items:[
          {
            text: '路由交换',
            link: '/front-end/'
          },
          {
            text: 'VPN',
            link: '/front-end/'
          },
          {
            text: 'OSPF',
            link: '/front-end/'
          },
        ]},
      { text: '后端', items:[
          {
            text: 'SpringBoot',
            link: '/front-end/'
          },
          {
            text: 'RabbitMQ',
            link: '/front-end/'
          },
          {
            text: 'Mybatis',
            link: '/front-end/'
          },
          {
              text: 'Redis',
              link: '/front-end/'
          },
        ]},
      { text: '博客', items:[
                {
                    text: '技术',
                    link: '/blogs/01-technology'
                }
            ]},
    ],
//-----------------------------------------------------------------------
    // sidebar
sidebar: {
    "/front-end/01-HTML5CSS3/": set_sidebar("/docs/front-end/01-HTML5CSS3/"),
    "/front-end/02-JavaScript/": set_sidebar("/docs/front-end/02-JavaScript/"),
    "/front-end/03-Bootstrap/": set_sidebar("/docs/front-end/03-Bootstrap/"),
    "/front-end/04-ES6/": set_sidebar("/docs/front-end/04-ES6/"),
    "/front-end/05-Node.js/": set_sidebar("/docs/front-end/05-Node.js/"),
    "/front-end/06-mongoDB/": set_sidebar("/docs/front-end/06-mongoDB/"),
    "/blogs/01-technology/": set_sidebar("/docs/blogs/01-technology/"),
    "/devops/git/": set_sidebar("/docs/devops/git/"),
},
//---------------------------------------------------------------
    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
//---------------------------------------------------------------
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sakuramuxia' },
      { icon: {
            svg: '<svg t="1709877715308" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7469" width="200" height="200"><path d="M257.2 111.1c15.8-9.02 35.9-10.28 52.6-2.9 12.52 5.14 21.94 15.22 32.12 23.78 42 36.24 83.64 72.94 125.82 108.96 29.5 0.06 59.02 0.06 88.52 0 42.16-36 83.76-72.66 125.74-108.9 10.2-8.56 19.64-18.66 32.2-23.84 16.24-7.16 35.72-6.2 51.32 2.22 18.24 9.42 30.9 28.94 31.68 49.5 1.18 14.94-4.18 30.02-13.56 41.6-8.3 9.2-18.18 16.72-27.38 24.96-5.88 4.86-11.16 10.46-17.64 14.56 26.02 0 52.04-0.3 78.06 0.16 34.28 0.9 67.64 16.06 91.22 40.9 24.9 24.44 39.1 58.94 39.08 93.8 0.12 119.36 0.02 238.74 0.06 358.12-0.12 18.04 0.86 36.34-3.14 54.08-7.3 36.32-31.68 67.78-62.68 87.32-21.16 13.42-46.34 19.56-71.26 19.6-189.98 0.02-379.98 0-569.96 0-18.74-0.12-37.7 0.98-56.14-3.14-35.32-7.1-66.06-30.4-85.7-60.16-14.42-21.66-21.18-47.82-21.18-73.72-0.02-117.98 0-235.96 0-353.94 0.16-18.14-0.96-36.48 2.74-54.36 11.22-58.22 64.86-105.76 124.38-108.34 27.1-0.84 54.24-0.22 81.36-0.32-12.76-9.26-24.02-20.44-36.1-30.56-14.82-12.14-24.1-31.28-22.56-50.56 0.78-20.06 12.84-39.18 30.4-48.82m-14.32 244.14c-23.08 4.14-42.86 22.36-49.3 44.84-2.32 7.72-2.54 15.88-2.58 23.9 0.1 98.02-0.06 196.04 0.08 294.06-0.46 26.68 17.94 51.94 43.06 60.44 8.92 3.26 18.56 3.3 27.92 3.36 168.66-0.08 337.3 0.08 505.94-0.06 24.72 1 48.52-14.4 58.92-36.6 6.36-12.72 6.28-27.24 6.06-41.1-0.02-91.32-0.02-182.64 0-273.94-0.02-10.04 0.34-20.34-2.58-30.06-5.6-19.58-21.3-35.92-40.54-42.54-10.8-3.9-22.48-3.3-33.76-3.38-161.32 0.02-322.62 0-483.94 0.02-9.76 0.02-19.58-0.34-29.28 1.06z" fill="#1296db" p-id="7470"></path><path d="M345.04 449.44c16.12-1.66 32.84 3.56 45.14 14.1 13.68 11.22 21.5 28.72 21.72 46.32 0.44 21.38 0.16 42.8 0.16 64.18-0.06 14.04-3.76 28.36-12.48 39.56-12.12 16.44-33.02 25.82-53.36 23.94-20.06-1.26-38.92-13.5-48.46-31.14-7.48-12.8-8.14-28.02-7.94-42.46 0.48-20.74-1.04-41.6 1.02-62.28 3.08-27.22 26.98-49.94 54.2-52.22zM666.94 449.44c16.7-1.74 33.98 3.92 46.48 15.1 12.32 10.84 19.84 26.88 20.34 43.28 0.94 20.04 0.12 40.12 0.44 60.16 0.12 14.08-1.54 28.78-9.36 40.86-11.28 18.78-33.34 30.34-55.2 28.8-19.14-0.78-37.42-11.48-47.72-27.58-8.74-12.9-10.44-28.88-10.06-44.08 0.4-20.62-0.74-41.26 0.68-61.84 2.04-28.16 26.34-52.32 54.4-54.7z" fill="#1296db" p-id="7471"></path></svg>'
        }, link: 'https://space.bilibili.com/69727471/' }
    ],
  },

    markdown: {
        lineNumbers: true, //开启代码块行号
    },
},)
