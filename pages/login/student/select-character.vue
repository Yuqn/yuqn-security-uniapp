<template>
	<view class="back" :style="{height:height}">
		<view class="centSty centTitleSty">
			<text class="centTitleTextSty">选择角色</text>
		</view>
		<view class="centSty centTipSty">
			<text class="centTipTextSty">
				下列为你所拥有身份，\n 
				请选择一个角色身份进入系统！
			</text>
		</view>
		<view class="centSty">
			<view style="width: 550rpx; margin: auto;">
				<uni-data-select
					v-model="value"
					:localdata="range"
					@change="change"
					:clear="false"
					v-if="isOk == '1'"
				></uni-data-select>
			</view>
		</view>
		<view class="buttonSty">
			<button type="primary" @click="sendDataToParent">确认</button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {reactive, ref} from "vue";
	import {onResize,onLoad} from '@dcloudio/uni-app';
	import {getRole} from '../../../api/login'
	
	// 定义屏幕高度
	let height = ref("");
	
	let value= ref(0)
	
	let range =reactive([])
	
	let isOk = ref('0')
	
	// 跳转
	function sendDataToParent(){
		uni.setStorageSync("userRole",range[value.value].other)
		uni.setStorageSync("userIdentity",encodeURIComponent(JSON.stringify(range[value.value].text)))
		uni.redirectTo({
			url:`/pages/home/index`
		})
	}
	
	// 选择角色
	function change(e){
		value.value = e
    }

	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		success: info => height.value = info.windowHeight - 44 + "px"
	});
	
	// 获取用户对应角色列表
	onLoad(()=>{
		getRole().then((res)=>{
			if(res.code == 200){
				// 合并所有角色数组
				let allRoles = [...res.result.societyRole, ...res.result.otherRole, ...res.result.departmentRole];
				// 转换并去重（基于 roleId）
				range.splice(0, range.length)
				allRoles.forEach((value, index, array)=>{
					let newBodyName = ' '
					let newDepartmentName = ' '
					let newValue = ' '
					
					// 拼接基本渲染数据
					if(value.bodyName == null ){
						newBodyName = '*'
					}else{
						newBodyName = value.bodyName
					}
					if(value.departmentName == null ){
						newDepartmentName = '-*'
					}else{
						newDepartmentName = '-' + value.departmentName
					}
					if(value.roleName == "teacher"){value.roleName = '-教师'}
					if(value.roleName == "chairman"){value.roleName = '-主席'}
					if(value.roleName == "vice_chairman"){value.roleName = '-副主席'}
					if(value.roleName == "minister"){value.roleName = '-部长'}
					if(value.roleName == "vice_minister"){value.roleName = '-副部长'}
					if(value.roleName == "member"){value.roleName = '-干事'}
					if(value.roleName == "student"){value.roleName = '-学生'}
					newValue = newBodyName + newDepartmentName + value.roleName
					// 拼接其他绑定数据
					let orderPerson = {
					    societyBodyId: '',
					    departmentId: '',
						roleId: ''
					};
					if(value.societyBodyId == null ){
						orderPerson.societyBodyId = ''
					}else{
						orderPerson.societyBodyId = value.societyBodyId
					}
					if(value.departmentId == null ){
						orderPerson.departmentId = ''
					}else{
						orderPerson.departmentId = value.departmentId
					}
					orderPerson.roleId = value.roleId
					let person = {
					    value: index,
					    text: newValue,
						other: orderPerson
					};
					range.push(person)
				})
			}
			value.value = 0
			isOk.value = '1'
		}).catch((err)=>{
			console.log(err)
		})
	})

	
</script>

<style lang="scss" scoped>
	$widthrpx: 750rpx;
	page{
		background-color: #EDF3FC;
	}
	.back{
		background-color: #EDF3FC;
		width: $widthrpx;
		display: flex;
		flex-direction: column;
		.centSty{
			// border: 1rpx solid yellow;
			width: $widthrpx;
			text-align: center;
			// height: 80%;
			// flex-grow: 1;
		}
		.centTitleSty{
			margin-top: 70rpx;
			margin-bottom: 30rpx;
			.centTitleTextSty{
				font-size: 1.8rem; 
				line-height: 150rpx; 
				font-weight: 600; 
				height: 150rpx;
			}
		}
		.centTipSty{
			height: 100rpx;
			// border: 1px solid yellow;
			margin-bottom: 30rpx;
			.centTipTextSty{
				 color: #c8cdd4; 
				 font-size: 0.8rem;
			}
		}
		.buttonSty{
			// border: 1rpx solid yellow;
			width: 660rpx;
			height: 100rpx;
			padding-top: 20rpx;
			margin: 80rpx auto ;
		}
	}
	
</style>