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
      
      <!-- 解压进度覆盖层 -->
      <div v-if="extracting" class="extract-overlay">
        <div class="extract-box">
          <div class="extract-title">正在解压文件...</div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: extractProgress + '%' }"></div>
          </div>
          <div class="extract-status">{{ extractSuccess ? '解压成功' : (extractProgress + '%') }}</div>
        </div>
      </div>

      <!-- 模拟 DOCX 查看器 -->
      <div v-if="showDoc" class="doc-overlay" @click.self="closeDocx">
        <div class="doc-box">
          <div class="doc-header">
            <div class="doc-title">{{ docData.title }}</div>
            <button class="doc-close" @click="closeDocx">×</button>
          </div>
          <div class="doc-content">
            <template v-for="(sec, si) in docData.sections" :key="si">
              <div class="doc-section">
                <div class="doc-heading">{{ sec.heading }}</div>
                <div class="doc-items">
                  <div v-for="(it, ii) in sec.items" :key="ii" class="doc-item">
                    <span class="doc-label" v-if="it.label">{{ it.label }}：</span>
                    <span class="doc-value">{{ it.value }}</span>
                  </div>
                </div>
              </div>
            </template>
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
      timeInterval: null,
      // 解压相关状态
      extracting: false,
      extractProgress: 0,
      extractTimer: null,
      extractFinishTimer: null,
      extractSuccess: false
      ,
      // docx 查看器状态
      showDoc: false,
      docData: null
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
      this.timeInterval = null
    }
    if (this.extractTimer) {
      clearInterval(this.extractTimer)
      this.extractTimer = null
    }
    if (this.extractFinishTimer) {
      clearTimeout(this.extractFinishTimer)
      this.extractFinishTimer = null
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
        this.startExtraction()
        return
      }
      if (attachment === '信息.docx') {
        this.openDocx(attachment)
        return
      }
    },
    openDocx(name) {
      // 模拟打开 docx 文件：显示覆盖层并填充模拟文档数据
      this.showDoc = true
      // 填充静态的林月信息（可根据需要替换）
      this.docData = {
        title: name,
        sections: [
          {
            heading: '个人信息',
            items: [
              { label: 'OO 名称', value: '爱睡觉的水饺' },
              { label: '真实姓名', value: '林月' },
              { label: '性别', value: '女' }
            ]
          },
          {
            heading: '联系方式',
            items: [
              { label: '电话', value: '192xxxxxxxx' },
              { label: '邮箱', value: 'linyue@example.com' }
            ]
          },
          {
            heading: '家庭住址',
            items: [
              { label: '', value: 'xx省xx市xx区xx街道xx号xx室' }
            ]
          },
          {
            heading: '备注',
            items: [
              { label: '', value: '需要小区监控，帮我筛选近期有关林月的内容' }
            ]
          }
        ]
      }
    },
    closeDocx() {
      this.showDoc = false
      this.docData = null
    },
    startExtraction() {
      // 防止重复触发
      if (this.extracting) return
      this.extracting = true
      this.extractSuccess = false
      this.extractProgress = 0

      // 模拟进度：100% 在 900ms ~ 1600ms 之间完成
      const targetMs = 900 + Math.random() * 700
      const stepMs = 50
      const steps = Math.max(6, Math.round(targetMs / stepMs))
      let step = 0

      this.extractTimer = setInterval(() => {
        step++
        // 线性 + 少量随机扰动
        const base = (step / steps) * 100
        const jitter = (Math.random() - 0.5) * 6
        this.extractProgress = Math.min(100, Math.round(base + jitter))
        if (step >= steps) {
          clearInterval(this.extractTimer)
          this.extractTimer = null
          this.extractProgress = 100
          this.extractSuccess = true
          // 让用户看到 "解压成功" 的状态，再短暂延迟跳转
          this.extractFinishTimer = setTimeout(() => {
            this.extractFinishTimer = null
            this.extracting = false
            this.extractSuccess = false
            this.extractProgress = 0
            this.$router.push('/jiankong')
          }, 800)
        }
      }, stepMs)
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
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
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

/* 解压覆盖层样式 */
.extract-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.45);
  z-index: 1100;
}
.extract-box {
  width: 80%;
  max-width: 420px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}
.extract-title {
  font-weight: bold;
  margin-bottom: 12px;
}
.progress-bar {
  width: 100%;
  height: 14px;
  background: #eee;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
}
.progress-fill {
  height: 100%;
  background: linear-gradient(90deg,#4caf50,#8bc34a);
  width: 0%;
  transition: width 120ms linear;
}
.extract-status {
  color: #666;
  font-size: 0.95rem;
}

/* DOCX 模拟查看器样式 */
.doc-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.45);
  z-index: 1200;
}
.doc-box {
  width: 86%;
  max-width: 720px;
  max-height: 86vh;
  background: #fff;
  border-radius: 6px;
  overflow: auto;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}
.doc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  border-bottom: 1px solid #eee;
}
.doc-title { font-weight: bold; }
.doc-close {
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
}
.doc-content { padding: 18px; color: #333; }
.doc-section { margin-bottom: 16px; }
.doc-heading { font-weight: 700; margin-bottom: 8px; color: #222; }
.doc-item { margin-bottom: 6px; }
.doc-label { color: #555; font-weight: 600; margin-right: 6px; }
.doc-value { color: #111; }
</style>

