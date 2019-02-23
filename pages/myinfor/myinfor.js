// pages/myinfor/myinfor.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId:"",
    userinfo:{
      avatarUrl: "",
      nickName: ""
    },
    pageNum:1,
    infolist:[],
    userlocaltion: {
      lat: "",
      lon: ""
    },
    xialaload: false,
    nothave: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        var userinfo=res.data;
        console.log(userinfo);
        that.setData({
          "userinfo.avatarUrl": userinfo.avatarUrl,
          "userinfo.nickName": userinfo.nickName
        })
      },
    })
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          openId: res.data
        })
        that.getinfordata(res.data);
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  getinfordata:function(openId){
    if(openId==null||openId==undefined){
      openId=this.data.openId
    }
    var that=this;
    wx.request({
      url: app.requesturl + 'dynamic/findByPage?openId=' + openId,
      method:"POST",
      data:{
        openId: openId,
        pageNum: that.data.pageNum
      },
      success(res){
        if(res.data.code==="100"){
          that.setData({
            infolist: that.data.infolist.concat(res.data.data),
            xialaload: false,
          })
        } else if (res.data.code === "002"){
          that.setData({
            xialaload: true,
            nothave: true
          })
        }
      }
    })

  },
  deldata:function(e){
    let index=e.detail.index;
    let infolist = this.data.infolist;
    infolist.splice(index, 1)
    this.setData({
      infolist: infolist
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
    if(!this.data.xialaload){
      let pageNum=this.data.pageNum+1;
      this.setData({
        xialaload:true,
        pageNum:pageNum
      })
      let that=this;
      setTimeout(function(){
        that.getinfordata();
      },800)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})