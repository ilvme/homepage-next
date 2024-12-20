const nav = [
  { text: '导航', link: '/' },
  {
    text: '进击的前端',
    items: [
      {
        items: [
          { text: '前端工程化基础', link: '...' },
          { text: '开发技巧总结', link: '...' },
        ],
      },
      {
        text: '前端物语',
        items: [
          { text: 'Web 基础与 HTML', link: '...' },
          { text: 'CSS 重点与常用技巧', link: '...' },
          { text: 'JavaScript (ES6+)', link: '...' },
        ],
      },
    ],
  },
  {
    text: '折戟的后端',
    items: [
      { text: 'Java', link: '...' },
      { text: '框架与中间件', link: '/about/' },
      { text: '数据库与存储', link: '/about/' },
      { text: '架构与设计', link: '...' },
    ],
  },
  { text: '工具链与格物篇', link: '/toolchain/headline.md' },
  { text: '日常笔记', link: '/daily/index.md' },
  {
    text: '关于',
    items: [
      { text: '关于我', link: '/about/' },
      { text: '简历', link: '/resume.md' },
      { text: '闲言', link: '/daily-words.md' },
      { text: '友情链接', link: '/friends.md' },
    ],
  },
  { text: '友链', link: '/daily/index.md' },
]

export default nav
