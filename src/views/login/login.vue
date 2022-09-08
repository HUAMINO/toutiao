<template>
  <div class="login-container">
    <!--  导航样式  -->
    <van-nav-bar
      title="登录"
      class="page-nav"
    >
      <template #left>
        <van-icon name="cross" @click="$router.back()"/>
      </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        label="手机号"
        placeholder="手机号"
        :rules="userFormRules.mobile"
      >
        <!-- slot老式写法 -->
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        type="password"
        name="code"
        label="验证码"
        placeholder="验证码"
        :rules="userFormRules.code"
      >
        <!-- slot新式写法 -->
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>

        <template #button>
          <van-count-down v-if="isCountDownShow" :time="1000 * 10" format=" ss s" @finish="isCountDownShow = false" />
          <van-button
            v-else
            round
            native-type="button"
            type="default"
            size="small"
            class="send-sms-btn"
          @click="onSendSms"
          >发送验证码</van-button>
        </template>
      </van-field>
        <!--  登录按钮   -->
      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit" class="submitBtn">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCodeAPI, loginAPI } from '@/api'
import { Toast } from 'vant'

export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit (values) {
      // console.log('submit', values)
    //  1.获取表单数据
      const user = this.user
      //  2.表单验证
      // 在组件中通过this.$toast 来调用Toast组件
      Toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁用背景点击
        duration: 2000 // 持续时间， 默认是2000
      })
      //  3.提交表单请求登录
      try {
        const { data } = await loginAPI(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (e) {
        this.$toast.success('登录失败')
      }
    //  4.根据请求响应结果
    },
    // 验证手记号
    async onSendSms () {
      try {
        //  1.校验手机号
        await this.$refs.loginForm.validate('mobile')
        console.log('ddd')
      } catch (e) {
        console.log(e)
      }
      //  2.验证通过， 显示倒计时
      this.isCountDownShow = true
      //  3.请求发送验证码
      try {
        await getSmsCodeAPI(this.user.mobile)
        this.$toast('发送成功')
      } catch (e) {
        // console.log('发送失败')
        this.isCountDownShow = false
        if (e.response.status === 429) {
          this.$toast('发送太频繁了')
        } else {
          this.$toast('发送失败，亲稍后宠幸')
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .submitBtn {
    background-color: #6db4fb;
    border: none;
  }

  .toutiao {
    font-size: 38px;
  }

  .send-sms-btn {
    background-color: #ededed;
    color: #666;
  }

  .page-nav {
    .van-icon-cross {
      color: #fff;
    }
  }
}
</style>
