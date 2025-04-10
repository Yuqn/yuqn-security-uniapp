<template>
	<view class="back" :style="{height:height}">
		<scroll-view scroll-y="true" class="scroll-Y scrollSty" :show-scrollbar="false" >
			<view class="cardSty" >
				<view class="cardTopSty" >
					<view class="cardTopLeftSty" >
						<text>创建人：余其楠</text>
					</view>
					<view class="tag-view cardTopRightSty">
					</view>
				</view>
				<uni-card :is-shadow="false" is-full class="cardBodySty">
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark" style="margin-top: 13rpx;">社团名字：</view>
						</uni-col>
						<uni-col :span="16">
							<!-- <view class="demo-uni-col light" style="background-color: yellow;"> -->
								<uni-easyinput  v-model="societyValue.societyName" placeholder="请输入内容"></uni-easyinput>
							<!-- </view> -->
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="24">
							<view class="demo-uni-col dark">社团简介：</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyIntroduceRowSty">
						<uni-col :span="24">
							<!-- <scroll-view scroll-y="true" class="scroll-Y cardBodyIntroduceScrollRowSty">
								11
							</scroll-view> -->
							<uni-easyinput type="textarea" v-model="societyValue.societyIntroduce" placeholder="请输入内容"></uni-easyinput>
						</uni-col>
					</uni-row>
					<view class="cardBodyDetailsRowSty" v-if="societyValue.societyName != '' && societyValue.societyIntroduce != ''">
						<button class="cardBodyDetailsBtnRowSty" @click="addDepartment()">添加部门</button>
					</view>
				</uni-card>
			</view>
			<view style="width: 87%; margin: auto; height: 1rpx; background-color: #007aff;"></view>
			<view class="cardSty" v-for="(item,key) in societyValue.departmentValue" :index="key">
				<view class="cardTopSty" style="background-color: #71aaf5;">
					<view class="cardTopLeftSty" >
						<text>新增部门</text>
					</view>
					<view class="tag-view cardTopRightSty"></view>
				</view>
				<uni-card :is-shadow="false" is-full class="cardBodySty">
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark" style="margin-top: 13rpx;">部门名字：</view>
						</uni-col>
						<uni-col :span="16">
							<!-- <view class="demo-uni-col light" style="background-color: yellow;"> -->
								<uni-easyinput  v-model="item.departmentName" placeholder="请输入内容"></uni-easyinput>
							<!-- </view> -->
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="24">
							<view class="demo-uni-col dark">部门简介：</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyIntroduceRowSty">
						<uni-col :span="24">
							<!-- <scroll-view scroll-y="true" class="scroll-Y cardBodyIntroduceScrollRowSty">
								11
							</scroll-view> -->
							<uni-easyinput type="textarea" v-model="item.departmentIntroduce" placeholder="请输入内容"></uni-easyinput>
						</uni-col>
					</uni-row>
					<view class="cardBodyDetailsRowSty">
						<button class="cardBodyDetailsBtnRowSty" style="background-color: red;" @click="deleteDepartment(key)">移除部门</button>
					</view>
				</uni-card>
			</view>
			<view class="buttonSty">
				<button type="primary" @click="societyMkdirFun()" :disabled="(societyValue.societyName == '' || societyValue.societyIntroduce == '')">确认</button>
			</view>
		</scroll-view>
	</view>
	<view>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="1000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script lang="ts" setup>
	import {ref,reactive} from "vue";
	import {onResize} from '@dcloudio/uni-app'
	import {societyMkdir} from '../../api/societyMkdir'
	
	// 提示弹窗属性
	let msgType = ref("success")
	let messageText = ref("这是一条成功提示")
	const message = ref(null)
	
	// 定义数据
	let societyValue = reactive({
		societyName:"",
		societyIntroduce:"",
		createTime:"",
		departmentValue:[],
		userRole:{}
	})
	
	// 部门添加数量
	let count = ref(0)
	
	// 定义屏幕高度
	const height = ref("");
	
	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		success: info => height.value = info.windowHeight - 44 + "px"
	});
	
	// 提示弹窗,type:success表示成功
	function messageToggle(type,msg) {
		msgType.value = type;
		messageText.value = msg;
		message.value.open()
	}
	
	// 添加部门函数
	function addDepartment(){
		let param = reactive({
			departmentName:"",
			departmentIntroduce:""})
		societyValue.departmentValue.push(param)
		count.value += 1;
	}
	
	// 移除部门数量
	function deleteDepartment(e){
		societyValue.departmentValue.splice(e,1)
		count.value -= 1;
	}
	
	// 创建社团
	function societyMkdirFun(){
		societyValue.createTime = Date.now().toString();
		societyValue.userRole = uni.getStorageSync("userRole")
		console.log(societyValue)
		societyMkdir(societyValue).then(res=>{
			if(res.code == 200){
				console.log("结果",res)
				messageToggle("success",res.message);
				setTimeout(()=>{
					uni.redirectTo({
					url:'/pages/home/index'
				})
				},1000)
				
				
			}else{
				console.log("查找失败");
			}
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
			// isOk.value = "0"
		})
	}
	
	// 自定义输入框样式
	const styles = reactive({
		// borderColor: '#2979FF'
	})
</script>

<style lang="scss" scoped>
	page{
		background-color: #EDF3FC;
	}
	.back{
		width: 750rpx;
		.scrollSty{
			width: 100%; 
			height: 100%;
			.cardSty{
				width: 90%;
				margin: 20rpx auto 20rpx;
				.cardTopSty{
					width: 100%; 
					height: 80rpx;
					background-color: #71aaf5; 
					border-radius: 15rpx 15rpx 0 0;
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
					height: 440rpx;
					border-radius: 0 0 15rpx 15rpx;
					.cardBodyRowSty{
						height: 40rpx; 
						line-height: 40rpx; 
						margin-bottom: 25rpx; 
						font-size: 0.8rem;
					}
					.cardBodyIntroduceRowSty{
						height: 160rpx; 
						line-height: 40rpx; 
						margin-bottom: 10rpx; 
						font-size: 0.8rem;
						// border: 1rpx #d6dae2 solid;
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
						margin-top: 40rpx;
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
			.buttonSty{
				width: 660rpx;
				height: 100rpx;
				padding-top: 20rpx;
				margin: auto;
			}
		}
	}
</style>