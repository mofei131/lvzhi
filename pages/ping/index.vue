<template>
	<view class="box">
		<view class="toptitle" :style="{height:height+35+'px'}">
			<image src="../../static/image/back.png" mode="" @click="back" v-if="showBack"></image>
			<!-- <view>评一评</view> -->
		</view>
		<topimg class="topimg"></topimg>
		<view class="listf" v-for="(item,index) in showList" :key="index" @click="topage(item)">
			<view v-if="role == 4">{{item.street_name}}</view>
			<view v-if="role == 3">{{item.cooperative_name}}</view>
			<view v-if="role == 2 || role == 1 || role == 5">{{item.title}}</view>
			<image src="../../static/image/righticon.png"></image>
		</view>
		<view class="tologin" v-if="login" @click="tologin"></view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[{
					id:-1,
					title:'合作社评价'
				},{
					id:-2,
					title:'包靠干部评价'
				},{
					id:-3,
					title:'成员评价'
				}],
				login:false,
				role:'',//角色字段
				cooperativeList:[],//合作社列表
				showList:[],//展示列表
				coop_id:'',//合作社id
				street_id:'',//街道id
				toping:false,//直接去成员评价
				height:'',
				showBack:false
			}
		},
		onLoad(p) {
			let that = this
			uni.getSystemInfo({
					success:function(data){
							// 将其赋值给this
							that.height=data.statusBarHeight;
					}
			})
			//角色字段赋值
			this.role = uni.getStorageSync('userInfo').role
			this.showlist()
		},
		onShow() {
			//判断是否已经登录
			if(!uni.getStorageSync('userInfo')){
				this.login = true
			}else{
				this.login = false
			}
		},
		methods:{
			back(){
				if(uni.getStorageSync('userInfo').role == 4 || uni.getStorageSync('userInfo').role == 3){
					if(this.role == 2){
						if(uni.getStorageSync('userInfo').role == 3){
							this.role++
							this.showList = uni.getStorageSync('cooperativeList')
							this.showBack = false
							return
						}
						this.showBack = true
						this.showList = uni.getStorageSync('cooperativeList')
						this.role++
					}else if(this.role == 3){
						this.showBack = false
						this.showList = uni.getStorageSync('streetList')
						this.role++
					}
				}
			},
			// 判断角色赋值第一次显示列表
			showlist(){
				if(this.role == 4){
					this.$store.state.role = 3
					this.showList = uni.getStorageSync('streetList')
				}else if(this.role == 3){
					this.showList = uni.getStorageSync('cooperativeList')
				}else if(this.role == 2){
						this.list.splice(this.list.findIndex(item => item.id == -2), 1)
						this.list.splice(this.list.findIndex(item => item.id == -3), 1)
						this.showList = this.list
						this.toping = true
					}else if(this.role == 5){
						this.list.splice(this.list.findIndex(item => item.id == -1), 1)
						this.list.splice(this.list.findIndex(item => item.id == -3), 1)
						this.showList = this.list
						this.toping = true
						console.log(this.showList)
					}else if(this.role == 1){
						this.list.splice(this.list.findIndex(item => item.id == -1), 1)
						this.list.splice(this.list.findIndex(item => item.id == -2), 1)
						this.showList = this.list
						this.showList[this.showList.findIndex(item => item.id == -3)].title = '我的评价'
						this.toping = true
					}
					// let code = this.role == 1?-3:this.role == 2?-1:-2
					// console.log(code)
					// uni.reLaunch({
					// 	url:'./ping?coop_id='+uni.getStorageSync('userInfo').cooperative_id+'&type='+code+'&part=1'
					// })
				// }
			},
			//去看评价或进下一级
			topage(e){
				//角色为组织部时
				if(this.role == 4){
					this.street_id = e.id
					this.api.getCoops({
						street_id: e.id
					}, res => {
						this.showList = res.data
					})
					this.role = 3
					//角色为街道时
				}else if(this.role == 3){
					this.coop_id = e.id
					this.showList = this.list
					this.role = 2
				}else if(this.role == 2 || this.role == 1 || this.role == 5){
					if(this.toping){
						if(this.role == 1){
							let code = this.role == 1?-3:this.role == 2?-1:-2
							console.log(code)
							uni.reLaunch({
								url:'./ping?coop_id='+uni.getStorageSync('userInfo').cooperative_id+'&type='+code+'&part=1'
							})
						}else{
							let code = this.role == 1?-3:this.role == 2?-1:-2
							console.log(code)
							uni.reLaunch({
								url:'./ping?coop_id='+uni.getStorageSync('userInfo').cooperative_id+'&type='+code+'&part=0'
							})
						}
						return
					}
					if(e.id == -3){
						uni.navigateTo({
							url:'meList?coop_id='+this.coop_id+'&street_id='+this.street_id
						})
					}else{
						uni.navigateTo({
							url:'./ping?coop_id='+this.coop_id+'&type='+e.id+'&part=0'
						})
					}
				}
				if(uni.getStorageSync('userInfo').role == 4 || uni.getStorageSync('userInfo').role == 3){
					if(this.role == 3 || this.role == 2){
						this.showBack = true
					}
				}
			},
			tologin(){
				if(!uni.getStorageSync('userInfo')){
					uni.showModal({
						title: '提示',
						content: '您还没有登录，请先登录',
						confirmText:'去登录',
						success: function (res) {
							if (res.confirm) {
								uni.switchTab({
									url:'../my/index'
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			}
		}
	}
</script>

<style>
	.toptitle image{
		width: 40rpx;
		height: 40rpx;
	}
	.toptitle{
		width: 750rpx;
		margin: auto;
		margin-bottom: 20rpx;
		display: flex;
		align-items: flex-end;
		padding-left: 10rpx;
		box-sizing: border-box;
	}
	.tologin{
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 99;
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
		margin-top: 50rpx;
		padding: 0 37rpx 0 41rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-radius: 20rpx;
	}
	.topimg{
		margin-bottom: 49rpx;
	}
</style>
