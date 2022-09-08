<template>
  <div class="update-gender">
    <van-picker
      title="标题"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      :default-index="value"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import { updateUserProfileAPI } from '@/api/index'

export default {
  name: 'update-gender',
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  props: {
    value: {
      type: Number,
      default: 0
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
        const localGender = this.localGender
        await updateUserProfileAPI({
          gender: localGender
        })
        // 更新视图
        this.$emit('input', localGender)
        this.$emit('close')
        this.$toast('更新成功')
      } catch (e) {
        console.log(e)
        this.$toast('设置失败')
      }
    },
    onPickerChange (picker, value, index) {
      console.log(picker, value, index)
      this.localGender = index
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
