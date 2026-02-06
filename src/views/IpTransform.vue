<template>
  <PhoneFrame :current-time="currentTime">
    <div class="ip-container">
      <div class="ip-header">
        <button class="back-btn" @click="goBackToSearch">←</button>
        <h2>IP地址切换器</h2>
      </div>
      <div class="ip-content">
        <!-- 初始按钮：仅在未操作时显示 -->
        <div v-if="!activeMode" class="button-group">
          <button class="ip-btn" @click="hideIp">IP地址隐藏</button>
          <button class="ip-btn" @click="showTransformInput">IP地址切换</button>
        </div>

        <!-- IP 切换输入区 -->
        <div v-if="activeMode === 'transform'" class="transform-section">
          <input 
            v-model="ipAddress" 
            type="text" 
            placeholder="请输入IP地址"
            @keyup.enter="transformIp"
          />
          <button class="transform-btn" @click="transformIp">切换</button>
          <div v-if="transformMessage" :class="['message', transformMessageType]">
            {{ transformMessage }}
          </div>
        </div>

        <!-- 隐藏成功提示 -->
        <div v-if="activeMode === 'hide'" class="cancel-section">
          <div class="message success">IP地址已隐藏</div>
          <button class="cancel-btn" @click="cancelOperation">取消操作</button>
        </div>

        <!-- 切换成功提示（仅在成功后显示） -->
        <div v-if="isTransformSuccess" class="cancel-section">
          <div class="message success">
            IP地址切换成功！
          </div>
          <button class="cancel-btn" @click="cancelOperation">取消操作</button>
        </div>
      </div>
    </div>
  </PhoneFrame>
</template>

<script>
import PhoneFrame from '../components/PhoneFrame.vue'
import globalState from '../utils/globalState'

const CORRECT_IP = '202.108.15.68'

export default {
  name: 'IpTransform',
  components: {
    PhoneFrame
  },
  data() {
    return {
      currentTime: '9:41',
      activeMode: null, // 'hide' | 'transform' | null
      isTransformSuccess: false,
      ipAddress: '',
      transformMessage: '',
      transformMessageType: '',
      timeInterval: null
    }
  },
  mounted() {
    this.updateTime()
    this.timeInterval = setInterval(this.updateTime, 60000)
  },
  beforeUnmount() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval)
    }
  },
  methods: {
    updateTime() {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      this.currentTime = `${hours}:${minutes}`
    },
    hideIp() {
      globalState.setEnd(2)
      this.activeMode = 'hide'
      this.isTransformSuccess = false
    },
    showTransformInput() {
      this.activeMode = 'transform'
      this.isTransformSuccess = false
      this.ipAddress = ''
      this.transformMessage = ''
    },
    transformIp() {
      const ip = this.ipAddress.trim()
      if (!ip) {
        this.transformMessage = '请输入IP地址'
        this.transformMessageType = 'error'
        return
      }

      if (ip === CORRECT_IP) {
        globalState.setEnd(3)
        this.isTransformSuccess = true
        this.transformMessage = ''
      } else {
        this.transformMessage = '无此IP地址'
        this.transformMessageType = 'error'
        this.isTransformSuccess = false
      }
    },
    cancelOperation() {
      globalState.setEnd(1)
      this.activeMode = null
      this.isTransformSuccess = false
      this.ipAddress = ''
      this.transformMessage = ''
    },
    goBack() {
      this.$router.push('/searchplace')
    },
    goBackToSearch() {
      this.$router.push('/searchplace')
    }
  }
}
</script>

<style scoped>
.ip-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  /* 使用更有深度的渐变背景或纯净的浅灰色 */
  background: #f8f9fa; 
  color: #2c3e50;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
}

.ip-header {
  display: flex;
  align-items: center;
  padding: 20px;
  background: #ffffff;
  /* 增加微妙的底部投影 */
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  z-index: 10;
}

.back-btn {
  background: #eee;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  transition: all 0.2s;
}

.back-btn:hover {
  background: #e0e0e0;
  transform: translateX(-3px);
}

.ip-header h2 {
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.ip-content {
  flex: 1;
  padding: 40px 25px;
  overflow-y: auto;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

/* 统一按钮样式，增加阴影和点击动效 */
.ip-btn, .transform-btn, .cancel-btn {
  width: 100%;
  padding: 16px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.ip-btn {
  background: linear-gradient(135deg, #4285f4, #357ae8);
  color: white;
}

.ip-btn:active {
  transform: scale(0.98);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.transform-section {
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.05);
  margin-bottom: 20px;
  animation: fadeIn 0.4s ease-out;
}

.transform-section input {
  width: 100%;
  padding: 14px;
  border: 2px solid #edf2f7;
  border-radius: 10px;
  font-size: 1rem;
  margin-bottom: 20px;
  box-sizing: border-box;
  background: #f7fafc;
  transition: all 0.3s;
}

.transform-section input:focus {
  outline: none;
  border-color: #4285f4;
  background: white;
  box-shadow: 0 0 0 4px rgba(66, 133, 244, 0.1);
}

.transform-btn {
  background: #34a853;
  color: white;
}

.cancel-section {
  text-align: center;
  animation: slideUp 0.4s ease-out;
}

.cancel-btn {
  background: #fff;
  color: #f44336;
  border: 1.5px solid #f44336;
  box-shadow: none;
}

.cancel-btn:hover {
  background: #f44336;
  color: white;
}

/* 增强消息提示的视觉 */
.message {
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  font-size: 0.95rem;
  margin-bottom: 15px;
  font-weight: 500;
}

.message.success {
  background: #e6fffa;
  color: #285e61;
  border: 1px solid #b2f5ea;
}

.message.error {
  background: #fff5f5;
  color: #9b2c2c;
  border: 1px solid #feb2b2;
}

/* 简单的进入动画 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>