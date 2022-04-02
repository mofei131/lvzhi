<template>
	<view class="box">
		<topimg :dats='dats'></topimg>
		<view class="gonggao">
			<view class="ggtit">公告</view>
			<!-- <view class="ggcon">请各位及时上传所需资料，截止日期15天后</view> -->
			<view class="ggcon">
				<swiper class="swiper" :autoplay="true" :interval='8000' :vertical='true' :isable-touch='false'>
					<swiper-item @touchmove.stop v-for="(item,index) in noticeList" :key='index'>
						<view class="swiper-item uni-bg-red">{{item.name}}</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="iconfelx">
			<view class="icinli" v-for="(item,index) in iconlist" :key='index' @click="toPage(item.url)">
				<image :src="item.iconurl" mode="aspectFit"></image>
				<view>{{item.tit}}</view>
			</view>
		</view>
		<view class="inme">
			<view class="topflex">
			<image src="../../static/image/back.png" class="cyback" @click="cyBack" v-if="cyWidth"></image>
			<view class="imtopse" @click="toPage('./search')" :style="{width:!cyWidth?'620rpx':'560rpx'}">
				<input type="text" disabled="true" :placeholder="placeholder" />
				<image src="../../static/image/search.png" mode="aspectFit"></image>
			</view>
			</view>
			<view class="meli" v-for="(item,index) in melist" :key='index'
				v-if="userInfo.role == 1 || userInfo.role == 2 || userInfo.role == 5" @click="toDet(item)">
				<view class="melileft">
					<image :src="item.avater?item.avater:'../../static/image/tx.png'" mode="aspectFit"></image>
				</view>
				<view class="meliright"><strong><strong></strong></strong>
					<view class="melir1">
						<view>{{item.realname}}</view>
						<view>{{item.sex==1?'男':item.sex==2?'女':'未知'}}</view>
						<view>{{item.age?item.age:'未知'}}</view>
					</view>
					<view class="melir2">
						<view>{{item.mobile?item.mobile:'暂无号码'}}</view>
					</view>
					<view class="melir3">
						<view>{{item.coop_name}}</view>
						<view v-if="item.role == 1">成员</view>
					</view>
				</view>
			</view>
			<view v-if="melist.length <= 0" class="p404">
				<image src="../../static/image/404.png" mode="aspectFit"></image>
				<text>暂无数据</text>
			</view>

			<view class="meli" v-for="(item,index) in melist" :key='index' v-if="userInfo.role == 3" @click="hrole(item,3)">
				<view class="melileft">
					<image :src="item.avater?item.avater:'../../static/image/tx.png'" mode="aspectFit"></image>
				</view>
				<view class="meliright"><strong><strong></strong></strong>
					<view class="melir1">
						<view style="white-space: nowrap;">{{item.cooperative_name}}</view>
						<view>{{item.total_user}}人</view>
					</view>
					<view class="melir2">
						<view>{{item.mobile?item.mobile:'暂无号码'}}</view>
					</view>
					<view class="melir3">
						<view>{{item.address?item.address:'暂无地址'}}</view>
					</view>
				</view>
			</view>

			<view class="meli" v-for="(item,index) in melist" :key='index' v-if="userInfo.role == 4" @click="hrole(item,4)">
				<view class="melileft">
					<image :src="item.avater?item.avater:'../../static/image/tx.png'" mode="aspectFit"></image>
				</view>
				<view class="meliright"><strong><strong></strong></strong>
					<view class="melir1">
						<view style="white-space: nowrap;">{{item.street_name}}</view>
						<view>{{item.total_user}}人</view>
					</view>
					<view class="melir2">
						<view>{{item.mobile?item.mobile:'暂无号码'}}</view>
					</view>
					<view class="melir3">
						<view>{{item.address?item.address:'暂无地址'}}</view>
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
				notice: [],
				melist: [],
				page: 1,
				iconlist: [{
					tit: '晒承诺',
					iconurl: '../../static/image/indexicon1.png',
					url: '../ping/scn'
				}, {
					tit: '晒履职',
					iconurl: '../../static/image/indexicon2.png',
					url: '../ping/slz'
				}, {
					tit: '晒联户',
					iconurl: '../../static/image/indexicon3.png',
					url: '../ping/slh'
				}],

				login: false,
				dats: true, //轮播是否显示分页器
				userInfo: {},
				placeholder: '',
				noticeList:[],//公告列表
				street_id:'',
				coop_id:'',
				cyWidth:false,//是否显示成员返回上一级
			}
		},
		onLoad() {
			// 修改顶部标题
			this.changeTitle()
			this.resoShow()
		},
		onShow() {
			this.getNotice()
			this.toRegister()
		},

		onReachBottom: function() {
			this.page = this.page + 1
			if(this.userInfo.role != 4 && this.userInfo.role != 3){
				this.huoquMembers()
			}
		},

		methods: {
			//判断注册跳转
			toRegister(){
				if (!uni.getStorageSync('userInfo')) {
					this.api.indexAuth({}, res => {
						if (res.data.is_auth == 0) {
							uni.redirectTo({
								url: 'register'
							})
						} else {
							this.login = true
						}
					})
				}
			},
			//判断列表显示
			resoShow(){
				if (uni.getStorageSync('userInfo')) {
					this.userInfo = uni.getStorageSync('userInfo')
					this.login = false
					this.huoquNotice()
					if (uni.getStorageSync('userInfo').role == 1 || uni.getStorageSync('userInfo').role == 2 || uni
						.getStorageSync('userInfo').role == 5) {
						this.placeholder = '成员列表'
						this.huoquMembers()
					} else if (uni.getStorageSync('userInfo').role == 3) {
						this.placeholder = '合作社列表'
						this.huoquCoops()
					} else if (uni.getStorageSync('userInfo').role == 4) {
						this.placeholder = '街道列表'
						this.huoquStreets()
					}
				}
			},
			//修改顶部标题
			changeTitle(){
				let info = uni.getStorageSync('userInfo')
				if (info.role == 4) {
					uni.setNavigationBarTitle({
						title: '组织部'
					})
				} else if (info.role == 3) {
					uni.setNavigationBarTitle({
						title: uni.getStorageSync('streetList')[uni.getStorageSync('streetList').findIndex(item => item
							.id == info.street_id)].street_name
					})
				} else if (info.role == 2 || info.role == 1 || info.role == 5) {
					uni.setNavigationBarTitle({
						title: uni.getStorageSync('cooperativeList')[uni.getStorageSync('cooperativeList').findIndex(
							item => item.id == info.cooperative_id)].cooperative_name
					})
				}
			},
			//返回上级
			cyBack(){
				if(this.userInfo.role == 3 && uni.getStorageSync('userInfo').role == 4){
					this.userInfo.role = 4
					this.page = 1
					this.huoquStreets()
					this.placeholder = '街道列表'
					this.cyWidth = false
				}else if(this.userInfo.role == 2 && uni.getStorageSync('userInfo').role == 4 || uni.getStorageSync('userInfo').role == 3){
					this.userInfo.role = 3
					this.page = 1
					this.placeholder = '合作社列表'
					this.huoquCoops()
					if(uni.getStorageSync('userInfo').role == 3){
						this.cyWidth = false
					}
				}
			},
			//切换列表
			hrole(item,e){
				if(e == 4){
					this.street_id = item.id
					this.page = 1
					this.placeholder = '合作社列表'
					this.huoquCoops()
					this.userInfo.role = 3
					this.cyWidth = true
				}else if(e == 3){
					this.coop_id = item.id
					this.page = 1
					this.placeholder = '成员列表'
					this.huoquMembers()
					this.userInfo.role = 2
					this.cyWidth = true
				}
			},
			//跳转成员详情
			toDet(e) {
				uni.navigateTo({
					url: '../my/infoDet?uid=' + e.id
				})
			},
			//获取公告列表
			getNotice() {
				this.api.notice({

				}, res => {
					if (res.code == 200) {
						this.noticeList = res.data
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}
				})
			},
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
			},

			// 获取公告
			huoquNotice() {
				this.api.notice({}, res => {
					this.notice = res.data
				})
			},

			// 获取成员数据
			huoquMembers() {
				var melist = this.page == 1 ? [] : this.melist
				this.api.members({
					coop_id:this.userInfo.role == 4 || this.userInfo.role == 3?this.coop_id:this.userInfo.cooperative_id,
					street_id:this.userInfo.role == 4?this.street_id:this.userInfo.street_id,
					// coop_id: uni.getStorageSync('userInfo').cooperative_id, //合作社ID
					// street_id: uni.getStorageSync('userInfo').street_id, //街道ID
					page: this.page,
					limit: 10,
					keywords: ''
				}, res => {
					this.melist = melist.concat(res.data)
				})
			},

			// 获取合作社
			huoquCoops() {
				this.api.getCoops({
					street_id: uni.getStorageSync('userInfo').street_id
				}, res => {
					this.melist = res.data
				})
			},

			// 获取街道
			huoquStreets() {
				this.api.getStreets({}, res => {
					this.melist = res.data
				})
			},

			// 页面跳转
			toPage(url) {
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>
	.topflex{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 620rpx;
		margin: auto;
		margin-bottom: 46rpx;
		border-bottom: 1rpx solid #E6E6E6;
	}
	.cyback{
		width: 45rpx;
		height: 45rpx;
		margin-right: 20rpx;
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
		height: 30rpx;
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
