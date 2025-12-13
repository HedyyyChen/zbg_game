<template>
  <div>
    <div id="errorFill"></div>
    <div id="warning">你来错地方了</div>
    <div id="glitchOverlay"></div>
  </div>
</template>

<script>
export default {
  name: 'Chat3View',
  data() {
    return {
      lines: [],
      addLineInterval: null,
      glitchMessages: [
        "ACCESS DENIED",
        "USER NOT FOUND",
        "SLEEPING_DUMPLING.LOG DELETED",
        "WHO ARE YOU?",
        "DON'T LOOK BACK",
        "SHE NEVER EXISTED",
        "YOU WERE NEVER SUPPOSED TO SEE THIS",
        "RUN.",
        "ERROR 404: REALITY NOT FOUND"
      ]
    }
  },
  mounted() {
    // 播放低频嗡鸣（可选，见下方音频方案）
    // 确保页面背景是黑色（防止闪烁脚本或其他样式改变颜色）
    document.body.style.backgroundColor = '#000'
    // 强制覆盖所有全局背景（防止其他样式表使用更高优先级的渐变）
    try {
      document.body.style.setProperty('background', '#000', 'important')
      document.body.style.setProperty('background-image', 'none', 'important')
      document.documentElement.style.setProperty('background', '#000', 'important')
      document.documentElement.style.setProperty('background-image', 'none', 'important')
    } catch (e) {
      // 某些环境可能不允许 setProperty，静默回退
    }
    this.startErrorFill()

    // 随机闪烁效果（通过 overlay，而不是直接改 body 背景）
    this.startFlicker()
  },
  beforeUnmount() {
    if (this.addLineInterval) clearTimeout(this.addLineInterval)
    if (this.flickerInterval) clearInterval(this.flickerInterval)
  },
  methods: {
    getRandomGlitch() {
      return this.glitchMessages[Math.floor(Math.random() * this.glitchMessages.length)]
    },

    startErrorFill() {
      const fill = document.getElementById('errorFill')
      let errorCount = 0
      
      const addLine = () => {
        errorCount++
        // 每 5~10 行插入一条恐怖提示
        if (errorCount % Math.floor(7 + Math.random() * 4) === 0) {
          this.lines.push(this.getRandomGlitch())
        } else {
          // 正常 "Error" 行，但偶尔乱码
          let base = "Error"
          if (Math.random() < 0.15) {
            base = base.split('').map(c => Math.random() < 0.3 ? String.fromCharCode(0x2588) : c).join('')
          }
          this.lines.push(base + base + base)
        }

        if (fill) {
          fill.textContent = this.lines.join('\n')
          fill.scrollTop = fill.scrollHeight
        }

        // 延迟递减，制造加速崩溃感
        if (fill && fill.scrollHeight < window.innerHeight * 3) {
          const nextDelay = Math.max(5, 100 - this.lines.length / 1.5)
          this.addLineInterval = setTimeout(addLine, nextDelay)
        }
      }

      addLine()
    },

    startFlicker() {
      const overlay = document.getElementById('glitchOverlay')
      this.flickerInterval = setInterval(() => {
        if (Math.random() < 0.08 && overlay) { // 8% 概率闪烁
          const prev = overlay.style.opacity
          // 提高 overlay 透明度，制造红色闪烁感（不修改 body 背景）
          overlay.style.opacity = '1'
          // 随机短时还原为默认值
          setTimeout(() => {
            overlay.style.opacity = prev || '0.4'
          }, 30 + Math.random() * 50)
        }
      }, 200 + Math.random() * 800)
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#errorFill {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10px;
  font-size: 1.15rem;
  line-height: 1.35;
  opacity: 0.88;
  color: #ff0000;
  word-break: break-all;
  overflow: hidden;
  pointer-events: none;
  font-family: 'Courier New', monospace;
  text-shadow: 0 0 4px #ff0000;
}

#warning {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.6rem;
  font-weight: 900;
  text-align: center;
  z-index: 20;
  color: #ff0000;
  text-shadow:
    0 0 10px #ff0000,
    0 0 20px #ff0000,
    0 0 30px #ff0000;
  animation: glitch-pulse 2.8s infinite alternate;
  letter-spacing: 2px;
}

@keyframes glitch-pulse {
  0%, 100% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(0.2deg);
  }
  33% {
    opacity: 0.95;
    transform: translate(-52%, -49%) rotate(-0.3deg);
  }
  66% {
    opacity: 0.9;
    transform: translate(-49%, -51%) rotate(0.4deg);
  }
}

/* 扫描线/故障效果 */
#glitchOverlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    rgba(0, 0, 0, 0.1) 50%,
    rgba(255, 0, 0, 0.05) 50%
  );
  background-size: 100% 4px;
  z-index: 5;
  pointer-events: none;
  opacity: 0.4;
  animation: scan 8s linear infinite;
}

@keyframes scan {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
</style>

<style>
html, body, #app {
  background: #000 !important;
}

body {
  background-color: #000;
  color: #ff0000;
  font-family: 'Courier New', monospace;
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: relative;
  /* 禁止选中文字，增强“系统感” */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>