var app = getApp()

Page({
  data: {
    "link": "",
    "newLink": "",
    "hidden": true,
    "linkInput": ""
  },
  onLoad: function (options) {
    var _this = this
    wx.getClipboardData({
      success: function (res) {
        _this.setData({ linkInput: res.data, link: res.data })
      }
    })
  },
  onShow: function() {

  },

  input: function(e) {
    this.setData({ link:e.detail.value })
  },

  shorten: function() {
    var _this = this
    app.getShortLink(this.data.link, function(data) {
      if (data === false) _this.setData({ hidden: true })
      else {
        _this.setData({ hidden: false })
        _this.setData({ newLink: data.data.urls[0].url_short })
      }
    })
  },
  copy: function () {
    wx:wx.setClipboardData({
      data: this.data.newLink,
      success: function(res) {
        wx.showToast({
          title: '已复制短链接',
          icon: "success",
          duration: 2000
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  clear: function () {
    this.setData({ linkInput: "", hidden: true, link: ""})
  }  
})