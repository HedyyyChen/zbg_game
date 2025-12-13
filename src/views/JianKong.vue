<template>
  <PhoneFrame :current-time="currentTime">
    <div class="jiankong-container">
      <div class="jiankong-header">
        <button class="back-btn" @click="goBack">←</button>
        <h2>监控日志</h2>
      </div>
      <div class="search-box">
        <input 
          v-model="searchDate" 
          type="text" 
          placeholder="输入类似20250101"
          @keyup.enter="searchRecord"
          ref="dateInput"
        />
        <button @click="searchRecord">搜索</button>
      </div>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div class="records-list">
        <div class="records-header">已搜索记录</div>
        <div v-if="searchedRecords.length === 0" class="empty-records">暂无记录</div>
        <div 
          v-for="(record, index) in searchedRecords" 
          :key="index"
          class="record-item"
        >
          <div class="record-date">{{ record.date }}</div>
          <div class="record-content">{{ record.content }}</div>
        </div>
      </div>
    </div>
  </PhoneFrame>
</template>

<script>
import PhoneFrame from '../components/PhoneFrame.vue'

const records = {
  '20251128': '林月下班回家，后面跟着一个黑色的人影，看不清脸。',
  '20251129': '林月下班回家，后面跟着一个黑色的人影，看不清脸。',
  '20251130': '林月下班回家，后面跟着一个黑色的人影，看不清脸，隐约能看到背后有ZBG013的字符。',
  '20251201': '林月下班回家，后面跟着一个黑色的人影，看不清脸。',
  '20251202': '林月早晨出门上班，后面跟着一个黑色的人影，看不清脸。'
}

export default {
  name: 'JianKong',
  components: {
    PhoneFrame
  },
  data() {
    return {
      currentTime: '9:41',
      searchDate: '',
      searchedRecords: [],
      errorMessage: '',
      timeInterval: null
    }
  },
  mounted() {
    this.updateTime()
    this.timeInterval = setInterval(this.updateTime, 60000)
    this.$nextTick(() => {
      if (this.$refs.dateInput) {
        this.$refs.dateInput.focus()
      }
    })
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
    searchRecord() {
      const date = this.searchDate.trim()
      if (!date) {
        this.errorMessage = '请输入日期'
        return
      }
      
      if (records[date]) {
        // 检查是否已经搜索过
        if (!this.searchedRecords.find(r => r.date === date)) {
          this.searchedRecords.push({
            date: date,
            content: records[date]
          })
          // 按日期排序
          this.searchedRecords.sort((a, b) => a.date.localeCompare(b.date))
        }
        this.errorMessage = ''
        this.searchDate = ''
      } else {
        this.errorMessage = '无相关记录'
      }
    },
    goBack() {
      this.$router.push('/emailplace')
    }
  }
}
</script>

<style scoped>
.jiankong-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  color: #333;
  padding: 20px;
}

.jiankong-header {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.back-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  margin-right: 15px;
}

.jiankong-header h2 {
  font-size: 1.3rem;
  font-weight: bold;
}

.search-box {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-box input {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
}

.search-box input:focus {
  border-color: #4285f4;
}

.search-box button {
  padding: 12px 24px;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
}

.error-message {
  color: #ea4335;
  margin-bottom: 20px;
  font-size: 0.95rem;
}

.records-list {
  flex: 1;
  overflow-y: auto;
}

.records-header {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #ddd;
}

.empty-records {
  text-align: center;
  color: #999;
  padding: 40px 0;
}

.record-item {
  padding: 15px;
  margin-bottom: 15px;
  background: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid #4285f4;
}

.record-date {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 8px;
  color: #333;
}

.record-content {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #666;
}
</style>

