<template>
	<view class="box">
		<view>
			<view class="lzcard" v-for="(item,index) in lzlist" :key="index">
				<view class="lzcleft">
					<image :src="item.url" mode="aspectFit"></image>
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
						<image v-for="(item2,index2) in item.imgurl" :key='index2' :src="item2" mode="aspectFit">
						</image>
					</view>
					<view class="lzcrli4">
						<view>{{item.time}}</view>
					</view>
				</view>
			</view>
			<view v-if="lzlist.length <= 0" class="p404">
				<image src="../../static/image/404.png" mode="aspectFit"></image>
				<text>暂无承诺</text>
			</view>
			<view class="btnbox" v-if="user.role == 1 || user.role == 5">
				<view class="btn" @click="toPage">立即发布</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				date: '',
				coop_id: '',
				page: 1,
				user:'',
				info: {},
				coopInfo: {},

				lzlist: []
			}
		},

		onLoad(e) {
		},

		onShow() {
			this.user = uni.getStorageSync('userInfo')
		},

		onReachBottom: function() {
			this.page = this.page + 1
			if(this.role == 1){
				this.huoquLvzhiList()
			}else{
				this.huoquLvzhiCoop()
			}
		},

		methods: {
			// 获取 1:合作社, 2:包靠干部 履职
			huoquLvzhiCoop() {
				this.api.LvzhiCoop({
					yearMonth: this.date,
					coop_id:uni.getStorageSync('userInfo').cooperative_id,
					type: this.user.role == 2?1:2 //1:合作社, 2:包靠干部
				}, res => {
					this.info = res.data
				})
			},

			// 获取成员 履职
			huoquLvzhiList() {
				var lzlist = this.page == 1 ? [] : this.lzlist
				this.api.LvzhiList({
					coop_id: uni.getStorageSync('userInfo').cooperative_id,
					limit: 10,
					page: this.page
				}, res => {
					this.lzlist = lzlist.concat(res.data)
				})
			},
			
			toPage(){
				uni.navigateTo({
					url: './fabu?type=shailvzhi'
				})
			}
		}
	}
</script>

<style>
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

	.lzcrli4 view {
		color: #969696;
		font-size: 18rpx;
		font-weight: 400;
	}

	.lzcrli3 image {
		margin-right: 8rpx;
		width: 178rpx;
		height: 178rpx;
		margin-bottom: 7rpx;
		border-radius: 17rpx;
	}

	.lzcrli3 {
		width: 562rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin-bottom: 29rpx;
	}

	.lzcrli2 {
		margin-bottom: 29rpx;
	}

	.lzcrli2 view {
		font-size: 24rpx;
		line-height: 36rpx;
		color: #787878;
	}

	.lzcrli1 view:nth-child(2) {
		color: #ff4646;
		font-size: 28rpx;
	}

	.lzcrli1 view:nth-child(1) {
		color: #646464;
		font-size: 32rpx;
		font-weight: bold;
	}

	.lzcrli1 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 17rpx;
	}

	.lzcright {
		width: 544rpx;
	}

	.lzcleft image {
		width: 76rpx;
		height: 76rpx;
		border-radius: 13rpx;
	}

	.lzcard {
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

	.topimg {
		margin-bottom: 48rpx;
	}

	.box {
		padding-top: 20rpx;
		padding-bottom: 200rpx;
	}

	.coon-info {
		margin: 0 40rpx;
	}

	.cooperative_name {
		font-size: 36rpx;
	}

	.intro {
		font-size: 26rpx;
		margin: 40rpx 0;
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
