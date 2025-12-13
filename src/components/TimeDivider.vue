<template>
  <div class="time-divider">{{ time }}</div>
</template>

<script>
export default {
  name: 'TimeDivider',
  props: {
    time: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.time-divider {
  text-align: center;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 16px 0;
  position: relative;
}

.time-divider::before,
.time-divider::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 30%;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
}

.time-divider::before {
  left: 0;
}

.time-divider::after {
  right: 0;
}
</style>

