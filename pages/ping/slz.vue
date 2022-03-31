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
		<view v-if="hezuoshe">
			<picker class="listf" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange"
				fields='month'>
				<view class="flexbox">
					<view>选择年度月份</view>
					<view class="pickflex">
						<view class="uni-input">{{date}}</view>
						<image src="../../static/image/righticon.png"></image>
					</view>
				</view>
			</picker>
			<view class="listf" v-for="(item,index) in list" :key="index" @click="toPage(item.type)">
				<view>{{item.title}}</view>
				<image src="../../static/image/righticon.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				list: [{
					title: '合作社履职',
					type: 1
				}, {
					title: '包靠干部履职',
					type: 2
				}, {
					title: '成员履职',
					type: 3
				}],
				date: currentDate,
				coop_id: '',
				coops: {},

				streets: [],

				zuzhibu: false,
				jiedao: false,
				hezuoshe: false,
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},

		onLoad(e) {

		},

		onShow() {
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

			bindDateChange: function(e) {
				this.date = e.target.value
			},

			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 0;
				} else if (type === 'end') {
					year = year + 20;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				// return `${year}-${month}-${day}`;
				return `${year}-${month}`;
			},

			toPage(type) {
				uni.navigateTo({
					url: '../index/lzlist?type=' + type + '&date=' + this.date + '&coop_id=' + this.coop_id
				})
			}
		}
	}
</script>

<style>
	.flexbox {
		display: flex;
		width: 600rpx;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.pickflex image {
		margin-left: 20rpx;
	}

	.pickflex {
		display: flex;
		align-items: center;
	}

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
