const nav = [
  { text: '首页', link: '/' },
  // { text: '导航', link: '/nav' },
  {
    text: '进击的前端',
    items: [
      {
        items: [
          { text: '前端工程化基础', link: '/front-end/engineering/' },
          { text: '开发技巧总结', link: '/front-end/skills/' },
        ],
      },
      {
        text: '前端物语',
        items: [
          { text: 'Web 基础与 HTML', link: '/front-end/html/' },
          { text: 'CSS 重点与常用技巧', link: '/front-end/css/' },
          { text: 'JavaScript (ES6+)', link: '/front-end/javascript/' },
        ],
      },
    ],
  },
  {
    text: '折戟的后端',
    items: [
      { text: 'Java', link: '/back-end/java/' },
      { text: '框架与中间件', link: '/back-end/framework' },
      { text: '数据库与存储', link: '/back-end/database/' },
      { text: '架构与设计', link: '/back-end/design/' },
    ],
  },
  { text: '工具链与格物篇', link: '/toolchain/index.md' },
  { text: '日常', link: '/daily/index.md' },
  {
    text: '关于',
    items: [
      { text: '关于我', link: '/about.md' },
      { text: '简历', link: '/resume.md' },
      { text: 'Daily Words', link: '/daily-words.md' },
      { text: '友情链接', link: '/friends.md' },
    ],
  },
]

export default nav
