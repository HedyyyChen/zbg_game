<template>
  <PhoneFrame :current-time="currentTime">
    <div class="hidepage-container">
      <div class="hidepage-header">
        <button class="back-btn" @click="goBack">←</button>
        <h2>⚠️ 内部文件 - 机密</h2>
      </div>
      <div class="hidepage-content">
        <div class="system-info">
          <div class="info-item"><strong>最后更新：</strong>2025-12-04 18:22</div>
          <div class="info-item"><strong>操作员：</strong>系统管理员</div>
        </div>

        <div class="personnel-list">
          <h3>🎯 潜在目标名单（共 {{ personnel.length }} 人）</h3>
          <table class="personnel-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>姓名</th>
                <th>住址</th>
                <th>独居</th>
                <th>状态</th>
                <th>备注</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="person in personnel" :key="person.id" :class="{ target: person.name === '林月' }">
                <td>{{ person.id }}</td>
                <td>{{ person.name }}</td>
                <td>{{ person.address }}</td>
                <td>{{ person.alone ? '是' : '否' }}</td>
                <td :class="`status-${person.status.toLowerCase().replace(' ', '-')}`">
                  {{ person.status }}
                </td>
                <td>{{ person.note }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="search-section">
          <p class="search-instruction">🔒 输入工号查看目标详细进度（仅限授权人员）</p>
          <div class="search-box">
            <input 
              v-model="workNumber" 
              type="text" 
              placeholder=""
              @keyup.enter="checkProgress"
            />
            <button @click="checkProgress">确认</button>
          </div>
          <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </div>

        <div class="footer-note">
          <p>系统提示：未完成交易的目标请勿泄露，否则后果自负。</p>
        </div>
      </div>
    </div>
  </PhoneFrame>
</template>

<script>
import PhoneFrame from '../components/PhoneFrame.vue'

const CORRECT_WORK_NUMBER = 'ZBG013'

export default {
  name: 'HidePage',
  components: { PhoneFrame },
  data() {
    return {
      currentTime: '9:41',
      workNumber: '',
      errorMessage: '',
      timeInterval: null,
      personnel: [
        { id: 'T001', name: '王二', address: 'xx省xx市xx区xx路12号', alone: true, status: '已交易', note: '无' },
        { id: 'T002', name: '小明', address: 'xx省xx市xx区xx街道88号', alone: true, status: '已交易', note: '水晶球已回收' },
        { id: 'T003', name: '李四', address: 'xx省xx市xx区xx小区3栋502', alone: false, status: '观察中', note: '合租，暂缓' },
        { id: 'T004', name: '张伟', address: 'xx省xx市xx区xx巷7号', alone: true, status: '已交易', note: '无' },
        { id: 'T005', name: '赵敏', address: 'xx省xx市xx区xx花园12栋101', alone: true, status: '观察中', note: '频繁外出' },
        { id: 'T006', name: '刘芳', address: 'xx省xx市xx区xx新村5栋301', alone: true, status: '已交易', note: '水晶球损坏' },
        { id: 'T007', name: '陈晨', address: 'xx省xx市xx区xx公寓B座707', alone: true, status: '已交易', note: '水晶球已回收' },
        { id: 'T008', name: '林月', address: 'xx省xx市xx区xx街道xx号xx室', alone: true, status: '正在跟踪', note: '高敏感目标' },
        { id: 'T009', name: '周涛', address: 'xx省xx市xx区xx里15号', alone: true, status: '观察中', note: '近期搬家' },
        { id: 'T010', name: '吴静', address: 'xx省xx市xx区xx苑6栋202', alone: false, status: '取消', note: '有家人同住' }
      ]
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
    checkProgress() {
      if (this.workNumber.trim() === CORRECT_WORK_NUMBER) {
        this.$router.push('/mubiaojindu')
      } else {
        this.errorMessage = '工号错误或无权限'
        setTimeout(() => {
          this.errorMessage = ''
        }, 2000)
      }
    },
    goBack() {
      this.$router.push('/ultimate')
    }
  }
}
</script>

<style scoped>
.hidepage-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #0f0f1a;
  color: #e0e0e0;
  overflow-y: auto;
  font-family: 'Courier New', monospace;
}

.hidepage-header {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #1a1a2e;
  border-bottom: 1px solid #333;
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #ff6666;
  margin-right: 15px;
}

.hidepage-header h2 {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff6666;
}

.system-info {
  padding: 15px;
  background: #16213e;
  margin: 10px 20px;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #aaa;
}

.info-item {
  margin: 4px 0;
}

.personnel-list {
  margin: 20px;
}

.personnel-list h3 {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: #ffcc66;
}

.personnel-table {
  width: 100%;
  border-collapse: collapse;
  background: #16213e;
  border-radius: 8px;
  overflow: hidden;
}

.personnel-table thead {
  background: #0f3460;
  color: #ffcc66;
}

.personnel-table th,
.personnel-table td {
  padding: 10px 8px;
  text-align: left;
  border-bottom: 1px solid #2a2a4a;
  font-size: 0.95rem;
}

.personnel-table tbody tr.target {
  background: rgba(100, 0, 0, 0.3);
  border-left: 3px solid #ff4444;
}

.status-已交易 { color: #4caf50; }
.status-正在跟踪 { color: #ff9800; font-weight: bold; }
.status-观察中 { color: #2196f3; }
.status-取消 { color: #9e9e9e; }

.search-section {
  margin: 30px 20px;
  text-align: center;
}

.search-instruction {
  color: #aaa;
  margin-bottom: 12px;
  font-size: 0.95rem;
}

.search-box {
  display: flex;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
}

.search-box input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #444;
  border-radius: 6px;
  background: #0f0f1a;
  color: white;
  font-size: 1rem;
}

.search-box input:focus {
  outline: none;
  border-color: #ff6666;
}

.search-box button {
  padding: 10px 20px;
  background: #ff6666;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.search-box button:hover {
  background: #ff4444;
}

.error-message {
  color: #ff6666;
  font-size: 0.95rem;
  margin-top: 10px;
}

.footer-note {
  padding: 20px;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
}
</style>