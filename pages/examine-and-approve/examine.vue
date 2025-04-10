<template>
	<view class="back" :style="{height:height}">
		<scroll-view scroll-y="true" class="scroll-Y scrollSty" :show-scrollbar="false" :style="{height:scrollHeight}">
			<view class="cardSty">
				<view class="textSty">
					<text>审批申请</text>
				</view>
				<view class="formSty">
					<uni-forms ref="conditionForm" >
						<uni-forms-item name="conditionValue">
							<uni-easyinput v-model="conditionFormData" placeholder="请输入意见" />
						</uni-forms-item>
					</uni-forms>
				</view>
				
				<view class="button-group btnSty">
					<button type="primary" size="mini" @click="submit('valiForm')">通过申请</button>
					<button type="warn" size="mini" @click="refuse()">驳回申请</button>
					<button type="error" size="mini" @click="reset()">取消操作</button>
				</view>
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
	import {rejectExamineAndApprove,passExamineAndApprove} from "../../api/examineAndApprove"
	
	// 提示弹窗属性
	let msgType = ref("success")
	let messageText = ref("这是一条成功提示")
	const message = ref(null)
	
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
			scrollHeight.value = info.windowHeight - 84 + "px"
		}
	});
	
	// 表单提交数据
	let conditionFormData = ref("")
	
	// 声明表单组件，否则报错
	const conditionForm = ref(null);
	
	// 声明
	let businessKey = ref("")
	let procInstId = ref("")
	let taskId = ref("")
	
	
	// 初始化
	onLoad((option)=>{
		businessKey.value = JSON.parse(decodeURIComponent(option.businessKey))
		procInstId.value = JSON.parse(decodeURIComponent(option.procInstId))
		taskId.value = JSON.parse(decodeURIComponent(option.taskId))
	})
	
	// 提示弹窗,type:success表示成功
	function messageToggle(type,msg) {
		msgType.value = type;
		messageText.value = msg;
		message.value.open()
	}
	
	// 提交事件
	function submit(e){
		let params = reactive({
			"businessKey" : businessKey.value,
			"processInstanceId" : procInstId.value,
			"taskId" : taskId.value,
			"reason" : conditionFormData.value
		})
		passExamineAndApprove(params).then(res=>{
			if(res.code == '200'){
				messageToggle("success","操作成功");
				setTimeout(()=>{
					uni.redirectTo({
						url:"/pages/examine-and-approve/index"
					})
				},1000)
			}
		}).finally(()=>{
			
		})
	}
	// 取消事件
	function reset(){
		uni.redirectTo({
			url:"/pages/examine-and-approve/index"
		});
	}
	// 驳回事件
	function refuse(){
		let params = reactive({
			"businessKey" : businessKey.value,
			"processInstanceId" : procInstId.value,
			"taskId" : taskId.value
		})
		rejectExamineAndApprove(params).then(res=>{
			if(res.code == '200'){
				messageToggle("success","操作成功");
				setTimeout(()=>{
					uni.redirectTo({
						url:"/pages/examine-and-approve/index"
					})
				},1000)
			}
		}).finally(()=>{
			
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
				width: 90%;
				height: 500rpx;
				background-color: white;
				position: fixed;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
				// margin: 200rpx auto 0;
				.formSty{
					width: 80%;
					margin: 0 auto 0;
				}
				.textSty{
					width: 100%;
					height: 200rpx;
					line-height: 200rpx;
					text-align: center;
					font-size: 35rpx;
					font-weight: 500;
					// background-color: yellow;
				}
				.btnSty{
					width: 80%;
					margin: 80rpx auto 0;
					display: flex; 
					justify-content: space-between;
				}
			}
			
		}
	}
</style>