<template>
	<view class="back" :style="{height:height}">
		<view class="TopSty">
			<!-- <image class="TopImgSty" src="/static/image/memberListLogo.svg" mode="aspectFill"></image> -->
			<image class="TopImgSty" src="/static/image/bgSevent.jpg" mode="aspectFill"></image>
		</view>
		<view class="sourceSty">
			<view class="sourceViewSty">
				<uni-forms ref="form" :rules="rules" :modelValue="formData" >
					<uni-forms-item name="name" style="margin-bottom:0;">
						<uni-easyinput placeholder="请输入查找成员" v-model="formData.name" />
					</uni-forms-item>
				</uni-forms>
			</view>
			<view class="sourceBtnSty">
				<button type="primary" size="mini" @click="submit('valiForm')">查询</button>
			</view>
		</view>
		<scroll-view scroll-y="true" class="scroll-Y scrollSty" :show-scrollbar="false">
			<slot></slot>
		</scroll-view>
		<!-- <view style="width: 100%; flex-grow: 1; margin-bottom: 10rpx; overflow-y: auto;">
			<slot></slot>
		</view> -->
		<view class="pageSty">
			<view class="pageViewSty">
				<uni-pagination prev-text="前一页" next-text="后一页" :current='1' :total="10" :pageSize="10"  />
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import {ref,reactive} from "vue";
	import {onResize} from '@dcloudio/uni-app'
	
	// 定义屏幕高度
	const height = ref("");
	
	// 用户数据集
	const formData = reactive({name:''})
	const form = ref(null);
	
	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		success: info => height.value = info.windowHeight  + "px"
	});
	
	// 登录跳转
	function submit(e) {
		form.value.validate().then(res=>{
			uni.navigateTo({
				url:"/pages/404/index"
			})
			console.log('表单数据信息：', res);
		}).catch(err =>{
			console.log('表单错误信息：', err);
		})
	}
	
	// 表单校验
	const rules = reactive({
		// 对name字段进行必填验证
		name: {
			rules: [{
					required: true,
					errorMessage: '请输入信息',
				}
			]
		}
	})
</script>

<style lang="scss" scoped>
	page{
		background-color: #EDF3FC;
	}
	.back{
		width: 750rpx;
		display: flex; 
		flex-direction: column;
		.TopSty{
			width: 100%; 
			height: 300rpx;
			.TopImgSty{
				width: 100%; 
				height: 100%;
			}
		}
		.sourceSty{
			width: 100%;
			display: flex;
			.sourceViewSty{
				width: 75%; 
				margin: 10rpx 20rpx;
			}
			.sourceBtnSty{
				flex-grow: 1; 
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
		.scrollSty{
			width: 100%; 
			height: 700rpx; 
			flex-grow: 1; 
			margin-bottom: 10rpx;
		}
		.pageSty{
			width: 100%; 
			background-color: #ffffff;
			.pageViewSty{
				width: 100%; 
				margin: 10rpx auto;
			}
		}
	}
</style>