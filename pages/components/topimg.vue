<template>
	<view class="banner">
		<swiper class="swiper" :autoplay="true" :interval="3000" :indicator-dots='dats' indicator-color="#D3D3D3" indicator-active-color="#FF4646">
				<swiper-item v-for="(item,index) in banner" :key='index'>
						<image class="hddetimg" :src="item.pic" mode="aspectFit"></image>
				</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default{
		props: {
			dats:false
		},
		data(){
			return{
				banner:[]
			}
		},
		created() {
			this.banner = this.$store.state.bannerlist
			if(this.banner.length == 0){
				this.api.banner({
				},res=>{
					this.banner = res.data
					this.$store.state.bannerlist = res.data
				})
			}
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
