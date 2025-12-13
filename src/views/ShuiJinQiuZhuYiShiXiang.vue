<template>
  <PhoneFrame :current-time="currentTime">
    <div class="website-container">
      <div class="website-header">
        <button class="back-btn" @click="goBackToSearch">←</button>
        <h1>水晶球占卜的注意事项</h1>
      </div>
      <div class="website-content">
        <div class="section">
          <h2>写给占卜师：</h2>
          <ol>
            <li>馆内需布置成安静、光线较暗的环境，并保持时刻穿着黑袍，避免影响占卜过程。</li>
            <li>占卜过程中，需要引导被占卜者通过深呼吸、冥想或放松身体来帮助自己进入平静、专注的状态，这样有利于和水晶球建立链接。</li>
            <li>每次占卜结束之后，需要确定被占卜者状态。</li>
            <li>解读启示时，注意时刻关注被占卜者情绪。</li>
            <li>官网已重置，账号为姓名全拼，密码为入职日期。</li>
          </ol>
        </div>
        
        <div class="section">
          <h2>写给顾客：</h2>
          <ol>
            <li>占卜过程中请信任你的占卜师，时刻保持放松、平静的状态。</li>
            <li>在提出问题时，要保持清晰、具体和开放的心态。例如，你可以问："我未来的事业发展会如何？"或者"我应该如何改善与某人的关系？"提出的问题应该是你真正关心并希望得到答案的。</li>
            <li>占卜结束后，添加占卜师的联系方式，如需购买水晶球，请线下当面说明。</li>
            <li>购买水晶球后，请保持水晶球处于安静、昏暗的环境，不要频繁挪动。</li>
            <li class="hidden-warning">小心它！！！</li>
          </ol>
        </div>
      </div>
    </div>
  </PhoneFrame>
</template>

<script>
import PhoneFrame from '../components/PhoneFrame.vue'

export default {
  name: 'ShuiJinQiuZhuYiShiXiang',
  components: {
    PhoneFrame
  },
  data() {
    return {
      currentTime: '9:41',
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
.website-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  color: #333;
  overflow-y: auto;
}

.website-header {
  display: flex;
  align-items: center;
  padding: 15px;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  margin-right: 15px;
}

.website-header h1 {
  font-size: 1.2rem;
  font-weight: bold;
}

.website-content {
  padding: 20px;
}

.section {
  margin-bottom: 30px;
}

.section h2 {
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: #333;
}

.section ol {
  padding-left: 25px;
}

.section li {
  margin-bottom: 15px;
  line-height: 1.6;
  color: #666;
}

.hidden-warning {
  color: white !important;
  user-select: none;
}

.hidden-warning:hover {
  color: #ea4335 !important;
}
</style>

