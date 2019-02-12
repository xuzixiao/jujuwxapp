// pages/activity/activity.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    activelist:[],
    pageNum:1,
    userlocaltion:{
      lat:"",
      log:""
    }, 
    xialaload:false,
    nothave:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openid: res.data
        })
      }
    })
    //位置信息
    wx.getStorage({
      key: 'latitude',
      success: function (res) {
        that.setData({
          'userlocaltion.lat': res.data
        })
      }
    })
    wx.getStorage({
      key: 'longitude',
      success: function (res) {
        that.setData({
          'userlocaltion.lon': res.data
        })
      }
    })
    that.getactivelist();
  },
  push:function(){
    wx.getStorage({
      key: 'loginstate',
      success: function (res) {//已经登录时
        wx.navigateTo({
          url: '/pages/pushactive/pushactive',
        })
      },
      fail: function (res) {//没有登录数据时
        wx.navigateTo({
          url: "/pages/authorize/authorize",
        })
        app.globalData.logintogo = "/pages/pushactive/pushactive"
      }
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getactivelist: function (type){
    var that=this;
    var data = {};
    if (type == undefined || type == "" || type == null || type == 'update') {//更新
      data = {
        pageNum: 1,
        lat: this.data.userlocaltion.lat,
        lng: this.data.userlocaltion.lon
      }
      this.setData({
        pageNum: 1
      })
    } else if (type == 'add') {//追加
      data = {
        pageNum: that.data.pageNum + 1,
        lat: that.data.userlocaltion.lat,
        lng: that.data.userlocaltion.lon
      }
      that.setData({
        pageNum: that.data.pageNum + 1
      })
    }
    console.log(type);
    wx.request({
      url: app.requesturl+'activity/findByPage',
      method:"POST",
      data:data,
      success:function(res){
        console.log(res);
        if (res.data.code == "100") {
          if (type == undefined || type == "" || type == null || type == 'update') {
            that.setData({
              activelist: res.data.data
            })
          } else if (type == 'add') {
            that.setData({
              activelist: that.data.activelist.concat(res.data.data),
              xialaload: false
            })
          }
        }
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
    this.getactivelist("update");
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("加载")
    this.setData({
      xialaload: true
    })
    var that = this;
    setTimeout(function () {
      that.getactivelist("add");
    }, 1000)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})