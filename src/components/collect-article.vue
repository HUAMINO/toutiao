<template>
  <van-icon
    :color="isCollected ? '#ffa500' : '#777'"
    :name="isCollected ? 'star' : 'star-o'"
    @click="changeFollowed"
    :loading="loading"
  />
</template>

<script>
import { addCollectAPI, deleteCollectAPI } from '@/api/index'

export default {
  name: 'collect-article',
  components: {},
  props: {
    isCollected: { // 收藏文章状态
      type: Boolean,
      default: true
    },

    artId: { // 文章id
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
    async changeFollowed () {
      this.loading = true
      try {
        if (this.isCollected) {
          await deleteCollectAPI(this.artId)
        } else {
          await addCollectAPI(this.artId)
        }
      } catch (e) {
        this.$toast.fail('操作失败')
      }
      this.$emit('update:isCollected', !this.isCollected)
      this.$toast(!this.isCollected ? '文章收藏成功' : '取消文章收藏')
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
