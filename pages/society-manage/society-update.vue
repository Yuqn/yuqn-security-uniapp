<template>
	<view class="back" :style="{height:height}">
		<scroll-view scroll-y="true" class="scroll-Y scrollSty" :show-scrollbar="false" :style="{height:scrollHeight}" >
			<view style="width: 100%; height: 300rpx;">
				<!-- <image src="/static/image/memberListLogo.svg" style="width: 100%; height: 100%;" mode="aspectFill"></image> -->
				<image src="/static/image/bgSevent.jpg" style="width: 100%; height: 100%;" mode="aspectFill"></image>
			</view>
			<view class="cardSty" v-if="isOk=='1'">
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
				<uni-card :is-shadow="false" is-full class="cardBodySty">
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">创建人：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{formData.societyCreateBy}}</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">创建时间：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{formData.societyCreateTime}}</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">社团主席：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light" @click="changChairman('chairman')">
								<uni-tag :text="formData.chairman.nickName" style="margin-right: 10rpx; background-color: #71aaf5;"  />
							</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">社团副主席：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">
								<uni-tag :text="formData.viceChairman[0].nickName" style="margin-right: 10rpx; background-color: #71aaf5;" @click="changChairman('viceChairmanOne')" />
								<uni-tag :text="formData.viceChairman[1].nickName" style="margin-right: 10rpx; background-color: #71aaf5;" @click="changChairman('viceChairmanTwo')" />
							</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="24">
							<view class="demo-uni-col dark">社团名字：</view>
						</uni-col>
						
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="24">
							<view class="demo-uni-col light">
								<uni-easyinput v-model="formData.societyName" placeholder="请输入内容"></uni-easyinput>
							</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty" style="margin-top: 40rpx;">
						<uni-col :span="24">
							<view class="demo-uni-col dark">社团简介：</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyIntroduceRowSty">
						<uni-col :span="24">
							<uni-easyinput v-model="formData.societyIntroduce"  type="textarea" placeholder="请输入内容"></uni-easyinput>
						</uni-col>
					</uni-row>
					<view class="cardBodyDetailsRowSty">
						<button style="background-color: #ec8b89;" class="cardBodyDetailsBtnRowSty" @click="backFun()">取消更改</button>
						<button class="cardBodyDetailsBtnRowSty" @click="submitFun()">更改设置</button>
					</view>
				</uni-card>
			</view>
		</scroll-view>
	</view>
	<view>
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="1000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script lang="ts" setup>
	import {ref,reactive} from "vue";
	import {onResize,onLoad,onBackPress} from '@dcloudio/uni-app'
	import {getSocietyDetails,societyUpdate} from '../../api/societyManage'
	
	// 提示弹窗属性
	let msgType = ref("success")
	let messageText = ref("这是一条成功提示")
	const message = ref(null)
	// 定义屏幕高度
	const height = ref("");
	// 定义scroll高度，用于适配底部分页器
	const scrollHeight = ref("");
	// 获取社团id
	let societyId = ref("")
	// 渲染数据
	let formData = reactive({})
	// isok
	let isOk = ref('0')
	// 副主席
	let viceChairmanArr = reactive([])
	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		// success: info => height.value = info.windowHeight - 44 + "px",
		success:function(info){
			
			height.value = info.windowHeight - 44 + "px"
			scrollHeight.value = info.windowHeight - 44 + "px"
		}
	});
	// 提示弹窗,type:success表示成功
	function messageToggle(type,msg) {
		msgType.value = type;
		messageText.value = msg;
		message.value.open()
	}
	
	// 接收参数
	onLoad((option)=>{
		societyId.value = JSON.parse(decodeURIComponent(option.societyId))
		// 获取社团信息
		let params = reactive({
			"societyId": societyId.value
		})
		getSocietyDetails(params).then(res=>{
			if(res.code == 200){
				formData = res.result
				// 将数据存入到缓存中，更新信息
				if(uni.getStorageSync("chairman") == ''){
					uni.setStorageSync("chairman",encodeURIComponent(JSON.stringify(res.result.chairman)))
				}else{
					formData.chairman = JSON.parse(decodeURIComponent(uni.getStorageSync("chairman")))
				}
				if(uni.getStorageSync("viceChairmanOne") == ''){
					uni.setStorageSync("viceChairmanOne",encodeURIComponent(JSON.stringify(res.result.viceChairman[0])))
				}else{
					formData.viceChairman[0] = JSON.parse(decodeURIComponent(uni.getStorageSync("viceChairmanOne")))
				}
				if(uni.getStorageSync("viceChairmanTwo") == ''){
					uni.setStorageSync("viceChairmanTwo",encodeURIComponent(JSON.stringify(res.result.viceChairman[1])))
				}else{
					formData.viceChairman[1] = JSON.parse(decodeURIComponent(uni.getStorageSync("viceChairmanTwo")))
				}
				isOk.value = '1'
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
	
	
	// 提交函数
	function submitFun(){
		// 获取缓存数据
		let checkChairman = uni.getStorageSync("checkChairman")
		let checkViceChairman = uni.getStorageSync("checkViceChairman")
		// 构造参数
		let params = reactive({
			'societyBody':{
				"id":formData.societyId,
				"name":formData.societyName,
				"introduce":formData.societyIntroduce
			},
			"chairman":formData.chairman,
			"viceChairman":formData.viceChairman
		})
		societyUpdate(params).then(res=>{
			if(res.code == 200){
				messageToggle("success","更改成功");
				setTimeout(()=>{
					backFun()
				},1000)
			}else{
				messageToggle("warn","更改失败")
				setTimeout(()=>{
					backFun()
				},1000)
			}
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
		})
	}
	
	// 更换主席方法
	function changChairman(e){
		uni.navigateTo({
			url:`/pages/society-manage/memberChoose?societyId=${encodeURIComponent(JSON.stringify(societyId.value))}
			&menuType=${encodeURIComponent(JSON.stringify(e))}`
		})
	}
	
	// 返回函数
	function backFun(){
		uni.removeStorageSync("chairman")
		uni.removeStorageSync("viceChairmanOne")
		uni.removeStorageSync("viceChairmanTwo")
		uni.removeStorageSync("viceChairman")
		uni.redirectTo({
			url:`/pages/society-manage/menu-list?societyId=${encodeURIComponent(JSON.stringify(societyId.value))}`
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
			.cardSty{
				width: 87%;
				margin: 20rpx auto 20rpx;
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
					height: 670rpx;
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
						margin-top: 30rpx;
						display: flex;
						.cardBodyDetailsBtnRowSty{
							width: 170rpx; 
							height: 60rpx; 
							line-height: 60rpx; 
							margin-top: 5rpx; 
							font-size: 0.7rem; 
							background-color: #71aaf5; 
							color: #ffffff;
							// float: right;
						}
					}
				}
			}
			
		}
		
	}
</style>