import request from '../utils/request'

export const getUserMenu = (params) => {
	return request({
		url: '/home/getUserMenu',
		method: 'get',
		data: params,
        header: {} 
	})
}
