<template>
	<view class="box">
		<view class="input">
			<input type="text" placeholder="请输入成员名称..." placeholder-style="color: #eaeaea;" @input="sousuo" />
			<image src="../../static/image/searchq.png" mode="aspectFit"></image>
		</view>
		<view class="inme" v-if="keywords != ''">
			<view class="imtopse">
				<input type="text" value="搜索列表" disabled='true' />
			</view>
			<view v-if="melist.length > 0" class="meli" v-for="(item,index) in melist" :key='index' @click="toDet(item)">
				<view class="melileft">
					<image :src="item.avater?item.avater:'../../static/image/tx.png'" mode="aspectFit"></image>
				</view>
				<view class="meliright">
					<view class="melir1">
						<view>{{item.realname}}</view>
						<view>{{item.sex==1?'男':item.sex==2?'女':'未知'}}</view>
						<view>{{item.age?item.age:'暂无信息'}}</view>
					</view>
					<view class="melir2">
						<view>{{item.mobile?item.mobile:'暂无号码'}}</view>
					</view>
					<view class="melir3">
						<view>{{item.coop_name}}</view>
						<view v-if="item.role == 1">成员</view>
						<view v-if="item.role == 2">合作社</view>
						<view v-if="item.role == 3">街道</view>
						<view v-if="item.role == 4">组织部</view>
						<view v-if="item.role == 5">包靠干部</view>
					</view>
				</view>
			</view>
			<view v-if="melist.length == 0" class="p404">
				<image src="../../static/image/404.png" mode="aspectFit"></image>
				<text>暂无数据</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				melist: [],
				page: 1,
				keywords: ''
			}
		},
		methods: {
			//跳转成员详情
			toDet(e){
				uni.navigateTo({
					url:'../my/infoDet?uid='+e.id
				})
			},
			sousuo(e) {
				this.keywords = e.detail.value
				this.api.members({
					coop_id: uni.getStorageSync('userInfo').cooperative_id, //合作社ID
					street_id: uni.getStorageSync('userInfo').street_id, //街道ID
					page: this.page,
					limit: 10,
					keywords: e.detail.value ? e.detail.value : ''
				}, res => {
					console.log(res)
					this.melist = res.data
				})
			}
		}
	}
</script>

<style>
	.melir3 view:nth-child(2) {
		color: #969696;
		font-size: 26rpx;
	}

	.melir3 view:nth-child(1) {
		color: #646464;
		font-size: 26rpx;
	}

	.melir3 {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.melir2 {
		margin-bottom: 18rpx;
	}

	.melir2 view {
		color: #969696;
		font-size: 26rpx;
	}

	.melir1 view:nth-child(3) {
		color: #969696;
		font-size: 26rpx;
	}

	.melir1 view:nth-child(2) {
		color: #969696;
		font-size: 26rpx;
	}

	.melir1 view:nth-child(1) {
		color: #646464;
		font-size: 26rpx;
		font-weight: bold;
		width: 100rpx;
	}

	.melir1 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 18rpx;
	}

	.meliright {
		width: 450rpx;
		box-sizing: border-box;
	}

	.melileft image {
		width: 144rpx;
		height: 144rpx;
		border-radius: 22rpx;
	}

	.meli {
		width: 620rpx;
		margin: auto;
		margin-bottom: 57rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.imtopse {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 620rpx;
		margin: auto;
		border-bottom: 1rpx solid #E6E6E6;
		margin-bottom: 46rpx;
	}

	.imtopse image {
		width: 34rpx;
		height: 34rpx;
	}

	.imtopse input {
		height: 106rpx;
		width: 450rpx;
		color: #ff4646;
		font-size: 34rpx;
		font-weight: bold;
	}

	.inme {
		width: 680rpx;
		margin: auto;
		background-color: #fff;
		border-radius: 20rpx;
		padding-top: 22rpx;
		padding-bottom: 58rpx;
		margin-bottom: 76rpx;
		box-shadow: 5px 10px 20px 0px rgba(147, 147, 147, 0.2);
	}

	.input image {
		width: 55rpx;
		height: 57rpx;
		position: absolute;
		top: 17rpx;
		right: 50rpx;
	}

	.input {
		position: relative;
		margin-bottom: 65rpx;
	}

	.input input {
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

	.box {
		padding-top: 20rpx;
	}

	.p404 {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #999999;
		line-height: 100rpx;
	}
</style>
