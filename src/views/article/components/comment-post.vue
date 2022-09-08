<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button
      class="post-btn"
      v-model.trim="message"
      size="small"
      @click="onPost"
      :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import { addCommentAPI } from '@/api/index'
import { Toast } from 'vant'
export default {
  name: 'CommentPost',
  props: {
    target: {
      type: String,
      default: ''
    }
  },
  inject: {
    articleId: {
      type: [String, Number, Object],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onPost () {
      Toast.loading({
        message: '发布中...',
        forbidClick: true, // 禁用背景点击
        duration: 0 // 持续时间， 默认是2000
      })
      try {
        const { data } = await addCommentAPI({
          target: this.target,
          content: this.message,
          art_id: this.articleId
        })
        console.log(data)
        this.message = ''
        this.$emit('post-success', data.data)
        this.$toast.success('发布成功')
      } catch (e) {
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
