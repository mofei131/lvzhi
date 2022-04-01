<template>
	<view class="box">
		<view v-if="cnlist.length > 0" class="cncard" v-for="(item,index) in cnlist" :key="index">
			<view class="cnctop">
				<view class="cnctright">
					<view class="cnctrli2">
						<view>时间：{{item.create_time}}</view>
					</view>
				</view>
			</view>
			<view class="cncbot">
				<view>{{item.judge}}</view>
			</view>
		</view>
		<view  v-if="cnlist.length <= 0" class="p404">
			<image src="../../static/image/404.png"></image>
			<text>暂无内容</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cnlist: [],
				page: 1,
				limit: 10,
				coop_id: '', //合作社id
				type: '', //区分合作社或包靠干部或成员
				uid: '', //成员id
				part: '', //判断走合作社还是成员接口
			}
		},
		onLoad(p) {
			this.part = p.part
			this.coop_id = p.coop_id
			this.type = p.type
			if (p.uid) {
				this.uid = p.uid
			} else {
				this.uid = uni.getStorageSync('userInfo').id
			}
		},
		onShow() {
			this.page = 1
			this.getPing()
		},
		onPullDownRefresh() {
			this.cnlist = []
			this.page = 1
			this.getPing()
			uni.stopPullDownRefresh();
		},
		onReachBottom() {
			this.page++
			this.getPing()
		},
		methods: {
			//获取评价
			getPing() {
				console.log(this.part)
				if (this.part == 1) {
					this.api.JudgeList({
						uid: this.uid,
						page: this.page,
						limit: this.limit
					}, res => {
						if (res.code == 200) {
							if (res.data.length != 0) {
								for (let i in res.data) {
									this.cnlist.push(res.data[i])
								}
							} else {
								uni.showToast({
									title: '没有更多了',
									icon: 'none'
								})
							}
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none'
							})
						}
					})
				} else {
					this.api.JudgeCoop({
						coop_id: this.coop_id,
						type: this.type == -1 ? 1 : 2,
						page: this.page,
						limit: this.limit
					}, res => {
						if (res.code == 200) {
							if (res.data.length != 0) {
								for (let i in res.data) {
									this.cnlist.push(res.data[i])
								}
							} else {
								uni.showToast({
									title: '没有更多了',
									icon: 'none'
								})
							}
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none'
							})
						}
					})
				}
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
		/* color: #969696;
		font-size: 22rpx;
		font-weight: 400; */
		color: #787878;
		font-size: 24rpx;
		line-height: 36rpx;
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
