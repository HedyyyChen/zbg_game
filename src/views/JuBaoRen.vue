<template>
  <div class="ending-container">
    <div class="ending-content">
      <h1 class="ending-title" :class="{ visible: showTitle }">结局二——举报人</h1>
      <div class="text-wrapper">
        <p class="ending-text" :class="{ visible: showText1 }">
          你拨打帽子叔叔的电话，举报了占卜馆可怕的行径。原来他们的水晶球占卜都是骗人的，水晶球可以远程遥控显示出各种图案，他们伪装成占卜馆，刷选符合条件的独居人士，卖给他们装了定位器的水晶球，偷偷跟踪并恐吓受害者，诱骗受害者线下见面，然后绑架贩卖……
        </p>
        <p class="ending-text" :class="{ visible: showText2 }">
          经调查，该团伙以"水晶球占卜"为幌子，专门筛选独居、情绪低落的受害者。  
          他们先通过线下宣传诱导目标进行转运占卜，在聊天中套取住址、家庭情况；  
          再以"提升占卜效果"为由，推销内置定位器和远程投影模块的"特制水晶球"；  
          水晶球可被后台遥控，随机显示诡异图案、闪烁异常光线，使受害者产生幻觉，误以为遭遇"灵异事件"；  
          同时，占卜师线下跟踪，确认其生活规律；  
          最终以"线下驱邪"为名，诱骗目标见面，实施绑架贩卖……
        </p>
        <p class="ending-text" :class="{ visible: showText3 }">
          可惜的是，当帽子叔叔赶到的时候，占卜馆已人去楼空，林月也同样下落不明……
        </p>
      </div>
      <button class="restart-btn" :class="{ visible: showButton }" @click="restart">重新开始游戏</button>
    </div>
  </div>
</template>

<script>
import globalState from '../utils/globalState'

export default {
  name: 'JuBaoRen',
  data() {
    return {
      showTitle: false,
      showText1: false,
      showText2: false,
      showText3: false,
      showButton: false
    }
  },
  mounted() {
    setTimeout(() => { this.showTitle = true }, 500)
    setTimeout(() => { this.showText1 = true }, 1500)
    setTimeout(() => { this.showText2 = true }, 4000)
    setTimeout(() => { this.showText3 = true }, 7000)
    setTimeout(() => { this.showButton = true }, 9000)
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
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 20px;
}

.ending-content {
  max-width: 750px;
  width: 100%;
  text-align: center;
  padding: 0 20px;
}

.ending-title {
  font-size: 2.6rem;
  font-weight: bold;
  margin-bottom: 50px;
  color: #e74c3c;
  opacity: 0;
  transform: translateY(-30px);
  transition: all 1s ease-out;
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
}
</style>
