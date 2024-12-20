const TOOLCHAIN = {
  '/toolchain/': [
    {
      items: [{ text: '在线工具', link: '/toolchain/' }],
    },
    {
      text: '工具链',
      items: [
        { text: '编程规范', link: '/toolchain/' },
        { text: 'IDEA 配置与优化', link: '/config/' },
        { text: 'VS Code 配置', link: '/config/three' },
        { text: 'Win11 使用', link: '/config/four' },
        { text: 'Mac 使用', link: '/config/four' },
      ],
    },

    {
      text: '构建 & 运维',
      items: [
        { text: 'Git Wiki', link: '/toolchain/' },
        { text: 'Maven 配置', link: '/toolchain/' },
        { text: 'Linux 压缩与解压缩', link: '/toolchain/' },
        { text: 'Docker Wiki', link: '/toolchain/' },
      ],
    },
    {
      text: '格物篇',
      items: [
        { text: '计算机网络', link: '/config/' },
        { text: '数据结构与算法', link: '/config/three' },
        { text: '算法', link: '/config/four' },
      ],
    },
  ],
}

export default TOOLCHAIN
