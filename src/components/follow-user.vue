<template>
  <div>
    <van-button
      v-if="isFollowed"
      class="follow-btn"
      round
      :loading="loading"
      size="small"
      @click="onFollow"
    >已关注</van-button>
    <van-button
      v-else
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      :loading="loading"
      size="small"
      icon="plus"
      @click="onFollow"
    >关注</van-button>
  </div>
</template>

<script>
import { addFollowAPI, deleteFollowAPI } from '@/api/index'

export default {
  name: 'follow-user',
  props: {
    isFollowed: {
      type: Boolean,
      default: true
    },
    autId: { // 用户id
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onFollow () {
      // 战术关注按钮的loading
      this.loading = true
      try {
        if (this.isFollowed) {
          //  已关注
          await deleteFollowAPI(this.autId)
        } else {
          await addFollowAPI(this.autId)
        }
        this.$emit('update_isFollowed', !this.isFollowed)
      } catch (e) {
        let message = '操作失败'
        if (e.response && e.response.status === 400) {
          message = '你不能管住你自己'
        }
        this.$toast(message)
      }
      // 战术关注按钮的loading
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
