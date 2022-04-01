<template>
	<view class="box">
		<view class="inme" v-for="(item,index) in melist" :key='index' @click="topage(item)">
			<view class="meli">
				<view class="melileft">
					<image :src="item.avater"></image>
				</view>
				<view class="meliright">
					<view class="melir1">
						<view>{{item.realname}}</view>
						<view>{{item.sex == 1?'男':'女'}}</view>
						<view>{{item.age}}</view>
					</view>
					<view class="melir2">
						<view>{{item.mobile}}</view>
					</view>
					<view class="melir3">
						<view>{{item.coop_name}}</view>
						<view>{{item.post}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="melist.length <= 0" class="p404">
			<image src="../../static/image/404.png" mode="aspectFit"></image>
			<text>暂无数据</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				melist:[],
				userInfo:'',
				page:1,
				limit:10,
				street_id:'',
				coop_id:''
			}
		},
		onLoad(p) {
			if(p.coop_id || p.street_id){
				this.street_id = p.street_id
				this.coop_id = p.coop_id
			}
		},
		onShow() {
			this.page = 1
			this.melist = []
			this.userInfo = uni.getStorageSync('userInfo')
			this.getMeList()
		},
		onPullDownRefresh() {
			this.page = 1
			this.getMeList()
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			this.page++
			this.getMeList()
		},
		methods:{
			//去评价列表
			topage(e){
				uni.navigateTo({
					url:'./ping?uid='+e.id+'&part=1'+'&coop_id='+e.cooperative_id
				})
			},
			//获取成员列表
			getMeList(){
				this.api.members({
					coop_id:this.userInfo.role == 4 || this.userInfo.role == 3?this.coop_id:this.userInfo.cooperative_id,
					street_id:this.userInfo.role == 4?this.street_id:this.userInfo.street_id,
					page:this.page,
					limit:this.limit,
					keywords:''
				},res=>{
					if(res.code == 200){
						if(res.data.length != 0){
							for(let i in res.data){
								this.melist.push(res.data[i])
							}
						}else{
							uni.showToast({
								title:'到底了',
								icon:'none'
							})
						}
					}else{
						uni.showToast({
							title:res.message,
							icon:'none'
						})
					}
				})
			}
		}
	}
</script>

<style>
	.p404 {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #999999;
		line-height: 100rpx;
		margin-top: 200rpx;
	}
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
		margin-bottom: 0rpx;
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
		padding-bottom: 20rpx;
		margin-bottom: 30rpx;
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
