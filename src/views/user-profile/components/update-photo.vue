<template>
  <div class="update-photo">
    <img class="img" ref="img" :src="img" alt="">
    <div class="toolbar">
      <div class="cancel" @click="$emit('close')">取消</div>
      <div class="confirm" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhotoAPI } from '@/api/index'

export default {
  name: 'update-photo',
  data () {
    return {
      cropper: null
    }
  },
  props: {
    img: {
      type: String,
      default: ' '
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
        this.cropper.getCroppedCanvas().toBlob(async (blob) => {
          this.updateUserPhoto(blob)
        })
      } catch (e) {
        console.log(e)
        this.$toast('设置失败')
      }
    },
    async updateUserPhoto (blob) {
      try {
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await updateUserPhotoAPI(formData)
        this.$emit('close')
        this.$emit('update-photo', data.data.photo)
        this.$toast('更新成功')
      } catch (e) {
        console.log(e)
        this.$toast('更新失败')
      }
    }

  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 定义裁剪模式，0：裁剪框可以扩展到画布外， 1,2,3会将裁剪框限制在画布内
      dragMode: 'move', // 拖动模式 move: 移动画布
      aspectRatio: 1, // 截图比例, 1:1可以简写为1
      cropBoxMovable: false, // 截图区域是否可以移动
      cropBoxResizable: false, // 截图区的缩放功能
      background: false, // 是否显示默认背景
      movable: true // 背景图片是否可以移动，默认true
    })
    console.log(this.cropper)
  }
}
</script>

<style lang="less" scoped>
.update-photo {
  background-color: #000;
  height: 100%;
  .toolbar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    .cancel, .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #FFFFFF;
    }
  }
  .img {
    display: block;
    max-width: 100%;
  }
}
</style>
