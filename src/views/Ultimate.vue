<template>
  <!-- 全屏结局层（脱离 PhoneFrame，覆盖整个浏览器窗口） -->
  <div v-if="showEnding1" class="full-screen-ending">
    <div class="ending-text">
      <span v-for="(char, index) in displayedText" :key="index" class="char">{{ char }}</span>
    </div>
  </div>

  <!-- 正常游戏界面（含 PhoneFrame 手机模拟框） -->
  <PhoneFrame v-else :current-time="currentTime">
    <div class="ultimate-container" ref="content">
      <div class="content-header">
        <h2>⚠️【绝密档案 - 禁止外传】⚠️</h2>
      </div>
      <div class="content-body">
        <p>档案编号：TSV-2025-12-06</p>
        <p>主题：关于“它”的调查报告（第7次修订）</p>
        <p>状态：【已删除】</p>
        <p>内容：【已删除】塔斯维尔【已删除】%#【已删除】███【已删除】</p>
        <p>【已删除】████████████████【已删除】</p>
        <p>【已删除】?x0F!@#$%^&*()_+【已删除】</p>
        <p>【已删除】01010110 01100101 01101110 01101111 01101101【已 deleted】</p>
        <p>【已删除】████  █████【已删除】</p>
        <p>【已刪除】【已删除】</p>
        <p>【已删除】WARNING: DO NOT MENTION "IT"【已删除】</p>
        <p>【已删除】████████████████【已删除】</p>
        <p>【已删除】!@#$%^&*()_+【已删除】</p>
        <p>【已删除】████████████████【已删除】</p>
        <p>【已删除】ACCESS DENIED【已删除】</p>
        <p>【已删除】████████████████【已删除】</p>
        <p>【已删除】?x1B【已删除】</p>
        <p>【已删除】████████████████【已删除】</p>
        <p>【已删除】END OF FILE【已删除】</p>
        <p style="margin-top: 50px; opacity: 0.6; font-style: italic;">
          （页面内容异常，系统建议立即退出）
        </p>
      </div>

      <div v-if="showHideButton" class="hide-button-container">
        <button class="hide-button" @click="goToHidePage">
          ⚠️ 进入隐藏页面（高危操作）
        </button>
      </div>
    </div>
  </PhoneFrame>
</template>

<script>
import PhoneFrame from '../components/PhoneFrame.vue'
import globalState from '../utils/globalState'

export default {
  name: 'UltimatePage',
  components: { PhoneFrame },
  data() {
    return {
      currentTime: '9:41',
      showEnding1: false,
      displayedText: '',
      fullText: '找到你了',
      showHideButton: false,
      timeInterval: null
    }
  },
  mounted() {
    this.updateTime()
    this.timeInterval = setInterval(this.updateTime, 60000)

    const end = globalState.getEnd()

    if (end === 1) {
      // 5秒后启动全屏结局
      setTimeout(() => {
        this.showEnding1 = true
        this.typeText()
        // 8秒后跳转
        setTimeout(() => {
          this.$router.push('/findyou')
        }, 3000)
      }, 5000)
    } else {
      // end=2/3：监听滚动
      this.$nextTick(() => {
        const container = this.$refs.content
        if (container) {
          container.addEventListener('scroll', this.checkScroll)
        }
      })
    }
  },
  beforeUnmount() {
    if (this.timeInterval) clearInterval(this.timeInterval)
    const container = this.$refs.content
    if (container) {
      container.removeEventListener('scroll', this.checkScroll)
    }
  },
  methods: {
    updateTime() {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      this.currentTime = `${hours}:${minutes}`
    },
    typeText() {
      let index = 0
      const interval = setInterval(() => {
        if (index < this.fullText.length) {
          this.displayedText += this.fullText[index]
          index++
        } else {
          clearInterval(interval)
        }
      }, 300) // 每字 300ms
    },
    checkScroll() {
      const container = this.$refs.content
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container
        if (scrollTop + clientHeight >= scrollHeight - 50) {
          this.showHideButton = true
        }
      }
    },
    goToHidePage() {
      this.$router.push('/hidepage')
    }
  }
}
</script>

<style scoped>
/* 正常内容样式（在手机框内） */
.ultimate-container {
  flex: 1;
  padding: 20px;
  line-height: 1.8;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
  color: #cccccc;
  background: #0a0a0a;
}

.content-header h2 {
  font-size: 1.4rem;
  color: #ff6666;
  text-align: center;
  margin-bottom: 25px;
}

.content-body p {
  margin: 12px 0;
  word-break: break-all;
}

.hide-button-container {
  margin-top: 40px;
  padding: 20px;
  text-align: center;
}

.hide-button {
  padding: 12px 30px;
  background: #8b0000;
  color: white;
  border: 2px solid #ff4444;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.3);
}

/* 全屏结局样式 */
.full-screen-ending {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  overflow: hidden;
}

.ending-text {
  font-size: 5rem;
  font-weight: bold;
  color: #ff0000;
  text-align: center;
  letter-spacing: 12px;
}

.char {
  display: inline-block;
  opacity: 1;
}
</style>