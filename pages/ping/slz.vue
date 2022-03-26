<template>
	<view class="box">
		<view class="listf" v-for="(item,index) in list" :key="index">
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
					title:'选择年度月份'
				},{
					title:'合作社履职'
				},{
					title:'包靠干部履职'
				},{
					title:'成员履职'
				}]
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
	.box{
		padding-top: 20rpx;
	}
</style>
