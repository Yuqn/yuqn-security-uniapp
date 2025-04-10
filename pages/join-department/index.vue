<template>
	<view class="back" :style="{height:height}">
		<scroll-view scroll-y="true" class="scroll-Y scrollSty" :show-scrollbar="false" :style="{height:scrollHeight}">
			<view class="cardSty">
				<view class="textSty">
					<text>请输入邀请码</text>
				</view>
				<view class="formSty">
					<uni-forms ref="conditionForm" :rules="rules" :modelValue="conditionFormData">
						<uni-forms-item name="conditionValue">
							<uni-easyinput v-model="conditionFormData.conditionValue" placeholder="请输入部门邀请码" />
						</uni-forms-item>
					</uni-forms>
				</view>
				
				<view class="button-group btnSty">
					<button type="error" size="mini" @click="reset">重置</button>
					<button type="primary" size="mini" @click="submit('valiForm')">提交</button>
				</view>
				<!-- <button type="primary" @click="submit('valiForm')">提交</button> -->
			</view>
		</scroll-view>
	</view>
</template>

<script lang="ts" setup>
	import {ref,reactive} from "vue";
	import {onResize} from '@dcloudio/uni-app'
	
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
	let conditionFormData = reactive({
		conditionValue:'', // 账号
	})
	
	// 声明表单组件，否则报错
	const conditionForm = ref(null);
	
	// 表单校验
	const rules = reactive({
		// 对搜索字段进行必填验证
		conditionValue: {
			rules: [{
				required: true,
				errorMessage: '请输入验证码',
			}]
		}
	})

	// 触发实践
	function submit(e){
		conditionForm.value.validate().then(res=>{
			uni.redirectTo({
				url:`department-detail?departmentCode=${res.conditionValue}`
			})
			// console.log('表单数据信息：', res);
		})
	}
	function reset(){
		conditionFormData.conditionValue = ''
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
					margin-top: 80rpx;
					display: flex; 
					justify-content: center;
				}
			}
			
		}
		
	}
</style>