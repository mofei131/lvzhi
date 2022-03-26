<template>
	<view class="box">
		<view class="input">
			<input type="text" placeholder="请输入成员名称..." placeholder-style="color: #eaeaea;" />
			<image src="../../static/image/searchq.png" mode=""></image>
		</view>
		<view class="inme">
			<view class="imtopse">
				<input type="text" value="搜索列表" disabled='true' />
				<view></view>
				<!-- <image src="../../static/image/search.png" mode=""></image> -->
			</view>
			<view class="meli" v-for="(item,index) in melist" :key='index'>
				<view class="melileft">
					<image :src="item.imgurl"></image>
				</view>
				<view class="meliright">
					<view class="melir1">
						<view>{{item.name}}</view>
						<view>{{item.sex}}</view>
						<view>{{item.age}}</view>
					</view>
					<view class="melir2">
						<view>{{item.mobile}}</view>
					</view>
					<view class="melir3">
						<view>{{item.shqu}}</view>
						<view>{{item.shenfen}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				melist:[{
					name:'张某某',
					sex:'男',
					age:'43',
					mobile:'17653689913',
					shqu:'大虞合作社',
					shenfen:'成员',
					imgurl:'http://hlstore.yimetal.cn/13.jpg'
				}],
			}
		},
		methods:{
			
		}
	}
</script>

<style>
	.melir3 view:nth-child(2){
		color: #969696;
		font-size: 26rpx;
	}
	.melir3 view:nth-child(1){
		color: #646464;
		font-size: 26rpx;
	}
	.melir3{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.melir2{
		margin-bottom: 18rpx;
	}
	.melir2 view{
		color: #969696;
		font-size: 26rpx;
	}
	.melir1 view:nth-child(3){
		color: #969696;
		font-size: 26rpx;
	}
	.melir1 view:nth-child(2){
		color: #969696;
		font-size: 26rpx;
	}
	.melir1 view:nth-child(1){
		color: #646464;
		font-size: 26rpx;
		font-weight: bold;
		width: 100rpx;
	}
	.melir1{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 18rpx;
	}
	.meliright{
		width: 450rpx;
		box-sizing: border-box;
	}
	.melileft image{
		width: 144rpx;
		height: 144rpx;
		border-radius: 22rpx;
	}
	.meli{
		width: 620rpx;
		margin: auto;
		margin-bottom: 57rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.imtopse{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 620rpx;
		margin: auto;
		border-bottom: 1rpx solid #E6E6E6;
		margin-bottom: 46rpx;
	}
	.imtopse image{
		width: 34rpx;
		height: 34rpx;
	}
	.imtopse input{
		height: 106rpx;
		width: 450rpx;
		color: #ff4646;
		font-size: 34rpx;
		font-weight: bold;
	}
	.inme{
		width: 680rpx;
		margin: auto;
		background-color: #fff;
		border-radius: 20rpx;
		padding-top: 22rpx;
		padding-bottom: 58rpx;
		margin-bottom: 76rpx;
		box-shadow: 5px 10px 20px 0px rgba(147, 147, 147, 0.2);
	}
	.input image{
		width: 55rpx;
		height: 57rpx;
		position: absolute;
		top: 17rpx;
		right: 50rpx;
	}
	.input{
		position: relative;
		margin-bottom: 65rpx;
	}
	.input input{
		height: 90rpx;
		width: 680rpx;
		margin: auto;
		border-radius: 20rpx;
		border: 1rpx solid #E6E6E6;
		font-size: 31rpx;
		color: #464646;
		padding: 0 70rpx 0 40rpx;
		box-sizing: border-box;
	}
	.box{
		padding-top: 20rpx;
	}
</style>
