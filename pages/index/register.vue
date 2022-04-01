<template>
	<view class="box">
		<view class="infoul">
			<view class="infoli">
				<view class="inlileft">
					<view>姓名</view>
				</view>
				<view class="inliright">
					<input type="text" placeholder="请输入姓名" v-model="info.name" />
				</view>
			</view>
			<view class="infoli">
				<view class="inlileft">
					<view>职务</view>
				</view>
				<view class="inliright">
					<input type="text" placeholder="请输入职务" v-model="info.post" />
				</view>
			</view>
			<view class="infoli">
				<view class="inlileft">
					<view>所属社区</view>
				</view>
				<view class="inliright">
					<picker mode="multiSelector" class="picker" @change="bindPickerChange"
						@columnchange="bindPickerChange2" :value="array_index" :range="array">
						<view class="uni-input">
							{{array_index==null?'请选择街道社区':array[0][array_index] + ' ' +array[1][array_index2]}}
						</view>
					</picker>
				</view>
			</view>
			<view class="infoli">
				<view class="inlileft">
					<view>性别</view>
				</view>
				<view class="inliright">
					<picker class="picker" @change="bindPickerSex" :value="sex_index" :range="sex">
						<view class="uni-input">
							{{sex_index==null?'请选择性别':sex[sex_index]}}
						</view>
					</picker>
				</view>
			</view>
			<view class="infoli">
				<view class="inlileft">
					<view>年龄</view>
				</view>
				<view class="inliright">
					<input maxlength="2" type="number" placeholder="请输入年龄" v-model="info.age" />
				</view>
			</view>
			<view class="infoli">
				<view class="inlileft">
					<view>联系方式</view>
				</view>
				<view class="inliright">
					<input type="number" maxlength="11" placeholder="请输入联系方式" v-model="info.mobile" />
				</view>
			</view>
		</view>
		<view class="btnbox">
			<view class="jbtn" @click="upbtn">提交</view>
		</view>

		<!-- 获取用户信息 -->
		<view class="content-mark" v-if="authorize"></view>
		<view class="content-i" v-if="authorize">
			<view class="get-user">
				<view class="get-user-i">
					<image src="../../static/image/logo.png" mode="aspectFit"></image>
					<view class="get-user-t">奎文区合作社“我履职、我行动”管理系统<span>申请</span></view>
				</view>
				<image src="" mode="aspectFit"></image>
			</view>
			<view class="get-user-info">获取您的用户信息</view>
			<view class="get-user-b">
				<view class="get-user-b-j" @click="noGetUser">拒绝</view>
				<view class="get-user-b-t" @click="getUserProfile">同意</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					name: '',
					post: '',
					age: '',
					belong: '',
					mobile: '',
				},
				array: [
					[],
					[]
				],
				arrayList: [],
				arrayList2: [],
				array_index: null,
				array_index2: null,
				sex: ['男', '女'],
				sex_index: null,

				authorize: false
			}
		},

		onShow() {
			this.huoquJiedao()
		},

		methods: {
			// 获取街道
			huoquJiedao() {
				this.api.getStreets({}, res => {
					for (var i in res.data) {
						this.array[0].push(res.data[i].street_name)
					}
					this.arrayList = res.data
					this.huoquHezuoshe(res.data[0].id)
					uni.setStorageSync('streetList',res.data)
				})
			},
			bindPickerChange2(e) {
				if (e.detail.column == 0) {
					this.array[1] = []
					this.huoquHezuoshe(this.arrayList[e.detail.value].id)
				}
			},
			// 获取合作社
			huoquHezuoshe(id) {
				this.api.getCoops({
					street_id: id
				}, res => {
					var data = []
					for (var i in res.data) {
						data.push(res.data[i].cooperative_name)
					}
					this.$set(this.array, 1, data)
					this.arrayList2 = res.data
					uni.setStorageSync('cooperativeList',res.data)
				})
			},
			bindPickerChange(e) {
				this.array_index = e.target.value[0]
				this.array_index2 = e.target.value[1]
			},
			// 选择性别
			bindPickerSex(e) {
				this.sex_index = e.target.value
			},
			// 提交注册
			upbtn() {
				if (!this.info.name) {
					uni.showToast({
						title: '请输入姓名',
						icon: 'none'
					})
					return
				}
				if (!this.info.post) {
					uni.showToast({
						title: '请输入职务',
						icon: 'none'
					})
					return
				}
				if (this.sex_index == null) {
					uni.showToast({
						title: '请选择性别',
						icon: 'none'
					})
					return
				}
				if (!this.info.age) {
					uni.showToast({
						title: '请输入年龄',
						icon: 'none'
					})
					return
				}
				if (!this.info.mobile || this.info.mobile.length != 11) {
					uni.showToast({
						title: '请输入正确的手机号',
						icon: 'none'
					})
					return
				}
				if (!uni.getStorageSync('userInfo')) {
					this.getCode()
					this.authorize = true
					return
				}
			},

			// 授权登录
			// 拒绝
			noGetUser() {
				this.authorize = false
			},
			getCode() {
				var that = this
				uni.login({
					success: function(res) {
						that.api.login({
							code: res.code
						}, res => {})
					}
				})
			},
			getUserProfile() {
				var code = ''
				uni.login({
					success: function(res) {
						code = res.code
					}
				})
				uni.getUserProfile({
					desc: '展示用户信息',
					success: (res) => {
						console.log(res)
						this.api.updateUser({
							nickname: res.userInfo.nickName,
							code: code,
							avater: res.userInfo.avatarUrl,
							realname: this.info.name,
							post: this.info.post,
							street_id: this.arrayList[this.array_index].id,
							coop_id: this.arrayList2[this.array_index2].id,
							sex: Number(this.sex_index) + 1, //1男 2女
							age: this.info.age,
							mobile: this.info.mobile,
						}, res => {
							if (res.code == 200) {
								uni.setStorageSync('userInfo', res.data)
								uni.showToast({
									title: '注册成功！',
									icon: 'none'
								})
								setTimeout(() => {
									uni.switchTab({
										url: './index'
									})
								}, 1000)
							} else if (res.code == -1) {
								uni.showToast({
									title: res.message,
									icon: 'none'
								})
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
	.uni-input {
		color: #646464;
		font-size: 32rpx;
		width: 100%;
	}

	.jbtn {
		width: 261rpx;
		height: 91rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		font-size: 34rpx;
		font-weight: bold;
		background-color: #ff4646;
	}

	.qbtn {
		width: 261rpx;
		height: 91rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ff4646;
		font-size: 34rpx;
		font-weight: bold;
		background-color: #FADCDC;
	}

	.btnbox {
		height: 140rpx;
		width: 750rpx;
		margin: auto;
		padding-bottom: 50rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.picker {
		width: 497rpx;
		height: 72rpx;
		border-radius: 20rpx;
		color: #646464;
		border: 1rpx solid #464646;
		padding: 0 28rpx 0 28rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.inliright input {
		width: 497rpx;
		height: 72rpx;
		border-radius: 20rpx;
		color: #646464;
		border: 1rpx solid #464646;
		padding: 0 28rpx 0 28rpx;
		box-sizing: border-box;
	}

	.inlileft view {
		width: 160rpx;
		color: #646464;
		font-size: 32rpx;
		font-weight: bold;
	}

	.infoli {
		display: flex;
		margin-bottom: 38rpx;
		align-items: center;
		justify-content: space-between;
	}

	.infoul {
		width: 680rpx;
		margin: auto;
	}

	.box {
		padding-top: 20rpx;
		padding-bottom: 200rpx;
	}

	.content-mark {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1000;
	}

	.content-i {
		position: fixed;
		z-index: 1200;
		bottom: 0rpx;
		width: 100%;
		height: 355rpx;
		background: #FFFFFF;
		border-radius: 16rpx 16rpx 0rpx 0rpx;
	}

	.get-user {
		display: flex;
		justify-content: space-between;
		padding: 24rpx 0rpx;
		border-bottom: 1rpx solid #eee;
		margin: 0 24rpx;
	}

	.get-user image {
		width: 39.23rpx;
		height: 39.23rpx;
	}

	.get-user-i {
		display: flex;
		align-items: center;
	}

	.get-user-i image {
		width: 48rpx;
		height: 48rpx;
		border: 1rpx solid #eee;
		margin-right: 16rpx;
	}

	.get-user-t {
		font-size: 30rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: bold;
		color: #333333;
		letter-spacing: 2rpx;
	}

	.get-user-t span {
		font-size: 30rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-left: 4rpx;
		letter-spacing: 0rpx;
	}

	.get-user-info {
		padding: 24rpx;
		font-size: 36rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #333333;
	}

	.get-user-b {
		display: flex;
		align-items: center;
		margin: 0rpx 25rpx;
		padding: 40rpx 0rpx;
		justify-content: space-between;
	}

	.get-user-b-j {
		width: 300rpx;
		height: 71rpx;
		border-radius: 36rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 45rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #FFFFFF;
		border: 2rpx solid #E5E5E5;
	}

	.get-user-b-t {
		width: 300rpx;
		height: 71rpx;
		background: red;
		border-radius: 36rpx;
		font-size: 32rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 45rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
