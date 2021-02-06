//封装axios的请求，返回重新封装的数据格式
//对错误的重新处理
import axios from 'axios'
import store from '../store/index'

import errorHandle from './errorHandle'
import publicConfig from '../config/index'
import { Col, Message } from 'element-ui';
import { Loading } from 'element-ui'

const CancelToken = axios.CancelToken

class HttpRequest {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
        //this.pending = {}
    }
    //获取内部配置
    getInsideConfig() {
        const config = {
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            timeout: 10000

        }
        return config
    }

    // removePending(key, isRequest = false) {
    //     if (this.pending[key] && isRequest) {
    //         this.pending[key]('取消重复请求')
    //     }
    //     delete this.pending[key]
    // }
    //设定拦截器获取axios的配置
    interceptors(instance) {
        //发送数据的请求拦截器
        instance.interceptors.request.use(function (config) {
            Loading.service({
                text: '加载中',
                background: 'rgba(0,0,0,.5)'
            });
            let isPublic = false
            publicConfig.publicPath.map((path) => {
                isPublic = isPublic || path.test(config.url)
            })
            const token = localStorage.getItem('token')
            if (!isPublic && token) {
                config.headers.authorization = 'Bearer ' + token
            }

            //let key = config.url + '&' + config.method
            // this.removePending(key, true)
            // config.cancelToken = new CancelToken((c) => {
            //     this.pending[key] = c
            // })
            //对请求的配置进行修改
            return config;
        }, function (error) {
            // 请求失败,请求超时
            errorHandle(error)
            return Promise.reject(error);
        });

        //响应请求拦截器 数据返回后的拦截器
        instance.interceptors.response.use((res) => {
            //对数据的封装
            //let key = res.config.url + '&' + res.config.method
            // this.removePending(key)
            let loadingInstance = Loading.service({
                text: '加载中'
            });
            setTimeout(() => {
                loadingInstance.close();
            },0)
            if (res.status === 200) {
                //promise.resolve
                return new Promise((resolve) => {
                    if(res.data.code === 200) {
                        resolve(res.data)
                    }else {
                        Message({
                            message: res.data.msg,
                            type: "warning",
                        });
                    }
                    
                });
            } else {
                //promise.reject
                return new Promise((resolve, reject) => {
                    reject(res)
                });
            }

        }, function (error) {
            //处理200以外的错误404,500...
            let loadingInstance = Loading.service({
                text: '加载中'
            });
            setTimeout(() => {
                loadingInstance.close();
            },0)
            errorHandle(error)
            return Promise.reject(error);
        });
    }
    //创建实例
    request(options) {
        const instance = axios.create()
        const newOptions = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance)
        //instance(newOptions)等价于instance.request方法
        return instance(newOptions)
    }
    get(url, config) {
        const options = Object.assign({
            method: 'get',
            url: url,
        }, config)
        return this.request(options)
    }
    post(url, data) {
        return this.request({
            method: 'post',
            url: url,
            data: data
        })
    }
}



export default HttpRequest