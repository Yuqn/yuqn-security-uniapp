import request from '../utils/request'

// 创建社团
export const societyMkdir = (params) => {
	return request({
		url: '/society/mkdir/societyMkdir',
		method: 'post',
		data: params,
        header: {} 
	})
}
