<template>
  <div class="user-profile">
    <van-nav-bar
      class="van-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    >
      <template #left>
        <van-icon class="toutiao toutiao-zuojiantou" size="18" @click="$router.back()"/>
      </template>
    </van-nav-bar>
<!--  跟人信息  -->
    <van-cell title="头像" is-link>
      <van-image
        class="avatar"
        fit="cover"
        round
        :src="user.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isUpdateNameShow = true"
    ></van-cell>
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isUpdateGenderShow = true"
    >
    </van-cell>

    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isUpdateBirthdayShow = true"
    ></van-cell>
<!--  编辑昵称  -->
    <van-popup
      v-model="isUpdateNameShow"
      style="height: 100%"
      position="bottom"
    >
      <update-name
        v-if="isUpdateNameShow"
        @close="isUpdateNameShow = false"
        v-model="user.name"
      ></update-name>
    </van-popup>
    <!--   编辑性别   -->
    <van-popup
      v-model="isUpdateGenderShow"
      position="bottom"
    >
      <update-gender
        @close="isUpdateGenderShow = false"
        v-model="user.gender"
        v-if="isUpdateGenderShow"
      ></update-gender>
    </van-popup>
    <!--   编辑生日   -->
    <van-popup
      v-model="isUpdateBirthdayShow"
      position="bottom"
    >
      <update-birthdaty
        v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
        @close="isUpdateBirthdayShow = false"
      ></update-birthdaty>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfileAPI } from '@/api/index'
import UpdateName from '@/views/user-profile/components/update-name'
import UpdateGender from '@/views/user-profile/components/update-gender'
import UpdateBirthdaty from '@/views/user-profile/components/update-birthdaty'
export default {
  name: 'user-profile',
  data () {
    return {
      user: {},
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfileAPI()
        console.log(data)
        this.user = data.data
      } catch (e) {
        this.$toast('获取数据失败')
      }
    }
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthdaty
  }
}
</script>

<style lang="less" scoped>
.user-profile {
  :deep( .van-nav-bar .van-icon ) {
    color: #fff !important;
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
