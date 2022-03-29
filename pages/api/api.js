import {
	Base
} from './base.js';
let urlList = {
	login: 'index/login', //授权登录
	getStreets: 'index/getStreets', // 获取街道
	getCoops: 'index/getCoops', // 获取合作社
	updateUser: 'index/updateUser', // 初次登录 更新用户信息
	banner: 'index/banner'
}
class Api extends Base {
	banner(param, callback) {
		var param = {
			url: urlList.banner,
			type: "get",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	
	login(param, callback) {
		var param = {
			url: urlList.login,
			type: "get",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

	getStreets(param, callback) {
		var param = {
			url: urlList.getStreets,
			type: "get",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

	getCoops(param, callback) {
		var param = {
			url: urlList.getCoops,
			type: "get",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

	updateUser(param, callback) {
		var param = {
			url: urlList.updateUser,
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
}

export {
	Api
};
