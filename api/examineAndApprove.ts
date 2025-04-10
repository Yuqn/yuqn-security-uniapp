import request from '../utils/request'

// 获取社团用户列表
export const getExamineAndApprove = (params) => {
	return request({
		url: '/society/examineAndApprove/getExamineAndApprove',
		method: 'get',
		data: params,
        header: {} 
	})
}

// 驳回审批
export const rejectExamineAndApprove = (params) => {
	return request({
		url: '/society/examineAndApprove/rejectExamineAndApprove',
		method: 'post',
		data: params,
        header: {} 
	})
}

// 审批通过
export const passExamineAndApprove = (params) => {
	return request({
		url: '/society/examineAndApprove/passExamineAndApprove',
		method: 'post',
		data: params,
        header: {} 
	})
}

// 获取拒绝内容
export const getRejectList = (params) => {
	return request({
		url: '/society/examineAndApprove/getRejectList',
		method: 'get',
		data: params,
        header: {} 
	})
}

// 获取拒绝内容
export const getAllExamineAndApprove = () => {
	return request({
		url: '/society/examineAndApprove/getAllExamineAndApprove',
		method: 'get',
        header: {} 
	})
}
// 获取个人申请待审批内容
export const getApplicationRecordByUserId = (params) => {
	return request({
		url: '/society/examineAndApprove/getApplicationRecordByUserId',
		method: 'get',
		data:params,
        header: {} 
	})
}

// 获取个人申请待审批内容
export const getApplicationRecordDetails = (params) => {
	return request({
		url: '/society/examineAndApprove/getApplicationRecordDetails',
		method: 'get',
		data:params,
        header: {} 
	})
}

// 获取个人已经申请通过的记录
export const getApplicationRecordPassByUserId = (params) => {
	return request({
		url: '/society/examineAndApprove/getApplicationRecordPassByUserId',
		method: 'get',
		data:params,
        header: {} 
	})
}

// 获取个人已经申请通过的详细记录
export const getApplicationRecordPassDetails = (params) => {
	return request({
		url: '/society/examineAndApprove/getApplicationRecordPassDetails',
		method: 'get',
		data:params,
        header: {} 
	})
}

// 获取个人已经申请被拒绝的记录
export const getApplicationRecordNoPassByUserId = (params) => {
	return request({
		url: '/society/examineAndApprove/getApplicationRecordNoPassByUserId',
		method: 'get',
		data:params,
        header: {} 
	})
}

// 获取个人已经申请被拒绝的记录
export const getApplicationRecordNoPassDetails = (params) => {
	return request({
		url: '/society/examineAndApprove/getApplicationRecordNoPassDetails',
		method: 'get',
		data:params,
        header: {} 
	})
}

// 获取个人已经申请被拒绝的记录
export const getApplicationRecordTop = () => {
	return request({
		url: '/society/examineAndApprove/getApplicationRecordTop',
		method: 'get',
        header: {} 
	})
}
