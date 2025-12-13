// 全局状态管理
const globalState = {
  end: 1, // 默认值为1
  
  getEnd() {
    // 从localStorage读取，如果没有则返回默认值
    const saved = localStorage.getItem('game_end')
    return saved ? parseInt(saved) : 1
  },
  
  setEnd(value) {
    this.end = value
    localStorage.setItem('game_end', value.toString())
  },
  
  init() {
    this.end = this.getEnd()
  },
  
  reset() {
    this.end = 1
    localStorage.removeItem('game_end')
  }
}

// 初始化
globalState.init()

export default globalState

