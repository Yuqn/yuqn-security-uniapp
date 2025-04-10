<template>
	<view class="back" :style="{height:height}">
		<view style="width: 100%; height: 300rpx; margin-bottom: 30rpx;">
			<!-- <image src="/static/image/memberListLogo.svg" style="width: 100%; height: 100%;" mode="aspectFill"></image> -->
			<image src="/static/image/bgSevent.jpg" style="width: 100%; height: 100%;" mode="aspectFill"></image>
		</view>
		<view class="cardSty">
			<view class="cardTopSty" >
				<view class="cardTopLeftSty" >
					<text>成员信息</text>
				</view>
				<view class="tag-view cardTopRightSty">
					<view class="cardTopRightTipSty">
						<text>正常</text>
					</view>
				</view>
			</view>
			<uni-card :is-shadow="false" is-full class="cardBodySty" v-if="isOk == '1'">
				<uni-row class="demo-uni-row cardBodyRowSty">
					<uni-col :span="8">
						<view class="demo-uni-col dark">成员名字：</view>
					</uni-col>
					<uni-col :span="16">
						<view class="demo-uni-col light">{{userData.userNickName}}</view>
					</uni-col>
				</uni-row>
				<uni-row class="demo-uni-row cardBodyRowSty">
					<uni-col :span="8">
						<view class="demo-uni-col dark">学号：</view>
					</uni-col>
					<uni-col :span="16">
						<view class="demo-uni-col light">{{userData.userName}}</view>
					</uni-col>
				</uni-row>
				<uni-row class="demo-uni-row cardBodyRowSty">
					<uni-col :span="8">
						<view class="demo-uni-col dark">所属协会：</view>
					</uni-col>
					<uni-col :span="16">
						<view class="demo-uni-col light">{{userData.societyName}}</view>
					</uni-col>
				</uni-row>
				<uni-row class="demo-uni-row cardBodyRowSty">
					<uni-col :span="8">
						<view class="demo-uni-col dark">所属部门：</view>
					</uni-col>
					<uni-col :span="16">
						<view class="demo-uni-col light">{{userData.departmentName}}</view>
					</uni-col>
				</uni-row>
				<uni-row class="demo-uni-row cardBodyRowSty">
					<uni-col :span="8">
						<view class="demo-uni-col dark">加入时间：</view>
					</uni-col>
					<uni-col :span="16">
						<view class="demo-uni-col light">{{userData.joinTime}}</view>
					</uni-col>
				</uni-row>
				<uni-row class="demo-uni-row cardBodyRowSty">
					<uni-col :span="8">
						<view class="demo-uni-col dark">所属学院：</view>
					</uni-col>
					<uni-col :span="16">
						<view class="demo-uni-col light">{{userData.userCollege}}</view>
					</uni-col>
				</uni-row>
				<uni-row class="demo-uni-row cardBodyRowSty">
					<uni-col :span="8">
						<view class="demo-uni-col dark">所在专业：</view>
					</uni-col>
					<uni-col :span="16">
						<view class="demo-uni-col light">{{userData.userMajor}}</view>
					</uni-col>
				</uni-row>
				<uni-row class="demo-uni-row cardBodyRowSty">
					<uni-col :span="8">
						<view class="demo-uni-col dark">所在年级：</view>
					</uni-col>
					<uni-col :span="16">
						<view class="demo-uni-col light">{{userData.userGrade}}</view>
					</uni-col>
				</uni-row>
				<uni-row class="demo-uni-row cardBodyRowSty">
					<uni-col :span="8">
						<view class="demo-uni-col dark">所在班级：</view>
					</uni-col>
					<uni-col :span="16">
						<view class="demo-uni-col light">{{userData.userClass}}</view>
					</uni-col>
				</uni-row>
				<uni-row class="demo-uni-row cardBodyRowSty">
					<uni-col :span="8">
						<view class="demo-uni-col dark">手机号码：</view>
					</uni-col>
					<uni-col :span="16">
						<view class="demo-uni-col light">{{userData.phoneNumber}}</view>
					</uni-col>
				</uni-row>
				
				<view class="cardBodyDetailsRowSty">
					<button class="cardBodyDetailsBtnRowSty" style="background-color: #ec8b89;" @click="deleteUser()"
					v-if="isDeleteBtn == '1'">移出部门</button>
					<button class="cardBodyDetailsBtnRowSty" @click="clickFun()">返回列表</button>
				</view>
			</uni-card>
		</view>
	</view>
	<view>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="1000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script lang="ts" setup>
	import {ref,reactive} from "vue";
	import {onResize,onLoad} from '@dcloudio/uni-app'
	import {getDepartmentUserDetailsById} from '../../api/societyList'
	import {deleteDepartmentUserById} from '../../api/departmentManage'
	
	// 定义屏幕高度
	const height = ref("");
	
	// 提示弹窗属性
	let msgType = ref("success")
	let messageText = ref("这是一条成功提示")
	const message = ref(null)
	
	// 定义变量获取
	let societyId = ref("")
	let departmentId = ref("")
	let userDetailRoleId = ref("")
	let isDeleteBtn = ref("0")
	let userId = ref("")
	
	// isOk
	let isOk = ref('0')
	
	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		success: info => height.value = info.windowHeight  - 44 + "px"
	});
	
	// 渲染数据
	let userData = reactive({})
	
	// 提示弹窗,type:success表示成功
	function messageToggle(type,msg) {
		msgType.value = type;
		messageText.value = msg;
		message.value.open()
	}
	
	// 初始化
	onLoad((option)=>{
		societyId.value = JSON.parse(decodeURIComponent(option.societyId));
		departmentId.value = JSON.parse(decodeURIComponent(option.departmentId));
		userDetailRoleId.value = JSON.parse(decodeURIComponent(option.userRoleId));
		userId.value = JSON.parse(decodeURIComponent(option.userId));
		// 只能移除干事成员，并且操作的人目前是该部门的人
		let userRole = uni.getStorageSync("userRole").roleId
		let userSocietyBodyId = uni.getStorageSync("userRole").societyBodyId
		let userDepartmentId = uni.getStorageSync("userRole").departmentId
		if(userRole == '3' && userDetailRoleId.value == '8'){
			isDeleteBtn.value = '1'
		}else if((userRole == '4' || userRole == '5') && (userSocietyBodyId == societyId.value) && (userDetailRoleId.value == '8')){
			isDeleteBtn.value = '1'
		}else if((userRole == '6' || userRole == '7') && (userDepartmentId == departmentId.value) && (userDetailRoleId.value == '8')){
			isDeleteBtn.value = '1'
		}else{
			isDeleteBtn.value = '0'
		}
		
		// if(userDetailRoleId.value == '8'){
		// 	isDeleteBtn.value = '1'
		// }
		// console.log("userDetailRoleId",userDetailRoleId.value)
		let roleId = uni.getStorageSync("userRole").roleId
		let params = reactive({
			"societyId":societyId.value,
			"departmentId":departmentId.value,
			"userId":JSON.parse(decodeURIComponent(option.userId)),
			"roleId":roleId
		})
		console.log("ee")
		getDepartmentUserDetailsById(params).then(res=>{
			if(res.code == 200){
				userData = res.result
				isOk.value = '1'
			}
		}).finally(()=>{})
	})
	
	// 移除
	function deleteUser(){
		let params = reactive({
			"departmentId": departmentId.value,
			"userId": userId.value
		})
		deleteDepartmentUserById(params).then(res=>{
			if(res.code == '200'){
				messageToggle("success","已将用户移除部门");
				setTimeout(()=>{
					uni.redirectTo({
						url:`/pages/society-list/member-list?departmentId=${encodeURIComponent(JSON.stringify(departmentId.value))}&societyId=${encodeURIComponent(JSON.stringify(societyId.value))}`
					})
				},1000)
			}
		}).finally(()=>{})
	}
	
	// 返回
	function clickFun(){
		uni.redirectTo({
			url:`/pages/society-list/member-list?departmentId=${encodeURIComponent(JSON.stringify(departmentId.value))}&societyId=${encodeURIComponent(JSON.stringify(societyId.value))}`
		})
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #EDF3FC;
	}
	.back{
		width: 100%;
		.cardSty{
			width: 87%;
			margin: 0rpx auto 20rpx;
			.cardTopSty{
				width: 100%; 
				height: 80rpx;
				background-color: #71aaf5; 
				display: flex;
				.cardTopLeftSty{
					height: 80rpx; 
					width: 70%; 
					line-height: 80rpx; 
					color: #ffffff; 
					font-size: 0.8rem; 
					margin-left: 30rpx;
				}
				.cardTopRightSty{
					flex-grow: 1; 
					display: flex; 
					justify-content: center;
					align-items: center;
					.cardTopRightTipSty{
						width: 100rpx;
						height: 45rpx; 
						background-color: #ffffff; 
						text-align: center; 
						line-height: 45rpx; 
						font-size: 0.7rem;
						color: #71aaf5; 
						border-radius: 5rpx;
					}
				}
			}
			.cardBodySty{
				height: 660rpx;
				.cardBodyRowSty{
					height: 40rpx; 
					line-height: 40rpx; 
					margin-bottom: 10rpx; 
					font-size: 0.8rem;
				}
				.cardBodyIntroduceRowSty{
					height: 170rpx; 
					line-height: 40rpx; 
					margin-bottom: 10rpx; 
					font-size: 0.8rem;
					border: 1rpx #d6dae2 solid;
					.cardBodyIntroduceScrollRowSty{
						width: 92%; 
						height: 130rpx; 
						margin: auto; 
						margin-top: 15rpx; 
						white-space: normal;
						word-wrap: break-word;
					}
				}
				.cardBodyDetailsRowSty{
					width: 100%; 
					height: 100rpx; 
					margin-top: 30rpx;
					display: flex;
					flex-wrap: wrap; /* 允许子盒子换行 */
					// gap: 10px;
					.cardBodyDetailsBtnRowSty{
						width: 170rpx; 
						height: 60rpx; 
						line-height: 60rpx; 
						margin-top: 10rpx; 
						// margin-right: 10rpx;
						font-size: 0.7rem; 
						background-color: #71aaf5; 
						color: #ffffff;
						// margin-left: 0;
					}
				}
			}
		}
	}
</style>