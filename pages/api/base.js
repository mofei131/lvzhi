class Base {

  constructor() {
    this.baseRestUrl = 'https://lvzhi.boyaokj.cn/api/';
  }

  request(params, auth = true) {
    var that = this;
    var url = this.baseRestUrl + params.url;
    let file = params.file; // 是否为上传
    var loading = params.loading == "hide" ? "hide" : "show";
    if (!params.type) {
      params.type = 'get';
    }
    
    /*不需要再次组装地址*/
    if (params.setUpUrl == false) {
      url = params.url;
    }
    if (file === undefined) {
      wx.request({
        url: url,
        data: params.data,
        method: params.type,
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var code = res.statusCode.toString();
          var startChar = code.charAt(0);
          if (startChar == '2') {
            params.sCallback && params.sCallback(res.data);
          } else {
            that._processError(res);
            params.eCallback && params.eCallback(res.data);
          }
        },
        complete: function (res) {
          // loading == "show" ? wx.hideLoading() : false;
        },
        fail: function (err) {
          that._processError(err);
        }
      });
    }
 
    // 发起上传
  if (file) {
    return new Promise(function (resolve, reject) {
      wx.uploadFile({
        url: url,
        header: {"Content-Type": "multipart/form-data" },
        name: 'file',
        filePath: file,
        formData: data,
        success: function(res) {
          resolve(JSON.parse(res.data));
          loading == "show" ? wx.hideLoading() : false;
        },
        fail: function (err) {
          loading == "show" ? wx.hideLoading() : false;
          reject(err);
        }
      })
    });
  }
  }
 
  // 打印错误信息
  _processError(err) {
    console.log(err);
  }
};

export { Base };
