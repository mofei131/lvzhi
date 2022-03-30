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
				fields='year'>
				<view class="flexbox">
					<view>选择年度</view>
					<view class="pickflex">
						<view class="uni-input">{{date}}</view>
						<image src="../../static/image/righticon.png" mode="aspectFit"></image>
					</view>
				</view>
			</picker>
			<view class="listf" v-for="(item,index) in list" :key="index" @click="toPage(item.type2)">
				<view>{{item.title}}</view>
				<image src="../../static/image/righticon.png" mode="aspectFit"></image>
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
				streets: [], // 街道
				coops: [], // 合作社
				coop_id: '', // 合作社id
				list: [{
					title: '合作社承诺',
					type: 1,
					type2: 1
				}, {
					title: '包靠干部承诺',
					type: 1,
					type2: 2
				}, {
					title: '成员承诺',
					type: 2,
					type2: 3
				}],

				zuzhibu: false,
				jiedao: false,
				hezuoshe: false,

				date: currentDate,
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
			if (uni.getStorageSync('userInfo').role == 4) {
				this.zuzhibu = true
			} else if (uni.getStorageSync('userInfo').role == 3) {
				this.jiedao = true
			} else {
				this.hezuoshe = true
			}
		},

		onShow() {
			this.huoquStreets()
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
					street_id: id
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
				this.coop_id = id
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
				return `${year}`;
			},

			// 页面跳转
			toPage(type2) {
				uni.navigateTo({
					url: '../index/cnlist?coop_id=' + this.coop_id + '&type2=' + type2 + '&year=' + this.date
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
