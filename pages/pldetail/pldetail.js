// pages/pldetail/pldetail.js
const app = getApp();
import Toast from '../../vant/toast/toast';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openId:"",
    pldata:"",
    plwin:false,
    pltext:"",
    userlng:"",
    userlat:"",
    commentlist:[],
    outtime:"",
    distance:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    //获取openid
    let that = this;
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({
          openId: res.data,
          uuid: options.uuid,
          distance: options.distance,
          outtime: options.outtime
        })
        that.getcomtentlist(res.data, options.uuid);
      },
      fail:function(res){
        app.globalData.logintogo = "/pages/pldetail/pldetail?uuid=" + that.data.uuid;
        wx.navigateTo({
          url: '/pages/authorize/authorize',
        })
        return;
      }
    })
    wx.getStorage({
      key: 'longitude',
      success: function (res) {
        that.setData({
          userlng: res.data
        })
      }
    })
    wx.getStorage({
      key: 'latitude',
      success: function (res) {
        that.setData({
          userlat: res.data
        })
      }
    })
    //获取用户信息
    that.getdetail(options.uuid);
   // that.getcomtentlist();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  seve:function(){
    this.setData({
      plwin:true
    })
  },
  close:function(){
    this.setData({
      plwin: false,
      pltext:""
    })
  },
  pltextfun:function(e){
    this.setData({
      pltext: e.detail.value
    })
  },
  //获取动态详情
  getdetail: function (uuid) {
    var that = this;
    wx.request({
      url: app.requesturl + 'dynamic/detail?&uuid=' + uuid,
      method: "POST",
      success: function (res) {
        if (res.data.code == "100") {
          that.setData({
            pldata: res.data.data
          })
        }
      }
    })
  },
//发布评论
  submitpl:function(){
    var pltext = this.data.pltext;
    if (pltext==""){
      Toast("评论内容不能为空");
      return;
    }
    var pldata = {
      characters: pltext,
      commentDynamicUuid: this.data.pldata.uuid,
      commentUserUuid: this.data.openId,
      lat: this.data.userlat,
      lng: this.data.userlng
    }
    wx.request({
      url: app.requesturl + 'dynamicComment/save?openId=' + this.data.openId,
      method:"POST",
      data: pldata,
      success:(res)=>{
        if(res.data.code=="100"){
          Toast("评论成功");
          this.setData({
            plwin:false,
            'pldata.commentNumAll': this.data.pldata.commentNumAll + 1
          })
          this.getcomtentlist();
        }
        console.log(res);
      }
    })
  },
  //获取评论列表
  getcomtentlist: function (openId,uuid){
    if (openId == undefined || uuid==undefined){
      var openId = this.data.openId;
      var comptentdata = {
        commentDynamicUserOpenId: this.data.openId,
        commentDynamicUuid: this.data.pldata.uuid
      }
    }else{
      var comptentdata = {
        commentDynamicUserOpenId: openId,
        commentDynamicUuid: uuid
      }
    }
    var that=this;
    wx.request({
      url: app.requesturl + 'dynamicComment/findByPage?openId=' + openId,
      method:"POST",
      data: comptentdata,
      success:function(res){
        console.log(res);
        if(res.data.code=="100"){
          that.setData({
            commentlist:res.data.data
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
    this.setData({
      commentlist:[]
    })
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