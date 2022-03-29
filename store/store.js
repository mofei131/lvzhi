//引用Vuex
import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../pages/api/api.js'
Vue.use(Vuex)

//实例store对象
const store = new Vuex.Store({
	state: {
		bannerlist:[],
		cou:1
	},
	mutations: {
		get(){
			console.log(123)
		}
	}
})
export default store