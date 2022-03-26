<template>
	<view class="box">
			<picker class="listf" mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" fields='year'>
				<view class="flexbox">
				<view>选择年度</view>
				<view class="pickflex">
					<view class="uni-input">{{date}}</view>
					<image src="../../static/image/righticon.png"></image>
				</view>
				</view>
			</picker>
		<view class="listf" v-for="(item,index) in list" :key="index">
			<view>{{item.title}}</view>
			<image src="../../static/image/righticon.png"></image>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			const currentDate = this.getDate({
					format: true
			})
			return{
				list:[{
					title:'合作社承诺'
				},{
					title:'包靠干部承诺'
				},{
					title:'成员承诺'
				}],
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
		methods:{
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
			}
		}
	}
</script>

<style>
	.flexbox{
		display: flex;
		width: 600rpx;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}
	.pickflex image{
		margin-left: 20rpx;
	}
	.pickflex{
		display: flex;
		align-items: center;
	}
	.listf image{
		width: 19rpx;
		height: 34rpx;
	}
	.listf view{
		color: #646464;
		font-size: 34rpx;
		font-weight: bold;
	}
	.listf{
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
	.box{
		padding-top: 20rpx;
	}
</style>
