import axios from '../utils/request'
import qs from 'qs'

const getList = (params) => {
    return axios.get('/list/list?' + qs.stringify(params))
}

export {
    getList,
}
