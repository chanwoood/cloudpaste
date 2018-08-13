Page({
  data: {
  
  },
  onShow: function () {

  },
  upLoad: function () {
    wx: wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://cowtransfer.com/transfer/preparesend',
          filePath: tempFilePaths[0],
          header: {
            "content-type": "multipart/form-data"
            },
          name: 'file',
          formData: {
            // 'user': 'test'
          },
          success: function (res) {
            console.log(res)
            wx.uploadFile({
              url: 'https://upload.qiniup.com/',
              filePath: tempFilePaths[0],
              header: {
                "content-type": "multipart/form-data"
              },
              name: 'file',
              formData: {
                'token': "rkrC3sADAVnBtSQ_YTQgxi-3TEVapbu6rxmtmg0v:F6X9qaMQV_dUICZZ6XwwGdyym2I=:eyJzY29wZSI6ImNmdHJhbnNmZXIiLCJkZWFkbGluZSI6MTUzNDA3ODcxMH0="

              },
              success: function (res) {
                console.log("-----------")
                console.log(res)
                console.log("-----------")
              }
            })
          }
        })
        
      }
    })
  }
})