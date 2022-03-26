<template>
	<view class="box">
		<view class="myinfo">
			<view class="mileft">
				<image src="http://hlstore.yimetal.cn/12.png"></image>
			</view>
			<view class="miright">
				<view class="mirli1">
					<view @click="getLogin">点击登录</view>
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
			getLogin(){
				// uni.showLoading({title: '加载中',mask:true});
				// uni.hideLoading();
					 let that =this
					// 弹出授权框（每次执行都会弹出）
					uni.getUserProfile({
							 desc: '登录授权', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
							 success: (res) => {
									console.log("获取用户授权信息：",res)
									// let data = res.userInfo
									// uni.request({
									// 	url:'https://layer.boyaokj.cn/api/wechat/setUserinfo',
									// 	method:'GET',
									// 	data:{
									// 		nickname:data.nickName,
									// 		avater:data.avatarUrl,
									// 		country:data.country,
									// 		gender:data.gender,
									// 		province:data.province,
									// 		city:data.city,
									// 		user_id:uni.getStorageSync('userInfo').id,
									// 	},
									// 	success(red) {
									// 		console.log(red.data.data)
									// 		console.log(data.nickName)
									// 		that.user.name = data.nickName
									// 		that.user.headimg = data.avatarUrl
									// 	}
									// })
									},
									fail(res){
										uni.showToast({
												title:"拒绝授权，将无法使用部分功能",
												duration: 1000,
												icon: 'none'
										})
							}         
					 })
			},
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
