<template>
  <PhoneFrame :current-time="currentTime">
    <div class="website-container">
      <div class="website-header">
        <button class="back-btn" @click="goBackToSearch">←</button>
        <h1>陈琳琳</h1>
      </div>
      <div class="website-content">
        <div class="profile-section">
          <div class="profile-header">
            <div class="avatar">🔮</div>
            <div class="profile-info">
              <h2>陈琳琳</h2>
              <p class="title">高级占卜师</p>
            </div>
          </div>
        </div>
        
        <div class="section">
          <h3>个人简介</h3>
          <p>陈琳琳是我们水晶球占卜馆的优秀占卜师，拥有丰富的占卜经验和深厚的专业知识。她能够帮助客户通过水晶球占卜获得准确的启示，并提供专业的解读和建议。</p>
        </div>
        
        <!-- 隐藏入职日期的“资讯”段落 -->
        <div class="section">
          <h3>近期动态</h3>
          <p>2025年5月6日，水晶球占卜馆发布特别感谢：三年前的今天，陈琳琳老师正式加入本馆，三年来已帮助数百位访客化解困境、提升运势。许多客户反馈：“她的解读不仅准，更带着一种让人安心的力量。”</p>
        </div>
        
        <div class="section">
          <h3>温馨提示</h3>
          <p>如需预约占卜服务，请线下到店咨询。</p>
        </div>
      </div>
    </div>
  </PhoneFrame>
</template>

<script>
import PhoneFrame from '../components/PhoneFrame.vue'

export default {
  name: 'ChenLinLin',
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
  background: linear-gradient(140deg, #f8f6ff 0%, #f0ecff 100%);
  color: #333;
  overflow-y: auto;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.website-header {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: rgba(80, 60, 130, 0.08);
  backdrop-filter: blur(6px);
  border-bottom: 1px solid rgba(100, 90, 140, 0.2);
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.back-btn {
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  color: #5a468c;
  margin-right: 16px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background: rgba(90, 70, 140, 0.15);
  transform: scale(1.05);
}

.website-header h1 {
  font-size: 1.35rem;
  font-weight: 700;
  color: #4a3a7c;
  letter-spacing: 0.5px;
}

.website-content {
  padding: 24px;
}

/* Profile Section */
.profile-section {
  margin-bottom: 32px;
  padding: 28px;
  background: linear-gradient(135deg, #5a468c 0%, #7a5bbd 100%);
  color: white;
  border-radius: 18px;
  box-shadow: 0 6px 20px rgba(90, 70, 140, 0.3);
  position: relative;
  overflow: hidden;
}

.profile-section::before {
  content: '';
  position: absolute;
  top: -50px;
  right: -50px;
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 24px;
  position: relative;
  z-index: 2;
}

.avatar {
  font-size: 4.2rem;
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3));
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.profile-info h2 {
  font-size: 2rem;
  margin-bottom: 6px;
  font-weight: 700;
  letter-spacing: 1px;
}

.title {
  font-size: 1.2rem;
  opacity: 0.92;
  font-weight: 500;
  color: #e2d9ff;
}

/* Section Blocks */
.section {
  margin-bottom: 32px;
  background: white;
  padding: 22px;
  border-radius: 16px;
  box-shadow: 0 4px 14px rgba(100, 90, 150, 0.12);
  transition: transform 0.2s;
}

.section:hover {
  transform: translateY(-2px);
}

.section h3 {
  font-size: 1.3rem;
  margin-bottom: 16px;
  color: #4a3a7c;
  font-weight: 700;
  position: relative;
  padding-bottom: 8px;
}

.section h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 36px;
  height: 3px;
  background: linear-gradient(to right, #7a5bbd, #a892e0);
  border-radius: 2px;
}

.section p {
  line-height: 1.8;
  color: #555;
  font-size: 1.02rem;
  margin: 0;
}

/* 高亮日期（自然但有重点） */
.section p {
  position: relative;
}

/* 可选：若想自动高亮“2025年5月6日”等日期，可用 JS，但这里保持原结构 */
/* 保留原 strong 样式（如有） */
.section p strong {
  color: #d43b80;
  font-weight: 600;
}

/* 响应式优化 */
@media (max-width: 480px) {
  .website-content {
    padding: 18px;
  }

  .profile-section {
    padding: 24px 20px;
  }

  .avatar {
    font-size: 3.6rem;
  }

  .profile-info h2 {
    font-size: 1.7rem;
  }

  .section {
    padding: 18px;
  }
}
</style>