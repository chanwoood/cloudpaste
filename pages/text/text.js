var app = getApp()
Page({
  data: {
    "hidden": true,
    "text": "",
    "link": "",
    "newLink": ""
  },
  onLoad: function (options) {
    var _this = this
    wx.getClipboardData({
      success: function (res) {
        _this.setData({ text: res.data, link: res.data })
      }
    })
  },
  onShow: function () {
  },

  listenInput: function (e) {
    this.setData({
      text: e.detail.value,
    })
  },

// 从 text 获取链接
  make: function () {
    var _this = this
    if (this.data.text=="") {
      wx.showToast({
        title: '输入不允许为空！',
        // image: "images/error.png",
        icon: "none",
        duration: 2000
      })
    } else {
      wx.request({
        url: 'https://nutz.cn/s/api/create/txt?title=undefined',
        data: this.data.text,
        header: {},
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
        success: function (res) {
          var temp = "https://nutz.cn/s/c/" + res.data.code
          _this.setData({ link: temp })
          // 转换为短链接
          app.getShortLink(_this.data.link, function (data) {
            if (data === false) _this.setData({ hidden: true })
            else {
              _this.setData({ hidden: false })
              _this.setData({ newLink: data.data.urls[0].url_short })
            }
          })
        },
        fail: function (res) { },
        complete: function (res) { },
      })
    }
  },

  copy: function () {
    wx: wx.setClipboardData({
      data: this.data.newLink,
      success: function (res) {
        wx.showToast({
          title: '已复制短链接',
          icon: "success",
          duration: 2000
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  clear: function () {
    this.setData({ text: "", hidden: true, link: "" })
  }  
})