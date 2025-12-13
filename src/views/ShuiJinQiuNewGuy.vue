<template>
  <PhoneFrame :current-time="currentTime">
    <div class="forum-container">
      <div class="forum-header">
        <button class="back-btn" @click="goBackToSearch">←</button>
        <h1>水晶球新手的交流社区</h1>
      </div>
      <div v-if="!selectedPost" class="posts-list">
        <div 
          v-for="(post, index) in posts" 
          :key="index"
          class="post-item"
          @click="openPost(index)"
        >
          <div class="post-title">{{ post.title }}</div>
          <div class="post-author">发布者：{{ post.author }}</div>
        </div>
      </div>
      <div v-else class="post-detail">
        <div class="post-detail-header">
          <button class="back-to-list-btn" @click="backToList">返回列表</button>
          <h2>{{ selectedPost.title }}</h2>
          <div class="post-author">发布者：{{ selectedPost.author }}</div>
        </div>
        <div class="post-content">
          <p>{{ selectedPost.content }}</p>
        </div>
        <div class="post-replies">
          <h3>回帖：</h3>
          <div 
            v-for="(reply, index) in selectedPost.replies" 
            :key="index"
            class="reply-item"
          >
            <strong>【{{ reply.author }}】</strong>{{ reply.content }}
          </div>
        </div>
      </div>
    </div>
  </PhoneFrame>
</template>

<script>
import PhoneFrame from '../components/PhoneFrame.vue'

const posts = [
  {
    title: '怎么自己进行水晶球占卜？',
    author: '一个水晶球爱好者',
    content: '很多新手对于自己进行水晶球占卜都一头雾水，特别是在获得启示之后，对于其中的图案、画面并不理解。这是非常正常的，大家不用焦虑，解读是需要一定的经验和积累的，孰能生巧，慢慢的就会得心应手。关于水晶球占卜的步骤，一定要严格按照占卜师所说明的顺序，这样获得正确启示的概率更高。',
    replies: [
      { author: '小鱼', content: '我之前也看不懂，不过练习多了就有经验了。' },
      { author: '花花小姐', content: '第一次自己占卜啥也没看到，这是正常的吗？' },
      { author: '黑色毛衣', content: '楼主说了跟没说一样，占卜这东西就是看运气。' },
      { author: '农民斗地主', content: '刚买的水晶球，今晚就试试！' }
    ]
  },
  {
    title: '关于"它"的传说',
    author: '球球',
    content: '在进行水晶球占卜的时候，我们其实通过水晶球进入了另一个维度的空间，在那个维度，我们可以看到关于未来的某种启示。获得启示能帮助我们改运，但频繁地使用水晶球会损耗自身的能量，使我们处于不稳定状态，容易被不好的东西近身。这就是我这篇帖子要说的东西——"它"。只有灵感足且能量低的人会被它近身，起初，你会感觉有人在窥视，后来，它会逐渐变幻出实体，直到和常人无异，甚至！会变成你认识的人，在你毫无防备的时候，被它拉入另一个维度之中……',
    replies: [
      { author: '路仁', content: '楼主在编故事吗？' },
      { author: '流眼泪的小男孩', content: '前两天才买的水晶球，这就要被劝退了……' },
      { author: '彼岸之草', content: '听着有点真啊，好可怕……' },
      { author: '会飞的雨', content: '不是着你们都信？一听就是假的。' },
      { author: '蛋挞大王', content: '如果遇到了怎么解决？' },
      { author: '球球', content: '回复【蛋挞大王】：帖子不方便，在"树洞悄悄话"聊，我的账号是qiuqiu123' }
    ]
  },
  {
    title: '你们看到过的最抽象的启示是什么？',
    author: '啊吧啊吧',
    content: '如题。',
    replies: [
      { author: '半吊子先生', content: '一个正方形……' },
      { author: '幽幽鹿鸣', content: '应该是一堆杂乱的曲线吧，至今不知是什么意思。' },
      { author: '恬恬', content: '油画质感的雪山，其实还挺惊讶看得那么清晰的。' },
      { author: '酒醉的蝴蝶', content: '全黑，啥也没有。' }
    ]
  }
]

export default {
  name: 'ShuiJinQiuNewGuy',
  components: {
    PhoneFrame
  },
  data() {
    return {
      currentTime: '9:41',
      posts: posts,
      selectedPost: null,
      timeInterval: null
    }
  },
  mounted() {
    this.updateTime()
    this.timeInterval = setInterval(this.updateTime, 60000)
  },
  beforeUnmount() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval)
    }
  },
  methods: {
    updateTime() {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      this.currentTime = `${hours}:${minutes}`
    },
    openPost(index) {
      this.selectedPost = this.posts[index]
    },
    backToList() {
      this.selectedPost = null
    },
    goBack() {
      this.$router.push('/searchplace')
    },
    goBackToSearch() {
      this.$router.push('/searchplace')
    }
  }
}
</script>

<style scoped>
.forum-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #f0f4ff 0%, #e6e9f0 100%);
  color: #333;
  overflow-y: auto;
  font-family: 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.forum-header {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background: rgba(90, 70, 140, 0.08);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(100, 90, 130, 0.2);
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.back-btn {
  background: none;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  color: #5a468c;
  margin-right: 16px;
  transition: transform 0.2s;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-btn:hover {
  transform: scale(1.1);
  background: rgba(90, 70, 140, 0.1);
}

.forum-header h1 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #4a3a7c;
  letter-spacing: 0.5px;
}

.posts-list {
  flex: 1;
  padding: 20px;
}

.post-item {
  padding: 18px;
  margin-bottom: 20px;
  background: white;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(100, 90, 150, 0.1);
  border-left: 4px solid #6a5acd;
  position: relative;
  overflow: hidden;
}

.post-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #8a77d1, #6a5acd);
}

.post-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(100, 90, 150, 0.18);
  background: #fafaff;
}

.post-title {
  font-weight: 700;
  font-size: 1.15rem;
  margin-bottom: 10px;
  color: #4a3a7c;
  line-height: 1.4;
}

.post-author {
  font-size: 0.92rem;
  color: #7a6ab0;
  font-style: italic;
}

.post-detail {
  flex: 1;
  padding: 20px;
  background: white;
  border-radius: 16px;
  margin: 16px;
  box-shadow: 0 4px 20px rgba(100, 90, 150, 0.12);
}

.post-detail-header {
  margin-bottom: 24px;
  padding-bottom: 18px;
  border-bottom: 2px solid #eaeaff;
}

.back-to-list-btn {
  background: none;
  border: none;
  color: #6a5acd;
  cursor: pointer;
  font-size: 0.98rem;
  margin-bottom: 12px;
  font-weight: 600;
  transition: color 0.2s;
  display: flex;
  align-items: center;
}

.back-to-list-btn::before {
  content: '← ';
  margin-right: 6px;
}

.back-to-list-btn:hover {
  color: #4a3a7c;
  text-decoration: underline;
}

.post-detail-header h2 {
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 10px;
  color: #4a3a7c;
  line-height: 1.3;
}

.post-detail .post-author {
  font-size: 0.95rem;
  color: #7a6ab0;
  font-style: italic;
}

.post-content {
  margin-bottom: 30px;
  line-height: 1.8;
  color: #555;
  font-size: 1.02rem;
}

.post-replies {
  margin-top: 30px;
}

.post-replies h3 {
  font-size: 1.2rem;
  margin-bottom: 18px;
  color: #4a3a7c;
  font-weight: 700;
  position: relative;
  padding-bottom: 8px;
}

.post-replies h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: #6a5acd;
  border-radius: 1px;
}

.reply-item {
  padding: 14px;
  margin-bottom: 14px;
  background: #f8f7ff;
  border-radius: 10px;
  line-height: 1.65;
  color: #555;
  font-size: 1rem;
  border-left: 2px solid #b4a7d6;
}

.reply-item strong {
  color: #6a5acd;
  margin-right: 6px;
}

/* 响应式优化 */
@media (max-width: 480px) {
  .post-detail {
    margin: 12px;
    padding: 16px;
  }

  .forum-header h1 {
    font-size: 1.1rem;
  }

  .post-title {
    font-size: 1.05rem;
  }
}
</style>

