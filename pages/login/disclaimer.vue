<template>
	<view class="back" :style="{height:height}">
		<view class="loginLogo">
			<image src="../../static/image/disclaimerLogo.png"></image>
		</view>
		<view class="disclaimerText">
			<view class="textSty">
				<text>使用须知</text>
			</view>
			<scroll-view class="centSty" scroll-y="true" scroll-top>
				<text>
					授权人及被授权人在网上授权查询前须仔细阅读本须知：\n\n					一、网上授权查询采用实名制，授权人及被授权人必须持中华人民共和国居民身份证办理。\n\n					二、本查询范围为广州市辖区范围内不动产登记结果信息。\n\n					三、网上授权查询必须填写《不动产登记质量网上授权查询申请书》。\n\n					四、网上授权查询后，被授权人可以在授权时限内在线下载查询结果并加盖查询电子印章，查询结果与不动产登记资料查询窗口出具的查询证明信息一致，法律效力均等。\n\n					五、授权人承诺自愿授权他人查询其不动产登记信息，并承担由此产生的法律后果。\n\n					六、授权人阅读并勾选“确认授权”后，视为同意授权被授权人查询其不动产登记信息。\n\n
				</text>
			</scroll-view>
			<view class="bottomSty">
				<checkbox-group @change="checkboxChange">
					<label>
						<checkbox value="check" color="#3376eb" style="transform:scale(0.6)"/>我已阅读并同意
					</label>
				</checkbox-group>
			</view>
		</view>
		<view class="buttonSty">
			<button type="primary" @click="goLogin()">确认</button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {ref} from "vue";
	import {onResize,onLoad} from '@dcloudio/uni-app';
	import {IsCheck,IdentityCode} from '../../utils/enums'
	
	// 定义屏幕高度
	const height = ref("");
	// 定义是否勾选，默认否
	const isAgree = ref(IsCheck.NO);
	// 用户定义类型,0为学生，1为老师，-1为其他
	const identityCode = ref(IdentityCode.ORDER);
	// 接受页面参数
	onLoad((option)=>{
		identityCode.value = JSON.parse(decodeURIComponent(option.identityCode));
	})
	// 跳转登录界面
	function goLogin(){
		if(isAgree.value == IsCheck.YES && identityCode.value == IdentityCode.STUDENT){
			// console.log("准备跳转学生登录界面")
			uni.navigateTo({url: '/pages/login/student/index?identityCode=' + encodeURIComponent(JSON.stringify(IdentityCode.STUDENT))})
			console.log("准备跳转学生登录界面")
		}else if(isAgree.value == IsCheck.YES && identityCode.value == IdentityCode.TEACHER){
			uni.navigateTo({url:'/pages/login/teacher/index?identityCode=' + encodeURIComponent(JSON.stringify(IdentityCode.STUDENT))})
			console.log("准备跳转老师登录界面")
		}
		else{
			console.log("请勾选同意选项");
		}
	};
	// 监听是否勾选同意
	function checkboxChange(e){
		if(e.detail.value.length){
			isAgree.value = IsCheck.YES;
		}else{
			isAgree.value = IsCheck.NO;
		}
	}
	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		success: info => height.value = info.windowHeight - 44 + "px"
	});
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
		.loginLogo image{
			width: $widthrpx;
			height: 210rpx;
		}
		.disclaimerText{
			width: $widthrpx;
			display: flex; 
			flex-direction: column;
			flex-grow: 1;
			.textSty{
				height: 90rpx;
				width: $widthrpx;
				text-align: center;
				line-height: 90rpx;
				font-size: 40rpx;
				color: #0A6DEC;
			}
			.centSty{
				width: 680rpx;
				height: 100%;
				margin: auto;
				font-size: 26rpx;
			}
			.bottomSty{
				font-size: 22rpx;
				width: $widthrpx;
				height: 80rpx;
				line-height: 80rpx;
				border-top: white 1rpx solid ;
				color: #3376eb;
			}
		}
		.buttonSty{
			width: 660rpx;
			height: 120rpx;
			padding-top: 20rpx;
			margin: auto;
		}
	}
	
</style>