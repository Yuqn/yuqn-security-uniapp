<template>
	<view class="back" :style="{height:height}">
		<view class="headSty">
			<image src="../../../static/image/loginLogo.png"></image>
		</view>
		<scroll-view scroll-y="true" class="scroll-Y scrollSty" :show-scrollbar="false">
			<view class="centSty" >
				<uni-card style="margin-top: 0;" v-if="isOk == '1'">
					<uni-forms ref="registerForm" :modelValue="registerFormData">
						<uni-forms-item label="学号" name="userName">
							<uni-easyinput v-model="registerFormData.userName" disabled placeholder="请输入学号"/>
						</uni-forms-item>
						<uni-forms-item label="姓名" name="nickName">
							<uni-easyinput v-model="registerFormData.nickName" placeholder="请输入姓名"/>
						</uni-forms-item>
						<uni-forms-item label="密码" name="password">
							<uni-easyinput type="password" v-model="registerFormData.password" placeholder="请输入密码"/>
						</uni-forms-item>
						<uni-forms-item label="重输密码" name="studentPasswordRepeat">
							<uni-easyinput type="password" v-model="registerFormData.password" placeholder="请重新输入密码"/>
						</uni-forms-item>
						<uni-forms-item label="身份证" name="card">
							<uni-easyinput v-model="registerFormData.card" placeholder="请输入身份证号码"/>
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
							<uni-data-picker placeholder="请选择班级" popup-title="请选择班级信息" :localdata="dataTree" v-model="registerFormData.societyClassesId"
								@change="onchange" @nodeclick="onnodeclick" @popupopened="onpopupopened" @popupclosed="onpopupclosed">
							</uni-data-picker>
						</uni-forms-item>
						<uni-forms-item label="手机号码" name="phonenumber">
							<uni-easyinput v-model="registerFormData.phonenumber" disabled/>
						</uni-forms-item>
						<uni-forms-item label="邮箱" name="email">
							<uni-easyinput v-model="registerFormData.email" placeholder="请输入邮箱"/>
						</uni-forms-item>
						<uni-forms-item label="性别" name="sex">
							<uni-data-checkbox v-model="registerFormData.sex" :localdata="sexs" />
						</uni-forms-item>
					</uni-forms>
				</uni-card>
			</view>
		</scroll-view>
		
		<view class="buttonSty">
			<button type="primary" @click="submit('customForm')">提交</button>
		</view>
	</view>
	<!-- 弹出层 -->
		<uni-popup ref="popup" type="message">
			<uni-popup-message :type="type" :message="message" :duration="2000"></uni-popup-message>
		</uni-popup>
</template>

<script setup lang="ts">
	import {ref,reactive, onMounted} from "vue";
	import {onResize,onReady,onLoad} from '@dcloudio/uni-app';
	import {IdentityCode} from '../../../utils/enums'
	import {registerUser,getDataTree,getDataGrade,getUserDetail,updateUser} from '../../../api/login'
	
	// 定义渲染
	let isOk = ref('0')
	// 定义屏幕高度
	const height = ref("");

	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		success: info => height.value = info.windowHeight  + "px"
	});
	
	// 用户数据集
	let registerFormData = reactive({})
	
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
	
	//
	let message = ref("");
	let type = ref("")
	
	// 弹出层事件
	function toggle() {
	  if (popup.value) {
	    popup.value.open(); // 直接调用 open 方法，不需要 this
	  } else {
	    console.warn('Popup ref is not yet set');
	  }
	}
	// 使用 ref 来获取 uni-popup 组件的引用
	const popup = ref<InstanceType<typeof UniPopup> | null>(null);
	
	// 接受页面参数
	onLoad(()=>{
		isOk.value = '0'
		// 获取年级
		getDataGrade().then(res=>{
			grade.push(...res.result)
		}).catch(err=>{
			console.log(err)
		})
		// 获取班级
		getDataTree().then(res=>{
			dataTree.push(...res.result)
		}).catch(err=>{
			console.log(err)
		})
		// 获取用户信息
		getUserDetail().then(res=>{
			if(res.code == '200'){
				console.log(res)
				registerFormData = res.result
				if(registerFormData.sex == 'UNKNOWN'){registerFormData.sex = '2'}
				if(registerFormData.sex == 'MALE'){registerFormData.sex = '0'}
				if(registerFormData.sex == 'FEMALE'){registerFormData.sex = '1'}
				isOk.value = '1'
			}
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
		if(e.detail.value.length != 0){
			// 院系-专业-班级
			registerFormData.societyCollegeId=e.detail.value[0].value
			registerFormData.societyMajorId=e.detail.value[1].value
			registerFormData.societyClassesId=e.detail.value[2].value
		}else{
			
		}
	}

	// 提交表单
	function submit(e){
		// if(registerFormData.sex == '2'){registerFormData.sex = 'UNKNOWN'}
		// if(registerFormData.sex == '0'){registerFormData.sex = 'MALE'}
		// if(registerFormData.sex == '1'){registerFormData.sex = 'FEMALE'}
		// 表单提交数据
		let params = reactive({
			"studentId":registerFormData.studentId,
			"userName":registerFormData.userName,
			"nickName":registerFormData.nickName,
			"password":registerFormData.password,
			"email":registerFormData.email,
			"phonenumber":registerFormData.phonenumber,
			"sex":registerFormData.sex,
			"card":registerFormData.card,
			"identity":'0',
			"societyGradeId":registerFormData.societyGradeId,
			"societyCollegeId":registerFormData.societyCollegeId,
			"societyMajorId":registerFormData.societyMajorId,
			"societyClassesId":registerFormData.societyClassesId
		})
		console.log("params",params)
		updateUser(params).then(res=>{
			if(res.code == '200'){
				message.value = "更改成功";
				type.value = 'success'
				toggle();
				setTimeout(()=>{
					uni.redirectTo({
						url:`/pages/home/index`
					})
				},1000)
			}else{
				message.value = "更改失败";
				type.value = 'warn'
				toggle();
			}
		})
		// registerUser(formData).then((e)=>{
		// 	console.log("e",e)
		// 	console.log("提交成功");
		// 	if(e.code == 200){
		// 		messageToggle("success","用户注册成功")
		// 		setTimeout(()=>{
		// 			uni.redirectTo({
		// 				url:'/pages/login/student/index?identityCode=' + encodeURIComponent(JSON.stringify(IdentityCode.STUDENT))
		// 			})
		// 		},2000)
		// 	}else{
		// 		messageToggle("error","注册失败，请检查填写信息")
		// 	}
		// }).catch((err=>{
		// 	console.log("err",err)
		// }))
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
			margin-bottom: 10rpx;
		}
		.scrollSty{
			// background-color: yellow;
			flex-grow: 1;
			.centSty{
				width: $widthrpx;
				height: 800rpx;
				.buttonTipSty{
					color: #e8e8e8;
					width: 100%; 
					height: 45rpx;
					font-size: 0.6rem;
					text-align: center;
				}
			}
		}
		.buttonSty{
			width: 660rpx;
			height: 100rpx;
			margin: 20rpx auto 20rpx;
		}
	}
	
</style>