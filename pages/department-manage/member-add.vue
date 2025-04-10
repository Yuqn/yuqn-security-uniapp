<template>
	<view class="back" :style="{height:height}">
		<memberList v-if="isOk == '1'">
			<view class="cardColSty" v-for="(item,key) in memberListData" :index="key" :key="item.userId">
				<view class="cardColLeftSty"> 
					<image src="../../static/logo.png" class="cardColLeftImgSty"></image>
				</view>
				<view class="cardColCentSty">
					<view class="cardColCentTopSty">
						<text>{{item.nickName}}（{{item.userName}}）</text>
					</view>
					<view class="cardColCentCentSty">
						<text>院系：{{item.userCollege}}</text>
					</view>
					<view class="cardColCentBtnSty">
						<view  class="cardColCentBtnLeftSty">
							<text>专业：{{item.userMajor}}</text>
						</view>
						<view class="cardColCentBtnRightSty">
							<text>年级：{{item.userGrade}}</text>
						</view>
					</view>
				</view>
				<view class="cardColRightSty">
					<button @click="addUser(item)" type="primary" v-if="menuType=='1'" :disabled="item.isJoin==='1'" size="mini" >{{item.isJoin === '0'?'添加':'已入'}}</button>
					<button type="primary" v-if="menuType=='0'" :disabled="item.isMember===1" size="mini" >{{item.isMember === 0?'选择':'取消'}}</button>
				</view>
			</view>
		</memberList>
	</view>
	<view>
		<!-- 提示信息弹窗 -->
		<uni-popup ref="message" type="message">
			<uni-popup-message :type="msgType" :message="messageText" :duration="1000"></uni-popup-message>
		</uni-popup>
	</view>
</template>

<script lang="ts" setup>
	import {ref,reactive} from "vue";
	import {onResize,onLoad} from '@dcloudio/uni-app'
	import memberList from '@/components/member/index.vue'
	import {getDepartmentUserList,addDepartmentUser} from '../../api/departmentManage'
	
	// 定义屏幕高度
	const height = ref("");
	
	// 提示弹窗属性
	let msgType = ref("success")
	let messageText = ref("这是一条成功提示")
	const message = ref(null)
	
	// 提示弹窗,type:success表示成功
	function messageToggle(type,msg) {
		msgType.value = type;
		messageText.value = msg;
		message.value.open()
	}
	
	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		success: info => height.value = info.windowHeight  - 44 + "px"
	});
	
	/* 定义数据，确定用户选择功能，
	如果用户是选择编辑部门,则为0，
	如果是选择新增成员，则为1 */
	let menuType = ref(1)
	// 定义变量获取
	let societyId = ref("")
	let departmentId = ref("")
	let isOk = ref('0')
	
	// 接受页面参数
	onLoad((option)=>{
		menuType.value = JSON.parse(decodeURIComponent(option.menuType));
		societyId.value = JSON.parse(decodeURIComponent(option.societyId));
		departmentId.value = JSON.parse(decodeURIComponent(option.departmentId));
		if(menuType.value == 1){
			uni.setNavigationBarTitle({
				title:'新增成员'
			})
		}else if(menuType.value == 0){
			uni.setNavigationBarTitle({
				title:'选择成员'
			})
		}
		onloadData()
	})
	
	// 加载页面数据函数
	function onloadData(){
		let params = reactive({
			"societyId":societyId.value,
			"departmentId":departmentId.value
		})
		getDepartmentUserList(params).then(res=>{
				if(res.code == 200){
					memberListData = res.result
					isOk.value = '1'
				}else{
					console.log("查找失败");
				}
			})
			.catch(err=>{
				console.log(err)
			})
			.finally(()=>{
			})
	}
	
	// 定义数据集
	let memberListData = reactive([])
	
	// 点击事件
	function addUser(e){
		let roleId = uni.getStorageSync("userRole").roleId
		let params = reactive({
			"departmentId":departmentId.value,
			"societyBodyId":societyId.value,
			"userId":e.userId,
			"roleId":roleId
		})
		addDepartmentUser(params)
		.then(res=>{
			if(res.code == 200){
				messageToggle("success","已将用户添加到部门中");
				isOk.value = '0'
				onloadData()
			}
		})
		.finally(()=>{
		})
	}
	
</script>

<style lang="scss" scoped>
	page{
		background-color: #EDF3FC;
	}
	.back{
		width: 100%;
		.cardColSty{
			width: 94%; 
			height: 120rpx; 
			margin: auto; 
			margin-bottom: 10rpx;
			background-color: white; 
			display: flex;
			.cardColLeftSty{
				width: 120rpx; 
				display: flex;
				justify-content: center;
				align-items: center;
				.cardColLeftImgSty{
					width: 75rpx; 
					height: 75rpx;
				}
			}
			.cardColCentSty{
				flex: 1; 
				.cardColCentTopSty{
					font-size: 0.85rem; 
					margin-top: 10rpx; 
					margin-bottom: 5rpx;
					// background-color: yellow;
				}
				.cardColCentCentSty{
					color: #999; 
					font-size: 0.65rem;
					margin-bottom: 2rpx;
				}
				.cardColCentBtnSty{
					display: flex;
					color: #999; 
					font-size: 0.65rem;
					.cardColCentBtnLeftSty{
						margin-right: 30rpx;
					}
					.cardColCentBtnRightSty{
						flex: 1;
					}
				}
			}
			.cardColRightSty{
				width: 150rpx; 
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>