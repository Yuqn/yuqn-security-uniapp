<template>
	<loginComponent @data-to-parent="handleDataFromChild">
		<view class="cardSty">
			<view class="uni-padding-wrap uni-common-mt itemSty">
				<uni-segmented-control :current="current" :values="items" :style-type="styleType"
					:active-color="activeColor"/>
			</view>
			<view class="contentSty">
				<view v-if="current === 0">
					<uni-forms ref="teacherForm" :modelValue="teacherFormData">
						<uni-forms-item name="userName">
							<uni-easyinput v-model="teacherFormData.userName" placeholder="请输入账号" />
						</uni-forms-item>
						<uni-forms-item  name="password">
							<uni-easyinput v-model="teacherFormData.password" placeholder="请输入密码" />
						</uni-forms-item>
						<uni-forms-item name="verificationCode" style="width: 100%;">
							<view class="content-forms-input-sty">
								<uni-easyinput  v-model="teacherFormData.verificationCode" placeholder="输入验证码" />
							</view>
							<view class="content-forms-view-sty">
								 <jp-verification-literalness @getCode="getCode" :securityCode="securityCode" :content-width="174" :content-height="68"></jp-verification-literalness>
							</view>
						</uni-forms-item>
					</uni-forms>
				</view>
			</view>
			<view class="buttonSty">
				此界面为教师、管理员身份登录，如果你是学生，请通过学生通道进行系统登录！
				<!-- <navigator class="button-navigator-sty button-navigator-right-sty">忘记密码?</navigator> -->
			</view>
		</view>
	</loginComponent>
</template>

<script lang="ts" setup>
	import { reactive,ref } from 'vue';
	import {onReady} from '@dcloudio/uni-app';
	import loginComponent from '../components/login.vue';
	import {userLogin} from '../../../api/login'
	
	// 创建一个响应式引用
	const verifyElement = ref(null);
	
	// 关于切换登录方式的渲染数据
	const items = reactive(['账号密码登录'])
	const styleType= ref('text')
	const activeColor = ref('#007aff')
	const current = ref(0)
	
	// 用户数据集
	const teacherFormData = reactive({userName:'',password:'',loginType:'',verificationCode:''})
	const teacherForm = ref(null);
	
	// 保存验证码
	const securityCode = ref('1a2e')
	
	// 表单提交数据
	let formData = reactive({
		userName:'', // 账号
		password:'', // 密码
		loginType:'1', // 登录类型，0：手机号码登录；1：账户密码登录
		identity:'1', // 用户类型，0：学生；1：教师
	})
	
	// 子组件方法
	// 定义一个函数来处理从子组件接收到的事件和数据
	function handleDataFromChild(data: { message: string, value: number }){
		console.log(data.message)
		console.log(data.value)
		teacherForm.value.validate().then(res=>{
			// 构造表单提交
			formData = {
				userName:'', // 账号
				password:'', // 密码
				loginType:'1', // 登录类型，0：手机号码登录；1：账户密码登录
				identity:'1', // 用户类型，0：学生；1：教师
			}
			formData.userName = res.userName;
			formData.password = res.password;
			formData.loginType = '1';
			formData.identity = '1';
			userLogin(formData)
			.then(res=>{
				if(res.code == 200){
					// 存储用户信息
					uni.setStorageSync('token',res.result.token);
					// 跳转
					// uni.navigateTo({
					// 	url:'/pages/login/student/index?identityCode=' + encodeURIComponent(JSON.stringify(IdentityCode.STUDENT))
					// })
				}
			})
			.catch(err=>{
				console.log(err)
			})
			console.log('表单数据信息：', res);
		}).catch(err =>{
			console.log('表单错误信息：', err);
		})
	}
	
	// 生成四位验证码
	function getCode(){
		let code = '';
		const random = [
		  1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
		  'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
		  'X', 'Y', 'Z',
		];
		for (let i = 0; i < 4; i++) {
		  let index = Math.floor(Math.random() * 34);
		  code += random[index];
		}
		securityCode.value = code;
	}
	
	// 自定义表单校验
	const customRules= reactive({
		userName: {
			rules: [{
					required: true,
					errorMessage: '请输入账号',
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
		password: {
			rules: [{
					required: true,
					errorMessage: '请输入密码',
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
		verificationCode: {
			rules: [{
					required: true,
					errorMessage: '请输入验证码',
				},
				{
					validateFunction: function(rule, value, data, callback) {
						if(value == ''){
							callback('不能为空')
						}
						return true
					}
				}
			]
		}
	}) 
	// 设置自定义表单校验规则，必须在节点渲染完毕后执行
	onReady(()=>{
		teacherForm.value.setRules(customRules);
	})
	
	// 登录跳转
	function submit(form) {
		teacherForm.value.validate().then(res=>{
			console.log('表单数据信息：', res);
		}).catch(err =>{
			console.log('表单错误信息：', err);
		})
	}
	
</script>

<style lang="scss" scoped>
	.cardSty{
		width: 500rpx;
		height: 570rpx; 
		margin: 0 auto; 
		.itemSty{
			height:120rpx;
		}
		.contentSty{
			width: 100%; 
			height: 355rpx;
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
		}
		.buttonSty{
			 width: 100%; 
			 height: 60rpx; 
			 display: flex;
			 font-size: 20rpx; 
			 color: dodgerblue;
			 .button-navigator-sty{
				width: 50%; 
				text-align: center; 
				background-color: white; 
				line-height: 60rpx;
				border-top: 1rpx solid #e8e8e8;
			 }
			 .button-navigator-left-sty{
				border-right: 1rpx solid #e8e8e8; 
			 }
			 .button-navigator-right-sty{
			 	
			 }
		}
	}
	
</style>