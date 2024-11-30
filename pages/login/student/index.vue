<template>
	<loginComponent @data-to-parent="handleDataFromChild">
		<view class="cardSty">
			<view class="uni-padding-wrap uni-common-mt itemSty">
				<uni-segmented-control :current="current" :values="items" :style-type="styleType"
					:active-color="activeColor" @clickItem="onClickItem" />
			</view>
			<view class="contentSty">
				<view v-if="current === 0">
					<uni-forms ref="studentFormPhone" :modelValue="studentFormPhoneData" :rules="rules">
						<uni-forms-item name="userPhone">
							<uni-easyinput v-model="studentFormPhoneData.userPhone" placeholder="请输入手机号码" />
						</uni-forms-item>
						<uni-forms-item  name="phoneCode">
							<view class="content-forms-input-sty">
								<uni-easyinput v-model="studentFormPhoneData.phoneCode" placeholder="请输入验证码" />
							</view>
							<view class="getCodeSty">
								<view class="getCodeWindowSty" @click="getCodeForPho"></view>
								<uni-easyinput class="getCodeButtonSty" placeholder="获取验证码"/>
							</view>
						</uni-forms-item>
						<uni-forms-item name="sliderResult">
							<view class="sliderSty">
								<chenzuheng-verify-slider style="height: 100%;" @result='verifyResult' ref="verifyElement"></chenzuheng-verify-slider>
							</view>
						</uni-forms-item>
					</uni-forms>
				</view>
				<view v-if="current === 1">
					<uni-forms ref="studentForm" :modelValue="studentFormData" :rules="rules">
						<uni-forms-item name="userName">
							<uni-easyinput v-model="studentFormData.userName" placeholder="请输入账号" />
						</uni-forms-item>
						<uni-forms-item  name="password">
							<uni-easyinput v-model="studentFormData.password" placeholder="请输入密码" />
						</uni-forms-item>
						<uni-forms-item name="verificationCode" >
							<view class="content-forms-input-sty">
								<uni-easyinput v-model="studentFormData.verificationCode" placeholder="输入验证码" />
							</view>
							<view class="content-forms-view-sty">
								 <jp-verification-literalness @getCode="getCode" :securityCode="securityCode" :content-width="174" :content-height="68"></jp-verification-literalness>
							</view>
						</uni-forms-item>
					</uni-forms>
				</view>
			</view>
			<view class="buttonSty">
				<navigator class="button-navigator-sty button-navigator-left-sty" url="verification-number?enumType=0" open-type="redirect"> 去注册 -> </navigator>
				<navigator class="button-navigator-sty button-navigator-right-sty" url="verification-number?enumType=1" open-type="redirect">忘记密码?</navigator>
			</view>
		</view>
	</loginComponent>
</template>

<script lang="ts" setup>
	import { reactive,ref } from 'vue';
	import loginComponent from '../components/login.vue';
	import {userLogin} from '../../../api/login'
	
	// 创建一个响应式引用
	const verifyElement = ref(null);
	
	// 关于切换登录方式的渲染数据
	const items = reactive(['手机号码登录', '账号密码登录'])
	const styleType = ref('text')
	const activeColor = ref('#007aff')
	const current = ref(0)
	
	// 用户数据集
	let studentFormPhoneData = reactive({userPhone:'',phoneCode:''})
	let studentFormData = reactive({userName:'',password:'',verificationCode:''})
	const studentForm = ref(null);
	const studentFormPhone = ref(null);
	
	// 表单提交数据
	let formData = reactive({
		userName:'', // 账号
		password:'', // 密码
		phonenumber:'', // 手机号码
		loginType:'0', // 登录类型，0：手机号码登录；1：账户密码登录
		identity:'0', // 用户类型，0：学生；1：教师
	})
	
	// 保存验证码
	let securityCode = ref('1a2e')
	
	// 保存滑块结果
	let resultData = ref(false)
	
	// 子组件方法
	// 定义一个函数来处理从子组件接收到的事件和数据
	function handleDataFromChild(data: { message: string, value: number }){
		console.log(data.message)
		console.log(data.value)
		if(current.value==0){
			studentFormPhone.value.validate().then(res=>{
				// 构造表单提交
				formData = {
					userName:'', // 账号
					password:'', // 密码
					phonenumber:'', // 手机号码
					loginType:'0', // 登录类型，0：手机号码登录；1：账户密码登录
					identity:'0', // 用户类型，0：学生；1：教师
				}
				formData.userName = res.userName;
				formData.password = res.password;
				formData.phonenumber = res.userPhone;
				formData.loginType = '0';
				formData.identity = '0';
				userLogin(formData).then((res)=>{
					console.log("登录结果",res)
					if(res.code == 200){
						// 存储用户信息
						uni.setStorageSync('token',res.result.token);
						// 跳转
						uni.navigateTo({
							url:"/pages/login/student/select-character"
						})
					}
				}).catch((err)=>{
					console.log(err)
				})
				console.log('表单数据信息：', res);
			}).catch(err =>{
				console.log('表单错误信息：', err);
			})
		}else{
			studentForm.value.validate().then(res=>{
				// 构造表单提交
				formData = {
					userName:'', // 账号
					password:'', // 密码
					phonenumber:'', // 手机号码
					loginType:'0', // 登录类型，0：手机号码登录；1：账户密码登录
					identity:'0', // 用户类型，0：学生；1：教师
				}
				formData.userName = res.userName;
				formData.password = res.password;
				formData.phonenumber = res.userPhone;
				formData.loginType = '1';
				formData.identity = '0';
				userLogin(formData).then(res=>{
					if(res.code == 200){
						// 存储用户信息
						uni.setStorageSync('token',res.result.token);
						// 跳转
						uni.navigateTo({
							url:"/pages/login/student/select-character"
						})
					}
				}).catch(err=>{
					console.log('表单错误信息：', err);
				})
				console.log('表单数据信息：', res);
			}).catch(err =>{
				console.log('表单错误信息：', err);
			})
		}
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
	
	// 校验结果回调函数
	function verifyResult(res){
		resultData = res.flag;
	}
	/* 校验插件重置 */
 //    function verifyReset(){
	// 	console.log("verifyElement" ,verifyElement.value)
	// 	verifyElement.value.reset();
	// 	/* 删除当前页面的数据 */
	// 	resultData = {};
	// 	console.log("resultData======" + JSON.stringify(resultData))
	// }
	// 表单校验
	const rules = reactive({
		// 对name字段进行必填验证
		userPhone: {
			rules: [{
					required: true,
					errorMessage: '请输入姓名',
				},
				{
					minLength: 3,
					maxLength: 15,
					errorMessage: '姓名长度在 {minLength} 到 {maxLength} 个字符',
				}
			]
		},
		// 对email字段进行必填验证
		phoneCode: {
			rules: [{
				required: true,
				errorMessage: '请输入验证码',
			}]
		},
		// 用户名
		userName:{
			rules: [{
				required: true,
				errorMessage: '请输入用户名',
			}]
		},
		// 密码
		password:{
			rules: [{
				required: true,
				errorMessage: '请输入密码',
			}]
		},
		// 验证码
		verificationCode:{
			rules: [{
				required: true,
				errorMessage: '请输入验证码',
			},
			{
				validateFunction: function(rule, value, data, callback) {
					if(value != securityCode.value){
						callback('验证码错误')
					}
					return true;
				}
			}]
		}
	})
	// 切换手机号、密码登录方式，切换显示内容
	function onClickItem(e) {
		if (current.value !== e.currentIndex) {
			current.value = e.currentIndex;
		}
	}
	
	// 获取手机验证码
	function getCodeForPho(){
		console.log("点击获取验证码")
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
			height: 390rpx;
			.content-forms-input-sty{
				width: 300rpx; 
				float: left;
			}
			.content-forms-view-sty{
				 width: 170rpx; 
				 height: 100%;
				 float: left; 
				 margin-left: 20rpx; 
				 // border: 1rpx solid yellow;
				 // background-color: #e8e8e8;
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