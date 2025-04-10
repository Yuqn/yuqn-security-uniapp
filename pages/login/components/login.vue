<template>
	<view class="back" :style="{height:height}">
		<view class="headSty" style="position: relative;">
			<image src="../../../static/image/loginLogo.png"></image>
			<!-- 文字描述 -->
			<view style="position: absolute; left: 50rpx; top: 77rpx; width: 400rpx;height: 120rpx; ">
				<view style="margin-bottom: 10rpx;">
					<text style="color: #EDF3FC; font-size: 1.2rem; font-weight: 500;">进行身份认证!!!</text>
				</view>
				<view>
					<text style="color: #EDF3FC; font-size: 0.8rem; font-weight: 500;">请输入信息验证您的身份信息</text>
				</view>
			</view>
		</view>
		<view class="centSty">
			<uni-card  margin="60rpx">
				<!-- <text class="uni-body">这是一个基础卡片示例，此示例展示了一个标题加标题额外信息的标准卡片。</text> -->
				<slot></slot>
			</uni-card>
		</view>
		<view class="buttonSty">
			<button type="primary" @click="sendDataToParent">确认</button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {ref} from "vue";
	import {onResize} from '@dcloudio/uni-app';
	
	// 定义屏幕高度
	const height = ref("");
	const emit = defineEmits<{
	      (e: 'data-to-parent', data: { message: string, value: number }): void;
	}>();
	// 定义一个函数来触发事件并传递数据
	function sendDataToParent(){
	  emit('data-to-parent', { message: 'Hello from Child', value: 42 });
	};

	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		success: info => height.value = info.windowHeight - 44 + "px"
	});
	
	// 向父组件传递数据
	function sendFormDate(){
		this.$emit('message-to-parent', 'Hello from Child using Options API!');
	}
	
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
		.headSty image{
			width: $widthrpx;
			height: 250rpx;
		}
		.centSty{
			width: $widthrpx;
			flex-grow: 1;
		}
		.buttonSty{
			width: 660rpx;
			height: 100rpx;
			padding-top: 20rpx;
			margin: auto;
		}
	}
	
</style>