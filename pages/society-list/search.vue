<template>
	<view class="back" :style="{height:height}">
		<view class="tipHeadSty">
			<text>输入搜索</text>
		</view>
		<view class="tipCenterSty">
			<text>请输入需要查找的社团名称进行检索</text>
		</view>
		<view class="tipBottomSty">
			<text>可支持模糊检索</text>
		</view>
		<view class="searchViewSty">
			<uni-forms class="searchViewFormSty" ref="valiForm">
				<uni-forms-item>
					<input class="uni-input" v-model="searchValue" focus placeholder="输入搜索" />
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="searchBtnSty">
			<button type="primary" @click="submit(searchValue)" style="font-size: 0.9rem; height: 90rpx; line-height: 90rpx;">社团检索</button>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import {ref,reactive} from "vue";
	import {onResize} from '@dcloudio/uni-app'
	
	// 定义屏幕高度
	const height = ref("");
	
	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		success: info => height.value = info.windowHeight - 44 + "px"
	});
	
	// 定义搜索列表
	let searchValue = ref("");
	
	// 提交表单
	function submit(e){
		console.log("e",e)
		uni.navigateTo({
			url:`/pages/society-list/society-list?societyName=${encodeURIComponent(e)}`
		})
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #EDF3FC;
	}
	.back{
		width: 750rpx;
		.tipHeadSty{
			height: 310rpx;
			line-height: 310rpx; 
			font-size: 1.9rem; 
			font-weight: 700; 
			text-align: center; 
			margin-top: 100rpx;
		}
		.tipCenterSty{
			height: 60rpx; 
			text-align: center; 
			line-height: 60rpx; 
			color: #d6dae2; 
			font-size: 0.9rem;
		}
		.tipBottomSty{
			height: 50rpx; 
			text-align: center; 
			line-height: 50rpx; 
			color: #d6dae2; 
			font-size: 0.8rem;
		}
		.searchViewSty{
			height: 90rpx; 
			background-color: #ffffff; 
			width: 650rpx; 
			margin: 50rpx auto 50rpx;
			box-shadow:-5px 0px 10px #d6dae2 ,5px 0px 10px #d6dae2 ,0px -5px 10px #d6dae2 ,0px 5px 10px #d6dae2;
			.searchViewFormSty{
				width: 90%; 
				// margin: auto;
				// 居中
				display: flex; 
				// justify-content: center;
				align-items: center;
				margin-left: 25rpx;
				input{
					height: 90rpx; 
					line-height: 90rpx;
					font-size: 0.9rem;
				}
			}
		}
		.searchBtnSty{
			width: 650rpx; 
			margin: auto; 
			margin-top: 50rpx;
			button{
				height: 90rpx; 
				line-height: 90rpx; 
				font-size: 0.9rem;
			}
		}
	}
</style>