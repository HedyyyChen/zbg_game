<template>
  <PhoneFrame :current-time="currentTime">
    <div class="shudong-container">
      <div v-if="!isLoggedIn" class="login-section">
        <div class="login-header">
          <button class="back-btn" @click="goBackToSearch">←</button>
          <h2>树洞悄悄话</h2>
        </div>
        <div class="login-form">
          <h3>登录</h3>
          <div class="input-group">
            <input 
              v-model="username" 
              type="text" 
              placeholder="用户名"
              @keyup.enter="tryLogin"
            />
          </div>
          <div class="input-group">
            <input 
              v-model="password" 
              type="password" 
              placeholder="密码"
              @keyup.enter="tryLogin"
            />
          </div>
          <button class="login-btn" @click="tryLogin">登录</button>
          <div v-if="passwordHint" class="password-hint">{{ passwordHint }}</div>
        </div>
        <div class="official-notice">
          <div class="notice-header" @click="toggleNotice">
            <span>官方通知</span>
            <span>{{ noticeExpanded ? '▼' : '▶' }}</span>
          </div>
          <div v-if="noticeExpanded" class="notice-content">
            <p>尊敬的树洞用户：</p>
            <p>关于手机用户能通过不断尝试试出正确密码的bug，官方正在紧急修复中，近期请先使用电脑版。本网站为小成本制作，实属不易，烦请见谅！</p>
          </div>
        </div>
      </div>
      
      <div v-else class="chat-section">
        <div class="chat-header">
          <button class="back-btn" @click="goBackToSearch">←</button>
          <h2>树洞悄悄话</h2>
          <button class="logout-btn-header" @click="logout">退出</button>
        </div>
        <div class="notes-container">
          <div 
            v-for="(note, index) in notes" 
            :key="index"
            :class="['note', `note-${note.color}`]"
          >
            <div class="note-content">
              <div v-for="(line, lineIndex) in note.lines" :key="lineIndex" class="note-line">
                <span v-if="line.type === 'link'" class="link-text" @click="handleLink(line.url)">{{ line.text }}</span>
                <span v-else>{{ line.text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PhoneFrame>
</template>

<script>
import PhoneFrame from '../components/PhoneFrame.vue'

const CORRECT_USERNAME = 'qiuqiu123'
const CORRECT_PASSWORD = '6840'

export default {
  name: 'ShuDongChat',
  components: {
    PhoneFrame
  },
  data() {
    return {
      currentTime: '9:41',
      isLoggedIn: false,
      username: '',
      password: '',
      passwordHint: '',
      noticeExpanded: false,
      timeInterval: null,
      notes: [
        {
          color: 'yellow',
          lines: [
            { text: '匿名：我好像遇到了它……怎么办……' },
            { text: '我：别慌，线下找我们，地址是：xxx' }
          ]
        },
        {
          color: 'blue',
          lines: [
            { text: '匿名：我感觉有人跟踪，但占卜师说是正常现象……' },
            { text: '我："它"会感应到诉说它的人，就算那些占卜师知道也不会说的，他们也没办法解决。' },
            { text: '匿名："它"到底是什么？' },
            { text: '我：不能说，一旦说出"它"的名字，就算是心中默念，也会马上被找到的！' },
            { text: '匿名：那我要怎么办？' },
            { text: '我：先不要慌，先跟我说说你是什么时候感觉到的。' },
            { text: '匿名：大概5天前吧。' },
            { text: '我：还不算晚，线下来找我们，我们会帮你，地址是：xxx' }
          ]
        },
        {
          color: 'pink',
          lines: [
            { text: '匿名：不要点我', type: 'link', url: '/ultimate' }
          ]
        }
      ]
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
    tryLogin() {
      if (this.username !== CORRECT_USERNAME) {
        this.passwordHint = '用户名错误'
        return
      }
      
      const password = this.password
      if (password === CORRECT_PASSWORD) {
        this.isLoggedIn = true
        this.passwordHint = ''
      } else {
        this.checkPassword(password)
      }
    },
    checkPassword(password) {
      if (password.length === 0) {
        this.passwordHint = '请输入密码'
        return
      }

      const correct = CORRECT_PASSWORD // '6840'
      const inputLen = password.length
      const correctLen = correct.length

      // 第一步：始终提示当前位数
      let hint = `当前${inputLen}位数`
      
      // 如果位数不对，直接返回（不进行匹配）
      if (inputLen !== correctLen) {
        if (inputLen < correctLen) {
          hint += '（位数不足）'
        } else {
          hint += '（位数过多）'
        }
        this.passwordHint = hint
        return
      }

      // 位数正确，才进行数字和位置判断
      let positionCount = 0 // 位置和数字都正确
      let correctCount = 0  // 数字存在但位置错误

      // 1. 统计位置正确的
      for (let i = 0; i < correctLen; i++) {
        if (password[i] === correct[i]) {
          positionCount++
        }
      }

      // 2. 统计数字存在但位置错误的（避免重复计数）
      const correctDigits = correct.split('')
      const passwordDigits = password.split('')
      const used = new Array(correctLen).fill(false)

      for (let i = 0; i < correctLen; i++) {
        if (passwordDigits[i] === correctDigits[i]) {
          // 位置正确的已经匹配，跳过
          continue
        }
        // 查找该数字是否在其他位置存在
        for (let j = 0; j < correctLen; j++) {
          if (!used[j] && passwordDigits[i] === correctDigits[j]) {
            correctCount++
            used[j] = true
            break
          }
        }
      }

      // 3. 生成最终提示
      const parts = []
      if (positionCount > 0) {
        parts.push(`${positionCount}个数字位置正确`)
      }
      if (correctCount > 0) {
        parts.push(`${correctCount}个数字正确但位置不对`)
      }
      if (positionCount === 0 && correctCount === 0) {
        parts.push('所有数字均不正确')
      }

      this.passwordHint = hint + '，' + parts.join('，')
    },
    toggleNotice() {
      this.noticeExpanded = !this.noticeExpanded
    },
    logout() {
      this.isLoggedIn = false
      this.username = ''
      this.password = ''
      this.passwordHint = ''
    },
    handleLink(url) {
      this.$router.push(url)
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
.shudong-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  color: #333;
  overflow-y: auto;
}

.login-header,
.chat-header {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
  gap: 10px;
}

.back-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  margin-right: 15px;
}

.logout-btn-header {
  background: rgba(220, 53, 69, 0.1);
  border: 1px solid #dc3545;
  color: #dc3545;
  font-size: 0.85rem;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  margin-left: auto;
  transition: background 0.2s;
}

.logout-btn-header:hover {
  background: rgba(220, 53, 69, 0.2);
}

.login-header h2,
.chat-header h2 {
  font-size: 1.2rem;
  font-weight: bold;
  flex: 1;
  text-align: center;
}

.login-form {
  padding: 30px 20px;
}

.login-form h3 {
  margin-bottom: 20px;
  font-size: 1.3rem;
  text-align: center;
}

.input-group {
  margin-bottom: 15px;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;
}

.input-group input:focus {
  outline: none;
  border-color: #4285f4;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
}

.password-hint {
  margin-top: 15px;
  padding: 10px;
  background: #fff3cd;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #856404;
  text-align: center;
}

.official-notice {
  margin: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.notice-header {
  padding: 12px;
  background: #f0f0f0;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-weight: bold;
}

.notice-content {
  padding: 15px;
  line-height: 1.6;
  color: #666;
}

.chat-section {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.notes-container {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.note {
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.note-yellow {
  background: #fff9c4;
  border-left: 4px solid #fbc02d;
}

.note-blue {
  background: #e3f2fd;
  border-left: 4px solid #2196f3;
}

.note-pink {
  background: #fce4ec;
  border-left: 4px solid #e91e63;
}

.note-content {
  line-height: 1.8;
}

.note-line {
  margin-bottom: 8px;
}

.link-text {
  color: #4285f4;
  text-decoration: underline;
  cursor: pointer;
}
</style>

