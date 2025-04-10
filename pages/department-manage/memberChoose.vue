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
					<button type="primary" @click="chooseBtn(item)" size="mini" >选择</button>
				</view>
			</view>
		</memberList>
	</view>
</template>

<script lang="ts" setup>
	import {ref,reactive} from "vue";
	import {onResize,onLoad} from '@dcloudio/uni-app'
	import memberList from '@/components/member/index.vue'
	import {getDepartmentUserMember} from '../../api/departmentManage'
	
	// 定义屏幕高度
	const height = ref("");
	
	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		success: info => height.value = info.windowHeight  - 44 + "px"
	});
	
	// 定义变量获取
	let societyId = ref("")
	let departmentId = ref("")
	let menuType = ref("")
	let isOk = ref('0')
	
	// 接受页面参数
	onLoad((option)=>{
		societyId.value = JSON.parse(decodeURIComponent(option.societyId));
		departmentId.value = JSON.parse(decodeURIComponent(option.departmentId));
		menuType.value = JSON.parse(decodeURIComponent(option.menuType));
		onloadData()
	})
	
	// 加载页面数据函数
	function onloadData(){
		let params = reactive({
			"departmentId":departmentId.value
		})
		getDepartmentUserMember(params).then(res=>{
				if(res.code == 200){
					console.log("res",res)
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
	
	// 事件
	function chooseBtn(e){
		if(menuType.value == 'minister'){
			let param = reactive({
				"userId":e.userId,
				"nickName":e.nickName,
				"roleId":e.roleId
			})
			uni.setStorageSync("minister",encodeURIComponent(JSON.stringify(param)))
		}
		if(menuType.value == 'viceMinisterOne'){
			let param = reactive({
				"userId":e.userId,
				"nickName":e.nickName,
				"roleId":e.roleId
			})
			uni.setStorageSync("viceMinisterOne",encodeURIComponent(JSON.stringify(param)))
		}
		if(menuType.value == 'viceMministerTwo'){
			let param = reactive({
				"userId":e.userId,
				"nickName":e.nickName,
				"roleId":e.roleId
			})
			uni.setStorageSync("viceMinisterTwo",encodeURIComponent(JSON.stringify(param)))
		}
		// 返回
		uni.redirectTo({
			url:`/pages/department-manage/department-update?departmentId=${encodeURIComponent(JSON.stringify(departmentId.value))}&societyId=${encodeURIComponent(JSON.stringify(societyId.value))}`
		});
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