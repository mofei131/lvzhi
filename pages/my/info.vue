<template>
	<view class="box">
		<view class="infoul">
			<view class="infoli" v-for="(item,index) in info" :key='index'>
				<view class="inlileft">
					<view>{{item.title}}</view>
				</view>
				<view class="inliright">
					<input type="text" v-model="item.value" :disabled="true" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				info:[{
					id:0,
					title:'姓名',
					value:''
				},{
					id:1,
					title:'职务',
					value:''
				},{
					id:2,
					title:'年龄',
					value:''
				},{
					id:3,
					title:'性别',
					value:''
				},{
					id:4,
					title:'所属合作社',
					value:''
				},{
					id:5,
					title:'联系方式',
					value:''
				}],
				userInfo:''
			}
		},
		onShow() {
			this.userInfo = uni.getStorageSync('userInfo')
			this.showInfo()
		},
		methods:{
			//根据角色判断显示内容
			showInfo(){
				if(this.userInfo.role == 4 || this.userInfo.role == 3){
					this.info.splice(this.info.findIndex(item => item.id == 1),1)
					this.info.splice(this.info.findIndex(item => item.id == 2),1)
					this.info.splice(this.info.findIndex(item => item.id == 3),1)
					this.info.splice(this.info.findIndex(item => item.id == 4),1)
					this.info[this.info.findIndex(item => item.id == 0)].value = this.userInfo.realname
					this.info[this.info.findIndex(item => item.id == 5)].value = this.userInfo.mobile
					this.info[this.info.findIndex(item => item.id == 0)].title = '负责人'
				}else if(this.userInfo.role == 2){
					this.info.splice(this.info.findIndex(item => item.id == 1),1)
					this.info.splice(this.info.findIndex(item => item.id == 2),1)
					this.info.splice(this.info.findIndex(item => item.id == 3),1)
					this.info[this.info.findIndex(item => item.id == 4)].title = '所属街道'
					this.info[this.info.findIndex(item => item.id == 0)].value = this.userInfo.realname
					this.info[this.info.findIndex(item => item.id == 5)].value = this.userInfo.mobile
					this.info[this.info.findIndex(item => item.id == 4)].value = uni.getStorageSync('streetList')[uni.getStorageSync('streetList').findIndex(item => item.id == this.userInfo.street_id)].street_name
				}else if(this.userInfo.role == 1 || this.userInfo.role == 5){
					this.info[this.info.findIndex(item => item.id == 0)].value = this.userInfo.realname
					this.info[this.info.findIndex(item => item.id == 1)].value = this.userInfo.post
					this.info[this.info.findIndex(item => item.id == 2)].value = this.userInfo.age
					this.info[this.info.findIndex(item => item.id == 3)].value = this.userInfo.sex == 1?'男':'女'
					this.info[this.info.findIndex(item => item.id == 4)].value = uni.getStorageSync('cooperativeList')[uni.getStorageSync('cooperativeList').findIndex(item => item.id == this.userInfo.cooperative_id)].cooperative_name
					this.info[this.info.findIndex(item => item.id == 5)].value = this.userInfo.mobile
				}
			}
		}
	}
</script>

<style>
	.uni-input{
		color: #646464;
		font-size: 32rpx;
	}
	.jbtn{
		width: 261rpx;
		height: 91rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		font-size: 34rpx;
		font-weight: bold;
		background-color: #ff4646;
	}
	.qbtn{
		width: 261rpx;
		height: 91rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ff4646;
		font-size: 34rpx;
		font-weight: bold;
		background-color: #FADCDC;
	}
	.btnbox{
		height: 140rpx;
		width: 750rpx;
		margin: auto;
		padding-bottom: 50rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.picker{
		width: 497rpx;
		height: 72rpx;
		border-radius: 20rpx;
		color: #646464;
		border: 1rpx solid #464646;
		padding: 0 28rpx 0 28rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}
	.inliright input{
		width: 497rpx;
		height: 72rpx;
		border-radius: 20rpx;
		color: #646464;
		border: 1rpx solid #464646;
		padding: 0 28rpx 0 28rpx;
		box-sizing: border-box;
	}
	.inlileft view{
		width: 160rpx;
		color: #646464;
		font-size: 32rpx;
		font-weight: bold;
	}
	.infoli{
		display: flex;
		margin-bottom: 38rpx;
		align-items: center;
		justify-content: space-between;
	}
	.infoul{
		width: 680rpx;
		margin: auto;
	}
	.box{
		padding-top: 20rpx;
		padding-bottom: 200rpx;
	}
</style>
