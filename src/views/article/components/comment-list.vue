<template>
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
    :immediate-check="false"
  >
    <comment-item
      v-for="(item, index) in list"
      :key="index"
      :comment="item"
      @reply-click="$emit('reply-click', $event)"
    />
  </van-list>
</template>

<script>
import { getCommentsAPI } from '@/api/index'
import CommentItem from '@/views/article/components/comment-item'

export default {
  name: 'comment-list',
  props: {
    source: {
      type: [Number, String, Object],
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validate (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  created () {
    this.loading = true
    this.onLoad()
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页的数据的标记
      limit: 10
    }
  },
  methods: {
    async onLoad () {
      try {
        //  1. 请求获取数据
        const { data } = await getCommentsAPI({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        console.log(data)
        //  2. 将数据添加到列表中
        const { results } = data.data
        // eslint-disable-next-line vue/no-mutating-props
        this.list.push(...results)
        // 2.5 把文章数量传递给父组件 ( 只要在步骤1的下面，就行)
        this.$emit('onload-success', data.data)
        //  3. 将 loading 设置为 false
        this.loading = false
        //  4. 判断是否还有数据
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
        //   有就更新获取下一页的数据页码
        //  没有就将finished设置结束
      } catch (e) {
      }
    }
  },
  components: {
    CommentItem
  }
}
</script>

<style lang="less" scoped>

</style>
