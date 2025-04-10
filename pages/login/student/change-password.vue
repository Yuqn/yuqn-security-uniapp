<template>
	<loginComponent @data-to-parent="handleDataFromChild">
		<view class="cardSty">
			<view class="uni-padding-wrap uni-common-mt itemSty">
				<uni-segmented-control :current="current" :values="items" :style-type="styleType"
					:active-color="activeColor" />
			</view>
			<view class="contentSty">
				<view v-if="current === 0">
					<uni-forms ref="studentForm" :modelValue="formData">
						<uni-forms-item name="password">
							<uni-easyinput v-model="formData.password" placeholder="请输入密码" />
						</uni-forms-item>
						<uni-forms-item name="reenter">
							<uni-easyinput v-model="formData.reenter" type="password" placeholder="请重新输入密码" />
						</uni-forms-item>
					</uni-forms>
				</view>
			</view>
			<view class="buttonSty" >
				<text>请输入一个没有注册过的手机号码进行注册</text>
			</view>
			<view class="buttonSty">
				<text >
					已有账号？<text style="color: #007aff;" @click="goLogin">去登录-> </text>
				</text>
			</view>
		</view>
	</loginComponent>
	<!-- 弹出层 -->
	<uni-popup ref="popup" type="message">
		<uni-popup-message type="warn" :message="message" :duration="2000"></uni-popup-message>
	</uni-popup>
</template>

<script lang="ts" setup>
	import { reactive,ref } from 'vue';
	import {onReady,onLoad} from '@dcloudio/uni-app';
	import loginComponent from '../components/login.vue';
	import {IdentityCode} from '../../../utils/enums'
	import {changePassword} from '../../../api/login'
	
	// 创建一个响应式引用
	const verifyElement = ref(null);
	
	// 关于切换登录方式的渲染数据
	const items = reactive(['重置密码'])
	const styleType= ref('text')
	const activeColor = ref('#007aff')
	const current = ref(0)
	
	// 用户数据集
	const formData = reactive({password:'',reenter:''})
	const studentForm = ref(null);
	
	// 使用 ref 来获取 uni-popup 组件的引用
	const popup = ref<InstanceType<typeof UniPopup> | null>(null);
	
	// 
	let message = ref("");
	
	// 弹出层事件
	function toggle() {
	  if (popup.value) {
	    popup.value.open(); // 直接调用 open 方法，不需要 this
	  } else {
	    console.warn('Popup ref is not yet set');
	  }
	}
	
	// 子组件方法
	// 定义一个函数来处理从子组件接收到的事件和数据
	function handleDataFromChild(data: { message: string, value: number }){
		console.log(data.message)
		console.log(data.value)
		
		// 读取缓存
		// console.log("huancn",JSON.parse(decodeURIComponent(uni.getStorageSync('phonenumber'))))
		
		studentForm.value.validate().then(res=>{
			// 判断是否一致
			if (!(formData.password == formData.reenter)){
				message.value = "输入密码不一致，请重试";
				toggle();
				return;
			}
			// 表单提交数据
			let params = reactive({
				"phonenumber" : JSON.parse(decodeURIComponent(uni.getStorageSync('phonenumber'))),
				"newPassword" : formData.password
			});
			changePassword(params).then((e)=>{
				if(e.code == 200){
					// 校验结果没有注册过，跳转下一步
					console.log("更改成功")
					uni.removeStorageSync('phonenumber');
					uni.showToast({
						title: `更改密码成功`
					})
					// message.value = "密码更改成功，准备前往登录...";
					// toggle()
					// 跳转
					uni.redirectTo({
						url:'/pages/login/student/index?identityCode=' + encodeURIComponent(JSON.stringify(IdentityCode.STUDENT))
					})
				}else{
					console.log("更改成功")
				}
			}).catch((err)=>{
				console.log(err)
			})
			console.log('表单数据信息：', res);
		}).catch(err =>{
			console.log('表单错误信息：', err);
		})
	}
	
	// 去登录
	function goLogin(){
		uni.redirectTo({
			url:'/pages/login/student/index?identityCode=' + encodeURIComponent(JSON.stringify(IdentityCode.STUDENT))
		})
	}
	
	// 自定义表单校验
	const customRules= reactive({
		password: {
			rules: [{
					required: true,
					errorMessage: '不能为空',
				},
				{
					validateFunction: function(rule, value, data, callback) {
						if(value == ''){
							callback('不能为空')
						}
						return true;
					}
				}
			]
		},
		reenter: {
			rules: [{
					required: true,
					errorMessage: '不能为空',
				},
				{
					validateFunction: function(rule, value, data, callback) {
						if(value == ''){
							callback('不能为空')
						}
						return true;
					}
				}
			]
		}
	}) 
	// 设置自定义表单校验规则，必须在节点渲染完毕后执行
	onReady(()=>{
		studentForm.value.setRules(customRules);
	})

</script>

<style lang="scss" scoped>
	.cardSty{
		width: 500rpx;
		height: 520rpx; 
		margin: 0 auto; 
		.itemSty{
			height:120rpx;
		}
		.contentSty{
			width: 100%; 
			height: 290rpx;
			.content-forms-input-sty{
				width: 300rpx; 
				float: left;
			}
			.content-forms-view-sty{
				 width: 170rpx; 
				 height: 100%; 
				 float: left; 
				 margin-left: 20rpx; 
				 background-color: #e8e8e8;
			}
			.getCodeSty{
				width: 200rpx; 
				height: 100%; 
				float: left;
			}
			.getCodeWindowSty{
				position: absolute; 
				z-index: 111; 
				background-color: rgba(255, 255, 255, 0.2); 
				width: 200rpx; 
				height: 100%;
			}
			.getCodeButtonSty{
				 width: 200rpx; 
				 float: left; 
				 text-align: center; 
				 z-index: 1;
			}
			.sliderSty{
				 width: 500rpx; 
				 height: 100%; 
				 float: left;
			}
		}
		.buttonSty{
			color: #e8e8e8;
			width: 100%; 
			height: 35rpx;
			font-size: 20rpx;
			text-align: center;
		}
	}
	
</style>