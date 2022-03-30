<template>
	<view class="box">
		<view class="topimg">
			<topimg></topimg>
		</view>
		<view class="lzcard" v-for="(item,index) in lzlist" :key="index">
			<view class="lzcleft">
				<image :src="item.url"></image>
			</view>
			<view class="lzcright">
				<view class="lzcrli1">
					<view>{{item.name}}</view>
					<view>{{item.she}}</view>
				</view>
				<view class="lzcrli2">
					<view>{{item.mark}}</view>
				</view>
				<view class="lzcrli3">
					<image v-for="(item2,index2) in item.imgurl" :key='index2' :src="item2"></image>
				</view>
				<view class="lzcrli4">
					<view>{{item.time}}</view>
				</view>
			</view>
		</view>
		<view class="btnbox">
			<view class="btn">立即发布</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				lzlist:[{
					url:'http://hlstore.yimetal.cn/13.jpg',
					name:'赵钱孙李',
					she:'大虞合作社',
					mark:'我承诺今年服务2000个家庭，为他们提供帮助，使他们脱贫致富承诺今年服务2000个家庭。',
					time:'2022-03-10 17.21',
					imgurl:['http://hlstore.yimetal.cn/13.jpg','http://hlstore.yimetal.cn/13.jpg','http://hlstore.yimetal.cn/13.jpg','http://hlstore.yimetal.cn/13.jpg','http://hlstore.yimetal.cn/13.jpg']
				},{
					url:'http://hlstore.yimetal.cn/13.jpg',
					name:'赵钱孙李',
					she:'大虞合作社',
					mark:'我承诺今年服务2000个家庭，为他们提供帮助，使他们脱贫致富承诺今年服务2000个家庭。',
					time:'2022-03-10 17.21',
					imgurl:['http://hlstore.yimetal.cn/13.jpg','http://hlstore.yimetal.cn/13.jpg','http://hlstore.yimetal.cn/13.jpg','http://hlstore.yimetal.cn/13.jpg','http://hlstore.yimetal.cn/13.jpg']
				}]
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	.btn{
		width: 681rpx;
		height: 91rpx;
		margin: auto;
		background-color: #ff4646;
		color: #ffffff;
		font-size: 43rpx;
		font-weight: bold;
		letter-spacing: 10px;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.btnbox{
		position: fixed;
		width: 750rpx;
		margin: auto;
		bottom: 0;
		left: 0;
		padding-bottom: 51rpx;
	}
	.lzcrli4 view{
		color: #969696;
		font-size: 18rpx;
		font-weight: 400;
	}
	.lzcrli3 image{
		margin-right: 8rpx;
		width: 178rpx;
		height: 178rpx;
		margin-bottom: 7rpx;
		border-radius: 17rpx;
	}
	.lzcrli3{
		width: 562rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin-bottom: 29rpx;
	}
	.lzcrli2{
		margin-bottom: 29rpx;
	}
	.lzcrli2 view{
		font-size: 24rpx;
		line-height: 36rpx;
		color: #787878;
	}
	.lzcrli1 view:nth-child(2){
		color: #ff4646;
		font-size: 28rpx;
	}
	.lzcrli1 view:nth-child(1){
		color: #646464;
		font-size: 32rpx;
		font-weight: bold;
	}
	.lzcrli1{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 17rpx;
	}
	.lzcright{
		width: 544rpx;
	}
	.lzcleft image{
		width: 76rpx;
		height: 76rpx;
		border-radius: 13rpx;
	}
	.lzcard{
		width: 680rpx;
		border-radius: 20rpx;
		background-color: #fff;
		margin: auto;
		margin-bottom: 56rpx;
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		padding: 40rpx 21rpx 48rpx 21rpx;
		box-sizing: border-box;
		box-shadow: 5px 10px 20px 0px rgba(147, 147, 147, 0.2);
	}
	.topimg{
		margin-bottom: 48rpx;
	}
	.box{
		padding-top: 20rpx;
		padding-bottom: 200rpx;
	}
</style>
