<template>
  <div class="channel-edit">
    <!-- 频道标题 -->
    <van-cell :border="false">
      <!-- 左侧标题 -->
      <template #title>
        <div>我的频道</div>
      </template>

      <!-- 右侧按钮 -->
      <template #default>
        <van-button
          class="edit-btn"
          plain
          round
          type="danger"
          size="mini"
          @click="isEditShow = !isEditShow"
        >
          {{ isEditShow ? '完成' : '编辑' }}
        </van-button>
      </template>
    </van-cell>

    <!-- 内容区域 -->
    <van-grid :gutter="10">
      <van-grid-item
        class="channel-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <template #text>
          <span class="text" :class="{ active: active === index }">{{ channel.name }}</span>
        </template>

        <template #icon>
          <van-icon v-show="isEditShow && index !== 0" name="close" />
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <!-- 左侧标题 -->
      <template #title>
        <div>频道推荐</div>
      </template>
    </van-cell>

    <!-- 内容区域 -->
    <van-grid class="recommend-grid" :gutter="10">
      <van-grid-item
        :text="channel.name"
        class="channel-item"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        icon="plus"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import { addUserChannelAPI, deleteUserChannelAPI } from '../../../api/index.js'
import { setItem } from '../../../utils/storage.js'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      default: () => []
    },
    active: {
      type: Number,
      default: 0
    },
    allChannels: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      myChannelsClone: this.myChannels,
      isEditShow: false // 控制编辑状态
    }
  },

  computed: {
    ...mapState(['user']),
    // 推荐频道
    // 计算属性会观察方法内部所依赖的数据，如果依赖数据发生变化，则计算属性重新计算
    recommendChannels () {
      // // 通过filter过滤操作，来筛选符合条件的数据 （在全部频道中，但不在我的频道列表的数据）
      // const tempList = this.allChannels.filter(channel => {
      //   // 通过查询数组的方法find / findIndex，遍历我的频道列表，看看有没有对应的频道内容
      //   const index = this.myChannels.findIndex(myChannel => {
      //     return myChannel.id === channel.id
      //   })

      //   // 如果index返回为-1。表示全部数据中有该元素，但我的频道中没有该元素 => 当index = -1 时，就是推荐频道的元素
      //   return index === -1
      // })
      // return tempList

      // differenceBy可能返回的数据是一个伪数组，那么建议对返回的数组做一次真数组处理
      // 参数1： 需要进行过滤的数组 => 大数组
      // 参数2： 需要删除参数1数组的部分 => 小数组
      // 参数3： 参数1与参数2 中的每个元素直接是通过哪个属性进行比较的
      return [...this.$_.differenceBy(this.allChannels, this.myChannels, 'id')]
    }
  },

  methods: {
    // 添加我的频道
    async onAddChannel (channel) {
      // 不可以直接修改父组件传递过来的参数，所以需要在data中拷贝一份，大家都去修改堆内存中的数据
      this.myChannelsClone.push(channel)

      // 数据持久化
      // 判断用户token来确定是否登录
      if (this.user.token) {
        // 已登录 - 掉接口
        try {
          await addUserChannelAPI({
            id: channel.id, // 需要添加的频道id
            seq: this.myChannels.length // 当前频道列表的长度
          })
          this.$toast('添加成功')
        } catch (error) {
          console.log(error)
          this.$toast('添加失败')
        }
      } else {
        // 未登录存本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },

    // 我的频道点击事件
    async onMyChannelClick (channel, index) {
      if (this.isEditShow) {
        // 页面是页面，逻辑是逻辑，做页面上的某个条件判断时，既需要该页面，也需要添加相应的代码逻辑
        // 如果索引为0，则是推荐频道，不可删除
        if (index === 0) {
          return
        }
        // 在编辑状态下删除频道
        this.myChannelsClone.splice(index, 1)

        // 判断删除的元素索引与当前激活状态的索引，来确定是否索引前移
        // 给`updateActive`事件添加新的参数，来确定是否需要关闭编辑弹出层
        if (index <= this.active) {
          this.$emit('updateActive', this.active - 1, true)
        }

        // 数据持久化 - 集成新增数据时的代码逻辑
        // 判断用户token来确定是否登录
        if (this.user.token) {
          // 已登录 - 掉接口
          try {
            await deleteUserChannelAPI(channel.id)
            this.$toast('删除成功')
          } catch (error) {
            console.log(error)
            this.$toast('删除失败')
          }
        } else {
          // 未登录存本地
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } else {
        // 在非编辑状态下，切换平道操作
        this.$emit('updateActive', index)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .van-cell__title {
    color: #333;
    font-size: 32px;
    line-height: 58px;
    height: 100%;
  }

  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }

  .channel-item {
    width: 160px;
    height: 85px;

    :deep(.van-grid-item__content) {
      background-color: #f5f5f6;
      // 设置属性让文本一行展示不自动提行
      white-space: nowrap;
      .text, .van-grid-item__text {
        color: #222;
        font-size: 28px;
        margin-top: 0;
      }

      // 高亮频道样式
      .active {
        color: red;
      }

      // 去除插槽父元素的相对定位
      .van-grid-item__icon-wrapper {
        position: unset;
      }

      // 图标的位置展示
      .van-icon-close {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }

  // 专门针对频道推荐设置+的布局
  .recommend-grid {
    :deep(.van-grid-item__content) {
      flex-direction: row;
      .van-icon-plus {
        font-size: 28px;
        margin-right: 6px;
      }
    }
  }
}
</style>
