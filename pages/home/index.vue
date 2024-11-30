<template>
	<homeComponent :titleTip="titleTip" :roleFunList="roleFunList" :basicFunList="basicFunList" @data-to-parent="handleDataFromChild"></homeComponent>
</template>

<script lang="ts" setup>
	import homeComponent from '@/components/home/index.vue'
	import { reactive } from 'vue';
	
	// 头部显示数据
	let titleTip = reactive({
		greetings:"",
		organization:"",
		identity:""
	})
	
	// 角色功能渲染数据
	let roleFunList = reactive([{
			url: '/static/c1.png',
			text: '个人信息'
		},
		{
			url: '/static/c2.png',
			text: '个人信息'
		},
		{
			url: '/static/c3.png',
			text: '个人信息'
		},
		{
			url: '/static/c4.png',
			text: '个人信息'
		},
		{
			url: '/static/c8.png',
			text: '个人信息'
		},
		{
			url: '/static/c8.png',
			text: '个人信息'
		},
		{
			url: '/static/c8.png',
			text: '个人信息'
		},
		{
			url: '/static/c9.png',
			text: '个人信息'
		}])
		
		// 基本功能模块渲染数据
		let basicFunList = reactive([{
			url: '/static/c1.png',
			text: '个人信息'
		},
		{
			url: '/static/c2.png',
			text: '关于学校'
		},
		{
			url: '/static/c3.png',
			text: '学校社团'
		},
		{
			url: '/static/c4.png',
			text: '退出登录'
		},
		{
			url: '/static/c8.png',
			text: '系统反馈'
		},
		{
			url: '/static/c8.png',
			text: '免责声明'
		}])
		
	// 定义一个函数来处理从子组件接收到的事件和数据
	function handleDataFromChild(data: { result:Object }){
		console.log("data",data);
		uni.navigateTo({
			url:"/pages/society-list/search"
		})
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #EDF3FC;
	}
</style>