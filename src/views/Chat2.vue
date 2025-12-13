<template>
  <PhoneFrame :current-time="currentTime">
      <!-- 主内容区 -->
      <div class="main-content">
        <!-- 聊天 tab -->
        <div id="chatTab" :class="['tab-content', { active: activeTab === 'chatTab' }]">
          <div id="contactList" :class="['sub-view', { active: currentView === 'contactList' }]">
            <div class="header">
              <h2>聊天</h2>
            </div>
            <div class="contact-list">
              <!-- 联系人1：猪猪侠 -->
              <div class="contact-item" @click="openChat('zhuzhuxia')">
                <div class="avatar">🐖</div>
                <div class="contact-info">
                  <div class="name">猪猪侠</div>
                  <div class="last-message">不会是出事了吧……</div>
                </div>
              </div>
              <!-- 联系人2：朋友 -->
              <div class="contact-item" @click="openChat('friend')">
                <div class="avatar">👤</div>
                <div class="contact-info">
                  <div class="name">朋友</div>
                  <div class="last-message">算了……不用了。</div>
                </div>
              </div>
              <!-- 联系人3：占卜师琳琳 -->
              <div class="contact-item" @click="openChat('linlin')">
                <div class="avatar">🔮</div>
                <div class="contact-info">
                  <div class="name">占卜师琳琳</div>
                  <div class="last-message">最近有什么问题吗？</div>
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
                  :is-image="item.isImage"
                  :alt="item.alt"
                />
              </template>
            </div>
            <div class="input-area">
              <textarea placeholder="输入消息..."></textarea>
              <button class="send-btn">发送</button>
            </div>
          </div>
        </div>

        <!-- 登录 tab（保留但简化） -->
        <div id="loginTab" :class="['tab-content', { active: activeTab === 'loginTab' }]">
          <div class="login-container">
            <div id="loggedInView" class="login-view active">
              <div class="username">aishuijiaodeshuijiao</div>
              <button class="logout-btn" @click="logout">退出登录</button>
            </div>
          </div>
        </div>

        <!-- 说说 tab（空） -->
        <div id="shuoshuoTab" :class="['tab-content', { active: activeTab === 'shuoshuoTab' }]">
          <div class="shuoshuo-list">
            <!-- 保持空 -->
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

const contacts = {
  'zhuzhuxia': { name: '猪猪侠', avatar: '🐖' },
  'friend': { name: '朋友', avatar: '👤' },
  'linlin': { name: '占卜师琳琳', avatar: '🔮' }
}

const getChatLogs = (mimatuImageUrl) => ({
  'zhuzhuxia': `
    <div class="time-divider">11/15 13:24</div>
    <div class="message sent">
      <div class="bubble">我搬新家啦！这边挺安静的，可以专心创作！</div>
    </div>
    <div class="message received">
      <div class="bubble">不错啊，但也要注意自身安全哦。</div>
    </div>
    <div class="message sent">
      <div class="bubble">嗯嗯！</div>
    </div>
    <div class="message received">
      <div class="bubble">来一把？</div>
    </div>
    <div class="message sent">
      <div class="bubble">来！</div>
    </div>

    <div class="time-divider">11/17 21:00</div>
    <div class="message sent">
      <div class="bubble">对了，你不是对密码学感兴趣吗，我这有一个密码，你猜猜看？</div>
    </div>
    <div class="message sent">
      <img src="${mimatuImageUrl}" class="bubble" alt="密码图片">
    </div>
    <div class="message received">
      <div class="bubble">好丑……怎么都2025年了还有老艺术家坚持手搓……</div>
    </div>
    <div class="message sent">
      <div class="bubble">你别管，算了，给你个提示——你的家，哈哈！</div>
    </div>
    <div class="message received">
      <div class="bubble">……好吧，虽然有被冒犯到，但我应该知道了。</div>
    </div>
    <div class="message sent">
      <div class="bubble">嘻嘻。</div>
    </div>
    <div class="message received">
      <div class="bubble">这还挺有意思的，我把答案设成电子邮箱的密码了。</div>
    </div>

    <div class="time-divider">11/25 18:21</div>
    <div class="message sent">
      <div class="bubble">最近感觉好倒霉……</div>
    </div>
    <div class="message received">
      <div class="bubble">游戏治愈一切！上号!</div>
    </div>
    <div class="message sent">
      <div class="bubble">哼，你个游戏脑袋，跟你也说不明白。</div>
    </div>

    <div class="time-divider">11/28 20:00</div>
    <div class="message received">
      <div class="bubble">最近怎么样？我看你都没上号。</div>
    </div>
    <div class="message sent">
      <div class="bubble">有点不太好……算了，可能是我太敏感了……就是身体有点不舒服而已。</div>
    </div>
    <div class="message received">
      <div class="bubble">给你寄了点暖身茶，记得签收啊。</div>
    </div>
    <div class="message sent">
      <div class="bubble">……谢谢。</div>
    </div>

    <div class="time-divider">11/30 19:45</div>
    <div class="message received">
      <div class="bubble">身体怎么样了？</div>
    </div>

    <div class="time-divider">12/1 20:01</div>
    <div class="message received">
      <div class="bubble">你还好吗？</div>
    </div>
    <div class="message received">
      <div class="bubble">怎么不回消息？</div>
    </div>

    <div class="time-divider">昨天 08:00</div>
    <div class="message received">
      <div class="bubble">不会是出事了吧……</div>
    </div>
  `,
  'friend': `
    <div class="time-divider">08/25 07:00</div>
    <div class="message received">
      <div class="bubble">生日快乐！</div>
    </div>
    <div class="message sent">
      <div class="bubble">谢谢！</div>
    </div>

    <div class="time-divider">11/19 20:00</div>
    <div class="message sent">
      <div class="bubble">最近好倒霉啊，唉，有没有转运的办法？</div>
    </div>
    <div class="message received">
      <div class="bubble">我知道一家占卜馆，听说很灵验，你可以去那里问问，叫"水晶球占卜馆"。</div>
    </div>
    <div class="message sent">
      <div class="bubble">我去试试。</div>
    </div>

    <div class="time-divider">11/21 21:00</div>
    <div class="message sent">
      <div class="bubble">哇！那家占卜馆真的很厉害，帮我算出了最近的运势，还有解决办法，站着做运气果然变好了！</div>
    </div>
    <div class="message received">
      <div class="bubble">我也是听一个老同学说的，没想到真的有用，能帮到你就好。</div>
    </div>
    <div class="message sent">
      <div class="bubble">我打算买一个水晶球回去试试！他们说自己占卜效果更好。</div>
    </div>

    <div class="time-divider">11/30 22:00</div>
    <div class="message sent">
      <div class="bubble">不对劲……我最近总感觉有人在跟踪我。</div>
    </div>
    <div class="message received">
      <div class="bubble">啊？不会是变态吧？要不要报警？</div>
    </div>
    <div class="message sent">
      <div class="bubble">可能是我太敏感了……占卜师说这是正常现象……而且这边治安一向很好的。</div>
    </div>
    <div class="message received">
      <div class="bubble">这……你自己一个人住，还是要注意安全，有什么事记得给我发消息。</div>
    </div>
    <div class="message sent">
      <div class="bubble">嗯。</div>
    </div>

    <div class="time-divider">12/02 08:00</div>
    <div class="message sent">
      <div class="bubble">你有你老同学的联系方式吗，能不能帮我约他出来见一面？</div>
    </div>
    <div class="message received">
      <div class="bubble">说起来，他也好长时间没回消息了，可能在忙吧，等他回消息了我通知你。</div>
    </div>
    <div class="message sent">
      <div class="bubble">算了……不用了。</div>
    </div>
  `,
  'linlin': `
    <div class="time-divider">11/20 21:00</div>
    <div class="message sent">
      <div class="bubble">老师，今天您说的注意事项我给忘了，能再发一下吗？</div>
    </div>
    <div class="message received">
      <div class="bubble">注意事项之前是放在官网的，后来后台弄错了导致现在在官网看不见，你在浏览器搜索"水晶球占卜的注意事项"就行啦，看写给新手的那一份。</div>
    </div>
    <div class="message sent">
      <div class="bubble">好的好的，已经找到了。</div>
    </div>

    <div class="time-divider">11/24 14:00</div>
    <div class="message sent">
      <div class="bubble">今天我自己占卜了一次，但对于看到的画面不是很理解。</div>
    </div>
    <div class="message received">
      <div class="bubble">通话时长35:27</div>
    </div>

    <div class="time-divider">11/30 20:00</div>
    <div class="message sent">
      <div class="bubble">陈老师，我总感觉最近有人跟着我……</div>
    </div>
    <div class="message received">
      <div class="bubble">占卜太多次，你的精神就会被消耗太多，变得敏感是正常的，过几天就好了。</div>
    </div>
    <div class="message received">
      <div class="bubble">你很有天赋，多加练习，水晶球能帮到你更多。</div>
    </div>
    <div class="message sent">
      <div class="bubble">我知道了。</div>
    </div>

    <div class="time-divider">12/02 21:00</div>
    <div class="message received">
      <div class="bubble">最近有什么问题吗？</div>
    </div>
  `
})

export default {
  name: 'Chat2View',
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
      timeInterval: null,
      mimatuImage
    }
  },
  computed: {
    chatLogs() {
      return getChatLogs(this.mimatuImage)
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
    parseChatLog(htmlString) {
      const messages = []
      const parser = new DOMParser()
      const doc = parser.parseFromString(htmlString, 'text/html')
      const elements = doc.body.children

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i]
        if (el.classList.contains('time-divider')) {
          messages.push({
            type: 'time',
            content: el.textContent.trim()
          })
        } else if (el.classList.contains('message')) {
          const messageType = el.classList.contains('sent') ? 'sent' : 'received'
          const bubble = el.querySelector('.bubble')
          if (bubble) {
            const img = bubble.querySelector('img')
            if (img) {
              messages.push({
                type: messageType,
                content: img.src,
                isImage: true,
                alt: img.alt || ''
              })
            } else {
              messages.push({
                type: messageType,
                content: bubble.textContent.trim()
              })
            }
          }
        }
      }
      return messages
    },
    openChat(contactId) {
      this.currentContactId = contactId
      this.currentChatName = contacts[contactId].name
      const htmlLog = this.chatLogs[contactId] || ''
      this.currentChatMessages = this.parseChatLog(htmlLog)
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
    logout() {
      if (confirm('退出【爱睡觉的水饺】账号？')) {
        this.$router.push('/chat')
      }
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

/* ====== 说说页样式 ====== */
.shuoshuo-list {
  padding: 15px;
  height: 100%;
  overflow-y: auto;
}

/* 时间分隔线样式已移至 TimeDivider 组件 */
/* page-wrapper 样式已移至 PhoneFrame 组件 */
</style>

