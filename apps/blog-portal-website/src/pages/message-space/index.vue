<template>
  <div class="message-space">
    <div class="container">
      <!-- 页面标题 -->
      <header class="page-header">
        <h1>留言空间</h1>
        <p class="subtitle">分享你的想法，留下你的足迹</p>
      </header>

      <div class="main-content">
        <!-- 左侧：留言表单和须知 -->
        <div class="left-section">
          <!-- 留言须知 -->
          <section class="notice-section">
            <h2 class="section-title">
              <i class="notice-icon"></i>
              留言须知
            </h2>
            <ul class="notice-list">
              <li>请尊重他人，文明留言</li>
              <li>请勿发布广告、违法或不良信息</li>
              <li>您的留言将在审核后显示</li>
              <li>请勿重复提交相同内容</li>
            </ul>
          </section>

          <!-- 留言表单 -->
          <section class="form-section">
            <h2 class="section-title">
              <i class="form-icon"></i>
              提交留言
            </h2>
            <form class="message-form" @submit.prevent="submitMessage">
              <div class="form-group">
                <label for="name">昵称 *</label>
                <input type="text" id="name" v-model="messageForm.name" placeholder="请输入您的昵称" required maxlength="20" />
              </div>
              <div class="form-group">
                <label for="email">邮箱</label>
                <input type="email" id="email" v-model="messageForm.email" placeholder="请输入您的邮箱（选填）" maxlength="50" />
              </div>
              <div class="form-group">
                <label for="content">留言内容 *</label>
                <textarea id="content" v-model="messageForm.content" placeholder="请输入您的留言内容" required rows="5" maxlength="500"></textarea>
                <div class="word-count">{{ messageForm.content.length }}/500</div>
              </div>
              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                {{ isSubmitting ? '提交中...' : '提交留言' }}
              </button>
            </form>
          </section>
        </div>

        <!-- 右侧：热门留言和最新留言 -->
        <div class="right-section">
          <!-- 热门留言 -->
          <section class="hot-messages">
            <h2 class="section-title">
              <i class="hot-icon"></i>
              热门留言
            </h2>
            <div class="messages-list">
              <div v-for="message in hotMessages" :key="message.id" class="message-item">
                <div class="message-header">
                  <div class="user-info">
                    <div class="avatar">{{ message.name.charAt(0) }}</div>
                    <div class="name">{{ message.name }}</div>
                  </div>
                  <div class="like-count">
                    <i class="like-icon"></i>
                    {{ message.likes }}
                  </div>
                </div>
                <div class="message-content">{{ message.content }}</div>
                <div class="message-footer">
                  <span class="time">{{ formatDate(message.createdAt) }}</span>
                  <button class="comment-toggle-btn" @click="toggleComments(message.id)">
                    <i class="comment-icon"></i>
                    {{ message.comments.length }} 评论
                  </button>
                </div>

                <!-- 评论区域 -->
                <div v-if="expandedComments.includes(message.id)" class="comments-section">
                  <!-- 评论列表 -->
                  <div class="comments-list">
                    <div v-for="comment in message.comments" :key="comment.id" class="comment-item">
                      <div class="comment-header">
                        <div class="comment-user-info">
                          <div class="avatar small">{{ comment.author.charAt(0) }}</div>
                          <div class="comment-meta">
                            <span class="comment-author">{{ comment.author }}</span>
                            <span class="comment-time">{{ formatDate(comment.createdAt) }}</span>
                          </div>
                        </div>
                        <button class="reply-btn" @click="toggleReply(comment.id)">回复</button>
                      </div>
                      <div class="comment-content">{{ comment.content }}</div>

                      <!-- 回复列表 -->
                      <div v-if="comment.replies.length > 0" class="replies-list">
                        <div v-for="reply in comment.replies" :key="reply.id" class="reply-item">
                          <div class="reply-header">
                            <div class="avatar tiny">{{ reply.author.charAt(0) }}</div>
                            <div class="reply-meta">
                              <span class="reply-author">{{ reply.author }}</span>
                              <span class="reply-to">回复 {{ reply.to }}</span>
                              <span class="reply-time">{{ formatDate(reply.createdAt) }}</span>
                            </div>
                          </div>
                          <div class="reply-content">{{ reply.content }}</div>
                        </div>
                      </div>

                      <!-- 回复输入框 -->
                      <div v-if="replyingTo === comment.id" class="reply-form-container">
                        <form class="reply-form" @submit.prevent="submitReply(message.id, comment.id)">
                          <input type="text" v-model="replyForm.name" placeholder="您的昵称" required maxlength="20" />
                          <textarea v-model="replyForm.content" placeholder="请输入回复内容" required rows="2" maxlength="200"></textarea>
                          <div class="reply-form-actions">
                            <button type="button" @click="cancelReply" class="cancel-btn">取消</button>
                            <button type="submit" class="submit-reply-btn">提交回复</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <!-- 评论输入框 -->
                  <div class="comment-form-container">
                    <form class="comment-form" @submit.prevent="submitComment(message.id)">
                      <div class="comment-form-group">
                        <input type="text" v-model="commentForm.name" placeholder="您的昵称" required maxlength="20" />
                      </div>
                      <div class="comment-form-group">
                        <textarea v-model="commentForm.content" placeholder="请输入评论内容" required rows="3" maxlength="300"></textarea>
                        <div class="comment-word-count">{{ commentForm.content.length }}/300</div>
                      </div>
                      <div class="comment-form-actions">
                        <button type="submit" class="submit-comment-btn">提交评论</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 最新留言 -->
          <section class="latest-messages">
            <h2 class="section-title">
              <i class="latest-icon"></i>
              最新留言
            </h2>
            <div class="messages-list">
              <div v-for="message in latestMessages" :key="message.id" class="message-item">
                <div class="message-header">
                  <div class="user-info">
                    <div class="avatar">{{ message.name.charAt(0) }}</div>
                    <div class="name">{{ message.name }}</div>
                  </div>
                  <div class="like-count">
                    <i class="like-icon"></i>
                    {{ message.likes }}
                  </div>
                </div>
                <div class="message-content">{{ message.content }}</div>
                <div class="message-footer">
                  <span class="time">{{ formatDate(message.createdAt) }}</span>
                  <button class="comment-toggle-btn" @click="toggleComments(message.id)">
                    <i class="comment-icon"></i>
                    {{ message.comments.length }} 评论
                  </button>
                </div>

                <!-- 评论区域 -->
                <div v-if="expandedComments.includes(message.id)" class="comments-section">
                  <!-- 评论列表 -->
                  <div class="comments-list">
                    <div v-for="comment in message.comments" :key="comment.id" class="comment-item">
                      <div class="comment-header">
                        <div class="comment-user-info">
                          <div class="avatar small">{{ comment.author.charAt(0) }}</div>
                          <div class="comment-meta">
                            <span class="comment-author">{{ comment.author }}</span>
                            <span class="comment-time">{{ formatDate(comment.createdAt) }}</span>
                          </div>
                        </div>
                        <button class="reply-btn" @click="toggleReply(comment.id)">回复</button>
                      </div>
                      <div class="comment-content">{{ comment.content }}</div>

                      <!-- 回复列表 -->
                      <div v-if="comment.replies.length > 0" class="replies-list">
                        <div v-for="reply in comment.replies" :key="reply.id" class="reply-item">
                          <div class="reply-header">
                            <div class="avatar tiny">{{ reply.author.charAt(0) }}</div>
                            <div class="reply-meta">
                              <span class="reply-author">{{ reply.author }}</span>
                              <span class="reply-to">回复 {{ reply.to }}</span>
                              <span class="reply-time">{{ formatDate(reply.createdAt) }}</span>
                            </div>
                          </div>
                          <div class="reply-content">{{ reply.content }}</div>
                        </div>
                      </div>

                      <!-- 回复输入框 -->
                      <div v-if="replyingTo === comment.id" class="reply-form-container">
                        <form class="reply-form" @submit.prevent="submitReply(message.id, comment.id)">
                          <input type="text" v-model="replyForm.name" placeholder="您的昵称" required maxlength="20" />
                          <textarea v-model="replyForm.content" placeholder="请输入回复内容" required rows="2" maxlength="200"></textarea>
                          <div class="reply-form-actions">
                            <button type="button" @click="cancelReply" class="cancel-btn">取消</button>
                            <button type="submit" class="submit-reply-btn">提交回复</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <!-- 评论输入框 -->
                  <div class="comment-form-container">
                    <form class="comment-form" @submit.prevent="submitComment(message.id)">
                      <div class="comment-form-group">
                        <input type="text" v-model="commentForm.name" placeholder="您的昵称" required maxlength="20" />
                      </div>
                      <div class="comment-form-group">
                        <textarea v-model="commentForm.content" placeholder="请输入评论内容" required rows="3" maxlength="300"></textarea>
                        <div class="comment-word-count">{{ commentForm.content.length }}/300</div>
                      </div>
                      <div class="comment-form-actions">
                        <button type="submit" class="submit-comment-btn">提交评论</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

defineOptions({
  name: 'MessageSpacePage',
});

// 留言表单数据
const messageForm = ref({
  name: '',
  email: '',
  content: '',
});

// 提交状态
const isSubmitting = ref(false);

// 评论表单数据
const commentForm = ref({
  name: '',
  content: '',
});

// 回复表单数据
const replyForm = ref({
  name: '',
  content: '',
});

// 展开的评论ID列表
const expandedComments = ref<number[]>([]);

// 正在回复的评论ID
const replyingTo = ref<number | null>(null);

// 定义留言类型
interface Reply {
  id: number;
  author: string;
  to: string;
  content: string;
  createdAt: string;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  replies: Reply[];
}

interface Message {
  id: number;
  name: string;
  email: string;
  content: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
}

// 模拟热门留言数据
const hotMessages = ref<Message[]>([
  {
    id: 1,
    name: '旅行者',
    email: 'traveler@example.com',
    content: '这个博客的内容非常有价值，学到了很多知识，感谢分享！',
    createdAt: '2024-01-15T10:30:00',
    likes: 45,
    comments: [
      {
        id: 101,
        author: '小明',
        content: '我也这么认为，作者写得很用心！',
        createdAt: '2024-01-15T11:00:00',
        replies: [
          {
            id: 201,
            author: '旅行者',
            to: '小明',
            content: '谢谢支持，我会继续努力的！',
            createdAt: '2024-01-15T11:30:00',
          },
        ],
      },
      {
        id: 102,
        author: '小红',
        content: '学到了很多实用的技巧，感谢分享！',
        createdAt: '2024-01-15T14:20:00',
        replies: [],
      },
    ],
  },
  {
    id: 2,
    name: '技术爱好者',
    email: 'tech@example.com',
    content: '文章写得很详细，代码示例也很实用，期待更多优质内容！',
    createdAt: '2024-01-14T15:20:00',
    likes: 32,
    comments: [
      {
        id: 103,
        author: '开发者',
        content: '同意，代码示例非常清晰，容易理解！',
        createdAt: '2024-01-14T16:00:00',
        replies: [],
      },
    ],
  },
  {
    id: 3,
    name: '学习者',
    email: 'learner@example.com',
    content: '感谢作者的分享，对我帮助很大，希望能持续更新！',
    createdAt: '2024-01-13T09:15:00',
    likes: 28,
    comments: [],
  },
]);

// 模拟最新留言数据
const latestMessages = ref<Message[]>([
  {
    id: 4,
    name: '新访客',
    email: 'new@example.com',
    content: '第一次来到这个博客，感觉内容很丰富，以后会常来！',
    createdAt: '2024-01-16T14:45:00',
    likes: 12,
    comments: [],
  },
  {
    id: 5,
    name: '读者',
    email: 'reader@example.com',
    content: '文章分析得很到位，受益匪浅，点赞！',
    createdAt: '2024-01-16T11:20:00',
    likes: 8,
    comments: [
      {
        id: 104,
        author: '博主',
        content: '谢谢支持，很高兴能帮到你！',
        createdAt: '2024-01-16T12:00:00',
        replies: [],
      },
    ],
  },
  {
    id: 6,
    name: '关注者',
    email: 'follower@example.com',
    content: '期待更多关于前端技术的分享，加油！',
    createdAt: '2024-01-16T08:10:00',
    likes: 5,
    comments: [],
  },
]);

// 格式化日期
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// 提交留言
const submitMessage = () => {
  isSubmitting.value = true;
  // 模拟提交过程
  setTimeout(() => {
    // 重置表单
    messageForm.value = {
      name: '',
      email: '',
      content: '',
    };
    isSubmitting.value = false;
    alert('留言提交成功，感谢您的参与！');
  }, 1500);
};

// 切换评论展开/折叠
const toggleComments = (messageId: number) => {
  const index = expandedComments.value.indexOf(messageId);
  if (index > -1) {
    expandedComments.value.splice(index, 1);
  } else {
    expandedComments.value.push(messageId);
  }
};

// 切换回复输入框
const toggleReply = (commentId: number) => {
  replyingTo.value = replyingTo.value === commentId ? null : commentId;
};

// 取消回复
const cancelReply = () => {
  replyingTo.value = null;
  replyForm.value = {
    name: '',
    content: '',
  };
};

// 提交评论
const submitComment = (messageId: number) => {
  // 找到对应的留言
  const messageIndex = hotMessages.value.findIndex(msg => msg.id === messageId);
  const isHotMessage = messageIndex > -1;
  const message = isHotMessage ? hotMessages.value[messageIndex] : latestMessages.value.find(msg => msg.id === messageId);

  if (message) {
    // 创建新评论
    const newComment: Comment = {
      id: Date.now(),
      author: commentForm.value.name,
      content: commentForm.value.content,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    // 添加评论
    message.comments.push(newComment);

    // 重置表单
    commentForm.value = {
      name: '',
      content: '',
    };
  }
};

// 提交回复
const submitReply = (messageId: number, commentId: number) => {
  // 找到对应的留言
  const messageIndex = hotMessages.value.findIndex(msg => msg.id === messageId);
  const isHotMessage = messageIndex > -1;
  const message = isHotMessage ? hotMessages.value[messageIndex] : latestMessages.value.find(msg => msg.id === messageId);

  if (message) {
    // 找到对应的评论
    const comment = message.comments.find(c => c.id === commentId);
    if (comment) {
      // 创建新回复
      const newReply: Reply = {
        id: Date.now(),
        author: replyForm.value.name,
        to: comment.author,
        content: replyForm.value.content,
        createdAt: new Date().toISOString(),
      };

      // 添加回复
      comment.replies.push(newReply);

      // 重置表单和状态
      cancelReply();
    }
  }
};
</script>

<style lang="scss" scoped>
.message-space {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 40px 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
  color: white;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  }

  .subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
  }
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.left-section,
.right-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.section-title {
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;

  i {
    display: inline-block;
    width: 24px;
    height: 24px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 50%;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
  }
}

/* 留言须知样式 */
.notice-section {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
}

.notice-list {
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    padding: 10px 0;
    padding-left: 25px;
    position: relative;
    color: #666;
    line-height: 1.6;

    &::before {
      content: '•';
      position: absolute;
      left: 0;
      color: #667eea;
      font-size: 1.5rem;
      line-height: 1;
    }
  }
}

/* 留言表单样式 */
.form-section {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
}

.message-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 600;
    color: #333;
    font-size: 0.9rem;
  }

  input,
  textarea {
    padding: 12px 15px;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-size: 1rem;
    transition: all 0.3s ease;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      transform: translateY(-2px);
    }

    &::placeholder {
      color: #a0aec0;
    }
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }
}

.word-count {
  text-align: right;
  font-size: 0.8rem;
  color: #a0aec0;
  margin-top: -5px;
}

.submit-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
}

/* 留言列表样式 */
.hot-messages,
.latest-messages {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message-item {
  padding: 20px;
  background: #f8fafc;
  border-radius: 10px;
  border-left: 4px solid #667eea;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.1rem;

  &.small {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }

  &.tiny {
    width: 24px;
    height: 24px;
    font-size: 0.7rem;
  }
}

.name {
  font-weight: 600;
  color: #333;
}

.like-count {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #667eea;
  font-size: 0.9rem;
  font-weight: 600;

  .like-icon {
    width: 16px;
    height: 16px;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23667eea'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E")
      no-repeat center center;
    background-size: contain;
  }
}

.message-content {
  color: #555;
  line-height: 1.6;
  margin-bottom: 12px;
  word-break: break-word;
}

.message-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .time {
    font-size: 0.8rem;
    color: #a0aec0;
  }

  .comment-toggle-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    background: none;
    border: none;
    color: #667eea;
    font-size: 0.8rem;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 15px;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(102, 126, 234, 0.1);
    }

    .comment-icon {
      width: 14px;
      height: 14px;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23667eea'%3E%3Cpath d='M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z'/%3E%3C/svg%3E")
        no-repeat center center;
      background-size: contain;
    }
  }
}

/* 评论区域样式 */
.comments-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 评论列表 */
.comments-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
}

.comment-item {
  background: white;
  padding: 15px;
  border-radius: 8px;
  border-left: 3px solid #cbd5e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.comment-user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.comment-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.comment-author {
  font-weight: 600;
  font-size: 0.9rem;
  color: #333;
}

.comment-time {
  font-size: 0.75rem;
  color: #a0aec0;
}

.reply-btn {
  background: none;
  border: none;
  color: #667eea;
  font-size: 0.8rem;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(102, 126, 234, 0.1);
  }
}

.comment-content {
  color: #555;
  line-height: 1.5;
  margin-bottom: 10px;
  word-break: break-word;
  font-size: 0.95rem;
}

/* 回复列表 */
.replies-list {
  margin-top: 10px;
  margin-left: 42px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.reply-item {
  background: #f7fafc;
  padding: 12px;
  border-radius: 6px;
  border-left: 2px solid #e2e8f0;
}

.reply-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.reply-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
}

.reply-author {
  font-weight: 600;
  color: #333;
}

.reply-to {
  color: #667eea;
}

.reply-time {
  color: #a0aec0;
}

.reply-content {
  color: #555;
  line-height: 1.5;
  word-break: break-word;
  font-size: 0.85rem;
  margin-left: 32px;
}

/* 评论输入框 */
.comment-form-container {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.comment-form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.comment-form-group input,
.comment-form-group textarea,
.reply-form input,
.reply-form textarea {
  padding: 10px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
}

.comment-form-group textarea {
  resize: vertical;
  min-height: 80px;
}

.comment-word-count {
  text-align: right;
  font-size: 0.75rem;
  color: #a0aec0;
  margin-top: -2px;
}

.comment-form-actions {
  display: flex;
  justify-content: flex-end;
}

.submit-comment-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
}

/* 回复输入框 */
.reply-form-container {
  margin-top: 10px;
  margin-left: 42px;
  background: #f7fafc;
  padding: 12px;
  border-radius: 6px;
  border-left: 2px solid #667eea;
  animation: slideDown 0.3s ease;
}

.reply-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.reply-form textarea {
  resize: vertical;
  min-height: 60px;
}

.reply-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.cancel-btn {
  background: none;
  border: 1px solid #e2e8f0;
  color: #718096;
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #edf2f7;
  }
}

.submit-reply-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 5px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .message-space {
    padding: 20px 0;
  }

  .page-header {
    h1 {
      font-size: 2rem;
    }
  }

  .section-title {
    font-size: 1.1rem;
  }

  .notice-section,
  .form-section,
  .hot-messages,
  .latest-messages {
    padding: 20px;
  }

  .message-item {
    padding: 15px;
  }

  .comments-section {
    padding-top: 15px;
  }

  .comment-item {
    padding: 12px;
  }

  .replies-list,
  .reply-form-container {
    margin-left: 32px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }

  .page-header {
    h1 {
      font-size: 1.8rem;
    }

    .subtitle {
      font-size: 1rem;
    }
  }

  .form-group {
    input,
    textarea {
      padding: 10px 12px;
      font-size: 0.95rem;
    }
  }

  .submit-btn {
    padding: 12px 25px;
    font-size: 0.95rem;
  }

  .message-footer {
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
  }

  .replies-list,
  .reply-form-container {
    margin-left: 25px;
  }

  .reply-meta {
    flex-wrap: wrap;
    gap: 5px;
  }
}
</style>
