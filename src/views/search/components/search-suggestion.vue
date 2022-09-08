<template>
  <div class="search-suggestion">
    <van-cell
      icon="search"
      v-for="(item, index) in suggestion"
      :key="index"
      @click="$emit('search', item)"
    >
      <template #title>
        <span v-html="highlight(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionsAPI } from '../../../api/index.js'
// 1. 引入防抖方法
import { debounce } from 'lodash'

export default {
  name: 'SearchSuggestion',
  props: {
    seachInput: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      suggestion: [] // 联想建议列表
      // text: 'hello <span style="color: red;">world</span>'
    }
  },

  watch: {
    // 用基本写法是出现一个问题： 当输入第一个字符时，并没有监听到结果
    // 'seachInput' (newValue) {
    //   console.log(newValue)
    // }

    // 通过深度监听的完整写法，来解决了这个问题
    seachInput: {
      immediate: true, // 首次监听触发
      // debounce防抖操作第一个参数必须是普通函数类型，不可以是箭头函数（箭头函数没有函数作用域会影响this指向）
      handler: debounce(function (newValue) {
        // 调用查询练习列表
        this.loadSearchSuggestions(newValue)
      }, 400)
    }
  },

  methods: {
    // 查询建议数据接口
    async loadSearchSuggestions (newValue) {
      try {
        const res = await getSearchSuggestionsAPI(newValue)
        // 有的时候后端会返回一个[null], 或者[], 可以主动的将这两种情况改为seachInput的值作为第一个元素
        if (res.data.data.options.length === 0 || res.data.data.options[0] === null) {
          // 如果数组中没有值，或者只有一个元素为null时
          res.data.data.options[0] = this.seachInput
        }

        this.suggestion = res.data.data.options
        // 高亮展示是修改数据还是仅影响页面 => 仅改变页面
        console.log(this.suggestion)
      } catch (error) {
        console.log(error)
        this.$toast('获取失败')
      }
    },

    // 高亮展示数据处理方法
    highlight (value) {
      // value 是需要进行高亮处理的字符串
      // 1. 生成富文本格式 - 搜索框关键字的标签形式
      const highlightStr = `<span style="color: red;">${this.seachInput}</span>`
      // 2. 通过替换的方式改写字符串
      // 2.1 使用 replaceAll 来实现
      // const tempStr = value.replaceAll(this.seachInput, highlightStr)

      // 2.2 使用正则表达式 + replace的 组合来实现
      // const reg = new RegExp(this.seachInput, 'gi')
      // const tempStr = value.replace(reg, highlightStr)

      // 2.3 通过split和join的组合使用
      const tempStr = value.split(this.seachInput).join(highlightStr)
      return tempStr
    }
  }
}
</script>

<style scoped lang="less"></style>
