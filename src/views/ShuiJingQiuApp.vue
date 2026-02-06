<template>
  <PhoneFrame :current-time="currentTime">
    <div class="divination-app-container">
      <div class="app-header">
        <button class="back-btn" @click="goBack">←</button>
        <h1>灵启水晶</h1>
        <div class="energy-track" v-if="isCharging || chargeProgress > 0">
          <div class="energy-fill" :style="{ width: chargeProgress + '%' }"></div>
        </div>
      </div>
      
      <div class="app-content">
        <div class="divination-zone">
          <div 
            class="crystal-ball" 
            :class="{ 'spinning': isAnalyzing, 'charging-pulse': isCharging }"
            :style="{ transform: `scale(${1 + (chargeProgress / 200)})` }"
          >
            <div class="ball-glow"></div>
            <span class="emoji">{{ isAnalyzing ? '⏳' : '🔮' }}</span>
          </div>
          
          <p class="instruction">
            <span v-if="!isCharging && !isAnalyzing && !divinationResult">长按“注入灵力”按钮开始感应</span>
            <span v-else-if="isCharging">正在注入灵力... {{ chargeProgress }}%</span>
            <span v-else-if="isAnalyzing">正在跨越维度读取未来...</span>
            <span v-else-if="divinationResult">契机已现</span>
          </p>
        </div>

        <div class="action-buttons">
          <button 
            class="divinate-btn" 
            @mousedown="startCharging" 
            @mouseup="stopCharging"
            @mouseleave="stopCharging"
            @touchstart.prevent="startCharging" 
            @touchend.prevent="stopCharging"
            :disabled="isAnalyzing"
          >
            {{ isAnalyzing ? '正在解析...' : '长按·注入灵力' }}
          </button>
        </div>

        <transition name="fade">
            <div v-if="divinationResult && !isAnalyzing" class="result-box">
                <div class="result-header">
                <span class="category-tag">{{ divinationResult.category }}</span>
                <h3>今日灵感</h3>
                </div>
                
                <div class="result-content">
                <p class="main-quote">“{{ divinationResult.text }}”</p>
                
                <div class="advice-block">
                    <strong>行动指南：</strong> {{ divinationResult.advice }}
                </div>

                <div class="sub-stats">
                    <div class="stat-pill">🧿 助运: {{ divinationResult.luckyItem }}</div>
                    <div class="stat-pill">🧭 方位: {{ divinationResult.direction }}</div>
                </div>
                </div>
            </div>
        </transition>

        <div class="history-section">
          <h3>往昔残影</h3>
          <div v-if="history.length" class="history-list">
            <div v-for="(h, i) in history" :key="i" class="history-item">
               {{ h.text }}
            </div>
          </div>
          <p v-else class="empty-hint">暂无命运的痕迹</p>
        </div>
      </div>
    </div>
  </PhoneFrame>
</template>

<script>
import PhoneFrame from '../components/PhoneFrame.vue'

export default {
  name: 'ShuiJingQiuApp',
  components: { PhoneFrame },
  data() {
    return {
      currentTime: '09:41',
      divinationResult: null,
      isAnalyzing: false,
      isCharging: false,
      chargeProgress: 0,
      chargeTimer: null,
      history: [],
      timeInterval: null
    }
  },
  mounted() {
    this.updateTime();
    this.timeInterval = setInterval(this.updateTime, 60000);
  },
  methods: {
    startCharging() {
      if (this.isAnalyzing) return;
      this.isCharging = true;
      this.divinationResult = null; // 清空上次结果
      this.chargeTimer = setInterval(() => {
        if (this.chargeProgress < 100) {
          this.chargeProgress += 2; // 调整这个值可以改变充能速度
        } else {
          this.completeCharging();
        }
      }, 30);
    },
    stopCharging() {
      if (this.isCharging) {
        clearInterval(this.chargeTimer);
        this.isCharging = false;
        if (this.chargeProgress < 100) {
          this.chargeProgress = 0; // 如果没充满就松开，进度清零
        }
      }
    },
    async completeCharging() {
      clearInterval(this.chargeTimer);
      this.isCharging = false;
      this.isAnalyzing = true;

      // 模拟解析动画
      await new Promise(r => setTimeout(r, 1500));

      // 建议在 completeCharging 中使用的增强版结果库
        const pool = [
        // --- 事业/成长类 ---
        { text: '大鹏一日同风起，扶摇直上九万里。', category: '【鸿鹄签】', luckyItem: '金属书签', direction: '正北', advice: '宜展示才华，不宜过度谦让。' },
        { text: '潜龙勿用，阳气潜藏。', category: '【积蓄签】', luckyItem: '深蓝色领带', direction: '正南', advice: '宜深耕技能，不宜急于求成。' },
        { text: '志之所趋，无远弗届。', category: '【破浪签】', luckyItem: '运动手环', direction: '东南', advice: '今日适合开启新的计划。' },

        // --- 感情/人际类 ---
        { text: '桃之夭夭，灼灼其华。', category: '【姻缘签】', luckyItem: '粉色配饰', direction: '正东', advice: '宜主动沟通，会有意想不到的邂逅。' },
        { text: '山有木兮木有枝，心悦君兮君不知。', category: '【暗香签】', luckyItem: '香水/香氛', direction: '西南', advice: '宜静心观察，真意藏在细节中。' },
        { text: '相濡以沫，不如相忘于江湖。', category: '【释怀签】', luckyItem: '干花', direction: '正西', advice: '宜断舍离，腾出心里的空间。' },

        // --- 财富/运气类 ---
        { text: '水不在深，有龙则灵。', category: '【灵犀签】', luckyItem: '硬币', direction: '东北', advice: '会有小财入账，留意身边的信息流。' },
        { text: '千淘万漉虽辛苦，吹尽狂沙始到金。', category: '【掘金签】', luckyItem: '黄色钱包', direction: '正中', advice: '前期投入即将迎来回报。' },

        // --- 避坑/提醒类 ---
        { text: '行到水穷处，坐看云起时。', category: '【转机签】', luckyItem: '白色茶杯', direction: '西北', advice: '遇到阻碍时反而是转机，保持平和。' },
        { text: '不畏浮云遮望眼，自缘身在最高层。', category: '【慧眼签】', luckyItem: '眼镜/护目镜', direction: '东北', advice: '宜远离八卦，从长远角度看问题。' }
        ];

      const res = pool[Math.floor(Math.random() * pool.length)];
      this.divinationResult = res;
      this.history.unshift(res);
      if (this.history.length > 3) this.history.pop();
      
      this.isAnalyzing = false;
      this.chargeProgress = 0; // 重置进度
    },
    updateTime() {
      const now = new Date();
      this.currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    },
    goBack() { this.$router.push('/myphone') }
  }
}
</script>

<style scoped>
/* 全局修正：强制所有元素计算宽度包含内边距 */
* {
  box-sizing: border-box;
}

.divination-app-container {
  height: 100%; /* 撑满 PhoneFrame */
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  overflow: hidden; /* 防止最外层溢出 */
  overflow-x: hidden;
  width: 100%;
  box-sizing: border-box;
}

.app-header {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  z-index: 10;
}

.back-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  margin-right: 15px;
  cursor: pointer;
}

.app-content {
  flex: 1;
  overflow-y: auto; /* 允许内部滚动 */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%; /* 确保不超出 */
}

.divination-zone {
  margin: 20px 0;
  text-align: center;
}

.crystal-ball {
  position: relative;
  font-size: 5rem;
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ball-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(138,43,226,0.4) 0%, transparent 70%);
  animation: pulse 2s infinite;
}

.spinning .emoji {
  animation: spin 1s infinite linear;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.5; }
  50% { transform: scale(1.3); opacity: 0.8; }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.instruction {
  font-size: 0.9rem;
  color: #a2a2c2;
  line-height: 1.5;
}

.divinate-btn {
  width: 200px;
  padding: 12px 0;
  background: #4e4bc2;
  border: none;
  border-radius: 25px;
  color: white;
  font-weight: bold;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
  cursor: pointer;
}

.divinate-btn:disabled {
  background: #333;
  opacity: 0.7;
}

.result-box {
  width: 100%; /* 关键：撑满 content 但受 padding 限制 */
  background: rgba(255,255,255,0.1);
  border-radius: 15px;
  padding: 15px;
  margin: 20px 0;
  border: 1px solid rgba(255,255,255,0.2);
}

.history-section {
  width: 100%;
  margin-top: 20px;
}

.history-item {
  background: rgba(255,255,255,0.05);
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 8px;
  font-size: 0.85rem;
  border-left: 3px solid #4e4bc2;
}

.energy-track {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: rgba(255, 255, 255, 0.1);
}

/* 进度填充 - 充满活力的亮紫色 */
.energy-fill {
  height: 100%;
  background: #a29bfe;
  box-shadow: 0 0 10px #6c5ce7;
  transition: width 0.1s ease;
}

/* 充能时的呼吸脉冲效果 */
.charging-pulse {
  filter: brightness(1.3);
  animation: pulse-border 0.5s infinite alternate;
}

@keyframes pulse-border {
  from { box-shadow: 0 0 10px rgba(162, 155, 254, 0.3); }
  to { box-shadow: 0 0 30px rgba(162, 155, 254, 0.8); }
}

.main-text {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 12px;
  color: #fff;
  text-align: center;
}

.sub-stats {
  display: flex;
  justify-content: space-around;
  font-size: 0.8rem;
  color: #a2a2c2;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 10px;
}

/* 结果框标题区域 */
.result-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.category-tag {
  background: #6c5ce7;
  color: white;
  font-size: 0.7rem;
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.main-quote {
  font-family: "STKaiti", "KaiTi", serif; /* 增加一点书法感 */
  font-size: 1.15rem;
  color: #fff;
  line-height: 1.6;
  margin-bottom: 15px;
}

.advice-block {
  background: rgba(255, 255, 255, 0.05);
  padding: 10px;
  border-radius: 8px;
  font-size: 0.85rem;
  color: #cbd5e0;
  border-left: 3px solid #a29bfe;
  margin-bottom: 15px;
}

.stat-pill {
  background: rgba(0, 0, 0, 0.2);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
}

/* 进场动画 */
.fade-enter-active, .fade-leave-active { transition: opacity 0.5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>