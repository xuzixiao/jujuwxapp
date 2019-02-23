// pages/mine/mine.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{
      avatarUrl:"",
      nickName:""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取openid
    let that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
      },
      fail:function(){
        wx.navigateTo({
          url: '/pages/authorize/authorize',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { 

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        var userInfo=res.data;
        that.setData({
          'userinfo.avatarUrl': userInfo.avatarUrl,
          'userinfo.nickName': userInfo.nickName
        })
      },
      fail:function(){
        wx.navigateTo({
          url: '/pages/authorize/authorize',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  // //获取用户信息
  // getuserInfo: function (openId) {
  //   let that = this;
  //   wx.request({
  //     url: app.requesturl + 'payUser/detail?openId=' + openId,
  //     header: {
  //       "Content-Type": "application/json"
  //     },
  //     method: 'POST',
  //     data: {
  //       openId: openId
  //     },
  //     success: function (res) {
  //       if (res.data.code == "100") {
  //         console.log(res);
  //         let userdata = res.data.data;
  //         that.setData({
  //           "userinfo.avatarUrl": userdata.avatarUrl,
  //           "userinfo.nickName": userdata.nickName
  //         })
  //         app.globalData.userInfo=res.data.data;
  //       } else {
  //         wx.showModal({
  //           content: res.data.msg,
  //         })
  //       }
  //       //console.log(res)
  //     },
  //     fail: function (res) {
  //       wx.showToast({
  //         title: '接口异常',
  //       })
  //     },
  //     complete: function () {

  //     }
  //   })
  // },
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