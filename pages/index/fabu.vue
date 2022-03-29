<template>
	<view class="box">
		<view class="blank">
			<view>合作社共有</view>
			<input type="number" />
			<view>股民，本人今年包联</view>
			<input type="number" />
			<view>户，目前已走访</view>
			<input type="number" />
			<view>户，今日走访</view>
			<input type="number" />
			<view>户</view>
		</view>
		<textarea class="textarea" placeholder="请输入要发布的内容..." placeholder-style="color: #eaeaea;" auto-height="true" maxlength=-1></textarea>
		<view class="picebox">
			<view class="uppice" v-for="(item,index) in picelist" :key='index'>
				<view class="pice">
					<image :src="item"></image>
				</view>
				<view class="delpice" @click="del(index)">
					<image src="../../static/image/deleat.png"></image>
				</view>
			</view>
			<view class="addpice" @click="getimg()">
				<image src="../../static/image/addpice.png"></image>
			</view>
		</view>
		<view class="btnbox">
			<view class="qbtn">取消发布</view>
			<view class="jbtn">立即发布</view>
		</view>
		<view class="tsshbox" v-if="false">
			<view class="tsbox">
				<view class="tscon">请检查您要发布的信息，确认无误后点击确认发布按钮上传信息</view>
				<view class="tsbtn">
					<view class="tsbtnleft">取消发布</view>
					<view class="tsbtnright">确认发布</view>
				</view>
			</view>
		</view>
		<view class="tsshbox" v-if="false">
			<view class="tsbox">
				<view class="fbfont">发布成功</view>
				<view class="fbback">返回</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				picelist:[]
			}
		},
		methods:{
			// 删除图片
			del(e){
				this.picelist.splice(e,1)
			},
			// 拍摄,选取图片图片
			getimg(){
				let that = this
				uni.chooseImage({
						count: 6,           // 最多可以选择的图片张数，默认9
						sizeType: ['original', 'compressed'],              //original 原图，compressed 压缩图，默认二者都有
						sourceType: ['album', 'camera'],             //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
						success: function (res) {
						if(res.tempFilePaths.length > 0){
							for(let i in res.tempFilePaths){
								that.picelist.push(res.tempFilePaths[i])
							}
						}
						}
				});
			}
		}
	}
</script>

<style>
	.blank view{
		color: #969696;
		font-size: 26rpx;
		margin-bottom: 20rpx;
	}
	.blank input{
		width: 200rpx;
		border: 1rpx solid #e6e6e6;
		border-radius: 5rpx;
		text-align: center;
		margin: 0 10rpx 20rpx 10rpx;
	}
	.blank{
		width: 680rpx;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		margin: auto;
	}
	.fbback{
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
	.fbfont{
		color: #ff4646;
		font-size: 54rpx;
		font-weight: bold;
		text-align: center;
		margin-bottom: 85rpx;
	}
	.tsbtnright{
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
	.tsbtnleft{
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
	.tsbtn{
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.tscon{
		width: 541rpx;
		line-height: 54rpx;
		color: #646464;
		font-size: 34rpx;
		text-align: center;
		margin: auto;
		margin-bottom: 70rpx;
	}
	.tsbox{
		width: 681rpx;
		height: 409rpx;
		border-radius: 20rpx;
		background-color: #fff;
		padding-top: 90rpx;
		box-sizing: border-box;
		margin: auto;
		margin-top: 58%;
	}
	.tsshbox{
		width: 750rpx;
		height: 100%;
		margin: auto;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0,0,0,.3);
	}
	.jbtn{
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
	.qbtn{
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
	.btnbox{
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
	.delpice image{
		width: 211rpx;
		height: 43rpx;
	}
	.delpice{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 211rpx;
		height: 43rpx;
	}
	.pice image{
		width: 211rpx;
		height: 211rpx;
		border-radius: 20rpx;
	}
	.uppice{
		width: 211rpx;
		height: 211rpx;
		position: relative;
		border-radius: 20rpx;
		margin-right: 30rpx;
		margin-bottom: 20rpx;
	}
	.addpice image{
		width: 211rpx;
		height: 211rpx;
	}
	.picebox{
		width: 720rpx;
		margin: auto;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	.textarea{
		min-height: 186rpx;
		width: 680rpx;
		margin: auto;
	}
	.box{
		padding-top: 65rpx;
	}
</style>
