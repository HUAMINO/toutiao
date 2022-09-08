<template>
  <div class="comment-reply">
    <van-nav-bar
      :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` :'暂无回复'"
    >
      <template #left>
        <span class="toutiao toutiao-guanbi"
              @click="$emit('close')"
        ></span>
      </template>
    </van-nav-bar>
    <div class="scroll-wrap">
      <!--    当前品轮项-->
      <comment-item :comment="comment"></comment-item>
      <!--  当前品轮的回复列表  -->
      <van-cell title="全部回复">
      </van-cell>
<!--   品轮的回复列表   -->
      <comment-list
        :source="comment.com_id"
        type="c"
        :list="commentList"
      >
        <!--    品轮的回复列表    -->
      </comment-list>
      <!--  底部发布品轮  -->
    </div>
    <div class="post-wrap">
      <van-button
        class="post-btn"
        size="small"
        round
        @click="isPostShow = true"
      >写品轮</van-button>
    </div>
<!--  发布回复  -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post
      :target="comment.com_id"
      @post-success="onPostSuccess"
      ></comment-post>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from '@/views/article/components/comment-item'
import CommentList from '@/views/article/components/comment-list'
import CommentPost from '@/views/article/components/comment-post'
export default {
  name: 'comment-reply',
  props: {
    comment: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    CommentItem,
    CommentList,
    CommentPost
  },
  data () {
    return {
      isPostShow: false,
      commitClone: [],
      commentList: [] // 评论的回复列表
    }
  },
  methods: {
    onPostSuccess (data) {
      console.log(data)
      this.commitClone = this.comment
      this.commitClone.reply_count++
      this.commentList.unshift(data.new_obj)
      this.isPostShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.comment-reply {
  :deep(.scroll-wrap) {
    position: fixed;
    top: 92px;
    left: 0;
    right: 0;
    bottom: 88px;
    overflow: auto;
  }
  .van-nav-bar {
    :deep(.van-nav-bar__title) {
      color: #1b1f23;
      font-size: 36px;
    }
    background-color: #FFFFFF;
    .toutiao-guanbi {
      color: #005cc5;
    }
  }
  .post-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 88px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #FFFFFF;
    border-top: 1px solid #d8d8d8;
    .post-btn {
      width: 60%;
    }
  }

}
</style>
