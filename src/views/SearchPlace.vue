<template>
  <PhoneFrame :current-time="currentTime">
    <div class="search-container">
      <div class="search-header">
        <button class="back-btn" @click="goBack">←</button>
        <h1 class="search-title">搜索</h1>
      </div>
      <div class="search-box-container">
        <div class="search-logo">🔍</div>
        <input 
          v-model="searchQuery" 
          type="text" 
          class="search-input"
          placeholder="请输入搜索内容"
          @keyup.enter="performSearch"
          ref="searchInput"
        />
        <button class="search-btn" @click="performSearch">搜索</button>
      </div>
      <div v-if="searchError" class="error-message">{{ searchError }}</div>
    </div>
  </PhoneFrame>
</template>

<script>
import PhoneFrame from '../components/PhoneFrame.vue'

const searchRoutes = {
  '水晶球占卜馆': '/shuijinqiuzhanbuguan',
  '水晶球占卜的注意事项': '/shuijinqiuzhuyishixiang',
  '陈琳琳': '/chenlinlin',
  '水晶球新手的交流社区': '/shuijinqiunewguy',
  '树洞悄悄话': '/shudongchat',
  'ip地址切换器': '/iptransform',
  '线上水晶球占卜': '/onlinedivination'
}

export default {
  name: 'SearchPlace',
  components: {
    PhoneFrame
  },
  data() {
    return {
      currentTime: '9:41',
      searchQuery: '',
      searchError: '',
      timeInterval: null
    }
  },
  mounted() {
    this.updateTime()
    this.timeInterval = setInterval(this.updateTime, 60000)
    this.$nextTick(() => {
      if (this.$refs.searchInput) {
        this.$refs.searchInput.focus()
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
    performSearch() {
      const query = this.searchQuery.trim()
      if (!query) {
        this.searchError = '请输入搜索内容'
        return
      }

      // 包含关键词“猪圈”则跳转到密码对照页
      if (query.includes('猪圈')) {
        this.searchError = ''
        this.$router.push('/zhuquan')
        return
      }

      if (searchRoutes[query]) {
        this.searchError = ''
        this.$router.push(searchRoutes[query])
      } else {
        this.searchError = '未找到相关内容，请检查输入是否正确'
      }
    },
    goBack() {
      this.$router.push('/myphone')
    }
  }
}
</script>

<style scoped>
.search-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: white;
  color: #333;
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
}

.search-header {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}

.back-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  margin-right: 15px;
}

.search-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.search-box-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
}

.search-logo {
  font-size: 4rem;
  margin-bottom: 12px;
}

.search-input {
  width: 100%;
  max-width: 500px;
  padding: 15px 20px;
  border: 2px solid #ddd;
  border-radius: 30px;
  font-size: 1.1rem;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #4285f4;
}

.search-btn {
  padding: 12px 40px;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.search-btn:hover {
  background: #357ae8;
}

.error-message {
  margin-top: 20px;
  color: #ea4335;
  text-align: center;
  font-size: 0.95rem;
}
</style>

