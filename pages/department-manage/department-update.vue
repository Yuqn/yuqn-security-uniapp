<template>
	<view class="back" :style="{height:height}">
		<scroll-view scroll-y="true" class="scroll-Y scrollSty" :show-scrollbar="false" :style="{height:scrollHeight}" >
			<view style="width: 100%; height: 300rpx;">
				<!-- <image src="/static/image/memberListLogo.svg" style="width: 100%; height: 100%;" mode="aspectFill"></image> -->
				<image src="/static/image/bgSevent.jpg" style="width: 100%; height: 100%;" mode="aspectFill"></image>
			</view>
			<view class="cardSty" v-if="isOk == '1'">
				<view class="cardTopSty" >
					<view class="cardTopLeftSty" >
						<text>部门编辑 </text>
					</view>
					<view class="tag-view cardTopRightSty">
						<view class="cardTopRightTipSty">
							<text>正常</text>
						</view>
					</view>
				</view>
				<uni-card :is-shadow="false" is-full class="cardBodySty">
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">创建人：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{formData.createName}}</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">创建时间：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">{{formData.createTime}}</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">部门部长：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light"> 
								<uni-tag :text="formData.minister.nickName" style="margin-right: 10rpx; background-color: #71aaf5;" @click="handleTagClick('minister')"/>
							</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="8">
							<view class="demo-uni-col dark">社团副部长：</view>
						</uni-col>
						<uni-col :span="16">
							<view class="demo-uni-col light">
								<uni-tag :text="formData.viceMinister[0].nickName"  style="margin-right: 10rpx; background-color: #71aaf5;" @click="handleTagClick('viceMinisterOne')"/>
								<uni-tag :text="formData.viceMinister[1].nickName"  style="margin-right: 10rpx; background-color: #71aaf5;" @click="handleTagClick('viceMministerTwo')"/>
							</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="24">
							<view class="demo-uni-col dark">部门名字：</view>
						</uni-col>
						
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="24">
							<view class="demo-uni-col light">
								<uni-easyinput v-model="formData.departmentName" placeholder="部门名字"></uni-easyinput>
							</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyRowSty">
						<uni-col :span="24">
							<view class="demo-uni-col dark">社团简介：</view>
						</uni-col>
					</uni-row>
					<uni-row class="demo-uni-row cardBodyIntroduceRowSty">
						<uni-col :span="24">
							<uni-easyinput type="textarea" v-model="formData.departmentIntroduce" placeholder="部门介绍"></uni-easyinput>
						</uni-col>
					</uni-row>
					<view class="cardBodyDetailsRowSty">
						<button class="cardBodyDetailsBtnRowSty" style="background-color: #ec8b89;" @click="cancelBtn()">取消更改</button>
						<button class="cardBodyDetailsBtnRowSty" @click="subFun()">更改设置</button>
					</view>
				</uni-card>
			</view>
		</scroll-view>
		
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
	import {getDepartmentDetailsById,updateDepartment} from '../../api/departmentManage'
	
	// 提示弹窗属性
	let msgType = ref("success")
	let messageText = ref("这是一条成功提示")
	const message = ref(null)
	
	// 定义屏幕高度
	const height = ref("");
	// 定义scroll高度，用于适配底部分页器
	const scrollHeight = ref("");
	// 获取部门信息
	let societyId = ref("")
	let departmentId = ref("")
	// 页面渲染数据
	let formData = reactive({})
	// isOk
	let isOk = ref('0')
	
	// 记录点击次数，为了返回
	let pageCount = ref(0)
	
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
	
	function handleTagClick(e) {
	    tagClickFun(e);
	    addCount();
	  }
	
	// 记录点击次数
	function addCount(){
		/* try {
		    // 尝试从存储中获取并解码 pageCount
		    let storedValue = uni.getStorageSync("pageCount");
		    let decodedValue = decodeURIComponent(storedValue);
		    let count = JSON.parse(decodedValue);
		 
		    // 如果解析成功，增加计数并存回存储
		    count += 1;
		    uni.setStorageSync("pageCount", encodeURIComponent(JSON.stringify(count)));
		 
		    // 可选：更新响应式变量（如果需要在 Vue 组件中使用）
		    pageCount.value = count;
		  } catch (error) {
		    // 如果捕获到任何错误（例如，存储中没有该键，或值不是有效的 JSON）
		    // 则将计数设置为 1 并存回存储
		    // console.error("Error retrieving or parsing page count:", error);
		    uni.setStorageSync("pageCount", encodeURIComponent(JSON.stringify(1)));
		  } */
	}
	
	// 提示弹窗,type:success表示成功
	function messageToggle(type,msg) {
		msgType.value = type;
		messageText.value = msg;
		message.value.open()
	}
	
	// 初始页面
	onLoad((option)=>{
		isOk.value = '0'
		societyId.value = JSON.parse(decodeURIComponent(option.societyId));
		departmentId.value = JSON.parse(decodeURIComponent(option.departmentId));
		let params = reactive({
			"departmentId":departmentId.value
		})
		getDepartmentDetailsById(params).then(res=>{
			if(res.code == 200){
				formData = res.result
				// 将数据存入到缓存中，更新信息
				if(uni.getStorageSync("minister") == ''){
					uni.setStorageSync("minister",encodeURIComponent(JSON.stringify(res.result.minister)))
				}else{
					formData.minister = JSON.parse(decodeURIComponent(uni.getStorageSync("minister")))
				}
				if(uni.getStorageSync("viceMinisterOne") == ''){
					uni.setStorageSync("viceMinisterOne",encodeURIComponent(JSON.stringify(res.result.viceMinister[0])))
				}else{
					formData.viceMinister[0] = JSON.parse(decodeURIComponent(uni.getStorageSync("viceMinisterOne")))
				}
				if(uni.getStorageSync("viceMinisterTwo") == ''){
					uni.setStorageSync("viceMinisterTwo",encodeURIComponent(JSON.stringify(res.result.viceMinister[1])))
				}else{
					formData.viceMinister[1] = JSON.parse(decodeURIComponent(uni.getStorageSync("viceMinisterTwo")))
				}
				isOk.value = '1'
			}
		}).finally(()=>{
			
		})
	})
	// 提交按钮
	function subFun(){
		let params = reactive({
			'societyDepartment':{
				"id":formData.departmentId,
				"name":formData.departmentName,
				"introduce":formData.departmentIntroduce,
				"societyBodyId":societyId.value
			},
			"minister":formData.minister,
			"viceMinister":formData.viceMinister
		})
		updateDepartment(params).then(res=>{
			if(res.code == '200'){
				messageToggle("success","部门更改成功");
				setTimeout(()=>{
					// 清空
					cancelBtn()
				},1000)
			}
		}).finally(()=>{
			
		})
	}
	// 取消按钮
	function cancelBtn(){
		// 清空
		uni.removeStorageSync("minister")
		uni.removeStorageSync("viceMinisterOne")
		uni.removeStorageSync("viceMinisterTwo")
		uni.removeStorageSync("viceMinister")
		uni.redirectTo({
			url:`/pages/department-manage/menu-list?societyId=${encodeURIComponent(societyId.value)}&departmentId=${encodeURIComponent(departmentId.value)}`
		})
		
	}
	
	// 标签点击实践
	function tagClickFun(e){
		uni.navigateTo({
			url:`/pages/department-manage/memberChoose?departmentId=${encodeURIComponent(JSON.stringify(departmentId.value))}&societyId=${encodeURIComponent(JSON.stringify(societyId.value))}&menuType=${encodeURIComponent(JSON.stringify(e))}`
		})
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
				width: 87%;
				margin: 20rpx auto 20rpx;
				.cardTopSty{
					width: 100%; 
					height: 80rpx;
					background-color: #71aaf5; 
					display: flex;
					.cardTopLeftSty{
						height: 80rpx; 
						width: 70%; 
						line-height: 80rpx; 
						color: #ffffff; 
						font-size: 0.8rem; 
						margin-left: 30rpx;
					}
					.cardTopRightSty{
						flex-grow: 1; 
						display: flex; 
						justify-content: center;
						align-items: center;
						.cardTopRightTipSty{
							width: 100rpx;
							height: 45rpx; 
							background-color: #ffffff; 
							text-align: center; 
							line-height: 45rpx; 
							font-size: 0.7rem;
							color: #71aaf5; 
							border-radius: 5rpx;
						}
					}
				}
				.cardBodySty{
					height: 650rpx;
					.cardBodyRowSty{
						height: 40rpx; 
						line-height: 40rpx; 
						margin-bottom: 10rpx; 
						font-size: 0.8rem;
					}
					.cardBodyIntroduceRowSty{
						height: 160rpx; 
						line-height: 40rpx; 
						margin-bottom: 10rpx; 
						font-size: 0.8rem;
						// border: 1rpx #d6dae2 solid;
						.cardBodyIntroduceScrollRowSty{
							width: 92%; 
							height: 130rpx; 
							margin: auto; 
							margin-top: 15rpx; 
							white-space: normal;
							word-wrap: break-word;
						}
					}
					.cardBodyDetailsRowSty{
						width: 100%; 
						height: 80rpx; 
						margin-top: 30rpx;
						display: flex;
						.cardBodyDetailsBtnRowSty{
							width: 170rpx; 
							height: 60rpx; 
							line-height: 60rpx; 
							margin-top: 5rpx; 
							font-size: 0.7rem; 
							background-color: #71aaf5; 
							color: #ffffff;
							// float: right;
						}
					}
				}
			}
			
		}
		
	}
</style>