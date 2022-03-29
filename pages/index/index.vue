<template>
	<view class="box">
		<topimg :dats='dats'></topimg>
		<view class="gonggao">
			<view class="ggtit">公告</view>
			<!-- <view class="ggcon">请各位及时上传所需资料，截止日期15天后</view> -->
			<view class="ggcon">
				<swiper class="swiper" :autoplay="true" :interval='8000' :vertical='true' :isable-touch='false'>
					<swiper-item @touchmove.stop>
						<view class="swiper-item uni-bg-red">请各位及时上传所需资料，截止日期15天后请各位及时上传所需资料，截止日期45天后</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item uni-bg-green">请各位及时上传所需资料，截止日期30天后</view>
					</swiper-item>
					<swiper-item>
						<view class="swiper-item uni-bg-blue">请各位及时上传所需资料，截止日期45天后</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="iconfelx">
			<view class="icinli" v-for="(item,index) in iconlist" :key='index'>
				<image :src="item.iconurl" mode="aspectFit"></image>
				<view>{{item.tit}}</view>
			</view>
		</view>
		<view class="inme">
			<view class="imtopse">
				<input type="text" value="" placeholder="成员列表" />
				<image src="../../static/image/search.png" mode="aspectFit"></image>
			</view>
			<view class="meli" v-for="(item,index) in melist" :key='index'>
				<view class="melileft">
					<image :src="item.imgurl" mode="aspectFit"></image>
				</view>
				<view class="meliright"><strong><strong></strong></strong>
					<view class="melir1">
						<view>{{item.name}}</view>
						<view>{{item.sex}}</view>
						<view>{{item.age}}</view>
					</view>
					<view class="melir2">
						<view>{{item.mobile}}</view>
					</view>
					<view class="melir3">
						<view>{{item.shqu}}</view>
						<view>{{item.shenfen}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="tologin" v-if="login" @click="tologin"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				melist: [{
					name: '张某某',
					sex: '男',
					age: '43',
					mobile: '17653689913',
					shqu: '大虞合作社',
					shenfen: '成员',
					imgurl: 'http://hlstore.yimetal.cn/13.jpg'
				}, {
					name: '张某某',
					sex: '男',
					age: '43',
					mobile: '17653689913',
					shqu: '大虞合作社',
					shenfen: '成员',
					imgurl: 'http://hlstore.yimetal.cn/11.png'
				}, {
					name: '张某某',
					sex: '男',
					age: '43',
					mobile: '17653689913',
					shqu: '大虞合作社',
					shenfen: '成员',
					imgurl: 'http://hlstore.yimetal.cn/11.png'
				}],
				iconlist: [{
					tit: '晒承诺',
					iconurl: '../../static/image/indexicon1.png'
				}, {
					tit: '晒履职',
					iconurl: '../../static/image/indexicon2.png'
				}, {
					tit: '晒联户',
					iconurl: '../../static/image/indexicon3.png'
				}],
				login: false,
				dats: true, //轮播是否显示分页器
			}
		},
		onLoad() {
			// 修改顶部标题
			uni.setNavigationBarTitle({
				title: '大虞合社区'
			})
		},
		onShow() {
			if (!uni.getStorageSync('userInfo')) {
				this.login = true
			} else {
				this.login = false
			}
		},
		methods: {
			tologin() {
				if (!uni.getStorageSync('userInfo')) {
					uni.showModal({
						title: '提示',
						content: '您还没有登录，请先登录',
						confirmText: '去登录',
						success: function(res) {
							if (res.confirm) {
								uni.redirectTo({
									url: './register'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			}
		}
	}
</script>

<style>
	.banner {
		margin-bottom: 20rpx;
	}

	.uni-bg-red {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.ggcon .swiper {
		width: 560rpx;
		height: 35rpx;
	}

	.tologin {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
	}

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
		color: #646464;
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

	.icinli view {
		font-size: 28rpx;
		color: #646464;
		font-weight: bold;
		text-align: center;
	}

	.icinli image {
		width: 100rpx;
		height: 100rpx;
		margin-bottom: 26rpx;
	}

	.iconfelx {
		width: 680rpx;
		margin: auto;
		padding-top: 46rpx;
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin-bottom: 55rpx;
	}

	.ggcon {
		font-size: 24rpx;
		color: #787878;
	}

	.ggtit {
		font-size: 24rpx;
		color: #646464;
		margin-right: 24rpx;
		font-weight: bold;
	}

	.gonggao {
		display: flex;
		align-items: center;
		width: 680rpx;
		margin: auto;
		padding-left: 24rpx;
		box-sizing: border-box;
	}

	.wx-swiper-dot {
		position: relative;
		bottom: 10rpx;
	}

	.hddetimg {
		width: 680rpx;
		height: 366rpx;
	}

	.swiper {
		width: 680rpx;
		height: 444rpx;
		margin: auto;
	}

	.box {
		padding-top: 44rpx;
	}
</style>
