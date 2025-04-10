<template>
	<loginComponent @data-to-parent="handleDataFromChild">
		<view class="cardSty">
			<view class="uni-padding-wrap uni-common-mt itemSty">
				<uni-segmented-control :current="current" :values="items" :style-type="styleType"
					:active-color="activeColor" @clickItem="onClickItem" />
			</view>
			<view class="contentSty">
				<view v-if="current === 0">
					<uni-forms ref="verificationForm" :modelValue="verificationFormData">
						<uni-forms-item name="phonenumber">
							<uni-easyinput v-model="verificationFormData.phonenumber" placeholder="请输入手机号码" />
						</uni-forms-item>
						<uni-forms-item  name="verificationCode">
							<view class="content-forms-input-sty">
								<uni-easyinput v-model="verificationFormData.verificationCode" placeholder="请输入验证码" />
							</view>
							<!-- <view class="getCodeSty">
								<view class="getCodeWindowSty" @click="getCodeForPho()"></view>
								<uni-easyinput class="getCodeButtonSty" placeholder="获取验证码"/>
							</view> -->
							<view class="getCodeSty" style=" display: flex;justify-content: center; align-items: center;">
								<view style="width: 90%; height: 90%; display: flex; justify-content: center; align-items: center; border: 1rpx solid gainsboro; font-size: 0.7rem;" @click="getCodeForPho()">
									<text style="color: #007aff;">获取验证码</text>
								</view>
							</view>
						</uni-forms-item>
						<uni-forms-item name="verificationCode">
							<view class="sliderSty">
								<chenzuheng-verify-slider style="100%" @result='verifyResult' ref="verifyElement"></chenzuheng-verify-slider>
							</view>
						</uni-forms-item>
					</uni-forms>
				</view>
			</view>
			<view class="buttonSty" >
				<text>请输入一个没有注册过的手机号码进行注册</text>
			</view>
			<view class="buttonSty">
				<text>
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
	import {isRegister} from '../../../api/login'
	
	// 创建一个响应式引用
	const verifyElement = ref(null);
	
	// 关于切换登录方式的渲染数据
	const items = reactive(['手机号码验证'])
	const styleType= ref('text')
	const activeColor = ref('#007aff')
	const current = ref(0)
	
	// 用户数据集
	const verificationFormData = reactive({phonenumber:'',verificationCode:''})
	const verificationForm = ref(null);
	
	// 保存验证码
	const securityCode = ref('1a2e')
	
	// 保存滑块结果
	let resultData = ref(false)
	
	// 保存传递参数，0：用于注册，1：用于重置密码
	const enumType = ref("")
	
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
	
	// 接受页面参数（0，注册验证手机号码）
	onLoad((option)=>{
		enumType.value = JSON.parse(decodeURIComponent(option.enumType));
	})
	
	// 去登录
	function goLogin(){
		uni.redirectTo({
			url:'/pages/login/student/index?identityCode=' + encodeURIComponent(JSON.stringify(IdentityCode.STUDENT))
		})
	}
	
	// 子组件方法
	// 定义一个函数来处理从子组件接收到的事件和数据
	function handleDataFromChild(data: { message: string, value: number }){
		console.log(data.message)
		console.log(data.value)
		if(enumType.value == '0'){
			// 校验滚动条
			if(!resultData.value){
				message.value = "请向右滑动滑块完成验证";
				toggle();
				return;
			}
			verificationForm.value.validate().then(res=>{
				console.log('表单数据信息：', res);
				// 判断验证码
				if(!(verificationFormData.verificationCode == '123456')){
					message.value = "验证码错误，请输入正确验证码";
					toggle();
					return;
				}
				// 表单提交数据
				const params = reactive({
				  "phonenumber":verificationFormData.phonenumber
				});
				isRegister(params).then((e)=>{
					if(e.code == 200){
						// 校验结果没有注册过，跳转下一步
						uni.redirectTo({
							url:"/pages/login/student/register-Information?phonenumber=" + verificationFormData.phonenumber
						})
					}else{
						console.log("已经注册过了,请前往登录")
						message.value = "该号码已经注册过了,请前往登录";
						toggle();
					}
				}).catch((err)=>{
					console.log(err)
				})
			}).catch(err =>{
				console.log('表单错误信息：', err);
			})
		}else{
			// 校验滚动条
			if(!resultData.value){
				message.value = "请向右滑动滑块完成验证";
				toggle();
				return;
			}
			verificationForm.value.validate().then(res=>{
				console.log('表单数据信息：', res);
				// 判断验证码
				if(!(verificationFormData.verificationCode == '123456')){
					message.value = "验证码错误，请输入正确验证码";
					toggle();
					return;
				}
				// 表单提交数据
				const params = reactive({
				  "phonenumber":verificationFormData.phonenumber
				});
				isRegister(params).then((e)=>{
					if(e.code == 200){
						// 校验结果没有注册过，跳转下一步
						console.log("没有该用户信息，请前往注册！")
						message.value = "没有该用户信息，请前往注册！";
						toggle();
					}else{
						// 存入缓存中
						uni.setStorageSync('phonenumber', encodeURIComponent(JSON.stringify(verificationFormData.phonenumber)));
						uni.redirectTo({
							url:"/pages/login/student/change-password"
						})
					}
				}).catch((err)=>{
					console.log(err)
				})
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
		resultData.value = res.flag;
	}
	/* 校验插件重置 */
    function verifyReset(){
		console.log("verifyElement" ,verifyElement.value)
		verifyElement.value.reset();
		/* 删除当前页面的数据 */
		resultData.value = false
	}
	
	// 自定义表单校验
	const customRules= reactive({
		phonenumber: {
			rules: [{
					required: true,
					errorMessage: '请输入号码',
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
		}
	}) 
	// 设置自定义表单校验规则，必须在节点渲染完毕后执行
	onReady(()=>{
		verificationForm.value.setRules(customRules);
	})
	
	// 切换手机号、密码登录方式，切换显示内容
	function onClickItem(e) {
		if (current.value !== e.currentIndex) {
			current.value = e.currentIndex;
		}
	}
	
	// 获取手机验证码
	function getCodeForPho(){
		console.log("获取验证码为：",123456)
	}
	
	// 登录跳转
	function submit(form) {
		verificationForm.value.validate().then(res=>{
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
			height: 360rpx;
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