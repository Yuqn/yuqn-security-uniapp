<template>
	<view class="back" :style="{height:height}">
		<view class="sourceSty">
			<view class="sourceViewSty">
				<uni-forms ref="form" :modelValue="formData" >
					<uni-forms-item name="name" style="margin-bottom:0;">
						<uni-easyinput placeholder="请输入查找社团名字" v-model="formData.name" />
					</uni-forms-item>
				</uni-forms>
			</view>
			<view class="sourceBtnSty">
				<button type="primary" size="mini" @click="submit()">查询</button>
			</view>
		</view>
		<scroll-view scroll-y="true" class="scroll-Y scrollSty" :show-scrollbar="false" :style="{height:scrollHeight}" >
			<uni-collapse class="collapseSty" accordion>
				<uni-collapse-item class="collapseItemSty" titleBorder="none" :show-arrow="false"  v-for="(item,key) in societyListData" :index="key" :key="item.societyId" v-if="isOk == '1'">
					<template v-slot:title>
						<view class="collapseItemHeadSty" >
							<view class="collapseItemHeadLeftSty">
								<image src="/static/image/departmentList.svg"></image>
							</view>
							<view class="collapseItemHeadcentSty">
								<view class="collapseItemHeadcentDepartmentSty"><text>{{item.societyName}}</text></view>
								<view class="collapseItemHeadcentSocietySty"><text>创建时间：{{item.createTime}}</text></view>
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
									<view class="demo-uni-col dark">创建人：</view>
								</uni-col>
								<uni-col :span="16">
									<view class="demo-uni-col light">{{item.societyByName}}</view>
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
								<button class="cardBodyUpdateBtnRowSty" @click="clickFun(item.societyId)">编辑社团</button>
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
	import {onResize,onLoad} from '@dcloudio/uni-app'
	import {getSocietyList} from '../../api/societyList'
	
	// 定义屏幕高度
	const height = ref("");
	// 定义scroll高度，用于适配底部分页器
	const scrollHeight = ref("");
	
	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		// success: info => height.value = info.windowHeight - 44 + "px",
		success:function(info){
			console.log("info",info)
			height.value = info.windowHeight - 44 + "px"
			// scrollHeight.value = info.windowHeight - 44 + "px"
		}
	});
	
	// 用户数据集
	let formData = reactive({name:''})
	let form = ref(null);

	// 社团列表数据
	let societyListData = reactive([])
	
	// isOk
	let isOk = ref('0')
	
	// 加载社团列表
	onLoad(()=>{
		let params = reactive({
			"searchValue" : ""
		});
		getSocietyList(params).then(res=>{
			if(res.code == 200){
				societyListData = []
				societyListData = res.result
				isOk.value = '1'
				console.log("societyListData",societyListData)
			}else{
				console.log("查找失败");
			}
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
		})
	})
	// 搜索社团
	function submit(){
		isOk.value = "0"
		let params = reactive({
			"searchValue" : formData.name
		});
		console.log(params)
		getSocietyList(params).then(res=>{
			if(res.code == 200){
				societyListData = res.result;
				isOk.value = "1"
			}else{
				console.log("查找失败");
			}
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
		})
	}
	// 触发组件方法
	function clickFun(societyId){
		uni.navigateTo({
			url:`/pages/department-manage/department-list?societyId=${encodeURIComponent(societyId)}`
		})
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #EDF3FC;
	}
	.back{
		width: 750rpx;
		display: flex;
		flex-direction: column;
		// border: 1rpx solid yellow;
		.sourceSty{
			width: 100%;
			height: 95rpx;
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
			// border: 1px solid red;
			.collapseSty{
				width: 90%; 
				height: 100%;
				margin: auto; 
				// margin-top: 20rpx; 
				// padding-top: 20rpx;
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
								font-size: 1rem; 
								margin: 4rpx 0 10rpx;
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
								// display: flex;
								// justify-content: end;
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