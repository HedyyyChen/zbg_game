<template>
  <div :class="['message', type]">
    <div v-if="isImage" class="bubble">
      <img :src="content" :alt="alt || '图片'" />
    </div>
    <div v-else class="bubble" v-html="content"></div>
  </div>
</template>

<script>
export default {
  name: 'ChatMessage',
  props: {
    type: {
      type: String,
      required: true,
      validator: (value) => ['sent', 'received'].includes(value)
    },
    content: {
      type: String,
      required: true
    },
    isImage: {
      type: Boolean,
      default: false
    },
    alt: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
.message {
  display: flex;
}

.message.received {
  justify-content: flex-start;
}

.message.sent {
  justify-content: flex-end;
}

.bubble {
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 18px;
  font-size: 0.95rem;
  line-height: 1.4;
}

.message.received .bubble {
  background: white;
  color: #333;
  border-top-left-radius: 4px;
}

.message.sent .bubble {
  background: #95ec69;
  color: #333;
  border-top-right-radius: 4px;
}

.bubble img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  display: block;
}
</style>

