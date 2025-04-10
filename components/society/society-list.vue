<template>
	<view class="back" :style="{height:height}">
		<scroll-view scroll-y="true" class="scroll-Y scrollSty" :show-scrollbar="false">
			<view class="cardSty" v-for="(item,key) in societyListData" :index="key" :key="item.societyId">
				<view class="cardTopSty" >
					<view class="cardTopLeftSty" >
						<text>社团名称：{{item.societyName}}</text>
					</view>
					<view class="tag-view cardTopRightSty">
						<view class="cardTopRightTipSty">
							<text>正常</text>
						</view>
					</view>
				</view>
				<uni-card :is-shadow="false" is-full class="cardBodySty">
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">创建人：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{item.societyByName}}</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">创建时间：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{item.createTime}}</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">社团主席：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{item.chairman}}</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">社团副主席：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{item.viceChairman}}</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">社团人数：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{item.societyUserCount}}</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">社团部门数：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{item.societyDepartmentCount}}</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="24">
							<view class="demo-uni-col dark">社团简介：</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyIntroduceRowSty">
						<uni-col :span="24">
							<scroll-view scroll-y="true" class="scroll-Y cardBodyIntroduceScrollRowSty">
								{{item.societyIntroduce}}
							</scroll-view>
						</uni-col>
					</uni-row>
					<view class="cardBodyDetailsRowSty">
						<button class="cardBodyDetailsBtnRowSty" @click="clickFun(item.societyId)">走进社团</button>
					</view>
				</uni-card>
			</view>
		</scroll-view>
		<view class="pageSty">
			<!-- <view style="height: 50rpx; line-height: 50rpx;flex-grow: 1;">
				<text>第1/10页 共100条数据</text>
			</view> -->
			<view style="width: 100%; margin: 10rpx auto;">
				<uni-pagination prev-text="前一页" next-text="后一页" :current='1' :total="100" :pageSize="10"  />
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import {ref,onMounted} from "vue";
	import {onResize,onLoad} from '@dcloudio/uni-app'
	
	// 定义 societyListData 的具体类型
	interface SocietyListData {
	  societyId: string;
	  societyName: string;
	  societyByName: string;
	  createTime: string;
	  chairman: string;
	  viceChairman: string;
	  societyUserCount: number;
	  societyDepartmentCount: number;
	  societyIntroduce: string;
	}
	
	// 接收props
	// const props = defineProps({
	//   societyListData: Object
	// })
	const props = defineProps<{ societyListData: SocietyListData[] }>();
	
	// 接收函数
	const emit = defineEmits<{
	  (e: 'data-to-parent',data: { result:string }): void
	}>()
	
	// 定义屏幕高度
	const height = ref("");
	
	// 菜单点击事件
	function clickFun(e) {
		emit('data-to-parent', {result:e});
	}
	
	// 生命周期钩子
	onMounted(() => {
	  // 在这里访问 props
	  console.log('props.societyListData',props.societyListData);
	});
	
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
		.scrollSty{
			width: 100%; 
			height: 98%; 
			margin-bottom: 15rpx;
			margin-top: 15rpx;
			.cardSty{
				width: 87%;
				margin: 0rpx auto 20rpx;
				.cardTopSty{
					width: 100%; 
					height: 80rpx;
					background-color: #71aaf5; 
					display: flex;
					.cardTopLeftSty{
						height: 80rpx; 
						width: 70%; 
						line-height: 80rpx; 
						color: #ffffff; 
						font-size: 0.8rem; 
						margin-left: 30rpx;
					}
					.cardTopRightSty{
						flex-grow: 1; 
						display: flex; 
						justify-content: center;
						align-items: center;
						.cardTopRightTipSty{
							width: 100rpx;
							height: 45rpx; 
							background-color: #ffffff; 
							text-align: center; 
							line-height: 45rpx; 
							font-size: 0.7rem;
							color: #71aaf5; 
							border-radius: 5rpx;
						}
					}
				}
				.cardBodySty{
					height: 650rpx;
					.cardBodyRowSty{
						height: 40rpx; 
						line-height: 40rpx; 
						margin-bottom: 10rpx; 
						font-size: 0.8rem;
					}
					.cardBodyIntroduceRowSty{
						height: 160rpx; 
						line-height: 40rpx; 
						margin-bottom: 10rpx; 
						font-size: 0.8rem;
						border: 1rpx #d6dae2 solid;
						.cardBodyIntroduceScrollRowSty{
							width: 92%; 
							height: 130rpx; 
							margin: auto; 
							margin-top: 15rpx; 
							white-space: normal;
							word-wrap: break-word;
						}
					}
					.cardBodyDetailsRowSty{
						width: 100%; 
						height: 80rpx; 
						margin-top: 30rpx;
						.cardBodyDetailsBtnRowSty{
							width: 170rpx; 
							height: 60rpx; 
							line-height: 60rpx; 
							margin-top: 5rpx; 
							font-size: 0.7rem; 
							background-color: #71aaf5; 
							color: #ffffff;
							float: right;
						}
					}
				}
			}
		}
		.pageSty{
			 width: 100%; 
			 // height: 80rpx;
			 position: fixed;
			 bottom: 0;
			 background-color: #ffffff;
			 // padding-top: 18rpx;
			 // display: flex; 
			 // justify-content: center;
			 // align-items: center;
		}
	}
</style>