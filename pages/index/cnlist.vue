<template>
	<view class="box">
		<view v-if="type == 1 || type == 2">
			<view class="topimg">
				<!-- <topimg></topimg> -->
				<image :src="coopInfo.pic" mode=""></image>
			</view>
			<view class="coon-info">
				<view class="cooperative_name">{{coopInfo.cooperative_name}}</view>
				<view class="intro" v-if="info">时间：{{info.create_time}}</view>
				<view class="create_time" v-if="info">
					<mp-html class="title" :content="info.intro" />
				</view>
				<view v-else class="p404">
					<image src="../../static/image/404.png"></image>
					<text>暂无内容</text>
				</view>
			</view>
		</view>
		<view v-if="type == 3">
			<view class="cncard" v-for="(item,index) in cnlist" :key="index" v-if="item">
				<view class="cnctop">
					<view class="cnctleft">
						<image :src="item.user.avater" mode="aspectFit"></image>
					</view>
					<view class="cnctright">
						<view class="cnctrli1">
							<view>{{item.user.realname}}</view>
							<view>{{item.hzs}}</view>
						</view>
						<view class="cnctrli2">
							<view>{{item.create_time}}</view>
						</view>
					</view>
				</view>
				<view class="cncbot">
					<view>{{item.intro}}</view>
				</view>
			</view>
		</view>
		<view class="btnbox" @click="toPage" v-if="(user.role == 1 || user.role == 5)&& type != 1">
			<view class="btn">立即发布</view>
		</view>
		<view v-if="cnlist.length <= 0 && info.length <= 0" class="p404">
			<image src="../../static/image/404.png"></image>
			<text>暂无内容</text>
		</view>
	</view>
</template>

<script>
	import mpHtml from '../components/mp-html/mp-html'
	export default {
		components: {
			mpHtml
		},
		data() {
			return {
				type: '', // 1合作社承诺 2包靠干部承诺 3成员
				coop_id: '', // 1合作社id
				year: '',

				info: {},
				user: {},
				coopInfo: {},

				cnlist: [],
				page: 1
			}
		},

		onLoad(e) {
			this.coop_id = e.coop_id
			this.type = e.type
			this.year = e.year
		},

		onShow() {
			this.user = uni.getStorageSync('userInfo')
			if (this.type == 1 || this.type == 2) {
				this.huoquData()
			} else if (this.type == 3) {
				this.huoquData2()
			}
		},

		onReachBottom: function() {
			this.page = this.page + 1
			this.huoquData2()
		},

		methods: {
			// 获取合作社 包靠干部承诺数据
			huoquData() {
				this.api.promiseCoop({
					year: this.year,
					coop_id: this.coop_id ? this.coop_id : uni.getStorageSync('userInfo').cooperative_id,
					type: this.type //1:合作社, 2:包靠干部
				}, res => {
					this.info = res.data
					this.api.coopInfo({
						id: this.coop_id ? this.coop_id : uni.getStorageSync('userInfo').cooperative_id,
					}, ress => {
						this.coopInfo = ress.data
					})
				})
			},

			// 获取成员承诺数据
			huoquData2() {
				var cnlist = this.page == 1 ? [] : this.cnlist
				this.api.promiseList({
					year: this.year,
					coop_id: this.coop_id ? this.coop_id : uni.getStorageSync('userInfo').cooperative_id,
					page: this.page,
					limit: 10
				}, res => {
					this.cnlist = cnlist.concat(res.data)
				})
			},

			// 立即发布
			toPage() {
				uni.navigateTo({
					url: './fabu?type=shaichengnuo'
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

	.cncbot view {
		color: #787878;
		font-size: 24rpx;
		line-height: 36rpx;
	}

	.cnctrli2 view {
		color: #969696;
		font-size: 22rpx;
		font-weight: 400;
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

	.cnctleft image {
		width: 76rpx;
		height: 76rpx;
		border-radius: 13rpx;
	}

	.cnctop {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 27rpx;
	}

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

	.topimg image {
		width: 680rpx;
		height: 366rpx;
		margin: auto;
		display: block;
		margin-bottom: 52rpx;
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

	.create_time {}
</style>
