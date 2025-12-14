<template>
  <div class="page-wrapper">
    <div class="phone-container">
      <!-- 状态栏（含摄像头） -->
      <div class="status-bar">
        <span>{{ currentTime }}</span>
        <div class="camera-notch"></div>
        <div class="status-icons">
          <span>📶</span>
          <span>🌐</span>
          <span>🔋</span>
        </div>
      </div>

      <!-- 手机屏幕内容 -->
      <div class="phone-screen">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PhoneFrame',
  props: {
    currentTime: {
      type: String,
      default: '9:41'
    }
  },
}
</script>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  padding: 20px;
  box-sizing: border-box; /* 确保 padding 不影响 width */
}

.phone-container {
  width: 360px;
  height: 720px;
  box-sizing: border-box; /* 👈 关键：包含 border 在 height 内 */
  background: white;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
  border: 8px solid black;
  position: relative;
  display: flex;
  flex-direction: column;
}

.status-bar {
  height: 40px;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
  position: relative;
  z-index: 10;
}

.camera-notch {
  width: 40px;
  height: 20px;
  background: black;
  border-radius: 10px;
  box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.1);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  z-index: 11;
}

.status-icons {
  display: flex;
  gap: 8px;
}

.phone-screen {
  flex: 1; /* 👈 替代 height: calc(100% - 40px)，更可靠 */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  flex-direction: column;
  position: relative;
}
</style>

<!-- 全局样式：确保 body 背景填满整个视口 -->
<style>
body {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  color: #333;
  min-height: 100vh; 
}
</style>