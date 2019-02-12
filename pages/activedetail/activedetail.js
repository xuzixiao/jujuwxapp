// pages/activedetail/activedetail.js
const app = getApp();
import Toast from '../../vant/toast/toast';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    uuid:"",
    openId:"",
    activedetail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          openId:res.data,
          uuid: options.uuid
        })
        that.getdetail();
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
  getdetail:function(){
    var that=this;
    wx.request({
      url: app.requesturl + 'activity/detail?openId=' + that.data.openId + "&uuid=" + that.data.uuid,
      method:"POST",
      success:function(res){
        if(res.data.code=="100"){
          that.setData({
            activedetail:res.data.data
          })
        }
        console.log(res);
      }
    })
  },

  openmap:function(){
    wx.openLocation({
      latitude: this.data.activedetail.lat,
      longitude: this.data.activedetail.lng,
      name: this.data.activedetail.place
    })
  },
  //我想参与
  wantjoin:function(){
    wx.request({
      url: app.requesturl + '/activity/join?openId=' + this.data.openId + "&uuid=" + this.data.uuid,
      method:"POST",
      success:function(res){
        Toast.success('参与成功');
      },
      fail:function(err){
        console.log(err);
      }
    })
  },
  //参与列表
  joinlist:function(){
   wx.navigateTo({
     url: "/pages/joinlist/joinlist",
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