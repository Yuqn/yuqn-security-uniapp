<template>
	<view class="back" :style="{height:height}">
		<memberList v-if="isOk=='1'">
			<view class="cardColSty" v-for="(item,key) in memberListData" :index="key" :key="item.id">
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
							<text>年级：{{item.userGrade}}级</text>
						</view>
					</view>
				</view>
				<view class="cardColRightSty">
					<!-- <button type="primary" v-if="menuType=='1'" :disabled="item.isMember===1" size="mini" >{{item.isMember === 0?'添加':'已入'}}</button> -->
					<button type="primary" size="mini" @click="checkUser(item)">选择</button>
				</view>
			</view>
		</memberList>
	</view>
</template>

<script lang="ts" setup>
	import {ref,reactive} from "vue";
	import {onResize,onLoad} from '@dcloudio/uni-app'
	import memberList from '@/components/member/index.vue'
	import {getSocietyUserList} from '../../api/societyManage'
	
	// 定义屏幕高度
	const height = ref("");
	
	// 社团id
	let societyId = ref('')
	
	// 选择副主席的时候传递下标，确定选择第一个还是第二个
	let index = ref()
	
	// isok
	let isOk = ref('0')
	
	// 数据集
	let memberListData = reactive([])
	
	// 记录副主席
	let checkViceChairman = reactive([
		{
			index:0,
			userId:'1',
			nickName:'yuqn',
			isChang:'0'
		},
		{
			index:1,
			userId:'1',
			nickName:'yuqn',
			isChang:'0'
		}
	])
	
	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		success: info => height.value = info.windowHeight  - 44 + "px"
	});
	
	// 接受页面参数
	onLoad((option)=>{
		societyId.value = option.societyId;
		index.value = option.index
		let params = reactive({
			"societyId":societyId.value
		})
		getSocietyUserList(params).then(res=>{
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
	})
	
	
	// 点击事件
	function checkUser(e){
		if(index.value == -1){
			// 添加到缓存
			let checkChairman = reactive({
				"userId":e.userId,
				"nickName":e.nickName
			})
			uni.setStorageSync("checkChairman",checkChairman)
		}else{
			// 先获取
			if(uni.getStorageSync("checkViceChairman")!=''){
				checkViceChairman = uni.getStorageSync("checkViceChairman")
			}
			checkViceChairman[index.value].isChang = '1';
			checkViceChairman[index.value].userId = e.userId;
			checkViceChairman[index.value].nickName = e.nickName;
			uni.setStorageSync("checkViceChairman",checkViceChairman)
		}
		uni.navigateTo({
			url:`/pages/society-manage/society-update?societyId=${encodeURIComponent(societyId.value)}`,
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