<template>
	<view class="back" :style="{height:height}">
		<view class="loginLogo">
			<image src="../../static/loginLogo.jpg"></image>
		</view>
		<view class="identitySelection">
			<view class="identitySelectionSty studentIdentity" @click="goDisclaimer(IdentityCode.STUDENT)" > 
				<view class="identitySelectionViewImgSty" >
					<image class="identitySelectionImgSty" src="../../static/image/teacherLoginLogo.svg" ></image>
				</view>
				<view class="identitySelectionViewTipSty">
					<text class="identitySelectionTipSty">进入学生登录 </text>
				</view>
			</view>
			<view class="identitySelectionSty teacherIdentity" @click="goDisclaimer(IdentityCode.TEACHER)"> 
				<view class="identitySelectionViewImgSty" >
					<image class="identitySelectionImgSty" src="../../static/image/studentLoginLogo.svg"></image>
				</view>
				<view class="identitySelectionViewTipSty">
					<text class="identitySelectionTipSty">进入教师登录</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {ref} from "vue";
	import {onShow,onResize} from '@dcloudio/uni-app'
	// import {IdentityCode} from '../../utils/enums'
	import {IdentityCode} from '@/utils/enums'
	// import {getOne} from '../../api/login'
	import {getOne} from '@/api/login'
	
	// 定义用户身份IDENTITYCODE，0为学生，1为教师
	// const IDENTITYCODE = ref({
	// 	STUDENT: '0',
	// 	TEACHER: '1'
	// })
	
	// 定义屏幕高度
	const height = ref("");
	
	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		success: info => height.value = info.windowHeight - 44 + "px"
	});
	
	function goDisclaimer(even:string){
		console.log(even);
		uni.navigateTo({url: '/pages/login/disclaimer?identityCode=' + encodeURIComponent(JSON.stringify(even))});
	}
	onShow(()=>{
		console.log('onShow')
		uni.setStorageSync("token","")
		getOne('11').then((res)=>{
			console.log('res',res)
		}).catch((err=>{
			console.log
		}))
	})
	
</script>

<style lang="scss" scoped>
	.back{
		background-color: #EDF3FC;
		width: 750rpx;
		height: 100vh;
		.loginLogo image{
			width: 750rpx;
			height: 230rpx;
		}
		.identitySelection{
			.identitySelectionSty{
				width: 650rpx;
				height: 240rpx;
				margin: auto;
				margin-top: 15rpx;
				border-radius: 10rpx 10rpx 10rpx 10rpx;
				display: flex;
				.identitySelectionViewImgSty{
					width: 230rpx; 
					height: 100%;
					.identitySelectionImgSty{
						width: 150rpx; 
						height: 130rpx; 
						margin-top: 55rpx; 
						margin-left: 40rpx;
					}
				}
				.identitySelectionViewTipSty{
					flex-grow: 1;
					line-height: 80rpx; 
					text-align: center; 
					height: 80rpx; 
					margin-top: 80rpx; 
					color: #ffffff; 
					font-size: 1rem;
					.identitySelectionTipSty{
						margin-top: 50rpx;
					}
				}
			}
			.studentIdentity{
				background-color: #a3abf0;
			}
			.teacherIdentity{
				 background-color: #78aaf5; 
			}
		}
	}
</style>