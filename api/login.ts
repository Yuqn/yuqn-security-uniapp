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
// 教师登录接口
export const teacherLogin = (params) => {
	return request({
		url: '/society/teacherLogin',
		method: 'post',
		data: params,
        header: {} 
	})
}
// 查询是否用户已经注册
export const isRegister = (params) => {
	return request({
		url: '/society/isRegister',
		method: 'get',
		data: params,
        header: {} 
	})
}
// 更改密码
export const changePassword = (params) => {
	return request({
		url: '/society/changePassword',
		method: 'post',
		data: params,
        header: {} 
	})
}

// 获取用户所有角色
export const getRole = () => {
	return request({
		url: '/society/getRole',
		method: 'get',
		header: {} 
	})
}

// 退出登录
export const logout = () => {
	return request({
		url: '/society/logout',
		method: 'post',
        header: {} 
	})
}

// 获取用户详细信息
export const getUserDetail = () => {
	return request({
		url: '/society/getUserDetail',
		method: 'get',
		header: {} 
	})
}

// 更改用户信息param
export const updateUser = (params) => {
	return request({
		url: '/society/updateUser',
		method: 'post',
		data: params,
		header: {} 
	})
}
