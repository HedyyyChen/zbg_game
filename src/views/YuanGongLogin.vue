<template>
  <PhoneFrame :current-time="currentTime">
    <div class="login-container">
      <div v-if="!isLoggedIn" class="login-form-section">
        <div class="system-header">
          <button class="header-back" @click="goBack">← 返回</button>
          <div class="system-logo">🔮</div>
          <div class="system-title">水晶球占卜馆 · 员工内网系统</div>
          <div class="system-version">v2.3.1</div>
        </div>

        <div class="login-card">
          <h2>员工登录</h2>
          <p class="login-note">请输入您的内部账号密码</p>

          <div class="input-group">
            <label>账号：</label>
            <input 
              v-model="username" 
              type="text" 
              placeholder=""
              @keyup.enter="login"
            />
          </div>
          <div class="input-group">
            <label>密码：</label>
            <input 
              v-model="password" 
              type="password" 
              placeholder=""
              @keyup.enter="login"
            />
          </div>
          <button class="login-btn" @click="login">🔒 安全登录</button>
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </div>

        <div class="login-footer">
          <div class="footer-notice">
            <span>© 2022–2025 水晶球占卜馆 · 内部系统</span>
            <span>安全等级：★★★★☆</span>
          </div>
        </div>
      </div>
      
      <div v-else class="employee-info">
        <div class="info-header">
          <button class="back-btn" @click="logout">←</button>
          <h2>员工信息中心</h2>
          <div class="status-indicator online">● 在线</div>
        </div>

        <div class="info-content">
          <div class="info-section">
            <h3>👤 个人信息</h3>
            <div class="info-grid">
              <div class="info-item"><strong>姓名：</strong>陈琳琳</div>
              <div class="info-item"><strong>职位：</strong>高级占卜师</div>
              <div class="info-item"><strong>工号：</strong><span class="highlight">ZBG013</span></div>
              <div class="info-item"><strong>入职日期：</strong><span class="highlight">20220506</span></div>
              <div class="info-item"><strong>所属部门：</strong>启示解读科</div>
              <div class="info-item"><strong>安全权限：</strong>Level 3（可查看社区动态）</div>
            </div>
          </div>

          <div class="info-section">
            <h3>📢 系统公告</h3>
            <div class="announcement">
              <p>• 2025-12-01：所有员工需在12月10日前完成年度精神状态自评。</p>
              <p>• 2025-11-25：新水晶球存储规范已分发至工位，请勿将球体暴露于强光下。</p>
              <p>• 2025-11-10：严禁在非工作时间使用占卜设备进行私人占卜。</p>
            </div>
          </div>

          <div class="info-section">
            <h3>💬 内部留言版</h3>
            <div class="message-board">
              <div class="message-item">
                <span class="message-author">【ZBG005】</span>
                关注一下"水晶球新手的交流社区"，有不当言论，记得删除。
              </div>
              <div class="message-item system">
                <span class="message-author">【系统】</span>
                本留言于 2025-12-03 14:22 自动归档。
              </div>
            </div>
          </div>

          <div class="info-section">
            <h3>🔒 安全须知</h3>
            <ul class="security-list">
              <li>请勿向任何人透露工号及密码</li>
              <li>发现异常行为请立即上报</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </PhoneFrame>
</template>

<script>
import PhoneFrame from '../components/PhoneFrame.vue'

const CORRECT_USERNAME = 'chenlinlin'
const CORRECT_PASSWORD = '20220506'

export default {
  name: 'YuanGongLogin',
  components: { PhoneFrame },
  data() {
    return {
      currentTime: '9:41',
      isLoggedIn: false,
      username: '',
      password: '',
      errorMessage: '',
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
    login() {
      if (this.username === CORRECT_USERNAME && this.password === CORRECT_PASSWORD) {
        this.isLoggedIn = true
        this.errorMessage = ''
      } else {
        this.errorMessage = '账号或密码错误，请重试'
      }
    },
    logout() {
      this.isLoggedIn = false
      this.username = ''
      this.password = ''
      this.errorMessage = ''
    },
    goBack() {
      this.$router.push('/shuijinqiuzhanbuguan')
    }
  }
}
</script>

<style scoped>
.login-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #f8f9fa;
  color: #333;
  font-family: 'Microsoft YaHei', sans-serif;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
  min-height: 0;
}

/* 系统顶部栏 */
.system-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: linear-gradient(to right, #4a2a8f, #6a4ca9);
  color: white;
  font-size: 0.9rem;
}

.system-logo {
  font-size: 1.4rem;
}

.system-title {
  font-weight: bold;
  flex: 1;
}

.system-version {
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
}

.header-back {
  background: none;
  border: none;
  color: white;
  font-size: 0.95rem;
  margin-right: 8px;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 6px;
}

.header-back:hover {
  background: rgba(255,255,255,0.06);
}

/* 登录表单区域 */
.login-form-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  min-height: 0;
  box-sizing: border-box;
}

/* 登录卡片 */
.login-card {
  flex: 1;
  padding: 30px 20px;
  max-width: 100%;
  width: 80%;
  margin: 20px auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  min-height: fit-content;
}

.login-card h2 {
  text-align: center;
  margin-bottom: 10px;
  color: #4a2a8f;
}

.login-note {
  text-align: center;
  color: #888;
  margin-bottom: 25px;
  font-size: 0.9rem;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 6px;
  font-weight: bold;
  color: #333;
}

.input-group input {
  width: 90%;
  padding: 10px 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: #6a4ca9;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
  transition: background 0.2s;
}

.login-btn:hover {
  background: #5a3f99;
}

.error-message {
  margin-top: 15px;
  padding: 10px;
  background: #ffebee;
  border-radius: 6px;
  color: #c62828;
  text-align: center;
  font-size: 0.9rem;
}

.login-footer {
  padding: 15px 20px;
  background: #f0f0f0;
  font-size: 0.85rem;
  color: #666;
}

.footer-notice {
  display: flex;
  justify-content: space-between;
}

.security-tip {
  margin-top: 8px;
  text-align: center;
  color: #e53935;
  font-weight: bold;
}

/* 登录后界面 */
.employee-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}

.info-header {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background: #4a2a8f;
  color: white;
  position: relative;
  flex-shrink: 0;
}

.info-header h2 {
  flex: 1;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
}

.status-indicator {
  font-size: 0.85rem;
  margin-left: 10px;
}

.status-indicator.online {
  color: #4caf50;
}

.back-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  margin-right: 15px;
  cursor: pointer;
}

.info-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  min-height: 0;
}

.info-section {
  margin-bottom: 25px;
}

.info-section h3 {
  margin-bottom: 12px;
  color: #4a2a8f;
  font-size: 1.1rem;
}

.info-grid {
  display: grid;
  gap: 12px;
}

.info-item {
  padding: 12px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  line-height: 1.5;
}

.highlight {
  color: #e91e63;
  font-weight: bold;
}

.announcement {
  padding: 12px;
  background: #e3f2fd;
  border-radius: 8px;
  line-height: 1.6;
  color: #1565c0;
}

.message-board {
  margin-top: 10px;
}

.message-item {
  padding: 12px;
  background: white;
  border-radius: 8px;
  margin-bottom: 10px;
  line-height: 1.5;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
}

.message-item.system {
  background: #f1f8e9;
  color: #558b2f;
}

.message-author {
  font-weight: bold;
  color: #4a2a8f;
  margin-right: 6px;
}

.security-list {
  padding-left: 20px;
  color: #d32f2f;
}

.security-list li {
  margin-bottom: 6px;
}
</style>