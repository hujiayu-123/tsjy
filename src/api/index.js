import axios from '../utils/request'
import qs from 'qs'

const api = {
  // 获取验证图形
  captcha(params) {
    return axios.get('/captcha/captcha?' + qs.stringify(params))
  },
  // 注册
  reg(data) {
    return axios.post('/register/reg', data)
  },
  // 登录
  login(data) {
    return axios.post('/login/login', data)
  },
  // 忘记密码
  resetPwdemail(params) {
    return axios.get('/login/reset-pwdemail?' + qs.stringify(params))
  },
  // 修改密码
  reset(data) {
    return axios.post('/login/reset',data)
  },
  // 分类列表
  catc(params) {
    return axios.get('/list/cata?'+ qs.stringify(params))
  },
  // 图书列表
  list(params) {
    return axios.get('/list/list?'+ qs.stringify(params))
  },
}

export default api


