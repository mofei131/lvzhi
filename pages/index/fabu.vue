<template>
	<view class="box">
		<view class="blank" v-if="type == 'shailianhu'">
			<view>合作社共有</view>
			<input type="number" v-model="total" />
			<view>股民，本人今年包联</view>
			<input type="number" v-model="baolian" />
			<view>户，目前已走访</view>
			<input type="number" v-model="total_zoufang" />
			<view>户，今日走访</view>
			<input type="number" v-model="today_zoufang" />
			<view>户</view>
		</view>
		<textarea class="textarea" placeholder="请输入要发布的内容..." auto-height="true" maxlength=-1
			v-model="intro"></textarea>
		<view class="picebox" v-if="type == 'shailvzhi' || type == 'shailianhu'">
			<view class="uppice" v-for="(item,index) in picelist" :key='index'>
				<view class="pice">
					<image :src="item"></image>
				</view>
				<view class="delpice" @click="del(index)">
					<image src="../../static/image/deleat.png"></image>
				</view>
			</view>
			<view v-if="picelist.length < 9" class="addpice" @click="getimg()">
				<image src="../../static/image/addpice.png"></image>
			</view>
		</view>
		<view class="btnbox">
			<view class="qbtn" @click="quxiao">取消发布</view>
			<view class="jbtn" @click="queding">立即发布</view>
		</view>
		<view class="tsshbox" v-if="fabu_tc">
			<view class="tsbox">
				<view class="tscon">请检查您要发布的信息，确认无误后点击确认发布按钮上传信息</view>
				<view class="tsbtn">
					<view class="tsbtnleft" @click="fabu_tc=false;fabu_tc2=false">取消发布</view>
					<view class="tsbtnright" @click="fabu">确认发布</view>
				</view>
			</view>
		</view>
		<view class="tsshbox" v-if="fabu_tc2">
			<view class="tsbox">
				<view class="fbfont">发布成功</view>
				<view class="fbback" @click="quxiao">返回</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fabu_tc: false,
				fabu_tc2: false,

				picelist: [],
				intro: '',

				type: '',

				total: '',
				baolian: '',
				total_zoufang: '',
				today_zoufang: '',
			}
		},

		onLoad(e) {
			this.type = e.type
		},

		methods: {
			// 删除图片
			del(e) {
				this.picelist.splice(e, 1)
			},
			// 拍摄,选取图片图片
			getimg() {
				let that = this
				uni.chooseImage({
					count: 9, // 最多可以选择的图片张数，默认9
					sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
					sourceType: ['album', 'camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
					success: function(res) {
						var tempFilePaths = res.tempFilePaths
						if (tempFilePaths.length > 0) {
							for (var i = 0; i < tempFilePaths.length; i++) {
								uni.uploadFile({
									url: 'https://lvzhi.boyaokj.cn/api/index/upload',
									filePath: tempFilePaths[i],
									name: 'file',
									success: function(resImg) {
										var img = JSON.parse(resImg.data).data.url
										that.picelist.push(img)
									}
								})
							}
						}
					}
				});
			},

			quxiao() {
				uni.navigateBack({
					delta: 1
				})
			},

			queding() {
				if (this.type == 'shailianhu') {
					if (this.total == '') {
						uni.showToast({
							title: '请输入共有多少股民',
							icon: 'none'
						})
						return
					}
					if (this.baolian == '') {
						uni.showToast({
							title: '请输入包联多少',
							icon: 'none'
						})
						return
					}
					if (this.total_zoufang == '') {
						uni.showToast({
							title: '请输入目前已走访多少',
							icon: 'none'
						})
						return
					}
					if (this.today_zoufang == '') {
						uni.showToast({
							title: '请输入今日已走访多少',
							icon: 'none'
						})
						return
					}
					this.fabu_tc = true
				} else {
					if (this.intro == '') {
						uni.showToast({
							title: '请输入要发布的内容',
							icon: 'none'
						})
					} else {
						this.fabu_tc = true
					}
				}
			},

			// 提交发布
			fabu() {
				if (this.type == 'shaichengnuo') {
					this.api.promiseAdd({
						uid: uni.getStorageSync('userInfo').id,
						intro: this.intro
					}, res => {
						if (res.code == 200) {
							this.fabu_tc = false
							this.fabu_tc2 = true
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none'
							})
						}
					})
				} else if (this.type == 'shailvzhi') {
					this.api.LvzhiAdd({
						uid: uni.getStorageSync('userInfo').id,
						intro: this.intro,
						pics: this.picelist.join('|')
					}, res => {
						if (res.code == 200) {
							this.fabu_tc = false
							this.fabu_tc2 = true
						}
					})
				} else if (this.type == 'shailianhu') {
					this.api.ShaiAdd({
						uid: uni.getStorageSync('userInfo').id,
						pics: this.picelist.join('|'),
						total: this.total,
						baolian: this.baolian,
						total_zoufang: this.total_zoufang,
						today_zoufang: this.today_zoufang,
						intro: this.intro
					}, res => {
						if (res.code == 200) {
							this.fabu_tc = false
							this.fabu_tc2 = true
						}
					})
				}
			}
		}
	}
</script>

<style>
	.blank view {
		color: #969696;
		font-size: 26rpx;
		margin-bottom: 20rpx;
	}

	.blank input {
		width: 200rpx;
		border: 1rpx solid #e6e6e6;
		border-radius: 5rpx;
		text-align: center;
		margin: 0 10rpx 20rpx 10rpx;
	}

	.blank {
		width: 680rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin: auto;
	}

	.fbback {
		width: 576rpx;
		height: 81rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ffffff;
		font-size: 39rpx;
		background-color: #FF4646;
		margin: auto;
	}

	.fbfont {
		color: #ff4646;
		font-size: 54rpx;
		font-weight: bold;
		text-align: center;
		margin-bottom: 85rpx;
	}

	.tsbtnright {
		width: 233rpx;
		height: 81rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		font-size: 39rpx;
		background-color: #ff4646;
		font-weight: bold;
	}

	.tsbtnleft {
		width: 233rpx;
		height: 81rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #ff4646;
		font-size: 39rpx;
		background-color: #FADCDC;
		font-weight: bold;
	}

	.tsbtn {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}

	.tscon {
		width: 541rpx;
		line-height: 54rpx;
		color: #646464;
		font-size: 34rpx;
		text-align: center;
		margin: auto;
		margin-bottom: 70rpx;
	}

	.tsbox {
		width: 681rpx;
		height: 409rpx;
		border-radius: 20rpx;
		background-color: #fff;
		padding-top: 90rpx;
		box-sizing: border-box;
		margin: auto;
		margin-top: 58%;
	}

	.tsshbox {
		width: 750rpx;
		height: 100%;
		margin: auto;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, .3);
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

	.delpice image {
		width: 211rpx;
		height: 43rpx;
	}

	.delpice {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 211rpx;
		height: 43rpx;
	}

	.pice image {
		width: 211rpx;
		height: 211rpx;
		border-radius: 20rpx;
	}

	.uppice {
		width: 211rpx;
		height: 211rpx;
		position: relative;
		border-radius: 20rpx;
		margin-right: 30rpx;
		margin-bottom: 20rpx;
	}

	.addpice image {
		width: 211rpx;
		height: 211rpx;
	}

	.picebox {
		width: 720rpx;
		margin: auto;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding-bottom: 190rpx;
	}

	.textarea {
		min-height: 186rpx;
		width: 680rpx;
		margin: auto;
	}

	.box {
		padding-top: 65rpx;
	}
</style>
