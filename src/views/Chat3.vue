<template>
  <div>
    <div id="errorFill"></div>
    <div id="warning">你来错地方了</div>
  </div>
</template>

<script>
export default {
  name: 'Chat3View',
  data() {
    return {
      lines: [],
      addLineInterval: null
    }
  },
  mounted() {
    setTimeout(() => {
      this.startErrorFill()
    }, 500)
  },
  beforeUnmount() {
    if (this.addLineInterval) {
      clearTimeout(this.addLineInterval)
    }
  },
  methods: {
    startErrorFill() {
      const fill = document.getElementById('errorFill')
      const phrase = "ErrorErrorError"
      
      const addLine = () => {
        this.lines.push(phrase)
        if (fill) {
          fill.textContent = this.lines.join('\n')
          fill.scrollTop = fill.scrollHeight
        }

        if (fill && fill.scrollHeight > window.innerHeight * 2) {
          return
        }

        const nextDelay = Math.max(10, 120 - this.lines.length / 2)
        this.addLineInterval = setTimeout(addLine, nextDelay)
      }

      addLine()
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
  font-size: 1.1rem;
  line-height: 1.3;
  opacity: 0.85;
  word-break: break-all;
  overflow: hidden;
  pointer-events: none;
}

#warning {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.4rem;
  font-weight: bold;
  text-align: center;
  z-index: 10;
  text-shadow: 0 0 10px #ff0000;
  animation: pulse 3s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}
</style>

<style>
body {
  background-color: #000;
  color: #ff0000;
  font-family: 'SimHei', 'Microsoft YaHei', monospace;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
  position: relative;
}
</style>

