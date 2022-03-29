<template>
	<view class="box">
		<topimg class="topimg"></topimg>
		<view class="listf" v-for="(item,index) in showList" :key="index" @click="topage(item)">
			<view v-if="role == 4">{{item.street_name}}</view>
			<view v-if="role == 3">{{item.cooperative_name}}</view>
			<view v-if="role == 2">{{item.title}}</view>
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
			}
		},
		onShow() {
			//角色字段赋值
			this.role = uni.getStorageSync('userInfo').role
			//判断是否已经登录
			if(!uni.getStorageSync('userInfo')){
				this.login = true
			}else{
				this.login = false
			}
			this.showlist()
		},
		methods:{
			// 判断角色赋值第一次显示列表
			showlist(){
				if(this.role == 4){
					this.showList = uni.getStorageSync('streetList')
				}else if(this.role == 3){
					this.showList = uni.getStorageSync('cooperativeList')
				}else{
					let code = this.role == 1?-3:this.role == 2?-1:-2
					console.log(code)
					uni.reLaunch({
						url:'./ping?coop_id='+uni.getStorageSync('userInfo').cooperative_id+'&type='+code+'&part=1'
					})
				}
			},
			//去看评价或进下一级
			topage(e){
				//角色为组织部时
				if(this.role == 4){
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
				}else if(this.role == 2){
					if(e.id == -3){
						uni.navigateTo({
							url:'meList?coop_id='+this.coop_id
						})
					}else{
						uni.navigateTo({
							url:'./ping?coop_id='+this.coop_id+'&type='+e.id+'&part=0'
						})
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
