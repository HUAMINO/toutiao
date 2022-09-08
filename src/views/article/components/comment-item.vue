<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="comment.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{ comment.aut_name }}</div>
      <van-button
        class="like-btn"
        :icon="comment.is_liking ? 'good-job' : 'good-job-o'"
        :class="{ liked: comment.is_liking }"
        @click="onCommentLike"
        :loading="commentLoading"
      >{{ comment.like_count || '赞' }}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{ comment.content }}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{ comment.pubdate | relativeTime }}</span>
        <van-button
          class="reply-btn"
          round
        >回复 {{ comment.reply_count }}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addCommentLikeAPI, deleteCommentLikeAPI } from '../../../api/index.js'
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      commentLoading: false, // 点赞按钮的加载状态
      commentClone: this.comment
    }
  },
  methods: {
    async onCommentLike () {
      try {
        this.commentLoading = true
        if (this.comment.is_liking) {
          // 已点赞，需要取消
          await deleteCommentLikeAPI(this.comment.com_id)
          this.commentClone.like_count--
        } else {
          // 未点赞，需要添加 com_id: 评论id
          await addCommentLikeAPI(this.comment.com_id)
          this.commentClone.like_count++
        }

        // 当接口调用完成以后 => 需要对is_liking 取反，来取消或添加当前账号对该评论的一个点赞状态
        this.commentClone.is_liking = !this.comment.is_liking
      } catch (error) {
        console.log(error)
      }

      this.commentLoading = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
}
</style>
