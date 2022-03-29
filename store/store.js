//引用Vuex
import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../pages/api/api.js'
Vue.use(Vuex)

//实例store对象
const store = new Vuex.Store({
	state: {
		bannerlist:[],//轮播列表
		cooperativeList:'',//合作社列表
		street_id:'',//街道列表
	},
	mutations: {
	}
})
export default store