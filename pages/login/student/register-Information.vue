<template>
	<view class="back" :style="{height:height}">
		<view>
			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>
		<view class="headSty">
			<image src="../../../static/image/loginLogo.png"></image>
		</view>
		<view class="centSty">
			<uni-card  margin="30rpx">
				<uni-forms ref="registerForm" :modelValue="registerFormData">
					<uni-forms-item label="学号" name="studentId">
						<uni-easyinput v-model="registerFormData.studentId" placeholder="请输入学号"/>
					</uni-forms-item>
					<uni-forms-item label="姓名" name="studentName">
						<uni-easyinput v-model="registerFormData.studentName" placeholder="请输入姓名"/>
					</uni-forms-item>
					<uni-forms-item label="密码" name="studentPassword">
						<uni-easyinput type="password" v-model="registerFormData.studentPassword" placeholder="请输入密码"/>
					</uni-forms-item>
					<uni-forms-item label="重输密码" name="studentPasswordRepeat">
						<uni-easyinput v-model="registerFormData.studentPasswordRepeat" placeholder="请重新输入密码"/>
					</uni-forms-item>
					<uni-forms-item label="身份证" name="studentCard">
						<uni-easyinput v-model="registerFormData.studentCard" placeholder="请输入身份证号码"/>
					</uni-forms-item>
					<uni-forms-item label="年级" name="societyGradeId">
						<uni-data-select
						        v-model="registerFormData.societyGradeId"
						        :localdata="grade"
						        @change="change"
						        :clear="false"
						      ></uni-data-select>
					</uni-forms-item>
					<uni-forms-item label="班级" name="studentCollegeMajorClass">
						<uni-data-picker placeholder="请选择班级" popup-title="请选择班级信息" :localdata="dataTree" v-model="classes"
							@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
						</uni-data-picker>
					</uni-forms-item>
					<uni-forms-item label="手机号码" name="studentPhone">
						<uni-easyinput v-model="registerFormData.studentPhone" disabled/>
					</uni-forms-item>
					<uni-forms-item label="邮箱" name="studentEmail">
						<uni-easyinput v-model="registerFormData.studentEmail" placeholder="请输入邮箱"/>
					</uni-forms-item>
					<uni-forms-item label="性别" name="studentSex">
						<uni-data-checkbox v-model="registerFormData.studentSex" :localdata="sexs" />
					</uni-forms-item>
				</uni-forms>
				<view class="buttonTipSty">
					<text>已有账号？<text style="color: #007aff;" @click="goLogin">去登录-> </text></text>
				</view>
			</uni-card>
		</view>
		<view class="buttonSty">
			<button type="primary" @click="submit('customForm')">提交</button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {ref,reactive, onMounted} from "vue";
	import {onResize,onReady,onLoad} from '@dcloudio/uni-app';
	import {IdentityCode} from '../../../utils/enums'
	import {registerUser,getDataTree,getDataGrade} from '../../../api/login'
	
	// 定义屏幕高度
	const height = ref("");

	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		success: info => height.value = info.windowHeight - 44 + "px"
	});
	
	// 用户数据集
	let registerFormData = reactive({
		studentId:'',
		studentName:'',
		studentPassword:'',
		studentPasswordRepeat:'',
		studentCard:'',
		studentPhone:'',
		studentEmail:'',
		studentSex:'2',
		societyGradeId:'',
		societyCollegeId:'',
		societyMajorId:'',
		societyClassesId:''
	})
	// 表单提交数据
	let formData = reactive({
		studentId:'',
		nickName:'',
		password:'',
		card:'',
		phonenumber:'',
		email:'',
		sex:'',
		identity:'',
		societyGradeId:'',
		societyCollegeId:'',
		societyMajorId:'',
		societyClassesId:''
	})
	const registerForm = ref(null);
	
	// 选择班级信息，为了实现选择器的清空功能（如果不绑定v-model，清空选择会报错），后续需要维护
	const classes = ref("")
	
	// 班级列表信息
	let dataTree= reactive([])
	
	// 年级信息
	let grade = reactive([])
	
	// 性别
	const sexs = reactive(
		[{
			text: '男',
			value: '0'
		}, {
			text: '女',
			value: '1'
		}, {
			text: '保密',
			value: '2'
		}]
	)
	
	// 提示弹窗属性
	let msgType = ref("success")
	let messageText = ref("这是一条成功提示")
	const message = ref(null)
	
	// 自定义表单校验
	const registerRules = reactive({
		studentId: {
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
		studentName: {
			rules: [{
					required: true,
					errorMessage: '请输入姓名',
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
		studentPassword: {
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
		studentSex: {
			rules: [{
					required: true,
					errorMessage: '请选择性别',
				},
				// {
				// 	validateFunction: function(rule, value, data, callback) {
				// 		if(value == ''){
				// 			callback('不能为空')
				// 		}
				// 		return true;
				// 	}
				// }
			]
		},
		studentPasswordRepeat:{
			rules: [{
					required: true,
					errorMessage: '请输入信息',
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
		societyGradeId:{
			rules: [{
					required: true,
					errorMessage: '请输入信息',
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
		registerForm.value.setRules(registerRules);
	})
	// 接受页面参数
	onLoad((option)=>{
		registerFormData.studentPhone = option.phonenumber
		console.log(option.phonenumber)
	})
	// onMou
	onMounted(()=>{
		// 获取班级
		getDataTree().then(res=>{
			dataTree.push(...res.result)
		}).catch(err=>{
			console.log(err)
		})
		// 获取年级
		getDataGrade().then(res=>{
			grade.push(...res.result)
		}).catch(err=>{
			console.log(err)
		})
	})
	// 选择班级后触发各种方法
	function onnodeclick(e) {
		console.log(e);
		console.log("new" , dataTree)
	}
	function onpopupopened(e) {
		console.log('popupopened');
		console.log("new" , dataTree)
	}
	function onpopupclosed(e) {
		console.log('popupclosed');
		console.log("new" , dataTree)
	}
	function onchange(e) {
		console.log("e",e)
		if(e.detail.value.length != 0){
			// 院系-专业-班级
			registerFormData.societyCollegeId=e.detail.value[0].value
			registerFormData.societyMajorId=e.detail.value[1].value
			registerFormData.societyClassesId=e.detail.value[2].value
		}else{
			
		}
	}
	// 提示弹窗,type:success表示成功
	function messageToggle(type,msg) {
		msgType.value = type;
		messageText.value = msg;
		message.value.open()
	}
	// 提交表单
	function submit(e){
		registerForm.value.validate().then(res=>{
			// console.log('表单数据信息：', res);
			formData.studentId = res.studentId;
			formData.nickName = res.studentName;
			formData.password = res.studentPassword;
			formData.card = res.studentCard;
			formData.phonenumber = res.studentPhone;
			formData.email = res.studentEmail;
			formData.sex = res.studentSex;
			formData.identity = IdentityCode.STUDENT;
			formData.societyGradeId = res.societyGradeId;
			formData.societyCollegeId = registerFormData.societyCollegeId;
			formData.societyMajorId = registerFormData.societyMajorId;
			formData.societyClassesId = registerFormData.societyClassesId;
			console.log("formData",formData)
			registerUser(formData).then((e)=>{
				console.log("e",e)
				console.log("提交成功");
				if(e.code == 200){
					messageToggle("success","用户注册成功")
					setTimeout(()=>{
						uni.redirectTo({
							url:'/pages/login/student/index?identityCode=' + encodeURIComponent(JSON.stringify(IdentityCode.STUDENT))
						})
					},2000)
				}else{
					messageToggle("error","注册失败，请检查填写信息")
				}
			}).catch((err=>{
				console.log("err",err)
			}))
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
	
	// 选择年级
	function change(e){
		console.log('e',e)
	}
	
</script>

<style lang="scss" scoped>
	$widthrpx: 750rpx;
	page{
		background-color: #EDF3FC;
	}
	.back{
		background-color: #EDF3FC;
		width: $widthrpx;
		display: flex;
		flex-direction: column;
		.headSty image{
			width: $widthrpx;
			height: 250rpx;
		}
		.centSty{
			width: $widthrpx;
			flex-grow: 1;
			.buttonTipSty{
				color: #e8e8e8;
				width: 100%; 
				height: 45rpx;
				font-size: 0.6rem;
				text-align: center;
			}
		}
		.buttonSty{
			width: 660rpx;
			height: 100rpx;
			padding-top: 20rpx;
			margin: auto;
		}
	}
	
</style>