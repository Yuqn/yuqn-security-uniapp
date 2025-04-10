<template>
	<homeComponent :titleTip="titleTip" :roleFunList="roleFunList" :basicFunList="basicFunList" @data-to-parent="handleDataFromChild" @click-role-fun="getClickRoleFun" @click-basic-fun="getBasicFun"></homeComponent>
	<!-- 弹出层 -->
	<uni-popup ref="popup" type="message">
		<uni-popup-message type="warn" :message="message" :duration="2000"></uni-popup-message>
	</uni-popup>
</template>

<script lang="ts" setup>
	import homeComponent from '@/components/home/index.vue'
	import { reactive,ref } from 'vue';
	import {getUserMenu} from '../../api/home'
	import {onLoad} from '@dcloudio/uni-app';
	import {logout} from '../../api/login'
	
	// 头部显示数据
	let titleTip = reactive({
		greetings:"",
		organization:"",
		identity:""
	})
	
	// 使用 ref 来获取 uni-popup 组件的引用
	const popup = ref<InstanceType<typeof UniPopup> | null>(null);
	
	// tchuc
	let message = ref("")
	
	// 角色功能渲染数据
	let roleFunList = reactive([])
	// 基本功能模块渲染数据
	let basicFunList = reactive([{
		id:'1a2a',
		url: '/static/c1.png',
		text: '个人信息'
	},
	{
		id:'1a2b',
		url: '/static/c2.png',
		text: '退出登录'
	},
	{
		url: '/static/c3.png',
		text: '学校社团'
	},
	{
		id:'1a2c',
		url: '/static/c4.png',
		text: '关于学校'
	},
	{
		url: '/static/c8.png',
		text: '系统反馈'
	},
	{
		id:'1a2d',
		url: '/static/c8.png',
		text: '免责声明'
	}])
	
	// 弹出层事件
	function toggle() {
	  if (popup.value) {
	    popup.value.open(); // 直接调用 open 方法，不需要 this
	  } else {
	    console.warn('Popup ref is not yet set');
	  }
	}
		
	// 加载功能列表
	onLoad(()=>{
		toggle()
		// 表单提交数据
		let roleId = uni.getStorageSync("userRole").roleId
		if(roleId == "3"){
			titleTip.greetings = "教师"
			titleTip.organization = "无"
			titleTip.identity = "当前身份为教师"
		}else{
			let userIdentity = JSON.parse(decodeURIComponent(uni.getStorageSync("userIdentity")))
			let lastIndex = userIdentity.lastIndexOf("-");
			let beforeLastDash = userIdentity.substring(0, lastIndex);
			let afterLastDash = userIdentity.substring(lastIndex + 1);
			titleTip.greetings = "同学"
			titleTip.organization = beforeLastDash
			titleTip.identity = afterLastDash
		}
		let params = reactive({
			"roleId" : roleId
		});
		getUserMenu(params).then(res=>{
			if(res.code == 200){
				roleFunList.splice(0, roleFunList.length)
				res.result.forEach((item)=>{
					roleFunList.push(item)
				})
				console.log("roleFunList",roleFunList)
			}else{
				console.log("没有该用户");
			}
		})
		.catch(err=>{
			console.log(err)
		})
	})
	// 基本功能
	function getBasicFun(e){
		if(e.result == '1a2a'){
			let roleId =  uni.getStorageSync("userRole").roleId
			if(roleId == '3'){
				console.log("当前身份无法更改")
				message.value="当前身份不能更改个人信息"
				toggle();
			}else{
				uni.navigateTo({
					url:`/pages/login/student/updateUser`
				})
			}
		}
		if(e.result == '1a2b'){
			logout().then(res=>{
				if(res.code == '200'){
					console.log("退出登录")
					uni.removeStorageSync("userIdentity")
					uni.removeStorageSync("userRole")
					uni.removeStorageSync("token")
					uni.reLaunch({
						url: '/'
					});
				}
			}).catch(err=>{
				console.log(err)
			})
		}
	}
	// 点击角色功能跳转
	function getClickRoleFun(e){
		// 判断，根据点击的功能id，判断是什么操作，对应跳到什么界面
		if(e.result == 3){ // 查看社团
			uni.navigateTo({
				url:"/pages/society-list/search"
			})
		}
		if(e.result == 4){ // 创建社团
			uni.navigateTo({
				url:"/pages/society-mkdir/index"
			})
		}
		if(e.result == 5){ // 审批记录
			uni.navigateTo({
				url:"/pages/application-record/index"
			})
		}
		if(e.result == 6){ // 加入组织
			uni.navigateTo({
				url:"/pages/join-department/index"
			})
		}
		if(e.result == 7){ // 部门管理
			if(uni.getStorageSync("userRole").roleId == 3){
				uni.navigateTo({
					url:"/pages/department-manage/society-list"
				})
			}else if(uni.getStorageSync("userRole").roleId == 4 || uni.getStorageSync("userRole").roleId == 5){
				let societyId = uni.getStorageSync("userRole").societyBodyId;
				uni.navigateTo({
					url:`/pages/department-manage/department-list?societyId=${encodeURIComponent(societyId)}`
				})
			}else{
				let societyId = uni.getStorageSync("userRole").societyBodyId;
				let departmentId = uni.getStorageSync("userRole").departmentId;
				uni.navigateTo({
					url:`/pages/department-manage/menu-list?societyId=${encodeURIComponent(societyId)}&&departmentId=${encodeURIComponent(departmentId)}`
				})
			}
		}
		if(e.result == 8){ // 社团管理
			// 主席和副主席跳转到指定页面
			if(uni.getStorageSync("userRole").roleId == 4 || uni.getStorageSync("userRole").roleId == 5){
				let societyId = uni.getStorageSync("userRole").societyBodyId;
				uni.navigateTo({
					url:`/pages/society-manage/menu-list?societyId=${encodeURIComponent(JSON.stringify(societyId))}`,
				})
			}
			// 教师多一个社团列表界面
			if(uni.getStorageSync("userRole").roleId == 3){
				uni.navigateTo({
					url:"/pages/society-manage/society-list"
				})
			}
		}
		if(e.result == 9){ // 我的审批
			uni.navigateTo({
				url:"/pages/examine-and-approve/index"
			})
		}
	}
	// 定义一个函数来处理从子组件接收到的事件和数据
	function handleDataFromChild(data: { result:Object }){
		console.log("data",data);
		// 判断，根据点击的功能id，判断是什么操作，对应跳到什么界面
		if(data.result.detail.index == 123456){
			uni.navigateTo({
				url:"/pages/society-list/search"
			})
		}
		if(data.result.detail.index == 123457){
			uni.navigateTo({
				url:"/pages/society-mkdir/index"
			})
		}
		if(data.result.detail.index == 123458){
			uni.navigateTo({
				url:"/pages/application-record/index"
			})
		}
		if(data.result.detail.index == 123459){
			uni.navigateTo({
				url:"/pages/join-department/index"
			})
		}
		if(data.result.detail.index == 123450){
			uni.navigateTo({
				url:"/pages/department-manage/department-list"
			})
		}
		if(data.result.detail.index == 1234510){
			uni.navigateTo({
				url:"/pages/society-manage/society-list"
			})
		}
		if(data.result.detail.index == 1234511){
			uni.navigateTo({
				url:"/pages/examine-and-approve/index"
			})
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #EDF3FC;
	}
</style>