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
  background: white;
  color: #333;
}

.ip-header {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.back-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  margin-right: 15px;
}

.ip-header h2 {
  font-size: 1.2rem;
  font-weight: bold;
}

.ip-content {
  flex: 1;
  padding: 30px 20px;
  overflow-y: auto;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.ip-btn {
  width: 100%;
  padding: 15px;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.ip-btn:hover {
  background: #357ae8;
}

.transform-section {
  margin-bottom: 20px;
}

.transform-section input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 15px;
  box-sizing: border-box;
}

.transform-section input:focus {
  outline: none;
  border-color: #4285f4;
}

.transform-btn {
  width: 100%;
  padding: 12px;
  background: #34a853;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

.cancel-section {
  margin-top: 20px;
}

.cancel-btn {
  width: 100%;
  padding: 12px;
  background: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 15px;
}

.message {
  padding: 12px;
  border-radius: 6px;
  text-align: center;
  font-size: 0.95rem;
}

.message.success {
  background: #e8f5e9;
  color: #2e7d32;
}

.message.error {
  background: #ffebee;
  color: #c62828;
}
</style>