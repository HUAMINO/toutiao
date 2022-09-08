<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar fixed>
      <template #title>
        <van-button
          class="search-btn"
          round
          type="info"
          size="small"
          icon="search"
          to="/search"
        >
          搜索
        </van-button>
        <!-- router-link 声明式跳转 -->
        <!-- this.$router.push() 编程式跳转 -->
      </template>
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab v-for="channel in channels"
               :key="channel.id"
               :title="channel.name">
        <!--  文章列表  -->
        <article-list :channel="channel"></article-list>
      </van-tab>
      <!-- 通过插槽设置汉堡栏 - 固定在右侧的按钮 -->
      <template #nav-right>
        <!-- 设置一个空的div，仅做占位使用 -->
        <div class="placeholder"></div>
        <div class="hamburger-btn" @click="isChannelEditShow = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <!--  频道类容  -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      position="bottom"
      close-icon-position="top-left"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :active="active"
        :myChannels="channels"
        :allChannels="allChannels"
        @updateActive="updateActiveFn"
      ></channel-edit>
    </van-popup>

  </div>
</template>
<script>
import { getUserChannelsAPI, getAllChannelsAPI } from '@/api/index'
import ArticleList from '../home/components/article-list'
import ChannelEdit from '@/views/home/components/channel-edit'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 2,
      channels: [], // 频道列表
      isChannelEditShow: false,
      allChannels: []
    }
  },
  created () {
    // 调用获取频道列表
    this.loadChannels()
    // 调用获取全部频道列表
    this.loadAllChannels()
  },
  methods: {
    async loadChannels () {
      try {
        const { data } = await getUserChannelsAPI()
        console.log(data.data)
        this.channels = data.data.channels
        this.$toast.success('获取成功')
      } catch (e) {
        this.$toast.fail('获取失败')
      }
    },
    // 获取全部频道列表
    async loadAllChannels () {
      try {
        const res = await getAllChannelsAPI()
        this.allChannels = res.data.data.channels
      } catch (error) {
        console.log(error)
      }
    },
    // 子组件切换频道
    // 在形参中以赋值的形式添加默认参数，如果调用者没有传递该参数，则会使用默认值
    updateActiveFn (index, isShow = false) {
      this.active = index
      // 如果isShow为true, 则是编辑页面删除频道时触发的方法，不需要关闭弹出层
      // 如果未false, 则是切换频道功能，需要进行关闭弹出层
      console.log(index, isShow)
      if (!isShow) {
        // 主动关闭弹框 - 切换功能
        this.isChannelEditShow = false
      }
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  }
}
</script>

<style lang="less" scoped>
      .home-container {
        padding-top: 180px;
        padding-bottom: 100px;
        :deep(.van-nav-bar__title) {
          // 取消顶部导航的标题插槽宽度限制
          max-width: unset;
        }
        .search-btn {
          background-color: #5babfb;
          border: none;
          font-size: 28px;
          width: 550px;
          .van-icon-search {
            color: #fff;
            font-size: 32px;
          }
        }

        :deep(.channel-tabs){
          .van-tabs__wrap {
            position: fixed;
            top: 92px;
            left: 0;
            right: 0;
            z-index: 1;
          }

          .van-tab {
            min-width: 200px;
            font-size: 30px;
            border-right: 1px solid #edeff3;
          }

          .van-tabs__line {
            width: 31px;
            height: 6px;
            background-color: #3296fa;
          }

          .placeholder {
            // flex布局时，当某个元素希望不受到影响是，可以设置flex-shrink, 来不参与flex的计算
            flex-shrink: 0;
            height: 88px;
            width: 66px;
          }

          .hamburger-btn {
            position: fixed;
            right: 0;
            height: 88px;
            width: 66px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #fff;

            // 通过伪类选择器来设置汉堡标签最左侧的竖线
            &::before {
              content: '';
              position: absolute;
              left: 0;
              background-image: url(../../assets/gradient-gray-line.png);
              background-size: contain;
              width: 2px;
              height: 58px;
            }
          }
        }

        .edit-channel-popup {
          padding-top: 100px;
          box-sizing: border-box;
        }
      }
    </style>
