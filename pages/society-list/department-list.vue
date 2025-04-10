<template>
	<departmentList :menuType="menuType" :departmentListData="departmentListData" @data-to-parent="handleDataFromChild" v-if="isOk=='1'"></departmentList>
</template>

<script lang="ts" setup>
	import departmentList from '@/components/department/department-list.vue'
	import {reactive,ref} from "vue";
	import {onLoad} from '@dcloudio/uni-app'
	import {getDepartmentById} from '../../api/societyList'
	
	// 定义数据，区分是部门管理还是查询功能所调用的组件，确保组件渲染内容,societyList,departmentManage
	let menuType = reactive({moduleType:"societyList"})
	
	// isOk
	let isOk = ref("0")
	
	// 社团列表数据
	let departmentListData = reactive([])
	
	// 获取社团id
	let societyId = ref("")
	
	onLoad((options)=>{
		societyId.value = options.societyId
		let params = reactive({
			"societyId" : options.societyId
		});
		getDepartmentById(params).then(res=>{
			if(res.code == 200){
				console.log("结果",res)
				departmentListData = res.result
				isOk.value = "1"
			}else{
				console.log("查找失败");
			}
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
			// isOk.value = "0"
		})
	})
	
	// 触发组件方法
	function handleDataFromChild(data: { result:Object }){
		uni.navigateTo({
			url:`/pages/society-list/member-list?departmentId=${encodeURIComponent(JSON.stringify(data.result.id))}&societyId=${encodeURIComponent(JSON.stringify(societyId.value))}`
		})
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #EDF3FC;
	}
</style>