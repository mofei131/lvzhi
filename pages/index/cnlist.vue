<template>
	<view class="box">
		<view class="topimg">
			<topimg></topimg>
		</view>
		<view class="cncard" v-for="(item,index) in cnlist" :key="index">
			<view class="cnctop">
				<view class="cnctleft">
					<image :src="item.imgurl"></image>
				</view>
				<view class="cnctright">
					<view class="cnctrli1">
						<view>{{item.name}}</view>
						<view>{{item.hzs}}</view>
					</view>
					<view class="cnctrli2">
						<view>{{item.time}}</view>
					</view>
				</view>
			</view>
			<view class="cncbot">
				<view>{{item.chcon}}</view>
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
				cnlist:[{
					name:'张某某',
					hzs:'大虞合作社',
					time:'2022-03-09 19:08',
					imgurl:'http://hlstore.yimetal.cn/13.jpg',
					chcon:'我承诺今年服务2000个家庭，为他们提供帮助，使他们脱贫致富承诺今年服务2000个家庭，为他们提供帮助，使他们脱贫致富承诺今年服务2000个家庭，为他们提供帮助，使他们脱贫致富承诺今年服务2000个家庭。'
				},{
					name:'张某某',
					hzs:'大虞合作社',
					time:'2022-03-09 19:08',
					imgurl:'http://hlstore.yimetal.cn/13.jpg',
					chcon:'我承诺今年服务2000个家庭，为他们提供帮助，使他们脱贫致富承诺今年服务2000个家庭，为他们提供帮助，使他们脱贫致富承诺今年服务2000个家庭，为他们提供帮助，使他们脱贫致富承诺今年服务2000个家庭。'
				}]
			}
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
	.cncbot view{
		color: #787878;
		font-size: 24rpx;
		line-height: 36rpx;
	}
	.cnctrli2 view{
		color: #969696;
		font-size: 22rpx;
		font-weight: 400;
	}
	.cnctrli1 view:nth-child(2){
		color: #646464;
		font-size: 28rpx;
	}
	.cnctrli1 view:nth-child(1){
		color: #646464;
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}
	.cnctrli1{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.cnctright{
		width: 540rpx;
	}
	.cnctleft image{
		width: 76rpx;
		height: 76rpx;
		border-radius: 13rpx;
	}
	.cnctop{
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 27rpx;
	}
	.cncard{
		width: 680rpx;
		margin: auto;
		padding: 35rpx 21rpx;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 20rpx;
		margin-bottom: 52rpx;
		box-shadow: 5px 10px 20px 0px rgba(147, 147, 147, 0.2);
	}
	.topimg{
		margin-bottom: 52rpx;
	}
	.box{
		padding-top: 20rpx;
		padding-bottom: 200rpx;
	}
</style>
