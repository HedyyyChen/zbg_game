<template>
  <div class="ending-container">
    <div class="ending-content">
      <h1 class="ending-title" :class="{ visible: showTitle }">结局三——"它"</h1>
      <div class="text-wrapper">
        <p class="ending-text" :class="{ visible: showText1 }">
          你拨打帽子叔叔的电话想要举报，意外得知占卜馆的犯罪分子已经在不久前落网。原来是他们察觉到一个陌生ip在登录员工账号，便开始定位，没想到直接被帽子叔叔反向抓住，根本来不及撤离就被连根拔起。
        </p>
        <p class="ending-text" :class="{ visible: showText2 }">
          犯罪分子以"占卜转运"为诱饵，通过虚假宣传吸引目标，借"占卜咨询"套取个人信息；  
          再推销内置定位器的"特制水晶球"，并远程操控其显示诡异画面，使受害者精神崩溃；  
          占卜师则在线下跟踪，伺机诱骗见面……
        </p>
        <p class="ending-text" :class="{ visible: showText3 }">
          奇怪的是，从占卜馆中搜到的人员交易名单显示，林月并没有被他们抓住，陈琳琳在口供中表示，自己只在林月下班回家的路上跟踪，但这几天她不见了。
        </p>
        <p class="ending-text highlight" :class="{ visible: showText4 }">
          那么，监控显示的，林月早上出门时跟在后面的黑影，到底是……
        </p>
      </div>
      <button class="restart-btn" :class="{ visible: showButton }" @click="restart">重新开始游戏</button>
    </div>
  </div>
</template>

<script>
import globalState from '../utils/globalState'

export default {
  name: 'TruthEnd',
  data() {
    return {
      showTitle: false,
      showText1: false,
      showText2: false,
      showText3: false,
      showText4: false,
      showButton: false
    }
  },
  mounted() {
    setTimeout(() => { this.showTitle = true }, 500)
    setTimeout(() => { this.showText1 = true }, 1500)
    setTimeout(() => { this.showText2 = true }, 4000)
    setTimeout(() => { this.showText3 = true }, 6500)
    setTimeout(() => { this.showText4 = true }, 9000)
    setTimeout(() => { this.showButton = true }, 11000)
  },
  methods: {
    restart() {
      globalState.reset()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.ending-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  padding: 20px;
  position: relative;
}

.ending-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 50%, rgba(155, 89, 182, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(155, 89, 182, 0.1) 0%, transparent 50%);
  animation: pulse-bg 4s ease-in-out infinite;
  pointer-events: none;
}

@keyframes pulse-bg {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.ending-content {
  max-width: 750px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 1;
  padding: 0 20px;
}

.ending-title {
  font-size: 2.6rem;
  font-weight: bold;
  margin-bottom: 50px;
  color: #9b59b6;
  opacity: 0;
  transform: translateY(-30px);
  transition: all 1s ease-out;
  text-shadow: 0 0 20px rgba(155, 89, 182, 0.5);
  line-height: 1.2;
  letter-spacing: 1px;
}

.ending-title.visible {
  opacity: 1;
  transform: translateY(0);
}

.text-wrapper {
  margin-bottom: 40px;
  text-align: left;
}

.ending-text {
  font-size: 1.1rem;
  line-height: 1.95;
  margin-bottom: 28px;
  color: #ecf0f1;
  opacity: 0;
  transform: translateY(20px);
  transition: all 1.2s ease-out;
  text-align: justify;
  text-justify: inter-ideograph;
  letter-spacing: 0.3px;
  word-spacing: 2px;
}

.ending-text.visible {
  opacity: 1;
  transform: translateY(0);
}

.ending-text.highlight {
  color: #d4a5f7;
  font-size: 1.2rem;
  font-weight: 600;
  text-shadow: 0 0 15px rgba(155, 89, 182, 0.6);
  animation: glow 2s ease-in-out infinite;
  margin-top: 15px;
  text-align: center;
  font-style: italic;
}

@keyframes glow {
  0%, 100% { 
    text-shadow: 0 0 15px rgba(155, 89, 182, 0.6);
  }
  50% { 
    text-shadow: 0 0 25px rgba(155, 89, 182, 0.9);
  }
}

.restart-btn {
  padding: 15px 40px;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 40px;
  opacity: 0;
  transform: translateY(20px);
}

.restart-btn.visible {
  opacity: 1;
  transform: translateY(0);
}

.restart-btn:hover {
  background: #357ae8;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(66, 133, 244, 0.4);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .ending-title {
    font-size: 2.2rem;
    margin-bottom: 35px;
  }
  
  .ending-text {
    font-size: 1rem;
    line-height: 1.85;
    margin-bottom: 22px;
  }
  
  .ending-text.highlight {
    font-size: 1.1rem;
  }
}
</style>
