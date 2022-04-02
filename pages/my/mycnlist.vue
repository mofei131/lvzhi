<template>
	<view class="box">
		<view class="cncard" v-for="(item,index) in cnlist" :key="index" v-if="item">
			<view class="cnctop">
				<view class="cnctleft">
					<image :src="item.user.avater" mode="aspectFit"></image>
				</view>
				<view class="cnctright">
					<view class="cnctrli1">
						<view>{{item.user.realname}}</view>
						<view>{{coopInfo.cooperative_name}}</view>
					</view>
					<view class="cnctrli2">
						<view>{{item.create_time}}</view>
					</view>
				</view>
			</view>
			<view class="cncbot">
				<rich-text  v-html='item.intro'></rich-text>
			</view>
		</view>
		<view v-if="cnlist.length <= 0" class="p404">
			<image src="../../static/image/404.png" mode="aspectFit"></image>
			<text>暂无承诺</text>
		</view>
		<view class="btnbox" v-if="user.role == 1 || user.role == 5" @click="toPage">
			<view class="btn">立即发布</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cnlist: [],
				page: 1,
				
				coopInfo: {}
			}
		},
		
		onShow() {
			this.huoquList()
		},
		
		onReachBottom: function() {
			this.page = this.page + 1
			this.huoquList()
		},

		methods: {
			huoquList() {
				var cnlist = this.page == 1 ? [] : this.cnlist
				this.api.PromiseMyList({
					uid: uni.getStorageSync('userInfo').id,
					page: this.page,
					limit: 10
				}, res => {
					this.cnlist = cnlist.concat(res.data)
					this.api.coopInfo({
						id: uni.getStorageSync('userInfo').cooperative_id,
					}, res => {
						this.coopInfo = res.data
					})
				})
			},

			toPage() {
				uni.navigateTo({
					url: '../index/fabu?type=shaichengnuo'
				})
			}
		}
	}
</script>

<style scoped>
	.cncard {
		width: 680rpx;
		margin: auto;
		padding: 35rpx 21rpx;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 20rpx;
		margin-bottom: 52rpx;
		box-shadow: 5px 10px 20px 0px rgba(147, 147, 147, 0.2);
	}

	.cnctop {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 27rpx;
	}

	.cnctleft image {
		width: 76rpx;
		height: 76rpx;
		border-radius: 13rpx;
	}

	.cnctrli1 view:nth-child(2) {
		color: #646464;
		font-size: 28rpx;
	}

	.cnctrli1 view:nth-child(1) {
		color: #646464;
		font-size: 32rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}

	.cnctrli1 {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.cnctright {
		width: 540rpx;
	}


	.cnctrli2 view {
		color: #969696;
		font-size: 22rpx;
		font-weight: 400;
	}

	.cncbot view {
		color: #787878;
		font-size: 24rpx;
		line-height: 36rpx;
	}

	.btn {
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

	.btnbox {
		position: fixed;
		width: 750rpx;
		margin: auto;
		bottom: 0;
		left: 0;
		padding-bottom: 51rpx;
	}
	
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
</style>
