# 使用示例
``` 
<template>
	<div class="container">
		<chenzuheng-verify-slider @result='verifyResult' ref="verifyElement"></chenzuheng-verify-slider>
		<button @click="verifyReset" class="btn">重置</button>
	</div>
</template>

<script>
	 import ChenzuhengVerifySlider from '@/components/chenzuheng-verify-slider/chenzuheng-verify-slider.vue'
	export default {
	    components: {
	       ChenzuhengVerifySlider
	    },
	    data() {
	        return {
	            resultData:{}
	        }
	    },
	    methods: {
	        /* 校验结果回调函数 */
	        verifyResult(res){
	            console.log(res);
	            this.resultData = res;
	        },
	        /* 校验插件重置 */
	        verifyReset(){
	            this.$refs.verifyElement.reset();
	
	            /* 删除当前页面的数据 */
	            this.resultData = {};
	        }
	    }
	}
</script>

<style>
.container{
	width: 610rpx;
	margin: 30rpx auto;
	
}
.btn{
	width: 50%;
	margin: 0 auto;
	margin-top: 100rpx;
	background-color: #7ac23c;
	color: #fff;
}
</style>
```