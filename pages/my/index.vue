<template>
	<view class="box">
		<view class="myinfo">
			<view class="mileft">
				<image src="http://hlstore.yimetal.cn/12.png"></image>
			</view>
			<view class="miright">
				<view class="mirli1">
					<view>点击登录</view>
					<view>成员</view>
				</view>
				<view class="mirli2">
					<view>大虞街道</view>
					<view>大虞合作社</view>
				</view>
			</view>
		</view>
		<view class="listf" v-for="(item,index) in list" :key="index" @click="topage(item.id)">
			<view>{{item.title}}</view>
			<image src="../../static/image/righticon.png"></image>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[{
					id:0,
					title:'个人信息'
				},{
					id:1,
					title:'我的承诺'
				},{
					id:2,
					title:'我的履职'
				},{
					id:3,
					title:'我的联户'
				},{
					id:4,
					title:'关于我们'
				}],
				info:[]
			}
		},
		methods:{
			topage(){
				if(!uni.getStorageSync('userInfo')){
					uni.showToast({
						title:'请先登录',
						icon:'none'
					})
					return
				}
			}
		}
	}
</script>

<style>
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
		padding: 0 37rpx 0 41rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 20rpx;
		margin-bottom: 30rpx;
	}
	.mirli2{
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #646464;
		font-size: 28rpx;
	}
	.mirli1 view:nth-child(2){
		color: #969696;
		font-size: 28rpx;
	}
	.mirli1 view:nth-child(1){
		color: #646464;
		font-size: 38rpx;
		font-weight: bold;
	}
	.miright{
		width: 452rpx;
	}
	.mirli1{
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: 54rpx;
	}
	.mileft image{
		width: 144rpx;
		height: 144rpx;
		border-radius: 20rpx;
	}
	.myinfo{
		width: 680rpx;
		height: 270rpx;
		border-radius: 20rpx;
		background-color: #fff;
		margin: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx 0 30rpx;
		box-sizing: border-box;
		margin-bottom: 60rpx;
		box-shadow: 5px 10px 20px 0px rgba(147, 147, 147, 0.2);
	}
	.box{
		padding-top: 20rpx;
	}
</style>
