<template>
	<view class="back" :style="{height:height}">
		<memberList v-if="isOk=='1'">
			<view style="width: 90%; margin: auto;">
				<uni-list-item :title= "item.name + '(' + item.userName + ')'"
					:note="item.name == '教师'?'管理员':item.college"
					thumb="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
					thumb-size="lg" :rightText="'职位：' + item.role" clickable  @click="onClick(item.id,item.roleId)" style="margin-bottom: 5rpx;"
					v-for="(item,key) in memberListData" :index="key" :key="item.id" >
				</uni-list-item>
			</view>
		</memberList>
	</view>
</template>

<script lang="ts" setup>
	import {ref,reactive} from "vue";
	import {onResize,onLoad} from '@dcloudio/uni-app'
	import memberList from '@/components/member/index.vue'
	import {getDepartmentUserById} from '../../api/societyList'
	
	// 定义屏幕高度
	const height = ref("");
	
	// isOk
	let isOk = ref("0")
	
	// 定义数据集
	let memberListData = reactive([])
	
	// 定义变量获取
	let societyId = ref("")
	let departmentId = ref("")
	
	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		success: info => height.value = info.windowHeight  - 44 + "px"
	});
	
	// onload函数
	onLoad((option)=>{
		societyId.value = JSON.parse(decodeURIComponent(option.societyId));
		departmentId.value = JSON.parse(decodeURIComponent(option.departmentId));
		let params = reactive({
			"departmentId" : departmentId.value
		});
		getDepartmentUserById(params).then(res=>{
			if(res.code == 200){
				console.log("结果",res)
				memberListData = res.result
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
	
	// 点击事件
	function onClick(e,roleId){
		// 管理员不看详情
		if(e == '2'){
			return;
		}
		uni.redirectTo({
			url:`/pages/society-list/member-detail?departmentId=${encodeURIComponent(JSON.stringify(departmentId.value))}&societyId=${encodeURIComponent(JSON.stringify(societyId.value))}&userId=${encodeURIComponent(JSON.stringify(e))}&userRoleId=${encodeURIComponent(JSON.stringify(roleId))}`
		})
	}
	
</script>

<style lang="scss" scoped>
	page{
		background-color: #EDF3FC;
	}
	.back{
		width: 100%;
	}
</style>