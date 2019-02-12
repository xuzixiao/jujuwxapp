// pages/pushactive/pushactive.js
const qiniuUploader = require("../../state/qiniuUploader.js");
const utils = require("../../utils/util.js");
import Toast from '../../vant/toast/toast';
const app = getApp();
// 初始化七牛相关参数
function initQiniu(that) {
  var options = {
    uploadURL: "https://up-z1.qbox.me",
    region: 'NCN', // 华北区
    uptoken: that.data.qiniuToken,
    domain: 'http://17juju.club/',
    shouldUseQiniuFileName: false
  };
  qiniuUploader.init(options);
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    choosetimestate:"",
    choosetime:false,
    minDate: new Date().getTime(),
    activeban:"",
    activebanimg:"",
    wx:"",
    phone:"",
    theme:"",
    ginTime: "",
    ginTimeformat:"",
    endTime:"",
    endTimeformat:"",
    agreen:true,
    addresschoose:false,
    activeaddressname:"",//活动名称
    address:{
      name:"",
      address:"",
      latitude:"",
      longitude:""
    },
    depict:""
  },
  agreenfun:function(){
      this.setData({
        agreen:!this.data.agreen
      })
  },
  Openchoose:function(){
    this.setData({
      addresschoose:true
    })
  },
  Closechoose:function(){
    this.setData({
      addresschoose: false
    })
  },
  addban:function(){
    var that = this;
    //初始化七牛
    initQiniu(that);
    // 微信 API 选文件
    wx.chooseImage({
      count: 1,
      success: function (res) {
        var filePath = res.tempFilePaths[0];
        // 交给七牛上传
        qiniuUploader.upload(filePath, (res) => {
          that.setData({
            activeban: res,
            activebanimg: res.imageURL,
          })
        }, (error) => {
          console.error('error: ' + JSON.stringify(error));
        }, null, (progress) => {
          console.log('上传进度', progress.progress)
          console.log('已经上传的数据长度', progress.totalBytesSent)
          console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
        }, cancelTask => that.setData({ cancelTask })
        );
      }
    })
  },
  //获取七牛Token
  getToken: function () {
    var that = this;
    wx.request({
      url: app.requesturl + 'qiniuTool/getQiniuToken',
      method: "POST",
      header: {
        "Accept": "application/json;charset=UTF-8"
      },
      success: function (res) {
        if (res.data.code == '100') {
          that.setData({
            qiniuToken: res.data.data.token
          })
        } else {
          wx.showToast({
            content: res.data.msg,
            showCancel: false
          })
        }
      },
      fail: function () {
        wx.showToast({
          content: "接口异常",
          showCancel: false
        })
      }
    })
  },
  //选择开始时间
  choosestart:function(){
    console.log('开始时间');
    this.setData({
      choosetime:true,
      choosetimestate: 'start'
    })
  },
  //选择开始时间
  chooseend: function () {
    this.setData({
      choosetime: true,
      choosetimestate:'end'
    })
  },
  choosedatetime:function(e){
    console.log(e);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getToken()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this;
    wx.getStorage({
      key: 'openid',
      success: function(res) {
        that.setData({
          openid:res.data
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  confirmtime:function(e){
    console.log(e)
    let time = new Date(e.detail);
    let timeformat = utils.formatDateTime(time);
    if (this.data.choosetimestate=="start"){
      this.setData({
        ginTime: timeformat,
        ginTimeformat:time,
        choosetime: false
      })
    }else if(this.data.choosetimestate=="end"){
      this.setData({
        endTime: timeformat,
        endTimeformat: time,
        choosetime: false
      })
    }
  },
  canceltime:function(){
    this.setData({
      choosetime:false
    })
  },
  chooseaddres:function(){
    var that=this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        that.setData({
          'address.name':res.name,
          'address.address': res.address,
          'address.latitude': res.latitude,
          'address.longitude':res.longitude
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  wxchange:function(e){
    this.setData({
      wx: e.detail.value
    })
  },
  phonechange: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  themechange:function(e){
    this.setData({
      theme: e.detail.value
    })
  },
  depictchange: function (e) {
    this.setData({
      depict: e.detail.value
    })
  },
// 发布活动
  pushbtn:function(){
    if (this.data.activebanimg==""){
      Toast("上传封面图片后,才能发布活动");
      return;
    }
    if (this.data.wx == "") {
      Toast("微信号码不能为空");
      return;
    }
    if (this.data.phone == "") {
      Toast("手机号码不能为空");
      return;
    }
    var testrule = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
    if (!testrule.test(this.data.phone)){
      Toast("手机号码输入不正确");
      return;
    }
    if (this.data.theme == "") {
      Toast("活动主题不能为空");
      return;
    }
    if (this.data.ginTime == "") {
      Toast("开始活动时间不能为空");
      return;
    }
    if (this.data.endTime == "") {
      Toast("结束活动时间不能为空");
      return;
    }
    if (this.data.address.address == "" || this.data.address.name == "" || this.data.address.latitude==""||this.data.address.longitude=="") {
      Toast("活动地点不能为空");
      return;
    }
    if(this.data.depict==""){
      Toast("活动描述不能为空");
      return;
    }
    if (!this.data.agreen){
      Toast("请同意聚聚服务协议");
      return;
    }
    var pushdata = {
      "coverUrl": this.data.activebanimg,
      "createUserPhone": this.data.phone,
      "createUserWechatNumber":this.data.phone,
      "depict": this.data.depict,
      "endTime": this.data.endTimeformat,
      "ginTime": this.data.ginTimeformat,
      "lat": this.data.address.latitude,
      "lng": this.data.address.longitude,
      "place": this.data.address.name,
      "theme": this.data.theme
    }
    wx.request({
      url: app.requesturl + 'activity/save?openId='+this.data.openid,
      method:"POST",
      data: pushdata,
      success:function(res){
        console.log(res);
        if(res.data.code=="100"){
          wx.navigateTo({
            url: '/pages/activepushsuccess/activepushsuccess',
          })
        }else{
          Toast(res.data.msg);
        }
      },
      fail:function(err){
        Toast("发布失败");
        console.log("发布失败");
        console.log(err);
      }
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