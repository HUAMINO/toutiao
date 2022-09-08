import { request } from '@/utils/request'

/**
 * 用户登录
 *
 * @params mobile 手机号
 * @params code 验证码
 */
export const login = data => request({
  method: 'POST',
  url: '/v1_0/authorizations',
  data
})
/**
 * 发送验证码
 *
 * @params mobile 手机号
 */
export const getSmsCode = mobile => request({
  method: 'GET',
  url: `/v1_0/sms/codes/${mobile}`
})

/**
 * 获取用户本人信息
 *
 */
export const getUserInfo = () => request({
  method: 'GET',
  url: '/v1_0/user'
  // headers: {
  //   // token的数据格式注意，Bearer 后面有个空格
  //   Authorization: `Bearer ${store.state.user.token}`
  // }
})

/**
 * 获取用户频道列表
 *
 */
export const getUserChannels = () => request({
  method: 'GET',
  // url: '/v1_0/channels'
  url: '/v1_0/user/channels'
})

/**
 * 关注用户
 */
export const addFollow = target => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target
    }
  })
}

/**
 * 取消关注用户
 */
export const deleteFollow = target => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${target}`
  })
}

/**
 * 获取当前登录用户的个人资料
 */
export const getUserProfile = target => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}

/**
 * 更新用户资料
 */
export const updateUserProfile = data => {
  return request({
    method: 'PATCH',
    url: '/v1_0/user/profile',
    data
  })
}
