<template>
	<view class="box">
		<view v-if="type2 == 1 || type2 == 2">
			<view class="topimg">
				<topimg></topimg>
			</view>
			<view class="coon-info">
				<view class="cooperative_name">{{coopInfo.cooperative_name}}</view>
				<view class="intro">时间：{{info.intro}}</view>
				<view class="create_time">{{info.create_time}}</view>
			</view>
		</view>
		<view v-if="type2 == 3">
			<view class="cncard" v-for="(item,index) in cnlist" :key="index">
				<view class="cnctop">
					<view class="cnctleft">
						<image :src="item.imgurl" mode="aspectFit"></image>
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: '', // 1合作社id
				type2: '', // 1合作社承诺 2包靠干部承诺 3成员
				year: '',

				info: {},
				coopInfo: {},
				
				cnlist: [],
				page: 1
			}
		},

		onLoad(e) {
			this.type = e.coop_id
			this.type2 = e.type2
			this.year = e.year
		},

		onShow() {
			if (this.type2 == 1) {
				this.huoquData()
			} else if (this.type2 == 2) {
				this.huoquData()
			} else if (this.type2 == 3) {
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
					coop_id: this.type,
					type: this.type2 //1:合作社, 2:包靠干部
				}, res => {
					this.info = res.data
					this.api.coopInfo({
						id: this.type
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
					coop_id: this.type,
					page: this.page,
					limit: 10
				}, res => {
					this.cnlist = cnlist.concat(res.data)
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

	.topimg {
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
