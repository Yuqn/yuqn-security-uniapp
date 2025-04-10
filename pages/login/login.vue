<template>
	<view class="back" :style="{height:height}">
		<view class="loginLogo" style="position: relative;">
			<!-- <image src="../../static/loginLogo.jpg"></image> -->
			<image src="../../static/image/bgThree.jpg"></image>
			<!-- 文字描述 -->
			<view style="position: absolute; top: 85rpx; left: 40rpx; width: 400rpx;height: 80rpx; ">
				<view style="margin-bottom: 10rpx;">
					<text style="color: #EDF3FC; font-size: 1.2rem; font-weight: 500;">请选择登录方式</text>
				</view>
			</view>
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
	import {onShow,onResize,onLoad} from '@dcloudio/uni-app'
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
	
	onLoad(()=>{
		uni.setStorageSync("token","")
		uni.setStorageSync("role","")
	})
	// onShow(()=>{
	// 	console.log('onShow')
	// 	uni.setStorageSync("token","")
	// 	uni.setStorageSync("role","")
	// 	console.log("uni.getSystemInfoSync()",uni.getSystemInfoSync())
	// 	getOne('11').then((res)=>{
	// 		console.log('res',res)
	// 	}).catch((err=>{
	// 		console.log
	// 	}))
	// })
	
</script>

<style lang="scss" scoped>
	page{
		background-color: #EDF3FC;
	}
	.back{
		width: 750rpx;
		// height: 140vh;
		// background-color: yellow;
		.loginLogo{
			width: 750rpx;
			height: 220rpx;
			image{
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
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