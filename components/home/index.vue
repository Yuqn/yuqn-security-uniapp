<template>
	<view class="back" :style="{height:height}" style="position: absolute;">
		<view class="topLogo">
			<image src="/static/image/topLogo.svg" mode="aspectFill"></image>
		</view>
		<view class="titleSty">
			<view class="titleGreetingsSty">
				<text>你好，{{titleTip.greetings == ""? "--":titleTip.greetings }}！</text>
			</view>
			<view class="titleOrganizationSty">
				<text>组织：{{titleTip.organization == ""? "当前角色未加入组织。":titleTip.organization }}</text>
			</view>
			<view class="titleIdentitySty">
				<text>身份：{{titleTip.identity == ""? "你未加入任何组织，快去加入吧！":titleTip.identity }}</text>
			</view>
		</view>
		<view style="width: 100%;height: 30rpx;background-color: #EDF3FC; position: fixed;margin-top: 270rpx;z-index: 100;"></view>
		<view class="roleFunSty">
			<uni-card title="角色功能">
				<uni-grid :column="4" :show-border="false" :square="false" @change="change">
					<uni-grid-item v-for="(item ,index) in roleFunList" :index="index" :key="index">
						<view class="grid-item-box">
							<image class="image" src="/static/image/menu.svg" mode="aspectFill" />
							<text class="text">{{item.text}}</text>
							<!-- <view v-if="item.badge" class="grid-dot">
								<uni-badge :text="item.badge" :type="item.type" />
							</view> -->
						</view>
					</uni-grid-item>
				</uni-grid>
			</uni-card>
		</view>
		<view class="basicFunSty">
			<uni-card title="基本功能">
				<uni-grid :column="4" :show-border="false" :square="false" @change="change">
					<uni-grid-item v-for="(item ,index) in basicFunList" :index="index" :key="index">
						<view class="grid-item-box">
							<image class="image" src="/static/image/menu.svg" mode="aspectFill" />
							<text class="text">{{item.text}}</text>
							<!-- <view v-if="item.badge" class="grid-dot">
								<uni-badge :text="item.badge" :type="item.type" />
							</view> -->
						</view>
					</uni-grid-item>
				</uni-grid>
			</uni-card>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import {ref} from "vue";
	import {onResize} from '@dcloudio/uni-app'
	
	// 定义屏幕高度
	const height = ref("");
	
	// 接收props
	defineProps({
	  titleTip: Object,
	  roleFunList:Object,
	  basicFunList:Object
	})
	
	// 接收函数
	const emit = defineEmits<{
	  (e: 'data-to-parent',data: { result:Object }): void
	}>()
	
	// 菜单点击事件
	function change(e) {
		emit('data-to-parent', {result:e});
		// console.log("点击触发",e)
		// let { index } = e.detail
		// this.list[index].badge && this.list[index].badge++

		// uni.showToast({
		// 	title: `点击第${index+1}个宫格`,
		// 	icon: 'none'
		// })
	}
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
		// background-color: #EDF3FC;
		width: 750rpx;
		.titleSty{
			position: fixed; 
			z-index: 100; 
			color: #EDF3FC; 
			margin-left: 40rpx;
			.titleGreetingsSty{
				 width: 500rpx;
				 height: 130rpx; 
				 line-height: 170rpx; 
				 font-size: 1.3rem;
			}
			.titleOrganizationSty{
				 width: 500rpx;
				 height: 60rpx; 
				 line-height: 60rpx; 
				 font-size: 0.7rem;
			}
			.titleIdentitySty{
				width: 500rpx;
				height: 40rpx; 
				line-height: 40rpx; 
				font-size: 0.6rem;
			}
		}
		.topLogo{
			position: fixed; 
			z-index: 100;
			image{
				width: 750rpx;
				height: 270rpx;
			}
		}
		.roleFunSty{
			font-weight: 600;
			width: 100%; 
			margin-top: 300rpx;
		}
		.basicFunSty{
			font-weight: 600;
		}
	}
	.image {
		width: 85rpx;
		height: 85rpx;
	}
	.text {
		font-size: 0.6rem;
		margin-top: 2rpx;
	}
	.grid-item-box {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15rpx 0;
	}
	.grid-dot {
		position: absolute;
		top: 5px;
		right: 15px;
	}
</style>