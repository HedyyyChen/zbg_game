<template>
  <div class="page-wrapper">
    <div class="phone-container">
      <!-- 状态栏容器（包含摄像头） -->
      <div class="status-bar">
        <span>{{ currentTime }}</span>
        <div class="camera-notch"></div>
        <div class="status-icons">
          <span>📶</span>
          <span>🌐</span>
          <span>🔋</span>
        </div>
      </div>

      <div class="phone-screen">
        <!-- 密码输入弹窗 -->
        <div v-if="showPasswordDialog" class="password-dialog-overlay" @click.self="closePasswordDialog">
          <div class="password-dialog">
            <h3>请输入密码</h3>
            <input 
              v-model="emailPassword" 
              type="password" 
              placeholder="输入密码"
              @keyup.enter="checkEmailPassword"
              ref="passwordInput"
            />
            <div class="dialog-buttons">
              <button @click="checkEmailPassword">确认</button>
              <button @click="closePasswordDialog">取消</button>
            </div>
            <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
          </div>
        </div>
        
        <!-- 应用图标网格 -->
        <div class="app-grid">
          <div class="app-item chat-app" @click="openChat">
            <div class="icon-circle">OO</div>
            <div class="app-name">聊天软件</div>
          </div>
          <div class="app-item browser-app" @click="openBrowser">
            <div class="icon-circle">🔍</div>
            <div class="app-name">搜索引擎</div>
          </div>
          <div class="app-item email-app" @click="openEmail">
            <div class="icon-circle">✉️</div>
            <div class="app-name">电子邮箱</div>
          </div>
        </div>
      </div>
    </div>

    <div class="back-button">
      <a @click="goBack">← 返回主页面</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyPhone',
  data() {
    return {
      currentTime: '9:41',
      showPasswordDialog: false,
      emailPassword: '',
      passwordError: ''
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
    openChat() {
      this.$router.push('/chat')
    },
    openBrowser() {
      this.$router.push('/searchplace')
    },
    openEmail() {
      this.showPasswordDialog = true
      this.emailPassword = ''
      this.passwordError = ''
      this.$nextTick(() => {
        if (this.$refs.passwordInput) {
          this.$refs.passwordInput.focus()
        }
      })
    },
    checkEmailPassword() {
      if (this.emailPassword === 'sleepman') {
        this.showPasswordDialog = false
        this.$router.push('/emailplace')
      } else {
        this.passwordError = '密码错误'
        this.emailPassword = ''
      }
    },
    closePasswordDialog() {
      this.showPasswordDialog = false
      this.emailPassword = ''
      this.passwordError = ''
    },
    goBack() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.phone-container {
  width: 360px;
  height: 720px;
  background: #ffffff;
  border-radius: 40px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
  margin-top: 20px;
  border: 8px solid black;
  backdrop-filter: blur(10px);
}

.status-bar {
  height: 40px;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: relative;
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  z-index: 10;
}

.camera-notch {
  width: 40px;
  height: 20px;
  background: black;
  border-radius: 10px;
  box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.1);
  z-index: 11;
}

.status-bar > span:first-of-type,
.status-icons {
  width: calc(50% - 30px);
  text-align: left;
}

.status-icons {
  text-align: right;
}

.status-icons span {
  margin-left: 8px;
  font-size: 0.9rem;
}

.phone-screen {
  width: 100%;
  height: calc(100% - 40px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
  position: relative;
}

.app-grid {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 320px;
  gap: 20px;
  margin-top: 10px;
}

.app-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.app-item:hover .icon-circle {
  transform: scale(1.1) translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.icon-circle {
  width: 70px;
  height: 70px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.8rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.chat-app .icon-circle {
  background: #ffffff;
  color: #333;
  border: 2px solid #ddd;
}

.browser-app .icon-circle {
  background: #4285f4;
  color: white;
}

.email-app .icon-circle {
  background: #ea4335;
  color: white;
}

.app-name {
  font-size: 0.85rem;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
  text-align: center;
  margin-top: 8px;
  word-break: break-all;
  letter-spacing: 0.5px;
}

.back-button {
  margin-top: 20px;
  padding: 12px 24px;
  background: #6c757d;
  color: white;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: inline-block;
}

.back-button:hover {
  background: #5a6268;
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.back-button a {
  color: white;
  text-decoration: none;
  cursor: pointer;
}

.page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
}

.password-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.password-dialog {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  min-width: 280px;
  max-width: 90%;
}

.password-dialog h3 {
  margin-bottom: 20px;
  color: #333;
  font-size: 1.2rem;
}

.password-dialog input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 15px;
  box-sizing: border-box;
}

.password-dialog input:focus {
  outline: none;
  border-color: #4285f4;
}

.dialog-buttons {
  display: flex;
  gap: 10px;
}

.dialog-buttons button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.dialog-buttons button:first-child {
  background: #4285f4;
  color: white;
}

.dialog-buttons button:first-child:hover {
  background: #357ae8;
}

.dialog-buttons button:last-child {
  background: #f0f0f0;
  color: #333;
}

.dialog-buttons button:last-child:hover {
  background: #e0e0e0;
}

.error-message {
  color: #ea4335;
  font-size: 0.9rem;
  margin-top: 10px;
  text-align: center;
}
</style>

<style>
body {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  padding: 20px;
  margin: 0;
  color: #333;
}
</style>

