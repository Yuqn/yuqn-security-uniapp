import request from '../utils/request'

export const getOne = (params) => {
	return request({
		url: '/sys/getOne',
		method: 'get',
		data: params,
        header: {} 
	})
}

export const registerUser = (params) => {
	return request({
		url: '/society/register',
		method: 'post',
		data: params,
        header: {} 
	})
}

// 获取班级数据，用于下拉框
export const getDataTree = () => {
	return request({
		url: '/society/getDataTree',
		method: 'get',
        header: {} 
	})
}
// 获取年级数据，用于下拉框
export const getDataGrade = () => {
	return request({
		url: '/society/getDataGrade',
		method: 'get',
        header: {} 
	})
}
// 用户登录接口
export const userLogin = (params) => {
	return request({
		url: '/society/userLogin',
		method: 'post',
		data: params,
        header: {} 
	})
}