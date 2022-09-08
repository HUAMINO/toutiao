<template>
  <div class="update-name">
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      @click-right="onConfirm"
      @click-left="$emit('close')"
    />
<!--  输入框  -->
    <div class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfileAPI } from '@/api/index'
export default {
  name: 'update-name',
  data () {
    return {
      localName: this.value
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true,
        duration: 0
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        await updateUserProfileAPI({
          name: localName
        })
        // 更新视图
        this.$emit('input', localName)
        this.$emit('close')
        this.$toast('更新成功')
      } catch (e) {
        this.$toast('设置失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.update-name {
 .van-nav-bar {
   background-color: #FFFFFF;
   :deep(.van-nav-bar__title) {
     color: #1b1f23;
   }
 }
 .field-wrap {
    padding: 10px;
  }
}
</style>
