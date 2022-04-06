//引用Vuex
import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../pages/api/api.js'
Vue.use(Vuex)

//实例store对象
const store = new Vuex.Store({
	state: {
		bannerlist:[],//轮播列表
		slz:'',
		slh:'',
		scn:''
	},
	mutations: {
	}
})
export default store