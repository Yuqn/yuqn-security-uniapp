<template>
	<view class="back" :style="{height:height}">
		<scroll-view scroll-y="true" class="scroll-Y scrollSty" :show-scrollbar="false">
			<view class="cardSty" v-if="isOk == '1'" style="margin-top: 25rpx;">
				<view class="cardTopSty" >
					<view class="cardTopLeftSty" >
						<text>部门名字：{{departmentData.departmentName}}</text>
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
							<view class="demo-uni-col dark">所属社团：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{departmentData.societyName}}</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">创建人：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{departmentData.createBy}}</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">创建时间：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{departmentData.createTime}}</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">社团部长：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{departmentData.minister}}</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">社团副部长：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{departmentData.viceMinister}}</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">部门人数：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{departmentData.count}}</view>
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
								{{departmentData.introduce}}
							</scroll-view>
						</uni-col>
					</uni-row>
					<view class="cardBodyDetailsRowSty">
						<button :disabled="departmentData.isJoin == '1'" class="cardBodyDetailsBtnRowSty" @click="joinDepartmentFun(departmentData.departmentId)">
							{{departmentData.isJoin == '1'?'已在部门':'申请加入'}}</button>
					</view>
				</uni-card>
			</view>
		</scroll-view>
	</view>
	<view>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script lang="ts" setup>
	import {ref,onMounted, reactive} from "vue";
	import {onResize,onLoad} from '@dcloudio/uni-app'
	import {getDepartmentDetailsByCode,joinDepartment} from '../../api/departmentManage'
	
	// 提示弹窗属性
	let msgType = ref("success")
	let messageText = ref("这是一条成功提示")
	// const message = ref(null)
	
	// 提示弹窗,type:success表示成功
	function messageToggle(type,msg) {
		msgType.value = type;
		messageText.value = msg;
		message.value.open()
	}
	
	// 使用 ref 来获取 uni-popup 组件的引用
	const message = ref<InstanceType<typeof UniPopup> | null>(null);
	
	// 渲染数据
	let departmentData = reactive({})
	// isOk
	let isOk = ref('0')
	// 初始加载
	onLoad((option)=>{
		isOk.value = '0'
		let departmentCode = option.departmentCode;
		let params = reactive({
			"departmentCode":departmentCode
		})
		getDepartmentDetailsByCode(params).then(res=>{
			if(res.code == '200'){
				departmentData = res.result
				isOk.value = '1'
			}
		})
	})
	// 点击按钮
	function joinDepartmentFun(e){
		let params = reactive({
			"id":e
		})
		joinDepartment(params).then(res=>{
			if(res.code == '200'){
				messageToggle("success","已加入组织")
				setTimeout(()=>{
					uni.redirectTo({
						url:`/pages/home/index`
					})
				},1500)
			}else{
				messageToggle("error",res.message)
			}
		})
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #EDF3FC;
	}
	.back{
		width: 750rpx;
		.scrollSty{
			width: 100%; 
			// height: 98%; 
			// margin-bottom: 15rpx;
			// margin-top: 15rpx;
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