<template>
  <div class="update-birthdaty">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfileAPI } from '@/api/index'
import dayjs from 'dayjs'
export default {
  name: 'update-birthdaty',
  data () {
    return {
      minDate: new Date(1945, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(this.value)
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
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await updateUserProfileAPI({
          birthday: currentDate
        })
        // 更新视图
        this.$emit('input', currentDate)
        this.$emit('close')
        this.$toast('更新成功')
      } catch (e) {
        console.log(e)
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
