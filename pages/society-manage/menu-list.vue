<template>
	<view class="back" :style="{height:height}">
		<scroll-view scroll-y="true" class="scroll-Y scrollSty" :show-scrollbar="false" :style="{height:scrollHeight}" >
			<view style="width: 100%; height: 300rpx;">
				<!-- <image src="/static/image/memberListLogo.svg" style="width: 100%; height: 100%;" mode="aspectFill"></image> -->
				<image src="/static/image/bgEghit.jpg" style="width: 100%; height: 100%;" mode="aspectFill"></image>
			</view>
			<uni-card title="社团管理" padding="10rpx" spacing="10rpx">
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
		<!-- <button class="button" type="primary" @click="toggle('center')"><text class="button-text">弹窗</text></button> -->
	</view>
</template>

<script lang="ts" setup>
	import {ref,reactive} from "vue";
	import {onResize,onLoad} from '@dcloudio/uni-app'
	import {deleteDepartment} from '../../api/societyManage'
	
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
			scrollHeight.value = info.windowHeight - 44 + "px"
		}
	});
	
	// 初始化功能列表数据
	let nemuList = reactive([
		{
			id : 1,
			name : "社团编辑"
		},
		{
			id : 2,
			name : "新增部门"
		},
		{
			id : 3,
			name : "解散社团"
		}
	])
	
	// 设置社团id
	let societyId = ref("")
	
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
		// TODO 做一些其他的事情，手动执行 close 才会关闭对话框
		// ...
		// this.$refs.popup.close()
		// 发送请求，解散社团
		// 构造参数{societyId:**,createBy:**,departmentValue:[{departmentName:**,departmentIntroduce:**},{departmentName:**,departmentIntroduce:**}]}
		let roleId = uni.getStorageSync("userRole").roleId
		let params = reactive({
			"userRole":roleId,
			"societyId":societyId.value
		})
		deleteDepartment(params).then(res=>{
			if(res.code == 200){
				if(roleId == '3'){
					uni.navigateTo({
						url:'/pages/home/index'
					})
				}else{
					uni.navigateTo({
						url:'/'
					})
				}
				
			}else{
				console.log("解散失败");
			}
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
			// isOk.value = "0"
		})
		popup.value.close()
	}
	// 点击
	function onClick(e){
		if(e == 1){
			uni.navigateTo({
				url:`/pages/society-manage/society-update?societyId=${encodeURIComponent(JSON.stringify(societyId.value))}`
			})
		}
		if(e == 2){
			uni.navigateTo({
				url:`/pages/society-manage/department-mkdir?societyId=${encodeURIComponent(JSON.stringify(societyId.value))}`
			})
		}
		if(e==3){
			toggle('center');
		}
	}
	
	// 获取初始页面参数
	onLoad((option)=>{
		societyId.value = JSON.parse(decodeURIComponent(option.societyId))
	})


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
				height: 400rpx;
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
					margin: 0 2.5% 0; 
					box-sizing: border-box;
				}
			}
			
		}
		
	}
</style>