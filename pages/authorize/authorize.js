// pages/index/index.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 生命周期函数--监听页面加载 
   */
  onLoad: function (options) {
    console.log(options);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  bindGetUserInfo(userRes) {
    let encryptedData = userRes.detail.encryptedData;
    let iv=userRes.detail.iv;
      wx.login({
        success:function(e){
          //获取code
          let code=e.code;
          //授权获取验证
          wx.request({
            url: app.requesturl +'payUser/authorize',
            data:{
                code: code,
                encryptedData:encryptedData,
                iv:iv
              },
              header: {
                "Content-Type": "application/json"
              },
              method: 'POST',
              success:function(res){
                if(res.statusCode==200&&res.data.code==100){
                  wx.setStorage({
                    key: 'openid',
                    data: res.data.data.openId,
                  })
                  wx.setStorage({
                    key: 'loginstate',
                    data: true,
                  })
                  // console.log(app.globalData.logintogo)
                  // wx.redirectTo({
                  //   url: app.globalData.logintogo,
                  // })
                  wx.navigateBack({
                    delta: -1
                  });
                } else if (res.data.code != 100){
                  wx.showModal({
                    content: res.data.code + res.data.msg,
                    showCancel: false,
                    success(res) {
                      if (res.confirm) {
                        wx.switchTab({
                          url: "/pages/infor/infor",
                        })
                      }
                    }
                  })
                }
              },
              fail:function(res){
                wx.showToast({
                  title: '接口异常',
                })
              }
          })
        }
      })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})