import {
	Base
} from './base.js';
let urlList = {
	setMobile: 'Index/setMobile', // 获取手机号
}
class Api extends Base {
	setMobile(param, callback) {
		var param = {
			url: urlList.setMobile,
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
