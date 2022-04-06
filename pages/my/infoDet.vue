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
		<view class="btnbox" v-if="myInfo.role == 1?uid == myInfo.id?true:false:true">
			<view class="qbtn" @click="towork(1)">履职情况</view>
			<view class="jbtn" @click="towork(2)">工作承诺</view>
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
				userInfo:'',
				uid:'',
				myInfo:''
			}
		},
		onLoad(p) {
			this.uid = p.uid
		},
		onShow() {
			this.myInfo = uni.getStorageSync('userInfo')
			this.getInfoDet()
		},
		methods:{
			//获取成员详情
			getInfoDet(){
				this.api.getUserInfo({
					uid:this.uid
				},res=>{
					if(res.code == 200){
						this.userInfo = res.data
						this.info[this.info.findIndex(item => item.id == 0)].value = res.data.realname
						this.info[this.info.findIndex(item => item.id == 1)].value = res.data.post
						this.info[this.info.findIndex(item => item.id == 2)].value = res.data.age
						this.info[this.info.findIndex(item => item.id == 3)].value = res.data.sex == 1?'男':'女'
						this.info[this.info.findIndex(item => item.id == 4)].value = uni.getStorageSync('cooperativeList')[uni.getStorageSync('cooperativeList').findIndex(item => item.id == res.data.cooperative_id)].cooperative_name
						this.info[this.info.findIndex(item => item.id == 5)].value = res.data.mobile
					}else{
						uni.showToast({
							title:res.message,
							icon:'none'
						})
					}
				})
			},
			towork(e){
				if(e == 1){
					uni.navigateTo({
						url:'mylzlist?uid='+this.uid
					})
				}else if(e ==2){
					uni.navigateTo({
						url:'mycnlist?uid='+this.uid
					})
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
