<template>
  <PhoneFrame :current-time="currentTime">
    <div class="zhuquan-container">
      <div class="zhuquan-header">
        <button class="back-btn" @click="goBack">←</button>
        <h2>猪圈 - 密码对照表</h2>
      </div>
      <div class="zhuquan-body">
        <img :src="imageSrc" alt="mimaduizhao.png" class="zhuquan-image" />
        <div class="zhuquan-caption">密码对照表</div>
      </div>
    </div>
  </PhoneFrame>
</template>

<script>
import PhoneFrame from '../components/PhoneFrame.vue'
import mimaduizhaoImage from '../assets/mimaduizhao.png'

export default {
  name: 'ZhuQuan',
  components: { PhoneFrame },
  data() {
    return {
      currentTime: '9:41',
      // 我们使用现有的 mimatu.jpg 作为回退图像，但在页面上显示为 mimaduizhao.png
      imageSrc: mimaduizhaoImage
    }
  },
  methods: {
    goBack() {
      this.$router.push('/searchplace')
    }
  },
  mounted() {
    const now = new Date()
    this.currentTime = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`
  }
}
</script>

<style scoped>
.zhuquan-container { flex:1; display:flex; flex-direction:column; background:#fff; color:#333; }
.zhuquan-header { display:flex; align-items:center; padding:12px; border-bottom:1px solid #eee; }
.back-btn { background:none; border:none; font-size:1.4rem; cursor:pointer; margin-right:12px }
.zhuquan-body { padding:18px; display:flex; flex-direction:column; align-items:center; gap:12px }
.zhuquan-image { max-width:86%; border:1px solid #ddd; border-radius:6px }
.zhuquan-caption { font-weight:700; color:#222 }
</style>