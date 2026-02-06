<template>
  <div class="container">
    <h1>欢迎来到🔮 神秘占卜屋！</h1>
    <div class="story">
      <p>2025年12月6日，你认识多年的网友<strong>「爱睡觉的水饺」</strong>，最近忽然失联了。</p>
      <p>即使再忙，她也从来不会三天不回消息。</p>
      <p>你十分担心，决定展开调查。</p>
    </div>

    <div class="tips">
      <p><strong>温馨提示：</strong></p>
      <ul>
        <li>本游戏不设置进度条，有多个结局，抵达结局即视为通关。</li>
        <li>微微微恐，没有跳脸或者恐怖音效，放心游玩。</li>
        <li>算是一个短篇的脑洞小故事，祝你玩得开心~</li>
      </ul>
    </div>

    <p class="prompt">准备好了吗？点击下方进入游戏……</p>
    <button id="enterPhone" @click="enterPhone">📱 进入我的手机界面</button>
  </div>
</template>

<script>
import { globalState } from '../utils/globalState'

export default {
  name: 'HomeView',
  mounted() {
    // 游戏初始化时重置下载状态
    globalState.divinationAppDownloaded = false
    localStorage.removeItem('divinationAppDownloaded')
  },
  methods: {
    enterPhone() {
      this.$router.push('/myphone') // 注意：根据你路由实际路径调整，建议用 /phone
    }
  }
}
</script>

<style scoped>
.container {
  /* ✅ 改用 margin: auto 或 flex（由父级控制居中） */
  max-width: 600px;
  width: 90%;
  margin: 4rem auto; /* 上下留空，左右居中 */
  text-align: center;
  padding: 2.8rem 2rem;
  background: rgba(15, 10, 30, 0.75);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5),
              inset 0 0 0 1px rgba(100, 80, 180, 0.3);
  border: 1px solid rgba(100, 80, 200, 0.2);
  animation: fadeIn 0.8s ease-out;
}

/* 动画保持不变 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

h1 {
  font-size: 2.6rem;
  margin-bottom: 1.6rem;
  font-weight: 700;
  color: #f0e6ff;
  text-shadow: 0 0 12px rgba(221, 180, 255, 0.6),
               0 2px 6px rgba(0, 0, 0, 0.4);
  letter-spacing: 1.2px;
  line-height: 1.2;
}

.story p {
  margin-bottom: 1rem;
  font-size: 1.05rem;
  color: #e0d6f0;
  line-height: 1.6;
}

.story strong {
  color: #ffcc66;
  font-weight: 600;
}

.tips {
  background: rgba(25, 20, 45, 0.6);
  padding: 1.3rem;
  border-radius: 14px;
  margin: 1.8rem 0;
  font-size: 0.95rem;
  color: #d0c5e8;
  border: 1px solid rgba(80, 60, 140, 0.3);
}

.tips ul {
  list-style: none;
  text-align: left;
  padding-left: 1.4rem;
  margin-top: 0.6rem;
}

.tips li {
  margin: 0.6rem 0;
  position: relative;
}

.tips li:before {
  content: "•";
  color: #ffcc66;
  font-weight: bold;
  position: absolute;
  left: -1.2rem;
  font-size: 1.2rem;
  line-height: 1;
}

.prompt {
  margin: 1.5rem 0 1.2rem;
  font-size: 1.1rem;
  color: #c5b9e0;
  opacity: 0.95;
}

#enterPhone {
  padding: 14px 40px;
  font-size: 1.2rem;
  font-weight: 600;
  background: linear-gradient(135deg, #8a6dff, #5a4ae3);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 6px 20px rgba(90, 74, 227, 0.4);
  letter-spacing: 0.8px;
  backdrop-filter: blur(4px);
}

#enterPhone:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 28px rgba(138, 109, 255, 0.6);
  background: linear-gradient(135deg, #9a7dff, #6a5af3);
}

#enterPhone:active {
  transform: translateY(0);
}

/* 响应式 */
@media (max-width: 600px) {
  .container {
    padding: 2rem 1.2rem;
  }
  h1 {
    font-size: 2.1rem;
  }
  .story p, .tips, .prompt {
    font-size: 1rem;
  }
  #enterPhone {
    padding: 12px 32px;
    font-size: 1.1rem;
  }
}
</style>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: 'Noto Sans SC', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: white;
  line-height: 1.6;
  background: linear-gradient(135deg, #2c1e5d, #4b2a7c, #6a3a9c);
  min-height: 100vh;
  /* 允许滚动（当内容多时） */
  overflow-y: auto;
  overflow-x: hidden;
}

#app {
  width: 100%;
}
</style>