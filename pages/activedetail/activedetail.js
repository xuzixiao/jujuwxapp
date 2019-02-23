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
    activedetail:{},
    date:"",
    week:"",
    userjoinlist:[]
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
        app.globalData.logintogo = "/pages/activity/activity";
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
    this.joinpeople();

  },
  getdetail:function(){
    var that=this;
    wx.request({
      url: app.requesturl + 'activity/detail?openId=' + that.data.openId + "&uuid=" + that.data.uuid,
      method:"POST",
      success:function(res){
        if(res.data.code=="100"){
          let week = new Date(res.data.data.createTime).getDay();
          if (week == 1) {
            week = "周一"
          } else if (week == 2) {
            week = "周二"
          } else if (week == 3) {
            week = "周三"
          } else if (week == 4) {
            week = "周四"
          } else if (week == 5) {
            week = "周五"
          } else if (week == 6) {
            week = "周六"
          } else if (week == 7) {
            week = "周日"
          }
          let createtime = res.data.data.createTime.replace("T"," ").split(".")[0];
          createtime = createtime.substring(0, createtime.length-3);
          that.setData({
            activedetail: res.data.data,
            date: createtime,
            week: week
          })
        }
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
    let that=this;
    wx.request({
      url: app.requesturl + '/activity/join?openId=' + this.data.openId + "&uuid=" + this.data.uuid,
      method:"POST",
      success:function(res){
        Toast.success('参与成功');
        that.joinpeople();
      },
      fail:function(err){
        console.log(err);
      }
    })
  },
  //参与列表
  joinlist:function(){
   wx.navigateTo({
     url: "/pages/joinlist/joinlist?uuid="+this.data.uuid,
   })
  },
  //参与活动的人员列表
  joinpeople:function(){
    var that=this;
    wx.request({
      url: app.requesturl + 'payUser/findByPageOnActivity?uuid=' + this.data.uuid,
      method:"POST",
      data:{
        uuid: this.data.uuid
      },
      success:function(res){
        if(res.data.code=="100"){
          that.setData({
            userjoinlist:res.data.data
          })
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
    return {
      title: this.data.activedetail.theme,
      path: '/pages/activedetail/activedetail?uuid='+this.data.uuid,
      imageUrl: this.data.activedetail.coverUrl,
      success: (res) => {
        console.log(res);
      }
    }
  }
})