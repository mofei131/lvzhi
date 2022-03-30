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
					title:'大虞街道'
				},{
					title:'广文街道'
				},{
					title:'某某街道'
				},{
					title:'某某街道'
				}],
				hzList:[{
					id:-1,
					title:'包靠干部联户'
				},{
					id:-2,
					title:'成员联户'
				}],
				userInfo:'',
			}
		},
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo')
		},
		methods:{
			//判断角色展示列表
			showList(){
				if(this.userInfo.role == 4){
					this.list = uni.getStorageSync('streetList')
				}else if(this.userInfo == 3){
					this.list = uni.getStorageSync('cooperativeList')
				}else if(this.userInfo == 2){
					this.list = this.hzList
				}else{
					
				}
			},
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
