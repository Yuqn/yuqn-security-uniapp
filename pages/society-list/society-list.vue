<template>
	<societyList :societyListData="societyListData" @data-to-parent="handleDataFromChild"></societyList>
</template>

<script setup lang="ts">
	import societyList from '@/components/society/society-list.vue'
	import {reactive} from "vue";
	
	// 社团列表数据
	let societyListData = reactive([
		{
			id:"001",
			name:"舞蹈协会",
			createName:"余其楠",
			introduce:"1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111222222222222222222222222222222222111111111111",
			createTime:"2024年11月29日",
			chairman:"余其楠",
			vicePresident:"余其楠",
			membersCount:"100",
			departmentCount:"6"
		},
		{
			id:"002",
			name:"舞蹈协会",
			createName:"余其楠",
			introduce:"1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111222222222222222222222222222222222111111111111",
			createTime:"2024年11月29日",
			chairman:"余其楠",
			vicePresident:"余其楠",
			membersCount:"100",
			departmentCount:"6"
		},
		{
			id:"003",
			name:"舞蹈协会",
			createName:"余其楠",
			introduce:"1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111222222222222222222222222222222222111111111111",
			createTime:"2024年11月29日",
			chairman:"余其楠",
			vicePresident:"余其楠",
			membersCount:"100",
			departmentCount:"6"
		}
	])
	
	// 触发组件方法
	function handleDataFromChild(data: { result:Object }){
		console.log("data",data);
		uni.navigateTo({
			url:"/pages/404/index"
		})
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #EDF3FC;
	}
</style>