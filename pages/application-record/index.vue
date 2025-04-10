<template>
	<view class="back" :style="{height:height}" style="display: flex; flex-direction: column;">
		<view class="applicationRecordShowSty" v-if="tipIsOk == '1'" >
			<applicationRecordShow :applicationRecordShowData="applicationRecordShowData"></applicationRecordShow>
		</view>
		<view class="uni-padding-wrap uni-common-mt itemSty" >
			<uni-segmented-control :current="current" :values="items" :style-type="styleType"
				:active-color="activeColor" @clickItem="onClickItem" />
		</view>
		<scroll-view scroll-y="true" class="scroll-Y scrollSty" :show-scrollbar="false" style="flex-grow: 1;" >
			
			<view class="applicationListSty" >
				<view class="contentSty" v-if="isOk == '1'">
					<view v-if="current === 0" >
						
						<view v-for="(item,key) in formData" :index="key" :key="item.societyBusiness.id">
								<!-- 加入部门申请标签 -->
								<view class="joinDepartment" v-if="item.societyBusiness.introduce == 'join_society'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>加入社团部门申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>加入组织：（宣传部门）舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text></text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
								
								<!-- 创建社团申请标签 -->
								<view v-if="item.societyBusiness.introduce == 'create_society'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>创建社团申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>社团名字：{{item.societyBusiness.command.societyName}}</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>社团部门：</text>
											<text v-for="(departmentItem,departmentKey) in item.societyBusiness.command.departmentValue" :index="departmentKey">
												{{departmentItem.departmentName}} &nbsp;
											</text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a; color: #71aaf5;" @click="goDetails(item.processInstanceId,item.businessKey)">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：{{item.createName}}</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：{{item.societyBusiness.createTime}}</text>
										</view>
									</view>
								</view>
								
								<!-- 解散社团 -->
								<view v-if="item.societyBusiness.introduce == 'delete_society'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>解散社团申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>解散社团：舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text></text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
								
								<!-- 新增社团部门 -->
								<view v-if=" item.societyBusiness.introduce == 'create_department'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;" @click="goDetails(1)">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>新增社团部门申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>操作组织：舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>新增部门：a部门-b部门</text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
								
								<!-- 编辑社团 -->
								<view v-if="item.societyBusiness.introduce == 'update_society'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;" @click="goDetails(1)">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>编辑社团申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>编辑社团：舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text></text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
								
								<!-- 编辑部门申请 -->
								<view v-if="item.societyBusiness.introduce == 'update_department'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>编辑部门申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>操作部门：（宣传部门）舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>更改结果--->1212</text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
								
								<!-- 移除部门成员申请 -->
								<view v-if="item.societyBusiness.introduce == 'delete_user'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>移除部门成员申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>加入组织：（宣传部门）舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>操作成员信息：余其楠（20210412431141）</text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
								
								<!-- 新增部门成员申请 -->
								<view v-if="item.societyBusiness.introduce == 'insert_user'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>新增部门成员申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>加入组织：（宣传部门）舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>新增成员信息：余其楠（20210412431141）</text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
								
								<!-- 解散部门 -->
								<view v-if="item.societyBusiness.introduce == 'delete_department'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>解散社团部门申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>操作组织：（宣传部门）舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text></text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
							</view>
				
					</view>
					
					<view v-if="current === 1">
						<view v-for="(item,key) in formData" :index="key" :key="item.societyBusiness.id">
								<!-- 加入部门申请标签 -->
								<view class="joinDepartment" v-if="item.societyBusiness.introduce == 'join_society'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>加入社团部门申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>加入组织：（宣传部门）舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text></text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
								
								<!-- 创建社团申请标签 -->
								<view v-if="item.societyBusiness.introduce == 'create_society'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>创建社团申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="已通过" style="background-color: green; border: none;"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>社团名字：{{item.societyBusiness.command.societyName}}</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1; overflow-y: auto; line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>社团部门：</text>
											<text v-for="(departmentItem,departmentKey) in item.societyBusiness.command.departmentValue" :index="departmentKey">
												{{departmentItem.departmentName}} &nbsp;
											</text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a; color: #71aaf5;" @click="goDetails(item.processInstanceId,item.businessKey)">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：{{item.createName}}</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：{{item.societyBusiness.createTime}}</text>
										</view>
									</view>
								</view>
								
								<!-- 解散社团 -->
								<view v-if="item.societyBusiness.introduce == 'delete_society'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>解散社团申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>解散社团：舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text></text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
								
								<!-- 新增社团部门 -->
								<view v-if=" item.societyBusiness.introduce == 'create_department'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;" >
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>新增社团部门申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>操作组织：舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>新增部门：a部门-b部门</text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
								
								<!-- 编辑社团 -->
								<view v-if="item.societyBusiness.introduce == 'update_society'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;" >
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>编辑社团申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>编辑社团：舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text></text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
								
								<!-- 编辑部门申请 -->
								<view v-if="item.societyBusiness.introduce == 'update_department'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>编辑部门申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>操作部门：（宣传部门）舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>更改结果--->1212</text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
								
								<!-- 移除部门成员申请 -->
								<view v-if="item.societyBusiness.introduce == 'delete_user'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>移除部门成员申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>加入组织：（宣传部门）舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>操作成员信息：余其楠（20210412431141）</text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
								
								<!-- 新增部门成员申请 -->
								<view v-if="item.societyBusiness.introduce == 'insert_user'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>新增部门成员申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>加入组织：（宣传部门）舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>新增成员信息：余其楠（20210412431141）</text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
								
								<!-- 解散部门 -->
								<view v-if="item.societyBusiness.introduce == 'delete_department'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>解散社团部门申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>操作组织：（宣传部门）舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text></text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
							</view>
						
					</view>
					
					<view v-if="current === 2">
						<view v-for="(item,key) in formData" :index="key" :key="item.societyBusiness.id">
								<!-- 加入部门申请标签 -->
								<view class="joinDepartment" v-if="item.societyBusiness.introduce == 'join_society'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>加入社团部门申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>加入组织：（宣传部门）舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text></text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
								
								<!-- 创建社团申请标签 -->
								<view v-if="item.societyBusiness.introduce == 'create_society'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>创建社团申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="被驳回" type="error" />
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>社团名字：{{item.societyBusiness.command.societyName}}</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1; overflow-y: auto; line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>社团部门：</text>
											<text v-for="(departmentItem,departmentKey) in item.societyBusiness.command.departmentValue" :index="departmentKey">
												{{departmentItem.departmentName}} &nbsp;
											</text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a; color: #71aaf5;" @click="goDetails(item.processInstanceId,item.businessKey)">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：{{item.createName}}</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：{{item.societyBusiness.createTime}}</text>
										</view>
									</view>
								</view>
								
								<!-- 解散社团 -->
								<view v-if="item.societyBusiness.introduce == 'delete_society'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>解散社团申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>解散社团：舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text></text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
								
								<!-- 新增社团部门 -->
								<view v-if=" item.societyBusiness.introduce == 'create_department'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;" >
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>新增社团部门申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>操作组织：舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>新增部门：a部门-b部门</text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
								
								<!-- 编辑社团 -->
								<view v-if="item.societyBusiness.introduce == 'update_society'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;" >
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>编辑社团申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>编辑社团：舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text></text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
								
								<!-- 编辑部门申请 -->
								<view v-if="item.societyBusiness.introduce == 'update_department'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>编辑部门申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>操作部门：（宣传部门）舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>更改结果--->1212</text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
								
								<!-- 移除部门成员申请 -->
								<view v-if="item.societyBusiness.introduce == 'delete_user'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>移除部门成员申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>加入组织：（宣传部门）舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>操作成员信息：余其楠（20210412431141）</text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
								
								<!-- 新增部门成员申请 -->
								<view v-if="item.societyBusiness.introduce == 'insert_user'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>新增部门成员申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>加入组织：（宣传部门）舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>新增成员信息：余其楠（20210412431141）</text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
								
								<!-- 解散部门 -->
								<view v-if="item.societyBusiness.introduce == 'delete_department'" style="width: 100%; background-color: white; display: flex;flex-direction: column; height: 200rpx; margin-bottom: 10rpx;">
									<view style="width: 95%; height: 70rpx;margin: 0px auto 0px; display: flex; border-bottom: 1rpx solid #EBEBEB;">
										<view style="flex-grow: 1;  line-height: 75rpx; height: 70rpx; font-size: 0.85rem;">
											<text>解散社团部门申请</text>
										</view>
										<view style="width: 130rpx; height: 70rpx;display: flex; align-items: center; justify-content: center;">
											<uni-tag text="审批中" type="warning"/>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx; margin: 0px auto 0px; display: flex;">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.8rem;  color: #6a6a6a;">
											<text>操作组织：（宣传部门）舞蹈协会</text>
										</view>
										<view style="width: 50rpx; line-height: 45rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text></text>
										</view>
										<view style="width: 85rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>详情-></text>
										</view>
									</view>
									<view style="width: 95%; height: 40rpx;margin: 0px auto 0px; display: flex; ">
										<view style="flex-grow: 1;  line-height: 40rpx;height: 40rpx; font-size: 0.75rem;  color: #6a6a6a;">
											<text>申请人：余其楠</text>
										</view>
										<view style="width: 270rpx; line-height: 40rpx;height: 40rpx; font-size: 0.65rem; color: #6a6a6a;">
											<text>申请日期：2021年4月12日</text>
										</view>
									</view>
								</view>
							</view>
					</view>
				</view>
				
			</view>
		</scroll-view>
		
		<view class="pageSty">
			<view style="width: 100%; margin: 10rpx auto;">
				<uni-pagination prev-text="前一页" next-text="后一页" :current='1' :total="10" :pageSize="10"  />
			</view>
		</view>
	</view>
	<!-- 弹出层 -->
	<view>
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content" style="width: 650rpx; height: 950rpx; background-color: white;"  v-if="isOkPopup == '1'">
				<!-- <uni-steps :options="list2" active-color="#007AFF" :active="2" direction="column" /> -->
				<view style="width: 100%;height: 100rpx; font-size: 1.2rem; line-height: 100rpx;text-align: center;">
					<text>审批记录</text>
				</view>
				<scroll-view scroll-y="true" class="scroll-Y" :show-scrollbar="false" style="width: 95%; height: 830rpx; margin: 0 auto 0;">
					<!-- 标签 -->
					<view style="width: 95%; height: 90rpx; margin: 0 auto 0; display: flex;border-bottom: 1px solid aliceblue; " v-for="(item,index) in dataDetails">
						<view style="width: 50rpx; height: 90rpx; margin-right: 15rpx; display: flex; align-items: center; justify-content: center;"
						v-if="item.isType =='0'">
							<view style="width: 30rpx; height: 30rpx; background-color: green; border-radius: 50%;"></view>
						</view>
						<view style="width: 50rpx; height: 90rpx; margin-right: 15rpx; display: flex; align-items: center; justify-content: center;"
						v-if="item.isType =='1'">
							<view style="width: 30rpx; height: 30rpx; background-color: #f3a73f; border-radius: 50%;"></view>
						</view>
						<view style="width: 50rpx; height: 90rpx; margin-right: 15rpx; display: flex; align-items: center; justify-content: center;"
						v-if="item.isType =='2'">
							<view style="width: 30rpx; height: 30rpx; background-color: green; border-radius: 50%;"></view>
						</view>
						<view style="width: 50rpx; height: 90rpx; margin-right: 15rpx; display: flex; align-items: center; justify-content: center;"
						v-if="item.isType =='3'">
							<view style="width: 30rpx; height: 30rpx; background-color: red; border-radius: 50%;"></view>
						</view>
						<view style="flex-grow: 1;">
							<view style="height: 50rpx; display: flex; " >
								<view style="height: 50rpx; line-height: 50rpx; font-size: 0.9rem; margin-right: 30rpx;">
									<text>{{item.assignee}}</text>
								</view>
								<view style="height: 50rpx; line-height: 50rpx; font-size: 0.7rem; color: green;" v-if="item.isType == '0'">
									<text>发起申请</text>
								</view>
								<view style="height: 50rpx; line-height: 50rpx; font-size: 0.7rem; color: #f3a73f;" v-if="item.isType == '1'">
									<text>审核中</text>
								</view>
								<view style="height: 50rpx; line-height: 50rpx; font-size: 0.7rem; color: green;" v-if="item.isType == '2'">
									<text>{{item.actType == 'endEvent'?'审核完成':'审核通过'}}</text>
								</view>
								<view style="height: 50rpx; line-height: 50rpx; font-size: 0.7rem; color: red;" v-if="item.isType == '3'">
									<text>不通过</text>
								</view>
							</view>
							<view style="height: 30rpx; font-size: 0.7rem; line-height: 30rpx;  color: #6a6a6a;">
								<text>意见：{{item.isType == '0'?'发起申请':item.isType == '1'?'暂无':'暂无'}}</text>
							</view>
						</view>
						<view style="width: 230rpx; height: 90rpx; font-size: 0.7rem; line-height: 90rpx; color: #6a6a6a;">
							<text>{{item.time}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script lang="ts" setup>
	import {ref,reactive} from "vue";
	import {onResize,onLoad} from '@dcloudio/uni-app'
	import applicationRecordShow from '@/components/application-record/application-record-show.vue'
	import {getApplicationRecordByUserId,getApplicationRecordDetails,getApplicationRecordPassByUserId,getApplicationRecordPassDetails,getApplicationRecordNoPassByUserId,getApplicationRecordNoPassDetails,getApplicationRecordTop} from '../../api/examineAndApprove'
	
	// 定义屏幕高度
	const height = ref("");
	// 定义scroll高度，用于适配底部分页器
	const scrollHeight = ref("");
	
	// 定义数据
	let formData = reactive([])
	
	// let 
	let isOkPopup = ref('0')
	// 
	let tipIsOk = ref('0')
	
	// 初始化界面高度
	onResize(e => height.value = e.size.windowHeight + "px");
	uni.getSystemInfo({
		// success: info => height.value = info.windowHeight - 44 + "px",
		success:function(info){
			console.log("info",info)
			height.value = info.windowHeight - 44 + "px"
			// scrollHeight.value = info.windowHeight - 224 + "px"
		}
	});
	
	// 详细数据
	let dataDetails = reactive([])
	
	// 使用 ref 来获取 uni-popup 组件的引用
	const popup = ref<InstanceType<typeof UniPopup> | null>(null);
	
	// 定义弹出层数据
	let popupData = reactive({
		type:'center',
		msgType: 'success',
		messageText: '这是一条成功提示',
		value: ''
	})
	
	let isOk = ref('0')
	// 定义数据集
	let applicationRecordShowData = reactive([])
	
	// 关于切换登录方式的渲染数据
	const items = reactive(['审批中', '已通过', '被驳回'])
	const styleType = ref('text')
	const activeColor = ref('#007aff')
	const current = ref(0)
	
	// 初始加载
	onLoad(()=>{
		getAllExamineAndApproveValue()
		getdData()
	})
	
	// 获取头部信息
	function getAllExamineAndApproveValue(){
		getApplicationRecordTop().then(res=>{
			if(res.code == '200'){
				let count = reactive({
					"count" : res.result.count,
					"title" :"全部申请"
				})
				applicationRecordShowData.push(count)
				let reviewCount = reactive({
					"count" : res.result.reviewCount,
					"title" :"待审批"
				})
				applicationRecordShowData.push(reviewCount)
				let passCount = reactive({
					"count" : res.result.passCount,
					"title" :"已通过"
				})
				applicationRecordShowData.push(passCount)
				let refuseCount = reactive({
					"count" : res.result.refuseCount,
					"title" : "被驳回"
				})
				applicationRecordShowData.push(refuseCount)
				console.log("applicationRecordShowData",applicationRecordShowData)
				tipIsOk.value = '1'
			}
		}).finally(()=>{})
	}
	
	// 切换手机号、密码登录方式，切换显示内容
	function onClickItem(e) {
		if (current.value !== e.currentIndex) {
			current.value = e.currentIndex;
		}
		if(current.value == 0){
			getdData()
		}
		if(current.value == 1){
			getPassDate()
		}
		if(current.value == 2){
			getNoPassDate()
		}
	}
	
	function getNoPassDate(){
		isOk.value = '0'
		let params = reactive({})
		getApplicationRecordNoPassByUserId(params).then(res=>{
			if(res.code == '200'){
				formData = res.result
				res.result.forEach((item, index, array)=>{
					let commandObject = JSON.parse(item.societyBusiness.command);
					formData[index].societyBusiness.command = commandObject
				})
				console.log('formData',formData)
				isOk.value = '1'
			}
		})
	}
	function getPassDate(){
		isOk.value = '0'
		let params = reactive({})
		getApplicationRecordPassByUserId(params).then(res=>{
			if(res.code == '200'){
				formData = res.result
				res.result.forEach((item, index, array)=>{
					let commandObject = JSON.parse(item.societyBusiness.command);
					formData[index].societyBusiness.command = commandObject
				})
				console.log('formData',formData)
				isOk.value = '1'
			}
		})
	}
	// 加载待审批数据
	function getdData(){
		isOk.value = '0'
		let params = reactive({})
		getApplicationRecordByUserId(params).then(res=>{
			if(res.code == '200'){
				formData = res.result
				res.result.forEach((item, index, array)=>{
					let commandObject = JSON.parse(item.societyBusiness.command);
					formData[index].societyBusiness.command = commandObject
				})
				console.log('formData',formData)
				isOk.value = '1'
			}
		})
	}
	// 待审批详情
	function applicaDetails(e,t){
		isOkPopup.value = '0'
		let params = reactive({
			"processInstanceId":e,
			"businessKey":t
		})
		getApplicationRecordDetails(params).then(res=>{
			if(res.code == '200'){
				console.log("res",res)
				dataDetails = res.result
				isOkPopup.value = '1'
			}
		})
	}
	// 已经通过的详情
	function passDetails(e,t){
		isOkPopup.value = '0'
		let params = reactive({
			"processInstanceId":e,
			"businessKey":t
		})
		getApplicationRecordPassDetails(params).then(res=>{
			if(res.code == '200'){
				dataDetails = res.result
				isOkPopup.value = '1'
			}
		})
	}
	// 获取被驳回详情
	function noPassDetails(e,t){
		isOkPopup.value = '0'
		let params = reactive({
			"processInstanceId":e,
			"businessKey":t
		})
		getApplicationRecordNoPassDetails(params).then(res=>{
			if(res.code == '200'){
				dataDetails = res.result
				isOkPopup.value = '1'
			}
		})
	}
	
	// 弹出层事件
	function goDetails(e,t){
		if(current.value==0){
			applicaDetails(e,t)
		}
		if(current.value==1){
			passDetails(e,t)
		}
		if(current.value==2){
			noPassDetails(e,t)
		}
		popupData.type = "center";
		if (popup.value) {
		  popup.value.open("center"); // 直接调用 open 方法，不需要 this
		} else {
		  console.warn('Popup ref is not yet set');
		}
	}


</script>

<style lang="scss" scoped>
	page{
		background-color: #EDF3FC;
	}
	.back{
		width: 750rpx;
		.applicationRecordShowSty{
			// width: 95%; 
			// height: 50px;
			// margin:0rpx auto 0rpx; 
			border-radius: 20rpx 20rpx; 
			overflow: hidden;
		}
		.itemSty{
			background-color: white; 
			margin-bottom: 10rpx;
		}
		.scrollSty{
			width: 100%; 
			height: 700rpx;
			// height: 100%;
			
			.applicationListSty{
				width: 95%;
				margin: 0 auto 0rpx;
				
			}
			
		}
		.pageSty{
			 width: 100%; 
			 height: 40px;
			 position: fixed;
			 bottom: 0;
			 background-color: #ffffff;
		}
	}
</style>