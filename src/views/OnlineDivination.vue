<template>
  <PhoneFrame :current-time="currentTime">
    <div class="divination-container">
      <div class="divination-header">
        <button class="back-btn" @click="goBack">←</button>
        <h1>线上水晶球占卜</h1>
      </div>
      
      <div class="divination-content">
        <div class="app-info">
          <div class="app-icon">🔮</div>
          <h2>线上水晶球占卜软件</h2>
          <p class="app-description">
            专业的线上占卜工具，为您提供水晶球占卜服务。
            通过先进的算法模拟水晶球效果，引导您获得属于自己的启示。
          </p>
          
          <div class="app-details">
            <div class="detail-item">
              <span class="label">开发者：</span>
              <span class="value">无所谓我会出手</span>
            </div>
            <div class="detail-item">
              <span class="label">大小：</span>
              <span class="value">2.4 MB</span>
            </div>
            <div class="detail-item">
              <span class="label">版本：</span>
              <span class="value">1.0.0</span>
            </div>
          </div>
        </div>

        <button class="download-btn" @click="downloadApp">
          📥 下载
        </button>

        <div v-if="downloaded" class="download-success">
          已下载到主屏幕
        </div>
      </div>
    </div>
  </PhoneFrame>
</template>

<script>
import PhoneFrame from '../components/PhoneFrame.vue'
import { globalState } from '../utils/globalState'

export default {
  name: 'OnlineDivination',
  components: {
    PhoneFrame
  },
  data() {
    return {
      currentTime: '9:41',
      downloaded: false,
      timeInterval: null
    }
  },
  mounted() {
    this.updateTime()
    this.timeInterval = setInterval(this.updateTime, 60000)
  },
  beforeUnmount() {
    if (this.timeInterval) clearInterval(this.timeInterval)
  },
  methods: {
    updateTime() {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      this.currentTime = `${hours}:${minutes}`
    },
    downloadApp() {
      if (this.downloaded) return
      
      // 调用globalState方法正确保存应用
      globalState.downloadDivinationApp()
      
      this.downloaded = true
    },
    goBack() {
      this.$router.push('/searchplace')
    }
  }
}
</script>

<style scoped>
.divination-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f5f7ff 0%, #e8ecf8 100%);
  color: #333;
  font-family: 'Microsoft YaHei', sans-serif;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
  min-height: 0;
}

.divination-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: linear-gradient(to right, #6a4ca9, #8a6cc9);
  color: white;
  flex-shrink: 0;
  border-bottom: 2px solid rgba(255, 255, 255, 0.1);
}

.back-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.4rem;
  cursor: pointer;
  transition: transform 0.2s;
}

.back-btn:hover {
  transform: scale(1.2);
}

.divination-header h1 {
  font-size: 1.2rem;
  font-weight: bold;
}

.divination-content {
  flex: 1;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  min-height: 0;
}

.app-info {
  background: white;
  border-radius: 16px;
  padding: 30px 20px;
  box-shadow: 0 4px 16px rgba(100, 90, 150, 0.12);
  width: 100%;
  max-width: 300px;
  text-align: center;
  margin-bottom: 20px;
}

.app-icon {
  font-size: 4rem;
  margin-bottom: 15px;
}

.app-info h2 {
  font-size: 1.3rem;
  color: #6a4ca9;
  margin-bottom: 12px;
  font-weight: bold;
}

.app-description {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.app-details {
  text-align: left;
  border-top: 1px solid #eaeaff;
  padding-top: 15px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 0.9rem;
  color: #555;
}

.detail-item .label {
  font-weight: 600;
  color: #6a4ca9;
}

.detail-item .value {
  color: #888;
}

.download-btn {
  padding: 16px 40px;
  background: linear-gradient(to right, #6a4ca9, #8a6cc9);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(100, 90, 150, 0.2);
  margin-bottom: 20px;
}

.download-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(100, 90, 150, 0.3);
}

.download-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.download-success {
  padding: 12px 20px;
  background: #e8f5e9;
  border-radius: 8px;
  color: #2e7d32;
  font-weight: 600;
  text-align: center;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
