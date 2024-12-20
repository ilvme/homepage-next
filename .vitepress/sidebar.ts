import Front_End from './sidebar.fe'
import BACK_END from './sidebar.be'
import TOOLCHAIN from './sidebar.toolchain'
import DAILY from './sidebar.daily'

const sidebar = {
  // front-end 目录侧边栏配置
  ...Front_End,

  // back-end 目录侧边栏配置
  ...BACK_END,

  // daily-notes 目录侧边栏配置
  ...DAILY,

  // toolchain 目录侧边栏配置
  ...TOOLCHAIN,
}

export default sidebar
