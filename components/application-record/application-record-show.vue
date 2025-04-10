<template>
	<uni-grid :column="4" :highlight="true">
		<uni-grid-item v-for="(item,key) in applicationRecordShowData" :index="key" :key="key" class="gridItemSty">
			<view class="grid-item-box" >
				<text class="text countSty">{{item.count}}</text>
				<text class="text titleSty">{{item.title}}</text>
			</view>
		</uni-grid-item>
	</uni-grid>
</template>

<script lang="ts" setup>
	import {ref} from "vue";
	import {onResize} from '@dcloudio/uni-app';
	
	// 接收props
	defineProps({
	  applicationRecordShowData: Object
	})
	
</script>

<style lang="scss" scoped>
	.gridItemSty{
		background-color: #71aaf5;
		.grid-item-box {
			background-color: #71aaf5;
			flex: 1;
			// position: relative;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding: 15px 0;
			.text{
				color: #fff;
			}
			.countSty{
				font-size: 45rpx;
				margin-bottom: 12rpx;
				font-weight: 600;
			}
			.titleSty{
				font-size: 30rpx;
			}
		}
	}
	
</style>