<template>
	<view class="back" :style="{height:height}">
		<scroll-view scroll-y="true" class="scroll-Y scrollSty" :show-scrollbar="false" >
			<view class="cardSty" >
				<view class="cardTopSty" >
					<view class="cardTopLeftSty" >
						<text>社团编辑 </text>
					</view>
					<view class="tag-view cardTopRightSty">
						<view class="cardTopRightTipSty">
							<text>正常</text>
						</view>
					</view>
				</view>
				<uni-card :is-shadow="false" is-full class="cardBodySty" v-if="isOk=='1'">
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">创建人：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{societyData.societyByName}}</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">创建时间：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{societyData.createTime}}</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">社团主席：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{societyData.chairman}}</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">社团副主席：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{societyData.viceChairman}}</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">社团部门数：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{societyData.societyDepartmentCount}}</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">社团总人数：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{societyData.societyUserCount}}</view>
						</uni-col>
					</uni-row>
					<view class="cardBodyDetailsRowSty">
						<button class="cardBodyDetailsBtnRowSty" @click="addDepartmentBtn()">添加部门</button>
					</view>
				</uni-card>
			</view>
			<view style="width: 87%; margin: auto; height: 1rpx; background-color: #007aff;"></view>
			<view class="cardSty" v-for="(item,key) in departmentValue" :index="key">
				<view class="cardTopSty" style="background-color: #71aaf5;">
					<view class="cardTopLeftSty" >
						<text>新增部门</text>
					</view>
					<view class="tag-view cardTopRightSty"></view>
				</view>
				<uni-card :is-shadow="false" is-full class="cardBodyAddSty">
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
				<button type="primary" :disabled="count < 1" @click="addDepartmentBtnSubmit()">确认</button>
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
	import {onResize,onLoad} from '@dcloudio/uni-app'
	import {getSocietyDetailsById,addDepartment} from '../../api/societyManage'
	
	// 提示弹窗属性
	let msgType = ref("success")
	let messageText = ref("这是一条成功提示")
	const message = ref(null)
	
	// 定义屏幕高度
	const height = ref("");
	
	// 社团id
	let societyId = ref("")
	
	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		success: info => height.value = info.windowHeight - 44 + "px"
	});
	
	// 自定义输入框样式
	const styles = reactive({
		// borderColor: '#2979FF'
	})
	
	// isok
	let isOk = ref('0')
	
	// 计数
	let count = ref(0)
	
	// 渲染数据
	let societyData = reactive({})
	
	// 新增部门数据
	let departmentValue = reactive([])
	
	// 添加部门按钮
	function addDepartmentBtn(){
		let param = reactive({
			departmentName:"",
			departmentIntroduce:""})
		departmentValue.push(param)
		count.value +=1
	}
	
	// 移除部门数量
	function deleteDepartment(e){
		departmentValue.splice(e,1)
		count.value -= 1;
	}
	
	// 提示弹窗,type:success表示成功
	function messageToggle(type,msg) {
		msgType.value = type;
		messageText.value = msg;
		message.value.open()
	}
	
	// 新增部门
	function addDepartmentBtnSubmit(){
		console.log("departmentValue",departmentValue)
		// 构造参数{societyId:**,createBy:**,departmentValue:[{departmentName:**,departmentIntroduce:**},{departmentName:**,departmentIntroduce:**}]}
		let roleId = uni.getStorageSync("userRole").roleId
		let params = reactive({
			"societyId" : societyId.value,
			"userRole" : roleId,
			"departmentValue" : departmentValue
		})
		addDepartment(params).then(res=>{
			if(res.code == 200){
				messageToggle("success","添加部门成功，请前往查看");
				setTimeout(()=>{
					uni.redirectTo({
						url:`/pages/society-manage/menu-list?societyId=${encodeURIComponent(JSON.stringify(societyId.value))}`
					})
				},1000)
			}else{
				messageToggle("success","添加部门失败，请前往查看");
				setTimeout(()=>{
					uni.redirectTo({
						url:`/pages/society-manage/menu-list?societyId=${encodeURIComponent(JSON.stringify(societyId.value))}`
					})
				},1000)
			}
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
			// isOk.value = "0"
		})
	}
	
	// 初始化数据
	onLoad((option)=>{
		societyId.value = JSON.parse(decodeURIComponent(option.societyId))
		let params = reactive({
			"societyId" : societyId.value
		});
		getSocietyDetailsById(params).then(res=>{
			if(res.code == 200){
				console.log("res",res)
				societyData = res.result[0]
				isOk.value = '1'
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
				.cardBodyAddSty{
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
				.cardBodySty{
					height: 520rpx;
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