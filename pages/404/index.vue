<template>
	<view class="back" :style="{height:height}"> 
		<view class="fault white">
		  <view>
			<image class="fault__logo fault__item" src="/static/image/404logoTwo.svg" mode=""></image>
		  </view>
		  <!-- <view class="fault__code fault__item">404</view> -->
		  <view class="fault__tip fault__item">抱歉！您访问的页面不存在！</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import {ref} from "vue";
	import {onResize} from '@dcloudio/uni-app'
	
	// 定义屏幕高度
	const height = ref("");
	
	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		success: info => height.value = info.windowHeight - 44 + "px"
	});
</script>

<style lang="scss" scoped>
	page{
		background-color: #EDF3FC;
	}
	.back{
		width: 750rpx;
		// background-color: #EDF3FC;
	}
	.fault {
	  padding-top: 184rpx;
	  .fault__logo {
		width: 500rpx;
		height:500rpx;
		display: block;
		margin: 20rpx auto 40rpx;
	  }
	  .fault__code {
		font-size: 112rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #71aaf5;
	  }
	  .fault__tip {
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #71aaf5;
	  }
	  .fault__item{
		text-align: center;
		margin-bottom: 87rpx;
	  }
	}
</style>