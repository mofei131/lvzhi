<template>
	<view class="box">
		<view class="infoul">
			<view class="infoli">
				<view class="inlileft">
					<view>姓名</view>
				</view>
				<view class="inliright">
					<input type="text" placeholder="请输入..." v-model="info.name" placeholder-style="color: #eaeaea;" />
				</view>
			</view>
			<view class="infoli">
				<view class="inlileft">
					<view>职务</view>
				</view>
				<view class="inliright">
					<input type="text" placeholder="请输入..." v-model="info.post" placeholder-style="color: #eaeaea;" />
				</view>
			</view>
			<view class="infoli">
				<view class="inlileft">
					<view>年龄</view>
				</view>
				<view class="inliright">
					<input type="number" placeholder="请输入..." v-model="info.age" placeholder-style="color: #eaeaea;" />
				</view>
			</view>
			<view class="infoli">
				<view class="inlileft">
					<view>性别</view>
				</view>
				<view class="inliright">
					<input type="text" placeholder="请输入..." v-model="info.age" placeholder-style="color: #eaeaea;" />
				</view>
			</view>
			<view class="infoli">
				<view class="inlileft">
					<view>所属合作社</view>
				</view>
				<view class="inliright">
					<!-- <input type="text" placeholder="请输入..." v-model="info.belong" placeholder-style="color: #eaeaea;" /> -->
					<picker class="picker" @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
				</view>
			</view>
			<view class="infoli">
				<view class="inlileft">
					<view>联系方式</view>
				</view>
				<view class="inliright">
					<input type="number" maxlength="11" placeholder="请输入..." v-model="info.mobile" placeholder-style="color: #eaeaea;" />
				</view>
			</view>
		</view>
		<view class="btnbox">
			<view class="qbtn">履职情况</view>
			<view class="jbtn">工作承诺</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				info:{
					name:'',
					post:'',
					age:'',
					sex:'',
					belong:'',
					mobile:'',
				},
				array: ['大虞合作社', '新城合作社', '大寨合作社', '大关合作社'],
				index: 0,
			}
		},
		methods:{
			bindPickerChange(e){
				this.index = e.target.value
			},
			upbtn(){
				if(!this.info.name){
					uni.showToast({
						title:'请输入姓名',
						icon:'none'
					})
					return
				}
				if(!this.info.post){
					uni.showToast({
						title:'请输入职务',
						icon:'none'
					})
					return
				}
				if(!this.info.age){
					uni.showToast({
						title:'请输入年龄',
						icon:'none'
					})
					return
				}
				if(!this.info.age){
					uni.showToast({
						title:'请输入性别',
						icon:'none'
					})
					return
				}
				if(!this.info.belong){
					uni.showToast({
						title:'请输入合作社',
						icon:'none'
					})
					return
				}
				if(!this.info.mobile){
					uni.showToast({
						title:'请输入联系方式',
						icon:'none'
					})
					return
				}
			}
		}
	}
</script>

<style>
	.uni-input{
		color: #646464;
		font-size: 32rpx;
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
	.picker{
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
	.inliright input{
		width: 497rpx;
		height: 72rpx;
		border-radius: 20rpx;
		color: #646464;
		border: 1rpx solid #464646;
		padding: 0 28rpx 0 28rpx;
		box-sizing: border-box;
	}
	.inlileft view{
		width: 160rpx;
		color: #646464;
		font-size: 32rpx;
		font-weight: bold;
	}
	.infoli{
		display: flex;
		margin-bottom: 38rpx;
		align-items: center;
		justify-content: space-between;
	}
	.infoul{
		width: 680rpx;
		margin: auto;
	}
	.box{
		padding-top: 20rpx;
		padding-bottom: 200rpx;
	}
</style>
