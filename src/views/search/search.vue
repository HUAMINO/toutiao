<template>
  <div class="search-container">
    <!-- 在van-search标签外层嵌套form标签，且action属性不能为空，即可在ios的输入法中显示搜索按钮 -->
    <form action="/">
      <van-search
        v-model="seachInput"
        background="rgb(50, 150, 250)"
        placeholder="请输入搜索关键词"
        show-action
        @cancel="$router.back()"
        @search="onSearch"
        @focus="isResultShow = false"
      />
    </form>

    <!-- 列表标签 -->
    <!-- 搜索结果 首先通过开关状态来判断是否显示搜索结果 -->
    <search-result v-if="isResultShow" :seachInput="seachInput"></search-result>

    <!-- 联想列表 当搜索结果为展开时，再判断搜索框中是否有值，如果有内容则显示联想列表 -->
    <search-suggestion v-else-if="seachInput" :seachInput="seachInput" @search="onSearch"></search-suggestion>

    <!-- 搜索历史 除上面两种情况以外，展示历史 -->
    <search-history v-else :searchHistories="searchHistories" @search="onSearch" @clearAll="searchHistories = []"></search-history>

  </div>
</template>

<script>

import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import { setItem, getItem } from '../../utils/storage.js'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },

  data () {
    return {
      seachInput: '',
      isResultShow: false,
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || [] // 搜索历史的数据列表
    }
  },

  watch: {
    searchHistories: {
      deep: true,
      handler () {
        setItem('TOUTIAO_SEARCH_HISTORIES', this.searchHistories)
      }
    }
  },

  methods: {
    // 点击联想，搜索结果
    onSearch (item) {
      /*
        1.1 更新输入框内容
        1.2 开启搜索结果页面
      */
      this.seachInput = item
      this.isResultShow = true

      // 储存搜索历史记录
      // 要求:如果原来的查询历史数组中有这个值 ，那么将该元素的位置放到数组的最前面（索引为1的位置）
      const index = this.searchHistories.indexOf(item)
      // 查询结果元素的索引是否为-1
      if (index !== -1) {
        // 不等于-1时，表示找到了数组中相同的元素
        // 去除当前找到的那个元素
        this.searchHistories.splice(index, 1)
      }
      // 再在数组的最前面添加
      this.searchHistories.unshift(item)
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action{
    color: white;
  }

  .van-search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
