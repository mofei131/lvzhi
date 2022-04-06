<template>
	<view class="box">
		<view class="lzcard" v-for="(item,index) in lhlist" :key="index" v-if="item">
			<view class="lzcleft" v-if="item.user">
				<image :src="item.user.avater" mode="aspectFit"></image>
			</view>
			<view class="lzcright">
				<view class="lzcrli1">
					<view v-if="item.user">{{item.user.realname}}</view>
					<view class="lzcrli4">
						<view class="create_time">{{item.create_time}}</view>
						<view class="shanchu" @click="detLh(index)">删除</view>
					</view>
				</view>
				<view class="lzcrli2">
					<view>
						合作社共有{{item.total}}股民，本人今年包联{{item.baolian}}户，目前已走访{{item.today_zoufang}}户，今日走访{{item.today_zoufang}}户
					</view>
					<view>{{item.intro}}</view>
				</view>
				<view class="lzcrli3">
					<image v-for="(item2,index2) in item.pics" :key='index2' :src="item2" mode="aspectFit" @click="imgPreview(item.pics,index2)"></image>
				</view>
			</view>
		</view>
		<view class="btnbox" v-if="user.role == 1" @click="toPage">
			<view class="btn">立即发布</view>
		</view>
		<view v-if="lhlist.length <= 0" class="p404">
			<image src="../../static/image/404.png"></image>
			<text>暂无内容</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lhlist: [],
				page: 1,
				user:''
			}
		},

		onLoad(e) {

		},

		onShow() {
			this.user = uni.getStorageSync('userInfo')
			this.huoquShaiList()
		},


		onReachBottom: function() {
			this.page = this.page + 1
			this.huoquShaiList()
		},

		methods: {
			//全屏看图
			imgPreview(item,index){
					uni.previewImage({
						current:index,
						indicator:"number",
						loop:true,
						urls:item
					})
			},
			// 获取列表
			huoquShaiList() {
				var lhlist = this.page == 1 ? [] : this.lhlist
				this.api.ShaiMyList({
					uid: uni.getStorageSync('userInfo').id,
					page: this.page,
					limit: 10
				}, res => {
					var list = res.data
					for (var i in list) {
						list[i].pics = list[i].pics.split('|')
					}
					this.lhlist = lhlist.concat(list)
				})
			},

			// 发布
			toPage() {
				uni.navigateTo({
					url: '../index/fabu?type=shailianhu'
				})
			},

			// 删除
			detLh(index) {
				this.api.ShaiDel({
					uid: uni.getStorageSync('userInfo').id,
					id: this.lhlist[index].id
				}, res => {
					if (res.code == 200) {
						uni.showToast({
							title: '删除成功！',
							icon: 'none'
						})
						this.lhlist.splice(index, 1)
						this.huoquShaiList()
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

	.lzcrli4 {
		display: flex;
		align-items: center;
	}

	.create_time {
		font-size: 26rpx !important;
		font-weight: 500 !important;
	}

	.shanchu {
		margin-left: 20rpx;
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

	.box {
		padding-top: 20rpx;
		padding-bottom: 200rpx;
	}
</style>
