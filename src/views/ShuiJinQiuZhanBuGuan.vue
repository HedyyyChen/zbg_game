<template>
  <PhoneFrame :current-time="currentTime">
    <div class="website-container">
      <div class="website-header">
        <button class="back-btn" @click="goBackToSearch">←</button>
        <h1>水晶球占卜馆</h1>
      </div>
      <div class="website-content">
        <div class="welcome-section">
          <h2>欢迎来到水晶球占卜馆！</h2>
          <p>在这里，你可以通过水晶球改变运势、斩获桃花、升职加薪。</p>
        </div>
        
        <div class="section">
          <h3>关于我们：</h3>
          <div class="info-item">
            <h4>1. 水晶球占卜是什么？</h4>
            <p>水晶球占卜是一种古老的占卜术，通过凝视水晶球等具有高反光或透明特性的物体，从中看到未来、揭示隐藏的信息，或获得灵性启示，最早可追溯至古代文明，如凯尔特德鲁伊、古罗马、古希腊和中世纪的欧洲。</p>
          </div>
          <div class="info-item">
            <h4>2. 如何选择水晶球的材质？</h4>
            <p>水晶球的材质多样，透明色、白色，黑色和紫色是最受欢迎的选择，其实任何材质都能很好地工作，建议选择能引起共鸣的颜色，当然你可以有若干个水晶球以应对不同的疑问。</p>
          </div>
          <div class="info-item">
            <h4>3. 占卜师</h4>
            <p>我们的优秀占卜师可以帮助你实施占卜流程，看到启示，并充分解读和给出建议，如需添加占卜师联系方式，请线下到店询问哦。</p>
          </div>
        </div>
        
        <div class="employee-login">
          <a @click="goToEmployeeLogin">员工登录</a>
        </div>
      </div>
    </div>
  </PhoneFrame>
</template>

<script>
import PhoneFrame from '../components/PhoneFrame.vue'

export default {
  name: 'ShuiJinQiuZhanBuGuan',
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
    },
    goToEmployeeLogin() {
      this.$router.push('/yuangonglogin')
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
  font-size: 1.3rem;
  font-weight: bold;
}

.website-content {
  padding: 20px;
}

.welcome-section {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 10px;
}

.welcome-section h2 {
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.section {
  margin-bottom: 30px;
}

.section h3 {
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: #333;
}

.info-item {
  margin-bottom: 25px;
  padding: 15px;
  background: #f9f9f9;
  border-radius: 8px;
}

.info-item h4 {
  font-size: 1.1rem;
  margin-bottom: 10px;
  color: #4285f4;
}

.info-item p {
  line-height: 1.6;
  color: #666;
}

.employee-login {
  text-align: center;
  margin-top: 40px;
  padding: 20px;
}

.employee-login a {
  color: #4285f4;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.95rem;
}
</style>

