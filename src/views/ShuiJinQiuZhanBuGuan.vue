<template>
  <PhoneFrame :current-time="currentTime">
    <div class="website-container">
      <div class="website-header">
        <button class="back-btn" @click="goBackToSearch">←</button>
        <h1 class="header-title">🔮 水晶球占卜馆</h1>
      </div>
      <div class="website-content">
        <div class="welcome-section">
          <div class="welcome-text-group">
            <h2>揭示命运的秘密</h2>
            <p>在这里，你可以通过水晶球<strong>改变运势</strong>、<strong>斩获桃花</strong>、<strong>升职加薪</strong>。</p>
          </div>
        </div>
        
        <div class="section about-us-section">
          <h3>💫 开启你的未来之旅</h3>
          
          <div class="info-item">
            <div class="icon-title">
              <span class="info-icon">✨</span>
              <h4>1. 水晶球占卜是什么？</h4>
            </div>
            <p>水晶球占卜是一种古老的占卜术，通过凝视具有高反光或透明特性的物体，从中看到未来、揭示隐藏的信息，或获得灵性启示。最早可追溯至古代文明，如凯尔特德鲁伊、古罗马、古希腊和中世纪的欧洲。</p>
          </div>
          
          <div class="info-item">
            <div class="icon-title">
              <span class="info-icon">💎</span>
              <h4>2. 如何选择水晶球的材质？</h4>
            </div>
            <p>水晶球的材质多样，透明色、白色、黑色和紫色是最受欢迎的选择。其实任何材质都能很好地工作，建议选择能引起**个人共鸣**的颜色，当然你可以有若干个水晶球以应对不同的疑问。</p>
          </div>
          
          <div class="info-item">
            <div class="icon-title">
              <span class="info-icon">🧙‍♀️</span>
              <h4>3. 占卜师</h4>
            </div>
            <p>我们的优秀占卜师可以帮助你实施占卜流程，看到启示，并充分解读和给出建议。如需添加占卜师联系方式，请线下到店询问哦。</p>
          </div>
        </div>
        
        <div class="employee-login">
          <button class="login-btn" @click="goToEmployeeLogin">员工通道 | 登录</button>
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
/* 容器和基础字体 */
.website-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #1c1c3f; /* 深蓝色背景，营造神秘感 */
  color: #e0e0f8; /* 浅色文本 */
  overflow-y: auto;
  font-family: 'Georgia', serif; /* 优雅的字体 */
  min-height: 100%; /* 避免使用 100vh，配合 PhoneFrame 内部高度 */
}

/* 头部 */
.website-header {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  background: #2a2a5f; /* 比背景稍深的颜色 */
  border-bottom: 2px solid #5a5a8a;
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #fff; /* 白色 */
  margin-right: 15px;
  transition: color 0.2s;
}

.back-btn:hover {
  color: #ffd700; /* 悬停变金色 */
}

.header-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  letter-spacing: 1px;
}

.website-content {
  padding: 20px;
}

/* 欢迎区强化 */
.welcome-section {
  text-align: center;
  margin-bottom: 40px;
  padding: 30px 20px;
  /* 神秘的渐变背景 */
  background: linear-gradient(145deg, #4b0082 0%, #301934 100%); 
  color: white;
  border-radius: 12px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4);
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.welcome-text-group h2 {
  font-size: 2rem;
  margin-bottom: 15px;
  color: #ffd700; /* 金色标题 */
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

.welcome-text-group p {
  font-size: 1rem;
  line-height: 1.8;
  color: #dcdcdc;
}

.welcome-text-group p strong {
    color: #ffcc00; /* 强调词用亮色 */
}

/* 信息区 */
.section {
  margin-bottom: 40px;
}

.section h3 {
  font-size: 1.6rem;
  margin-bottom: 25px;
  color: #9370db; /* 淡紫色 */
  text-align: center;
}

.info-item {
  margin-bottom: 20px;
  padding: 20px;
  background: #3a3a70; /* 略浅的卡片背景 */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  border-left: 5px solid #ffd700; /* 金色侧边条 */
}

.icon-title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.info-icon {
    font-size: 1.5rem;
    margin-right: 10px;
}

.info-item h4 {
  font-size: 1.2rem;
  color: #ffffff;
  margin: 0;
}

.info-item p {
  line-height: 1.7;
  color: #cccccc;
  padding-left: 30px; /* 配合图标缩进 */
}

/* 员工登录区 */
.employee-login {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 20px;
}

.login-btn {
  background: #ffd700; /* 金色按钮 */
  color: #1c1c3f; /* 深色文本 */
  border: none;
  padding: 12px 30px;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 0 4px 10px rgba(255, 215, 0, 0.5);
  transition: transform 0.2s, box-shadow 0.2s;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(255, 215, 0, 0.7);
}
</style>

