<template>
  <van-icon
    :color="attitude === 1 ? '#ff0000' : '#777'"
    :name="attitude === 1 ? 'good-job' : 'good-job-o'"
    @click="changeFollowed"
  />
</template>

<script>
import { addLiketAPI, deleteLikeAPI } from '../api/index.js'
export default {
  name: 'like-article',
  props: {
    attitude: { // 用户对文章的态度 -1: 无态度，0-不喜欢，1-点赞 如果不写这行注释，这个变量的状态值将变得不可读，称其为魔鬼数字
      type: Number,
      default: -1
    },
    artId: { // 文章id
      type: String,
      default: ''
    }
  },
  data () {
    return {
      btnLoading: false // 关注按钮的加载状态
    }
  },
  methods: {
    async changeFollowed () {
      // 判断 btnLoading 是否为true， 如果为true 则表示，还有接口没有执行完成，禁止进行下一步操作
      if (this.btnLoading) return
      this.btnLoading = true
      try {
        if (this.attitude === 1) {
          await deleteLikeAPI(this.artId)
        } else {
          await addLiketAPI(this.artId)
        }
      } catch (e) {
        this.$toast.fail('操作失败')
      }
      this.$emit('update:attitude', this.attitude === 1 ? -1 : 1)
      this.$toast(this.attitude !== 1 ? '文章点赞成功' : '取消文章点赞')
      this.btnLoading = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
