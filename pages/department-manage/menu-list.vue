<template>
	<view class="back" :style="{height:height}">
		<scroll-view scroll-y="true" class="scroll-Y scrollSty" :show-scrollbar="false" :style="{height:scrollHeight}" >
			<view style="width: 100%; height: 300rpx;">
				<!-- <image src="/static/image/memberListLogo.svg" style="width: 100%; height: 100%;" mode="aspectFill"></image> -->
				<image src="/static/image/bgEghit.jpg" style="width: 100%; height: 100%;" mode="aspectFill"></image>
			</view>
			<uni-card title="部门管理" padding="10rpx" style="padding-bottom: 0;" spacing="10rpx">
				<!-- <view class="cardSty">
					<view class="cardItemSty" v-for="(item,key) in nemuList" :index="key" :key="item.id" @click="onClick(item.id)">
						{{item.name}}
					</view>
				</view> -->
				<view class="cardSty">
					<view class="cardItemSty" v-for="(item,key) in nemuList" :index="key" :key="item.id" @click="onClick(item.id)">
						{{item.name}}
					</view>
				</view>
			</uni-card>
		</scroll-view>
		<!-- 弹出层 -->
		<view>
			<uni-popup ref="popup" background-color="#fff" :mask-click="false">
				<uni-popup-dialog title="提示" mode="base" content="是否解散部门？对应成员将离开部门并且无法加入!" :duration="2000" :before-close="true" @close="close" @confirm="confirm">
				</uni-popup-dialog>
			</uni-popup>
		</view>
		<view>
			<uni-popup ref="popups" background-color="#fff" :mask-click="false">
				<uni-popup-dialog title="提示" mode="base" :content="messageCode" :duration="2000" :before-close="true" @confirm="confirms" :showClose="false">
				</uni-popup-dialog>
			</uni-popup>
		</view>
	</view>
</template>

<script lang="ts" setup>
	import {ref,reactive} from "vue";
	import {onResize,onLoad} from '@dcloudio/uni-app'
	import {deleteDepartment,getDepartmentCode} from '../../api/departmentManage'
	
	// 定义屏幕高度
	const height = ref("");
	// 定义scroll高度，用于适配底部分页器
	const scrollHeight = ref("");
	// 保存社团id和部门id
	let societyId = ref("")
	let departmentId = ref("")
	let roleId = ref("")
	
	
	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		// success: info => height.value = info.windowHeight - 44 + "px",
		success:function(info){
			console.log("info",info)
			height.value = info.windowHeight - 44 + "px"
			scrollHeight.value = info.windowHeight - 44 + "px"
		}
	});
	
	
	// 初始页面保存数据
	onLoad((option)=>{
		societyId.value = option.societyId
		departmentId.value = option.departmentId
		// 根据角色id创建对应功能
		roleId.value = uni.getStorageSync("userRole").roleId
		if(roleId.value == '3' || roleId.value == '4' || roleId.value == '5'){
			nemuList = [
				{
					id : 1,
					name : "成员编辑"
				},
				{
					id : 2,
					name : "部门编辑"
				},
				{
					id : 3,
					name : "新增成员"
				},
				{
					id : 4,
					name : "解散部门"
				},
				{
					id : 5,
					name : "部门邀请码"
				}
			]
		}else if(roleId.value == '6' || roleId.value == '7'){
			nemuList = [
				{
					id : 1,
					name : "成员编辑"
				},
				{
					id : 2,
					name : "部门编辑"
				},
				{
					id : 3,
					name : "新增成员"
				},
				{
					id : 5,
					name : "部门邀请码"
				}
			]
		}else if(roleId.value == '8'){
			nemuList = [
				{
					id : 1,
					name : "查看成员"
				}
			]
		}
		
	})
	
	// 初始化功能列表数据
	let nemuList = reactive([])
	
	// 使用 ref 来获取 uni-popup 组件的引用
	const popup = ref<InstanceType<typeof UniPopup> | null>(null);
	const popups = ref<InstanceType<typeof UniPopup> | null>(null);
	
	// 定义弹出层数据
	let popupData = reactive({
		type:'center',
		msgType: 'success',
		messageText: '这是一条成功提示',
		value: ''
	})
	
	// 定义邀请码
	let messageCode = ref('')
	
	// 弹出层事件
	function toggle(type: string) {
	  popupData.type = type;
	  if (popup.value) {
	    popup.value.open(type); // 直接调用 open 方法，不需要 this
	  } else {
	    console.warn('Popup ref is not yet set');
	  }
	}
	function toggles(type: string) {
	  popupData.type = type;
	  if (popups.value) {
	    popups.value.open(type); // 直接调用 open 方法，不需要 this
	  } else {
	    console.warn('Popup ref is not yet set');
	  }
	}
	function confirms(value) {
		popups.value.close()
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
		// TODO 做一些其他的事情，手动执行 close 才会关闭对话框
		// ...
		// this.$refs.popup.close()
		// 调用函数解散社团
		let params = reactive({
			"departmentId":departmentId.value,
			"roleId":roleId.value
		})
		deleteDepartment(params).then(res=>{
			if(res.code == 200){
				console.log("删除成功")
				uni.navigateTo({
					url:'/pages/home/index'
				})
			}
		}).finally(()=>{
			
		})
		popup.value.close()
	}
	// 点击
	function onClick(e){
		console.log(e)
		if(e == 1){
			uni.navigateTo({
				url:`/pages/society-list/member-list?departmentId=${encodeURIComponent(JSON.stringify(departmentId.value))}&societyId=${encodeURIComponent(JSON.stringify(societyId.value))}`
			})
		}
		if(e == 2){
			uni.redirectTo({
				url:`/pages/department-manage/department-update?departmentId=${encodeURIComponent(JSON.stringify(departmentId.value))}&societyId=${encodeURIComponent(JSON.stringify(societyId.value))}`
			})
		}
		if(e == 3){
			uni.navigateTo({
				/* 定义数据，确定用户选择功能，
				如果用户是选择编辑部门,则为0，
				如果是选择新增成员，则为1 */
				url:`/pages/department-manage/member-add?menuType=${encodeURIComponent(JSON.stringify('1'))}&departmentId=${encodeURIComponent(JSON.stringify(departmentId.value))}&societyId=${encodeURIComponent(JSON.stringify(societyId.value))}` 
			})
		}
		if(e==4){
			toggle('center');
		}
		if(e==5){
			let params = reactive({
				"departmentId" : departmentId.value
			})
			getDepartmentCode(params).then(res=>{
				if(res.code == '200'){
					messageCode.value = '部门邀请码为：' + res.result
					toggles('center');
				}else{
					messageCode.value = '获取失败'
					toggles('center');
				}
			})
		}
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
				display: flex; 
				flex-wrap: wrap; 
				// justify-content: center; 
				align-items: center; 
				width: 100%; 
				// height: 400rpx;
				.cardItemSty{
					// background-color: aliceblue; 
					background-image: url(@/static/image/menuLogo.svg);
					background-size: cover;
					font-weight: 700;
					font-size: 1rem;
					line-height: 110rpx;
					text-indent: 25rpx;
					width: 45%; 
					height: 170rpx; 
					margin: 0 2.5% 15rpx; 
					box-sizing: border-box;
				}
			}
			
		}
		
	}
</style>