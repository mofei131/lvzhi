<template>
	<view class="box">
		<topimg class="topimg"></topimg>
		<view class="listf" v-for="(item,index) in list" :key="index">
			<view>{{item.title}}</view>
			<image src="../../static/image/righticon.png"></image>
		</view>
		<view class="tologin" v-if="login" @click="tologin"></view>
	</view>
</template>

<script>
	import topimg from '../components/topimg.vue'
	export default{
		components:{
			topimg
		},
		data(){
			return{
				list:[{
					title:'合作社评价'
				},{
					title:'负责人评价'
				},{
					title:'成员评价'
				}],
				login:false
			}
		},
		onShow() {
			if(!uni.getStorageSync('userInfo')){
				this.login = true
			}else{
				this.login = false
			}
		},
		methods:{
			tologin(){
				if(!uni.getStorageSync('userInfo')){
					uni.showModal({
						title: '提示',
						content: '您还没有登录，请先登录',
						success: function (res) {
							if (res.confirm) {
								uni.switchTab({
									url:'../my/index'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			}
		}
	}
</script>

<style>
	.tologin{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
	}
	.listf image{
		width: 19rpx;
		height: 34rpx;
	}
	.listf view{
		color: #646464;
		font-size: 34rpx;
		font-weight: bold;
	}
	.listf{
		width: 680rpx;
		height: 100rpx;
		background-color: #EAEAEA;
		margin: auto;
		margin-top: 50rpx;
		padding: 0 37rpx 0 41rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 20rpx;
	}
	.topimg{
		margin-bottom: 49rpx;
	}
</style>
