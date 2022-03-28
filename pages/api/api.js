import {
	Base
} from './base.js';
let urlList = {
	banner:'index/banner'
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
}

export{
	Api
};
