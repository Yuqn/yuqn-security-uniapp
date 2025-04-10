import request from '../utils/request'

// 获取社团用户列表
export const getSocietyUserList = (params) => {
	return request({
		url: '/society/manage/getSocietyUserList',
		method: 'get',
		data: params,
        header: {} 
	})
}

// 获取社团详情
export const getSocietyDetails = (params) => {
	return request({
		url: '/society/manage/getSocietyDetails',
		method: 'get',
		data: params,
        header: {} 
	})
}

// 提交社团更改
export const societyUpdate = (params) => {
	return request({
		url: '/society/manage/societyUpdate',
		method: 'post',
		data: params,
        header: {} 
	})
}

// 获取社团列表
export const getSocietyDetailsById = (params) => {
	return request({
		url: '/society/manage/getSocietyDetailsById',
		method: 'get',
		data: params,
        header: {} 
	})
}

// 新增部门
export const addDepartment = (params) => {
	return request({
		url: '/society/manage/addDepartment',
		method: 'post',
		data: params,
        header: {} 
	})
}

// 解散社团
export const deleteDepartment = (params) => {
	return request({
		url: '/society/manage/deleteDepartment',
		method: 'post',
		data: params,
        header: {} 
	})
}

// 获取社团成员列表，用于社团更改操作
export const getSocietyUserListForUpdate = (params) => {
	return request({
		url: '/society/manage/getSocietyUserListForUpdate',
		method: 'get',
		data: params,
        header: {} 
	})
}
