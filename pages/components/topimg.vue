<template>
	<view class="banner">
		<swiper class="swiper" :autoplay="true" :interval="3000" >
				<swiper-item>
						<image class="hddetimg" src="http://hlstore.yimetal.cn/images/global/swiper.png"></image>
				</swiper-item>
				<swiper-item>
						<image class="hddetimg" src="http://hlstore.yimetal.cn/images/global/swiper.png"></image>
				</swiper-item>
				<swiper-item>
						<image class="hddetimg" src="http://hlstore.yimetal.cn/images/global/swiper.png"></image>
				</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				banner:''
			}
		},
		created() {
			// this.api.banner({
			// },res=>{
			// 	this.banner = res.data
			// })
		},
		methods:{
			
		}
	}
</script>

<style>
	.hddetimg{
		width: 680rpx;
		height: 366rpx;
	}
	.swiper{
		width: 680rpx;
		height: 366rpx;
		margin: auto;
	}
	.toppng image{
		width: 680rpx;
		height: 366rpx;
		margin: auto;
		display: block;
	}
</style>
