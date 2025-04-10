<template>
	<view class="back" :style="{height:height}">
		<view class="loginLogo" style="position: relative;">
			<image src="../../static/image/bgFont.jpg"></image>
			<!-- 文字描述 -->
			<view style="position: absolute; top: 80rpx; left: 40rpx; width: 400rpx;height: 80rpx; ">
				<view style="margin-bottom: 10rpx;">
					<text style="color: #EDF3FC; font-size: 1.2rem; font-weight: 500;">系统使用须知</text>
				</view>
			</view>
		</view>
		<view class="disclaimerText">
			<view class="textSty">
				<text>使用须知</text>
			</view>
			<scroll-view class="centSty scroll-Y" scroll-y="true" scroll-top :show-scrollbar="false"> 
				<text>
					使用管理系统前须仔细阅读本须知：\n\n					一、所有社团成员需使用真实信息完成系统注册，包括但不限于姓名、学号/工号、联系方式等。\n\n					二、社团成员应妥善保管个人登录账号和密码，不得随意泄露给他人。\n\n					三、系统中存储的社团资料、活动计划、成员信息等均为内部资料，未经允许不得擅自外传。\n\n					四、对于系统使用中的任何问题或建议，成员可通过系统内的反馈渠道提交，管理员应及时响应处理。\n\n					五、活动申请需经社团负责人或指定审批人审核通过后，方可在系统内外正式发布。\n\n
					六、对于违反本条例的行为，如未经授权访问系统、泄露敏感信息、恶意破坏数据等，将视情节轻重给予警告、限制权限、直至移除账号等处罚。\n\n
					七、涉及违法行为的，将依法追究法律责任。\n\n
					八、使用者阅读并勾选“我已阅读并同意”后，视为同意使用该系统并且同意系统的所有使用规范。\n\n
				</text>
			</scroll-view>
			<view class="bottomSty">
				<checkbox-group @change="checkboxChange">
					<label>
						<checkbox value="check" color="#3376eb" style="transform:scale(0.6)"/>我已阅读并同意
					</label>
				</checkbox-group>
			</view>
		</view>
		<view class="buttonSty">
			<button type="primary" @click="goLogin()">确认</button>
		</view>
	</view>
	<!-- 弹出层 -->
	<view>
		<uni-popup ref="popup" background-color="#fff" :mask-click="false">
			<uni-popup-dialog title="提示" mode="base" content="是否已读并且同意使用说明?点击确认同意使用并进入系统!" :duration="2000" :before-close="true" @close="close" @confirm="confirm">
			</uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script setup lang="ts">
	import {ref,reactive} from "vue";
	import {onResize,onLoad} from '@dcloudio/uni-app';
	import {IsCheck,IdentityCode} from '../../utils/enums'
	
	let isOk = ref('0')
	// 定义屏幕高度
	let height = ref("");
	// 定义是否勾选，默认否
	let isAgree = ref(IsCheck.NO);
	// 用户定义类型,0为学生，1为老师，-1为其他
	let identityCode = ref(IdentityCode.ORDER);
	// 接受页面参数
	onLoad((option)=>{
		console.log('option.identityCode',option.identityCode)
		identityCode.value = JSON.parse(decodeURIComponent(option.identityCode));
		console.log("identityCode.value",identityCode.value)
	})
	// 跳转登录界面
	function goLogin(){
		if(isAgree.value == IsCheck.YES && identityCode.value == IdentityCode.STUDENT){
			// console.log("准备跳转学生登录界面")
			uni.navigateTo({url: '/pages/login/student/index?identityCode=' + encodeURIComponent(JSON.stringify(IdentityCode.STUDENT))})
			console.log("准备跳转学生登录界面")
		}else if(isAgree.value == IsCheck.YES && identityCode.value == IdentityCode.TEACHER){
			uni.navigateTo({url:'/pages/login/teacher/index?identityCode=' + encodeURIComponent(JSON.stringify(IdentityCode.TEACHER))})
			console.log("准备跳转老师登录界面")
		}
		else{
			toggle('center');
			console.log("请勾选同意选项");
		}
	};
	// 监听是否勾选同意
	function checkboxChange(e){
		if(e.detail.value.length){
			isAgree.value = IsCheck.YES;
		}else{
			isAgree.value = IsCheck.NO;
		}
	}
	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		success: info => height.value = info.windowHeight - 44 + "px"
	});
	
	// 使用 ref 来获取 uni-popup 组件的引用
	const popup = ref<InstanceType<typeof UniPopup> | null>(null);
	
	// 定义弹出层数据
	let popupData = reactive({
		type:'center',
		msgType: 'success',
		messageText: '这是一条成功提示',
		value: ''
	})
	
	// 弹出层事件
	function toggle(type: string) {
	  popupData.type = type;
	  if (popup.value) {
	    popup.value.open(type); // 直接调用 open 方法，不需要 this
	  } else {
	    console.warn('Popup ref is not yet set');
	  }
	}
	function close() {
		// TODO 做一些其他的事情，before-close 为true的情况下，手动执行 close 才会关闭对话框
		// ...
		popup.value.close()
		// this.$refs.popup.close()
	}
	/**
	 * 点击确认按钮触发
	 * @param {Object} done
	 * @param {Object} value
	 */
	function confirm(value) {
		// 输入框的值
		console.log(value)
		// 同意更新直接跳转
		if(identityCode.value == IdentityCode.STUDENT){
			// console.log("准备跳转学生登录界面")
			uni.navigateTo({url: '/pages/login/student/index?identityCode=' + encodeURIComponent(JSON.stringify(IdentityCode.STUDENT))})
			console.log("准备跳转学生登录界面")
		}else if(identityCode.value == IdentityCode.TEACHER){
			uni.navigateTo({url:'/pages/login/teacher/index?identityCode=' + encodeURIComponent(JSON.stringify(IdentityCode.STUDENT))})
			console.log("准备跳转老师登录界面")
		}
		// this.$refs.popup.close()
		popup.value.close()
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
		.loginLogo image{
			width: $widthrpx;
			height: 210rpx;
		}
		.disclaimerText{
			width: $widthrpx;
			flex-grow: 1;
			height: 500rpx;
			display: flex; 
			flex-direction: column;
			.textSty{
				height: 90rpx;
				width: $widthrpx;
				text-align: center;
				line-height: 90rpx;
				font-size: 40rpx;
				color: #0A6DEC;
			}
			.centSty{
				width: 680rpx;
				flex-grow: 1;
				// background-color: yellow;
				margin: 0rpx auto 0rpx;
				overflow: auto;
				font-size: 26rpx;
			}
			.bottomSty{
				font-size: 22rpx;
				width: $widthrpx;
				height: 80rpx;
				line-height: 80rpx;
				border-top: white 1rpx solid ;
				color: #3376eb;
			}
		}
		.buttonSty{
			width: 660rpx;
			height: 120rpx;
			// padding-top: 20rpx;
			margin: 5rpx auto 5rpx;
		}
	}
	
</style>