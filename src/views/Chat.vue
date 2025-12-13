<template>
  <PhoneFrame :current-time="currentTime">
      <!-- 主内容区 -->
      <div class="main-content">
        <!-- 聊天 tab -->
        <div id="chatTab" :class="['tab-content', { active: activeTab === 'chatTab' }]">
          <div id="contactList" :class="['sub-view', { active: currentView === 'contactList' }]">
            <div class="header">
              <button class="back-to-phone-btn" @click="goBackToPhone">←</button>
              <h2>聊天</h2>
            </div>
            <div class="contact-list">
              <div class="contact-item" @click="openChat('爱睡觉的水饺')">
                <div class="avatar">🥟</div>
                <div class="contact-info">
                  <div class="name">爱睡觉的水饺</div>
                  <div class="last-message">不会是出事了吧……</div>
                </div>
              </div>
            </div>
          </div>

          <div id="chatView" :class="['sub-view', { active: currentView === 'chatView' }]">
            <div class="chat-header">
              <button class="back-btn" @click="goBackToContacts">←</button>
              <div class="contact-name">爱睡觉的水饺</div>
            </div>
            <div class="chat-container">
              <TimeDivider time="11/15 13:24" />
              <ChatMessage type="received" content="我搬新家啦！这边挺安静的，可以专心创作！" />
              <ChatMessage type="sent" content="不错啊，但也要注意自身安全哦。" />
              <ChatMessage type="received" content="嗯嗯！" />
              <ChatMessage type="sent" content="来一把？" />
              <ChatMessage type="received" content="来！" />

              <TimeDivider time="11/17 21:00" />
              <ChatMessage type="received" content="对了，你不是对密码学感兴趣吗，我这有一个密码，你猜猜看？" />
              <ChatMessage type="received" :content="mimatuImage" :is-image="true" alt="密码图片" />
              <ChatMessage type="sent" content="好丑……怎么都2025年了还有老艺术家坚持手搓……" />
              <ChatMessage type="received" content="你别管，算了，给你个提示——你的家，哈哈！" />
              <ChatMessage type="sent" content="……好吧，虽然有被冒犯到，但我应该知道了。" />
              <ChatMessage type="received" content="嘻嘻。" />
              <ChatMessage type="sent" content="这还挺有意思的，我把答案设成电子邮箱的密码了。" />

              <TimeDivider time="11/19 18:21" />
              <ChatMessage type="received" content="最近感觉好倒霉……" />
              <ChatMessage type="sent" content="游戏治愈一切！上号!" />
              <ChatMessage type="received" content="哼，你个游戏脑袋，跟你也说不明白。" />

              <TimeDivider time="11/29 20:00" />
              <ChatMessage type="sent" content="最近怎么样？我看你都没上号。" />
              <ChatMessage type="received" content="有点不太好……算了，可能是我太敏感了……就是身体有点不舒服而已。" />
              <ChatMessage type="sent" content="给你寄了点暖身茶，记得签收啊。" />
              <ChatMessage type="received" content="……谢谢。" />

              <TimeDivider time="12/02 19:45" />
              <ChatMessage type="sent" content="身体怎么样了？" />

              <TimeDivider time="12/03 20:01" />
              <ChatMessage type="sent" content="你还好吗？" />
              <ChatMessage type="sent" content="怎么不回消息？" />

              <TimeDivider time="昨天 08:00" />
              <ChatMessage type="sent" content="不会是出事了吧……" />
            </div>
            <div class="input-area">
              <textarea placeholder="输入消息..."></textarea>
              <button class="send-btn">发送</button>
            </div>
          </div>
        </div>

        <!-- 登录 tab -->
        <div id="loginTab" :class="['tab-content', { active: activeTab === 'loginTab' }]">
          <div class="login-container">
            <!-- 已登录状态 -->
            <div id="loggedInView" :class="['login-view', { active: loginView === 'loggedIn' }]">
              <div class="username">zhuzhuxia</div>
              <button class="logout-btn" @click="showLoginForm">退出登录</button>
            </div>

            <!-- 登录表单 -->
            <div id="loginFormView" :class="['login-view', { active: loginView === 'loginForm' }]">
              <h2>OO登录</h2>
              <div class="input-group">
                <input type="text" v-model="username" placeholder="用户名" />
              </div>
              <div class="input-group">
                <input type="password" v-model="password" placeholder="密码" />
              </div>
              <button class="login-btn" @click="login">登录</button>
              <button class="back-to-logged" @click="showLoggedInView">← 返回</button>
            </div>
          </div>
        </div>

        <!-- 说说 tab -->
        <div id="shuoshuoTab" :class="['tab-content', { active: activeTab === 'shuoshuoTab' }]">
          <div class="shuoshuo-list">
            <div class="shuoshuo-item">
              <div class="shuoshuo-header">
                <div class="avatar">🐖</div>
                <div class="user-info">
                  <div class="name">猪猪侠</div>
                  <div class="time">11/15 22:30</div>
                </div>
              </div>
              <div class="shuoshuo-content">
                今天打野很给力！
              </div>
              <div class="shuoshuo-stats">
                <span>👍 <b>{{ Math.floor(Math.random() * 20) + 5 }}</b></span>
                <span>💬 <b>{{ Math.floor(Math.random() * 10) + 1 }}</b></span>
                <span>🔁 <b>{{ Math.floor(Math.random() * 5) }}</b></span>
              </div>
            </div>
            <div class="shuoshuo-item">
              <div class="shuoshuo-header">
                <div class="avatar">🐖</div>
                <div class="user-info">
                  <div class="name">猪猪侠</div>
                  <div class="time">10/11 12:20</div>
                </div>
              </div>
              <div class="shuoshuo-content">
                外卖员又送错了……明明周围也没几户人家……
              </div>
              <div class="shuoshuo-stats">
                <span>👍 <b>{{ Math.floor(Math.random() * 20) + 5 }}</b></span>
                <span>💬 <b>{{ Math.floor(Math.random() * 10) + 1 }}</b></span>
                <span>🔁 <b>{{ Math.floor(Math.random() * 5) }}</b></span>
              </div>
            </div>
            <div class="shuoshuo-item">
              <div class="shuoshuo-header">
                <div class="avatar">🐖</div>
                <div class="user-info">
                  <div class="name">猪猪侠</div>
                  <div class="time">09/11 15:40</div>
                </div>
              </div>
              <div class="shuoshuo-content">
                五排有无，缺3
              </div>
              <div class="shuoshuo-stats">
                <span>👍 <b>{{ Math.floor(Math.random() * 20) + 5 }}</b></span>
                <span>💬 <b>{{ Math.floor(Math.random() * 10) + 1 }}</b></span>
                <span>🔁 <b>{{ Math.floor(Math.random() * 5) }}</b></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部导航栏 -->
      <div class="bottom-nav">
        <div :class="['nav-item', { active: activeTab === 'loginTab' }]" @click="switchTab('loginTab')">登录</div>
        <div :class="['nav-item', { active: activeTab === 'shuoshuoTab' }]" @click="switchTab('shuoshuoTab')">说说</div>
        <div :class="['nav-item', { active: activeTab === 'chatTab' }]" @click="switchTab('chatTab')">聊天</div>
      </div>
  </PhoneFrame>
</template>

<script>
import PhoneFrame from '../components/PhoneFrame.vue'
import ChatMessage from '../components/ChatMessage.vue'
import TimeDivider from '../components/TimeDivider.vue'
import mimatuImage from '../assets/mimatu.jpg'

const CORRECT_PASSWORD = "20000825"
const CORRECT_USERNAME = "aishuijiaodeshuijiao"

export default {
  name: 'ChatView',
  components: {
    PhoneFrame,
    ChatMessage,
    TimeDivider
  },
  data() {
    return {
      currentTime: '9:41',
      activeTab: 'chatTab',
      currentView: 'contactList',
      loginView: 'loggedIn',
      username: '',
      password: '',
      mimatuImage,
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
    switchTab(tabId) {
      this.activeTab = tabId
      if (tabId === 'chatTab') {
        this.currentView = 'contactList'
      }
    },
    openChat() {
      this.currentView = 'chatView'
    },
    goBackToContacts() {
      this.currentView = 'contactList'
    },
    goBackToPhone() {
      this.$router.push('/myphone')
    },
    showLoginForm() {
      this.loginView = 'loginForm'
      this.username = ''
      this.password = ''
    },
    showLoggedInView() {
      this.loginView = 'loggedIn'
    },
    login() {
      const user = this.username.trim()
      const pass = this.password

      // 允许直接切换回猪猪侠（无密码）
      if (user === 'zhuzhuxia' || user === '猪猪侠' || user === '') {
        this.showLoggedInView()
        return
      }

      // 验证水饺账号
      if (user === CORRECT_USERNAME) {
        if (!pass) {
          alert('请输入密码')
          return
        }
        if (pass === CORRECT_PASSWORD) {
          alert('登录成功！')
          this.$router.push('/chat2')
        } else {
          alert('密码错误')
        }
        return
      }

      // 验证电脑高手账号
      if (user === 'diannaogaoshou') {
        if (!pass) {
          alert('请输入密码')
          return
        }
        if (pass === '20020321') {
          alert('登录成功！')
          this.$router.push('/otherchat')
        } else {
          alert('密码错误')
        }
        return
      }

      alert('无此用户')
    }
  }
}
</script>

<style scoped>
/* 全局重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Microsoft YaHei", "Segoe UI", sans-serif;
}

/* 手机容器样式已移至 PhoneFrame 组件 */

.main-content {
  flex: 1;
  overflow: hidden;
  position: relative;
}

/* Tab 和子视图 */
.tab-content,
.sub-view {
  display: none;
  height: 100%;
  flex-direction: column;
}

.tab-content.active,
.sub-view.active {
  display: flex;
}

/* ====== 联系人列表 ====== */
.header {
  height: 50px;
  background: rgba(18, 150, 219, 0.9);
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  position: relative;
}

.back-to-phone-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 0.9rem;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 10px;
  transition: background 0.2s;
}

.back-to-phone-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.header h2 {
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
}

.contact-list {
  flex: 1;
  background: white;
  color: #333;
}

.contact-item {
  display: flex;
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background 0.2s;
}

.contact-item:hover {
  background: #f9f9f9;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: 15px;
  flex-shrink: 0;
}

.contact-info .name {
  font-weight: bold;
  font-size: 1rem;
  color: #333;
  margin-bottom: 4px;
}

.contact-info .last-message {
  font-size: 0.9rem;
  color: #888;
}

/* ====== 聊天界面 ====== */
.chat-header {
  height: 50px;
  background: rgba(18, 150, 219, 0.9);
  color: white;
  display: flex;
  align-items: center;
  padding: 0 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.back-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  width: 30px;
  text-align: center;
}

.contact-name {
  font-weight: bold;
  font-size: 1rem;
  margin-left: 10px;
}

.chat-container {
  flex: 1;
  padding: 15px;
  padding-bottom: 140px; /* 给绝对定位的输入区留更充足空间，防止消息被遮挡 */
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 消息样式已移至 ChatMessage 组件 */

.input-area {
  background: white;
  padding: 10px;
  display: flex;
  gap: 8px;
  border-top: 1px solid #ddd;
  position: absolute; /* 固定在视图底部上方 */
  left: 0;
  right: 0;
  bottom: 50px; /* 紧贴底部导航（高度 50px） */
  z-index: 60; /* 提升输入框层级，显示在导航栏上方 */
}

.input-area textarea {
  flex: 1;
  height: 40px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  resize: none;
  font-size: 0.95rem;
}

.input-area .send-btn {
  width: 60px;
  background: #1296db;
  color: white;
  border: none;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
}

/* ====== 底部导航栏 ====== */
.bottom-nav {
  display: flex;
  background: rgba(255, 255, 255, 0.95);
  height: 50px;
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
  z-index: 50; /* 保持低于输入框 */
}

.nav-item {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  color: #999;
  cursor: pointer;
  transition: color 0.2s;
}

.nav-item.active {
  color: #1296db;
  font-weight: bold;
}

/* ====== 登录页样式 ====== */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 30px;
  color: white;
}

.login-view {
  display: none;
  width: 100%;
  max-width: 300px;
}

.login-view.active {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.username {
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
}

.logout-btn,
.login-btn,
.back-to-logged {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}

.logout-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.login-btn {
  background: #1296db;
  color: white;
}

.back-to-logged {
  background: none;
  color: white;
  margin-top: 10px;
  text-decoration: underline;
}

.input-group {
  width: 100%;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
}

.input-group input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

/* ====== 说说页样式 ====== */
.shuoshuo-list {
  padding: 15px;
  height: 100%;
  overflow-y: auto;
}

.shuoshuo-item {
  background: white;
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 15px;
  color: #333;
}

.shuoshuo-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.shuoshuo-header .avatar {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-right: 10px;
}

.user-info .name {
  font-weight: bold;
  font-size: 1rem;
}

.user-info .time {
  font-size: 0.85rem;
  color: #888;
}

.shuoshuo-content {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 12px;
  word-break: break-word;
}

.shuoshuo-stats {
  display: flex;
  gap: 20px;
  font-size: 0.9rem;
  color: #666;
  border-top: 1px solid #eee;
  padding-top: 10px;
}

/* 时间分隔线样式已移至 TimeDivider 组件 */
/* page-wrapper 样式已移至 PhoneFrame 组件 */
</style>

