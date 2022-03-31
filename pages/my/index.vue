<template>
	<view class="box">
		<view class="myinfo">
			<view class="mileft">
				<image :src="userInfo.avater"></image>
			</view>
			<view class="miright">
				<view class="mirli1">
					<view @click="tologin" v-if="userInfo.length == 0">点击登录</view>
					<view v-else>{{userInfo.realname}}</view>
					<view>{{userInfo.post}}</view>
				</view>
				<view class="mirli2">
					<view>{{street}}</view>
					<view>{{cooperative}}</view>
				</view>
			</view>
		</view>
		<view class="mtlibox">
			<view class="listf" v-for="(item,index) in list" :key="index" @click="topage(item.id)">
				<view>{{item.title}}</view>
				<image src="../../static/image/righticon.png"></image>
			</view>
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
				userInfo:'',//用户信息
				cooperative:'',//合作社
				street:'',//街道
			}
		},
		onLoad() {
			//赋值用户信息
			if(uni.getStorageSync('userInfo')){
				this.userInfo = uni.getStorageSync('userInfo')
			}
			this.showlist()
		},
		onShow() {
			//获取街道和合作社名称
			if(uni.getStorageSync('streetList')&&uni.getStorageSync('streetList')){
				this.street = uni.getStorageSync('streetList')[uni.getStorageSync('streetList').findIndex(item => item.id == this.userInfo.street_id)].street_name
				this.cooperative = uni.getStorageSync('cooperativeList')[uni.getStorageSync('cooperativeList').findIndex(item => item.id == this.userInfo.cooperative_id)].cooperative_name
			}
		},
		methods:{
			//根据角色删除显示数组
			showlist(){
				if(this.userInfo.role == 4 || this.userInfo.role == 3){
					this.list.splice(this.list.findIndex(item => item.id == 1),1)
					this.list.splice(this.list.findIndex(item => item.id == 2),1)
					this.list.splice(this.list.findIndex(item => item.id == 3),1)
				}else if(this.userInfo.role == 2){
					this.list.splice(this.list.findIndex(item => item.id == 3),1)
				}
			},
			//去登录
			tologin(){
				uni.redirectTo({
					url: '../index/register'
				})
			},
			//提示登录
			topage(e){
				if(!uni.getStorageSync('userInfo')){
					uni.showToast({
						title:'请先登录',
						icon:'none'
					})
					return
				}
				if(e == 0){
					uni.navigateTo({
						url:'./info'
					})
				}else if(e == 1){
					uni.navigateTo({
						url:'./mycnlist'
					})
				}else if(e == 2){
					uni.navigateTo({
						url:'mylzlist'
					})
				}else if(e == 3){
					uni.navigateTo({
						url:'../ping/lhList'
					})
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
