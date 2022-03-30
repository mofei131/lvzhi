import {
	Base
} from './base.js';
let urlList = {
	login: 'index/login', //授权登录
	getStreets: 'index/getStreets', // 获取街道
	getCoops: 'index/getCoops', // 获取合作社
	updateUser: 'index/updateUser', // 初次登录 更新用户信息
	banner: 'index/banner', // 获取轮播
	members: 'index/members', // 成员列表
	notice: 'index/notice', // 公告
	promiseCoop: 'Promise/coop', //合作社承诺
	coopInfo: 'index/coopInfo', //合作社详情
	promiseList: 'Promise/list', //合作社成员
	JudgeCoop:'Judge/coop',//合作社评价
	JudgeList:'Judge/list',//成员评价
}
class Api extends Base {
	notice(param, callback) {
		var param = {
			url: urlList.notice,
			type: "get",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	JudgeList(param, callback) {
		var param = {
			url: urlList.JudgeList,
			type: "get",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	JudgeCoop(param, callback) {
		var param = {
			url: urlList.JudgeCoop,
			type: "get",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
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
	
	members(param, callback) {
		var param = {
			url: urlList.members,
			type: "get",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	
	notice(param, callback) {
		var param = {
			url: urlList.notice,
			type: "get",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	
	promiseCoop(param, callback) {
		var param = {
			url: urlList.promiseCoop,
			type: "get",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	
	coopInfo(param, callback) {
		var param = {
			url: urlList.coopInfo,
			type: "get",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	
	promiseList(param, callback) {
		var param = {
			url: urlList.promiseList,
			type: "get",
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
