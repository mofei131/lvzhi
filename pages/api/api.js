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
	JudgeCoop: 'Judge/coop', //合作社评价
	JudgeList: 'Judge/list', //成员评价
	promiseAdd: 'Promise/add', //发布承诺
	LvzhiCoop: 'Lvzhi/coop', //合作社履职
	LvzhiList: 'Lvzhi/list', //合作社成员履职
	LvzhiAdd: 'Lvzhi/add', //添加履职
	ShaiList: 'Shai/list', //晒连户
	ShaiAdd: 'Shai/add', //晒连户 发布
	PromiseMyList: 'Promise/myList', //我的承诺
	getUserInfo:'index/getUserInfo',//查看用户详情
	indexSetting:'index/setting',//关于我们
	ShaiMyList: 'Shai/myList', //我的晒连户
	ShaiDel: 'Shai/del', //删除晒连户
	indexAuth: 'index/auth', //小程序是否审核
}
class Api extends Base {
	indexSetting(param, callback) {
		var param = {
			url: urlList.indexSetting,
			type: "get",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	getUserInfo(param, callback) {
		var param = {
			url: urlList.getUserInfo,
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

	promiseAdd(param, callback) {
		var param = {
			url: urlList.promiseAdd,
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

	LvzhiCoop(param, callback) {
		var param = {
			url: urlList.LvzhiCoop,
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

	LvzhiList(param, callback) {
		var param = {
			url: urlList.LvzhiList,
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}

	LvzhiAdd(param, callback) {
		var param = {
			url: urlList.LvzhiAdd,
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	
	ShaiList(param, callback) {
		var param = {
			url: urlList.ShaiList,
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	
	ShaiAdd(param, callback) {
		var param = {
			url: urlList.ShaiAdd,
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	
	PromiseMyList(param, callback) {
		var param = {
			url: urlList.PromiseMyList,
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	
	ShaiMyList(param, callback) {
		var param = {
			url: urlList.ShaiMyList,
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	
	ShaiDel(param, callback) {
		var param = {
			url: urlList.ShaiDel,
			type: "post",
			data: param,
			sCallback: function(data) {
				callback && callback(data);
			}
		};
		this.request(param);
	}
	
	indexAuth(param, callback) {
		var param = {
			url: urlList.indexAuth,
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
