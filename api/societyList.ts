import request from '../utils/request'

// 获取社团列表
export const getSocietyList = (params) => {
	return request({
		url: '/society/list/getSocietyList',
		method: 'get',
		data: params,
        header: {} 
	})
}

// 获取部门列表
export const getDepartmentById = (params) => {
	return request({
		url: '/society/list/getDepartmentById',
		method: 'get',
		data: params,
        header: {} 
	})
}

// 获取部门成员
export const getDepartmentUserById = (params) => {
	return request({
		url: '/society/list/getDepartmentUserById',
		method: 'get',
		data: params,
        header: {} 
	})
}
//根据用户id获取用户所在部门信息
export const getDepartmentUserDetailsById = (params) => {
	return request({
		url: '/society/list/getDepartmentUserDetailsById',
		method: 'get',
		data: params,
        header: {} 
	})
}