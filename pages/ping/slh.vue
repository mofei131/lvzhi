<template>
	<view class="box">
		<!-- 用户是 4组织部 -->
		<view v-if="zuzhibu">
			<view v-for="(item, index) in streets" class="listf" @click="huoquCoops(item.id)">
				<view class="uni-input">{{item.street_name}}</view>
				<image src="../../static/image/righticon.png" mode="aspectFit"></image>
			</view>
		</view>
		<!-- 用户是 3街道 -->
		<view v-if="jiedao">
			<view v-for="(item, index) in coops" class="listf" @click="huoquHezuoshe(item.id)">
				<view class="uni-input">{{item.cooperative_name}}</view>
				<image src="../../static/image/righticon.png" mode="aspectFit"></image>
			</view>
		</view>
		<!-- 用户是 1 2 5 合作社成员 -->
		<view class="listf" v-for="(item,index) in hzList" :key="index" @click="toPage">
			<view>{{item.title}}</view>
			<image src="../../static/image/righticon.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				hzList: [{
					title: '合作社联户'
				}],

				userInfo: '',

				zuzhibu: false,
				jiedao: false,
				hezuoshe: false,

				streets: [],
				coops: [],
				
				coop_id: '',
			}
		},

		onLoad() {

		},

		onShow() {
			this.userInfo = uni.getStorageSync('userInfo')
			if (uni.getStorageSync('userInfo').role == 4) {
				this.zuzhibu = true
				this.jiedao = false
				this.hezuoshe = false
				this.huoquStreets()
			} else if (uni.getStorageSync('userInfo').role == 3) {
				this.jiedao = true
				this.zuzhibu = false
				this.hezuoshe = false
				this.huoquCoops()
			} else {
				this.hezuoshe = true
				this.zuzhibu = false
				this.jiedao = false
				this.huoquHezuoshe()
			}
		},

		methods: {
			// 获取街道
			huoquStreets() {
				this.api.getStreets({}, res => {
					this.streets = res.data
				})
			},

			// 获取社区
			huoquCoops(id) {
				this.api.getCoops({
					street_id: id ? id : uni.getStorageSync('userInfo').street_id
				}, res => {
					this.coops = res.data
					this.zuzhibu = false
					this.jiedao = true
				})
			},

			// 获取合作社
			huoquHezuoshe(id) {
				this.jiedao = false
				this.hezuoshe = true
				this.coop_id = id ? id : uni.getStorageSync('userInfo').cooperative_id
			},
			
			// 页面跳转
			toPage(){
				uni.navigateTo({
					url: './lhList?coop_id=' + this.coop_id
				})
			},
		}
	}
</script>

<style>
	.listf image {
		width: 19rpx;
		height: 34rpx;
	}

	.listf view {
		color: #646464;
		font-size: 34rpx;
		font-weight: bold;
	}

	.listf {
		width: 680rpx;
		height: 100rpx;
		background-color: #EAEAEA;
		margin: auto;
		padding: 0 37rpx 0 41rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 20rpx;
		margin-bottom: 30rpx;
	}

	.box {
		padding-top: 20rpx;
	}
</style>
