<template>
  <div class="ending-container">
    <div class="ending-content">
      <h1 class="ending-title" :class="{ visible: showTitle }">结局一——找到你了</h1>
      <div class="text-wrapper">
        <p class="ending-text code-text" :class="{ visible: showText1 }">
          &%塔斯维尔*$
        </p>
        <p class="ending-text glitch" :class="{ visible: showText2 }">
          随着这串乱码般的文字闯入视线，难以名状的恐惧抓住了你。
        </p>
        <p class="ending-text" :class="{ visible: showText3 }">
          一个低沉恐怖的声音在脑中炸开，你的眼前骤然一黑，便永远失去了意识……
        </p>
      </div>
      <p class="ending-hint" :class="{ visible: showHint }">提示：总共有三个OO账号</p>
      <button class="restart-btn" :class="{ visible: showButton }" @click="restart">重新开始游戏</button>
    </div>
    <div class="flicker-overlay"></div>
  </div>
</template>

<script>
import globalState from '../utils/globalState'

export default {
  name: 'FindYou',
  data() {
    return {
      showTitle: false,
      showText1: false,
      showText2: false,
      showText3: false,
      showHint: false,
      showButton: false
    }
  },
  mounted() {
    // 文字逐渐浮现
    setTimeout(() => { this.showTitle = true }, 500)
    setTimeout(() => { this.showText1 = true }, 2000)
    setTimeout(() => { this.showText2 = true }, 4000)
    setTimeout(() => { this.showText3 = true }, 6500)
    setTimeout(() => { this.showHint = true }, 9000)
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
  background: #000000;
  color: white;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

/* 恐怖闪烁效果 */
.flicker-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 0, 0, 0.05);
  animation: flicker 0.15s infinite;
  pointer-events: none;
  z-index: 1;
}

@keyframes flicker {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}

.ending-content {
  max-width: 700px;
  width: 100%;
  text-align: center;
  position: relative;
  z-index: 2;
  padding: 0 20px;
}

.ending-title {
  font-size: 2.8rem;
  font-weight: bold;
  color: #ff0000;
  margin-bottom: 50px;
  text-shadow: 
    0 0 10px #ff0000,
    0 0 20px #ff0000,
    0 0 30px #ff0000,
    0 0 40px #ff0000;
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s ease-out;
  animation: heartbeat 1.5s ease-in-out infinite;
  letter-spacing: 3px;
  line-height: 1.2;
}

.ending-title.visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.text-wrapper {
  margin-bottom: 40px;
  text-align: left;
}

.ending-text {
  font-size: 1.2rem;
  line-height: 1.9;
  margin-bottom: 30px;
  color: #ffcccc;
  opacity: 0;
  transform: translateY(20px);
  transition: all 1.2s ease-out;
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
  text-indent: 2em;
  letter-spacing: 0.5px;
}

.ending-text.code-text {
  text-indent: 0;
  text-align: center;
  font-family: 'Courier New', monospace;
  font-size: 1.4rem;
  letter-spacing: 3px;
  color: #ff6666;
}

.ending-text.visible {
  opacity: 1;
  transform: translateY(0);
}

.ending-text.glitch {
  position: relative;
  animation: glitch 0.3s infinite;
}

@keyframes glitch {
  0%, 100% { 
    text-shadow: 
      2px 0 #ff0000,
      -2px 0 #00ffff;
  }
  25% { 
    text-shadow: 
      -2px 0 #ff0000,
      2px 0 #00ffff;
  }
  50% { 
    text-shadow: 
      2px 0 #ff0000,
      -2px 0 #00ffff;
  }
  75% { 
    text-shadow: 
      -2px 0 #ff0000,
      2px 0 #00ffff;
  }
}

.ending-hint {
  font-size: 0.9rem;
  color: #888;
  margin: 50px 0 40px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s ease-out;
  text-align: center;
  font-style: italic;
}

.ending-hint.visible {
  opacity: 1;
  transform: translateY(0);
}

.restart-btn {
  padding: 15px 40px;
  background: rgba(66, 133, 244, 0.3);
  color: white;
  border: 2px solid #4285f4;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  opacity: 0;
  transform: translateY(20px);
}

.restart-btn.visible {
  opacity: 1;
  transform: translateY(0);
}

.restart-btn:hover {
  background: rgba(66, 133, 244, 0.5);
  box-shadow: 0 0 20px rgba(66, 133, 244, 0.5);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .ending-title {
    font-size: 2.2rem;
    margin-bottom: 35px;
  }
  
  .ending-text {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 25px;
  }
  
  .ending-text.code-text {
    font-size: 1.2rem;
  }
  
  .ending-hint {
    font-size: 0.85rem;
  }
}
</style>
