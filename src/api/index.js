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
  // 图书详情
  detail(params) {
    return axios.get('/list/detail?'+ qs.stringify(params))
  },
  // 添加购物车
  shop(data) {
    return axios.post('/order/shop',data)
  },
  // 删除购物车
  del(params) {
    return axios.get('/order/del?'+ qs.stringify(params))
  },
  // 购物车列表
  shoplist(params) {
    return axios.get('/order/shoplist?'+ qs.stringify(params))
  },
  // 添加地址
  addAddress(data) {
    return axios.post('/users/add-address',data)
  },
  // 修改地址
  editAddress(data) {
    return axios.post('/users/update-address',data)
  },
  // 删除地址
  delAddress(data) {
    return axios.post('/users/del-address',data)
  },
  // 获取地址
  address(params) {
    return axios.get('/users/address?'+ qs.stringify(params))
  },
  // 下单
  addOrder(data) {
    return axios.post('/order/add-order',data)
  },
  // 订单详情
  orderList(params) {
    return axios.get('/order/orderlist?'+ qs.stringify(params))
  },
  // 取消订单
  drawOrder(data) {
    return axios.post('/order/draw-order',data)
  },
  // 获取支付二维码
  qrCode(params) {
    return axios.get('/captcha/qr-code?'+ qs.stringify(params))
  },
  // 支付成功
  scan(params) {
    return axios.get('/captcha/scan?'+ qs.stringify(params))
  },
  // 图片上传
  upload(data) {
    return axios.post('/upload/upload',data)
  },
  // 修改个人信息
  basic(data) {
    return axios.post('/users/basic',data)
  },
  // 评价晒图列表
  pstateorder(params) {
    return axios.get('/order/pstateorder?'+ qs.stringify(params))
  },
  // 添加评价
  addComment(data) {
    return axios.post('/comment/add-comment',data)
  },
  // 获取评价列表
  getComment(params) {
    return axios.get('/comment/getcomment?'+ qs.stringify(params))
  },
}

export default api


