<template>
  <PhoneFrame :current-time="currentTime">
    <div class="main-content">
      <!-- 聊天 tab -->
      <div id="chatTab" :class="['tab-content', { active: activeTab === 'chatTab' }]">
        <div id="contactList" :class="['sub-view', { active: currentView === 'contactList' }]">
          <div class="header">
            <button class="back-to-phone-btn" @click="goBackToPhone">←</button>
            <h2>聊天</h2>
          </div>
          <div class="contact-list">
            <div class="contact-item" @click="openChat('zhuzhuxia')">
              <div class="avatar">🐖</div>
              <div class="contact-info">
                <div class="name">猪猪侠</div>
                <div class="last-message">……</div>
              </div>
            </div>
            <div class="contact-item" @click="openChat('sunyou')">
              <div class="avatar">😈</div>
              <div class="contact-info">
                <div class="name">损友</div>
                <div class="last-message">好好好，你这么玩是吧。</div>
              </div>
            </div>
          </div>
        </div>

        <div id="chatView" :class="['sub-view', { active: currentView === 'chatView' }]">
          <div class="chat-header">
            <button class="back-btn" @click="goBackToContacts">←</button>
            <div class="contact-name">{{ currentChatName }}</div>
          </div>
          <div class="chat-container">
            <template v-for="(item, index) in currentChatMessages" :key="index">
              <TimeDivider v-if="item.type === 'time'" :time="item.content" />
              <ChatMessage 
                v-else 
                :type="item.type" 
                :content="item.content" 
              />
            </template>
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
          <div id="loggedInView" class="login-view active">
            <div class="username">diannaogaoshou</div>
            <button class="logout-btn" @click="logout">退出登录</button>
          </div>
        </div>
      </div>

      <!-- 说说 tab -->
      <div id="shuoshuoTab" :class="['tab-content', { active: activeTab === 'shuoshuoTab' }]">
        <div class="shuoshuo-list">
          <div class="shuoshuo-item">
            <div class="shuoshuo-header">
              <div class="avatar">💻</div>
              <div class="user-info">
                <div class="name">电脑高手</div>
                <div class="time">07/21 16:00</div>
              </div>
            </div>
            <div class="shuoshuo-content">
              有开黑的兄弟吗，5=1
            </div>
            <div class="shuoshuo-stats">
              <span>👍 <b>{{ Math.floor(Math.random() * 20) + 5 }}</b></span>
              <span>💬 <b>{{ Math.floor(Math.random() * 10) + 1 }}</b></span>
              <span>🔁 <b>{{ Math.floor(Math.random() * 5) }}</b></span>
            </div>
          </div>
          <div class="shuoshuo-item">
            <div class="shuoshuo-header">
              <div class="avatar">💻</div>
              <div class="user-info">
                <div class="name">电脑高手</div>
                <div class="time">08/21 20:00</div>
              </div>
            </div>
            <div class="shuoshuo-content">
              最近刷到了很多关于网络安全的帖子啊，都是点进一些软件或者网站就被犯罪分子锁定ip地址了。其实改ip地址很容易的，搜一下ip地址切换器直接0成本隐身啊！（这个网站我朋友开发的，帮他宣传一下啊）
            </div>
            <div class="shuoshuo-stats">
              <span>👍 <b>{{ Math.floor(Math.random() * 20) + 5 }}</b></span>
              <span>💬 <b>{{ Math.floor(Math.random() * 10) + 1 }}</b></span>
              <span>🔁 <b>{{ Math.floor(Math.random() * 5) }}</b></span>
            </div>
          </div>
          <div class="shuoshuo-item">
            <div class="shuoshuo-header">
              <div class="avatar">💻</div>
              <div class="user-info">
                <div class="name">电脑高手</div>
                <div class="time">08/31 21:00</div>
              </div>
            </div>
            <div class="shuoshuo-content">
              最近又发现一个好玩的，把ip地址改成帽子叔叔的，然后故意去病毒网站钓鱼。这是jj的ip，有需要的自取：202.108.15.68
            </div>
            <div class="shuoshuo-stats">
              <span>👍 <b>{{ Math.floor(Math.random() * 20) + 5 }}</b></span>
              <span>💬 <b>{{ Math.floor(Math.random() * 10) + 1 }}</b></span>
              <span>🔁 <b>{{ Math.floor(Math.random() * 5) }}</b></span>
            </div>
          </div>
          <div class="shuoshuo-item">
            <div class="shuoshuo-header">
              <div class="avatar">💻</div>
              <div class="user-info">
                <div class="name">电脑高手</div>
                <div class="time">09/03 19:30</div>
              </div>
            </div>
            <div class="shuoshuo-content">
              之前的说说瞎编的啊，你们别真试，一会儿给我抓了。
            </div>
            <div class="shuoshuo-stats">
              <span>👍 <b>{{ Math.floor(Math.random() * 20) + 5 }}</b></span>
              <span>💬 <b>{{ Math.floor(Math.random() * 10) + 1 }}</b></span>
              <span>🔁 <b>{{ Math.floor(Math.random() * 5) }}</b></span>
            </div>
          </div>
          <div class="shuoshuo-item">
            <div class="shuoshuo-header">
              <div class="avatar">💻</div>
              <div class="user-info">
                <div class="name">电脑高手</div>
                <div class="time">10/28 20:25</div>
              </div>
            </div>
            <div class="shuoshuo-content">
              可恶啊……
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

const contacts = {
  'zhuzhuxia': { name: '猪猪侠', avatar: '🐖' },
  'sunyou': { name: '损友', avatar: '😈' }
}

const chatLogs = {
  'zhuzhuxia': [
    { type: 'time', content: '9/11 20:00' },
    { type: 'received', content: '来？' },
    { type: 'sent', content: '来。' },
    { type: 'time', content: '9/21 21:00' },
    { type: 'received', content: '来？' },
    { type: 'sent', content: '来。' },
    { type: 'time', content: '10/01 20:30' },
    { type: 'sent', content: '来？' },
    { type: 'received', content: '来。' },
    { type: 'time', content: '10/25 20:00' },
    { type: 'received', content: '来？' },
    { type: 'sent', content: '来。' },
    { type: 'time', content: '11/01 18:00' },
    { type: 'sent', content: '在吗？' },
    { type: 'received', content: '？' },
    { type: 'sent', content: '我银行卡限额了，能不能帮忙转个帐。' },
    { type: 'received', content: '……举报了。' },
    { type: 'time', content: '11/03 20:00' },
    { type: 'sent', content: '兄弟对不住，前两天被盗号了。' },
    { type: 'received', content: '没事。' },
    { type: 'sent', content: '来一把？' },
    { type: 'received', content: '来。' },
    { type: 'time', content: '11/10 19:00' },
    { type: 'sent', content: '在吗？能不能帮我个忙？' },
    { type: 'sent', content: '我海外代购要另外的手机号验证。' },
    { type: 'received', content: '又被盗号了？' },
    { type: 'time', content: '11/12 21:00' },
    { type: 'sent', content: '真的很抱歉……' },
    { type: 'received', content: '你不行换个号吧，真的。' },
    { type: 'time', content: '11/30 19:30' },
    { type: 'sent', content: '在吗？帮个忙呗。' },
    { type: 'received', content: '我真服了。' },
    { type: 'time', content: '12/01 20:00' },
    { type: 'sent', content: '……' },
    { type: 'received', content: '……' }
  ],
  'sunyou': [
    { type: 'time', content: '10/28 20:00' },
    { type: 'received', content: '给你出道题，答不出有惩罚，来不来？' },
    { type: 'sent', content: '？你说' },
    { type: 'received', content: '什么东西绿绿的，从树上掉下来会砸死人？' },
    { type: 'sent', content: '这不简单，毛毛虫啊。' },
    { type: 'received', content: '错！是台球桌！' },
    { type: 'sent', content: '我&%~#' },
    { type: 'received', content: '愿赌服输，把你oo账号密码改成生日，这俩个月都是哥几个公共账号了。' },
    { type: 'sent', content: '好好好，你这么玩是吧。' }
  ]
}

export default {
  name: 'OtherChatView',
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
      currentContactId: null,
      currentChatName: '猪猪侠',
      currentChatMessages: [],
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
    openChat(contactId) {
      this.currentContactId = contactId
      this.currentChatName = contacts[contactId].name
      this.currentChatMessages = chatLogs[contactId] || []
      this.currentView = 'chatView'
      this.$nextTick(() => {
        const container = document.querySelector('.chat-container')
        if (container) {
          container.scrollTop = container.scrollHeight
        }
      })
    },
    goBackToContacts() {
      this.currentView = 'contactList'
    },
    goBackToPhone() {
      this.$router.push('/myphone')
    },
    logout() {
      if (confirm('退出【电脑高手】账号？')) {
        this.$router.push('/chat')
      }
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Microsoft YaHei", "Segoe UI", sans-serif;
}

.main-content {
  flex: 1;
  overflow: hidden;
  position: relative;
}

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

.bottom-nav {
  display: flex;
  background: rgba(255, 255, 255, 0.95);
  height: 50px;
  position: absolute;
  bottom: 0;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

.bottom-nav {
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  width: 100%;
  max-width: 300px;
}

.username {
  font-size: 1.3rem;
  font-weight: bold;
  color: white;
}

.logout-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

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
</style>

