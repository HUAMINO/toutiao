<template>
  <div class="article-list-container">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="successText"
      :success-duration="3000"
    >
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
<!--      <van-cell-->
<!--        v-for="(article, index) in list"-->
<!--        :key="index"-->
<!--        :title="article.title" />-->
        <article-item
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        ></article-item>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesAPI } from '@/api/index'
import ArticleItem from '@/components/article-item'
export default {
  name: 'article-list',
  props: {
    channel: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false, // 控制失败的提示
      isLoading: false,
      successText: ''
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getArticlesAPI({
          channel_id: this.channel.id, // 频道id
          timestamp: this.timestamp || Date.now() // 时间戳， 请求新的推荐数据传递当前的时间戳，如果要请求历史推荐数据，传入指定的时间戳
        })
        console.log(data)
        const { results } = data.data
        this.list.push(...results)
        // 3.加载之后需要把加载状态设置为false才会继续加载
        this.loading = false
        if (results.length) {
        //  更新需要获取的下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (e) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      // console.log('onRefresh')
      try {
        const { data } = await getArticlesAPI({
          channel_id: this.channel.id, // 频道id
          timestamp: Date.now() // 时间戳， 请求新的推荐数据传递当前的时间戳，如果要请求历史推荐数据，传入指定的时间戳
        })
        console.log(data)
        const { results } = data.data
        this.list.unshift(...results)
        // // 3.加载之后需要把加载状态设置为false才会继续加载
        this.isLoading = false
        this.successText = `刷新成功，更新了${results.length}条数据 `
        // if (results.length) {
        //   //  更新需要获取的下一页数据的时间戳
        //   this.timestamp = data.data.pre_timestamp
        // } else {
        //   this.finished = true
        // }
      } catch (e) {
        this.error = true
        this.loading = false
        // 当出错的时候，提示文案变成刷新失败
        this.successText = '刷新失败'
      }
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style lang="less" scoped>
.article-list-container {
  // 如何计算一个盒子应该有的视口高度， ((总视口高度 - 顶部导航的高度 - 底部导航的高度 - 频道列表的高度) / 总视口高度) * 100 => 视口高度
  height: 79vh;
  overflow-y: auto;
}
</style>
