// 全局状态管理
const globalState = {
  end: 1, // 默认值为1
  divinationAppDownloaded: false, // 水晶球占卜App是否已下载
  
  getEnd() {
    // 从localStorage读取，如果没有则返回默认值
    const saved = localStorage.getItem('game_end')
    return saved ? parseInt(saved) : 1
  },
  
  setEnd(value) {
    this.end = value
    localStorage.setItem('game_end', value.toString())
  },

  downloadDivinationApp() {
    this.divinationAppDownloaded = true
    localStorage.setItem('divinationAppDownloaded', 'true')
  },

  isDivinationAppDownloaded() {
    return this.divinationAppDownloaded
  },
  
  init() {
    this.end = this.getEnd()
    // 从localStorage读取下载状态，如果没有则默认为false
    const saved = localStorage.getItem('divinationAppDownloaded')
    this.divinationAppDownloaded = saved === 'true'
  },
  
  reset() {
    this.end = 1
    this.divinationAppDownloaded = false
    localStorage.removeItem('game_end')
    localStorage.removeItem('divinationAppDownloaded')
  }
}

// 初始化
globalState.init()

export { globalState }
export default globalState

