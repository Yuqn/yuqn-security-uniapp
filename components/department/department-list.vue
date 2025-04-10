<template>
	<view class="back" :style="{height:height}">
		<scroll-view scroll-y="true" class="scroll-Y scrollSty" :show-scrollbar="false" :style="{height:scrollHeight}" >
			<uni-collapse class="collapseSty" accordion>
				<uni-collapse-item class="collapseItemSty" titleBorder="none" :show-animation="false" :show-arrow="false" :open="true" v-for="(item,key) in departmentListData" :index="key" :key="item.id">
					<template v-slot:title>
						<view class="collapseItemHeadSty" >
							<view class="collapseItemHeadLeftSty">
								<image src="/static/image/departmentList.svg"></image>
							</view>
							<view class="collapseItemHeadcentSty">
								<view class="collapseItemHeadcentDepartmentSty"><text>{{item.name}}</text></view>
								<view class="collapseItemHeadcentSocietySty"><text>所属社团：{{item.societyName}}</text></view>
							</view>
							<view class="collapseItemHeadRightSty">
								<view class="collapseItemHeadRightViewSty">
									<text>展开</text>
								</view>
							</view>
						</view>
					</template>
					<view class="collapseItemBodySty">
						<view class="collapseItemBodyViewSty">
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
									<view class="demo-uni-col dark">部门部长：</view>
								</uni-col>
								<uni-col :span="16">
									<view class="demo-uni-col light">{{item.minister == null?'无':item.minister}}</view>
								</uni-col>
							</uni-row>
							<uni-row class="demo-uni-row cardBodyRowSty">
								<uni-col :span="8">
									<view class="demo-uni-col dark">部门副部长：</view>
								</uni-col>
								<uni-col :span="16">
									<view class="demo-uni-col light">{{item.viceMinister == null?'无':item.viceMinister}}</view>
								</uni-col>
							</uni-row>
							<uni-row class="demo-uni-row cardBodyRowSty">
								<uni-col :span="8">
									<view class="demo-uni-col dark">部门人数：</view>
								</uni-col>
								<uni-col :span="16">
									<view class="demo-uni-col light">{{item.count}}</view>
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
										{{item.introduce}}
									</scroll-view>
								</uni-col>
							</uni-row>
							<view class="cardBodyDetailsRowSty" v-if="menuType.moduleType=='societyList'">
								<!-- <button class="cardBodyDetailsBtnRowSty" @click="clickFun(item)" v-if="item.isJoin == 0">申请加入</button> -->
								<button class="cardBodyDetailsBtnRowSty" @click="clickFun(item)">查看成员</button>
							</view>
							<view class="cardBodyDetailsRowSty" v-if="menuType.moduleType=='departmentManage'">
								<!-- <button class="cardBodyDetailsBtnRowSty" @click="clickFun(item)">申请加入</button> -->
								<button class="cardBodyUpdateBtnRowSty" @click="clickFun(item)">进入编辑</button>
							</view>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</scroll-view>
	</view>
</template>

<script lang="ts" setup>
	import {ref,reactive} from "vue";
	import {onResize} from '@dcloudio/uni-app'
	
	// 接收props
	defineProps({
	  departmentListData: Object,
	  menuType: {
		// 定义数据，区分是部门管理还是查询功能所调用的组件，确保组件渲染内容,societyList,departmentManage
		type: Object,
		default: () => reactive({ moduleType: "" })
	  }
	})
	
	// 接收函数
	const emit = defineEmits<{
	  (e: 'data-to-parent',data: { result:Object }): void
	}>()
	
	// 定义屏幕高度
	const height = ref("");
	// 定义scroll高度，用于适配底部分页器
	let scrollHeight = ref("");

	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		success:function(info){
			console.log("info",info)
			height.value = info.windowHeight - 44 + "px"
			scrollHeight.value = info.windowHeight - 44 + "px"
		}
	});
	
	// 点击函数
	function clickFun(e){
		emit('data-to-parent', {result:e});
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #EDF3FC;
	}
	.back{
		width: 750rpx;
		// border: 1rpx solid yellow;
		.scrollSty{
			width: 100%;
			// background-color: yellow;
			.collapseSty{
				width: 90%; 
				margin: auto; 
				// margin-top: 20rpx; 
				height: 100%;
				padding-top: 20rpx;
				background-color: #EDF3FC;
				.collapseItemSty{
					margin-bottom: 10rpx;
					.collapseItemHeadSty{
						display: flex; 
						background-color: #709fe7; 
						width: 100%; 
						height: 145rpx; 
						border-radius: 10rpx;
						.collapseItemHeadLeftSty{
							 width: 95rpx; 
							 height: 95rpx; 
							 margin: 26rpx 30rpx;
							 image{
								width:100%; 
								height: 100%;
							 }
						}
						.collapseItemHeadcentSty{
							height: 90rpx; 
							flex-grow: 1; 
							margin-top: 26rpx; 
							color: #ffffff;
							.collapseItemHeadcentDepartmentSty{
								width: 100%; 
								height: 45rpx;
								font-size: 1rem; 
								margin: 4rpx 0 10rpx;
								white-space: nowrap;
								overflow-x: hidden;
								text-overflow: ellipsis;
								// border: 1px solid #000;
							}
							.collapseItemHeadcentSocietySty{
								width: 100%; 
								font-size: 0.7rem;
							}
						}
						.collapseItemHeadRightSty{
							height: 90rpx; 
							width: 110rpx; 
							margin: 26rpx 30rpx;
							display: flex;
							justify-content: center;
							align-items: center;
							.collapseItemHeadRightViewSty{
								width: 90%; 
								height: 40rpx;
								background-color: #ffffff; 
								color: #709fe7; 
								font-size: 0.7rem;
								text-align: center; 
								line-height: 40rpx;
							}
						}
					}
					.collapseItemBodySty{
						background-color: #EDF3FC;
						.collapseItemBodyViewSty{
							background-color: #ffffff; 
							width: 80%; 
							height:490rpx; 
							margin: auto; 
							padding: 20rpx; 
							border-radius:0 0 10rpx 10rpx;
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
							  	height: 70rpx; 
							  	margin-top: 20rpx;
								display: flex;
							  	.cardBodyDetailsBtnRowSty{
							  		width: 170rpx; 
							  		height: 55rpx; 
							  		line-height: 55rpx; 
							  		margin-top: 5rpx; 
							  		font-size: 0.7rem; 
							  		background-color: #71aaf5; 
							  		color: #ffffff;
							  	}
								.cardBodyUpdateBtnRowSty{
									width: 170rpx;
									height: 55rpx; 
									line-height: 55rpx; 
									margin-top: 5rpx; 
									margin-left: 370rpx;
									font-size: 0.7rem; 
									background-color: #71aaf5; 
									color: #ffffff;
								}
							}
						}
					}
				}
			}
		}
	}
</style>