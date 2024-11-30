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
			<view style="width: 400rpx; margin: auto;">
				<uni-data-select
					v-model="value"
					:localdata="range"
					@change="change"
					:clear="false"
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
	import {onResize} from '@dcloudio/uni-app';
	
	// 定义屏幕高度
	const height = ref("");
	
	const value= ref("0")
	const range=reactive([
	  { value: 0, text: "篮球" },
	  { value: 1, text: "足球" },
	  { value: 2, text: "游泳" },
	])
	
	// 跳转
	function sendDataToParent(){
		uni.redirectTo({
			url:'/pages/home/index'
		})
		console.log("tiaoz1")
	}
	
	// 选择角色
	function change(e){
		console.log("e:", e);
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