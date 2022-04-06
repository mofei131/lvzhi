<template>
	<view class="box">
		<view class="toptitle" :style="{height:height+30+'px'}">
			<image src="../../static/image/back.png" mode="" @click="backList"></image>
			<view>晒承诺</view>
			<view></view>
		</view>
		<!-- 用户是 4组织部 -->
		<view v-if="zuzhibu">
			<view v-for="(item, index) in streets" class="listf" @click="huoquCoops(item.id)" :key="index">
				<view class="uni-input">{{item.street_name}}</view>
				<image src="../../static/image/righticon.png" mode="aspectFit"></image>
			</view>
		</view>
		<!-- 用户是 3街道 -->
		<view v-if="jiedao">
			<view v-for="(item, index) in coops" class="listf" @click="huoquHezuoshe(item.id)" :key='index'>
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
			<view class="listf" v-for="(item,index) in list" :key="index" @click="toPage(item.type)">
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
				}, {
					title: '包靠干部承诺',
					type: 2,
				}, {
					title: '成员承诺',
					type: 3,
				}],

				zuzhibu: false,
				jiedao: false,
				hezuoshe: false,

				date: currentDate,
				height:''
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
			let that = this
			uni.getSystemInfo({
					success:function(data){
							// 将其赋值给this
							that.height=data.statusBarHeight;
							console.log(data.statusBarHeight)
					}
			})
			this.showList()
		},

		onShow() {
			
		},

		methods: {
			//显示展示列表
			showList(){
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
			//返回上一级
			backList(){
				if(this.zuzhibu){
					uni.switchTab({
						url:'../index/index'
					})
				}else if(this.jiedao){
					if(uni.getStorageSync('userInfo').role == 4){
						this.zuzhibu = true
						this.jiedao = false
						this.hezuoshe = false
						this.huoquStreets()
					}else{
						uni.switchTab({
							url:'../index/index'
						})
					}
				}else if(this.hezuoshe){
					if(uni.getStorageSync('userInfo').role == 3 || uni.getStorageSync('userInfo').role == 4){
						this.jiedao = true
						this.zuzhibu = false
						this.hezuoshe = false
						this.huoquCoops()
					}else{
						uni.switchTab({
							url:'../index/index'
						})
					}
				}
			},
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
				this.coop_id = id ? id: uni.getStorageSync('userInfo').cooperative_id
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
					year = year - 20;
				} else if (type === 'end') {
					year = year + 20;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				// return `${year}-${month}-${day}`;
				return `${year}`;
			},

			// 页面跳转
			toPage(type) {
				uni.navigateTo({
					url: '../index/cnlist?coop_id=' + this.coop_id + '&type=' + type + '&year=' + this.date
				})
			}
		}
	}
</script>

<style>
	.toptitle view{
		font-size: 28rpx;
		text-align: center;
	}
	.toptitle image{
		width: 40rpx;
		height: 40rpx;
	}
	.toptitle{
		width: 750rpx;
		margin: auto;
		display: flex;
		align-items: flex-end;
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 20rpx;
		box-sizing: border-box;
		margin-bottom: 44rpx;
		justify-content: space-between;
	}
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
