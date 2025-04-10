import request from '../utils/request'

// 新增部门成员获取部门成员列表
export const getDepartmentUserList = (params) => {
	return request({
		url: '/society/departmentManage/getDepartmentUserList',
		method: 'get',
		data: params,
        header: {} 
	})
}

// 新增部门用户
export const addDepartmentUser = (params) => {
	return request({
		url: '/society/departmentManage/addDepartmentUser',
		method: 'post',
		data: params,
        header: {} 
	})
}

// 解散部门
export const deleteDepartment = (params) => {
	return request({
		url: '/society/departmentManage/deleteDepartment',
		method: 'post',
		data: params,
        header: {} 
	})
}

// 获取社团详情
export const getDepartmentDetailsById = (params) => {
	return request({
		url: '/society/departmentManage/getDepartmentDetailsById',
		method: 'get',
		data: params,
        header: {} 
	})
}

// 获取部门用户列表
export const getDepartmentUserMember = (params) => {
	return request({
		url: '/society/departmentManage/getDepartmentUserMember',
		method: 'get',
		data: params,
        header: {} 
	})
}

// 更改部门信息
export const updateDepartment = (params) => {
	return request({
		url: '/society/departmentManage/updateDepartment',
		method: 'post',
		data: params,
        header: {} 
	})
}

// 将用户移出部门
export const deleteDepartmentUserById = (params) => {
	return request({
		url: '/society/departmentManage/deleteDepartmentUserById',
		method: 'post',
		data: params,
        header: {} 
	})
}

// 获取邀请码
export const getDepartmentCode = (params) => {
	return request({
		url: '/society/departmentManage/getDepartmentCode',
		method: 'get',
		data: params,
        header: {} 
	})
}

// 根据邀请码获取部门信息
export const getDepartmentDetailsByCode = (params) => {
	return request({
		url: '/society/departmentManage/getDepartmentDetailsByCode',
		method: 'get',
		data: params,
        header: {} 
	})
}

// 根据邀请码获取部门信息
export const joinDepartment = (params) => {
	return request({
		url: '/society/departmentManage/joinDepartment',
		method: 'post',
		data: params,
        header: {} 
	})
}

