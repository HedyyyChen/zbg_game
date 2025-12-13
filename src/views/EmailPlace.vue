<template>
  <PhoneFrame :current-time="currentTime">
    <div class="email-container">
      <div class="email-header">
        <button class="back-btn" @click="goBack">←</button>
        <h2>电子邮箱</h2>
      </div>
      <div class="email-tabs">
        <div 
          :class="['tab', { active: activeTab === 'inbox' }]" 
          @click="switchTab('inbox')"
        >
          收件箱
        </div>
        <div 
          :class="['tab', { active: activeTab === 'sent' }]" 
          @click="switchTab('sent')"
        >
          已发送
        </div>
      </div>
      <div class="email-list">
        <div 
          v-for="(email, index) in currentEmails" 
          :key="index"
          class="email-item"
          @click="openEmail(email)"
        >
          <div class="email-header-info">
            <div class="email-from">{{ email.from }}</div>
            <div class="email-time">{{ email.time }}</div>
          </div>
          <div class="email-subject">{{ email.subject }}</div>
          <div class="email-preview">{{ email.preview }}</div>
          <div v-if="email.hasAttachment" class="email-attachment">📎 附件</div>
        </div>
      </div>
      
      <!-- 邮件详情弹窗 -->
      <div v-if="selectedEmail" class="email-detail-overlay" @click.self="closeEmail">
        <div class="email-detail">
          <div class="email-detail-header">
            <h3>{{ selectedEmail.subject }}</h3>
            <button class="close-btn" @click="closeEmail">×</button>
          </div>
          <div class="email-detail-info">
            <div><strong>发件人：</strong>{{ selectedEmail.from }}</div>
            <div><strong>收件人：</strong>{{ selectedEmail.to }}</div>
            <div><strong>时间：</strong>{{ selectedEmail.time }}</div>
          </div>
          <div class="email-detail-content">
            {{ selectedEmail.content }}
          </div>
          <div v-if="selectedEmail.hasAttachment" class="email-detail-attachment">
            <div class="attachment-item" @click="openAttachment(selectedEmail.attachment)">
              📎 {{ selectedEmail.attachment }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </PhoneFrame>
</template>

<script>
import PhoneFrame from '../components/PhoneFrame.vue'

const inboxEmails = [
  {
    from: 'diannaogaoshou020321@oo.com',
    to: 'zhuzhuxia@oo.com',
    time: '2025年12月5日 20:00',
    subject: '监控已获取',
    preview: '兄弟，你要的监控帮你拿到了，确认一下对方信息...',
    content: '兄弟，你要的监控帮你拿到了，确认一下对方信息"oo名称：【爱睡觉的水饺】 真实姓名：林月 家庭住址：xx省xx市xx区xx街道xx号xx室"，下面是她小区的监控，打开后输入日期就能查看，能识别到她的记录都在里面了，其它没保存。',
    hasAttachment: true,
    attachment: '监控日志.zip'
  },
  {
    from: 'noreply@gamepowered.com',
    to: 'zhuzhuxia@oo.com',
    time: '2025年9月1日 18:00',
    subject: '感谢您的交易',
    preview: 'zhuzhuxia, 您好！感谢您近期在game上的交易。',
    content: 'zhuzhuxia, 您好！感谢您近期在game上的交易。',
    hasAttachment: false
  },
  {
    from: 'kuaidisent@sent.com',
    to: 'zhuzhuxia@oo.com',
    time: '2025年8月25日 9:00',
    subject: '商品已送达',
    preview: '您购买的【超炫酷电竞椅】已于指定时间寄到指定地址...',
    content: '您购买的【超炫酷电竞椅】已于指定时间寄到指定地址，请注意签收！定制的生日祝贺卡片随商品一同送达，内容预览：水饺，25岁生日快乐！',
    hasAttachment: false
  }
]

const sentEmails = [
  {
    from: 'zhuzhuxia@oo.com',
    to: 'diannaogaoshou020321@oo.com',
    time: '2025年12月5日 8:00',
    subject: '帮忙查监控',
    preview: '你oo总是被盗号，只能邮件找你了。帮我查个监控...',
    content: '你oo总是被盗号，只能邮件找你了。帮我查个监控，信息在附件，速度快一点，今天之内办好给你的送一台4090。',
    hasAttachment: true,
    attachment: '信息.docx'
  }
]

export default {
  name: 'EmailPlace',
  components: {
    PhoneFrame
  },
  data() {
    return {
      currentTime: '9:41',
      activeTab: 'inbox',
      selectedEmail: null,
      timeInterval: null
    }
  },
  computed: {
    currentEmails() {
      return this.activeTab === 'inbox' ? inboxEmails : sentEmails
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
    switchTab(tab) {
      this.activeTab = tab
      this.selectedEmail = null
    },
    openEmail(email) {
      this.selectedEmail = email
    },
    closeEmail() {
      this.selectedEmail = null
    },
    openAttachment(attachment) {
      if (attachment === '监控日志.zip') {
        this.$router.push('/jiankong')
      }
    },
    goBack() {
      this.$router.push('/myphone')
    }
  }
}
</script>

<style scoped>
.email-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  color: #333;
}

.email-header {
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

.email-header h2 {
  font-size: 1.2rem;
  font-weight: bold;
}

.email-tabs {
  display: flex;
  border-bottom: 2px solid #ddd;
}

.tab {
  flex: 1;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 3px solid transparent;
}

.tab.active {
  border-bottom-color: #4285f4;
  color: #4285f4;
  font-weight: bold;
}

.email-list {
  flex: 1;
  overflow-y: auto;
}

.email-item {
  padding: 15px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background 0.2s;
}

.email-item:hover {
  background: #f9f9f9;
}

.email-header-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.email-from {
  font-weight: bold;
  font-size: 0.95rem;
  color: #333;
}

.email-time {
  font-size: 0.85rem;
  color: #888;
}

.email-subject {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 5px;
  color: #333;
}

.email-preview {
  font-size: 0.9rem;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.email-attachment {
  margin-top: 8px;
  font-size: 0.85rem;
  color: #4285f4;
}

.email-detail-overlay {
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

.email-detail {
  background: white;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  border-radius: 10px;
  padding: 20px;
  overflow-y: auto;
  position: relative;
}

.email-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
}

.email-detail-header h3 {
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #999;
  line-height: 1;
}

.email-detail-info {
  margin-bottom: 20px;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.8;
}

.email-detail-content {
  margin-bottom: 20px;
  line-height: 1.6;
  color: #333;
  white-space: pre-wrap;
}

.email-detail-attachment {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.attachment-item {
  padding: 10px;
  background: #f0f0f0;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.2s;
  color: #4285f4;
}

.attachment-item:hover {
  background: #e0e0e0;
}
</style>

