<template>
  <PhoneFrame :current-time="currentTime">
    <!-- 滚动容器（用于监听 scroll） -->
    <div ref="scrollContainer" class="jindu-container">
      <div class="jindu-header">
        <button class="back-btn" @click="goBack">←</button>
        <h2>目标进度</h2>
      </div>
      <div class="jindu-content">
        <div class="info-section">
          <h3>目标姓名：林月</h3>

          <div class="info-item">
            <strong>居住状况：</strong>独居，无亲人在身边，居住小区人员不多，符合条件。
          </div>

          <div class="info-item">
            <strong>购买水晶球型号：</strong>SJQ7852定位器款
          </div>

          <div class="info-item">
            <strong>定位器状态：</strong>
            <span class="status-active">● 在线</span>
          </div>

          <!-- 优化后的远程遥控配置 -->
          <div class="info-item remote-control">
            <strong>远程遥控配置</strong>
            <div class="control-grid">
              <div class="control-item">
                <div class="icon">🎨</div>
                <div class="label">颜色</div>
                <div class="value">随机</div>
              </div>
              <div class="control-item">
                <div class="icon">💡</div>
                <div class="label">光线</div>
                <div class="value">随机</div>
              </div>
              <div class="control-item">
                <div class="icon">🌀</div>
                <div class="label">图案</div>
                <div class="value">随机</div>
              </div>
              <div class="control-item">
                <div class="icon">🖼️</div>
                <div class="label">画面</div>
                <div class="value">随机</div>
              </div>
            </div>
            <div class="control-note">
              注：系统每 30 分钟自动刷新一次配置，确保目标持续处于精神干扰状态。
            </div>
          </div>
        </div>
      </div>

      <!-- 举报按钮（滚动到底部才显示） -->
      <div v-if="showReportButton" class="report-section">
        <button class="report-btn" @click="report">⚠️ 举报</button>
      </div>
    </div>
  </PhoneFrame>
</template>

<script>
import PhoneFrame from '../components/PhoneFrame.vue'
import globalState from '../utils/globalState'

export default {
  name: 'MuBiaoJinDu',
  components: { PhoneFrame },
  data() {
    return {
      currentTime: '9:41',
      showReportButton: false,
      timeInterval: null
    }
  },
  mounted() {
    this.updateTime()
    this.timeInterval = setInterval(this.updateTime, 60000)

    this.$nextTick(() => {
      const container = this.$refs.scrollContainer
      if (container) {
        container.addEventListener('scroll', this.checkScroll)
        // 初始检查（防止内容不足一屏）
        this.checkScroll()
      }
    })
  },
  beforeUnmount() {
    if (this.timeInterval) clearInterval(this.timeInterval)
    const container = this.$refs.scrollContainer
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
    checkScroll() {
      const container = this.$refs.scrollContainer
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container
        if (scrollTop + clientHeight >= scrollHeight - 10) {
          this.showReportButton = true
        }
      }
    },
    report() {
      const end = globalState.getEnd()
      if (end === 2) {
        this.$router.push('/jubaoren')
      } else if (end === 3) {
        this.$router.push('/truthend')
      }
    },
    goBack() {
      this.$router.push('/hidepage')
    }
  }
}
</script>

<style scoped>
.jindu-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  color: #333;
  overflow-y: auto;
  height: 100%;
  min-height: 0;
}

.jindu-header {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
  flex-shrink: 0;
}

.back-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  margin-right: 15px;
}

.jindu-header h2 {
  font-size: 1.2rem;
  font-weight: bold;
}

.jindu-content {
  flex: 1;
  padding: 20px;
}

.info-section h3 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 2px solid #ddd;
}

.info-item {
  margin-bottom: 20px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
  line-height: 1.6;
  color: #666;
}

.status-active {
  color: #4caf50;
  font-weight: bold;
}

/* 远程遥控区域 - 暗色科技风 */
.remote-control {
  padding: 16px;
  background: #1a1a2e;
  border-radius: 10px;
  border-left: 3px solid #ff6666;
  color: #e0e0e0;
}

.control-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 12px;
}

.control-item {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  border: 1px solid #333;
}

.control-item .icon {
  font-size: 1.4rem;
  margin-bottom: 6px;
}

.control-item .label {
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 4px;
}

.control-item .value {
  font-weight: bold;
  color: #ffcc66;
}

.control-note {
  margin-top: 16px;
  font-size: 0.85rem;
  color: #888;
  font-style: italic;
  padding-top: 12px;
  border-top: 1px dashed #333;
}

/* 举报按钮 */
.report-section {
  padding: 20px;
  text-align: center;
  flex-shrink: 0;
}

.report-btn {
  padding: 15px 50px;
  background: #ea4335;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.report-btn:hover {
  background: #d33b2c;
}
</style>