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
      size="small"
      @click="onPost"
    >发布</van-button>
  </div>
</template>

<script>
import { addCommentAPI } from '@/api/index'
export default {
  name: 'CommentPost',
  props: {
    target: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    async onPost () {
      try {
        const { data } = await addCommentAPI({
          target: this.target,
          content: this.message,
          art_id: null
        })
        console.log(data)
        this.message = ''
        this.$emit('post-success', data.data)
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
